import { db } from '@/service/firebaseConfig';
import { collection, getDocs, query, where } from 'firebase/firestore';
import React, { useEffect, useState } from 'react';
import { useNavigate  ,useNavigation} from 'react-router-dom';
import MyTripCard from './components/MyTripCard';

function MyTrips() {
  const navigate = useNavigate();
  const [userTrips, setUserTrips] = useState([]);

  useEffect(() => {
    console.log("use effect")
    GetUserTrips();
  },[]);

  const GetUserTrips = async () => {
    const user = JSON.parse(localStorage.getItem('user'));

    if (!user) {
      navigate('/');
      return;
    }

    console.log("Logged-in user:", user?.email);
    setUserTrips([]);
    const q = query(
  collection(db, 'AItrips'),
  where('userEmail', '==', user?.email)
);

console.log("Running query for:", user?.email);

const querySnapshot = await getDocs(q);

let trips = [];
querySnapshot.forEach((doc) => {
  trips.push({ id: doc.id, ...doc.data() });
});

setUserTrips(trips);
    
  };

  return (
    <div className='p-10 md:px-20 lg:px-36 bg-gradient-to-b from-gray-900 to-gray-800 w-full h-screen'>
      <h2 className='font-bold text-3xl text-white'>
        My Trips : 
      </h2>

      <div className='grid grid-cols-2 md:grid-cols-3 gap-5 mt-10'>
        {userTrips.map((trip, index) => (
          <MyTripCard key={index} trip={trip} />
        ))}
      </div>
    </div>
  );
}

export default MyTrips;

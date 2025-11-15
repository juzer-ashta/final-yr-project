import { db } from '@/service/firebaseConfig';
import { doc, getDoc } from 'firebase/firestore';
import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom';
import { toast } from 'sonner';
import InfoSection from './components/InfoSection';
import Hotels from './components/Hotels';
import PlacesToVisit from './components/PlacesToVisit';
import Footer from './components/Footer';

function Viewtrip() {


const {tripId}=useParams();

const [trip,setTrip]=useState([]);

useEffect(()=>{
    tripId&&GetTripData();
},[tripId])

const GetTripData= async()=>{
    const docRef=doc(db, 'AItrips', tripId);
    const docSnap=await getDoc(docRef);

    if(docSnap.exists()){
        console.log("Document:", docSnap.data());
        setTrip(docSnap.data())

    }else{
        console.log("no such document")
        toast("No trip found")
    }
}

  return (
    <div className='p-10 md:px-20 lg:px-44 xl:px-56 bg-gradient-to-b from-gray-900 to-gray-800 h-full w-full'>
      {/* Information Section */}

        <InfoSection trip={trip}/>
      <hr></hr>
      {/* Recommended hotels */}

        <Hotels trip={trip}/>
    <hr></hr>
      {/* Daily plan */}

        <PlacesToVisit trip={trip}/>
<hr className='mt-5'></hr>
      {/* footer */}
      <Footer trip={trip}/>
    </div>
  )
}

export default Viewtrip

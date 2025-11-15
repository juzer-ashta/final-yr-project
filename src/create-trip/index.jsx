import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { SelectBudgetOptions, SelectTravelList, AI_PROMPT } from '@/constants/options';
import React, { useEffect, useState } from 'react';
import LocalAutocomplete from '@/components/custom/LocalAutocomplete';
import { chatSession } from '@/service/AImodel';
import { useGoogleLogin } from '@react-oauth/google';
import axios from 'axios'
import { doc, setDoc } from "firebase/firestore";
import { db } from '@/service/firebaseConfig'
import { useNavigate, useNavigation } from 'react-router-dom';
import { toast } from 'sonner'
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"

function Createtrip() {
  const [formData, setFormData] = useState({});
  const [openDialog, setOpenDialog] = useState(false);
  const [loading,setloading]=useState(false);
  const navigate=useNavigate();

  const handleInputChange = (name, value) => {
    setFormData({
      ...formData,
      [name]: value,
    });
  };

const LogIn=useGoogleLogin({
  onSuccess:(codeResp)=>{console.log(codeResp); GetUserProfile(codeResp)},
  onError:(error)=>console.log(error)

})

  useEffect(() => {
    console.log(formData);
  }, [formData]);

 const generateTrip = async () => {

  const user = localStorage.getItem('user');
  if(!user){

    setOpenDialog(true);
  }    

    if (formData.noofdays > 9 || formData.noofdays < 1) {
      toast("No of days should be between 1 and 9");
      return;
    }
    if (!formData.location || !formData.budget || !formData.noofpeople || !formData.noofdays) {
      toast("Please fill all the details");
      return;
    }
    setloading(true);
    const FINAL_PROMPT = AI_PROMPT
      .replace("{location}", formData?.location)
      .replace("{totalDays}", formData?.noofdays)
      .replace("{traveler}", formData?.noofpeople)
      .replace("{budget}", formData?.budget);

    console.log(FINAL_PROMPT);

    try {
      const result = await chatSession(FINAL_PROMPT);
      console.log(result);
      setloading(false);
      SaveAItrip(result);
    } catch (error) {
      console.error("Trip Error:", error);
    }
  };

  function extractJSON(text) {
  try {
    // Find the first `{` and last `}`
    const start = text.indexOf("{");
    const end = text.lastIndexOf("}");

    if (start === -1 || end === -1) return null;

    const jsonString = text.substring(start, end + 1);

    return JSON.parse(jsonString);
  } catch (e) {
    console.error("JSON Parse Error:", e);
    return null;
  }
}

  const SaveAItrip = async (TripData) => {
  setloading(true);

  const cleanJson = extractJSON(TripData);

  if (!cleanJson) {
    setloading(false);
    alert("AI returned invalid JSON");
    return;
  }

  const user = JSON.parse(localStorage.getItem("user"));
  const docId = Date.now().toString();

  await setDoc(doc(db, "AItrips", docId), {
    userSelection: formData,
    tripData: cleanJson,
    userEmail: user?.email,
    id: docId,
  });

  setloading(false)
  navigate('/view-trip/'+ docId);
  
};

  const GetUserProfile=(tokenInfo)=>{
    axios.get(`https://www.googleapis.com/oauth2/v1/userinfo?acess_token=${tokenInfo?.access_token }`,{
     
    headers:{
      Authorization:`Bearer ${tokenInfo?.access_token}`,
      Accept:'Application/json'
    }
  }).then((resp)=>{
      console.log(resp);
      localStorage.setItem('user',JSON.stringify(resp.data));
      setOpenDialog(false);
      generateTrip();
    })
  }

  return (
    <div className="relative min-h-screen bg-cover bg-center bg-[url('/public/image1.jpg')] py-16 px-5 sm:px-10 md:px-32 lg:px-56">
      <div className="absolute inset-0 bg-black opacity-50"></div>
      <div className="relative z-10 text-white">
        <h2 className="text-4xl font-bold text-center md:text-left">Tell Us Your Travel Preferences 🌴</h2>
        <p className="text-xl text-gray-300 mt-3 text-center md:text-left">
          Simply provide some basic details, and our trip planner will create a personalized itinerary for you.
        </p>

        <div className="mt-12 space-y-10">

          {/* Destination Input */}
          <div>
            <h2 className="text-2xl font-medium">What is your preferred destination?</h2>

            <div className="mt-4">
              <LocalAutocomplete
                onSelect={(value) => handleInputChange("location", value)}
              />
            </div>

            {formData.location && (
              <p className="mt-2 text-gray-200 text-lg">
                Selected: <span className="font-semibold">{formData.location}</span>
              </p>
            )}
          </div>

          {/* Days Input */}
          <div>
            <h2 className="text-2xl font-medium">How many days are you planning your trip?</h2>
            <Input
              placeholder="Ex. 3"
              type="number"
              className="mt-4 w-full p-3 bg-white text-black bg-opacity-80 rounded-md shadow-md focus:outline-none"
              onChange={(e) => handleInputChange('noofdays', e.target.value)}
            />
          </div>

          {/* Budget Options */}
          <div>
            <h2 className="text-2xl font-medium">What is your budget?</h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6 mt-5">
              {SelectBudgetOptions.map((item, index) => (
                <div
                  key={index}
                  onClick={() => handleInputChange('budget', item.title)}
                  className={`p-6 border border-gray-300 rounded-lg cursor-pointer 
                    hover:shadow-xl transition duration-300 ease-in-out transform hover:scale-105 
                    bg-white bg-opacity-70 ${formData?.budget === item.title ? 'shadow-lg bg-black scale-105 border-black' : ''}`}
                >
                  <div className="text-4xl text-blue-500">{item.icon}</div>
                  <h3 className="font-semibold text-lg mt-2 text-black">{item.title}</h3>
                  <p className="text-gray-900">{item.desc}</p>
                </div>
              ))}
            </div>
          </div>

          {/* Travel Companions */}
          <div>
            <h2 className="text-2xl font-medium">Who do you plan to travel with?</h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6 mt-5">
              {SelectTravelList.map((item, index) => (
                <div
                  key={index}
                  onClick={() => handleInputChange('noofpeople', item.people)}
                  className={`p-6 border border-gray-300 rounded-lg cursor-pointer 
                    hover:shadow-xl transition duration-300 ease-in-out transform hover:scale-105 
                    bg-white bg-opacity-70 ${formData?.noofpeople === item.people ? 'shadow-lg bg-slate-500 scale-105 border-black' : ''}`}
                >
                  <div className="text-4xl text-green-500">{item.icon}</div>
                  <h3 className="font-semibold text-lg mt-2 text-black">{item.title}</h3>
                  <p className="text-gray-900">{item.desc}</p>
                </div>
              ))}
            </div>
          </div>

          {/* Submit Button */}
          <div className="text-center mt-8">
            <Button
              disabled={loading}
              onClick={generateTrip}
              className="w-full sm:w-1/3 py-3 text-xl text-white bg-blue-600 rounded-lg shadow-lg hover:bg-blue-700 focus:outline-none"
            >
              Generate Trip
            </Button>
          </div>

        </div>
      </div>

      <Dialog open={openDialog}>
        <DialogContent>
          <DialogHeader>
            <DialogDescription>
              <img src="/logo.svg" alt="" />
              <h2 className='font-bold text-lg mt-7 text-black'>Sign In With Google</h2>
              <p>Sign in to the app with Google authentication security</p>
              <Button onClick={LogIn}
                className='w-full mt-5 flex gap-4 items-center'>Sign In With Google </Button>
            </DialogDescription>
          </DialogHeader>
        </DialogContent>
      </Dialog>

    </div>
  );
}

export default Createtrip;

import React from 'react'
import { Button } from '../ui/button'
import { useEffect ,useState } from 'react';
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover"
import { googleLogout, useGoogleLogin } from '@react-oauth/google'
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import axios from 'axios'



function Header() {

  const [openDialog, setOpenDialog] = useState(false);

  const user=JSON.parse(localStorage.getItem('user'));

  const login = useGoogleLogin({
    onSuccess: (codeResp) => { GetUserProfile(codeResp) },
    onError: (error) => console.log(error)
  })

  const GetUserProfile = (tokenInfo) => {
    axios.get(`https://www.googleapis.com/oauth2/v3/userinfo?access_token=${tokenInfo?.access_token}`,
      {
        headers: {
          Authorization: `Bearer ${tokenInfo?.access_token}`,
          Accept: 'Application/json'
        }
      }
    ).then((resp) => {
      console.log(resp);
      localStorage.setItem('user', JSON.stringify(resp.data));
      setOpenDialog(false);
      window.location.reload();
    })
  }


  useEffect(()=>{
    console.log(user);
  },[])

  return (
    <div className=' shadow-sm flex justify-between items-center px-5 bg-gray-200 backdrop-blur-lg'>
    
      <a href="/"><img src="/logo-new2.svg" alt="logo" className='m-0 p-0 '/></a>
      <div>
      {user? 
        <div className='flex items-center gap-3' >

          <a href="/myTrips">
            <Button variant="outline" className='rounded-full bg-blue-500 text-white'>My Trips</Button>
          </a>
         <Popover>
          <PopoverTrigger>
              <img src={user.picture} alt="" className=' h-[30px] w-[30px] rounded-full' />
            </PopoverTrigger>
            <PopoverContent>
              <h2 className=' cursor-pointer' onClick={() => {
                googleLogout();
                localStorage.clear();
                window.location.reload();
              }}>Log Out</h2>
            </PopoverContent>
          </Popover>       
        </div>
        :
         <Button onClick={()=>setOpenDialog(true)}> Sign In</Button>}

      <Dialog open={openDialog}>
        <DialogContent>
          <DialogHeader>
            <DialogDescription>
              <img src="/logo-new2.svg" alt="" />
              <h2 className='font-bold text-lg mt-7 text-black'>Sign In With Google</h2>
              <p>Sign in to the app with Google authentication security</p>
              <Button onClick={login}
                className='w-full mt-5 flex gap-4 items-center'>Sign In With Google </Button>

                 <Link to="/">
                          <Button className="w-full mt-4 text-underline">Go to Page</Button>
                        </Link>
            </DialogDescription>
          </DialogHeader>
        </DialogContent>
      </Dialog>

      </div>
      

    </div>
  )
}

export default Header

import React from 'react'

function InfoSection({trip}) {
  return (
    <div>
      <img src='/placeholder.jpg' className='h-[340px] w-full object-cover rounded-xl  '/>

      <div className="my-5 flex flex-col gap-2">
        <h2 className='font-bold text-4xl text-white'>{trip?.userSelection?.location}</h2>
        <div className='flex gap-5'>
            <h2 className='p-1 px-3 bg-gray-300 text-black rounded-full'>📅 {trip?.userSelection?.noofdays} Days</h2>
            <h2 className='p-1 px-3 bg-gray-300 text-black rounded-full'>💰 {trip?.userSelection?.budget} Budget</h2>
            <h2 className='p-1 px-3 bg-gray-300 text-black rounded-full'>🧑‍🤝‍🧑 No. of traveller: {trip?.userSelection?.noofpeople}</h2>
        </div>
      </div>
    </div>
  )
}

export default InfoSection;
 
import { Button } from '@/components/ui/button'
import React from 'react'
import { Link } from 'react-router-dom'

function PlaceCard({place}) {
  return (
    <Link to={'https://www.google.com/maps/search/?api=1&query='+place.place_name} target="_blank">
        <div className='shadow-md border rounded-xl p-3 mt-2 flex gap-5 hover:scale-105 transition-all hover:cursor-pointer'>
      <img src='/placeholder.jpg' className='w-[130px] h-[130px] rounded-xl'/>
      <div>
        <h2 className='font-bold text-lg text-gray-200'>{place.place_name}</h2>
        <p className='text-sm text-gray-400'>{place.place_details}</p>
        <h2 className='mt-1 text-gray-200'>🕖 {place.estimated_time_spent_minutes} minutes</h2>
        <h2 className='text-gray-200'> <span className='text-blue-500 font-bold'>Fare: </span> {place.ticket_pricing}</h2>
      </div>
    </div>
    </Link>
    
  )
}

export default PlaceCard

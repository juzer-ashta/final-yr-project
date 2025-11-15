import React from 'react'
import { Link } from 'react-router-dom'

function MyTripCard({trip}) {
  return (
    <Link to={'/view-trip/'+trip.id}>
    <div className='hover:scale-105 transition-all'>
      <img src='/placeholder.jpg' className='object-cover rounded-xl'></img>

        <div>
            <h2 className='font-bold text-lg text-gray-400'>{trip?.userSelection?.location}</h2>
        </div>

    </div>
    </Link>
  )
}

export default MyTripCard

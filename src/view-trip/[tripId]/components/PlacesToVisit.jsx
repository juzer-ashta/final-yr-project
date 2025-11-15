import React from 'react'
import PlaceCard from './PlaceCard';

function PlacesToVisit({trip}) {
  return (
    <div>
      <h2 className='font-bold text-2xl mt-5 text-white'> Places to Visit : </h2>

      <div>
        {trip?.tripData?.itinerary.map((item,index)=>(
            <div className='mt-5' >
                <h2 className='font-medium text-xl text-white'>Day: {item.day}</h2>
                <div className='grid md:grid-cols-2 gap-5'>
                     {item.schedule.map((place,index)=>(
                    <div>
                        <h2 className='font-medium text-lg text-orange-400'>{place.best_time_to_visit}</h2>
                        <PlaceCard place={place}/>
                    </div>
                ))}
                </div>
               
            </div>
        ))}
      </div>
    </div>
  )
}

export default PlacesToVisit;
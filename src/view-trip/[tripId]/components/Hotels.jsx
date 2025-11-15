import React from 'react'
import { Link } from 'react-router-dom';

function Hotels({trip}){

    return(
        <div>
            <h2 className='font-bold text-2xl mt-5 text-white my-5'>Hotel Recommendations:</h2>

            <div className='grid grid-col-2 md:grid-cols-3 xl:grid-col-4 gap-5'>
                {trip?.tripData?.hotels?.map((hotel,index)=>(
                    <Link to={'https://www.google.com/maps/search/?api=1&query='+hotel?.name+','+hotel?.address} target="_blank">
                    <div className='hover:scale-105 transition-all border rounded-xl my-3 mb-5 p-2'>
                        <img src={'/placeholder.jpg'} className='rounded-xl'/>
                        <div className='my-2 flex flex-col gap-2'>
                            <h2 className='font-medium text-gray-200 '>{hotel?.name}</h2>
                            <h2 className='text-xs text-gray-400 '>📍 {hotel?.address}</h2>
                            <h2 className='text-sm text-gray-200'>💰 {hotel?.price_per_night} per night</h2>
                            <h2 className='text-sm text-gray-200'>⭐ Rating: {hotel?.rating}</h2>
                        </div>
                    </div>
                    </Link>
                ))}
            </div>
        </div>
    )

}

export default Hotels;
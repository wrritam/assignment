import React from 'react'

const Hero: React.FC = () => {
  return (
    <div className='my-7'>
      <h1 className='font-tripsans-regular phone:text-lg tablet:text-3xl text-neutral-500 text-center phone:mb-3 tablet:mb-7'>Best Price To Trade</h1>
      <div className='flex justify-between phone:w-[95%] md:w-[85%] mx-auto'>
         <div className='my-auto grid gap-1'>
            <p className='phone:text-sm tablet:text-4xl text-[#3DC6C1]'>0.87 %</p>
            <p className='text-neutral-500 phone:text-xs tablet:text-lg text-center font-tripsans-regular'>5 Mins</p>
         </div>
         <div className='my-auto grid gap-1'>
            <p className='phone:text-sm tablet:text-4xl text-[#3DC6C1]'>1.78 %</p>
            <p className='text-neutral-500 phone:text-xs tablet:text-lg text-center font-tripsans-regular'>1 Hour</p>
         </div>
         <p className='phone:text-3xl md:text-7xl text-center leading-none tracking-tight md:-mt-2'>₹ 36,68,689</p>
         <div className='my-auto grid gap-1'>
            <p className='phone:text-sm tablet:text-4xl text-[#3DC6C1]'>9.15 %</p>
            <p className='text-neutral-500 phone:text-xs tablet:text-lg text-center font-tripsans-regular'>1 Day</p>
         </div>
         <div className='my-auto grid gap-1'>
            <p className='phone:text-sm tablet:text-4xl text-[#3DC6C1]'>9.94%</p>
            <p className='text-neutral-500 phone:text-xs tablet:text-lg text-center font-tripsans-regular'>7 Days</p>
         </div>
      </div>
      <p className='font-tripsans-regular phone:text-xs tablet:text-lg text-neutral-500 text-center phone:mt-5 tablet:mt-7'>Average BTC/INR net price including commission</p>
    </div>
  )
}

export default Hero

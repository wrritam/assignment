import React, { useState } from 'react'
import Navbar from './Navbar'
import Hero from './Hero'
import Grid from './Grid'
import Footer from './Footer'

const Home: React.FC = () => {
  const [checked, setChecked] = useState<boolean>(false);
  return (
    <div className={`${checked ? 'bg-[#191D28] text-white' : 'bg-white text-neutral-900'}`}>
      <Navbar checked={checked} setChecked={setChecked}/>
      <Hero />
      <Grid checked={checked}/>
      <Footer />
    </div>
  )
}

export default Home

import React from 'react'
import Navbar from '../components/Navbar'
import Body from '../components/Body';
import Footer from '../components/Footer'

const Home = () => {
  return (
    <div className='flex flex-col items-center justify-center min-h-screen bg-[url("/bg.jpg")] bg-cover bg-center'>
      <Navbar/>
      <Body/>
      <Footer/>
    </div>
  )
}

export default Home

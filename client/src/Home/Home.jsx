import React from 'react'
import Navbar from '../components/Navbar'
import Body from '../components/Body';
import Footer from '../components/Footer'
import SEO from '../components/SEO'

const Home = () => {
  return (
    <div className='flex flex-col items-center justify-center min-h-screen bg-[url("/bg.jpg")] bg-cover bg-center'>
      <SEO 
        title="Premium Natural Juices & Beverages"
        description="Experience the refreshing taste of TooMore's premium natural juices made from fresh, hand-picked fruits. Our beverages contain no additives or preservatives, delivering pure goodness from orchard to glass."
        image="/src/assets/images/bg.webp"
      />
      <Navbar/>
      <Body/>
      <Footer/>
    </div>
  )
}

export default Home

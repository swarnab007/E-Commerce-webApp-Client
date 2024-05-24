import React from 'react'
import Layout from '../components/layout/Layout'
import Slider from '../components/Slider'

const Home = () => {
  return (
    <Layout title="Home" description="Home page">
    <div className='mb-8'>
      <Slider />
    </div>
    </Layout>
  )
}

export default Home

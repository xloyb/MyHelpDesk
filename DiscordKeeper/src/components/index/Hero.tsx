/* eslint-disable @next/next/no-img-element */
import React from 'react'
import Rectangular from './Rectangular'

const Hero = () => {
  return (
    <>
    <div className="py-20 bg-base-100 card mx-6 mt-5 md:pt-4 px-6">
        <Rectangular/>
      <div className="container mx-auto px-6 md:px-12 justify-center">
        <div className="flex flex-col md:flex-row items-center">
          <div className="md:w-1/2 lg:w-2/3">
          
            <h1 className="text-4xl md:text-6xl lg:text-7xl font-bold mb-6">
              Welcome to our <br className="hidden md:block" />
              <span className="text-primary">Discord</span> Store
            </h1>
            <p className="text-lg md:text-xl lg:text-2xl text-gray-400 mb-8">
              We create beautiful and functional websites for businesses of all sizes.
            </p>
            <div className="flex gap-2">
              <a href="/chat" className="btn btn-primary font-bold py-3 px-6 rounded-md">
                Get Started
              </a>
              <a href="/chat" className="btn bg-gray-700 hover:bg-gray-600 text-white font-bold py-3 px-6 rounded-md">
                Learn More
              </a>
            </div>
          </div>
          <div className="md:w-1/2 lg:w-1/3 mt-8 md:mt-0">
            <img
              src="https://www.mydevify.com/assets/index.494ac568.png"
              alt="Hero Image"
              className="rounded-lg shadow-lg"
            />
          </div>
        </div>
      </div>
    </div>
</>
  )
}

export default Hero
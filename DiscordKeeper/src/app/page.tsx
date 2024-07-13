/* eslint-disable @next/next/no-img-element */
import styles from '@/app/main.module.css'
import IndexNav from '@/components/index/IndexNav'
import Rectangular from '@/components/index/Rectangular'
import Services from '@/components/index/Services'
import Link from 'next/link'


const Homepage = () => {
  return (
    <div className={styles.container}>
      <div className={styles.content}>
        <IndexNav/>




          <Rectangular/>
  <div className="py-20">
      <div className="container mx-auto px-6 md:px-12 justify-center">
        <div className="flex flex-col md:flex-row items-center">
          <div className="md:w-1/2 lg:w-2/3">
          
            <h1 className="text-4xl md:text-6xl lg:text-7xl text-white font-bold mb-6">
              Welcome to our <br className="hidden md:block" />
              <span className="text-primary">Awesome</span> Website
            </h1>
            <p className="text-lg md:text-xl lg:text-2xl text-gray-400 mb-8">
              We create beautiful and functional websites for businesses of all sizes.
            </p>
            <div className="flex gap-2">
              <a href="#" className="btn btn-primary font-bold py-3 px-6 rounded-md">
                Get Started
              </a>
              <a href="#" className="btn bg-gray-700 hover:bg-gray-600 text-white font-bold py-3 px-6 rounded-md">
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






<Services/>






      </div>
    </div>
  )
}

export default Homepage
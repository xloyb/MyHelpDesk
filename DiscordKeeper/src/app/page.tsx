/* eslint-disable @next/next/no-img-element */
import styles from '@/app/main.module.css'
import Hero from '@/components/index/Hero'
import IndexNav from '@/components/index/IndexNav'
import Rectangular from '@/components/index/Rectangular'
import Services from '@/components/index/Services'
import Link from 'next/link'


const Homepage = () => {
  return (
    <div className={styles.container}>
      <div className='bg-base-200'>
        <IndexNav/>




          <Rectangular/>
  


<Hero/>


<Services/>






      </div>
    </div>
  )
}

export default Homepage
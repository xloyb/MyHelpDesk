import React from 'react'
import styles from '@/app/main.module.css'
import Sidebar from '@/components/Sidebar'
import MyChat from '@/components/MyChat'
import ChatNavbar from '@/components/ChatNavbar'

const Chat = () => {
  return (


    <div>

<div className={styles.container}>
      <div className={styles.menu}>
        <Sidebar/> 
      </div>
      <div className={styles.content}>

    <div className='h-screen overflow-hidden sticky top-0  overflow-x-hidden' >
        <ChatNavbar/>

        <MyChat/> 
        
        {/* <Footer/> */}

      </div>

      </div>
    </div>



    </div>
  )
}

export default Chat
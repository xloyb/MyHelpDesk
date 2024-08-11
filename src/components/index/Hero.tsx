/* eslint-disable @next/next/no-img-element */
// /* eslint-disable @next/next/no-img-element */
// import React from 'react'
// import Rectangular from './Rectangular'

// const Hero = () => {
//   return (
//     <>
//     <div className="py-20 bg-base-100 card mx-6 mt-5 md:pt-4 px-6">
//         {/* <Rectangular/> */}
//       <div className="container mx-auto px-6 md:px-12 justify-center">
//         <div className="flex flex-col md:flex-row items-center">
//           <div className="md:w-1/2 lg:w-2/3">
          
//             <h1 className="text-4xl md:text-6xl lg:text-7xl font-bold mb-6">
//             MyHelpDesk: 
//               <span className="text-primary"> All-in-One</span>!
//             </h1>
//             <p className="mb-8">
//             Manage support tickets, engage in real-time chats, and showcase your services—all in one secure platform. Integrate with Discord and soon Telegram to keep your community connected and supported. With our built-in store system, you can easily display your services directly on the index page. Your privacy, our priority.
//             </p>
//             <div className="flex gap-2">
//               <a href="/chat" className="btn btn-primary font-bold py-3 px-6 rounded-md">
//                 Get Started
//               </a>
//               <a href="/chat" className="btn bg-gray-700 hover:bg-gray-600 text-white font-bold py-3 px-6 rounded-md">
//                 Learn More
//               </a>
//             </div>
//           </div>
//           <div className="md:w-1/2 lg:w-1/3 mt-8 md:mt-0">
//             <img
//               src="https://www.mydevify.com/assets/index.494ac568.png"
//               alt="Hero Image"
//               className="rounded-lg shadow-lg"
//             />
//           </div>
//         </div>
//       </div>
//     </div>
// </>
//   )
// }

// export default Hero

"use client"
import React, { useState } from 'react';
import { IoIosArrowDown, IoIosArrowUp } from 'react-icons/io';

const Hero = () => {
  const [showMore, setShowMore] = useState(false);

  const handleToggle = () => {
    setShowMore(!showMore);
  };

  return (
    <div className="py-20 bg-base-100 card mx-6 mt-5 md:pt-4 px-6">
      <div className="container mx-auto px-6 md:px-12 justify-center">
        <div className="flex flex-col md:flex-row items-center">
          <div className="md:w-1/2 lg:w-2/3">
            <h1 className="text-4xl md:text-6xl lg:text-7xl font-bold mb-6">
              MyHelpDesk: 
              <span className="text-primary"> All-in-One</span>!
            </h1>
            <p className="mb-8">
              Manage support tickets, engage in real-time chats, and showcase your services—all in one secure platform.  
              {showMore && (
                <>
                  Integrate with Discord and soon Telegram to keep your community connected and supported. 
                  With our built-in store system, you can easily display your services directly on the index page. 
                  Your privacy, our priority.
                </>
              )}
              {!showMore && (
                <>
                  <span className="line-clamp-3">
                  </span>
                </>
              )}
            </p>
            <button
              onClick={handleToggle}
              className={`flex mt-4 font-bold`}
            >
              {showMore ? (
                <>
                  Show Less <IoIosArrowUp className="ml-2 mt-1" />
                </>
              ) : (
                <>
                  Show More <IoIosArrowDown className="ml-2 mt-1" />
                </>
              )}
            </button>
            <div className="flex gap-2 mt-6">
              <a href="/c" className="btn btn-primary font-bold py-3 px-6 rounded-md">
                Get Started
              </a>
              {/* <a href="/chat" className="btn bg-gray-700 hover:bg-gray-600 text-white font-bold py-3 px-6 rounded-md">
                Learn More
              </a> */}
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
  );
};

export default Hero;

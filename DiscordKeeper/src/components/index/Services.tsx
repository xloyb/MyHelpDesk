/* eslint-disable @next/next/no-img-element */
// import Link from 'next/link'
// import React from 'react'

// const Services = () => {
//   return (
//     <>
//         <div
//         className={`content-center grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 "`}
//       >
//         <div
//       className="mt-6 card card-compact bg-base-100 shadow-xl w-auto m-2" 
//     >
//       <figure>
//         <img src="https://www.mydevify.com/assets/index.494ac568.png" alt="test" />
//       </figure>
//       <div className="card-body">
//         <h2 className="card-title">title</h2>
//         <p>description</p>
//         <div className="card-actions justify-end">
//           <Link href={`/dashboard/myrequests/test`}>
//             <button className="btn btn-primary">Buy</button>
//           </Link>
//         </div>
//       </div>
//     </div>






//     <div
//       className="mt-6 card card-compact bg-base-100 shadow-xl w-auto m-2" 
//     >
//       <figure>
//         <img src="https://www.mydevify.com/assets/index.494ac568.png" alt="test" />
//       </figure>
//       <div className="card-body">
//         <h2 className="card-title">title</h2>
//         <p>description</p>
//         <div className="card-actions justify-end">
//           <Link href={`/dashboard/myrequests/test`}>
//             <button className="btn btn-primary">Buy</button>
//           </Link>
//         </div>
//       </div>
//     </div>




//     <div
//       className="mt-6 card card-compact bg-base-100 shadow-xl w-auto m-2" 
//     >
//       <figure>
//         <img src="https://www.mydevify.com/assets/index.494ac568.png" alt="test" />
//       </figure>
//       <div className="card-body">
//         <h2 className="card-title">title</h2>
//         <p>description</p>
//         <div className="card-actions justify-end">
//           <Link href={`/dashboard/myrequests/test`}>
//             <button className="btn btn-primary">Buy</button>
//           </Link>
//         </div>
//       </div>
//     </div>




//     <div
//       className="mt-6 card card-compact bg-base-100 shadow-xl w-auto m-2" 
//     >
//       <figure>
//         <img src="https://www.mydevify.com/assets/index.494ac568.png" alt="test" />
//       </figure>
//       <div className="card-body">
//         <h2 className="card-title">title</h2>
//         <p>description</p>
//         <div className="card-actions justify-end">
//           <Link href={`/dashboard/myrequests/test`}>
//             <button className="btn btn-primary">Buy</button>
//           </Link>
//         </div>
//       </div>
//     </div>




//     <div
//       className="mt-6 card card-compact bg-base-100 shadow-xl w-auto m-2" 
//     >
//       <figure>
//         <img src="https://www.mydevify.com/assets/index.494ac568.png" alt="test" />
//       </figure>
//       <div className="card-body">
//         <h2 className="card-title">title</h2>
//         <p>description</p>
//         <div className="card-actions justify-end">
//           <Link href={`/dashboard/myrequests/test`}>
//             <button className="btn btn-primary">Buy</button>
//           </Link>
//         </div>
//       </div>
//     </div>



    
//       </div>


//     </>
//   )
// }

// export default Services

"use client"
import React, { useState, useEffect } from 'react';
import axios from 'axios';

interface Service {
  image: string;
  title: string;
  description: string;
  price: number; // Expecting price as a number
}

const Services = () => {
  const [services, setServices] = useState<Service[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchServices = async () => {
      try {
        const response = await axios.get('/data/settings.json');
        // Ensure all services have a valid price
        const servicesWithValidPrice = response.data.services.map((service: any) => ({
          ...service,
          price: typeof service.price === 'string' ? parseFloat(service.price) : service.price
        }));
        setServices(servicesWithValidPrice);
        setLoading(false);
      } catch (error) {
        console.error('Failed to fetch services:', error);
        setError('Failed to fetch services');
        setLoading(false);
      }
    };

    fetchServices();
  }, []);

  if (loading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>{error}</div>;
  }

  if (services.length === 0) {
    return <div>No services yet!</div>;
  }

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 p-4">
      {services.map((service, index) => (
        <div key={index} className="card bg-base-100 shadow-xl">
          <figure>
            <img src={service.image} alt={service.title} className="w-full h-48 object-cover" />
          </figure>
          <div className="card-body">
            <h2 className="card-title">{service.title}</h2>
            <p>{service.description}</p>
            <p className="text-lg font-bold">${service.price.toFixed(2)}</p>
          </div>
        </div>
      ))}
    </div>
  );
};

export default Services;

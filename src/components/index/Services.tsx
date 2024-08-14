// "use client";
// import React, { useState, useEffect } from 'react';
// import axios from 'axios';
// import Link from 'next/link';
// import Image from 'next/image';
// import TestTabs from './TestTabs';
// import DynamicTabs from './TestTabs';

// interface Service {
//   id: number;
//   image: string;
//   title: string;
//   description: string;
//   price: number;
// }

// const Services = () => {
//   const [services, setServices] = useState<Service[]>([]);
//   const [loading, setLoading] = useState<boolean>(true);
//   const [error, setError] = useState<string | null>(null);

//   useEffect(() => {
//     const fetchServices = async () => {
//       try {
//         const response = await axios.get('/api/services');
//         setServices(response.data);
//         setLoading(false);
//       } catch (error) {
//         console.error('Failed to fetch services:', error);
//         setError('Failed to fetch services');
//         setLoading(false);
//       }
//     };

//     fetchServices();
//   }, []);

//   if (loading) {
//     return <div>Loading...</div>;
//   }

//   if (error) {
//     return <div>{error}</div>;
//   }

//   if (services.length === 0) {
//     return <div>No services yet!</div>;
//   }

//   return (
//     <div className='content-center bg-base-200 card mx-6 mt-5 md:pt-4 px-6'>

//         <DynamicTabs/>
//     <div className={`content-center grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 bg-base-200 card mx-6 mt-5 md:pt-4 px-6 `}>
//       {services.map((service) => (
//         <div key={service.id} className="mt-6 card card-compact shadow-xl w-auto m-2 bg-base-100">
//           <figure>
//             <div style={{ width: '100%', position: 'relative', paddingBottom: '56.25%' }}>
//               <Image
//                 src={`/uploads/${service.image}`}
//                 alt={service.title}
//                 layout="fill"
//                 objectFit="contain"
//               />
//             </div>
//           </figure>
//           <div className="card-body">
//             <h2 className="card-title">{service.title}</h2>
//             <p>{service.description}</p>
//             <div className="card-actions justify-end">
//               <p className="text-lg font-bold leading-10">${service.price.toFixed(2)}</p>
//               <Link href={`/c/`}>
//                 <button className="btn btn-primary">Order</button>
//               </Link>
//             </div>
//           </div>
//         </div>
//       ))}
//     </div>
//       </div>
//   );
// };

// export default Services;


"use client";
import { useState, useEffect } from 'react';
import axios from 'axios';
import Image from 'next/image';
import Link from 'next/link';

interface Category {
  id: number;
  name: string;
}

interface Service {
  id: number;
  categoryId: number;
  image: string;
  title: string;
  description: string;
  price: number;
  amount: number;
  buyOrSellType:  String
  ShoppyCode: String
  ShoppyCodeNoCrypto: String
}

function ServiceTabs() {
  const [categories, setCategories] = useState<Category[]>([]);
  const [services, setServices] = useState<Service[]>([]);
  const [activeCategory, setActiveCategory] = useState<number | null>(null);

  useEffect(() => {
    axios.get('/api/categories')
      .then(response => {
        setCategories(response.data);
        setActiveCategory(response.data[0]?.id || null);
      })
      .catch(error => console.error('Error fetching categories:', error));

    axios.get('/api/services')
      .then(response => setServices(response.data))
      .catch(error => console.error('Error fetching services:', error));
  }, []);

  const renderServicesForCategory = (categoryId: number) => {
    return services.filter(service => service.categoryId === categoryId).map(service => (
      <div key={service.id} className="mt-6 card card-compact shadow-xl w-auto m-2 bg-base-100">
        <figure>
          <div style={{ width: '100%', position: 'relative', paddingBottom: '56.25%' }}>
            <Image
              src={`/uploads/${service.image}`}
              alt={service.title}
              layout="fill"
              objectFit="contain"
            />
          </div>
        </figure>
        <div className="card-body">
          <h2 className="card-title">{service.title}</h2>
          <p>{service.buyOrSellType}</p>
          <p>{service.ShoppyCode}</p>
          <p>{service.ShoppyCodeNoCrypto}</p>

          <div className="card-actions justify-end">
            
            <p className="text-lg font-bold leading-10">${service.price.toFixed(2)}</p>
            <Link href={`/c/`}>
              <button className="btn btn-primary">Order</button>
            </Link>
          </div>
        </div>
      </div>
    ));
  };

  return (
    <div>
      <div className="tabs tabs-lifted">
        {categories.map(category => (
          <a
            key={category.id}
            className={`tab tab-lifted ${activeCategory === category.id ? 'tab-active' : ''}`}
            onClick={() => setActiveCategory(category.id)}
          >
            {category.name}
          </a>
        ))}
      </div>
      <div className='content-center bg-base-200 card mx-6 mt-5 md:pt-4 px-6'>
        <div className="content-center grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 bg-base-200 card mx-6 mt-5 md:pt-4 px-6">
          {activeCategory && renderServicesForCategory(activeCategory)}
        </div>
      </div>
    </div>
  );
}

export default ServiceTabs;

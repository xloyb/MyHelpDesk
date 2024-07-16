"use client"
import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Link from 'next/link';
import Image from 'next/image';

interface Service {
  image: string;
  title: string;
  description: string;
  price: number; 
}

const Services = () => {
  const [services, setServices] = useState<Service[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchServices = async () => {
      try {
        const response = await axios.get('/data/settings.json');
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
      <div
        className={`content-center grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 `}
      >
        {services.map((service, index) => (
        <div key={index}
      className="mt-6 card card-compact bg-base-100 shadow-xl w-auto m-2" 
    >
      <figure>
        <Image src={service.image} alt={service.title} />
      </figure>
      <div className="card-body">
        <h2 className="card-title">{service.title}</h2>
        <p>{service.description}</p>
        <div className="card-actions justify-end">
        <p className="text-lg font-bold leading-10">${service.price.toFixed(2)}</p>
          <Link href={`/chat/`}>
            <button className="btn btn-primary">Order</button>
          </Link>
        </div>
      </div>
    </div>
))}
</div>
      
      
      
      
      
  
  );
};

export default Services;

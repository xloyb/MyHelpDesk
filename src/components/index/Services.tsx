"use client";
import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Link from 'next/link';
import Image from 'next/image';

interface Service {
  id: number;
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
        const response = await axios.get('/api/services');
        setServices(response.data);
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
    <div className={`content-center grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 bg-base-200 card mx-6 mt-5 md:pt-4 px-6 `}>
      {services.map((service) => (
        <div key={service.id} className="mt-6 card card-compact shadow-xl w-auto m-2 bg-base-100">
          <figure>
            <div style={{ width: '100%', position: 'relative', paddingBottom: '56.25%' }}>
              <Image
                src={service.image}
                alt={service.title}
                layout="fill"
                objectFit="contain"
              />
            </div>
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

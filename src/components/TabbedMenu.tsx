"use client";
import { useState, useEffect } from 'react';
import axios from 'axios';
import Image from 'next/image';

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
      <div key={service.id} className="service-card bg-base-100 border-base-300 rounded-box p-4 mb-4">
        <Image src={service.image} alt={service.title} className="mb-2" width={15} height={15} />
        <h3 className="font-bold">{service.title}</h3>
        <p>{service.description}</p>
        <p className="font-semibold">Price: ${service.price}</p>
        <p>Available: {service.amount}</p>
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
      <div className="bg-base-100 border-base-300 rounded-box p-6 mt-4">
        {activeCategory && renderServicesForCategory(activeCategory)}
      </div>
    </div>
  );
}

export default ServiceTabs;

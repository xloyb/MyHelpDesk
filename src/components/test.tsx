/* eslint-disable @next/next/no-img-element */
"use client"
import React, { useEffect, useState } from 'react';

interface Service {
  id: number;
  image: string;
  title: string;
  description: string;
  price: number;
  categoryId: number;
  amount: number;
  buyOrSellType: string;
}

interface Category {
  id: number;
  name: string;
}

const Test: React.FC = () => {
  const [services, setServices] = useState<Service[]>([]);
  const [categories, setCategories] = useState<Category[]>([]);
  const [activeTab, setActiveTab] = useState<number>(1);

  useEffect(() => {
    // Fetch services and categories from APIs
    const fetchData = async () => {
      try {
        const resServices = await fetch('/api/services');
        const dataServices: Service[] = await resServices.json();
        setServices(dataServices);

        const resCategories = await fetch('/api/categories');
        const dataCategories: Category[] = await resCategories.json();
        setCategories(dataCategories);

        // Set the default active tab to the first category
        if (dataCategories.length > 0) {
          setActiveTab(dataCategories[0].id);
        }
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    };

    fetchData();
  }, []);

  const handleTabClick = (categoryId: number) => {
    setActiveTab(categoryId);
  };

  const filteredServices = services.filter(service => service.categoryId === activeTab);

  return (
    <div>
      <div role="tablist" className="tabs tabs-boxed">
        {categories.map(category => (
          <a
            key={category.id}
            role="tab"
            className={`tab ${activeTab === category.id ? 'tab-active' : ''}`}
            onClick={() => handleTabClick(category.id)}
          >
            {category.name}
          </a>
        ))}
      </div>

      <div className="tab-content">
        {filteredServices.map(service => (
          <div key={service.id} className="service-card">
            <img src={`/images/${service.image}`} alt={service.title} />
            <h3>{service.title}</h3>
            <p>{service.description}</p>
            <p>${service.price.toFixed(2)}</p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Test;

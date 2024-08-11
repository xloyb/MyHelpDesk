import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { FaTrash } from 'react-icons/fa';

type Service = {
  id: number;
  image: string;
  title: string;
  description: string;
  price: number;
};

const Services = () => {
  const [services, setServices] = useState<Service[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchServices = async () => {
      try {
        const response = await axios.get<Service[]>('/api/services');
        setServices(response.data);
      } catch (error) {
        setError('Failed to fetch services');
        console.error('Failed to fetch services:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchServices();
  }, []);

  const handleServiceChange = (index: number, e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    const updatedServices = [...services];
    updatedServices[index] = { ...updatedServices[index], [name]: value };
    setServices(updatedServices);
  };

  const addService = () => {
    setServices([
      ...services,
      { id: Date.now(), image: '', title: '', description: '', price: 0 }
    ]);
  };

  const removeService = (index: number) => {
    const updatedServices = services.filter((_, i) => i !== index);
    setServices(updatedServices);
  };

  const handleSave = async () => {
    try {
      await axios.post('/api/save-services', services);
      alert('Services saved successfully!');
    } catch (error) {
      console.error('Failed to save services:', error);
      alert('Failed to save services');
    }
  };

  if (loading) return <div>Loading...</div>;
  if (error) return <div>{error}</div>;
  if (services.length === 0) return <div>No services available</div>;

  return (
    <div className="bg-base-100 card mx-6 mt-5 md:pt-4 px-6">
      <div className="text-xl font-semibold inline-block">Manage Services</div>

      <div className="divider mt-2"></div>

      {services.map((service, index) => (
        <div
          key={service.id}
          className="mb-4 p-4 grid grid-cols-1 md:grid-cols-2 gap-4 mt-6 card card-compact shadow-xl w-auto m-2 bg-base-100"
        >
          <div>
            <label className="block text-sm font-medium mb-1">Image:</label>
            <input
              name="image"
              value={service.image}
              onChange={(e) => handleServiceChange(index, e)}
              className="input input-bordered w-full mb-2"
            />
          </div>
          <div>
            <label className="block text-sm font-medium mb-1">Title:</label>
            <input
              name="title"
              value={service.title}
              onChange={(e) => handleServiceChange(index, e)}
              className="input input-bordered w-full mb-2"
            />
          </div>
          <div>
            <label className="block text-sm font-medium mb-1">Description:</label>
            <input
              name="description"
              value={service.description}
              onChange={(e) => handleServiceChange(index, e)}
              className="input input-bordered w-full mb-2"
            />
          </div>
          <div>
            <label className="block text-sm font-medium mb-1">Price:</label>
            <input
              name="price"
              type="number"
              value={service.price}
              onChange={(e) => handleServiceChange(index, e)}
              className="input input-bordered w-full mb-2"
            />
          </div>
          <div className="flex items-center justify-end md:justify-start">
            <button onClick={() => removeService(index)} className="btn btn-error">
              <FaTrash className="mr-1" /> Remove
            </button>
          </div>
        </div>
      ))}
      <button onClick={addService} className="btn btn-secondary w-full mb-4">
        Add Service
      </button>

      <button onClick={handleSave} className="btn btn-primary w-full">
        Save Services
      </button>
    </div>
  );
};

export default Services;

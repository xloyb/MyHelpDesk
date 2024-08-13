// // // /* eslint-disable @next/next/no-img-element */

// // // import React, { useState, useEffect } from 'react';
// // // import axios from 'axios';

// // // // Define the interface for a Service
// // // interface Service {
// // //   id?: number;
// // //   image: string;
// // //   title: string;
// // //   description: string;
// // //   price: number;
// // //   categoryId: number;
// // //   amount: number;
// // //   buyOrSellType: 'buy' | 'sell';
// // // }

// // // // Define the interface for a Category
// // // interface Category {
// // //   id: number;
// // //   name: string;
// // // }

// // // const Store = () => {
// // //   const [isCreateModalOpen, setCreateModalOpen] = useState(false);
// // //   const [isEditModalOpen, setEditModalOpen] = useState(false);
// // //   const [selectedService, setSelectedService] = useState<Service | null>(null);
// // //   const [formData, setFormData] = useState<Service>({
// // //     image: '',
// // //     title: '',
// // //     description: '',
// // //     price: 0,
// // //     categoryId: 0,
// // //     amount: 0,
// // //     buyOrSellType: 'buy',
// // //   });
// // //   const [services, setServices] = useState<Service[]>([]);
// // //   const [categories, setCategories] = useState<Category[]>([]);

// // //   useEffect(() => {
// // //     // Fetch services and categories when the component mounts
// // //     axios.get('/api/services')
// // //       .then(response => setServices(response.data))
// // //       .catch(error => console.error('Error fetching services:', error));

// // //     axios.get('/api/categories')
// // //       .then(response => setCategories(response.data))
// // //       .catch(error => console.error('Error fetching categories:', error));
// // //   }, []);

// // //   const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
// // //     const { name, value } = e.target;
// // //     setFormData(prevState => ({
// // //       ...prevState,
// // //       [name]: value,
// // //     }));
// // //   };

// // //   const handleSelectChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
// // //     const { name, value } = e.target;
// // //     setFormData(prevState => ({
// // //       ...prevState,
// // //       [name]: value as any,  // Casting to 'any' as 'buyOrSellType' is a string literal
// // //     }));
// // //   };

// // //   const handleCategoryChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
// // //     const { value } = e.target;
// // //     setFormData(prevState => ({
// // //       ...prevState,
// // //       categoryId: parseInt(value, 10),
// // //     }));
// // //   };

// // //   const handleCreateService = async (e: React.FormEvent) => {
// // //     e.preventDefault();
// // //     try {
// // //       await axios.post('/api/services', {
// // //         ...formData,
// // //         price: parseFloat(formData.price.toString())  // Convert price to a number
// // //       });
// // //       setCreateModalOpen(false);  // Close the modal
// // //       setFormData({
// // //         image: '',
// // //         title: '',
// // //         description: '',
// // //         price: 0,
// // //         categoryId: 0,
// // //         amount: 0,
// // //         buyOrSellType: 'buy',
// // //       });
// // //       // Refresh the list of services
// // //       const response = await axios.get('/api/services');
// // //       setServices(response.data);
// // //     } catch (error) {
// // //       console.error('Error creating service:', error);
// // //     }
// // //   };
  

// // //   const handleEditService = async (e: React.FormEvent) => {
// // //     e.preventDefault();
// // //     if (selectedService) {
// // //       try {
// // //         await axios.put(`/api/services/${selectedService.id}`, {
// // //           ...formData,
// // //           price: parseFloat(formData.price.toString())  // Convert price to a number
// // //         });
// // //         setEditModalOpen(false);  // Close the modal
// // //         setSelectedService(null);
// // //         setFormData({
// // //           image: '',
// // //           title: '',
// // //           description: '',
// // //           price: 0,
// // //           categoryId: 0,
// // //           amount: 0,
// // //           buyOrSellType: 'buy',
// // //         });
// // //         // Refresh the list of services
// // //         const response = await axios.get('/api/services');
// // //         setServices(response.data);
// // //       } catch (error) {
// // //         console.error('Error updating service:', error);
// // //       }
// // //     }
// // //   };
  

// // //   const openEditModal = (service: Service) => {
// // //     setSelectedService(service);
// // //     setFormData(service);
// // //     setEditModalOpen(true);
// // //   };

// // //   const handleDeleteService = async (id: number) => {
// // //     try {
// // //       await axios.delete(`/api/services/${id}`);
// // //       // Refresh the list of services
// // //       const response = await axios.get('/api/services');
// // //       setServices(response.data);
// // //     } catch (error) {
// // //       console.error('Error deleting service:', error);
// // //     }
// // //   };
  

// // //   return (
// // // <div className="bg-base-100 card mx-6 mt-5 md:pt-4 px-6">
// // //     <div className="text-xl font-semibold inline-block">Manage Store </div>
// // //     <div className='stat-desc text-xs'></div>
// // //     <div className="divider mt-2"></div>
// // //   <button className="btn btn-primary" onClick={() => setCreateModalOpen(true)}>
// // //     Create New Service
// // //   </button>

// // //   {/* Create Service Modal */}
// // //   {isCreateModalOpen && (
// // //     <dialog open className="modal modal-bottom sm:modal-middle">
// // //       <div className="modal-box">
// // //         <h3 className="font-bold text-lg">Create New Service</h3>
// // //         <form onSubmit={handleCreateService} className="grid grid-cols-1 sm:grid-cols-2 gap-4">
// // //           <div className="form-control">
// // //             <label className="label">
// // //               <span className="label-text">Image URL</span>
// // //             </label>
// // //             <input type="text" name="image" value={formData.image} onChange={handleInputChange} required className="input input-bordered" />
// // //           </div>
// // //           <div className="form-control">
// // //             <label className="label">
// // //               <span className="label-text">Title</span>
// // //             </label>
// // //             <input type="text" name="title" value={formData.title} onChange={handleInputChange} required className="input input-bordered" />
// // //           </div>
// // //           <div className="form-control sm:col-span-2">
// // //             <label className="label">
// // //               <span className="label-text">Description</span>
// // //             </label>
// // //             <textarea name="description" value={formData.description} onChange={handleInputChange} required className="textarea textarea-bordered"></textarea>
// // //           </div>
// // //           <div className="form-control">
// // //             <label className="label">
// // //               <span className="label-text">Price</span>
// // //             </label>
// // //             <input type="number" name="price" value={formData.price} onChange={handleInputChange} required step="0.01" className="input input-bordered" />
// // //           </div>
// // //           <div className="form-control">
// // //             <label className="label">
// // //               <span className="label-text">Category</span>
// // //             </label>
// // //             <select name="categoryId" value={formData.categoryId} onChange={handleCategoryChange} required className="select select-bordered">
// // //               <option value="">Select a category</option>
// // //               {categories.map(category => (
// // //                 <option key={category.id} value={category.id}>{category.name}</option>
// // //               ))}
// // //             </select>
// // //           </div>
// // //           <div className="form-control">
// // //             <label className="label">
// // //               <span className="label-text">Amount</span>
// // //             </label>
// // //             <input type="number" name="amount" value={formData.amount} onChange={handleInputChange} required className="input input-bordered" />
// // //           </div>
// // //           <div className="form-control">
// // //             <label className="label">
// // //               <span className="label-text">Buy or Sell</span>
// // //             </label>
// // //             <select name="buyOrSellType" value={formData.buyOrSellType} onChange={handleSelectChange} required className="select select-bordered">
// // //               <option value="buy">Buy</option>
// // //               <option value="sell">Sell</option>
// // //             </select>
// // //           </div>
// // //           <div className="modal-action sm:col-span-2">
// // //             <button type="submit" className="btn btn-primary">Save</button>
// // //             <button type="button" className="btn btn-secondary" onClick={() => setCreateModalOpen(false)}>Cancel</button>
// // //           </div>
// // //         </form>
// // //       </div>
// // //     </dialog>
// // //   )}

// // //   {/* Edit Service Modal */}
// // //   {isEditModalOpen && (
// // //     <dialog open className="modal modal-bottom sm:modal-middle">
// // //       <div className="modal-box">
// // //         <h3 className="font-bold text-lg">Edit Service</h3>
// // //         <form onSubmit={handleEditService} className="grid grid-cols-1 sm:grid-cols-2 gap-4">
// // //           {/* Same structure as the Create Service Modal */}
// // //           <div className="form-control">
// // //             <label className="label">
// // //               <span className="label-text">Image URL</span>
// // //             </label>
// // //             <input type="text" name="image" value={formData.image} onChange={handleInputChange} required className="input input-bordered" />
// // //           </div>
// // //           <div className="form-control">
// // //             <label className="label">
// // //               <span className="label-text">Title</span>
// // //             </label>
// // //             <input type="text" name="title" value={formData.title} onChange={handleInputChange} required className="input input-bordered" />
// // //           </div>
// // //           <div className="form-control sm:col-span-2">
// // //             <label className="label">
// // //               <span className="label-text">Description</span>
// // //             </label>
// // //             <textarea name="description" value={formData.description} onChange={handleInputChange} required className="textarea textarea-bordered"></textarea>
// // //           </div>
// // //           <div className="form-control">
// // //             <label className="label">
// // //               <span className="label-text">Price</span>
// // //             </label>
// // //             <input type="number" name="price" value={formData.price} onChange={handleInputChange} required step="0.01" className="input input-bordered" />
// // //           </div>
// // //           <div className="form-control">
// // //             <label className="label">
// // //               <span className="label-text">Category</span>
// // //             </label>
// // //             <select name="categoryId" value={formData.categoryId} onChange={handleCategoryChange} required className="select select-bordered">
// // //               <option value="">Select a category</option>
// // //               {categories.map(category => (
// // //                 <option key={category.id} value={category.id}>{category.name}</option>
// // //               ))}
// // //             </select>
// // //           </div>
// // //           <div className="form-control">
// // //             <label className="label">
// // //               <span className="label-text">Amount</span>
// // //             </label>
// // //             <input type="number" name="amount" value={formData.amount} onChange={handleInputChange} required className="input input-bordered" />
// // //           </div>
// // //           <div className="form-control">
// // //             <label className="label">
// // //               <span className="label-text">Buy or Sell</span>
// // //             </label>
// // //             <select name="buyOrSellType" value={formData.buyOrSellType} onChange={handleSelectChange} required className="select select-bordered">
// // //               <option value="buy">Buy</option>
// // //               <option value="sell">Sell</option>
// // //             </select>
// // //           </div>
// // //           <div className="modal-action sm:col-span-2">
// // //             <button type="submit" className="btn btn-primary">Save</button>
// // //             <button type="button" className="btn btn-secondary" onClick={() => setEditModalOpen(false)}>Cancel</button>
// // //           </div>
// // //         </form>
// // //       </div>
// // //     </dialog>
// // //   )}

// // //   <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4 mt-6">
// // //     {services.map(service => (
// // //       <div key={service.id} className="card bg-base-100 shadow-xl">
// // //         <figure>
// // //           <img src={service.image} alt={service.title} className="w-full h-48 object-cover" />
// // //         </figure>
// // //         <div className="card-body">
// // //           <h2 className="card-title">{service.title}</h2>
// // //           <p>{service.description}</p>
// // //           <p className="text-lg font-bold">${service.price}</p>
// // //           <p className="text-sm text-gray-500">Category: {service.categoryId}</p>
// // //           <p className="text-sm text-gray-500">Amount: {service.amount}</p>
// // //           <p className="text-sm text-gray-500">{service.buyOrSellType === 'buy' ? 'Buying' : 'Selling'}</p>
// // //           <div className="card-actions justify-end">
// // //             <button className="btn btn-primary" onClick={() => openEditModal(service)}>Edit</button>
// // //             <button className="btn btn-error" onClick={() => handleDeleteService(service.id!)}>Delete</button>
// // //           </div>
// // //         </div>
// // //       </div>
// // //     ))}
// // //   </div>
// // // </div>

// // //   );
// // // };

// // // export default Store;




// // /* eslint-disable @next/next/no-img-element */

// // import React, { useState, useEffect } from 'react';
// // import axios from 'axios';

// // // Define the interface for a Service
// // interface Service {
// //   id?: number;
// //   image: string;
// //   title: string;
// //   description: string;
// //   price: number;
// //   categoryId: number;
// //   amount: number;
// //   buyOrSellType: 'buy' | 'sell';
// // }

// // // Define the interface for a Category
// // interface Category {
// //   id: number;
// //   name: string;
// // }

// // const Store = () => {
// //   const [isCreateModalOpen, setCreateModalOpen] = useState(false);
// //   const [isEditModalOpen, setEditModalOpen] = useState(false);
// //   const [selectedService, setSelectedService] = useState<Service | null>(null);
// //   const [formData, setFormData] = useState<Service>({
// //     image: '',
// //     title: '',
// //     description: '',
// //     price: 0,
// //     categoryId: 0,
// //     amount: 0,
// //     buyOrSellType: 'buy',
// //   });
// //   const [services, setServices] = useState<Service[]>([]);
// //   const [categories, setCategories] = useState<Category[]>([]);

// //   useEffect(() => {
// //     // Fetch services and categories when the component mounts
// //     axios.get('/api/services')
// //       .then(response => setServices(response.data))
// //       .catch(error => console.error('Error fetching services:', error));

// //     axios.get('/api/categories')
// //       .then(response => setCategories(response.data))
// //       .catch(error => console.error('Error fetching categories:', error));
// //   }, []);

// //   const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
// //     const { name, value } = e.target;
// //     setFormData(prevState => ({
// //       ...prevState,
// //       [name]: value,
// //     }));
// //   };

// //   const handleSelectChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
// //     const { name, value } = e.target;
// //     setFormData(prevState => ({
// //       ...prevState,
// //       [name]: value as any,  // Casting to 'any' as 'buyOrSellType' is a string literal
// //     }));
// //   };

// //   const handleCategoryChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
// //     const { value } = e.target;
// //     setFormData(prevState => ({
// //       ...prevState,
// //       categoryId: parseInt(value, 10),
// //     }));
// //   };

// //   const handleCreateService = async (e: React.FormEvent) => {
// //     e.preventDefault();
// //     try {
// //       await axios.post('/api/services', {
// //         ...formData,
// //         price: parseFloat(formData.price.toString())  // Convert price to a number
// //       });
// //       setCreateModalOpen(false);  // Close the modal
// //       setFormData({
// //         image: '',
// //         title: '',
// //         description: '',
// //         price: 0,
// //         categoryId: 0,
// //         amount: 0,
// //         buyOrSellType: 'buy',
// //       });
// //       // Refresh the list of services
// //       const response = await axios.get('/api/services');
// //       setServices(response.data);
// //     } catch (error) {
// //       console.error('Error creating service:', error);
// //     }
// //   };
  

// //   const handleEditService = async (e: React.FormEvent) => {
// //     e.preventDefault();
// //     if (selectedService) {
// //       try {
// //         await axios.put(`/api/services/${selectedService.id}`, {
// //           ...formData,
// //           price: parseFloat(formData.price.toString())  // Convert price to a number
// //         });
// //         setEditModalOpen(false);  // Close the modal
// //         setSelectedService(null);
// //         setFormData({
// //           image: '',
// //           title: '',
// //           description: '',
// //           price: 0,
// //           categoryId: 0,
// //           amount: 0,
// //           buyOrSellType: 'buy',
// //         });
// //         // Refresh the list of services
// //         const response = await axios.get('/api/services');
// //         setServices(response.data);
// //       } catch (error) {
// //         console.error('Error updating service:', error);
// //       }
// //     }
// //   };
  

// //   const openEditModal = (service: Service) => {
// //     setSelectedService(service);
// //     setFormData(service);
// //     setEditModalOpen(true);
// //   };

// //   const handleDeleteService = async (id: number) => {
// //     try {
// //       await axios.delete(`/api/services/${id}`);
// //       // Refresh the list of services
// //       const response = await axios.get('/api/services');
// //       setServices(response.data);
// //     } catch (error) {
// //       console.error('Error deleting service:', error);
// //     }
// //   };
  

// //   return (
// // <div className="bg-base-100 card mx-6 mt-5 md:pt-4 px-6">
// //     <div className="text-xl font-semibold inline-block">Manage Store </div>
// //     <div className='stat-desc text-xs'></div>
// //     <div className="divider mt-2"></div>
// //   <button className="btn btn-primary" onClick={() => setCreateModalOpen(true)}>
// //     Create New Service
// //   </button>

// //   {/* Create Service Modal */}
// //   {isCreateModalOpen && (
// //     <dialog open className="modal modal-bottom sm:modal-middle">
// //       <div className="modal-box">
// //         <h3 className="font-bold text-lg">Create New Service</h3>
// //         <form onSubmit={handleCreateService} className="grid grid-cols-1 sm:grid-cols-2 gap-4">
// //           <div className="form-control">
// //             <label className="label">
// //               <span className="label-text">Image URL</span>
// //             </label>
// //             <input type="text" name="image" value={formData.image} onChange={handleInputChange} required className="input input-bordered" />
// //           </div>
// //           <div className="form-control">
// //             <label className="label">
// //               <span className="label-text">Title</span>
// //             </label>
// //             <input type="text" name="title" value={formData.title} onChange={handleInputChange} required className="input input-bordered" />
// //           </div>
// //           <div className="form-control sm:col-span-2">
// //             <label className="label">
// //               <span className="label-text">Description</span>
// //             </label>
// //             <textarea name="description" value={formData.description} onChange={handleInputChange} required className="textarea textarea-bordered"></textarea>
// //           </div>
// //           <div className="form-control">
// //             <label className="label">
// //               <span className="label-text">Price</span>
// //             </label>
// //             <input type="number" name="price" value={formData.price} onChange={handleInputChange} required step="0.01" className="input input-bordered" />
// //           </div>
// //           <div className="form-control">
// //             <label className="label">
// //               <span className="label-text">Category</span>
// //             </label>
// //             <select name="categoryId" value={formData.categoryId} onChange={handleCategoryChange} required className="select select-bordered">
// //               <option value="">Select a category</option>
// //               {categories.map(category => (
// //                 <option key={category.id} value={category.id}>{category.name}</option>
// //               ))}
// //             </select>
// //           </div>
// //           <div className="form-control">
// //             <label className="label">
// //               <span className="label-text">Amount</span>
// //             </label>
// //             <input type="number" name="amount" value={formData.amount} onChange={handleInputChange} required className="input input-bordered" />
// //           </div>
// //           <div className="form-control">
// //             <label className="label">
// //               <span className="label-text">Buy or Sell</span>
// //             </label>
// //             <select name="buyOrSellType" value={formData.buyOrSellType} onChange={handleSelectChange} required className="select select-bordered">
// //               <option value="buy">Buy</option>
// //               <option value="sell">Sell</option>
// //             </select>
// //           </div>
// //           <div className="modal-action sm:col-span-2">
// //             <button type="submit" className="btn btn-primary">Save</button>
// //             <button type="button" className="btn btn-secondary" onClick={() => setCreateModalOpen(false)}>Cancel</button>
// //           </div>
// //         </form>
// //       </div>
// //     </dialog>
// //   )}

// //   {/* Edit Service Modal */}
// //   {isEditModalOpen && (
// //     <dialog open className="modal modal-bottom sm:modal-middle">
// //       <div className="modal-box">
// //         <h3 className="font-bold text-lg">Edit Service</h3>
// //         <form onSubmit={handleEditService} className="grid grid-cols-1 sm:grid-cols-2 gap-4">
// //           {/* Same structure as the Create Service Modal */}
// //           <div className="form-control">
// //             <label className="label">
// //               <span className="label-text">Image URL</span>
// //             </label>
// //             <input type="text" name="image" value={formData.image} onChange={handleInputChange} required className="input input-bordered" />
// //           </div>
// //           <div className="form-control">
// //             <label className="label">
// //               <span className="label-text">Title</span>
// //             </label>
// //             <input type="text" name="title" value={formData.title} onChange={handleInputChange} required className="input input-bordered" />
// //           </div>
// //           <div className="form-control sm:col-span-2">
// //             <label className="label">
// //               <span className="label-text">Description</span>
// //             </label>
// //             <textarea name="description" value={formData.description} onChange={handleInputChange} required className="textarea textarea-bordered"></textarea>
// //           </div>
// //           <div className="form-control">
// //             <label className="label">
// //               <span className="label-text">Price</span>
// //             </label>
// //             <input type="number" name="price" value={formData.price} onChange={handleInputChange} required step="0.01" className="input input-bordered" />
// //           </div>
// //           <div className="form-control">
// //             <label className="label">
// //               <span className="label-text">Category</span>
// //             </label>
// //             <select name="categoryId" value={formData.categoryId} onChange={handleCategoryChange} required className="select select-bordered">
// //               <option value="">Select a category</option>
// //               {categories.map(category => (
// //                 <option key={category.id} value={category.id}>{category.name}</option>
// //               ))}
// //             </select>
// //           </div>
// //           <div className="form-control">
// //             <label className="label">
// //               <span className="label-text">Amount</span>
// //             </label>
// //             <input type="number" name="amount" value={formData.amount} onChange={handleInputChange} required className="input input-bordered" />
// //           </div>
// //           <div className="form-control">
// //             <label className="label">
// //               <span className="label-text">Buy or Sell</span>
// //             </label>
// //             <select name="buyOrSellType" value={formData.buyOrSellType} onChange={handleSelectChange} required className="select select-bordered">
// //               <option value="buy">Buy</option>
// //               <option value="sell">Sell</option>
// //             </select>
// //           </div>
// //           <div className="modal-action sm:col-span-2">
// //             <button type="submit" className="btn btn-primary">Save</button>
// //             <button type="button" className="btn btn-secondary" onClick={() => setEditModalOpen(false)}>Cancel</button>
// //           </div>
// //         </form>
// //       </div>
// //     </dialog>
// //   )}

// //   <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4 mt-6">
// //     {services.map(service => (
// //       <div key={service.id} className="card bg-base-100 shadow-xl">
// //         <figure>
// //           <img src={service.image} alt={service.title} className="w-full h-48 object-cover" />
// //         </figure>
// //         <div className="card-body">
// //           <h2 className="card-title">{service.title}</h2>
// //           <p>{service.description}</p>
// //           <p className="text-lg font-bold">${service.price}</p>
// //           <p className="text-sm text-gray-500">Category: {service.categoryId}</p>
// //           <p className="text-sm text-gray-500">Amount: {service.amount}</p>
// //           <p className="text-sm text-gray-500">{service.buyOrSellType === 'buy' ? 'Buying' : 'Selling'}</p>
// //           <div className="card-actions justify-end">
// //             <button className="btn btn-primary" onClick={() => openEditModal(service)}>Edit</button>
// //             <button className="btn btn-error" onClick={() => handleDeleteService(service.id!)}>Delete</button>
// //           </div>
// //         </div>
// //       </div>
// //     ))}
// //   </div>
// // </div>

// //   );
// // };

// // export default Store;



// // /* eslint-disable @next/next/no-img-element */

// // import React, { useState, useEffect } from 'react';
// // import axios from 'axios';

// // // Define the interface for a Service
// // interface Service {
// //   id?: number;
// //   image: string;
// //   title: string;
// //   description: string;
// //   price: number;
// //   categoryId: number;
// //   amount: number;
// //   buyOrSellType: 'buy' | 'sell';
// // }

// // // Define the interface for a Category
// // interface Category {
// //   id: number;
// //   name: string;
// // }

// // const Store = () => {
// //   const [isCreateModalOpen, setCreateModalOpen] = useState(false);
// //   const [isEditModalOpen, setEditModalOpen] = useState(false);
// //   const [selectedService, setSelectedService] = useState<Service | null>(null);
// //   const [formData, setFormData] = useState<Service>({
// //     image: '',
// //     title: '',
// //     description: '',
// //     price: 0,
// //     categoryId: 0,
// //     amount: 0,
// //     buyOrSellType: 'buy',
// //   });
// //   const [services, setServices] = useState<Service[]>([]);
// //   const [categories, setCategories] = useState<Category[]>([]);

// //   useEffect(() => {
// //     // Fetch services and categories when the component mounts
// //     axios.get('/api/services')
// //       .then(response => setServices(response.data))
// //       .catch(error => console.error('Error fetching services:', error));

// //     axios.get('/api/categories')
// //       .then(response => setCategories(response.data))
// //       .catch(error => console.error('Error fetching categories:', error));
// //   }, []);

// //   const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
// //     const { name, value } = e.target;
// //     setFormData(prevState => ({
// //       ...prevState,
// //       [name]: value,
// //     }));
// //   };

// //   const handleSelectChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
// //     const { name, value } = e.target;
// //     setFormData(prevState => ({
// //       ...prevState,
// //       [name]: value as any,  // Casting to 'any' as 'buyOrSellType' is a string literal
// //     }));
// //   };

// //   const handleCategoryChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
// //     const { value } = e.target;
// //     setFormData(prevState => ({
// //       ...prevState,
// //       categoryId: parseInt(value, 10),
// //     }));
// //   };

// //   const handleCreateService = async (e: React.FormEvent) => {
// //     e.preventDefault();
// //     try {
// //       await axios.post('/api/services', {
// //         ...formData,
// //         price: parseFloat(formData.price.toString())  // Convert price to a number
// //       });
// //       setCreateModalOpen(false);  // Close the modal
// //       setFormData({
// //         image: '',
// //         title: '',
// //         description: '',
// //         price: 0,
// //         categoryId: 0,
// //         amount: 0,
// //         buyOrSellType: 'buy',
// //       });
// //       // Refresh the list of services
// //       const response = await axios.get('/api/services');
// //       setServices(response.data);
// //     } catch (error) {
// //       console.error('Error creating service:', error);
// //     }
// //   };
  

// //   const handleEditService = async (e: React.FormEvent) => {
// //     e.preventDefault();
// //     if (selectedService) {
// //       try {
// //         await axios.put(`/api/services/${selectedService.id}`, {
// //           ...formData,
// //           price: parseFloat(formData.price.toString())  // Convert price to a number
// //         });
// //         setEditModalOpen(false);  // Close the modal
// //         setSelectedService(null);
// //         setFormData({
// //           image: '',
// //           title: '',
// //           description: '',
// //           price: 0,
// //           categoryId: 0,
// //           amount: 0,
// //           buyOrSellType: 'buy',
// //         });
// //         // Refresh the list of services
// //         const response = await axios.get('/api/services');
// //         setServices(response.data);
// //       } catch (error) {
// //         console.error('Error updating service:', error);
// //       }
// //     }
// //   };
  

// //   const openEditModal = (service: Service) => {
// //     setSelectedService(service);
// //     setFormData(service);
// //     setEditModalOpen(true);
// //   };

// //   const handleDeleteService = async (id: number) => {
// //     try {
// //       await axios.delete(`/api/services/${id}`);
// //       // Refresh the list of services
// //       const response = await axios.get('/api/services');
// //       setServices(response.data);
// //     } catch (error) {
// //       console.error('Error deleting service:', error);
// //     }
// //   };
  

// //   return (
// // <div className="bg-base-100 card mx-6 mt-5 md:pt-4 px-6">
// //     <div className="text-xl font-semibold inline-block">Manage Store </div>
// //     <div className='stat-desc text-xs'></div>
// //     <div className="divider mt-2"></div>
// //   <button className="btn btn-primary" onClick={() => setCreateModalOpen(true)}>
// //     Create New Service
// //   </button>

// //   {/* Create Service Modal */}
// //   {isCreateModalOpen && (
// //     <dialog open className="modal modal-bottom sm:modal-middle">
// //       <div className="modal-box">
// //         <h3 className="font-bold text-lg">Create New Service</h3>
// //         <form onSubmit={handleCreateService} className="grid grid-cols-1 sm:grid-cols-2 gap-4">
// //           <div className="form-control">
// //             <label className="label">
// //               <span className="label-text">Image URL</span>
// //             </label>
// //             <input type="text" name="image" value={formData.image} onChange={handleInputChange} required className="input input-bordered" />
// //           </div>
// //           <div className="form-control">
// //             <label className="label">
// //               <span className="label-text">Title</span>
// //             </label>
// //             <input type="text" name="title" value={formData.title} onChange={handleInputChange} required className="input input-bordered" />
// //           </div>
// //           <div className="form-control sm:col-span-2">
// //             <label className="label">
// //               <span className="label-text">Description</span>
// //             </label>
// //             <textarea name="description" value={formData.description} onChange={handleInputChange} required className="textarea textarea-bordered"></textarea>
// //           </div>
// //           <div className="form-control">
// //             <label className="label">
// //               <span className="label-text">Price</span>
// //             </label>
// //             <input type="number" name="price" value={formData.price} onChange={handleInputChange} required step="0.01" className="input input-bordered" />
// //           </div>
// //           <div className="form-control">
// //             <label className="label">
// //               <span className="label-text">Category</span>
// //             </label>
// //             <select name="categoryId" value={formData.categoryId} onChange={handleCategoryChange} required className="select select-bordered">
// //               <option value="">Select a category</option>
// //               {categories.map(category => (
// //                 <option key={category.id} value={category.id}>{category.name}</option>
// //               ))}
// //             </select>
// //           </div>
// //           <div className="form-control">
// //             <label className="label">
// //               <span className="label-text">Amount</span>
// //             </label>
// //             <input type="number" name="amount" value={formData.amount} onChange={handleInputChange} required className="input input-bordered" />
// //           </div>
// //           <div className="form-control">
// //             <label className="label">
// //               <span className="label-text">Buy or Sell</span>
// //             </label>
// //             <select name="buyOrSellType" value={formData.buyOrSellType} onChange={handleSelectChange} required className="select select-bordered">
// //               <option value="buy">Buy</option>
// //               <option value="sell">Sell</option>
// //             </select>
// //           </div>
// //           <div className="modal-action sm:col-span-2">
// //             <button type="submit" className="btn btn-primary">Save</button>
// //             <button type="button" className="btn btn-secondary" onClick={() => setCreateModalOpen(false)}>Cancel</button>
// //           </div>
// //         </form>
// //       </div>
// //     </dialog>
// //   )}

// //   {/* Edit Service Modal */}
// //   {isEditModalOpen && (
// //     <dialog open className="modal modal-bottom sm:modal-middle">
// //       <div className="modal-box">
// //         <h3 className="font-bold text-lg">Edit Service</h3>
// //         <form onSubmit={handleEditService} className="grid grid-cols-1 sm:grid-cols-2 gap-4">
// //           {/* Same structure as the Create Service Modal */}
// //           <div className="form-control">
// //             <label className="label">
// //               <span className="label-text">Image URL</span>
// //             </label>
// //             <input type="text" name="image" value={formData.image} onChange={handleInputChange} required className="input input-bordered" />
// //           </div>
// //           <div className="form-control">
// //             <label className="label">
// //               <span className="label-text">Title</span>
// //             </label>
// //             <input type="text" name="title" value={formData.title} onChange={handleInputChange} required className="input input-bordered" />
// //           </div>
// //           <div className="form-control sm:col-span-2">
// //             <label className="label">
// //               <span className="label-text">Description</span>
// //             </label>
// //             <textarea name="description" value={formData.description} onChange={handleInputChange} required className="textarea textarea-bordered"></textarea>
// //           </div>
// //           <div className="form-control">
// //             <label className="label">
// //               <span className="label-text">Price</span>
// //             </label>
// //             <input type="number" name="price" value={formData.price} onChange={handleInputChange} required step="0.01" className="input input-bordered" />
// //           </div>
// //           <div className="form-control">
// //             <label className="label">
// //               <span className="label-text">Category</span>
// //             </label>
// //             <select name="categoryId" value={formData.categoryId} onChange={handleCategoryChange} required className="select select-bordered">
// //               <option value="">Select a category</option>
// //               {categories.map(category => (
// //                 <option key={category.id} value={category.id}>{category.name}</option>
// //               ))}
// //             </select>
// //           </div>
// //           <div className="form-control">
// //             <label className="label">
// //               <span className="label-text">Amount</span>
// //             </label>
// //             <input type="number" name="amount" value={formData.amount} onChange={handleInputChange} required className="input input-bordered" />
// //           </div>
// //           <div className="form-control">
// //             <label className="label">
// //               <span className="label-text">Buy or Sell</span>
// //             </label>
// //             <select name="buyOrSellType" value={formData.buyOrSellType} onChange={handleSelectChange} required className="select select-bordered">
// //               <option value="buy">Buy</option>
// //               <option value="sell">Sell</option>
// //             </select>
// //           </div>
// //           <div className="modal-action sm:col-span-2">
// //             <button type="submit" className="btn btn-primary">Save</button>
// //             <button type="button" className="btn btn-secondary" onClick={() => setEditModalOpen(false)}>Cancel</button>
// //           </div>
// //         </form>
// //       </div>
// //     </dialog>
// //   )}

// //   <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4 mt-6">
// //     {services.map(service => (
// //       <div key={service.id} className="card bg-base-100 shadow-xl">
// //         <figure>
// //           <img src={service.image} alt={service.title} className="w-full h-48 object-cover" />
// //         </figure>
// //         <div className="card-body">
// //           <h2 className="card-title">{service.title}</h2>
// //           <p>{service.description}</p>
// //           <p className="text-lg font-bold">${service.price}</p>
// //           <p className="text-sm text-gray-500">Category: {service.categoryId}</p>
// //           <p className="text-sm text-gray-500">Amount: {service.amount}</p>
// //           <p className="text-sm text-gray-500">{service.buyOrSellType === 'buy' ? 'Buying' : 'Selling'}</p>
// //           <div className="card-actions justify-end">
// //             <button className="btn btn-primary" onClick={() => openEditModal(service)}>Edit</button>
// //             <button className="btn btn-error" onClick={() => handleDeleteService(service.id!)}>Delete</button>
// //           </div>
// //         </div>
// //       </div>
// //     ))}
// //   </div>
// // </div>

// //   );
// // };

// // export default Store;




// /* eslint-disable @next/next/no-img-element */

// import React, { useState, useEffect } from 'react';
// import axios from 'axios';

// // Define the interface for a Service
// interface Service {
//   id?: number;
//   image: string;
//   title: string;
//   description: string;
//   price: number;
//   categoryId: number;
//   amount: number;
//   buyOrSellType: 'buy' | 'sell';
// }

// // Define the interface for a Category
// interface Category {
//   id: number;
//   name: string;
// }

// const Store = () => {
//   const [isCreateModalOpen, setCreateModalOpen] = useState(false);
//   const [isEditModalOpen, setEditModalOpen] = useState(false);
//   const [selectedService, setSelectedService] = useState<Service | null>(null);
//   const [formData, setFormData] = useState<Service>({
//     image: '',
//     title: '',
//     description: '',
//     price: 0,
//     categoryId: 0,
//     amount: 0,
//     buyOrSellType: 'buy',
//   });
//   const [services, setServices] = useState<Service[]>([]);
//   const [categories, setCategories] = useState<Category[]>([]);

//   useEffect(() => {
//     // Fetch services and categories when the component mounts
//     axios.get('/api/services')
//       .then(response => setServices(response.data))
//       .catch(error => console.error('Error fetching services:', error));

//     axios.get('/api/categories')
//       .then(response => setCategories(response.data))
//       .catch(error => console.error('Error fetching categories:', error));
//   }, []);

//   const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
//     const { name, value } = e.target;
//     setFormData(prevState => ({
//       ...prevState,
//       [name]: value,
//     }));
//   };

//   const handleSelectChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
//     const { name, value } = e.target;
//     setFormData(prevState => ({
//       ...prevState,
//       [name]: value as any,  // Casting to 'any' as 'buyOrSellType' is a string literal
//     }));
//   };

//   const handleCategoryChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
//     const { value } = e.target;
//     setFormData(prevState => ({
//       ...prevState,
//       categoryId: parseInt(value, 10),
//     }));
//   };

//   const handleCreateService = async (e: React.FormEvent) => {
//     e.preventDefault();
//     try {
//       await axios.post('/api/services', {
//         ...formData,
//         price: parseFloat(formData.price.toString())  // Convert price to a number
//       });
//       setCreateModalOpen(false);  // Close the modal
//       setFormData({
//         image: '',
//         title: '',
//         description: '',
//         price: 0,
//         categoryId: 0,
//         amount: 0,
//         buyOrSellType: 'buy',
//       });
//       // Refresh the list of services
//       const response = await axios.get('/api/services');
//       setServices(response.data);
//     } catch (error) {
//       console.error('Error creating service:', error);
//     }
//   };
  

//   const handleEditService = async (e: React.FormEvent) => {
//     e.preventDefault();
//     if (selectedService) {
//       try {
//         await axios.put(`/api/services/${selectedService.id}`, {
//           ...formData,
//           price: parseFloat(formData.price.toString())  // Convert price to a number
//         });
//         setEditModalOpen(false);  // Close the modal
//         setSelectedService(null);
//         setFormData({
//           image: '',
//           title: '',
//           description: '',
//           price: 0,
//           categoryId: 0,
//           amount: 0,
//           buyOrSellType: 'buy',
//         });
//         // Refresh the list of services
//         const response = await axios.get('/api/services');
//         setServices(response.data);
//       } catch (error) {
//         console.error('Error updating service:', error);
//       }
//     }
//   };
  

//   const openEditModal = (service: Service) => {
//     setSelectedService(service);
//     setFormData(service);
//     setEditModalOpen(true);
//   };

//   const handleDeleteService = async (id: number) => {
//     try {
//       await axios.delete(`/api/services/${id}`);
//       // Refresh the list of services
//       const response = await axios.get('/api/services');
//       setServices(response.data);
//     } catch (error) {
//       console.error('Error deleting service:', error);
//     }
//   };
  

//   return (
// <div className="bg-base-100 card mx-6 mt-5 md:pt-4 px-6">
//     <div className="text-xl font-semibold inline-block">Manage Store </div>
//     <div className='stat-desc text-xs'></div>
//     <div className="divider mt-2"></div>
//   <button className="btn btn-primary" onClick={() => setCreateModalOpen(true)}>
//     Create New Service
//   </button>

//   {/* Create Service Modal */}
//   {isCreateModalOpen && (
//     <dialog open className="modal modal-bottom sm:modal-middle">
//       <div className="modal-box">
//         <h3 className="font-bold text-lg">Create New Service</h3>
//         <form onSubmit={handleCreateService} className="grid grid-cols-1 sm:grid-cols-2 gap-4">
//           <div className="form-control">
//             <label className="label">
//               <span className="label-text">Image URL</span>
//             </label>
//             <input type="text" name="image" value={formData.image} onChange={handleInputChange} required className="input input-bordered" />
//           </div>
//           <div className="form-control">
//             <label className="label">
//               <span className="label-text">Title</span>
//             </label>
//             <input type="text" name="title" value={formData.title} onChange={handleInputChange} required className="input input-bordered" />
//           </div>
//           <div className="form-control sm:col-span-2">
//             <label className="label">
//               <span className="label-text">Description</span>
//             </label>
//             <textarea name="description" value={formData.description} onChange={handleInputChange} required className="textarea textarea-bordered"></textarea>
//           </div>
//           <div className="form-control">
//             <label className="label">
//               <span className="label-text">Price</span>
//             </label>
//             <input type="number" name="price" value={formData.price} onChange={handleInputChange} required step="0.01" className="input input-bordered" />
//           </div>
//           <div className="form-control">
//             <label className="label">
//               <span className="label-text">Category</span>
//             </label>
//             <select name="categoryId" value={formData.categoryId} onChange={handleCategoryChange} required className="select select-bordered">
//               <option value="">Select a category</option>
//               {categories.map(category => (
//                 <option key={category.id} value={category.id}>{category.name}</option>
//               ))}
//             </select>
//           </div>
//           <div className="form-control">
//             <label className="label">
//               <span className="label-text">Amount</span>
//             </label>
//             <input type="number" name="amount" value={formData.amount} onChange={handleInputChange} required className="input input-bordered" />
//           </div>
//           <div className="form-control">
//             <label className="label">
//               <span className="label-text">Buy or Sell</span>
//             </label>
//             <select name="buyOrSellType" value={formData.buyOrSellType} onChange={handleSelectChange} required className="select select-bordered">
//               <option value="buy">Buy</option>
//               <option value="sell">Sell</option>
//             </select>
//           </div>
//           <div className="modal-action sm:col-span-2">
//             <button type="submit" className="btn btn-primary">Save</button>
//             <button type="button" className="btn btn-secondary" onClick={() => setCreateModalOpen(false)}>Cancel</button>
//           </div>
//         </form>
//       </div>
//     </dialog>
//   )}

//   {/* Edit Service Modal */}
//   {isEditModalOpen && (
//     <dialog open className="modal modal-bottom sm:modal-middle">
//       <div className="modal-box">
//         <h3 className="font-bold text-lg">Edit Service</h3>
//         <form onSubmit={handleEditService} className="grid grid-cols-1 sm:grid-cols-2 gap-4">
//           {/* Same structure as the Create Service Modal */}
//           <div className="form-control">
//             <label className="label">
//               <span className="label-text">Image URL</span>
//             </label>
//             <input type="text" name="image" value={formData.image} onChange={handleInputChange} required className="input input-bordered" />
//           </div>
//           <div className="form-control">
//             <label className="label">
//               <span className="label-text">Title</span>
//             </label>
//             <input type="text" name="title" value={formData.title} onChange={handleInputChange} required className="input input-bordered" />
//           </div>
//           <div className="form-control sm:col-span-2">
//             <label className="label">
//               <span className="label-text">Description</span>
//             </label>
//             <textarea name="description" value={formData.description} onChange={handleInputChange} required className="textarea textarea-bordered"></textarea>
//           </div>
//           <div className="form-control">
//             <label className="label">
//               <span className="label-text">Price</span>
//             </label>
//             <input type="number" name="price" value={formData.price} onChange={handleInputChange} required step="0.01" className="input input-bordered" />
//           </div>
//           <div className="form-control">
//             <label className="label">
//               <span className="label-text">Category</span>
//             </label>
//             <select name="categoryId" value={formData.categoryId} onChange={handleCategoryChange} required className="select select-bordered">
//               <option value="">Select a category</option>
//               {categories.map(category => (
//                 <option key={category.id} value={category.id}>{category.name}</option>
//               ))}
//             </select>
//           </div>
//           <div className="form-control">
//             <label className="label">
//               <span className="label-text">Amount</span>
//             </label>
//             <input type="number" name="amount" value={formData.amount} onChange={handleInputChange} required className="input input-bordered" />
//           </div>
//           <div className="form-control">
//             <label className="label">
//               <span className="label-text">Buy or Sell</span>
//             </label>
//             <select name="buyOrSellType" value={formData.buyOrSellType} onChange={handleSelectChange} required className="select select-bordered">
//               <option value="buy">Buy</option>
//               <option value="sell">Sell</option>
//             </select>
//           </div>
//           <div className="modal-action sm:col-span-2">
//             <button type="submit" className="btn btn-primary">Save</button>
//             <button type="button" className="btn btn-secondary" onClick={() => setEditModalOpen(false)}>Cancel</button>
//           </div>
//         </form>
//       </div>
//     </dialog>
//   )}

//   <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4 mt-6">
//     {services.map(service => (
//       <div key={service.id} className="card bg-base-100 shadow-xl">
//         <figure>
//           <img src={service.image} alt={service.title} className="w-full h-48 object-cover" />
//         </figure>
//         <div className="card-body">
//           <h2 className="card-title">{service.title}</h2>
//           <p>{service.description}</p>
//           <p className="text-lg font-bold">${service.price}</p>
//           <p className="text-sm text-gray-500">Category: {service.categoryId}</p>
//           <p className="text-sm text-gray-500">Amount: {service.amount}</p>
//           <p className="text-sm text-gray-500">{service.buyOrSellType === 'buy' ? 'Buying' : 'Selling'}</p>
//           <div className="card-actions justify-end">
//             <button className="btn btn-primary" onClick={() => openEditModal(service)}>Edit</button>
//             <button className="btn btn-error" onClick={() => handleDeleteService(service.id!)}>Delete</button>
//           </div>
//         </div>
//       </div>
//     ))}
//   </div>
// </div>

//   );
// };

// export default Store;




// /* eslint-disable @next/next/no-img-element */

// import React, { useState, useEffect } from 'react';
// import axios from 'axios';

// // Define the interface for a Service
// interface Service {
//   id?: number;
//   image: string;
//   title: string;
//   description: string;
//   price: number;
//   categoryId: number;
//   amount: number;
//   buyOrSellType: 'buy' | 'sell';
// }

// // Define the interface for a Category
// interface Category {
//   id: number;
//   name: string;
// }

// const Store = () => {
//   const [isCreateModalOpen, setCreateModalOpen] = useState(false);
//   const [isEditModalOpen, setEditModalOpen] = useState(false);
//   const [selectedService, setSelectedService] = useState<Service | null>(null);
//   const [formData, setFormData] = useState<Service>({
//     image: '',
//     title: '',
//     description: '',
//     price: 0,
//     categoryId: 0,
//     amount: 0,
//     buyOrSellType: 'buy',
//   });
//   const [services, setServices] = useState<Service[]>([]);
//   const [categories, setCategories] = useState<Category[]>([]);

//   useEffect(() => {
//     // Fetch services and categories when the component mounts
//     axios.get('/api/services')
//       .then(response => setServices(response.data))
//       .catch(error => console.error('Error fetching services:', error));

//     axios.get('/api/categories')
//       .then(response => setCategories(response.data))
//       .catch(error => console.error('Error fetching categories:', error));
//   }, []);

//   const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
//     const { name, value } = e.target;
//     setFormData(prevState => ({
//       ...prevState,
//       [name]: value,
//     }));
//   };

//   const handleSelectChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
//     const { name, value } = e.target;
//     setFormData(prevState => ({
//       ...prevState,
//       [name]: value as any,  // Casting to 'any' as 'buyOrSellType' is a string literal
//     }));
//   };

//   const handleCategoryChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
//     const { value } = e.target;
//     setFormData(prevState => ({
//       ...prevState,
//       categoryId: parseInt(value, 10),
//     }));
//   };

//   const handleCreateService = async (e: React.FormEvent) => {
//     e.preventDefault();
//     try {
//       await axios.post('/api/services', {
//         ...formData,
//         price: parseFloat(formData.price.toString())  // Convert price to a number
//       });
//       setCreateModalOpen(false);  // Close the modal
//       setFormData({
//         image: '',
//         title: '',
//         description: '',
//         price: 0,
//         categoryId: 0,
//         amount: 0,
//         buyOrSellType: 'buy',
//       });
//       // Refresh the list of services
//       const response = await axios.get('/api/services');
//       setServices(response.data);
//     } catch (error) {
//       console.error('Error creating service:', error);
//     }
//   };
  

//   const handleEditService = async (e: React.FormEvent) => {
//     e.preventDefault();
//     if (selectedService) {
//       try {
//         await axios.put(`/api/services/${selectedService.id}`, {
//           ...formData,
//           price: parseFloat(formData.price.toString())  // Convert price to a number
//         });
//         setEditModalOpen(false);  // Close the modal
//         setSelectedService(null);
//         setFormData({
//           image: '',
//           title: '',
//           description: '',
//           price: 0,
//           categoryId: 0,
//           amount: 0,
//           buyOrSellType: 'buy',
//         });
//         // Refresh the list of services
//         const response = await axios.get('/api/services');
//         setServices(response.data);
//       } catch (error) {
//         console.error('Error updating service:', error);
//       }
//     }
//   };
  

//   const openEditModal = (service: Service) => {
//     setSelectedService(service);
//     setFormData(service);
//     setEditModalOpen(true);
//   };

//   const handleDeleteService = async (id: number) => {
//     try {
//       await axios.delete(`/api/services/${id}`);
//       // Refresh the list of services
//       const response = await axios.get('/api/services');
//       setServices(response.data);
//     } catch (error) {
//       console.error('Error deleting service:', error);
//     }
//   };
  

//   return (
// <div className="bg-base-100 card mx-6 mt-5 md:pt-4 px-6">
//     <div className="text-xl font-semibold inline-block">Manage Store </div>
//     <div className='stat-desc text-xs'></div>
//     <div className="divider mt-2"></div>
//   <button className="btn btn-primary" onClick={() => setCreateModalOpen(true)}>
//     Create New Service
//   </button>

//   {/* Create Service Modal */}
//   {isCreateModalOpen && (
//     <dialog open className="modal modal-bottom sm:modal-middle">
//       <div className="modal-box">
//         <h3 className="font-bold text-lg">Create New Service</h3>
//         <form onSubmit={handleCreateService} className="grid grid-cols-1 sm:grid-cols-2 gap-4">
//           <div className="form-control">
//             <label className="label">
//               <span className="label-text">Image URL</span>
//             </label>
//             <input type="text" name="image" value={formData.image} onChange={handleInputChange} required className="input input-bordered" />
//           </div>
//           <div className="form-control">
//             <label className="label">
//               <span className="label-text">Title</span>
//             </label>
//             <input type="text" name="title" value={formData.title} onChange={handleInputChange} required className="input input-bordered" />
//           </div>
//           <div className="form-control sm:col-span-2">
//             <label className="label">
//               <span className="label-text">Description</span>
//             </label>
//             <textarea name="description" value={formData.description} onChange={handleInputChange} required className="textarea textarea-bordered"></textarea>
//           </div>
//           <div className="form-control">
//             <label className="label">
//               <span className="label-text">Price</span>
//             </label>
//             <input type="number" name="price" value={formData.price} onChange={handleInputChange} required step="0.01" className="input input-bordered" />
//           </div>
//           <div className="form-control">
//             <label className="label">
//               <span className="label-text">Category</span>
//             </label>
//             <select name="categoryId" value={formData.categoryId} onChange={handleCategoryChange} required className="select select-bordered">
//               <option value="">Select a category</option>
//               {categories.map(category => (
//                 <option key={category.id} value={category.id}>{category.name}</option>
//               ))}
//             </select>
//           </div>
//           <div className="form-control">
//             <label className="label">
//               <span className="label-text">Amount</span>
//             </label>
//             <input type="number" name="amount" value={formData.amount} onChange={handleInputChange} required className="input input-bordered" />
//           </div>
//           <div className="form-control">
//             <label className="label">
//               <span className="label-text">Buy or Sell</span>
//             </label>
//             <select name="buyOrSellType" value={formData.buyOrSellType} onChange={handleSelectChange} required className="select select-bordered">
//               <option value="buy">Buy</option>
//               <option value="sell">Sell</option>
//             </select>
//           </div>
//           <div className="modal-action sm:col-span-2">
//             <button type="submit" className="btn btn-primary">Save</button>
//             <button type="button" className="btn btn-secondary" onClick={() => setCreateModalOpen(false)}>Cancel</button>
//           </div>
//         </form>
//       </div>
//     </dialog>
//   )}

//   {/* Edit Service Modal */}
//   {isEditModalOpen && (
//     <dialog open className="modal modal-bottom sm:modal-middle">
//       <div className="modal-box">
//         <h3 className="font-bold text-lg">Edit Service</h3>
//         <form onSubmit={handleEditService} className="grid grid-cols-1 sm:grid-cols-2 gap-4">
//           {/* Same structure as the Create Service Modal */}
//           <div className="form-control">
//             <label className="label">
//               <span className="label-text">Image URL</span>
//             </label>
//             <input type="text" name="image" value={formData.image} onChange={handleInputChange} required className="input input-bordered" />
//           </div>
//           <div className="form-control">
//             <label className="label">
//               <span className="label-text">Title</span>
//             </label>
//             <input type="text" name="title" value={formData.title} onChange={handleInputChange} required className="input input-bordered" />
//           </div>
//           <div className="form-control sm:col-span-2">
//             <label className="label">
//               <span className="label-text">Description</span>
//             </label>
//             <textarea name="description" value={formData.description} onChange={handleInputChange} required className="textarea textarea-bordered"></textarea>
//           </div>
//           <div className="form-control">
//             <label className="label">
//               <span className="label-text">Price</span>
//             </label>
//             <input type="number" name="price" value={formData.price} onChange={handleInputChange} required step="0.01" className="input input-bordered" />
//           </div>
//           <div className="form-control">
//             <label className="label">
//               <span className="label-text">Category</span>
//             </label>
//             <select name="categoryId" value={formData.categoryId} onChange={handleCategoryChange} required className="select select-bordered">
//               <option value="">Select a category</option>
//               {categories.map(category => (
//                 <option key={category.id} value={category.id}>{category.name}</option>
//               ))}
//             </select>
//           </div>
//           <div className="form-control">
//             <label className="label">
//               <span className="label-text">Amount</span>
//             </label>
//             <input type="number" name="amount" value={formData.amount} onChange={handleInputChange} required className="input input-bordered" />
//           </div>
//           <div className="form-control">
//             <label className="label">
//               <span className="label-text">Buy or Sell</span>
//             </label>
//             <select name="buyOrSellType" value={formData.buyOrSellType} onChange={handleSelectChange} required className="select select-bordered">
//               <option value="buy">Buy</option>
//               <option value="sell">Sell</option>
//             </select>
//           </div>
//           <div className="modal-action sm:col-span-2">
//             <button type="submit" className="btn btn-primary">Save</button>
//             <button type="button" className="btn btn-secondary" onClick={() => setEditModalOpen(false)}>Cancel</button>
//           </div>
//         </form>
//       </div>
//     </dialog>
//   )}

//   <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4 mt-6">
//     {services.map(service => (
//       <div key={service.id} className="card bg-base-100 shadow-xl">
//         <figure>
//           <img src={service.image} alt={service.title} className="w-full h-48 object-cover" />
//         </figure>
//         <div className="card-body">
//           <h2 className="card-title">{service.title}</h2>
//           <p>{service.description}</p>
//           <p className="text-lg font-bold">${service.price}</p>
//           <p className="text-sm text-gray-500">Category: {service.categoryId}</p>
//           <p className="text-sm text-gray-500">Amount: {service.amount}</p>
//           <p className="text-sm text-gray-500">{service.buyOrSellType === 'buy' ? 'Buying' : 'Selling'}</p>
//           <div className="card-actions justify-end">
//             <button className="btn btn-primary" onClick={() => openEditModal(service)}>Edit</button>
//             <button className="btn btn-error" onClick={() => handleDeleteService(service.id!)}>Delete</button>
//           </div>
//         </div>
//       </div>
//     ))}
//   </div>
// </div>

//   );
// };

// export default Store;




/* eslint-disable @next/next/no-img-element */

import React, { useState, useEffect } from 'react';
import axios from 'axios';

// Define the interface for a Service
interface Service {
  id?: number;
  image: string;
  title: string;
  description: string;
  price: number;
  categoryId: number;
  amount: number;
  buyOrSellType: 'buy' | 'sell';
  ShoppyCode: string;
}

// Define the interface for a Category
interface Category {
  id: number;
  name: string;
}

const Store = () => {
  const [isCreateModalOpen, setCreateModalOpen] = useState(false);
  const [isEditModalOpen, setEditModalOpen] = useState(false);
  const [selectedService, setSelectedService] = useState<Service | null>(null);
  const [imageFile, setImageFile] = useState<File | null>(null);
  const [imageFileName, setImageFileName] = useState<string | undefined>(undefined);


  const [formData, setFormData] = useState<Service>({
    image: '',
    title: '',
    description: '',
    price: 0,
    categoryId: 0,
    amount: 0,
    buyOrSellType: 'buy',
    ShoppyCode: '',
  });
  const [services, setServices] = useState<Service[]>([]);
  const [categories, setCategories] = useState<Category[]>([]);

  useEffect(() => {
    axios.get('/api/services')
      .then(response => setServices(response.data))
      .catch(error => console.error('Error fetching services:', error));

    axios.get('/api/categories')
      .then(response => setCategories(response.data))
      .catch(error => console.error('Error fetching categories:', error));
  }, []);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData(prevState => ({
      ...prevState,
      [name]: value,
    }));
  };


  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      setImageFile(file);
      setFormData(prevState => ({
        ...prevState,
        image: file.name,
      }));
    }
  };

  const handleSelectChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData(prevState => ({
      ...prevState,
      [name]: value as any,  
    }));
  };

  const handleCategoryChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const { value } = e.target;
    setFormData(prevState => ({
      ...prevState,
      categoryId: parseInt(value, 10),
    }));
  };

  const uploadImage = async (file: File) => {
    const formData = new FormData();
    formData.append('file', file);
    console.log('Uploading file:', file.name); 
    const response = await axios.post('/api/upload', formData, {
      headers: {
        'Content-Type': 'multipart/form-data',
      },
    });
    console.log('Upload response:', response.data); 
    console.log('File name:', response.data.filename)
    return response.data.filename; 
  };
  
  
  const handleCreateService = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      let imageFileName = formData.image;
      if (imageFile) {
        imageFileName = await uploadImage(imageFile);
      }
      await axios.post('/api/services', {
        ...formData,
        image: imageFileName,
        price: parseFloat(formData.price.toString())
      });
      setCreateModalOpen(false);
      setFormData({
        image: '',
        title: '',
        description: '',
        price: 0,
        categoryId: 0,
        amount: 0,
        buyOrSellType: 'buy',
        ShoppyCode:'',
        
      });
      const response = await axios.get('/api/services');
      setServices(response.data);
    } catch (error) {
      console.error('Error creating service:', error);
    }
  };
  
  const handleEditService = async (e: React.FormEvent) => {
    e.preventDefault();
    if (selectedService) {
      try {
        let imageFileName = selectedService.image;
        if (imageFile) {
          imageFileName = await uploadImage(imageFile);
          console.log('New image file name:', imageFileName);
        }
  
        const updatedService = {
          ...formData,
          image: imageFileName,
        };
  
        console.log('Updating service with data:', updatedService);
  
        await axios.put(`/api/services/${selectedService.id}`, updatedService);
  
        setEditModalOpen(false);
        setSelectedService(null);
        setFormData({
          image: '',
          title: '',
          description: '',
          price: 0,
          categoryId: 0,
          amount: 0,
          buyOrSellType: 'buy',
          ShoppyCode:'',
        });
  
        const response = await axios.get('/api/services');
        setServices(response.data);
      } catch (error) {
        console.error('Error updating service:', error);
      }
    }
  };



  const openEditModal = (service: Service) => {
    setSelectedService(service);
    setFormData(service);
    setEditModalOpen(true);
  };

  const handleDeleteService = async (id: number) => {
    try {
      await axios.delete(`/api/services/${id}`);
      const response = await axios.get('/api/services');
      setServices(response.data);
    } catch (error) {
      console.error('Error deleting service:', error);
    }
  };
  

  return (
<div className="bg-base-100 card mx-6 mt-5 md:pt-4 px-6">
    <div className="text-xl font-semibold inline-block">Manage Store </div>
    <div className='stat-desc text-xs'></div>
    <div className="divider mt-2"></div>
  <button className="btn btn-primary" onClick={() => setCreateModalOpen(true)}>
    Create New Service
  </button>

  {/* Create Service Modal */}
  {isCreateModalOpen && (
    <dialog open className="modal modal-bottom sm:modal-middle">
      <div className="modal-box">
        <h3 className="font-bold text-lg">Create New Service</h3>
        <form onSubmit={handleCreateService} className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <div className="form-control">
          <label className="label">
    <span className="label-text">Image Upload</span>
  </label>
  <input type="file" onChange={handleFileChange} className="input input-bordered" />          </div>
          <div className="form-control">
            <label className="label">
              <span className="label-text">Title</span>
            </label>
            <input type="text" name="title" value={formData.title} onChange={handleInputChange} required className="input input-bordered" />
          </div>
          <div className="form-control sm:col-span-2">
            <label className="label">
              <span className="label-text">Description</span>
            </label>
            <textarea name="description" value={formData.description} onChange={handleInputChange} required className="textarea textarea-bordered"></textarea>
          </div>
          <div className="form-control">
            <label className="label">
              <span className="label-text">Price</span>
            </label>
            <input type="number" name="price" value={formData.price} onChange={handleInputChange} required step="0.01" className="input input-bordered" />
          </div>
          <div className="form-control">
            <label className="label">
              <span className="label-text">Category</span>
            </label>
            <select name="categoryId" value={formData.categoryId} onChange={handleCategoryChange} required className="select select-bordered">
              <option value="">Select a category</option>
              {categories.map(category => (
                <option key={category.id} value={category.id}>{category.name}</option>
              ))}
            </select>
          </div>
          <div className="form-control">
            <label className="label">
              <span className="label-text">Amount</span>
            </label>
            <input type="number" name="amount" value={formData.amount} onChange={handleInputChange} required className="input input-bordered" />
          </div>
          <div className="form-control">
            <label className="label">
              <span className="label-text">Buy or Sell</span>
            </label>
            <select name="buyOrSellType" value={formData.buyOrSellType} onChange={handleSelectChange} required className="select select-bordered">
              <option value="buy">Buy</option>
              <option value="sell">Sell</option>
            </select>
          </div>
        
          <div className="form-control">
            <label className="label">
              <span className="label-text">Shoppy Code</span>
            </label>
            <input type="text" name="ShoppyCode" value={formData.ShoppyCode} onChange={handleInputChange} required className="input input-bordered" />
          </div>
          
          <div className="modal-action sm:col-span-2">
            <button type="submit" className="btn btn-primary">Save</button>
            <button type="button" className="btn btn-secondary" onClick={() => setCreateModalOpen(false)}>Cancel</button>
          </div>
        </form>
      </div>
    </dialog>
  )}

  {/* Edit Service Modal */}
  {isEditModalOpen && (
    <dialog open className="modal modal-bottom sm:modal-middle">
      <div className="modal-box">
        <h3 className="font-bold text-lg">Edit Service</h3>
        <form onSubmit={handleEditService} className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          {/* Same structure as the Create Service Modal */}
          <div className="form-control">
          <label className="label">
    <span className="label-text">Image Upload</span>
  </label>
  <input type="file" onChange={handleFileChange} className="input input-bordered" />        </div>
          <div className="form-control">
            <label className="label">
              <span className="label-text">Title</span>
            </label>
            <input type="text" name="title" value={formData.title} onChange={handleInputChange} required className="input input-bordered" />
          </div>
          <div className="form-control sm:col-span-2">
            <label className="label">
              <span className="label-text">Description</span>
            </label>
            <textarea name="description" value={formData.description} onChange={handleInputChange} required className="textarea textarea-bordered"></textarea>
          </div>
          <div className="form-control">
            <label className="label">
              <span className="label-text">Price</span>
            </label>
            <input type="number" name="price" value={formData.price} onChange={handleInputChange} required step="0.01" className="input input-bordered" />
          </div>
          <div className="form-control">
            <label className="label">
              <span className="label-text">Category</span>
            </label>
            <select name="categoryId" value={formData.categoryId} onChange={handleCategoryChange} required className="select select-bordered">
              <option value="">Select a category</option>
              {categories.map(category => (
                <option key={category.id} value={category.id}>{category.name}</option>
              ))}
            </select>
          </div>
          <div className="form-control">
            <label className="label">
              <span className="label-text">Amount</span>
            </label>
            <input type="number" name="amount" value={formData.amount} onChange={handleInputChange} required className="input input-bordered" />
          </div>
          <div className="form-control">
            <label className="label">
              <span className="label-text">Buy or Sell</span>
            </label>
            <select name="buyOrSellType" value={formData.buyOrSellType} onChange={handleSelectChange} required className="select select-bordered">
              <option value="buy">Buy</option>
              <option value="sell">Sell</option>
            </select>
          </div>

          <div className="form-control">
            <label className="label">
              <span className="label-text">Shoppy Code</span>
            </label>
            <input type="text" name="ShoppyCode" value={formData.ShoppyCode} onChange={handleInputChange} required className="input input-bordered" />
          </div>


          <div className="modal-action sm:col-span-2">
            <button type="submit" className="btn btn-primary">Save</button>
            <button type="button" className="btn btn-secondary" onClick={() => setEditModalOpen(false)}>Cancel</button>
          </div>
        </form>
      </div>
    </dialog>
  )}

  <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4 mt-6">
    {services.map(service => (
      <div key={service.id} className="card bg-base-100 shadow-xl">
        <figure>
          <img src={`/uploads/${service.image}`} alt={service.title} className="w-full h-48 object-cover" />
        </figure>
        <div className="card-body">
          <h2 className="card-title">{service.title}</h2>
          <p>{service.description}</p>
          <p className="text-lg font-bold">${service.price}</p>
          <p className="text-sm text-gray-500">Category: {service.categoryId}</p>
          <p className="text-sm text-gray-500">Amount: {service.amount}</p>
          <p className="text-sm text-gray-500">ShoppyCode: {service.ShoppyCode}</p>
          <p className="text-sm text-gray-500">{service.buyOrSellType === 'buy' ? 'Buying' : 'Selling'}</p>
          <div className="card-actions justify-end">
            <button className="btn btn-primary" onClick={() => openEditModal(service)}>Edit</button>
            <button className="btn btn-error" onClick={() => handleDeleteService(service.id!)}>Delete</button>
          </div>
        </div>
      </div>
    ))}
  </div>
</div>

  );
};

export default Store;

// import React, { useState, useEffect } from 'react';
// import axios from 'axios';

// // Define the Service type
// type Service = {
//   image: string;
//   title: string;
//   description: string;
//   price: number;
// };

// // Define the Settings type
// type SettingsType = {
//   sitename: string;
//   announcement: string;
//   offer: string;
//   logo: string;
//   theme: string;
//   services: Service[];
// };

// const Settings = () => {
//   const [settings, setSettings] = useState<SettingsType>({
//     sitename: '',
//     announcement: '',
//     offer: '',
//     logo: '',
//     theme: '',
//     services: [],
//   });

//   useEffect(() => {
//     const fetchSettings = async () => {
//       try {
//         const response = await axios.get('/data/settings.json');
//         setSettings(response.data);
//       } catch (error) {
//         console.error('Failed to fetch settings:', error);
//       }
//     };

//     fetchSettings();
//   }, []);

//   const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
//     const { name, value } = e.target;
//     setSettings((prevSettings) => ({
//       ...prevSettings,
//       [name]: value,
//     }));
//   };

//   const handleServiceChange = (index: number, e: React.ChangeEvent<HTMLInputElement>) => {
//     const { name, value } = e.target;
//     const updatedServices = [...settings.services];
//     updatedServices[index] = { ...updatedServices[index], [name]: value };
//     setSettings((prevSettings) => ({
//       ...prevSettings,
//       services: updatedServices,
//     }));
//   };

//   const addService = () => {
//     setSettings((prevSettings) => ({
//       ...prevSettings,
//       services: [...prevSettings.services, { image: '', title: '', description: '', price: 0 }],
//     }));
//   };

//   const removeService = (index: number) => {
//     const updatedServices = settings.services.filter((_, i) => i !== index);
//     setSettings((prevSettings) => ({
//       ...prevSettings,
//       services: updatedServices,
//     }));
//   };

//   const handleSave = async () => {
//     try {
//       await axios.post('/api/save-settings', settings);
//       alert('Settings saved successfully!');
//     } catch (error) {
//       console.error('Failed to save settings:', error);
//       alert('Failed to save settings');
//     }
//   };

//   return (
//     <div className="bg-base-100 card mx-6 mt-5 md:pt-4 px-6">
//       <div className="text-xl font-semibold inline-block">Manage Settings </div>

//       <div className="divider mt-2"></div>
//       <div className="mb-4">
//         <label className="block text-sm font-medium mb-2">Sitename:</label>
//         <input 
//           name="sitename" 
//           value={settings.sitename} 
//           onChange={handleChange} 
//           className="input input-bordered w-full" 
//         />
//       </div>
//       <div className="mb-4">
//         <label className="block text-sm font-medium mb-2">Announcement:</label>
//         <input 
//           name="announcement" 
//           value={settings.announcement} 
//           onChange={handleChange} 
//           className="input input-bordered w-full" 
//         />
//       </div>
//       <div className="mb-4">
//         <label className="block text-sm font-medium mb-2">Offer:</label>
//         <input 
//           name="offer" 
//           value={settings.offer} 
//           onChange={handleChange} 
//           className="input input-bordered w-full" 
//         />
//       </div>
//       <div className="mb-4">
//         <label className="block text-sm font-medium mb-2">Logo:</label>
//         <input 
//           name="logo" 
//           value={settings.logo} 
//           onChange={handleChange} 
//           className="input input-bordered w-full" 
//         />
//       </div>
//       <div className="mb-4">
//         <label className="block text-sm font-medium mb-2">Theme:</label>
//         <input 
//           name="theme" 
//           value={settings.theme} 
//           onChange={handleChange} 
//           className="input input-bordered w-full" 
//         />
//       </div>
//       <div className="mb-4">
//         <h2 className="text-xl font-bold mb-2">Services:</h2>
//         {settings.services.map((service, index) => (
//           <div key={index} className="mb-4 p-2 border rounded">
//             <label className="block text-sm font-medium mb-1">Image:</label>
//             <input
//               name="image"
//               value={service.image}
//               onChange={(e) => handleServiceChange(index, e)}
//               className="input input-bordered w-full mb-2"
//             />
//             <label className="block text-sm font-medium mb-1">Title:</label>
//             <input
//               name="title"
//               value={service.title}
//               onChange={(e) => handleServiceChange(index, e)}
//               className="input input-bordered w-full mb-2"
//             />
//             <label className="block text-sm font-medium mb-1">Description:</label>
//             <input
//               name="description"
//               value={service.description}
//               onChange={(e) => handleServiceChange(index, e)}
//               className="input input-bordered w-full mb-2"
//             />
//             <label className="block text-sm font-medium mb-1">Price:</label>
//             <input
//               name="price"
//               type="number"
//               value={service.price}
//               onChange={(e) => handleServiceChange(index, e)}
//               className="input input-bordered w-full mb-2"
//             />
//             <button
//               onClick={() => removeService(index)}
//               className="btn btn-error w-full"
//             >
//               Remove Service
//             </button>
//           </div>
//         ))}
//         <button
//           onClick={addService}
//           className="btn btn-secondary w-full mb-4"
//         >
//           Add Service
//         </button>
//       </div>
//       <button 
//         onClick={handleSave} 
//         className="btn btn-primary w-full"
//       >
//         Save Settings
//       </button>
//     </div>
//   );
// };

// export default Settings;
// import React, { useState, useEffect } from 'react';
// import axios from 'axios';
// import { FaTrash } from 'react-icons/fa';

// type Service = {
//   image: string;
//   title: string;
//   description: string;
//   price: number;
// };

// type SettingsType = {
//   sitename: string;
//   announcement: string;
//   offer: string;
//   logo: string;
//   theme: string;
//   services: Service[];
// };

// const Settings = () => {
//   const [settings, setSettings] = useState<SettingsType>({
//     sitename: '',
//     announcement: '',
//     offer: '',
//     logo: '',
//     theme: '',
//     services: [],
//   });

//   useEffect(() => {
//     const fetchSettings = async () => {
//       try {
//         const response = await axios.get('/data/settings.json');
//         setSettings(response.data);
//       } catch (error) {
//         console.error('Failed to fetch settings:', error);
//       }
//     };

//     fetchSettings();
//   }, []);

//   const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
//     const { name, value } = e.target;
//     setSettings((prevSettings) => ({
//       ...prevSettings,
//       [name]: value,
//     }));
//   };

//   const handleServiceChange = (index: number, e: React.ChangeEvent<HTMLInputElement>) => {
//     const { name, value } = e.target;
//     const updatedServices = [...settings.services];
//     updatedServices[index] = { ...updatedServices[index], [name]: value };
//     setSettings((prevSettings) => ({
//       ...prevSettings,
//       services: updatedServices,
//     }));
//   };

//   const addService = () => {
//     setSettings((prevSettings) => ({
//       ...prevSettings,
//       services: [...prevSettings.services, { image: '', title: '', description: '', price: 0 }],
//     }));
//   };

//   const removeService = (index: number) => {
//     const updatedServices = settings.services.filter((_, i) => i !== index);
//     setSettings((prevSettings) => ({
//       ...prevSettings,
//       services: updatedServices,
//     }));
//   };

//   const handleSave = async () => {
//     try {
//       await axios.post('/api/save-settings', settings);
//       alert('Settings saved successfully!');
//     } catch (error) {
//       console.error('Failed to save settings:', error);
//       alert('Failed to save settings');
//     }
//   };

//   return (
//     <div className="bg-base-100 card mx-6 mt-5 md:pt-4 px-6">
//     <div className="text-xl font-semibold inline-block">Manage Settings </div>

//     <div className="divider mt-2"></div>
      

//       <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
//         <div className="mb-4">
//           <label className="block text-sm font-medium mb-2">Sitename:</label>
//           <input 
//             name="sitename" 
//             value={settings.sitename} 
//             onChange={handleChange} 
//             className="input input-bordered w-full" 
//           />
//         </div>
//         <div className="mb-4">
//           <label className="block text-sm font-medium mb-2">Announcement:</label>
//           <input 
//             name="announcement" 
//             value={settings.announcement} 
//             onChange={handleChange} 
//             className="input input-bordered w-full" 
//           />
//         </div>
//         <div className="mb-4">
//           <label className="block text-sm font-medium mb-2">Offer:</label>
//           <input 
//             name="offer" 
//             value={settings.offer} 
//             onChange={handleChange} 
//             className="input input-bordered w-full" 
//           />
//         </div>
//         <div className="mb-4">
//           <label className="block text-sm font-medium mb-2">Logo:</label>
//           <input 
//             name="logo" 
//             value={settings.logo} 
//             onChange={handleChange} 
//             className="input input-bordered w-full" 
//           />
//         </div>
//         <div className="mb-4">
//           <label className="block text-sm font-medium mb-2">Theme:</label>
//           <input 
//             name="theme" 
//             value={settings.theme} 
//             onChange={handleChange} 
//             className="input input-bordered w-full" 
//           />
//         </div>
//         <div className="mb-4">
//           <label className="block text-sm font-medium mb-2">Enable / Disable Discord Logs</label>
//                 <input type="checkbox" className="toggle toggle-primary"  />
//         </div>
//       </div>

//       <div className="bg-base-100 card mx-6 mt-5 md:pt-4 px-6">
//       <div className="text-xl font-semibold inline-block">Services List </div>

//       <div className="divider mt-2"></div>
//         {settings.services.map((service, index) => (
//           <div key={index} className="mb-4 p-4 grid grid-cols-1 md:grid-cols-2 gap-4 mt-6 card card-compact shadow-xl w-auto m-2 bg-base-100">
//             <div>
//               <label className="block text-sm font-medium mb-1">Image:</label>
//               <input
//                 name="image"
//                 value={service.image}
//                 onChange={(e) => handleServiceChange(index, e)}
//                 className="input input-bordered w-full mb-2"
//               />
//             </div>
//             <div>
//               <label className="block text-sm font-medium mb-1">Title:</label>
//               <input
//                 name="title"
//                 value={service.title}
//                 onChange={(e) => handleServiceChange(index, e)}
//                 className="input input-bordered w-full mb-2"
//               />
//             </div>
//             <div>
//               <label className="block text-sm font-medium mb-1">Description:</label>
//               <input
//                 name="description"
//                 value={service.description}
//                 onChange={(e) => handleServiceChange(index, e)}
//                 className="input input-bordered w-full mb-2"
//               />
//             </div>
//             <div>
//               <label className="block text-sm font-medium mb-1">Price:</label>
//               <input
//                 name="price"
//                 type="number"
//                 value={service.price}
//                 onChange={(e) => handleServiceChange(index, e)}
//                 className="input input-bordered w-full mb-2"
//               />
//             </div>
//             <div className="flex items-center justify-end md:justify-start">
//               <button
//                 onClick={() => removeService(index)}
//                 className="btn btn-error"
//               >
//                 <FaTrash className="mr-1" /> Remove
//               </button>
//             </div>
//           </div>
//         ))}
//         <button
//           onClick={addService}
//           className="btn btn-secondary w-full mb-4"
//         >
//           Add Service
//         </button>
//       </div>

//       <button 
//         onClick={handleSave} 
//         className="btn btn-primary w-full"
//       >
//         Save Settings
//       </button>
//     </div>
//   );
// };

// export default Settings;


import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { FaTrash } from 'react-icons/fa';

type Service = {
  image: string;
  title: string;
  description: string;
  price: number;
};

type SettingsType = {
  sitename: string;
  announcement: string;
  offer: string;
  logo: string;
  theme: string;
  services: Service[];
  discordLogs: boolean; // New setting for Discord Logs
};

const Settings = () => {
  const [settings, setSettings] = useState<SettingsType>({
    sitename: '',
    announcement: '',
    offer: '',
    logo: '',
    theme: '',
    services: [],
    discordLogs: false, // Initialize discordLogs as false
  });

  useEffect(() => {
    const fetchSettings = async () => {
      try {
        const response = await axios.get('/data/settings.json');
        setSettings(response.data);
      } catch (error) {
        console.error('Failed to fetch settings:', error);
      }
    };

    fetchSettings();
  }, []);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value, type, checked } = e.target;
    const val = type === 'checkbox' ? checked : value;
    setSettings((prevSettings) => ({
      ...prevSettings,
      [name]: val,
    }));
  };

  const handleServiceChange = (index: number, e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    const updatedServices = [...settings.services];
    updatedServices[index] = { ...updatedServices[index], [name]: value };
    setSettings((prevSettings) => ({
      ...prevSettings,
      services: updatedServices,
    }));
  };

  const addService = () => {
    setSettings((prevSettings) => ({
      ...prevSettings,
      services: [...prevSettings.services, { image: '', title: '', description: '', price: 0 }],
    }));
  };

  const removeService = (index: number) => {
    const updatedServices = settings.services.filter((_, i) => i !== index);
    setSettings((prevSettings) => ({
      ...prevSettings,
      services: updatedServices,
    }));
  };

  const handleSave = async () => {
    try {
      await axios.post('/api/save-settings', settings);
      alert('Settings saved successfully!');
    } catch (error) {
      console.error('Failed to save settings:', error);
      alert('Failed to save settings');
    }
  };

  return (
    <div className="bg-base-100 card mx-6 mt-5 md:pt-4 px-6">
      <div className="text-xl font-semibold inline-block">Manage Settings</div>

      <div className="divider mt-2"></div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div className="mb-4">
          <label className="block text-sm font-medium mb-2">Sitename:</label>
          <input
            name="sitename"
            value={settings.sitename}
            onChange={handleChange}
            className="input input-bordered w-full"
          />
        </div>
        <div className="mb-4">
          <label className="block text-sm font-medium mb-2">Announcement:</label>
          <input
            name="announcement"
            value={settings.announcement}
            onChange={handleChange}
            className="input input-bordered w-full"
          />
        </div>
        <div className="mb-4">
          <label className="block text-sm font-medium mb-2">Offer:</label>
          <input
            name="offer"
            value={settings.offer}
            onChange={handleChange}
            className="input input-bordered w-full"
          />
        </div>
        <div className="mb-4">
          <label className="block text-sm font-medium mb-2">Logo:</label>
          <input
            name="logo"
            value={settings.logo}
            onChange={handleChange}
            className="input input-bordered w-full"
          />
        </div>
        <div className="mb-4">
          <label className="block text-sm font-medium mb-2">Theme:</label>
          <input
            name="theme"
            value={settings.theme}
            onChange={handleChange}
            className="input input-bordered w-full"
          />
        </div>
        <div className="mb-4">
          <label className="block text-sm font-medium mb-2">
            Enable / Disable Discord Logs
          </label>
          <input
            type="checkbox"
            name="discordLogs"
            checked={settings.discordLogs}
            onChange={handleChange}
            className="toggle toggle-primary"
          />
        </div>
      </div>

      <div className="bg-base-100 card mx-6 mt-5 md:pt-4 px-6">
        <div className="text-xl font-semibold inline-block">Services List</div>

        <div className="divider mt-2"></div>
        {settings.services.map((service, index) => (
          <div
            key={index}
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
      </div>

      <button onClick={handleSave} className="btn btn-primary w-full">
        Save Settings
      </button>
    </div>
  );
};

export default Settings;


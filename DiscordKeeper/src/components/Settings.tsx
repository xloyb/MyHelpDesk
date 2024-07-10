import React, { useState, useEffect } from 'react';
import axios from 'axios';

const Settings = () => {
  const [settings, setSettings] = useState({
    sitename: '',
    announcement: '',
    offer: '',
    logo: '',
    theme: ''
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
    const { name, value } = e.target;
    setSettings((prevSettings) => ({
      ...prevSettings,
      [name]: value,
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
    <div className="p-4 max-w-lg mx-auto">
      <h1 className="text-2xl font-bold mb-4">Settings</h1>
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
      <button 
        onClick={handleSave} 
        className="btn btn-primary w-full"
      >
        Save Settings
      </button>
    </div>
  );
};

export default Settings;

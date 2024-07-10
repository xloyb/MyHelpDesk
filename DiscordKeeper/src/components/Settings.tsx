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
    <div>
      <h1>Settings</h1>
      <div>
        <label>Sitename:</label>
        <input name="sitename" value={settings.sitename} onChange={handleChange} />
      </div>
      <div>
        <label>Announcement:</label>
        <input name="announcement" value={settings.announcement} onChange={handleChange} />
      </div>
      <div>
        <label>Offer:</label>
        <input name="offer" value={settings.offer} onChange={handleChange} />
      </div>
      <div>
        <label>Logo:</label>
        <input name="logo" value={settings.logo} onChange={handleChange} />
      </div>
      <div>
        <label>Theme:</label>
        <input name="theme" value={settings.theme} onChange={handleChange} />
      </div>
      <button onClick={handleSave}>Save Settings</button>
    </div>
  );
};

export default Settings;

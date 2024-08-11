import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { saveSettings } from '@/lib/settings';

type SettingsType = {
  sitename: string;
  announcement: string;
  offer: string;
  logo: string;
  theme: string;
  discordLogs: boolean; // New setting for Discord Logs
};

const Settings = () => {
  const [settings, setSettings] = useState<SettingsType | null>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchSettings = async () => {
      try {
        const response = await axios.get('/api/settings');
        setSettings(response.data);
      } catch (error) {
        setError('Failed to fetch settings');
        console.error('Failed to fetch settings:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchSettings();
  }, []);

  const handleSave = async () => {
    try {
      const response = await axios.post('/api/settings', settings);
      console.log(response.data.message);
      alert(response.data.message);

    } catch (error) {
      setError('Failed to save settings');
      console.error('Failed to save settings:', error);
    }
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value, type, checked } = e.target;
    const val = type === 'checkbox' ? checked : value;
    setSettings(prevSettings => prevSettings ? {
      ...prevSettings,
      [name]: val,
    } : null);
  };

  if (loading) return <div>Loading...</div>;
  if (error) return <div>{error}</div>;
  if (!settings) return <div>No settings available</div>;

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
            disabled
          />
        </div>
        <div className="mb-4">
          <label className="block text-sm font-medium mb-2">Enable / Disable Discord Logs</label>
          <input
            type="checkbox"
            name="discordLogs"
            checked={settings.discordLogs}
            onChange={handleChange}
            className="toggle toggle-primary"
          />
        </div>
      </div>

      <button onClick={handleSave} className="btn btn-primary w-full">
        Save Settings
      </button>
    </div>
  );
};

export default Settings;

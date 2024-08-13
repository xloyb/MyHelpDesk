"use client"
import { useEffect, useState } from 'react';

async function fetchCountry() {
  const response = await fetch('/api/getCountry');
  const data = await response.json();
  return data.country_code;
}

async function checkCountryEnabled(countryCode: string) {
  const response = await fetch(`/api/countries/checkcountrystatus?country_code=${countryCode}`);
  const data = await response.json();
  return data.isEnabled;
}

export default function CheckCountryStatus() {
  const [status, setStatus] = useState<{ country_code: string; isEnabled: boolean } | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    async function fetchAndCheckCountry() {
      try {
        const countryCode = await fetchCountry();
        const isEnabled = await checkCountryEnabled(countryCode);
        setStatus({ country_code: countryCode, isEnabled });
      } catch (error) {
        setError('Failed to fetch country status');
      } finally {
        setLoading(false);
      }
    }

    fetchAndCheckCountry();
  }, []);

  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error: {error}</p>;

  return (
    <div>
      <p>Country Code: {status?.country_code}</p>
      <p>Status Enabled: {status?.isEnabled ? 'Yes' : 'No'}</p>
    </div>
  );
}


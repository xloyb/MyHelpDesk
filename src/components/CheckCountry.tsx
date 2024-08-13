"use client"
import React, { useEffect, useState } from 'react';

interface CountryData {
  country_name: string;
  country_code: string;
  [key: string]: any; 
}

const CheckCountry = () => {
  const [countryData, setCountryData] = useState<CountryData | null>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    async function fetchCountry() {
      try {
        const response = await fetch('/api/getCountry');
        const data = await response.json();

        if (response.ok) {
          setCountryData(data);
        } else {
          setError(data.error || 'Failed to fetch country data.');
        }
      } catch (error) {
        setError('Failed to fetch country.');
      } finally {
        setLoading(false);
      }
    }

    fetchCountry();
  }, []);

  return (
    <div>
      {loading ? (
        <p>Loading...</p>
      ) : error ? (
        <p>Error: {error}</p>
      ) : (
        countryData && (
          <div>
            <h1>Your Country: {countryData.country_name} ({countryData.country_code})</h1>
            {/* Render other data from the countryData object if needed */}
            <pre>{JSON.stringify(countryData, null, 2)}</pre>
          </div>
        )
      )}
    </div>
  );
};

export default CheckCountry;

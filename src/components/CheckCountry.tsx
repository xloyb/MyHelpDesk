"use client"
import { useEffect, useState } from 'react';

interface CountryData {
  country_name: string;
  country_code: string;
}

const CheckCountry = () => {
  const [country, setCountry] = useState<CountryData | null>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    async function fetchCountry() {
      try {
        const response = await fetch('/api/getCountry');
        const data: CountryData | { error: string } = await response.json();

        if (response.ok) {
          setCountry(data as CountryData);
        } else {
          setError((data as { error: string }).error || 'Failed to fetch country');
        }
      } catch (error) {
        setError('Failed to fetch country.');
      } finally {
        setLoading(false);
      }
    }

    fetchCountry();
  }, []);

  if (loading) {
    return <p>Loading...</p>;
  }

  if (error) {
    return <p>Error: {error}</p>;
  }

  return (
    <div>
      {country ? (
        <h1>Your Country: {country.country_name} ({country.country_code})</h1>
      ) : (
        <p>No country data available.</p>
      )}
    </div>
  );
};

export default CheckCountry;

/* eslint-disable @next/next/no-img-element */
'use client';
import React, { useState, useEffect, ChangeEvent } from 'react';
import axios from 'axios';
import Link from 'next/link';

interface Crypto {
  id: string;
  name: string;
  symbol: string;
  current_price: number;
  market_cap: number;
  price_change_percentage_1h_in_currency: number;
  price_change_percentage_24h_in_currency: number;
  price_change_percentage_7d_in_currency: number;
  image: string;
}

interface settings {
  sitename: string ;
  logo: string;
  discordLogs: boolean; 
  exchangeSystem:  boolean | null;
  storeSystem:  boolean;
  ticketSystem:  boolean;
}

const CryptoTracker: React.FC = () => {
  const [data, setData] = useState<Crypto[]>([]);
  const [searchQuery, setSearchQuery] = useState('');
  const [Settings, setSettings] = useState<settings | null>(null);


  useEffect(() => {

    const FetchSiteSettings = async () => {
      try {
        const response = await fetch('/api/settings');
        const data: settings = await response.json();
        setSettings(data);
      } catch (error) {
        console.error("Failed to fetch Site Settings:", error);

      }
    };
    FetchSiteSettings()

    

    const fetchData = async () => {
      try {
        const response = await axios.get(
          'https://api.coingecko.com/api/v3/coins/markets?vs_currency=inr&order=market_cap_desc&per_page=100&page=1&sparkline=false&price_change_percentage=1h%2C24h%2C7d'
        );
        setData(response.data);
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    };
    fetchData();
  }, []);

  const handleSearchChange = (event: ChangeEvent<HTMLInputElement>) => {
    setSearchQuery(event.target.value);
  };

  const filteredData = data.filter((crypto) => {
    return crypto.name.toLowerCase().includes(searchQuery.toLowerCase());
  });


  if(!Settings?.exchangeSystem){
    return null;
  }


  return (
    <>
<div className="bg-base-100 card mx-6 mt-5 md:pt-4 px-6">
      <div className="text-xl font-semibold inline-block">MyDevify.com Live Crypto Prices </div>

      <div className="divider mt-2"></div>
        <input
          type="text"
          placeholder="Search crypto name"
          className="input input-bordered w-full mb-4"
          value={searchQuery}
          onChange={handleSearchChange}
        />
        <div className="overflow-x-auto">
          <table className="table w-full">
            <thead>
              <tr>
                <th>Name</th>
                <th>Symbol</th>
                <th>Price</th>
                <th>Market Cap</th>
                <th>1h change</th>
                <th>24h change</th>
                <th>7D Change</th>
              </tr>
            </thead>
            <tbody>
              {filteredData.map((crypto) => (
                <tr key={crypto.id}>
                  <td>
                    <div className="flex items-center space-x-3">
                      <img
                        src={crypto.image}
                        alt={crypto.name}
                        className="w-8 h-8 rounded-full"
                      />
                      <Link href={`/c/crypto/${crypto.id}`}>
                        <span className="link link-hover">{crypto.name}</span>
                      </Link>
                    </div>
                  </td>
                  <td>{crypto.symbol.toUpperCase()}</td>
                  <td>$ {crypto.current_price.toFixed(2)}</td>
                  <td>$ {crypto.market_cap.toLocaleString('en-US')}</td>
                  <td className={crypto.price_change_percentage_1h_in_currency < 0 ? 'text-red-600' : 'text-green-600'}>
                    {crypto.price_change_percentage_1h_in_currency.toFixed(2)}%
                  </td>
                  <td className={crypto.price_change_percentage_24h_in_currency < 0 ? 'text-red-600' : 'text-green-600'}>
                    {crypto.price_change_percentage_24h_in_currency.toFixed(2)}%
                  </td>
                  <td className={crypto.price_change_percentage_7d_in_currency < 0 ? 'text-red-600' : 'text-green-600'}>
                    {crypto.price_change_percentage_7d_in_currency.toFixed(2)}%
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </>
  );
};

export default CryptoTracker;

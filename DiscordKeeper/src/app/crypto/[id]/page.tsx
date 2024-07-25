"use client"
import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useRouter } from 'next/router';

interface CryptoData {
  id: string;
  name: string;
  symbol: string;
  market_cap_rank: number;
  market_data: {
    market_cap: { inr: number };
    current_price: { inr: number };
    total_supply: number;
    market_cap_change_percentage_24h: number;
    high_24h: { inr: number };
    low_24h: { inr: number };
    total_volume: { inr: number };
    circulating_supply: number;
  };
  description: { en: string };
  image: { small: string };
}

const CryptoDetails: React.FC = () => {
  const router = useRouter();
  const { id } = router.query;
  const [cryptoData, setCryptoData] = useState<CryptoData | null>(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(
          `https://api.coingecko.com/api/v3/coins/${id}`
        );
        setCryptoData(response.data);
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    };
    if (id) {
      fetchData();
    }
  }, [id]);

  if (!cryptoData) {
    return <div className="container mx-auto p-4">Loading...</div>;
  }

  // Extract description up to the first period (.)
  const description = cryptoData.description.en.split('.')[0];

  return (
    <>
      <div className="container mx-auto mt-5 flex justify-center">
        <div className="card shadow-lg">
          <figure>
            <img src={cryptoData.image.small} alt={cryptoData.name} className="w-48 h-48" />
          </figure>
          <div className="card-body">
            <h1 className="card-title text-2xl font-bold">{cryptoData.name}</h1>
            <p className="card-text text-lg">{description}</p>
            <p className="card-text">
              <b>Symbol:</b> {cryptoData.symbol.toUpperCase()}
            </p>
            <p className="card-text">
              <b>Rank:</b> {cryptoData.market_cap_rank}
            </p>
            <p className="card-text">
              <b>Market Cap:</b> ₹{cryptoData.market_data.market_cap.inr.toLocaleString('en-US')}
            </p>
            <p className="card-text">
              <b>Current Price:</b> ₹{cryptoData.market_data.current_price.inr.toFixed(2)}
            </p>
            <p className="card-text">
              <b>Total Supply:</b> {cryptoData.market_data.total_supply.toLocaleString('en-US')}
            </p>
            <p className="card-text">
              <b>Market Cap Change (24h):</b> {cryptoData.market_data.market_cap_change_percentage_24h.toFixed(2)}%
            </p>
            <p className="card-text">
              <b>High (24h):</b> ₹{cryptoData.market_data.high_24h.inr.toFixed(2)}
            </p>
            <p className="card-text">
              <b>Low (24h):</b> ₹{cryptoData.market_data.low_24h.inr.toFixed(2)}
            </p>
            <p className="card-text">
              <b>Total Volume (24h):</b> ₹{cryptoData.market_data.total_volume.inr.toLocaleString('en-US')}
            </p>
            <p className="card-text">
              <b>Circulating Supply:</b> {cryptoData.market_data.circulating_supply.toLocaleString('en-US')}
            </p>
          </div>
        </div>
      </div>
    </>
  );
};

export default CryptoDetails;

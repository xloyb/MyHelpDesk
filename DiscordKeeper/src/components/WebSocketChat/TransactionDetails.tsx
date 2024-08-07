import React, { useEffect, useState } from 'react';
import axios from 'axios';

interface Transaction {
  txid: string;
  version: number;
  locktime: number;
  size: number;
  weight: number;
  fee: number;
  vin: Array<any>; 
  vout: Array<any>; 
  status: {
    confirmed: boolean;
    block_height?: number;
    block_hash?: string;
  };
}

interface TransactionDetailsProps {
  txid: string;
}

const TransactionDetails: React.FC<TransactionDetailsProps> = ({ txid }) => {
  const [transaction, setTransaction] = useState<Transaction | null>(null);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchTransaction = async () => {
      try {
        const response = await axios.get(`https://btcscan.org/api/tx/${txid}`);
        setTransaction(response.data);
      } catch (err) {
        setError('Failed to fetch transaction data');
      }
    };

    fetchTransaction();
  }, [txid]);

  if (error) {
    return <div>Error: {error}</div>;
  }

  if (!transaction) {
    return <div>Loading...</div>;
  }

  return (
    <div>
      <h1>Transaction Details</h1>
      <p><strong>Transaction ID:</strong> {transaction.txid}</p>
      <p><strong>Version:</strong> {transaction.version}</p>
      <p><strong>Locktime:</strong> {transaction.locktime}</p>
      <p><strong>Size:</strong> {transaction.size} bytes</p>
      <p><strong>Weight:</strong> {transaction.weight}</p>
      <p><strong>Fee:</strong> {transaction.fee} satoshis</p>
      <h2>Inputs (vin)</h2>
      <pre>{JSON.stringify(transaction.vin, null, 2)}</pre>
      <h2>Outputs (vout)</h2>
      <pre>{JSON.stringify(transaction.vout, null, 2)}</pre>
      <h2>Status</h2>
      <p><strong>Confirmed:</strong> {transaction.status.confirmed ? 'Yes' : 'No'}</p>
      {transaction.status.block_height && (
        <p><strong>Block Height:</strong> {transaction.status.block_height}</p>
      )}
      {transaction.status.block_hash && (
        <p><strong>Block Hash:</strong> {transaction.status.block_hash}</p>
      )}
    </div>
  );
};

export default TransactionDetails;

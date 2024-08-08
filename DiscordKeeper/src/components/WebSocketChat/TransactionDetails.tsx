// import React, { useState, useEffect } from 'react';
// import axios from 'axios';

// interface TransactionDetailsProps {
//   txid: string;
// }

// interface Transaction {
//   txid: string;
//   fee: number;
//   vin: Array<{ txid: string; vout: number; value: number }>;
//   vout: Array<{ scriptpubkey_address: string; value: number }>;
// }

// const TransactionDetails: React.FC<TransactionDetailsProps> = ({ txid }) => {
//   const [transaction, setTransaction] = useState<Transaction | null>(null);
//   const [error, setError] = useState<string | null>(null);

//   useEffect(() => {
//     const fetchTransaction = async () => {
//       try {
//         const response = await axios.get(`https://btcscan.org/api/tx/${txid}`);
//         setTransaction(response.data);
//       } catch (err) {
//         setError('Failed to fetch transaction details');
//       }
//     };

//     fetchTransaction();
//   }, [txid]);

//   if (error) return <div>{error}</div>;
//   if (!transaction) return <div>Loading...</div>;

//   const amount = transaction.vout.reduce((acc, output) => acc + output.value, 0);
//   const sender = transaction.vin.map(input => input.txid).join(', ');
//   const receiver = transaction.vout.map(output => output.scriptpubkey_address).join(', ');

//   return (
//     <div>
//       <h2>Transaction Details</h2>
//       <p><strong>Transaction ID:</strong> {transaction.txid}</p>
//       <p><strong>Amount:</strong> {amount} satoshis</p>
//       <p><strong>Sender:</strong> {sender}</p>
//       <p><strong>Receiver:</strong> {receiver}</p>
//       <p><strong>Fee:</strong> {transaction.fee} satoshis</p>
//     </div>
//   );
// };

// export default TransactionDetails;



import React, { useState, useEffect } from 'react';
import axios from 'axios';

interface TransactionDetailsProps {
  txid: string;
  coinType: string; 
}

interface Transaction {
  txid: string;
  fee: number;
  vin: Array<{ txid: string; vout: number; value: number }>;
  vout: Array<{ scriptpubkey_address: string; value: number }>;
}

const TransactionDetails: React.FC<TransactionDetailsProps> = ({ txid, coinType }) => {
  const [transaction, setTransaction] = useState<Transaction | null>(null);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchTransaction = async () => {
      const apiUrl = getApiUrl(coinType); // Determine API URL based on coin type
      if (!apiUrl) {
        setError('Invalid coin type selected');
        return;
      }

      try {
        const response = await axios.get(`${apiUrl}/api/tx/${txid}`);
        setTransaction(response.data);
      } catch (err) {
        setError('Failed to fetch transaction details');
      }
    };

    if (txid && coinType) {
      fetchTransaction();
    }

  }, [txid, coinType]);

  const getApiUrl = (coinType: string) => {
    switch (coinType) {
      case 'BTC':
        return 'https://btcscan.org';
      case 'ETH':
        return 'https://etherscan.io';
      case 'Litecoin':
        return 'https://litecoinblockexplorer.net';
      default:
        return null;
    }
  };

  if (error) return <div>{error}</div>;
  if (!transaction) return <div>Loading...</div>;

  const amount = transaction.vout.reduce((acc, output) => acc + output.value, 0);
  const sender = transaction.vin.map(input => input.txid).join(', ');
  const receiver = transaction.vout.map(output => output.scriptpubkey_address).join(', ');

  return (
    <div>
      <h2>Transaction Details</h2>
      <p><strong>Transaction ID:</strong> {transaction.txid}</p>
      <p><strong>Amount:</strong> {amount} satoshis</p>
      <p><strong>Sender:</strong> {sender}</p>
      <p><strong>Receiver:</strong> {receiver}</p>
      <p><strong>Fee:</strong> {transaction.fee} satoshis</p>
    </div>
  );
};

export default TransactionDetails;

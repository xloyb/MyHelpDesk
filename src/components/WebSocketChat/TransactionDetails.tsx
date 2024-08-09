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



// import React, { useState, useEffect } from 'react';
// import axios from 'axios';

// interface TransactionDetailsProps {
//   txid: string;
//   coinType: string; 
// }

// interface Transaction {
//   txid: string;
//   fee: number;
//   vin: Array<{ txid: string; vout: number; value: number }>;
//   vout: Array<{ scriptpubkey_address: string; value: number }>;
// }

// const TransactionDetails: React.FC<TransactionDetailsProps> = ({ txid, coinType }) => {
//   const [transaction, setTransaction] = useState<Transaction | null>(null);
//   const [error, setError] = useState<string | null>(null);

//   useEffect(() => {
//     const fetchTransaction = async () => {
//       const apiUrl = getApiUrl(coinType); // Determine API URL based on coin type
//       if (!apiUrl) {
//         setError('Invalid coin type selected');
//         return;
//       }

//       try {
//         const response = await axios.get(`${apiUrl}/api/tx/${txid}`);
//         setTransaction(response.data);
//       } catch (err) {
//         setError('Failed to fetch transaction details');
//       }
//     };

//     if (txid && coinType) {
//       fetchTransaction();
//     }

//   }, [txid, coinType]);

//   const getApiUrl = (coinType: string) => {
//     switch (coinType) {
//       case 'BTC':
//         return 'https://btcscan.org';
//       case 'ETH':
//         return 'https://etherscan.io';
//       case 'Litecoin':
//         return 'https://litecoinblockexplorer.net';
//       default:
//         return null;
//     }
//   };

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



// import React, { useState, useEffect } from 'react';
// import axios from 'axios';

// interface TransactionDetailsProps {
//   txid: string;
//   coinType: string; 
// }

// interface Transaction {
//   txid: string;
//   fee: number;
//   vin: Array<{ txid: string; vout: number; value: number }>;
//   vout: Array<{ scriptpubkey_address: string; value: number }>;
// }

// const TransactionDetails: React.FC<TransactionDetailsProps> = ({ txid, coinType }) => {
//   const [transaction, setTransaction] = useState<Transaction | null>(null);
//   const [error, setError] = useState<string | null>(null);

//   useEffect(() => {
//     const fetchTransaction = async () => {
//       const apiUrl = getApiUrl(coinType); 
//       if (!apiUrl) {
//         setError('Invalid coin type selected');
//         return;
//       }

//       try {
//         const response = await axios.get(`${apiUrl}/api/tx/${txid}`);
//         const data = response.data;
        
//         if (data && data.txid && data.vin && data.vout) {
//           setTransaction(data);
//         } else {
//           setError('Invalid transaction');
//         }
//       } catch (err) {
//         setError('Failed to fetch transaction details');
//       }
//     };

//     if (txid && coinType) {
//       fetchTransaction();
//     }

//   }, [txid, coinType]);

//   const getApiUrl = (coinType: string) => {
//     switch (coinType) {
//       case 'BTC':
//         return 'https://btcscan.org';
//       case 'ETH':
//         return 'https://etherscan.io';
//       case 'Litecoin':
//         return 'https://litecoinblockexplorer.net';
//       default:
//         return null;
//     }
//   };

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


// import React, { useState, useEffect } from 'react';
// import axios from 'axios';

// interface TransactionDetailsProps {
//   coinType: string; 
// }

// interface Transaction {
//   txid: string;
//   fee: number;
//   vin: Array<{ txid: string; vout: number; value: number }>;
//   vout: Array<{ scriptpubkey_address: string; value: number }>;
// }

// const TransactionDetails: React.FC<TransactionDetailsProps> = ({ coinType }) => {
//   const [transactionId, setTransactionId] = useState<string>('');
//   const [transaction, setTransaction] = useState<Transaction | null>(null);
//   const [error, setError] = useState<string | null>(null);
//   const [modalOpen, setModalOpen] = useState(false);

//   const openModal = () => {
//     setModalOpen(true);
//   };

//   const closeModal = () => {
//     setModalOpen(false);
//   };

//   const handleFormSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
//     event.preventDefault();

//     try {
//       const apiUrl = getApiUrl(coinType); 
//       if (!apiUrl) {
//         setError('Invalid coin type selected');
//         return;
//       }

//       const response = await axios.get(`${apiUrl}/api/tx/${transactionId}`);
//       const data = response.data;
      
//       if (data && data.txid && data.vin && data.vout) {
//         setTransaction(data);
//       } else {
//         setError('Invalid transaction');
//       }
//     } catch (err) {
//       setError('Failed to fetch transaction details');
//     }
//   };

//   const getApiUrl = (coinType: string) => {
//     switch (coinType) {
//       case 'BTC':
//         return 'https://btcscan.org';
//       case 'ETH':
//         return 'https://etherscan.io';
//       case 'Litecoin':
//         return 'https://litecoinblockexplorer.net';
//       default:
//         return null;
//     }
//   };

//   const amount = transaction?.vout.reduce((acc, output) => acc + output.value, 0);
//   const sender = transaction?.vin.map(input => input.txid).join(', ');
//   const receiver = transaction?.vout.map(output => output.scriptpubkey_address).join(', ');

//   return (
//     <div>
//       <button className="btn" onClick={openModal}>Open Modal</button>
      
//       {/* Modal Dialog */}
//       {modalOpen && (
//         <div className="modal">
//           <div className="modal-box w-11/12 max-w-5xl">
//             <h3 className="font-bold text-lg">Transaction Details</h3>
//             <form onSubmit={handleFormSubmit}>
//               <div className="py-4">
//                 <label className="block text-sm font-medium text-gray-700">Transaction ID:</label>
//                 <input
//                   type="text"
//                   className="mt-1 block w-full border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
//                   value={transactionId}
//                   onChange={(e) => setTransactionId(e.target.value)}
//                   required
//                 />
//               </div>
//               <div className="py-4">
//                 <label className="block text-sm font-medium text-gray-700">Coin Type:</label>
//                 <select
//                   className="mt-1 block w-full border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
//                   value={coinType}
//                   disabled 
//                 >
//                   <option value="BTC">Bitcoin (BTC)</option>
//                   <option value="ETH">Ethereum (ETH)</option>
//                   <option value="Litecoin">Litecoin (LTC)</option>
//                 </select>
//               </div>
//               <div className="modal-action">
//                 <button type="submit" className="btn">Fetch Transaction</button>
//                 <button type="button" className="btn" onClick={closeModal}>Close</button>
//               </div>
//             </form>
//           </div>
//         </div>
//       )}

//       {/* Display Transaction Details */}
//       {transaction && (
//         <div>
//           <h2>Transaction Details</h2>
//           <p><strong>Transaction ID:</strong> {transaction.txid}</p>
//           <p><strong>Amount:</strong> {amount} satoshis</p>
//           <p><strong>Sender:</strong> {sender}</p>
//           <p><strong>Receiver:</strong> {receiver}</p>
//           <p><strong>Fee:</strong> {transaction.fee} satoshis</p>
//         </div>
//       )}

//       {/* Error Handling */}
//       {error && <div>{error}</div>}
//     </div>
//   );
// };

// export default TransactionDetails;


// import React, { useState } from 'react';
// import axios from 'axios';

// interface TransactionDetailsProps {}

// interface Transaction {
//   txid: string;
//   fee: number;
//   vin: Array<{ txid: string; vout: number; value: number }>;
//   vout: Array<{ scriptpubkey_address: string; value: number }>;
// }

// const TransactionDetails: React.FC<TransactionDetailsProps> = () => {
//   const [transactionId, setTransactionId] = useState<string>('');
//   const [coinType, setCoinType] = useState<string>('BTC');
//   const [transaction, setTransaction] = useState<Transaction | null>(null);
//   const [error, setError] = useState<string | null>(null);

//   const handleFormSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
//     event.preventDefault();
//     try {
//       const apiUrl = getApiUrl(coinType);
//       if (!apiUrl) {
//         setError('Invalid coin type selected');
//         return;
//       }

//       const response = await axios.get(`${apiUrl}/api/tx/${transactionId}`);
//       const data = response.data;

//       if (data && data.txid && data.vin && data.vout) {
//         setTransaction(data);
//         setError(null); 
//       } else {
//         setError('Invalid transaction');
//         setTransaction(null); 
//       }
//     } catch (err) {
//       setError('Failed to fetch transaction details');
//       setTransaction(null); 
//     }
//   };

//   const getApiUrl = (coinType: string) => {
//     switch (coinType) {
//       case 'BTC':
//         return 'https://btcscan.org';
//       case 'ETH':
//         return 'https://etherscan.io';
//       case 'Litecoin':
//         return 'https://litecoinblockexplorer.net';
//       default:
//         return null;
//     }
//   };

//   const amount = transaction?.vout.reduce((acc, output) => acc + output.value, 0);
//   const sender = transaction?.vin.map(input => input.txid).join(', ');
//   const receiver = transaction?.vout.map(output => output.scriptpubkey_address).join(', ');

//   const openModal = () => {
//     const modal = document.getElementById('my_modal_4') as HTMLDialogElement;
//     if (modal) {
//       modal.showModal();
//     }
//   };

//   const closeModal = () => {
//     const modal = document.getElementById('my_modal_4') as HTMLDialogElement;
//     if (modal) {
//       modal.close();
//     }
//   };

//   return (
//     <div>
//       <button className="btn" onClick={openModal}>
//         Open Modal
//       </button>

//       <dialog id="my_modal_4" className="modal">
//         <form method="dialog" onSubmit={handleFormSubmit} className="modal-box w-11/12 max-w-5xl">
//           <h3 className="font-bold text-lg">Transaction Details</h3>
//           <div className="flex flex-col md:flex-row md:items-center space-y-4 md:space-y-0 md:space-x-4">
//             <div className="flex-1">
//               <label className="block text-sm font-medium">Transaction ID</label>
//               <input
//                 type="Transaction id here..."
//                 className="mt-1 block input input-bordered w-full max-w-xs"
//                 value={transactionId}
//                 onChange={(e) => setTransactionId(e.target.value)}
//                 required
//               />
//             </div>
//             <div className="flex-1">
//               <label className="block text-sm font-medium">Coin Type</label>
//               <select
//                 className="select w-full max-w-xs"
//                 value={coinType}
//                 onChange={(e) => setCoinType(e.target.value)}
//               >
//                 <option value="BTC">Bitcoin (BTC)</option>
//                 <option value="ETH">Ethereum (ETH)</option>
//                 <option value="Litecoin">Litecoin (LTC)</option>
//               </select>
//             </div>
//           </div>
//           <div className="modal-action">
//             <button type="submit" className="btn">Fetch Transaction</button>
//             <button type="button" className="btn" onClick={closeModal}>Close</button>
//           </div>
//         </form>
//       </dialog>

//       {transaction && (
//         <div>
//           <h2>Transaction Details</h2>
//           <p><strong>Transaction ID:</strong> {transaction.txid}</p>
//           <p><strong>Amount:</strong> {amount} satoshis</p>
//           <p><strong>Sender:</strong> {sender}</p>
//           <p><strong>Receiver:</strong> {receiver}</p>
//           <p><strong>Fee:</strong> {transaction.fee} satoshis</p>
//         </div>
//       )}

//       {error && <div>{error}</div>}
//     </div>
//   );
// };

// export default TransactionDetails;


import React, { useState } from 'react';
import axios from 'axios';
import { FaBtc } from 'react-icons/fa';

interface TransactionDetailsProps {}

interface Transaction {
  txid: string;
  fee: number;
  vin: Array<{ txid: string; vout: number; value: number }>;
  vout: Array<{ scriptpubkey_address: string; value: number }>;
}

const TransactionDetails: React.FC<TransactionDetailsProps> = () => {
  const [transactionId, setTransactionId] = useState<string>('');
  const [coinType, setCoinType] = useState<string>('BTC');
  const [transaction, setTransaction] = useState<Transaction | null>(null);
  const [error, setError] = useState<string | null>(null);

  const handleFormSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    try {
      const apiUrl = getApiUrl(coinType);
      if (!apiUrl) {
        setError('Invalid coin type selected');
        return;
      }

      const response = await axios.get(`${apiUrl}/api/tx/${transactionId}`);
      const data = response.data;

      if (data && data.txid && data.vin && data.vout) {
        setTransaction(data);
        setError(null); 
      } else {
        setError('Invalid transaction');
        setTransaction(null); 
      }
    } catch (err) {
      setError('Failed to fetch transaction details');
      setTransaction(null); 
    }
  };

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

  const amount = transaction?.vout.reduce((acc, output) => acc + output.value, 0);
  const sender = transaction?.vin.map(input => input.txid).join(', ');
  const receiver = transaction?.vout.map(output => output.scriptpubkey_address).join(', ');

  const openModal = () => {
    const modal = document.getElementById('my_modal_4') as HTMLDialogElement;
    if (modal) {
      modal.showModal();
    }
  };

  const closeModal = () => {
    const modal = document.getElementById('my_modal_4') as HTMLDialogElement;
    if (modal) {
      modal.close();
    }
  };

  return (
    <div>
      <button className="btn btn-outline btn-info mt-2 mr-2 btn-xs sm:btn-sm md:btn-md" onClick={openModal}>
      <FaBtc  className="h-4 w-4" />

      </button>

      <dialog id="my_modal_4" className="modal">
        <form method="dialog" onSubmit={handleFormSubmit} className="modal-box w-11/12 max-w-5xl">
          <h3 className="font-bold text-lg">Transaction Details</h3>
          <div className="flex flex-col md:flex-row md:items-center space-y-4 md:space-y-0 md:space-x-4">
            <div className="flex-1">
              <label className="block text-sm font-medium">Transaction ID</label>
              <input
                type="text"
                className="mt-1 block input input-bordered w-full max-w-xs"
                value={transactionId}
                onChange={(e) => setTransactionId(e.target.value)}
                required
              />
            </div>
            <div className="flex-1">
              <label className="block text-sm font-medium">Coin Type</label>
              <select
                className="select w-full max-w-xs"
                value={coinType}
                onChange={(e) => setCoinType(e.target.value)}
              >
                <option value="BTC">Bitcoin (BTC)</option>
                <option value="ETH">Ethereum (ETH)</option>
                <option value="Litecoin">Litecoin (LTC)</option>
              </select>
            </div>
          </div>
          <div className="modal-action">
            <button type="submit" className="btn">Fetch Transaction</button>
            <button type="button" className="btn" onClick={closeModal}>Close</button>
          </div>
          {transaction && (
            <div className="mt-4">
              <h2 className="text-lg font-bold">Transaction Details</h2>
              <p><strong>Transaction ID:</strong> {transaction.txid}</p>
              <p><strong>Amount:</strong> {amount} satoshis</p>
              <p><strong>Sender:</strong> {sender}</p>
              <p><strong>Receiver:</strong> {receiver}</p>
              <p><strong>Fee:</strong> {transaction.fee} satoshis</p>
            </div>
          )}
          {error && <div className="mt-4 text-red-500">{error}</div>}
        </form>
      </dialog>
    </div>
  );
};

export default TransactionDetails;

"use client"
import { createExchange, createTicket } from '@/lib/actions';
import { isBanned } from '@/lib/ban'; 
import { useAuth } from '@clerk/nextjs';
import React, { useRef, useState } from 'react';
import { GrContact } from "react-icons/gr";

const paymentOptions = [
    'btc', 'eth', 'litecoin', 'dogecoin', 'BNB', 'Paypal', 'Skrill', 'Pyeoneer', 'CrediCrad'
];

const ExchangeModal = () => {
  const [banned, setBanned] = useState<boolean>(false); 
  const [payment, setpayment] = useState<string>('');
  const [desiredExchange, setDesiredExchange] = useState<string>('');
  const [walletAddress, setWalletAddress] = useState<string>('');
  const [amount, setAmount] = useState<number>(0);
  const [cardId, setCardId] = useState<string>('');
  const [paypalEmail, setPaypalEmail] = useState<string>('');
  const [payoneerEmail, setPayoneerEmail] = useState<string>('');
  const [skrillEmail, setSkrillEmail] = useState<string>('');
  const modalRef = useRef<HTMLDialogElement>(null);
  const bannedModalRef = useRef<HTMLDialogElement>(null); 
  const { userId } = useAuth();

  const handleOpenModal = async () => {
    try {
      if (!userId) throw new Error('User is not authenticated');

      const userBanned = await isBanned(userId);
      setBanned(userBanned);

      if (userBanned) {
        bannedModalRef.current?.showModal();
      } else {
        modalRef.current?.showModal();
      }
    } catch (error) {
      console.error('Failed to check ban status:', error);
    }
  };

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    const formData = new FormData(event.currentTarget);
    formData.append('payment', payment);
    formData.append('desiredExchange', desiredExchange);
    formData.append('walletAddress', walletAddress);
    formData.append('amount', amount.toString());
    formData.append('cardId', cardId);
    formData.append('paypalEmail', paypalEmail);
    formData.append('payoneerEmail', payoneerEmail);
    formData.append('skrillEmail', skrillEmail);
    formData.append('type', "exchange");


    try {
      const token = await createExchange(formData);
    modalRef.current?.close();
    //   window.location.reload();
    } catch (error) {
    console.error('Error creating Exchange:', error);
    }
  };

  return (
    <>
      <button className="btn btn-outline btn-success mt-auto btn-xs sm:btn-sm md:btn-md" onClick={handleOpenModal}>
        <GrContact />
        Exchange Now
      </button>

      <dialog id="ticket_modal" className="modal" ref={modalRef}>
        <div className="modal-box">
          <h3 className="font-bold text-lg">Exchange</h3>
          <form onSubmit={handleSubmit}>
            <div className="form-control">
              <label className="label">
                <span className="label-text">Select Payment</span>
              </label>
              <select 
                className="select select-bordered" 
                value={payment} 
                onChange={(e) => setpayment(e.target.value)} 
                required
              >
                <option value="" disabled>Select an exchange</option>
                {paymentOptions.map(option => (
                  <option key={option} value={option}>{option}</option>
                ))}
              </select>
            </div>

            <div className="form-control">
              <label className="label">
                <span className="label-text">Select Desired Exchange</span>
              </label>
              <select 
                className="select select-bordered" 
                value={desiredExchange} 
                onChange={(e) => setDesiredExchange(e.target.value)} 
                required
              >
                <option value="" disabled>Select an exchange</option>
                {paymentOptions.map(option => (
                  <option key={option} value={option}>{option}</option>
                ))}
              </select>
            </div>

            {(desiredExchange === 'btc' || desiredExchange === 'eth' || desiredExchange === 'litecoin' || desiredExchange === 'dogecoin' || desiredExchange === 'BNB') && (
              <div className="form-control">
                <label className="label">
                  <span className="label-text">Crypto Wallet Address</span>
                </label>
                <input 
                  name="walletAddress" 
                  type="text" 
                  placeholder="Wallet address" 
                  value={walletAddress} 
                  onChange={(e) => setWalletAddress(e.target.value)} 
                  className="input input-bordered" 
                  required 
                />
              </div>
            )}

            {(desiredExchange === 'CrediCrad') && (
              <div className="form-control">
                <label className="label">
                  <span className="label-text">Credit Card ID</span>
                </label>
                <input 
                  name="cardId" 
                  type="text" 
                  placeholder="Credit Card ID" 
                  value={cardId} 
                  onChange={(e) => setCardId(e.target.value)} 
                  className="input input-bordered" 
                />
              </div>
            )}

            {(desiredExchange === 'Paypal') && (
              <div className="form-control">
                <label className="label">
                  <span className="label-text">PayPal Email</span>
                </label>
                <input 
                  name="paypalEmail" 
                  type="email" 
                  placeholder="PayPal Email" 
                  value={paypalEmail} 
                  onChange={(e) => setPaypalEmail(e.target.value)} 
                  className="input input-bordered" 
                />
              </div>
            )}

            {(desiredExchange === 'Pyeoneer') && (
              <div className="form-control">
                <label className="label">
                  <span className="label-text">Payoneer Email</span>
                </label>
                <input 
                  name="payoneerEmail" 
                  type="email" 
                  placeholder="Payoneer Email" 
                  value={payoneerEmail} 
                  onChange={(e) => setPayoneerEmail(e.target.value)} 
                  className="input input-bordered" 
                />
              </div>
            )}

            {(desiredExchange === 'Skrill') && (
              <div className="form-control">
                <label className="label">
                  <span className="label-text">Skrill Email</span>
                </label>
                <input 
                  name="skrillEmail" 
                  type="email" 
                  placeholder="Skrill Email" 
                  value={skrillEmail} 
                  onChange={(e) => setSkrillEmail(e.target.value)} 
                  className="input input-bordered" 
                />
              </div>
            )}

            <div className="form-control">
              <label className="label">
                <span className="label-text">Amount in EURO</span>
              </label>
              <input 
                name="amount" 
                type="number" 
                placeholder="Amount in EURO" 
                value={amount} 
                onChange={(e) => setAmount(parseFloat(e.target.value))} 
                className="input input-bordered" 
                required 
                min="0"
              />
            </div>
            <div className="modal-action">
              <button type="submit" className="btn">Submit</button>
              <button type="button" className="btn" onClick={() => modalRef.current?.close()}>Close</button>
            </div>
          </form>
        </div>
      </dialog>

      <dialog id="banned_modal" className="modal" ref={bannedModalRef}>
        <div className="modal-box">
          <h3 className="font-bold text-lg">You are banned</h3>
          <p>You cannot create a ticket because you are banned.</p>
          <div className="modal-action">
            <button type="button" className="btn" onClick={() => bannedModalRef.current?.close()}>
              Close
            </button>
          </div>
        </div>
      </dialog>
    </>
  );
};

export default ExchangeModal;

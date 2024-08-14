import React from 'react';

interface ExchangeTicket {
  title?: string;
  status?: string;
  payment?: string;
  desiredExchange?: string;
  walletAddress?: string;
  amount?: number;
  cardId?: string;
  paypalEmail?: string;
  payoneerEmail?: string;
  skrillEmail?: string;
  type?: string;
}

const ExchangeTicketCard: React.FC<{ ticket: ExchangeTicket }> = ({ ticket }) => {
  return (
    <div className="card w-full bg-base-100 shadow-xl">
      <div className="card-body">
        {ticket.title && <h2 className="card-title">{ticket.title}</h2>}
        
        {ticket.status && (
          <p><strong>Status:</strong> {ticket.status}</p>
        )}
        
        {ticket.payment && (
          <p><strong>Payment Method:</strong> {ticket.payment}</p>
        )}
        
        {ticket.desiredExchange && (
          <p><strong>Desired Exchange:</strong> {ticket.desiredExchange}</p>
        )}
        
        {ticket.walletAddress && (
          <p><strong>Wallet Address:</strong> {ticket.walletAddress}</p>
        )}
        
        {ticket.amount !== undefined && ticket.amount !== null && (
          <p><strong>Amount:</strong> ${ticket.amount.toFixed(2)}</p>
        )}
        
        {ticket.cardId && (
          <p><strong>Card ID:</strong> {ticket.cardId}</p>
        )}
        
        {ticket.paypalEmail && (
          <p><strong>PayPal Email:</strong> {ticket.paypalEmail}</p>
        )}
        
        {ticket.payoneerEmail && (
          <p><strong>Payoneer Email:</strong> {ticket.payoneerEmail}</p>
        )}
        
        {ticket.skrillEmail && (
          <p><strong>Skrill Email:</strong> {ticket.skrillEmail}</p>
        )}
        
        {ticket.type && (
          <p><strong>Type:</strong> {ticket.type}</p>
        )}
      </div>
    </div>
  );
};

export default ExchangeTicketCard;

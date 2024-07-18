import React, { useEffect, useRef, useState } from 'react';
import { useAuth } from '@clerk/nextjs';
import { getTicketByToken } from '@/lib/ticket';
import { createBan } from '@/lib/ban';

const BanModal = ({ token }: { token: string }) => {
  const [ticket, setTicket] = useState<any>(null); 
  const [reason, setReason] = useState<string>('');
  const { userId: staffId } = useAuth(); 
  const modalRef = useRef<HTMLDialogElement>(null);

  const handleOpenModal = async () => {
    try {
      const fetchedTicket = await getTicketByToken(token);
      setTicket(fetchedTicket);
      modalRef.current?.showModal();
    } catch (error) {
      console.error('Failed to fetch ticket:', error);
    }
  };

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    try {
      console.log('Staff ID:', staffId);
      console.log('Ticket:', ticket);
      console.log('Reason:', reason);

      await createBan(ticket?.users[0].userId, staffId || '', reason); 

      modalRef.current?.close();
    } catch (error) {
      console.error('Error banning user:', error);
    }
  };

  return (
    <>
      <button className="btn btn-neutral mr-2" onClick={handleOpenModal}>
open modal      </button>

      <dialog id="ban_modal" className="modal" ref={modalRef}>
        <div className="modal-box">
          <h3 className="font-bold text-lg">Ban User</h3>
          <form onSubmit={handleSubmit}>
            <div className="form-control">
              <label className="label">
                <span className="label-text">Reason</span>
              </label>
              <textarea
                name="reason"
                placeholder="Reason for the ban"
                className="textarea textarea-bordered"
                value={reason}
                onChange={(e) => setReason(e.target.value)}
                required
              />
            </div>
            <div className="modal-action">
              <button type="submit" className="btn">
                 Submit
              </button>
              <button type="button" className="btn" onClick={() => modalRef.current?.close()}>
                Close
              </button>
            </div>
          </form>
        </div>
      </dialog>
    </>
  );
};

export default BanModal;

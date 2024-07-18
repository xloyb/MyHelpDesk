import React, { useState, useEffect, useRef } from 'react';
import { updateTicketStatusByToken } from '@/lib/ticket';
import { useAuth } from '@clerk/nextjs';
import { IoLockClosedOutline } from 'react-icons/io5';
import { isBanned } from '@/lib/ban'; 

const TicketStatusModal = ({ token }: { token: string }) => {
  const [status, setStatus] = useState<string>('');
  const [banned, setBanned] = useState<boolean>(false); 
  const modalRef = useRef<HTMLDialogElement>(null);
  const bannedModalRef = useRef<HTMLDialogElement>(null); 
  const { userId } = useAuth();

  useEffect(() => {
    // Perform any necessary setup or checks
  }, [token]);

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

    try {
      await updateTicketStatusByToken(token, status);
      modalRef.current?.close();
    } catch (error) {
      console.error('Failed to update ticket status:', error);
    }
  };

  return (
    <>
      <button className="btn btn-neutral mr-2" onClick={handleOpenModal}>
        <IoLockClosedOutline />
      </button>

      <dialog id="ticket_status_modal" className="modal" ref={modalRef}>
        <div className="modal-box">
          <h3 className="font-bold text-lg">Update Ticket Status</h3>
          <form onSubmit={handleSubmit}>
            <div className="form-control">
              <label className="label">
                <span className="label-text">Status</span>
              </label>
              <select
                name="status"
                value={status}
                onChange={(e) => setStatus(e.target.value)}
                className="select select-bordered"
                required
              >
                <option value="" disabled>Select a status</option>
                <option value="open">Open</option>
                <option value="closed">Closed</option>
                <option value="pending">Pending</option>
              </select>
            </div>
            <div className="modal-action">
              <button type="submit" className="btn">Submit</button>
              <button type="button" className="btn" onClick={() => modalRef.current?.close()}>
                Close
              </button>
            </div>
          </form>
        </div>
      </dialog>

      <dialog id="banned_modal" className="modal" ref={bannedModalRef}>
        <div className="modal-box">
          <h3 className="font-bold text-lg">You are banned</h3>
          <p>You cannot update the ticket status because you are banned.</p>
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

export default TicketStatusModal;

import React, { useState, useEffect, useRef } from 'react';
import { updateTicketStatusByToken } from '@/lib/ticket';
import { useAuth } from '@clerk/nextjs';

const TicketStatusModal = ({ token }: { token: string }) => {
  const [status, setStatus] = useState<string>('');
  const modalRef = useRef<HTMLDialogElement>(null);
  const { userId } = useAuth();

  useEffect(() => {
    // Perform any necessary setup or checks
  }, [token]);

  const handleOpenModal = () => {
    modalRef.current?.showModal();
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
      <button className="btn btn-outline btn-success mt-auto" onClick={handleOpenModal}>
        Open Status Modal
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
    </>
  );
};

export default TicketStatusModal;

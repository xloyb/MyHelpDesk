"use client"
import { createTicket } from '@/lib/actions';
import { isBanned } from '@/lib/ban'; 
import { useAuth } from '@clerk/nextjs';
import React, { useRef, useState } from 'react';
import { GrContact } from "react-icons/gr";


const TicketModal = () => {
  const [banned, setBanned] = useState<boolean>(false); 
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

    try {
      const token = await createTicket(formData);
      //console.log('Ticket created, token:', token);
      modalRef.current?.close();
      // redirect(`/c/${token}`)
      window.location.reload()
            } catch (error) {
      console.error('Error creating ticket:', error);
    }
  };

  return (
    <>
      <button className="btn btn-outline btn-success mt-auto btn-xs sm:btn-sm md:btn-md" onClick={handleOpenModal}>
      <GrContact />
      New Ticket
      </button>

      <dialog id="ticket_modal" className="modal" ref={modalRef}>
        <div className="modal-box">
          <h3 className="font-bold text-lg">Create a Ticket</h3>
          <form onSubmit={handleSubmit}>
            <div className="form-control">
              <label className="label">
                <span className="label-text">Title</span>
              </label>
              <input name="title" type="text" placeholder="Ticket title" className="input input-bordered" required />
            </div>
            <div className="form-control">
              <label className="label">
                <span className="label-text">Content</span>
              </label>
              <textarea name="content" placeholder="Ticket content" className="textarea textarea-bordered" required />
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

export default TicketModal;

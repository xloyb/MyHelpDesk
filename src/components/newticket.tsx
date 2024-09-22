"use client"
import { createTicket } from '@/lib/actions';
import { isBanned } from '@/lib/ban'; 
import { useAuth } from '@clerk/nextjs';
import React, { useRef, useState } from 'react';
import { GrContact } from "react-icons/gr";

type settings = {
  sitename: string;
  announcement: string;
  offer: string;
  logo: string;
  theme: string;
  discordLogs: boolean;
  exchangeSystem: boolean;
  storeSystem: boolean;
  ticketSystem: boolean;
};

const TicketModal = () => {
  const [banned, setBanned] = useState<boolean>(false); 
  const modalRef = useRef<HTMLDialogElement>(null);
  const bannedModalRef = useRef<HTMLDialogElement>(null); 
  const ticketdisabled = useRef<HTMLDialogElement>(null); 

  const { userId } = useAuth();
  const [Settings, setSettings] = useState<settings | null>(null);



  const handleOpenModal = async () => {
    const FetchSiteSettings = async () => {
      try {
        const response = await fetch('/api/settings');
        const data: settings = await response.json();
        setSettings(data);
      } catch (error) {
        console.error("Failed to fetch Site Settings:", error);

      }
    };
    FetchSiteSettings()
    try {
      if (!userId) throw new Error('User is not authenticated');
      const userBanned = await isBanned(userId);
      setBanned(userBanned);
      if (userBanned) {
        bannedModalRef.current?.showModal();
      }
      else if(!Settings?.storeSystem){
        ticketdisabled.current?.showModal();

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
      <button className="btn btn-outline btn-success mt-2 btn-xs sm:btn-sm md:btn-md" onClick={handleOpenModal}>
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

      <dialog id="banned_modal" className="modal" ref={ticketdisabled}>
        <div className="modal-box">
          <h3 className="font-bold text-lg">Ticket System is currently disabled.</h3>
          <p>Ticket System is currently disabled by the Administrator, Please Contact us on discord for more information.</p>
          <div className="modal-action">
            <button type="button" className="btn" onClick={() => ticketdisabled.current?.close()}>
              Close
            </button>
          </div>
        </div>
      </dialog>
    </>
  );
};

export default TicketModal;

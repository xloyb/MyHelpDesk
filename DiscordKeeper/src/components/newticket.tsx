
"use client"
import { createTicket } from '@/lib/actions';
import React, { useRef } from 'react';

const TicketModal = () => {
  const modalRef = useRef<HTMLDialogElement>(null);

  const handleOpenModal = () => {
    modalRef.current?.showModal();
  };

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    const formData = new FormData(event.currentTarget);

    try {
      await createTicket(formData);
      modalRef.current?.close();
    } catch (error) {
      console.error('Error creating ticket:', error);
    }
  };

  return (
    <div>
      <button className="btn" onClick={handleOpenModal}>Open Modal</button>
      <dialog id="my_modal_1" className="modal" ref={modalRef}>
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
    </div>
  );
};

export default TicketModal;

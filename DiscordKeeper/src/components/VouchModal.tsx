import { fetchUserById } from '@/lib/user';
import { createVouch } from '@/lib/vouch';
import { useAuth } from '@clerk/nextjs';
import axios from 'axios';
import React, { useEffect, useRef, useState } from 'react';
import Settings from './Settings';

const VouchModal = () => {
  const [settings, setSettings] = useState({
    sitename: '',
    announcement: '',
    offer: '',
    logo: '',
    theme: ''
  });

  useEffect(() => {
    const fetchSettings = async () => {
      try {
        const response = await axios.get('/data/settings.json');
        setSettings(response.data);
      } catch (error) {
        console.error('Failed to fetch settings:', error);
      }
    };

    fetchSettings();
  }, []);

  const modalRef = useRef<HTMLDialogElement>(null);

  const handleOpenModal = () => {
    modalRef.current?.showModal();
  };

  const { userId } = useAuth();

  if (!userId) {
    throw new Error("User is not authenticated!");
  }

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const formData = new FormData(event.currentTarget);

    try {
      const user = await fetchUserById(userId);
      const vouchedBy = user.name as string;
      const vouchedTo = settings.sitename as string;
      const message = formData.get('message') as string;

      await createVouch(vouchedBy, vouchedTo, message); 
      modalRef.current?.close();
    } catch (error) {
      console.error('Error creating vouch:', error);
    }
  };

  return (
    <>
      <button className="btn btn-outline btn-success mt-auto" onClick={handleOpenModal}>
        Open Vouch Modal
      </button>
      <dialog id="vouch_modal" className="modal" ref={modalRef}>
        <div className="modal-box">
          <h3 className="font-bold text-lg">Create a Vouch</h3>
          <form onSubmit={handleSubmit}>
            <div className="form-control">
              <label className="label">
                <span className="label-text">Message</span>
              </label>
              <textarea name="message" placeholder="Vouch message" className="textarea textarea-bordered" required />
            </div>
            <div className="modal-action">
              <button type="submit" className="btn">Submit</button>
              <button type="button" className="btn" onClick={() => modalRef.current?.close()}>Close</button>
            </div>
          </form>
        </div>
      </dialog>
    </>
  );
};

export default VouchModal;

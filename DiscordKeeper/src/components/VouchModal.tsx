import { fetchUserById } from '@/lib/user';
import { createVouch } from '@/lib/vouch';
import { isBanned } from '@/lib/ban'; 
import { useAuth } from '@clerk/nextjs';
import axios from 'axios';
import React, { useEffect, useRef, useState } from 'react';
import { FaHeartCirclePlus } from 'react-icons/fa6';

const VouchModal = () => {
  const [settings, setSettings] = useState({
    sitename: '',
    announcement: '',
    offer: '',
    logo: '',
    theme: ''
  });

  const [banned, setBanned] = useState<boolean>(false); 
  const modalRef = useRef<HTMLDialogElement>(null);
  const bannedModalRef = useRef<HTMLDialogElement>(null); 

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

  const { userId } = useAuth();

  if (!userId) {
    throw new Error("User is not authenticated!");
  }

  const handleOpenModal = async () => {
    try {
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
      <button className="btn btn-neutral mr-2" onClick={handleOpenModal}>
        <FaHeartCirclePlus />
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

      <dialog id="banned_modal" className="modal" ref={bannedModalRef}>
        <div className="modal-box">
          <h3 className="font-bold text-lg">You are banned</h3>
          <p>You cannot vouch because you are banned.</p>
          <div className="modal-action">
            <button type="button" className="btn" onClick={() => bannedModalRef.current?.close()}>Close</button>
          </div>
        </div>
      </dialog>
    </>
  );
};

export default VouchModal;

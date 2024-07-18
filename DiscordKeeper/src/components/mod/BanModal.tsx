import React, { useRef, useState } from "react";
import { useAuth } from "@clerk/nextjs";
import { getTicketByToken } from "@/lib/ticket";
import {
  createBan,
  banDetails,
  isBanned,
  unbanUser,
  isSelfBanAttempt,
} from "@/lib/ban";
import { FaBookDead } from "react-icons/fa";

const BanModal = ({ token }: { token: string }) => {
  const [ticket, setTicket] = useState<any>(null);
  const [reason, setReason] = useState<string>("");
  const [banned, setBanned] = useState<boolean>(false);
  const [banInfo, setBanInfo] = useState<any>(null);
  const [selfBan, setSelfBan] = useState<boolean>(false);

  const { userId: staffId } = useAuth();
  const modalRef = useRef<HTMLDialogElement>(null);

  const handleOpenModal = async () => {
    try {
      const fetchedTicket = await getTicketByToken(token);
      if (!fetchedTicket || !fetchedTicket.users || !fetchedTicket.users[0]) {
        throw new Error("Ticket or user information not found");
      }

      setTicket(fetchedTicket);

      const userId = fetchedTicket.users[0].userId;
      if (!userId) throw new Error("User ID is undefined");
      if (!staffId) throw new Error("Staff ID is undefined");
      const isSelfBan = await isSelfBanAttempt(staffId, userId);
      setSelfBan(isSelfBan);

      const userBanned = await isBanned(userId);
      setBanned(userBanned);

      if (userBanned) {
        const banDetailsInfo = await banDetails(userId);
        setBanInfo(banDetailsInfo);
      }

      modalRef.current?.showModal();
    } catch (error) {
      console.error("Failed to fetch ticket or ban status:", error);
    }
  };

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    try {
      if (!staffId) throw new Error("Staff ID is undefined");
      if (
        !ticket ||
        !ticket.users ||
        !ticket.users[0] ||
        !ticket.users[0].userId
      ) {
        throw new Error("User information is missing");
      }

      const userId = ticket.users[0].userId;
      await createBan(userId, staffId, reason);

      modalRef.current?.close();
    } catch (error) {
      console.error("Error banning user:", error);
    }
  };

  const handleUnban = async () => {
    try {
      if (
        !ticket ||
        !ticket.users ||
        !ticket.users[0] ||
        !ticket.users[0].userId
      ) {
        throw new Error("User information is missing");
      }

      const userId = ticket.users[0].userId;
      await unbanUser(userId);
      setBanned(false);
      modalRef.current?.close();
    } catch (error) {
      console.error("Error unbanning user:", error);
    }
  };

  return (
    <>
      <button className="btn btn-neutral border-red-600 mr-2" onClick={handleOpenModal}>
        <FaBookDead />
      </button>

      <dialog id="ban_modal" className="modal" ref={modalRef}>
        <div className="modal-box">
          <h3 className="font-bold text-lg">Ban User</h3>
          {selfBan ? (
            <div>
              <p>You cannot ban yourself Mother Fucker!</p>
              <button
                type="button"
                className="btn"
                onClick={() => modalRef.current?.close()}
              >
                Close
              </button>
            </div>
          ) : (
            <>
              {banned ? (
                <>
                  <p className="text-red-500">This user is already banned.</p>
                  <p>
                    <strong>Banned User:</strong> {banInfo?.user?.name}
                  </p>
                  <p>
                    <strong>Staff:</strong> {banInfo?.staff?.name}
                  </p>
                  <p>
                    <strong>Reason:</strong> {banInfo?.reason}
                  </p>
                  <button
                    className="btn btn-warning mt-2 mr-2"
                    onClick={handleUnban}
                  >
                    Unban User
                  </button>
                  <button type="button" className="btn" onClick={() => modalRef.current?.close()}>Close</button>

                </>
              ) : (
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
                    <button
                      type="button"
                      className="btn"
                      onClick={() => modalRef.current?.close()}
                    >
                      Close
                    </button>
                  </div>
                </form>
              )}
            </>
          )}
        </div>
      </dialog>
    </>
  );
};

export default BanModal;

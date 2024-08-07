// import React from 'react'

// const StaffNoteDrawer = () => {
//   return (
//     <>
//     <div className="z-50 drawer drawer-end">
//   <input id="my-drawer-4" type="checkbox" className="drawer-toggle" />
//   <div className="drawer-content">
//     {/* Page content here */}
//     <label htmlFor="my-drawer-4" className="drawer-button btn btn-primary">Open drawer</label>
//   </div>
//   <div className="drawer-side">
//     <label htmlFor="my-drawer-4" aria-label="close sidebar" className="drawer-overlay"></label>
//     <ul className="menu bg-base-200 text-base-content min-h-full w-80 p-4">
//       {/* Sidebar content here */}
//       <li><a>Sidebar Item 1</a></li>
//       <li><a>Sidebar Item 2</a></li>
//     </ul>
//   </div>
// </div>
//     </>
//   )
// }

// export default StaffNoteDrawer
// import React, { useState, useEffect, useCallback } from 'react';
// import { addStaffTicketNote, updateStaffTicketNote, deleteStaffTicketNote, getTicketNotes } from '@/lib/ticket';

// interface StaffNoteDrawerProps {
//   userId: string | null | undefined; // userId can be null or undefined
//   ticketId: number;
// }

// interface StaffTicketNote {
//   id: number;
//   content: string;
//   staffId: string; // staffId should always be a string
//   ticketId: number;
// }

// const StaffNoteDrawer: React.FC<StaffNoteDrawerProps> = ({ userId, ticketId }) => {
//   const [notes, setNotes] = useState<StaffTicketNote[]>([]);
//   const [newNoteContent, setNewNoteContent] = useState('');
//   const [editingNoteId, setEditingNoteId] = useState<number | null>(null);
//   const [editingNoteContent, setEditingNoteContent] = useState('');

//   const fetchNotes = useCallback(async () => {
//     try {
//       if (ticketId) { // Check if ticketId is valid
//         const fetchedNotes = await getTicketNotes(ticketId); // Ensure this function accepts ticketId
//         setNotes(fetchedNotes);
//       }
//     } catch (error) {
//       console.error('Error fetching notes:', error);
//     }
//   }, [ticketId]);

//   useEffect(() => {
//     fetchNotes();
//   }, [fetchNotes]); // Include fetchNotes in dependency array

//   const handleAddNote = async () => {
//     if (!newNoteContent.trim() || !userId) return; // Prevent adding empty notes and ensure userId is valid

//     try {
//       await addStaffTicketNote({
//         content: newNoteContent,
//         staffId: userId, // userId must be a string
//         ticketId,
//       });
//       setNewNoteContent('');
//       fetchNotes();
//     } catch (error) {
//       console.error('Error adding note:', error);
//     }
//   };

//   const handleEditNote = async () => {
//     if (editingNoteId === null || !editingNoteContent.trim()) return; // Prevent empty updates

//     try {
//       await updateStaffTicketNote(editingNoteId, {
//         content: editingNoteContent,
//       });
//       setEditingNoteId(null);
//       setEditingNoteContent('');
//       fetchNotes();
//     } catch (error) {
//       console.error('Error updating note:', error);
//     }
//   };

//   const handleDeleteNote = async (noteId: number) => {
//     try {
//       await deleteStaffTicketNote(noteId);
//       fetchNotes();
//     } catch (error) {
//       console.error('Error deleting note:', error);
//     }
//   };

//   return (
//     <>
//       <div className="z-50 drawer drawer-end">
//         <input id="my-drawer-4" type="checkbox" className="drawer-toggle" />
//         <div className="drawer-content">
//           <label htmlFor="my-drawer-4" className="drawer-button btn btn-primary">Open drawer</label>
//         </div>
//         <div className="drawer-side">
//           <label htmlFor="my-drawer-4" aria-label="close sidebar" className="drawer-overlay"></label>
//           <ul className="menu bg-base-200 text-base-content min-h-full w-80 p-4">
//             <li>
//               <textarea
//                 value={newNoteContent}
//                 onChange={(e) => setNewNoteContent(e.target.value)}
//                 placeholder="Add a new note"
//                 className="textarea textarea-bordered w-full mb-2"
//               ></textarea>
//               <button onClick={handleAddNote} className="btn btn-primary w-full">Add Note</button>
//             </li>
//             {notes.map((note) => (
//               <li key={note.id} className="flex flex-col mb-2">
//                 {editingNoteId === note.id ? (
//                   <>
//                     <textarea
//                       value={editingNoteContent}
//                       onChange={(e) => setEditingNoteContent(e.target.value)}
//                       className="textarea textarea-bordered w-full mb-2"
//                     ></textarea>
//                     <button onClick={handleEditNote} className="btn btn-secondary w-full mb-1">Save</button>
//                     <button onClick={() => setEditingNoteId(null)} className="btn btn-ghost w-full">Cancel</button>
//                   </>
//                 ) : (
//                   <>
//                     <p>{note.content}</p>
//                     <button onClick={() => { setEditingNoteId(note.id); setEditingNoteContent(note.content); }} className="btn btn-secondary w-full mb-1">Edit</button>
//                     <button onClick={() => handleDeleteNote(note.id)} className="btn btn-error w-full">Delete</button>
//                   </>
//                 )}
//               </li>
//             ))}
//           </ul>
//         </div>
//       </div>
//     </>
//   );
// };

// export default StaffNoteDrawer;



import React, { useState, useEffect, useCallback } from 'react';
import Image from 'next/image';
import { addStaffTicketNote, updateStaffTicketNote, deleteStaffTicketNote, getTicketNotes } from '@/lib/ticket';
import { FaNoteSticky } from 'react-icons/fa6';

interface StaffNoteDrawerProps {
  userId: string | null | undefined;
  ticketId: number;
}

interface StaffTicketNote {
  id: number;
  content: string;
  staffId: string;
  ticketId: number;
  authorUsername: string;
  authorAvatar: string;
  createdAt: string;
}

const StaffNoteDrawer: React.FC<StaffNoteDrawerProps> = ({ userId, ticketId }) => {
  const [notes, setNotes] = useState<StaffTicketNote[]>([]);
  const [newNoteContent, setNewNoteContent] = useState('');
  const [editingNoteId, setEditingNoteId] = useState<number | null>(null);
  const [editingNoteContent, setEditingNoteContent] = useState('');

  const fetchNotes = useCallback(async () => {
    try {
      if (ticketId) {
        const fetchedNotes = await getTicketNotes(ticketId);
        const formattedNotes = fetchedNotes.map(note => ({
          id: note.id,
          content: note.content,
          staffId: note.staffId,
          ticketId: note.ticketId,
          authorUsername: note.staff.name || 'Unknown',
          authorAvatar: note.staff.avatar || '/default-avatar.png',
          createdAt: note.createdAt.toISOString(),
        }));
        setNotes(formattedNotes);
      }
    } catch (error) {
      console.error('Error fetching notes:', error);
    }
  }, [ticketId]);

  useEffect(() => {
    fetchNotes();
  }, [fetchNotes]);

  const handleAddNote = async () => {
    if (!newNoteContent.trim() || !userId) return;

    try {
      await addStaffTicketNote({
        content: newNoteContent,
        staffId: userId,
        ticketId,
      });
      setNewNoteContent('');
      fetchNotes();
    } catch (error) {
      console.error('Error adding note:', error);
    }
  };

  const handleEditNote = async () => {
    if (editingNoteId === null || !editingNoteContent.trim()) return;

    try {
      await updateStaffTicketNote(editingNoteId, {
        content: editingNoteContent,
      });
      setEditingNoteId(null);
      setEditingNoteContent('');
      fetchNotes();
    } catch (error) {
      console.error('Error updating note:', error);
    }
  };

  const handleDeleteNote = async (noteId: number) => {
    try {
      await deleteStaffTicketNote(noteId);
      fetchNotes();
    } catch (error) {
      console.error('Error deleting note:', error);
    }
  };

  return (
    <>
      <div className="z-50 drawer drawer-end">
        <input id="my-drawer-4" type="checkbox" className="drawer-toggle" />
          <label htmlFor="my-drawer-4" className="drawer-button btn btn-outline btn-error mt-2">
              <FaNoteSticky /> Keep Note
            
          </label>
        <div className="drawer-content">
        </div>
        <div className="drawer-side">
          <label htmlFor="my-drawer-4" aria-label="close sidebar" className="drawer-overlay"></label>
          <ul className="menu bg-base-200 text-base-content min-h-full w-80 p-4">
            <li>
              <textarea
                value={newNoteContent}
                onChange={(e) => setNewNoteContent(e.target.value)}
                placeholder="Add a new note"
                className="textarea textarea-bordered w-full mb-2"
              ></textarea>
              <button onClick={handleAddNote} className="btn btn-primary w-full">Add Note</button>
            </li>
            {notes.map((note) => (
              <li key={note.id} className="flex flex-col mb-2">
                {editingNoteId === note.id ? (
                  <>
                    <textarea
                      value={editingNoteContent}
                      onChange={(e) => setEditingNoteContent(e.target.value)}
                      className="textarea textarea-bordered w-full mb-2"
                    ></textarea>
                    <button onClick={handleEditNote} className="btn btn-secondary w-full mb-1">Save</button>
                    <button onClick={() => setEditingNoteId(null)} className="btn btn-ghost w-full">Cancel</button>
                  </>
                ) : (
                  <>
                    <div className="chat chat-start">
                      <div className="chat-image avatar">
                        <div className="w-10 rounded-full">
                          <Image
                            alt="author avatar"
                            src={note.authorAvatar}
                            width={40}
                            height={40}
                          />
                        </div>
                      </div>
                      <div className="chat-header mr-2">
                        {note.authorUsername}
                        <time className="text-xs opacity-50">{new Date(note.createdAt).toLocaleTimeString()}</time>
                      </div>
                      <div className="chat-bubble">{note.content}</div>
                      {/* <div className="chat-footer opacity-50">Delivered</div> */}
                    </div>
                    <button onClick={() => { setEditingNoteId(note.id); setEditingNoteContent(note.content); }} className="btn btn-secondary w-full mb-1">Edit</button>
                    <button onClick={() => handleDeleteNote(note.id)} className="btn btn-error w-full">Delete</button>
                  </>
                )}
              </li>
            ))}
          </ul>
        </div>
      </div>
    </>
  );
};

export default StaffNoteDrawer;

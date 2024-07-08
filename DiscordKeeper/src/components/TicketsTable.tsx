import { Ticket } from "@prisma/client";
import Link from "next/link";
import { FaLocationArrow } from "react-icons/fa6";

  interface Props {
    tickets: Ticket[];
    handleStatusChange: (ticketId: number, status: string) => void;
  }
  
  const TicketsTable: React.FC<Props> = ({ tickets = [], handleStatusChange }) => {
    return (
      <div>
        <h2>Tickets</h2>
        <div className="overflow-x-auto">
          <table className="table">
            {/* head */}
            <thead>
              <tr>
                <th>ID</th>
                <th>Title</th>
                <th>Content</th>
                <th>Status</th>
                <th>Actions</th>
                <th>View</th>
              </tr>
            </thead>
            <tbody>
              {tickets.map((ticket) => (
                <tr key={ticket.id}>
                  <td>{ticket.id}</td>
                  <td>{ticket.title}</td>
                  <td>{ticket.content}</td>
                  <td>{ticket.status}</td>
                  <td>
                    <select
                      value={ticket.status || 'pending'}
                      onChange={(e) => handleStatusChange(ticket.id, e.target.value)}
                      className="select select-bordered"
                    >
                      <option value="open">Open</option>
                      <option value="closed">Closed</option>
                      <option value="pending">Pending</option>
                    </select>
                  </td>
                  <th>
                  <Link href={`/chat/${ticket.token}`}>
                  <button className="btn btn-ghost btn-xs">View <FaLocationArrow />
                  </button>
                  </Link>
                </th>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    );
  };
  
  export default TicketsTable;
  

import { Vouch, User } from '@prisma/client'; 
import { useEffect } from 'react';

interface Props {
  vouches: Vouch[];
  fetchUserById: (userId: string) => Promise<User | null>;
}

const VouchesTable: React.FC<Props> = ({ vouches, fetchUserById }) => {
  useEffect(() => {
    vouches.forEach(async (vouch) => {
      if (vouch.vouchedBy) {
        const user = await fetchUserById(vouch.vouchedBy);
        console.log(user?.name); 
      }
      if (vouch.vouchedTo) {
        const user = await fetchUserById(vouch.vouchedTo);
        console.log(user?.name); 
      }
    });
  }, [vouches, fetchUserById]);

  return (
    <div>
      <h2>Vouches</h2>
      <div className="overflow-x-auto">
        <table className="table">
          {/* head */}
          <thead>
            <tr>
              <th>ID</th>
              <th>Message</th>
              <th>Vouched By</th>
              <th>Vouched To</th>
            </tr>
          </thead>
          <tbody>
            {vouches.map((vouch) => (
              <tr key={vouch.id}>
                <td>{vouch.id}</td>
                <td>{vouch.message}</td>
                <td>{vouch.vouchedBy || 'Unknown'}</td>
                <td>{vouch.vouchedTo || 'Unknown'}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default VouchesTable;

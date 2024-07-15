
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
       <div className="bg-base-100 card mx-6 mt-5 md:pt-4 px-6">
      <div className="text-xl font-semibold inline-block">Vouches </div>

      <div className="divider mt-2"></div>
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

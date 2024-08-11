import Link from "next/link";
import React from "react";
import { FaExternalLinkAlt } from "react-icons/fa";

const AdminHome = () => {
  return (
    <div className="bg-base-100 card mx-6 mt-5 md:pt-4 px-6">
      <div className="text-xl font-semibold inline-block">
        Admin Controle Panel
      </div>
      <div className="divider mt-2"></div>
      <div className="content-center grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 p-4">
        <Link href="/admincp/settings">
          <div className="stat flex justify-between items-center shadow-lg p-4 rounded-lg">
            <div>
              <div className="stat-value text-2xl">Manage Settings</div>
            </div>
            <FaExternalLinkAlt className="w-8 h-8 text-gray-400" />
          </div>
        </Link>

        <Link href="/admincp/store">
          <div className="stat flex justify-between items-center shadow-lg p-4 rounded-lg">
            <div>
              <div className="stat-value text-2xl">Manage Store</div>
            </div>
            <FaExternalLinkAlt className="w-8 h-8 text-gray-400" />
          </div>
        </Link>

        <Link href="/admincp/discord">
          <div className="stat flex justify-between items-center shadow-lg p-4 rounded-lg">
            <div>
              <div className="stat-value text-2xl">Manage Discord</div>
            </div>
            <FaExternalLinkAlt className="w-8 h-8 text-gray-400" />
          </div>
        </Link>

        <Link href="/admincp/users">
          <div className="stat flex justify-between items-center shadow-lg p-4 rounded-lg">
            <div>
              <div className="stat-value text-2xl">Manage Users </div>
            </div>
            <FaExternalLinkAlt className="w-8 h-8 text-gray-400" />
          </div>
        </Link>

        <Link href="/admincp/roles">
          <div className="stat flex justify-between items-center shadow-lg p-4 rounded-lg">
            <div>
              <div className="stat-value text-2xl ">Manage Roles</div>
            </div>
            <FaExternalLinkAlt className="w-8 h-8 text-gray-400" />
          </div>
        </Link>
      </div>
    </div>
  );
};

export default AdminHome;

import Link from 'next/link';
import React from 'react';

const Footer = () => {
  return (
    <footer className="bg-gray-800 text-white py-4 mt-4 mb-4">
      <div className="container mx-auto flex justify-between items-center">
        <div className="text-sm">
          &copy; {new Date().getFullYear()} Discord Keeper. All rights reserved.
        </div>
        <div className="text-sm">
          Made with ❤️ by <Link href={'https://mydevify.com'}>MyDevify.com</Link>
        </div>
      </div>
    </footer>
  );
};

export default Footer;

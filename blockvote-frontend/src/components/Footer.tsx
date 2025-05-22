// src/components/Footer.tsx
import React from 'react';

const Footer: React.FC = () => {
  return (
    <footer className="bg-gray-800 text-white py-4">
      <div className="container mx-auto px-4 flex justify-between">
        <div>
          <a href="/contact" className="hover:text-blue-400">Contact</a>
          <span className="mx-2">|</span>
          <a href="/faq" className="hover:text-blue-400">FAQ</a>
          <span className="mx-2">|</span>
          <a href="/privacy" className="hover:text-blue-400">Privacy Policy</a>
        </div>
        <p>Powered by Internet Computer</p>
      </div>
    </footer>
  );
};

export default Footer;
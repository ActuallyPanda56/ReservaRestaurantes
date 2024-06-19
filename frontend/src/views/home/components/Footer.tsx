import React from 'react';
import {
  FaFacebook,
  FaInstagram,
  FaTwitter,
  FaWhatsapp,
} from 'react-icons/fa6';

export default function Footer() {
  const links = [
    'About us',
    'Contact us',
    'Privacy policy',
    'FAQ',
    'Careers',
    'Terms & conditions',
    'Blog',
    'Press',
    'Invest',
  ];

  return (
    <footer className="flex flex-col lg:flex-row gap-10 lg:gap-44 h-auto lg:h-[600px] bg-gray-800 justify-center text-white items-center mt-20 p-6">
      <div className="flex flex-col gap-5 items-center lg:items-start">
        <span className="text-2xl font-semibold text-center lg:text-left">
          Newsletter & Special promos
        </span>
        <div className="flex flex-col sm:flex-row items-center gap-3 sm:gap-0">
          <input
            type="text"
            placeholder="Enter your email"
            className="py-2 px-3 w-full sm:w-[400px] text-gray-900 text-lg focus:outline-none"
          />
          <button className="bg-[--foreground] py-2 px-3 w-full sm:w-auto font-bold text-lg mt-2 sm:mt-0">
            Subscribe
          </button>
        </div>
      </div>
      <div className="flex flex-col items-center lg:items-center gap-10">
        <span className="text-2xl font-bold">LOGO</span>
        <div className="grid grid-cols-2 sm:grid-cols-3 gap-4 text-center">
          {links.map((link, index) => (
            <span key={index}>{link}</span>
          ))}
        </div>
        <div className="flex justify-center gap-5 text-2xl lg:text-4xl">
          <FaFacebook />
          <FaWhatsapp />
          <FaInstagram />
          <FaTwitter />
        </div>
      </div>
    </footer>
  );
}

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
    <footer className="flex gap-44 h-[600px] bg-gray-800 justify-center text-white items-center mt-20">
      <div className="flex flex-col gap-5">
        <span className="text-2xl font-semibold">
          Newsletter & Special promos
        </span>
        <div className="h-[80px] flex items-center">
          <input
            type="text"
            placeholder="Enter your email"
            className="py-2 px-3 w-[400px] h-full text-gray-900 text-lg focus:outline-none"
          />
          <button className="bg-[--foreground] py-2 px-3 h-full font-bold text-lg">
            Subscribe
          </button>
        </div>
      </div>
      <div className="flex flex-col justify-center items-center gap-10">
        <span>LOGO</span>
        <div className="grid grid-cols-3 grid-rows-3 gap-x-4 gap-y-2">
          {links.map((link, index) => (
            <span key={index}>{link}</span>
          ))}
        </div>
        <div className="flex justify-center gap-5 w-full text-4xl">
          <FaFacebook />
          <FaWhatsapp />
          <FaInstagram />
          <FaTwitter />
        </div>
      </div>
    </footer>
  );
}

import Link from 'next/link';
import React from 'react';

export default function Navbar() {
  const links = [
    {
      name: 'home',
      url: '/',
    },
    {
      name: 'home',
      url: '/',
    },
    {
      name: 'home',
      url: '/',
    },
    {
      name: 'home',
      url: '/',
    },
    {
      name: 'home',
      url: '/',
    },
    {
      name: 'Log In',
      url: '/auth',
    },
  ];
  return (
    <>
      <div className="flex w-[1200px] h-[60px] justify-between items-center bg-white rounded-lg shadow absolute top-10 px-10 z-50 mx-auto text-xl">
        <span>LOGO</span>
        <div className="flex gap-10">
          {links.map((link, index) => (
            <Link key={index} href={link.url}>
              {link.name}
            </Link>
          ))}
        </div>
      </div>
    </>
  );
}

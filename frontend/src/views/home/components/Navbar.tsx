'use client';

import Link from 'next/link';
import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { userStore } from '@/store/user';

export default function Navbar() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const { id } = userStore((state: any) => state.user);

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };
  const links = [
    {
      name: 'About',
      url: '/About',
    },
    {
      name: 'Contact',
      url: '/Contact',
    },
    {
      name: 'Services',
      url: '/Services',
    },
    {
      name: 'FAQ',
      url: '/FAQ',
    },
  ];
  return (
    <>
      <div className="flex w-[300px] md:w-[700px] lg:w-[900px] h-[60px] justify-between items-center bg-white rounded-t-lg md:rounded-lg shadow-lg md:shadow md:absolute fixed top-10 left-0 right-0 mx-auto px-4 sm:px-10 z-50 text-xl">
        <Link href="/">
          <img
            src="/logo.svg"
            alt="logo"
            width={45}
            height={45}
            className="cursor-pointer"
          />
        </Link>
        <div className="hidden md:flex gap-10 items-center">
          {links.map((link, index) => (
            <Link key={index} href={link.url}>
              {link.name}
            </Link>
          ))}
          {id !== '' ? (
            <Link
              href="/profile"
              className="btn-primary bg-green-500 hover:bg-green-800 rounded-lg"
            >
              Mi Perfil
            </Link>
          ) : (
            <Link href="/auth" className="btn-primary rounded-lg ">
              Ingresar
            </Link>
          )}
        </div>
        <button
          className="md:hidden text-3xl focus:outline-none"
          onClick={toggleMenu}
        >
          &#9776;
        </button>
      </div>
      <motion.div
        className="md:hidden fixed top-[100px] left-0 right-0 mx-auto bg-white w-[300px] md:w-[700px] lg:w-[900px] rounded-b-lg shadow-lg z-40 px-4 sm:px-10"
        initial={{ height: 0, opacity: 0 }}
        animate={{
          height: isMenuOpen ? 'auto' : 0,
          opacity: isMenuOpen ? 1 : 0,
        }}
        transition={{ duration: 0.3 }}
        style={{ overflow: 'hidden' }}
      >
        <div className="flex flex-col items-center gap-4 justify-center">
          {links.map((link, index) => (
            <Link
              key={index}
              href={link.url}
              className="text-xl py-4 w-full h-full flex justify-center items-center"
            >
              {link.name}
            </Link>
          ))}
        </div>
      </motion.div>
    </>
  );
}

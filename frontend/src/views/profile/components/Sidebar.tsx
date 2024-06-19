'use client';

import Link from 'next/link';
import React, { useState } from 'react';
import {
  FaArrowLeft,
  FaCalendar,
  FaHouse,
  FaRegBell,
  FaUser,
} from 'react-icons/fa6';
import { GiHelp } from 'react-icons/gi';
import { IoSettingsSharp } from 'react-icons/io5';

export default function Sidebar() {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div className="fixed flex flex-col items-center justify-between w-[150px] h-screen bg-[--foreground] py-20 text-white">
      <div className="flex flex-col items-center gap-20">
        <span>LOGO</span>
        <Link href="/">
          <FaHouse className="text-3xl" />
        </Link>
        <Link href="/profile/my-notifications">
          <FaRegBell className="text-3xl" />
        </Link>
        <Link href="/profile/my-reservations">
          <FaCalendar className="text-3xl" />
        </Link>
        <Link href="/profile">
          <FaUser className="text-3xl" />
        </Link>
      </div>
      <GiHelp
        className="text-6xl bg-[--shadow] rounded-full p-3 cursor-pointer"
        onClick={() => setIsOpen(!isOpen)}
      />
    </div>
  );
}

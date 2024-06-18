'use client';

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
        <FaHouse className="text-3xl" />
        <FaRegBell className="text-3xl" />
        <FaCalendar className="text-3xl" />
        <FaUser className="text-3xl" />
      </div>
      <GiHelp
        className="text-6xl bg-[--shadow] rounded-full p-3 cursor-pointer"
        onClick={() => setIsOpen(!isOpen)}
      />
    </div>
  );
}

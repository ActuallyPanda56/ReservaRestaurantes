'use client';

import { useRouter } from 'next/navigation';
import React, { useState } from 'react';

export default function Reservation() {
  const [adultsOpen, setAdultsOpen] = useState(false);
  const [childrenOpen, setChildrenOpen] = useState(false);
  const [adultsCount, setAdultsCount] = useState(1);
  const [childrenCount, setChildrenCount] = useState(0);

  const toggleAdultsDropdown = () => setAdultsOpen(!adultsOpen);

  const toggleChildrenDropdown = () => setChildrenOpen(!childrenOpen);

  const handleAdultsSelect = (count: number) => {
    setAdultsCount(count);
    setAdultsOpen(false);
  };

  const handleChildrenSelect = (count: number) => {
    setChildrenCount(count);
    setChildrenOpen(false);
  };

  const router = useRouter();

  return (
    <div className="bg-blue-100 rounded-lg p-8 w-full max-w-screen-lg mx-auto">
      <h2 className="text-3xl font-semibold text-center mb-1">
        Reserva tu mesa
      </h2>
      <p className="text-gray-600 text-center mb-6">
        Descubre la experiencia perfecta de comida!
      </p>
      <form className="flex flex-wrap items-end justify-center gap-4">
        <div className="flex flex-col gap-1">
          <label htmlFor="date" className="font-bold mr-2">
            Fecha
          </label>
          <input
            id="date"
            type="date"
            className="border rounded py-2 px-3 focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>
        <div className="flex flex-col gap-1">
          <span className="font-bold">Asistentes</span>
          <div className="flex gap-4 bg-white px-2 rounded-lg">
            <div className="relative flex">
              <label
                htmlFor="adults"
                className="font-bold cursor-pointer mr-2 py-2"
                onClick={toggleAdultsDropdown}
              >
                Adultos ({adultsCount})
              </label>
              {adultsOpen && (
                <div className="absolute mt-1 w-24 bg-white border rounded-lg shadow-lg py-1 top-8 z-10">
                  {[1, 2, 3, 4, 5].map((num) => (
                    <button
                      key={num}
                      className="block w-full px-4 py-2 text-left hover:bg-blue-200 focus:outline-none"
                      onClick={() => handleAdultsSelect(num)}
                    >
                      {num}
                    </button>
                  ))}
                </div>
              )}
            </div>
            <div className="relative flex items-center">
              <label
                htmlFor="children"
                className="font-bold cursor-pointer mr-2 py-2"
                onClick={toggleChildrenDropdown}
              >
                Niños ({childrenCount})
              </label>
              {childrenOpen && (
                <div className="absolute mt-1 w-24 bg-white border rounded-lg shadow-lg py-1 top-8 z-10">
                  {[0, 1, 2, 3, 4].map((num) => (
                    <button
                      key={num}
                      className="block w-full px-4 py-2 text-left hover:bg-blue-200 focus:outline-none"
                      onClick={() => handleChildrenSelect(num)}
                    >
                      {num}
                    </button>
                  ))}
                </div>
              )}
            </div>
          </div>
        </div>

        <button
          type="button"
          onClick={() => router.push('/restaurants')}
          className="bg-blue-500 hover:bg-blue-600 text-white font-bold py-3 px-6 rounded-lg ml-4 focus:outline-none focus:ring-2 focus:ring-blue-500"
        >
          Reserva Ahora
        </button>
      </form>
    </div>
  );
}

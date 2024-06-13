import React, { useEffect, useRef, useState } from 'react';
import { ReactCountryFlag } from 'react-country-flag';
import { IoMdArrowDropdown } from 'react-icons/io';

import { countries, Country } from '@/components/constants/country';

const CountrySelect = ({
  isOpen,
  setIsOpen,
  selectedCountry,
  setSelectedCountry,
}: any) => {
  const handleSelectCountry = (country: Country) => {
    setSelectedCountry(country);
    setIsOpen(false);
  };
  // Creamos una referencia para cada país
  const countryRefs = useRef<Record<string, HTMLElement | null>>({});

  // Función para manejar eventos de teclado
  const handleKeyDown = (event: KeyboardEvent) => {
    const key = event.key.toLowerCase();

    // Encontrar el país que coincide con la tecla presionada
    const country = countries.find(
      (countryF: Country) => countryF.name[0].toLowerCase() === key
    );

    if (country) {
      // Desplazarse al país seleccionado
      const countryElement = countryRefs.current[country.name];
      if (countryElement) {
        // Hacer un scroll suave para centrar el país en la vista
        countryElement.scrollIntoView({
          behavior: 'smooth',
          block: 'center',
        });
      }
    }
  };

  // Añadir el evento de teclado cuando el componente está montado
  useEffect(() => {
    if (isOpen) {
      window.addEventListener('keydown', handleKeyDown);
    }

    // Limpieza: quitar el evento de escucha cuando el componente se desmonta
    return () => {
      window.removeEventListener('keydown', handleKeyDown);
    };
  }, [isOpen, countries, handleSelectCountry]);

  return (
    <>
      <button
        type="button"
        onClick={() => {
          if (!isOpen) setIsOpen(true);
        }}
        className="w-40 bg-gray-100 p-2 rounded-md flex items-center justify-between text-sm"
      >
        <div className="flex items-center gap-3">
          {
            <ReactCountryFlag
              svg
              countryCode={selectedCountry.isoCode}
              className="text-xl rounded-md"
            />
          }
          <span>{selectedCountry.phoneCode}</span>
        </div>
        <span className={' text-gray-500 ml-2'}>
          <IoMdArrowDropdown className="text-lg" />
        </span>
      </button>

      {
        <div
          className={`absolute top-44 left-12 w-[400px] border-b border-r border-l bg-white mt-1 rounded-md max-h-[400px] z-30 overflow-scroll transition-all ${
            isOpen
              ? 'opacity-100 transform translate-y-0'
              : 'opacity-0 scale-90 transform -translate-y-5 -translate-x-5'
          } `}
          style={{ visibility: isOpen ? 'visible' : 'hidden' }}
        >
          {countries.map((country) => (
            <div
              key={country.isoCode}
              ref={(element) => {
                countryRefs.current[country.name] = element;
              }}
              onClick={() => handleSelectCountry(country)}
              className="px-2 py-4 gap-4 hover:bg-gray-200 flex items-center cursor-pointer relative border-b"
            >
              <ReactCountryFlag
                className="text-2xl rounded-lg"
                svg
                countryCode={country.isoCode}
              />
              <span className="text-sm text-gray-800">{country.name}</span>
              <span className="absolute right-3 text-sm">
                {country.phoneCode}
              </span>
            </div>
          ))}
        </div>
      }
    </>
  );
};

export default CountrySelect;

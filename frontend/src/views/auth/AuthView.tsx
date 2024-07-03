import React from 'react';
import LoginCard from './components/LoginCard';

export default function AuthView() {
  return (
    <>
      <div className="py-10 w-screen flex justify-center items-center">
        <LoginCard />
      </div>
    </>
  );
}

import React from 'react';

export default function HomeView() {
  return (
    <div style={{ minHeight: '100vh', padding: '20px', position: 'relative' }}>
      <header style={{ textAlign: 'right' }}>
        <button
          className="bg-red-700 text-yellow-500 border-none py-2 px-4 rounded hover:bg-red-800 text-lg"
          style={{ position: 'absolute', top: '20px', right: '20px' }}
        >
          Botón
        </button>
      </header>
      <main>
        <h1>Contenido de la página</h1>
        <p>Aquí va el contenido de tu página.</p>
      </main>
    </div>
  );
}

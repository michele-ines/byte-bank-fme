import React from 'react';

export const AbrirContaButton: React.FC<React.ButtonHTMLAttributes<HTMLButtonElement>> = (props) => (
  <button
    {...props}
    className="px-4 py-2 rounded font-semibold"
    style={{ background: '#47a138', color: '#ffffff' }}
  >
    ABRIR CONTA
  </button>
);

export const JaTenhoContaButton: React.FC<React.ButtonHTMLAttributes<HTMLButtonElement>> = (props) => (
  <button
    {...props}
    className="px-4 py-2 rounded font-semibold border-2"
    style={{ background: 'transparent', borderColor: '#47a138', color: '#47a138' }}
  >
    JÁ TENHO CONTA
  </button>
);

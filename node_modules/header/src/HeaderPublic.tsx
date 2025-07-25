import React from 'react';
import { Link } from 'react-router-dom';

type Props = { currentPath?: string };

export default function HeaderPublic({ currentPath }: Props) {
  const linkCls = (path: string) =>
    `mx-4 ${currentPath === path ? 'underline' : ''} text-brandGreen font-medium`;

  return (
    <header className="w-full p-4 flex justify-between items-center bg-black">
      <div className="flex items-center gap-8">
        <div className="text-xl font-bold" style={{ color: '#47a138' }}>Bytebank</div>
        <nav className="hidden md:flex items-center">
          <Link to="/dashboard" className={linkCls('/dashboard')}>Dashboard</Link>
          <a href="/home#sobre" className="mx-4 text-brandGreen font-medium">Sobre</a>
          <a href="/home#servicos" className="mx-4 text-brandGreen font-medium">Serviços</a>
        </nav>
      </div>

      <div className="flex items-center gap-3">
        <Link to="/cadastro">
          <button
            className="px-4 py-2 rounded font-semibold"
            style={{ background: '#47a138', color: '#ffffff' }}
          >
            ABRIR CONTA
          </button>
        </Link>
        <Link to="/login">
          <button
            className="px-4 py-2 rounded font-semibold border-2"
            style={{ background: 'transparent', borderColor: '#47a138', color: '#47a138' }}
          >
            Já tenho conta
          </button>
        </Link>
      </div>
    </header>
  );
}

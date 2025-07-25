import React from 'react';
import { Link } from 'react-router-dom';

type Props = { currentPath?: string };

export default function HeaderPrivate({ currentPath }: Props) {
  const linkCls = (path: string) =>
    `mx-4 ${currentPath === path ? 'underline' : ''} text-brandGreen font-medium`;

  return (
    <header className="w-full p-4 flex justify-between items-center" style={{ background: '#004D61' }}>
      <div className="flex items-center gap-8">
        <div className="text-xl font-bold" style={{ color: '#47a138' }}>Bytebank</div>
        <nav className="hidden md:flex items-center">
          <Link to="/dashboard" className={linkCls('/dashboard')}>Início</Link>
          <Link to="/meus-cartoes" className={linkCls('/meus-cartoes')}>Meus cartões</Link>
          <Link to="/investimentos" className={linkCls('/investimentos')}>Investimentos</Link>
          <Link to="/outros-servicos" className={linkCls('/outros-servicos')}>Outros serviços</Link>
        </nav>
      </div>

      <div className="hidden md:flex items-center gap-2 text-white">
        <span className="mr-2">Joana da Silva Oliveira</span>
        <span className="w-8 h-8 rounded-full bg-brandGreen flex items-center justify-center text-black font-bold">J</span>
      </div>
    </header>
  );
}

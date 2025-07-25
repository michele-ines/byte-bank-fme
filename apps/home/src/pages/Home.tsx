import React from 'react';
import { Link } from 'react-router-dom';
import { AbrirContaButton, JaTenhoContaButton } from '../components/Buttons';

export default function Home() {
  return (
    <div className="p-6 flex flex-col items-center gap-4">
            <h1 className="text-3xl font-bold">Home</h1>
      <p className="mt-2">Bem-vindo ao seu painel.</p>

    </div>
  );
}

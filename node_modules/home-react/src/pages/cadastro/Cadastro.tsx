import React from 'react';
import { AbrirContaButton, JaTenhoContaButton } from '../../../../components/Buttons';
import { Link } from 'react-router-dom';

export default function Cadastro() {
  return (
    <div className="p-6 flex flex-col items-center gap-4">
      <h1 className="text-3xl font-bold">Abrir conta</h1>

      <form className="w-full max-w-sm flex flex-col gap-2">
        <input className="border p-2 rounded" placeholder="Nome completo" />
        <input className="border p-2 rounded" placeholder="Email" />
        <input className="border p-2 rounded" placeholder="CPF" />
        <AbrirContaButton type="submit" />
        <Link to="/login">
          <JaTenhoContaButton />
        </Link>
      </form>
    </div>
  );
}

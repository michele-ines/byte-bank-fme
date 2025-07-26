import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { AbrirContaButton, JaTenhoContaButton } from '../../../../components/Buttons';

export default function loginPage() {
  const navigate = useNavigate();
  return (
    <div className="p-6 flex flex-col items-center gap-4">
      <h1 className="text-3xl font-bold">Login</h1>

      <form
        className="w-full max-w-sm flex flex-col gap-2"
        onSubmit={(e) => {
          e.preventDefault();
          navigate('/dashboard');
        }}
      >
        <input className="border p-2 rounded" placeholder="Email" />
        <input type="password" className="border p-2 rounded" placeholder="Senha" />
        <button type="submit" className="px-4 py-2 rounded font-semibold bg-brandGreen text-white">
          Entrar
        </button>
        <Link to="/cadastro">
          <AbrirContaButton />
        </Link>
        <Link to="/home">
          <JaTenhoContaButton />
        </Link>
      </form>
    </div>
  );
}

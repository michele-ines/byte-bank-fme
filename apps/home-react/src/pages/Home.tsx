import React from 'react';
import { Link } from 'react-router-dom';
import { AbrirContaButton, JaTenhoContaButton } from '../../../components/Buttons';

export default function Home() {
  return (
    <div className="p-6 flex flex-col items-center gap-4">
      <h1 className="text-3xl font-bold">Bem-vindo ao Byte Bank</h1>
      <div className="flex gap-2">
        <Link to="/cadastro">
          <AbrirContaButton />
        </Link>
        <Link to="/login">
          <JaTenhoContaButton />
        </Link>
      </div>

      <section id="sobre" className="max-w-2xl mt-8">
        <h2 className="text-2xl font-semibold text-brandGreen">Sobre</h2>
        <p>Somos um banco digital focado em experiência e transparência.</p>
      </section>

      <section id="servicos" className="max-w-2xl mt-8">
        <h2 className="text-2xl font-semibold text-brandGreen">Serviços</h2>
        <ul className="list-disc list-inside">
          <li>Cartão sem anuidade</li>
          <li>Investimentos</li>
          <li>Conta remunerada</li>
        </ul>
      </section>
    </div>
  );
}
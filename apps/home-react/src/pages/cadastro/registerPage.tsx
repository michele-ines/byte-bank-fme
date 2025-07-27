"use client";
import RegisterForm from "../../../../components/forms/register-form";
import { Box, Typography } from "../../../../components/ui";
import ilustracaoCadastro from '../../../../components/ui/imgs/cadastro/ilustracao-cadastro.svg';
import { tw } from 'twind';
import '../../index.css';
export default function RegisterPage() {
  return (
    <div className={tw`min-h-screen flex items-center justify-center bg-[var(--byte-bg-dashboard)] p-4`}>
      <div className={tw`flex flex-col lg:flex-row w-full max-w-5xl bg-white rounded-2xl shadow-md overflow-hidden`}>
        <div className={tw`hidden lg:flex w-full lg:w-1/2 items-center justify-center p-8`}>
          <img
            src={ilustracaoCadastro}
            alt="Ilustração de cadastro"
            className={tw`w-full h-auto max-h-[400px] object-contain`}
          />
        </div>
        <div className={tw`w-full lg:w-1/2 p-8 lg:p-12`}>
          <Typography
            variant="h5"
            className={tw`text-2xl font-bold text-gray-800 mb-8`}
          >
            Preencha os campos abaixo para criar sua conta corrente!
          </Typography>

          <RegisterForm />
        </div>
      </div>
    </div>
  );

}
"use client";
import { tw } from 'twind';
import LoginForm from "../../../../components/forms/login-form";
import { Box, Typography } from "../../../../components/ui";
import ilustracaoLogin from '../../../../components/ui/imgs/login/ilustracao-login.svg';
import '../../index.css';
export default function LoginPage() {
  return (
    <Box className={tw`flex items-center justify-center min-h-screen bg-[var(--byte-bg-dashboard)] px-4`}>
      <Box className={tw`flex flex-col bg-white rounded-2xl shadow-lg max-w-3xl w-full overflow-hidden my-6`}>
        {/* Illustration - Top Section */}
        <Box className={tw`w-full flex items-center justify-center bg-[var(--byte-bg-light)] pt-6 px-6`}>
          <img
            src={ilustracaoLogin}
            alt="Ilustração de login"
            className={tw`object-contain w-[250px] h-[250px]`}
          />
        </Box>

        {/* Form - Bottom Section */}
        <Box className={tw`w-full p-8 lg:p-12 flex flex-col`}>
          <Typography
            variant="h5"
            className={tw`font-bold text-center text-black mb-8`}
          >
            Login
          </Typography>
          <LoginForm />
        </Box>
      </Box>
    </Box>
  );
}
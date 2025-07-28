import { tw } from 'twind';
import ForgotPasswordForm from "../../../../components/forms/forgot-password-form";
import { Box, Typography } from "../../../../components/ui";
import ilustracaoEsqueciSenha from '../../../../components/ui/imgs/login/ilustracao-esqueci-senha.svg';
import '../../index.css';
export default function ForgotPasswordPage() {
  return (
    <Box className={tw`flex items-center justify-center min-h-screen bg-[var(--byte-bg-dashboard)] px-4 py-8`}>
      <Box className={tw`flex flex-col lg:flex-row bg-white rounded-2xl shadow-lg max-w-4xl w-full overflow-hidden`}>
        {/* Illustration Section - Left Side */}
        <Box className={tw`lg:w-1/2 w-full flex items-center justify-center p-8 lg:p-12 bg-gray-50`}>
          <img
            src={ilustracaoEsqueciSenha}
            alt="Ilustração de esqueci senha"
            className={tw`object-contain w-full h-auto max-w-[500px]`}
          />
        </Box>

        {/* Form Section - Right Side */}
        <Box className={tw`lg:w-1/2 w-full flex items-center justify-center p-8 lg:p-12`}>
          <div className={tw`w-full max-w-md`}>
            <Typography 
              variant="h5" 
              className={tw`font-bold text-black pb-6 text-2xl`}
            >
              Esqueci minha senha
            </Typography>
            <ForgotPasswordForm />
          </div>
        </Box>
      </Box>
    </Box>
  );
}
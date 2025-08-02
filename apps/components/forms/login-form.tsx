import React, { useState, useRef } from "react";
import { tw } from "twind";
import { useForm } from "react-hook-form";
import VisibilityIcon from "@mui/icons-material/Visibility";
import VisibilityOffIcon from "@mui/icons-material/VisibilityOff";
import { Box, Button, Input } from "../ui";
import { ROUTES } from "../../config-routes/routes";
import { LoginData } from "../../interfaces/dashboard";
import { loginValidations } from "../../utils/forms-validations/formValidations";
import clsx from "clsx";
import "../../../styles/globals.css";
import { Provider } from "react-redux";
import { store } from "@store/store";
import SnackbarProvider from "@store/SnackbarProvider";
import { useAuth } from "@hooks/use-auth";
import { useNavigate } from "react-router-dom";

// 👇 Alternative to useId in React 17
let globalId = 0;
function generateId() {
  return `form-id-${++globalId}`;
}

// Reusable style variables
const inputBaseStyles = tw`w-full px-4 py-3 rounded-lg focus-within:ring-2`;
const inputNormalStyles = tw`bg-gray-100 border border-gray-200 focus-within:ring-green-500`;
const inputErrorStyles = tw`bg-gray-100 border border-red-500 focus-within:ring-red-300`;
const labelStyles = tw`mb-2 text-sm font-medium text-gray-700`;
const errorTextStyles = tw`text-red-500 text-sm mt-1`;
const passwordToggleStyles = tw`px-4 focus:outline-none`;
const submitButtonStyles = tw`w-full py-3 rounded-lg bg-green-600 hover:bg-green-700 text-white`;
const returnButtonStyles = tw`w-full py-3 rounded-lg`;

function LoginFormContent() {
  const [showPassword, setShowPassword] = useState(false);
  const emailErrorId = useRef(generateId()).current;
  const passwordErrorId = useRef(generateId()).current;

  const { login, loadingAuth } = useAuth();
  const navigate = useNavigate();

  const {
    register,
    handleSubmit,
    watch,
    formState: { errors, isSubmitting },
  } = useForm<LoginData>({
    mode: "onBlur",
  });

  const passwordValue = watch("password", "");

  const processSubmit = async (data: LoginData) => {
    const { email, password } = data;

    login(email, password);
  };

  return (
    <form
      onSubmit={(e) => {
        void handleSubmit(processSubmit)(e);
      }}
      className={tw`flex flex-col space-y-6 flex-1`}
      aria-busy={isSubmitting}
      noValidate
    >
      {/* Email */}
      <Box className={tw`flex flex-col`}>
        <label htmlFor="email" className={labelStyles}>
          E-mail
        </label>
        <Input
          id="email"
          type="email"
          placeholder="Digite seu email cadastrado"
          disableUnderline
          aria-invalid={!!errors.email}
          aria-describedby={errors.email ? emailErrorId : undefined}
          className={clsx(inputBaseStyles, {
            [inputNormalStyles]: !errors.email,
            [inputErrorStyles]: !!errors.email,
          })}
          {...register("email", loginValidations.email)}
        />
        {errors.email && (
          <span id={emailErrorId} role="alert" className={errorTextStyles}>
            {errors.email.message}
          </span>
        )}
      </Box>

      {/* Password */}
      <Box className={tw`flex flex-col`}>
        <label htmlFor="password" className={labelStyles}>
          Senha
        </label>
        <div
          className={clsx(
            tw`flex items-center rounded-lg focus-within:ring-2`,
            {
              [inputNormalStyles]: !errors.password,
              [inputErrorStyles]: !!errors.password,
            }
          )}
        >
          <Input
            id="password"
            type={showPassword ? "text" : "password"}
            placeholder="Digite sua senha"
            disableUnderline
            aria-invalid={!!errors.password}
            aria-describedby={errors.password ? passwordErrorId : undefined}
            className={tw`flex-1 bg-transparent px-4 py-3 placeholder-gray-400 focus:outline-none`}
            {...register("password", loginValidations.password)}
          />
          {passwordValue.length > 0 && (
            <button
              type="button"
              onClick={() => setShowPassword((v) => !v)}
              className={passwordToggleStyles}
              aria-label={showPassword ? "Ocultar senha" : "Mostrar senha"}
            >
              {showPassword ? (
                <VisibilityOffIcon className={tw`text-green-700`} />
              ) : (
                <VisibilityIcon className={tw`text-green-700`} />
              )}
            </button>
          )}
        </div>
        {errors.password && (
          <span id={passwordErrorId} role="alert" className={errorTextStyles}>
            {errors.password.message}
          </span>
        )}
      </Box>

      <Box className={tw`text-right`}>
        <a
          href={ROUTES.FORGOT_PASSWORD}
          className={tw`text-sm text-green-600 underline`}
        >
          Esqueci a senha!
        </a>
      </Box>

      <Box className={tw`mt-6 flex flex-col gap-4`}>
        <Button
          variant="contained"
          color="success"
          type="submit"
          loading={loadingAuth}
          disabled={isSubmitting}
          className={submitButtonStyles}
        >
          {isSubmitting ? "Acessando..." : "Acessar"}
          {isSubmitting && (
            <span className={tw`sr-only`}>
              O formulário está sendo enviado.
            </span>
          )}
        </Button>
        <Button
          type="button"
          variant="outlined"
          className={returnButtonStyles}
          sx={{
            borderColor: "#17803D",
            color: "#17803D",
          }}
          onClick={() => navigate("/home")}
        >
          Voltar
        </Button>
      </Box>
    </form>
  );
}

export default function LoginForm() {
  return (
    <Provider store={store}>
      <SnackbarProvider />
      <LoginFormContent />
    </Provider>
  );
}

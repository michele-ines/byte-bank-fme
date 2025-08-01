"use client";
import { tw } from "twind";
import React, { useState, useRef } from "react";
import clsx from "clsx";
import { useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import {
  Box,
  Button,
  Checkbox,
  Input,
  VisibilityIcon,
  VisibilityOffIcon,
} from "../ui";
import { RegisterData } from "../../interfaces/dashboard";
import { registerValidations } from "../../utils/forms-validations/formValidations";
import "../../../styles/globals.css";
// Função auxiliar para gerar IDs únicos
let globalId = 0;
const generateId = () => `form-id-${++globalId}`;

export default function RegisterForm() {
  const navigate = useNavigate();
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

  const nameId = useRef(generateId()).current;
  const emailId = useRef(generateId()).current;
  const passwordId = useRef(generateId()).current;
  const confirmPasswordId = useRef(generateId()).current;
  const termsId = useRef(generateId()).current;

  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm<RegisterData>({
    mode: "onBlur",
    reValidateMode: "onChange",
  });

  const passwordValue = watch("password", "");
  const confirmValue = watch("confirmPassword", "");

  const onSubmit = (data: RegisterData) => {
    console.log("Cadastro:", data);
    // navigate('/dashboard');
  };

  // Classes Twind para estilos reutilizáveis
  const inputBaseStyles = tw`w-full px-4 py-3 rounded-lg focus-within:ring-2`;
  const inputNormalStyles = tw`bg-gray-100 border border-gray-200 focus-within:ring-green-500`;
  const inputErrorStyles = tw`bg-gray-100 border border-red-500 focus-within:ring-red-300`;
  const labelStyles = tw`text-sm font-medium text-gray-700`;
  const errorTextStyles = tw`text-red-500 text-sm`;
  const passwordToggleStyles = tw`px-4 focus:outline-none`;
  const buttonStyles = tw`w-full justify-center py-3`;

  return (
    <form
      onSubmit={(e) => {
        e.preventDefault();
        void handleSubmit(onSubmit)(e);
      }}
      className={tw`flex flex-col space-y-6 flex-1`}
      noValidate
    >
      {/* Nome */}
      <Box className={tw`flex flex-col`}>
        <label htmlFor="name" className={labelStyles}>
          Nome
        </label>
        <Input
          id="name"
          type="text"
          placeholder="Digite seu nome completo"
          disableUnderline
          className={clsx(inputBaseStyles, {
            [inputNormalStyles]: !errors.name,
            [inputErrorStyles]: !!errors.name,
          })}
          {...register("name", registerValidations.name)}
          aria-invalid={!!errors.name}
          aria-describedby={errors.name ? nameId : undefined}
        />
        {errors.name && (
          <span id={nameId} role="alert" className={errorTextStyles}>
            {errors.name.message}
          </span>
        )}
      </Box>

      {/* Email */}
      <Box className={tw`flex flex-col`}>
        <label htmlFor="email" className={labelStyles}>
          E-mail cadastrado
        </label>
        <Input
          id="email"
          type="email"
          placeholder="Digite seu email cadastrado"
          disableUnderline
          className={clsx(inputBaseStyles, {
            [inputNormalStyles]: !errors.email,
            [inputErrorStyles]: !!errors.email,
          })}
          {...register("email", registerValidations.email)}
          aria-invalid={!!errors.email}
          aria-describedby={errors.email ? emailId : undefined}
        />
        {errors.email && (
          <span id={emailId} role="alert" className={errorTextStyles}>
            {errors.email.message}
          </span>
        )}
      </Box>

      {/* Senha */}
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
            className={tw`flex-1 bg-transparent px-4 py-3 placeholder-gray-400 focus:outline-none`}
            {...register("password", registerValidations.password)}
            aria-invalid={!!errors.password}
            aria-describedby={errors.password ? passwordId : undefined}
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
          <span id={passwordId} role="alert" className={errorTextStyles}>
            {errors.password.message}
          </span>
        )}
      </Box>

      {/* Confirmar Senha */}
      <Box className={tw`flex flex-col`}>
        <label htmlFor="confirmPassword" className={labelStyles}>
          Confirmar senha
        </label>
        <div
          className={clsx(
            tw`flex items-center rounded-lg focus-within:ring-2`,
            {
              [inputNormalStyles]: !errors.confirmPassword,
              [inputErrorStyles]: !!errors.confirmPassword,
            }
          )}
        >
          <Input
            id="confirmPassword"
            type={showConfirmPassword ? "text" : "password"}
            placeholder="Repita sua senha"
            disableUnderline
            className={tw`flex-1 bg-transparent px-4 py-3 placeholder-gray-400 focus:outline-none`}
            {...register(
              "confirmPassword",
              registerValidations.confirmPassword(passwordValue)
            )}
            aria-invalid={!!errors.confirmPassword}
            aria-describedby={
              errors.confirmPassword ? confirmPasswordId : undefined
            }
          />
          {confirmValue.length > 0 && (
            <button
              type="button"
              onClick={() => setShowConfirmPassword((v) => !v)}
              className={passwordToggleStyles}
              aria-label={
                showConfirmPassword ? "Ocultar senha" : "Mostrar senha"
              }
            >
              {showConfirmPassword ? (
                <VisibilityOffIcon className={tw`text-green-700`} />
              ) : (
                <VisibilityIcon className={tw`text-green-700`} />
              )}
            </button>
          )}
        </div>
        {errors.confirmPassword && (
          <span id={confirmPasswordId} role="alert" className={errorTextStyles}>
            {errors.confirmPassword.message}
          </span>
        )}
      </Box>

      {/* Termos e Condições */}
      <Box className={tw`flex flex-col`}>
        <div className={tw`flex items-start mt-2`}>
          <Checkbox
            id="terms"
            {...register("terms", registerValidations.terms)}
            aria-invalid={!!errors.terms}
            aria-describedby={errors.terms ? termsId : undefined}
          />
          <label htmlFor="terms" className={tw`ml-2 text-sm text-gray-600`}>
            Li e estou ciente quanto às condições de tratamento dos meus dados
            conforme descrito na Política de Privacidade do banco.
          </label>
        </div>
        {errors.terms && (
          <span
            id={termsId}
            role="alert"
            className={tw`text-red-500 text-sm mt-1`}
          >
            {errors.terms.message}
          </span>
        )}
      </Box>

      {/* Botão de Submit */}
      <Box className={tw`mt-6`}>
        <Button
          type="submit"
          variant="contained"
          style={{
            background: "var(--byte-color-orange-500)",
            color: "var(--byte-bg-default)",
          }}
          className={buttonStyles}
        >
          Criar conta
        </Button>
      </Box>
    </form>
  );
}

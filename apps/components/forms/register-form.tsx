import React, { useState, useRef } from "react";
import clsx from "clsx";
import { useForm } from "react-hook-form";

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

// Função auxiliar para gerar IDs únicos
let globalId = 0;
const generateId = () => `form-id-${++globalId}`;

export default function RegisterForm() {
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
  };

  return (
    <form
      onSubmit={(e) => {
        void handleSubmit(onSubmit)(e);
      }}
      className="flex flex-col space-y-6 flex-1"
      noValidate
    >
      {/* Nome */}
      <Box className="flex flex-col">
        <label htmlFor="name" className="my-2 text-sm font-medium text-gray-700">
          Nome
        </label>
        <Input
          id="name"
          type="text"
          placeholder="Digite seu nome completo"
          disableUnderline
          className={clsx("w-full px-4 py-3 rounded-lg focus-within:ring-2", {
            "bg-gray-100 border border-gray-200 focus-within:ring-green-500": !errors.name,
            "bg-gray-100 border border-red-500 focus-within:ring-red-300": !!errors.name,
          })}
          {...register("name", registerValidations.name)}
          aria-invalid={!!errors.name}
          aria-describedby={errors.name ? nameId : undefined}
        />
        {errors.name && (
          <span id={nameId} role="alert" className="text-red-500 text-sm">
            {errors.name.message}
          </span>
        )}
      </Box>

      {/* Email */}
      <Box className="flex flex-col">
        <label htmlFor="email" className="mb-2 text-sm font-medium text-gray-700">
          E-mail cadastrado
        </label>
        <Input
          id="email"
          type="email"
          placeholder="Digite seu email cadastrado"
          disableUnderline
          className={clsx("w-full px-4 py-3 rounded-lg focus-within:ring-2", {
            "bg-gray-100 border border-gray-200 focus-within:ring-green-500": !errors.email,
            "bg-gray-100 border border-red-500 focus-within:ring-red-300": !!errors.email,
          })}
          {...register("email", registerValidations.email)}
          aria-invalid={!!errors.email}
          aria-describedby={errors.email ? emailId : undefined}
        />
        {errors.email && (
          <span id={emailId} role="alert" className="text-red-500 text-sm">
            {errors.email.message}
          </span>
        )}
      </Box>

      {/* Senha */}
      <Box className="flex flex-col">
        <label htmlFor="password" className="mb-2 text-sm font-medium text-gray-700">
          Senha
        </label>
        <div
          className={clsx("flex items-center rounded-lg focus-within:ring-2", {
            "bg-gray-100 border border-gray-200 focus-within:ring-green-500": !errors.password,
            "bg-gray-100 border border-red-500 focus-within:ring-red-300": !!errors.password,
          })}
        >
          <Input
            id="password"
            type={showPassword ? "text" : "password"}
            placeholder="Digite sua senha"
            disableUnderline
            className="flex-1 bg-transparent px-4 py-3 placeholder-gray-400 focus:outline-none"
            {...register("password", registerValidations.password)}
            aria-invalid={!!errors.password}
            aria-describedby={errors.password ? passwordId : undefined}
          />
          {passwordValue.length > 0 && (
            <button
              type="button"
              onClick={() => setShowPassword((v) => !v)}
              className="px-4 focus:outline-none"
              aria-label={showPassword ? "Ocultar senha" : "Mostrar senha"}
            >
              {showPassword ? (
                <VisibilityOffIcon className="text-green-700" />
              ) : (
                <VisibilityIcon className="text-green-700" />
              )}
            </button>
          )}
        </div>
        {errors.password && (
          <span id={passwordId} role="alert" className="text-red-500 text-sm">
            {errors.password.message}
          </span>
        )}
      </Box>

      {/* Confirmar Senha */}
      <Box className="flex flex-col">
        <label htmlFor="confirmPassword" className="mb-2 text-sm font-medium text-gray-700">
          Confirmar senha
        </label>
        <div
          className={clsx("flex items-center rounded-lg focus-within:ring-2", {
            "bg-gray-100 border border-gray-200 focus-within:ring-green-500": !errors.confirmPassword,
            "bg-gray-100 border border-red-500 focus-within:ring-red-300": !!errors.confirmPassword,
          })}
        >
          <Input
            id="confirmPassword"
            type={showConfirmPassword ? "text" : "password"}
            placeholder="Repita sua senha"
            disableUnderline
            className="flex-1 bg-transparent px-4 py-3 placeholder-gray-400 focus:outline-none"
            {...register(
              "confirmPassword",
              registerValidations.confirmPassword(passwordValue)
            )}
            aria-invalid={!!errors.confirmPassword}
            aria-describedby={errors.confirmPassword ? confirmPasswordId : undefined}
          />
          {confirmValue.length > 0 && (
            <button
              type="button"
              onClick={() => setShowConfirmPassword((v) => !v)}
              className="px-4 focus:outline-none"
              aria-label={showConfirmPassword ? "Ocultar senha" : "Mostrar senha"}
            >
              {showConfirmPassword ? (
                <VisibilityOffIcon className="text-green-700" />
              ) : (
                <VisibilityIcon className="text-green-700" />
              )}
            </button>
          )}
        </div>
        {errors.confirmPassword && (
          <span
            id={confirmPasswordId}
            role="alert"
            className="text-red-500 text-sm"
          >
            {errors.confirmPassword.message}
          </span>
        )}
      </Box>

      {/* Checkbox */}
      <Box className="flex flex-col">
        <div className="flex items-start mt-2">
          <Checkbox
            id="terms"
            {...register("terms", registerValidations.terms)}
            aria-invalid={!!errors.terms}
            aria-describedby={errors.terms ? termsId : undefined}
          />
          <label htmlFor="terms" className="ml-2 text-sm text-gray-600">
            Li e estou ciente quanto às condições de tratamento dos meus dados
            conforme descrito na Política de Privacidade do banco.
          </label>
        </div>
        {errors.terms && (
          <span id={termsId} role="alert" className="text-red-500 text-sm mt-1">
            {errors.terms.message}
          </span>
        )}
      </Box>

      {/* Botão */}
      <Box className="mt-6">
        <Button
          type="submit"
          variant="contained"
          style={{
            background: "var(--byte-color-orange-500)",
            color: "var(--byte-bg-default)",
          }}
          className="w-full justify-center py-3"
        >
          Criar conta
        </Button>
      </Box>
    </form>
  );
}

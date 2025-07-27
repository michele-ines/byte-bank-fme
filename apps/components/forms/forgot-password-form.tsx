import React, { useState, useRef, useEffect } from "react";
import { tw } from 'twind';
import { useForm, SubmitHandler } from "react-hook-form";
import { Box, Button, Input } from "../ui";
import { ROUTES } from "../../config-routes/routes";
import { ForgotPasswordData } from "../../interfaces/dashboard";
import { forgotPasswordValidations } from "../../utils/forms-validations/formValidations";
import '../styles/globals.css'
// Style variables
const inputBaseStyles = tw`w-full px-4 py-3 rounded-lg focus-within:ring-2`;
const inputNormalStyles = tw`bg-gray-100 border border-gray-200 focus-within:ring-green-500`;
const inputErrorStyles = tw`bg-gray-100 border border-red-500 focus-within:ring-red-300`;
const labelStyles = tw`mb-2 text-sm font-medium text-gray-700`;
const errorTextStyles = tw`text-red-500 text-sm mt-1`;
const successMessageStyles = tw`bg-green-50 border border-green-200 p-4 rounded-lg text-green-800 focus:outline-none focus:ring-2 focus:ring-green-500`;
const submitButtonStyles = tw`w-full py-2 rounded-lg bg-green-600 hover:bg-green-700 text-white`;
const backLinkStyles = tw`text-sm text-green-600 underline`;

export default function ForgotPasswordForm() {
  const [submitted, setSubmitted] = useState(false);
  const successRef = useRef<HTMLDivElement>(null);

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
    setError,
    setFocus,
  } = useForm<ForgotPasswordData>({
    mode: "onBlur",
    criteriaMode: "all",
  });

  const onSubmit: SubmitHandler<ForgotPasswordData> = async (data) => {
    try {
      await new Promise((resolve) => setTimeout(resolve, 1000)); // Simula API

      if (data.email === "erro@exemplo.com") {
        throw new Error("Este e-mail não foi encontrado.");
      }

      setSubmitted(true);
    } catch (error) {
      const message =
        error instanceof Error ? error.message : "Ocorreu um erro inesperado.";
      setError("email", { type: "manual", message });
      setFocus("email");
    }
  };

  useEffect(() => {
    if (submitted && successRef.current) {
      successRef.current.focus();
    }
  }, [submitted]);

  return (
    <Box className={tw`max-w-md`}>
      {submitted ? (
        <div
          ref={successRef}
          tabIndex={-1}
          role="alert"
          aria-live="assertive"
          className={successMessageStyles}
        >
          Um link para redefinição de senha foi enviado para seu e-mail.
        </div>
      ) : (
        <form
          onSubmit={handleSubmit(onSubmit)}
          className={tw`flex flex-col space-y-6`}
          aria-busy={isSubmitting}
          noValidate
        >
          <Box className={tw`flex flex-col`}>
            <label htmlFor="email" className={labelStyles}>
              E-mail cadastrado
            </label>
            <Input
              id="email"
              type="email"
              placeholder="Digite seu email cadastrado"
              disableUnderline
              aria-invalid={!!errors.email}
              aria-describedby={errors.email ? "email-error" : undefined}
              className={tw`${inputBaseStyles} ${
                errors.email ? inputErrorStyles : inputNormalStyles
              }`}
              {...register("email", forgotPasswordValidations.email)}
            />
            {errors.email && (
              <span
                id="email-error"
                role="alert"
                className={errorTextStyles}
              >
                {errors.email.message}
              </span>
            )}
          </Box>

          <Button
            variant="contained"
            color="success"
            type="submit"
            disabled={isSubmitting}
            className={submitButtonStyles}
          >
            {isSubmitting ? "Enviando..." : "Enviar link de recuperação"}
            {isSubmitting && (
              <span className={tw`sr-only`}>Enviando sua solicitação.</span>
            )}
          </Button>

          <Box className={tw`text-center my-6`}>
            <a href={ROUTES.HOME} className={backLinkStyles}>
              Voltar ao login
            </a>
          </Box>
        </form>
      )}
    </Box>
  );
}
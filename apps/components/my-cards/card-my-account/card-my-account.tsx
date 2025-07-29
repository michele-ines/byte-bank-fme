"use client";

import { useState, useRef, useEffect } from "react";
import {
  Box,
  FormControl,
  Button,
  IconButton,
} from "../../ui";

import {
  OutlinedInput,
  FormHelperText,
  InputAdornment,
} from "@mui/material";

import {
  Edit as EditIcon,
  Visibility,
  VisibilityOff,
} from "@mui/icons-material";
import { registerValidations } from "../../../utils/forms-validations/formValidations";
import { RegisterData, UserInfo } from "../../../interfaces/dashboard";
import { useForm } from "react-hook-form";

import "./card-my-accout.css";  

const initialUser: UserInfo = {
  name: "Joana da Silva Oliveira",
  email: "joanadasilvaoliveira@email.com.br",
  password: "(@79Tp6840)",
};

export function CardMyAccount() {
  const [showPassword, setShowPassword] = useState(false);
  const [isEditable, setIsEditable] = useState({
    name: false,
    email: false,
    password: false,
  });

  const {
    register,
    watch,
    formState: { errors },
  } = useForm<RegisterData>({
    mode: "onBlur",
    defaultValues: initialUser,
  });

  const passwordValue = watch("password", "");

  const toggleEdit = (field: keyof typeof isEditable) =>
    setIsEditable((prev) => ({ ...prev, [field]: !prev[field] }));

  /* refs para foco */
  const nameRef = useRef<HTMLInputElement>(null);
  const emailRef = useRef<HTMLInputElement>(null);
  const passwordRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    if (isEditable.name) nameRef.current?.focus();
    if (isEditable.email) emailRef.current?.focus();
    if (isEditable.password) passwordRef.current?.focus();
  }, [isEditable]);

  /* === Funções de estilo MUI (sem alterações) === */
  const inputSx = (field: keyof typeof isEditable) => {
    const editing = isEditable[field];
    const hasError = !!errors[field];
    return {
      backgroundColor: editing ? "#ffffff" : "#cbcbcb",
      color: editing ? "#000000" : "#444444",
      "& .MuiOutlinedInput-notchedOutline": {
        borderColor: hasError
          ? "#bf1313"
          : editing
          ? "#47a138"
          : "rgba(0,0,0,0.23)",
        borderWidth: hasError || editing ? 1 : undefined,
      },
      "&:hover .MuiOutlinedInput-notchedOutline": {
        borderColor: hasError
          ? "#bf1313"
          : editing
          ? "#47a138"
          : undefined,
      },
    };
  };

  const iconSx = (field: keyof typeof isEditable) => {
    const editing = isEditable[field];
    const hasError = !!errors[field];
    if (!editing) {
      return { color: "#444444", backgroundColor: "transparent" };
    }
    if (hasError) {
      return {
        color: "#bf1313",
        backgroundColor: "rgba(191,19,19,0.1)",
        ml: 2,
      };
    }
    return {
      color: "#47a138",
      backgroundColor: "rgba(71,161,56,0.1)",
      ml: 2,
    };
  };

  const visibilityIconSx = () => {
    const hasError = !!errors.password;
    if (hasError) {
      return {
        color: "#bf1313",
        backgroundColor: "rgba(191,19,19,0.1)",
      };
    }
    if (showPassword) {
      return {
        color: "#47a138",
        backgroundColor: "rgba(71,161,56,0.1)",
      };
    }
    return { color: "#444444", backgroundColor: "transparent" };
  };

  return (
    <Box
      className="cardContainer"
      role="region"
      aria-labelledby="my-account-heading"
    >
      <section className="cardSection">
        <h3 id="my-account-heading" className="myAccountTitle">
          Minha conta
        </h3>

        <Box className="cardFlexRowReverse">
          <Box className="cardFormContainer">
            {/* Nome */}
            <FormControl
              variant="outlined"
              fullWidth
              error={!!errors.name}
              aria-invalid={!!errors.name}
            >
              <label htmlFor="name" className="myAccountLabel">
                Nome
              </label>
              <OutlinedInput
                id="name"
                inputRef={nameRef}
                disabled={!isEditable.name}
                sx={inputSx("name")}
                {...register("name", registerValidations.name)}
                aria-describedby="name-helper"
                endAdornment={
                  <InputAdornment position="end">
                    <IconButton
                      aria-label={
                        isEditable.name
                          ? "Concluir edição de nome"
                          : "Editar nome"
                      }
                      onClick={() => toggleEdit("name")}
                      edge="end"
                      sx={iconSx("name")}
                    >
                      <EditIcon />
                    </IconButton>
                  </InputAdornment>
                }
              />
              <FormHelperText id="name-helper">
                {errors.name?.message}
              </FormHelperText>
            </FormControl>

            {/* E-mail */}
            <FormControl
              variant="outlined"
              fullWidth
              error={!!errors.email}
              aria-invalid={!!errors.email}
            >
              <label htmlFor="email" className="myAccountLabel">
                E-mail
              </label>
              <OutlinedInput
                id="email"
                inputRef={emailRef}
                disabled={!isEditable.email}
                sx={inputSx("email")}
                {...register("email", registerValidations.email)}
                aria-describedby="email-helper"
                endAdornment={
                  <InputAdornment position="end">
                    <IconButton
                      aria-label={
                        isEditable.email
                          ? "Concluir edição de e-mail"
                          : "Editar e-mail"
                      }
                      onClick={() => toggleEdit("email")}
                      edge="end"
                      sx={iconSx("email")}
                    >
                      <EditIcon />
                    </IconButton>
                  </InputAdornment>
                }
              />
              <FormHelperText id="email-helper">
                {errors.email?.message}
              </FormHelperText>
            </FormControl>

            {/* Senha */}
            <FormControl
              variant="outlined"
              fullWidth
              error={!!errors.password}
              aria-invalid={!!errors.password}
            >
              <label htmlFor="password" className="myAccountLabel">
                Senha
              </label>
              <OutlinedInput
                id="password"
                type={showPassword ? "text" : "password"}
                inputRef={passwordRef}
                disabled={!isEditable.password}
                sx={inputSx("password")}
                {...register("password", registerValidations.password)}
                aria-describedby="password-helper"
                endAdornment={
                  <InputAdornment position="end">
                    {isEditable.password && passwordValue && (
                      <IconButton
                        aria-label={
                          showPassword ? "Ocultar senha" : "Mostrar senha"
                        }
                        onClick={() => setShowPassword((p) => !p)}
                        edge="end"
                        sx={visibilityIconSx()}
                        aria-pressed={showPassword}
                      >
                        {showPassword ? <VisibilityOff /> : <Visibility />}
                      </IconButton>
                    )}
                    <IconButton
                      aria-label={
                        isEditable.password
                          ? "Concluir edição de senha"
                          : "Editar senha"
                      }
                      onClick={() => toggleEdit("password")}
                      edge="end"
                      sx={iconSx("password")}
                    >
                      <EditIcon />
                    </IconButton>
                  </InputAdornment>
                }
              />
              <FormHelperText id="password-helper">
                {errors.password?.message}
              </FormHelperText>
            </FormControl>

            {/* Botão Salvar */}
            <Box>
              <Button
                type="submit"
                variant="contained"
                className="cardSaveButton"
                style={{
                  background: "#ff5031",
                  color: "#ffffff",
                }}
              >
                Salvar alterações
              </Button>
            </Box>
          </Box>
        </Box>
      </section>
    </Box>
  );
}

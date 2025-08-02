import { useCallback, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { showSnackbar } from "../store/slices/snackbarSlice";
import type { AppDispatch } from "../store";

type RegisterData = {
  name: string;
  email: string;
  password: string;
  confirmPassword: string;
  terms: boolean;
};

const STORAGE_USERS_KEY = "register";
const STORAGE_TOKEN_KEY = "jwtToken";
const SECRET = "chave123";

export function useAuth() {
  const navigate = useNavigate();
  const dispatch = useDispatch<AppDispatch>();
  const [loadingAuth, setLoadingAuth] = useState(false);

  const xor = (text: string, key: string) =>
    Array.from(text)
      .map((char, i) =>
        String.fromCharCode(char.charCodeAt(0) ^ key.charCodeAt(i % key.length))
      )
      .join("");

  const encode = (data: any) => btoa(xor(JSON.stringify(data), SECRET));
  const decode = (encrypted: string) =>
    JSON.parse(xor(atob(encrypted), SECRET));

  const getUsers = (): RegisterData[] => {
    const raw = localStorage.getItem(STORAGE_USERS_KEY);
    return raw ? decode(raw) : [];
  };

  const setUsers = (users: RegisterData[]) => {
    localStorage.setItem(STORAGE_USERS_KEY, encode(users));
  };

  const handleRegister = useCallback(
    (data: RegisterData) => {
      const users = getUsers();
      const alreadyExists = users.some((u) => u.email === data.email);

      if (alreadyExists) {
        dispatch(
          showSnackbar({
            message: "Conta já criada com esse e-mail.",
            severity: "error",
          })
        );

        return;
      }

      setLoadingAuth(true);

      const updated = [...users, data];
      setUsers(updated);

      // Autentica automaticamente após cadastro
      localStorage.setItem(STORAGE_TOKEN_KEY, encode({ email: data.email }));

      dispatch(
        showSnackbar({
          message: "Conta criada com sucesso!",
          severity: "success",
        })
      );

      setTimeout(() => {
        setLoadingAuth(false);
        navigate("/dashboard", { replace: true });
      }, 3000);
    },
    [navigate]
  );

  const login = useCallback(
    (email: string, password: string) => {
      const users = getUsers();
      const found = users.find(
        (u) => u.email === email && u.password === password
      );

      if (!found) {
        dispatch(
          showSnackbar({
            message: "E-mail ou senha inválidos.",
            severity: "error",
          })
        );
        return false;
      }

      setLoadingAuth(true);

      localStorage.setItem(STORAGE_TOKEN_KEY, encode({ email }));
      dispatch(
        showSnackbar({
          message: "Login realizado com sucesso!",
          severity: "success",
        })
      );
      setTimeout(() => {
        setLoadingAuth(false);
        navigate("/dashboard", { replace: true });
      }, 3000);
      return true;
    },
    [navigate]
  );

  const logout = useCallback(() => {
    localStorage.removeItem(STORAGE_TOKEN_KEY);
    navigate("/login");
  }, [navigate]);

  const isAuthenticated = useCallback(() => {
    try {
      const raw = localStorage.getItem(STORAGE_TOKEN_KEY);
      if (!raw) return false;

      const session = decode(raw);
      return !!session?.email;
    } catch {
      return false;
    }
  }, []);

  const getCurrentUser = useCallback(() => {
    try {
      const raw = localStorage.getItem(STORAGE_TOKEN_KEY);
      if (!raw) return null;

      const session = decode(raw);
      const users = getUsers();
      return users.find((u) => u.email === session.email) || null;
    } catch {
      return null;
    }
  }, []);

  return {
    handleRegister,
    login,
    logout,
    isAuthenticated,
    getCurrentUser,
    loadingAuth,
  };
}

import React from "react";
import { useNavigate, useLocation, NavLink } from "react-router-dom";
import {
  AppBar,
  Box,
  Toolbar,
  IconButton,
  Typography,
  Menu,
  MenuItem,
  Button,
  MenuIcon,
  PermIdentityIcon,
} from "../../../components/ui/index";
import { ROUTES } from "../../../config-routes/routes";


export default function HeaderPrivate() {
  const navigate = useNavigate();
  const { pathname } = useLocation();
  

  const isActive = (route: string) =>
    pathname === route || pathname.startsWith(route + "/");

  const linkStyle = (path: string) => ({
    color: "#47a138",
    fontWeight: 500,
    textTransform: "none",
    marginLeft: "16px",
    marginRight: "16px",
    textDecoration: isActive(path) ? "underline" : "none",
  });

  return (
    <AppBar position="static" elevation={0} sx={{ backgroundColor: "#004D61" }}>
      <Toolbar sx={{ justifyContent: "space-between", padding: 2 }}>
        {/* Logo + Menu */}
        <Box sx={{ display: "flex", alignItems: "center", gap: 4 }}>
          {/* Logo texto ou imagem */}
          <NavLink
            to={ROUTES.ROOT}
            className={({ isActive }) => (isActive ? "activeLink" : "")}
          >
            <img
              src="/header/header-logo.svg"
              alt="Logo Bytebank"
              style={{ height: 32, cursor: "pointer", paddingLeft: 10 }}
            />
          </NavLink>

          {/* Navegação */}
          <Box
            sx={{ display: { xs: "none", md: "flex" }, alignItems: "center" }}
          >
            <Button
              sx={linkStyle("/dashboard")}
              onClick={() => navigate("/dashboard")}
            >
              Início
            </Button>
            <Button
              sx={linkStyle("/meus-cartoes")}
              onClick={() => navigate("/meus-cartoes")}
            >
              Meus cartões
            </Button>
            <Button
              sx={linkStyle("/investimentos")}
              onClick={() => navigate("/investimentos")}
            >
              Investimentos
            </Button>
            <Button
              sx={linkStyle("/outros-servicos")}
              onClick={() => navigate("/outros-servicos")}
            >
              Outros serviços
            </Button>
          </Box>
        </Box>

        {/* Usuário */}
                <Box
                  sx={{
                    display: "flex",
                    alignItems: "center",
                    gap: { md: 4, xs: 2 },
                    marginLeft: "auto",
                  }}                >
                  <Typography
                    className="userName"
                    onClick={() => navigate(ROUTES.MY_ACCOUNT)}
                  >
                    Joana da Silva Oliveira
                  </Typography>
                  <IconButton
                    size="large"
                    onClick={() => navigate(ROUTES.MY_ACCOUNT)}
                    className="userButton"
                    title="Minha conta"
                    aria-label="Ícone de usuário"
                  >
                    <PermIdentityIcon fontSize="small" className="userIcon" />
                  </IconButton>
                </Box>
      </Toolbar>
    </AppBar>
  );
}

import React, { useState, useMemo } from "react";
import { useNavigate, useLocation, NavLink } from "react-router-dom";
import "./Header.scss";
import {
  AppBar,
  Box,
  Button,
  IconButton,
  Menu,
  MenuItem,
  Toolbar,
  Typography,
} from "@mui/material";
import MenuIcon from "@mui/icons-material/Menu";

const ROUTES = {
  ROOT: "/",
  DASHBOARD: "/dashboard",
  REGISTER: "/cadastro",
  LOGIN: "/login",
};

export default function HeaderPublic() {
  const navigate = useNavigate();
  const { pathname } = useLocation();

  const showPublicLinks = useMemo(
    () => [ROUTES.ROOT].includes(pathname),
    [pathname]
  );
  const showDashboardBtn = useMemo(
    () => pathname !== ROUTES.DASHBOARD,
    [pathname]
  );

  const bgColor = useMemo(
    () =>
      pathname === ROUTES.DASHBOARD ? "var(--byte-color-dash)" : "#000000",
    [pathname]
  );

  const isActive = (route: string) =>
    pathname === route || pathname.startsWith(route + "/");

  const [anchorEl, setAnchorEl] = useState<HTMLElement | null>(null);
  const openMenu = (e: React.MouseEvent<HTMLElement>) =>
    setAnchorEl(e.currentTarget);
  const closeMenu = () => setAnchorEl(null);

  const underlineStyle: React.CSSProperties = {
    borderBottom: "2px solid #47a138",
    paddingBottom: 4,
  };

  return (
    <AppBar
      position="static"
      className="header"
      style={{ backgroundColor: bgColor, boxShadow: "none" }}
    >
      <Toolbar className="toolbarOverride">
        {/* Logo */}
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

        {/* Desktop nav */}
        <Box
          sx={{
            flexGrow: 1,
            display: { xs: "none", md: "flex" },
            gap: 2,
            ml: 4,
          }}
        >
          {showDashboardBtn && (
            <Button
              component={NavLink}
              to={ROUTES.DASHBOARD}
              sx={{ color: "#47a138" }}
              style={isActive(ROUTES.DASHBOARD) ? underlineStyle : undefined}
            >
              Dashboard
            </Button>
          )}
          {showPublicLinks && (
            <>
              <Button
                component="a"
                href="#sobre"
                sx={{ color: "#47a138" }}
                style={isActive("#sobre") ? underlineStyle : undefined}
              >
                Sobre
              </Button>
              <Button
                component="a"
                href="#servicos"
                sx={{ color: "#47a138" }}
                style={isActive("#servicos") ? underlineStyle : undefined}
              >
                Serviços
              </Button>
            </>
          )}
        </Box>

        {/* Actions */}
        <Box sx={{ display: "flex", alignItems: "center", gap: 2 }}>
          {showPublicLinks && (
            <>
              <Button
                style={{ background: "#47a138", color: "#ffffff" }}
                className="openAccountButton"
                onClick={() => navigate(ROUTES.REGISTER)}
              >
                Abrir Conta
              </Button>
              <Button
                className="loginButton"
                onClick={() => navigate(ROUTES.LOGIN)}
              >
                Já tenho conta
              </Button>
            </>
          )}
          <IconButton
            size="large"
            aria-label="menu"
            onClick={openMenu}
            sx={{ display: { xs: "flex", md: "none" }, color: "#47a138" }}
          >
            <MenuIcon />
          </IconButton>
        </Box>

        {/* Mobile Menu */}
        <Menu anchorEl={anchorEl} open={Boolean(anchorEl)} onClose={closeMenu}>
          {showDashboardBtn && (
            <MenuItem
              onClick={() => {
                closeMenu();
                navigate(ROUTES.DASHBOARD);
              }}
            >
              Início
            </MenuItem>
          )}
          {showPublicLinks && (
            <>
              <MenuItem
                onClick={() => {
                  closeMenu();
                  window.location.hash = "sobre";
                }}
              >
                Sobre
              </MenuItem>
              <MenuItem
                onClick={() => {
                  closeMenu();
                  window.location.hash = "servicos";
                }}
              >
                Serviços
              </MenuItem>
              <MenuItem
                onClick={() => {
                  closeMenu();
                  navigate(ROUTES.REGISTER);
                }}
              >
                Abrir Conta
              </MenuItem>
              <MenuItem
                onClick={() => {
                  closeMenu();
                  navigate(ROUTES.LOGIN);
                }}
              >
                Já tenho conta
              </MenuItem>
            </>
          )}
        </Menu>
      </Toolbar>
    </AppBar>
  );
}

import React, { Suspense, lazy, useMemo, useEffect } from 'react';
import { BrowserRouter, Routes, Route, useLocation, Navigate } from 'react-router-dom';

const HeaderPublic = lazy(() => import('header/HeaderPublic'));
const HeaderPrivate = lazy(() => import('header/HeaderPrivate'));

const Home = lazy(() => import('home/Home'));
const Cadastro = lazy(() => import('home/Cadastro'));
const Login = lazy(() => import('home/Login'));
const EsqueciSenha = lazy(() => import('home/EsqueciSenha'));


const Dashboard = lazy(() => import('dashboard/Dashboard'));
const MeusCartoes = lazy(() => import('dashboard/MeusCartoes'));
const Investimentos = lazy(() => import('dashboard/Investimentos'));
const OutrosServicos = lazy(() => import('dashboard/OutrosServicos'));
const MinhaConta = lazy(() => import('dashboard/MinhaConta'));

let FooterDefined = false;

function useDefineFooter() {
  useEffect(() => {
    if (!FooterDefined) {
      import('footer/define')
        .then(m => m.defineFooter())
        .then(() => { FooterDefined = true; })
        .catch(err => console.error('Erro ao definir footer:', err));
    }
  }, []);
}

function Layout() {
  const location = useLocation();
  useDefineFooter();

  const isPublic = useMemo(() => {
    return location.pathname.startsWith('/home') ||
           location.pathname.startsWith('/cadastro') ||
           location.pathname.startsWith('/login') ||
          location.pathname.startsWith('/esqueci-senha') ||
          location.pathname.startsWith('/minha-conta') ||

           location.pathname === '/';
  }, [location.pathname]);

  const currentPath = location.pathname;

  return (
    <div className="min-h-screen flex flex-col">
      <Suspense fallback={<div className="p-4">Carregando header...</div>}>
        {isPublic ? <HeaderPublic currentPath={currentPath} /> : <HeaderPrivate currentPath={currentPath} />}
      </Suspense>

      <main className="flex-1">
        <Suspense fallback={<div className="p-4">Carregando...</div>}>
          <Routes>
            <Route path="/" element={<Navigate to="/home" replace />} />
            <Route path="/home" element={<Home />} />
            <Route path="/cadastro" element={<Cadastro />} />
            <Route path="/login" element={<Login />} />
            <Route path="/esqueci-senha" element={<EsqueciSenha />} />

            {/* Rotas do Dashboard */}
            <Route path="/dashboard" element={<Dashboard />} />
            <Route path="/meus-cartoes" element={<MeusCartoes />} />
            <Route path="/investimentos" element={<Investimentos />} />
            <Route path="/outros-servicos" element={<OutrosServicos />} />
            <Route path="/minha-conta" element={<MinhaConta />} />

            <Route path="*" element={<div className="p-4">404 - Página não encontrada</div>} />
          </Routes>
        </Suspense>
      </main>

      <div className="mt-auto">
        <byte-footer data-theme={isPublic ? 'public' : 'private'}></byte-footer>
      </div>
    </div>
  );
}

export default function App() {
  return (
    <BrowserRouter>
      <Layout />
    </BrowserRouter>
  );
}

import React, { Suspense, lazy, useMemo, useEffect } from 'react';
import { BrowserRouter, Routes, Route, useLocation, Navigate } from 'react-router-dom';

const HeaderPublic = lazy(() => import('header/HeaderPublic'));
const HeaderPrivate = lazy(() => import('header/HeaderPrivate'));

const Home = lazy(() => import('home/Home'));
const NotFound = lazy(() => import('home/not-found'));
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
        .then((m) => m.defineFooter())
        .then(() => {
          FooterDefined = true;
        })
        .catch((err) => console.error('Erro ao definir footer:', err));
    }
  }, []);
}

// Lista de rotas públicas e privadas
const publicRoutes = ['/home', '/cadastro', '/login', '/', '/esqueci-senha'];
const privateRoutes = [
  '/dashboard',
  '/meus-cartoes',
  '/investimentos',
  '/outros-servicos',
  '/minha-conta',
];

// Função para classificar o tipo da rota
const getRouteType = (pathname: string): 'public' | 'private' | 'unknown' => {
  if (publicRoutes.some((route) => pathname === route || pathname.startsWith(route + '/'))) {
    return 'public';
  }
  if (privateRoutes.some((route) => pathname === route || pathname.startsWith(route + '/'))) {
    return 'private';
  }
  return 'unknown';
};

function Layout() {
  const location = useLocation();
  useDefineFooter();

  const currentPath = location.pathname;

  const routeType = useMemo(() => getRouteType(currentPath), [currentPath]);

  const isPublic = routeType === 'public' || routeType === 'unknown';

  return (
    <div className="min-h-screen flex flex-col">
      <Suspense fallback={<div className="p-4">Carregando header...</div>}>
        {isPublic ? (
          <HeaderPublic currentPath={currentPath} />
        ) : (
          <HeaderPrivate currentPath={currentPath} />
        )}
      </Suspense>

      <main className="flex-1">
        <Suspense fallback={<div className="p-4">Carregando...</div>}>
          <Routes>
            <Route path="/" element={<Navigate to="/home" replace />} />
            <Route path="/home" element={<Home />} />
            <Route path="/cadastro" element={<Cadastro />} />
            <Route path="/login" element={<Login />} />
            <Route path="/esqueci-senha" element={<EsqueciSenha />} />

            <Route path="/dashboard" element={<Dashboard />} />
            <Route path="/meus-cartoes" element={<MeusCartoes />} />
            <Route path="/investimentos" element={<Investimentos />} />
            <Route path="/outros-servicos" element={<OutrosServicos />} />
            <Route path="/minha-conta" element={<MinhaConta />} />

            <Route path="*" element={<NotFound />} />
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

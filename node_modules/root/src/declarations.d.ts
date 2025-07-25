declare module "header/HeaderPublic" {
  const HeaderPublic: React.ComponentType<{ currentPath?: string }>;
  export default HeaderPublic;
}
declare module "header/HeaderPrivate" {
  const HeaderPrivate: React.ComponentType<{ currentPath?: string }>;
  export default HeaderPrivate;
}

declare module "home/Home" {
  const Home: React.ComponentType;
  export default Home;
}
declare module "home/Cadastro" {
  const Cadastro: React.ComponentType;
  export default Cadastro;
}
declare module "home/Login" {
  const Login: React.ComponentType;
  export default Login;
}

declare module "dashboard/Dashboard" {
  const Dashboard: React.ComponentType;
  export default Dashboard;
}
declare module "dashboard/MeusCartoes" {
  const MeusCartoes: React.ComponentType;
  export default MeusCartoes;
}
declare module "dashboard/Investimentos" {
  const Investimentos: React.ComponentType;
  export default Investimentos;
}
declare module "dashboard/OutrosServicos" {
  const OutrosServicos: React.ComponentType;
  export default OutrosServicos;
}
declare module "dashboard/MinhaConta" {
  const MinhaConta: React.ComponentType;
  export default MinhaConta;
}

declare module "footer/define" {
  export function defineFooter(): Promise<void>;
}

declare global {
  namespace JSX {
    interface IntrinsicElements {
      'byte-footer': React.DetailedHTMLProps<React.HTMLAttributes<HTMLElement>, HTMLElement> & { 'data-theme'?: 'public' | 'private' };
    }
  }
}
export {};

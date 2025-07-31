// declare module "header/HeaderPublic" {
//   const HeaderPublic: React.ComponentType<{ currentPath?: string }>;
//   export default HeaderPublic;
// }
// declare module "header/HeaderPrivate" {
//   const HeaderPrivate: React.ComponentType<{ currentPath?: string }>;
//   export default HeaderPrivate;
// }

// declare module "home/Home" {
//   const Home: React.ComponentType;
//   export default Home;
// }
// declare module "home/Cadastro" {
//   const Cadastro: React.ComponentType;
//   export default Cadastro;
// }
// declare module "home/Login" {
//   const Login: React.ComponentType;
//   export default Login;
// }

// declare module "dashboard/Dashboard" {
//   const Dashboard: React.ComponentType;
//   export default Dashboard;
// }
// declare module "dashboard/MeusCartoes" {
//   const MeusCartoes: React.ComponentType;
//   export default MeusCartoes;
// }
// declare module "dashboard/Investimentos" {
//   const Investimentos: React.ComponentType;
//   export default Investimentos;
// }
// declare module "dashboard/OutrosServicos" {
//   const OutrosServicos: React.ComponentType;
//   export default OutrosServicos;
// }
// declare module "dashboard/MinhaConta" {
//   const MinhaConta: React.ComponentType;
//   export default MinhaConta;
// }

// declare module "footer/define" {
//   export function defineFooter(): Promise<void>;
// }
// HEADER
// HEADER
// HEADER
declare module "header/HeaderPublic" {
  const C: any; // ou: import { ComponentType } from "react"; const C: ComponentType<any>;
  export default C;
}
declare module "header/HeaderPrivate" {
  const C: any;
  export default C;
}

// HOME
declare module "home/Home" { const C: any; export default C; }
declare module "home/Cadastro" { const C: any; export default C; }
declare module "home/Login" { const C: any; export default C; }
declare module "home/EsqueciSenha" { const C: any; export default C; }
declare module "home/not-found" { const C: any; export default C; }

// DASHBOARD
declare module "dashboard/Dashboard" { const C: any; export default C; }
declare module "dashboard/MeusCartoes" { const C: any; export default C; }
declare module "dashboard/Investimentos" { const C: any; export default C; }
declare module "dashboard/OutrosServicos" { const C: any; export default C; }
declare module "dashboard/MinhaConta" { const C: any; export default C; }

// FOOTER
declare module "footer/define" {
  export function defineFooter(): Promise<void>;
}

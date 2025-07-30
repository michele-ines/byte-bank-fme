
declare module "*.svg"  { const src: string; export default src; }

declare module "*.scss";
declare module "*.css";

// apps/types/svg-modules.d.ts
declare module "*.svg" {
  const content: string;
  export default content;
}

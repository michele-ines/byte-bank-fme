// dentro do novo arquivo declarations.d.ts
declare module '*.svg' {
  const content: string;
  export default content;
}
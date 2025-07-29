// apps/dashboard-react/src/global.d.ts
declare module '*.module.scss' {
  const classes: { [key: string]: string };
  export default classes;
}
declare module '@my-cards/*' {
  const whatever: any;
  export default whatever;
}

declare module '*.svg' {
  const content: string;
  export default content;
}
# byte-bank-fme (fixed4)

Correções:
- `BrowserRouter` nos `bootstrap.tsx` dos MFs React (header/home/dashboard) para evitar o erro `Cannot destructure property 'basename' ... useContext(...) is null` quando rodando standalone.
- `postcss-loader` incluído em todos apps (e raiz) para evitar `Module not found: postcss-loader`.
- `ts-loader` com `transpileOnly: true` em todos os apps React.
- `export {}` nos `index.tsx` para evitar `TS1208`.
- Tipagem do `byte-footer` + declarações de remotes.

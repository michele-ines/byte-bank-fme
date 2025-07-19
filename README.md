# Byte Bank FME – Arquitetura com Microfrontends, Single-SPA e Workspaces

Projeto educacional estruturado como **monorepo** com `npm workspaces` e microfrontends utilizando o framework `single-spa`. Desenvolvido com **React**, **TypeScript**, **SystemJS**, testes com **Jest**, e empacotado com **Webpack 5**.

---

## 📦 Tecnologias e Ferramentas

- Node.js v21.5.0
- npm v10.2.4
- Webpack 5
- React 17
- TypeScript
- Jest
- ESLint + Prettier + Husky
- single-spa + SystemJS
- npm Workspaces

---

## 📁 Estrutura do Projeto

```
byte-bank-fme/
├── root/            # Microfrontend raiz (container/orquestrador)
├── footer/          # Microfrontend do rodapé (React)
├── package.json     # Workspaces e scripts globais
└── README.md
```

---

## 🧩 Sobre os Microfrontends

### `root/` – Container Principal

- Implementa o `single-spa` e importa os microfrontends via `SystemJS`.
- Usa `webpack-config-single-spa-ts`.
- Porta padrão: **9001**

### `footer/` – Microfrontend React

- Desenvolvido com `React + TypeScript`.
- Usa `webpack-config-single-spa-react-ts`.
- Pode rodar standalone (`--env standalone`) ou ser consumido pelo root.
- Porta padrão: **8500**

---

## ⚙️ Como rodar localmente

### 1. Clone o repositório

```bash
git clone https://github.com/michele-ines/byte-bank-fme.git
cd byte-bank-fme
```

### 2. Instale as dependências com npm workspaces

```bash
npm install
```

### 3. Rode os microfrontends

```bash
npm run start:all
```

> Isso inicia `root` na porta 9001 e `footer` na porta 8500 simultaneamente.

---

## 🚀 Scripts disponíveis

### 📦 Na raiz (`byte-bank-fme/`)

```bash
npm run start:root        # Inicia root
npm run start:footer      # Inicia footer
npm run start:all         # Inicia ambos com concurrently

npm run build:root        # Build do root
npm run build:footer      # Build do footer

npm run lint:root         # Lint em root
npm run lint:footer       # Lint em footer

npm run test:root         # Testes em root
npm run test:footer       # Testes em footer
```

---

## 🧪 Testes

Ambos os microfrontends utilizam:

- `Jest` como test runner
- Suporte para `@testing-library/react`
- Cobertura com `jest --coverage`

---

## 🧱 Estrutura Modular com Webpack + single-spa

### root (`webpack-config-single-spa-ts`)

- Usa `System.import()` para carregar outros microfrontends registrados em `SystemJS`.
- Usa `html-webpack-plugin` para gerar o HTML principal.

### footer (`webpack-config-single-spa-react-ts`)

- Pode rodar isoladamente ou ser consumido pelo root.
- Exporta lifecycle do `single-spa-react`.

---

## ✨ Outras ferramentas

- `eslint` e `prettier` para padronização de código
- `husky` e `pretty-quick` para pre-commit
- `concurrently` para rodar múltiplos scripts em paralelo
- `cross-env` para compatibilidade de ambiente
- `tsc` e `ts-config-single-spa` para tipagem e builds

---

## 🌐 Portas por padrão

| Microfrontend | Porta |
|---------------|-------|
| root          | 9001  |
| footer        | 8500  |

---

## 👩‍💻 Autoria

Projeto desenvolvido para fins educacionais de pós-graduação.  
**Autora:** Michele Ines / `pos graduacao`

---

## 📄 Licença

Licenciado sob **ISC**.

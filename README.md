
# Byte Bank FME – Monorepo de Microfrontends

Este repositório organiza **cinco** microfrontends (MFEs) ― quatro em **React** e um em **Angular** ― usando **Webpack 5 Module Federation**.  
Todos os projetos vivem na pasta `apps/` e são gerenciados como **workspaces npm** para facilitar o _dependency‑hoisting_, a instalação única de dependências e a execução de _scripts_ em paralelo.

```
byte-bank-fme/
├─ package.json          # raiz do monorepo (workspaces)
└─ apps/
   ├─ root/              # _Shell_ / _host_ principal (React 17)
   ├─ header-react/      # MFE de cabeçalho (React 17)
   ├─ home-react/        # MFE da home (React 17)
   ├─ dashboard-react/   # MFE de dashboard (React 18)
   └─ footer-angular/    # MFE de rodapé (Angular 20)
```

## Principais versões de _tooling_

| Ferramenta | Versão |
| ---------- | ------ |
| **Webpack** | 5.91.0 |
| **Module Federation** | integrada ao Webpack 5 |
| **TypeScript** | 4.3.5 (React MFEs) / 5.5.4 (Angular MFE) |
| **React** | 17.0.2 (root, header, home) / 18.2.0 (dashboard) |
| **Angular** | 20.1.1 (footer) |
| **Tailwind CSS** | 3.x |
| **Jest** | 29 – 30 |
| **Node** (recomendado) | ≥ 18.x |

> Consulte a documentação oficial do Module Federation em: <https://module-federation.io/>

---

## Pré‑requisitos

1. **Node.js ≥ 18** e **npm ≥ 9** instalados.
2. Porta **3000**+ livre (cada MFE escuta em uma porta diferente).

## Instalação

```bash
# Clonar o repositório
git clone <url-do-repo>
cd byte-bank-fme

# Instalar TODAS as dependências de todos os pacotes
npm install
```

> Graças aos _workspaces_, basta rodar `npm install` uma única vez na raiz.

## Scripts úteis (raiz)

| Comando | O que faz |
| ------- | --------- |
| `npm start` | Executa **TODOS** os MFEs em paralelo (via `concurrently`).<br>• root ‑ `http://localhost:3000`<br>• header ‑ `http://localhost:3001`<br>• home ‑ `http://localhost:3002`<br>• dashboard ‑ `http://localhost:3003`<br>• footer (Angular) ‑ `http://localhost:4200` |
| `npm run build --workspaces` | Gera builds de produção para todos os projetos. |
| `npm run test --workspaces` | Executa a suíte de testes Jest em todos os MFEs. |

### Scripts por MFE

Dentro de cada subpasta em `apps/*` você encontrará:

| Comando | Descrição |
| ------- | --------- |
| `npm run start` | Sobe **somente** aquele MFE com _hot‑reload_. |
| `npm run build` | Build de produção daquele MFE (em `dist/`). |
| `npm run test` | Executa testes unitários (Jest + `@testing-library`). |

## Resolução de caminhos TypeScript

Para perfis de importação absolutos usamos **tsconfig‑paths‑webpack‑plugin**:

```bash
npm install -D tsconfig-paths-webpack-plugin
```

No `webpack.config.js` de cada MFE React:

```js
const TsconfigPathsPlugin = require('tsconfig-paths-webpack-plugin');

module.exports = {
  resolve: {
    plugins: [new TsconfigPathsPlugin()],
  },
};
```

## Configuração do Module Federation

Cada `webpack.config.js` contém um _ModuleFederationPlugin_ definindo:

* **name** – identificador do microfrontend;
* **filename** – arquivo remoto expositor (ex.: `remoteEntry.js`);
* **exposes** – módulos/rotas exportados;
* **remotes** – MFEs consumidos;
* **shared** – dependências de singleton (React, React‑DOM, Angular core).

Exemplo simplificado (_header-react_):

```js
new ModuleFederationPlugin({
  name: 'header',
  filename: 'remoteEntry.js',
  exposes: {
    './Header': './src/Header',
  },
  shared: { react: { singleton: true }, 'react-dom': { singleton: true } },
});
```

O MFE **root** atua como **_host/container_**, consumindo os remotes e renderizando‑os via `React.lazy()` e `Suspense` (ou `loadRemoteModule` no Angular).

## Lint e _format_

* **stylelint** + `stylelint-config-standard` + `stylelint-config-tailwindcss` garantem boas práticas de CSS/SCSS.
* Scripts opcionais (adicione se quiser):

```jsonc
"lint:styles": "stylelint "**/*.{css,scss,tsx,ts}" --fix"
```

## Testes

* **Jest** + `@testing-library/*` para testes de unidade e de componentes.
* `ts-jest` transpila TypeScript durante os testes.

```bash
npm run test            # Executa tudo
npm run test -w apps/home-react   # Executa apenas na home
```

## Pipeline CI/CD (sugestão)

1. **Install** – `npm ci`
2. **Lint** – `npm run lint --workspaces`
3. **Test** – `npm run test --workspaces`
4. **Build** – `npm run build --workspaces`
5. **Deploy** artefatos dos MFEs para CDN ou buckets estáticos.

---

## Como adicionar um novo MFE

1. `mkdir -p apps/<meu-mfe>` → inicialize `package.json`.
2. Crie `webpack.config.js` copiando um existente e ajuste `ModuleFederationPlugin`.
3. Adicione script `"start"` (porta livre), `"build"` e `"test"`.
4. Atualize `apps/*` no `concurrently` da raiz se quiser incluí‑lo no _watch_ geral.

## Licença

Distribuído sob a licença **MIT**. Consulte `LICENSE` para detalhes.

---

> _Happy coding!_ 🚀

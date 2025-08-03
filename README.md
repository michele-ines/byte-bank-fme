
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

| Ferramenta             | Versão                                           |
| ---------------------- | ------------------------------------------------ |
| **Webpack**            | 5.91.0                                           |
| **Module Federation**  | integrada ao Webpack 5                           |
| **TypeScript**         | 4.3.5 (React MFEs) / 5.5.4 (Angular MFE)         |
| **React**              | 17.0.2 (root, header, home) / 18.2.0 (dashboard) |
| **Angular**            | 20.1.1 (footer)                                  |
| **Tailwind CSS**       | 3.x                                              |
| **Node** (recomendado) | ≥ 18.x                                           |

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

---

## Scripts

### Rodar todos os MFEs (modo dev)

```bash
npm start
# ou:
npm run start:dev
```

Isso dispara em paralelo (via `concurrently`) cada aplicação:

- **ROOT**: host principal (React) em `http://localhost:3000`  
- **HEADER**: cabeçalho (React) em `http://localhost:3001`  
- **HOME**: página inicial (React) em `http://localhost:3002`  
- **DASHBOARD**: dashboard (React) em `http://localhost:3003`  
- **FOOTER**: rodapé (Angular) em `http://localhost:4200`

Exemplo de saída parcial:

```
> concurrently -n "ROOT,HEADER,HOME,DASH,FOOTER" -c "blue,magenta,green,yellow,cyan" \
  "npm run start -w apps/root" "npm run start -w apps/header-react" ... "npm run start -w apps/footer-angular"
[i] [webpack-dev-server] Project is running at:
[i] [webpack-dev-server] Loopback: http://localhost:3001/
...
[ROOT] external "header@http://localhost:3001/remoteEntry.js" 42 bytes [built]
...
```

### Build de produção

```bash
npm run build --workspaces
```

### Scripts por MFE

Dentro de cada subpasta em `apps/*`:

| Comando         | Descrição                                     |
| --------------- | --------------------------------------------- |
| `npm run start` | Sobe **somente** aquele MFE com _hot‑reload_. |
| `npm run build` | Build de produção daquele MFE (em `dist/`).   |

---

## Resolução de caminhos TypeScript

Para perfis de importação absolutos usamos **tsconfig‑paths‑webpack‑plugin**:

```bash
npm install -D tsconfig-paths-webpack-plugin
```

No `webpack.config.js` de cada MFE React:

```js
const TsconfigPathsPlugin = require("tsconfig-paths-webpack-plugin");

module.exports = {
  resolve: {
    plugins: [new TsconfigPathsPlugin()],
  },
};
```

---

## Configuração do Module Federation

Cada `webpack.config.js` contém um _ModuleFederationPlugin_ definindo:

- **name** – identificador do microfrontend;  
- **filename** – arquivo remoto expositor (ex.: `remoteEntry.js`);  
- **exposes** – módulos/rotas exportados;  
- **remotes** – MFEs consumidos;  
- **shared** – dependências de singleton (React, React‑DOM, Angular core).

Exemplo simplificado (_header-react_):

```js
new ModuleFederationPlugin({
  name: "header",
  filename: "remoteEntry.js",
  exposes: { "./Header": "./src/Header" },
  shared: { react: { singleton: true }, "react-dom": { singleton: true } },
});
```

---

## Desenvolvimento Local em Modo Dev

Para facilitar o desenvolvimento de todos os microfrontends simultaneamente, utilizamos o comando:

```bash
npm run start:dev
```

Internamente, ele executa em paralelo (via `concurrently`) cada aplicação:

- **ROOT**: host principal (React) em `http://localhost:3000`  
- **HEADER**: cabeçalho (React) em `http://localhost:3001`  
- **HOME**: página inicial (React) em `http://localhost:3002`  
- **DASHBOARD**: dashboard (React) em `http://localhost:3003`  
- **FOOTER**: rodapé (Angular) em `http://localhost:4200`

---

## APIs de Arquivos (Upload, Download, Delete)

Este monorepo inclui endpoints para gerenciar anexos:

| Método | Caminho                        | Descrição                                                           |
| ------ | ------------------------------ | ------------------------------------------------------------------- |
| POST   | `/api/upload`                  | Recebe um arquivo (`form-data` com chave `anexo`) e o salva em `tmp/`. |
| GET    | `/api/download/:nomeDoArquivo` | Inicia o download de um arquivo específico de `tmp/`.               |
| DELETE | `/api/delete/:nomeDoArquivo`   | Exclui um arquivo específico da pasta `tmp/`.                       |

### Exemplos de uso

- **Upload (cURL)**:
  ```bash
  curl -X POST http://localhost:3000/api/upload \
    -F "anexo=@/caminho/para/arquivo.pdf"
  ```

- **Download (cURL)**:
  ```bash
  curl http://localhost:3000/api/download/exemplo.pdf --output exemplobaixado.pdf
  ```

- **Delete (cURL)**:
  ```bash
  curl -X DELETE http://localhost:3000/api/delete/exemplo.pdf
  ```

- **Download (JavaScript fetch)**:
  ```javascript
  fetch('http://localhost:3000/api/download/nomedoarquivo.pdf')
    .then(res => {
      if (!res.ok) throw new Error('Erro ao baixar');
      return res.blob();
    })
    .then(blob => {
      const url = window.URL.createObjectURL(blob);
      const a = document.createElement('a');
      a.href = url;
      a.download = 'baixado.pdf';
      a.click();
      window.URL.revokeObjectURL(url);
    })
    .catch(console.error);
  ```
---

## Lint e _format_

- **stylelint** + `stylelint-config-standard` + `stylelint-config-tailwindcss`  
- Scripts opcionais:
```json
"lint:styles": "stylelint "**/*.{css,scss,tsx,ts}" --fix"
```

## Testes

- **Jest** + `@testing-library/*`  
- `ts-jest` transpila TypeScript durante os testes.

```bash
npm test
```

---

## Pipeline CI/CD (sugestão)

1. **Install** – `npm ci`  
2. **Build** – `npm run build --workspaces`  
3. **Deploy** – artefatos dos MFEs para CDN ou buckets estáticos.

---

## Como adicionar um novo MFE

1. `mkdir -p apps/<meu-mfe>`  
2. Inicialize `package.json`.  
3. Copie e ajuste `webpack.config.js` com seu `ModuleFederationPlugin`.  
4. Adicione scripts `"start"`, `"build"` e `"test"`.  
5. Atualize o `concurrently` na raiz, se desejar incluí‑lo no watch geral.

---

## Licença

Distribuído sob a licença **MIT**. Consulte `LICENSE` para detalhes.

> _Happy coding!_ 🚀

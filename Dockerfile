# ================================
# Dockerfile para Microfrontend com Module Federation
# Otimizado para Railway Cloud
# ================================

# Base image
FROM node:22-alpine AS base
WORKDIR /app

# Instalar dependências do sistema (Alpine)
RUN apk add --no-cache libc6-compat curl

# ================================
# Stage 1: Instalar dependências
# ================================
FROM base AS deps

# Copiar arquivos de dependências do root
COPY package*.json ./


# Instalar dependências do workspace root
RUN npm ci && npm cache clean --force

# ================================
# Stage 2: Build da aplicação
# ================================
FROM base AS builder

# Copiar dependências instaladas
COPY --from=deps /app/node_modules ./node_modules

# Copiar código fonte
COPY . .

# Definir NODE_ENV para produção
ENV NODE_ENV=production

# Definir variável para instalação automática do webpack-cli
ENV npm_config_yes=true

# Instalar webpack e webpack-cli globalmente para evitar problemas de instalação interativa
RUN npm install -g webpack webpack-cli

# Instalar dependências de cada workspace individualmente (incluindo devDependencies)
RUN cd apps/root && npm install --include=dev
RUN cd apps/header-react && npm install --include=dev
RUN cd apps/home-react && npm install --include=dev
RUN cd apps/dashboard-react && npm install --include=dev
RUN cd apps/footer-angular && npm install --include=dev

# Fazer build de cada microfrontend
RUN cd apps/root && npm run build
RUN cd apps/header-react && npm run build
RUN cd apps/home-react && npm run build
RUN cd apps/dashboard-react && npm run build
RUN cd apps/footer-angular && npm run build

# ================================
# Stage 3: Produção
# ================================
FROM base AS production

# Definir variável para instalação automática do webpack-cli
ENV npm_config_yes=true

# Instalar webpack e webpack-cli globalmente para produção
RUN npm install -g webpack webpack-cli

# Criar usuário não-root para segurança
RUN addgroup --system --gid 1001 nodejs
RUN adduser --system --uid 1001 appuser

# Copiar builds da aplicação
COPY --from=builder --chown=appuser:nodejs /app/apps/root/dist ./apps/root/dist
COPY --from=builder --chown=appuser:nodejs /app/apps/header-react/dist ./apps/header-react/dist
COPY --from=builder --chown=appuser:nodejs /app/apps/home-react/dist ./apps/home-react/dist
COPY --from=builder --chown=appuser:nodejs /app/apps/dashboard-react/dist ./apps/dashboard-react/dist
COPY --from=builder --chown=appuser:nodejs /app/apps/footer-angular/dist ./apps/footer-angular/dist

# Copiar node_modules de cada workspace
COPY --from=builder --chown=appuser:nodejs /app/apps/root/node_modules ./apps/root/node_modules
COPY --from=builder --chown=appuser:nodejs /app/apps/header-react/node_modules ./apps/header-react/node_modules
COPY --from=builder --chown=appuser:nodejs /app/apps/home-react/node_modules ./apps/home-react/node_modules
COPY --from=builder --chown=appuser:nodejs /app/apps/dashboard-react/node_modules ./apps/dashboard-react/node_modules
COPY --from=builder --chown=appuser:nodejs /app/apps/footer-angular/node_modules ./apps/footer-angular/node_modules

# Copiar dependências de produção do root
COPY --from=deps /app/node_modules ./node_modules

# Copiar arquivos de configuração
COPY --chown=appuser:nodejs package*.json ./
COPY --chown=appuser:nodejs server.js ./
COPY --chown=appuser:nodejs apps/ ./apps/

# Instalar devDependencies do root (necessário para concurrently)
RUN npm install --include=dev

# Copiar builds dos outros microfrontends para o diretório do root
RUN mkdir -p apps/root/dist/header apps/root/dist/home apps/root/dist/dashboard apps/root/dist/footer
RUN cp -r apps/header-react/dist/* apps/root/dist/header/ || true
RUN cp -r apps/home-react/dist/* apps/root/dist/home/ || true  
RUN cp -r apps/dashboard-react/dist/* apps/root/dist/dashboard/ || true
RUN cp -r apps/footer-angular/dist/* apps/root/dist/footer/ || true

# Copiar assets públicos do header (logo, etc.) diretamente para /header/
RUN mkdir -p apps/root/dist/header
RUN cp -r apps/header-react/public/header/* apps/root/dist/header/ || true

# Criar diretório tmp com permissões corretas antes de mudar para usuário não-root
RUN mkdir -p tmp && chown -R appuser:nodejs tmp && chmod 755 tmp

# Dar permissões de escrita para o usuário appuser no diretório de trabalho
RUN chown -R appuser:nodejs /app

# Mudar para usuário não-root
USER appuser

# Definir variáveis de ambiente
ENV NODE_ENV=production
ENV PORT=3000

# Expor porta (Railway usa a variável PORT)
EXPOSE $PORT

# Health check usando o endpoint /health do server.js
HEALTHCHECK --interval=30s --timeout=10s --start-period=40s --retries=3 \
  CMD curl -f http://localhost:$PORT/health || exit 1

# Comando para produção - usa o server.js
CMD ["node", "server.js"]

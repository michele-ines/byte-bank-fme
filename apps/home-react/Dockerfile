# Dockerfile para Home React Microfrontend
FROM node:22-alpine AS base
WORKDIR /app

# Instalar dependências do sistema
RUN apk add --no-cache libc6-compat curl

# ================================
# Stage 1: Instalar dependências
# ================================
FROM base AS deps

# Copiar arquivos de dependências
COPY package*.json ./

# Instalar dependências
RUN npm ci --only=production && npm cache clean --force

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

# Instalar todas as dependências (incluindo dev)
RUN npm install

# Fazer build da aplicação
RUN npm run build

# ================================
# Stage 3: Produção
# ================================
FROM base AS production

# Criar usuário não-root para segurança
RUN addgroup --system --gid 1001 nodejs
RUN adduser --system --uid 1001 appuser

# Copiar dependências de produção
COPY --from=deps /app/node_modules ./node_modules

# Copiar build da aplicação
COPY --from=builder --chown=appuser:nodejs /app/dist ./dist

# Copiar arquivos de configuração
COPY --chown=appuser:nodejs package*.json ./
COPY --chown=appuser:nodejs webpack.config.js ./
COPY --chown=appuser:nodejs tailwind.config.js ./
COPY --chown=appuser:nodejs postcss.config.js ./

# Mudar para usuário não-root
USER appuser

# Definir variáveis de ambiente
ENV NODE_ENV=production
ENV PORT=3002

# Expor porta
EXPOSE $PORT

# Health check
HEALTHCHECK --interval=30s --timeout=10s --start-period=40s --retries=3 \
  CMD curl -f http://localhost:$PORT/ || exit 1

# Instalar serve para servir arquivos estáticos
RUN npm install -g serve

# Comando para produção - serve os arquivos buildados
CMD ["serve", "-s", "dist", "-l", "3002"]

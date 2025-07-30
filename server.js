const express = require('express');
const path = require('path');
const app = express();

// Middleware para logs
app.use((req, res, next) => {
  console.log(`${new Date().toISOString()} - ${req.method} ${req.url}`);
  next();
});

// Servir arquivos estáticos do root
app.use(express.static(path.join(__dirname, 'apps/root/dist')));

// Health check endpoint
app.get('/health', (req, res) => {
  res.json({ 
    status: 'ok', 
    timestamp: new Date().toISOString(),
    uptime: process.uptime()
  });
});

// Fallback para SPA (Single Page Application)
app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname, 'apps/root/dist/index.html'));
});

const port = process.env.PORT || 3000;

app.listen(port, '0.0.0.0', () => {
  console.log(`🚀 Server ready on port ${port}`);
  console.log(`📁 Serving static files from: ${path.join(__dirname, 'apps/root/dist')}`);
  console.log(`🏥 Health check available at: http://localhost:${port}/health`);
  
  // Sinal para Railway que a aplicação está pronta
  if (process.send) {
    process.send('ready');
    console.log('✅ Ready signal sent to Railway');
  }
});

// Graceful shutdown
process.on('SIGTERM', () => {
  console.log('🛑 SIGTERM received, shutting down gracefully');
  process.exit(0);
});

process.on('SIGINT', () => {
  console.log('🛑 SIGINT received, shutting down gracefully');
  process.exit(0);
});

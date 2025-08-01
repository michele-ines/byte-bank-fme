const express = require('express');
const multer = require('multer');
const cors = require('cors');
const path = require('path');
const fs = require('fs');
const app = express();

// Configurando o CORS
app.use(cors());

// Middleware para parsing JSON
app.use(express.json());

// Middleware para logs
app.use((req, res, next) => {
  console.log(`${new Date().toISOString()} - ${req.method} ${req.url}`);
  next();
});

// Criando e configurando a pasta de uploads
const pastaDeUploads = 'tmp';
if (!fs.existsSync(pastaDeUploads)){
    fs.mkdirSync(pastaDeUploads);
}

// Configurando o Multer para uploads
const armazenamento = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, pastaDeUploads);
  },
  filename: function (req, file, cb) {
    const nomeUnico = Date.now() + '-' + file.originalname;
    cb(null, nomeUnico);
  }
});

const upload = multer({ storage: armazenamento });

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

// Rota para fazer o UPLOAD
app.post('/api/upload', upload.single('anexo'), (req, res) => {
  if (!req.file) {
    return res.status(400).json({ mensagem: 'Erro: Nenhum arquivo foi enviado.' });
  }

  res.status(200).json({
    mensagem: 'Upload realizado com sucesso!',
    nomeDoArquivo: req.file.filename
  });
});

// Rota para fazer o DOWNLOAD
app.get('/api/download/:nomeDoArquivo', (req, res) => {
  const { nomeDoArquivo } = req.params;
  const caminhoDoArquivo = path.join(__dirname, pastaDeUploads, nomeDoArquivo);

  res.download(caminhoDoArquivo, (erro) => {
    if (erro) {
      console.error("Erro ao baixar o arquivo:", erro);
      res.status(404).json({ mensagem: 'Arquivo não encontrado.' });
    }
  });
});

// Rota para DELETAR arquivos
app.delete('/api/delete/:nomeDoArquivo', (req, res) => {
  const { nomeDoArquivo } = req.params;
  const caminhoDoArquivo = path.join(__dirname, pastaDeUploads, nomeDoArquivo);

  console.log(`Tentando deletar o arquivo: ${caminhoDoArquivo}`);

  fs.unlink(caminhoDoArquivo, (erro) => {
    if (erro) {
      console.error("Erro ao deletar o arquivo:", erro);
      if (erro.code === 'ENOENT') {
        return res.status(404).json({ mensagem: 'Arquivo não encontrado. Não foi possível deletar.' });
      }
      return res.status(500).json({ mensagem: 'Erro interno ao tentar deletar o arquivo.' });
    }

    res.status(200).json({
      mensagem: `Arquivo '${nomeDoArquivo}' foi deletado com sucesso.`
    });
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

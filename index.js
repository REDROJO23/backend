// backend/index.js
require('dotenv').config();
const express = require('express');
const cors = require('cors');
const app = express();
const registroRoutes = require('./routes/registroRoutes');

// Configurar CORS para permitir acceso desde tu frontend
app.use(cors({
  origin: 'https://tu-frontend.netlify.app', // Reemplaza con tu dominio real
  methods: ['GET', 'POST'],
  credentials: true
}));

app.use(express.json());

// Rutas
app.use('/api', registroRoutes);

// Puerto dinámico para Render
const PORT = process.env.PORT || 3001;
app.listen(PORT, () => {
  console.log(`Servidor backend corriendo en puerto ${PORT}`);
});

app.get('/', (req, res) => {
  res.send('🚀 Backend corriendo correctamente en Render');
});
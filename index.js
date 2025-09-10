// backend/index.js
require('dotenv').config();
const express = require('express');
const cors = require('cors');
const app = express();
const registroRoutes = require('./routes/registroRoutes');

app.use(cors({
  origin: 'https://tu-frontend.netlify.app' // Reemplaza con tu dominio real
}));
app.use(express.json());
app.use('/api', registroRoutes);

const PORT = process.env.PORT || 3001;
app.listen(PORT, () => {
  console.log(`Servidor backend corriendo en puerto ${PORT}`);
});
// backend/routes/registroRoutes.js
const express = require('express');
const router = express.Router();
const { insertarRegistro, consultarPorNombre, eliminarPorId } = require('../models/registroModel');

// Ruta de prueba para verificar conexión
router.get('/ping', (req, res) => {
  res.send('pong');
});

// Ruta para registrar datos
router.post('/registro', async (req, res) => {
  try {
    console.log('Petición recibida en /registro');
    console.log('Datos recibidos:', req.body);

    await insertarRegistro(req.body);
    res.status(200).json({ mensaje: 'Registro exitoso' });
  } catch (err) {
    console.error('❌ Error en /registro:', err.message);
    res.status(500).json({ error: err.message });
  }
});

// Ruta para consultar por nombre
router.get('/consulta/:nombre', async (req, res) => {
  try {
    const datos = await consultarPorNombre(req.params.nombre);
    res.json(datos);
  } catch (err) {
    console.error('❌ Error en /consulta:', err.message);
    res.status(500).json({ error: err.message });
  }
});

// Ruta para eliminar por ID
router.delete('/eliminar/:id', async (req, res) => {
  try {
    await eliminarPorId(req.params.id);
    res.json({ mensaje: 'Registro eliminado' });
  } catch (err) {
    console.error('❌ Error en /eliminar:', err.message);
    res.status(500).json({ error: err.message });
  }
});

module.exports = router;
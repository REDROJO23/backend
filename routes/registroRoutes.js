// backend/routes/registroRoutes.js
const express = require('express');
const router = express.Router();
const {
  insertarRegistro,
  consultarPorNombre,
  eliminarPorId
} = require('../models/registroModel');

// Ruta de prueba para verificar conexión
router.get('/ping', (req, res) => {
  res.json({ mensaje: 'pong' });
});

// Ruta para registrar datos
router.post('/registro', async (req, res) => {
  try {
    const { nombre, hora } = req.body;

    if (!nombre || !hora) {
      return res.status(400).json({ error: 'Faltan campos requeridos' });
    }

    await insertarRegistro({ nombre, hora });
    res.status(201).json({ mensaje: 'Registro exitoso' });
  } catch (err) {
    console.error('❌ Error en /registro:', err.message);
    res.status(500).json({ error: 'Error interno del servidor' });
  }
});

// Ruta para consultar por nombre
router.get('/consulta/:nombre', async (req, res) => {
  try {
    const datos = await consultarPorNombre(req.params.nombre);

    if (datos.length === 0) {
      return res.status(404).json({ mensaje: 'No se encontraron registros' });
    }

    res.json(datos);
  } catch (err) {
    console.error('❌ Error en /consulta:', err.message);
    res.status(500).json({ error: 'Error interno del servidor' });
  }
});

// Ruta para eliminar por ID
router.delete('/eliminar/:id', async (req, res) => {
  try {
    await eliminarPorId(req.params.id);
    res.json({ mensaje: 'Registro eliminado correctamente' });
  } catch (err) {
    console.error('❌ Error en /eliminar:', err.message);
    res.status(500).json({ error: 'Error interno del servidor' });
  }
});

module.exports = router;
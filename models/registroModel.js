// backend/models/registroModel.js
const pool = require('../db');

// Insertar un nuevo registro
const insertarRegistro = async ({ nombre, hora_entrada, hora_salida, fecha }) => {
  console.log('📥 Datos recibidos en insertarRegistro:', { nombre, hora_entrada, hora_salida, fecha });

  const persona = await pool.query(
    'INSERT INTO personas (nombre) VALUES ($1) RETURNING id',
    [nombre]
  );
  console.log('🆔 ID de persona insertada:', persona.rows[0]);

  const persona_id = persona.rows[0]?.id;
  if (!persona_id) {
    console.log('⚠️ No se obtuvo persona_id');
    throw new Error('No se pudo obtener el ID de la persona');
  }

  await pool.query(
    'INSERT INTO registros (persona_id, hora_entrada, hora_salida, fecha) VALUES ($1, $2, $3, $4)',
    [persona_id, hora_entrada, hora_salida, fecha]
  );
  console.log('✅ Registro insertado correctamente');
};

// Consultar registros por nombre
const consultarPorNombre = async (nombre) => {
  console.log('🔍 Consultando registros por nombre:', nombre);

  const result = await pool.query(
    `SELECT r.id, p.nombre, r.hora_entrada, r.hora_salida, r.fecha
     FROM registros r
     JOIN personas p ON r.persona_id = p.id
     WHERE p.nombre ILIKE $1`,
    [`%${nombre}%`]
  );

  console.log('📊 Registros encontrados:', result.rows.length);
  return result.rows;
};

// Eliminar registro por ID
const eliminarPorId = async (id) => {
  console.log('🗑️ Eliminando registro con ID:', id);

  await pool.query('DELETE FROM registros WHERE id = $1', [id]);
  console.log('✅ Registro eliminado');
};

module.exports = {
  insertarRegistro,
  consultarPorNombre,
  eliminarPorId
};
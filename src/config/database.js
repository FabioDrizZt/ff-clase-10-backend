const mongoose = require('mongoose')

const connectDB = async () => {
  try {
    process.loadEnvFile() // carga variables de entorno
    const { DB_PROTOCOL, DB_HOST, DB_PASS, DB_USER, DB_OPTIONS, DB_NAME } =
      process.env;
    const MONGODB_URI = `${DB_PROTOCOL}://${DB_USER}:${DB_PASS}@${DB_HOST}/${DB_NAME}`
    await mongoose.connect(MONGODB_URI)
    console.log('Conectado a la base de datos')
  } catch (error) {
    console.log('Error al conectarrse a la BD')
    throw error
  }
}

module.exports = connectDB
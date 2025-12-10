const mongoose = require('mongoose')

const connectDB = async () => {
  try {
    const ENV = process.env.NODE_ENV || 'development'
    /* const dotenv = require('dotenv')
    dotenv.config({ path: `.env.${ENV}` }) */
    process.loadEnvFile(`.env.${ENV}`) // carga variables de entorno
    const { DB_PROTOCOL, DB_HOST, DB_PASS, DB_USER, DB_OPTIONS, DB_NAME } =
      process.env;
    const MONGODB_URI = ENV === 'development'
      ? `${DB_PROTOCOL}://${DB_USER}:${DB_PASS}@${DB_HOST}/${DB_NAME}`
      : `${DB_PROTOCOL}://${DB_USER}:${DB_PASS}@${DB_HOST}`
    await mongoose.connect(MONGODB_URI)
    console.log('Conectado a la base de datos')
  } catch (error) {
    console.log('Error al conectarrse a la BD')
    throw error
  }
}

module.exports = connectDB
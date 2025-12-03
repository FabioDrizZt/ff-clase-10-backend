const routes = require('./src/routes/index.js')
const connectDB = require('./src/config/database.js')
const express = require('express')
const app = express()
const port = process.env.PORT || 3000
const errorHandler = require('./src/middlewares/errorHandler.js')
const swaggerJSDoc = require('swagger-jsdoc')
const swaggerUI = require('swagger-ui-express')
const swaggerDocument = require('./swagger.config.js')


// Configuracion de la documentacion
/* const SwaggerOptions = {
  definition: {
    openapi: '3.0.0',
    info: {
      title: 'API de Peliculas',
      version: '1.0.0',
      description: 'API REST para gestionar películas. Permite obtener, crear, actualizar y eliminar películas, así como filtrar por género y director.',
      license: {
        name: 'MIT',
        url: 'https://opensource.org/licenses/MIT',
      },
      contact: {
        email: 'ing.fabio.arg@gmail.com',
        name: 'Fabio D. Argañaraz',
        url: 'https://fabiodrizzt.vercel.app/',
      },
    },
    servers: [
      {
        url: 'http://localhost:3000',
        description: 'Servidor local',
      },
    ],
    tags: [
      {
        name: 'peliculas',
        description: 'Operaciones CRUD para películas',
      },
      {
        name: 'directores',
        description: 'Operaciones CRUD para directores',
      }
    ],
    basePath: '/',
  },
  apis: ['./swagger.jsdoc.js', './src/controllers/*.js'],
}

const swaggerSpec = swaggerJSDoc(SwaggerOptions) */

// Middleware para parsear JSON
app.use(express.json())

// Ruta de la documentacion
// app.use('/api-docs', swaggerUI.serve, swaggerUI.setup(swaggerSpec))
app.use('/api-docs', swaggerUI.serve, swaggerUI.setup(swaggerDocument))

// Rutas
app.use('/', routes)
// Middleware para manejo de errores
app.use(errorHandler)
// Iniciar servidor
app.listen(port, async () => {
  await connectDB()
  console.log(`http://localhost:${port}`)
  console.log(`Documentación Swagger en: http://localhost:${port}/api-docs`)
})

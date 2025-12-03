/**
 * @swagger
 * components:
 *   schemas:
 *     Movie:
 *       type: object
 *       required:
 *         - title
 *         - year
 *         - director
 *         - duration
 *         - genre
 *       properties:
 *         _id:
 *           type: string
 *           description: ID autogenerado por MongoDB
 *         title:
 *           type: string
 *           description: Título de la película
 *         year:
 *           type: integer
 *           description: Año de lanzamiento
 *         director:
 *           type: string
 *           description: Director de la película
 *         duration:
 *           type: integer
 *           description: Duración en minutos
 *         poster:
 *           type: string
 *           nullable: true
 *           description: URL del póster de la película
 *         genre:
 *           type: array
 *           items:
 *             type: string
 *           description: Lista de géneros
 *         rate:
 *           type: number
 *           default: 5
 *           description: Calificación (por defecto 5)
 *       example:
 *         _id: "64af98e7c4f5c93bd877ad44"
 *         title: "Inception"
 *         year: 2010
 *         director: "Christopher Nolan"
 *         duration: 148
 *         poster: "https://image.url/inception.jpg"
 *         genre: ["Sci-Fi", "Thriller"]
 *         rate: 5
 *
 *     MovieInput:
 *       type: object
 *       description: Datos necesarios para crear una película
 *       required:
 *         - title
 *         - year
 *         - director
 *         - duration
 *         - genre
 *       properties:
 *         title:
 *           type: string
 *           description: Título de la película
 *         year:
 *           type: integer
 *           description: Año de lanzamiento
 *         director:
 *           type: string
 *           description: Director de la película
 *         duration:
 *           type: integer
 *           description: Duración en minutos
 *         poster:
 *           type: string
 *           nullable: true
 *           description: URL del póster (opcional)
 *         genre:
 *           type: array
 *           items:
 *             type: string
 *           description: Lista de géneros
 *         rate:
 *           type: number
 *           description: Calificación inicial (opcional)
 *       example:
 *         title: "Interstellar"
 *         year: 2014
 *         director: "Christopher Nolan"
 *         duration: 169
 *         poster: "https://image.url/interstellar.jpg"
 *         genre: ["Sci-Fi", "Adventure"]
 *         rate: 5
 *
 *     MovieUpdate:
 *       type: object
 *       description: Datos permitidos para actualizar una película
 *       properties:
 *         title:
 *           type: string
 *           description: Título de la película
 *         year:
 *           type: integer
 *           description: Año de lanzamiento
 *         director:
 *           type: string
 *           description: Director de la película
 *         duration:
 *           type: integer
 *           description: Duración en minutos
 *         poster:
 *           type: string
 *           nullable: true
 *           description: URL del póster
 *         genre:
 *           type: array
 *           items:
 *             type: string
 *           description: Lista de géneros
 *         rate:
 *           type: number
 *           description: Calificación actualizada
 *       example:
 *         duration: 150
 *         genre: ["Sci-Fi"]
 *         rate: 4
 */

const movieService = require('../services/movieService.js')

const movieController = {

  /**
   * @swagger
   * /movies:
   *   get:
   *     summary: Obtiene todas las películas
   *     tags: [Movies]
   *     parameters:
   *       - in: query
   *         name: genre
   *         schema:
   *           type: string
   *         description: Género para filtrar las películas
   *     responses:
   *       200:
   *         description: Lista de películas
   *         content:
   *           application/json:
   *             schema:
   *               type: array
   *               items:
   *                 $ref: '#/components/schemas/Movie'
   *       404:
   *         description: No se encontraron películas
   *         content:
   *           application/json:
   *             schema:
   *               type: object
   *               properties:
   *                 message:
   *                   type: string
   *                   example: "No se encontraron peliculas"
   *       500:
   *         description: Error del servidor
   */
  getMovies: async (req, res, next) => {
    const { genre } = req.query
    try {
      const movies = await movieService.getMovies(genre)
      return movies.length === 0
        ? res.status(404).json({ message: 'No se encontraron peliculas' })
        : res.status(200).json(movies)
    } catch (error) {
      next(error)
    }
  },

  /**
   * @swagger
   * /movies/{id}:
   *   get:
   *     summary: Obtiene una película por ID
   *     tags: [Movies]
   *     parameters:
   *       - in: path
   *         name: id
   *         schema:
   *           type: string
   *         required: true
   *         description: ID de la película
   *     responses:
   *       200:
   *         description: Película encontrada
   *         content:
   *           application/json:
   *             schema:
   *               $ref: '#/components/schemas/Movie'
   *       404:
   *         description: Película no encontrada
   *         content:
   *           application/json:
   *             schema:
   *               type: object
   *               properties:
   *                 message:
   *                   type: string
   *                   example: "No se encontro la pelicula"
   *       500:
   *         description: Error del servidor
   */
  getMovieById: async (req, res, next) => {
    const { id } = req.params
    try {
      const movie = await movieService.getMovieById(id)
      return !movie
        ? res.status(404).json({ message: 'No se encontro la pelicula' })
        : res.status(200).json(movie)
    } catch (error) {
      next(error)
    }
  },

  /**
   * @swagger
   * /movies/director/{director}:
   *   get:
   *     summary: Obtiene películas por director
   *     tags: [Movies]
   *     parameters:
   *       - in: path
   *         name: director
   *         schema:
   *           type: string
   *         required: true
   *         description: Nombre del director
   *     responses:
   *       200:
   *         description: Lista de películas del director
   *         content:
   *           application/json:
   *             schema:
   *               type: array
   *               items:
   *                 $ref: '#/components/schemas/Movie'
   *       404:
   *         description: No se encontraron películas para este director
   *       500:
   *         description: Error del servidor
   */
  getMoviesByDirector: async (req, res, next) => {
    const { director } = req.params
    try {
      const movies = await movieService.getMoviesByDirector(director)
      return movies.length === 0
        ? res.status(404).json({ message: 'No se encontraron peliculas' })
        : res.status(200).json(movies)
    } catch (error) {
      next(error)
    }
  },

  /**
   * @swagger
   * /movies:
   *   post:
   *     summary: Crea una nueva película
   *     tags: [Movies]
   *     requestBody:
   *       required: true
   *       content:
   *         application/json:
   *           schema:
   *             $ref: '#/components/schemas/MovieInput'
   *     responses:
   *       201:
   *         description: Película creada exitosamente
   *         content:
   *           application/json:
   *             schema:
   *               $ref: '#/components/schemas/Movie'
   *       500:
   *         description: Error del servidor
   */
  createMovie: async (req, res, next) => {
    try {
      const insertedMovie = await movieService.createMovie(req.body)
      res.status(201).json(insertedMovie)
    } catch (error) {
      next(error)
    }
  },

  /**
   * @swagger
   * /movies/{id}:
   *   delete:
   *     summary: Elimina una película
   *     tags: [Movies]
   *     parameters:
   *       - in: path
   *         name: id
   *         schema:
   *           type: string
   *         required: true
   *         description: ID de la película a eliminar
   *     responses:
   *       200:
   *         description: Película eliminada
   *         content:
   *           application/json:
   *             schema:
   *               type: object
   *               properties:
   *                 message:
   *                   type: string
   *                   example: "Movie deleted"
   *                 deletedMovie:
   *                   $ref: '#/components/schemas/Movie'
   *       500:
   *         description: Error del servidor
   */
  deleteMovie: async (req, res, next) => {
    const { id } = req.params
    try {
      const deletedMovie = await movieService.deleteMovie(id)
      res.status(200).json({ message: 'Movie deleted', deletedMovie })
    } catch (error) {
      next(error)
    }
  },

  /**
   * @swagger
   * /movies/{id}:
   *   put:
   *     summary: Actualiza una película existente
   *     tags: [Movies]
   *     parameters:
   *       - in: path
   *         name: id
   *         schema:
   *           type: string
   *         required: true
   *         description: ID de la película a actualizar
   *     requestBody:
   *       required: true
   *       content:
   *         application/json:
   *           schema:
   *             $ref: '#/components/schemas/MovieUpdate'
   *     responses:
   *       200:
   *         description: Película actualizada
   *         content:
   *           application/json:
   *             schema:
   *               type: object
   *               properties:
   *                 message:
   *                   type: string
   *                   example: "Movie updated"
   *                 updatedMovie:
   *                   $ref: '#/components/schemas/Movie'
   *       404:
   *         description: Película no encontrada
   *       500:
   *         description: Error del servidor
   */
  updateMovie: async (req, res, next) => {
    const { id } = req.params
    try {
      const updatedMovie = await movieService.updateMovie(id, req.body)
      if (!updatedMovie) {
        res.status(404).json({ message: 'Movie not found' })
      } else {
        res.status(200).json({ message: 'Movie updated', updatedMovie })
      }
    } catch (error) {
      next(error)
    }
  }
}

module.exports = movieController
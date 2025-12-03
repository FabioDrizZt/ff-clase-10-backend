const express = require('express')
const router = express.Router()
const movieController = require('../controllers/movieController.js')

router.get('/', movieController.getMovies)
router.get('/:id', movieController.getMovieById)
router.get('/director/:director', movieController.getMoviesByDirector)
router.post('/', movieController.createMovie)
router.delete('/:id', movieController.deleteMovie)
router.patch('/:id', movieController.updateMovie)

module.exports = router
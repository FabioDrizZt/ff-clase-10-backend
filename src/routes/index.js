const express = require('express')
const movieRoutes = require('./movieRoutes')
const router = express.Router()

router.get('/', (req, res) => {
  res.send('Hello World!')
})

router.use('/movies', movieRoutes)

module.exports = router
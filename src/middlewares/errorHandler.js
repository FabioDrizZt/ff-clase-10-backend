const errorHandler = (err, req, res, next) => {
  if (err.name === 'CastError') {
    return res.status(400).json({ message: 'Error al parsear datos' })
  }
  if (err.name === 'ValidationError') {
    return res.status(400).json({ message: 'Datos inválidos' })
  }
  if (err.name === 'MongoError') {
    return res.status(500).json({ message: 'Error de base de datos' })
  }
  res.status(500).json({ message: 'Internal Server Error', error: err.message })
}

module.exports = errorHandler
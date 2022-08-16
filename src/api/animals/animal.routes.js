const AnimalRoutes = require('express').Router();
const {
    getAll,
    getById,
    create,
    getByName,
    update,
    deleteAnimal } = require('./animal.controllers');

AnimalRoutes.get('/', getAll)
AnimalRoutes.get('/:id', getById)
AnimalRoutes.post('/', create)
AnimalRoutes.get('/name/:name', getByName)
AnimalRoutes.patch('/:id', update)
AnimalRoutes.delete('/:id', deleteAnimal)

module.exports = AnimalRoutes
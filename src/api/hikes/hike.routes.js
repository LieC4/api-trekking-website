const HikeRoutes = require('express').Router();
const {
    getAll,
    getById,
    create,
    getByName,
    update,
    deleteHike, 
    getByLevel} = require('./hike.controllers');

HikeRoutes.get('/', getAll)
HikeRoutes.get('/:id', getById)
HikeRoutes.post('/', create)
HikeRoutes.get('/name/:name', getByName)
HikeRoutes.get('/level/:level', getByLevel)
HikeRoutes.patch('/:id', update)
HikeRoutes.delete('/:id', deleteHike)

module.exports = HikeRoutes
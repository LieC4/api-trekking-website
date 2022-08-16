const GuideRoutes = require('express').Router();
const {
    getAll,
    getById,
    create,
    getByName,
    update,
    deleteGuide } = require('./guide.controllers');

GuideRoutes.get('/', getAll)
GuideRoutes.get('/:id', getById)
GuideRoutes.post('/', create)
GuideRoutes.get('/name/:name', getByName)
GuideRoutes.patch('/:id', update)
GuideRoutes.delete('/:id', deleteGuide)

module.exports = GuideRoutes
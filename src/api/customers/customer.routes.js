const CustomerRoutes = require('express').Router();
const {
    getAll,
    getById,
    create,
    getByName,
    update,
    deleteCustomer } = require('./customer.controllers');

CustomerRoutes.get('/', getAll)
CustomerRoutes.get('/:id', getById)
CustomerRoutes.post('/', create)
CustomerRoutes.get('/name/:name', getByName)
CustomerRoutes.patch('/:id', update)
CustomerRoutes.delete('/:id', deleteCustomer)

module.exports = CustomerRoutes
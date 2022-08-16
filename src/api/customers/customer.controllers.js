const Customer = require('./customer.model');
const { setError } = require('../../helpers/utils');

const getAll = async (req, res, next) => {
    try {
        const customers = await Customer.find().populate("hikes");
        return res.json({
            status: 200,
            message: 'Recovered all customers',
            data: { customers }
        });
    } catch (error) {
        return next(setError(500, 'Failed all customers'));
    }
}

const getById = async (req, res, next) => {
    try {
        const { id } = req.params
        const customer = await Customer.findById(id);
        if (!customer) return next(setError(404, 'Customer not found'))
        return res.json({
            status: 200,
            message: 'Recovered all customers',
            data: { customer }
        });
    } catch (error) {
        return next(setError(500, 'Failed customer'))
    }
}

const create = async (req, res, next) => {
    try {
        const CustomertoSave = new Customer(req.body)
        const customerInDb = await CustomertoSave.save()
        return res.json({
            status: 201,
            message: 'Customer new customer',
            data: { customerInDb }
        });
    } catch (error) {
        return next(setError(500, 'Failed created customer'))
    }
}


const update = async (req, res, next) => {
    try {
        const { id } = req.params
        const customer = new Customer(req.body);
        customer._id = id;
        const updatedCustomer = await Customer.findByIdAndUpdate(id, customer)
        if (!updatedCustomer) return next(setError(404, 'Customer not found'))
        return res.json({
            status: 200,
            message: 'Updated customer',
            data: { customer: updatedCustomer }
        });
    } catch (error) {
        return next(setError(500, 'Failed updated customer'));
    }
}

const getByName = async (req, res, next) => {
    try {
        const {name} = req.params;
        const customer = await Customer.find({name:name});
        if (!customer) return next(setError(404, 'Customer not found'))
        return res.json({
            status: 200,
            message: 'Recovered customer by Name',
            data: { customer }
        });
    } catch (error) {
        return next(setError(500, 'Failed customer by Name'))
    }
}

const deleteCustomer = async (req, res, next) => {
    try {
        const { id } = req.params
        const deletedCustomer = await Customer.findByIdAndDelete(id)
        if (!deletedCustomer) return next(setError(404, 'Customer not found'))
        return res.json({
            status: 200,
            message: 'deleted customer',
            data: { element: deletedCustomer }
        });
    } catch (error) {
        return next(setError(500, 'Failed deleted customer'));
    }
}

module.exports = {
    getAll,
    getById,
    create,
    update,
    deleteCustomer,
    getByName
}
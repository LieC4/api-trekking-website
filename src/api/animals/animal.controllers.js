const Animal = require('./animal.model');
const { setError } = require('../../helpers/utils');

const getAll = async (req, res, next) => {
    try {
        const animals  = await Animal.find().populate("hikes");
        return res.json({
            status: 200,
            message: 'Recovered all animals',
            data: { animals }
        });
    } catch (error) {
        return next(setError(500, 'Failed all animals'));
    }
}

const getById = async (req, res, next) => {
    try {
        const { id } = req.params
        const animal  = await Animal.findById(id);
        if (!animal) return next(setError(404, 'Animal not found'))
        return res.json({
            status: 200,
            message: 'Recovered all animal ',
            data: { animal }
        });
    } catch (error) {
        return next(setError(500, 'Failed animal'))
    }
}

const create = async (req, res, next) => {
    try {
        const AnimaltoSave = new Animal(req.body)
        const animalInDb = await AnimaltoSave.save()
        return res.json({
            status: 201,
            message: 'Create new animal ',
            data: { animalInDb }
        });
    } catch (error) {
        return next(setError(500, 'Failed created animal'))
    }
}


const update = async (req, res, next) => {
    try {
        const { id } = req.params
        const animal = new Animal(req.body);
        animal._id = id;
        const updatedAnimal = await Animal.findByIdAndUpdate(id, animal)
        if (!updatedAnimal) return next(setError(404, 'Animal not found'))
        return res.json({
            status: 200,
            message: 'Updated animal',
            data: { animal: updatedAnimal }
        });
    } catch (error) {
        return next(setError(500, 'Failed updated animal'));
    }
}

const getByName = async (req, res, next) => {
    try {
        const {name} = req.params;
        const animal = await Animal.find({name:name});
        if (!animal) return next(setError(404, 'Animal not found'))
        return res.json({
            status: 200,
            message: 'Recovered animal by Name',
            data: { animal }
        });
    } catch (error) {
        return next(setError(500, 'Failed animal by Name'))
    }
}

const deleteAnimal = async (req, res, next) => {
    try {
        const { id } = req.params
        const deletedAnimal = await Animal.findByIdAndDelete(id)
        if (!deletedAnimal) return next(setError(404, 'Animal not found'))
        return res.json({
            status: 200,
            message: 'deleted animal',
            data: { element: deletedAnimal }
        });
    } catch (error) {
        return next(setError(500, 'Failed deleted animal'));
    }
}

module.exports = {
    getAll,
    getById,
    create,
    update,
    deleteAnimal,
    getByName
}
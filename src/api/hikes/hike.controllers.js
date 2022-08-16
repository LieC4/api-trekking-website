const Hike = require('./hike.model');
const { setError } = require('../../helpers/utils');

const getAll = async (req, res, next) => {
    try {
        const hikes = await Hike.find().populate("animals customers");
        return res.json({
            status: 200,
            message: 'Recovered all hikes',
            data: { hikes }
        });
    } catch (error) {
        return next(setError(500, 'Failed all hikes'));
    }
}


const getById = async (req, res, next) => {
    try {
        const { id } = req.params
        const hike = await Hike.findById(id);
        if (!hike) return next(setError(404, 'hike not found'))
        return res.json({
            status: 200,
            message: 'Recovered all hikes',
            data: { hike }
        });
    } catch (error) {
        return next(setError(500, 'Failed hike by Id'))
    }
}


const create = async (req, res, next) => {
    try {
        const HiketoSave = new Hike(req.body)
        const hikeInDb = await HiketoSave.save()
        return res.json({
            status: 201,
            message: 'Created new hike',
            data: { hikeInDb }
        });
    } catch (error) {
        return next(setError(500, 'Failed created hike'))
    }
}



const update = async (req, res, next) => {
    try {
        const { id } = req.params
        const hike = new Hike(req.body);
        hike._id = id;
        const updatedHike = await Hike.findByIdAndUpdate(id, hike)
        if (!updatedHike) return next(setError(404, 'Hike not found'))
        return res.json({
            status: 200,
            message: 'Updated hike',
            data: { hike: updatedHike }
        });
    } catch (error) {
        return next(setError(500, 'Failed updated hike'));
    }
}

const getByLevel = async (req, res, next) => {
    try {
        const {level} = req.params;
        const hike = await Hike.find({level:level});
        if (!hike) return next(setError(404, 'Hike not found'))
        return res.json({
            status: 200,
            message: 'Recovered hike by Level',
            data: { hike }
        });
    } catch (error) {
        return next(setError(500, 'Failed hike by Level'))
    }
}
const getByName = async (req, res, next) => {
    try {
        const {name} = req.params;
        const hike = await Hike.find({name:name});
        if (!hike) return next(setError(404, 'Hike not found'))
        return res.json({
            status: 200,
            message: 'Recovered hike by Name',
            data: { hike }
        });
    } catch (error) {
        return next(setError(500, 'Failed hike by Name'))
    }
}

const deleteHike = async (req, res, next) => {
    try {
        const { id } = req.params
        const deletedHike = await Hike.findByIdAndDelete(id)
        if (!deletedHike) return next(setError(404, 'Hike not found'))
        return res.json({
            status: 200,
            message: 'deleted hike',
            data: { element: deletedhike }
        });
    } catch (error) {
        return next(setError(500, 'Failed deleted hike'));
    }
}

module.exports = {
    getAll,
    getById,
    create,
    update,
    deleteHike,
    getByName,
    getByLevel
}
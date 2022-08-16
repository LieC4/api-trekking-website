const Guide = require('./guide.model');
const { setError } = require('../../helpers/utils');

const getAll = async (req, res, next) => {
    try {
        const guides = await Guide.find().populate("hikes animals");
        return res.json({
            status: 200,
            message: 'Recovered all guide ',
            data: { guides }
        });
    } catch (error) {
        return next(setError(500, 'Failed all guides'));
    }
}

const getById = async (req, res, next) => {
    try {
        const { id } = req.params
        const guide  = await Guide.findById(id);
        if (!guide) return next(setError(404, 'Guide not found'))
        return res.json({
            status: 200,
            message: 'Recovered all guide ',
            data: { guide }
        });
    } catch (error) {
        return next(setError(500, 'Failed guide'))
    }
}

const create = async (req, res, next) => {
    try {
        const GuidetoSave = new Guide(req.body)
        const guideInDb = await GuidetoSave.save()
        return res.json({
            status: 201,
            message: 'Create new guide ',
            data: { guideInDb }
        });
    } catch (error) {
        return next(setError(500, 'Failed created guide'))
    }
}


const update = async (req, res, next) => {
    try {
        const { id } = req.params
        const guide = new Guide(req.body);
        guide._id = id;
        const updatedGuide = await Guide.findByIdAndUpdate(id, guide)
        if (!updatedGuide) return next(setError(404, 'Guide not found'))
        return res.json({
            status: 200,
            message: 'Updated guide',
            data: { guide: updatedGuide }
        });
    } catch (error) {
        return next(setError(500, 'Failed updated guide'));
    }
}

const getByName = async (req, res, next) => {
    try {
        const {name} = req.params;
        const guide = await Guide.find({name:name});
        if (!guide) return next(setError(404, 'Guide not found'))
        return res.json({
            status: 200,
            message: 'Recovered guide by Name',
            data: { guide }
        });
    } catch (error) {
        return next(setError(500, 'Failed guide by Name'))
    }
}

const deleteGuide = async (req, res, next) => {
    try {
        const { id } = req.params
        const deletedGuide = await Guide.findByIdAndDelete(id)
        if (!deletedGuide) return next(setError(404, 'Guide not found'))
        return res.json({
            status: 200,
            message: 'deleted guide',
            data: { element: deletedGuide }
        });
    } catch (error) {
        return next(setError(500, 'Failed deleted guide'));
    }
}

module.exports = {
    getAll,
    getById,
    create,
    update,
    deleteGuide,
    getByName
}
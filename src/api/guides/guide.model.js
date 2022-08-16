const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const schema = new Schema({
    name: { type: String, unique: true, required: true },
    description: { type: String, required: true },
    hikes: [{ type: Schema.Types.ObjectId, ref:"hikes"}],
    animals: [{ type: Schema.Types.ObjectId, ref:"animals"}],

},
    {
        timestamps: true
    }
);

module.exports = mongoose.model('guides', schema);
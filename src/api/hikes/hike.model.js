const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const schema = new Schema({
    name: { type: String, unique: true, required: true },
    level: { type: String, required: true },
    description: { type: String, required: true },
    images: { type: String, required: true },
    animals: [{ type: Schema.Types.ObjectId, ref:"animals"}],
    customers:[{ type: Schema.Types.ObjectId, ref:"customers" }],

},
    {
        timestamps: true
    }
);

module.exports = mongoose.model('hikes', schema);
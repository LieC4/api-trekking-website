const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const schema = new Schema({
    name: { type: String, unique: true, required: true },
    images: { type: String, required: true },
    description: { type: String, required: true },
    hikes: [{ type: Schema.Types.ObjectId, ref:"hikes" }],

},
    {
        timestamps: true
    }
);

module.exports = mongoose.model('animals', schema);
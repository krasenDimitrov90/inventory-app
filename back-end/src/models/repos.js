const { ObjectId, Int32 } = require('mongodb');
const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const repoSchema = new Schema({
    items: [
        {
            type: Object,
            name: { type: String, required: true },
            'min-qty': { type: Number, required: true },
            qty: { type: Number, required: true },
            unit: { type: String, required: true }
        }
    ],
    // ownerId: {
    //     type: Schema.Types.ObjectId,
    //     ref: 'User'
    // }
});

module.exports = mongoose.model('Repo', repoSchema);
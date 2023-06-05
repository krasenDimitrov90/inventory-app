const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const repoSchema = new Schema({
    // name: {
    //     type: String,
    //     required: true
    // },
    items: [
        {
            name: { type: String, required: true },
            'min-qty': { type: Number, required: true },
            qty: { type: Number, required: [true, 'Must input a number for qty!'] },
            unit: { type: String, required: true }
        }
    ],
    ownerId: {
        type: Schema.Types.ObjectId,
        ref: 'User',
        required: true
    }
});

module.exports = mongoose.model('Repo', repoSchema);
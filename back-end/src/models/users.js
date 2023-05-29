const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const userSchema = new Schema({
    email: {
        type: String,
        required: true
    },
    password: {
        type: String,
        required: true
    },
    repos: [
        {
            type: Schema.Types.ObjectId,
            ref: 'Repo'
        }   
    ]
});

module.exports = mongoose.model('User', userSchema);
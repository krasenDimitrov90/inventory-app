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
            type: Object,
            repoId: {
                type: Schema.Types.ObjectId,
                ref: 'Repo',
                required: true,
            },
            name: {
                type: String,
                required: true,
            }
        }
    ]
});

userSchema.methods.addRepo = function (repoId, repoName) {
    this.repos.push({ repoId, name: repoName });
    return this.save();
};

module.exports = mongoose.model('User', userSchema);
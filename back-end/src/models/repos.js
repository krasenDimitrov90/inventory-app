const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const repoSchema = new Schema({
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
    },
    collaborators: [
        {
            collaboratorId: { type: Schema.Types.ObjectId, required: true }
        }
    ]
});

repoSchema.methods.addItem = function (item) {
    this.items.push(item);
    return this.save();
}

repoSchema.methods.removeItem = function (itemId) {
    this.items.pull({ _id: itemId });
    return this.save();
};

repoSchema.methods.updateItem = function (itemId, updatedItem) {
    Object.entries(updatedItem).map(([k, v]) => this.items.id(itemId)[k] = v);
    return this.save();
}

module.exports = mongoose.model('Repo', repoSchema);
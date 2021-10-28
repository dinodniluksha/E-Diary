const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const ItemSchema = mongoose.Schema({
    user: String,
    type: String,
    attributes: []
}, {
    timestamps: true

});

module.exports = mongoose.model('Item', ItemSchema);
const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const ItemStructureSchema = mongoose.Schema({
    userId: {type: Schema.Types.ObjectId, ref: 'User'},
    userEmail: String,
    itemType: String,
    structureFields: {type: Schema.Types.Mixed}
}, {
    timestamps: true
});

module.exports = mongoose.model('ItemStructure', ItemStructureSchema);
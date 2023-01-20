const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const msgSchema = new Schema({
    name: {
        type: String,
        required: true
    },
    mail: {
        type: String,
        required: true
    },
    message: {
        type: String,
        required: true
    }
}, { timestamps: true });

const Msg = mongoose.model('Msg', msgSchema);
module.exports = Msg;
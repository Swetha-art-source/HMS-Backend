const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const medicineSchema = new Schema({

    mName: {
        type: String,
        required: true
    },
    uPrice: {
        type: Number,
        required: true
    },
    qty: {
        type: Number,
        required: true
    }
})

const Medicine = mongoose.model("Medicine", medicineSchema);

module.exports = Medicine;
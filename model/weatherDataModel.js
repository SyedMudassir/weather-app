const mongoose = require('mongoose');
const weatherDataSchema = new mongoose.Schema({
    temperature:{
        type: Number,
        required: true
    },
    city:{
        type: String,
        required: true
    },
    weatherOverview:{
        type: String,
        required: true
    }
})
module.exports.citiesData = mongoose.model('cities',weatherDataSchema)
const mongoose = require('mongoose');

const outfitSchema = new mongoose.Schema({
    category: {
        type: String,
        require: true,
        enum: ['t-shirt', 'shirt', 'jeans', 'jacket', 'sneakers', 'boots', 'accessory']
    },
    // name: {
    //     type: String,
    //     require: true
    // },
    mood: {
        type: String,
        require: true,
        enum: ['happy', 'sad', 'excited']
    }
    // description: {
    //     type: String,
    //     require: true
    // }
})



const Outfit = mongoose.model('Outfit', outfitSchema);

module.exports = Outfit
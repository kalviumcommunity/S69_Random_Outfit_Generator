const mongoose = require('mongoose');

const connectToMongodb = async () => {
    try {
        console.log(process.env.MONGO_URI)
        await mongoose.connect(process.env.MONGO_URI)
        console.log('Connected to MongoDB')
    } catch (error) {
        console.log("Error connecting to mongodb: ", error.message);
    }
}

module.exports =  connectToMongodb 
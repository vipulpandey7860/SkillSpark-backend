const mongoose = require("mongoose");



exports.connectDatabase =async (req,res,next) => {
    
    
    mongoose.connect(process.env.MONGODB_URL, {
        useUnifiedTopology: true,
        useNewUrlParser: true
    });
    mongoose.connection.on('connected', () => {
        console.log('connected to database');
    });
    process.on('unhandledRejection', error => {
        console.log("connection failed");

    });
};





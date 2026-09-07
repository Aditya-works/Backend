const { default: mongoose } = require("mongoose");

const connectDB = async () => {
        try {
        await mongoose.connect(process.env.mongodb_uri);
        console.log("Connected to MongoDB!");
    }
    catch (error) {
        console.log("Error while connecting to DB", error);
    }
}

module.exports = connectDB;
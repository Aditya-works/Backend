const { default: mongoose } = require("mongoose");

const connectDB = async () => {
        try {
        await mongoose.connect(
            "mongodb+srv://adityaworks02012005_db_user:Zee091204%40@db-cluster.mwoj4hz.mongodb.net/"
        );
        console.log("Connected to MongoDB!");
    }
    catch (error) {
        console.log("Error while connecting to DB", error);
    }
}

module.exports = connectDB;
import mongoose from "mongoose";
import dotenv from 'dotenv';

dotenv.config();

const dbURL = process.env.dbURL;
const dbName = 'Nalanda_Library';

if (!dbURL) {
    throw new Error('dbURL is not defined in the environment variables.');
}

const connectDB = () => {
    mongoose.connect(dbURL, { dbName })
        .then(() => console.log('Connected to MongoDB'))
        .catch(error => console.error('Error connecting to MongoDB:', error));
};

export default connectDB;

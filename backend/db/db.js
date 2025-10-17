const mongoose = require('mongoose');

let isConnected = false;

async function connectToDB() {
    if (isConnected) {
        console.log('Using existing database connection');
        return;
    }

    try {
        if (!process.env.DB_CONNECT) {
            throw new Error('DB_CONNECT environment variable is not defined');
        }

        const db = await mongoose.connect(process.env.DB_CONNECT, {
            serverSelectionTimeoutMS: 5000,
            socketTimeoutMS: 45000,
        });

        isConnected = db.connections[0].readyState === 1;
        console.log('Connected to MongoDB');
    } catch (error) {
        console.error('Error connecting to MongoDB:', error.message);
        throw error;
    }
}

module.exports = connectToDB;

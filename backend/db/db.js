const mongoose = require('mongoose');

// Serverless-optimized connection caching
let cachedConnection = null;

async function connectToDB() {
    // Return cached connection if available and ready
    if (cachedConnection && mongoose.connection.readyState === 1) {
        console.log('Using existing database connection');
        return cachedConnection;
    }

    try {
        if (!process.env.DB_CONNECT) {
            console.error('DB_CONNECT environment variable is not defined');
            console.error('Available env vars:', Object.keys(process.env).join(', '));
            throw new Error('DB_CONNECT environment variable is not defined');
        }

        console.log('Attempting to connect to MongoDB...');

        // Configure mongoose for serverless environment
        mongoose.set('bufferCommands', false); // Disable buffering to fail fast
        mongoose.set('bufferTimeoutMS', 30000); // 30 second timeout for operations

        const db = await mongoose.connect(process.env.DB_CONNECT, {
            serverSelectionTimeoutMS: 10000, // Increased to 10 seconds
            socketTimeoutMS: 45000,
            maxPoolSize: 10, // Connection pool for serverless
            minPoolSize: 1,
        });

        cachedConnection = db;
        console.log('Connected to MongoDB successfully');
        return db;
    } catch (error) {
        console.error('Error connecting to MongoDB:', error.message);
        console.error('Error details:', error);
        cachedConnection = null;
        throw error;
    }
}

module.exports = connectToDB;

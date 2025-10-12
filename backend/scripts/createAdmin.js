/**
 * Admin Account Creation Script
 *
 * This script creates a default admin account in the database.
 * Run with: node scripts/createAdmin.js
 */

require('dotenv').config();
const mongoose = require('mongoose');
const adminModel = require('../models/adminModels');

const DEFAULT_ADMIN = {
  username: 'admin',
  email: 'admin@example.com',
  password: 'admin123', // Change this in production!
};

async function createDefaultAdmin() {
  try {
    // Connect to database
    console.log('Connecting to database...');
    await mongoose.connect(process.env.DB_CONNECT);
    console.log('✓ Connected to database');

    // Check if admin already exists
    const existingAdmin = await adminModel.findOne({
      $or: [
        { email: DEFAULT_ADMIN.email },
        { username: DEFAULT_ADMIN.username }
      ]
    });

    if (existingAdmin) {
      console.log('\n⚠️  Admin account already exists!');
      console.log(`   Username: ${existingAdmin.username}`);
      console.log(`   Email: ${existingAdmin.email}`);
      console.log('\nTo create a new admin, use the API endpoint:');
      console.log('POST http://localhost:8000/admin/create');
      await mongoose.connection.close();
      process.exit(0);
    }

    // Hash password
    console.log('\nHashing password...');
    const hashedPassword = await adminModel.hashPassword(DEFAULT_ADMIN.password);
    console.log('✓ Password hashed');

    // Create admin
    console.log('\nCreating admin account...');
    const admin = await adminModel.create({
      username: DEFAULT_ADMIN.username,
      email: DEFAULT_ADMIN.email,
      password: hashedPassword,
    });

    console.log('\n✓ Admin account created successfully!\n');
    console.log('═══════════════════════════════════════');
    console.log('         LOGIN CREDENTIALS');
    console.log('═══════════════════════════════════════');
    console.log(`  Username: ${admin.username}`);
    console.log(`  Email:    ${admin.email}`);
    console.log(`  Password: ${DEFAULT_ADMIN.password}`);
    console.log('═══════════════════════════════════════');
    console.log('\n⚠️  IMPORTANT: Change the password after first login!\n');
    console.log('Login at: http://localhost:5173/admin/login\n');

    await mongoose.connection.close();
    process.exit(0);
  } catch (error) {
    console.error('\n✗ Error creating admin:', error.message);
    await mongoose.connection.close();
    process.exit(1);
  }
}

// Run the script
createDefaultAdmin();

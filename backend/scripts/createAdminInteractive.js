/**
 * Interactive Admin Account Creation Script
 *
 * This script allows you to create an admin account with custom credentials.
 * Run with: node scripts/createAdminInteractive.js
 */

require('dotenv').config();
const mongoose = require('mongoose');
const adminModel = require('../models/adminModels');
const readline = require('readline');

const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout
});

function question(query) {
  return new Promise(resolve => rl.question(query, resolve));
}

async function createAdminInteractive() {
  try {
    console.log('\n╔════════════════════════════════════════╗');
    console.log('║   ADMIN ACCOUNT CREATION WIZARD        ║');
    console.log('╚════════════════════════════════════════╝\n');

    // Get user input
    const username = await question('Enter username (min 3 characters): ');
    const email = await question('Enter email address: ');
    const password = await question('Enter password (min 6 characters): ');

    // Validate input
    if (username.length < 3) {
      console.log('✗ Username must be at least 3 characters');
      rl.close();
      process.exit(1);
    }

    if (password.length < 6) {
      console.log('✗ Password must be at least 6 characters');
      rl.close();
      process.exit(1);
    }

    const emailRegex = /^\S+@\S+\.\S+$/;
    if (!emailRegex.test(email)) {
      console.log('✗ Invalid email format');
      rl.close();
      process.exit(1);
    }

    // Confirm
    console.log('\n─────────────────────────────────────────');
    console.log('Please confirm your details:');
    console.log(`Username: ${username}`);
    console.log(`Email:    ${email}`);
    console.log(`Password: ${'*'.repeat(password.length)}`);
    console.log('─────────────────────────────────────────');

    const confirm = await question('\nCreate this admin account? (yes/no): ');

    if (confirm.toLowerCase() !== 'yes' && confirm.toLowerCase() !== 'y') {
      console.log('✗ Admin creation cancelled');
      rl.close();
      process.exit(0);
    }

    // Connect to database
    console.log('\nConnecting to database...');
    await mongoose.connect(process.env.DB_CONNECT);
    console.log('✓ Connected to database');

    // Check if admin already exists
    const existingAdmin = await adminModel.findOne({
      $or: [{ email }, { username }]
    });

    if (existingAdmin) {
      console.log('\n✗ Admin with this username or email already exists!');
      rl.close();
      await mongoose.connection.close();
      process.exit(1);
    }

    // Hash password
    console.log('Hashing password...');
    const hashedPassword = await adminModel.hashPassword(password);
    console.log('✓ Password hashed');

    // Create admin
    console.log('Creating admin account...');
    const admin = await adminModel.create({
      username,
      email,
      password: hashedPassword,
    });

    console.log('\n✓ Admin account created successfully!\n');
    console.log('═══════════════════════════════════════');
    console.log('         LOGIN CREDENTIALS');
    console.log('═══════════════════════════════════════');
    console.log(`  Username: ${admin.username}`);
    console.log(`  Email:    ${admin.email}`);
    console.log(`  Password: ${password}`);
    console.log('═══════════════════════════════════════');
    console.log('\nLogin at: http://localhost:5173/admin/login\n');

    rl.close();
    await mongoose.connection.close();
    process.exit(0);
  } catch (error) {
    console.error('\n✗ Error creating admin:', error.message);
    rl.close();
    await mongoose.connection.close();
    process.exit(1);
  }
}

// Run the script
createAdminInteractive();

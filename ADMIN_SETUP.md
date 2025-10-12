# Admin Account Setup Guide

## Overview

This guide explains how to create an admin account for accessing the admin dashboard at `/admin/login`.

## Important Information

**Currently, there are NO default admin credentials in the database.**

You need to create an admin account using one of the methods below before you can log in.

## Method 1: Using the Create Admin Script (Recommended)

The easiest way to create a default admin account:

### Step 1: Navigate to backend directory
```bash
cd backend
```

### Step 2: Run the creation script
```bash
node scripts/createAdmin.js
```

### Default Credentials (created by script):
- **Username:** `admin`
- **Email:** `admin@example.com`
- **Password:** `admin123`

**⚠️ IMPORTANT:** Change these credentials after your first login!

---

## Method 2: Interactive Creation Script

Create an admin with custom credentials interactively:

### Step 1: Navigate to backend directory
```bash
cd backend
```

### Step 2: Run the interactive script
```bash
node scripts/createAdminInteractive.js
```

### Step 3: Follow the prompts
The script will ask you for:
- Username (minimum 3 characters)
- Email address
- Password (minimum 6 characters)

---

## Method 3: Using API Endpoint

Create an admin account using the REST API:

### Endpoint
```
POST http://localhost:8000/admin/create
```

### Request Body
```json
{
  "username": "yourusername",
  "email": "your.email@example.com",
  "password": "yourpassword"
}
```

### Example using curl:
```bash
curl -X POST http://localhost:8000/admin/create \
  -H "Content-Type: application/json" \
  -d '{
    "username": "admin",
    "email": "admin@example.com",
    "password": "admin123"
  }'
```

### Example using Postman or Thunder Client:
1. Create a new POST request
2. Set URL to: `http://localhost:8000/admin/create`
3. Set Headers: `Content-Type: application/json`
4. Set Body (raw JSON):
```json
{
  "username": "admin",
  "email": "admin@example.com",
  "password": "admin123"
}
```
5. Send the request

---

## Method 4: Direct Database Insert (Advanced)

If you have direct access to MongoDB:

### Using MongoDB Compass or Mongo Shell:

1. Connect to your database
2. Select the database (default: `PD_Project`)
3. Navigate to the `admins` collection
4. Create a new document:

```javascript
// Note: You need to hash the password first using bcrypt
const bcrypt = require('bcrypt');
const hashedPassword = await bcrypt.hash('admin123', 10);

// Then insert:
{
  "username": "admin",
  "email": "admin@example.com",
  "password": hashedPassword,
  "created_at": new Date()
}
```

---

## Validation Rules

When creating an admin account, the following rules apply:

### Username
- **Required:** Yes
- **Min Length:** 3 characters
- **Max Length:** 20 characters
- **Format:** Letters, numbers, underscore only
- **Unique:** Must be unique across all admins

### Email
- **Required:** Yes
- **Format:** Valid email format (example@domain.com)
- **Unique:** Must be unique across all admins
- **Case:** Stored in lowercase

### Password
- **Required:** Yes
- **Min Length:** 6 characters
- **Max Length:** 100 characters
- **Storage:** Hashed with bcrypt (salt rounds: 10)

---

## Login Process

Once you've created an admin account:

### Step 1: Navigate to the admin login page
```
http://localhost:5173/admin/login
```

### Step 2: Enter your credentials
You can login with **either**:
- **Username** + Password
- **Email** + Password

### Step 3: Optional - Check "Remember me"
- Without remember me: Session lasts **1 day**
- With remember me: Session lasts **7 days**

### Step 4: Click "Access Dashboard"
You'll be redirected to the admin dashboard at `/admin/dashboard`

---

## Troubleshooting

### Problem: "Admin already exists" error

**Solution:** An admin with that username or email already exists. Try:
1. Use different credentials
2. Check existing admins in the database
3. Use the login page with existing credentials

### Problem: "Cannot connect to database"

**Solution:** Ensure:
1. MongoDB is running
2. Connection string in `.env` is correct
3. Network connectivity is available

### Problem: "Validation error" when creating admin

**Solution:** Check that:
- Username is at least 3 characters
- Email is in valid format
- Password is at least 6 characters

### Problem: "Invalid credentials" when logging in

**Solution:**
- Verify username/email and password are correct
- Ensure admin account was created successfully
- Check database to confirm admin exists

### Problem: Can't access protected routes after login

**Solution:**
- Check browser console for errors
- Verify token is stored (check Application > Local Storage in DevTools)
- Ensure backend API is running on correct port
- Check CORS configuration

---

## Security Best Practices

### 1. Change Default Credentials
If you used the default creation script, change the credentials immediately after first login.

### 2. Use Strong Passwords
- Minimum 8 characters (though system allows 6)
- Mix of uppercase, lowercase, numbers, and symbols
- Avoid common words or patterns

### 3. Protect .env File
The `.env` file contains sensitive information:
- Never commit it to version control
- Ensure it's listed in `.gitignore`
- Keep JWT_SECRET secure and complex

### 4. HTTPS in Production
- Always use HTTPS in production
- Never transmit credentials over HTTP

### 5. Monitor Failed Login Attempts
- Implement rate limiting
- Log failed login attempts
- Set up alerts for suspicious activity

---

## Database Schema

The admin document structure:

```javascript
{
  "_id": ObjectId("..."),
  "username": "admin",
  "email": "admin@example.com",
  "password": "$2b$10$...", // bcrypt hashed
  "created_at": ISODate("2024-10-12T..."),
  "__v": 0
}
```

---

## Quick Reference

### Environment Variables (.env)
```env
PORT=8000
CLIENT_ORIGIN=http://localhost:5173
DB_CONNECT=your_mongodb_connection_string
JWT_SECRET=your_secret_key_here
```

### API Endpoints
- **Create Admin:** `POST /admin/create`
- **Login:** `POST /admin/login`
- **Get Profile:** `GET /admin/profile` (requires auth)
- **Logout:** `GET /admin/logout` (requires auth)

### Frontend Routes
- **Login Page:** `/admin/login`
- **Dashboard:** `/admin/dashboard` (protected)

---

## Getting Help

If you encounter issues:

1. Check this documentation
2. Review [AUTHENTICATION.md](frontend/AUTHENTICATION.md) for auth system details
3. Check browser console for frontend errors
4. Check backend terminal for API errors
5. Verify database connection and data

---

## Scripts Summary

| Script | Command | Purpose |
|--------|---------|---------|
| Default Admin | `node scripts/createAdmin.js` | Creates admin with default credentials |
| Interactive | `node scripts/createAdminInteractive.js` | Creates admin with custom credentials |

---

## Next Steps

After creating your admin account:

1. ✅ Login at `/admin/login`
2. ✅ Access the admin dashboard
3. ✅ Change default password (if applicable)
4. ✅ Start managing your application!

---

**Last Updated:** October 2024
**Version:** 1.0

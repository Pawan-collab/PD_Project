# CORS Error Fix

## What Was Fixed

The CORS error occurred because:
1. The `CLIENT_ORIGIN` environment variable was missing from backend `.env`
2. The backend port was set to 3000 instead of 5000
3. CORS configuration needed explicit methods and headers for preflight requests

## Changes Made

### 1. Backend `.env` File

**Added/Updated:**
```bash
PORT=5000
CLIENT_ORIGIN=http://localhost:5173
```

### 2. Backend `app.js`

**Improved CORS configuration:**
```javascript
// CORS Configuration - Must be before other middleware
const CLIENT_ORIGIN = process.env.CLIENT_ORIGIN || "http://localhost:5173";
app.use(
  cors({
    origin: CLIENT_ORIGIN,
    credentials: true,
    methods: ['GET', 'POST', 'PUT', 'DELETE', 'PATCH', 'OPTIONS'],
    allowedHeaders: ['Content-Type', 'Authorization'],
    exposedHeaders: ['Content-Range', 'X-Content-Range'],
    maxAge: 600, // Cache preflight request for 10 minutes
  })
);

// Handle preflight requests
app.options('*', cors());
```

## How to Apply the Fix

### Step 1: Restart the Backend Server

If the backend server is running, stop it (Ctrl+C) and restart:

```bash
cd backend
npm start
```

The server should now show:
```
Server is running on port 5000
```

### Step 2: Verify Frontend Configuration

Make sure your frontend `.env` has:
```bash
VITE_API_BASE_URL=http://localhost:5000
```

### Step 3: Restart the Frontend (if needed)

If you changed the frontend `.env`, restart:

```bash
cd frontend
npm run dev
```

### Step 4: Test the Contact Form

1. Navigate to `http://localhost:5173/contact`
2. Fill in the form with valid data
3. Submit the form
4. You should now see a success message instead of CORS error

## What the Fix Does

### CORS Methods
- **GET**: Retrieve data
- **POST**: Create new data (contact form submission)
- **PUT**: Update data
- **DELETE**: Remove data
- **PATCH**: Partial update
- **OPTIONS**: Preflight request

### CORS Headers
- **Content-Type**: Allows JSON requests
- **Authorization**: Allows auth tokens (for admin)

### Preflight Requests
The `app.options('*', cors())` handles OPTIONS requests that browsers send before POST/PUT/DELETE requests to check if CORS is allowed.

## Verification

### Check Backend is Running
```bash
curl http://localhost:5000/
```
Should return: "Hello im responding to client side!"

### Check CORS Headers
```bash
curl -H "Origin: http://localhost:5173" \
     -H "Access-Control-Request-Method: POST" \
     -H "Access-Control-Request-Headers: Content-Type" \
     -X OPTIONS \
     -v \
     http://localhost:5000/contact/create
```

Should include these headers in response:
```
Access-Control-Allow-Origin: http://localhost:5173
Access-Control-Allow-Methods: GET, POST, PUT, DELETE, PATCH, OPTIONS
Access-Control-Allow-Headers: Content-Type, Authorization
Access-Control-Allow-Credentials: true
```

## Troubleshooting

### Still Getting CORS Error?

1. **Make sure backend is restarted**
   - The changes won't take effect until restart
   - Check console shows "Server is running on port 5000"

2. **Check .env file**
   - Backend: `CLIENT_ORIGIN=http://localhost:5173`
   - Frontend: `VITE_API_BASE_URL=http://localhost:5000`

3. **Clear browser cache**
   - Hard refresh: Ctrl+Shift+R (Windows/Linux) or Cmd+Shift+R (Mac)
   - Or open DevTools → Network tab → Disable cache

4. **Check browser console**
   - Open DevTools (F12)
   - Check Console tab for detailed error
   - Check Network tab to see actual request/response

5. **Port conflicts**
   - Make sure nothing else is using port 5000
   - Run: `lsof -i :5000` (Mac/Linux) or `netstat -ano | findstr :5000` (Windows)

### Different Port?

If you need to use a different port:

**Backend `.env`:**
```bash
PORT=8000  # Your custom port
CLIENT_ORIGIN=http://localhost:5173
```

**Frontend `.env`:**
```bash
VITE_API_BASE_URL=http://localhost:8000  # Match backend port
```

Then restart both servers.

## Production Configuration

For production, update the environment variables:

**Backend `.env.production`:**
```bash
PORT=5000
CLIENT_ORIGIN=https://yourdomain.com
```

**Frontend `.env.production`:**
```bash
VITE_API_BASE_URL=https://api.yourdomain.com
```

## Summary

✅ Added `CLIENT_ORIGIN` to backend `.env`
✅ Set backend `PORT` to 5000
✅ Improved CORS configuration with explicit methods and headers
✅ Added preflight request handler
✅ Moved CORS before other middleware

**Next step:** Restart the backend server and test the contact form!

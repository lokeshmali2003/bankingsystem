# Complete Setup Guide - Banking System

## 📋 Table of Contents
1. [Prerequisites](#prerequisites)
2. [Backend Setup](#backend-setup)
3. [Frontend Setup](#frontend-setup)
4. [Database Configuration](#database-configuration)
5. [Environment Variables](#environment-variables)
6. [Running the Application](#running-the-application)
7. [Testing the Application](#testing-the-application)

## Prerequisites

Before starting, ensure you have installed:

- **Node.js** (v18 or higher) - [Download](https://nodejs.org/)
- **MongoDB** (v6 or higher) - [Download](https://www.mongodb.com/try/download/community) OR use [MongoDB Atlas](https://www.mongodb.com/cloud/atlas) (free tier available)
- **Git** - [Download](https://git-scm.com/)
- **Code Editor** (VS Code recommended)

## Backend Setup

### Step 1: Navigate to Backend Directory

```bash
cd bankingsystem/backend
```

### Step 2: Install Dependencies

```bash
npm install
```

This will install all required packages including:
- Express.js
- Mongoose
- JWT
- bcrypt
- Joi
- Nodemailer
- And more...

### Step 3: Create Environment File

Create a `.env` file in the `backend` directory:

```bash
# Windows
copy .env.example .env

# Mac/Linux
cp .env.example .env
```

### Step 4: Configure Environment Variables

Open `.env` and update the following:

```env
# Server
NODE_ENV=development
PORT=5000

# MongoDB - Use your MongoDB connection string
MONGODB_URI=mongodb://localhost:27017/banking_system
# OR for MongoDB Atlas:
# MONGODB_URI=mongodb+srv://username:password@cluster.mongodb.net/banking_system

# JWT Secrets - CHANGE THESE IN PRODUCTION!
JWT_SECRET=your_super_secret_jwt_key_change_this_in_production
JWT_REFRESH_SECRET=your_super_secret_refresh_token_key_change_this_in_production
JWT_EXPIRE=7d
JWT_REFRESH_EXPIRE=30d

# Email Configuration (for password reset, verification)
EMAIL_HOST=smtp.gmail.com
EMAIL_PORT=587
EMAIL_USER=your_email@gmail.com
EMAIL_PASS=your_app_password  # Use App Password for Gmail
EMAIL_FROM=noreply@bankingsystem.com

# Cloudinary (for document uploads - optional)
CLOUDINARY_CLOUD_NAME=your_cloud_name
CLOUDINARY_API_KEY=your_api_key
CLOUDINARY_API_SECRET=your_api_secret

# Frontend URL
FRONTEND_URL=http://localhost:5173

# OTP Configuration
OTP_EXPIRE_MINUTES=10

# Rate Limiting
RATE_LIMIT_WINDOW_MS=900000
RATE_LIMIT_MAX_REQUESTS=100
```

**Important Notes:**
- Generate strong JWT secrets (use `openssl rand -base64 32`)
- For Gmail, enable 2FA and create an App Password
- Cloudinary is optional but needed for document uploads

### Step 5: Create Logs Directory

```bash
# Windows
mkdir logs

# Mac/Linux
mkdir -p logs
```

### Step 6: Seed Sample Data (Optional)

```bash
npm run seed
```

This creates:
- Admin user: `admin@bankingsystem.com` / `Admin123!`
- Sample users with accounts and transactions

### Step 7: Start Backend Server

```bash
# Development mode (with auto-reload)
npm run dev

# Production mode
npm start
```

Backend will run on `http://localhost:5000`

## Frontend Setup

### Step 1: Navigate to Frontend Directory

Open a new terminal and navigate to:

```bash
cd bankingsystem/frontend
```

### Step 2: Install Dependencies

```bash
npm install
```

This installs:
- React
- Vite
- Tailwind CSS
- Redux Toolkit
- React Router
- Axios
- And more...

### Step 3: Configure Environment (Optional)

Create `.env` file in `frontend` directory:

```env
VITE_API_URL=http://localhost:5000/api
```

### Step 4: Start Frontend Development Server

```bash
npm run dev
```

Frontend will run on `http://localhost:5173`

## Database Configuration

### Option 1: Local MongoDB

1. Install MongoDB Community Edition
2. Start MongoDB service:
   ```bash
   # Windows
   net start MongoDB

   # Mac (using Homebrew)
   brew services start mongodb-community

   # Linux
   sudo systemctl start mongod
   ```
3. Use connection string: `mongodb://localhost:27017/banking_system`

### Option 2: MongoDB Atlas (Cloud)

1. Create account at [MongoDB Atlas](https://www.mongodb.com/cloud/atlas)
2. Create a new cluster (free tier available)
3. Create database user
4. Whitelist your IP address (or use `0.0.0.0/0` for development)
5. Get connection string and update `MONGODB_URI` in `.env`

## Running the Application

### Development Mode

1. **Terminal 1 - Backend:**
   ```bash
   cd bankingsystem/backend
   npm run dev
   ```

2. **Terminal 2 - Frontend:**
   ```bash
   cd bankingsystem/frontend
   npm run dev
   ```

3. Open browser: `http://localhost:5173`

### Production Mode

1. **Build Frontend:**
   ```bash
   cd bankingsystem/frontend
   npm run build
   ```

2. **Start Backend:**
   ```bash
   cd bankingsystem/backend
   npm start
   ```

3. Serve frontend `dist` folder with a web server (Nginx, Apache, etc.)

## Testing the Application

### 1. Register a New User

- Navigate to `http://localhost:5173/register`
- Fill in the registration form
- Submit and verify email (check console for verification link in development)

### 2. Login

- Use seeded credentials or newly registered account
- Admin: `admin@bankingsystem.com` / `Admin123!`
- User: `john.doe@example.com` / `Password123!`

### 3. Create Account

- After login, go to Accounts page
- Click "Create Account"
- Select account type and initial deposit

### 4. Make Transactions

- Go to Transfer page
- Select from/to accounts
- Enter amount and description
- Submit transfer

### 5. Apply for Loan

- Go to Loans page
- Click "Apply for Loan"
- Fill in loan details
- Submit application

### 6. Admin Functions

- Login as admin
- Access admin dashboard
- View users, approve/reject loans
- Manage system

## Common Issues & Solutions

### Issue: MongoDB Connection Failed

**Solution:**
- Ensure MongoDB is running
- Check connection string in `.env`
- Verify network access (for Atlas)

### Issue: Port Already in Use

**Solution:**
- Change `PORT` in backend `.env`
- Or kill process using the port:
  ```bash
  # Windows
  netstat -ano | findstr :5000
  taskkill /PID <PID> /F

  # Mac/Linux
  lsof -ti:5000 | xargs kill
  ```

### Issue: Email Not Sending

**Solution:**
- Verify email credentials
- For Gmail, use App Password (not regular password)
- Check firewall/antivirus settings

### Issue: CORS Errors

**Solution:**
- Ensure `FRONTEND_URL` in backend `.env` matches frontend URL
- Check CORS configuration in `app.js`

### Issue: Module Not Found

**Solution:**
- Delete `node_modules` and `package-lock.json`
- Run `npm install` again

## Project Structure Overview

```
bankingsystem/
├── backend/
│   ├── src/
│   │   ├── config/          # Database & config
│   │   ├── controllers/     # Route handlers
│   │   ├── models/          # MongoDB schemas
│   │   ├── routes/          # API endpoints
│   │   ├── services/        # Business logic
│   │   ├── middlewares/     # Auth, error handling
│   │   ├── validations/      # Input validation
│   │   └── utils/           # Helpers
│   ├── app.js              # Express setup
│   ├── server.js           # Entry point
│   └── package.json
│
└── frontend/
    ├── src/
    │   ├── pages/          # Page components
    │   ├── layouts/        # Layout components
    │   ├── services/       # API calls
    │   ├── store/          # Redux store
    │   └── components/     # Reusable components
    └── package.json
```

## Next Steps

1. ✅ Set up environment variables
2. ✅ Run seed data script
3. ✅ Test authentication flow
4. ✅ Create accounts and transactions
5. ✅ Test admin functions
6. 🔄 Customize for your needs
7. 🔄 Add more features
8. 🔄 Deploy to production

## Production Checklist

Before deploying to production:

- [ ] Change all default passwords
- [ ] Use strong JWT secrets
- [ ] Set `NODE_ENV=production`
- [ ] Use production MongoDB database
- [ ] Configure proper email service
- [ ] Set up HTTPS/SSL
- [ ] Configure CORS for production domain
- [ ] Set up error monitoring (Sentry, etc.)
- [ ] Configure logging
- [ ] Set up backup strategy
- [ ] Review security settings
- [ ] Load testing
- [ ] Documentation

## Support

For issues or questions:
1. Check the README.md
2. Review error logs
3. Check MongoDB connection
4. Verify environment variables

---

**Happy Coding! 🚀**


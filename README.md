# Banking System - MERN Stack Application

A complete, production-ready banking system built with MongoDB, Express, React, and Node.js.

## 🏗️ Architecture

This project follows clean architecture principles with separation of concerns:

- **Backend**: Node.js + Express + MongoDB
- **Frontend**: React + Vite + Tailwind CSS
- **State Management**: Redux Toolkit
- **Authentication**: JWT (Access + Refresh Tokens)
- **Security**: bcrypt, helmet, rate limiting, input validation

## 📁 Project Structure

```
bankingsystem/
├── backend/
│   ├── src/
│   │   ├── config/          # Database, environment configs
│   │   ├── controllers/     # Request handlers
│   │   ├── models/          # MongoDB models
│   │   ├── routes/          # API routes
│   │   ├── services/        # Business logic
│   │   ├── middlewares/     # Custom middlewares
│   │   ├── validations/      # Joi validation schemas
│   │   └── utils/            # Helper functions
│   ├── app.js               # Express app setup
│   ├── server.js            # Server entry point
│   └── package.json
│
└── frontend/
    ├── src/
    │   ├── components/      # Reusable components
    │   ├── pages/           # Page components
    │   ├── layouts/         # Layout components
    │   ├── services/        # API services
    │   ├── store/           # Redux store
    │   └── utils/           # Helper functions
    └── package.json
```

## 🚀 Getting Started

### Prerequisites

- Node.js (v18 or higher)
- MongoDB (local or MongoDB Atlas)
- npm or yarn

### Backend Setup

1. Navigate to backend directory:
```bash
cd bankingsystem/backend
```

2. Install dependencies:
```bash
npm install
```

3. Create `.env` file (copy from `.env.example`):
```bash
cp .env.example .env
```

4. Update `.env` with your configuration:
```env
NODE_ENV=development
PORT=5000
MONGODB_URI=mongodb://localhost:27017/banking_system
JWT_SECRET=your_super_secret_jwt_key
JWT_REFRESH_SECRET=your_super_secret_refresh_token_key
EMAIL_HOST=smtp.gmail.com
EMAIL_PORT=587
EMAIL_USER=your_email@gmail.com
EMAIL_PASS=your_app_password
FRONTEND_URL=http://localhost:5173
```

5. Create logs directory:
```bash
mkdir logs
```

6. Seed sample data (optional):
```bash
npm run seed
```

7. Start the server:
```bash
# Development
npm run dev

# Production
npm start
```

### Frontend Setup

1. Navigate to frontend directory:
```bash
cd bankingsystem/frontend
```

2. Install dependencies:
```bash
npm install
```

3. Create `.env` file (optional):
```env
VITE_API_URL=http://localhost:5000/api
```

4. Start the development server:
```bash
npm run dev
```

The frontend will be available at `http://localhost:5173`

## 📚 API Documentation

### Authentication Endpoints

- `POST /api/auth/register` - Register a new user
- `POST /api/auth/login` - Login user
- `POST /api/auth/logout` - Logout user
- `POST /api/auth/refresh-token` - Refresh access token
- `GET /api/auth/me` - Get current user
- `POST /api/auth/forgot-password` - Request password reset
- `POST /api/auth/reset-password` - Reset password
- `GET /api/auth/verify-email/:token` - Verify email

### Account Endpoints

- `GET /api/accounts` - Get user's accounts
- `GET /api/accounts/:id` - Get account by ID
- `POST /api/accounts` - Create new account
- `PUT /api/accounts/:id` - Update account
- `DELETE /api/accounts/:id` - Close account

### Transaction Endpoints

- `GET /api/transactions` - Get transaction history
- `POST /api/transactions/transfer` - Transfer funds
- `POST /api/transactions/deposit` - Deposit funds
- `POST /api/transactions/withdraw` - Withdraw funds
- `GET /api/transactions/statement/:accountId` - Generate statement PDF

### Loan Endpoints

- `GET /api/loans` - Get user's loans
- `GET /api/loans/:id` - Get loan by ID
- `POST /api/loans` - Apply for loan
- `POST /api/loans/:id/pay` - Make loan payment

### Admin Endpoints

- `GET /api/admin/dashboard` - Get dashboard stats
- `GET /api/admin/users` - Get all users
- `PUT /api/admin/users/:id` - Update user
- `GET /api/admin/loans/pending` - Get pending loans
- `PUT /api/admin/loans/:id/approve` - Approve loan
- `PUT /api/admin/loans/:id/reject` - Reject loan

## 🔐 Security Features

- **JWT Authentication**: Access and refresh tokens
- **Password Hashing**: bcrypt with salt rounds
- **Rate Limiting**: Prevents brute force attacks
- **Input Validation**: Joi schemas for all inputs
- **Helmet**: Security headers
- **MongoDB Sanitization**: Prevents NoSQL injection
- **CORS**: Configured for frontend origin
- **Account Locking**: After failed login attempts

## 🎨 Frontend Features

- **Responsive Design**: Mobile-first approach
- **Protected Routes**: Authentication and role-based routing
- **Real-time Updates**: Redux state management
- **Error Handling**: Toast notifications
- **Loading States**: User feedback during operations
- **Modern UI**: Tailwind CSS styling

## 📝 Sample Data

After running `npm run seed`, you can login with:

**Admin:**
- Email: `admin@bankingsystem.com`
- Password: `Admin123!`

**Users:**
- Email: `john.doe@example.com`
- Password: `Password123!`

- Email: `jane.smith@example.com`
- Password: `Password123!`

## 🛠️ Development

### Backend Development

- Uses nodemon for auto-reload
- Winston for logging
- ESLint for code quality

### Frontend Development

- Vite for fast development
- Hot module replacement
- ESLint for code quality

## 📦 Production Deployment

### Backend

1. Set `NODE_ENV=production`
2. Update MongoDB URI to production database
3. Set secure JWT secrets
4. Configure email service
5. Set up Cloudinary for file uploads
6. Use PM2 or similar for process management

### Frontend

1. Build the application:
```bash
npm run build
```

2. Serve the `dist` folder with a web server (Nginx, Apache, etc.)

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Submit a pull request

## 📄 License

This project is licensed under the ISC License.

## 👨‍💻 Author

Built with ❤️ for portfolio and real-world use.

## 🔗 Key Technologies

- **Backend**: Express.js, MongoDB, Mongoose, JWT, bcrypt, Joi
- **Frontend**: React, Redux Toolkit, React Router, Tailwind CSS, Axios
- **DevOps**: ESLint, Prettier, Git
- **Integrations**: Nodemailer, Cloudinary, PDFKit

---

**Note**: This is a production-ready template. Make sure to:
- Change all default passwords
- Use strong JWT secrets
- Configure email service properly
- Set up proper error monitoring
- Use HTTPS in production
- Regular security audits

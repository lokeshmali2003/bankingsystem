import { Routes, Route, Navigate } from 'react-router-dom'
import { useSelector } from 'react-redux'
import PublicLayout from './layouts/PublicLayout'
import PrivateLayout from './layouts/PrivateLayout'
import AdminLayout from './layouts/AdminLayout'

// Public Pages
import Home from './pages/Public/Home'
import About from './pages/Public/About'
import Contact from './pages/Public/Contact'

// Auth Pages
import Login from './pages/Auth/Login'
import Register from './pages/Auth/Register'
import ForgotPassword from './pages/Auth/ForgotPassword'

// User Pages
import Dashboard from './pages/User/Dashboard'
import Profile from './pages/User/Profile'
import Accounts from './pages/User/Accounts'
import Transactions from './pages/User/Transactions'
import Transfer from './pages/User/Transfer'
import Loans from './pages/User/Loans'

// Admin Pages
import AdminDashboard from './pages/Admin/Dashboard'
import UserManagement from './pages/Admin/UserManagement'
import Reports from './pages/Admin/Reports'

function App() {
  const { user, isAuthenticated } = useSelector((state) => state.auth)

  return (
    <Routes>
      {/* Public Routes */}
      <Route element={<PublicLayout />}>
        <Route path="/" element={<Home />} />
        <Route path="/about" element={<About />} />
        <Route path="/contact" element={<Contact />} />
        <Route 
          path="/login" 
          element={isAuthenticated ? <Navigate to={user?.role === 'admin' ? '/admin/dashboard' : '/dashboard'} /> : <Login />} 
        />
        <Route 
          path="/register" 
          element={isAuthenticated ? <Navigate to="/dashboard" /> : <Register />} 
        />
        <Route path="/forgot-password" element={<ForgotPassword />} />
      </Route>

      {/* Protected User Routes */}
      <Route 
        element={
          <PrivateRoute>
            <PrivateLayout />
          </PrivateRoute>
        }
      >
        <Route path="/dashboard" element={<Dashboard />} />
        <Route path="/profile" element={<Profile />} />
        <Route path="/accounts" element={<Accounts />} />
        <Route path="/transactions" element={<Transactions />} />
        <Route path="/transfer" element={<Transfer />} />
        <Route path="/loans" element={<Loans />} />
      </Route>

      {/* Protected Admin Routes */}
      <Route
        element={
          <AdminRoute>
            <AdminLayout />
          </AdminRoute>
        }
      >
        <Route path="/admin/dashboard" element={<AdminDashboard />} />
        <Route path="/admin/users" element={<UserManagement />} />
        <Route path="/admin/reports" element={<Reports />} />
      </Route>

      {/* 404 */}
      <Route path="*" element={<Navigate to="/" />} />
    </Routes>
  )
}

// Private Route Component
function PrivateRoute({ children }) {
  const { isAuthenticated } = useSelector((state) => state.auth)

  if (!isAuthenticated) {
    return <Navigate to="/login" replace />
  }

  return children
}

// Admin Route Component
function AdminRoute({ children }) {
  const { isAuthenticated, user } = useSelector((state) => state.auth)

  if (!isAuthenticated) {
    return <Navigate to="/login" replace />
  }

  if (user?.role !== 'admin') {
    return <Navigate to="/dashboard" replace />
  }

  return children
}

export default App


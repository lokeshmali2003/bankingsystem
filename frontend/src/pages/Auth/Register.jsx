import { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { useDispatch } from 'react-redux'
import { register } from '../../store/slices/authSlice'
import toast from 'react-hot-toast'

export default function Register() {
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    email: '',
    phone: '',
    password: '',
    confirmPassword: '',
    dateOfBirth: '',
    address: {
      street: '',
      city: '',
      state: '',
      zipCode: '',
      country: 'USA',
    },
  })
  const dispatch = useDispatch()
  const navigate = useNavigate()

  const handleChange = (e) => {
    const { name, value } = e.target
    if (name.startsWith('address.')) {
      const addressField = name.split('.')[1]
      setFormData({
        ...formData,
        address: {
          ...formData.address,
          [addressField]: value,
        },
      })
    } else {
      setFormData({
        ...formData,
        [name]: value,
      })
    }
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    
    if (formData.password !== formData.confirmPassword) {
      toast.error('Passwords do not match')
      return
    }

    try {
      // Send all form data including confirmPassword for backend validation
      const result = await dispatch(register(formData))
      if (register.fulfilled.match(result)) {
        toast.success('Registration successful! Please verify your email.')
        navigate('/dashboard')
      } else {
        toast.error(result.payload || 'Registration failed')
      }
    } catch (error) {
      toast.error('An error occurred')
    }
  }

  return (
    <div className="min-h-screen bg-gray-50 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-2xl mx-auto">
        <h2 className="text-3xl font-extrabold text-center text-gray-900 mb-8">
          Create your account
        </h2>
        <form className="card space-y-6" onSubmit={handleSubmit}>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="label">First Name</label>
              <input
                type="text"
                name="firstName"
                required
                className="input"
                value={formData.firstName}
                onChange={handleChange}
              />
            </div>
            <div>
              <label className="label">Last Name</label>
              <input
                type="text"
                name="lastName"
                required
                className="input"
                value={formData.lastName}
                onChange={handleChange}
              />
            </div>
          </div>

          <div>
            <label className="label">Email</label>
            <input
              type="email"
              name="email"
              required
              className="input"
              value={formData.email}
              onChange={handleChange}
            />
          </div>

          <div>
            <label className="label">Phone</label>
            <input
              type="tel"
              name="phone"
              required
              className="input"
              value={formData.phone}
              onChange={handleChange}
            />
          </div>

          <div>
            <label className="label">Date of Birth</label>
            <input
              type="date"
              name="dateOfBirth"
              required
              className="input"
              value={formData.dateOfBirth}
              onChange={handleChange}
            />
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="label">Password</label>
              <input
                type="password"
                name="password"
                required
                className="input"
                value={formData.password}
                onChange={handleChange}
              />
            </div>
            <div>
              <label className="label">Confirm Password</label>
              <input
                type="password"
                name="confirmPassword"
                required
                className="input"
                value={formData.confirmPassword}
                onChange={handleChange}
              />
            </div>
          </div>

          <div className="border-t pt-4">
            <h3 className="text-lg font-semibold mb-4">Address</h3>
            <div className="space-y-4">
              <div>
                <label className="label">Street</label>
                <input
                  type="text"
                  name="address.street"
                  required
                  className="input"
                  value={formData.address.street}
                  onChange={handleChange}
                />
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="label">City</label>
                  <input
                    type="text"
                    name="address.city"
                    required
                    className="input"
                    value={formData.address.city}
                    onChange={handleChange}
                  />
                </div>
                <div>
                  <label className="label">State</label>
                  <input
                    type="text"
                    name="address.state"
                    required
                    className="input"
                    value={formData.address.state}
                    onChange={handleChange}
                  />
                </div>
              </div>
              <div>
                <label className="label">Zip Code</label>
                <input
                  type="text"
                  name="address.zipCode"
                  required
                  className="input"
                  value={formData.address.zipCode}
                  onChange={handleChange}
                />
              </div>
            </div>
          </div>

          <button type="submit" className="btn btn-primary w-full">
            Register
          </button>

          <div className="text-center text-sm">
            <span className="text-gray-600">Already have an account? </span>
            <Link
              to="/login"
              className="font-medium text-primary-600 hover:text-primary-500"
            >
              Sign in
            </Link>
          </div>
        </form>
      </div>
    </div>
  )
}


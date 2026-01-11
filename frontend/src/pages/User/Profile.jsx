import { useState, useEffect } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { getCurrentUser } from '../../store/slices/authSlice'
import toast from 'react-hot-toast'

export default function Profile() {
  const { user } = useSelector((state) => state.auth)
  const dispatch = useDispatch()
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    phone: '',
    address: {
      street: '',
      city: '',
      state: '',
      zipCode: '',
      country: 'USA',
    },
  })
  const [loading, setLoading] = useState(false)

  useEffect(() => {
    if (user) {
      setFormData({
        firstName: user.firstName || '',
        lastName: user.lastName || '',
        phone: user.phone || '',
        address: user.address || {
          street: '',
          city: '',
          state: '',
          zipCode: '',
          country: 'USA',
        },
      })
    } else {
      dispatch(getCurrentUser())
    }
  }, [user, dispatch])

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
    setLoading(true)
    try {
      // Update profile API call would go here
      toast.success('Profile updated successfully')
      dispatch(getCurrentUser())
    } catch (error) {
      toast.error('Failed to update profile')
    } finally {
      setLoading(false)
    }
  }

  return (
    <div>
      <h1 className="text-3xl font-bold mb-8">Profile</h1>
      <div className="card max-w-2xl">
        <form onSubmit={handleSubmit} className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="label">First Name</label>
              <input
                type="text"
                name="firstName"
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
              className="input bg-gray-100"
              value={user?.email || ''}
              disabled
            />
            <p className="text-sm text-gray-500 mt-1">Email cannot be changed</p>
          </div>

          <div>
            <label className="label">Phone</label>
            <input
              type="tel"
              name="phone"
              className="input"
              value={formData.phone}
              onChange={handleChange}
            />
          </div>

          <div className="border-t pt-4">
            <h3 className="text-lg font-semibold mb-4">Address</h3>
            <div className="space-y-4">
              <div>
                <label className="label">Street</label>
                <input
                  type="text"
                  name="address.street"
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
                  className="input"
                  value={formData.address.zipCode}
                  onChange={handleChange}
                />
              </div>
            </div>
          </div>

          <button
            type="submit"
            disabled={loading}
            className="btn btn-primary"
          >
            {loading ? 'Updating...' : 'Update Profile'}
          </button>
        </form>
      </div>
    </div>
  )
}


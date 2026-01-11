import { useState, useEffect } from 'react'
import { adminService } from '../../services/api/admin.service'
import { FiUsers, FiCreditCard, FiDollarSign, FiClock } from 'react-icons/fi'
import toast from 'react-hot-toast'

export default function AdminDashboard() {
  const [stats, setStats] = useState(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    loadStats()
  }, [])

  const loadStats = async () => {
    try {
      const response = await adminService.getDashboardStats()
      setStats(response.data.data.stats)
    } catch (error) {
      toast.error('Failed to load dashboard stats')
    } finally {
      setLoading(false)
    }
  }

  if (loading) {
    return <div className="text-center py-12">Loading...</div>
  }

  return (
    <div>
      <h1 className="text-3xl font-bold mb-8">Admin Dashboard</h1>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
        <div className="card">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-gray-600 text-sm">Total Users</p>
              <p className="text-2xl font-bold">{stats?.users?.total || 0}</p>
              <p className="text-sm text-green-600">Active: {stats?.users?.active || 0}</p>
            </div>
            <FiUsers className="text-4xl text-primary-600" />
          </div>
        </div>

        <div className="card">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-gray-600 text-sm">Total Accounts</p>
              <p className="text-2xl font-bold">{stats?.accounts?.total || 0}</p>
            </div>
            <FiCreditCard className="text-4xl text-primary-600" />
          </div>
        </div>

        <div className="card">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-gray-600 text-sm">Total Loans</p>
              <p className="text-2xl font-bold">{stats?.loans?.total || 0}</p>
              <p className="text-sm text-yellow-600">Pending: {stats?.loans?.pending || 0}</p>
            </div>
            <FiDollarSign className="text-4xl text-primary-600" />
          </div>
        </div>

        <div className="card">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-gray-600 text-sm">Total Transactions</p>
              <p className="text-2xl font-bold">{stats?.transactions?.total || 0}</p>
              <p className="text-sm text-gray-600">${stats?.transactions?.totalAmount?.toFixed(2) || '0.00'}</p>
            </div>
            <FiClock className="text-4xl text-primary-600" />
          </div>
        </div>
      </div>

      <div className="card">
        <h2 className="text-xl font-semibold mb-4">Quick Actions</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <a href="/admin/users" className="btn btn-primary text-center">
            Manage Users
          </a>
          <a href="/admin/reports" className="btn btn-secondary text-center">
            View Reports
          </a>
          <a href="/admin/loans/pending" className="btn btn-secondary text-center">
            Review Loans
          </a>
        </div>
      </div>
    </div>
  )
}


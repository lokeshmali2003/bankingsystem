import { useState, useEffect } from 'react'
import { accountService } from '../../services/api/account.service'
import toast from 'react-hot-toast'
import { FiPlus, FiTrash2 } from 'react-icons/fi'

export default function Accounts() {
  const [accounts, setAccounts] = useState([])
  const [loading, setLoading] = useState(true)
  const [showCreateModal, setShowCreateModal] = useState(false)
  const [formData, setFormData] = useState({
    accountType: 'savings',
    initialDeposit: 0,
  })

  useEffect(() => {
    loadAccounts()
  }, [])

  const loadAccounts = async () => {
    try {
      const response = await accountService.getAccounts()
      setAccounts(response.data.data.accounts)
    } catch (error) {
      toast.error('Failed to load accounts')
    } finally {
      setLoading(false)
    }
  }

  const handleCreate = async (e) => {
    e.preventDefault()
    try {
      await accountService.createAccount(formData)
      toast.success('Account created successfully')
      setShowCreateModal(false)
      loadAccounts()
    } catch (error) {
      toast.error(error.response?.data?.error || 'Failed to create account')
    }
  }

  const handleClose = async (id) => {
    if (!window.confirm('Are you sure you want to close this account?')) return
    
    try {
      await accountService.closeAccount(id)
      toast.success('Account closed successfully')
      loadAccounts()
    } catch (error) {
      toast.error(error.response?.data?.error || 'Failed to close account')
    }
  }

  if (loading) {
    return <div className="text-center py-12">Loading...</div>
  }

  return (
    <div>
      <div className="flex items-center justify-between mb-8">
        <h1 className="text-3xl font-bold">Accounts</h1>
        <button
          onClick={() => setShowCreateModal(true)}
          className="btn btn-primary flex items-center gap-2"
        >
          <FiPlus /> Create Account
        </button>
      </div>

      {accounts.length === 0 ? (
        <div className="card text-center py-12">
          <p className="text-gray-600 mb-4">No accounts yet</p>
          <button
            onClick={() => setShowCreateModal(true)}
            className="btn btn-primary"
          >
            Create Your First Account
          </button>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {accounts.map((account) => (
            <div key={account._id} className="card">
              <div className="flex items-center justify-between mb-4">
                <h3 className="text-xl font-semibold capitalize">{account.accountType}</h3>
                {account.status === 'active' && (
                  <button
                    onClick={() => handleClose(account._id)}
                    className="text-red-600 hover:text-red-700"
                  >
                    <FiTrash2 />
                  </button>
                )}
              </div>
              <p className="text-gray-600 text-sm mb-2">Account Number</p>
              <p className="font-mono mb-4">{account.accountNumber}</p>
              <p className="text-gray-600 text-sm mb-2">Balance</p>
              <p className="text-2xl font-bold mb-4">${account.balance.toFixed(2)}</p>
              <p className="text-sm text-gray-500">
                Status: <span className="capitalize">{account.status}</span>
              </p>
            </div>
          ))}
        </div>
      )}

      {/* Create Account Modal */}
      {showCreateModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white rounded-lg p-6 max-w-md w-full">
            <h2 className="text-2xl font-bold mb-4">Create New Account</h2>
            <form onSubmit={handleCreate} className="space-y-4">
              <div>
                <label className="label">Account Type</label>
                <select
                  className="input"
                  value={formData.accountType}
                  onChange={(e) => setFormData({ ...formData, accountType: e.target.value })}
                >
                  <option value="savings">Savings</option>
                  <option value="checking">Checking</option>
                  <option value="current">Current</option>
                </select>
              </div>
              <div>
                <label className="label">Initial Deposit</label>
                <input
                  type="number"
                  step="0.01"
                  min="0"
                  className="input"
                  value={formData.initialDeposit}
                  onChange={(e) => setFormData({ ...formData, initialDeposit: e.target.value })}
                />
              </div>
              <div className="flex gap-4">
                <button
                  type="button"
                  onClick={() => setShowCreateModal(false)}
                  className="btn btn-secondary flex-1"
                >
                  Cancel
                </button>
                <button type="submit" className="btn btn-primary flex-1">
                  Create
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  )
}


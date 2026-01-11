import { useState, useEffect } from 'react'
import { accountService } from '../../services/api/account.service'
import { transactionService } from '../../services/api/transaction.service'
import { beneficiaryService } from '../../services/api/beneficiary.service'
import toast from 'react-hot-toast'
import { FiPlus } from 'react-icons/fi'

export default function Transfer() {
  const [accounts, setAccounts] = useState([])
  const [beneficiaries, setBeneficiaries] = useState([])
  const [formData, setFormData] = useState({
    fromAccount: '',
    toAccount: '',
    amount: '',
    description: '',
  })
  const [loading, setLoading] = useState(false)
  const [showBeneficiaryModal, setShowBeneficiaryModal] = useState(false)
  const [beneficiaryForm, setBeneficiaryForm] = useState({
    nickname: '',
    accountNumber: '',
    accountHolderName: '',
    bankName: '',
    ifscCode: '',
    accountType: 'savings',
  })

  useEffect(() => {
    loadData()
  }, [])

  const loadData = async () => {
    try {
      const [accountsRes, beneficiariesRes] = await Promise.all([
        accountService.getAccounts(),
        beneficiaryService.getBeneficiaries(),
      ])
      setAccounts(accountsRes.data.data.accounts)
      setBeneficiaries(beneficiariesRes.data.data.beneficiaries)
    } catch (error) {
      toast.error('Failed to load data')
    }
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    setLoading(true)
    try {
      await transactionService.transfer(formData)
      toast.success('Transfer completed successfully')
      setFormData({
        fromAccount: '',
        toAccount: '',
        amount: '',
        description: '',
      })
      loadData()
    } catch (error) {
      toast.error(error.response?.data?.error || 'Transfer failed')
    } finally {
      setLoading(false)
    }
  }

  const handleAddBeneficiary = async (e) => {
    e.preventDefault()
    try {
      await beneficiaryService.addBeneficiary(beneficiaryForm)
      toast.success('Beneficiary added successfully')
      setShowBeneficiaryModal(false)
      setBeneficiaryForm({
        nickname: '',
        accountNumber: '',
        accountHolderName: '',
        bankName: '',
        ifscCode: '',
        accountType: 'savings',
      })
      loadData()
    } catch (error) {
      toast.error(error.response?.data?.error || 'Failed to add beneficiary')
    }
  }

  return (
    <div>
      <h1 className="text-3xl font-bold mb-8">Fund Transfer</h1>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        <div className="lg:col-span-2">
          <div className="card">
            <h2 className="text-xl font-semibold mb-6">Transfer Funds</h2>
            <form onSubmit={handleSubmit} className="space-y-4">
              <div>
                <label className="label">From Account</label>
                <select
                  className="input"
                  required
                  value={formData.fromAccount}
                  onChange={(e) => setFormData({ ...formData, fromAccount: e.target.value })}
                >
                  <option value="">Select Account</option>
                  {accounts.map((account) => (
                    <option key={account._id} value={account._id}>
                      {account.accountType.toUpperCase()} - ****{account.accountNumber.slice(-4)} (${account.balance.toFixed(2)})
                    </option>
                  ))}
                </select>
              </div>

              <div>
                <label className="label">To Account</label>
                <select
                  className="input"
                  required
                  value={formData.toAccount}
                  onChange={(e) => setFormData({ ...formData, toAccount: e.target.value })}
                >
                  <option value="">Select Account</option>
                  {accounts.map((account) => (
                    <option key={account._id} value={account._id}>
                      {account.accountType.toUpperCase()} - ****{account.accountNumber.slice(-4)}
                    </option>
                  ))}
                </select>
              </div>

              <div>
                <label className="label">Amount</label>
                <input
                  type="number"
                  step="0.01"
                  min="0.01"
                  required
                  className="input"
                  value={formData.amount}
                  onChange={(e) => setFormData({ ...formData, amount: e.target.value })}
                />
              </div>

              <div>
                <label className="label">Description (Optional)</label>
                <textarea
                  className="input"
                  rows="3"
                  value={formData.description}
                  onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                />
              </div>

              <button
                type="submit"
                disabled={loading}
                className="btn btn-primary w-full"
              >
                {loading ? 'Processing...' : 'Transfer'}
              </button>
            </form>
          </div>
        </div>

        <div>
          <div className="card">
            <div className="flex items-center justify-between mb-4">
              <h2 className="text-xl font-semibold">Beneficiaries</h2>
              <button
                onClick={() => setShowBeneficiaryModal(true)}
                className="btn btn-secondary text-sm flex items-center gap-2"
              >
                <FiPlus /> Add
              </button>
            </div>
            {beneficiaries.length === 0 ? (
              <p className="text-gray-600 text-sm">No beneficiaries yet</p>
            ) : (
              <div className="space-y-3">
                {beneficiaries.map((beneficiary) => (
                  <div key={beneficiary._id} className="p-3 bg-gray-50 rounded-lg">
                    <p className="font-semibold">{beneficiary.nickname}</p>
                    <p className="text-sm text-gray-600">****{beneficiary.accountNumber.slice(-4)}</p>
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Add Beneficiary Modal */}
      {showBeneficiaryModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white rounded-lg p-6 max-w-md w-full">
            <h2 className="text-2xl font-bold mb-4">Add Beneficiary</h2>
            <form onSubmit={handleAddBeneficiary} className="space-y-4">
              <div>
                <label className="label">Nickname</label>
                <input
                  type="text"
                  required
                  className="input"
                  value={beneficiaryForm.nickname}
                  onChange={(e) => setBeneficiaryForm({ ...beneficiaryForm, nickname: e.target.value })}
                />
              </div>
              <div>
                <label className="label">Account Number</label>
                <input
                  type="text"
                  required
                  className="input"
                  value={beneficiaryForm.accountNumber}
                  onChange={(e) => setBeneficiaryForm({ ...beneficiaryForm, accountNumber: e.target.value })}
                />
              </div>
              <div>
                <label className="label">Account Holder Name</label>
                <input
                  type="text"
                  required
                  className="input"
                  value={beneficiaryForm.accountHolderName}
                  onChange={(e) => setBeneficiaryForm({ ...beneficiaryForm, accountHolderName: e.target.value })}
                />
              </div>
              <div>
                <label className="label">Bank Name</label>
                <input
                  type="text"
                  required
                  className="input"
                  value={beneficiaryForm.bankName}
                  onChange={(e) => setBeneficiaryForm({ ...beneficiaryForm, bankName: e.target.value })}
                />
              </div>
              <div>
                <label className="label">IFSC Code</label>
                <input
                  type="text"
                  required
                  className="input"
                  value={beneficiaryForm.ifscCode}
                  onChange={(e) => setBeneficiaryForm({ ...beneficiaryForm, ifscCode: e.target.value.toUpperCase() })}
                />
              </div>
              <div>
                <label className="label">Account Type</label>
                <select
                  className="input"
                  value={beneficiaryForm.accountType}
                  onChange={(e) => setBeneficiaryForm({ ...beneficiaryForm, accountType: e.target.value })}
                >
                  <option value="savings">Savings</option>
                  <option value="checking">Checking</option>
                  <option value="current">Current</option>
                </select>
              </div>
              <div className="flex gap-4">
                <button
                  type="button"
                  onClick={() => setShowBeneficiaryModal(false)}
                  className="btn btn-secondary flex-1"
                >
                  Cancel
                </button>
                <button type="submit" className="btn btn-primary flex-1">
                  Add
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  )
}


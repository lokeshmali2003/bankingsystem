import { useState, useEffect } from 'react'
import { loanService } from '../../services/api/loan.service'
import { accountService } from '../../services/api/account.service'
import toast from 'react-hot-toast'
import { FiPlus } from 'react-icons/fi'

export default function Loans() {
  const [loans, setLoans] = useState([])
  const [accounts, setAccounts] = useState([])
  const [loading, setLoading] = useState(true)
  const [showApplyModal, setShowApplyModal] = useState(false)
  const [showPayModal, setShowPayModal] = useState(false)
  const [selectedLoan, setSelectedLoan] = useState(null)
  const [formData, setFormData] = useState({
    loanType: 'personal',
    principalAmount: '',
    interestRate: '',
    tenureMonths: '',
    account: '',
  })
  const [paymentData, setPaymentData] = useState({
    account: '',
    amount: '',
  })

  useEffect(() => {
    loadData()
  }, [])

  const loadData = async () => {
    try {
      const [loansRes, accountsRes] = await Promise.all([
        loanService.getLoans(),
        accountService.getAccounts(),
      ])
      setLoans(loansRes.data.data.loans)
      setAccounts(accountsRes.data.data.accounts)
    } catch (error) {
      toast.error('Failed to load data')
    } finally {
      setLoading(false)
    }
  }

  const handleApply = async (e) => {
    e.preventDefault()
    try {
      await loanService.applyForLoan(formData)
      toast.success('Loan application submitted successfully')
      setShowApplyModal(false)
      setFormData({
        loanType: 'personal',
        principalAmount: '',
        interestRate: '',
        tenureMonths: '',
        account: '',
      })
      loadData()
    } catch (error) {
      toast.error(error.response?.data?.error || 'Failed to apply for loan')
    }
  }

  const handlePay = async (e) => {
    e.preventDefault()
    try {
      await loanService.payLoan(selectedLoan._id, paymentData)
      toast.success('Payment processed successfully')
      setShowPayModal(false)
      setSelectedLoan(null)
      loadData()
    } catch (error) {
      toast.error(error.response?.data?.error || 'Payment failed')
    }
  }

  if (loading) {
    return <div className="text-center py-12">Loading...</div>
  }

  return (
    <div>
      <div className="flex items-center justify-between mb-8">
        <h1 className="text-3xl font-bold">Loans</h1>
        <button
          onClick={() => setShowApplyModal(true)}
          className="btn btn-primary flex items-center gap-2"
        >
          <FiPlus /> Apply for Loan
        </button>
      </div>

      {loans.length === 0 ? (
        <div className="card text-center py-12">
          <p className="text-gray-600 mb-4">No loans yet</p>
          <button
            onClick={() => setShowApplyModal(true)}
            className="btn btn-primary"
          >
            Apply for Your First Loan
          </button>
        </div>
      ) : (
        <div className="space-y-6">
          {loans.map((loan) => (
            <div key={loan._id} className="card">
              <div className="flex items-center justify-between mb-4">
                <div>
                  <h3 className="text-xl font-semibold">Loan #{loan.loanNumber}</h3>
                  <p className="text-gray-600 capitalize">{loan.loanType} Loan</p>
                </div>
                <span className={`px-3 py-1 rounded-full text-sm ${
                  loan.status === 'approved' || loan.status === 'active' ? 'bg-green-100 text-green-800' :
                  loan.status === 'pending' ? 'bg-yellow-100 text-yellow-800' :
                  loan.status === 'rejected' ? 'bg-red-100 text-red-800' :
                  'bg-gray-100 text-gray-800'
                }`}>
                  {loan.status}
                </span>
              </div>
              <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-4">
                <div>
                  <p className="text-sm text-gray-600">Principal Amount</p>
                  <p className="font-semibold">${loan.principalAmount.toFixed(2)}</p>
                </div>
                <div>
                  <p className="text-sm text-gray-600">Interest Rate</p>
                  <p className="font-semibold">{loan.interestRate}%</p>
                </div>
                <div>
                  <p className="text-sm text-gray-600">EMI</p>
                  <p className="font-semibold">${loan.emiAmount?.toFixed(2)}</p>
                </div>
                <div>
                  <p className="text-sm text-gray-600">Remaining Balance</p>
                  <p className="font-semibold">${loan.remainingBalance?.toFixed(2)}</p>
                </div>
              </div>
              {(loan.status === 'active' || loan.status === 'disbursed') && (
                <button
                  onClick={() => {
                    setSelectedLoan(loan)
                    setShowPayModal(true)
                  }}
                  className="btn btn-primary"
                >
                  Make Payment
                </button>
              )}
            </div>
          ))}
        </div>
      )}

      {/* Apply Loan Modal */}
      {showApplyModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white rounded-lg p-6 max-w-md w-full">
            <h2 className="text-2xl font-bold mb-4">Apply for Loan</h2>
            <form onSubmit={handleApply} className="space-y-4">
              <div>
                <label className="label">Loan Type</label>
                <select
                  className="input"
                  value={formData.loanType}
                  onChange={(e) => setFormData({ ...formData, loanType: e.target.value })}
                >
                  <option value="personal">Personal</option>
                  <option value="home">Home</option>
                  <option value="car">Car</option>
                  <option value="education">Education</option>
                  <option value="business">Business</option>
                </select>
              </div>
              <div>
                <label className="label">Account</label>
                <select
                  className="input"
                  required
                  value={formData.account}
                  onChange={(e) => setFormData({ ...formData, account: e.target.value })}
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
                <label className="label">Principal Amount</label>
                <input
                  type="number"
                  step="0.01"
                  min="1000"
                  required
                  className="input"
                  value={formData.principalAmount}
                  onChange={(e) => setFormData({ ...formData, principalAmount: e.target.value })}
                />
              </div>
              <div>
                <label className="label">Interest Rate (%)</label>
                <input
                  type="number"
                  step="0.1"
                  min="0"
                  max="30"
                  required
                  className="input"
                  value={formData.interestRate}
                  onChange={(e) => setFormData({ ...formData, interestRate: e.target.value })}
                />
              </div>
              <div>
                <label className="label">Tenure (Months)</label>
                <input
                  type="number"
                  min="1"
                  max="360"
                  required
                  className="input"
                  value={formData.tenureMonths}
                  onChange={(e) => setFormData({ ...formData, tenureMonths: e.target.value })}
                />
              </div>
              <div className="flex gap-4">
                <button
                  type="button"
                  onClick={() => setShowApplyModal(false)}
                  className="btn btn-secondary flex-1"
                >
                  Cancel
                </button>
                <button type="submit" className="btn btn-primary flex-1">
                  Apply
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* Pay Loan Modal */}
      {showPayModal && selectedLoan && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white rounded-lg p-6 max-w-md w-full">
            <h2 className="text-2xl font-bold mb-4">Make Loan Payment</h2>
            <form onSubmit={handlePay} className="space-y-4">
              <div>
                <label className="label">From Account</label>
                <select
                  className="input"
                  required
                  value={paymentData.account}
                  onChange={(e) => setPaymentData({ ...paymentData, account: e.target.value })}
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
                <label className="label">Amount (Max: ${selectedLoan.remainingBalance.toFixed(2)})</label>
                <input
                  type="number"
                  step="0.01"
                  min="0.01"
                  max={selectedLoan.remainingBalance}
                  required
                  className="input"
                  value={paymentData.amount}
                  onChange={(e) => setPaymentData({ ...paymentData, amount: e.target.value })}
                />
              </div>
              <div className="flex gap-4">
                <button
                  type="button"
                  onClick={() => {
                    setShowPayModal(false)
                    setSelectedLoan(null)
                  }}
                  className="btn btn-secondary flex-1"
                >
                  Cancel
                </button>
                <button type="submit" className="btn btn-primary flex-1">
                  Pay
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  )
}


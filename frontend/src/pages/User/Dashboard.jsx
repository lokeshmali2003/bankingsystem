import { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import { accountService } from '../../services/api/account.service'
import { transactionService } from '../../services/api/transaction.service'
import { FiCreditCard, FiTrendingUp, FiTrendingDown, FiRepeat, FiDollarSign } from 'react-icons/fi'
import toast from 'react-hot-toast'

export default function Dashboard() {
  const [accounts, setAccounts] = useState([])
  const [recentTransactions, setRecentTransactions] = useState([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    loadData()
  }, [])

  const loadData = async () => {
    try {
      const [accountsRes, transactionsRes] = await Promise.all([
        accountService.getAccounts(),
        transactionService.getTransactions({ limit: 5 }),
      ])
      setAccounts(accountsRes.data.data.accounts)
      setRecentTransactions(transactionsRes.data.data.transactions)
    } catch (error) {
      toast.error('Failed to load dashboard data')
    } finally {
      setLoading(false)
    }
  }

  const totalBalance = accounts.reduce((sum, acc) => sum + acc.balance, 0)

  if (loading) {
    return <div className="text-center py-12">Loading...</div>
  }

  return (
    <div>
      <h1 className="text-3xl font-bold mb-8">Dashboard</h1>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
        <div className="card">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-gray-600 text-sm">Total Balance</p>
              <p className="text-2xl font-bold">${totalBalance.toFixed(2)}</p>
            </div>
            <FiDollarSign className="text-4xl text-primary-600" />
          </div>
        </div>
        <div className="card">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-gray-600 text-sm">Total Accounts</p>
              <p className="text-2xl font-bold">{accounts.length}</p>
            </div>
            <FiCreditCard className="text-4xl text-primary-600" />
          </div>
        </div>
        <div className="card">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-gray-600 text-sm">Recent Transactions</p>
              <p className="text-2xl font-bold">{recentTransactions.length}</p>
            </div>
            <FiRepeat className="text-4xl text-primary-600" />
          </div>
        </div>
      </div>

      {/* Accounts */}
      <div className="card mb-8">
        <div className="flex items-center justify-between mb-4">
          <h2 className="text-xl font-semibold">Your Accounts</h2>
          <Link to="/accounts" className="text-primary-600 hover:text-primary-700">
            View All
          </Link>
        </div>
        {accounts.length === 0 ? (
          <p className="text-gray-600">No accounts yet. <Link to="/accounts" className="text-primary-600">Create one</Link></p>
        ) : (
          <div className="space-y-4">
            {accounts.slice(0, 3).map((account) => (
              <div key={account._id} className="flex items-center justify-between p-4 bg-gray-50 rounded-lg">
                <div>
                  <p className="font-semibold">{account.accountType.toUpperCase()}</p>
                  <p className="text-sm text-gray-600">****{account.accountNumber.slice(-4)}</p>
                </div>
                <p className="text-xl font-bold">${account.balance.toFixed(2)}</p>
              </div>
            ))}
          </div>
        )}
      </div>

      {/* Recent Transactions */}
      <div className="card">
        <div className="flex items-center justify-between mb-4">
          <h2 className="text-xl font-semibold">Recent Transactions</h2>
          <Link to="/transactions" className="text-primary-600 hover:text-primary-700">
            View All
          </Link>
        </div>
        {recentTransactions.length === 0 ? (
          <p className="text-gray-600">No transactions yet</p>
        ) : (
          <div className="space-y-4">
            {recentTransactions.map((transaction) => (
              <div key={transaction._id} className="flex items-center justify-between p-4 bg-gray-50 rounded-lg">
                <div className="flex items-center gap-4">
                  {transaction.transactionType === 'deposit' || transaction.transactionType === 'transfer' ? (
                    <FiTrendingUp className="text-green-600 text-xl" />
                  ) : (
                    <FiTrendingDown className="text-red-600 text-xl" />
                  )}
                  <div>
                    <p className="font-semibold">{transaction.transactionType.toUpperCase()}</p>
                    <p className="text-sm text-gray-600">{transaction.description || 'No description'}</p>
                  </div>
                </div>
                <div className="text-right">
                  <p className={`font-bold ${transaction.transactionType === 'withdrawal' ? 'text-red-600' : 'text-green-600'}`}>
                    {transaction.transactionType === 'withdrawal' ? '-' : '+'}${transaction.amount.toFixed(2)}
                  </p>
                  <p className="text-sm text-gray-600">{new Date(transaction.createdAt).toLocaleDateString()}</p>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  )
}


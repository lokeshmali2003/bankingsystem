import { useState, useEffect } from 'react'
import { transactionService } from '../../services/api/transaction.service'
import toast from 'react-hot-toast'
import { FiDownload } from 'react-icons/fi'
import { format } from 'date-fns'

export default function Transactions() {
  const [transactions, setTransactions] = useState([])
  const [loading, setLoading] = useState(true)
  const [filters, setFilters] = useState({
    page: 1,
    limit: 20,
    type: '',
    status: '',
  })

  useEffect(() => {
    loadTransactions()
  }, [filters])

  const loadTransactions = async () => {
    try {
      const response = await transactionService.getTransactions(filters)
      setTransactions(response.data.data.transactions)
    } catch (error) {
      toast.error('Failed to load transactions')
    } finally {
      setLoading(false)
    }
  }

  const handleDownloadStatement = async (accountId) => {
    try {
      const response = await transactionService.generateStatement(accountId)
      const url = window.URL.createObjectURL(new Blob([response.data]))
      const link = document.createElement('a')
      link.href = url
      link.setAttribute('download', `statement_${accountId}.pdf`)
      document.body.appendChild(link)
      link.click()
      link.remove()
      toast.success('Statement downloaded')
    } catch (error) {
      toast.error('Failed to download statement')
    }
  }

  if (loading) {
    return <div className="text-center py-12">Loading...</div>
  }

  return (
    <div>
      <h1 className="text-3xl font-bold mb-8">Transactions</h1>

      {/* Filters */}
      <div className="card mb-6">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div>
            <label className="label">Type</label>
            <select
              className="input"
              value={filters.type}
              onChange={(e) => setFilters({ ...filters, type: e.target.value, page: 1 })}
            >
              <option value="">All Types</option>
              <option value="deposit">Deposit</option>
              <option value="withdrawal">Withdrawal</option>
              <option value="transfer">Transfer</option>
            </select>
          </div>
          <div>
            <label className="label">Status</label>
            <select
              className="input"
              value={filters.status}
              onChange={(e) => setFilters({ ...filters, status: e.target.value, page: 1 })}
            >
              <option value="">All Status</option>
              <option value="completed">Completed</option>
              <option value="pending">Pending</option>
              <option value="failed">Failed</option>
            </select>
          </div>
        </div>
      </div>

      {/* Transactions List */}
      <div className="card">
        {transactions.length === 0 ? (
          <p className="text-gray-600 text-center py-8">No transactions found</p>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="border-b">
                  <th className="text-left p-4">Date</th>
                  <th className="text-left p-4">Type</th>
                  <th className="text-left p-4">Description</th>
                  <th className="text-right p-4">Amount</th>
                  <th className="text-right p-4">Balance After</th>
                  <th className="text-left p-4">Status</th>
                </tr>
              </thead>
              <tbody>
                {transactions.map((transaction) => (
                  <tr key={transaction._id} className="border-b hover:bg-gray-50">
                    <td className="p-4">
                      {format(new Date(transaction.createdAt), 'MMM dd, yyyy')}
                    </td>
                    <td className="p-4 capitalize">{transaction.transactionType}</td>
                    <td className="p-4">{transaction.description || '-'}</td>
                    <td className={`p-4 text-right font-semibold ${
                      transaction.transactionType === 'withdrawal' ? 'text-red-600' : 'text-green-600'
                    }`}>
                      {transaction.transactionType === 'withdrawal' ? '-' : '+'}${transaction.amount.toFixed(2)}
                    </td>
                    <td className="p-4 text-right">${transaction.balanceAfter.toFixed(2)}</td>
                    <td className="p-4">
                      <span className={`px-2 py-1 rounded text-xs ${
                        transaction.status === 'completed' ? 'bg-green-100 text-green-800' :
                        transaction.status === 'pending' ? 'bg-yellow-100 text-yellow-800' :
                        'bg-red-100 text-red-800'
                      }`}>
                        {transaction.status}
                      </span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>
    </div>
  )
}


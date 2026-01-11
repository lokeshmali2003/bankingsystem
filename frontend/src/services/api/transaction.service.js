import axiosInstance from './axios'

export const transactionService = {
  getTransactions: (params) => {
    return axiosInstance.get('/transactions', { params })
  },

  transfer: (data) => {
    return axiosInstance.post('/transactions/transfer', data)
  },

  deposit: (data) => {
    return axiosInstance.post('/transactions/deposit', data)
  },

  withdraw: (data) => {
    return axiosInstance.post('/transactions/withdraw', data)
  },

  generateStatement: (accountId, startDate, endDate) => {
    return axiosInstance.get(`/transactions/statement/${accountId}`, {
      params: { startDate, endDate },
      responseType: 'blob',
    })
  },
}


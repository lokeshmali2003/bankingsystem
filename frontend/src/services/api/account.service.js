import axiosInstance from './axios'

export const accountService = {
  getAccounts: () => {
    return axiosInstance.get('/accounts')
  },

  getAccount: (id) => {
    return axiosInstance.get(`/accounts/${id}`)
  },

  createAccount: (data) => {
    return axiosInstance.post('/accounts', data)
  },

  updateAccount: (id, data) => {
    return axiosInstance.put(`/accounts/${id}`, data)
  },

  closeAccount: (id) => {
    return axiosInstance.delete(`/accounts/${id}`)
  },
}


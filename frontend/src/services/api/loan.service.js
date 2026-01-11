import axiosInstance from './axios'

export const loanService = {
  getLoans: (params) => {
    return axiosInstance.get('/loans', { params })
  },

  getLoan: (id) => {
    return axiosInstance.get(`/loans/${id}`)
  },

  applyForLoan: (data) => {
    return axiosInstance.post('/loans', data)
  },

  payLoan: (id, data) => {
    return axiosInstance.post(`/loans/${id}/pay`, data)
  },
}


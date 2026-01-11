import axiosInstance from './axios'

export const adminService = {
  getDashboardStats: () => {
    return axiosInstance.get('/admin/dashboard')
  },

  getUsers: (params) => {
    return axiosInstance.get('/admin/users', { params })
  },

  getUser: (id) => {
    return axiosInstance.get(`/admin/users/${id}`)
  },

  updateUser: (id, data) => {
    return axiosInstance.put(`/admin/users/${id}`, data)
  },

  getPendingLoans: () => {
    return axiosInstance.get('/admin/loans/pending')
  },

  approveLoan: (id) => {
    return axiosInstance.put(`/admin/loans/${id}/approve`)
  },

  rejectLoan: (id, reason) => {
    return axiosInstance.put(`/admin/loans/${id}/reject`, { reason })
  },
}


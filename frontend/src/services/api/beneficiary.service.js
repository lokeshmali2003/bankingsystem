import axiosInstance from './axios'

export const beneficiaryService = {
  getBeneficiaries: () => {
    return axiosInstance.get('/beneficiaries')
  },

  addBeneficiary: (data) => {
    return axiosInstance.post('/beneficiaries', data)
  },

  updateBeneficiary: (id, data) => {
    return axiosInstance.put(`/beneficiaries/${id}`, data)
  },

  deleteBeneficiary: (id) => {
    return axiosInstance.delete(`/beneficiaries/${id}`)
  },
}


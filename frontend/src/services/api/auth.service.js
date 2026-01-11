import axiosInstance from './axios'

export const authService = {
  login: (email, password) => {
    return axiosInstance.post('/auth/login', { email, password })
  },

  register: (userData) => {
    return axiosInstance.post('/auth/register', userData)
  },

  logout: () => {
    return axiosInstance.post('/auth/logout')
  },

  getMe: () => {
    return axiosInstance.get('/auth/me')
  },

  forgotPassword: (email) => {
    return axiosInstance.post('/auth/forgot-password', { email })
  },

  resetPassword: (token, password, confirmPassword) => {
    return axiosInstance.post('/auth/reset-password', {
      token,
      password,
      confirmPassword,
    })
  },

  verifyEmail: (token) => {
    return axiosInstance.get(`/auth/verify-email/${token}`)
  },

  refreshToken: (refreshToken) => {
    return axiosInstance.post('/auth/refresh-token', { refreshToken })
  },
}


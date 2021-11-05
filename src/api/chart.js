import { axiosInstance } from './axiosConfiguration'
export const getPriceForChart = (token) => axiosInstance.get(`/${token}`)
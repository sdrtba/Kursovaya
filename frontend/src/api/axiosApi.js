import axios from 'axios'

export const api = axios.create({
  baseURL: 'http://213.108.23.238/api',
  headers: {
    'Content-Type': "application/json",
  },
})
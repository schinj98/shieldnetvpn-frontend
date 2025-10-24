import axios from 'axios'

const API_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:8080/api'

export interface VpnRequest {
  name: string
  email: string
}

export interface VpnResponse {
  message: string
  configContent: string
  clientId: string
}

const api = axios.create({
  baseURL: API_URL,
  headers: {
    'Content-Type': 'application/json',
  },
  timeout: 30000,
})

export const vpnApi = {
  generateConfig: async (data: VpnRequest): Promise<VpnResponse> => {
    const response = await api.post<VpnResponse>('/vpn/generate', data)
    return response.data
  },

  downloadConfig: async (data: VpnRequest): Promise<Blob> => {
    const response = await api.post('/vpn/download', data, {
      responseType: 'blob',
    })
    return response.data
  },

  checkHealth: async (): Promise<string> => {
    const response = await api.get<string>('/vpn/health')
    return response.data
  },
}

export default api
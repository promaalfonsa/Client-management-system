import axios from 'axios';
import { Client, Device, Technician, Invoice, SMSUpdate, Stats } from '@/types';

const API_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:8000';

const api = axios.create({
  baseURL: API_URL,
});

// Client API
export const clientApi = {
  getAll: () => api.get<Client[]>('/api/clients'),
  getById: (id: string) => api.get<Client>(`/api/clients/${id}`),
  create: (client: Client) => api.post<Client>('/api/clients', client),
  update: (id: string, client: Client) => api.put<Client>(`/api/clients/${id}`, client),
  delete: (id: string) => api.delete(`/api/clients/${id}`),
};

// Device API
export const deviceApi = {
  getAll: () => api.get<Device[]>('/api/devices'),
  getById: (id: string) => api.get<Device>(`/api/devices/${id}`),
  create: (device: Device) => api.post<Device>('/api/devices', device),
  update: (id: string, device: Device) => api.put<Device>(`/api/devices/${id}`, device),
  delete: (id: string) => api.delete(`/api/devices/${id}`),
};

// Technician API
export const technicianApi = {
  getAll: () => api.get<Technician[]>('/api/technicians'),
  getById: (id: string) => api.get<Technician>(`/api/technicians/${id}`),
  create: (technician: Technician) => api.post<Technician>('/api/technicians', technician),
  update: (id: string, technician: Technician) => api.put<Technician>(`/api/technicians/${id}`, technician),
  delete: (id: string) => api.delete(`/api/technicians/${id}`),
};

// Invoice API
export const invoiceApi = {
  getAll: () => api.get<Invoice[]>('/api/invoices'),
  getById: (id: string) => api.get<Invoice>(`/api/invoices/${id}`),
  create: (invoice: Invoice) => api.post<Invoice>('/api/invoices', invoice),
  update: (id: string, invoice: Invoice) => api.put<Invoice>(`/api/invoices/${id}`, invoice),
  downloadPDF: (id: string) => {
    window.open(`${API_URL}/api/invoices/${id}/pdf`, '_blank');
  },
};

// SMS API
export const smsApi = {
  send: (sms: SMSUpdate) => api.post('/api/sms/send', sms),
  getLogs: () => api.get<SMSUpdate[]>('/api/sms/logs'),
};

// Stats API
export const statsApi = {
  get: () => api.get<Stats>('/api/stats'),
};

export default api;

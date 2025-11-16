export interface Client {
  id: string;
  name: string;
  email: string;
  phone: string;
  address: string;
  company?: string;
  created_at: string;
}

export interface Device {
  id: string;
  client_id: string;
  device_type: string;
  brand: string;
  model: string;
  serial_number?: string;
  issue_description: string;
  status: 'pending' | 'in_progress' | 'completed' | 'delivered';
  priority: 'low' | 'medium' | 'high' | 'urgent';
  technician_id?: string;
  intake_date: string;
  estimated_completion?: string;
  actual_completion?: string;
  repair_notes?: string;
  cost?: number;
}

export interface Technician {
  id: string;
  name: string;
  email: string;
  phone: string;
  specialization: string;
  active: boolean;
  created_at: string;
}

export interface Invoice {
  id: string;
  device_id: string;
  client_id: string;
  amount: number;
  description: string;
  created_at: string;
  paid: boolean;
}

export interface SMSUpdate {
  device_id: string;
  client_id: string;
  message: string;
  sent_at: string;
}

export interface Stats {
  total_clients: number;
  total_devices: number;
  total_technicians: number;
  total_invoices: number;
  pending_devices: number;
  in_progress_devices: number;
  completed_devices: number;
  total_revenue: number;
  pending_revenue: number;
}

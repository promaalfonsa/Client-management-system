import { NextResponse } from 'next/server';
import { loadData } from '@/lib/db';
import { initializeSampleData } from '@/lib/init-data';
import type { Client, Device, Technician, Invoice } from '@/types';

export async function GET() {
  try {
    // Initialize sample data if needed
    initializeSampleData();
    
    const clients = loadData<Client>('clients.json');
    const devices = loadData<Device>('devices.json');
    const technicians = loadData<Technician>('technicians.json');
    const invoices = loadData<Invoice>('invoices.json');
    
    const pendingDevices = devices.filter(d => d.status === 'pending').length;
    const inProgressDevices = devices.filter(d => d.status === 'in_progress').length;
    const completedDevices = devices.filter(d => d.status === 'completed').length;
    
    const totalRevenue = invoices.filter(inv => inv.paid).reduce((sum, inv) => sum + inv.amount, 0);
    const pendingRevenue = invoices.filter(inv => !inv.paid).reduce((sum, inv) => sum + inv.amount, 0);
    
    return NextResponse.json({
      total_clients: clients.length,
      total_devices: devices.length,
      total_technicians: technicians.length,
      total_invoices: invoices.length,
      pending_devices: pendingDevices,
      in_progress_devices: inProgressDevices,
      completed_devices: completedDevices,
      total_revenue: totalRevenue,
      pending_revenue: pendingRevenue,
    });
  } catch (error) {
    console.error('Error loading stats:', error);
    return NextResponse.json({ error: 'Failed to load stats' }, { status: 500 });
  }
}

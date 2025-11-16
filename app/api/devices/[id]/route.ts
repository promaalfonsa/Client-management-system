import { NextRequest, NextResponse } from 'next/server';
import { loadData, saveData, findById, updateById, deleteById } from '@/lib/db';
import type { Device } from '@/types';

export async function GET(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params;
    const devices = loadData<Device>('devices.json');
    const device = findById(devices, id);
    
    if (!device) {
      return NextResponse.json({ error: 'Device not found' }, { status: 404 });
    }
    
    return NextResponse.json(device);
  } catch (error) {
    console.error('Error loading device:', error);
    return NextResponse.json({ error: 'Failed to load device' }, { status: 500 });
  }
}

export async function PUT(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params;
    const updatedDevice: Device = await request.json();
    const devices = loadData<Device>('devices.json');
    const updated = updateById(devices, id, updatedDevice);
    saveData('devices.json', updated);
    return NextResponse.json(updatedDevice);
  } catch (error) {
    console.error('Error updating device:', error);
    return NextResponse.json({ error: 'Failed to update device' }, { status: 500 });
  }
}

export async function DELETE(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params;
    const devices = loadData<Device>('devices.json');
    const updated = deleteById(devices, id);
    saveData('devices.json', updated);
    return NextResponse.json({ message: 'Device deleted successfully' });
  } catch (error) {
    console.error('Error deleting device:', error);
    return NextResponse.json({ error: 'Failed to delete device' }, { status: 500 });
  }
}

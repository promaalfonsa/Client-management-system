import { NextRequest, NextResponse } from 'next/server';
import { loadData, saveData } from '@/lib/db';
import type { Device } from '@/types';

export async function GET() {
  try {
    const devices = loadData<Device>('devices.json');
    return NextResponse.json(devices);
  } catch (error) {
    console.error('Error loading devices:', error);
    return NextResponse.json({ error: 'Failed to load devices' }, { status: 500 });
  }
}

export async function POST(request: NextRequest) {
  try {
    const device: Device = await request.json();
    const devices = loadData<Device>('devices.json');
    devices.push(device);
    saveData('devices.json', devices);
    return NextResponse.json(device, { status: 201 });
  } catch (error) {
    console.error('Error creating device:', error);
    return NextResponse.json({ error: 'Failed to create device' }, { status: 500 });
  }
}

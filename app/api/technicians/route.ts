import { NextRequest, NextResponse } from 'next/server';
import { loadData, saveData } from '@/lib/db';
import type { Technician } from '@/types';

export async function GET() {
  try {
    const technicians = loadData<Technician>('technicians.json');
    return NextResponse.json(technicians);
  } catch (error) {
    console.error('Error loading technicians:', error);
    return NextResponse.json({ error: 'Failed to load technicians' }, { status: 500 });
  }
}

export async function POST(request: NextRequest) {
  try {
    const technician: Technician = await request.json();
    const technicians = loadData<Technician>('technicians.json');
    technicians.push(technician);
    saveData('technicians.json', technicians);
    return NextResponse.json(technician, { status: 201 });
  } catch (error) {
    console.error('Error creating technician:', error);
    return NextResponse.json({ error: 'Failed to create technician' }, { status: 500 });
  }
}

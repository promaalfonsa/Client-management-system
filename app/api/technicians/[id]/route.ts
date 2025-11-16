import { NextRequest, NextResponse } from 'next/server';
import { loadData, saveData, findById, updateById, deleteById } from '@/lib/db';
import type { Technician } from '@/types';

export async function GET(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params;
    const technicians = loadData<Technician>('technicians.json');
    const technician = findById(technicians, id);
    
    if (!technician) {
      return NextResponse.json({ error: 'Technician not found' }, { status: 404 });
    }
    
    return NextResponse.json(technician);
  } catch (error) {
    console.error('Error loading technician:', error);
    return NextResponse.json({ error: 'Failed to load technician' }, { status: 500 });
  }
}

export async function PUT(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params;
    const updatedTechnician: Technician = await request.json();
    const technicians = loadData<Technician>('technicians.json');
    const updated = updateById(technicians, id, updatedTechnician);
    saveData('technicians.json', updated);
    return NextResponse.json(updatedTechnician);
  } catch (error) {
    console.error('Error updating technician:', error);
    return NextResponse.json({ error: 'Failed to update technician' }, { status: 500 });
  }
}

export async function DELETE(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params;
    const technicians = loadData<Technician>('technicians.json');
    const updated = deleteById(technicians, id);
    saveData('technicians.json', updated);
    return NextResponse.json({ message: 'Technician deleted successfully' });
  } catch (error) {
    console.error('Error deleting technician:', error);
    return NextResponse.json({ error: 'Failed to delete technician' }, { status: 500 });
  }
}

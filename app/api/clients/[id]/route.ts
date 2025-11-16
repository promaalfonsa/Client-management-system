import { NextRequest, NextResponse } from 'next/server';
import { loadData, saveData, findById, updateById, deleteById } from '@/lib/db';
import type { Client } from '@/types';

export async function GET(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params;
    const clients = loadData<Client>('clients.json');
    const client = findById(clients, id);
    
    if (!client) {
      return NextResponse.json({ error: 'Client not found' }, { status: 404 });
    }
    
    return NextResponse.json(client);
  } catch (error) {
    console.error('Error loading client:', error);
    return NextResponse.json({ error: 'Failed to load client' }, { status: 500 });
  }
}

export async function PUT(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params;
    const updatedClient: Client = await request.json();
    const clients = loadData<Client>('clients.json');
    const updated = updateById(clients, id, updatedClient);
    saveData('clients.json', updated);
    return NextResponse.json(updatedClient);
  } catch (error) {
    console.error('Error updating client:', error);
    return NextResponse.json({ error: 'Failed to update client' }, { status: 500 });
  }
}

export async function DELETE(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params;
    const clients = loadData<Client>('clients.json');
    const updated = deleteById(clients, id);
    saveData('clients.json', updated);
    return NextResponse.json({ message: 'Client deleted successfully' });
  } catch (error) {
    console.error('Error deleting client:', error);
    return NextResponse.json({ error: 'Failed to delete client' }, { status: 500 });
  }
}

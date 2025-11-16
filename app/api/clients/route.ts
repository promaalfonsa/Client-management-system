import { NextRequest, NextResponse } from 'next/server';
import { loadData, saveData } from '@/lib/db';
import type { Client } from '@/types';

export async function GET() {
  try {
    const clients = loadData<Client>('clients.json');
    return NextResponse.json(clients);
  } catch (error) {
    console.error('Error loading clients:', error);
    return NextResponse.json({ error: 'Failed to load clients' }, { status: 500 });
  }
}

export async function POST(request: NextRequest) {
  try {
    const client: Client = await request.json();
    const clients = loadData<Client>('clients.json');
    clients.push(client);
    saveData('clients.json', clients);
    return NextResponse.json(client, { status: 201 });
  } catch (error) {
    console.error('Error creating client:', error);
    return NextResponse.json({ error: 'Failed to create client' }, { status: 500 });
  }
}

import { NextRequest, NextResponse } from 'next/server';
import { loadData, saveData } from '@/lib/db';
import type { Invoice } from '@/types';

export async function GET() {
  try {
    const invoices = loadData<Invoice>('invoices.json');
    return NextResponse.json(invoices);
  } catch (error) {
    console.error('Error loading invoices:', error);
    return NextResponse.json({ error: 'Failed to load invoices' }, { status: 500 });
  }
}

export async function POST(request: NextRequest) {
  try {
    const invoice: Invoice = await request.json();
    const invoices = loadData<Invoice>('invoices.json');
    invoices.push(invoice);
    saveData('invoices.json', invoices);
    return NextResponse.json(invoice, { status: 201 });
  } catch (error) {
    console.error('Error creating invoice:', error);
    return NextResponse.json({ error: 'Failed to create invoice' }, { status: 500 });
  }
}

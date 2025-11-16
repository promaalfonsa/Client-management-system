import { NextRequest, NextResponse } from 'next/server';
import { loadData, saveData, findById, updateById } from '@/lib/db';
import type { Invoice } from '@/types';

export async function GET(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params;
    const invoices = loadData<Invoice>('invoices.json');
    const invoice = findById(invoices, id);
    
    if (!invoice) {
      return NextResponse.json({ error: 'Invoice not found' }, { status: 404 });
    }
    
    return NextResponse.json(invoice);
  } catch (error) {
    console.error('Error loading invoice:', error);
    return NextResponse.json({ error: 'Failed to load invoice' }, { status: 500 });
  }
}

export async function PUT(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params;
    const updatedInvoice: Invoice = await request.json();
    const invoices = loadData<Invoice>('invoices.json');
    const updated = updateById(invoices, id, updatedInvoice);
    saveData('invoices.json', updated);
    return NextResponse.json(updatedInvoice);
  } catch (error) {
    console.error('Error updating invoice:', error);
    return NextResponse.json({ error: 'Failed to update invoice' }, { status: 500 });
  }
}

import { NextRequest, NextResponse } from 'next/server';
import { loadData, findById } from '@/lib/db';
import type { Invoice, Device, Client } from '@/types';
import jsPDF from 'jspdf';
import autoTable from 'jspdf-autotable';

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
    
    const devices = loadData<Device>('devices.json');
    const clients = loadData<Client>('clients.json');
    
    const device = findById(devices, invoice.device_id);
    const client = findById(clients, invoice.client_id);
    
    if (!device || !client) {
      return NextResponse.json({ error: 'Related data not found' }, { status: 404 });
    }
    
    // Create PDF using jsPDF
    const doc = new jsPDF();
    
    // Set font
    doc.setFontSize(24);
    doc.setFont('helvetica', 'bold');
    doc.text('INVOICE', 105, 20, { align: 'center' });
    
    // Company info
    doc.setFontSize(10);
    doc.setFont('helvetica', 'normal');
    doc.text('Tech Service Company', 20, 40);
    doc.text('123 Service Street', 20, 45);
    doc.text('Tech City, TC 12345', 20, 50);
    doc.text('Phone: (555) 123-4567', 20, 55);
    
    // Client info
    doc.setFont('helvetica', 'bold');
    doc.text('Bill To:', 20, 70);
    doc.setFont('helvetica', 'normal');
    doc.text(client.name, 20, 75);
    if (client.company) doc.text(client.company, 20, 80);
    doc.text(client.address, 20, client.company ? 85 : 80);
    doc.text(`Phone: ${client.phone}`, 20, client.company ? 90 : 85);
    doc.text(`Email: ${client.email}`, 20, client.company ? 95 : 90);
    
    // Invoice details
    const startY = client.company ? 110 : 105;
    doc.setFont('helvetica', 'bold');
    doc.text('Invoice ID:', 20, startY);
    doc.setFont('helvetica', 'normal');
    doc.text(invoice.id, 60, startY);
    
    doc.setFont('helvetica', 'bold');
    doc.text('Date:', 20, startY + 5);
    doc.setFont('helvetica', 'normal');
    doc.text(invoice.created_at.substring(0, 10), 60, startY + 5);
    
    doc.setFont('helvetica', 'bold');
    doc.text('Device:', 20, startY + 10);
    doc.setFont('helvetica', 'normal');
    doc.text(`${device.brand} ${device.model}`, 60, startY + 10);
    
    if (device.serial_number) {
      doc.setFont('helvetica', 'bold');
      doc.text('Serial Number:', 20, startY + 15);
      doc.setFont('helvetica', 'normal');
      doc.text(device.serial_number, 60, startY + 15);
    }
    
    // Service table
    autoTable(doc, {
      startY: startY + 25,
      head: [['Description', 'Amount']],
      body: [
        [invoice.description, `$${invoice.amount.toFixed(2)}`],
      ],
      foot: [['Total:', `$${invoice.amount.toFixed(2)}`]],
      theme: 'grid',
      headStyles: { fillColor: [229, 231, 235], textColor: [0, 0, 0], fontStyle: 'bold' },
      footStyles: { fillColor: [255, 255, 255], textColor: [0, 0, 0], fontStyle: 'bold', fontSize: 12 },
      columnStyles: {
        1: { halign: 'right' }
      }
    });
    
    // Generate PDF buffer
    const pdfBuffer = Buffer.from(doc.output('arraybuffer'));
    
    return new NextResponse(pdfBuffer, {
      headers: {
        'Content-Type': 'application/pdf',
        'Content-Disposition': `attachment; filename="invoice_${id}.pdf"`,
      },
    });
  } catch (error) {
    console.error('Error generating PDF:', error);
    return NextResponse.json({ error: 'Failed to generate PDF' }, { status: 500 });
  }
}

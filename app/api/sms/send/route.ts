import { NextRequest, NextResponse } from 'next/server';
import { loadData, saveData } from '@/lib/db';
import type { SMSUpdate } from '@/types';

export async function POST(request: NextRequest) {
  try {
    const sms: SMSUpdate = await request.json();
    const smsLogs = loadData<SMSUpdate>('sms_logs.json');
    smsLogs.push(sms);
    saveData('sms_logs.json', smsLogs);
    return NextResponse.json({ message: 'SMS sent successfully', data: sms }, { status: 201 });
  } catch (error) {
    console.error('Error sending SMS:', error);
    return NextResponse.json({ error: 'Failed to send SMS' }, { status: 500 });
  }
}

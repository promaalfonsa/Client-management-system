import { NextResponse } from 'next/server';
import { loadData } from '@/lib/db';
import type { SMSUpdate } from '@/types';

export async function GET() {
  try {
    const smsLogs = loadData<SMSUpdate>('sms_logs.json');
    return NextResponse.json(smsLogs);
  } catch (error) {
    console.error('Error loading SMS logs:', error);
    return NextResponse.json({ error: 'Failed to load SMS logs' }, { status: 500 });
  }
}

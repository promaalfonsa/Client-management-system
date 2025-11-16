'use client';

import React, { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import { Send, MessageSquare } from 'lucide-react';
import { DashboardLayout } from '@/components/dashboard/DashboardLayout';
import { Card, CardHeader, CardTitle, CardContent } from '@/components/ui/Card';
import { Button } from '@/components/ui/Button';
import { TextArea, Select } from '@/components/ui/Input';
import { LoadingSpinner } from '@/components/ui/Loading';
import { smsApi, deviceApi, clientApi } from '@/lib/api';
import { formatDateTime } from '@/lib/utils';
import type { SMSUpdate, Device, Client } from '@/types';

export default function SMSPage() {
  const [smsLogs, setSmsLogs] = useState<SMSUpdate[]>([]);
  const [devices, setDevices] = useState<Device[]>([]);
  const [clients, setClients] = useState<Client[]>([]);
  const [loading, setLoading] = useState(true);
  const [sending, setSending] = useState(false);
  const [selectedDevice, setSelectedDevice] = useState('');
  const [message, setMessage] = useState('');

  useEffect(() => {
    loadData();
  }, []);

  const loadData = async () => {
    try {
      const [logsRes, devicesRes, clientsRes] = await Promise.all([
        smsApi.getLogs(),
        deviceApi.getAll(),
        clientApi.getAll(),
      ]);
      setSmsLogs(logsRes.data.reverse());
      setDevices(devicesRes.data);
      setClients(clientsRes.data);
    } catch (error) {
      console.error('Failed to load data:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleSendSMS = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!selectedDevice || !message) return;

    const device = devices.find((d) => d.id === selectedDevice);
    if (!device) return;

    setSending(true);
    try {
      const smsUpdate: SMSUpdate = {
        device_id: device.id,
        client_id: device.client_id,
        message,
        sent_at: new Date().toISOString(),
      };
      await smsApi.send(smsUpdate);
      loadData();
      setMessage('');
      setSelectedDevice('');
    } catch (error) {
      console.error('Failed to send SMS:', error);
    } finally {
      setSending(false);
    }
  };

  const getClientName = (clientId: string) => {
    const client = clients.find((c) => c.id === clientId);
    return client?.name || 'Unknown';
  };

  const getDeviceInfo = (deviceId: string) => {
    const device = devices.find((d) => d.id === deviceId);
    return device ? `${device.brand} ${device.model}` : 'Unknown Device';
  };

  const getClientPhone = (clientId: string) => {
    const client = clients.find((c) => c.id === clientId);
    return client?.phone || 'Unknown';
  };

  const handleDeviceChange = (deviceId: string) => {
    setSelectedDevice(deviceId);
    const device = devices.find((d) => d.id === deviceId);
    if (device) {
      // Pre-fill with a template message
      const templates = {
        pending: `Your device ${device.brand} ${device.model} has been received. We'll update you on the progress soon.`,
        in_progress: `Update: Your ${device.brand} ${device.model} repair is in progress. We're working on: ${device.issue_description}`,
        completed: `Good news! Your ${device.brand} ${device.model} has been repaired and is ready for pickup. Total: $${device.cost?.toFixed(2) || '0.00'}`,
        delivered: `Thank you for choosing our service! Your ${device.brand} ${device.model} has been delivered.`,
      };
      setMessage(templates[device.status] || '');
    }
  };

  if (loading) {
    return (
      <DashboardLayout>
        <LoadingSpinner />
      </DashboardLayout>
    );
  }

  return (
    <DashboardLayout>
      <div className="space-y-6">
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
        >
          <h1 className="text-3xl font-bold text-gray-900">SMS Updates</h1>
          <p className="text-gray-600 mt-1">Send updates to clients about their devices</p>
        </motion.div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {/* Send SMS Form */}
          <Card>
            <CardHeader>
              <CardTitle>Send SMS Update</CardTitle>
            </CardHeader>
            <CardContent>
              <form onSubmit={handleSendSMS} className="space-y-4">
                <Select
                  label="Select Device"
                  value={selectedDevice}
                  onChange={(e) => handleDeviceChange(e.target.value)}
                  required
                >
                  <option value="">Choose a device...</option>
                  {devices.map((device) => (
                    <option key={device.id} value={device.id}>
                      {device.brand} {device.model} - {getClientName(device.client_id)} ({device.status})
                    </option>
                  ))}
                </Select>

                {selectedDevice && (
                  <div className="p-4 bg-blue-50 rounded-lg border border-blue-200">
                    <p className="text-sm text-blue-900">
                      <strong>Client:</strong> {getClientName(devices.find((d) => d.id === selectedDevice)?.client_id || '')}
                    </p>
                    <p className="text-sm text-blue-900">
                      <strong>Phone:</strong> {getClientPhone(devices.find((d) => d.id === selectedDevice)?.client_id || '')}
                    </p>
                  </div>
                )}

                <TextArea
                  label="Message"
                  value={message}
                  onChange={(e) => setMessage(e.target.value)}
                  rows={6}
                  placeholder="Enter your message here..."
                  required
                />

                <div className="flex items-center justify-between text-sm text-gray-600">
                  <span>{message.length} characters</span>
                  <span>{Math.ceil(message.length / 160)} SMS</span>
                </div>

                <Button type="submit" disabled={sending} className="w-full">
                  {sending ? (
                    <>Sending...</>
                  ) : (
                    <>
                      <Send className="w-4 h-4 mr-2" />
                      Send SMS Update
                    </>
                  )}
                </Button>
              </form>
            </CardContent>
          </Card>

          {/* SMS History */}
          <Card>
            <CardHeader>
              <CardTitle>SMS History</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4 max-h-[600px] overflow-y-auto">
                {smsLogs.length === 0 ? (
                  <div className="text-center py-8 text-gray-500">
                    <MessageSquare className="w-12 h-12 mx-auto mb-2 text-gray-300" />
                    <p>No SMS sent yet</p>
                  </div>
                ) : (
                  smsLogs.map((log, index) => (
                    <motion.div
                      key={index}
                      initial={{ opacity: 0, x: -20 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: index * 0.05 }}
                      className="p-4 bg-gray-50 rounded-lg border border-gray-200"
                    >
                      <div className="flex items-start justify-between mb-2">
                        <div>
                          <p className="font-medium text-gray-900">
                            {getClientName(log.client_id)}
                          </p>
                          <p className="text-sm text-gray-600">
                            {getDeviceInfo(log.device_id)}
                          </p>
                        </div>
                        <p className="text-xs text-gray-500">
                          {formatDateTime(log.sent_at)}
                        </p>
                      </div>
                      <div className="p-3 bg-white rounded border border-gray-200">
                        <p className="text-sm text-gray-700">{log.message}</p>
                      </div>
                    </motion.div>
                  ))
                )}
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </DashboardLayout>
  );
}

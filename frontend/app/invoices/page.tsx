'use client';

import React, { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import { Plus, Download, FileText, CheckCircle, XCircle } from 'lucide-react';
import { DashboardLayout } from '@/components/dashboard/DashboardLayout';
import { Card, CardContent } from '@/components/ui/Card';
import { Button } from '@/components/ui/Button';
import { Modal } from '@/components/ui/Modal';
import { Input, TextArea, Select } from '@/components/ui/Input';
import { LoadingSpinner } from '@/components/ui/Loading';
import { Badge } from '@/components/ui/Badge';
import { invoiceApi, deviceApi, clientApi } from '@/lib/api';
import { formatDate, formatCurrency, generateId } from '@/lib/utils';
import type { Invoice, Device, Client } from '@/types';

export default function InvoicesPage() {
  const [invoices, setInvoices] = useState<Invoice[]>([]);
  const [devices, setDevices] = useState<Device[]>([]);
  const [clients, setClients] = useState<Client[]>([]);
  const [loading, setLoading] = useState(true);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [formData, setFormData] = useState<Partial<Invoice>>({
    device_id: '',
    client_id: '',
    amount: 0,
    description: '',
    paid: false,
  });

  useEffect(() => {
    loadData();
  }, []);

  const loadData = async () => {
    try {
      const [invoicesRes, devicesRes, clientsRes] = await Promise.all([
        invoiceApi.getAll(),
        deviceApi.getAll(),
        clientApi.getAll(),
      ]);
      setInvoices(invoicesRes.data);
      setDevices(devicesRes.data);
      setClients(clientsRes.data);
    } catch (error) {
      console.error('Failed to load data:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const newInvoice: Invoice = {
        id: generateId('inv'),
        ...formData as Omit<Invoice, 'id' | 'created_at'>,
        created_at: new Date().toISOString(),
      };
      await invoiceApi.create(newInvoice);
      loadData();
      closeModal();
    } catch (error) {
      console.error('Failed to create invoice:', error);
    }
  };

  const handleTogglePaid = async (invoice: Invoice) => {
    try {
      await invoiceApi.update(invoice.id, { ...invoice, paid: !invoice.paid });
      loadData();
    } catch (error) {
      console.error('Failed to update invoice:', error);
    }
  };

  const handleDownloadPDF = (invoiceId: string) => {
    invoiceApi.downloadPDF(invoiceId);
  };

  const openModal = () => {
    setFormData({
      device_id: '',
      client_id: '',
      amount: 0,
      description: '',
      paid: false,
    });
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
  };

  const getClientName = (clientId: string) => {
    const client = clients.find((c) => c.id === clientId);
    return client?.name || 'Unknown';
  };

  const getDeviceInfo = (deviceId: string) => {
    const device = devices.find((d) => d.id === deviceId);
    return device ? `${device.brand} ${device.model}` : 'Unknown Device';
  };

  const handleDeviceChange = (deviceId: string) => {
    const device = devices.find((d) => d.id === deviceId);
    if (device) {
      setFormData({
        ...formData,
        device_id: deviceId,
        client_id: device.client_id,
        amount: device.cost || 0,
        description: `${device.device_type} repair - ${device.brand} ${device.model}`,
      });
    }
  };

  if (loading) {
    return (
      <DashboardLayout>
        <LoadingSpinner />
      </DashboardLayout>
    );
  }

  const totalRevenue = invoices.filter((inv) => inv.paid).reduce((sum, inv) => sum + inv.amount, 0);
  const pendingRevenue = invoices.filter((inv) => !inv.paid).reduce((sum, inv) => sum + inv.amount, 0);

  return (
    <DashboardLayout>
      <div className="space-y-6">
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          className="flex items-center justify-between"
        >
          <div>
            <h1 className="text-3xl font-bold text-gray-900">Invoices</h1>
            <p className="text-gray-600 mt-1">Manage billing and payments</p>
          </div>
          <Button onClick={openModal}>
            <Plus className="w-4 h-4 mr-2" />
            Create Invoice
          </Button>
        </motion.div>

        {/* Revenue Stats */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <Card>
            <CardContent>
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-gray-600">Total Revenue</p>
                  <p className="text-3xl font-bold text-green-600 mt-1">
                    {formatCurrency(totalRevenue)}
                  </p>
                </div>
                <div className="bg-green-100 p-3 rounded-lg">
                  <CheckCircle className="w-8 h-8 text-green-600" />
                </div>
              </div>
            </CardContent>
          </Card>
          <Card>
            <CardContent>
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-gray-600">Pending Revenue</p>
                  <p className="text-3xl font-bold text-orange-600 mt-1">
                    {formatCurrency(pendingRevenue)}
                  </p>
                </div>
                <div className="bg-orange-100 p-3 rounded-lg">
                  <XCircle className="w-8 h-8 text-orange-600" />
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Invoices List */}
        <Card>
          <CardContent>
            <div className="space-y-4">
              {invoices.map((invoice, index) => (
                <motion.div
                  key={invoice.id}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: index * 0.05 }}
                  className="flex items-center justify-between p-4 bg-gray-50 rounded-lg hover:bg-gray-100 transition-colors"
                >
                  <div className="flex items-center space-x-4 flex-1">
                    <div className="bg-blue-100 p-3 rounded-lg">
                      <FileText className="w-6 h-6 text-blue-600" />
                    </div>
                    <div className="flex-1">
                      <div className="flex items-center space-x-3">
                        <h3 className="font-semibold text-gray-900">{invoice.id}</h3>
                        <Badge variant={invoice.paid ? 'success' : 'warning'}>
                          {invoice.paid ? 'Paid' : 'Unpaid'}
                        </Badge>
                      </div>
                      <p className="text-sm text-gray-600 mt-1">{invoice.description}</p>
                      <div className="flex items-center space-x-4 mt-2 text-xs text-gray-500">
                        <span>Client: {getClientName(invoice.client_id)}</span>
                        <span>Device: {getDeviceInfo(invoice.device_id)}</span>
                        <span>{formatDate(invoice.created_at)}</span>
                      </div>
                    </div>
                    <div className="text-right">
                      <p className="text-2xl font-bold text-gray-900">
                        {formatCurrency(invoice.amount)}
                      </p>
                    </div>
                  </div>
                  <div className="flex items-center space-x-2 ml-4">
                    <Button
                      size="sm"
                      variant={invoice.paid ? 'secondary' : 'primary'}
                      onClick={() => handleTogglePaid(invoice)}
                    >
                      {invoice.paid ? 'Mark Unpaid' : 'Mark Paid'}
                    </Button>
                    <Button
                      size="sm"
                      variant="ghost"
                      onClick={() => handleDownloadPDF(invoice.id)}
                    >
                      <Download className="w-4 h-4" />
                    </Button>
                  </div>
                </motion.div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>

      <Modal
        isOpen={isModalOpen}
        onClose={closeModal}
        title="Create New Invoice"
        size="lg"
      >
        <form onSubmit={handleSubmit} className="space-y-4">
          <Select
            label="Device"
            value={formData.device_id}
            onChange={(e) => handleDeviceChange(e.target.value)}
            required
          >
            <option value="">Select a device</option>
            {devices.map((device) => (
              <option key={device.id} value={device.id}>
                {device.brand} {device.model} - {getClientName(device.client_id)}
              </option>
            ))}
          </Select>
          <Input
            label="Amount"
            type="number"
            step="0.01"
            value={formData.amount}
            onChange={(e) => setFormData({ ...formData, amount: parseFloat(e.target.value) })}
            required
          />
          <TextArea
            label="Description"
            value={formData.description}
            onChange={(e) => setFormData({ ...formData, description: e.target.value })}
            rows={4}
            required
          />
          <Select
            label="Payment Status"
            value={formData.paid ? 'true' : 'false'}
            onChange={(e) => setFormData({ ...formData, paid: e.target.value === 'true' })}
            required
          >
            <option value="false">Unpaid</option>
            <option value="true">Paid</option>
          </Select>
          <div className="flex justify-end space-x-3 pt-4">
            <Button type="button" variant="secondary" onClick={closeModal}>
              Cancel
            </Button>
            <Button type="submit">Create Invoice</Button>
          </div>
        </form>
      </Modal>
    </DashboardLayout>
  );
}

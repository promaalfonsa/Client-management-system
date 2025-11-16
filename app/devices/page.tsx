'use client';

import React, { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import { Plus, Edit, Trash2, User } from 'lucide-react';
import { DashboardLayout } from '@/components/dashboard/DashboardLayout';
import { Card, CardContent } from '@/components/ui/Card';
import { Button } from '@/components/ui/Button';
import { Modal } from '@/components/ui/Modal';
import { Input, TextArea, Select } from '@/components/ui/Input';
import { LoadingSpinner } from '@/components/ui/Loading';
import { deviceApi, clientApi, technicianApi } from '@/lib/api';
import { formatDate, generateId, getStatusColor, getPriorityColor } from '@/lib/utils';
import type { Device, Client, Technician } from '@/types';

export default function DevicesPage() {
  const [devices, setDevices] = useState<Device[]>([]);
  const [clients, setClients] = useState<Client[]>([]);
  const [technicians, setTechnicians] = useState<Technician[]>([]);
  const [loading, setLoading] = useState(true);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingDevice, setEditingDevice] = useState<Device | null>(null);
  const [formData, setFormData] = useState<Partial<Device>>({
    client_id: '',
    device_type: '',
    brand: '',
    model: '',
    serial_number: '',
    issue_description: '',
    status: 'pending',
    priority: 'medium',
    technician_id: '',
    repair_notes: '',
    cost: 0,
  });

  useEffect(() => {
    loadData();
  }, []);

  const loadData = async () => {
    try {
      const [devicesRes, clientsRes, techniciansRes] = await Promise.all([
        deviceApi.getAll(),
        clientApi.getAll(),
        technicianApi.getAll(),
      ]);
      setDevices(devicesRes.data);
      setClients(clientsRes.data);
      setTechnicians(techniciansRes.data);
    } catch (error) {
      console.error('Failed to load data:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      if (editingDevice) {
        await deviceApi.update(editingDevice.id, { ...editingDevice, ...formData });
      } else {
        const newDevice: Device = {
          id: generateId('device'),
          ...formData as Omit<Device, 'id' | 'intake_date'>,
          intake_date: new Date().toISOString(),
        };
        await deviceApi.create(newDevice);
      }
      loadData();
      closeModal();
    } catch (error) {
      console.error('Failed to save device:', error);
    }
  };

  const handleDelete = async (id: string) => {
    if (confirm('Are you sure you want to delete this device?')) {
      try {
        await deviceApi.delete(id);
        loadData();
      } catch (error) {
        console.error('Failed to delete device:', error);
      }
    }
  };

  const openModal = (device?: Device) => {
    if (device) {
      setEditingDevice(device);
      setFormData(device);
    } else {
      setEditingDevice(null);
      setFormData({
        client_id: '',
        device_type: '',
        brand: '',
        model: '',
        serial_number: '',
        issue_description: '',
        status: 'pending',
        priority: 'medium',
        technician_id: '',
        repair_notes: '',
        cost: 0,
      });
    }
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
    setEditingDevice(null);
  };

  const getClientName = (clientId: string) => {
    const client = clients.find((c) => c.id === clientId);
    return client?.name || 'Unknown';
  };

  const getTechnicianName = (techId?: string) => {
    if (!techId) return 'Unassigned';
    const tech = technicians.find((t) => t.id === techId);
    return tech?.name || 'Unknown';
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
          className="flex items-center justify-between"
        >
          <div>
            <h1 className="text-3xl font-bold text-gray-900">Devices</h1>
            <p className="text-gray-600 mt-1">Track device repairs and maintenance</p>
          </div>
          <Button onClick={() => openModal()}>
            <Plus className="w-4 h-4 mr-2" />
            Add Device
          </Button>
        </motion.div>

        <div className="grid grid-cols-1 gap-4">
          {devices.map((device, index) => (
            <motion.div
              key={device.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.05 }}
            >
              <Card>
                <CardContent>
                  <div className="flex items-start justify-between">
                    <div className="flex-1">
                      <div className="flex items-center space-x-3 mb-3">
                        <h3 className="text-lg font-semibold text-gray-900">
                          {device.brand} {device.model}
                        </h3>
                        <span className={`px-3 py-1 rounded-full text-xs font-medium border ${getStatusColor(device.status)}`}>
                          {device.status.replace('_', ' ')}
                        </span>
                        <span className={`px-3 py-1 rounded-full text-xs font-medium border ${getPriorityColor(device.priority)}`}>
                          {device.priority}
                        </span>
                      </div>
                      <div className="grid grid-cols-2 gap-4 text-sm">
                        <div>
                          <p className="text-gray-600">Type</p>
                          <p className="font-medium text-gray-900">{device.device_type}</p>
                        </div>
                        <div>
                          <p className="text-gray-600">Client</p>
                          <p className="font-medium text-gray-900">{getClientName(device.client_id)}</p>
                        </div>
                        <div>
                          <p className="text-gray-600">Technician</p>
                          <div className="flex items-center">
                            <User className="w-4 h-4 mr-1 text-gray-500" />
                            <p className="font-medium text-gray-900">{getTechnicianName(device.technician_id)}</p>
                          </div>
                        </div>
                        <div>
                          <p className="text-gray-600">Intake Date</p>
                          <p className="font-medium text-gray-900">{formatDate(device.intake_date)}</p>
                        </div>
                        <div className="col-span-2">
                          <p className="text-gray-600">Issue</p>
                          <p className="font-medium text-gray-900">{device.issue_description}</p>
                        </div>
                        {device.repair_notes && (
                          <div className="col-span-2">
                            <p className="text-gray-600">Repair Notes</p>
                            <p className="font-medium text-gray-900">{device.repair_notes}</p>
                          </div>
                        )}
                        <div>
                          <p className="text-gray-600">Cost</p>
                          <p className="font-medium text-gray-900">${device.cost?.toFixed(2) || '0.00'}</p>
                        </div>
                      </div>
                    </div>
                    <div className="flex space-x-2 ml-4">
                      <Button size="sm" variant="ghost" onClick={() => openModal(device)}>
                        <Edit className="w-4 h-4" />
                      </Button>
                      <Button size="sm" variant="danger" onClick={() => handleDelete(device.id)}>
                        <Trash2 className="w-4 h-4" />
                      </Button>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </motion.div>
          ))}
        </div>
      </div>

      <Modal
        isOpen={isModalOpen}
        onClose={closeModal}
        title={editingDevice ? 'Edit Device' : 'Add New Device'}
        size="xl"
      >
        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="grid grid-cols-2 gap-4">
            <Select
              label="Client"
              value={formData.client_id}
              onChange={(e) => setFormData({ ...formData, client_id: e.target.value })}
              required
            >
              <option value="">Select a client</option>
              {clients.map((client) => (
                <option key={client.id} value={client.id}>
                  {client.name}
                </option>
              ))}
            </Select>
            <Input
              label="Device Type"
              value={formData.device_type}
              onChange={(e) => setFormData({ ...formData, device_type: e.target.value })}
              placeholder="e.g., Laptop, Phone, Tablet"
              required
            />
            <Input
              label="Brand"
              value={formData.brand}
              onChange={(e) => setFormData({ ...formData, brand: e.target.value })}
              required
            />
            <Input
              label="Model"
              value={formData.model}
              onChange={(e) => setFormData({ ...formData, model: e.target.value })}
              required
            />
            <Input
              label="Serial Number (Optional)"
              value={formData.serial_number}
              onChange={(e) => setFormData({ ...formData, serial_number: e.target.value })}
            />
            <Select
              label="Priority"
              value={formData.priority}
              onChange={(e) => setFormData({ ...formData, priority: e.target.value as any })}
              required
            >
              <option value="low">Low</option>
              <option value="medium">Medium</option>
              <option value="high">High</option>
              <option value="urgent">Urgent</option>
            </Select>
            <Select
              label="Status"
              value={formData.status}
              onChange={(e) => setFormData({ ...formData, status: e.target.value as any })}
              required
            >
              <option value="pending">Pending</option>
              <option value="in_progress">In Progress</option>
              <option value="completed">Completed</option>
              <option value="delivered">Delivered</option>
            </Select>
            <Select
              label="Technician"
              value={formData.technician_id}
              onChange={(e) => setFormData({ ...formData, technician_id: e.target.value })}
            >
              <option value="">Unassigned</option>
              {technicians.map((tech) => (
                <option key={tech.id} value={tech.id}>
                  {tech.name} - {tech.specialization}
                </option>
              ))}
            </Select>
            <Input
              label="Cost"
              type="number"
              step="0.01"
              value={formData.cost}
              onChange={(e) => setFormData({ ...formData, cost: parseFloat(e.target.value) })}
            />
          </div>
          <TextArea
            label="Issue Description"
            value={formData.issue_description}
            onChange={(e) => setFormData({ ...formData, issue_description: e.target.value })}
            rows={3}
            required
          />
          <TextArea
            label="Repair Notes (Optional)"
            value={formData.repair_notes}
            onChange={(e) => setFormData({ ...formData, repair_notes: e.target.value })}
            rows={3}
          />
          <div className="flex justify-end space-x-3 pt-4">
            <Button type="button" variant="secondary" onClick={closeModal}>
              Cancel
            </Button>
            <Button type="submit">
              {editingDevice ? 'Update' : 'Create'} Device
            </Button>
          </div>
        </form>
      </Modal>
    </DashboardLayout>
  );
}

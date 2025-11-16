import fs from 'fs';
import path from 'path';

const DATA_DIR = path.join(process.cwd(), 'data');

export function initializeSampleData() {
  // Ensure data directory exists
  if (!fs.existsSync(DATA_DIR)) {
    fs.mkdirSync(DATA_DIR, { recursive: true });
  }

  // Check if data files exist, if not, create them
  const clientsPath = path.join(DATA_DIR, 'clients.json');
  const devicesPath = path.join(DATA_DIR, 'devices.json');
  const techniciansPath = path.join(DATA_DIR, 'technicians.json');
  const invoicesPath = path.join(DATA_DIR, 'invoices.json');
  const smsLogsPath = path.join(DATA_DIR, 'sms_logs.json');

  if (!fs.existsSync(clientsPath)) {
    const clients = [
      {
        id: 'cli_001',
        name: 'Rahman Ahmed',
        email: 'rahman.ahmed@grameen.com.bd',
        phone: '+880 1712-345678',
        address: 'House 25, Road 12, Dhanmondi, Dhaka 1209',
        company: 'Grameen Tech Solutions',
        created_at: new Date().toISOString()
      },
      {
        id: 'cli_002',
        name: 'Fatima Begum',
        email: 'fatima.begum@waltonbd.com',
        phone: '+880 1823-456789',
        address: 'Plot 45, Gulshan Avenue, Gulshan-2, Dhaka 1212',
        company: 'Walton Electronics Ltd',
        created_at: new Date().toISOString()
      },
      {
        id: 'cli_003',
        name: 'Kamal Hossain',
        email: 'kamal.hossain@bdjobs.com',
        phone: '+880 1934-567890',
        address: 'Flat 7C, Sector 10, Uttara, Dhaka 1230',
        company: 'BD Digital Services',
        created_at: new Date().toISOString()
      },
      {
        id: 'cli_004',
        name: 'Nasrin Akter',
        email: 'nasrin.akter@yahoo.com',
        phone: '+880 1645-678901',
        address: '123 Agrabad Access Road, Chittagong 4100',
        company: null,
        created_at: new Date().toISOString()
      },
      {
        id: 'cli_005',
        name: 'Habibur Rahman',
        email: 'habib.rahman@gmail.com',
        phone: '+880 1756-789012',
        address: 'House 89, Road 27, Banani, Dhaka 1213',
        company: null,
        created_at: new Date().toISOString()
      }
    ];
    fs.writeFileSync(clientsPath, JSON.stringify(clients, null, 2));
  }

  if (!fs.existsSync(devicesPath)) {
    const devices = [
      {
        id: 'dev_001',
        client_id: 'cli_001',
        device_type: 'Laptop',
        brand: 'Dell',
        model: 'XPS 15',
        serial_number: 'DL-XPS-2023-001',
        issue_description: 'Screen flickering and battery not charging',
        status: 'in_progress',
        priority: 'high',
        technician_id: 'tech_001',
        intake_date: new Date().toISOString(),
        estimated_completion: null,
        actual_completion: null,
        repair_notes: 'Diagnosing the issue. Screen cable seems loose.',
        cost: 0.0
      },
      {
        id: 'dev_002',
        client_id: 'cli_002',
        device_type: 'Smartphone',
        brand: 'Apple',
        model: 'iPhone 13 Pro',
        serial_number: 'IP13-2023-789',
        issue_description: 'Screen replacement needed',
        status: 'completed',
        priority: 'medium',
        technician_id: 'tech_002',
        intake_date: new Date(Date.now() - 5 * 24 * 60 * 60 * 1000).toISOString(),
        estimated_completion: null,
        actual_completion: new Date(Date.now() - 2 * 24 * 60 * 60 * 1000).toISOString(),
        repair_notes: 'Screen replaced. Device tested and working perfectly.',
        cost: 280.00
      },
      {
        id: 'dev_003',
        client_id: 'cli_003',
        device_type: 'Desktop PC',
        brand: 'Custom Build',
        model: 'Gaming PC',
        serial_number: null,
        issue_description: 'Not booting, suspected motherboard failure',
        status: 'pending',
        priority: 'low',
        technician_id: null,
        intake_date: new Date(Date.now() - 1 * 24 * 60 * 60 * 1000).toISOString(),
        estimated_completion: null,
        actual_completion: null,
        repair_notes: null,
        cost: 0.0
      },
      {
        id: 'dev_004',
        client_id: 'cli_004',
        device_type: 'MacBook',
        brand: 'Apple',
        model: 'MacBook Pro 16"',
        serial_number: 'MBP-2022-456',
        issue_description: 'Keyboard keys not working, trackpad issues',
        status: 'in_progress',
        priority: 'high',
        technician_id: 'tech_003',
        intake_date: new Date(Date.now() - 2 * 24 * 60 * 60 * 1000).toISOString(),
        estimated_completion: new Date(Date.now() + 2 * 24 * 60 * 60 * 1000).toISOString(),
        actual_completion: null,
        repair_notes: 'Ordered replacement keyboard, waiting for parts.',
        cost: 450.00
      },
      {
        id: 'dev_005',
        client_id: 'cli_005',
        device_type: 'Tablet',
        brand: 'Apple',
        model: 'iPad Air 5',
        serial_number: 'IPA5-2023-123',
        issue_description: "Won't charge, stuck on Apple logo",
        status: 'completed',
        priority: 'medium',
        technician_id: 'tech_004',
        intake_date: new Date(Date.now() - 7 * 24 * 60 * 60 * 1000).toISOString(),
        estimated_completion: null,
        actual_completion: new Date(Date.now() - 3 * 24 * 60 * 60 * 1000).toISOString(),
        repair_notes: 'Cleaned charging port, performed software reset. Working normally.',
        cost: 80.00
      },
      {
        id: 'dev_006',
        client_id: 'cli_001',
        device_type: 'Gaming Console',
        brand: 'Sony',
        model: 'PlayStation 5',
        serial_number: 'PS5-2023-567',
        issue_description: 'Disc drive making noise, overheating',
        status: 'pending',
        priority: 'low',
        technician_id: null,
        intake_date: new Date().toISOString(),
        estimated_completion: null,
        actual_completion: null,
        repair_notes: null,
        cost: 0.0
      },
      {
        id: 'dev_007',
        client_id: 'cli_002',
        device_type: 'Tablet',
        brand: 'Samsung',
        model: 'Galaxy Tab S8',
        serial_number: 'SGT-S8-2023-890',
        issue_description: 'Water damage, not powering on',
        status: 'in_progress',
        priority: 'urgent',
        technician_id: 'tech_004',
        intake_date: new Date(Date.now() - 3 * 24 * 60 * 60 * 1000).toISOString(),
        estimated_completion: new Date(Date.now() + 1 * 24 * 60 * 60 * 1000).toISOString(),
        actual_completion: null,
        repair_notes: 'Disassembled, cleaning components. May need motherboard replacement.',
        cost: 200.00
      }
    ];
    fs.writeFileSync(devicesPath, JSON.stringify(devices, null, 2));
  }

  if (!fs.existsSync(techniciansPath)) {
    const technicians = [
      {
        id: 'tech_001',
        name: 'Md. Ashraful Islam',
        email: 'ashraful.islam@techservice.bd',
        phone: '+880 1911-222333',
        specialization: 'Laptop & Desktop Repair',
        active: true,
        created_at: new Date().toISOString()
      },
      {
        id: 'tech_002',
        name: 'Sharmin Sultana',
        email: 'sharmin.sultana@techservice.bd',
        phone: '+880 1822-333444',
        specialization: 'Mobile & Tablet Repair',
        active: true,
        created_at: new Date().toISOString()
      },
      {
        id: 'tech_003',
        name: 'Tanvir Ahmed',
        email: 'tanvir.ahmed@techservice.bd',
        phone: '+880 1733-444555',
        specialization: 'Apple Products Specialist',
        active: true,
        created_at: new Date().toISOString()
      },
      {
        id: 'tech_004',
        name: 'Nusrat Jahan',
        email: 'nusrat.jahan@techservice.bd',
        phone: '+880 1644-555666',
        specialization: 'Data Recovery & Software',
        active: true,
        created_at: new Date().toISOString()
      }
    ];
    fs.writeFileSync(techniciansPath, JSON.stringify(technicians, null, 2));
  }

  if (!fs.existsSync(invoicesPath)) {
    const invoices = [
      {
        id: 'inv_001',
        device_id: 'dev_002',
        client_id: 'cli_002',
        amount: 280.00,
        description: 'iPhone 13 Pro - Screen replacement',
        created_at: new Date(Date.now() - 2 * 24 * 60 * 60 * 1000).toISOString(),
        paid: false
      },
      {
        id: 'inv_002',
        device_id: 'dev_005',
        client_id: 'cli_005',
        amount: 80.00,
        description: 'iPad Air 5 - Charging port cleaning and software reset',
        created_at: new Date(Date.now() - 3 * 24 * 60 * 60 * 1000).toISOString(),
        paid: false
      },
      {
        id: 'inv_003',
        device_id: 'dev_004',
        client_id: 'cli_004',
        amount: 350.00,
        description: 'MacBook Pro 16" - Keyboard and trackpad replacement',
        created_at: new Date(Date.now() - 3 * 24 * 60 * 60 * 1000).toISOString(),
        paid: true
      },
      {
        id: 'inv_004',
        device_id: 'dev_007',
        client_id: 'cli_002',
        amount: 450.00,
        description: 'Samsung Galaxy Tab S8 - Water damage repair and component replacement',
        created_at: new Date(Date.now() - 1 * 24 * 60 * 60 * 1000).toISOString(),
        paid: true
      }
    ];
    fs.writeFileSync(invoicesPath, JSON.stringify(invoices, null, 2));
  }

  if (!fs.existsSync(smsLogsPath)) {
    const smsLogs = [
      {
        device_id: 'dev_002',
        client_id: 'cli_002',
        message: 'Good news! Your iPhone 13 Pro repair is complete! Screen has been replaced. Total: $280.00. Ready for pickup.',
        sent_at: new Date(Date.now() - 2 * 24 * 60 * 60 * 1000).toISOString()
      },
      {
        device_id: 'dev_005',
        client_id: 'cli_005',
        message: 'Your iPad Air 5 has been repaired and is ready for pickup. Total: $80.00. Ready for pickup.',
        sent_at: new Date(Date.now() - 3 * 24 * 60 * 60 * 1000).toISOString()
      },
      {
        device_id: 'dev_001',
        client_id: 'cli_001',
        message: 'Update: Your Dell XPS 15 repair is in progress. We\'ve replaced the screen cable and battery. Estimated completion: 2 days.',
        sent_at: new Date(Date.now() - 1 * 24 * 60 * 60 * 1000).toISOString()
      }
    ];
    fs.writeFileSync(smsLogsPath, JSON.stringify(smsLogs, null, 2));
  }

  console.log('✅ Sample data initialized successfully!');
}

import json
from datetime import datetime, timedelta

# Sample clients - Bangladeshi region
clients = [
    {
        "id": "client_001",
        "name": "Rahman Ahmed",
        "email": "rahman.ahmed@grameen.com.bd",
        "phone": "+880-1712-345678",
        "address": "House 45, Road 12, Dhanmondi, Dhaka-1209",
        "company": "Grameen Tech Solutions",
        "created_at": (datetime.now() - timedelta(days=30)).isoformat()
    },
    {
        "id": "client_002",
        "name": "Fatima Begum",
        "email": "fatima.b@waltonbd.com",
        "phone": "+880-1856-234567",
        "address": "Plot 23, Gulshan Avenue, Gulshan-2, Dhaka-1212",
        "company": "Walton Electronics Ltd",
        "created_at": (datetime.now() - timedelta(days=25)).isoformat()
    },
    {
        "id": "client_003",
        "name": "Kamal Hossain",
        "email": "k.hossain@gmail.com",
        "phone": "+880-1923-456789",
        "address": "Flat 3B, Uttara Apartment, Sector 7, Uttara, Dhaka-1230",
        "company": None,
        "created_at": (datetime.now() - timedelta(days=20)).isoformat()
    },
    {
        "id": "client_004",
        "name": "Nasrin Akter",
        "email": "nasrin.akter@bdjobs.com",
        "phone": "+880-1734-567890",
        "address": "House 78, CDA Avenue, Nasirabad, Chittagong-4220",
        "company": "BD Digital Services",
        "created_at": (datetime.now() - timedelta(days=15)).isoformat()
    },
    {
        "id": "client_005",
        "name": "Habibur Rahman",
        "email": "habib.rahman@yahoo.com",
        "phone": "+880-1645-678901",
        "address": "Mirpur-10, Block C, Road 5, Dhaka-1216",
        "company": None,
        "created_at": (datetime.now() - timedelta(days=10)).isoformat()
    }
]

# Sample technicians - Bangladeshi region
technicians = [
    {
        "id": "tech_001",
        "name": "Md. Ashraful Islam",
        "email": "ashraf.islam@techservice.com.bd",
        "phone": "+880-1712-987654",
        "specialization": "Laptop & Desktop Repair",
        "active": True,
        "created_at": (datetime.now() - timedelta(days=180)).isoformat()
    },
    {
        "id": "tech_002",
        "name": "Sharmin Sultana",
        "email": "sharmin.s@techservice.com.bd",
        "phone": "+880-1856-876543",
        "specialization": "Mobile & Tablet Repair",
        "active": True,
        "created_at": (datetime.now() - timedelta(days=150)).isoformat()
    },
    {
        "id": "tech_003",
        "name": "Tanvir Ahmed",
        "email": "tanvir.ahmed@techservice.com.bd",
        "phone": "+880-1923-765432",
        "specialization": "Gaming Console & PC Building",
        "active": True,
        "created_at": (datetime.now() - timedelta(days=120)).isoformat()
    },
    {
        "id": "tech_004",
        "name": "Nusrat Jahan",
        "email": "nusrat.j@techservice.com.bd",
        "phone": "+880-1734-654321",
        "specialization": "Network & Server Setup",
        "active": True,
        "created_at": (datetime.now() - timedelta(days=90)).isoformat()
    }
]

# Sample devices
devices = [
    {
        "id": "device_001",
        "client_id": "client_001",
        "device_type": "Laptop",
        "brand": "Dell",
        "model": "XPS 15",
        "serial_number": "DLL123456789",
        "issue_description": "Screen flickering, battery not charging properly",
        "status": "in_progress",
        "priority": "high",
        "technician_id": "tech_001",
        "intake_date": (datetime.now() - timedelta(days=5)).isoformat(),
        "estimated_completion": (datetime.now() + timedelta(days=2)).isoformat(),
        "actual_completion": None,
        "repair_notes": "Replaced screen cable and battery. Testing in progress.",
        "cost": 350.00
    },
    {
        "id": "device_002",
        "client_id": "client_002",
        "device_type": "iPhone",
        "brand": "Apple",
        "model": "iPhone 13 Pro",
        "serial_number": "APL987654321",
        "issue_description": "Cracked screen, unresponsive touch",
        "status": "completed",
        "priority": "urgent",
        "technician_id": "tech_002",
        "intake_date": (datetime.now() - timedelta(days=10)).isoformat(),
        "estimated_completion": (datetime.now() - timedelta(days=8)).isoformat(),
        "actual_completion": (datetime.now() - timedelta(days=7)).isoformat(),
        "repair_notes": "Screen replaced, digitizer tested and working perfectly.",
        "cost": 280.00
    },
    {
        "id": "device_003",
        "client_id": "client_003",
        "device_type": "Desktop PC",
        "brand": "Custom Build",
        "model": "Gaming PC",
        "serial_number": "PC2023001",
        "issue_description": "Not booting, suspected motherboard failure",
        "status": "pending",
        "priority": "medium",
        "technician_id": None,
        "intake_date": datetime.now().isoformat(),
        "estimated_completion": None,
        "actual_completion": None,
        "repair_notes": None,
        "cost": 0.00
    },
    {
        "id": "device_004",
        "client_id": "client_004",
        "device_type": "MacBook",
        "brand": "Apple",
        "model": "MacBook Pro 16",
        "serial_number": "MAC456789123",
        "issue_description": "Keyboard keys not working, trackpad issues",
        "status": "in_progress",
        "priority": "high",
        "technician_id": "tech_001",
        "intake_date": (datetime.now() - timedelta(days=3)).isoformat(),
        "estimated_completion": (datetime.now() + timedelta(days=4)).isoformat(),
        "actual_completion": None,
        "repair_notes": "Ordered replacement keyboard, waiting for parts.",
        "cost": 450.00
    },
    {
        "id": "device_005",
        "client_id": "client_005",
        "device_type": "iPad",
        "brand": "Apple",
        "model": "iPad Air 5",
        "serial_number": "IPD789123456",
        "issue_description": "Won't charge, stuck on Apple logo",
        "status": "completed",
        "priority": "medium",
        "technician_id": "tech_002",
        "intake_date": (datetime.now() - timedelta(days=8)).isoformat(),
        "estimated_completion": (datetime.now() - timedelta(days=6)).isoformat(),
        "actual_completion": (datetime.now() - timedelta(days=5)).isoformat(),
        "repair_notes": "Cleaned charging port, performed software reset. Working normally.",
        "cost": 80.00
    },
    {
        "id": "device_006",
        "client_id": "client_001",
        "device_type": "Gaming Console",
        "brand": "Sony",
        "model": "PlayStation 5",
        "serial_number": "PS5123456789",
        "issue_description": "Disc drive making noise, overheating",
        "status": "pending",
        "priority": "low",
        "technician_id": None,
        "intake_date": (datetime.now() - timedelta(days=1)).isoformat(),
        "estimated_completion": None,
        "actual_completion": None,
        "repair_notes": None,
        "cost": 0.00
    },
    {
        "id": "device_007",
        "client_id": "client_002",
        "device_type": "Tablet",
        "brand": "Samsung",
        "model": "Galaxy Tab S8",
        "serial_number": "SAM321654987",
        "issue_description": "Water damage, not powering on",
        "status": "in_progress",
        "priority": "urgent",
        "technician_id": "tech_002",
        "intake_date": (datetime.now() - timedelta(days=2)).isoformat(),
        "estimated_completion": (datetime.now() + timedelta(days=5)).isoformat(),
        "actual_completion": None,
        "repair_notes": "Disassembled, cleaning components. May need motherboard replacement.",
        "cost": 200.00
    }
]

# Sample invoices
invoices = [
    {
        "id": "inv_001",
        "device_id": "device_002",
        "client_id": "client_002",
        "amount": 280.00,
        "description": "iPhone 13 Pro - Screen replacement and digitizer repair",
        "created_at": (datetime.now() - timedelta(days=7)).isoformat(),
        "paid": True
    },
    {
        "id": "inv_002",
        "device_id": "device_005",
        "client_id": "client_005",
        "amount": 80.00,
        "description": "iPad Air 5 - Charging port cleaning and software reset",
        "created_at": (datetime.now() - timedelta(days=5)).isoformat(),
        "paid": True
    },
    {
        "id": "inv_003",
        "device_id": "device_001",
        "client_id": "client_001",
        "amount": 350.00,
        "description": "Dell XPS 15 - Screen cable and battery replacement",
        "created_at": (datetime.now() - timedelta(days=2)).isoformat(),
        "paid": False
    },
    {
        "id": "inv_004",
        "device_id": "device_004",
        "client_id": "client_004",
        "amount": 450.00,
        "description": "MacBook Pro 16 - Keyboard replacement",
        "created_at": (datetime.now() - timedelta(days=1)).isoformat(),
        "paid": False
    }
]

# Sample SMS logs
sms_logs = [
    {
        "device_id": "device_002",
        "client_id": "client_002",
        "message": "Your iPhone 13 Pro repair is complete! Screen has been replaced. Total: $280.00. Ready for pickup.",
        "sent_at": (datetime.now() - timedelta(days=7)).isoformat()
    },
    {
        "device_id": "device_005",
        "client_id": "client_005",
        "message": "Good news! Your iPad Air 5 has been repaired and is ready for pickup. Total: $80.00",
        "sent_at": (datetime.now() - timedelta(days=5)).isoformat()
    },
    {
        "device_id": "device_001",
        "client_id": "client_001",
        "message": "Update: Your Dell XPS 15 repair is in progress. We've replaced the screen cable and battery. Estimated completion: 2 days.",
        "sent_at": (datetime.now() - timedelta(days=3)).isoformat()
    }
]

# Create data directory and save files
import os
os.makedirs('data', exist_ok=True)

with open('data/clients.json', 'w') as f:
    json.dump(clients, f, indent=2)

with open('data/technicians.json', 'w') as f:
    json.dump(technicians, f, indent=2)

with open('data/devices.json', 'w') as f:
    json.dump(devices, f, indent=2)

with open('data/invoices.json', 'w') as f:
    json.dump(invoices, f, indent=2)

with open('data/sms_logs.json', 'w') as f:
    json.dump(sms_logs, f, indent=2)

print("Sample data created successfully!")
print(f"Clients: {len(clients)}")
print(f"Technicians: {len(technicians)}")
print(f"Devices: {len(devices)}")
print(f"Invoices: {len(invoices)}")
print(f"SMS Logs: {len(sms_logs)}")

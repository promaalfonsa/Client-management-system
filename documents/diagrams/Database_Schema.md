# Client Management & Service Record System
## Database Schema

## Current Implementation: JSON File Storage

### File Structure
```
backend/data/
├── clients.json
├── devices.json
├── technicians.json
├── invoices.json
└── sms_logs.json
```

---

## Table Schemas

### 1. CLIENTS Table

```sql
CREATE TABLE clients (
    id VARCHAR(50) PRIMARY KEY,
    name VARCHAR(255) NOT NULL,
    email VARCHAR(255) NOT NULL UNIQUE,
    phone VARCHAR(20) NOT NULL,
    address TEXT NOT NULL,
    company VARCHAR(255),
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    
    -- Indexes
    INDEX idx_client_email (email),
    INDEX idx_client_phone (phone),
    INDEX idx_client_name (name),
    INDEX idx_client_created (created_at)
);
```

**Sample Data (Bangladeshi)**:
```json
{
    "id": "client_001",
    "name": "Rahman Ahmed",
    "email": "rahman.ahmed@grameen.com.bd",
    "phone": "+880-1712-345678",
    "address": "House 45, Road 12, Dhanmondi, Dhaka-1209",
    "company": "Grameen Tech Solutions",
    "created_at": "2025-10-16T19:44:19.756234"
}
```

**Constraints**:
- Email must be unique
- Phone format: +880-XXXX-XXXXXX
- Name, email, phone, address are required
- Company is optional

---

### 2. TECHNICIANS Table

```sql
CREATE TABLE technicians (
    id VARCHAR(50) PRIMARY KEY,
    name VARCHAR(255) NOT NULL,
    email VARCHAR(255) NOT NULL UNIQUE,
    phone VARCHAR(20) NOT NULL,
    specialization VARCHAR(255) NOT NULL,
    active BOOLEAN DEFAULT TRUE,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    
    -- Indexes
    INDEX idx_tech_email (email),
    INDEX idx_tech_active (active),
    INDEX idx_tech_specialization (specialization),
    INDEX idx_tech_created (created_at)
);
```

**Sample Data (Bangladeshi)**:
```json
{
    "id": "tech_001",
    "name": "Md. Ashraful Islam",
    "email": "ashraf.islam@techservice.com.bd",
    "phone": "+880-1712-987654",
    "specialization": "Laptop & Desktop Repair",
    "active": true,
    "created_at": "2025-05-19T19:44:19.756234"
}
```

**Constraints**:
- Email must be unique
- Only active technicians can receive assignments
- Specialization values: 
  - "Laptop & Desktop Repair"
  - "Mobile & Tablet Repair"
  - "Gaming Console & PC Building"
  - "Network & Server Setup"

---

### 3. DEVICES Table

```sql
CREATE TABLE devices (
    id VARCHAR(50) PRIMARY KEY,
    client_id VARCHAR(50) NOT NULL,
    device_type VARCHAR(100) NOT NULL,
    brand VARCHAR(100) NOT NULL,
    model VARCHAR(100) NOT NULL,
    serial_number VARCHAR(100),
    issue_description TEXT NOT NULL,
    status ENUM('pending', 'in_progress', 'completed', 'delivered') DEFAULT 'pending',
    priority ENUM('low', 'medium', 'high', 'urgent') DEFAULT 'medium',
    technician_id VARCHAR(50),
    intake_date TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    estimated_completion TIMESTAMP,
    actual_completion TIMESTAMP,
    repair_notes TEXT,
    cost DECIMAL(10, 2) DEFAULT 0.00,
    
    -- Foreign Keys
    FOREIGN KEY (client_id) REFERENCES clients(id) ON DELETE CASCADE,
    FOREIGN KEY (technician_id) REFERENCES technicians(id) ON DELETE SET NULL,
    
    -- Indexes
    INDEX idx_device_client (client_id),
    INDEX idx_device_technician (technician_id),
    INDEX idx_device_status (status),
    INDEX idx_device_priority (priority),
    INDEX idx_device_intake (intake_date),
    INDEX idx_device_brand (brand),
    INDEX idx_device_type (device_type)
);
```

**Sample Data**:
```json
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
    "intake_date": "2025-11-10T19:44:19.756234",
    "estimated_completion": "2025-11-17T19:44:19.756234",
    "actual_completion": null,
    "repair_notes": "Replaced screen cable and battery. Testing in progress.",
    "cost": 350.00
}
```

**Constraints**:
- Client must exist
- Status workflow: pending → in_progress → completed → delivered
- Priority levels: low, medium, high, urgent
- Cost must be >= 0
- Cannot delete if linked invoice exists

---

### 4. INVOICES Table

```sql
CREATE TABLE invoices (
    id VARCHAR(50) PRIMARY KEY,
    device_id VARCHAR(50) NOT NULL UNIQUE,
    client_id VARCHAR(50) NOT NULL,
    amount DECIMAL(10, 2) NOT NULL,
    description TEXT NOT NULL,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    paid BOOLEAN DEFAULT FALSE,
    paid_at TIMESTAMP,
    
    -- Foreign Keys
    FOREIGN KEY (device_id) REFERENCES devices(id) ON DELETE CASCADE,
    FOREIGN KEY (client_id) REFERENCES clients(id) ON DELETE CASCADE,
    
    -- Indexes
    INDEX idx_invoice_device (device_id),
    INDEX idx_invoice_client (client_id),
    INDEX idx_invoice_paid (paid),
    INDEX idx_invoice_created (created_at),
    INDEX idx_invoice_amount (amount)
);
```

**Sample Data**:
```json
{
    "id": "inv_001",
    "device_id": "device_002",
    "client_id": "client_002",
    "amount": 280.00,
    "description": "iPhone 13 Pro - Screen replacement and digitizer repair",
    "created_at": "2025-11-08T19:44:19.756234",
    "paid": true,
    "paid_at": "2025-11-09T10:30:00.000000"
}
```

**Constraints**:
- One invoice per device (unique device_id)
- Amount must be > 0
- Device and client must exist
- Paid_at timestamp only if paid = true

---

### 5. SMS_UPDATES Table

```sql
CREATE TABLE sms_updates (
    id SERIAL PRIMARY KEY,
    device_id VARCHAR(50) NOT NULL,
    client_id VARCHAR(50) NOT NULL,
    message TEXT NOT NULL,
    sent_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    delivery_status ENUM('sent', 'delivered', 'failed') DEFAULT 'sent',
    
    -- Foreign Keys
    FOREIGN KEY (device_id) REFERENCES devices(id) ON DELETE CASCADE,
    FOREIGN KEY (client_id) REFERENCES clients(id) ON DELETE CASCADE,
    
    -- Indexes
    INDEX idx_sms_device (device_id),
    INDEX idx_sms_client (client_id),
    INDEX idx_sms_sent (sent_at),
    INDEX idx_sms_status (delivery_status)
);
```

**Sample Data**:
```json
{
    "device_id": "device_001",
    "client_id": "client_001",
    "message": "Update: Your Dell XPS 15 repair is in progress. We've replaced the screen cable and battery. Estimated completion: 2 days.",
    "sent_at": "2025-11-12T19:44:19.756234",
    "delivery_status": "sent"
}
```

**Constraints**:
- Device and client must exist
- Message length: 1-1000 characters
- Sent_at auto-generated

---

## Relationships Summary

```
CLIENTS (1) ──── (Many) DEVICES
    │                      │
    │                      │
    │                      │
    └──── (Many) INVOICES  │
                  │        │
                  │        │
                  └────────┘
                  
TECHNICIANS (1) ──── (Many) DEVICES

DEVICES (1) ──── (1) INVOICE
    │
    │
    └──── (Many) SMS_UPDATES

CLIENTS (1) ──── (Many) SMS_UPDATES
```

---

## Data Types Reference

### Current JSON Format
| Field Type | JSON Type | SQL Type | Example |
|-----------|-----------|----------|---------|
| ID | string | VARCHAR(50) | "client_001" |
| Name | string | VARCHAR(255) | "Rahman Ahmed" |
| Email | string | VARCHAR(255) | "rahman@grameen.com.bd" |
| Phone | string | VARCHAR(20) | "+880-1712-345678" |
| Address | string | TEXT | "House 45, Road 12, Dhanmondi" |
| Status | string | ENUM | "pending", "in_progress" |
| Priority | string | ENUM | "low", "medium", "high", "urgent" |
| Cost | number | DECIMAL(10,2) | 350.00 |
| Boolean | boolean | BOOLEAN | true, false |
| Timestamp | string (ISO) | TIMESTAMP | "2025-11-15T19:44:19.756234" |

---

## Migration Path to MongoDB

### MongoDB Collections

```javascript
// clients collection
{
    _id: ObjectId("..."),
    id: "client_001",
    name: "Rahman Ahmed",
    email: "rahman.ahmed@grameen.com.bd",
    phone: "+880-1712-345678",
    address: "House 45, Road 12, Dhanmondi, Dhaka-1209",
    company: "Grameen Tech Solutions",
    created_at: ISODate("2025-10-16T19:44:19.756Z"),
    // Additional fields
    devices: ["device_001", "device_006"],  // Array of device IDs
    total_spent: 430.00
}

// devices collection
{
    _id: ObjectId("..."),
    id: "device_001",
    client: {
        id: "client_001",
        name: "Rahman Ahmed",
        phone: "+880-1712-345678"
    },
    device_info: {
        type: "Laptop",
        brand: "Dell",
        model: "XPS 15",
        serial_number: "DLL123456789"
    },
    repair: {
        issue: "Screen flickering, battery not charging properly",
        status: "in_progress",
        priority: "high",
        technician_id: "tech_001",
        notes: "Replaced screen cable and battery. Testing in progress.",
        cost: 350.00
    },
    dates: {
        intake: ISODate("2025-11-10T19:44:19.756Z"),
        estimated_completion: ISODate("2025-11-17T19:44:19.756Z"),
        actual_completion: null
    },
    // Additional fields
    status_history: [
        {status: "pending", timestamp: ISODate("...")},
        {status: "in_progress", timestamp: ISODate("...")}
    ]
}
```

### MongoDB Indexes
```javascript
// clients
db.clients.createIndex({email: 1}, {unique: true})
db.clients.createIndex({phone: 1})
db.clients.createIndex({name: "text"})

// devices
db.devices.createIndex({"client.id": 1})
db.devices.createIndex({"repair.technician_id": 1})
db.devices.createIndex({"repair.status": 1})
db.devices.createIndex({"repair.priority": 1})
db.devices.createIndex({"dates.intake": -1})

// technicians
db.technicians.createIndex({email: 1}, {unique: true})
db.technicians.createIndex({active: 1})
db.technicians.createIndex({specialization: 1})

// invoices
db.invoices.createIndex({device_id: 1}, {unique: true})
db.invoices.createIndex({client_id: 1})
db.invoices.createIndex({paid: 1})

// sms_updates
db.sms_updates.createIndex({device_id: 1})
db.sms_updates.createIndex({client_id: 1})
db.sms_updates.createIndex({sent_at: -1})
```

---

## Data Validation Rules

### Client Validation
```python
from pydantic import BaseModel, EmailStr, Field

class Client(BaseModel):
    id: str
    name: str = Field(min_length=2, max_length=255)
    email: EmailStr
    phone: str = Field(regex=r'^\+880-\d{4}-\d{6}$')
    address: str = Field(min_length=10)
    company: Optional[str] = None
    created_at: datetime
```

### Device Validation
```python
class Device(BaseModel):
    id: str
    client_id: str
    device_type: str = Field(min_length=2)
    brand: str = Field(min_length=2)
    model: str = Field(min_length=1)
    serial_number: Optional[str] = None
    issue_description: str = Field(min_length=10)
    status: Literal['pending', 'in_progress', 'completed', 'delivered']
    priority: Literal['low', 'medium', 'high', 'urgent']
    technician_id: Optional[str] = None
    cost: float = Field(ge=0)  # >= 0
```

---

## Backup and Recovery

### Current Approach (JSON Files)
```bash
# Backup
cp -r backend/data backend/data_backup_$(date +%Y%m%d_%H%M%S)

# Restore
cp -r backend/data_backup_YYYYMMDD_HHMMSS backend/data
```

### Future Approach (MongoDB)
```bash
# Backup
mongodump --db client_management --out /backup/$(date +%Y%m%d)

# Restore
mongorestore --db client_management /backup/YYYYMMDD/client_management
```

---

## Performance Considerations

### Query Optimization
1. **Frequent Queries**:
   - Get devices by status: INDEX on status
   - Get client devices: INDEX on client_id
   - Search by phone/email: INDEX on these fields

2. **Join Optimization**:
   - Device + Client data: Pre-index foreign keys
   - Invoice + Device: Use device_id index

3. **Sorting**:
   - Recent devices: INDEX on intake_date DESC
   - Revenue reports: INDEX on created_at DESC

### Data Size Estimates
- Small Business (< 100 clients): < 1 MB
- Medium Business (100-1000 clients): 1-10 MB
- Large Business (> 1000 clients): > 10 MB

JSON storage is suitable for up to ~10,000 records. Beyond that, migrate to MongoDB.

from fastapi import FastAPI, HTTPException
from fastapi.middleware.cors import CORSMiddleware
from fastapi.responses import FileResponse
from pydantic import BaseModel, Field
from typing import List, Optional
from datetime import datetime
from enum import Enum
import json
import os
from pathlib import Path
from reportlab.lib.pagesizes import letter
from reportlab.lib.styles import getSampleStyleSheet, ParagraphStyle
from reportlab.lib.units import inch
from reportlab.platypus import SimpleDocTemplate, Table, TableStyle, Paragraph, Spacer
from reportlab.lib import colors

app = FastAPI(title="Client Management System API")

# Enable CORS
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# Data directory
DATA_DIR = Path("data")
DATA_DIR.mkdir(exist_ok=True)

# Enums
class DeviceStatus(str, Enum):
    PENDING = "pending"
    IN_PROGRESS = "in_progress"
    COMPLETED = "completed"
    DELIVERED = "delivered"

class Priority(str, Enum):
    LOW = "low"
    MEDIUM = "medium"
    HIGH = "high"
    URGENT = "urgent"

# Models
class Client(BaseModel):
    id: str
    name: str
    email: str
    phone: str
    address: str
    company: Optional[str] = None
    created_at: str = Field(default_factory=lambda: datetime.now().isoformat())

class Device(BaseModel):
    id: str
    client_id: str
    device_type: str
    brand: str
    model: str
    serial_number: Optional[str] = None
    issue_description: str
    status: DeviceStatus = DeviceStatus.PENDING
    priority: Priority = Priority.MEDIUM
    technician_id: Optional[str] = None
    intake_date: str = Field(default_factory=lambda: datetime.now().isoformat())
    estimated_completion: Optional[str] = None
    actual_completion: Optional[str] = None
    repair_notes: Optional[str] = None
    cost: Optional[float] = 0.0

class Technician(BaseModel):
    id: str
    name: str
    email: str
    phone: str
    specialization: str
    active: bool = True
    created_at: str = Field(default_factory=lambda: datetime.now().isoformat())

class Invoice(BaseModel):
    id: str
    device_id: str
    client_id: str
    amount: float
    description: str
    created_at: str = Field(default_factory=lambda: datetime.now().isoformat())
    paid: bool = False

class SMSUpdate(BaseModel):
    device_id: str
    client_id: str
    message: str
    sent_at: str = Field(default_factory=lambda: datetime.now().isoformat())

# Helper functions
def load_data(filename: str):
    file_path = DATA_DIR / filename
    if file_path.exists():
        with open(file_path, 'r') as f:
            return json.load(f)
    return []

def save_data(filename: str, data):
    file_path = DATA_DIR / filename
    with open(file_path, 'w') as f:
        json.dump(data, f, indent=2)

# Client endpoints
@app.get("/api/clients", response_model=List[Client])
async def get_clients():
    return load_data("clients.json")

@app.post("/api/clients", response_model=Client)
async def create_client(client: Client):
    clients = load_data("clients.json")
    clients.append(client.dict())
    save_data("clients.json", clients)
    return client

@app.get("/api/clients/{client_id}", response_model=Client)
async def get_client(client_id: str):
    clients = load_data("clients.json")
    for client in clients:
        if client["id"] == client_id:
            return client
    raise HTTPException(status_code=404, detail="Client not found")

@app.put("/api/clients/{client_id}", response_model=Client)
async def update_client(client_id: str, client: Client):
    clients = load_data("clients.json")
    for i, c in enumerate(clients):
        if c["id"] == client_id:
            clients[i] = client.dict()
            save_data("clients.json", clients)
            return client
    raise HTTPException(status_code=404, detail="Client not found")

@app.delete("/api/clients/{client_id}")
async def delete_client(client_id: str):
    clients = load_data("clients.json")
    clients = [c for c in clients if c["id"] != client_id]
    save_data("clients.json", clients)
    return {"message": "Client deleted successfully"}

# Device endpoints
@app.get("/api/devices", response_model=List[Device])
async def get_devices():
    return load_data("devices.json")

@app.post("/api/devices", response_model=Device)
async def create_device(device: Device):
    devices = load_data("devices.json")
    devices.append(device.dict())
    save_data("devices.json", devices)
    return device

@app.get("/api/devices/{device_id}", response_model=Device)
async def get_device(device_id: str):
    devices = load_data("devices.json")
    for device in devices:
        if device["id"] == device_id:
            return device
    raise HTTPException(status_code=404, detail="Device not found")

@app.put("/api/devices/{device_id}", response_model=Device)
async def update_device(device_id: str, device: Device):
    devices = load_data("devices.json")
    for i, d in enumerate(devices):
        if d["id"] == device_id:
            devices[i] = device.dict()
            save_data("devices.json", devices)
            return device
    raise HTTPException(status_code=404, detail="Device not found")

@app.delete("/api/devices/{device_id}")
async def delete_device(device_id: str):
    devices = load_data("devices.json")
    devices = [d for d in devices if d["id"] != device_id]
    save_data("devices.json", devices)
    return {"message": "Device deleted successfully"}

# Technician endpoints
@app.get("/api/technicians", response_model=List[Technician])
async def get_technicians():
    return load_data("technicians.json")

@app.post("/api/technicians", response_model=Technician)
async def create_technician(technician: Technician):
    technicians = load_data("technicians.json")
    technicians.append(technician.dict())
    save_data("technicians.json", technicians)
    return technician

@app.get("/api/technicians/{technician_id}", response_model=Technician)
async def get_technician(technician_id: str):
    technicians = load_data("technicians.json")
    for technician in technicians:
        if technician["id"] == technician_id:
            return technician
    raise HTTPException(status_code=404, detail="Technician not found")

@app.put("/api/technicians/{technician_id}", response_model=Technician)
async def update_technician(technician_id: str, technician: Technician):
    technicians = load_data("technicians.json")
    for i, t in enumerate(technicians):
        if t["id"] == technician_id:
            technicians[i] = technician.dict()
            save_data("technicians.json", technicians)
            return technician
    raise HTTPException(status_code=404, detail="Technician not found")

@app.delete("/api/technicians/{technician_id}")
async def delete_technician(technician_id: str):
    technicians = load_data("technicians.json")
    technicians = [t for t in technicians if t["id"] != technician_id]
    save_data("technicians.json", technicians)
    return {"message": "Technician deleted successfully"}

# Invoice endpoints
@app.get("/api/invoices", response_model=List[Invoice])
async def get_invoices():
    return load_data("invoices.json")

@app.post("/api/invoices", response_model=Invoice)
async def create_invoice(invoice: Invoice):
    invoices = load_data("invoices.json")
    invoices.append(invoice.dict())
    save_data("invoices.json", invoices)
    return invoice

@app.get("/api/invoices/{invoice_id}", response_model=Invoice)
async def get_invoice(invoice_id: str):
    invoices = load_data("invoices.json")
    for invoice in invoices:
        if invoice["id"] == invoice_id:
            return invoice
    raise HTTPException(status_code=404, detail="Invoice not found")

@app.put("/api/invoices/{invoice_id}", response_model=Invoice)
async def update_invoice(invoice_id: str, invoice: Invoice):
    invoices = load_data("invoices.json")
    for i, inv in enumerate(invoices):
        if inv["id"] == invoice_id:
            invoices[i] = invoice.dict()
            save_data("invoices.json", invoices)
            return invoice
    raise HTTPException(status_code=404, detail="Invoice not found")

# PDF Generation
@app.get("/api/invoices/{invoice_id}/pdf")
async def generate_invoice_pdf(invoice_id: str):
    invoices = load_data("invoices.json")
    invoice = None
    for inv in invoices:
        if inv["id"] == invoice_id:
            invoice = inv
            break
    
    if not invoice:
        raise HTTPException(status_code=404, detail="Invoice not found")
    
    # Get related data
    devices = load_data("devices.json")
    clients = load_data("clients.json")
    
    device = next((d for d in devices if d["id"] == invoice["device_id"]), None)
    client = next((c for c in clients if c["id"] == invoice["client_id"]), None)
    
    if not device or not client:
        raise HTTPException(status_code=404, detail="Related data not found")
    
    # Create PDF
    pdf_path = DATA_DIR / f"invoice_{invoice_id}.pdf"
    doc = SimpleDocTemplate(str(pdf_path), pagesize=letter)
    
    story = []
    styles = getSampleStyleSheet()
    
    # Title
    title_style = ParagraphStyle(
        'CustomTitle',
        parent=styles['Heading1'],
        fontSize=24,
        textColor=colors.HexColor('#1f2937'),
        spaceAfter=30,
    )
    story.append(Paragraph("INVOICE", title_style))
    story.append(Spacer(1, 0.2*inch))
    
    # Company info
    company_info = f"""
    <b>Tech Service Company</b><br/>
    123 Service Street<br/>
    Tech City, TC 12345<br/>
    Phone: (555) 123-4567
    """
    story.append(Paragraph(company_info, styles['Normal']))
    story.append(Spacer(1, 0.3*inch))
    
    # Client info
    client_info = f"""
    <b>Bill To:</b><br/>
    {client['name']}<br/>
    {client.get('company', '')}<br/>
    {client['address']}<br/>
    Phone: {client['phone']}<br/>
    Email: {client['email']}
    """
    story.append(Paragraph(client_info, styles['Normal']))
    story.append(Spacer(1, 0.3*inch))
    
    # Invoice details
    invoice_data = [
        ['Invoice ID:', invoice['id']],
        ['Date:', invoice['created_at'][:10]],
        ['Device:', f"{device['brand']} {device['model']}"],
        ['Serial Number:', device.get('serial_number', 'N/A')],
    ]
    
    t = Table(invoice_data, colWidths=[2*inch, 4*inch])
    t.setStyle(TableStyle([
        ('FONTNAME', (0, 0), (0, -1), 'Helvetica-Bold'),
        ('FONTNAME', (1, 0), (1, -1), 'Helvetica'),
        ('FONTSIZE', (0, 0), (-1, -1), 10),
        ('BOTTOMPADDING', (0, 0), (-1, -1), 6),
    ]))
    story.append(t)
    story.append(Spacer(1, 0.3*inch))
    
    # Service details
    service_data = [
        ['Description', 'Amount'],
        [invoice['description'], f"${invoice['amount']:.2f}"],
        ['', ''],
        ['Total:', f"${invoice['amount']:.2f}"],
    ]
    
    service_table = Table(service_data, colWidths=[4*inch, 2*inch])
    service_table.setStyle(TableStyle([
        ('FONTNAME', (0, 0), (-1, 0), 'Helvetica-Bold'),
        ('FONTSIZE', (0, 0), (-1, -1), 10),
        ('BACKGROUND', (0, 0), (-1, 0), colors.HexColor('#e5e7eb')),
        ('GRID', (0, 0), (-1, -2), 1, colors.HexColor('#d1d5db')),
        ('FONTNAME', (0, -1), (-1, -1), 'Helvetica-Bold'),
        ('FONTSIZE', (0, -1), (-1, -1), 12),
        ('ALIGN', (1, 0), (1, -1), 'RIGHT'),
        ('BOTTOMPADDING', (0, 0), (-1, -1), 8),
        ('TOPPADDING', (0, 0), (-1, -1), 8),
    ]))
    story.append(service_table)
    
    doc.build(story)
    
    return FileResponse(
        str(pdf_path),
        media_type='application/pdf',
        filename=f'invoice_{invoice_id}.pdf'
    )

# SMS endpoints
@app.post("/api/sms/send")
async def send_sms(sms: SMSUpdate):
    sms_logs = load_data("sms_logs.json")
    sms_logs.append(sms.dict())
    save_data("sms_logs.json", sms_logs)
    return {"message": "SMS sent successfully", "data": sms}

@app.get("/api/sms/logs")
async def get_sms_logs():
    return load_data("sms_logs.json")

# Dashboard stats
@app.get("/api/stats")
async def get_stats():
    clients = load_data("clients.json")
    devices = load_data("devices.json")
    technicians = load_data("technicians.json")
    invoices = load_data("invoices.json")
    
    pending_devices = len([d for d in devices if d["status"] == "pending"])
    in_progress_devices = len([d for d in devices if d["status"] == "in_progress"])
    completed_devices = len([d for d in devices if d["status"] == "completed"])
    
    total_revenue = sum(inv["amount"] for inv in invoices if inv["paid"])
    pending_revenue = sum(inv["amount"] for inv in invoices if not inv["paid"])
    
    return {
        "total_clients": len(clients),
        "total_devices": len(devices),
        "total_technicians": len(technicians),
        "total_invoices": len(invoices),
        "pending_devices": pending_devices,
        "in_progress_devices": in_progress_devices,
        "completed_devices": completed_devices,
        "total_revenue": total_revenue,
        "pending_revenue": pending_revenue,
    }

@app.get("/")
async def root():
    return {"message": "Client Management System API", "version": "1.0.0"}

if __name__ == "__main__":
    import uvicorn
    uvicorn.run(app, host="0.0.0.0", port=8000)

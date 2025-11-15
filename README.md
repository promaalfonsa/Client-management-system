# Client Management & Service Record System

A modern, full-stack SaaS application for tech repair and service companies to manage clients, devices, technicians, invoices, and customer communications.

## 🚀 Features

- **Client Database** - Complete client management with contact information and service history
- **Device Intake & Repair Tracking** - Track devices from intake to delivery with status updates
- **Technician Assignment** - Assign and manage technical staff with specializations
- **Invoice Generation** - Create, manage, and export invoices as PDF
- **SMS Updates** - Send automated updates to clients about their device repairs
- **Dashboard Analytics** - Real-time statistics and insights
- **Modern UI** - Corporate-style design with smooth animations and responsive layout

## 🛠️ Tech Stack

### Frontend
- **Next.js 14** - React framework with App Router
- **TypeScript** - Type-safe development
- **Tailwind CSS** - Utility-first CSS framework
- **Framer Motion** - Smooth animations and transitions
- **Lucide React** - Beautiful icon library
- **Axios** - HTTP client for API calls

### Backend
- **Python 3.x** - Programming language
- **FastAPI** - Modern, fast web framework
- **Pydantic** - Data validation
- **ReportLab** - PDF generation
- **JSON Storage** - File-based data persistence (MongoDB-ready architecture)

## 📋 Prerequisites

- Node.js 18+ and npm
- Python 3.8+
- pip (Python package manager)

## 🔧 Installation & Setup

### 1. Clone the Repository

```bash
git clone https://github.com/promaalfonsa/Client-management-system.git
cd Client-management-system
```

### 2. Backend Setup

```bash
# Navigate to backend directory
cd backend

# Install Python dependencies
pip install -r requirements.txt

# Create sample data
python create_sample_data.py

# Start the backend server
python main.py
```

The backend API will be available at `http://localhost:8000`

### 3. Frontend Setup

Open a new terminal window:

```bash
# Navigate to frontend directory
cd frontend

# Install dependencies
npm install

# Start the development server
npm run dev
```

The frontend application will be available at `http://localhost:3000`

## 🎯 Usage

### Accessing the Application

1. Open your browser and navigate to `http://localhost:3000`
2. You'll see the dashboard with overview statistics
3. Use the sidebar to navigate between different sections

### Sample Data

The application comes with pre-populated sample data:
- **5 Clients** - Various business and individual clients
- **7 Devices** - Mix of laptops, phones, tablets in different repair stages
- **4 Technicians** - Specialists in different areas
- **4 Invoices** - Sample invoices with paid/unpaid status
- **SMS Logs** - Example client communications

### Key Features

#### Dashboard
- View overview statistics
- Monitor device status (Pending, In Progress, Completed)
- Track revenue (Total and Pending)
- See recent clients and devices

#### Client Management
- Add new clients with contact information
- Edit existing client details
- View client history
- Delete clients (with confirmation)

#### Device Management
- Register new devices for repair
- Track device status and priority
- Assign technicians to devices
- Add repair notes and costs
- Update device status through workflow

#### Technician Management
- Add team members with specializations
- Manage technician availability
- View technician assignments

#### Invoice Management
- Create invoices from devices
- Mark invoices as paid/unpaid
- **Export invoices as PDF** - Download professional invoices
- Track total and pending revenue

#### SMS Updates
- Send status updates to clients
- Auto-generated message templates based on device status
- View SMS history
- Character count and SMS count tracker

## 📁 Project Structure

```
Client-management-system/
├── backend/
│   ├── main.py                 # FastAPI application
│   ├── create_sample_data.py   # Sample data generator
│   ├── requirements.txt        # Python dependencies
│   └── data/                   # JSON data storage
│       ├── clients.json
│       ├── devices.json
│       ├── technicians.json
│       ├── invoices.json
│       └── sms_logs.json
│
└── frontend/
    ├── app/                    # Next.js App Router
    │   ├── page.tsx           # Dashboard page
    │   ├── clients/           # Client management
    │   ├── devices/           # Device tracking
    │   ├── technicians/       # Technician management
    │   ├── invoices/          # Invoice management
    │   └── sms/               # SMS updates
    ├── components/
    │   ├── dashboard/         # Layout components
    │   └── ui/                # Reusable UI components
    ├── lib/                   # Utilities
    │   ├── api.ts             # API client
    │   └── utils.ts           # Helper functions
    └── types/                 # TypeScript definitions
```

## 🔌 API Endpoints

### Clients
- `GET /api/clients` - List all clients
- `POST /api/clients` - Create new client
- `GET /api/clients/{id}` - Get client by ID
- `PUT /api/clients/{id}` - Update client
- `DELETE /api/clients/{id}` - Delete client

### Devices
- `GET /api/devices` - List all devices
- `POST /api/devices` - Create new device
- `GET /api/devices/{id}` - Get device by ID
- `PUT /api/devices/{id}` - Update device
- `DELETE /api/devices/{id}` - Delete device

### Technicians
- `GET /api/technicians` - List all technicians
- `POST /api/technicians` - Create new technician
- `GET /api/technicians/{id}` - Get technician by ID
- `PUT /api/technicians/{id}` - Update technician
- `DELETE /api/technicians/{id}` - Delete technician

### Invoices
- `GET /api/invoices` - List all invoices
- `POST /api/invoices` - Create new invoice
- `GET /api/invoices/{id}` - Get invoice by ID
- `PUT /api/invoices/{id}` - Update invoice
- `GET /api/invoices/{id}/pdf` - Download invoice as PDF

### SMS
- `POST /api/sms/send` - Send SMS update
- `GET /api/sms/logs` - Get SMS history

### Statistics
- `GET /api/stats` - Get dashboard statistics

## 🎨 UI Features

- **Responsive Design** - Works on desktop, tablet, and mobile
- **Modern Corporate Style** - Professional look and feel
- **Smooth Animations** - Framer Motion powered transitions
- **Icon Library** - Lucide React icons throughout
- **Color-Coded Status** - Visual indicators for device status and priority
- **Form Validation** - Client-side validation for all forms
- **Loading States** - Proper loading indicators
- **Error Handling** - User-friendly error messages

## 🔮 Future Scalability

The application is designed to be easily scalable:

### Database Migration
The current JSON storage can be easily migrated to MongoDB:
- Models are already structured for NoSQL
- API endpoints are database-agnostic
- Simply swap the storage layer implementation

### Planned Features
- User authentication and authorization
- Multi-tenant support
- Email notifications
- Advanced reporting and analytics
- Inventory management
- Parts tracking
- Customer portal
- Mobile application

## 🧪 Testing

### Backend Testing
```bash
cd backend
# Run the server and test endpoints
python main.py
# API documentation available at http://localhost:8000/docs
```

### Frontend Testing
```bash
cd frontend
# Build the application
npm run build
# Run production build
npm start
```

## 📝 License

This project is licensed under the MIT License.

## 👥 Contributing

Contributions are welcome! Please feel free to submit a Pull Request.

## 🐛 Known Issues

- SMS functionality is simulated (no actual SMS sending)
- Email notifications not yet implemented
- Search functionality in header is placeholder

## 📞 Support

For support, please open an issue in the GitHub repository.

---

**Built with ❤️ for Tech Service Teams**

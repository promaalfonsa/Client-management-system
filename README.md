# Client Management & Service Record System

A modern SaaS application for tech repair and service companies built with Next.js 14.

## 🚀 Quick Start (Vercel-Ready)

```bash
# Install dependencies
npm install

# Run development server
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) to view the application.

## ✨ Features

- **Client Management**: Full CRUD operations for managing clients
- **Device Tracking**: Track device repairs from intake to delivery
- **Technician Assignment**: Assign technicians to repair jobs
- **Invoice Generation**: Create and export invoices as PDF
- **SMS Updates**: Send status updates to clients
- **Dashboard Analytics**: Real-time statistics and insights
- **Modern UI**: Glassmorphism design with smooth animations
- **Collapsible Search**: Hidden search button that expands on click
- **Sidebar Toggle**: Responsive sidebar with auto-adjusting content

## 🛠️ Tech Stack

- **Frontend & Backend**: Next.js 14 (App Router with API Routes)
- **UI**: Tailwind CSS, Framer Motion, Lucide Icons
- **Data Storage**: JSON files (MongoDB-ready structure)
- **PDF Generation**: jsPDF with autoTable
- **Deployment**: Vercel-optimized

## 📦 Project Structure

```
/
├── app/
│   ├── api/              # Next.js API routes (backend)
│   │   ├── clients/
│   │   ├── devices/
│   │   ├── technicians/
│   │   ├── invoices/
│   │   ├── sms/
│   │   └── stats/
│   ├── clients/          # Client management pages
│   ├── devices/          # Device tracking pages
│   ├── invoices/         # Invoice management
│   ├── sms/              # SMS update interface
│   └── technicians/      # Technician management
├── components/           # Reusable UI components
│   ├── dashboard/        # Layout components
│   └── ui/               # UI elements
├── data/                 # JSON data storage
├── lib/                  # Utility functions
├── types/                # TypeScript types
└── documents/            # Project documentation
```

## 🎨 Sample Data

The application comes pre-populated with Bangladeshi sample data:
- **5 Clients**: Bangladeshi names, +880 phones, Dhaka/Chittagong addresses, .bd emails
- **7 Devices**: Various repair stages (pending, in progress, completed)
- **4 Technicians**: Bangladeshi names with specializations
- **4 Invoices**: Mixed paid/unpaid status
- **SMS Logs**: Communication history

Sample data is auto-generated on first run - no manual setup needed!

## 🚀 Deployment to Vercel

This project is fully optimized for Vercel deployment:

```bash
# Deploy to Vercel
vercel

# Or connect your GitHub repo to Vercel for automatic deployments
```

**No additional backend setup required!** All backend functionality is handled by Next.js API routes.

## 📄 API Routes

All API endpoints are built with Next.js API routes:

### Clients
- `GET /api/clients` - List all clients
- `POST /api/clients` - Create new client
- `GET /api/clients/[id]` - Get client by ID
- `PUT /api/clients/[id]` - Update client
- `DELETE /api/clients/[id]` - Delete client

### Devices
- `GET /api/devices` - List all devices
- `POST /api/devices` - Create new device
- `GET /api/devices/[id]` - Get device by ID
- `PUT /api/devices/[id]` - Update device
- `DELETE /api/devices/[id]` - Delete device

### Technicians
- `GET /api/technicians` - List all technicians
- `POST /api/technicians` - Create new technician
- `GET /api/technicians/[id]` - Get technician by ID
- `PUT /api/technicians/[id]` - Update technician
- `DELETE /api/technicians/[id]` - Delete technician

### Invoices
- `GET /api/invoices` - List all invoices
- `POST /api/invoices` - Create new invoice
- `GET /api/invoices/[id]` - Get invoice by ID
- `PUT /api/invoices/[id]` - Update invoice
- `GET /api/invoices/[id]/pdf` - Generate PDF

### SMS & Stats
- `POST /api/sms/send` - Send SMS update
- `GET /api/sms/logs` - Get SMS history
- `GET /api/stats` - Get dashboard statistics

## 📊 Documentation

Complete project documentation available in the `documents/` folder:
- **DFD Diagrams**: Context, Level 0, Level 1, Level 2
- **ER Diagram**: Complete entity relationship model
- **System Architecture**: 3-tier architecture diagram
- **Use Case Diagrams**: 14 use cases
- **Database Schema**: SQL and MongoDB schemas
- **BRD/SRS Document**: 25+ pages of requirements
- **Work Structure**: 5-person team breakdown with sprint planning

All diagrams available in PNG (300 DPI) and DOCX formats.

## 🇧🇩 Bangladeshi Region Data

All sample data uses authentic Bangladeshi information:
- **Phone format**: +880 xxxx-xxxxxx
- **Addresses**: Dhanmondi, Gulshan, Uttara (Dhaka), Nasirabad (Chittagong)
- **Email domains**: .com.bd, .bd
- **Companies**: Grameen Tech Solutions, Walton Electronics Ltd, BD Digital Services

## 🎯 Key Features

### Modern UI/UX
- Glassmorphism effects with backdrop blur
- Smooth Framer Motion animations
- Color-coded status indicators
- Responsive design for all screens

### Collapsible Search
- Hidden by default as a gradient icon button
- Expands to full search bar on click
- Auto-collapses when empty

### Sidebar Management
- Toggle button with rotation animation
- Sidebar slides in/out smoothly
- Main content auto-adjusts (no overlapping)
- Mobile-friendly overlay

---

**Built with ❤️ for Tech Service Teams in Bangladesh**

Ready for production deployment on Vercel!

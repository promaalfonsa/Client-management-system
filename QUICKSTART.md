# 🚀 Quick Start Guide

## Prerequisites
- Node.js 18+ and npm
- Python 3.8+
- pip (Python package manager)

## Installation

### Simple One-Command Setup (Recommended)

```bash
# Install backend dependencies
cd backend
pip install -r requirements.txt
cd ..

# Install frontend and start everything
cd frontend
npm install
npm run dev
```

**That's it!** The `npm run dev` command automatically:
- Creates sample data with Bangladeshi region information
- Starts backend server at http://localhost:8000
- Starts frontend at http://localhost:3000

### Manual Setup (Alternative)

**Backend (Terminal 1):**
```bash
cd backend
pip install -r requirements.txt
python create_sample_data.py
python main.py
```

**Frontend (Terminal 2):**
```bash
cd frontend
npm install
npm run next-dev
```

## Default Features & Sample Data

### Pre-loaded Sample Data (Bangladeshi Region)
- **5 Clients** - Bangladeshi names, +880 phone numbers, Dhaka/Chittagong addresses, .bd emails
- **7 Devices** - Different types in various repair stages
- **4 Technicians** - Bangladeshi specialists with local contact info
- **4 Invoices** - Mix of paid and unpaid
- **3 SMS Logs** - Example client communications

### Available Pages
1. **Dashboard** (/) - Overview statistics and recent activity
2. **Clients** (/clients) - Manage client database
3. **Devices** (/devices) - Track device repairs
4. **Technicians** (/technicians) - Manage team members
5. **Invoices** (/invoices) - Billing and payments
6. **SMS Updates** (/sms) - Send client notifications

## Testing the Application

### Test CRUD Operations
1. Navigate to any management page
2. Click "Add" button to create new records
3. Use Edit/Delete buttons to modify records
4. All changes persist in JSON files

### Test PDF Generation
1. Go to Invoices page
2. Click the download icon on any invoice
3. PDF will open in new tab

### Test SMS Updates
1. Go to SMS Updates page
2. Select a device from dropdown
3. Message auto-populates based on status
4. Click "Send SMS Update"
5. View in SMS History section

## API Endpoints

Base URL: http://localhost:8000

### Main Endpoints
- GET/POST `/api/clients`
- GET/POST `/api/devices`
- GET/POST `/api/technicians`
- GET/POST `/api/invoices`
- GET `/api/invoices/{id}/pdf` - Download invoice PDF
- POST `/api/sms/send` - Send SMS update
- GET `/api/stats` - Dashboard statistics

### Interactive API Documentation
Visit http://localhost:8000/docs for Swagger UI with all endpoints

## Project Structure
```
Client-management-system/
├── backend/
│   ├── main.py                 # FastAPI application
│   ├── create_sample_data.py   # Data generator
│   ├── requirements.txt        # Python dependencies
│   └── data/                   # JSON storage
│
└── frontend/
    ├── app/                    # Next.js pages
    ├── components/             # React components
    ├── lib/                    # Utilities
    └── types/                  # TypeScript types
```

## Troubleshooting

### Backend Issues
- **Port 8000 in use**: Stop other services or change port in main.py
- **Module not found**: Run `pip install -r requirements.txt`
- **Permission error**: Use `pip install --user -r requirements.txt`

### Frontend Issues
- **Port 3000 in use**: Kill process or change port in package.json
- **Build errors**: Delete `.next` folder and rebuild
- **API connection**: Ensure backend is running on port 8000

## Features Overview

### ✅ Client Management
- Add, edit, delete clients
- Track contact information
- Company/individual profiles

### ✅ Device Tracking
- Multi-status workflow (Pending → In Progress → Completed → Delivered)
- Priority levels (Low, Medium, High, Urgent)
- Technician assignment
- Cost tracking
- Repair notes

### ✅ Technician Management
- Specialist profiles
- Active/inactive status
- Contact management

### ✅ Invoice System
- Create from devices
- Track payment status
- PDF export
- Revenue analytics

### ✅ SMS Communication
- Template-based messages
- History tracking
- Character counter

## Next Steps

### Recommended Enhancements
1. **Authentication** - Add user login system
2. **Database** - Migrate to MongoDB
3. **Email** - Add email notifications
4. **Reports** - Advanced analytics
5. **Mobile** - Responsive improvements

### Production Deployment
1. Update environment variables
2. Setup production database
3. Configure CORS properly
4. Add authentication/authorization
5. Enable HTTPS
6. Setup monitoring

## Support
For issues or questions, please create an issue on GitHub.

---
**Happy Managing! 🎉**

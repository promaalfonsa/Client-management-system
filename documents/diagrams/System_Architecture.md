# Client Management & Service Record System
## System Architecture

```mermaid
graph TB
    subgraph Client_Layer["Client Layer (Browser)"]
        UI[Next.js 14 UI<br/>React Components<br/>Tailwind CSS<br/>Framer Motion]
    end
    
    subgraph Presentation_Layer["Presentation Layer"]
        Pages[Pages<br/>- Dashboard<br/>- Clients<br/>- Devices<br/>- Technicians<br/>- Invoices<br/>- SMS]
        Components[Reusable Components<br/>- Cards<br/>- Modals<br/>- Forms<br/>- Tables]
    end
    
    subgraph Application_Layer["Application Layer"]
        State[State Management<br/>React Hooks<br/>useState/useEffect]
        API_Client[API Client<br/>Axios<br/>HTTP Requests]
        Utils[Utilities<br/>- Formatters<br/>- Validators<br/>- Helpers]
    end
    
    subgraph API_Gateway["API Gateway / Backend"]
        FastAPI[FastAPI Server<br/>Python 3.8+<br/>Uvicorn ASGI]
        CORS[CORS Middleware]
        Routes[API Routes<br/>- /api/clients<br/>- /api/devices<br/>- /api/technicians<br/>- /api/invoices<br/>- /api/sms<br/>- /api/stats]
    end
    
    subgraph Business_Logic["Business Logic Layer"]
        Models[Pydantic Models<br/>Data Validation]
        Services[Business Services<br/>- Client Service<br/>- Device Service<br/>- Invoice Service<br/>- SMS Service]
        PDF[PDF Generator<br/>ReportLab]
    end
    
    subgraph Data_Layer["Data Access Layer"]
        JSON_Handler[JSON File Handler<br/>CRUD Operations]
    end
    
    subgraph Storage["Data Storage"]
        Files[(JSON Files<br/>- clients.json<br/>- devices.json<br/>- technicians.json<br/>- invoices.json<br/>- sms_logs.json)]
    end
    
    subgraph External["External Services (Future)"]
        SMS_Gateway[SMS Gateway API<br/>Twilio/Nexmo]
        Email[Email Service<br/>SendGrid/SMTP]
        MongoDB[MongoDB<br/>Database Migration]
    end
    
    UI --> Pages
    Pages --> Components
    Pages --> State
    State --> API_Client
    API_Client --> Utils
    
    API_Client -->|HTTP/REST| FastAPI
    FastAPI --> CORS
    CORS --> Routes
    Routes --> Models
    Models --> Services
    Services --> JSON_Handler
    Services --> PDF
    JSON_Handler --> Files
    
    Services -.->|Future| SMS_Gateway
    Services -.->|Future| Email
    JSON_Handler -.->|Migration Path| MongoDB
    
    style Client_Layer fill:#E3F2FD,stroke:#1976D2,stroke-width:2px
    style Presentation_Layer fill:#F3E5F5,stroke:#7B1FA2,stroke-width:2px
    style Application_Layer fill:#E8F5E9,stroke:#388E3C,stroke-width:2px
    style API_Gateway fill:#FFF3E0,stroke:#F57C00,stroke-width:2px
    style Business_Logic fill:#FCE4EC,stroke:#C2185B,stroke-width:2px
    style Data_Layer fill:#E0F2F1,stroke:#00796B,stroke-width:2px
    style Storage fill:#FFF9C4,stroke:#F57F17,stroke-width:2px
    style External fill:#ECEFF1,stroke:#455A64,stroke-width:2px,stroke-dasharray: 5 5
```

## Architecture Layers Description

### 1. Client Layer (Browser)
**Technology**: Next.js 14, React 19, TypeScript
- **Rendering**: Server-side rendering (SSR) + Client-side rendering (CSR)
- **Styling**: Tailwind CSS 4 with custom corporate theme
- **Animations**: Framer Motion for smooth transitions
- **Icons**: Lucide React icon library
- **Routing**: Next.js App Router (file-based routing)

### 2. Presentation Layer
**Components**:
- **Pages**: Route-based page components
  - Dashboard (/)
  - Clients (/clients)
  - Devices (/devices)
  - Technicians (/technicians)
  - Invoices (/invoices)
  - SMS Updates (/sms)
- **Reusable Components**:
  - Card, Modal, Button, Input components
  - Header, Sidebar navigation
  - Loading spinners, Badges

### 3. Application Layer
**State Management**:
- React Hooks (useState, useEffect)
- Client-side data caching
- Form validation

**API Integration**:
- Axios HTTP client
- RESTful API communication
- Error handling and retries

**Utilities**:
- Date formatting (date-fns)
- Currency formatting
- Class name utilities (clsx, tailwind-merge)
- ID generation

### 4. API Gateway / Backend
**Technology**: FastAPI (Python), Uvicorn
- **Framework**: FastAPI 0.104.1
- **ASGI Server**: Uvicorn with WebSockets support
- **CORS**: Enabled for cross-origin requests
- **Documentation**: Auto-generated OpenAPI/Swagger docs at /docs
- **Validation**: Automatic request/response validation

**Endpoints**:
```
GET    /api/clients          - List all clients
POST   /api/clients          - Create client
GET    /api/clients/{id}     - Get client by ID
PUT    /api/clients/{id}     - Update client
DELETE /api/clients/{id}     - Delete client

GET    /api/devices          - List all devices
POST   /api/devices          - Create device
PUT    /api/devices/{id}     - Update device status
DELETE /api/devices/{id}     - Delete device

GET    /api/technicians      - List technicians
POST   /api/technicians      - Create technician
PUT    /api/technicians/{id} - Update technician
DELETE /api/technicians/{id} - Delete technician

GET    /api/invoices         - List invoices
POST   /api/invoices         - Create invoice
GET    /api/invoices/{id}/pdf - Download invoice PDF

POST   /api/sms/send         - Send SMS update
GET    /api/sms/logs         - Get SMS history

GET    /api/stats            - Dashboard statistics
```

### 5. Business Logic Layer
**Models** (Pydantic):
- Client, Device, Technician, Invoice, SMSUpdate
- Data validation and serialization
- Type hints and schemas

**Services**:
- Business rules enforcement
- Data transformation
- Validation logic
- PDF generation (ReportLab)

### 6. Data Access Layer
**JSON File Handler**:
- File-based CRUD operations
- Thread-safe read/write operations
- Data persistence to JSON files
- Automatic file creation

### 7. Data Storage
**Current**: JSON Files
```
backend/data/
├── clients.json       - Client records
├── devices.json       - Device records
├── technicians.json   - Technician records
├── invoices.json      - Invoice records
└── sms_logs.json     - SMS history
```

**Future**: MongoDB migration path ready
- Schema-compatible with MongoDB
- Easy migration with minimal code changes

### 8. External Services (Future Integration)
**Planned Integrations**:
- **SMS Gateway**: Twilio/Nexmo for real SMS
- **Email**: SendGrid/SMTP for notifications
- **Database**: MongoDB for scalability
- **Cloud Storage**: AWS S3 for file uploads
- **Payment**: Stripe/bKash for online payments

## Technology Stack

### Frontend
| Category | Technology | Version |
|----------|-----------|---------|
| Framework | Next.js | 16.0.3 |
| Language | TypeScript | 5.x |
| UI Library | React | 19.2.0 |
| Styling | Tailwind CSS | 4.x |
| Animation | Framer Motion | 12.23.24 |
| Icons | Lucide React | 0.553.0 |
| HTTP Client | Axios | 1.13.2 |
| Date Utils | date-fns | 4.1.0 |

### Backend
| Category | Technology | Version |
|----------|-----------|---------|
| Framework | FastAPI | 0.104.1 |
| Server | Uvicorn | 0.24.0 |
| Language | Python | 3.8+ |
| Validation | Pydantic | 2.5.0 |
| PDF | ReportLab | 4.0.7 |
| CORS | starlette | 0.27.0 |

## Deployment Architecture

```mermaid
graph LR
    Users[Users<br/>Bangladesh]
    CDN[CDN<br/>Vercel Edge]
    Frontend[Frontend Server<br/>Next.js<br/>Port 3000]
    Backend[Backend Server<br/>FastAPI<br/>Port 8000]
    Storage[(JSON Files<br/>or MongoDB)]
    
    Users -->|HTTPS| CDN
    CDN --> Frontend
    Frontend -->|REST API| Backend
    Backend --> Storage
    
    style Users fill:#4CAF50,stroke:#2E7D32,stroke-width:2px,color:#fff
    style CDN fill:#2196F3,stroke:#1565C0,stroke-width:2px,color:#fff
    style Frontend fill:#FF9800,stroke:#E65100,stroke-width:2px,color:#fff
    style Backend fill:#9C27B0,stroke:#6A1B9A,stroke-width:2px,color:#fff
    style Storage fill:#F44336,stroke:#C62828,stroke-width:2px,color:#fff
```

## Security Considerations

1. **CORS Configuration**: Allows frontend origin only
2. **Input Validation**: Pydantic models validate all inputs
3. **SQL Injection**: Not applicable (JSON storage)
4. **XSS Protection**: React escapes output by default
5. **CSRF**: Token-based protection (future)
6. **HTTPS**: Required in production
7. **Rate Limiting**: To be implemented

## Scalability Features

1. **Stateless Backend**: Easy horizontal scaling
2. **CDN Integration**: Static assets cached
3. **Database Ready**: MongoDB migration path
4. **Microservices**: Can split into separate services
5. **Load Balancing**: Multiple backend instances
6. **Caching**: Redis integration ready

## Performance Optimizations

1. **Frontend**:
   - Code splitting (Next.js automatic)
   - Image optimization
   - Lazy loading components
   - Memoization (React.memo)

2. **Backend**:
   - Async operations (FastAPI)
   - Connection pooling (future with MongoDB)
   - Response caching
   - Gzip compression

3. **Network**:
   - HTTP/2 support
   - CDN for static assets
   - API response compression
   - Efficient JSON serialization

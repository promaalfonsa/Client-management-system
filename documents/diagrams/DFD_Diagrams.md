# Client Management & Service Record System
## Data Flow Diagrams (DFD)

### Context Diagram (Level 0)

```mermaid
graph TB
    Client[Client/Customer]
    Tech[Technician]
    Admin[Admin/Manager]
    
    System[Client Management<br/>& Service Record<br/>System]
    
    Client -->|Device Details<br/>Contact Info| System
    System -->|Service Status<br/>Invoice<br/>SMS Updates| Client
    
    Tech -->|Repair Status<br/>Time Logs| System
    System -->|Work Assignments<br/>Device Info| Tech
    
    Admin -->|Manage Users<br/>Reports Request| System
    System -->|Analytics<br/>Reports<br/>Revenue Data| Admin
    
    style System fill:#4A90E2,stroke:#2E5C8A,stroke-width:3px,color:#fff
    style Client fill:#50C878,stroke:#2E7D4E,stroke-width:2px
    style Tech fill:#FFB347,stroke:#CC8A38,stroke-width:2px
    style Admin fill:#9B59B6,stroke:#6C3483,stroke-width:2px
```

### Level 1 DFD - Main Processes

```mermaid
graph TB
    subgraph External_Entities
        Client[Client]
        Tech[Technician]
        Admin[Admin]
    end
    
    subgraph Data_Stores
        DS1[(Client Database)]
        DS2[(Device Database)]
        DS3[(Technician Database)]
        DS4[(Invoice Database)]
        DS5[(SMS Log)]
    end
    
    P1[1.0<br/>Manage Clients]
    P2[2.0<br/>Process Device<br/>Intake]
    P3[3.0<br/>Assign & Track<br/>Repairs]
    P4[4.0<br/>Generate<br/>Invoices]
    P5[5.0<br/>Send SMS<br/>Updates]
    P6[6.0<br/>Generate<br/>Reports]
    
    Client -->|Client Info| P1
    P1 -->|Client Data| DS1
    
    Client -->|Device Info| P2
    P2 -->|Device Data| DS2
    DS1 -.->|Client Details| P2
    
    Admin -->|Assignment| P3
    P3 -->|Update Status| DS2
    DS3 -.->|Tech Info| P3
    P3 -->|Work Order| Tech
    Tech -->|Status Update| P3
    
    DS2 -.->|Device Cost| P4
    P4 -->|Invoice| DS4
    P4 -->|Invoice PDF| Client
    
    DS2 -.->|Device Status| P5
    DS1 -.->|Client Contact| P5
    P5 -->|SMS Log| DS5
    P5 -->|SMS Message| Client
    
    Admin -->|Report Request| P6
    DS1 -.->|Client Data| P6
    DS2 -.->|Device Data| P6
    DS4 -.->|Invoice Data| P6
    P6 -->|Analytics| Admin
    
    style P1 fill:#4A90E2,stroke:#2E5C8A,stroke-width:2px,color:#fff
    style P2 fill:#4A90E2,stroke:#2E5C8A,stroke-width:2px,color:#fff
    style P3 fill:#4A90E2,stroke:#2E5C8A,stroke-width:2px,color:#fff
    style P4 fill:#4A90E2,stroke:#2E5C8A,stroke-width:2px,color:#fff
    style P5 fill:#4A90E2,stroke:#2E5C8A,stroke-width:2px,color:#fff
    style P6 fill:#4A90E2,stroke:#2E5C8A,stroke-width:2px,color:#fff
```

### Level 2 DFD - Device Repair Process (Process 3.0)

```mermaid
graph TB
    subgraph Data_Stores
        DS2[(Device Database)]
        DS3[(Technician Database)]
        DS5[(SMS Log)]
    end
    
    Tech[Technician]
    Client[Client]
    Admin[Admin]
    
    P31[3.1<br/>Assign Technician]
    P32[3.2<br/>Update Repair<br/>Status]
    P33[3.3<br/>Track Repair<br/>Progress]
    P34[3.4<br/>Mark Complete]
    P35[3.5<br/>Notify Client]
    
    Admin -->|Assignment Request| P31
    DS3 -.->|Available Techs| P31
    P31 -->|Assign Tech| DS2
    
    Tech -->|Status Update| P32
    P32 -->|Update Status| DS2
    DS2 -.->|Current Status| P32
    
    DS2 -.->|Repair Data| P33
    P33 -->|Progress Report| Admin
    
    Tech -->|Completion Info| P34
    P34 -->|Mark Completed| DS2
    P34 -->|Trigger Notification| P35
    
    DS2 -.->|Device Details| P35
    P35 -->|SMS Notification| Client
    P35 -->|Log| DS5
    
    style P31 fill:#50C878,stroke:#2E7D4E,stroke-width:2px,color:#fff
    style P32 fill:#50C878,stroke:#2E7D4E,stroke-width:2px,color:#fff
    style P33 fill:#50C878,stroke:#2E7D4E,stroke-width:2px,color:#fff
    style P34 fill:#50C878,stroke:#2E7D4E,stroke-width:2px,color:#fff
    style P35 fill:#50C878,stroke:#2E7D4E,stroke-width:2px,color:#fff
```

---

## How to View Diagrams

These diagrams use Mermaid syntax. To view them:

1. **GitHub**: Automatically renders in .md files
2. **VS Code**: Install "Markdown Preview Mermaid Support" extension
3. **Online**: Use https://mermaid.live/
4. **Export**: Use mermaid-cli to export as PNG/SVG

## Diagram Descriptions

### Context Diagram
Shows the system boundary and external entities (Clients, Technicians, Admin) interacting with the system.

### Level 1 DFD
Breaks down the system into 6 major processes:
1. Manage Clients
2. Process Device Intake
3. Assign & Track Repairs
4. Generate Invoices
5. Send SMS Updates
6. Generate Reports

### Level 2 DFD (Device Repair Process)
Detailed breakdown of the repair workflow showing how technicians are assigned, status is tracked, and clients are notified.

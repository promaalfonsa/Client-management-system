#!/usr/bin/env python3
"""
Generate diagram images for the Client Management System documentation
"""

import matplotlib.pyplot as plt
import matplotlib.patches as mpatches
from matplotlib.patches import FancyBboxPatch, FancyArrowPatch
import numpy as np

# Create diagrams directory
import os
os.makedirs('images', exist_ok=True)

# Set style
plt.style.use('default')
plt.rcParams['font.size'] = 10
plt.rcParams['font.family'] = 'sans-serif'

#############################################
# 1. CONTEXT DIAGRAM (DFD Level 0)
#############################################
fig, ax = plt.subplots(1, 1, figsize=(14, 10))
ax.set_xlim(0, 10)
ax.set_ylim(0, 10)
ax.axis('off')

# Central System
system = FancyBboxPatch((3.5, 4), 3, 2, 
                        boxstyle="round,pad=0.1", 
                        edgecolor='#2E5C8A', 
                        facecolor='#4A90E2', 
                        linewidth=3)
ax.add_patch(system)
ax.text(5, 5, 'Client Management\n& Service Record\nSystem', 
        ha='center', va='center', fontsize=14, weight='bold', color='white')

# External Entities
# Client
client = FancyBboxPatch((0.5, 7), 1.5, 1.2, 
                        boxstyle="round,pad=0.05", 
                        edgecolor='#2E7D4E', 
                        facecolor='#50C878', 
                        linewidth=2)
ax.add_patch(client)
ax.text(1.25, 7.6, 'Client/\nCustomer', ha='center', va='center', fontsize=11, weight='bold')

# Technician
tech = FancyBboxPatch((8, 7), 1.5, 1.2, 
                      boxstyle="round,pad=0.05", 
                      edgecolor='#CC8A38', 
                      facecolor='#FFB347', 
                      linewidth=2)
ax.add_patch(tech)
ax.text(8.75, 7.6, 'Technician', ha='center', va='center', fontsize=11, weight='bold')

# Admin
admin = FancyBboxPatch((4.25, 1), 1.5, 1.2, 
                       boxstyle="round,pad=0.05", 
                       edgecolor='#6C3483', 
                       facecolor='#9B59B6', 
                       linewidth=2)
ax.add_patch(admin)
ax.text(5, 1.6, 'Admin/\nManager', ha='center', va='center', fontsize=11, weight='bold')

# Arrows - Client to System
ax.annotate('', xy=(3.8, 5.5), xytext=(2, 7.4),
            arrowprops=dict(arrowstyle='->', lw=2, color='#2E7D4E'))
ax.text(2.5, 6.8, 'Device Details\nContact Info', fontsize=9, ha='center')

ax.annotate('', xy=(2.3, 7.8), xytext=(3.5, 5.7),
            arrowprops=dict(arrowstyle='->', lw=2, color='#4A90E2'))
ax.text(2.5, 7, 'Service Status\nInvoice\nSMS Updates', fontsize=9, ha='center')

# Arrows - Tech to System
ax.annotate('', xy=(6.5, 5.5), xytext=(8, 7.4),
            arrowprops=dict(arrowstyle='->', lw=2, color='#CC8A38'))
ax.text(7.5, 6.8, 'Repair Status\nTime Logs', fontsize=9, ha='center')

ax.annotate('', xy=(8.3, 7.8), xytext=(6.5, 5.7),
            arrowprops=dict(arrowstyle='->', lw=2, color='#4A90E2'))
ax.text(7.8, 7, 'Work Assignments\nDevice Info', fontsize=9, ha='center')

# Arrows - Admin to System
ax.annotate('', xy=(5, 4), xytext=(5, 2.2),
            arrowprops=dict(arrowstyle='->', lw=2, color='#6C3483'))
ax.text(4.2, 3, 'Manage Users\nReports Request', fontsize=9, ha='center')

ax.annotate('', xy=(5.5, 2.2), xytext=(5.5, 4),
            arrowprops=dict(arrowstyle='->', lw=2, color='#4A90E2'))
ax.text(6.5, 3, 'Analytics\nReports\nRevenue Data', fontsize=9, ha='center')

plt.title('Context Diagram (DFD Level 0)\nClient Management & Service Record System', 
          fontsize=16, weight='bold', pad=20)
plt.tight_layout()
plt.savefig('images/Context_Diagram.png', dpi=300, bbox_inches='tight', facecolor='white')
plt.close()

print("✓ Created Context_Diagram.png")

#############################################
# 2. ER DIAGRAM
#############################################
fig, ax = plt.subplots(1, 1, figsize=(16, 12))
ax.set_xlim(0, 10)
ax.set_ylim(0, 10)
ax.axis('off')

# Entities
entities = [
    {'name': 'CLIENT', 'pos': (2, 7.5), 'attrs': ['id', 'name', 'email', 'phone', 'address', 'company']},
    {'name': 'TECHNICIAN', 'pos': (8, 7.5), 'attrs': ['id', 'name', 'email', 'phone', 'specialization', 'active']},
    {'name': 'DEVICE', 'pos': (5, 5), 'attrs': ['id', 'device_type', 'brand', 'model', 'status', 'priority', 'cost']},
    {'name': 'INVOICE', 'pos': (2, 2.5), 'attrs': ['id', 'amount', 'description', 'paid']},
    {'name': 'SMS_UPDATE', 'pos': (8, 2.5), 'attrs': ['id', 'message', 'sent_at']},
]

for entity in entities:
    # Entity box
    box = FancyBboxPatch((entity['pos'][0]-0.8, entity['pos'][1]-0.3), 1.6, 0.6,
                         boxstyle="round,pad=0.05",
                         edgecolor='#2E5C8A',
                         facecolor='#E3F2FD',
                         linewidth=2)
    ax.add_patch(box)
    ax.text(entity['pos'][0], entity['pos'][1], entity['name'],
            ha='center', va='center', fontsize=12, weight='bold')
    
    # Attributes below
    attr_text = '\n'.join(entity['attrs'][:4])
    if len(entity['attrs']) > 4:
        attr_text += '\n...'
    ax.text(entity['pos'][0], entity['pos'][1]-0.8, attr_text,
            ha='center', va='top', fontsize=8, style='italic')

# Relationships
# CLIENT -> DEVICE (1:N)
ax.annotate('', xy=(4.2, 5.2), xytext=(2.8, 7.3),
            arrowprops=dict(arrowstyle='->', lw=2, color='#2E7D4E'))
ax.text(3.2, 6.5, 'owns', fontsize=10, ha='center', style='italic',
        bbox=dict(boxstyle='round,pad=0.3', facecolor='white', edgecolor='#2E7D4E'))
ax.text(3.5, 7, '1', fontsize=9, weight='bold')
ax.text(4, 5.5, 'N', fontsize=9, weight='bold')

# TECHNICIAN -> DEVICE (1:N)
ax.annotate('', xy=(5.8, 5.2), xytext=(7.2, 7.3),
            arrowprops=dict(arrowstyle='->', lw=2, color='#CC8A38'))
ax.text(6.8, 6.5, 'repairs', fontsize=10, ha='center', style='italic',
        bbox=dict(boxstyle='round,pad=0.3', facecolor='white', edgecolor='#CC8A38'))
ax.text(6.5, 7, '1', fontsize=9, weight='bold')
ax.text(6, 5.5, 'N', fontsize=9, weight='bold')

# DEVICE -> INVOICE (1:1)
ax.annotate('', xy=(3, 3), xytext=(4.5, 4.5),
            arrowprops=dict(arrowstyle='->', lw=2, color='#9B59B6'))
ax.text(3.5, 4, 'generates', fontsize=10, ha='center', style='italic',
        bbox=dict(boxstyle='round,pad=0.3', facecolor='white', edgecolor='#9B59B6'))
ax.text(4.3, 4.3, '1', fontsize=9, weight='bold')
ax.text(3.2, 3.2, '1', fontsize=9, weight='bold')

# CLIENT -> INVOICE (1:N)
ax.annotate('', xy=(2, 3.1), xytext=(2, 7.2),
            arrowprops=dict(arrowstyle='->', lw=2, color='#E74C3C'))
ax.text(1.5, 5, 'receives', fontsize=10, ha='center', style='italic',
        bbox=dict(boxstyle='round,pad=0.3', facecolor='white', edgecolor='#E74C3C'))
ax.text(1.7, 7, '1', fontsize=9, weight='bold')
ax.text(1.7, 3.3, 'N', fontsize=9, weight='bold')

# DEVICE -> SMS_UPDATE (1:N)
ax.annotate('', xy=(7, 3), xytext=(5.5, 4.5),
            arrowprops=dict(arrowstyle='->', lw=2, color='#3498DB'))
ax.text(6.5, 4, 'triggers', fontsize=10, ha='center', style='italic',
        bbox=dict(boxstyle='round,pad=0.3', facecolor='white', edgecolor='#3498DB'))
ax.text(5.7, 4.3, '1', fontsize=9, weight='bold')
ax.text(6.8, 3.2, 'N', fontsize=9, weight='bold')

# CLIENT -> SMS_UPDATE (1:N)
ax.annotate('', xy=(7.2, 3), xytext=(2.8, 7.2),
            arrowprops=dict(arrowstyle='->', lw=2, color='#F39C12', linestyle='dashed'))
ax.text(5, 5.8, 'receives', fontsize=10, ha='center', style='italic',
        bbox=dict(boxstyle='round,pad=0.3', facecolor='white', edgecolor='#F39C12'))

plt.title('Entity Relationship Diagram (ERD)\nClient Management System Database', 
          fontsize=16, weight='bold', pad=20)

# Legend
legend_elements = [
    mpatches.Patch(facecolor='#E3F2FD', edgecolor='#2E5C8A', label='Entity'),
    mpatches.FancyArrow(0, 0, 1, 0, width=0.3, color='#2E7D4E', label='1:N Relationship'),
    mpatches.FancyArrow(0, 0, 1, 0, width=0.3, color='#9B59B6', label='1:1 Relationship'),
]
ax.legend(handles=legend_elements, loc='upper right', fontsize=10)

plt.tight_layout()
plt.savefig('images/ER_Diagram.png', dpi=300, bbox_inches='tight', facecolor='white')
plt.close()

print("✓ Created ER_Diagram.png")

#############################################
# 3. SYSTEM ARCHITECTURE
#############################################
fig, ax = plt.subplots(1, 1, figsize=(16, 14))
ax.set_xlim(0, 10)
ax.set_ylim(0, 12)
ax.axis('off')

# Layer positions
layers = [
    {'name': 'Client Layer\n(Browser)', 'y': 10.5, 'color': '#E3F2FD', 'edge': '#1976D2'},
    {'name': 'Presentation Layer\n(Pages & Components)', 'y': 9, 'color': '#F3E5F5', 'edge': '#7B1FA2'},
    {'name': 'Application Layer\n(State & API Client)', 'y': 7.5, 'color': '#E8F5E9', 'edge': '#388E3C'},
    {'name': 'API Gateway\n(FastAPI)', 'y': 6, 'color': '#FFF3E0', 'edge': '#F57C00'},
    {'name': 'Business Logic Layer\n(Models & Services)', 'y': 4.5, 'color': '#FCE4EC', 'edge': '#C2185B'},
    {'name': 'Data Access Layer\n(JSON Handler)', 'y': 3, 'color': '#E0F2F1', 'edge': '#00796B'},
    {'name': 'Data Storage\n(JSON Files)', 'y': 1.5, 'color': '#FFF9C4', 'edge': '#F57F17'},
]

for layer in layers:
    box = FancyBboxPatch((1, layer['y']-0.4), 8, 0.8,
                         boxstyle="round,pad=0.05",
                         edgecolor=layer['edge'],
                         facecolor=layer['color'],
                         linewidth=2)
    ax.add_patch(box)
    ax.text(5, layer['y'], layer['name'],
            ha='center', va='center', fontsize=11, weight='bold')

# Arrows between layers
for i in range(len(layers)-1):
    ax.annotate('', xy=(5, layers[i+1]['y']+0.4), xytext=(5, layers[i]['y']-0.4),
                arrowprops=dict(arrowstyle='<->', lw=2, color='#34495E'))

# Components on the side
components = [
    {'name': 'Next.js 14\nReact 19\nTypeScript', 'y': 10.5, 'x': 9.5},
    {'name': 'Tailwind CSS\nFramer Motion\nLucide Icons', 'y': 9, 'x': 9.5},
    {'name': 'Axios\nState Hooks\nUtils', 'y': 7.5, 'x': 9.5},
    {'name': 'Uvicorn\nCORS\nRoutes', 'y': 6, 'x': 9.5},
    {'name': 'Pydantic\nReportLab\nServices', 'y': 4.5, 'x': 9.5},
    {'name': 'CRUD\nOperations', 'y': 3, 'x': 9.5},
    {'name': 'clients.json\ndevices.json\ninvoices.json', 'y': 1.5, 'x': 9.5},
]

for comp in components:
    ax.text(comp['x'], comp['y'], comp['name'],
            ha='left', va='center', fontsize=8, style='italic',
            bbox=dict(boxstyle='round,pad=0.3', facecolor='white', edgecolor='gray', alpha=0.7))

plt.title('System Architecture - 3-Tier Design\nClient Management & Service Record System', 
          fontsize=16, weight='bold', pad=20)

# Add note
ax.text(5, 0.3, 'Migration Path: JSON Files → MongoDB (Future)',
        ha='center', va='center', fontsize=10, style='italic',
        bbox=dict(boxstyle='round,pad=0.5', facecolor='#ECEFF1', edgecolor='#455A64'))

plt.tight_layout()
plt.savefig('images/System_Architecture.png', dpi=300, bbox_inches='tight', facecolor='white')
plt.close()

print("✓ Created System_Architecture.png")

#############################################
# 4. USE CASE DIAGRAM
#############################################
fig, ax = plt.subplots(1, 1, figsize=(16, 12))
ax.set_xlim(0, 10)
ax.set_ylim(0, 10)
ax.axis('off')

# System boundary
system_box = FancyBboxPatch((2, 1), 6, 8,
                            boxstyle="round,pad=0.1",
                            edgecolor='#34495E',
                            facecolor='#ECF0F1',
                            linewidth=3,
                            linestyle='--',
                            alpha=0.3)
ax.add_patch(system_box)
ax.text(5, 8.7, 'Client Management & Service Record System',
        ha='center', va='center', fontsize=14, weight='bold')

# Use cases
use_cases = [
    {'name': 'Manage\nClients', 'pos': (3.5, 7)},
    {'name': 'Register\nDevice', 'pos': (6.5, 7)},
    {'name': 'Track\nStatus', 'pos': (3.5, 5.5)},
    {'name': 'Assign\nTechnician', 'pos': (6.5, 5.5)},
    {'name': 'Update\nProgress', 'pos': (3.5, 4)},
    {'name': 'Generate\nInvoice', 'pos': (6.5, 4)},
    {'name': 'Send SMS\nUpdates', 'pos': (3.5, 2.5)},
    {'name': 'Generate\nReports', 'pos': (6.5, 2.5)},
]

for uc in use_cases:
    ellipse = mpatches.Ellipse(uc['pos'], 1.2, 0.6,
                               edgecolor='#2E5C8A',
                               facecolor='#E3F2FD',
                               linewidth=1.5)
    ax.add_patch(ellipse)
    ax.text(uc['pos'][0], uc['pos'][1], uc['name'],
            ha='center', va='center', fontsize=9, weight='bold')

# Actors (stick figures represented as circles with text)
actors = [
    {'name': 'Client', 'pos': (0.8, 6), 'color': '#50C878'},
    {'name': 'Technician', 'pos': (0.8, 4), 'color': '#FFB347'},
    {'name': 'Admin', 'pos': (9.2, 5), 'color': '#9B59B6'},
]

for actor in actors:
    # Head
    circle = mpatches.Circle(actor['pos'], 0.25,
                            edgecolor=actor['color'],
                            facecolor=actor['color'],
                            linewidth=2)
    ax.add_patch(circle)
    # Body
    ax.plot([actor['pos'][0], actor['pos'][0]], 
            [actor['pos'][1]-0.25, actor['pos'][1]-0.6],
            color=actor['color'], linewidth=3)
    # Arms
    ax.plot([actor['pos'][0]-0.2, actor['pos'][0]+0.2], 
            [actor['pos'][1]-0.35, actor['pos'][1]-0.35],
            color=actor['color'], linewidth=3)
    # Legs
    ax.plot([actor['pos'][0], actor['pos'][0]-0.15], 
            [actor['pos'][1]-0.6, actor['pos'][1]-0.9],
            color=actor['color'], linewidth=3)
    ax.plot([actor['pos'][0], actor['pos'][0]+0.15], 
            [actor['pos'][1]-0.6, actor['pos'][1]-0.9],
            color=actor['color'], linewidth=3)
    # Name
    ax.text(actor['pos'][0], actor['pos'][1]-1.2, actor['name'],
            ha='center', va='center', fontsize=10, weight='bold')

# Connections (sample connections)
# Client to use cases
ax.plot([1.1, 2.9], [6, 7], 'k--', linewidth=1, alpha=0.5)
ax.plot([1.1, 2.9], [6, 5.5], 'k--', linewidth=1, alpha=0.5)

# Technician to use cases
ax.plot([1.1, 2.9], [4, 4], 'k--', linewidth=1, alpha=0.5)
ax.plot([1.1, 2.9], [4, 5.5], 'k--', linewidth=1, alpha=0.5)

# Admin to multiple use cases
ax.plot([8.9, 7.1], [5, 7], 'k--', linewidth=1, alpha=0.5)
ax.plot([8.9, 7.1], [5, 5.5], 'k--', linewidth=1, alpha=0.5)
ax.plot([8.9, 7.1], [5, 4], 'k--', linewidth=1, alpha=0.5)
ax.plot([8.9, 7.1], [5, 2.5], 'k--', linewidth=1, alpha=0.5)

plt.title('Use Case Diagram\nClient Management & Service Record System', 
          fontsize=16, weight='bold', pad=20)

plt.tight_layout()
plt.savefig('images/Use_Case_Diagram.png', dpi=300, bbox_inches='tight', facecolor='white')
plt.close()

print("✓ Created Use_Case_Diagram.png")

#############################################
# 5. DFD LEVEL 1
#############################################
fig, ax = plt.subplots(1, 1, figsize=(16, 12))
ax.set_xlim(0, 10)
ax.set_ylim(0, 10)
ax.axis('off')

# Processes (circles)
processes = [
    {'id': '1.0', 'name': 'Manage\nClients', 'pos': (2, 7.5)},
    {'id': '2.0', 'name': 'Process\nDevice Intake', 'pos': (5, 8.5)},
    {'id': '3.0', 'name': 'Assign &\nTrack Repairs', 'pos': (8, 7.5)},
    {'id': '4.0', 'name': 'Generate\nInvoices', 'pos': (2, 4)},
    {'id': '5.0', 'name': 'Send SMS\nUpdates', 'pos': (5, 3)},
    {'id': '6.0', 'name': 'Generate\nReports', 'pos': (8, 4)},
]

for proc in processes:
    circle = mpatches.Circle(proc['pos'], 0.6,
                            edgecolor='#2E5C8A',
                            facecolor='#4A90E2',
                            linewidth=2)
    ax.add_patch(circle)
    ax.text(proc['pos'][0], proc['pos'][1]+0.15, proc['id'],
            ha='center', va='center', fontsize=10, weight='bold', color='white')
    ax.text(proc['pos'][0], proc['pos'][1]-0.15, proc['name'],
            ha='center', va='center', fontsize=8, color='white')

# Data stores (parallel lines)
data_stores = [
    {'name': 'D1: Clients', 'pos': (2, 2)},
    {'name': 'D2: Devices', 'pos': (5, 1.5)},
    {'name': 'D3: Technicians', 'pos': (8, 2)},
    {'name': 'D4: Invoices', 'pos': (2, 5.5)},
    {'name': 'D5: SMS Logs', 'pos': (5, 5)},
]

for ds in data_stores:
    ax.plot([ds['pos'][0]-0.8, ds['pos'][0]+0.8], 
            [ds['pos'][1], ds['pos'][1]], 'k-', linewidth=2)
    ax.plot([ds['pos'][0]-0.8, ds['pos'][0]+0.8], 
            [ds['pos'][1]-0.15, ds['pos'][1]-0.15], 'k-', linewidth=2)
    ax.text(ds['pos'][0], ds['pos'][1]-0.075, ds['name'],
            ha='center', va='center', fontsize=9, weight='bold')

# External entities (rectangles)
externals = [
    {'name': 'Client', 'pos': (0.5, 7.5), 'color': '#50C878'},
    {'name': 'Technician', 'pos': (9.5, 7.5), 'color': '#FFB347'},
    {'name': 'Admin', 'pos': (5, 9.5), 'color': '#9B59B6'},
]

for ext in externals:
    box = FancyBboxPatch((ext['pos'][0]-0.4, ext['pos'][1]-0.25), 0.8, 0.5,
                         boxstyle="round,pad=0.02",
                         edgecolor=ext['color'],
                         facecolor='white',
                         linewidth=2)
    ax.add_patch(box)
    ax.text(ext['pos'][0], ext['pos'][1], ext['name'],
            ha='center', va='center', fontsize=9, weight='bold')

# Sample arrows (simplified)
ax.annotate('', xy=(1.5, 7.5), xytext=(0.9, 7.5),
            arrowprops=dict(arrowstyle='->', lw=1.5, color='#2E7D4E'))
ax.annotate('', xy=(8.5, 7.5), xytext=(9.1, 7.5),
            arrowprops=dict(arrowstyle='->', lw=1.5, color='#CC8A38'))
ax.annotate('', xy=(5, 9), xytext=(5, 8.9),
            arrowprops=dict(arrowstyle='->', lw=1.5, color='#6C3483'))

plt.title('Data Flow Diagram Level 1\nClient Management System - Main Processes', 
          fontsize=16, weight='bold', pad=20)

# Legend
legend_elements = [
    mpatches.Circle((0, 0), 0.2, facecolor='#4A90E2', edgecolor='#2E5C8A', label='Process'),
    mpatches.Rectangle((0, 0), 0.5, 0.2, facecolor='white', edgecolor='black', label='External Entity'),
    mpatches.Rectangle((0, 0), 0.5, 0.05, facecolor='white', edgecolor='black', label='Data Store'),
]
ax.legend(handles=legend_elements, loc='lower left', fontsize=10)

plt.tight_layout()
plt.savefig('images/DFD_Level1.png', dpi=300, bbox_inches='tight', facecolor='white')
plt.close()

print("✓ Created DFD_Level1.png")

print("\n✅ All diagram images created successfully in 'images/' directory!")
print("   - Context_Diagram.png")
print("   - ER_Diagram.png")
print("   - System_Architecture.png")
print("   - Use_Case_Diagram.png")
print("   - DFD_Level1.png")

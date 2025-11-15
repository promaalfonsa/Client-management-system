#!/usr/bin/env python3
"""
Convert markdown documentation to DOCX format
"""

from docx import Document
from docx.shared import Inches, Pt, RGBColor
from docx.enum.text import WD_ALIGN_PARAGRAPH
from docx.enum.style import WD_STYLE_TYPE
import re
import os

def parse_markdown_to_docx(md_file, docx_file, title):
    """Convert markdown file to DOCX with proper formatting"""
    
    # Create document
    doc = Document()
    
    # Set document styles
    style = doc.styles['Normal']
    font = style.font
    font.name = 'Calibri'
    font.size = Pt(11)
    
    # Add title
    title_para = doc.add_heading(title, 0)
    title_para.alignment = WD_ALIGN_PARAGRAPH.CENTER
    
    # Read markdown file
    with open(md_file, 'r', encoding='utf-8') as f:
        content = f.read()
    
    # Split into lines
    lines = content.split('\n')
    
    i = 0
    in_code_block = False
    code_language = ''
    code_lines = []
    in_table = False
    table_data = []
    
    while i < len(lines):
        line = lines[i]
        
        # Skip YAML frontmatter or metadata
        if i == 0 and line.startswith('---'):
            while i < len(lines) and not (i > 0 and lines[i].startswith('---')):
                i += 1
            i += 1
            continue
        
        # Code blocks
        if line.startswith('```'):
            if not in_code_block:
                in_code_block = True
                code_language = line[3:].strip()
                code_lines = []
            else:
                in_code_block = False
                # Add code block
                code_text = '\n'.join(code_lines)
                p = doc.add_paragraph(code_text)
                p.style = 'Intense Quote'
                for run in p.runs:
                    run.font.name = 'Courier New'
                    run.font.size = Pt(9)
                code_lines = []
            i += 1
            continue
        
        if in_code_block:
            code_lines.append(line)
            i += 1
            continue
        
        # Headers
        if line.startswith('#'):
            level = len(re.match(r'^#+', line).group())
            text = line.lstrip('#').strip()
            if text:  # Skip empty headers
                doc.add_heading(text, level)
            i += 1
            continue
        
        # Tables
        if '|' in line and line.strip().startswith('|'):
            if not in_table:
                in_table = True
                table_data = []
            
            # Parse table row
            cells = [cell.strip() for cell in line.split('|')[1:-1]]
            table_data.append(cells)
            
            i += 1
            # Check if next line is separator or not a table
            if i < len(lines):
                next_line = lines[i]
                if not ('|' in next_line and next_line.strip().startswith('|')):
                    # End of table
                    in_table = False
                    # Create table (skip separator rows with ---)
                    clean_data = [row for row in table_data if not all('---' in cell or cell == '' for cell in row)]
                    if clean_data:
                        table = doc.add_table(rows=len(clean_data), cols=len(clean_data[0]))
                        table.style = 'Light Grid Accent 1'
                        
                        for row_idx, row_data in enumerate(clean_data):
                            for col_idx, cell_data in enumerate(row_data):
                                cell = table.rows[row_idx].cells[col_idx]
                                cell.text = cell_data
                                # Bold header row
                                if row_idx == 0:
                                    for paragraph in cell.paragraphs:
                                        for run in paragraph.runs:
                                            run.font.bold = True
                        
                        doc.add_paragraph()  # Add space after table
                    table_data = []
            continue
        
        # Lists
        if line.strip().startswith('- ') or line.strip().startswith('* '):
            text = line.strip()[2:]
            # Check for checkboxes
            if text.startswith('[x]') or text.startswith('[ ]'):
                checked = text.startswith('[x]')
                text = text[3:].strip()
                symbol = '☑' if checked else '☐'
                doc.add_paragraph(f'{symbol} {text}', style='List Bullet')
            else:
                doc.add_paragraph(text, style='List Bullet')
            i += 1
            continue
        
        if re.match(r'^\d+\.', line.strip()):
            text = re.sub(r'^\d+\.\s*', '', line.strip())
            doc.add_paragraph(text, style='List Number')
            i += 1
            continue
        
        # Horizontal rules
        if line.strip() in ['---', '***', '___']:
            doc.add_paragraph('_' * 50)
            i += 1
            continue
        
        # Bold and italic
        if line.strip():
            # Skip mermaid diagrams
            if 'mermaid' in line or 'graph' in line:
                i += 1
                continue
            
            p = doc.add_paragraph()
            
            # Process inline formatting
            text = line
            
            # Handle bold **text**
            while '**' in text:
                before = text.split('**')[0]
                if before:
                    p.add_run(before)
                
                if text.count('**') >= 2:
                    bold_text = text.split('**')[1]
                    run = p.add_run(bold_text)
                    run.bold = True
                    text = '**'.join(text.split('**')[2:])
                else:
                    p.add_run('**' + '**'.join(text.split('**')[1:]))
                    break
            
            if '**' not in line:
                p.add_run(text)
        else:
            # Empty line - add paragraph break
            doc.add_paragraph()
        
        i += 1
    
    # Add page break before saving
    doc.add_page_break()
    
    # Save document
    doc.save(docx_file)
    print(f"✓ Created {docx_file}")

# Create DOCX files
print("Converting markdown files to DOCX...\n")

# List of documents to convert
documents = [
    {
        'md': 'BRD_SRS_Document.md',
        'docx': 'BRD_SRS_Document.docx',
        'title': 'Business Requirements Document (BRD) & Software Requirements Specification (SRS)'
    },
    {
        'md': 'Work_Structure.md',
        'docx': 'Work_Structure.docx',
        'title': 'Project Work Structure & Team Assignment'
    },
    {
        'md': 'diagrams/DFD_Diagrams.md',
        'docx': 'DFD_Diagrams.docx',
        'title': 'Data Flow Diagrams (DFD)'
    },
    {
        'md': 'diagrams/ER_Diagram.md',
        'docx': 'ER_Diagram.docx',
        'title': 'Entity Relationship Diagram (ERD)'
    },
    {
        'md': 'diagrams/System_Architecture.md',
        'docx': 'System_Architecture.docx',
        'title': 'System Architecture'
    },
    {
        'md': 'diagrams/Use_Case_Diagram.md',
        'docx': 'Use_Case_Diagram.docx',
        'title': 'Use Case Diagram'
    },
    {
        'md': 'diagrams/Database_Schema.md',
        'docx': 'Database_Schema.docx',
        'title': 'Database Schema'
    },
]

for doc_info in documents:
    if os.path.exists(doc_info['md']):
        parse_markdown_to_docx(doc_info['md'], doc_info['docx'], doc_info['title'])
    else:
        print(f"⚠ Warning: {doc_info['md']} not found, skipping...")

print("\n✅ All DOCX documents created successfully!")
print("\nCreated files:")
print("   - BRD_SRS_Document.docx")
print("   - Work_Structure.docx")
print("   - DFD_Diagrams.docx")
print("   - ER_Diagram.docx")
print("   - System_Architecture.docx")
print("   - Use_Case_Diagram.docx")
print("   - Database_Schema.docx")

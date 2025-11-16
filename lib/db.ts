import fs from 'fs';
import path from 'path';

const DATA_DIR = path.join(process.cwd(), 'data');

// Ensure data directory exists
if (!fs.existsSync(DATA_DIR)) {
  fs.mkdirSync(DATA_DIR, { recursive: true });
}

export function loadData<T>(filename: string): T[] {
  const filePath = path.join(DATA_DIR, filename);
  if (fs.existsSync(filePath)) {
    const data = fs.readFileSync(filePath, 'utf-8');
    return JSON.parse(data);
  }
  return [];
}

export function saveData<T>(filename: string, data: T[]): void {
  const filePath = path.join(DATA_DIR, filename);
  fs.writeFileSync(filePath, JSON.stringify(data, null, 2));
}

export function findById<T extends { id: string }>(data: T[], id: string): T | undefined {
  return data.find(item => item.id === id);
}

export function updateById<T extends { id: string }>(data: T[], id: string, updatedItem: T): T[] {
  return data.map(item => item.id === id ? updatedItem : item);
}

export function deleteById<T extends { id: string }>(data: T[], id: string): T[] {
  return data.filter(item => item.id !== id);
}

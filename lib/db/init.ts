import { sql } from '@vercel/postgres';
import fs from 'fs';
import path from 'path';

export async function initDatabase() {
  try {
    // Read the schema file
    const schemaPath = path.join(process.cwd(), 'lib', 'db', 'schema.sql');
    const schema = fs.readFileSync(schemaPath, 'utf8');

    // Split the schema into individual statements
    const statements = schema
      .split(';')
      .map(s => s.trim())
      .filter(s => s.length > 0);

    // Execute each statement
    for (const statement of statements) {
      await sql.query(statement + ';');
    }

    console.log('Database initialized successfully');
  } catch (error) {
    console.error('Failed to initialize database:', error);
    throw error;
  }
} 
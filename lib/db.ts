import { DatabaseSync } from "node:sqlite";
import path from "path";

// Initialize the database
const dbPath = path.join(process.cwd(), "data.db");
export const db = new DatabaseSync(dbPath);

// Create the table if it doesn't exist
export function initDatabase() {
  const createTableQuery = `
    CREATE TABLE IF NOT EXISTS users (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      name TEXT NOT NULL,
      email TEXT NOT NULL,
      created_at DATETIME DEFAULT CURRENT_TIMESTAMP
    )
  `;
  
  db.exec(createTableQuery);
  console.log("Database initialized successfully");
}

// Initialize on module load
initDatabase();

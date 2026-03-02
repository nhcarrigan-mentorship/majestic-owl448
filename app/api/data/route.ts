import { NextRequest, NextResponse } from "next/server";
import { db } from "@/lib/db";

// POST endpoint to add a row to the table
export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { name, email } = body;

    if (!name || !email) {
      return NextResponse.json(
        { error: "Name and email are required" },
        { status: 400 }
      );
    }

    const stmt = db.prepare("INSERT INTO users (name, email) VALUES (?, ?)");
    const result = stmt.run(name, email);

    return NextResponse.json(
      {
        success: true,
        id: result.lastInsertRowid,
        message: "User added successfully",
      },
      { status: 201 }
    );
  } catch (error) {
    console.error("Error adding user:", error);
    return NextResponse.json(
      { error: "Failed to add user" },
      { status: 500 }
    );
  }
}

// GET endpoint to retrieve data from the table
export async function GET() {
  try {
    const stmt = db.prepare("SELECT * FROM users ORDER BY created_at DESC");
    const users = stmt.all();

    return NextResponse.json(
      {
        success: true,
        data: users,
        count: users.length,
      },
      { status: 200 }
    );
  } catch (error) {
    console.error("Error fetching users:", error);
    return NextResponse.json(
      { error: "Failed to fetch users" },
      { status: 500 }
    );
  }
}

import { NextResponse } from "next/server";
import connectDB from "../../db/connectDB";
import mongoose from "mongoose";
import User from "../../models/User"; // Your schema is correctly exported and imported here.

export async function GET(request) {
  try {

    const search = request.nextUrl.searchParams.get("search");

    if (!search) {
      return NextResponse.json(
        { message: "Search query is required" },
        { status: 400 }
      );
    }

    // Ensure database connection
    await connectDB();
    // Query the database using the User model
    const users = await User.find({
      username: { $regex: search, $options: "i" }, // Case-insensitive regex search
    });

    if (users.length === 0) {
      return NextResponse.json(
        { message: "No users found" },
        { status: 404 }
      );
    }

    // Return the filtered users
    return NextResponse.json({ users }, { status: 200 });
  } catch (error) {
    console.error("Error fetching users:", error.message, error.stack);

    // Handle and return errors
    return NextResponse.json(
      {
        message: "Error fetching users",
        error: error.message,
      },
      { status: 500 }
    );
  }
}

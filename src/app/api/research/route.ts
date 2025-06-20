import { NextResponse } from 'next/server';
import connectToDatabase from '@/lib/mongodb';  // Connect to MongoDB using Mongoose
import Research from '@/lib/researchhelper';  // Your research model

export async function GET() {
  try {
    await connectToDatabase();  // Connect to MongoDB using Mongoose (connects to the database)

    // Fetch all research records from MongoDB
    const research = await Research.find({});
    
    // Return the research data as a JSON response
    return NextResponse.json(research);

  } catch (error: any) {
    console.error('🔥 Error fetching research:', error);

    // If an error occurs, return a 500 server error with the error message
    return NextResponse.json(
      { message: 'Server error', error: error.message || String(error) },
      { status: 500 }
    );
  }
}
    
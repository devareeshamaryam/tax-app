 // app/api/blogs/route.ts
import { NextResponse } from 'next/server';

// Yahan apna database ya data import karein
import { blogPosts } from '@/app/blog/blogData'; // Ya database se fetch karein

export async function GET() {
  try {
    return NextResponse.json({ 
      success: true, 
      data: blogPosts 
    });
  } catch (error) {
    return NextResponse.json(
      { success: false, error: 'Failed to fetch blogs' },
      { status: 500 }
    );
  }
}

export async function POST(request: Request) {
  try {
    const body = await request.json();
    // Blog create logic
    
    return NextResponse.json({ 
      success: true, 
      data: body 
    });
  } catch (error) {
    return NextResponse.json(
      { success: false, error: 'Failed to create blog' },
      { status: 500 }
    );
  }
}
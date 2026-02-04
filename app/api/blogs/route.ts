 // app/api/blogs/route.ts
import { NextResponse } from 'next/server';
import connectDB from '@/lib/db';
import Blog from '@/models/Blog';

// GET - Fetch all blogs
export async function GET() {
  try {
    await connectDB();
    const blogs = await Blog.find({}).sort({ createdAt: -1 });
    
    console.log(`✅ Fetched ${blogs.length} blogs from database`);
    
    return NextResponse.json({ 
      success: true, 
      data: blogs 
    });
  } catch (error: any) {
    console.error('❌ GET Error:', error);
    return NextResponse.json(
      { success: false, error: error.message || 'Failed to fetch blogs' },
      { status: 500 }
    );
  }
}

// POST - Create new blog
export async function POST(request: Request) {
  try {
    await connectDB();
    const body = await request.json();
    
    console.log('📝 Received blog data:', {
      title: body.title,
      hasImage: !!body.image,
      imageLength: body.image?.length
    });
    
    // Validation
    if (!body.title || !body.description || !body.image) {
      return NextResponse.json(
        { success: false, error: 'Title, description, and image are required' },
        { status: 400 }
      );
    }
    
    // Format date properly
    let formattedDate = body.publishedDate;
    if (body.publishedDate && body.publishedDate.includes('-')) {
      // Convert 2024-01-15 to January 15, 2024
      const date = new Date(body.publishedDate);
      formattedDate = date.toLocaleDateString('en-US', {
        year: 'numeric',
        month: 'long',
        day: 'numeric'
      });
    }
    
    // Create new blog
    const newBlog = await Blog.create({
      title: body.title,
      description: body.description,
      image: body.image,
      category: body.category || 'General',
      publishedDate: formattedDate || new Date().toLocaleDateString('en-US', {
        year: 'numeric',
        month: 'long',
        day: 'numeric'
      }),
    });
    
    console.log('✅ Blog created successfully:', newBlog._id);
    
    return NextResponse.json({ 
      success: true, 
      data: newBlog,
      message: 'Blog created successfully!'
    }, { status: 201 });
    
  } catch (error: any) {
    console.error('❌ POST Error:', error);
    return NextResponse.json(
      { 
        success: false, 
        error: error.message || 'Failed to create blog',
        details: error.toString()
      },
      { status: 500 }
    );
  }
}
 // app/api/blogs/[id]/route.ts
import { NextResponse } from 'next/server';
import connectDB from '@/lib/db';
import Blog from '@/models/Blog';

// GET - Fetch single blog by ID
export async function GET(
  request: Request,
  context: { params: Promise<{ id: string }> }
) {
  try {
    await connectDB();
    const { id } = await context.params;
    
    console.log(`🔍 Fetching blog with ID: ${id}`);
    
    const blog = await Blog.findById(id);
    
    if (!blog) {
      console.log('❌ Blog not found');
      return NextResponse.json(
        { success: false, error: 'Blog not found' },
        { status: 404 }
      );
    }

    console.log('✅ Blog found:', blog.title);
    
    return NextResponse.json({ 
      success: true, 
      data: blog 
    });
    
  } catch (error: any) {
    console.error('❌ GET Error:', error);
    return NextResponse.json(
      { 
        success: false, 
        error: error.message || 'Failed to fetch blog' 
      },
      { status: 500 }
    );
  }
}

// DELETE - Delete a blog
export async function DELETE(
  request: Request,
  context: { params: Promise<{ id: string }> }
) {
  try {
    await connectDB();
    const { id } = await context.params;
    
    console.log(`🗑️ Attempting to delete blog with ID: ${id}`);
    
    const deletedBlog = await Blog.findByIdAndDelete(id);
    
    if (!deletedBlog) {
      console.log('❌ Blog not found');
      return NextResponse.json(
        { success: false, error: 'Blog not found' },
        { status: 404 }
      );
    }
    
    console.log('✅ Blog deleted successfully:', deletedBlog.title);
    
    return NextResponse.json({ 
      success: true, 
      message: 'Blog deleted successfully',
      data: deletedBlog
    });
    
  } catch (error: any) {
    console.error('❌ DELETE Error:', error);
    return NextResponse.json(
      { 
        success: false, 
        error: error.message || 'Failed to delete blog' 
      },
      { status: 500 }
    );
  }
}

// PUT - Update a blog
export async function PUT(
  request: Request,
  context: { params: Promise<{ id: string }> }
) {
  try {
    await connectDB();
    const { id } = await context.params;
    const body = await request.json();
    
    console.log(`📝 Updating blog with ID: ${id}`);
    
    // Validate required fields
    if (!body.title && !body.description && !body.image) {
      return NextResponse.json(
        { 
          success: false, 
          error: 'At least one field is required to update' 
        },
        { status: 400 }
      );
    }
    
    // Format date if provided
    if (body.publishedDate && body.publishedDate.includes('-')) {
      const date = new Date(body.publishedDate);
      body.publishedDate = date.toLocaleDateString('en-US', {
        year: 'numeric',
        month: 'long',
        day: 'numeric'
      });
    }
    
    const updatedBlog = await Blog.findByIdAndUpdate(
      id,
      body,
      { new: true, runValidators: true }
    );
    
    if (!updatedBlog) {
      console.log('❌ Blog not found');
      return NextResponse.json(
        { success: false, error: 'Blog not found' },
        { status: 404 }
      );
    }
    
    console.log('✅ Blog updated successfully:', updatedBlog.title);
    
    return NextResponse.json({ 
      success: true, 
      data: updatedBlog,
      message: 'Blog updated successfully'
    });
    
  } catch (error: any) {
    console.error('❌ PUT Error:', error);
    return NextResponse.json(
      { 
        success: false, 
        error: error.message || 'Failed to update blog' 
      },
      { status: 500 }
    );
  }
}
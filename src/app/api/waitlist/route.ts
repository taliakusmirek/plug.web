import { NextRequest, NextResponse } from 'next/server';
import { supabase } from '@/lib/supabase';

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { firstName, email, city, role } = body;

    // Basic validation
    if (!firstName || !email) {
      return NextResponse.json(
        { error: 'First name and email are required' },
        { status: 400 }
      );
    }

    // Email validation
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      return NextResponse.json(
        { error: 'Please enter a valid email address' },
        { status: 400 }
      );
    }

    // Check if email already exists
    const { data: existingUser } = await supabase
      .from('waitlist')
      .select('email')
      .eq('email', email)
      .single();

    if (existingUser) {
      return NextResponse.json(
        { error: 'Email already registered on waitlist' },
        { status: 409 }
      );
    }

    // Insert into Supabase
    const { data, error } = await supabase
      .from('waitlist')
      .insert([{
        first_name: firstName,
        email: email,
        city: city || null,
        role: role || null,
        status: 'pending',
        source: 'website'
      }])
      .select()
      .single();

    if (error) {
      console.error('Supabase error:', error);
      return NextResponse.json(
        { error: 'Failed to save to database' },
        { status: 500 }
      );
    }

    console.log('Waitlist entry created:', data);

    return NextResponse.json(
      { 
        success: true, 
        message: 'Successfully joined waitlist',
        data: {
          id: data.id,
          firstName: data.first_name,
          email: data.email,
          city: data.city,
          role: data.role,
          status: data.status,
          createdAt: data.created_at
        }
      },
      { status: 200 }
    );

  } catch (error) {
    console.error('Waitlist API error:', error);
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    );
  }
} 
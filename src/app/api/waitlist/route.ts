import { NextRequest, NextResponse } from 'next/server';

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

    // Here you would typically insert into Supabase
    // For now, we'll simulate a successful response
    const waitlistEntry = {
      id: Date.now().toString(),
      firstName,
      email,
      city: city || null,
      role: role || null,
      createdAt: new Date().toISOString(),
      status: 'pending'
    };

    // TODO: Replace with actual Supabase insert
    // const { data, error } = await supabase
    //   .from('waitlist')
    //   .insert([waitlistEntry]);

    // if (error) {
    //   console.error('Supabase error:', error);
    //   return NextResponse.json(
    //     { error: 'Failed to save to database' },
    //     { status: 500 }
    //   );
    // }

    console.log('Waitlist entry:', waitlistEntry);

    return NextResponse.json(
      { 
        success: true, 
        message: 'Successfully joined waitlist',
        data: waitlistEntry 
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
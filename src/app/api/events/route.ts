import { NextResponse } from 'next/server';
import { fetchEventsFromGoogleSheet, getMockEvents } from '@/services/googleSheetService';

// GET handler for fetching events
export async function GET() {
  try {
    console.log('API Route: Attempting to fetch events from Google Sheets...');
    
    // Fetch events from Google Sheets
    const events = await fetchEventsFromGoogleSheet();
    
    console.log(`API Route: Successfully fetched ${events.length} events`);
    
    // Return the events as JSON
    return NextResponse.json({ events });
  } catch (error) {
    console.error('Error in events API route:', error);
    
    // More detailed error information
    const errorMessage = error instanceof Error ? error.message : 'Unknown error';
    const errorStack = error instanceof Error ? error.stack : '';
    
    console.error('Error details:', { message: errorMessage, stack: errorStack });
    
    // Return mock data in case of error
    const mockEvents = getMockEvents();
    console.log(`API Route: Returning ${mockEvents.length} mock events due to error`);
    
    return NextResponse.json(
      { 
        events: mockEvents, 
        error: 'Failed to fetch events from Google Sheets',
        errorDetails: errorMessage
      },
      { status: 500 }
    );
  }
}

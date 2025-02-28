import { google, sheets_v4 } from 'googleapis';
import path from 'path';
import fs from 'fs';

export interface EventData {
  id: number;
  name: string;
  invitationsSent: number;
  confirmations: number;
  capacity: number;
  dueDate: string;
  venue: {
    name: string;
    address: string;
  };
  openIssues?: number; // Making this optional since it's not in your sheet
}

// Path to your credentials file - you'll need to place your .json file here
const CREDENTIALS_PATH = path.join(process.cwd(), 'src/services/credentials/google-credentials.json');

// Your Google Sheet ID - replace with your actual Sheet ID
// This is the ID from your Google Sheets URL: https://docs.google.com/spreadsheets/d/YOUR_SPREADSHEET_ID/edit
const SPREADSHEET_ID = '1qNu9Dtrkeq0SJ1qEllkTdM0RC5FiOg0CO_be-vKNxwg';

// The range of cells to read (including headers)
// Adjust based on your sheet name and range - we're reading columns A through G
// Note: If your sheet has a different name than "Sheet1", replace it here
const RANGE = 'A1:G'; // Simplified range format to avoid sheet name issues

/**
 * Initialize the Google Sheets API client
 */
async function getGoogleSheetsClient(): Promise<sheets_v4.Sheets> {
  try {
    console.log(`Reading credentials from path: ${CREDENTIALS_PATH}`);
    
    // Check if credentials file exists
    if (!fs.existsSync(CREDENTIALS_PATH)) {
      throw new Error(`Credentials file not found at: ${CREDENTIALS_PATH}`);
    }
    
    // Read credentials from file
    const credentialsRaw = fs.readFileSync(CREDENTIALS_PATH, 'utf8');
    
    // Validate JSON format
    let credentials;
    try {
      credentials = JSON.parse(credentialsRaw);
    } catch (e) {
      throw new Error(`Invalid JSON in credentials file: ${e.message}`);
    }
    
    // Validate required fields in credentials
    if (!credentials.client_email || !credentials.private_key) {
      throw new Error('Credentials file is missing required fields (client_email or private_key)');
    }
    
    console.log(`Initializing JWT auth client with email: ${credentials.client_email}`);
    
    // Create a JWT auth client
    const auth = new google.auth.JWT(
      credentials.client_email,
      undefined,
      credentials.private_key,
      ['https://www.googleapis.com/auth/spreadsheets.readonly']
    );
    
    console.log('Auth client created successfully');
    
    // Return the Google Sheets API client
    return google.sheets({ version: 'v4', auth });
  } catch (error) {
    console.error('Error initializing Google Sheets client:', error);
    if (error instanceof Error) {
      console.error('Detailed error:', error.message);
    }
    throw error;
  }
}

/**
 * Fetch events data from Google Sheets
 */
export async function fetchEventsFromGoogleSheet(): Promise<EventData[]> {
  try {
    console.log('Attempting to initialize Google Sheets client...');
    
    // Get the Google Sheets client
    const sheets = await getGoogleSheetsClient();
    
    console.log('Google Sheets client initialized successfully');
    console.log(`Fetching data from spreadsheet ID: ${SPREADSHEET_ID}, range: ${RANGE}`);
    
    // Fetch data from the spreadsheet
    const response = await sheets.spreadsheets.values.get({
      spreadsheetId: SPREADSHEET_ID,
      range: RANGE,
    });
    
    // Extract rows from the response
    const rows = response.data.values;
    
    if (!rows || rows.length === 0) {
      console.warn('No data found in the Google Sheet');
      return [];
    }
    
    console.log(`Fetched ${rows.length} rows from Google Sheets (including header)`);
    
    // Skip the header row and map the data to EventData objects
    const events = rows.slice(1).map((row, index) => {
      return {
        id: index + 1,
        name: row[0] || '',
        invitationsSent: parseInt(row[1]) || 0,
        confirmations: parseInt(row[2]) || 0,
        capacity: parseInt(row[3]) || 0,
        dueDate: row[4] || '',
        venue: {
          name: row[5] || '',
          address: row[6] || '',
        },
        openIssues: 0, // Default value since it's not in your sheet
      };
    }).filter(event => event.name); // Filter out empty rows
    
    console.log(`Parsed ${events.length} valid events`);
    return events;
  } catch (error) {
    console.error('Error fetching data from Google Sheet:', error);
    
    // More detailed error logging
    if (error instanceof Error) {
      console.error('Error message:', error.message);
      console.error('Error stack:', error.stack);
      
      // Check for common Google API errors
      if (error.message.includes('invalid_grant')) {
        console.error('Authentication error: The credentials may be expired or invalid');
      } else if (error.message.includes('file does not exist')) {
        console.error(`Credentials file not found at: ${CREDENTIALS_PATH}`);
      } else if (error.message.includes('permission_denied')) {
        console.error('Permission denied: The service account may not have access to the spreadsheet');
      }
    }
    
    console.log('Falling back to mock events');
    return getMockEvents(); // Fallback to mock data
  }
}

/**
 * Get mock events for testing or when API fails
 */
export const getMockEvents = (): EventData[] => {
  return [
    {
      id: 1,
      name: "Conferência Anual de Tecnologia",
      invitationsSent: 500,
      confirmations: 320,
      capacity: 400,
      dueDate: "Dec 15, 2025",
      venue: {
        name: "Centro de Convenções Rebouças",
        address: "Av. Rebouças, 600, São Paulo, SP"
      },
      openIssues: 5
    },
    {
      id: 2,
      name: "Workshop de Design",
      invitationsSent: 200,
      confirmations: 150,
      capacity: 180,
      dueDate: "Jan 20, 2026",
      venue: {
        name: "Casa do Saber",
        address: "Rua Dr. Mário Ferraz, 414, São Paulo, SP"
      },
      openIssues: 2
    },
    {
      id: 3,
      name: "Lançamento de Produto",
      invitationsSent: 1000,
      confirmations: 580,
      capacity: 600,
      dueDate: "Mar 10, 2026",
      venue: {
        name: "World Trade Center São Paulo",
        address: "Av. das Nações Unidas, 12551, São Paulo, SP"
      },
      openIssues: 8
    },
  ];
};

# Google Sheets Integration for Event Dashboard

This project uses the Google Sheets API to fetch event data for the dashboard. Follow these steps to set up the integration:

## Setup Instructions

### 1. Google Cloud Project Setup

If you haven't already:

1. Go to the [Google Cloud Console](https://console.cloud.google.com/)
2. Create a new project or select your existing project
3. Enable the Google Sheets API
4. Create a service account and download the JSON credentials file

### 2. Prepare Your Google Sheet

1. Create a Google Sheet with the following columns:
   - Event Name
   - Invitations Sent (number)
   - Confirmations (number)
   - Capacity (number)
   - Due Date (text in format like "Dec 15, 2025")
   - Venue Name
   - Venue Address

2. Share your Google Sheet with the service account email address (found in your credentials JSON file) with at least "Viewer" permissions

### 3. Configure the Application

1. Place your Google API credentials JSON file at:
   ```
   src/services/credentials/google-credentials.json
   ```

2. Update the `SPREADSHEET_ID` in `src/services/googleSheetService.ts` with your Google Sheet ID
   - This is the ID from your Google Sheets URL: `https://docs.google.com/spreadsheets/d/YOUR_SPREADSHEET_ID/edit`

3. Update the `RANGE` in `src/services/googleSheetService.ts` if your sheet name is different from "Sheet1"
   - Format: `SheetName!A1:G`

## Running the Application

```bash
npm run dev
```

The application will fetch data from your Google Sheet and display it in the expandable cards on the dashboard.

## Troubleshooting

If you encounter issues:

1. Check the browser console for error messages
2. Verify that your credentials file is correctly placed
3. Ensure your service account has access to the Google Sheet
4. Confirm that your Google Sheet has the expected column structure

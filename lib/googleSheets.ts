import { google } from 'googleapis';
import type { Lead } from '@/types';

const SCOPES = ['https://www.googleapis.com/auth/spreadsheets'];

function getAuth() {
  return new google.auth.JWT({
    email:  process.env.GOOGLE_SHEETS_CLIENT_EMAIL!,
    key:    process.env.GOOGLE_SHEETS_PRIVATE_KEY!.replace(/\\n/g, '\n'),
    scopes: SCOPES,
  });
}

const SHEET_NAME = 'Leads';

/**
 * Append a new lead row to the Google Sheet.
 * Expects the sheet to have headers in row 1:
 * Date | Name | Phone | Email | Project Interest | Source | Message | Stage
 */
export async function appendLeadToSheet(lead: Omit<Lead, 'id'>): Promise<void> {
  const auth   = getAuth();
  const sheets = google.sheets({ version: 'v4', auth });

  const row = [
    new Date(lead.createdAt).toLocaleString('en-IN', { timeZone: 'Asia/Kolkata' }),
    lead.name,
    lead.phone,
    lead.email ?? '',
    lead.projectInterest ?? '',
    lead.source,
    lead.message ?? '',
    lead.stage,
  ];

  await sheets.spreadsheets.values.append({
    spreadsheetId: process.env.GOOGLE_SHEETS_SPREADSHEET_ID!,
    range:         `${SHEET_NAME}!A:H`,
    valueInputOption: 'USER_ENTERED',
    requestBody:   { values: [row] },
  });
}

/**
 * Ensure the Leads sheet exists and has the correct headers.
 * Call this once during setup or deployment.
 */
export async function ensureLeadsSheet(): Promise<void> {
  const auth   = getAuth();
  const sheets = google.sheets({ version: 'v4', auth });

  const spreadsheetId = process.env.GOOGLE_SHEETS_SPREADSHEET_ID!;

  // Check if sheet exists
  const meta = await sheets.spreadsheets.get({ spreadsheetId });
  const exists = meta.data.sheets?.some(s => s.properties?.title === SHEET_NAME);

  if (!exists) {
    await sheets.spreadsheets.batchUpdate({
      spreadsheetId,
      requestBody: {
        requests: [{ addSheet: { properties: { title: SHEET_NAME } } }],
      },
    });
  }

  // Write headers if first row is empty
  const headerCheck = await sheets.spreadsheets.values.get({
    spreadsheetId,
    range: `${SHEET_NAME}!A1:H1`,
  });

  if (!headerCheck.data.values?.length) {
    await sheets.spreadsheets.values.update({
      spreadsheetId,
      range: `${SHEET_NAME}!A1:H1`,
      valueInputOption: 'RAW',
      requestBody: {
        values: [['Date', 'Name', 'Phone', 'Email', 'Project Interest', 'Source', 'Message', 'Stage']],
      },
    });
  }
}

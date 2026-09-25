/* eslint-disable no-console */

// Same spreadsheet as prod. Apps Script routes this name to its own tab.
const GOOGLE_SHEET_LOG_URL = 'https://script.google.com/macros/s/AKfycbyspbjis5LbPquhEsFAVSBruChpvvRZgA2Yz99WPXbdaiIXYdVJN-YswAu2fuqQir-d/exec';
const GOOGLE_SHEET_TAB = 'Staging';

export default function kamT140LogToGoogleSheet(logEntry) {
    if (!GOOGLE_SHEET_LOG_URL) {
        return;
    }

    fetch(GOOGLE_SHEET_LOG_URL, {
        method: 'POST',
        mode: 'no-cors',
        headers: {
            'Content-Type': 'text/plain;charset=utf-8',
        },
        body: JSON.stringify({
            sheetName: GOOGLE_SHEET_TAB,
            timestamp: logEntry.timestamp,
            toEmail: logEntry.toEmail,
            firstName: logEntry.firstName,
            lastName: logEntry.lastName,
            modelName: logEntry.modelName,
            variantName: logEntry.variantName,
            configUrl: logEntry.configUrl,
            postCode: logEntry.postCode,
            mobile: logEntry.mobile || '',
            temperature: logEntry.temperature,
            modelFromDom: logEntry.modelFromDom || 'No',
        }),
    }).catch(() => {
        console.warn('*** T140 Google Sheet log failed ***');
    });
}

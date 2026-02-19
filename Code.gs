// ============================================================
// GOOGLE APPS SCRIPT — PHireNow Recruitment Backend
// ============================================================
// SETUP INSTRUCTIONS:
// 1. Go to script.google.com → New Project
// 2. Replace SHEET_ID and FOLDER_ID with your actual IDs
// 3. Click Deploy → New Deployment → Web App
//    - Execute as: Me
//    - Who has access: Anyone
// 4. Copy the Web App URL
// 5. Paste it in recruitment-landing.html where it says:
//    const SCRIPT_URL = 'YOUR_APPS_SCRIPT_DEPLOYED_URL';
// ============================================================

const SHEET_ID = 'YOUR_GOOGLE_SHEET_ID';   // From Sheet URL
const FOLDER_ID = 'YOUR_DRIVE_FOLDER_ID';  // From Drive folder URL
const HR_EMAIL = 'hr@yourcompany.com';      // HR notification email

function doPost(e) {
  try {
    const data = JSON.parse(e.postData.contents);
    
    // ── Get or create sheet ──
    const ss = SpreadsheetApp.openById(SHEET_ID);
    let sheet = ss.getSheetByName('Applications');
    if (!sheet) {
      sheet = ss.insertSheet('Applications');
      // Add headers
      sheet.appendRow([
        'Timestamp', 'Reference #', 'Full Name', 'Nickname', 'Gender',
        'Date of Birth', 'Age', 'Civil Status', 'Nationality',
        'Mobile Number', 'Email', 'Facebook', 'Address', 'City/Province',
        'Willing to Relocate', 'Position Applied', 'Expected Salary',
        'Availability', 'Employment Type', 'Years of Experience',
        'Employment Status', 'Previous Company', 'Previous Title',
        'Key Skills', 'Certifications', 'Education Level', 'Course/Degree',
        'Languages Spoken', 'Why Hire', 'Strongest Skill',
        'Overtime', 'OFW', 'Internet Speed', 'Computer Available',
        'Shift Availability', 'Resume Link'
      ]);
      // Style headers
      sheet.getRange(1, 1, 1, 36)
        .setBackground('#0057FF')
        .setFontColor('#FFFFFF')
        .setFontWeight('bold');
    }

    // ── Upload resume to Drive ──
    const folder = DriveApp.getFolderById(FOLDER_ID);
    let resumeLink = 'No resume uploaded';
    
    if (data.resumeBase64 && data.resumeName) {
      const decoded = Utilities.base64Decode(data.resumeBase64);
      const blob = Utilities.newBlob(decoded, data.resumeMime, data.resumeName);
      const file = folder.createFile(blob);
      file.setSharing(DriveApp.Access.ANYONE_WITH_LINK, DriveApp.Permission.VIEW);
      resumeLink = file.getUrl();
    }

    // ── Generate reference number ──
    const now = new Date();
    const ref = 'APP-' + Utilities.formatDate(now, 'Asia/Manila', 'yyyyMMdd') + '-' + Math.floor(Math.random() * 9000 + 1000);

    // ── Save to sheet ──
    sheet.appendRow([
      Utilities.formatDate(now, 'Asia/Manila', 'yyyy-MM-dd HH:mm:ss'),
      ref,
      data.fullname || '',
      data.nickname || '',
      data.gender || '',
      data.dob || '',
      data.age || '',
      data.civil || '',
      data.nationality || '',
      data.mobile || '',
      data.email || '',
      data.facebook || '',
      data.address || '',
      data.city || '',
      data.relocate || '',
      data.position || '',
      data.salary || '',
      data.availability || '',
      data.emptype || '',
      data.experience || '',
      data.empstatus || '',
      data.prevcompany || '',
      data.prevtitle || '',
      data.skills || '',
      data.certs || '',
      data.education || '',
      data.course || '',
      data.languages || '',
      data.whyhire || '',
      data.strongskill || '',
      data.overtime || '',
      data.ofw || '',
      data.internet || '',
      data.computer || '',
      data.shift || '',
      resumeLink
    ]);

    // ── Email applicant confirmation ──
    if (data.email) {
      try {
        MailApp.sendEmail({
          to: data.email,
          subject: `✅ Application Received – ${data.position} | ${ref}`,
          htmlBody: `
            <div style="font-family:Arial,sans-serif;max-width:600px;margin:0 auto;background:#f9f9f9;padding:30px;border-radius:12px">
              <div style="background:linear-gradient(135deg,#0057FF,#003ACC);padding:30px;border-radius:12px;text-align:center;margin-bottom:24px">
                <h1 style="color:#FFD700;font-size:28px;margin:0">APPLICATION RECEIVED!</h1>
                <p style="color:rgba(255,255,255,0.8);margin:10px 0 0">PHireNow Recruitment Portal</p>
              </div>
              <p style="font-size:16px">Hi <strong>${data.fullname}</strong>,</p>
              <p>Thank you for applying! We have successfully received your application for <strong>${data.position}</strong>.</p>
              <div style="background:#fff;border:2px solid #0057FF;border-radius:8px;padding:16px;margin:20px 0;text-align:center">
                <p style="margin:0;color:#666;font-size:13px">YOUR REFERENCE NUMBER</p>
                <p style="margin:8px 0 0;font-size:24px;font-weight:bold;color:#0057FF">${ref}</p>
              </div>
              <p>Our recruitment team will review your application and contact you within <strong>24–48 hours</strong>.</p>
              <p style="color:#666;font-size:13px">Please do not reply to this email. For inquiries, contact: ${HR_EMAIL}</p>
              <hr style="border:none;border-top:1px solid #eee;margin:20px 0">
              <p style="color:#999;font-size:12px;text-align:center">🇵🇭 PHireNow – Proudly serving Filipino job seekers</p>
            </div>
          `
        });
      } catch(mailErr) {
        Logger.log('Email error: ' + mailErr.message);
      }
    }

    // ── Notify HR ──
    if (HR_EMAIL) {
      try {
        MailApp.sendEmail({
          to: HR_EMAIL,
          subject: `🔔 New Application: ${data.position} – ${data.fullname}`,
          htmlBody: `
            <div style="font-family:Arial,sans-serif;max-width:600px">
              <h2 style="color:#0057FF">New Application Received</h2>
              <table style="border-collapse:collapse;width:100%">
                <tr><td style="padding:8px;border:1px solid #ddd;background:#f5f5f5;font-weight:bold">Reference</td><td style="padding:8px;border:1px solid #ddd">${ref}</td></tr>
                <tr><td style="padding:8px;border:1px solid #ddd;background:#f5f5f5;font-weight:bold">Name</td><td style="padding:8px;border:1px solid #ddd">${data.fullname}</td></tr>
                <tr><td style="padding:8px;border:1px solid #ddd;background:#f5f5f5;font-weight:bold">Position</td><td style="padding:8px;border:1px solid #ddd">${data.position}</td></tr>
                <tr><td style="padding:8px;border:1px solid #ddd;background:#f5f5f5;font-weight:bold">Mobile</td><td style="padding:8px;border:1px solid #ddd">${data.mobile}</td></tr>
                <tr><td style="padding:8px;border:1px solid #ddd;background:#f5f5f5;font-weight:bold">Email</td><td style="padding:8px;border:1px solid #ddd">${data.email}</td></tr>
                <tr><td style="padding:8px;border:1px solid #ddd;background:#f5f5f5;font-weight:bold">Resume</td><td style="padding:8px;border:1px solid #ddd"><a href="${resumeLink}">View Resume</a></td></tr>
              </table>
              <p><a href="https://docs.google.com/spreadsheets/d/${SHEET_ID}" style="color:#0057FF">View Full Application in Google Sheets →</a></p>
            </div>
          `
        });
      } catch(hrErr) {
        Logger.log('HR email error: ' + hrErr.message);
      }
    }

    return ContentService
      .createTextOutput(JSON.stringify({ success: true, ref: ref }))
      .setMimeType(ContentService.MimeType.JSON);

  } catch(err) {
    Logger.log('Error: ' + err.message);
    return ContentService
      .createTextOutput(JSON.stringify({ success: false, error: err.message }))
      .setMimeType(ContentService.MimeType.JSON);
  }
}

// Test function — run this manually to verify setup
function testSetup() {
  const sheet = SpreadsheetApp.openById(SHEET_ID);
  const folder = DriveApp.getFolderById(FOLDER_ID);
  Logger.log('✅ Sheet: ' + sheet.getName());
  Logger.log('✅ Folder: ' + folder.getName());
  Logger.log('Setup is working correctly!');
}

# ✅ PHireNow Recruitment System – Setup Guide

## WHAT YOU GET
- `recruitment-landing.html` — Beautiful landing page (upload anywhere)
- `Code.gs` — Google Apps Script backend
- This setup guide

---

## STEP 1: CREATE GOOGLE SHEET

1. Go to **sheets.google.com** → Click **Blank**
2. Name it: `PHireNow Applications`
3. Copy the **Sheet ID** from the URL:
   - URL example: `https://docs.google.com/spreadsheets/d/`**`1BxiMVs0XRA5nFMdKvBdBZjgmUUqptlbs74OgVE2upms`**`/edit`
   - The bold part is your **SHEET_ID**

---

## STEP 2: CREATE GOOGLE DRIVE FOLDER

1. Go to **drive.google.com** → Click **New → Folder**
2. Name it: `Job Applications`
3. Open the folder and copy the **Folder ID** from the URL:
   - URL example: `https://drive.google.com/drive/folders/`**`1mABC123xyz...`**
   - The bold part is your **FOLDER_ID**

---

## STEP 3: SET UP GOOGLE APPS SCRIPT

1. Go to **script.google.com** → Click **New Project**
2. Name it: `PHireNow Backend`
3. Delete all existing code
4. **Paste everything from `Code.gs`** into the editor
5. Update the constants at the top:
   ```
   const SHEET_ID = 'paste-your-sheet-id-here';
   const FOLDER_ID = 'paste-your-folder-id-here';
   const HR_EMAIL = 'your-hr-email@gmail.com';
   ```
6. Click **Save** (Ctrl+S)
7. Click **Run → testSetup** to verify it works
   - Accept the permission prompts
   - Check the Logs — you should see ✅ messages

---

## STEP 4: DEPLOY THE WEB APP

1. Click **Deploy → New Deployment**
2. Click the gear icon ⚙️ next to "Select type" → Choose **Web App**
3. Set:
   - **Description:** PHireNow API v1
   - **Execute as:** Me (your Google account)
   - **Who has access:** Anyone
4. Click **Deploy**
5. **Copy the Web App URL** (it looks like: `https://script.google.com/macros/s/AKfyc.../exec`)

---

## STEP 5: CONNECT FORM TO SCRIPT

1. Open `recruitment-landing.html` in any text editor (Notepad, VS Code)
2. Find this line (around line 680):
   ```
   const SCRIPT_URL = 'YOUR_APPS_SCRIPT_DEPLOYED_URL';
   ```
3. Replace `YOUR_APPS_SCRIPT_DEPLOYED_URL` with the URL you copied in Step 4:
   ```
   const SCRIPT_URL = 'https://script.google.com/macros/s/AKfyc.../exec';
   ```
4. Save the file

---

## STEP 6: UPLOAD THE HTML FILE (FREE HOSTING)

### Option A – GitHub Pages (Recommended, 100% Free)
1. Create free account at **github.com**
2. New repository → Name: `phirenow`
3. Upload `recruitment-landing.html`
4. Settings → Pages → Source: main branch → Save
5. Your site: `https://yourname.github.io/phirenow/recruitment-landing.html`

### Option B – Netlify (Drag & Drop)
1. Go to **netlify.com** → Log in free
2. Drag your HTML file into the deploy area
3. Get instant URL like: `https://amazing-name.netlify.app`

### Option C – Google Sites (Easiest)
1. Go to **sites.google.com** → New site
2. Insert → Embed → Embed code
3. Paste the entire HTML content

---

## STEP 7: TEST SUBMISSION

1. Open your hosted page
2. Click Apply Now
3. Fill out the form with test data
4. Submit
5. Check:
   - ✅ Google Sheet → New row should appear
   - ✅ Google Drive → Resume file should be there
   - ✅ Test email inbox → Confirmation email

---

## TROUBLESHOOTING

| Problem | Solution |
|---|---|
| Form submits but no data in sheet | Re-deploy the Apps Script (new deployment) |
| "Error" on submission | Check the Apps Script logs (View → Logs) |
| Resume not appearing in Drive | Make sure FOLDER_ID is correct |
| Email not sending | Enable Gmail API in Apps Script |
| CORS error | Make sure deployment is set to "Anyone" |

---

## SHARING ON FACEBOOK

Post your URL like this:
```
🔥 WE ARE HIRING! 🔥
Apply in 2 MINUTES: [your-url-here]
✅ Free to apply
✅ No requirements fee
✅ Immediate openings!
#hiring #jobvacancy #philippines
```

---

## ADMIN ACCESS

- **View all applications:** Open your Google Sheet directly
- **View resumes:** Open the "Job Applications" folder in Google Drive
- Both are accessible from any device with your Google account

---

*Created with PHireNow Recruitment System*

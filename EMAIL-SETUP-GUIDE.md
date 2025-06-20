# Email Collection Setup Guide for Enneagram and Beyond

## Quick Setup (5 minutes)

### Option 1: Formspree (Recommended - Free & Easy)

1. **Sign up at [Formspree.io](https://formspree.io)**
   - Free plan: 50 submissions/month
   - Pro plan: $10/month for unlimited

2. **Create a new form:**
   - Click "New Form"
   - Name it "Enneagram Quest Emails"
   - Copy your form endpoint (looks like: `https://formspree.io/f/xpznvqko`)

3. **Update the code:**
   - Open `Docs/email-collection.js`
   - Replace `YOUR_FORM_ID` with your actual form ID
   - Example: `this.apiEndpoint = 'https://formspree.io/f/xpznvqko';`

4. **Configure email notifications:**
   - In Formspree dashboard, set notification email
   - Enable email confirmations for users

### Option 2: Netlify Forms (If hosting on Netlify)

1. **Add to your HTML form:**
   ```html
   <form netlify name="enneagram-emails">
   ```

2. **Update JavaScript:**
   ```javascript
   this.apiEndpoint = '/.netlify/functions/submit-form';
   ```

### Option 3: Custom Backend

If you want full control, set up your own backend:

1. **Create a simple Node.js server:**
   ```javascript
   const express = require('express');
   const app = express();
   
   app.post('/api/emails', (req, res) => {
     // Save to database
     // Send confirmation email
     res.json({ success: true });
   });
   ```

## Email Workflow Features

### Automatic Collection Points:
- ✅ After completing the quest (3-second delay)
- ✅ "Email My Results" button on results page
- ✅ Local storage backup for all submissions

### Data Collected:
- Email address
- Enneagram type discovered
- Completion date/time
- Source (game completion vs results email)
- Full personality results (if requested)

### Admin Features:
- Export emails to CSV: Open browser console and run `exportEmails()`
- View collected emails: `localStorage.getItem('collected-emails')`

## Email Templates

### Welcome Email Template:
```
Subject: Welcome to Your Enneagram Journey! 🌟

Hi there!

Thank you for completing Enneagram Quest! You discovered you're a [TYPE NAME].

Here are your personalized insights:
- Core Motivation: [MOTIVATION]
- Growth Areas: [SUGGESTIONS]
- Recommended Resources: [LINKS]

Continue your journey at: https://enneagramandbeyond.com

Best regards,
The Enneagram and Beyond Team
```

### Results Email Template:
```
Subject: Your Complete Enneagram Quest Results

Your Enneagram Type: [TYPE]
[FULL RESULTS]

Want to dive deeper? Visit our resources at:
https://enneagramandbeyond.com
```

## Analytics & Tracking

The system automatically tracks:
- Conversion rates (quest completion → email signup)
- Most common personality types
- Peak usage times
- Email vs skip rates

## GDPR Compliance

The system includes:
- Clear consent messaging
- "Maybe Later" option
- Data purpose explanation
- Easy unsubscribe (handled by email provider)

## Testing

1. Complete the quest
2. Check if email modal appears
3. Submit test email
4. Verify email received
5. Check local storage backup
6. Test CSV export function

## Troubleshooting

**Modal not appearing:**
- Check browser console for errors
- Ensure all scripts loaded properly

**Emails not sending:**
- Verify Formspree endpoint URL
- Check network tab for failed requests
- Confirm form configuration

**CSV export not working:**
- Open browser console
- Run `exportEmails()` command
- Check if localStorage has data

## Next Steps

1. Set up your chosen email service
2. Update the endpoint in the code
3. Test the complete flow
4. Set up email templates
5. Configure analytics tracking
6. Launch and monitor performance!

## Support

For technical issues, check the browser console for error messages. The system includes comprehensive error handling and fallbacks.
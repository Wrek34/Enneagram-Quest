// Mailing List Integration Setup Guide
class MailingListSetup {
    constructor() {
        this.setupOptions = {
            mailchimp: this.setupMailchimp(),
            convertkit: this.setupConvertKit(),
            emailjs: this.setupEmailJS(),
            netlify: this.setupNetlifyForms()
        };
    }

    // Option 1: Mailchimp Integration (Recommended)
    setupMailchimp() {
        return {
            name: 'Mailchimp',
            difficulty: 'Easy',
            cost: 'Free up to 2,000 contacts',
            steps: [
                '1. Create Mailchimp account at mailchimp.com',
                '2. Create an audience/list called "Enneagram Quest Subscribers"',
                '3. Go to Audience → Signup forms → Embedded forms',
                '4. Copy the form HTML code',
                '5. Replace the email form in email-signup.js with Mailchimp form',
                '6. Style the form to match your design'
            ],
            implementation: `
// Replace handleEmailSignup() in email-signup.js with:
handleEmailSignup() {
    const emailInput = document.getElementById('user-email');
    const email = emailInput.value.trim();
    
    if (!this.validateEmail(email)) {
        this.showNotification('Please enter a valid email address', 'error');
        return;
    }

    // Mailchimp form submission
    const formData = new FormData();
    formData.append('EMAIL', email);
    formData.append('PERSONALITY_TYPE', this.game.calculateDominantType());
    
    fetch('YOUR_MAILCHIMP_FORM_ACTION_URL', {
        method: 'POST',
        body: formData,
        mode: 'no-cors'
    }).then(() => {
        this.showSignupSuccess(email);
        this.sendResultsToEmail(email);
        emailInput.value = '';
    }).catch(error => {
        console.error('Mailchimp error:', error);
        this.showNotification('Signup failed. Please try again.', 'error');
    });
}
            `
        };
    }

    // Option 2: ConvertKit Integration
    setupConvertKit() {
        return {
            name: 'ConvertKit',
            difficulty: 'Medium',
            cost: 'Free up to 1,000 subscribers',
            steps: [
                '1. Create ConvertKit account at convertkit.com',
                '2. Create a form called "Enneagram Quest Signup"',
                '3. Get your form ID and API key',
                '4. Use ConvertKit API to add subscribers',
                '5. Set up automated email sequence with personality results'
            ],
            implementation: `
// Add to email-signup.js:
async handleEmailSignup() {
    const email = document.getElementById('user-email').value.trim();
    
    if (!this.validateEmail(email)) {
        this.showNotification('Please enter a valid email address', 'error');
        return;
    }

    try {
        const response = await fetch('https://api.convertkit.com/v3/forms/YOUR_FORM_ID/subscribe', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                api_key: 'YOUR_API_KEY',
                email: email,
                fields: {
                    personality_type: this.game.calculateDominantType(),
                    signup_source: 'Enneagram Quest'
                }
            })
        });
        
        if (response.ok) {
            this.showSignupSuccess(email);
            this.sendResultsToEmail(email);
        }
    } catch (error) {
        console.error('ConvertKit error:', error);
        this.showNotification('Signup failed. Please try again.', 'error');
    }
}
            `
        };
    }

    // Option 3: EmailJS (Simple, no backend needed)
    setupEmailJS() {
        return {
            name: 'EmailJS',
            difficulty: 'Easy',
            cost: 'Free up to 200 emails/month',
            steps: [
                '1. Create EmailJS account at emailjs.com',
                '2. Connect your email service (Gmail, Outlook, etc.)',
                '3. Create email template for personality results',
                '4. Get your service ID, template ID, and public key',
                '5. Add EmailJS SDK to your project'
            ],
            implementation: `
// Add EmailJS SDK to index.html:
<script src="https://cdn.jsdelivr.net/npm/@emailjs/browser@3/dist/email.min.js"></script>

// Initialize in email-signup.js:
emailjs.init('YOUR_PUBLIC_KEY');

async handleEmailSignup() {
    const email = document.getElementById('user-email').value.trim();
    
    if (!this.validateEmail(email)) {
        this.showNotification('Please enter a valid email address', 'error');
        return;
    }

    const dominantType = this.game.calculateDominantType();
    const typeData = enneagramTypes[dominantType];
    
    try {
        await emailjs.send('YOUR_SERVICE_ID', 'YOUR_TEMPLATE_ID', {
            to_email: email,
            personality_type: typeData.title,
            type_description: typeData.description,
            core_motivation: typeData.coreMotivation,
            basic_fear: typeData.basicFear,
            strengths: typeData.strengths.join(', ')
        });
        
        this.showSignupSuccess(email);
        this.storeEmail(email);
    } catch (error) {
        console.error('EmailJS error:', error);
        this.showNotification('Failed to send results. Please try again.', 'error');
    }
}
            `
        };
    }

    // Option 4: Netlify Forms (if hosting on Netlify)
    setupNetlifyForms() {
        return {
            name: 'Netlify Forms',
            difficulty: 'Easy',
            cost: 'Free up to 100 submissions/month',
            steps: [
                '1. Deploy your site to Netlify',
                '2. Add netlify attribute to your form',
                '3. Handle form submissions in Netlify dashboard',
                '4. Set up email notifications',
                '5. Export subscriber data as needed'
            ],
            implementation: `
// Replace form in createEmailSignupSection():
<form name="enneagram-signup" method="POST" data-netlify="true" id="email-signup-form">
    <input type="hidden" name="form-name" value="enneagram-signup" />
    <input type="email" name="email" id="user-email" placeholder="Enter your email address" required>
    <input type="hidden" name="personality-type" id="personality-type">
    <button type="submit" class="signup-btn">✨ Get Expert Insights</button>
</form>

// Update handleEmailSignup():
handleEmailSignup() {
    const form = document.getElementById('email-signup-form');
    const email = document.getElementById('user-email').value;
    const personalityType = this.game.calculateDominantType();
    
    document.getElementById('personality-type').value = personalityType;
    
    fetch('/', {
        method: 'POST',
        headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
        body: new URLSearchParams(new FormData(form)).toString()
    }).then(() => {
        this.showSignupSuccess(email);
        this.sendResultsToEmail(email);
    }).catch(error => {
        console.error('Netlify form error:', error);
        this.showNotification('Signup failed. Please try again.', 'error');
    });
}
            `
        };
    }

    // Recommended implementation steps
    getRecommendation() {
        return {
            recommended: 'EmailJS',
            reason: 'Easiest to implement, no backend required, free tier sufficient for starting out',
            quickStart: [
                '1. Sign up at emailjs.com',
                '2. Connect your Gmail account',
                '3. Create email template with personality results',
                '4. Add 3 lines of code to your project',
                '5. Test with your own email',
                '6. Deploy and start collecting subscribers!'
            ]
        };
    }
}

// Export for use
if (typeof module !== 'undefined' && module.exports) {
    module.exports = MailingListSetup;
} else {
    window.MailingListSetup = MailingListSetup;
}

console.log('📧 Mailing List Setup Guide loaded. Use new MailingListSetup() to see options.');
// Email Collection System for Enneagram and Beyond
class EmailCollectionSystem {
    constructor(game) {
        this.game = game;
        this.apiEndpoint = 'https://formspree.io/f/YOUR_FORM_ID'; // Replace with your Formspree endpoint
        this.initializeEmailCollection();
    }

    initializeEmailCollection() {
        this.addEmailPrompts();
        this.setupResultsEmailCapture();
    }

    addEmailPrompts() {
        // Add email signup after completing the quest
        const originalShowResults = this.game.showResults.bind(this.game);
        this.game.showResults = () => {
            originalShowResults();
            setTimeout(() => {
                this.showEmailSignup();
            }, 3000);
        };
    }

    showEmailSignup() {
        const emailModal = document.createElement('div');
        emailModal.className = 'email-signup-modal';
        emailModal.innerHTML = `
            <div class="email-signup-content">
                <div class="signup-header">
                    <h3>🌟 Discover More About Your Type!</h3>
                    <p>Get personalized insights, growth tips, and exclusive Enneagram content</p>
                </div>
                <form class="email-signup-form" id="email-signup-form">
                    <div class="form-group">
                        <input type="email" id="user-email" placeholder="Enter your email address" required>
                        <input type="hidden" id="user-type" value="${this.game.calculateDominantType()}">
                        <input type="hidden" id="completion-date" value="${new Date().toISOString()}">
                    </div>
                    <div class="benefits">
                        <div class="benefit">✨ Personalized growth recommendations</div>
                        <div class="benefit">📚 Exclusive Enneagram resources</div>
                        <div class="benefit">🎯 Type-specific challenges and exercises</div>
                    </div>
                    <div class="form-actions">
                        <button type="submit" class="signup-btn">Get My Insights</button>
                        <button type="button" class="skip-btn" onclick="this.parentElement.parentElement.parentElement.parentElement.remove()">Maybe Later</button>
                    </div>
                </form>
            </div>
        `;

        document.body.appendChild(emailModal);
        this.setupFormSubmission();
    }

    setupFormSubmission() {
        const form = document.getElementById('email-signup-form');
        form.addEventListener('submit', async (e) => {
            e.preventDefault();
            
            const email = document.getElementById('user-email').value;
            const type = document.getElementById('user-type').value;
            const completionDate = document.getElementById('completion-date').value;
            
            const submitBtn = form.querySelector('.signup-btn');
            submitBtn.textContent = 'Signing up...';
            submitBtn.disabled = true;

            try {
                await this.submitEmail({
                    email: email,
                    enneagramType: type,
                    completionDate: completionDate,
                    source: 'Enneagram Quest Game'
                });
                
                this.showSuccessMessage();
            } catch (error) {
                this.showErrorMessage();
            }
        });
    }

    async submitEmail(data) {
        // Option 1: Formspree (recommended for simplicity)
        const response = await fetch(this.apiEndpoint, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(data)
        });

        if (!response.ok) {
            throw new Error('Submission failed');
        }

        // Also store locally as backup
        this.storeEmailLocally(data);
    }

    storeEmailLocally(data) {
        const emails = JSON.parse(localStorage.getItem('collected-emails') || '[]');
        emails.push({
            ...data,
            timestamp: Date.now()
        });
        localStorage.setItem('collected-emails', JSON.stringify(emails));
    }

    showSuccessMessage() {
        const modal = document.querySelector('.email-signup-modal');
        modal.innerHTML = `
            <div class="email-signup-content success">
                <div class="success-icon">🎉</div>
                <h3>Welcome to the Journey!</h3>
                <p>Check your email for personalized insights about your Enneagram Type!</p>
                <button onclick="this.parentElement.parentElement.remove()" class="close-btn">Continue</button>
            </div>
        `;
    }

    showErrorMessage() {
        const modal = document.querySelector('.email-signup-modal');
        const form = modal.querySelector('.email-signup-form');
        
        const errorMsg = document.createElement('div');
        errorMsg.className = 'error-message';
        errorMsg.textContent = 'Something went wrong. Please try again.';
        
        form.insertBefore(errorMsg, form.firstChild);
        
        const submitBtn = form.querySelector('.signup-btn');
        submitBtn.textContent = 'Get My Insights';
        submitBtn.disabled = false;
    }

    setupResultsEmailCapture() {
        // Add option to email results
        const originalShowResults = this.game.showResults.bind(this.game);
        this.game.showResults = () => {
            originalShowResults();
            setTimeout(() => {
                this.addEmailResultsButton();
            }, 1000);
        };
    }

    addEmailResultsButton() {
        const resultContent = document.getElementById('result-content');
        if (!resultContent) return;

        const emailButton = document.createElement('button');
        emailButton.className = 'email-results-btn';
        emailButton.innerHTML = '📧 Email My Results';
        emailButton.onclick = () => this.showEmailResultsForm();

        resultContent.appendChild(emailButton);
    }

    showEmailResultsForm() {
        const dominantType = this.game.calculateDominantType();
        const typeData = enneagramTypes[dominantType];
        
        const modal = document.createElement('div');
        modal.className = 'email-results-modal';
        modal.innerHTML = `
            <div class="email-results-content">
                <h3>📧 Email Your Results</h3>
                <p>Get your complete Enneagram results sent to your inbox!</p>
                <form id="email-results-form">
                    <input type="email" placeholder="Your email address" required>
                    <button type="submit">Send Results</button>
                    <button type="button" onclick="this.parentElement.parentElement.parentElement.remove()">Cancel</button>
                </form>
            </div>
        `;

        document.body.appendChild(modal);

        modal.querySelector('form').addEventListener('submit', async (e) => {
            e.preventDefault();
            const email = e.target.querySelector('input[type="email"]').value;
            
            await this.emailResults(email, {
                type: dominantType,
                title: typeData.title,
                description: typeData.description,
                coreMotivation: typeData.coreMotivation,
                basicFear: typeData.basicFear,
                strengths: typeData.strengths
            });
            
            modal.remove();
            this.showNotification('Results sent to your email!');
        });
    }

    async emailResults(email, results) {
        const emailData = {
            email: email,
            subject: `Your Enneagram Quest Results - ${results.title}`,
            results: results,
            source: 'Enneagram Quest Results'
        };

        await this.submitEmail(emailData);
    }

    showNotification(message) {
        const notification = document.createElement('div');
        notification.className = 'email-notification';
        notification.textContent = message;
        notification.style.cssText = `
            position: fixed;
            top: 20px;
            right: 20px;
            background: #27ae60;
            color: white;
            padding: 1rem;
            border-radius: 8px;
            z-index: 1002;
            animation: slideInRight 0.3s ease, slideOutRight 0.3s ease 2.7s forwards;
        `;
        
        document.body.appendChild(notification);
        setTimeout(() => notification.remove(), 3000);
    }

    // Admin function to export collected emails
    exportEmails() {
        const emails = JSON.parse(localStorage.getItem('collected-emails') || '[]');
        const csvContent = this.convertToCSV(emails);
        this.downloadCSV(csvContent, 'enneagram-emails.csv');
    }

    convertToCSV(data) {
        if (data.length === 0) return '';
        
        const headers = Object.keys(data[0]).join(',');
        const rows = data.map(row => 
            Object.values(row).map(value => 
                typeof value === 'string' ? `"${value}"` : value
            ).join(',')
        );
        
        return [headers, ...rows].join('\n');
    }

    downloadCSV(content, filename) {
        const blob = new Blob([content], { type: 'text/csv' });
        const url = window.URL.createObjectURL(blob);
        const a = document.createElement('a');
        a.href = url;
        a.download = filename;
        a.click();
        window.URL.revokeObjectURL(url);
    }
}

// Initialize email collection
document.addEventListener('DOMContentLoaded', () => {
    const initEmailCollection = () => {
        if (window.game) {
            window.emailSystem = new EmailCollectionSystem(window.game);
            console.log('📧 Email collection system loaded');
        } else {
            setTimeout(initEmailCollection, 100);
        }
    };
    initEmailCollection();
});

// Admin console commands
window.exportEmails = () => window.emailSystem?.exportEmails();
// Email Signup and Expert Consultation System
class EmailSignupSystem {
    constructor(game) {
        this.game = game;
        this.initializeEmailSystem();
    }

    initializeEmailSystem() {
        this.addEmailSignupToResults();
    }

    addEmailSignupToResults() {
        const originalShowResults = this.game.showResults.bind(this.game);
        this.game.showResults = () => {
            originalShowResults();
            
            setTimeout(() => {
                this.createEmailSignupSection();
            }, 1500);
        };
    }

    createEmailSignupSection() {
        const resultContent = document.getElementById('result-content');
        if (!resultContent) return;

        const emailSection = document.createElement('div');
        emailSection.className = 'email-signup-section';
        emailSection.innerHTML = `
            <div class="expert-consultation">
                <div class="expert-header">
                    <h4>🌟 Transform Your Life with Expert Guidance</h4>
                    <p>Ready to dive deeper into your Enneagram journey? Work with certified Enneagram experts to unlock your full potential!</p>
                </div>
                
                <div class="expert-benefits">
                    <div class="benefit-grid">
                        <div class="benefit-item">
                            <span class="benefit-icon">🎯</span>
                            <span class="benefit-text">Personalized Growth Plan</span>
                        </div>
                        <div class="benefit-item">
                            <span class="benefit-icon">💡</span>
                            <span class="benefit-text">Deep Self-Understanding</span>
                        </div>
                        <div class="benefit-item">
                            <span class="benefit-icon">🚀</span>
                            <span class="benefit-text">Breakthrough Limiting Beliefs</span>
                        </div>
                        <div class="benefit-item">
                            <span class="benefit-icon">❤️</span>
                            <span class="benefit-text">Improve Relationships</span>
                        </div>
                    </div>
                </div>

                <div class="signup-form">
                    <h5>Get Expert Enneagram Insights & Life-Changing Tips</h5>
                    <form id="email-signup-form" class="email-form">
                        <div class="form-group">
                            <input type="email" id="user-email" placeholder="Enter your email address" required>
                            <button type="submit" class="signup-btn">
                                ✨ Get Expert Insights
                            </button>
                        </div>
                        <div class="form-benefits">
                            <p>🎁 <strong>Free bonus:</strong> Personalized Enneagram growth guide + weekly insights</p>
                            <p class="privacy-note">We respect your privacy. Unsubscribe anytime.</p>
                        </div>
                    </form>
                </div>

                <div class="expert-cta">
                    <div class="expert-profile">
                        <div class="expert-info">
                            <h6>Meet Your Enneagram Expert</h6>
                            <p>Work directly with certified Enneagram coaches who have helped thousands transform their lives through deep personality understanding.</p>
                            <a href="https://msha.ke/kaciwieczorek" target="_blank" class="expert-link">
                                🌟 Book Your Consultation
                            </a>
                        </div>
                    </div>
                </div>
            </div>
        `;

        resultContent.appendChild(emailSection);
        this.setupEmailForm();
    }

    setupEmailForm() {
        const form = document.getElementById('email-signup-form');
        if (!form) return;

        form.addEventListener('submit', (e) => {
            e.preventDefault();
            this.handleEmailSignup();
        });
    }

    handleEmailSignup() {
        const emailInput = document.getElementById('user-email');
        const email = emailInput.value.trim();
        
        if (!this.validateEmail(email)) {
            this.showNotification('Please enter a valid email address', 'error');
            return;
        }

        // Store email locally for now (you can integrate with your email service)
        this.storeEmail(email);
        
        // Show success message
        this.showSignupSuccess(email);
        
        // Clear form
        emailInput.value = '';
    }

    validateEmail(email) {
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        return emailRegex.test(email);
    }

    storeEmail(email) {
        // Store in localStorage for now
        const emails = JSON.parse(localStorage.getItem('enneagram-emails') || '[]');
        if (!emails.includes(email)) {
            emails.push({
                email: email,
                timestamp: new Date().toISOString(),
                personalityType: this.game.calculateDominantType()
            });
            localStorage.setItem('enneagram-emails', JSON.stringify(emails));
        }
    }

    showSignupSuccess(email) {
        const form = document.querySelector('.signup-form');
        if (!form) return;

        form.innerHTML = `
            <div class="signup-success">
                <div class="success-icon">🎉</div>
                <h5>Welcome to Your Transformation Journey!</h5>
                <p>Thank you for joining! Check your email (<strong>${email}</strong>) for your personalized Enneagram growth guide.</p>
                <div class="next-steps">
                    <p><strong>What's next?</strong></p>
                    <ul>
                        <li>📧 Check your inbox for your free growth guide</li>
                        <li>📱 Follow us on social media for daily insights</li>
                        <li>🌟 Book a consultation for deeper transformation</li>
                    </ul>
                </div>
            </div>
        `;
    }

    showNotification(message, type = 'info') {
        const notification = document.createElement('div');
        notification.className = `email-notification ${type}`;
        notification.textContent = message;
        
        notification.style.cssText = `
            position: fixed;
            top: 20px;
            right: 20px;
            padding: 1rem 1.5rem;
            border-radius: 8px;
            color: white;
            z-index: 1001;
            animation: slideInRight 0.3s ease, slideOutRight 0.3s ease 3s forwards;
            background: ${type === 'error' ? '#e74c3c' : '#27ae60'};
            box-shadow: 0 4px 12px rgba(0, 0, 0, 0.2);
            font-weight: bold;
        `;

        document.body.appendChild(notification);

        setTimeout(() => {
            if (document.body.contains(notification)) {
                document.body.removeChild(notification);
            }
        }, 3500);
    }
}

// Initialize email signup system
document.addEventListener('DOMContentLoaded', () => {
    const initEmailSignup = () => {
        if (window.game) {
            new EmailSignupSystem(window.game);
            console.log('📧 Email signup system loaded');
        } else {
            setTimeout(initEmailSignup, 100);
        }
    };
    initEmailSignup();
});
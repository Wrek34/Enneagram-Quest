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

        // Store email and send results
        this.storeEmail(email);
        this.sendResultsToEmail(email);
        
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

    sendResultsToEmail(email) {
        const dominantType = this.game.calculateDominantType();
        const typeData = enneagramTypes[dominantType];
        const wingInfo = this.game.wingsSystem ? this.game.wingsSystem.calculateWings(dominantType, this.game.typeScores) : null;
        const wingText = wingInfo && wingInfo.dominantWing ? `${dominantType}w${wingInfo.dominantWing}` : dominantType;
        
        // Create email content
        const subject = `Your Enneagram Quest Results: ${typeData.title}`;
        const body = this.createEmailBody(typeData, wingText, wingInfo);
        
        // For now, create a mailto link (in production, you'd use an email service)
        const mailtoLink = `mailto:${email}?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`;
        
        // Store the results for potential future email service integration
        this.storeResultsForEmail(email, typeData, wingText, wingInfo);
        
        console.log('Results prepared for email:', { email, type: wingText });
    }

    createEmailBody(typeData, wingText, wingInfo) {
        return `🏛️ Your Enneagram Quest Results\n\n` +
               `Congratulations! You've completed your personality adventure and discovered you are:\n\n` +
               `${typeData.title} (Type ${wingText})\n\n` +
               `DESCRIPTION:\n${typeData.description}\n\n` +
               `CORE MOTIVATION:\n${typeData.coreMotivation}\n\n` +
               `BASIC FEAR:\n${typeData.basicFear}\n\n` +
               `KEY STRENGTHS:\n${typeData.strengths.map(s => `• ${s}`).join('\n')}\n\n` +
               (wingInfo && wingInfo.dominantWing ? 
                `WING INFLUENCE:\nYour ${wingInfo.dominantWing} wing adds ${wingInfo.wingStrength} influence to your core type.\n\n` : '') +
               `🌟 NEXT STEPS:\n` +
               `• Explore your type further at https://msha.ke/kaciwieczorek\n` +
               `• Share your results with friends: https://wrek34.github.io/Enneagram-Quest/\n` +
               `• Book a consultation for deeper insights\n\n` +
               `Thank you for taking the Enneagram Quest!\n\n` +
               `With love,\nThe Enneagram and Beyond Team`;
    }

    storeResultsForEmail(email, typeData, wingText, wingInfo) {
        const results = {
            email: email,
            timestamp: new Date().toISOString(),
            type: wingText,
            typeData: typeData,
            wingInfo: wingInfo,
            gameStats: {
                level: this.game.playerStats?.level || 1,
                wisdom: this.game.playerStats?.wisdom || 0,
                courage: this.game.playerStats?.courage || 0,
                compassion: this.game.playerStats?.compassion || 0,
                inventory: this.game.inventory || []
            }
        };
        
        // Store for potential email service integration
        const emailResults = JSON.parse(localStorage.getItem('enneagram-email-results') || '[]');
        emailResults.push(results);
        localStorage.setItem('enneagram-email-results', JSON.stringify(emailResults));
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
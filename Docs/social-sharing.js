// Social sharing and support features
class SocialSharingSystem {
    constructor(game) {
        this.game = game;
        this.initializeSocialFeatures();
    }

    initializeSocialFeatures() {
        this.addSocialButtons();
        this.addSupportSection();
        this.setupSharingMethods();
    }

    addSocialButtons() {
        // Add social sharing to results screen
        const originalShowResults = this.game.showResults.bind(this.game);
        this.game.showResults = () => {
            originalShowResults();
            
            setTimeout(() => {
                this.createSocialSection();
                this.createSupportSection();
            }, 1000);
        };
    }

    createSocialSection() {
        const resultContent = document.getElementById('result-content');
        if (!resultContent) return;

        const socialSection = document.createElement('div');
        socialSection.className = 'social-sharing-section';
        socialSection.innerHTML = `
            <div class="sharing-header">
                <h4>🌟 Share Your Journey</h4>
                <p>Let others discover their personality type too!</p>
            </div>
            <div class="social-buttons">
                <button class="social-btn twitter" onclick="socialSystem.shareToX()">
                    <span class="social-icon">𝕏</span>
                    Share on X
                </button>
                <button class="social-btn facebook" onclick="socialSystem.shareToFacebook()">
                    <svg class="social-icon" viewBox="0 0 24 24" width="20" height="20">
                        <path fill="#1877f2" d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z"/>
                    </svg>
                    Facebook
                </button>
                <button class="social-btn linkedin" onclick="socialSystem.shareToLinkedIn()">
                    <svg class="social-icon" viewBox="0 0 24 24" width="20" height="20">
                        <path fill="#0077b5" d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z"/>
                    </svg>
                    LinkedIn
                </button>
                <button class="social-btn copy-link" onclick="socialSystem.copyLink()">
                    <span class="social-icon">🔗</span>
                    Copy Link
                </button>
                <button class="social-btn email" onclick="socialSystem.shareViaEmail()">
                    <span class="social-icon">📧</span>
                    Share via Email
                </button>
                <button class="social-btn tiktok" onclick="socialSystem.shareToTikTok()">
                    <svg class="social-icon" viewBox="0 0 24 24" width="20" height="20">
                        <path fill="#ff0050" d="M12.525.02c1.31-.02 2.61-.01 3.91-.02.08 1.53.63 3.09 1.75 4.17 1.12 1.11 2.7 1.62 4.24 1.79v4.03c-1.44-.05-2.89-.35-4.2-.97-.57-.26-1.1-.59-1.62-.93-.01 2.92.01 5.84-.02 8.75-.08 1.4-.54 2.79-1.35 3.94-1.31 1.92-3.58 3.17-5.91 3.21-1.43.08-2.86-.31-4.08-1.03-2.02-1.19-3.44-3.37-3.65-5.71-.02-.5-.03-1-.01-1.49.18-1.9 1.12-3.72 2.58-4.96 1.66-1.44 3.98-2.13 6.15-1.72.02 1.48-.04 2.96-.04 4.44-.99-.32-2.15-.23-3.02.37-.63.41-1.11 1.04-1.36 1.75-.21.51-.15 1.07-.14 1.61.24 1.64 1.82 3.02 3.5 2.87 1.12-.01 2.19-.66 2.77-1.61.19-.33.4-.67.41-1.06.1-1.79.06-3.57.07-5.36.01-4.03-.01-8.05.02-12.07z"/>
                    </svg>
                    TikTok
                </button>
            </div>
            <div class="share-stats">
                <p>Join thousands who've discovered their Enneagram type!</p>
            </div>
        `;

        resultContent.appendChild(socialSection);
    }

    createSupportSection() {
        const resultContent = document.getElementById('result-content');
        if (!resultContent) return;

        const supportSection = document.createElement('div');
        supportSection.className = 'support-creator-section';
        supportSection.innerHTML = `
            <div class="support-header">
                <h4>💝 Support the Creator</h4>
                <p>Help us create more amazing personality tools!</p>
            </div>
            <div class="support-options">
                <button class="support-btn coffee" onclick="socialSystem.buyMeCoffee()">
                    <span class="support-icon">☕</span>
                    Buy Me a Coffee
                </button>
                <button class="support-btn patreon" onclick="window.open('https://patreon.com/enneagramandbeyond', '_blank')">
                    <svg class="support-icon" viewBox="0 0 24 24" width="20" height="20">
                        <path fill="#f96854" d="M0 .48v23.04h4.22V.48zm15.385 0c-4.764 0-8.641 3.88-8.641 8.65 0 4.755 3.877 8.623 8.641 8.623 4.75 0 8.615-3.868 8.615-8.623C24 4.36 20.136.48 15.385.48z"/>
                    </svg>
                    Support on Patreon
                </button>
                <button class="support-btn github" onclick="window.open('https://github.com/wrek34/Enneagram-Quest', '_blank')">
                    <span class="support-icon">⭐</span>
                    Star on GitHub
                </button>
                <button class="support-btn repo" onclick="window.open('https://github.com/wrek34/Enneagram-Quest', '_blank')">
                    <svg class="support-icon" viewBox="0 0 24 24" width="20" height="20">
                        <path fill="#181717" d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z"/>
                    </svg>
                    View Repository
                </button>
                <button class="support-btn feedback" onclick="socialSystem.leaveFeedback()">
                    <span class="support-icon">💬</span>
                    Leave Feedback
                </button>
            </div>
            <div class="creator-info">
                <p>Created with ❤️ by <strong>Enneagram and Beyond</strong></p>
                <p>Follow us for more personality insights and tools!</p>
                <div class="follow-buttons">
                    <button class="follow-btn" onclick="window.open('https://www.tiktok.com/@enneagram.kaci', '_blank')">
                        <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor">
                            <path d="M12.525.02c1.31-.02 2.61-.01 3.91-.02.08 1.53.63 3.09 1.75 4.17 1.12 1.11 2.7 1.62 4.24 1.79v4.03c-1.44-.05-2.89-.35-4.2-.97-.57-.26-1.1-.59-1.62-.93-.01 2.92.01 5.84-.02 8.75-.08 1.4-.54 2.79-1.35 3.94-1.31 1.92-3.58 3.17-5.91 3.21-1.43.08-2.86-.31-4.08-1.03-2.02-1.19-3.44-3.37-3.65-5.71-.02-.5-.03-1-.01-1.49.18-1.9 1.12-3.72 2.58-4.96 1.66-1.44 3.98-2.13 6.15-1.72.02 1.48-.04 2.96-.04 4.44-.99-.32-2.15-.23-3.02.37-.63.41-1.11 1.04-1.36 1.75-.21.51-.15 1.07-.14 1.61.24 1.64 1.82 3.02 3.5 2.87 1.12-.01 2.19-.66 2.77-1.61.19-.33.4-.67.41-1.06.1-1.79.06-3.57.07-5.36.01-4.03-.01-8.05.02-12.07z"/>
                        </svg>
                        Follow on TikTok
                    </button>
                    <button class="follow-btn" onclick="window.open('https://instagram.com/hrenneagram.kaci', '_blank')">
                        <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor">
                            <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z"/>
                        </svg>
                        Follow on Instagram
                    </button>
                    <button class="follow-btn" onclick="window.open('https://msha.ke/kaciwieczorek', '_blank')">
                        🌐 Visit Website
                    </button>
                </div>
            </div>
        `;

        resultContent.appendChild(supportSection);
    }

    setupSharingMethods() {
        window.socialSystem = this; // Make available globally for onclick handlers
    }

    shareToX() {
        const dominantType = this.game.calculateDominantType();
        const typeData = enneagramTypes[dominantType];
        const wingInfo = this.game.wingsSystem ? this.game.wingsSystem.calculateWings(dominantType, this.game.typeScores) : null;
        const wingText = wingInfo && wingInfo.dominantWing ? `${dominantType}w${wingInfo.dominantWing}` : dominantType;
        
        const text = `🏛️ I just discovered I'm ${typeData.title} (Type ${wingText}) in Enneagram Quest!\n\n${typeData.description.substring(0, 100)}...\n\n✨ This adventure-style personality game is amazing! Discover YOUR type through an epic quest with RPG elements, achievements & immersive audio!\n\n🎮 Try it yourself:`;
        const url = 'https://wrek34.github.io/Enneagram-Quest';
        const hashtags = 'EnneagramQuest,PersonalityTest,SelfDiscovery,Enneagram,Adventure';
        
        const twitterUrl = `https://twitter.com/intent/tweet?text=${encodeURIComponent(text)}&url=${encodeURIComponent(url)}&hashtags=${hashtags}`;
        window.open(twitterUrl, '_blank', 'width=600,height=400');
        
        this.trackShare('x');
    }

    shareToFacebook() {
        const dominantType = this.game.calculateDominantType();
        const typeData = enneagramTypes[dominantType];
        const wingInfo = this.game.wingsSystem ? this.game.wingsSystem.calculateWings(dominantType, this.game.typeScores) : null;
        const wingText = wingInfo && wingInfo.dominantWing ? `${dominantType}w${wingInfo.dominantWing}` : dominantType;
        
        const url = 'https://wrek34.github.io/Enneagram-Quest';
        const quote = `I just discovered I'm ${typeData.title} (Type ${wingText}) through Enneagram Quest! This adventure-style personality game is amazing. What's your type? Try it yourself!`;
        const facebookUrl = `https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(url)}&quote=${encodeURIComponent(quote)}`;
        window.open(facebookUrl, '_blank', 'width=600,height=400');
        
        this.trackShare('facebook');
    }

    shareToLinkedIn() {
        const dominantType = this.game.calculateDominantType();
        const typeData = enneagramTypes[dominantType];
        const wingInfo = this.game.wingsSystem ? this.game.wingsSystem.calculateWings(dominantType, this.game.typeScores) : null;
        const wingText = wingInfo && wingInfo.dominantWing ? `${dominantType}w${wingInfo.dominantWing}` : dominantType;
        
        const title = 'Enneagram Quest - Adventure-Style Personality Discovery';
        const summary = `I just discovered I'm ${typeData.title} (Type ${wingText}) through Enneagram Quest! ${typeData.description.substring(0, 120)}... This immersive game combines personality assessment with RPG adventure. What's your type?`;
        const url = 'https://wrek34.github.io/Enneagram-Quest';
        
        const linkedInUrl = `https://www.linkedin.com/sharing/share-offsite/?url=${encodeURIComponent(url)}&title=${encodeURIComponent(title)}&summary=${encodeURIComponent(summary)}`;
        window.open(linkedInUrl, '_blank', 'width=600,height=400');
        
        this.trackShare('linkedin');
    }

    async copyLink() {
        const url = 'https://wrek34.github.io/Enneagram-Quest';
        try {
            await navigator.clipboard.writeText(url);
            this.showNotification('Link copied to clipboard! 📋', 'success');
        } catch (error) {
            // Fallback for older browsers
            const textArea = document.createElement('textarea');
            textArea.value = url;
            document.body.appendChild(textArea);
            textArea.select();
            document.execCommand('copy');
            document.body.removeChild(textArea);
            this.showNotification('Link copied to clipboard! 📋', 'success');
        }
        
        this.trackShare('copy');
    }

    shareViaEmail() {
        const dominantType = this.game.calculateDominantType();
        const typeData = enneagramTypes[dominantType];
        const wingInfo = this.game.wingsSystem ? this.game.wingsSystem.calculateWings(dominantType, this.game.typeScores) : null;
        const wingText = wingInfo && wingInfo.dominantWing ? `${dominantType}w${wingInfo.dominantWing}` : dominantType;
        
        const subject = 'Discover Your Personality Type Through Adventure! 🏛️';
        const body = `Hi!\n\nI just completed Enneagram Quest and discovered I'm ${typeData.title} (Type ${wingText})! 🎭\n\n${typeData.description}\n\nThis isn't just another personality test - it's a full adventure game featuring:\n✨ Immersive storytelling with 12+ scenarios\n🎮 RPG-style progression and achievements\n🎨 Avatar customization and visual effects\n🎵 Professional audio and musical themes\n📊 Detailed results with wing analysis\n\nDiscover YOUR personality type through this epic quest:\nhttps://wrek34.github.io/Enneagram-Quest\n\nI'd love to know what type you get! The adventure awaits! 🌟\n\nBest regards`;
        
        const emailUrl = `mailto:?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`;
        window.location.href = emailUrl;
        
        this.trackShare('email');
    }

    // Support methods
    buyMeCoffee() {
        // Replace with actual Buy Me a Coffee link
        const coffeeUrl = 'https://buymeacoffee.com/enneagramandbeyond';
        window.open(coffeeUrl, '_blank');
        this.trackSupport('coffee');
    }

    supportOnPatreon() {
        // Replace with actual Patreon link
        const patreonUrl = 'https://patreon.com/enneagramandbeyond';
        window.open(patreonUrl, '_blank');
        this.trackSupport('patreon');
    }

    starOnGitHub() {
        const githubUrl = 'https://github.com/wrek34/Enneagram-Quest';
        window.open(githubUrl, '_blank');
        this.trackSupport('github');
    }

    viewRepository() {
        const repoUrl = 'https://github.com/wrek34/Enneagram-Quest';
        window.open(repoUrl, '_blank');
        this.trackSupport('repository');
    }

    leaveFeedback() {
        const feedbackModal = document.createElement('div');
        feedbackModal.className = 'feedback-modal';
        feedbackModal.innerHTML = `
            <div class="feedback-content">
                <h3>💬 Share Your Feedback</h3>
                <p>Help us improve Enneagram Quest!</p>
                <div class="feedback-options">
                    <button class="feedback-option" onclick="socialSystem.openFeedbackForm('bug')">
                        🐛 Report a Bug
                    </button>
                    <button class="feedback-option" onclick="socialSystem.openFeedbackForm('feature')">
                        💡 Suggest a Feature
                    </button>
                    <button class="feedback-option" onclick="socialSystem.openFeedbackForm('general')">
                        💭 General Feedback
                    </button>
                    <button class="feedback-option" onclick="socialSystem.rateGame()">
                        ⭐ Rate the Game
                    </button>
                </div>
                <button class="close-feedback" onclick="socialSystem.closeFeedbackModal()">Close</button>
            </div>
        `;
        
        document.body.appendChild(feedbackModal);
        this.currentFeedbackModal = feedbackModal;
    }

    openFeedbackForm(type) {
        const forms = {
            bug: 'https://github.com/wrek34/Enneagram-Quest/issues/new?labels=bug&title=Bug%20Report:',
            feature: 'https://github.com/wrek34/Enneagram-Quest/issues/new?labels=enhancement&title=Feature%20Request:',
            general: 'mailto:feedback@enneagramandbeyond.com?subject=Enneagram Quest Feedback'
        };
        
        if (forms[type]) {
            window.open(forms[type], '_blank');
        }
        
        this.closeFeedbackModal();
        this.trackSupport('feedback');
    }

    rateGame() {
        const ratingModal = document.createElement('div');
        ratingModal.className = 'rating-modal';
        ratingModal.innerHTML = `
            <div class="rating-content">
                <h3>⭐ Rate Enneagram Quest</h3>
                <p>How would you rate your experience?</p>
                <div class="star-rating">
                    ${[1,2,3,4,5].map(i => `<span class="star" data-rating="${i}">⭐</span>`).join('')}
                </div>
                <textarea id="rating-comment" placeholder="Tell us what you loved or how we can improve..."></textarea>
                <div class="rating-buttons">
                    <button onclick="socialSystem.submitRating()">Submit Rating</button>
                    <button onclick="socialSystem.closeRatingModal()">Cancel</button>
                </div>
            </div>
        `;
        
        document.body.appendChild(ratingModal);
        this.currentRatingModal = ratingModal;
        
        // Add star rating functionality
        document.querySelectorAll('.star').forEach(star => {
            star.addEventListener('click', (e) => {
                const rating = parseInt(e.target.dataset.rating);
                this.selectedRating = rating;
                this.updateStarDisplay(rating);
            });
        });
        
        this.closeFeedbackModal();
    }

    updateStarDisplay(rating) {
        document.querySelectorAll('.star').forEach((star, index) => {
            star.style.opacity = index < rating ? '1' : '0.3';
        });
    }

    submitRating() {
        const comment = document.getElementById('rating-comment').value;
        const rating = this.selectedRating || 5;
        
        // Here you would typically send to your analytics service
        console.log('Rating submitted:', { rating, comment });
        
        this.showNotification('Thank you for your rating! 🌟', 'success');
        this.closeRatingModal();
        this.trackSupport('rating');
    }

    followTwitter() {
        window.open('https://twitter.com/enneagrambeyond', '_blank');
        this.trackSupport('follow-twitter');
    }

    followInstagram() {
        window.open('https://instagram.com/hrenneagram.kaci', '_blank');
        this.trackSupport('follow-instagram');
    }

    shareToTikTok() {
        const dominantType = this.game.calculateDominantType();
        const typeData = enneagramTypes[dominantType];
        const wingInfo = this.game.wingsSystem ? this.game.wingsSystem.calculateWings(dominantType, this.game.typeScores) : null;
        const wingText = wingInfo && wingInfo.dominantWing ? `${dominantType}w${wingInfo.dominantWing}` : dominantType;
        
        const text = `I just discovered I'm ${typeData.title} (Type ${wingText}) in Enneagram Quest! 🏛️ This adventure-style personality game is incredible! What's your type? Try it: https://wrek34.github.io/Enneagram-Quest #EnneagramQuest #PersonalityTest #Enneagram #SelfDiscovery`;
        
        // TikTok doesn't have a direct share URL, so we copy the text for users to paste
        navigator.clipboard.writeText(text).then(() => {
            this.showNotification('TikTok caption copied! Open TikTok to create your video 🎤', 'success');
            // Also open TikTok web
            window.open('https://www.tiktok.com/@enneagram.kaci', '_blank');
        }).catch(() => {
            // Fallback
            window.open('https://www.tiktok.com/@enneagram.kaci', '_blank');
            this.showNotification('Visit our TikTok @enneagram.kaci to share! 🎤', 'info');
        });
        
        this.trackShare('tiktok');
    }

    followTikTok() {
        window.open('https://www.tiktok.com/@enneagram.kaci', '_blank');
        this.trackSupport('follow-tiktok');
    }

    closeFeedbackModal() {
        if (this.currentFeedbackModal) {
            document.body.removeChild(this.currentFeedbackModal);
            this.currentFeedbackModal = null;
        }
    }

    closeRatingModal() {
        if (this.currentRatingModal) {
            document.body.removeChild(this.currentRatingModal);
            this.currentRatingModal = null;
        }
    }

    // Analytics tracking
    trackShare(platform) {
        console.log(`Shared on ${platform}`);
        // Add your analytics tracking here
    }

    trackSupport(action) {
        console.log(`Support action: ${action}`);
        // Add your analytics tracking here
    }

    showNotification(message, type = 'info') {
        const notification = document.createElement('div');
        notification.className = `share-notification ${type}`;
        notification.textContent = message;
        
        notification.style.cssText = `
            position: fixed;
            top: 20px;
            right: 20px;
            padding: 1rem 1.5rem;
            border-radius: 8px;
            color: white;
            z-index: 1001;
            animation: slideInRight 0.3s ease, slideOutRight 0.3s ease 2.7s forwards;
            background: ${type === 'success' ? '#27ae60' : '#3498db'};
            box-shadow: 0 4px 12px rgba(0, 0, 0, 0.2);
        `;

        document.body.appendChild(notification);

        setTimeout(() => {
            if (document.body.contains(notification)) {
                document.body.removeChild(notification);
            }
        }, 3000);
    }
}

// Initialize social sharing system
document.addEventListener('DOMContentLoaded', () => {
    const initSocial = () => {
        if (window.game) {
            new SocialSharingSystem(window.game);
            console.log('📱 Social sharing system loaded');
        } else {
            setTimeout(initSocial, 100);
        }
    };
    initSocial();
});
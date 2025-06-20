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
                    <span class="social-icon">📘</span>
                    Share on Facebook
                </button>
                <button class="social-btn linkedin" onclick="socialSystem.shareToLinkedIn()">
                    <span class="social-icon">💼</span>
                    Share on LinkedIn
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
                    <span class="social-icon">🎤</span>
                    Share on TikTok
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
                <button class="support-btn patreon" onclick="socialSystem.supportOnPatreon()">
                    <span class="support-icon">🎨</span>
                    Support on Patreon
                </button>
                <button class="support-btn github" onclick="socialSystem.starOnGitHub()">
                    <span class="support-icon">⭐</span>
                    Star on GitHub
                </button>
                <button class="support-btn repo" onclick="socialSystem.viewRepository()">
                    <span class="support-icon">📂</span>
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
                    <button class="follow-btn" onclick="socialSystem.followTikTok()">
                        🎤 Follow on TikTok
                    </button>
                    <button class="follow-btn" onclick="socialSystem.followInstagram()">
                        📸 Follow on Instagram
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
        const url = 'https://wrek34.github.io/Enneagram-Quest';
        const facebookUrl = `https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(url)}`;
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
// Simple sharing system for easy link sharing
class SimpleSharing {
    constructor() {
        this.gameUrl = 'https://wrek34.github.io/Enneagram-Quest/';
        this.initializeSimpleSharing();
    }

    initializeSimpleSharing() {
        this.addSimpleShareButton();
    }

    addSimpleShareButton() {
        // Add to intro screen
        setTimeout(() => {
            this.addShareToIntro();
        }, 2000);

        // Add to results screen
        const originalShowResults = window.game?.showResults;
        if (originalShowResults) {
            window.game.showResults = () => {
                originalShowResults.call(window.game);
                setTimeout(() => {
                    this.addShareToResults();
                }, 1000);
            };
        }
    }

    addShareToIntro() {
        const introScreen = document.getElementById('intro-screen');
        if (!introScreen || document.querySelector('.simple-share-intro')) return;

        const shareSection = document.createElement('div');
        shareSection.className = 'simple-share-intro';
        shareSection.innerHTML = `
            <div class="share-prompt">
                <p>💫 Love personality tests? Share this adventure with friends!</p>
                <button class="quick-share-btn" onclick="simpleSharing.quickShare()">
                    📤 Share Enneagram Quest
                </button>
            </div>
        `;

        introScreen.appendChild(shareSection);
    }

    addShareToResults() {
        const resultContent = document.getElementById('result-content');
        if (!resultContent || document.querySelector('.simple-share-results')) return;

        const shareSection = document.createElement('div');
        shareSection.className = 'simple-share-results';
        shareSection.innerHTML = `
            <div class="results-share-section">
                <h4>🌟 Share Your Discovery!</h4>
                <p>Help others discover their personality type through this adventure</p>
                <button class="share-results-btn" onclick="simpleSharing.shareResults()">
                    🚀 Share Enneagram Quest
                </button>
            </div>
        `;

        resultContent.appendChild(shareSection);
    }

    quickShare() {
        this.showShareModal('Share this amazing personality adventure with your friends!');
    }

    shareResults() {
        const dominantType = window.game?.calculateDominantType();
        const typeData = dominantType ? enneagramTypes[dominantType] : null;
        const message = typeData ? 
            `I just discovered I'm ${typeData.title} through this incredible adventure game! What's your personality type?` :
            'I just completed this amazing personality adventure! Discover your Enneagram type through an epic quest!';
        
        this.showShareModal(message);
    }

    showShareModal(customMessage) {
        const modal = document.createElement('div');
        modal.className = 'share-modal';
        modal.innerHTML = `
            <div class="share-modal-content">
                <div class="share-header">
                    <h3>📤 Share Enneagram Quest</h3>
                    <button class="close-modal" onclick="this.parentElement.parentElement.parentElement.remove()">×</button>
                </div>
                
                <div class="share-message">
                    <p>${customMessage}</p>
                </div>

                <div class="share-options">
                    <div class="share-platforms">
                        <button class="platform-btn twitter" onclick="simpleSharing.shareToX('${customMessage}')">
                            <span class="platform-icon">𝕏</span>
                            X
                        </button>
                        <button class="platform-btn facebook" onclick="simpleSharing.shareToFacebook()">
                            <span class="platform-icon">f</span>
                            Facebook
                        </button>
                        <button class="platform-btn linkedin" onclick="simpleSharing.shareToLinkedIn('${customMessage}')">
                            <span class="platform-icon">in</span>
                            LinkedIn
                        </button>
                        <button class="platform-btn whatsapp" onclick="simpleSharing.shareToWhatsApp('${customMessage}')">
                            <span class="platform-icon">💬</span>
                            WhatsApp
                        </button>
                        <button class="platform-btn email" onclick="simpleSharing.shareViaEmail('${customMessage}')">
                            <span class="platform-icon">📧</span>
                            Email
                        </button>
                        <button class="platform-btn copy" onclick="simpleSharing.copyLink()">
                            <span class="platform-icon">🔗</span>
                            Copy Link
                        </button>
                    </div>
                </div>

                <div class="share-link-section">
                    <label>Or copy this link:</label>
                    <div class="link-copy-box">
                        <input type="text" value="${this.gameUrl}" readonly id="share-link-input">
                        <button onclick="simpleSharing.copyFromInput()" class="copy-btn">Copy</button>
                    </div>
                </div>
            </div>
        `;

        document.body.appendChild(modal);
        
        // Close modal when clicking outside
        modal.addEventListener('click', (e) => {
            if (e.target === modal) {
                modal.remove();
            }
        });
    }

    shareToX(message) {
        const text = `${message}\\n\\n🏛️ Play Enneagram Quest - An adventure-style personality test!\\n\\n#EnneagramQuest #PersonalityTest #Adventure`;
        const url = `https://twitter.com/intent/tweet?text=${encodeURIComponent(text)}&url=${encodeURIComponent(this.gameUrl)}`;
        window.open(url, '_blank', 'width=600,height=400');
        this.closeModal();
    }

    shareToFacebook() {
        const url = `https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(this.gameUrl)}`;
        window.open(url, '_blank', 'width=600,height=400');
        this.closeModal();
    }

    shareToLinkedIn(message) {
        const title = 'Enneagram Quest - Adventure-Style Personality Test';
        const summary = `${message} Discover your Enneagram type through an immersive adventure game!`;
        const url = `https://www.linkedin.com/sharing/share-offsite/?url=${encodeURIComponent(this.gameUrl)}&title=${encodeURIComponent(title)}&summary=${encodeURIComponent(summary)}`;
        window.open(url, '_blank', 'width=600,height=400');
        this.closeModal();
    }

    shareToWhatsApp(message) {
        const text = `${message}\\n\\n🏛️ Try Enneagram Quest: ${this.gameUrl}`;
        const url = `https://wa.me/?text=${encodeURIComponent(text)}`;
        window.open(url, '_blank');
        this.closeModal();
    }

    shareViaEmail(message) {
        const subject = 'Try this amazing personality adventure game!';
        const body = `${message}\\n\\nI thought you'd enjoy this immersive personality test that's like playing an adventure game!\\n\\n🏛️ Play Enneagram Quest: ${this.gameUrl}\\n\\nIt combines personality assessment with RPG elements, achievements, and beautiful audio. Let me know what personality type you get!`;
        const url = `mailto:?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`;
        window.location.href = url;
        this.closeModal();
    }

    async copyLink() {
        try {
            await navigator.clipboard.writeText(this.gameUrl);
            this.showNotification('Link copied to clipboard! 📋');
        } catch (error) {
            this.copyFromInput();
        }
        this.closeModal();
    }

    copyFromInput() {
        const input = document.getElementById('share-link-input');
        if (input) {
            input.select();
            document.execCommand('copy');
            this.showNotification('Link copied to clipboard! 📋');
        }
    }

    closeModal() {
        const modal = document.querySelector('.share-modal');
        if (modal) {
            modal.remove();
        }
    }

    showNotification(message) {
        const notification = document.createElement('div');
        notification.className = 'simple-notification';
        notification.textContent = message;
        notification.style.cssText = `
            position: fixed;
            top: 20px;
            right: 20px;
            background: #27ae60;
            color: white;
            padding: 1rem 1.5rem;
            border-radius: 8px;
            z-index: 1002;
            font-weight: bold;
            animation: slideInRight 0.3s ease, slideOutRight 0.3s ease 2.5s forwards;
            box-shadow: 0 4px 12px rgba(39, 174, 96, 0.3);
        `;

        document.body.appendChild(notification);

        setTimeout(() => {
            if (document.body.contains(notification)) {
                document.body.removeChild(notification);
            }
        }, 3000);
    }
}

// Initialize simple sharing
document.addEventListener('DOMContentLoaded', () => {
    window.simpleSharing = new SimpleSharing();
    console.log('📤 Simple sharing system loaded');
});
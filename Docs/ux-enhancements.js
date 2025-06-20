// User Experience Enhancements
class UXEnhancements {
    constructor(game) {
        this.game = game;
        this.initializeEnhancements();
    }

    initializeEnhancements() {
        this.addProgressIndicator();
        this.addChoicePreview();
        this.addPersonalizedGreeting();
        this.addSmartHints();
        this.addQuickActions();
        this.addResultsPreview();
        this.addAccessibilityFeatures();
    }

    // Visual progress indicator
    addProgressIndicator() {
        const progressBar = document.createElement('div');
        progressBar.className = 'quest-progress';
        progressBar.innerHTML = `
            <div class="progress-header">
                <span class="progress-text">Quest Progress</span>
                <span class="progress-percentage">0%</span>
            </div>
            <div class="progress-bar">
                <div class="progress-fill" id="progress-fill"></div>
            </div>
            <div class="progress-details">
                <span class="current-step">Step 1</span>
                <span class="total-steps">of 12</span>
            </div>
        `;

        const gameContainer = document.getElementById('game-container');
        if (gameContainer) {
            gameContainer.insertBefore(progressBar, gameContainer.firstChild);
        }

        // Update progress on each choice
        const originalSelectChoice = this.game.selectChoice.bind(this.game);
        this.game.selectChoice = (choiceElement) => {
            originalSelectChoice(choiceElement);
            this.updateProgress();
        };
    }

    updateProgress() {
        const current = this.game.currentScenario + 1;
        const total = this.game.totalScenarios || 12;
        const percentage = Math.round((current / total) * 100);

        const progressFill = document.getElementById('progress-fill');
        const progressPercentage = document.querySelector('.progress-percentage');
        const currentStep = document.querySelector('.current-step');

        if (progressFill) progressFill.style.width = `${percentage}%`;
        if (progressPercentage) progressPercentage.textContent = `${percentage}%`;
        if (currentStep) currentStep.textContent = `Step ${current}`;
    }

    // Choice preview on hover
    addChoicePreview() {
        const originalDisplayScenario = this.game.displayScenario.bind(this.game);
        this.game.displayScenario = () => {
            originalDisplayScenario();
            
            setTimeout(() => {
                document.querySelectorAll('.choice').forEach(choice => {
                    choice.addEventListener('mouseenter', (e) => {
                        this.showChoicePreview(e.target);
                    });
                    choice.addEventListener('mouseleave', () => {
                        this.hideChoicePreview();
                    });
                });
            }, 500);
        };
    }

    showChoicePreview(choiceElement) {
        const preview = document.createElement('div');
        preview.className = 'choice-preview';
        preview.innerHTML = `
            <div class="preview-content">
                <p>This choice reflects...</p>
                <div class="preview-traits">
                    <span class="trait-hint">💭 Thoughtful approach</span>
                </div>
            </div>
        `;

        choiceElement.appendChild(preview);
        preview.style.animation = 'fadeIn 0.3s ease';
    }

    hideChoicePreview() {
        document.querySelectorAll('.choice-preview').forEach(preview => {
            preview.remove();
        });
    }

    // Personalized greeting based on time and progress
    addPersonalizedGreeting() {
        const hour = new Date().getHours();
        let greeting = 'Welcome';
        
        if (hour < 12) greeting = 'Good morning';
        else if (hour < 17) greeting = 'Good afternoon';
        else greeting = 'Good evening';

        const savedProgress = localStorage.getItem('enneagram-progress');
        if (savedProgress) {
            greeting += ', welcome back';
        }

        const introText = document.querySelector('#intro-screen h1');
        if (introText) {
            const personalGreeting = document.createElement('p');
            personalGreeting.className = 'personal-greeting';
            personalGreeting.textContent = `${greeting}! Ready to continue your journey of self-discovery?`;
            introText.parentNode.insertBefore(personalGreeting, introText.nextSibling);
        }
    }

    // Smart hints based on user behavior
    addSmartHints() {
        this.hintTimer = 0;
        this.lastChoiceTime = Date.now();

        const originalDisplayScenario = this.game.displayScenario.bind(this.game);
        this.game.displayScenario = () => {
            originalDisplayScenario();
            this.startHintTimer();
        };
    }

    startHintTimer() {
        this.lastChoiceTime = Date.now();
        
        setTimeout(() => {
            if (Date.now() - this.lastChoiceTime > 30000) { // 30 seconds
                this.showHint();
            }
        }, 30000);
    }

    showHint() {
        const hints = [
            "💡 Take your time - there are no wrong answers!",
            "🎯 Choose the option that feels most natural to you",
            "✨ Trust your first instinct",
            "🤔 Consider what you would actually do, not what you think you should do"
        ];

        const randomHint = hints[Math.floor(Math.random() * hints.length)];
        this.showFloatingMessage(randomHint, 'hint');
    }

    // Quick action buttons
    addQuickActions() {
        const quickActions = document.createElement('div');
        quickActions.className = 'quick-actions';
        quickActions.innerHTML = `
            <button class="quick-btn" onclick="uxEnhancements.pauseGame()" title="Pause Game">
                ⏸️
            </button>
            <button class="quick-btn" onclick="uxEnhancements.showJournal()" title="View Journal">
                📖
            </button>
            <button class="quick-btn" onclick="uxEnhancements.showStats()" title="View Stats">
                📊
            </button>
            <button class="quick-btn" onclick="uxEnhancements.toggleFullscreen()" title="Fullscreen">
                ⛶
            </button>
        `;

        document.body.appendChild(quickActions);
        window.uxEnhancements = this; // Make available globally
    }

    pauseGame() {
        const pauseModal = document.createElement('div');
        pauseModal.className = 'pause-modal';
        pauseModal.innerHTML = `
            <div class="pause-content">
                <h3>⏸️ Game Paused</h3>
                <p>Take a moment to reflect on your journey so far.</p>
                <div class="pause-actions">
                    <button onclick="this.parentElement.parentElement.parentElement.remove()">
                        ▶️ Continue
                    </button>
                    <button onclick="location.reload()">
                        🔄 Restart
                    </button>
                </div>
            </div>
        `;
        document.body.appendChild(pauseModal);
    }

    showStats() {
        const stats = {
            level: this.game.playerStats?.level || 1,
            wisdom: this.game.playerStats?.wisdom || 0,
            courage: this.game.playerStats?.courage || 0,
            compassion: this.game.playerStats?.compassion || 0,
            items: this.game.inventory?.length || 0
        };

        const statsModal = document.createElement('div');
        statsModal.className = 'stats-modal';
        statsModal.innerHTML = `
            <div class="stats-content">
                <h3>📊 Your Stats</h3>
                <div class="stats-grid">
                    <div class="stat-item">
                        <span class="stat-icon">⭐</span>
                        <span class="stat-label">Level</span>
                        <span class="stat-value">${stats.level}</span>
                    </div>
                    <div class="stat-item">
                        <span class="stat-icon">🧠</span>
                        <span class="stat-label">Wisdom</span>
                        <span class="stat-value">${stats.wisdom}</span>
                    </div>
                    <div class="stat-item">
                        <span class="stat-icon">⚔️</span>
                        <span class="stat-label">Courage</span>
                        <span class="stat-value">${stats.courage}</span>
                    </div>
                    <div class="stat-item">
                        <span class="stat-icon">💝</span>
                        <span class="stat-label">Compassion</span>
                        <span class="stat-value">${stats.compassion}</span>
                    </div>
                    <div class="stat-item">
                        <span class="stat-icon">💎</span>
                        <span class="stat-label">Items</span>
                        <span class="stat-value">${stats.items}</span>
                    </div>
                </div>
                <button onclick="this.parentElement.parentElement.remove()">Close</button>
            </div>
        `;
        document.body.appendChild(statsModal);
    }

    toggleFullscreen() {
        if (!document.fullscreenElement) {
            document.documentElement.requestFullscreen();
        } else {
            document.exitFullscreen();
        }
    }

    // Results preview during game
    addResultsPreview() {
        const originalSelectChoice = this.game.selectChoice.bind(this.game);
        this.game.selectChoice = (choiceElement) => {
            originalSelectChoice(choiceElement);
            
            if (this.game.currentScenario >= 3) { // After 3 questions
                setTimeout(() => {
                    this.showCurrentLeading();
                }, 1000);
            }
        };
    }

    showCurrentLeading() {
        const scores = this.game.typeScores;
        const topType = Object.entries(scores).reduce((a, b) => scores[a[0]] > scores[b[0]] ? a : b)[0];
        
        if (scores[topType] >= 2) {
            const typeData = enneagramTypes[topType];
            const preview = document.createElement('div');
            preview.className = 'type-preview';
            preview.innerHTML = `
                <div class="preview-header">
                    <span>🎯 Currently Leading</span>
                    <button onclick="this.parentElement.parentElement.remove()">×</button>
                </div>
                <div class="preview-type">
                    <h4>${typeData.title}</h4>
                    <p>${typeData.description.substring(0, 100)}...</p>
                </div>
            `;
            
            document.body.appendChild(preview);
            
            setTimeout(() => {
                if (document.body.contains(preview)) {
                    preview.remove();
                }
            }, 5000);
        }
    }

    // Enhanced accessibility features
    addAccessibilityFeatures() {
        // Add skip links
        const skipLink = document.createElement('a');
        skipLink.href = '#main-content';
        skipLink.className = 'skip-link';
        skipLink.textContent = 'Skip to main content';
        document.body.insertBefore(skipLink, document.body.firstChild);

        // Add focus management
        this.addFocusManagement();
        
        // Add keyboard shortcuts
        this.addKeyboardShortcuts();
        
        // Add screen reader announcements
        this.addScreenReaderSupport();
    }

    addFocusManagement() {
        const originalDisplayScenario = this.game.displayScenario.bind(this.game);
        this.game.displayScenario = () => {
            originalDisplayScenario();
            
            setTimeout(() => {
                const firstChoice = document.querySelector('.choice');
                if (firstChoice) {
                    firstChoice.focus();
                }
            }, 500);
        };
    }

    addKeyboardShortcuts() {
        document.addEventListener('keydown', (e) => {
            if (e.ctrlKey || e.metaKey) {
                switch(e.key) {
                    case 'j':
                        e.preventDefault();
                        this.showJournal();
                        break;
                    case 's':
                        e.preventDefault();
                        this.showStats();
                        break;
                    case 'p':
                        e.preventDefault();
                        this.pauseGame();
                        break;
                }
            }
            
            // Number keys for choice selection
            if (e.key >= '1' && e.key <= '9') {
                const choiceIndex = parseInt(e.key) - 1;
                const choices = document.querySelectorAll('.choice');
                if (choices[choiceIndex]) {
                    choices[choiceIndex].click();
                }
            }
        });
    }

    addScreenReaderSupport() {
        // Create live region for announcements
        const liveRegion = document.createElement('div');
        liveRegion.setAttribute('aria-live', 'polite');
        liveRegion.setAttribute('aria-atomic', 'true');
        liveRegion.className = 'sr-only';
        liveRegion.id = 'live-region';
        document.body.appendChild(liveRegion);

        // Announce progress updates
        const originalUpdateProgress = this.updateProgress.bind(this);
        this.updateProgress = () => {
            originalUpdateProgress();
            
            const current = this.game.currentScenario + 1;
            const total = this.game.totalScenarios || 12;
            this.announceToScreenReader(`Progress: Step ${current} of ${total}`);
        };
    }

    announceToScreenReader(message) {
        const liveRegion = document.getElementById('live-region');
        if (liveRegion) {
            liveRegion.textContent = message;
        }
    }

    showFloatingMessage(message, type = 'info') {
        const floatingMsg = document.createElement('div');
        floatingMsg.className = `floating-message ${type}`;
        floatingMsg.textContent = message;
        floatingMsg.style.cssText = `
            position: fixed;
            top: 50%;
            left: 50%;
            transform: translate(-50%, -50%);
            background: rgba(0, 0, 0, 0.8);
            color: white;
            padding: 1rem 2rem;
            border-radius: 25px;
            z-index: 1000;
            animation: fadeInOut 3s ease;
            font-weight: bold;
            text-align: center;
            max-width: 300px;
        `;

        document.body.appendChild(floatingMsg);

        setTimeout(() => {
            if (document.body.contains(floatingMsg)) {
                document.body.removeChild(floatingMsg);
            }
        }, 3000);
    }

    showJournal() {
        // This would integrate with existing journal system
        if (this.game.advancedFeatures && this.game.advancedFeatures.showJournal) {
            this.game.advancedFeatures.showJournal();
        } else {
            this.showFloatingMessage('📖 Journal feature coming soon!');
        }
    }
}

// Initialize UX enhancements
document.addEventListener('DOMContentLoaded', () => {
    const initUX = () => {
        if (window.game) {
            new UXEnhancements(window.game);
            console.log('✨ UX enhancements loaded');
        } else {
            setTimeout(initUX, 100);
        }
    };
    initUX();
});
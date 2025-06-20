// Enhanced features for Enneagram Quest
class GameEnhancements {
    constructor(game) {
        this.game = game;
        this.initializeEnhancements();
    }

    initializeEnhancements() {
        this.addSaveSystem();
        this.addDifficultyModes();
        this.addPersonalityInsights();
        this.addSocialFeatures();
        this.addGameModes();
    }

    // Save/Load System
    addSaveSystem() {
        this.game.saveGame = () => {
            const saveData = {
                currentScenario: this.game.currentScenario,
                typeScores: this.game.typeScores,
                playerStats: this.game.playerStats,
                inventory: this.game.inventory,
                achievements: this.game.achievements.achievements,
                timestamp: Date.now()
            };
            localStorage.setItem('enneagram-quest-save', JSON.stringify(saveData));
            this.showNotification('Game Saved!', 'success');
        };

        this.game.loadGame = () => {
            const saveData = localStorage.getItem('enneagram-quest-save');
            if (saveData) {
                const data = JSON.parse(saveData);
                this.game.currentScenario = data.currentScenario;
                this.game.typeScores = data.typeScores;
                this.game.playerStats = data.playerStats;
                this.game.inventory = data.inventory;
                this.game.updateHUD();
                this.showNotification('Game Loaded!', 'success');
                return true;
            }
            return false;
        };

        // Add save/load buttons to HUD
        const saveBtn = document.createElement('button');
        saveBtn.className = 'hud-btn';
        saveBtn.textContent = '💾';
        saveBtn.title = 'Save Game';
        saveBtn.onclick = () => this.game.saveGame();
        
        const loadBtn = document.createElement('button');
        loadBtn.className = 'hud-btn';
        loadBtn.textContent = '📁';
        loadBtn.title = 'Load Game';
        loadBtn.onclick = () => this.game.loadGame();

        document.querySelector('.hud-section:last-child').prepend(loadBtn, saveBtn);
    }

    // Difficulty Modes
    addDifficultyModes() {
        this.game.difficulty = 'normal';
        this.game.difficultySettings = {
            easy: { scenarios: 8, statMultiplier: 1.5, itemChance: 0.5 },
            normal: { scenarios: 12, statMultiplier: 1, itemChance: 0.3 },
            hard: { scenarios: 16, statMultiplier: 0.7, itemChance: 0.1 }
        };

        this.game.setDifficulty = (level) => {
            this.game.difficulty = level;
            const settings = this.game.difficultySettings[level];
            this.game.selectedScenarios = this.game.selectDiverseScenarios(allScenarios, settings.scenarios);
            this.showNotification(`Difficulty set to ${level.toUpperCase()}`, 'info');
        };

        // Add difficulty selector to intro screen
        const difficultySelector = document.createElement('div');
        difficultySelector.className = 'difficulty-selector';
        difficultySelector.innerHTML = `
            <h3>Choose Difficulty</h3>
            <div class="difficulty-buttons">
                <button class="difficulty-btn" data-difficulty="easy">Easy (8 questions)</button>
                <button class="difficulty-btn active" data-difficulty="normal">Normal (12 questions)</button>
                <button class="difficulty-btn" data-difficulty="hard">Hard (16 questions)</button>
            </div>
        `;

        document.getElementById('intro-screen').insertBefore(
            difficultySelector, 
            document.getElementById('start-btn')
        );

        document.querySelectorAll('.difficulty-btn').forEach(btn => {
            btn.addEventListener('click', (e) => {
                document.querySelectorAll('.difficulty-btn').forEach(b => b.classList.remove('active'));
                e.target.classList.add('active');
                this.game.setDifficulty(e.target.dataset.difficulty);
            });
        });
    }

    // Personality Insights
    addPersonalityInsights() {
        this.game.getPersonalityInsights = () => {
            const scores = this.game.typeScores;
            const sortedTypes = Object.entries(scores)
                .sort(([,a], [,b]) => b - a)
                .slice(0, 3);

            return {
                primary: sortedTypes[0],
                secondary: sortedTypes[1],
                tertiary: sortedTypes[2],
                balance: this.calculateBalance(scores)
            };
        };

        this.calculateBalance = (scores) => {
            const values = Object.values(scores);
            const max = Math.max(...values);
            const min = Math.min(...values);
            return max === 0 ? 100 : Math.round((1 - (max - min) / max) * 100);
        };

        // Enhanced results display
        const originalShowResults = this.game.showResults.bind(this.game);
        this.game.showResults = () => {
            originalShowResults();
            
            const insights = this.game.getPersonalityInsights();
            const insightsHTML = `
                <div class="personality-insights">
                    <h4>Personality Insights</h4>
                    <div class="insight-grid">
                        <div class="insight-card">
                            <h5>Primary Type</h5>
                            <p>Type ${insights.primary[0]} (${insights.primary[1]} points)</p>
                        </div>
                        <div class="insight-card">
                            <h5>Secondary Influence</h5>
                            <p>Type ${insights.secondary[0]} (${insights.secondary[1]} points)</p>
                        </div>
                        <div class="insight-card">
                            <h5>Personality Balance</h5>
                            <p>${insights.balance}% balanced across types</p>
                        </div>
                    </div>
                </div>
            `;
            
            document.getElementById('result-content').insertAdjacentHTML('beforeend', insightsHTML);
        };
    }

    // Social Features
    addSocialFeatures() {
        this.game.shareResults = (type) => {
            const typeData = enneagramTypes[type];
            const text = `I just discovered I'm ${typeData.title} in Enneagram Quest! 🏛️ What's your personality type?`;
            const url = window.location.href;

            if (navigator.share) {
                navigator.share({ title: 'Enneagram Quest Results', text, url });
            } else {
                navigator.clipboard.writeText(`${text} ${url}`);
                this.showNotification('Results copied to clipboard!', 'success');
            }
        };

        this.game.compareWithFriends = () => {
            const modal = document.createElement('div');
            modal.className = 'social-modal';
            modal.innerHTML = `
                <div class="modal-content">
                    <h3>Compare with Friends</h3>
                    <p>Share your quest link and compare personality types!</p>
                    <div class="share-options">
                        <button class="share-btn" onclick="game.shareResults(${this.game.calculateDominantType()})">
                            📱 Share Results
                        </button>
                        <button class="share-btn" onclick="navigator.clipboard.writeText('${window.location.href}')">
                            🔗 Copy Link
                        </button>
                    </div>
                    <button class="close-modal">Close</button>
                </div>
            `;
            
            document.body.appendChild(modal);
            modal.querySelector('.close-modal').onclick = () => document.body.removeChild(modal);
        };

        // Add social buttons to results
        const socialButtons = document.createElement('div');
        socialButtons.className = 'social-buttons';
        socialButtons.innerHTML = `
            <button class="social-btn" onclick="game.shareResults(${this.game.calculateDominantType()})">
                📱 Share Results
            </button>
            <button class="social-btn" onclick="game.compareWithFriends()">
                👥 Compare with Friends
            </button>
        `;
        
        document.getElementById('result-screen').appendChild(socialButtons);
    }

    // Game Modes
    addGameModes() {
        this.game.modes = {
            story: { name: 'Story Mode', description: 'Full adventure experience' },
            quick: { name: 'Quick Assessment', description: '5 key questions only' },
            challenge: { name: 'Challenge Mode', description: 'Timed decisions' }
        };

        this.game.currentMode = 'story';

        this.game.setGameMode = (mode) => {
            this.game.currentMode = mode;
            
            switch(mode) {
                case 'quick':
                    this.game.selectedScenarios = this.selectKeyScenarios(5);
                    break;
                case 'challenge':
                    this.game.timeLimit = 30; // seconds per question
                    this.addTimer();
                    break;
                default:
                    // Story mode is default
                    break;
            }
        };

        this.selectKeyScenarios = (count) => {
            // Select most differentiating scenarios
            const keyScenarios = allScenarios.filter(s => 
                s.choices.some(c => c.types.length <= 2)
            );
            return keyScenarios.slice(0, count);
        };

        this.addTimer = () => {
            let timeLeft = this.game.timeLimit;
            const timer = document.createElement('div');
            timer.className = 'game-timer';
            timer.textContent = `Time: ${timeLeft}s`;
            
            document.getElementById('game-screen').prepend(timer);
            
            const countdown = setInterval(() => {
                timeLeft--;
                timer.textContent = `Time: ${timeLeft}s`;
                
                if (timeLeft <= 0) {
                    clearInterval(countdown);
                    this.game.nextScenario(); // Auto-advance
                }
            }, 1000);
        };
    }

    showNotification(message, type = 'info') {
        const notification = document.createElement('div');
        notification.className = `game-notification ${type}`;
        notification.textContent = message;
        
        document.body.appendChild(notification);
        
        setTimeout(() => {
            if (document.body.contains(notification)) {
                document.body.removeChild(notification);
            }
        }, 3000);
    }
}

// Enhanced particle effects
class AdvancedParticleSystem {
    constructor(canvas) {
        this.canvas = canvas;
        this.ctx = canvas.getContext('2d');
        this.particles = [];
        this.effects = [];
    }

    createBurstEffect(x, y, color = '#4a90e2') {
        for (let i = 0; i < 10; i++) {
            this.particles.push({
                x, y,
                vx: (Math.random() - 0.5) * 8,
                vy: (Math.random() - 0.5) * 8,
                life: 1,
                decay: 0.02,
                color,
                size: Math.random() * 4 + 2
            });
        }
    }

    createTrailEffect(startX, startY, endX, endY) {
        const steps = 20;
        for (let i = 0; i < steps; i++) {
            const progress = i / steps;
            this.particles.push({
                x: startX + (endX - startX) * progress,
                y: startY + (endY - startY) * progress,
                vx: 0, vy: 0,
                life: 1 - progress * 0.5,
                decay: 0.01,
                color: `hsl(${240 + progress * 60}, 70%, 60%)`,
                size: 3
            });
        }
    }

    update() {
        this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);
        
        this.particles = this.particles.filter(particle => {
            particle.x += particle.vx;
            particle.y += particle.vy;
            particle.life -= particle.decay;
            particle.vx *= 0.98; // Friction
            particle.vy *= 0.98;
            
            this.ctx.globalAlpha = particle.life;
            this.ctx.fillStyle = particle.color;
            this.ctx.beginPath();
            this.ctx.arc(particle.x, particle.y, particle.size, 0, Math.PI * 2);
            this.ctx.fill();
            
            return particle.life > 0;
        });
        
        requestAnimationFrame(() => this.update());
    }
}
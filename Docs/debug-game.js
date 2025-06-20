// Debug version with error handling and logging
class DebugEnneagramQuestGame {
    constructor() {
        console.log('🎮 Initializing Enneagram Quest Game...');
        
        // Initialize basic properties
        this.currentScenario = 0;
        this.typeScores = { 1: 0, 2: 0, 3: 0, 4: 0, 5: 0, 6: 0, 7: 0, 8: 0, 9: 0 };
        this.selectedScenarios = [];
        this.currentChoice = null;
        
        // Game stats
        this.playerStats = {
            health: 100,
            wisdom: 0,
            courage: 0,
            compassion: 0,
            level: 1,
            experience: 0
        };
        this.inventory = [];
        this.soundEnabled = true;
        
        // Initialize components
        this.initializeGame();
    }

    initializeGame() {
        console.log('🔧 Setting up game components...');
        
        try {
            // Check if required elements exist
            this.checkRequiredElements();
            
            // Select scenarios - use all 16 questions
            this.selectedScenarios = this.selectDiverseScenarios(allScenarios, 16);
            this.totalScenarios = 16;
            console.log(`📚 Selected ${this.selectedScenarios.length} scenarios`);
            
            // Initialize systems
            this.createSoundSystem();
            this.createParticleSystem();
            this.initializeAchievements();
            
            // Bind event listeners
            this.bindEventListeners();
            
            console.log('✅ Game initialization complete!');
            
        } catch (error) {
            console.error('❌ Game initialization failed:', error);
            this.showErrorMessage('Game failed to initialize. Please refresh the page.');
        }
    }

    checkRequiredElements() {
        const requiredElements = [
            'start-btn', 'game-screen', 'intro-screen', 'result-screen',
            'scenario-title', 'scenario-text', 'choices-container', 'next-btn'
        ];
        
        const missing = requiredElements.filter(id => !document.getElementById(id));
        
        if (missing.length > 0) {
            throw new Error(`Missing required elements: ${missing.join(', ')}`);
        }
        
        console.log('✅ All required elements found');
    }

    bindEventListeners() {
        console.log('🔗 Binding event listeners...');
        
        // Start button
        const startBtn = document.getElementById('start-btn');
        if (startBtn) {
            startBtn.addEventListener('click', () => {
                console.log('🚀 Start button clicked');
                this.startGame();
            });
        }
        
        // Next button
        const nextBtn = document.getElementById('next-btn');
        if (nextBtn) {
            nextBtn.addEventListener('click', () => {
                console.log('➡️ Next button clicked');
                this.nextScenario();
            });
        }
        
        // Restart button
        const restartBtn = document.getElementById('restart-btn');
        if (restartBtn) {
            restartBtn.addEventListener('click', () => {
                console.log('🔄 Restart button clicked');
                this.restartGame();
            });
        }
        
        // Sound toggle
        const soundBtn = document.getElementById('sound-toggle');
        if (soundBtn) {
            soundBtn.addEventListener('click', () => this.toggleSound());
        }
        
        // Achievements button
        const achievementsBtn = document.getElementById('achievements-btn');
        if (achievementsBtn) {
            achievementsBtn.addEventListener('click', () => {
                if (this.achievements) {
                    this.achievements.displayAchievements();
                }
            });
        }
        
        // Choice selection
        document.addEventListener('click', (e) => {
            if (e.target.classList.contains('choice')) {
                console.log('🎯 Choice selected:', e.target.textContent);
                this.selectChoice(e.target);
            }
        });

        // Keyboard navigation
        document.addEventListener('keydown', (e) => {
            if (e.key === 'Enter' && e.target.classList.contains('choice')) {
                this.selectChoice(e.target);
            }
        });
        
        console.log('✅ Event listeners bound successfully');
    }

    selectDiverseScenarios(scenarios, count) {
        if (!scenarios || scenarios.length === 0) {
            console.error('❌ No scenarios available');
            return [];
        }
        
        const shuffled = [...scenarios].sort(() => Math.random() - 0.5);
        return shuffled.slice(0, count);
    }

    startGame() {
        console.log('🎮 Starting game...');
        
        try {
            this.showScreen('game-screen');
            this.displayScenario();
            
            // Play start sound
            if (this.sounds && this.sounds.ambient) {
                this.sounds.ambient();
            }
            
        } catch (error) {
            console.error('❌ Failed to start game:', error);
            this.showErrorMessage('Failed to start the game. Please try again.');
        }
    }

    displayScenario() {
        console.log(`📖 Displaying scenario ${this.currentScenario + 1}`);
        
        try {
            const scenario = this.selectedScenarios[this.currentScenario];
            
            if (!scenario) {
                throw new Error(`No scenario found at index ${this.currentScenario}`);
            }
            
            // Update progress
            const progress = ((this.currentScenario + 1) / this.selectedScenarios.length) * 100;
            const progressFill = document.getElementById('progress-fill');
            const progressText = document.getElementById('progress-text');
            
            if (progressFill) progressFill.style.width = `${progress}%`;
            if (progressText) {
                progressText.textContent = `Question ${this.currentScenario + 1} of ${this.selectedScenarios.length}`;
            }
            
            // Display scenario content
            const titleEl = document.getElementById('scenario-title');
            const textEl = document.getElementById('scenario-text');
            
            if (titleEl) titleEl.textContent = scenario.title;
            if (textEl) textEl.textContent = scenario.text;
            
            // Create choices
            this.createChoices(scenario.choices);
            
            // Add character sprite
            this.addCharacterSprite();
            
            // Reset next button
            const nextBtn = document.getElementById('next-btn');
            if (nextBtn) {
                nextBtn.disabled = true;
            }
            this.currentChoice = null;
            
        } catch (error) {
            console.error('❌ Failed to display scenario:', error);
            this.showErrorMessage('Failed to load scenario. Please refresh the page.');
        }
    }

    createChoices(choices) {
        const container = document.getElementById('choices-container');
        if (!container) {
            console.error('❌ Choices container not found');
            return;
        }
        
        container.innerHTML = '';
        
        // Randomize choice order to prevent predictability
        const shuffledChoices = choices.map((choice, originalIndex) => ({
            ...choice,
            originalIndex
        })).sort(() => Math.random() - 0.5);
        
        shuffledChoices.forEach((choice, displayIndex) => {
            const button = document.createElement('button');
            button.className = 'choice';
            button.textContent = choice.text;
            button.setAttribute('data-choice-index', choice.originalIndex);
            button.setAttribute('role', 'radio');
            button.setAttribute('aria-checked', 'false');
            button.setAttribute('tabindex', '0');
            
            // Add staggered animation
            button.style.opacity = '0';
            button.style.transform = 'translateY(20px)';
            button.style.transition = 'all 0.5s ease';
            
            container.appendChild(button);
            
            // Animate in with delay
            setTimeout(() => {
                button.style.opacity = '1';
                button.style.transform = 'translateY(0)';
            }, displayIndex * 150 + 200);
        });
        
        console.log(`✅ Created ${choices.length} randomized choice buttons`);
    }

    addCharacterSprite() {
        const scenarioContent = document.getElementById('scenario-content');
        if (scenarioContent && !scenarioContent.querySelector('.character-sprite')) {
            const sprite = document.createElement('div');
            sprite.className = 'character-sprite';
            scenarioContent.insertBefore(sprite, scenarioContent.firstChild);
        }
    }

    selectChoice(choiceElement) {
        console.log('🎯 Processing choice selection...');
        
        try {
            // Remove previous selection
            document.querySelectorAll('.choice').forEach(choice => {
                choice.classList.remove('selected');
                choice.setAttribute('aria-checked', 'false');
            });
            
            // Select new choice
            choiceElement.classList.add('selected');
            choiceElement.setAttribute('aria-checked', 'true');
            
            // Store choice data
            const choiceIndex = parseInt(choiceElement.getAttribute('data-choice-index'));
            const scenario = this.selectedScenarios[this.currentScenario];
            this.currentChoice = scenario.choices[choiceIndex];
            
            // Enable next button
            const nextBtn = document.getElementById('next-btn');
            if (nextBtn) {
                nextBtn.disabled = false;
            }
            
            // Play sound and effects
            if (this.sounds && this.sounds.select) {
                this.sounds.select();
            }
            
            this.updatePlayerStats();
            this.addChoiceEffect(choiceElement);
            
            // Check achievements
            if (this.currentScenario === 0 && this.achievements) {
                this.achievements.checkAchievement('first_choice');
            }
            
        } catch (error) {
            console.error('❌ Failed to select choice:', error);
        }
    }

    nextScenario() {
        console.log('➡️ Moving to next scenario...');
        
        if (!this.currentChoice) {
            console.warn('⚠️ No choice selected');
            return;
        }
        
        try {
            // Score the choice
            this.currentChoice.types.forEach(type => {
                this.typeScores[type]++;
            });
            
            this.currentScenario++;
            
            if (this.currentScenario < this.selectedScenarios.length) {
                this.displayScenario();
            } else {
                console.log('🏁 Quest complete! Showing results...');
                this.showResults();
            }
            
        } catch (error) {
            console.error('❌ Failed to advance scenario:', error);
        }
    }

    showResults() {
        console.log('🏆 Displaying results...');
        
        try {
            const dominantType = this.calculateDominantType();
            const typeData = enneagramTypes[dominantType];
            
            console.log(`🎭 Dominant type: ${dominantType} - ${typeData.title}`);
            
            // Display results
            const elements = {
                'type-title': typeData.title,
                'type-description': typeData.description,
                'core-motivation': typeData.coreMotivation,
                'basic-fear': typeData.basicFear
            };
            
            Object.entries(elements).forEach(([id, text]) => {
                const el = document.getElementById(id);
                if (el) el.textContent = text;
            });
            
            // Display strengths
            const strengthsList = document.getElementById('strengths-list');
            if (strengthsList) {
                strengthsList.innerHTML = '';
                typeData.strengths.forEach(strength => {
                    const li = document.createElement('li');
                    li.textContent = strength;
                    strengthsList.appendChild(li);
                });
            }
            
            // Add game stats
            this.addGameStats();
            
            // Check final achievements
            if (this.achievements) {
                this.achievements.checkAchievement('quest_complete');
                this.achievements.checkAchievement('personality', dominantType);
            }
            
            this.showScreen('result-screen');
            
        } catch (error) {
            console.error('❌ Failed to show results:', error);
            this.showErrorMessage('Failed to calculate results. Please try again.');
        }
    }

    addGameStats() {
        const resultContent = document.getElementById('result-content');
        if (!resultContent) return;
        
        const gameStats = document.createElement('div');
        gameStats.className = 'game-stats';
        gameStats.innerHTML = `
            <h4>Your Adventure Stats</h4>
            <div class="final-stats">
                <div class="stat">Level Reached: ${this.playerStats.level}</div>
                <div class="stat">Wisdom: ${this.playerStats.wisdom}</div>
                <div class="stat">Courage: ${this.playerStats.courage}</div>
                <div class="stat">Compassion: ${this.playerStats.compassion}</div>
                <div class="stat">Items Collected: ${this.inventory.length}</div>
            </div>
            <div class="inventory-display">
                <h5>Items Found:</h5>
                <div class="items">${this.inventory.join(', ') || 'None'}</div>
            </div>
        `;
        
        resultContent.appendChild(gameStats);
    }

    calculateDominantType() {
        let maxScore = 0;
        let dominantType = 1;
        
        for (let type = 1; type <= 9; type++) {
            if (this.typeScores[type] > maxScore) {
                maxScore = this.typeScores[type];
                dominantType = type;
            }
        }
        
        return dominantType;
    }

    updatePlayerStats() {
        if (!this.currentChoice) return;
        
        this.currentChoice.types.forEach(type => {
            switch(type) {
                case 1: case 8: this.playerStats.courage += 2; break;
                case 2: case 9: this.playerStats.compassion += 2; break;
                case 4: case 5: this.playerStats.wisdom += 2; break;
                default: 
                    this.playerStats.wisdom += 1;
                    this.playerStats.courage += 1;
                    this.playerStats.compassion += 1;
            }
        });
        
        this.playerStats.experience += 10;
        if (this.playerStats.experience >= this.playerStats.level * 50) {
            this.levelUp();
        }
        
        if (Math.random() < 0.3) {
            this.addInventoryItem();
        }
        
        this.updateHUD();
    }

    levelUp() {
        this.playerStats.level++;
        this.playerStats.experience = 0;
        
        if (this.sounds && this.sounds.levelUp) {
            this.sounds.levelUp();
        }
        
        this.showLevelUpEffect();
        
        const levelBadge = document.querySelector('.level-badge');
        if (levelBadge) {
            levelBadge.textContent = `Lv.${this.playerStats.level}`;
        }
        
        if (this.achievements) {
            this.achievements.checkAchievement('level');
        }
    }

    addInventoryItem() {
        const items = [
            '🗝️ Ancient Key', '📜 Wisdom Scroll', '💎 Crystal Shard', 
            '🛡️ Courage Shield', '❤️ Compassion Gem', '⚡ Energy Potion'
        ];
        const item = items[Math.floor(Math.random() * items.length)];
        this.inventory.push(item);
        
        const inventoryCount = document.querySelector('.inventory-count');
        if (inventoryCount) {
            inventoryCount.textContent = `Items: ${this.inventory.length}`;
        }
        
        this.showItemNotification(item);
        
        if (this.achievements) {
            this.achievements.checkAchievement('items');
        }
    }

    updateHUD() {
        const maxStat = 100;
        const fills = {
            '.wisdom-fill': Math.min(this.playerStats.wisdom, maxStat),
            '.courage-fill': Math.min(this.playerStats.courage, maxStat),
            '.compassion-fill': Math.min(this.playerStats.compassion, maxStat)
        };
        
        Object.entries(fills).forEach(([selector, value]) => {
            const element = document.querySelector(selector);
            if (element) {
                element.style.width = `${value}%`;
            }
        });
        
        if (this.achievements) {
            this.achievements.checkAchievement('stats');
        }
    }

    addChoiceEffect(element) {
        element.style.transform = 'scale(1.05)';
        element.style.boxShadow = '0 0 20px rgba(39, 174, 96, 0.6)';
        
        setTimeout(() => {
            element.style.transform = '';
            element.style.boxShadow = '';
        }, 300);
    }

    showLevelUpEffect() {
        const effect = document.createElement('div');
        effect.className = 'level-up-effect';
        effect.textContent = 'LEVEL UP!';
        document.body.appendChild(effect);
        
        setTimeout(() => {
            if (document.body.contains(effect)) {
                document.body.removeChild(effect);
            }
        }, 2000);
    }

    showItemNotification(item) {
        const notification = document.createElement('div');
        notification.className = 'item-notification';
        notification.textContent = `Found: ${item}`;
        document.body.appendChild(notification);
        
        setTimeout(() => {
            if (document.body.contains(notification)) {
                document.body.removeChild(notification);
            }
        }, 3000);
    }

    showScreen(screenId) {
        console.log(`🖥️ Switching to screen: ${screenId}`);
        
        document.querySelectorAll('.screen').forEach(screen => {
            screen.classList.remove('active');
        });
        
        const targetScreen = document.getElementById(screenId);
        if (targetScreen) {
            targetScreen.classList.add('active');
        } else {
            console.error(`❌ Screen not found: ${screenId}`);
        }
    }

    restartGame() {
        console.log('🔄 Restarting game...');
        
        this.currentScenario = 0;
        this.typeScores = { 1: 0, 2: 0, 3: 0, 4: 0, 5: 0, 6: 0, 7: 0, 8: 0, 9: 0 };
        this.selectedScenarios = this.selectDiverseScenarios(allScenarios, 16);
        this.totalScenarios = 16;
        this.currentChoice = null;
        
        this.playerStats = {
            health: 100,
            wisdom: 0,
            courage: 0,
            compassion: 0,
            level: 1,
            experience: 0
        };
        this.inventory = [];
        
        this.updateHUD();
        this.showScreen('intro-screen');
    }

    createSoundSystem() {
        this.sounds = {
            select: this.createSound(200, 0.1, 'sine'),
            correct: this.createSound(400, 0.2, 'triangle'),
            levelUp: this.createSound([300, 400, 500], 0.3, 'square'),
            ambient: this.createAmbientSound()
        };
    }

    createSound(frequency, duration, type = 'sine') {
        return () => {
            if (!this.soundEnabled) return;
            
            try {
                const audioContext = new (window.AudioContext || window.webkitAudioContext)();
                const oscillator = audioContext.createOscillator();
                const gainNode = audioContext.createGain();
                
                oscillator.connect(gainNode);
                gainNode.connect(audioContext.destination);
                
                if (Array.isArray(frequency)) {
                    frequency.forEach((freq, i) => {
                        setTimeout(() => {
                            oscillator.frequency.setValueAtTime(freq, audioContext.currentTime);
                        }, i * 100);
                    });
                } else {
                    oscillator.frequency.setValueAtTime(frequency, audioContext.currentTime);
                }
                
                oscillator.type = type;
                gainNode.gain.setValueAtTime(0.1, audioContext.currentTime);
                gainNode.gain.exponentialRampToValueAtTime(0.01, audioContext.currentTime + duration);
                
                oscillator.start(audioContext.currentTime);
                oscillator.stop(audioContext.currentTime + duration);
            } catch (error) {
                console.warn('⚠️ Audio not supported:', error);
            }
        };
    }

    createAmbientSound() {
        return () => {
            if (!this.soundEnabled) return;
            
            try {
                const audioContext = new (window.AudioContext || window.webkitAudioContext)();
                const oscillator = audioContext.createOscillator();
                const gainNode = audioContext.createGain();
                
                oscillator.connect(gainNode);
                gainNode.connect(audioContext.destination);
                
                oscillator.frequency.setValueAtTime(80, audioContext.currentTime);
                oscillator.type = 'sine';
                gainNode.gain.setValueAtTime(0.02, audioContext.currentTime);
                
                oscillator.start();
                setTimeout(() => oscillator.stop(), 2000);
            } catch (error) {
                console.warn('⚠️ Ambient audio not supported:', error);
            }
        };
    }

    createParticleSystem() {
        try {
            const canvas = document.createElement('canvas');
            canvas.id = 'particle-canvas';
            canvas.width = window.innerWidth;
            canvas.height = window.innerHeight;
            document.body.appendChild(canvas);
            
            this.particleCtx = canvas.getContext('2d');
            this.particles = [];
            
            this.startParticleAnimation();
        } catch (error) {
            console.warn('⚠️ Particle system not supported:', error);
        }
    }

    startParticleAnimation() {
        const animate = () => {
            if (!this.particleCtx) return;
            
            this.particleCtx.clearRect(0, 0, window.innerWidth, window.innerHeight);
            
            this.particles = this.particles.filter(particle => {
                particle.x += particle.vx;
                particle.y += particle.vy;
                particle.life -= particle.decay;
                
                this.particleCtx.globalAlpha = particle.life;
                this.particleCtx.fillStyle = '#4a90e2';
                this.particleCtx.beginPath();
                this.particleCtx.arc(particle.x, particle.y, 2, 0, Math.PI * 2);
                this.particleCtx.fill();
                
                return particle.life > 0;
            });
            
            requestAnimationFrame(animate);
        };
        animate();
    }

    initializeAchievements() {
        try {
            this.achievements = new AchievementSystem(this);
        } catch (error) {
            console.warn('⚠️ Achievement system not available:', error);
        }
    }

    toggleSound() {
        this.soundEnabled = !this.soundEnabled;
        const soundBtn = document.getElementById('sound-toggle');
        if (soundBtn) {
            soundBtn.textContent = this.soundEnabled ? '🔊' : '🔇';
        }
        console.log(`🔊 Sound ${this.soundEnabled ? 'enabled' : 'disabled'}`);
    }

    showErrorMessage(message) {
        const errorDiv = document.createElement('div');
        errorDiv.className = 'error-message';
        errorDiv.innerHTML = `
            <h3>⚠️ Error</h3>
            <p>${message}</p>
            <button onclick="location.reload()">Refresh Page</button>
        `;
        errorDiv.style.cssText = `
            position: fixed;
            top: 50%;
            left: 50%;
            transform: translate(-50%, -50%);
            background: #fff;
            padding: 2rem;
            border-radius: 10px;
            box-shadow: 0 10px 30px rgba(0,0,0,0.3);
            z-index: 9999;
            text-align: center;
        `;
        
        document.body.appendChild(errorDiv);
    }
}

// Initialize the debug game
document.addEventListener('DOMContentLoaded', () => {
    console.log('🌟 DOM Content Loaded - Starting Enneagram Quest');
    
    // Check if required data is available
    if (typeof allScenarios === 'undefined' || typeof enneagramTypes === 'undefined') {
        console.error('❌ Required game data not loaded');
        return;
    }
    
    // Initialize the game
    window.game = new DebugEnneagramQuestGame();
    console.log('🎮 Game instance created and available as window.game');
});
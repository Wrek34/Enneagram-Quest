class EnneagramQuestGame extends EnneagramQuest {
    constructor() {
        super();
        this.playerStats = {
            health: 100,
            wisdom: 0,
            courage: 0,
            compassion: 0,
            level: 1,
            experience: 0
        };
        this.inventory = [];
        this.achievements = [];
        this.soundEnabled = true;
        
        this.initializeGameComponents();
    }

    initializeGameComponents() {
        this.createPlayerHUD();
        this.createSoundSystem();
        this.createParticleSystem();
        this.createCharacterSprites();
        this.addGameSounds();
    }

    createPlayerHUD() {
        const gameScreen = document.getElementById('game-screen');
        const hudHTML = `
            <div id="player-hud">
                <div class="hud-section">
                    <div class="player-avatar" id="player-avatar">
                        <div class="avatar-sprite"></div>
                        <div class="level-badge">Lv.${this.playerStats.level}</div>
                    </div>
                </div>
                <div class="hud-section">
                    <div class="stat-bar">
                        <label>Wisdom</label>
                        <div class="bar"><div class="fill wisdom-fill"></div></div>
                    </div>
                    <div class="stat-bar">
                        <label>Courage</label>
                        <div class="bar"><div class="fill courage-fill"></div></div>
                    </div>
                    <div class="stat-bar">
                        <label>Compassion</label>
                        <div class="bar"><div class="fill compassion-fill"></div></div>
                    </div>
                </div>
                <div class="hud-section">
                    <button id="sound-toggle" class="hud-btn">🔊</button>
                    <div id="inventory-display">
                        <span class="inventory-count">Items: 0</span>
                    </div>
                </div>
            </div>
        `;
        gameScreen.insertAdjacentHTML('afterbegin', hudHTML);
        
        document.getElementById('sound-toggle').addEventListener('click', () => this.toggleSound());
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
        };
    }

    createAmbientSound() {
        return () => {
            if (!this.soundEnabled) return;
            // Subtle ambient sound for atmosphere
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
        };
    }

    createParticleSystem() {
        const canvas = document.createElement('canvas');
        canvas.id = 'particle-canvas';
        canvas.width = window.innerWidth;
        canvas.height = window.innerHeight;
        document.body.appendChild(canvas);
        
        this.particleCtx = canvas.getContext('2d');
        this.particles = [];
        
        this.startParticleAnimation();
    }

    createCharacterSprites() {
        const spriteStyles = `
            .character-sprite {
                width: 64px;
                height: 64px;
                background: linear-gradient(45deg, #4a90e2, #7b68ee);
                border-radius: 50% 50% 50% 50% / 60% 60% 40% 40%;
                position: relative;
                margin: 0 auto 1rem;
                animation: float 3s ease-in-out infinite;
            }
            
            .character-sprite::before {
                content: '';
                position: absolute;
                top: 15px;
                left: 15px;
                width: 8px;
                height: 8px;
                background: #fff;
                border-radius: 50%;
                box-shadow: 20px 0 0 #fff, 10px 15px 0 #ff6b6b;
            }
            
            @keyframes float {
                0%, 100% { transform: translateY(0px); }
                50% { transform: translateY(-10px); }
            }
        `;
        
        const style = document.createElement('style');
        style.textContent = spriteStyles;
        document.head.appendChild(style);
    }

    addGameSounds() {
        // Play ambient sound on game start
        setTimeout(() => this.sounds.ambient(), 500);
    }

    displayScenario() {
        super.displayScenario();
        
        // Add character sprite to scenario
        const scenarioContent = document.getElementById('scenario-content');
        if (!scenarioContent.querySelector('.character-sprite')) {
            const sprite = document.createElement('div');
            sprite.className = 'character-sprite';
            scenarioContent.insertBefore(sprite, scenarioContent.firstChild);
        }
        
        // Add visual effects
        this.createScenarioParticles();
        this.sounds.ambient();
    }

    selectChoice(choiceElement) {
        super.selectChoice(choiceElement);
        
        // Add game mechanics
        this.sounds.select();
        this.updatePlayerStats();
        this.addChoiceEffect(choiceElement);
    }

    updatePlayerStats() {
        const choice = this.currentChoice;
        if (!choice) return;
        
        // Update stats based on choice types
        choice.types.forEach(type => {
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
        
        // Add experience and check for level up
        this.playerStats.experience += 10;
        if (this.playerStats.experience >= this.playerStats.level * 50) {
            this.levelUp();
        }
        
        // Add random item chance
        if (Math.random() < 0.3) {
            this.addInventoryItem();
        }
        
        this.updateHUD();
    }

    levelUp() {
        this.playerStats.level++;
        this.playerStats.experience = 0;
        this.sounds.levelUp();
        
        // Show level up effect
        this.showLevelUpEffect();
        
        // Update avatar
        document.querySelector('.level-badge').textContent = `Lv.${this.playerStats.level}`;
    }

    addInventoryItem() {
        const items = [
            '🗝️ Ancient Key', '📜 Wisdom Scroll', '💎 Crystal Shard', 
            '🛡️ Courage Shield', '❤️ Compassion Gem', '⚡ Energy Potion'
        ];
        const item = items[Math.floor(Math.random() * items.length)];
        this.inventory.push(item);
        
        document.querySelector('.inventory-count').textContent = `Items: ${this.inventory.length}`;
        this.showItemNotification(item);
    }

    updateHUD() {
        const maxStat = 100;
        document.querySelector('.wisdom-fill').style.width = 
            `${Math.min(this.playerStats.wisdom, maxStat)}%`;
        document.querySelector('.courage-fill').style.width = 
            `${Math.min(this.playerStats.courage, maxStat)}%`;
        document.querySelector('.compassion-fill').style.width = 
            `${Math.min(this.playerStats.compassion, maxStat)}%`;
    }

    addChoiceEffect(element) {
        element.style.transform = 'scale(1.05)';
        element.style.boxShadow = '0 0 20px rgba(39, 174, 96, 0.6)';
        
        setTimeout(() => {
            element.style.transform = '';
            element.style.boxShadow = '';
        }, 300);
    }

    createScenarioParticles() {
        for (let i = 0; i < 5; i++) {
            this.particles.push({
                x: Math.random() * window.innerWidth,
                y: Math.random() * window.innerHeight,
                vx: (Math.random() - 0.5) * 2,
                vy: (Math.random() - 0.5) * 2,
                life: 1,
                decay: 0.01
            });
        }
    }

    startParticleAnimation() {
        const animate = () => {
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

    showLevelUpEffect() {
        const effect = document.createElement('div');
        effect.className = 'level-up-effect';
        effect.textContent = 'LEVEL UP!';
        document.body.appendChild(effect);
        
        setTimeout(() => document.body.removeChild(effect), 2000);
    }

    showItemNotification(item) {
        const notification = document.createElement('div');
        notification.className = 'item-notification';
        notification.textContent = `Found: ${item}`;
        document.body.appendChild(notification);
        
        setTimeout(() => document.body.removeChild(notification), 3000);
    }

    showResults() {
        super.showResults();
        
        // Add final game stats
        const resultContent = document.getElementById('result-content');
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
        this.sounds.levelUp();
    }

    toggleSound() {
        this.soundEnabled = !this.soundEnabled;
        document.getElementById('sound-toggle').textContent = this.soundEnabled ? '🔊' : '🔇';
    }

    restartGame() {
        super.restartGame();
        
        // Reset game stats
        this.playerStats = {
            health: 100,
            wisdom: 0,
            courage: 0,
            compassion: 0,
            level: 1,
            experience: 0
        };
        this.inventory = [];
        this.particles = [];
        
        this.updateHUD();
    }
}

// Replace the original game with enhanced version
document.addEventListener('DOMContentLoaded', () => {
    new EnneagramQuestGame();
});
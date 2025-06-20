// Simple Fantasy Book Style Avatar System
class SimpleFantasyAvatar {
    constructor(game) {
        this.game = game;
        this.avatar = {
            class: 'mage',
            color: 'blue'
        };
        
        this.initializeSystem();
    }

    initializeSystem() {
        this.createAvatarSelection();
        this.loadSavedAvatar();
    }

    createAvatarSelection() {
        setTimeout(() => {
            // Remove any existing avatar panels
            document.querySelectorAll('.revamped-avatar-panel, .enhanced-customization-panel').forEach(panel => {
                panel.remove();
            });

            const panel = document.createElement('div');
            panel.className = 'fantasy-avatar-panel';
            panel.innerHTML = `
                <div class="fantasy-header">
                    <h3>📖 Choose Your Character</h3>
                    <p>Select your adventurer for this tale</p>
                </div>

                <div class="avatar-display">
                    <div class="fantasy-avatar" id="fantasy-avatar">
                        <div class="avatar-icon">🧙‍♂️</div>
                        <div class="avatar-title">Blue Mage</div>
                    </div>
                </div>

                <div class="character-classes">
                    <h4>Character Class</h4>
                    <div class="class-options">
                        <button class="class-btn active" data-class="mage">
                            <span class="class-icon">🧙‍♂️</span>
                            <span class="class-name">Mage</span>
                        </button>
                        <button class="class-btn" data-class="warrior">
                            <span class="class-icon">⚔️</span>
                            <span class="class-name">Warrior</span>
                        </button>
                        <button class="class-btn" data-class="rogue">
                            <span class="class-icon">🗡️</span>
                            <span class="class-name">Rogue</span>
                        </button>
                        <button class="class-btn" data-class="ranger">
                            <span class="class-icon">🏹</span>
                            <span class="class-name">Ranger</span>
                        </button>
                        <button class="class-btn" data-class="cleric">
                            <span class="class-icon">✨</span>
                            <span class="class-name">Cleric</span>
                        </button>
                        <button class="class-btn" data-class="bard">
                            <span class="class-icon">🎵</span>
                            <span class="class-name">Bard</span>
                        </button>
                    </div>
                </div>

                <div class="character-colors">
                    <h4>Color Theme</h4>
                    <div class="color-options">
                        <button class="color-btn active" data-color="blue" style="background: #3498db">Blue</button>
                        <button class="color-btn" data-color="red" style="background: #e74c3c">Red</button>
                        <button class="color-btn" data-color="green" style="background: #27ae60">Green</button>
                        <button class="color-btn" data-color="purple" style="background: #9b59b6">Purple</button>
                        <button class="color-btn" data-color="gold" style="background: #f39c12">Gold</button>
                        <button class="color-btn" data-color="silver" style="background: #95a5a6">Silver</button>
                    </div>
                </div>

                <div class="avatar-actions">
                    <button id="random-character" class="fantasy-btn secondary">🎲 Random</button>
                    <button id="start-adventure" class="fantasy-btn primary">⚔️ Start Adventure</button>
                </div>
            `;

            document.getElementById('intro-screen').appendChild(panel);
            this.setupEventListeners();
            this.updateDisplay();
        }, 1000);
    }

    setupEventListeners() {
        // Class selection
        document.querySelectorAll('.class-btn').forEach(btn => {
            btn.addEventListener('click', (e) => {
                const classType = e.currentTarget.dataset.class;
                this.selectClass(classType);
            });
        });

        // Color selection
        document.querySelectorAll('.color-btn').forEach(btn => {
            btn.addEventListener('click', (e) => {
                const color = e.currentTarget.dataset.color;
                this.selectColor(color);
            });
        });

        // Action buttons
        document.getElementById('random-character').addEventListener('click', () => {
            this.randomizeCharacter();
        });

        document.getElementById('start-adventure').addEventListener('click', () => {
            this.startAdventure();
        });
    }

    selectClass(classType) {
        this.avatar.class = classType;
        
        // Update UI
        document.querySelectorAll('.class-btn').forEach(btn => btn.classList.remove('active'));
        document.querySelector(`[data-class="${classType}"]`).classList.add('active');
        
        this.updateDisplay();
        this.playSound();
    }

    selectColor(color) {
        this.avatar.color = color;
        
        // Update UI
        document.querySelectorAll('.color-btn').forEach(btn => btn.classList.remove('active'));
        document.querySelector(`[data-color="${color}"]`).classList.add('active');
        
        this.updateDisplay();
        this.playSound();
    }

    updateDisplay() {
        const avatarEl = document.getElementById('fantasy-avatar');
        if (!avatarEl) return;

        const { class: charClass, color } = this.avatar;
        
        // Class icons and names
        const classData = {
            mage: { icon: '🧙‍♂️', name: 'Mage' },
            warrior: { icon: '⚔️', name: 'Warrior' },
            rogue: { icon: '🗡️', name: 'Rogue' },
            ranger: { icon: '🏹', name: 'Ranger' },
            cleric: { icon: '✨', name: 'Cleric' },
            bard: { icon: '🎵', name: 'Bard' }
        };

        // Color names
        const colorNames = {
            blue: 'Blue', red: 'Red', green: 'Green',
            purple: 'Purple', gold: 'Gold', silver: 'Silver'
        };

        // Update display
        const iconEl = avatarEl.querySelector('.avatar-icon');
        const titleEl = avatarEl.querySelector('.avatar-title');
        
        if (iconEl) iconEl.textContent = classData[charClass].icon;
        if (titleEl) titleEl.textContent = `${colorNames[color]} ${classData[charClass].name}`;
        
        // Update avatar styling
        avatarEl.className = `fantasy-avatar ${charClass} ${color}`;
    }

    randomizeCharacter() {
        const classes = ['mage', 'warrior', 'rogue', 'ranger', 'cleric', 'bard'];
        const colors = ['blue', 'red', 'green', 'purple', 'gold', 'silver'];
        
        this.avatar = {
            class: classes[Math.floor(Math.random() * classes.length)],
            color: colors[Math.floor(Math.random() * colors.length)]
        };
        
        this.updateSelections();
        this.updateDisplay();
        this.showNotification('Character randomized! 🎲');
    }

    updateSelections() {
        const { class: charClass, color } = this.avatar;
        
        // Update class selection
        document.querySelectorAll('.class-btn').forEach(btn => btn.classList.remove('active'));
        document.querySelector(`[data-class="${charClass}"]`)?.classList.add('active');
        
        // Update color selection
        document.querySelectorAll('.color-btn').forEach(btn => btn.classList.remove('active'));
        document.querySelector(`[data-color="${color}"]`)?.classList.add('active');
    }

    startAdventure() {
        // Apply avatar to game
        this.applyToGame();
        
        // Save avatar
        this.saveAvatar();
        
        // Hide panel with animation
        const panel = document.querySelector('.fantasy-avatar-panel');
        if (panel) {
            panel.style.animation = 'fadeOut 0.5s ease forwards';
            setTimeout(() => {
                if (panel.parentNode) {
                    panel.parentNode.removeChild(panel);
                }
            }, 500);
        }
        
        this.showNotification('Adventure begins! ⚔️');
    }

    applyToGame() {
        const gameAvatar = document.querySelector('.avatar-sprite');
        if (gameAvatar) {
            const { class: charClass, color } = this.avatar;
            const classData = {
                mage: '🧙‍♂️', warrior: '⚔️', rogue: '🗡️',
                ranger: '🏹', cleric: '✨', bard: '🎵'
            };
            
            gameAvatar.className = `avatar-sprite fantasy-character ${charClass} ${color}`;
            gameAvatar.innerHTML = classData[charClass];
        }
    }

    saveAvatar() {
        localStorage.setItem('fantasy-avatar', JSON.stringify(this.avatar));
    }

    loadSavedAvatar() {
        const saved = localStorage.getItem('fantasy-avatar');
        if (saved) {
            this.avatar = JSON.parse(saved);
        }
    }

    playSound() {
        if (this.game && this.game.sounds && this.game.sounds.select) {
            this.game.sounds.select();
        }
    }

    showNotification(message) {
        const notification = document.createElement('div');
        notification.className = 'fantasy-notification';
        notification.textContent = message;
        notification.style.cssText = `
            position: fixed;
            top: 20px;
            left: 50%;
            transform: translateX(-50%);
            background: linear-gradient(135deg, #8e44ad, #9b59b6);
            color: white;
            padding: 1rem 2rem;
            border-radius: 25px;
            font-weight: bold;
            z-index: 1001;
            animation: slideDown 0.3s ease, slideUp 0.3s ease 2.5s forwards;
            box-shadow: 0 4px 15px rgba(142, 68, 173, 0.3);
        `;

        document.body.appendChild(notification);

        setTimeout(() => {
            if (document.body.contains(notification)) {
                document.body.removeChild(notification);
            }
        }, 3000);
    }
}

// Initialize simple fantasy avatar system
document.addEventListener('DOMContentLoaded', () => {
    const initFantasyAvatar = () => {
        if (window.game) {
            new SimpleFantasyAvatar(window.game);
            console.log('📖 Simple Fantasy Avatar system loaded');
        } else {
            setTimeout(initFantasyAvatar, 100);
        }
    };
    initFantasyAvatar();
});
// Completely revamped avatar customization system
class RevampedAvatarSystem {
    constructor(game) {
        this.game = game;
        this.avatarConfig = {
            style: 'mystical',
            color: 'blue',
            accessory: 'none',
            animation: 'float'
        };
        
        this.initializeRevampedSystem();
    }

    initializeRevampedSystem() {
        this.createSimplifiedCustomization();
        this.setupRealTimePreview();
    }

    createSimplifiedCustomization() {
        setTimeout(() => {
            const existingPanel = document.querySelector('.enhanced-customization-panel');
            if (existingPanel) {
                existingPanel.remove();
            }

            const panel = document.createElement('div');
            panel.className = 'revamped-avatar-panel';
            panel.innerHTML = `
                <div class="avatar-header">
                    <h3>🎭 Choose Your Adventurer</h3>
                    <p>Customize your character for the quest ahead</p>
                </div>

                <div class="avatar-showcase">
                    <div class="avatar-preview-large" id="avatar-preview-large">
                        <div class="avatar-character" id="avatar-character">
                            <div class="avatar-face">😊</div>
                            <div class="avatar-accessory" id="avatar-accessory"></div>
                        </div>
                        <div class="avatar-glow"></div>
                    </div>
                    <div class="avatar-name" id="avatar-name">Mystical Explorer</div>
                </div>

                <div class="customization-options">
                    <div class="option-section">
                        <h4>🎨 Avatar Style</h4>
                        <div class="style-selector">
                            <div class="style-card active" data-style="mystical">
                                <div class="style-icon">🧙‍♂️</div>
                                <span>Mystical</span>
                            </div>
                            <div class="style-card" data-style="warrior">
                                <div class="style-icon">⚔️</div>
                                <span>Warrior</span>
                            </div>
                            <div class="style-card" data-style="scholar">
                                <div class="style-icon">📚</div>
                                <span>Scholar</span>
                            </div>
                            <div class="style-card" data-style="explorer">
                                <div class="style-icon">🗺️</div>
                                <span>Explorer</span>
                            </div>
                            <div class="style-card" data-style="healer">
                                <div class="style-icon">🌿</div>
                                <span>Healer</span>
                            </div>
                            <div class="style-card" data-style="artist">
                                <div class="style-icon">🎨</div>
                                <span>Artist</span>
                            </div>
                        </div>
                    </div>

                    <div class="option-section">
                        <h4>🌈 Color Theme</h4>
                        <div class="color-selector">
                            <div class="color-card active" data-color="blue" style="background: linear-gradient(135deg, #3498db, #2980b9)">
                                <span>Ocean</span>
                            </div>
                            <div class="color-card" data-color="purple" style="background: linear-gradient(135deg, #9b59b6, #8e44ad)">
                                <span>Mystic</span>
                            </div>
                            <div class="color-card" data-color="green" style="background: linear-gradient(135deg, #27ae60, #229954)">
                                <span>Forest</span>
                            </div>
                            <div class="color-card" data-color="orange" style="background: linear-gradient(135deg, #f39c12, #e67e22)">
                                <span>Sunset</span>
                            </div>
                            <div class="color-card" data-color="red" style="background: linear-gradient(135deg, #e74c3c, #c0392b)">
                                <span>Fire</span>
                            </div>
                            <div class="color-card" data-color="teal" style="background: linear-gradient(135deg, #1abc9c, #16a085)">
                                <span>Jade</span>
                            </div>
                        </div>
                    </div>

                    <div class="option-section">
                        <h4>✨ Magical Accessory</h4>
                        <div class="accessory-selector">
                            <div class="accessory-card active" data-accessory="none">
                                <div class="accessory-icon">✨</div>
                                <span>None</span>
                            </div>
                            <div class="accessory-card" data-accessory="crown">
                                <div class="accessory-icon">👑</div>
                                <span>Crown</span>
                            </div>
                            <div class="accessory-card" data-accessory="hat">
                                <div class="accessory-icon">🎩</div>
                                <span>Hat</span>
                            </div>
                            <div class="accessory-card" data-accessory="gem">
                                <div class="accessory-icon">💎</div>
                                <span>Gem</span>
                            </div>
                        </div>
                    </div>
                </div>

                <div class="avatar-actions">
                    <button id="randomize-avatar-new" class="avatar-btn secondary">
                        🎲 Surprise Me
                    </button>
                    <button id="confirm-avatar" class="avatar-btn primary">
                        ✨ Begin Quest
                    </button>
                </div>
            `;

            document.getElementById('intro-screen').appendChild(panel);
            this.setupEventListeners();
            this.updatePreview();
        }, 1000);
    }

    setupEventListeners() {
        // Style selection
        document.querySelectorAll('.style-card').forEach(card => {
            card.addEventListener('click', (e) => {
                const style = e.currentTarget.dataset.style;
                this.selectStyle(style);
            });
        });

        // Color selection
        document.querySelectorAll('.color-card').forEach(card => {
            card.addEventListener('click', (e) => {
                const color = e.currentTarget.dataset.color;
                this.selectColor(color);
            });
        });

        // Accessory selection
        document.querySelectorAll('.accessory-card').forEach(card => {
            card.addEventListener('click', (e) => {
                const accessory = e.currentTarget.dataset.accessory;
                this.selectAccessory(accessory);
            });
        });

        // Action buttons
        document.getElementById('randomize-avatar-new').addEventListener('click', () => {
            this.randomizeAvatar();
        });

        document.getElementById('confirm-avatar').addEventListener('click', () => {
            this.confirmAvatar();
        });
    }

    selectStyle(style) {
        this.avatarConfig.style = style;
        
        // Update UI
        document.querySelectorAll('.style-card').forEach(card => card.classList.remove('active'));
        document.querySelector(`[data-style="${style}"]`).classList.add('active');
        
        this.updatePreview();
        this.playSelectSound();
    }

    selectColor(color) {
        this.avatarConfig.color = color;
        
        // Update UI
        document.querySelectorAll('.color-card').forEach(card => card.classList.remove('active'));
        document.querySelector(`[data-color="${color}"]`).classList.add('active');
        
        this.updatePreview();
        this.playSelectSound();
    }

    selectAccessory(accessory) {
        this.avatarConfig.accessory = accessory;
        
        // Update UI
        document.querySelectorAll('.accessory-card').forEach(card => card.classList.remove('active'));
        document.querySelector(`[data-accessory="${accessory}"]`).classList.add('active');
        
        this.updatePreview();
        this.playSelectSound();
    }

    updatePreview() {
        const character = document.getElementById('avatar-character');
        const accessoryEl = document.getElementById('avatar-accessory');
        const nameEl = document.getElementById('avatar-name');
        
        if (!character) return;

        const { style, color, accessory } = this.avatarConfig;
        
        // Update character appearance
        character.className = `avatar-character ${style} ${color}`;
        
        // Update accessory
        const accessoryEmojis = {
            none: '',
            crown: '👑',
            hat: '🎩',
            gem: '💎'
        };
        
        if (accessoryEl) {
            accessoryEl.textContent = accessoryEmojis[accessory] || '';
        }
        
        // Update name
        const styleNames = {
            mystical: 'Mystical',
            warrior: 'Brave',
            scholar: 'Wise',
            explorer: 'Bold',
            healer: 'Kind',
            artist: 'Creative'
        };
        
        const colorNames = {
            blue: 'Ocean',
            purple: 'Mystic',
            green: 'Forest',
            orange: 'Sunset',
            red: 'Fire',
            teal: 'Jade'
        };
        
        if (nameEl) {
            nameEl.textContent = `${styleNames[style]} ${colorNames[color]} Adventurer`;
        }
    }

    randomizeAvatar() {
        const styles = ['mystical', 'warrior', 'scholar', 'explorer', 'healer', 'artist'];
        const colors = ['blue', 'purple', 'green', 'orange', 'red', 'teal'];
        const accessories = ['none', 'crown', 'hat', 'gem'];

        this.avatarConfig = {
            style: styles[Math.floor(Math.random() * styles.length)],
            color: colors[Math.floor(Math.random() * colors.length)],
            accessory: accessories[Math.floor(Math.random() * accessories.length)]
        };

        this.updateSelections();
        this.updatePreview();
        this.showNotification('Avatar randomized! 🎲', 'success');
    }

    updateSelections() {
        const { style, color, accessory } = this.avatarConfig;
        
        // Update style selection
        document.querySelectorAll('.style-card').forEach(card => card.classList.remove('active'));
        document.querySelector(`[data-style="${style}"]`)?.classList.add('active');
        
        // Update color selection
        document.querySelectorAll('.color-card').forEach(card => card.classList.remove('active'));
        document.querySelector(`[data-color="${color}"]`)?.classList.add('active');
        
        // Update accessory selection
        document.querySelectorAll('.accessory-card').forEach(card => card.classList.remove('active'));
        document.querySelector(`[data-accessory="${accessory}"]`)?.classList.add('active');
    }

    confirmAvatar() {
        // Apply avatar to game
        const gameAvatar = document.querySelector('.avatar-sprite');
        if (gameAvatar) {
            const { style, color, accessory } = this.avatarConfig;
            gameAvatar.className = `avatar-sprite ${style} ${color} float`;
            
            const accessoryEmojis = {
                none: '',
                crown: '👑',
                hat: '🎩',
                gem: '💎'
            };
            
            gameAvatar.innerHTML = accessoryEmojis[accessory] || '';
        }

        // Save configuration
        localStorage.setItem('enneagram-avatar-config', JSON.stringify(this.avatarConfig));
        
        // Hide customization panel
        const panel = document.querySelector('.revamped-avatar-panel');
        if (panel) {
            panel.style.animation = 'slideOutDown 0.5s ease-in forwards';
            setTimeout(() => {
                if (panel.parentNode) {
                    panel.parentNode.removeChild(panel);
                }
            }, 500);
        }
        
        this.showNotification('Avatar confirmed! Ready for adventure! ✨', 'success');
    }

    setupRealTimePreview() {
        // Load saved configuration
        const saved = localStorage.getItem('enneagram-avatar-config');
        if (saved) {
            this.avatarConfig = { ...this.avatarConfig, ...JSON.parse(saved) };
        }
    }

    playSelectSound() {
        if (this.game && this.game.sounds && this.game.sounds.select) {
            this.game.sounds.select();
        }
    }

    showNotification(message, type) {
        const notification = document.createElement('div');
        notification.className = `avatar-notification ${type}`;
        notification.textContent = message;
        
        notification.style.cssText = `
            position: fixed;
            top: 20px;
            left: 50%;
            transform: translateX(-50%);
            padding: 1rem 2rem;
            border-radius: 25px;
            color: white;
            z-index: 1001;
            animation: slideInDown 0.3s ease, slideOutUp 0.3s ease 2.7s forwards;
            background: ${type === 'success' ? '#27ae60' : '#3498db'};
            box-shadow: 0 4px 12px rgba(0, 0, 0, 0.2);
            font-weight: bold;
        `;

        document.body.appendChild(notification);

        setTimeout(() => {
            if (document.body.contains(notification)) {
                document.body.removeChild(notification);
            }
        }, 3000);
    }
}

// Initialize revamped avatar system
document.addEventListener('DOMContentLoaded', () => {
    const initRevampedAvatar = () => {
        if (window.game) {
            new RevampedAvatarSystem(window.game);
            console.log('🎭 Revamped avatar system loaded');
        } else {
            setTimeout(initRevampedAvatar, 100);
        }
    };
    initRevampedAvatar();
});
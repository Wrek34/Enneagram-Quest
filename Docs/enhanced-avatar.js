// Enhanced avatar customization system
class EnhancedAvatarSystem {
    constructor(game) {
        this.game = game;
        this.avatarConfig = {
            style: 'mystical',
            color: 'blue',
            accessory: 'none',
            background: 'gradient',
            animation: 'float',
            size: 'medium'
        };
        
        this.initializeAvatarSystem();
    }

    initializeAvatarSystem() {
        this.createAdvancedCustomization();
        this.setupAvatarPreview();
        this.addAvatarAnimations();
    }

    createAdvancedCustomization() {
        const originalCreateCustomizationPanel = () => {
            const panel = document.createElement('div');
            panel.className = 'enhanced-customization-panel';
            panel.innerHTML = `
                <div class="customization-header">
                    <h3>🎨 Create Your Avatar</h3>
                    <p>Customize your adventurer's appearance</p>
                </div>
                
                <div class="avatar-preview-section">
                    <div class="avatar-preview-container">
                        <div id="avatar-preview" class="avatar-preview"></div>
                        <div class="preview-label">Preview</div>
                    </div>
                </div>

                <div class="customization-tabs">
                    <button class="tab-btn active" data-tab="style">Style</button>
                    <button class="tab-btn" data-tab="colors">Colors</button>
                    <button class="tab-btn" data-tab="accessories">Accessories</button>
                    <button class="tab-btn" data-tab="effects">Effects</button>
                </div>

                <div class="customization-content">
                    <div class="tab-content active" data-tab="style">
                        <h4>Avatar Style</h4>
                        <div class="style-grid">
                            <div class="style-option" data-style="mystical">
                                <div class="style-preview mystical"></div>
                                <span>🧙‍♂️ Mystical</span>
                            </div>
                            <div class="style-option" data-style="warrior">
                                <div class="style-preview warrior"></div>
                                <span>⚔️ Warrior</span>
                            </div>
                            <div class="style-option" data-style="scholar">
                                <div class="style-preview scholar"></div>
                                <span>📚 Scholar</span>
                            </div>
                            <div class="style-option" data-style="explorer">
                                <div class="style-preview explorer"></div>
                                <span>🗺️ Explorer</span>
                            </div>
                            <div class="style-option" data-style="healer">
                                <div class="style-preview healer"></div>
                                <span>🌿 Healer</span>
                            </div>
                            <div class="style-option" data-style="artist">
                                <div class="style-preview artist"></div>
                                <span>🎨 Artist</span>
                            </div>
                        </div>
                    </div>

                    <div class="tab-content" data-tab="colors">
                        <h4>Color Palette</h4>
                        <div class="color-categories">
                            <div class="color-category">
                                <label>Primary Color:</label>
                                <div class="color-grid">
                                    <button class="color-option" data-color="blue" style="background: linear-gradient(45deg, #3498db, #2980b9)"></button>
                                    <button class="color-option" data-color="purple" style="background: linear-gradient(45deg, #9b59b6, #8e44ad)"></button>
                                    <button class="color-option" data-color="green" style="background: linear-gradient(45deg, #27ae60, #229954)"></button>
                                    <button class="color-option" data-color="orange" style="background: linear-gradient(45deg, #f39c12, #e67e22)"></button>
                                    <button class="color-option" data-color="red" style="background: linear-gradient(45deg, #e74c3c, #c0392b)"></button>
                                    <button class="color-option" data-color="teal" style="background: linear-gradient(45deg, #1abc9c, #16a085)"></button>
                                    <button class="color-option" data-color="pink" style="background: linear-gradient(45deg, #e91e63, #ad1457)"></button>
                                    <button class="color-option" data-color="gold" style="background: linear-gradient(45deg, #f1c40f, #f39c12)"></button>
                                </div>
                            </div>
                        </div>
                    </div>

                    <div class="tab-content" data-tab="accessories">
                        <h4>Accessories & Details</h4>
                        <div class="accessory-grid">
                            <div class="accessory-option" data-accessory="none">
                                <div class="accessory-preview">✨</div>
                                <span>None</span>
                            </div>
                            <div class="accessory-option" data-accessory="crown">
                                <div class="accessory-preview">👑</div>
                                <span>Crown</span>
                            </div>
                            <div class="accessory-option" data-accessory="hat">
                                <div class="accessory-preview">🎩</div>
                                <span>Hat</span>
                            </div>
                            <div class="accessory-option" data-accessory="glasses">
                                <div class="accessory-preview">🤓</div>
                                <span>Glasses</span>
                            </div>
                            <div class="accessory-option" data-accessory="mask">
                                <div class="accessory-preview">🎭</div>
                                <span>Mask</span>
                            </div>
                            <div class="accessory-option" data-accessory="gem">
                                <div class="accessory-preview">💎</div>
                                <span>Gem</span>
                            </div>
                        </div>
                    </div>

                    <div class="tab-content" data-tab="effects">
                        <h4>Visual Effects</h4>
                        <div class="effects-grid">
                            <div class="effect-option" data-animation="float">
                                <div class="effect-preview float-demo"></div>
                                <span>Float</span>
                            </div>
                            <div class="effect-option" data-animation="pulse">
                                <div class="effect-preview pulse-demo"></div>
                                <span>Pulse</span>
                            </div>
                            <div class="effect-option" data-animation="rotate">
                                <div class="effect-preview rotate-demo"></div>
                                <span>Rotate</span>
                            </div>
                            <div class="effect-option" data-animation="bounce">
                                <div class="effect-preview bounce-demo"></div>
                                <span>Bounce</span>
                            </div>
                            <div class="effect-option" data-animation="glow">
                                <div class="effect-preview glow-demo"></div>
                                <span>Glow</span>
                            </div>
                            <div class="effect-option" data-animation="shake">
                                <div class="effect-preview shake-demo"></div>
                                <span>Shake</span>
                            </div>
                        </div>
                        
                        <div class="size-control">
                            <label>Avatar Size:</label>
                            <div class="size-options">
                                <button class="size-btn" data-size="small">Small</button>
                                <button class="size-btn active" data-size="medium">Medium</button>
                                <button class="size-btn" data-size="large">Large</button>
                            </div>
                        </div>
                    </div>
                </div>

                <div class="customization-actions">
                    <button id="randomize-avatar" class="action-btn secondary">🎲 Randomize</button>
                    <button id="reset-avatar" class="action-btn secondary">🔄 Reset</button>
                    <button id="apply-avatar" class="action-btn primary">✨ Apply Avatar</button>
                </div>
            `;

            document.getElementById('intro-screen').appendChild(panel);
            this.setupCustomizationEvents();
            this.updatePreview();
        };

        setTimeout(() => originalCreateCustomizationPanel(), 1000);
    }

    setupCustomizationEvents() {
        // Tab switching
        document.querySelectorAll('.tab-btn').forEach(btn => {
            btn.addEventListener('click', (e) => {
                const tab = e.target.dataset.tab;
                this.switchTab(tab);
            });
        });

        // Style selection
        document.querySelectorAll('.style-option').forEach(option => {
            option.addEventListener('click', (e) => {
                const style = e.currentTarget.dataset.style;
                this.selectStyle(style);
            });
        });

        // Color selection
        document.querySelectorAll('.color-option').forEach(option => {
            option.addEventListener('click', (e) => {
                const color = e.target.dataset.color;
                this.selectColor(color);
            });
        });

        // Accessory selection
        document.querySelectorAll('.accessory-option').forEach(option => {
            option.addEventListener('click', (e) => {
                const accessory = e.currentTarget.dataset.accessory;
                this.selectAccessory(accessory);
            });
        });

        // Animation selection
        document.querySelectorAll('.effect-option').forEach(option => {
            option.addEventListener('click', (e) => {
                const animation = e.currentTarget.dataset.animation;
                this.selectAnimation(animation);
            });
        });

        // Size selection
        document.querySelectorAll('.size-btn').forEach(btn => {
            btn.addEventListener('click', (e) => {
                const size = e.target.dataset.size;
                this.selectSize(size);
            });
        });

        // Action buttons
        document.getElementById('randomize-avatar').addEventListener('click', () => this.randomizeAvatar());
        document.getElementById('reset-avatar').addEventListener('click', () => this.resetAvatar());
        document.getElementById('apply-avatar').addEventListener('click', () => this.applyAvatar());
    }

    switchTab(tabName) {
        document.querySelectorAll('.tab-btn').forEach(btn => btn.classList.remove('active'));
        document.querySelectorAll('.tab-content').forEach(content => content.classList.remove('active'));
        
        document.querySelector(`[data-tab="${tabName}"]`).classList.add('active');
        document.querySelector(`.tab-content[data-tab="${tabName}"]`).classList.add('active');
    }

    selectStyle(style) {
        this.avatarConfig.style = style;
        document.querySelectorAll('.style-option').forEach(opt => opt.classList.remove('selected'));
        document.querySelector(`[data-style="${style}"]`).classList.add('selected');
        this.updatePreview();
    }

    selectColor(color) {
        this.avatarConfig.color = color;
        document.querySelectorAll('.color-option').forEach(opt => opt.classList.remove('selected'));
        document.querySelector(`[data-color="${color}"]`).classList.add('selected');
        this.updatePreview();
    }

    selectAccessory(accessory) {
        this.avatarConfig.accessory = accessory;
        document.querySelectorAll('.accessory-option').forEach(opt => opt.classList.remove('selected'));
        document.querySelector(`[data-accessory="${accessory}"]`).classList.add('selected');
        this.updatePreview();
    }

    selectAnimation(animation) {
        this.avatarConfig.animation = animation;
        document.querySelectorAll('.effect-option').forEach(opt => opt.classList.remove('selected'));
        document.querySelector(`[data-animation="${animation}"]`).classList.add('selected');
        this.updatePreview();
    }

    selectSize(size) {
        this.avatarConfig.size = size;
        document.querySelectorAll('.size-btn').forEach(btn => btn.classList.remove('active'));
        document.querySelector(`[data-size="${size}"]`).classList.add('active');
        this.updatePreview();
    }

    updatePreview() {
        const preview = document.getElementById('avatar-preview');
        if (!preview) return;

        const { style, color, accessory, animation, size } = this.avatarConfig;
        
        preview.className = `avatar-preview ${style} ${color} ${animation} ${size}`;
        preview.setAttribute('data-accessory', accessory);
        
        // Add accessory emoji
        const accessoryEmojis = {
            none: '',
            crown: '👑',
            hat: '🎩',
            glasses: '🤓',
            mask: '🎭',
            gem: '💎'
        };
        
        preview.innerHTML = accessoryEmojis[accessory] || '';
    }

    randomizeAvatar() {
        const styles = ['mystical', 'warrior', 'scholar', 'explorer', 'healer', 'artist'];
        const colors = ['blue', 'purple', 'green', 'orange', 'red', 'teal', 'pink', 'gold'];
        const accessories = ['none', 'crown', 'hat', 'glasses', 'mask', 'gem'];
        const animations = ['float', 'pulse', 'rotate', 'bounce', 'glow', 'shake'];
        const sizes = ['small', 'medium', 'large'];

        this.avatarConfig = {
            style: styles[Math.floor(Math.random() * styles.length)],
            color: colors[Math.floor(Math.random() * colors.length)],
            accessory: accessories[Math.floor(Math.random() * accessories.length)],
            animation: animations[Math.floor(Math.random() * animations.length)],
            size: sizes[Math.floor(Math.random() * sizes.length)]
        };

        this.updateSelections();
        this.updatePreview();
        this.showNotification('Avatar randomized! 🎲', 'success');
    }

    resetAvatar() {
        this.avatarConfig = {
            style: 'mystical',
            color: 'blue',
            accessory: 'none',
            animation: 'float',
            size: 'medium'
        };

        this.updateSelections();
        this.updatePreview();
        this.showNotification('Avatar reset! 🔄', 'info');
    }

    updateSelections() {
        // Update UI to reflect current config
        document.querySelectorAll('.style-option, .color-option, .accessory-option, .effect-option').forEach(el => {
            el.classList.remove('selected');
        });
        document.querySelectorAll('.size-btn').forEach(btn => btn.classList.remove('active'));

        const { style, color, accessory, animation, size } = this.avatarConfig;
        
        document.querySelector(`[data-style="${style}"]`)?.classList.add('selected');
        document.querySelector(`[data-color="${color}"]`)?.classList.add('selected');
        document.querySelector(`[data-accessory="${accessory}"]`)?.classList.add('selected');
        document.querySelector(`[data-animation="${animation}"]`)?.classList.add('selected');
        document.querySelector(`[data-size="${size}"]`)?.classList.add('active');
    }

    applyAvatar() {
        const gameAvatar = document.querySelector('.avatar-sprite');
        if (gameAvatar) {
            const { style, color, accessory, animation, size } = this.avatarConfig;
            gameAvatar.className = `avatar-sprite ${style} ${color} ${animation} ${size}`;
            gameAvatar.setAttribute('data-accessory', accessory);
            
            // Add accessory
            const accessoryEmojis = {
                none: '',
                crown: '👑',
                hat: '🎩',
                glasses: '🤓',
                mask: '🎭',
                gem: '💎'
            };
            
            gameAvatar.innerHTML = accessoryEmojis[accessory] || '';
        }

        // Save configuration
        localStorage.setItem('enneagram-avatar-config', JSON.stringify(this.avatarConfig));
        
        this.showNotification('Avatar applied! ✨', 'success');
    }

    setupAvatarPreview() {
        // Load saved configuration
        const saved = localStorage.getItem('enneagram-avatar-config');
        if (saved) {
            this.avatarConfig = { ...this.avatarConfig, ...JSON.parse(saved) };
        }
    }

    addAvatarAnimations() {
        const style = document.createElement('style');
        style.textContent = `
            .avatar-preview, .avatar-sprite {
                position: relative;
                transition: all 0.3s ease;
            }
            
            .avatar-preview::before, .avatar-sprite::before {
                content: attr(data-accessory);
                position: absolute;
                top: -10px;
                left: 50%;
                transform: translateX(-50%);
                font-size: 1.2em;
                z-index: 2;
            }
            
            .healer { background: linear-gradient(45deg, #2ecc71, #27ae60); border-radius: 50% 20%; }
            .artist { background: linear-gradient(45deg, #e91e63, #ad1457); border-radius: 30% 70% 70% 30% / 30% 30% 70% 70%; }
            
            .small { width: 40px; height: 40px; }
            .medium { width: 60px; height: 60px; }
            .large { width: 80px; height: 80px; }
            
            .pulse { animation: avatarPulse 2s ease-in-out infinite; }
            .rotate { animation: avatarRotate 4s linear infinite; }
            .bounce { animation: avatarBounce 1s ease-in-out infinite; }
            .glow { animation: avatarGlow 2s ease-in-out infinite alternate; }
            .shake { animation: avatarShake 0.5s ease-in-out infinite; }
            
            @keyframes avatarPulse {
                0%, 100% { transform: scale(1); }
                50% { transform: scale(1.1); }
            }
            
            @keyframes avatarRotate {
                from { transform: rotate(0deg); }
                to { transform: rotate(360deg); }
            }
            
            @keyframes avatarBounce {
                0%, 100% { transform: translateY(0); }
                50% { transform: translateY(-10px); }
            }
            
            @keyframes avatarGlow {
                0% { box-shadow: 0 0 5px rgba(255, 255, 255, 0.5); }
                100% { box-shadow: 0 0 20px rgba(255, 255, 255, 0.8), 0 0 30px currentColor; }
            }
            
            @keyframes avatarShake {
                0%, 100% { transform: translateX(0); }
                25% { transform: translateX(-2px); }
                75% { transform: translateX(2px); }
            }
        `;
        document.head.appendChild(style);
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
        `;

        document.body.appendChild(notification);

        setTimeout(() => {
            if (document.body.contains(notification)) {
                document.body.removeChild(notification);
            }
        }, 3000);
    }
}

// Initialize enhanced avatar system
document.addEventListener('DOMContentLoaded', () => {
    const initAvatar = () => {
        if (window.game) {
            new EnhancedAvatarSystem(window.game);
            console.log('🎨 Enhanced avatar system loaded');
        } else {
            setTimeout(initAvatar, 100);
        }
    };
    initAvatar();
});
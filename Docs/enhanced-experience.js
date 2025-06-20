// Enhanced experience features
class ExperienceEnhancements {
    constructor(game) {
        this.game = game;
        this.initializeEnhancements();
    }

    initializeEnhancements() {
        this.addIntroAnimation();
        this.addTypingEffect();
        this.addBackgroundMusic();
        this.addScreenTransitions();
        this.addHoverEffects();
        this.addProgressCelebrations();
    }

    addIntroAnimation() {
        const introScreen = document.getElementById('intro-screen');
        if (introScreen) {
            introScreen.style.opacity = '0';
            introScreen.style.transform = 'translateY(50px)';
            
            setTimeout(() => {
                introScreen.style.transition = 'all 1s ease-out';
                introScreen.style.opacity = '1';
                introScreen.style.transform = 'translateY(0)';
            }, 100);
        }
    }

    addTypingEffect() {
        this.game.originalDisplayScenario = this.game.displayScenario.bind(this.game);
        this.game.displayScenario = () => {
            this.game.originalDisplayScenario();
            
            const scenarioText = document.getElementById('scenario-text');
            if (scenarioText) {
                const fullText = scenarioText.textContent;
                scenarioText.textContent = '';
                
                let i = 0;
                const typeWriter = () => {
                    if (i < fullText.length) {
                        scenarioText.textContent += fullText.charAt(i);
                        i++;
                        setTimeout(typeWriter, 30);
                    }
                };
                
                setTimeout(typeWriter, 500);
            }
        };
    }

    addBackgroundMusic() {
        this.createBackgroundAmbience = () => {
            if (!this.game.soundEnabled) return;
            
            try {
                const audioContext = new (window.AudioContext || window.webkitAudioContext)();
                
                // Create multiple oscillators for ambient layers
                const frequencies = [60, 80, 120, 180];
                const oscillators = [];
                
                frequencies.forEach((freq, index) => {
                    const oscillator = audioContext.createOscillator();
                    const gainNode = audioContext.createGain();
                    
                    oscillator.connect(gainNode);
                    gainNode.connect(audioContext.destination);
                    
                    oscillator.frequency.setValueAtTime(freq, audioContext.currentTime);
                    oscillator.type = 'sine';
                    gainNode.gain.setValueAtTime(0.01 + index * 0.005, audioContext.currentTime);
                    
                    // Add subtle frequency modulation
                    const lfo = audioContext.createOscillator();
                    const lfoGain = audioContext.createGain();
                    lfo.connect(lfoGain);
                    lfoGain.connect(oscillator.frequency);
                    
                    lfo.frequency.setValueAtTime(0.1 + index * 0.05, audioContext.currentTime);
                    lfoGain.gain.setValueAtTime(2, audioContext.currentTime);
                    
                    oscillator.start();
                    lfo.start();
                    
                    oscillators.push({ oscillator, lfo });
                });
                
                // Stop after 30 seconds
                setTimeout(() => {
                    oscillators.forEach(({ oscillator, lfo }) => {
                        oscillator.stop();
                        lfo.stop();
                    });
                }, 30000);
                
            } catch (error) {
                console.warn('Background music not supported:', error);
            }
        };
        
        // Start ambient music when game begins
        const originalStartGame = this.game.startGame.bind(this.game);
        this.game.startGame = () => {
            originalStartGame();
            this.createBackgroundAmbience();
        };
    }

    addScreenTransitions() {
        const originalShowScreen = this.game.showScreen.bind(this.game);
        this.game.showScreen = (screenId) => {
            const currentScreen = document.querySelector('.screen.active');
            const targetScreen = document.getElementById(screenId);
            
            if (currentScreen && targetScreen) {
                // Fade out current screen
                currentScreen.style.transition = 'opacity 0.3s ease-out';
                currentScreen.style.opacity = '0';
                
                setTimeout(() => {
                    originalShowScreen(screenId);
                    
                    // Fade in new screen
                    targetScreen.style.opacity = '0';
                    targetScreen.style.transition = 'opacity 0.5s ease-in';
                    
                    setTimeout(() => {
                        targetScreen.style.opacity = '1';
                    }, 50);
                }, 300);
            } else {
                originalShowScreen(screenId);
            }
        };
    }

    addHoverEffects() {
        // Enhanced choice hover effects
        document.addEventListener('mouseover', (e) => {
            if (e.target.classList.contains('choice')) {
                this.createHoverParticles(e.target);
            }
        });
        
        // Button glow effects
        const style = document.createElement('style');
        style.textContent = `
            .choice:hover {
                box-shadow: 0 0 20px rgba(52, 152, 219, 0.4);
                transform: translateY(-2px) scale(1.02);
            }
            
            .primary-btn:hover:not(:disabled) {
                box-shadow: 0 0 25px rgba(39, 174, 96, 0.5);
                transform: translateY(-3px);
            }
            
            .hud-btn:hover {
                transform: scale(1.1);
                box-shadow: 0 0 15px rgba(255, 255, 255, 0.3);
            }
        `;
        document.head.appendChild(style);
    }

    createHoverParticles(element) {
        if (!this.game.particleCtx) return;
        
        const rect = element.getBoundingClientRect();
        const centerX = rect.left + rect.width / 2;
        const centerY = rect.top + rect.height / 2;
        
        for (let i = 0; i < 3; i++) {
            this.game.particles.push({
                x: centerX + (Math.random() - 0.5) * 20,
                y: centerY + (Math.random() - 0.5) * 20,
                vx: (Math.random() - 0.5) * 2,
                vy: -Math.random() * 2,
                life: 1,
                decay: 0.02,
                color: '#3498db',
                size: Math.random() * 3 + 1
            });
        }
    }

    addProgressCelebrations() {
        const originalNextScenario = this.game.nextScenario.bind(this.game);
        this.game.nextScenario = () => {
            const wasLastScenario = this.game.currentScenario === this.game.selectedScenarios.length - 1;
            
            originalNextScenario();
            
            // Celebrate milestones
            const progress = this.game.currentScenario / this.game.selectedScenarios.length;
            
            if (progress === 0.25 || progress === 0.5 || progress === 0.75) {
                this.showMilestoneEffect(Math.round(progress * 100));
            }
            
            if (wasLastScenario) {
                this.showCompletionFireworks();
            }
        };
    }

    showMilestoneEffect(percentage) {
        const milestone = document.createElement('div');
        milestone.className = 'milestone-effect';
        milestone.innerHTML = `
            <div class="milestone-icon">🌟</div>
            <div class="milestone-text">${percentage}% Complete!</div>
        `;
        
        milestone.style.cssText = `
            position: fixed;
            top: 50%;
            left: 50%;
            transform: translate(-50%, -50%);
            background: linear-gradient(135deg, #f093fb, #f5576c);
            color: white;
            padding: 2rem;
            border-radius: 15px;
            text-align: center;
            z-index: 1000;
            animation: milestoneAnimation 3s ease-out forwards;
            box-shadow: 0 10px 30px rgba(240, 147, 251, 0.4);
        `;
        
        document.body.appendChild(milestone);
        
        setTimeout(() => {
            if (document.body.contains(milestone)) {
                document.body.removeChild(milestone);
            }
        }, 3000);
        
        // Add milestone animation
        if (!document.getElementById('milestone-styles')) {
            const milestoneStyles = document.createElement('style');
            milestoneStyles.id = 'milestone-styles';
            milestoneStyles.textContent = `
                @keyframes milestoneAnimation {
                    0% { opacity: 0; transform: translate(-50%, -50%) scale(0.5); }
                    20% { opacity: 1; transform: translate(-50%, -50%) scale(1.2); }
                    80% { opacity: 1; transform: translate(-50%, -50%) scale(1); }
                    100% { opacity: 0; transform: translate(-50%, -50%) scale(0.8); }
                }
                
                .milestone-icon {
                    font-size: 3rem;
                    margin-bottom: 1rem;
                    animation: bounce 0.6s ease-out;
                }
                
                .milestone-text {
                    font-size: 1.5rem;
                    font-weight: bold;
                }
                
                @keyframes bounce {
                    0%, 20%, 50%, 80%, 100% { transform: translateY(0); }
                    40% { transform: translateY(-20px); }
                    60% { transform: translateY(-10px); }
                }
            `;
            document.head.appendChild(milestoneStyles);
        }
    }

    showCompletionFireworks() {
        if (!this.game.particleCtx) return;
        
        const colors = ['#ff6b6b', '#4ecdc4', '#45b7d1', '#f9ca24', '#f0932b', '#eb4d4b', '#6c5ce7'];
        
        // Create multiple firework bursts
        for (let burst = 0; burst < 5; burst++) {
            setTimeout(() => {
                const x = Math.random() * window.innerWidth;
                const y = Math.random() * window.innerHeight * 0.6 + window.innerHeight * 0.2;
                const color = colors[Math.floor(Math.random() * colors.length)];
                
                // Create firework particles
                for (let i = 0; i < 20; i++) {
                    const angle = (Math.PI * 2 * i) / 20;
                    const velocity = Math.random() * 5 + 3;
                    
                    this.game.particles.push({
                        x: x,
                        y: y,
                        vx: Math.cos(angle) * velocity,
                        vy: Math.sin(angle) * velocity,
                        life: 1,
                        decay: 0.015,
                        color: color,
                        size: Math.random() * 4 + 2
                    });
                }
            }, burst * 200);
        }
    }
}

// Auto-initialize when game is ready
document.addEventListener('DOMContentLoaded', () => {
    // Wait for game to be initialized
    const checkGame = () => {
        if (window.game) {
            new ExperienceEnhancements(window.game);
            console.log('✨ Experience enhancements loaded');
        } else {
            setTimeout(checkGame, 100);
        }
    };
    checkGame();
});
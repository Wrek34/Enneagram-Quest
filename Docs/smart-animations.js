// Smart Animation System - Context-aware animations
class SmartAnimations {
    constructor() {
        this.animationLevel = this.detectAnimationCapability();
        this.initializeAnimations();
    }

    detectAnimationCapability() {
        // Check device performance and user preferences
        const hasReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
        const isMobile = window.innerWidth <= 768;
        const hasLowMemory = navigator.deviceMemory && navigator.deviceMemory < 4;
        
        if (hasReducedMotion) return 'minimal';
        if (isMobile || hasLowMemory) return 'moderate';
        return 'full';
    }

    initializeAnimations() {
        this.addChoiceAnimations();
        this.addProgressAnimations();
        this.addResultsAnimations();
        this.addInteractionFeedback();
    }

    addChoiceAnimations() {
        const observer = new MutationObserver((mutations) => {
            mutations.forEach((mutation) => {
                if (mutation.type === 'childList') {
                    mutation.addedNodes.forEach((node) => {
                        if (node.classList && node.classList.contains('choice')) {
                            this.animateChoiceEntry(node);
                        }
                    });
                }
            });
        });

        const choicesContainer = document.getElementById('choices-container');
        if (choicesContainer) {
            observer.observe(choicesContainer, { childList: true });
        }
    }

    animateChoiceEntry(choiceElement) {
        if (this.animationLevel === 'minimal') {
            choiceElement.style.opacity = '1';
            return;
        }

        const animations = {
            moderate: () => {
                choiceElement.style.opacity = '0';
                choiceElement.style.transform = 'translateY(10px)';
                
                requestAnimationFrame(() => {
                    choiceElement.style.transition = 'all 0.3s ease';
                    choiceElement.style.opacity = '1';
                    choiceElement.style.transform = 'translateY(0)';
                });
            },
            full: () => {
                choiceElement.style.opacity = '0';
                choiceElement.style.transform = 'translateY(20px) scale(0.95)';
                choiceElement.style.filter = 'blur(2px)';
                
                requestAnimationFrame(() => {
                    choiceElement.style.transition = 'all 0.5s cubic-bezier(0.4, 0, 0.2, 1)';
                    choiceElement.style.opacity = '1';
                    choiceElement.style.transform = 'translateY(0) scale(1)';
                    choiceElement.style.filter = 'blur(0)';
                });
            }
        };

        animations[this.animationLevel]?.();
    }

    addProgressAnimations() {
        const progressFill = document.getElementById('progress-fill');
        if (!progressFill) return;

        const observer = new MutationObserver(() => {
            this.animateProgress(progressFill);
        });

        observer.observe(progressFill, { 
            attributes: true, 
            attributeFilter: ['style'] 
        });
    }

    animateProgress(progressElement) {
        if (this.animationLevel === 'minimal') return;

        const currentWidth = progressElement.style.width;
        const numericWidth = parseFloat(currentWidth);
        
        if (numericWidth > 0) {
            progressElement.style.transition = 'width 0.8s cubic-bezier(0.4, 0, 0.2, 1)';
            
            if (this.animationLevel === 'full') {
                progressElement.style.boxShadow = `0 0 10px rgba(52, 152, 219, ${numericWidth / 100})`;
            }
        }
    }

    addResultsAnimations() {
        const originalShowResults = window.game?.showResults;
        if (!originalShowResults) return;

        window.game.showResults = () => {
            originalShowResults.call(window.game);
            
            setTimeout(() => {
                this.animateResults();
            }, 100);
        };
    }

    animateResults() {
        const resultElements = [
            '#type-title',
            '#type-description', 
            '#type-details',
            '.social-sharing-section',
            '.tritype-analysis'
        ];

        resultElements.forEach((selector, index) => {
            const element = document.querySelector(selector);
            if (!element) return;

            if (this.animationLevel === 'minimal') {
                element.style.opacity = '1';
                return;
            }

            element.style.opacity = '0';
            element.style.transform = 'translateY(30px)';
            
            setTimeout(() => {
                element.style.transition = 'all 0.6s cubic-bezier(0.4, 0, 0.2, 1)';
                element.style.opacity = '1';
                element.style.transform = 'translateY(0)';
            }, index * 200);
        });
    }

    addInteractionFeedback() {
        document.addEventListener('click', (e) => {
            if (e.target.classList.contains('choice')) {
                this.animateChoiceSelection(e.target);
            }
            
            if (e.target.classList.contains('social-btn')) {
                this.animateButtonPress(e.target);
            }
        });
    }

    animateChoiceSelection(choiceElement) {
        if (this.animationLevel === 'minimal') return;

        const animations = {
            moderate: () => {
                choiceElement.style.transform = 'scale(0.98)';
                setTimeout(() => {
                    choiceElement.style.transform = 'scale(1)';
                }, 150);
            },
            full: () => {
                choiceElement.style.transform = 'scale(0.95)';
                choiceElement.style.boxShadow = '0 0 20px rgba(39, 174, 96, 0.6)';
                
                setTimeout(() => {
                    choiceElement.style.transform = 'scale(1.02)';
                    setTimeout(() => {
                        choiceElement.style.transform = 'scale(1)';
                        choiceElement.style.boxShadow = '0 4px 15px rgba(39, 174, 96, 0.3)';
                    }, 200);
                }, 100);
            }
        };

        animations[this.animationLevel]?.();
    }

    animateButtonPress(buttonElement) {
        if (this.animationLevel === 'minimal') return;

        buttonElement.style.transform = 'scale(0.95)';
        buttonElement.style.transition = 'transform 0.1s ease';
        
        setTimeout(() => {
            buttonElement.style.transform = 'scale(1)';
        }, 100);
    }

    // Particle system for celebrations
    createCelebrationEffect(element) {
        if (this.animationLevel !== 'full') return;

        const rect = element.getBoundingClientRect();
        const particles = [];
        
        for (let i = 0; i < 12; i++) {
            const particle = document.createElement('div');
            particle.className = 'celebration-particle';
            particle.style.cssText = `
                position: fixed;
                width: 6px;
                height: 6px;
                background: hsl(${Math.random() * 360}, 70%, 60%);
                border-radius: 50%;
                pointer-events: none;
                z-index: 1000;
                left: ${rect.left + rect.width / 2}px;
                top: ${rect.top + rect.height / 2}px;
            `;
            
            document.body.appendChild(particle);
            particles.push(particle);
            
            const angle = (i / 12) * Math.PI * 2;
            const velocity = 100 + Math.random() * 50;
            const vx = Math.cos(angle) * velocity;
            const vy = Math.sin(angle) * velocity;
            
            particle.animate([
                { transform: 'translate(0, 0) scale(1)', opacity: 1 },
                { transform: `translate(${vx}px, ${vy}px) scale(0)`, opacity: 0 }
            ], {
                duration: 800,
                easing: 'cubic-bezier(0.4, 0, 0.2, 1)'
            }).onfinish = () => {
                particle.remove();
            };
        }
    }

    // Adaptive quality adjustment
    adjustQuality(fps) {
        if (fps < 30 && this.animationLevel === 'full') {
            this.animationLevel = 'moderate';
            this.updateAnimationStyles();
        } else if (fps > 55 && this.animationLevel === 'moderate') {
            this.animationLevel = 'full';
            this.updateAnimationStyles();
        }
    }

    updateAnimationStyles() {
        document.documentElement.setAttribute('data-animation-level', this.animationLevel);
    }
}

// Initialize smart animations
document.addEventListener('DOMContentLoaded', () => {
    new SmartAnimations();
    console.log('✨ Smart animation system loaded');
});
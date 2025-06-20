// Guided Tour System for New Users
class GuidedTour {
    constructor() {
        this.steps = [
            {
                element: '#intro-screen',
                title: 'Welcome to Enneagram Quest!',
                content: 'This adventure-style game will help you discover your Enneagram personality type through engaging scenarios.',
                position: 'center'
            },
            {
                element: '#start-btn',
                title: 'Begin Your Journey',
                content: 'Click here to start your adventure and discover your true personality type.',
                position: 'bottom'
            },
            {
                element: '#player-avatar',
                title: 'Your Character',
                content: 'This is your avatar that will accompany you through your journey.',
                position: 'right',
                onlyInGame: true
            },
            {
                element: '.stat-bar',
                title: 'Character Stats',
                content: 'Your choices will develop your Wisdom, Courage, and Compassion attributes.',
                position: 'bottom',
                onlyInGame: true
            },
            {
                element: '#sound-toggle',
                title: 'Sound Controls',
                content: 'Toggle game sounds and music on or off.',
                position: 'left',
                onlyInGame: true
            },
            {
                element: '#choices-container',
                title: 'Make Your Choices',
                content: 'Each choice reveals aspects of your personality. Choose what feels most natural to you.',
                position: 'top',
                onlyInGame: true
            },
            {
                element: '.quick-actions',
                title: 'Quick Actions',
                content: 'Access helpful tools like your journal, stats, and game settings.',
                position: 'left',
                onlyInGame: true
            }
        ];
        
        this.currentStep = 0;
        this.tourActive = false;
        
        this.initializeTour();
    }
    
    initializeTour() {
        // Check if this is the user's first visit
        if (!localStorage.getItem('enneagram-tour-completed')) {
            this.addTourButton();
            
            // Auto-start tour after 2 seconds on first visit
            setTimeout(() => {
                this.startTour();
            }, 2000);
        } else {
            // Add a subtle tour button for returning users
            this.addTourButton(true);
        }
        
        // Listen for game screen changes
        document.addEventListener('screenChange', (e) => {
            if (this.tourActive) {
                if (e.detail.screen === 'game' && this.currentStep < 2) {
                    // Skip to game-specific steps
                    this.currentStep = 2;
                    this.showCurrentStep();
                }
            }
        });
    }
    
    addTourButton(subtle = false) {
        const tourBtn = document.createElement('button');
        tourBtn.className = subtle ? 'tour-btn subtle' : 'tour-btn';
        tourBtn.innerHTML = '❓ Tour';
        tourBtn.addEventListener('click', () => this.startTour());
        
        document.body.appendChild(tourBtn);
    }
    
    startTour() {
        this.tourActive = true;
        this.currentStep = 0;
        
        // Create overlay
        this.createOverlay();
        
        // Show first step
        this.showCurrentStep();
    }
    
    createOverlay() {
        // Remove any existing overlay
        this.removeOverlay();
        
        // Create new overlay
        const overlay = document.createElement('div');
        overlay.className = 'tour-overlay';
        document.body.appendChild(overlay);
        
        // Create tooltip container
        const tooltip = document.createElement('div');
        tooltip.className = 'tour-tooltip';
        tooltip.innerHTML = `
            <div class="tooltip-header">
                <h3 id="tooltip-title"></h3>
                <span class="step-counter">Step <span id="current-step">1</span> of ${this.steps.length}</span>
            </div>
            <div class="tooltip-content">
                <p id="tooltip-content"></p>
            </div>
            <div class="tooltip-actions">
                <button id="tour-prev" class="tour-btn secondary">← Previous</button>
                <button id="tour-next" class="tour-btn primary">Next →</button>
                <button id="tour-close" class="tour-btn">Skip Tour</button>
            </div>
        `;
        document.body.appendChild(tooltip);
        
        // Add event listeners
        document.getElementById('tour-prev').addEventListener('click', () => this.prevStep());
        document.getElementById('tour-next').addEventListener('click', () => this.nextStep());
        document.getElementById('tour-close').addEventListener('click', () => this.endTour());
    }
    
    showCurrentStep() {
        const step = this.steps[this.currentStep];
        
        // Skip steps that are only for game screen if not in game
        if (step.onlyInGame && !document.getElementById('game-screen').classList.contains('active')) {
            this.nextStep();
            return;
        }
        
        // Update tooltip content
        document.getElementById('tooltip-title').textContent = step.title;
        document.getElementById('tooltip-content').textContent = step.content;
        document.getElementById('current-step').textContent = this.currentStep + 1;
        
        // Update buttons
        document.getElementById('tour-prev').disabled = this.currentStep === 0;
        
        if (this.currentStep === this.steps.length - 1) {
            document.getElementById('tour-next').textContent = 'Finish';
        } else {
            document.getElementById('tour-next').textContent = 'Next →';
        }
        
        // Position tooltip
        this.positionTooltip(step);
        
        // Highlight element
        this.highlightElement(step.element);
    }
    
    positionTooltip(step) {
        const tooltip = document.querySelector('.tour-tooltip');
        
        if (step.position === 'center') {
            tooltip.style.top = '50%';
            tooltip.style.left = '50%';
            tooltip.style.transform = 'translate(-50%, -50%)';
            return;
        }
        
        const element = document.querySelector(step.element);
        if (!element) {
            // Center if element not found
            tooltip.style.top = '50%';
            tooltip.style.left = '50%';
            tooltip.style.transform = 'translate(-50%, -50%)';
            return;
        }
        
        const rect = element.getBoundingClientRect();
        
        switch (step.position) {
            case 'top':
                tooltip.style.top = `${rect.top - tooltip.offsetHeight - 20}px`;
                tooltip.style.left = `${rect.left + rect.width/2 - tooltip.offsetWidth/2}px`;
                tooltip.style.transform = 'none';
                break;
            case 'bottom':
                tooltip.style.top = `${rect.bottom + 20}px`;
                tooltip.style.left = `${rect.left + rect.width/2 - tooltip.offsetWidth/2}px`;
                tooltip.style.transform = 'none';
                break;
            case 'left':
                tooltip.style.top = `${rect.top + rect.height/2 - tooltip.offsetHeight/2}px`;
                tooltip.style.left = `${rect.left - tooltip.offsetWidth - 20}px`;
                tooltip.style.transform = 'none';
                break;
            case 'right':
                tooltip.style.top = `${rect.top + rect.height/2 - tooltip.offsetHeight/2}px`;
                tooltip.style.left = `${rect.right + 20}px`;
                tooltip.style.transform = 'none';
                break;
        }
        
        // Ensure tooltip is within viewport
        const tooltipRect = tooltip.getBoundingClientRect();
        
        if (tooltipRect.left < 20) {
            tooltip.style.left = '20px';
        }
        
        if (tooltipRect.right > window.innerWidth - 20) {
            tooltip.style.left = `${window.innerWidth - tooltip.offsetWidth - 20}px`;
        }
        
        if (tooltipRect.top < 20) {
            tooltip.style.top = '20px';
        }
        
        if (tooltipRect.bottom > window.innerHeight - 20) {
            tooltip.style.top = `${window.innerHeight - tooltip.offsetHeight - 20}px`;
        }
    }
    
    highlightElement(selector) {
        // Remove previous highlights
        document.querySelectorAll('.tour-highlight').forEach(el => {
            el.classList.remove('tour-highlight');
        });
        
        if (selector === '#intro-screen') return; // Don't highlight full screen
        
        // Add highlight to current element
        const element = document.querySelector(selector);
        if (element) {
            element.classList.add('tour-highlight');
        }
    }
    
    nextStep() {
        this.currentStep++;
        
        if (this.currentStep >= this.steps.length) {
            this.endTour();
            return;
        }
        
        this.showCurrentStep();
    }
    
    prevStep() {
        if (this.currentStep > 0) {
            this.currentStep--;
            this.showCurrentStep();
        }
    }
    
    endTour() {
        this.tourActive = false;
        this.removeOverlay();
        
        // Remove highlights
        document.querySelectorAll('.tour-highlight').forEach(el => {
            el.classList.remove('tour-highlight');
        });
        
        // Mark tour as completed
        localStorage.setItem('enneagram-tour-completed', 'true');
    }
    
    removeOverlay() {
        document.querySelectorAll('.tour-overlay, .tour-tooltip').forEach(el => {
            if (el.parentNode) {
                el.parentNode.removeChild(el);
            }
        });
    }
}

// Initialize guided tour
document.addEventListener('DOMContentLoaded', () => {
    setTimeout(() => {
        new GuidedTour();
        console.log('🔍 Guided tour system loaded');
    }, 1000);
});
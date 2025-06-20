class EnneagramQuest {
    constructor() {
        this.currentScenario = 0;
        this.typeScores = { 1: 0, 2: 0, 3: 0, 4: 0, 5: 0, 6: 0, 7: 0, 8: 0, 9: 0 };
        this.selectedScenarios = [];
        this.currentChoice = null;
        
        this.initializeGame();
    }

    initializeGame() {
        // Select 12 diverse scenarios for the quest
        this.selectedScenarios = this.selectDiverseScenarios(allScenarios, 12);
        
        // Bind event listeners
        document.getElementById('start-btn').addEventListener('click', () => this.startGame());
        document.getElementById('next-btn').addEventListener('click', () => this.nextScenario());
        document.getElementById('restart-btn').addEventListener('click', () => this.restartGame());
        
        // Set up choice selection
        document.addEventListener('click', (e) => {
            if (e.target.classList.contains('choice')) {
                this.selectChoice(e.target);
            }
        });

        // Keyboard navigation
        document.addEventListener('keydown', (e) => {
            if (e.key === 'Enter' && e.target.classList.contains('choice')) {
                this.selectChoice(e.target);
            }
        });
    }

    selectDiverseScenarios(scenarios, count) {
        // Ensure we get a good mix of scenarios
        const shuffled = [...scenarios].sort(() => Math.random() - 0.5);
        return shuffled.slice(0, count);
    }

    startGame() {
        this.showScreen('game-screen');
        this.displayScenario();
    }

    displayScenario() {
        const scenario = this.selectedScenarios[this.currentScenario];
        
        // Update progress
        const progress = ((this.currentScenario + 1) / this.selectedScenarios.length) * 100;
        document.getElementById('progress-fill').style.width = `${progress}%`;
        document.getElementById('progress-text').textContent = 
            `Question ${this.currentScenario + 1} of ${this.selectedScenarios.length}`;
        
        // Display scenario
        document.getElementById('scenario-title').textContent = scenario.title;
        document.getElementById('scenario-text').textContent = scenario.text;
        
        // Create choices
        const choicesContainer = document.getElementById('choices-container');
        choicesContainer.innerHTML = '';
        
        scenario.choices.forEach((choice, index) => {
            const button = document.createElement('button');
            button.className = 'choice';
            button.textContent = choice.text;
            button.setAttribute('data-choice-index', index);
            button.setAttribute('role', 'radio');
            button.setAttribute('aria-checked', 'false');
            button.setAttribute('tabindex', '0');
            choicesContainer.appendChild(button);
        });
        
        // Reset next button
        document.getElementById('next-btn').disabled = true;
        this.currentChoice = null;
    }

    selectChoice(choiceElement) {
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
        document.getElementById('next-btn').disabled = false;
        
        // Announce selection for screen readers
        this.announceChoice(choiceElement.textContent);
    }

    announceChoice(choiceText) {
        const announcement = document.createElement('div');
        announcement.setAttribute('aria-live', 'polite');
        announcement.setAttribute('aria-atomic', 'true');
        announcement.className = 'sr-only';
        announcement.textContent = `Selected: ${choiceText}`;
        document.body.appendChild(announcement);
        
        setTimeout(() => {
            document.body.removeChild(announcement);
        }, 1000);
    }

    nextScenario() {
        if (!this.currentChoice) return;
        
        // Score the choice
        this.currentChoice.types.forEach(type => {
            this.typeScores[type]++;
        });
        
        this.currentScenario++;
        
        if (this.currentScenario < this.selectedScenarios.length) {
            this.displayScenario();
        } else {
            this.showResults();
        }
    }

    showResults() {
        // Calculate dominant type
        const dominantType = this.calculateDominantType();
        const typeData = enneagramTypes[dominantType];
        
        // Display results
        document.getElementById('type-title').textContent = typeData.title;
        document.getElementById('type-description').textContent = typeData.description;
        document.getElementById('core-motivation').textContent = typeData.coreMotivation;
        document.getElementById('basic-fear').textContent = typeData.basicFear;
        
        // Display strengths
        const strengthsList = document.getElementById('strengths-list');
        strengthsList.innerHTML = '';
        typeData.strengths.forEach(strength => {
            const li = document.createElement('li');
            li.textContent = strength;
            strengthsList.appendChild(li);
        });
        
        this.showScreen('result-screen');
        
        // Announce result for screen readers
        setTimeout(() => {
            const announcement = document.createElement('div');
            announcement.setAttribute('aria-live', 'polite');
            announcement.className = 'sr-only';
            announcement.textContent = `Your Enneagram type is ${typeData.title}`;
            document.body.appendChild(announcement);
            
            setTimeout(() => {
                document.body.removeChild(announcement);
            }, 2000);
        }, 500);
    }

    calculateDominantType() {
        // Find the type with the highest score
        let maxScore = 0;
        let dominantType = 1;
        
        for (let type = 1; type <= 9; type++) {
            if (this.typeScores[type] > maxScore) {
                maxScore = this.typeScores[type];
                dominantType = type;
            }
        }
        
        // Handle ties by looking at secondary scores
        const tiedTypes = [];
        for (let type = 1; type <= 9; type++) {
            if (this.typeScores[type] === maxScore) {
                tiedTypes.push(type);
            }
        }
        
        if (tiedTypes.length > 1) {
            // Use a simple tiebreaker - could be enhanced with more sophisticated logic
            return tiedTypes[Math.floor(Math.random() * tiedTypes.length)];
        }
        
        return dominantType;
    }

    showScreen(screenId) {
        // Hide all screens
        document.querySelectorAll('.screen').forEach(screen => {
            screen.classList.remove('active');
        });
        
        // Show target screen
        document.getElementById(screenId).classList.add('active');
        
        // Focus management for accessibility
        const activeScreen = document.getElementById(screenId);
        const firstFocusable = activeScreen.querySelector('button, input, select, textarea, [tabindex]:not([tabindex="-1"])');
        if (firstFocusable) {
            setTimeout(() => firstFocusable.focus(), 100);
        }
    }

    restartGame() {
        // Reset game state
        this.currentScenario = 0;
        this.typeScores = { 1: 0, 2: 0, 3: 0, 4: 0, 5: 0, 6: 0, 7: 0, 8: 0, 9: 0 };
        this.selectedScenarios = this.selectDiverseScenarios(allScenarios, 12);
        this.currentChoice = null;
        
        // Return to intro screen
        this.showScreen('intro-screen');
    }
}

// Initialize the game when the page loads
document.addEventListener('DOMContentLoaded', () => {
    new EnneagramQuest();
});

// Add some visual feedback for better UX
document.addEventListener('DOMContentLoaded', () => {
    // Add hover effects for better interaction feedback
    const style = document.createElement('style');
    style.textContent = `
        .choice:focus {
            outline: 3px solid #f39c12;
            outline-offset: 2px;
        }
        
        @media (prefers-reduced-motion: reduce) {
            * {
                animation-duration: 0.01ms !important;
                animation-iteration-count: 1 !important;
                transition-duration: 0.01ms !important;
            }
        }
    `;
    document.head.appendChild(style);
});
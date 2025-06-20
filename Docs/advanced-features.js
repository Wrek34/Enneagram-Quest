// Advanced features for ultimate experience
class AdvancedGameFeatures {
    constructor(game) {
        this.game = game;
        this.initializeAdvancedFeatures();
    }

    initializeAdvancedFeatures() {
        this.addDynamicBackgrounds();
        // Character customization removed - using simple fantasy avatar system
        this.addPersonalityHints();
        this.addMoodSystem();
        this.addQuestJournal();
        this.addWeatherEffects();
        this.addNarrativeChoices();
        this.addPersonalityCompass();
    }

    addDynamicBackgrounds() {
        this.backgrounds = [
            'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
            'linear-gradient(135deg, #f093fb 0%, #f5576c 100%)',
            'linear-gradient(135deg, #4facfe 0%, #00f2fe 100%)',
            'linear-gradient(135deg, #43e97b 0%, #38f9d7 100%)',
            'linear-gradient(135deg, #fa709a 0%, #fee140 100%)',
            'linear-gradient(135deg, #a8edea 0%, #fed6e3 100%)',
            'linear-gradient(135deg, #ff9a9e 0%, #fecfef 100%)'
        ];

        this.changeBackground = () => {
            const randomBg = this.backgrounds[Math.floor(Math.random() * this.backgrounds.length)];
            document.body.style.background = randomBg;
            document.body.style.transition = 'background 2s ease';
        };

        // Change background every scenario
        const originalDisplayScenario = this.game.displayScenario.bind(this.game);
        this.game.displayScenario = () => {
            originalDisplayScenario();
            this.changeBackground();
        };
    }

    addCharacterCustomization() {
        this.createCustomizationPanel = () => {
            const panel = document.createElement('div');
            panel.className = 'customization-panel';
            panel.innerHTML = `
                <h3>Customize Your Avatar</h3>
                <div class="avatar-options">
                    <div class="option-group">
                        <label>Avatar Style:</label>
                        <select id="avatar-style">
                            <option value="mystical">🧙‍♂️ Mystical</option>
                            <option value="warrior">⚔️ Warrior</option>
                            <option value="scholar">📚 Scholar</option>
                            <option value="explorer">🗺️ Explorer</option>
                        </select>
                    </div>
                    <div class="option-group">
                        <label>Color Theme:</label>
                        <div class="color-options">
                            <button class="color-btn" data-color="blue" style="background: #3498db"></button>
                            <button class="color-btn" data-color="purple" style="background: #9b59b6"></button>
                            <button class="color-btn" data-color="green" style="background: #27ae60"></button>
                            <button class="color-btn" data-color="orange" style="background: #f39c12"></button>
                        </div>
                    </div>
                </div>
                <button id="apply-customization">Apply Changes</button>
            `;

            document.getElementById('intro-screen').appendChild(panel);

            // Handle customization
            document.getElementById('apply-customization').addEventListener('click', () => {
                const style = document.getElementById('avatar-style').value;
                const color = document.querySelector('.color-btn.selected')?.dataset.color || 'blue';
                this.applyAvatarCustomization(style, color);
            });

            // Color selection
            document.querySelectorAll('.color-btn').forEach(btn => {
                btn.addEventListener('click', () => {
                    document.querySelectorAll('.color-btn').forEach(b => b.classList.remove('selected'));
                    btn.classList.add('selected');
                });
            });
        };

        this.applyAvatarCustomization = (style, color) => {
            const avatar = document.querySelector('.avatar-sprite');
            if (avatar) {
                avatar.className = `avatar-sprite ${style} ${color}`;
                this.showNotification('Avatar customized!', 'success');
            }
        };

        // Add to intro screen
        setTimeout(() => this.createCustomizationPanel(), 1000);
    }

    addPersonalityHints() {
        this.personalityHints = {
            1: "You seem to value order and improvement...",
            2: "Your caring nature is showing...",
            3: "Achievement appears important to you...",
            4: "You have a unique perspective...",
            5: "Your analytical mind is evident...",
            6: "Security and loyalty matter to you...",
            7: "Your enthusiasm is contagious...",
            8: "Your strength and directness shine through...",
            9: "You bring harmony to situations..."
        };

        this.showPersonalityHint = () => {
            const scores = this.game.typeScores;
            const topType = Object.entries(scores).reduce((a, b) => scores[a[0]] > scores[b[0]] ? a : b)[0];
            
            if (scores[topType] >= 3) {
                const hint = this.personalityHints[topType];
                this.showFloatingMessage(hint, 'personality-hint');
            }
        };

        // Show hints periodically
        const originalSelectChoice = this.game.selectChoice.bind(this.game);
        this.game.selectChoice = (choiceElement) => {
            originalSelectChoice(choiceElement);
            
            if (Math.random() < 0.3) {
                setTimeout(() => this.showPersonalityHint(), 1000);
            }
        };
    }

    addMoodSystem() {
        this.moods = ['curious', 'confident', 'thoughtful', 'adventurous', 'peaceful'];
        this.currentMood = 'curious';

        this.updateMood = () => {
            const choice = this.game.currentChoice;
            if (!choice) return;

            // Determine mood based on choice types
            if (choice.types.includes(7) || choice.types.includes(8)) {
                this.currentMood = 'adventurous';
            } else if (choice.types.includes(5) || choice.types.includes(4)) {
                this.currentMood = 'thoughtful';
            } else if (choice.types.includes(3)) {
                this.currentMood = 'confident';
            } else if (choice.types.includes(9)) {
                this.currentMood = 'peaceful';
            } else {
                this.currentMood = 'curious';
            }

            this.displayMood();
        };

        this.displayMood = () => {
            const moodDisplay = document.getElementById('mood-display') || this.createMoodDisplay();
            moodDisplay.textContent = `Mood: ${this.currentMood}`;
            moodDisplay.className = `mood-display ${this.currentMood}`;
        };

        this.createMoodDisplay = () => {
            const display = document.createElement('div');
            display.id = 'mood-display';
            display.className = 'mood-display';
            document.getElementById('player-hud').appendChild(display);
            return display;
        };

        // Update mood on choice selection
        const originalSelectChoice = this.game.selectChoice.bind(this.game);
        this.game.selectChoice = (choiceElement) => {
            originalSelectChoice(choiceElement);
            setTimeout(() => this.updateMood(), 500);
        };
    }

    addQuestJournal() {
        this.journalEntries = [];

        this.addJournalEntry = (scenario, choice) => {
            const entry = {
                scenario: scenario.title,
                choice: choice.text,
                timestamp: new Date().toLocaleTimeString(),
                scenarioNumber: this.game.currentScenario + 1
            };
            this.journalEntries.push(entry);
        };

        this.showJournal = () => {
            const modal = document.createElement('div');
            modal.className = 'journal-modal';
            modal.innerHTML = `
                <div class="journal-content">
                    <h3>📖 Quest Journal</h3>
                    <div class="journal-entries">
                        ${this.journalEntries.map(entry => `
                            <div class="journal-entry">
                                <div class="entry-header">
                                    <span class="scenario-num">Scene ${entry.scenarioNumber}</span>
                                    <span class="timestamp">${entry.timestamp}</span>
                                </div>
                                <div class="scenario-title">${entry.scenario}</div>
                                <div class="choice-made">Choice: "${entry.choice}"</div>
                            </div>
                        `).join('')}
                    </div>
                    <button class="close-journal">Close Journal</button>
                </div>
            `;

            document.body.appendChild(modal);

            modal.querySelector('.close-journal').addEventListener('click', () => {
                document.body.removeChild(modal);
            });
        };

        // Add journal button to HUD
        const journalBtn = document.createElement('button');
        journalBtn.className = 'hud-btn';
        journalBtn.textContent = '📖';
        journalBtn.title = 'Quest Journal';
        journalBtn.addEventListener('click', () => this.showJournal());
        
        const hudSection = document.querySelector('.hud-section:last-child');
        if (hudSection) {
            hudSection.appendChild(journalBtn);
        }

        // Record entries
        const originalNextScenario = this.game.nextScenario.bind(this.game);
        this.game.nextScenario = () => {
            if (this.game.currentChoice) {
                const scenario = this.game.selectedScenarios[this.game.currentScenario];
                this.addJournalEntry(scenario, this.game.currentChoice);
            }
            originalNextScenario();
        };
    }

    addWeatherEffects() {
        this.weatherEffects = ['rain', 'snow', 'sparkles', 'leaves', 'mist'];
        this.currentWeather = null;

        this.createWeatherEffect = (type) => {
            this.clearWeather();
            this.currentWeather = type;

            const weatherContainer = document.createElement('div');
            weatherContainer.className = `weather-effect ${type}`;
            weatherContainer.id = 'weather-container';

            for (let i = 0; i < 50; i++) {
                const particle = document.createElement('div');
                particle.className = `weather-particle ${type}-particle`;
                particle.style.left = Math.random() * 100 + '%';
                particle.style.animationDelay = Math.random() * 3 + 's';
                particle.style.animationDuration = (Math.random() * 3 + 2) + 's';
                weatherContainer.appendChild(particle);
            }

            document.body.appendChild(weatherContainer);
        };

        this.clearWeather = () => {
            const existing = document.getElementById('weather-container');
            if (existing) {
                document.body.removeChild(existing);
            }
        };

        this.randomWeather = () => {
            if (Math.random() < 0.4) {
                const weather = this.weatherEffects[Math.floor(Math.random() * this.weatherEffects.length)];
                this.createWeatherEffect(weather);
            }
        };

        // Random weather on scenario change
        const originalDisplayScenario = this.game.displayScenario.bind(this.game);
        this.game.displayScenario = () => {
            originalDisplayScenario();
            setTimeout(() => this.randomWeather(), 1000);
        };
    }

    addNarrativeChoices() {
        this.narrativeResponses = {
            wise: ["A thoughtful choice...", "Wisdom guides your path...", "Your insight serves you well..."],
            brave: ["Courage fills your heart...", "You face the challenge boldly...", "Bravery lights your way..."],
            kind: ["Compassion shapes your decision...", "Your kindness shines through...", "A caring heart leads you..."],
            creative: ["Your unique perspective emerges...", "Creativity flows through you...", "You see what others miss..."],
            analytical: ["Logic guides your thinking...", "You analyze with precision...", "Knowledge illuminates the path..."]
        };

        this.showNarrativeResponse = (choice) => {
            let responseType = 'wise';
            
            if (choice.types.includes(8) || choice.types.includes(1)) responseType = 'brave';
            else if (choice.types.includes(2) || choice.types.includes(9)) responseType = 'kind';
            else if (choice.types.includes(4) || choice.types.includes(7)) responseType = 'creative';
            else if (choice.types.includes(5) || choice.types.includes(6)) responseType = 'analytical';

            const responses = this.narrativeResponses[responseType];
            const response = responses[Math.floor(Math.random() * responses.length)];
            
            this.showFloatingMessage(response, 'narrative-response');
        };

        // Show narrative responses
        const originalSelectChoice = this.game.selectChoice.bind(this.game);
        this.game.selectChoice = (choiceElement) => {
            originalSelectChoice(choiceElement);
            
            setTimeout(() => {
                if (this.game.currentChoice) {
                    this.showNarrativeResponse(this.game.currentChoice);
                }
            }, 800);
        };
    }

    addPersonalityCompass() {
        this.createCompass = () => {
            const compass = document.createElement('div');
            compass.className = 'personality-compass';
            compass.innerHTML = `
                <div class="compass-center">🧭</div>
                <div class="compass-ring">
                    <div class="compass-point north" data-types="1,8">Action</div>
                    <div class="compass-point east" data-types="3,7">Success</div>
                    <div class="compass-point south" data-types="2,9">Heart</div>
                    <div class="compass-point west" data-types="4,5">Mind</div>
                </div>
                <div class="compass-needle"></div>
            `;

            document.getElementById('game-screen').appendChild(compass);
        };

        this.updateCompass = () => {
            const scores = this.game.typeScores;
            const actionScore = (scores[1] || 0) + (scores[8] || 0);
            const successScore = (scores[3] || 0) + (scores[7] || 0);
            const heartScore = (scores[2] || 0) + (scores[9] || 0);
            const mindScore = (scores[4] || 0) + (scores[5] || 0);

            const maxScore = Math.max(actionScore, successScore, heartScore, mindScore);
            let direction = 0;

            if (maxScore === actionScore) direction = 0;
            else if (maxScore === successScore) direction = 90;
            else if (maxScore === heartScore) direction = 180;
            else if (maxScore === mindScore) direction = 270;

            const needle = document.querySelector('.compass-needle');
            if (needle) {
                needle.style.transform = `rotate(${direction}deg)`;
            }
        };

        // Create compass when game starts
        const originalStartGame = this.game.startGame.bind(this.game);
        this.game.startGame = () => {
            originalStartGame();
            setTimeout(() => this.createCompass(), 500);
        };

        // Update compass on choice
        const originalSelectChoice = this.game.selectChoice.bind(this.game);
        this.game.selectChoice = (choiceElement) => {
            originalSelectChoice(choiceElement);
            setTimeout(() => this.updateCompass(), 1000);
        };
    }

    showFloatingMessage(message, className) {
        const floatingMsg = document.createElement('div');
        floatingMsg.className = `floating-message ${className}`;
        floatingMsg.textContent = message;
        
        floatingMsg.style.cssText = `
            position: fixed;
            top: 30%;
            left: 50%;
            transform: translateX(-50%);
            background: rgba(0, 0, 0, 0.8);
            color: white;
            padding: 1rem 2rem;
            border-radius: 25px;
            font-style: italic;
            z-index: 1000;
            animation: floatMessage 4s ease-out forwards;
        `;

        document.body.appendChild(floatingMsg);

        setTimeout(() => {
            if (document.body.contains(floatingMsg)) {
                document.body.removeChild(floatingMsg);
            }
        }, 4000);
    }

    showNotification(message, type) {
        const notification = document.createElement('div');
        notification.className = `advanced-notification ${type}`;
        notification.textContent = message;
        
        notification.style.cssText = `
            position: fixed;
            top: 20px;
            right: 20px;
            padding: 1rem;
            border-radius: 8px;
            color: white;
            z-index: 1001;
            animation: slideInRight 0.3s ease, slideOutRight 0.3s ease 2.7s forwards;
            background: ${type === 'success' ? '#27ae60' : '#3498db'};
        `;

        document.body.appendChild(notification);

        setTimeout(() => {
            if (document.body.contains(notification)) {
                document.body.removeChild(notification);
            }
        }, 3000);
    }
}

// Auto-initialize advanced features
document.addEventListener('DOMContentLoaded', () => {
    const initAdvanced = () => {
        if (window.game) {
            new AdvancedGameFeatures(window.game);
            console.log('🚀 Advanced features loaded');
        } else {
            setTimeout(initAdvanced, 100);
        }
    };
    initAdvanced();
});
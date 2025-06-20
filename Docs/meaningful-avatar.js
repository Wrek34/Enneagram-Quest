// Meaningful Avatar System - Avatar choices affect gameplay
class MeaningfulAvatar {
    constructor(game) {
        this.game = game;
        this.avatarTraits = {};
        this.initializeAvatarSystem();
    }

    initializeAvatarSystem() {
        this.defineAvatarTraits();
        this.addAvatarSelection();
        this.integrateWithGameplay();
    }

    defineAvatarTraits() {
        this.avatarTraits = {
            mage: {
                name: 'The Mystic Scholar',
                description: 'Seeks wisdom and understanding through ancient knowledge',
                typeInfluence: [1, 5, 4], // Perfectionist, Investigator, Individualist
                bonusStats: { wisdom: 5 },
                specialAbility: 'Insight Vision - Reveals hidden motivations in scenarios',
                personality: 'Thoughtful and introspective, values knowledge and truth'
            },
            warrior: {
                name: 'The Noble Guardian',
                description: 'Protects others and stands firm in their convictions',
                typeInfluence: [8, 6, 1], // Challenger, Loyalist, Perfectionist
                bonusStats: { courage: 5 },
                specialAbility: 'Protective Instinct - Identifies threats to group harmony',
                personality: 'Strong-willed and protective, values justice and loyalty'
            },
            rogue: {
                name: 'The Adaptive Explorer',
                description: 'Navigates challenges with flexibility and quick thinking',
                typeInfluence: [7, 3, 9], // Enthusiast, Achiever, Peacemaker
                bonusStats: { courage: 3, wisdom: 2 },
                specialAbility: 'Quick Adaptation - Finds creative solutions to problems',
                personality: 'Versatile and resourceful, values freedom and possibility'
            },
            healer: {
                name: 'The Compassionate Guide',
                description: 'Brings healing and support to those in need',
                typeInfluence: [2, 9, 4], // Helper, Peacemaker, Individualist
                bonusStats: { compassion: 5 },
                specialAbility: 'Empathic Understanding - Senses others\' emotional needs',
                personality: 'Caring and nurturing, values connection and harmony'
            },
            bard: {
                name: 'The Inspiring Storyteller',
                description: 'Motivates others through charisma and creative expression',
                typeInfluence: [3, 7, 2], // Achiever, Enthusiast, Helper
                bonusStats: { compassion: 3, courage: 2 },
                specialAbility: 'Motivational Presence - Inspires others to action',
                personality: 'Charismatic and expressive, values achievement and connection'
            },
            ranger: {
                name: 'The Independent Seeker',
                description: 'Finds their own path while staying true to their values',
                typeInfluence: [5, 4, 6], // Investigator, Individualist, Loyalist
                bonusStats: { wisdom: 3, courage: 2 },
                specialAbility: 'Inner Compass - Maintains clarity in complex situations',
                personality: 'Independent and observant, values authenticity and competence'
            }
        };
    }

    addAvatarSelection() {
        // Override the simple fantasy avatar system
        const originalShowAvatarCustomization = window.showAvatarCustomization;
        
        window.showAvatarCustomization = () => {
            this.showMeaningfulAvatarSelection();
        };
    }

    showMeaningfulAvatarSelection() {
        const modal = document.createElement('div');
        modal.className = 'avatar-selection-modal';
        modal.innerHTML = `
            <div class="avatar-selection-content">
                <div class="selection-header">
                    <h3>🎭 Choose Your Quest Persona</h3>
                    <p>Your choice will influence your journey and insights</p>
                </div>
                <div class="avatar-grid">
                    ${Object.entries(this.avatarTraits).map(([key, trait]) => `
                        <div class="avatar-option" data-avatar="${key}">
                            <div class="avatar-visual ${key}"></div>
                            <h4>${trait.name}</h4>
                            <p class="avatar-desc">${trait.description}</p>
                            <div class="avatar-stats">
                                ${Object.entries(trait.bonusStats).map(([stat, value]) => 
                                    `<span class="stat-bonus">+${value} ${stat}</span>`
                                ).join('')}
                            </div>
                            <div class="special-ability">
                                <strong>Special:</strong> ${trait.specialAbility}
                            </div>
                        </div>
                    `).join('')}
                </div>
                <div class="selection-actions">
                    <button id="confirm-avatar" disabled>Begin Quest</button>
                </div>
            </div>
        `;

        document.body.appendChild(modal);
        this.bindAvatarSelection(modal);
    }

    bindAvatarSelection(modal) {
        const options = modal.querySelectorAll('.avatar-option');
        const confirmBtn = modal.querySelector('#confirm-avatar');
        let selectedAvatar = null;

        options.forEach(option => {
            option.addEventListener('click', () => {
                // Remove previous selection
                options.forEach(opt => opt.classList.remove('selected'));
                
                // Select new option
                option.classList.add('selected');
                selectedAvatar = option.dataset.avatar;
                confirmBtn.disabled = false;
                
                // Show preview of personality influence
                this.showAvatarPreview(selectedAvatar);
            });
        });

        confirmBtn.addEventListener('click', () => {
            if (selectedAvatar) {
                this.selectAvatar(selectedAvatar);
                modal.remove();
                this.game.startGame();
            }
        });
    }

    showAvatarPreview(avatarKey) {
        const trait = this.avatarTraits[avatarKey];
        const preview = document.querySelector('.avatar-preview') || document.createElement('div');
        preview.className = 'avatar-preview';
        preview.innerHTML = `
            <div class="preview-content">
                <h4>Personality Influence</h4>
                <p>${trait.personality}</p>
                <div class="type-influences">
                    <strong>Resonates with types:</strong> ${trait.typeInfluence.join(', ')}
                </div>
            </div>
        `;

        const modal = document.querySelector('.avatar-selection-content');
        if (modal && !modal.querySelector('.avatar-preview')) {
            modal.appendChild(preview);
        }
    }

    selectAvatar(avatarKey) {
        const trait = this.avatarTraits[avatarKey];
        
        // Apply avatar bonuses to game
        Object.entries(trait.bonusStats).forEach(([stat, value]) => {
            this.game.playerStats[stat] += value;
        });

        // Store avatar choice
        this.game.selectedAvatar = avatarKey;
        this.game.avatarTrait = trait;

        // Update HUD to show avatar
        this.updateAvatarDisplay(avatarKey, trait);
        
        console.log(`🎭 Selected avatar: ${trait.name}`);
    }

    updateAvatarDisplay(avatarKey, trait) {
        const avatarElement = document.querySelector('#player-avatar .avatar-sprite');
        if (avatarElement) {
            avatarElement.className = `avatar-sprite ${avatarKey}`;
            avatarElement.title = trait.name;
        }

        // Add avatar info to HUD
        const hudSection = document.querySelector('.hud-section');
        if (hudSection && !hudSection.querySelector('.avatar-info')) {
            const avatarInfo = document.createElement('div');
            avatarInfo.className = 'avatar-info';
            avatarInfo.innerHTML = `
                <div class="avatar-name">${trait.name}</div>
                <div class="avatar-ability" title="${trait.specialAbility}">✨</div>
            `;
            hudSection.appendChild(avatarInfo);
        }
    }

    integrateWithGameplay() {
        // Modify scenario display to include avatar insights
        const originalDisplayScenario = this.game.displayScenario.bind(this.game);
        this.game.displayScenario = () => {
            originalDisplayScenario();
            
            setTimeout(() => {
                this.addAvatarInsight();
            }, 1000);
        };

        // Modify choice selection to apply avatar influence
        const originalSelectChoice = this.game.selectChoice.bind(this.game);
        this.game.selectChoice = (choiceElement) => {
            this.applyAvatarInfluence(choiceElement);
            originalSelectChoice(choiceElement);
        };
    }

    addAvatarInsight() {
        if (!this.game.avatarTrait) return;

        const scenario = this.game.selectedScenarios[this.game.currentScenario];
        const insight = this.generateAvatarInsight(scenario, this.game.avatarTrait);
        
        if (insight) {
            const insightElement = document.createElement('div');
            insightElement.className = 'avatar-insight';
            insightElement.innerHTML = `
                <div class="insight-header">
                    <span class="avatar-icon">✨</span>
                    <span>${this.game.avatarTrait.name} Insight</span>
                </div>
                <p>${insight}</p>
            `;

            const scenarioContent = document.getElementById('scenario-content');
            if (scenarioContent) {
                scenarioContent.appendChild(insightElement);
            }
        }
    }

    generateAvatarInsight(scenario, trait) {
        const insights = {
            mage: [
                "Your scholarly nature reveals deeper meanings in this situation.",
                "Ancient wisdom suggests there are hidden layers to consider.",
                "Your analytical mind sees patterns others might miss."
            ],
            warrior: [
                "Your protective instincts sense potential threats to the group.",
                "Honor and duty guide your perspective on this challenge.",
                "Your courage allows you to face difficult truths."
            ],
            rogue: [
                "Your adaptable nature sees multiple paths forward.",
                "Quick thinking reveals unconventional solutions.",
                "Your flexibility helps navigate complex situations."
            ],
            healer: [
                "Your empathic nature senses the emotional undercurrents.",
                "Compassion reveals the human cost of each choice.",
                "Your healing spirit seeks harmony and understanding."
            ],
            bard: [
                "Your charismatic nature sees how to inspire others.",
                "Creative expression offers unique perspectives.",
                "Your motivational spirit seeks to uplift everyone."
            ],
            ranger: [
                "Your independent spirit values authentic choices.",
                "Solitary wisdom provides clear perspective.",
                "Your inner compass points toward truth."
            ]
        };

        const avatarInsights = insights[this.game.selectedAvatar];
        return avatarInsights ? avatarInsights[Math.floor(Math.random() * avatarInsights.length)] : null;
    }

    applyAvatarInfluence(choiceElement) {
        if (!this.game.avatarTrait) return;

        const choiceIndex = parseInt(choiceElement.getAttribute('data-choice-index'));
        const scenario = this.game.selectedScenarios[this.game.currentScenario];
        const choice = scenario.choices[choiceIndex];

        // Check if choice aligns with avatar's type influences
        const hasInfluence = choice.types.some(type => 
            this.game.avatarTrait.typeInfluence.includes(type)
        );

        if (hasInfluence) {
            // Boost the score for aligned choices
            choice.types.forEach(type => {
                if (this.game.avatarTrait.typeInfluence.includes(type)) {
                    this.game.typeScores[type] += 0.5; // Small bonus
                }
            });

            // Visual feedback
            choiceElement.classList.add('avatar-aligned');
            
            // Show alignment indicator
            if (!choiceElement.querySelector('.alignment-indicator')) {
                const indicator = document.createElement('span');
                indicator.className = 'alignment-indicator';
                indicator.textContent = '✨';
                indicator.title = `Aligns with ${this.game.avatarTrait.name}`;
                choiceElement.appendChild(indicator);
            }
        }
    }
}

// Initialize meaningful avatar system
document.addEventListener('DOMContentLoaded', () => {
    const initAvatar = () => {
        if (window.game) {
            new MeaningfulAvatar(window.game);
            console.log('🎭 Meaningful avatar system loaded');
        } else {
            setTimeout(initAvatar, 100);
        }
    };
    initAvatar();
});
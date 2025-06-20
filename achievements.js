// Achievement system for Enneagram Quest
const achievements = {
    'first_choice': {
        name: 'First Steps',
        description: 'Made your first choice in the temple',
        icon: '👣',
        unlocked: false
    },
    'wisdom_seeker': {
        name: 'Wisdom Seeker',
        description: 'Reached 50 Wisdom points',
        icon: '🧠',
        unlocked: false
    },
    'brave_heart': {
        name: 'Brave Heart',
        description: 'Reached 50 Courage points',
        icon: '⚔️',
        unlocked: false
    },
    'kind_soul': {
        name: 'Kind Soul',
        description: 'Reached 50 Compassion points',
        icon: '💝',
        unlocked: false
    },
    'treasure_hunter': {
        name: 'Treasure Hunter',
        description: 'Collected 5 items',
        icon: '💎',
        unlocked: false
    },
    'level_master': {
        name: 'Level Master',
        description: 'Reached level 5',
        icon: '⭐',
        unlocked: false
    },
    'quest_complete': {
        name: 'Quest Complete',
        description: 'Completed your first Enneagram Quest',
        icon: '🏆',
        unlocked: false
    },
    'perfectionist': {
        name: 'The Perfectionist',
        description: 'Discovered Type 1 personality',
        icon: '✨',
        unlocked: false
    },
    'helper': {
        name: 'The Helper',
        description: 'Discovered Type 2 personality',
        icon: '🤝',
        unlocked: false
    },
    'achiever': {
        name: 'The Achiever',
        description: 'Discovered Type 3 personality',
        icon: '🎯',
        unlocked: false
    },
    'individualist': {
        name: 'The Individualist',
        description: 'Discovered Type 4 personality',
        icon: '🎨',
        unlocked: false
    },
    'investigator': {
        name: 'The Investigator',
        description: 'Discovered Type 5 personality',
        icon: '🔍',
        unlocked: false
    },
    'loyalist': {
        name: 'The Loyalist',
        description: 'Discovered Type 6 personality',
        icon: '🛡️',
        unlocked: false
    },
    'enthusiast': {
        name: 'The Enthusiast',
        description: 'Discovered Type 7 personality',
        icon: '🎉',
        unlocked: false
    },
    'challenger': {
        name: 'The Challenger',
        description: 'Discovered Type 8 personality',
        icon: '💪',
        unlocked: false
    },
    'peacemaker': {
        name: 'The Peacemaker',
        description: 'Discovered Type 9 personality',
        icon: '☮️',
        unlocked: false
    }
};

class AchievementSystem {
    constructor(game) {
        this.game = game;
        this.achievements = { ...achievements };
        this.loadAchievements();
    }

    checkAchievement(type, value = null) {
        switch(type) {
            case 'first_choice':
                this.unlock('first_choice');
                break;
            case 'stats':
                if (this.game.playerStats.wisdom >= 50) this.unlock('wisdom_seeker');
                if (this.game.playerStats.courage >= 50) this.unlock('brave_heart');
                if (this.game.playerStats.compassion >= 50) this.unlock('kind_soul');
                break;
            case 'items':
                if (this.game.inventory.length >= 5) this.unlock('treasure_hunter');
                break;
            case 'level':
                if (this.game.playerStats.level >= 5) this.unlock('level_master');
                break;
            case 'quest_complete':
                this.unlock('quest_complete');
                break;
            case 'personality':
                const typeMap = {
                    1: 'perfectionist', 2: 'helper', 3: 'achiever',
                    4: 'individualist', 5: 'investigator', 6: 'loyalist',
                    7: 'enthusiast', 8: 'challenger', 9: 'peacemaker'
                };
                if (typeMap[value]) this.unlock(typeMap[value]);
                break;
        }
    }

    unlock(achievementId) {
        if (!this.achievements[achievementId] || this.achievements[achievementId].unlocked) return;
        
        this.achievements[achievementId].unlocked = true;
        this.saveAchievements();
        this.showAchievementNotification(this.achievements[achievementId]);
    }

    showAchievementNotification(achievement) {
        const notification = document.createElement('div');
        notification.className = 'achievement-notification';
        notification.innerHTML = `
            <div class="achievement-icon">${achievement.icon}</div>
            <div class="achievement-text">
                <div class="achievement-title">Achievement Unlocked!</div>
                <div class="achievement-name">${achievement.name}</div>
                <div class="achievement-desc">${achievement.description}</div>
            </div>
        `;
        
        document.body.appendChild(notification);
        
        // Play achievement sound
        if (this.game.soundEnabled) {
            this.game.sounds.levelUp();
        }
        
        setTimeout(() => {
            if (document.body.contains(notification)) {
                document.body.removeChild(notification);
            }
        }, 4000);
    }

    getUnlockedCount() {
        return Object.values(this.achievements).filter(a => a.unlocked).length;
    }

    getTotalCount() {
        return Object.keys(this.achievements).length;
    }

    saveAchievements() {
        localStorage.setItem('enneagram-quest-achievements', JSON.stringify(this.achievements));
    }

    loadAchievements() {
        const saved = localStorage.getItem('enneagram-quest-achievements');
        if (saved) {
            const savedAchievements = JSON.parse(saved);
            Object.keys(savedAchievements).forEach(key => {
                if (this.achievements[key]) {
                    this.achievements[key].unlocked = savedAchievements[key].unlocked;
                }
            });
        }
    }

    displayAchievements() {
        const modal = document.createElement('div');
        modal.className = 'achievement-modal';
        modal.innerHTML = `
            <div class="achievement-content">
                <h3>Achievements (${this.getUnlockedCount()}/${this.getTotalCount()})</h3>
                <div class="achievement-grid">
                    ${Object.entries(this.achievements).map(([id, achievement]) => `
                        <div class="achievement-item ${achievement.unlocked ? 'unlocked' : 'locked'}">
                            <div class="achievement-icon">${achievement.unlocked ? achievement.icon : '🔒'}</div>
                            <div class="achievement-info">
                                <div class="achievement-name">${achievement.name}</div>
                                <div class="achievement-desc">${achievement.description}</div>
                            </div>
                        </div>
                    `).join('')}
                </div>
                <button class="close-achievements">Close</button>
            </div>
        `;
        
        document.body.appendChild(modal);
        
        modal.querySelector('.close-achievements').addEventListener('click', () => {
            document.body.removeChild(modal);
        });
        
        modal.addEventListener('click', (e) => {
            if (e.target === modal) {
                document.body.removeChild(modal);
            }
        });
    }
}
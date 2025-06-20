// Enhanced Save System
class SaveSystem {
    constructor(game) {
        this.game = game;
        this.saveKey = 'enneagram-quest-save';
        this.autoSaveInterval = 30000; // 30 seconds
        this.initializeSaveSystem();
    }

    initializeSaveSystem() {
        // Save system disabled for streamlined experience
        console.log('💾 Save system disabled - streamlined single-session experience');
    }

    setupAutoSave() {



    }



    showSaveMenu() {
        const saves = this.getAllSaves();
        
        const modal = document.createElement('div');
        modal.className = 'save-modal';
        modal.innerHTML = `
            <div class="save-content">
                <h3>💾 Save & Load Game</h3>
                
                <div class="save-section">
                    <h4>Quick Save</h4>
                    <button onclick="saveSystem.saveGame()" class="save-btn primary">
                        💾 Save Current Progress
                    </button>
                    <p class="save-info">Last saved: ${this.getLastSaveTime()}</p>
                </div>
                
                <div class="save-section">
                    <h4>Save Slots</h4>
                    <div class="save-slots">
                        ${this.renderSaveSlots(saves)}
                    </div>
                </div>
                
                <div class="save-section">
                    <h4>Export/Import</h4>
                    <button onclick="saveSystem.exportSave()" class="save-btn secondary">
                        📤 Export Save
                    </button>
                    <button onclick="saveSystem.importSave()" class="save-btn secondary">
                        📥 Import Save
                    </button>
                </div>
                
                <button onclick="this.parentElement.parentElement.remove()" class="save-btn">
                    Close
                </button>
            </div>
        `;
        
        document.body.appendChild(modal);
        window.saveSystem = this; // Make available globally
    }

    renderSaveSlots(saves) {
        let html = '';
        
        for (let i = 1; i <= 3; i++) {
            const save = saves[`slot${i}`];
            
            if (save) {
                html += `
                    <div class="save-slot filled">
                        <div class="slot-info">
                            <h5>Slot ${i}</h5>
                            <p>Progress: ${save.progress}%</p>
                            <p>Type: ${save.currentType || 'Unknown'}</p>
                            <small>${new Date(save.timestamp).toLocaleString()}</small>
                        </div>
                        <div class="slot-actions">
                            <button onclick="saveSystem.loadSlot(${i})" class="slot-btn load">Load</button>
                            <button onclick="saveSystem.saveToSlot(${i})" class="slot-btn save">Save</button>
                            <button onclick="saveSystem.deleteSlot(${i})" class="slot-btn delete">Delete</button>
                        </div>
                    </div>
                `;
            } else {
                html += `
                    <div class="save-slot empty">
                        <div class="slot-info">
                            <h5>Slot ${i}</h5>
                            <p>Empty</p>
                        </div>
                        <div class="slot-actions">
                            <button onclick="saveSystem.saveToSlot(${i})" class="slot-btn save">Save Here</button>
                        </div>
                    </div>
                `;
            }
        }
        
        return html;
    }

    saveGame() {
        const saveData = {
            timestamp: Date.now(),
            version: '1.0',
            gameState: {
                currentScenario: this.game.currentScenario,
                typeScores: this.game.typeScores,
                playerStats: this.game.playerStats,
                inventory: this.game.inventory,
                achievements: this.game.achievements?.unlockedAchievements || [],
                difficulty: this.game.difficulty,
                avatar: this.getAvatarData()
            },
            progress: Math.round(((this.game.currentScenario + 1) / (this.game.totalScenarios || 12)) * 100),
            currentType: this.getCurrentLeadingType()
        };

        localStorage.setItem(this.saveKey, JSON.stringify(saveData));
        this.showNotification('Game saved! 💾');
        
        return saveData;
    }

    loadGameState() {
        const saveData = localStorage.getItem(this.saveKey);
        
        if (saveData) {
            try {
                const data = JSON.parse(saveData);
                this.restoreGameState(data.gameState);
                this.showNotification('Previous game loaded! 🎮');
                return true;
            } catch (error) {
                console.error('Failed to load save data:', error);
                return false;
            }
        }
        
        return false;
    }

    restoreGameState(gameState) {
        if (!gameState) return;

        // Restore game progress
        this.game.currentScenario = gameState.currentScenario || 0;
        this.game.typeScores = gameState.typeScores || {};
        this.game.playerStats = gameState.playerStats || { level: 1, wisdom: 0, courage: 0, compassion: 0 };
        this.game.inventory = gameState.inventory || [];
        this.game.difficulty = gameState.difficulty || 'normal';

        // Restore achievements
        if (this.game.achievements && gameState.achievements) {
            this.game.achievements.unlockedAchievements = gameState.achievements;
        }

        // Restore avatar
        if (gameState.avatar) {
            this.restoreAvatarData(gameState.avatar);
        }

        // Update UI
        this.game.updateHUD();
    }

    saveToSlot(slotNumber) {
        const saveData = this.saveGame();
        const allSaves = this.getAllSaves();
        allSaves[`slot${slotNumber}`] = saveData;
        
        localStorage.setItem('enneagram-saves', JSON.stringify(allSaves));
        this.showNotification(`Saved to slot ${slotNumber}! 💾`);
        
        // Refresh the save menu
        document.querySelector('.save-modal')?.remove();
        this.showSaveMenu();
    }

    loadSlot(slotNumber) {
        const allSaves = this.getAllSaves();
        const saveData = allSaves[`slot${slotNumber}`];
        
        if (saveData && saveData.gameState) {
            this.restoreGameState(saveData.gameState);
            this.showNotification(`Loaded from slot ${slotNumber}! 🎮`);
            document.querySelector('.save-modal')?.remove();
        }
    }

    deleteSlot(slotNumber) {
        if (confirm(`Delete save slot ${slotNumber}?`)) {
            const allSaves = this.getAllSaves();
            delete allSaves[`slot${slotNumber}`];
            
            localStorage.setItem('enneagram-saves', JSON.stringify(allSaves));
            this.showNotification(`Slot ${slotNumber} deleted! 🗑️`);
            
            // Refresh the save menu
            document.querySelector('.save-modal')?.remove();
            this.showSaveMenu();
        }
    }

    getAllSaves() {
        const saves = localStorage.getItem('enneagram-saves');
        return saves ? JSON.parse(saves) : {};
    }

    exportSave() {
        const saveData = this.saveGame();
        const dataStr = JSON.stringify(saveData, null, 2);
        const dataBlob = new Blob([dataStr], { type: 'application/json' });
        
        const link = document.createElement('a');
        link.href = URL.createObjectURL(dataBlob);
        link.download = `enneagram-quest-save-${new Date().toISOString().split('T')[0]}.json`;
        link.click();
        
        this.showNotification('Save exported! 📤');
    }

    importSave() {
        const input = document.createElement('input');
        input.type = 'file';
        input.accept = '.json';
        
        input.onchange = (e) => {
            const file = e.target.files[0];
            if (file) {
                const reader = new FileReader();
                reader.onload = (e) => {
                    try {
                        const saveData = JSON.parse(e.target.result);
                        this.restoreGameState(saveData.gameState);
                        this.showNotification('Save imported! 📥');
                        document.querySelector('.save-modal')?.remove();
                    } catch (error) {
                        this.showNotification('Invalid save file! ❌', 'error');
                    }
                };
                reader.readAsText(file);
            }
        };
        
        input.click();
    }



    setupCloudSync() {
        // Basic cloud sync using localStorage backup
        // In a real implementation, this would sync with a cloud service
        
        setInterval(() => {
            this.backupToCloud();
        }, 300000); // Every 5 minutes
    }

    backupToCloud() {
        const saveData = localStorage.getItem(this.saveKey);
        if (saveData) {
            // Store backup with timestamp
            const backupKey = `${this.saveKey}-backup-${Date.now()}`;
            localStorage.setItem(backupKey, saveData);
            
            // Keep only last 5 backups
            this.cleanupBackups();
        }
    }

    cleanupBackups() {
        const keys = Object.keys(localStorage);
        const backupKeys = keys.filter(key => key.startsWith(`${this.saveKey}-backup-`))
                              .sort()
                              .reverse();
        
        // Remove old backups, keep only 5 most recent
        backupKeys.slice(5).forEach(key => {
            localStorage.removeItem(key);
        });
    }

    getAvatarData() {
        // Get current avatar configuration
        return {
            class: localStorage.getItem('fantasy-avatar') || 'mage',
            // Add other avatar properties as needed
        };
    }

    restoreAvatarData(avatarData) {
        if (avatarData.class) {
            localStorage.setItem('fantasy-avatar', JSON.stringify({ class: avatarData.class, color: 'blue' }));
        }
    }

    getCurrentLeadingType() {
        const scores = this.game.typeScores;
        if (!scores || Object.keys(scores).length === 0) return null;
        
        const topType = Object.entries(scores).reduce((a, b) => scores[a[0]] > scores[b[0]] ? a : b)[0];
        return enneagramTypes[topType]?.title || null;
    }

    getLastSaveTime() {
        const saveData = localStorage.getItem(this.saveKey);
        if (saveData) {
            try {
                const data = JSON.parse(saveData);
                return new Date(data.timestamp).toLocaleString();
            } catch (error) {
                return 'Never';
            }
        }
        return 'Never';
    }

    showNotification(message, type = 'success') {
        const notification = document.createElement('div');
        notification.className = `save-notification ${type}`;
        notification.textContent = message;
        notification.style.cssText = `
            position: fixed;
            top: 20px;
            right: 20px;
            background: ${type === 'error' ? '#e74c3c' : '#27ae60'};
            color: white;
            padding: 1rem 1.5rem;
            border-radius: 8px;
            z-index: 1001;
            animation: slideInRight 0.3s ease, slideOutRight 0.3s ease 2.5s forwards;
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

// Initialize save system
document.addEventListener('DOMContentLoaded', () => {
    const initSaveSystem = () => {
        if (window.game) {
            new SaveSystem(window.game);
            console.log('💾 Enhanced save system loaded');
        } else {
            setTimeout(initSaveSystem, 100);
        }
    };
    initSaveSystem();
});
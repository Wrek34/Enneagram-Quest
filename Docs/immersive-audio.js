// Immersive audio system for enhanced experience
class ImmersiveAudioSystem {
    constructor(game) {
        this.game = game;
        this.audioContext = null;
        this.masterGain = null;
        this.currentAmbience = null;
        this.soundEffects = {};
        this.musicTracks = {};
        
        this.initializeAudioSystem();
    }

    initializeAudioSystem() {
        try {
            this.audioContext = new (window.AudioContext || window.webkitAudioContext)();
            this.masterGain = this.audioContext.createGain();
            this.masterGain.connect(this.audioContext.destination);
            // Load saved volume or default to 0.3
        const savedVolume = localStorage.getItem('enneagram-volume');
        const initialVolume = savedVolume ? parseFloat(savedVolume) : 0.3;
        this.masterGain.gain.setValueAtTime(initialVolume, this.audioContext.currentTime);
            
            this.createSoundLibrary();
            this.setupAudioEvents();
            
            console.log('🎵 Immersive audio system initialized');
        } catch (error) {
            console.warn('⚠️ Audio system not supported:', error);
        }
    }

    createSoundLibrary() {
        // Ambient soundscapes for different moods
        this.ambientTracks = {
            mystical: () => this.createMysticalAmbience(),
            forest: () => this.createForestAmbience(),
            temple: () => this.createTempleAmbience(),
            victory: () => this.createVictoryMusic(),
            contemplative: () => this.createContemplativeAmbience()
        };

        // UI sound effects
        this.uiSounds = {
            hover: () => this.createUISound(300, 0.1, 'sine', 0.05),
            click: () => this.createUISound([400, 600], 0.15, 'square', 0.08),
            success: () => this.createUISound([523, 659, 784], 0.4, 'triangle', 0.1),
            levelUp: () => this.createUISound([392, 523, 659, 784, 1047], 0.8, 'sawtooth', 0.12),
            achievement: () => this.createUISound([659, 784, 988, 1175], 0.6, 'sine', 0.1),
            transition: () => this.createUISound([200, 400], 0.3, 'sine', 0.06)
        };

        // Personality-based musical themes
        this.personalityThemes = {
            1: () => this.createOrderlyTheme(),
            2: () => this.createWarmTheme(),
            3: () => this.createTriumphantTheme(),
            4: () => this.createMelancholicTheme(),
            5: () => this.createMinimalistTheme(),
            6: () => this.createStableTheme(),
            7: () => this.createPlayfulTheme(),
            8: () => this.createPowerfulTheme(),
            9: () => this.createPeacefulTheme()
        };
    }

    createMysticalAmbience() {
        if (!this.audioContext) return;

        const oscillators = [];
        const frequencies = [55, 82.4, 110, 164.8]; // A1, E2, A2, E3

        frequencies.forEach((freq, index) => {
            const osc = this.audioContext.createOscillator();
            const gain = this.audioContext.createGain();
            const filter = this.audioContext.createBiquadFilter();

            osc.connect(filter);
            filter.connect(gain);
            gain.connect(this.masterGain);

            osc.frequency.setValueAtTime(freq, this.audioContext.currentTime);
            osc.type = 'sine';
            
            filter.type = 'lowpass';
            filter.frequency.setValueAtTime(800 + index * 200, this.audioContext.currentTime);
            
            gain.gain.setValueAtTime(0, this.audioContext.currentTime);
            gain.gain.linearRampToValueAtTime(0.02 + index * 0.005, this.audioContext.currentTime + 2);

            // Add subtle vibrato
            const lfo = this.audioContext.createOscillator();
            const lfoGain = this.audioContext.createGain();
            lfo.connect(lfoGain);
            lfoGain.connect(osc.frequency);
            lfo.frequency.setValueAtTime(0.1 + index * 0.05, this.audioContext.currentTime);
            lfoGain.gain.setValueAtTime(1, this.audioContext.currentTime);

            osc.start();
            lfo.start();
            
            oscillators.push({ osc, lfo, gain });
        });

        return oscillators;
    }

    createForestAmbience() {
        if (!this.audioContext) return;

        // Create wind sound with filtered noise
        const bufferSize = this.audioContext.sampleRate * 2;
        const buffer = this.audioContext.createBuffer(1, bufferSize, this.audioContext.sampleRate);
        const data = buffer.getChannelData(0);

        // Generate pink noise
        for (let i = 0; i < bufferSize; i++) {
            data[i] = (Math.random() * 2 - 1) * 0.1;
        }

        const source = this.audioContext.createBufferSource();
        const filter = this.audioContext.createBiquadFilter();
        const gain = this.audioContext.createGain();

        source.buffer = buffer;
        source.loop = true;
        
        source.connect(filter);
        filter.connect(gain);
        gain.connect(this.masterGain);

        filter.type = 'bandpass';
        filter.frequency.setValueAtTime(200, this.audioContext.currentTime);
        filter.Q.setValueAtTime(0.5, this.audioContext.currentTime);
        
        gain.gain.setValueAtTime(0.03, this.audioContext.currentTime);

        source.start();
        
        return [{ source, gain }];
    }

    createTempleAmbience() {
        if (!this.audioContext) return;

        // Create reverberant drone
        const osc = this.audioContext.createOscillator();
        const gain = this.audioContext.createGain();
        const delay = this.audioContext.createDelay();
        const feedback = this.audioContext.createGain();
        const filter = this.audioContext.createBiquadFilter();

        osc.connect(gain);
        gain.connect(delay);
        delay.connect(feedback);
        feedback.connect(delay);
        delay.connect(filter);
        filter.connect(this.masterGain);

        osc.frequency.setValueAtTime(73.4, this.audioContext.currentTime); // D2
        osc.type = 'sine';
        
        delay.delayTime.setValueAtTime(0.3, this.audioContext.currentTime);
        feedback.gain.setValueAtTime(0.4, this.audioContext.currentTime);
        
        filter.type = 'lowpass';
        filter.frequency.setValueAtTime(400, this.audioContext.currentTime);
        
        gain.gain.setValueAtTime(0.04, this.audioContext.currentTime);

        osc.start();
        
        return [{ osc, gain }];
    }

    createUISound(frequencies, duration, waveType, volume) {
        if (!this.audioContext || !this.game.soundEnabled) return;

        const freqArray = Array.isArray(frequencies) ? frequencies : [frequencies];
        
        freqArray.forEach((freq, index) => {
            setTimeout(() => {
                const osc = this.audioContext.createOscillator();
                const gain = this.audioContext.createGain();
                
                osc.connect(gain);
                gain.connect(this.masterGain);
                
                osc.frequency.setValueAtTime(freq, this.audioContext.currentTime);
                osc.type = waveType;
                
                gain.gain.setValueAtTime(volume, this.audioContext.currentTime);
                gain.gain.exponentialRampToValueAtTime(0.001, this.audioContext.currentTime + duration);
                
                osc.start();
                osc.stop(this.audioContext.currentTime + duration);
            }, index * 100);
        });
    }

    createPersonalityTheme(type) {
        const themeCreator = this.personalityThemes[type];
        if (themeCreator) {
            return themeCreator();
        }
    }

    createOrderlyTheme() {
        // Type 1 - Structured, precise melody
        const notes = [261.6, 293.7, 329.6, 349.2]; // C4, D4, E4, F4
        this.playMelody(notes, 0.5, 'square', 0.06);
    }

    createWarmTheme() {
        // Type 2 - Warm, embracing harmonies
        const notes = [329.6, 392.0, 493.9]; // E4, G4, B4
        this.playChord(notes, 1.0, 'sine', 0.05);
    }

    createTriumphantTheme() {
        // Type 3 - Ascending, victorious progression
        const notes = [261.6, 329.6, 392.0, 523.3]; // C4, E4, G4, C5
        this.playMelody(notes, 0.3, 'sawtooth', 0.08);
    }

    createMelancholicTheme() {
        // Type 4 - Minor, expressive melody
        const notes = [293.7, 349.2, 415.3, 466.2]; // D4, F4, G#4, A#4
        this.playMelody(notes, 0.8, 'sine', 0.04);
    }

    createMinimalistTheme() {
        // Type 5 - Sparse, contemplative
        const notes = [220.0, 440.0]; // A3, A4
        this.playMelody(notes, 1.0, 'sine', 0.03);
    }

    createStableTheme() {
        // Type 6 - Steady, reliable rhythm
        const notes = [196.0, 246.9, 293.7]; // G3, B3, D4
        this.playChord(notes, 1.2, 'triangle', 0.05);
    }

    createPlayfulTheme() {
        // Type 7 - Bouncy, energetic melody
        const notes = [523.3, 587.3, 659.3, 698.5, 784.0]; // C5, D5, E5, F5, G5
        this.playMelody(notes, 0.2, 'square', 0.07);
    }

    createPowerfulTheme() {
        // Type 8 - Strong, commanding chords
        const notes = [130.8, 164.8, 196.0]; // C3, E3, G3
        this.playChord(notes, 1.5, 'sawtooth', 0.08);
    }

    createPeacefulTheme() {
        // Type 9 - Gentle, flowing melody
        const notes = [392.0, 440.0, 493.9, 523.3]; // G4, A4, B4, C5
        this.playMelody(notes, 0.6, 'sine', 0.04);
    }

    playMelody(notes, noteDuration, waveType, volume) {
        if (!this.audioContext) return;

        notes.forEach((freq, index) => {
            setTimeout(() => {
                const osc = this.audioContext.createOscillator();
                const gain = this.audioContext.createGain();
                
                osc.connect(gain);
                gain.connect(this.masterGain);
                
                osc.frequency.setValueAtTime(freq, this.audioContext.currentTime);
                osc.type = waveType;
                
                gain.gain.setValueAtTime(volume, this.audioContext.currentTime);
                gain.gain.exponentialRampToValueAtTime(0.001, this.audioContext.currentTime + noteDuration);
                
                osc.start();
                osc.stop(this.audioContext.currentTime + noteDuration);
            }, index * noteDuration * 1000);
        });
    }

    playChord(notes, duration, waveType, volume) {
        if (!this.audioContext) return;

        notes.forEach(freq => {
            const osc = this.audioContext.createOscillator();
            const gain = this.audioContext.createGain();
            
            osc.connect(gain);
            gain.connect(this.masterGain);
            
            osc.frequency.setValueAtTime(freq, this.audioContext.currentTime);
            osc.type = waveType;
            
            gain.gain.setValueAtTime(volume, this.audioContext.currentTime);
            gain.gain.exponentialRampToValueAtTime(0.001, this.audioContext.currentTime + duration);
            
            osc.start();
            osc.stop(this.audioContext.currentTime + duration);
        });
    }

    setupAudioEvents() {
        // Enhanced UI sounds
        document.addEventListener('mouseover', (e) => {
            if (e.target.classList.contains('choice') || e.target.classList.contains('hud-btn')) {
                this.uiSounds.hover();
            }
        });

        // Override game sound methods
        if (this.game.sounds) {
            this.game.sounds.select = () => this.uiSounds.click();
            this.game.sounds.levelUp = () => this.uiSounds.levelUp();
            this.game.sounds.correct = () => this.uiSounds.success();
        }

        // Play ambient music based on game state
        const originalStartGame = this.game.startGame.bind(this.game);
        this.game.startGame = () => {
            originalStartGame();
            this.startAmbientMusic('temple');
        };

        const originalShowResults = this.game.showResults.bind(this.game);
        this.game.showResults = () => {
            originalShowResults();
            this.stopAmbientMusic();
            
            setTimeout(() => {
                const dominantType = this.game.calculateDominantType();
                this.createPersonalityTheme(dominantType);
            }, 1000);
        };
    }

    startAmbientMusic(type) {
        this.stopAmbientMusic();
        
        const creator = this.ambientTracks[type];
        if (creator && this.game.soundEnabled) {
            this.currentAmbience = creator();
        }
    }

    stopAmbientMusic() {
        if (this.currentAmbience) {
            this.currentAmbience.forEach(({ osc, lfo, gain, source }) => {
                try {
                    if (gain) {
                        gain.gain.exponentialRampToValueAtTime(0.001, this.audioContext.currentTime + 1);
                    }
                    if (osc) {
                        setTimeout(() => osc.stop(), 1000);
                    }
                    if (lfo) {
                        setTimeout(() => lfo.stop(), 1000);
                    }
                    if (source) {
                        setTimeout(() => source.stop(), 1000);
                    }
                } catch (error) {
                    console.warn('Audio cleanup warning:', error);
                }
            });
            this.currentAmbience = null;
        }
    }

    setMasterVolume(volume) {
        if (this.masterGain) {
            this.masterGain.gain.setValueAtTime(volume, this.audioContext.currentTime);
        }
        // Store volume preference
        localStorage.setItem('enneagram-volume', volume.toString());
    }

    // Add volume control to HUD
    addVolumeControl() {
        // Remove any existing volume controls
        document.querySelectorAll('.volume-control').forEach(control => control.remove());
        
        const volumeControl = document.createElement('div');
        volumeControl.className = 'volume-control';
        volumeControl.innerHTML = `
            <label for="volume-slider">🔊</label>
            <input type="range" id="volume-slider" min="0" max="100" value="30">
        `;

        const hudSection = document.querySelector('.hud-section:last-child');
        if (hudSection) {
            hudSection.appendChild(volumeControl);
        }

        const slider = document.getElementById('volume-slider');
        if (slider) {
            slider.addEventListener('input', (e) => {
                const volume = e.target.value / 100;
                this.setMasterVolume(volume);
                // Also update game sound setting
                if (window.game) {
                    window.game.soundEnabled = volume > 0;
                }
            });
        }
    }
}

// Initialize immersive audio when game is ready
document.addEventListener('DOMContentLoaded', () => {
    const initAudio = () => {
        if (window.game) {
            const audioSystem = new ImmersiveAudioSystem(window.game);
            audioSystem.addVolumeControl();
            window.audioSystem = audioSystem;
            console.log('🎵 Immersive audio system loaded');
        } else {
            setTimeout(initAudio, 100);
        }
    };
    initAudio();
});
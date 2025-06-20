// Enneagram Tritype System
class TritypeSystem {
    constructor(game) {
        this.game = game;
        this.initializeTritypeSystem();
    }

    initializeTritypeSystem() {
        this.setupTritypeCalculation();
        this.addTritypeDescriptions();
    }

    calculateTritype(typeScores) {
        // Get top 3 types from different centers
        const bodyTypes = [8, 9, 1]; // Gut/Body center
        const heartTypes = [2, 3, 4]; // Heart/Feeling center
        const headTypes = [5, 6, 7]; // Head/Thinking center

        const getTopFromCenter = (centerTypes) => {
            return centerTypes.reduce((top, type) => 
                (typeScores[type] || 0) > (typeScores[top] || 0) ? type : top
            );
        };

        const bodyType = getTopFromCenter(bodyTypes);
        const heartType = getTopFromCenter(heartTypes);
        const headType = getTopFromCenter(headTypes);

        // Order by score (highest first)
        const tritypeArray = [
            { type: bodyType, score: typeScores[bodyType] || 0 },
            { type: heartType, score: typeScores[heartType] || 0 },
            { type: headType, score: typeScores[headType] || 0 }
        ].sort((a, b) => b.score - a.score);

        const tritype = tritypeArray.map(t => t.type).join('');
        
        return {
            tritype: tritype,
            dominantType: tritypeArray[0].type,
            bodyType: bodyType,
            heartType: heartType,
            headType: headType,
            scores: tritypeArray
        };
    }

    getTritypeDescription(tritype) {
        const tritypeDescriptions = {
            // The Achiever Tritypes
            '125': {
                name: 'The Mentor',
                description: 'You are diligent, caring, and knowledgeable. You want to be good, loving, and wise.',
                focus: 'Teaching and guiding others with wisdom and care',
                strengths: ['Principled teaching', 'Caring guidance', 'Systematic knowledge'],
                challenges: ['Perfectionist helping', 'Overwhelming others with advice']
            },
            '126': {
                name: 'The Supporter',
                description: 'You are caring, responsible, and warm. You want to be good, loving, and secure.',
                focus: 'Supporting others while maintaining high standards',
                strengths: ['Loyal service', 'Responsible care', 'Reliable support'],
                challenges: ['Anxious helping', 'Rigid loyalty']
            },
            '127': {
                name: 'The Teacher',
                description: 'You are caring, enthusiastic, and principled. You want to be good, loving, and happy.',
                focus: 'Inspiring others through positive, principled action',
                strengths: ['Inspiring teaching', 'Optimistic guidance', 'Principled enthusiasm'],
                challenges: ['Avoiding difficult truths', 'Impatient with slow learners']
            },
            '135': {
                name: 'The Technical Expert',
                description: 'You are knowledgeable, efficient, and systematic. You want to be good, wise, and competent.',
                focus: 'Mastering systems and sharing expertise',
                strengths: ['Technical mastery', 'Systematic thinking', 'Precise knowledge'],
                challenges: ['Perfectionist analysis', 'Impatience with incompetence']
            },
            '136': {
                name: 'The Taskmaster',
                description: 'You are responsible, efficient, and security-oriented. You want to be good, right, and secure.',
                focus: 'Creating order and security through systematic work',
                strengths: ['Organized leadership', 'Reliable systems', 'Security-focused'],
                challenges: ['Rigid control', 'Anxious perfectionism']
            },
            '137': {
                name: 'The Systems Builder',
                description: 'You are systematic, optimistic, and efficient. You want to be good, right, and satisfied.',
                focus: 'Building efficient systems that work for everyone',
                strengths: ['Optimistic planning', 'Efficient systems', 'Positive leadership'],
                challenges: ['Avoiding system flaws', 'Impatience with inefficiency']
            },
            '145': {
                name: 'The Researcher',
                description: 'You are intuitive, investigative, and creative. You want to be original, wise, and authentic.',
                focus: 'Deep research into meaningful subjects',
                strengths: ['Original insights', 'Deep investigation', 'Authentic knowledge'],
                challenges: ['Isolated research', 'Perfectionist creativity']
            },
            '146': {
                name: 'The Philosopher',
                description: 'You are intuitive, thoughtful, and questioning. You want to be original, secure, and authentic.',
                focus: 'Exploring deep questions about life and meaning',
                strengths: ['Thoughtful questioning', 'Authentic exploration', 'Loyal to truth'],
                challenges: ['Anxious authenticity', 'Pessimistic questioning']
            },
            '147': {
                name: 'The Visionary',
                description: 'You are creative, enthusiastic, and intuitive. You want to be original, happy, and authentic.',
                focus: 'Creating inspiring visions of possibility',
                strengths: ['Creative vision', 'Inspiring enthusiasm', 'Authentic innovation'],
                challenges: ['Scattered creativity', 'Avoiding mundane details']
            },
            '258': {
                name: 'The Rescuer',
                description: 'You are caring, protective, and generous. You want to be loving, powerful, and helpful.',
                focus: 'Protecting and caring for those in need',
                strengths: ['Protective care', 'Generous strength', 'Powerful helping'],
                challenges: ['Controlling care', 'Aggressive helping']
            },
            '259': {
                name: 'The Peacemaker',
                description: 'You are caring, peaceful, and supportive. You want to be loving, harmonious, and helpful.',
                focus: 'Creating harmony while caring for others',
                strengths: ['Peaceful support', 'Harmonious care', 'Gentle helping'],
                challenges: ['Avoiding conflict while helping', 'Passive-aggressive care']
            },
            '268': {
                name: 'The Rescuer',
                description: 'You are helpful, protective, and responsible. You want to be loving, secure, and powerful.',
                focus: 'Protecting others through loyal service',
                strengths: ['Loyal protection', 'Responsible care', 'Secure helping'],
                challenges: ['Anxious protection', 'Controlling loyalty']
            },
            '269': {
                name: 'The Good Samaritan',
                description: 'You are helpful, peaceful, and responsible. You want to be loving, secure, and harmonious.',
                focus: 'Helping others while maintaining peace and security',
                strengths: ['Peaceful helping', 'Secure support', 'Harmonious care'],
                challenges: ['Avoiding conflict', 'Anxious peace-keeping']
            },
            '278': {
                name: 'The Free Spirit',
                description: 'You are enthusiastic, caring, and assertive. You want to be happy, loving, and powerful.',
                focus: 'Bringing joy and energy to help others',
                strengths: ['Energetic helping', 'Joyful leadership', 'Powerful enthusiasm'],
                challenges: ['Overwhelming others', 'Avoiding pain in helping']
            },
            '279': {
                name: 'The Peacemaker',
                description: 'You are optimistic, caring, and easygoing. You want to be happy, loving, and peaceful.',
                focus: 'Creating positive, harmonious environments',
                strengths: ['Optimistic peace', 'Caring harmony', 'Joyful support'],
                challenges: ['Avoiding difficult emotions', 'Superficial positivity']
            },
            '358': {
                name: 'The Solution Master',
                description: 'You are ambitious, efficient, and powerful. You want to be successful, competent, and strong.',
                focus: 'Achieving success through competent action',
                strengths: ['Efficient achievement', 'Competent leadership', 'Powerful success'],
                challenges: ['Ruthless efficiency', 'Image over substance']
            },
            '359': {
                name: 'The Ambassador',
                description: 'You are adaptable, efficient, and peaceful. You want to be successful, competent, and harmonious.',
                focus: 'Achieving success while maintaining harmony',
                strengths: ['Diplomatic success', 'Harmonious achievement', 'Peaceful efficiency'],
                challenges: ['Avoiding conflict for success', 'Image management']
            },
            '368': {
                name: 'The Justice Fighter',
                description: 'You are ambitious, responsible, and powerful. You want to be successful, secure, and strong.',
                focus: 'Fighting for justice and security through achievement',
                strengths: ['Powerful advocacy', 'Secure success', 'Responsible leadership'],
                challenges: ['Aggressive justice', 'Controlling success']
            },
            '369': {
                name: 'The Mediator',
                description: 'You are adaptable, responsible, and peaceful. You want to be successful, secure, and harmonious.',
                focus: 'Mediating conflicts while achieving goals',
                strengths: ['Diplomatic achievement', 'Peaceful success', 'Harmonious leadership'],
                challenges: ['Avoiding difficult decisions', 'People-pleasing success']
            },
            '378': {
                name: 'The Mover Shaker',
                description: 'You are enthusiastic, ambitious, and powerful. You want to be happy, successful, and strong.',
                focus: 'Creating dynamic change and exciting achievements',
                strengths: ['Dynamic leadership', 'Exciting success', 'Powerful enthusiasm'],
                challenges: ['Overwhelming others', 'Impatient achievement']
            },
            '379': {
                name: 'The Ambassador',
                description: 'You are optimistic, adaptable, and peaceful. You want to be happy, successful, and harmonious.',
                focus: 'Creating positive outcomes for everyone',
                strengths: ['Optimistic diplomacy', 'Harmonious success', 'Peaceful achievement'],
                challenges: ['Avoiding conflict', 'Superficial harmony']
            },
            '458': {
                name: 'The Scholar',
                description: 'You are creative, investigative, and intense. You want to be original, wise, and powerful.',
                focus: 'Deep, original research with powerful insights',
                strengths: ['Original investigation', 'Powerful creativity', 'Intense wisdom'],
                challenges: ['Isolated intensity', 'Overwhelming others with depth']
            },
            '459': {
                name: 'The Contemplative',
                description: 'You are creative, investigative, and peaceful. You want to be original, wise, and harmonious.',
                focus: 'Contemplating life\\'s deeper meanings in peace',
                strengths: ['Peaceful creativity', 'Harmonious wisdom', 'Gentle originality'],
                challenges: ['Avoiding action', 'Withdrawn contemplation']
            },
            '468': {
                name: 'The Truth Teller',
                description: 'You are creative, responsible, and intense. You want to be original, secure, and powerful.',
                focus: 'Speaking difficult truths with authentic power',
                strengths: ['Authentic truth-telling', 'Powerful originality', 'Secure creativity'],
                challenges: ['Harsh truth-telling', 'Anxious authenticity']
            },
            '469': {
                name: 'The Seeker',
                description: 'You are creative, questioning, and peaceful. You want to be original, secure, and harmonious.',
                focus: 'Seeking authentic meaning while maintaining inner peace',
                strengths: ['Peaceful seeking', 'Harmonious authenticity', 'Gentle questioning'],
                challenges: ['Avoiding commitment', 'Melancholic peace']
            },
            '478': {
                name: 'The Messenger',
                description: 'You are creative, enthusiastic, and powerful. You want to be original, happy, and strong.',
                focus: 'Sharing creative visions with powerful enthusiasm',
                strengths: ['Powerful creativity', 'Enthusiastic originality', 'Strong vision'],
                challenges: ['Overwhelming creativity', 'Impatient with others']
            },
            '479': {
                name: 'The Gentle Spirit',
                description: 'You are creative, optimistic, and peaceful. You want to be original, happy, and harmonious.',
                focus: 'Creating beauty and harmony in the world',
                strengths: ['Gentle creativity', 'Harmonious optimism', 'Peaceful originality'],
                challenges: ['Avoiding difficult realities', 'Scattered creativity']
            }
        };

        return tritypeDescriptions[tritype] || {
            name: 'The Unique Individual',
            description: 'You have a unique combination of motivations and approaches.',
            focus: 'Integrating different aspects of your personality',
            strengths: ['Multifaceted perspective', 'Balanced approach'],
            challenges: ['Internal conflicts', 'Complex motivations']
        };
    }

    addTritypeToResults(dominantType, wingInfo, typeScores) {
        const tritypeInfo = this.calculateTritype(typeScores);
        const tritypeDescription = this.getTritypeDescription(tritypeInfo.tritype);

        return {
            tritype: tritypeInfo.tritype,
            tritypeName: tritypeDescription.name,
            tritypeDescription: tritypeDescription,
            bodyType: tritypeInfo.bodyType,
            heartType: tritypeInfo.heartType,
            headType: tritypeInfo.headType,
            dominantCenter: this.getDominantCenter(dominantType)
        };
    }

    getDominantCenter(type) {
        if ([8, 9, 1].includes(type)) return 'Body/Gut';
        if ([2, 3, 4].includes(type)) return 'Heart/Feeling';
        if ([5, 6, 7].includes(type)) return 'Head/Thinking';
        return 'Unknown';
    }

    setupTritypeCalculation() {
        // Override the enhanced results to include tritype
        const originalGetInDepthTypeAnalysis = this.game.wingsSystem?.getInDepthTypeAnalysis;
        if (originalGetInDepthTypeAnalysis) {
            this.game.wingsSystem.getInDepthTypeAnalysis = (dominantType, wingInfo, typeScores) => {
                const baseAnalysis = originalGetInDepthTypeAnalysis.call(this.game.wingsSystem, dominantType, wingInfo, typeScores);
                const tritypeInfo = this.addTritypeToResults(dominantType, wingInfo, typeScores);
                
                return {
                    ...baseAnalysis,
                    tritypeInfo: tritypeInfo
                };
            };
        }
    }

    addTritypeDescriptions() {
        // This will be called when displaying results
        const originalDisplayEnhancedResults = this.game.wingsSystem?.displayEnhancedResults;
        if (originalDisplayEnhancedResults) {
            this.game.wingsSystem.displayEnhancedResults = (dominantType, analysis) => {
                originalDisplayEnhancedResults.call(this.game.wingsSystem, dominantType, analysis);
                
                if (analysis.tritypeInfo) {
                    setTimeout(() => {
                        this.displayTritypeSection(analysis.tritypeInfo);
                    }, 500);
                }
            };
        }
    }

    displayTritypeSection(tritypeInfo) {
        const resultContent = document.getElementById('result-content');
        if (!resultContent) return;

        const tritypeSection = document.createElement('div');
        tritypeSection.className = 'tritype-analysis';
        tritypeSection.innerHTML = `
            <div class="tritype-header">
                <h4>🔺 Your Tritype: ${tritypeInfo.tritype} - ${tritypeInfo.tritypeName}</h4>
                <p class="tritype-intro">Your tritype represents your core motivations across all three centers of intelligence.</p>
            </div>
            
            <div class="tritype-description">
                <p><strong>Description:</strong> ${tritypeInfo.tritypeDescription.description}</p>
                <p><strong>Focus:</strong> ${tritypeInfo.tritypeDescription.focus}</p>
            </div>
            
            <div class="tritype-centers">
                <h5>🎯 Your Three Centers:</h5>
                <div class="centers-grid">
                    <div class="center-item body">
                        <span class="center-icon">💪</span>
                        <div class="center-info">
                            <h6>Body/Gut Center</h6>
                            <p>Type ${tritypeInfo.bodyType} - ${enneagramTypes[tritypeInfo.bodyType].title.split(' - ')[1]}</p>
                            <small>Instinct, anger, control</small>
                        </div>
                    </div>
                    <div class="center-item heart">
                        <span class="center-icon">❤️</span>
                        <div class="center-info">
                            <h6>Heart/Feeling Center</h6>
                            <p>Type ${tritypeInfo.heartType} - ${enneagramTypes[tritypeInfo.heartType].title.split(' - ')[1]}</p>
                            <small>Emotion, shame, image</small>
                        </div>
                    </div>
                    <div class="center-item head">
                        <span class="center-icon">🧠</span>
                        <div class="center-info">
                            <h6>Head/Thinking Center</h6>
                            <p>Type ${tritypeInfo.headType} - ${enneagramTypes[tritypeInfo.headType].title.split(' - ')[1]}</p>
                            <small>Thinking, fear, security</small>
                        </div>
                    </div>
                </div>
                <p class="dominant-center">Your dominant center is: <strong>${tritypeInfo.dominantCenter}</strong></p>
            </div>
            
            <div class="tritype-strengths-challenges">
                <div class="tritype-strengths">
                    <h6>💪 Tritype Strengths:</h6>
                    <ul>
                        ${tritypeInfo.tritypeDescription.strengths.map(strength => `<li>${strength}</li>`).join('')}
                    </ul>
                </div>
                <div class="tritype-challenges">
                    <h6>⚠️ Potential Challenges:</h6>
                    <ul>
                        ${tritypeInfo.tritypeDescription.challenges.map(challenge => `<li>${challenge}</li>`).join('')}
                    </ul>
                </div>
            </div>
        `;

        // Insert after wing analysis
        const wingAnalysis = document.querySelector('.wing-analysis');
        if (wingAnalysis) {
            wingAnalysis.parentNode.insertBefore(tritypeSection, wingAnalysis.nextSibling);
        } else {
            resultContent.appendChild(tritypeSection);
        }
    }
}

// Initialize tritype system
document.addEventListener('DOMContentLoaded', () => {
    const initTritype = () => {
        if (window.game && window.game.wingsSystem) {
            new TritypeSystem(window.game);
            console.log('🔺 Tritype system loaded');
        } else {
            setTimeout(initTritype, 200);
        }
    };
    initTritype();
});
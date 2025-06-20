// Enneagram Wings System
class EnneagramWingsSystem {
    constructor(game) {
        this.game = game;
        this.initializeWingsSystem();
    }

    initializeWingsSystem() {
        this.setupWingCalculation();
        this.addWingDescriptions();
    }

    calculateWings(dominantType, typeScores) {
        // Adjacent types for wing calculation
        const wingMap = {
            1: [9, 2], 2: [1, 3], 3: [2, 4], 4: [3, 5], 5: [4, 6],
            6: [5, 7], 7: [6, 8], 8: [7, 9], 9: [8, 1]
        };

        const possibleWings = wingMap[dominantType];
        const wing1Score = typeScores[possibleWings[0]] || 0;
        const wing2Score = typeScores[possibleWings[1]] || 0;

        // Determine dominant wing
        let dominantWing = null;
        let wingStrength = 'balanced';

        if (wing1Score > wing2Score && wing1Score > 0) {
            dominantWing = possibleWings[0];
            wingStrength = this.calculateWingStrength(wing1Score, wing2Score);
        } else if (wing2Score > wing1Score && wing2Score > 0) {
            dominantWing = possibleWings[1];
            wingStrength = this.calculateWingStrength(wing2Score, wing1Score);
        }

        return {
            dominantWing,
            wingStrength,
            wing1: { type: possibleWings[0], score: wing1Score },
            wing2: { type: possibleWings[1], score: wing2Score }
        };
    }

    calculateWingStrength(dominantScore, otherScore) {
        const difference = dominantScore - otherScore;
        if (difference >= 3) return 'strong';
        if (difference >= 2) return 'moderate';
        if (difference >= 1) return 'slight';
        return 'balanced';
    }

    getWingDescription(mainType, wing) {
        const wingDescriptions = {
            // Type 1 Wings
            '1w9': {
                title: 'The Idealist',
                description: 'You combine the perfectionist drive of Type 1 with the peaceful, harmonious nature of Type 9. You seek to improve the world while maintaining inner calm and avoiding conflict when possible.',
                traits: ['More patient and diplomatic', 'Seeks consensus', 'Less openly critical', 'Values harmony alongside perfection'],
                challenges: ['May suppress anger more', 'Can be indecisive', 'Might avoid necessary confrontations']
            },
            '1w2': {
                title: 'The Advocate',
                description: 'You blend the principled nature of Type 1 with the helpful, caring qualities of Type 2. You channel your perfectionist energy into serving others and making the world better for everyone.',
                traits: ['More people-focused', 'Warmer and more expressive', 'Motivated to help others improve', 'Strong sense of social justice'],
                challenges: ['May become preachy', 'Can be controlling in helping', 'Might neglect own needs']
            },

            // Type 2 Wings
            '2w1': {
                title: 'The Servant',
                description: 'You combine the caring nature of Type 2 with the principled drive of Type 1. You help others with a strong sense of what is right and proper, often becoming a moral guide.',
                traits: ['More structured in helping', 'Higher standards for self and others', 'Principled service', 'Less emotionally expressive'],
                challenges: ['Can be critical of those they help', 'May become rigid about "right" way to help', 'Prone to resentment']
            },
            '2w3': {
                title: 'The Host/Hostess',
                description: 'You blend the helpful nature of Type 2 with the ambitious, image-conscious qualities of Type 3. You excel at connecting with people and often become the social center of groups.',
                traits: ['More outgoing and charismatic', 'Success-oriented helping', 'Excellent social skills', 'Image-conscious about helping'],
                challenges: ['May help for recognition', 'Can be manipulative', 'Might lose authentic self']
            },

            // Type 3 Wings
            '3w2': {
                title: 'The Charmer',
                description: 'You combine the achievement drive of Type 3 with the interpersonal warmth of Type 2. You succeed through building relationships and inspiring others.',
                traits: ['More people-focused success', 'Charismatic and inspiring', 'Team-oriented achiever', 'Emotionally expressive'],
                challenges: ['May manipulate for success', 'Can lose sight of others\' needs', 'Might become overly dependent on others']
            },
            '3w4': {
                title: 'The Professional',
                description: 'You blend the success-oriented nature of Type 3 with the individualistic, creative qualities of Type 4. You achieve success while maintaining your unique identity.',
                traits: ['More creative and artistic', 'Unique approach to success', 'Emotionally deeper', 'Values authenticity in achievement'],
                challenges: ['May struggle with image vs. authenticity', 'Can be moody about success', 'Might become pretentious']
            },

            // Type 4 Wings
            '4w3': {
                title: 'The Aristocrat',
                description: 'You combine the individualistic nature of Type 4 with the ambitious drive of Type 3. You express your uniqueness through achievement and recognition.',
                traits: ['More ambitious and goal-oriented', 'Socially aware', 'Expressive and dramatic', 'Success-oriented creativity'],
                challenges: ['May become pretentious', 'Can be overly image-conscious', 'Might lose authentic self for success']
            },
            '4w5': {
                title: 'The Bohemian',
                description: 'You blend the emotional depth of Type 4 with the intellectual, withdrawn nature of Type 5. You are introspective, creative, and often unconventional.',
                traits: ['More withdrawn and private', 'Intellectually creative', 'Less emotionally expressive', 'Independent and unconventional'],
                challenges: ['May become too isolated', 'Can be overly intellectual about emotions', 'Might withdraw from relationships']
            },

            // Type 5 Wings
            '5w4': {
                title: 'The Iconoclast',
                description: 'You combine the investigative nature of Type 5 with the individualistic, creative qualities of Type 4. You are innovative, creative, and often unconventional in your thinking.',
                traits: ['More creative and artistic', 'Emotionally expressive', 'Unconventional thinking', 'Independent and original'],
                challenges: ['May become too eccentric', 'Can be moody and withdrawn', 'Might struggle with practical matters']
            },
            '5w6': {
                title: 'The Problem Solver',
                description: 'You blend the analytical nature of Type 5 with the loyal, security-oriented qualities of Type 6. You are practical, systematic, and reliable in your approach to knowledge.',
                traits: ['More practical and systematic', 'Team-oriented thinking', 'Security-conscious', 'Loyal to ideas and people'],
                challenges: ['May become overly cautious', 'Can be anxious about competence', 'Might become rigid in thinking']
            },

            // Type 6 Wings
            '6w5': {
                title: 'The Defender',
                description: 'You combine the loyal nature of Type 6 with the investigative, independent qualities of Type 5. You are thoughtful, systematic, and self-reliant in your loyalty.',
                traits: ['More independent and self-reliant', 'Analytical approach to security', 'Less emotionally expressive', 'Systematic and thorough'],
                challenges: ['May become overly suspicious', 'Can be too withdrawn', 'Might isolate when stressed']
            },
            '6w7': {
                title: 'The Buddy',
                description: 'You blend the loyal nature of Type 6 with the enthusiastic, optimistic qualities of Type 7. You are outgoing, friendly, and seek security through relationships and experiences.',
                traits: ['More outgoing and social', 'Optimistic about relationships', 'Seeks variety in security', 'Emotionally expressive'],
                challenges: ['May become scattered', 'Can avoid difficult emotions', 'Might become overly dependent on others']
            },

            // Type 7 Wings
            '7w6': {
                title: 'The Entertainer',
                description: 'You combine the enthusiastic nature of Type 7 with the loyal, responsible qualities of Type 6. You are outgoing, responsible, and seek fun through relationships and community.',
                traits: ['More responsible and loyal', 'Team-oriented fun', 'Security-conscious adventure', 'Relationship-focused'],
                challenges: ['May become anxious about fun', 'Can be scattered in commitments', 'Might avoid solitude']
            },
            '7w8': {
                title: 'The Realist',
                description: 'You blend the enthusiastic nature of Type 7 with the assertive, powerful qualities of Type 8. You are aggressive in pursuing experiences and opportunities.',
                traits: ['More assertive and direct', 'Leadership in adventure', 'Practical optimism', 'Less scattered, more focused'],
                challenges: ['May become too aggressive', 'Can be insensitive to others', 'Might become workaholic']
            },

            // Type 8 Wings
            '8w7': {
                title: 'The Maverick',
                description: 'You combine the powerful nature of Type 8 with the enthusiastic, adventurous qualities of Type 7. You are dynamic, charismatic, and seek power through exciting ventures.',
                traits: ['More outgoing and charismatic', 'Adventurous leadership', 'Optimistic about power', 'Quick decision-making'],
                challenges: ['May become too impulsive', 'Can be scattered in focus', 'Might avoid introspection']
            },
            '8w9': {
                title: 'The Bear',
                description: 'You blend the powerful nature of Type 8 with the peaceful, harmonious qualities of Type 9. You are steady, patient, and use your strength to protect and provide stability.',
                traits: ['More patient and steady', 'Protective rather than aggressive', 'Seeks harmony through strength', 'Less confrontational'],
                challenges: ['May become too passive', 'Can avoid necessary conflicts', 'Might suppress anger']
            },

            // Type 9 Wings
            '9w8': {
                title: 'The Referee',
                description: 'You combine the peaceful nature of Type 9 with the assertive, powerful qualities of Type 8. You are steady, practical, and can be surprisingly forceful when needed.',
                traits: ['More assertive and direct', 'Practical peacemaking', 'Leadership in harmony', 'Less avoidant of conflict'],
                challenges: ['May become too controlling', 'Can be stubborn', 'Might suppress others\' voices']
            },
            '9w1': {
                title: 'The Dreamer',
                description: 'You blend the peaceful nature of Type 9 with the principled, perfectionistic qualities of Type 1. You seek harmony through improvement and have strong ideals.',
                traits: ['More principled and idealistic', 'Structured approach to peace', 'Higher standards', 'More critical thinking'],
                challenges: ['May become too critical', 'Can be rigid about harmony', 'Might suppress anger']
            }
        };

        return wingDescriptions[`${mainType}w${wing}`] || null;
    }

    getInDepthTypeAnalysis(dominantType, wingInfo, typeScores) {
        const baseType = enneagramTypes[dominantType];
        const wingDescription = wingInfo.dominantWing ? 
            this.getWingDescription(dominantType, wingInfo.dominantWing) : null;

        return {
            baseType,
            wingDescription,
            wingInfo,
            detailedAnalysis: this.generateDetailedAnalysis(dominantType, wingInfo, typeScores),
            growthPath: this.getGrowthPath(dominantType, wingInfo.dominantWing),
            relationships: this.getRelationshipInsights(dominantType, wingInfo.dominantWing),
            careerInsights: this.getCareerInsights(dominantType, wingInfo.dominantWing)
        };
    }

    generateDetailedAnalysis(dominantType, wingInfo, typeScores) {
        const totalScore = Object.values(typeScores).reduce((sum, score) => sum + score, 0);
        const typePercentage = Math.round((typeScores[dominantType] / totalScore) * 100);
        
        const secondaryTypes = Object.entries(typeScores)
            .filter(([type, score]) => parseInt(type) !== dominantType && score > 0)
            .sort(([,a], [,b]) => b - a)
            .slice(0, 2);

        return {
            dominance: typePercentage,
            clarity: typePercentage > 40 ? 'high' : typePercentage > 25 ? 'moderate' : 'low',
            secondaryInfluences: secondaryTypes,
            wingBalance: wingInfo.wingStrength,
            complexity: this.calculateComplexity(typeScores)
        };
    }

    calculateComplexity(typeScores) {
        const nonZeroScores = Object.values(typeScores).filter(score => score > 0).length;
        if (nonZeroScores <= 3) return 'focused';
        if (nonZeroScores <= 5) return 'moderate';
        return 'complex';
    }

    getGrowthPath(mainType, wing) {
        const growthPaths = {
            1: { direction: 7, integration: 'Learn to be more spontaneous and joyful', stress: 4 },
            2: { direction: 4, integration: 'Develop self-awareness and authenticity', stress: 8 },
            3: { direction: 6, integration: 'Build genuine loyalty and commitment', stress: 9 },
            4: { direction: 1, integration: 'Develop discipline and objectivity', stress: 2 },
            5: { direction: 8, integration: 'Take confident action in the world', stress: 7 },
            6: { direction: 9, integration: 'Find inner calm and self-confidence', stress: 3 },
            7: { direction: 5, integration: 'Develop focus and depth', stress: 1 },
            8: { direction: 2, integration: 'Open your heart to others', stress: 5 },
            9: { direction: 3, integration: 'Take action and engage with life', stress: 6 }
        };

        return growthPaths[mainType];
    }

    getRelationshipInsights(mainType, wing) {
        // Simplified relationship insights based on type and wing
        const insights = {
            1: 'You value integrity and improvement in relationships. You may need to practice acceptance and flexibility.',
            2: 'You are naturally caring and supportive. Remember to express your own needs and boundaries.',
            3: 'You bring energy and motivation to relationships. Balance achievement with authentic connection.',
            4: 'You seek deep, meaningful connections. Practice stability and consistency in relationships.',
            5: 'You value independence and understanding. Work on emotional expression and engagement.',
            6: 'You are loyal and committed. Trust your own judgment while valuing others\' input.',
            7: 'You bring joy and adventure to relationships. Practice commitment and depth.',
            8: 'You are protective and strong. Balance power with vulnerability and gentleness.',
            9: 'You create harmony and acceptance. Practice assertiveness and expressing your needs.'
        };

        return insights[mainType];
    }

    getCareerInsights(mainType, wing) {
        const careerInsights = {
            1: ['Quality assurance', 'Teaching', 'Law', 'Medicine', 'Engineering', 'Editing'],
            2: ['Counseling', 'Healthcare', 'Social work', 'Teaching', 'Human resources', 'Ministry'],
            3: ['Sales', 'Marketing', 'Management', 'Entrepreneurship', 'Public relations', 'Entertainment'],
            4: ['Arts', 'Writing', 'Design', 'Psychology', 'Music', 'Film', 'Therapy'],
            5: ['Research', 'Technology', 'Science', 'Academia', 'Analysis', 'Engineering'],
            6: ['Security', 'Administration', 'Project management', 'Law enforcement', 'Insurance'],
            7: ['Travel', 'Entertainment', 'Marketing', 'Consulting', 'Event planning', 'Media'],
            8: ['Leadership', 'Entrepreneurship', 'Law', 'Politics', 'Construction', 'Military'],
            9: ['Mediation', 'Counseling', 'Administration', 'Healthcare', 'Education', 'Social services']
        };

        return careerInsights[mainType] || [];
    }

    setupWingCalculation() {
        // Override the game's showResults method to include wings
        const originalShowResults = this.game.showResults.bind(this.game);
        this.game.showResults = () => {
            const dominantType = this.game.calculateDominantType();
            const wingInfo = this.calculateWings(dominantType, this.game.typeScores);
            const inDepthAnalysis = this.getInDepthTypeAnalysis(dominantType, wingInfo, this.game.typeScores);
            
            // Call original results display
            originalShowResults();
            
            // Add enhanced results
            setTimeout(() => {
                this.displayEnhancedResults(dominantType, inDepthAnalysis);
            }, 500);
        };
    }

    displayEnhancedResults(dominantType, analysis) {
        const resultContent = document.getElementById('result-content');
        if (!resultContent) return;

        // Update main title with wing
        const typeTitle = document.getElementById('type-title');
        if (typeTitle && analysis.wingDescription) {
            const wingText = analysis.wingInfo.dominantWing ? 
                ` (${dominantType}w${analysis.wingInfo.dominantWing})` : '';
            typeTitle.textContent = analysis.baseType.title + wingText;
        }

        // Add comprehensive analysis section
        const enhancedSection = document.createElement('div');
        enhancedSection.className = 'enhanced-results-section';
        enhancedSection.innerHTML = `
            ${analysis.wingDescription ? `
                <div class="wing-analysis">
                    <h4>🪶 Your Wing: ${analysis.wingDescription.title}</h4>
                    <p class="wing-description">${analysis.wingDescription.description}</p>
                    
                    <div class="wing-details">
                        <div class="wing-traits">
                            <h5>Wing Influences:</h5>
                            <ul>
                                ${analysis.wingDescription.traits.map(trait => `<li>${trait}</li>`).join('')}
                            </ul>
                        </div>
                        <div class="wing-challenges">
                            <h5>Potential Challenges:</h5>
                            <ul>
                                ${analysis.wingDescription.challenges.map(challenge => `<li>${challenge}</li>`).join('')}
                            </ul>
                        </div>
                    </div>
                </div>
            ` : ''}
            
            <div class="detailed-analysis">
                <h4>📊 Personality Analysis</h4>
                <div class="analysis-grid">
                    <div class="analysis-item">
                        <span class="analysis-label">Type Clarity:</span>
                        <span class="analysis-value ${analysis.detailedAnalysis.clarity}">${analysis.detailedAnalysis.clarity.toUpperCase()}</span>
                    </div>
                    <div class="analysis-item">
                        <span class="analysis-label">Wing Strength:</span>
                        <span class="analysis-value">${analysis.wingInfo.wingStrength.toUpperCase()}</span>
                    </div>
                    <div class="analysis-item">
                        <span class="analysis-label">Personality Complexity:</span>
                        <span class="analysis-value">${analysis.detailedAnalysis.complexity.toUpperCase()}</span>
                    </div>
                </div>
                
                ${analysis.detailedAnalysis.secondaryInfluences.length > 0 ? `
                    <div class="secondary-influences">
                        <h5>Secondary Influences:</h5>
                        ${analysis.detailedAnalysis.secondaryInfluences.map(([type, score]) => 
                            `<span class="influence-badge">Type ${type} (${score} points)</span>`
                        ).join('')}
                    </div>
                ` : ''}
            </div>
            
            <div class="growth-insights">
                <h4>🌱 Growth & Development</h4>
                <div class="growth-content">
                    <div class="growth-direction">
                        <h5>Growth Direction (Integration):</h5>
                        <p>Move toward Type ${analysis.growthPath.direction}: ${analysis.growthPath.integration}</p>
                    </div>
                    <div class="stress-direction">
                        <h5>Under Stress:</h5>
                        <p>May move toward Type ${analysis.growthPath.stress} behaviors</p>
                    </div>
                </div>
            </div>
            
            <div class="life-insights">
                <h4>💡 Life Applications</h4>
                <div class="insights-grid">
                    <div class="insight-section">
                        <h5>🤝 Relationships:</h5>
                        <p>${analysis.relationships}</p>
                    </div>
                    <div class="insight-section">
                        <h5>💼 Career Paths:</h5>
                        <div class="career-tags">
                            ${analysis.careerInsights.map(career => 
                                `<span class="career-tag">${career}</span>`
                            ).join('')}
                        </div>
                    </div>
                </div>
            </div>
        `;

        // Insert after existing type details
        const typeDetails = document.getElementById('type-details');
        if (typeDetails) {
            typeDetails.parentNode.insertBefore(enhancedSection, typeDetails.nextSibling);
        } else {
            resultContent.appendChild(enhancedSection);
        }
    }
}

// Initialize wings system
document.addEventListener('DOMContentLoaded', () => {
    const initWings = () => {
        if (window.game) {
            new EnneagramWingsSystem(window.game);
            console.log('🪶 Enneagram Wings system loaded');
        } else {
            setTimeout(initWings, 100);
        }
    };
    initWings();
});
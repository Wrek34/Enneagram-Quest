// Adaptive Insights System - Dynamic personality analysis
class AdaptiveInsights {
    constructor(game) {
        this.game = game;
        this.initializeInsights();
    }

    initializeInsights() {
        this.addRealTimeAnalysis();
        this.addPersonalizedRecommendations();
        this.addGrowthTracking();
    }

    addRealTimeAnalysis() {
        const originalSelectChoice = this.game.selectChoice.bind(this.game);
        this.game.selectChoice = (choiceElement) => {
            originalSelectChoice(choiceElement);
            
            if (this.game.currentScenario >= 4) {
                setTimeout(() => {
                    this.showPersonalityInsight();
                }, 1500);
            }
        };
    }

    showPersonalityInsight() {
        const scores = this.game.typeScores;
        const topTypes = Object.entries(scores)
            .sort(([,a], [,b]) => b - a)
            .slice(0, 2);
        
        if (topTypes[0][1] >= 3) {
            const insight = this.generateInsight(topTypes);
            this.displayInsight(insight);
        }
    }

    generateInsight(topTypes) {
        const [primaryType, primaryScore] = topTypes[0];
        const [secondaryType, secondaryScore] = topTypes[1] || [null, 0];
        
        const insights = {
            1: {
                pattern: "perfectionist tendencies",
                strength: "high standards and integrity",
                growth: "practicing self-compassion"
            },
            2: {
                pattern: "helper instincts",
                strength: "empathy and generosity", 
                growth: "setting healthy boundaries"
            },
            3: {
                pattern: "achievement focus",
                strength: "motivation and adaptability",
                growth: "authentic self-expression"
            },
            4: {
                pattern: "depth seeking",
                strength: "emotional authenticity",
                growth: "appreciating the ordinary"
            },
            5: {
                pattern: "knowledge gathering",
                strength: "analytical thinking",
                growth: "emotional engagement"
            },
            6: {
                pattern: "security seeking",
                strength: "loyalty and responsibility",
                growth: "trusting inner wisdom"
            },
            7: {
                pattern: "possibility exploring",
                strength: "optimism and versatility",
                growth: "staying present with difficulty"
            },
            8: {
                pattern: "power dynamics",
                strength: "leadership and protection",
                growth: "vulnerability and gentleness"
            },
            9: {
                pattern: "harmony maintaining",
                strength: "acceptance and peace-making",
                growth: "asserting personal needs"
            }
        };

        const primary = insights[primaryType];
        let message = `Your choices show ${primary.pattern}. Your strength lies in ${primary.strength}.`;
        
        if (secondaryType && secondaryScore >= 2) {
            const secondary = insights[secondaryType];
            message += ` You also show ${secondary.pattern}, suggesting a complex personality blend.`;
        }

        return {
            message,
            growthTip: `Focus on ${primary.growth} for personal development.`,
            type: primaryType
        };
    }

    displayInsight(insight) {
        const insightDiv = document.createElement('div');
        insightDiv.className = 'personality-insight';
        insightDiv.innerHTML = `
            <div class="insight-content">
                <div class="insight-header">
                    <span class="insight-icon">🔍</span>
                    <h4>Personality Insight</h4>
                    <button onclick="this.parentElement.parentElement.parentElement.remove()">×</button>
                </div>
                <p class="insight-message">${insight.message}</p>
                <div class="growth-tip">
                    <strong>Growth Tip:</strong> ${insight.growthTip}
                </div>
            </div>
        `;
        
        document.body.appendChild(insightDiv);
        
        setTimeout(() => {
            if (document.body.contains(insightDiv)) {
                insightDiv.remove();
            }
        }, 8000);
    }

    addPersonalizedRecommendations() {
        const originalShowResults = this.game.showResults.bind(this.game);
        this.game.showResults = () => {
            originalShowResults();
            
            setTimeout(() => {
                this.addRecommendationsSection();
            }, 2000);
        };
    }

    addRecommendationsSection() {
        const resultContent = document.getElementById('result-content');
        if (!resultContent) return;

        const dominantType = this.game.calculateDominantType();
        const recommendations = this.getPersonalizedRecommendations(dominantType);
        
        const recSection = document.createElement('div');
        recSection.className = 'recommendations-section';
        recSection.innerHTML = `
            <div class="rec-header">
                <h4>🎯 Personalized Recommendations</h4>
                <p>Based on your Type ${dominantType} personality</p>
            </div>
            <div class="rec-grid">
                <div class="rec-card books">
                    <h5>📚 Recommended Reading</h5>
                    <ul>
                        ${recommendations.books.map(book => `<li>${book}</li>`).join('')}
                    </ul>
                </div>
                <div class="rec-card practices">
                    <h5>🧘 Growth Practices</h5>
                    <ul>
                        ${recommendations.practices.map(practice => `<li>${practice}</li>`).join('')}
                    </ul>
                </div>
                <div class="rec-card careers">
                    <h5>💼 Career Paths</h5>
                    <ul>
                        ${recommendations.careers.map(career => `<li>${career}</li>`).join('')}
                    </ul>
                </div>
            </div>
        `;
        
        resultContent.appendChild(recSection);
    }

    getPersonalizedRecommendations(type) {
        const recommendations = {
            1: {
                books: ["The Gifts of Imperfection", "Perfectionism: What's Bad About Being Too Good", "The Enneagram: A Christian Perspective"],
                practices: ["Mindfulness meditation", "Self-compassion exercises", "Imperfection challenges"],
                careers: ["Quality assurance", "Teaching", "Law", "Healthcare", "Non-profit work"]
            },
            2: {
                books: ["Boundaries", "The Enneagram in Love and Work", "Codependent No More"],
                practices: ["Boundary setting exercises", "Self-care routines", "Assertiveness training"],
                careers: ["Counseling", "Social work", "Healthcare", "Education", "Human resources"]
            },
            3: {
                books: ["Authentic Success", "The Enneagram of Personality", "Daring Greatly"],
                practices: ["Authenticity exercises", "Failure reframing", "Values clarification"],
                careers: ["Business leadership", "Sales", "Marketing", "Entrepreneurship", "Public speaking"]
            },
            4: {
                books: ["The Artist's Way", "Emotional Intelligence", "The Enneagram: Understanding Yourself"],
                practices: ["Creative expression", "Emotional regulation", "Gratitude practices"],
                careers: ["Arts", "Writing", "Design", "Therapy", "Creative industries"]
            },
            5: {
                books: ["Quiet: The Power of Introverts", "The Enneagram: A Journey of Self-Discovery", "Emotional Intelligence"],
                practices: ["Social engagement exercises", "Emotional expression", "Energy management"],
                careers: ["Research", "Technology", "Academia", "Analysis", "Consulting"]
            },
            6: {
                books: ["The Anxiety and Worry Workbook", "Self-Reliance", "The Enneagram Made Easy"],
                practices: ["Anxiety management", "Decision-making exercises", "Self-trust building"],
                careers: ["Project management", "Security", "Administration", "Support roles", "Team coordination"]
            },
            7: {
                books: ["The Power of Now", "Wherever You Go, There You Are", "The Enneagram: Nine Ways of Working"],
                practices: ["Mindfulness", "Commitment exercises", "Depth practices"],
                careers: ["Innovation", "Travel", "Entertainment", "Consulting", "Variety-rich roles"]
            },
            8: {
                books: ["The Vulnerable Leader", "Nonviolent Communication", "The Enneagram: A Christian Perspective"],
                practices: ["Vulnerability exercises", "Gentle communication", "Power awareness"],
                careers: ["Leadership", "Entrepreneurship", "Law enforcement", "Politics", "Advocacy"]
            },
            9: {
                books: ["The Assertiveness Workbook", "Getting Things Done", "The Enneagram: Understanding Yourself"],
                practices: ["Assertiveness training", "Priority setting", "Energy activation"],
                careers: ["Mediation", "Counseling", "Support roles", "Creative fields", "Peaceful environments"]
            }
        };

        return recommendations[type] || recommendations[1];
    }

    addGrowthTracking() {
        this.trackGrowthPatterns();
        this.addProgressMetrics();
    }

    trackGrowthPatterns() {
        const growthData = JSON.parse(localStorage.getItem('enneagram-growth') || '{}');
        const today = new Date().toDateString();
        
        if (!growthData[today]) {
            growthData[today] = {
                questionsAnswered: this.game.currentScenario + 1,
                dominantType: this.game.calculateDominantType(),
                timestamp: Date.now()
            };
            
            localStorage.setItem('enneagram-growth', JSON.stringify(growthData));
        }
    }

    addProgressMetrics() {
        const growthData = JSON.parse(localStorage.getItem('enneagram-growth') || '{}');
        const sessions = Object.keys(growthData).length;
        
        if (sessions > 1) {
            this.showGrowthProgress(sessions, growthData);
        }
    }

    showGrowthProgress(sessions, data) {
        const resultContent = document.getElementById('result-content');
        if (!resultContent) return;

        const progressSection = document.createElement('div');
        progressSection.className = 'growth-progress';
        progressSection.innerHTML = `
            <div class="progress-header">
                <h4>📈 Your Growth Journey</h4>
                <p>You've completed ${sessions} personality assessments</p>
            </div>
            <div class="progress-stats">
                <div class="stat">
                    <span class="stat-number">${sessions}</span>
                    <span class="stat-label">Sessions</span>
                </div>
                <div class="stat">
                    <span class="stat-number">${this.getConsistencyScore(data)}%</span>
                    <span class="stat-label">Consistency</span>
                </div>
            </div>
        `;
        
        resultContent.appendChild(progressSection);
    }

    getConsistencyScore(data) {
        const types = Object.values(data).map(session => session.dominantType);
        const mostCommon = types.reduce((a, b, i, arr) => 
            arr.filter(v => v === a).length >= arr.filter(v => v === b).length ? a : b
        );
        
        const consistency = (types.filter(type => type === mostCommon).length / types.length) * 100;
        return Math.round(consistency);
    }
}

// Initialize adaptive insights
document.addEventListener('DOMContentLoaded', () => {
    const initInsights = () => {
        if (window.game) {
            new AdaptiveInsights(window.game);
            console.log('🔍 Adaptive insights system loaded');
        } else {
            setTimeout(initInsights, 200);
        }
    };
    initInsights();
});
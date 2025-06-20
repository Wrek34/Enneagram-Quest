// Core motivation-focused scenarios for accurate Enneagram typing
const coreMotivationScenarios = [
    {
        title: "Your Deepest Fear",
        text: "In your most honest moments, what do you fear most about yourself and your life?",
        choices: [
            { text: "Being corrupt, defective, or wrong at my core", types: [1] },
            { text: "Being unloved or unwanted by others", types: [2] },
            { text: "Being worthless or without value apart from my achievements", types: [3] },
            { text: "Having no identity or personal significance", types: [4] },
            { text: "Being useless, helpless, or incapable", types: [5] },
            { text: "Being without support or guidance", types: [6] },
            { text: "Being trapped in pain or deprivation", types: [7] },
            { text: "Being controlled or violated by others", types: [8] },
            { text: "Loss of connection and fragmentation", types: [9] }
        ]
    },
    {
        title: "Your Core Desire",
        text: "What do you most deeply want to achieve or experience in life?",
        choices: [
            { text: "To be good, right, and perfect", types: [1] },
            { text: "To feel loved and needed", types: [2] },
            { text: "To feel valuable and worthwhile", types: [3] },
            { text: "To find myself and my significance", types: [4] },
            { text: "To be capable and competent", types: [5] },
            { text: "To have security and support", types: [6] },
            { text: "To be satisfied and content", types: [7] },
            { text: "To be self-reliant and in control", types: [8] },
            { text: "To have inner and outer peace", types: [9] }
        ]
    },
    {
        title: "Your Childhood Message",
        text: "What message did you internalize as a child about how to be okay in the world?",
        choices: [
            { text: "You are good when you are perfect and do everything right", types: [1] },
            { text: "You are loved when you focus on others and their needs", types: [2] },
            { text: "You are valued when you are successful and achieve things", types: [3] },
            { text: "You are special when you are different and authentic", types: [4] },
            { text: "You are safe when you understand and are competent", types: [5] },
            { text: "You are secure when you are loyal and follow guidance", types: [6] },
            { text: "You are happy when you avoid pain and stay positive", types: [7] },
            { text: "You are strong when you are independent and in control", types: [8] },
            { text: "You are peaceful when you avoid conflict and go along", types: [9] }
        ]
    },
    {
        title: "Your Stress Response",
        text: "When you're under significant stress, what happens to you internally?",
        choices: [
            { text: "I become more critical and angry, seeing everything that's wrong", types: [1] },
            { text: "I become more aggressive in seeking attention and help from others", types: [2] },
            { text: "I become either frantically busy achieving or completely shut down", types: [3] },
            { text: "I become more moody, withdrawn, and lost in my emotions", types: [4] },
            { text: "I become either hyperactive and scattered or completely isolated", types: [5] },
            { text: "I become more anxious and reactive, or surprisingly aggressive", types: [6] },
            { text: "I become scattered and impulsive, or obsessively focused on details", types: [7] },
            { text: "I become more secretive and withdrawn, or unexpectedly helpful", types: [8] },
            { text: "I become more anxious and worried, or surprisingly confrontational", types: [9] }
        ]
    },
    {
        title: "Your Growth Direction",
        text: "When you're at your healthiest and growing, what positive qualities emerge?",
        choices: [
            { text: "I become more accepting, wise, and serene", types: [1] },
            { text: "I become more self-nurturing and emotionally aware", types: [2] },
            { text: "I become more cooperative, committed, and authentic", types: [3] },
            { text: "I become more objective, principled, and balanced", types: [4] },
            { text: "I become more confident, decisive, and action-oriented", types: [5] },
            { text: "I become more relaxed, optimistic, and spontaneous", types: [6] },
            { text: "I become more focused, fascinated, and studious", types: [7] },
            { text: "I become more caring, protective, and magnanimous", types: [8] },
            { text: "I become more dynamic, self-developing, and energetic", types: [9] }
        ]
    },
    {
        title: "Your Attention Focus",
        text: "Where does your attention automatically go in most situations?",
        choices: [
            { text: "To what's wrong, imperfect, or needs to be corrected", types: [1] },
            { text: "To others' emotions, needs, and how I can help them", types: [2] },
            { text: "To tasks, goals, and how to achieve success efficiently", types: [3] },
            { text: "To what's missing, what others have that I don't", types: [4] },
            { text: "To understanding systems, gathering information, conserving energy", types: [5] },
            { text: "To potential problems, what could go wrong, seeking guidance", types: [6] },
            { text: "To possibilities, options, and keeping things positive", types: [7] },
            { text: "To power dynamics, control, and protecting the vulnerable", types: [8] },
            { text: "To others' agendas, maintaining harmony, avoiding priorities", types: [9] }
        ]
    },
    {
        title: "Your Emotional Pattern",
        text: "What emotion do you most struggle with or try to avoid?",
        choices: [
            { text: "Anger - I try to control it and express it as criticism", types: [1] },
            { text: "My own needs - I focus on others to avoid feeling selfish", types: [2] },
            { text: "Failure and shame - I stay busy achieving to avoid these feelings", types: [3] },
            { text: "Ordinary happiness - I'm drawn to melancholy and intensity", types: [4] },
            { text: "Emptiness and incompetence - I withdraw to avoid being drained", types: [5] },
            { text: "My own authority - I look to others rather than trust myself", types: [6] },
            { text: "Pain and negative emotions - I stay positive and keep moving", types: [7] },
            { text: "Vulnerability and weakness - I stay strong and in control", types: [8] },
            { text: "My own anger and priorities - I merge with others instead", types: [9] }
        ]
    },
    {
        title: "Your Relationship Pattern",
        text: "How do you typically behave in close relationships?",
        choices: [
            { text: "I try to improve my partner and get frustrated when they're not perfect", types: [1] },
            { text: "I focus on their needs and feelings, sometimes losing myself", types: [2] },
            { text: "I want to be seen as successful and can become image-focused", types: [3] },
            { text: "I long for deep connection but fear being too much or not enough", types: [4] },
            { text: "I need space and independence, can seem emotionally distant", types: [5] },
            { text: "I'm loyal and committed but can be anxious and seek reassurance", types: [6] },
            { text: "I keep things light and fun but may avoid deeper intimacy", types: [7] },
            { text: "I'm protective and intense but can be controlling", types: [8] },
            { text: "I'm easygoing and supportive but may avoid difficult conversations", types: [9] }
        ]
    },
    {
        title: "Your Work Style",
        text: "How do you approach work and responsibilities?",
        choices: [
            { text: "I have high standards and get frustrated with inefficiency and errors", types: [1] },
            { text: "I focus on helping others succeed and creating a positive environment", types: [2] },
            { text: "I'm goal-oriented, efficient, and want to be recognized for results", types: [3] },
            { text: "I want my work to be meaningful and express my unique perspective", types: [4] },
            { text: "I prefer to work independently and become expert in my area", types: [5] },
            { text: "I'm responsible and hardworking but seek clear guidance", types: [6] },
            { text: "I like variety and get bored with routine, prefer collaborative work", types: [7] },
            { text: "I take charge naturally and push for results and justice", types: [8] },
            { text: "I work steadily but may procrastinate on difficult decisions", types: [9] }
        ]
    },
    {
        title: "Your Inner Critic",
        text: "What does your harshest inner voice typically tell you?",
        choices: [
            { text: "You're not good enough, you made mistakes, you must be perfect", types: [1] },
            { text: "You're being selfish, focus on others, you're not lovable as you are", types: [2] },
            { text: "You're failing, you're worthless without achievements, you must succeed", types: [3] },
            { text: "You're ordinary and insignificant, no one truly understands you", types: [4] },
            { text: "You don't know enough, you're incompetent, you'll be overwhelmed", types: [5] },
            { text: "You can't trust yourself, you need others' guidance, danger is coming", types: [6] },
            { text: "You're missing out on life, you're trapped, you should be happier", types: [7] },
            { text: "You're weak and vulnerable, others will control you, be stronger", types: [8] },
            { text: "You're causing problems, just go along with others, don't make waves", types: [9] }
        ]
    },
    {
        title: "Your Decision Making",
        text: "When making important decisions, what process do you typically follow?",
        choices: [
            { text: "I research the right way to do it and follow principles", types: [1] },
            { text: "I consider how it will affect others and seek their input", types: [2] },
            { text: "I focus on what will lead to the best outcome and success", types: [3] },
            { text: "I go with what feels most authentic and meaningful to me", types: [4] },
            { text: "I gather extensive information and analyze all options", types: [5] },
            { text: "I seek advice from trusted authorities and consider worst-case scenarios", types: [6] },
            { text: "I keep my options open and choose what seems most exciting", types: [7] },
            { text: "I trust my gut instinct and decide quickly and decisively", types: [8] },
            { text: "I consider all perspectives and try to find consensus", types: [9] }
        ]
    },
    {
        title: "Your Core Drive",
        text: "What fundamentally drives and energizes you at the deepest level?",
        choices: [
            { text: "The drive to perfect and improve everything around me", types: [1] },
            { text: "The need to be needed and to feel essential to others", types: [2] },
            { text: "The drive to achieve and be seen as successful and valuable", types: [3] },
            { text: "The need to be authentic and find my unique identity", types: [4] },
            { text: "The drive to understand and be competent in my domain", types: [5] },
            { text: "The need for security and guidance from trusted sources", types: [6] },
            { text: "The drive to experience life fully and avoid being trapped", types: [7] },
            { text: "The need to be strong, independent, and in control", types: [8] },
            { text: "The drive to maintain peace and avoid conflict or disruption", types: [9] }
        ]
    }
];

// Replace the existing scenarios with core motivation focused ones
if (typeof allScenarios !== 'undefined') {
    // Completely replace with core motivation scenarios for accuracy
    allScenarios = coreMotivationScenarios;
} else {
    window.allScenarios = coreMotivationScenarios;
}
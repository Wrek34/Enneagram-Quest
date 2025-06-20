// Enneagram type definitions
const enneagramTypes = {
    1: {
        title: "Type 1 - The Perfectionist",
        description: "You are principled, purposeful, self-controlled, and perfectionistic. You strive to improve everything and everyone around you.",
        coreMotivation: "To be good, right, perfect, and to improve everything",
        basicFear: "Being corrupt, defective, or wrong",
        strengths: ["High standards", "Ethical", "Reliable", "Organized", "Self-disciplined"]
    },
    2: {
        title: "Type 2 - The Helper",
        description: "You are caring, interpersonal, demonstrative, generous, and people-pleasing. You want to feel loved and needed.",
        coreMotivation: "To feel loved and needed by helping others",
        basicFear: "Being unloved or unwanted for themselves",
        strengths: ["Empathetic", "Generous", "Warm-hearted", "Encouraging", "Supportive"]
    },
    3: {
        title: "Type 3 - The Achiever",
        description: "You are success-oriented, pragmatic, adaptive, driven, and image-conscious. You want to feel valuable and worthwhile.",
        coreMotivation: "To feel valuable and worthwhile through achievement",
        basicFear: "Being worthless or without value apart from achievements",
        strengths: ["Ambitious", "Competent", "Energetic", "Self-assured", "Practical"]
    },
    4: {
        title: "Type 4 - The Individualist",
        description: "You are self-aware, sensitive, reserved, emotionally honest, creative, and personal. You want to find yourself and your significance.",
        coreMotivation: "To find themselves and their significance",
        basicFear: "Having no identity or personal significance",
        strengths: ["Creative", "Emotionally honest", "Empathetic", "Idealistic", "Authentic"]
    },
    5: {
        title: "Type 5 - The Investigator",
        description: "You are intense, cerebral, perceptive, innovative, secretive, and isolated. You want to be capable and competent.",
        coreMotivation: "To be capable and competent",
        basicFear: "Being useless, helpless, or incapable",
        strengths: ["Perceptive", "Innovative", "Independent", "Objective", "Curious"]
    },
    6: {
        title: "Type 6 - The Loyalist",
        description: "You are engaging, responsible, anxious, and suspicious. You want to have security and support.",
        coreMotivation: "To have security and support",
        basicFear: "Being without support or guidance",
        strengths: ["Loyal", "Responsible", "Trustworthy", "Hardworking", "Committed"]
    },
    7: {
        title: "Type 7 - The Enthusiast",
        description: "You are spontaneous, versatile, acquisitive, and scattered. You want to maintain happiness and avoid pain.",
        coreMotivation: "To maintain happiness and avoid pain",
        basicFear: "Being trapped in pain or deprivation",
        strengths: ["Enthusiastic", "Versatile", "Spontaneous", "Optimistic", "Quick-thinking"]
    },
    8: {
        title: "Type 8 - The Challenger",
        description: "You are self-confident, decisive, willful, and confrontational. You want to be self-reliant and in control.",
        coreMotivation: "To be self-reliant and in control of their own life",
        basicFear: "Being controlled or vulnerable to others",
        strengths: ["Self-confident", "Strong", "Assertive", "Protective", "Resourceful"]
    },
    9: {
        title: "Type 9 - The Peacemaker",
        description: "You are receptive, reassuring, complacent, and resigned. You want to maintain inner and outer peace.",
        coreMotivation: "To maintain inner and outer peace",
        basicFear: "Loss of connection and fragmentation",
        strengths: ["Accepting", "Trusting", "Stable", "Creative", "Optimistic"]
    }
};

// Adventure scenarios with Enneagram-based choices
const scenarios = [
    {
        title: "The Ancient Temple Entrance",
        text: "You stand before massive stone doors covered in mysterious symbols. Three paths lead forward, each with a different inscription. How do you proceed?",
        choices: [
            { text: "Study the symbols carefully to decode their meaning before proceeding", types: [1, 5] },
            { text: "Ask your companions for their thoughts and seek their input", types: [2, 6, 9] },
            { text: "Choose the path that looks most impressive and move forward confidently", types: [3, 7, 8] },
            { text: "Follow your intuition and choose the path that feels most meaningful to you", types: [4] }
        ]
    },
    {
        title: "The Guardian's Challenge",
        text: "A stone guardian blocks your path and speaks: 'To pass, you must prove your worth. What drives you most in life?'",
        choices: [
            { text: "The desire to make everything better and more perfect", types: [1] },
            { text: "The need to help others and be needed by them", types: [2] },
            { text: "The drive to succeed and achieve great things", types: [3] },
            { text: "The search for my true self and authentic expression", types: [4] },
            { text: "The quest for knowledge and understanding", types: [5] },
            { text: "The need for security and loyal relationships", types: [6] },
            { text: "The pursuit of joy and new experiences", types: [7] },
            { text: "The desire for independence and control", types: [8] },
            { text: "The wish for harmony and peace", types: [9] }
        ]
    },
    {
        title: "The Treasure Chamber Dilemma",
        text: "You discover a chamber filled with ancient treasures, but taking them might trigger a trap. Your group is divided on what to do.",
        choices: [
            { text: "Insist on following proper archaeological protocols", types: [1] },
            { text: "Worry about everyone's safety and suggest leaving", types: [2, 6] },
            { text: "Quickly secure the most valuable items before anyone changes their mind", types: [3, 7] },
            { text: "Feel conflicted about disturbing something so beautiful and ancient", types: [4, 9] },
            { text: "Analyze the trap mechanism to understand how it works", types: [5] },
            { text: "Take charge and make the decision for everyone", types: [8] }
        ]
    },
    {
        title: "The Mirror of Truth",
        text: "You encounter a magical mirror that shows your deepest fears. What do you see reflected back at you?",
        choices: [
            { text: "Making a terrible mistake that hurts others", types: [1] },
            { text: "Being alone and unloved by everyone", types: [2] },
            { text: "Failing publicly and being seen as worthless", types: [3] },
            { text: "Being ordinary and having no special identity", types: [4] },
            { text: "Being overwhelmed and unable to cope", types: [5] },
            { text: "Being abandoned without support or guidance", types: [6] },
            { text: "Being trapped in pain with no escape", types: [7] },
            { text: "Being controlled and powerless", types: [8] },
            { text: "Conflict and chaos destroying everything peaceful", types: [9] }
        ]
    },
    {
        title: "The Wise Oracle's Question",
        text: "An ancient oracle appears and asks: 'When facing a difficult decision, what guides you most?'",
        choices: [
            { text: "My moral compass and what I know is right", types: [1] },
            { text: "What would be best for the people I care about", types: [2] },
            { text: "What will lead to the most successful outcome", types: [3] },
            { text: "What feels most authentic and true to who I am", types: [4] },
            { text: "Careful analysis of all available information", types: [5] },
            { text: "Advice from trusted friends and mentors", types: [6] },
            { text: "What seems most exciting and promising", types: [7] },
            { text: "My gut instinct and personal strength", types: [8] },
            { text: "What will maintain harmony and avoid conflict", types: [9] }
        ]
    },
    {
        title: "The Team Crisis",
        text: "Your adventure party faces a crisis—supplies are running low and morale is dropping. As tensions rise, how do you respond?",
        choices: [
            { text: "Create a detailed plan to efficiently manage remaining resources", types: [1] },
            { text: "Focus on encouraging others and boosting team morale", types: [2] },
            { text: "Take leadership and motivate everyone toward the goal", types: [3] },
            { text: "Express your feelings about the situation honestly", types: [4] },
            { text: "Withdraw to think through possible solutions alone", types: [5] },
            { text: "Seek consensus and make sure everyone feels heard", types: [6, 9] },
            { text: "Suggest a fun activity to lighten the mood", types: [7] },
            { text: "Confront the problems directly and decisively", types: [8] }
        ]
    },
    {
        title: "The Magical Artifact",
        text: "You find a powerful artifact that could solve your quest, but using it requires a personal sacrifice. What matters most in your decision?",
        choices: [
            { text: "Whether using it is the morally correct thing to do", types: [1] },
            { text: "How it will affect the people you care about", types: [2] },
            { text: "Whether it will help you achieve your ultimate goal", types: [3] },
            { text: "Whether it aligns with your personal values and identity", types: [4] },
            { text: "Understanding exactly how it works and its consequences", types: [5] },
            { text: "What trusted advisors would recommend", types: [6] },
            { text: "Whether the benefits outweigh the costs", types: [7] },
            { text: "Maintaining your independence and not owing anyone", types: [8] },
            { text: "Avoiding any choice that might create conflict", types: [9] }
        ]
    },
    {
        title: "The Final Chamber",
        text: "You reach the temple's heart where nine pedestals hold different rewards. You can only choose one. Which calls to you most?",
        choices: [
            { text: "A scroll containing the ultimate truth about right and wrong", types: [1] },
            { text: "A crystal that shows you how to help others most effectively", types: [2] },
            { text: "A crown that guarantees success in all your endeavors", types: [3] },
            { text: "A mirror that reveals your unique purpose and identity", types: [4] },
            { text: "A book containing all the knowledge in the universe", types: [5] },
            { text: "A shield that provides eternal security and protection", types: [6] },
            { text: "A key that opens doors to infinite adventures", types: [7] },
            { text: "A sword that grants unshakeable personal power", types: [8] },
            { text: "A dove that brings lasting peace to all conflicts", types: [9] }
        ]
    }
];

// Additional scenarios for more accurate typing
const bonusScenarios = [
    {
        title: "The Unexpected Setback",
        text: "Your carefully planned route is blocked by a recent landslide. Your group looks to you for direction. What's your first instinct?",
        choices: [
            { text: "Criticize whoever was supposed to check the route conditions", types: [1] },
            { text: "Comfort anyone who seems upset by this development", types: [2] },
            { text: "Quickly pivot to an alternative plan to stay on schedule", types: [3] },
            { text: "Feel frustrated that this ruins the perfect adventure you envisioned", types: [4] },
            { text: "Analyze the situation to understand all possible options", types: [5] },
            { text: "Worry about what other problems might arise", types: [6] },
            { text: "Get excited about the unexpected adventure this creates", types: [7] },
            { text: "Take charge and find a way through or around the obstacle", types: [8] },
            { text: "Suggest the group take time to discuss options together", types: [9] }
        ]
    },
    {
        title: "The Moral Dilemma",
        text: "You discover that a fellow adventurer has been secretly taking more than their share of supplies. How do you handle this?",
        choices: [
            { text: "Confront them immediately about their wrong behavior", types: [1, 8] },
            { text: "Try to understand why they felt they needed to do this", types: [2, 9] },
            { text: "Consider how this affects the team's success", types: [3] },
            { text: "Feel deeply hurt by this betrayal of trust", types: [4] },
            { text: "Observe their behavior more to gather more information", types: [5] },
            { text: "Worry about what this means for group dynamics", types: [6] },
            { text: "Hope the problem resolves itself without confrontation", types: [7, 9] }
        ]
    },
    {
        title: "The Leadership Moment",
        text: "Your group faces a dangerous passage and needs someone to take the lead. The others look to you expectantly. How do you feel?",
        choices: [
            { text: "Determined to lead them the right way safely", types: [1] },
            { text: "Honored that they trust you to take care of them", types: [2] },
            { text: "Confident that you can successfully guide them through", types: [3] },
            { text: "Uncertain if you're the right person for this responsibility", types: [4] },
            { text: "Prefer someone else lead while you provide strategic input", types: [5] },
            { text: "Nervous about the responsibility but willing to try", types: [6] },
            { text: "Excited about the adventure but hope it stays fun", types: [7] },
            { text: "Natural and comfortable taking charge", types: [8] },
            { text: "Reluctant to take on a role that might create conflict", types: [9] }
        ]
    },
    {
        title: "The Personal Victory",
        text: "You successfully solve a crucial puzzle that saves the group. How do you feel about this achievement?",
        choices: [
            { text: "Satisfied that you did the right thing correctly", types: [1] },
            { text: "Happy that you could help everyone", types: [2] },
            { text: "Proud of your successful performance", types: [3] },
            { text: "Glad you could contribute something uniquely yours", types: [4] },
            { text: "Pleased your knowledge and analysis paid off", types: [5] },
            { text: "Relieved that you proved reliable when it mattered", types: [6] },
            { text: "Thrilled by the excitement and positive outcome", types: [7] },
            { text: "Confident in your ability to handle challenges", types: [8] },
            { text: "Content that everything worked out peacefully", types: [9] }
        ]
    }
];

// Additional relationship and tritype scenarios
const relationshipScenarios = [
    {
        title: "The Relationship Conflict",
        text: "Your partner consistently leaves dishes in the sink despite your requests to clean up. This has become a recurring source of tension. How do you handle it?",
        choices: [
            { text: "Create a cleaning schedule and explain why organization matters", types: [1] },
            { text: "Start doing their dishes while gently mentioning how it would help you", types: [2] },
            { text: "Suggest a compromise that works for both of your lifestyles", types: [3, 9] },
            { text: "Feel hurt that they don't seem to care about what matters to you", types: [4] },
            { text: "Research relationship advice and communication strategies", types: [5] },
            { text: "Worry this means they don't respect you or the relationship", types: [6] },
            { text: "Try to make it fun by doing dishes together with music", types: [7] },
            { text: "Have a direct conversation about expectations and boundaries", types: [8] },
            { text: "Avoid bringing it up to prevent an argument", types: [9] }
        ]
    },
    {
        title: "The Social Gathering",
        text: "You're at a party where you don't know many people. Your friend who invited you is busy with other guests. How do you spend your time?",
        choices: [
            { text: "Find someone to have a meaningful conversation about shared interests", types: [1, 5] },
            { text: "Look for someone who seems lonely and try to include them", types: [2] },
            { text: "Network and meet people who might be useful connections", types: [3] },
            { text: "Find a quiet corner and observe the interesting social dynamics", types: [4, 5] },
            { text: "Engage in deep conversation with one or two interesting people", types: [5] },
            { text: "Stay close to the few people you do know", types: [6] },
            { text: "Mingle with different groups and keep the energy light and fun", types: [7] },
            { text: "Take charge of organizing a group activity or game", types: [8] },
            { text: "Go with the flow and join whatever conversation seems welcoming", types: [9] }
        ]
    },
    {
        title: "The Creative Project",
        text: "You're working on a creative project that's important to you, but you're stuck and feeling frustrated. What's your approach to getting unstuck?",
        choices: [
            { text: "Step back and analyze what's not working, then create a systematic plan", types: [1] },
            { text: "Ask friends or mentors for their input and encouragement", types: [2, 6] },
            { text: "Research what successful people in this field have done", types: [3] },
            { text: "Take a break and wait for inspiration to strike naturally", types: [4, 9] },
            { text: "Study the technical aspects and gather more information", types: [5] },
            { text: "Seek feedback from trusted advisors before proceeding", types: [6] },
            { text: "Try a completely different approach or add new elements", types: [7] },
            { text: "Push through with determination and extra effort", types: [8] },
            { text: "Work on other parts of the project while letting this section develop", types: [9] }
        ]
    },
    {
        title: "The Life Transition",
        text: "You're facing a major life change (new job, moving, relationship change). What's your primary focus during this transition?",
        choices: [
            { text: "Making sure everything is done correctly and according to plan", types: [1] },
            { text: "Ensuring everyone affected by the change feels supported", types: [2] },
            { text: "Positioning yourself for success in the new situation", types: [3] },
            { text: "Processing the emotional significance of this life chapter", types: [4] },
            { text: "Gathering information and preparing for all possibilities", types: [5] },
            { text: "Seeking advice and support from trusted people", types: [6] },
            { text: "Staying excited about new opportunities and adventures", types: [7] },
            { text: "Taking control and making things happen on your timeline", types: [8] },
            { text: "Going with the flow and adapting as things unfold", types: [9] }
        ]
    }
];

// Import enhanced scenarios if available
let allScenarios = [...scenarios, ...bonusScenarios, ...relationshipScenarios];

// This will be extended by enhanced-scenarios.js
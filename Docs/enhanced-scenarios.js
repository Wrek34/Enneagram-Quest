// Enhanced scenarios with moral/ethical ambiguity for better wing detection
const enhancedScenarios = [
    {
        title: "The Whistleblower's Dilemma",
        text: "You discover your trusted colleague has been embezzling funds meant for charity. They confide they're desperate to pay for their child's medical treatment. What do you do?",
        choices: [
            { text: "Report them immediately - rules exist for a reason and must be followed", types: [1, 6] },
            { text: "Offer to help them find legal ways to get the money they need", types: [2, 9] },
            { text: "Suggest they return the money quietly to avoid damaging everyone's reputation", types: [3, 9] },
            { text: "Feel torn between justice and compassion - this situation is heartbreaking", types: [4] },
            { text: "Research the legal implications and charity's policies before deciding", types: [5] },
            { text: "Seek advice from a trusted mentor about the right course of action", types: [6, 2] },
            { text: "Hope they'll do the right thing on their own without confrontation", types: [7, 9] },
            { text: "Confront them directly - they need to face the consequences", types: [8, 1] }
        ]
    },
    {
        title: "The Promotion Predicament",
        text: "You're up for a promotion against your close friend. You discover they've been taking credit for some of your work. Confronting them could hurt your friendship but staying silent feels wrong.",
        choices: [
            { text: "Document everything and present the facts to management professionally", types: [1, 5] },
            { text: "Talk to your friend privately first to understand why they did this", types: [2, 9] },
            { text: "Focus on showcasing your own achievements without mentioning their actions", types: [3] },
            { text: "Feel deeply hurt by the betrayal and struggle with what friendship means", types: [4] },
            { text: "Analyze whether this pattern of behavior affects other colleagues too", types: [5, 1] },
            { text: "Seek guidance from HR about how to handle this delicate situation", types: [6] },
            { text: "Try to find a win-win solution where you both succeed somehow", types: [7, 2] },
            { text: "Address it head-on - real friends should be honest with each other", types: [8] },
            { text: "Avoid confrontation and hope the truth comes out naturally", types: [9] }
        ]
    },
    {
        title: "The Family Secret",
        text: "Your sibling asks you to lie to your parents about their struggles with addiction, fearing it will devastate them. You know your parents could provide crucial support, but your sibling threatens to cut contact if you tell.",
        choices: [
            { text: "Refuse to lie - honesty is fundamental to healthy relationships", types: [1] },
            { text: "Respect their wishes while trying to convince them to seek help", types: [2, 6] },
            { text: "Consider what outcome would be best for everyone involved", types: [3, 9] },
            { text: "Feel anguished by being put in this impossible position", types: [4] },
            { text: "Research addiction resources and intervention strategies first", types: [5] },
            { text: "Worry about making the wrong choice and losing your sibling", types: [6, 2] },
            { text: "Look for creative alternatives that don't require lying or betrayal", types: [7] },
            { text: "Tell them you won't lie but also won't volunteer information", types: [8, 1] },
            { text: "Agree to keep the secret while gently encouraging treatment", types: [9, 2] }
        ]
    },
    {
        title: "The Charitable Deception",
        text: "Your organization inflates impact numbers to secure a major donation that would genuinely help thousands. The donor won't verify the numbers, and the good the money could do is real. Do you speak up?",
        choices: [
            { text: "Insist on accurate reporting regardless of consequences", types: [1] },
            { text: "Focus on how to help those in need while maintaining integrity", types: [2, 1] },
            { text: "Weigh whether the positive outcomes justify the means", types: [3] },
            { text: "Feel conflicted about compromising values for a greater good", types: [4, 1] },
            { text: "Analyze the long-term risks of this approach to the organization", types: [5] },
            { text: "Seek counsel from trusted advisors about the ethical implications", types: [6] },
            { text: "Look for alternative ways to secure funding honestly", types: [7, 2] },
            { text: "Confront leadership directly about this unethical practice", types: [8, 1] },
            { text: "Hope someone else will address it to avoid being the whistleblower", types: [9] }
        ]
    },
    {
        title: "The Loyalty Test",
        text: "Your best friend's partner confides they're having an affair and planning to leave. Your friend is about to make a major financial commitment based on their relationship. Do you warn them?",
        choices: [
            { text: "Tell your friend immediately - they deserve to know the truth", types: [1, 8] },
            { text: "Encourage the partner to be honest while offering support to both", types: [2] },
            { text: "Consider the timing and how to minimize damage to everyone", types: [3, 9] },
            { text: "Feel torn between loyalty to your friend and respecting confidences", types: [4] },
            { text: "Gather more information to understand the full situation", types: [5] },
            { text: "Seek advice about the right thing to do in this situation", types: [6] },
            { text: "Hope the situation resolves itself before the financial commitment", types: [7, 9] },
            { text: "Give the partner an ultimatum - tell your friend or you will", types: [8] },
            { text: "Stay out of it - it's not your place to interfere in their relationship", types: [9] }
        ]
    },
    {
        title: "The Inheritance Injustice",
        text: "Your wealthy relative's will unfairly favors you over other family members who need the money more. You could contest it to redistribute fairly, but it would create family conflict and legal costs.",
        choices: [
            { text: "Contest the will to ensure fair distribution according to need", types: [1, 2] },
            { text: "Accept the inheritance but privately share it with those in need", types: [2] },
            { text: "Keep the inheritance but use it strategically to help the family", types: [3] },
            { text: "Feel guilty about the unfairness but unsure how to make it right", types: [4] },
            { text: "Research the legal and tax implications of various options", types: [5] },
            { text: "Consult with family members about what feels right to everyone", types: [6, 9] },
            { text: "Accept it gracefully and try to use it for positive purposes", types: [7] },
            { text: "Honor your relative's wishes - it was their money to distribute", types: [8] },
            { text: "Avoid making waves and hope the family stays together", types: [9] }
        ]
    },
    {
        title: "The Academic Advantage",
        text: "You discover your child's private school gives unfair advantages to wealthy families' children. Your child benefits from this system, but you know it's wrong. Speaking up could hurt your child's opportunities.",
        choices: [
            { text: "Address the inequality directly with school administration", types: [1, 8] },
            { text: "Work to create more opportunities for disadvantaged students", types: [2] },
            { text: "Transfer your child while working to reform the system", types: [1, 4] },
            { text: "Feel conflicted about benefiting from an unjust system", types: [4] },
            { text: "Research the extent of the problem and document evidence", types: [5] },
            { text: "Rally other parents who share your concerns", types: [6, 2] },
            { text: "Look for schools with better values while avoiding confrontation", types: [7, 9] },
            { text: "Confront the system head-on regardless of personal cost", types: [8] },
            { text: "Work quietly behind the scenes to encourage gradual change", types: [9, 2] }
        ]
    },
    {
        title: "The Environmental Compromise",
        text: "Your company offers you a promotion to lead a profitable project that will create jobs but cause environmental damage. Refusing could end your career, but accepting compromises your values.",
        choices: [
            { text: "Decline the promotion and maintain your environmental principles", types: [1, 4] },
            { text: "Accept but work to minimize environmental impact and help affected communities", types: [2, 1] },
            { text: "Negotiate for environmental safeguards as a condition of acceptance", types: [3] },
            { text: "Feel anguished about choosing between career and conscience", types: [4] },
            { text: "Research alternative approaches that could satisfy both goals", types: [5] },
            { text: "Seek advice from environmental experts and career mentors", types: [6] },
            { text: "Look for creative solutions that could transform the project", types: [7] },
            { text: "Take the role and fight for change from within the system", types: [8] },
            { text: "Try to find a middle ground that doesn't force an extreme choice", types: [9] }
        ]
    }
];

// Merge with existing scenarios
if (typeof allScenarios !== 'undefined') {
    allScenarios.push(...enhancedScenarios);
} else {
    const allScenarios = [...scenarios, ...bonusScenarios, ...enhancedScenarios];
}
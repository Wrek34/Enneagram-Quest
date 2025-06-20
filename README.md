# 🏛️ Enneagram Quest

An immersive, adventure-style personality assessment game that helps users discover their Enneagram type through engaging scenarios and RPG-style gameplay.

![Enneagram Quest Banner](https://img.shields.io/badge/Enneagram-Quest-purple?style=for-the-badge&logo=gamepad)

## 🎮 Live Demo

[Play Enneagram Quest](https://your-username.github.io/enneagram-quest) *(Update with your GitHub Pages URL)*

## ✨ Features

### 🎯 Core Gameplay
- **12 Dynamic Scenarios** - Adventure-based questions that feel like an interactive story
- **9 Enneagram Types** - Comprehensive personality assessment with detailed results
- **Smart Scoring System** - Advanced algorithm that tracks responses across all personality types
- **Randomized Content** - Different scenario combinations for high replayability

### 🎮 RPG Elements
- **Character Progression** - Level up system with experience points
- **Stat Development** - Wisdom, Courage, and Compassion attributes
- **Inventory System** - Collectible items found throughout the quest
- **Achievement System** - 15+ unlockable achievements with persistent tracking

### 🎨 Visual & Audio
- **Animated Sprites** - Floating character animations and visual effects
- **Particle System** - Dynamic background particles for atmosphere
- **Sound Effects** - Interactive audio feedback (Web Audio API)
- **Smooth Animations** - CSS transitions and keyframe animations
- **Responsive Design** - Works seamlessly on desktop, tablet, and mobile

### ♿ Accessibility
- **Full Keyboard Navigation** - Complete game playable without mouse
- **Screen Reader Support** - ARIA labels and live regions
- **High Contrast Focus** - Clear visual indicators for navigation
- **Reduced Motion Support** - Respects user motion preferences
- **Sound Controls** - Toggle audio on/off

## 🚀 Quick Start

### Option 1: Direct Download
1. Download or clone this repository
2. Open `index.html` in any modern web browser
3. Start your Enneagram Quest adventure!

### Option 2: Local Development
```bash
# Clone the repository
git clone https://github.com/your-username/enneagram-quest.git

# Navigate to project directory
cd enneagram-quest

# Open with a local server (recommended)
python -m http.server 8000
# OR
npx serve .

# Visit http://localhost:8000
```

## 📁 Project Structure

```
enneagram-quest/
├── index.html              # Main HTML file
├── styles.css              # Base styles and layout
├── game-styles.css         # Game-specific visual enhancements
├── achievement-styles.css  # Achievement system styling
├── enneagram-data.js      # Personality types and scenarios
├── achievements.js        # Achievement system logic
├── game-enhanced.js       # Main game engine with RPG features
├── game.js               # Original base game class
└── README.md             # This file
```

## 🎯 How It Works

### Personality Assessment
The game uses scenario-based questions rather than direct personality queries, making the assessment feel natural and engaging. Each choice maps to specific Enneagram types based on:

- **Core Motivations** - What drives the person
- **Basic Fears** - What they want to avoid
- **Behavioral Patterns** - How they typically respond
- **Decision-Making Style** - Their approach to choices

### Scoring Algorithm
```javascript
// Each choice can map to multiple personality types
choice: {
    text: "Study the symbols carefully before proceeding",
    types: [1, 5] // Maps to Perfectionist and Investigator
}

// Final type is determined by highest accumulated score
// with intelligent tie-breaking for accurate results
```

### Game Progression
- **Experience Points** - Gained from each choice made
- **Stat Growth** - Attributes increase based on personality-aligned decisions
- **Item Collection** - Random rewards for engagement
- **Achievement Unlocks** - Milestone tracking with persistent storage

## 🏆 Achievement System

### Personality Achievements
- **The Perfectionist** - Discover Type 1
- **The Helper** - Discover Type 2
- **The Achiever** - Discover Type 3
- **The Individualist** - Discover Type 4
- **The Investigator** - Discover Type 5
- **The Loyalist** - Discover Type 6
- **The Enthusiast** - Discover Type 7
- **The Challenger** - Discover Type 8
- **The Peacemaker** - Discover Type 9

### Progress Achievements
- **First Steps** - Make your first choice
- **Wisdom Seeker** - Reach 50 Wisdom points
- **Brave Heart** - Reach 50 Courage points
- **Kind Soul** - Reach 50 Compassion points
- **Treasure Hunter** - Collect 5 items
- **Level Master** - Reach level 5
- **Quest Complete** - Finish your first adventure

## 🛠️ Technical Details

### Technologies Used
- **HTML5** - Semantic structure with accessibility features
- **CSS3** - Modern styling with animations and responsive design
- **Vanilla JavaScript** - No external dependencies
- **Web Audio API** - Dynamic sound generation
- **Canvas API** - Particle system rendering
- **Local Storage** - Achievement persistence

### Browser Compatibility
- ✅ Chrome 60+
- ✅ Firefox 55+
- ✅ Safari 12+
- ✅ Edge 79+

### Performance Features
- **Lazy Loading** - Scenarios loaded as needed
- **Efficient Animations** - CSS transforms and GPU acceleration
- **Memory Management** - Proper cleanup of audio contexts and particles
- **Responsive Images** - Scalable vector graphics where possible

## 🎨 Customization

### Adding New Scenarios
```javascript
// In enneagram-data.js
const newScenario = {
    title: "Your Scenario Title",
    text: "Scenario description...",
    choices: [
        { 
            text: "Choice 1", 
            types: [1, 8] // Enneagram types this choice represents
        },
        { 
            text: "Choice 2", 
            types: [2, 9] 
        }
        // Add more choices...
    ]
};

// Add to allScenarios array
allScenarios.push(newScenario);
```

### Modifying Enneagram Types
```javascript
// In enneagram-data.js
enneagramTypes[1] = {
    title: "Type 1 - The Perfectionist",
    description: "Your custom description...",
    coreMotivation: "Custom motivation...",
    basicFear: "Custom fear...",
    strengths: ["Strength 1", "Strength 2", ...]
};
```

### Styling Customization
```css
/* Override in your custom CSS file */
:root {
    --primary-color: #your-color;
    --secondary-color: #your-color;
    --accent-color: #your-color;
}
```

## 🤝 Contributing

We welcome contributions! Here's how you can help:

### Bug Reports
- Use GitHub Issues to report bugs
- Include browser version and steps to reproduce
- Screenshots are helpful for visual issues

### Feature Requests
- Suggest new scenarios or game mechanics
- Propose accessibility improvements
- Share ideas for visual enhancements

### Pull Requests
1. Fork the repository
2. Create a feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

### Development Guidelines
- Maintain accessibility standards
- Test across different browsers
- Keep code readable and well-commented
- Follow existing code style
- Update documentation for new features

## 📊 Analytics & Insights

### User Engagement Metrics
- Average completion rate: Track how many users finish the quest
- Most popular scenarios: Identify engaging content
- Achievement unlock rates: Monitor progression systems
- Return user patterns: Measure replayability

### Personality Distribution
- Track which Enneagram types are most commonly discovered
- Analyze choice patterns across different demographics
- Identify scenarios that best differentiate between types

## 🔒 Privacy & Data

### Data Collection
- **Local Storage Only** - All user data stays on their device
- **No Tracking** - No analytics or user tracking implemented
- **No Personal Info** - Game doesn't collect personal information
- **Achievement Data** - Stored locally, can be cleared by user

### GDPR Compliance
- No cookies used for tracking
- No data transmitted to external servers
- Users can clear all data via browser settings

## 🚀 Deployment

### GitHub Pages
1. Push your code to a GitHub repository
2. Go to repository Settings → Pages
3. Select source branch (usually `main`)
4. Your game will be available at `https://username.github.io/repository-name`

### Netlify
1. Connect your GitHub repository to Netlify
2. Set build command: (none needed for static site)
3. Set publish directory: `/` (root)
4. Deploy automatically on git push

### Custom Domain
1. Add CNAME file with your domain
2. Configure DNS settings with your provider
3. Enable HTTPS in your hosting platform

## 📈 Future Enhancements

### Planned Features
- **Multiplayer Mode** - Compare results with friends
- **Extended Scenarios** - More adventure paths and endings
- **Character Customization** - Avatar appearance options
- **Social Sharing** - Share results on social media
- **Detailed Analytics** - Personal growth insights
- **Mobile App** - Native iOS/Android versions

### Advanced Features
- **AI-Powered Scenarios** - Dynamic content generation
- **Voice Narration** - Audio storytelling option
- **VR Support** - Immersive virtual reality experience
- **Localization** - Multiple language support

## 📞 Support

### Getting Help
- **GitHub Issues** - For bugs and feature requests
- **Discussions** - For questions and community chat
- **Wiki** - Detailed documentation and guides

### Community
- Join our Discord server (link coming soon)
- Follow updates on Twitter [@EnneagramQuest](https://twitter.com/enneagramquest)
- Star the repository to show support!

## 📄 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

### What this means:
- ✅ Commercial use allowed
- ✅ Modification allowed
- ✅ Distribution allowed
- ✅ Private use allowed
- ❗ License and copyright notice required

## 🙏 Acknowledgments

- **Enneagram Institute** - For personality type research and insights
- **Web Accessibility Initiative** - For accessibility guidelines
- **Open Source Community** - For inspiration and best practices

## 📊 Project Stats

![GitHub stars](https://img.shields.io/github/stars/your-username/enneagram-quest?style=social)
![GitHub forks](https://img.shields.io/github/forks/your-username/enneagram-quest?style=social)
![GitHub issues](https://img.shields.io/github/issues/your-username/enneagram-quest)
![GitHub license](https://img.shields.io/github/license/your-username/enneagram-quest)

---

**Made with ❤️ for personal growth and self-discovery**

*Discover your true self through adventure!*
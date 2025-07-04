# 🏛️ Enneagram Quest

An immersive, adventure-style personality assessment game that helps users discover their Enneagram type through engaging scenarios, RPG-style gameplay, and cutting-edge interactive features.

![Enneagram Quest Banner](https://img.shields.io/badge/Enneagram-Quest-purple?style=for-the-badge&logo=gamepad)
![Features](https://img.shields.io/badge/Features-75+-brightgreen?style=for-the-badge)
![Questions](https://img.shields.io/badge/Questions-16-blue?style=for-the-badge)
![Audio](https://img.shields.io/badge/Audio-Immersive-blue?style=for-the-badge)
![Customization](https://img.shields.io/badge/Avatar-Customizable-orange?style=for-the-badge)

## 🎮 Live Demo

[Play Enneagram Quest](https://wrek34.github.io/Enneagram-Quest/)

## ✨ Revolutionary Features

### 🎯 Core Gameplay
- **16 Dynamic Scenarios** - Adventure-based questions with randomized order
- **9 Enneagram Types** - Comprehensive personality assessment with detailed insights
- **Smart Scoring System** - Advanced algorithm preventing predictable patterns
- **Philosophical Questions** - Deep ethical dilemmas for accurate typing
- **Quest Journal** - Track your entire journey with timestamped entries
- **Progress Tracking** - Real-time visual progress indicator

### 🎮 Advanced RPG Elements
- **Character Progression** - Multi-level system with experience points
- **Stat Development** - Wisdom, Courage, and Compassion attributes
- **Dynamic Inventory** - Collectible magical items throughout your quest
- **Achievement System** - 15+ unlockable achievements with session tracking
- **Meaningful Avatars** - Six unique personas that affect gameplay
- **Performance Optimization** - Adaptive quality and memory management

### 🎨 Immersive Audio & Visuals
- **Dynamic Backgrounds** - Ever-changing visual environments
- **Weather Effects** - Rain, snow, sparkles, leaves, and mystical mist
- **Advanced Particle System** - Interactive visual effects and celebrations
- **Smooth Animations** - Professional-grade transitions and effects

### 🎭 Avatar Customization
- **6 Avatar Styles** - Mystical, Warrior, Scholar, Explorer, Healer, Artist
- **8 Color Themes** - Full spectrum of personality-matched colors
- **6 Accessories** - Crown, hat, glasses, mask, gem, and more
- **6 Animation Effects** - Float, pulse, rotate, bounce, glow, shake
- **3 Size Options** - Small, medium, large avatars
- **Real-time Preview** - See changes instantly
- **Randomization** - One-click random avatar generation

### 🌟 Social & Sharing
- **Multi-platform Sharing** - X (Twitter), Facebook, LinkedIn, TikTok, Email
- **Professional Icons** - Brand-accurate SVG icons with proper colors
- **Email Results** - Automatic delivery of personality analysis to inbox
- **Creator Support** - Buy Me a Coffee, Patreon, GitHub integration
- **Feedback System** - Built-in rating and review system

### ♿ Accessibility Excellence
- **Full Keyboard Navigation** - Complete game playable without mouse
- **Screen Reader Support** - ARIA labels and live regions
- **Guided Tour System** - Interactive tutorial for new users
- **Skip Links** - Quick navigation to main content
- **Reduced Motion Support** - Respects user motion preferences
- **Streamlined Interface** - Clean, distraction-free experience

## 🚀 Quick Start Guide

### 🎮 For Players

#### Option 1: Play Online (Recommended)
1. Visit [Enneagram Quest Live Demo](https://wrek34.github.io/Enneagram-Quest)
2. Click "Begin Your Quest" to start your adventure
3. Customize your avatar and choose difficulty
4. Embark on your personality discovery journey!

#### Option 2: Download & Play Locally
1. Download the latest release from GitHub
2. Extract the files to your desired location
3. Open `index.html` in any modern web browser
4. Start your Enneagram Quest adventure!

### 🔧 For Developers

#### Local Development Setup
```bash
# Clone the repository
git clone https://github.com/wrek34/enneagram-quest.git

# Navigate to project directory
cd enneagram-quest

# Option 1: Python server (if you have Python)
python -m http.server 8000

# Option 2: Node.js server (if you have Node.js)
npx serve .

# Option 3: PHP server (if you have PHP)
php -S localhost:8000

# Visit http://localhost:8000 in your browser
```

#### Development Requirements
- **Modern Web Browser** (Chrome 60+, Firefox 55+, Safari 12+, Edge 79+)
- **Local Web Server** (for proper CORS handling)
- **Text Editor/IDE** (VS Code, Sublime Text, etc.)
- **Git** (for version control)

#### Recommended Development Tools
- **VS Code Extensions**: Live Server, Prettier, ESLint
- **Browser Dev Tools**: Chrome DevTools, Firefox Developer Tools
- **Testing Tools**: Lighthouse for performance and accessibility
- **Design Tools**: Figma for UI/UX design contributions

## 📁 Project Structure

```
enneagram-quest/
├── index.html                    # Root entry point
├── Docs/                        # Main application files
│   ├── index.html              # Main HTML file
│   ├── debug-game.js           # Main game engine (16 questions)
│   ├── enneagram-data.js       # Core personality types and scenarios
│   ├── enhanced-scenarios.js   # Moral/ethical dilemma scenarios
│   ├── enneagram-wings.js      # Wing system and relationship insights
│   ├── tritype-system.js       # Complete tritype analysis
│   ├── ux-enhancements.js      # Progress tracking and smart hints
│   ├── guided-tour.js          # Interactive tutorial system
│   ├── performance-optimizer.js # Loading screen and optimization
│   ├── save-system.js          # Multi-slot save/load system
│   ├── social-sharing.js       # Social media with proper icons
│   ├── email-signup.js         # Email results delivery
│   ├── achievements.js         # Achievement system
│   ├── simple-fantasy-avatar.js # Avatar customization
│   ├── immersive-audio.js      # Professional audio system
│   └── [CSS files]             # Comprehensive styling
├── LICENSE                      # MIT License
└── README.md                   # This guide
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
- **16 Comprehensive Questions** - Adventure, relationship, philosophical, and ethical scenarios
- **Experience Points** - Gained from each choice with personality-based bonuses
- **Multi-Stat Growth** - Wisdom, Courage, Compassion develop based on choices
- **Dynamic Item Collection** - 6 different magical items with random discovery
- **Achievement System** - 15+ achievements across personality and progress milestones
- **Tritype Analysis** - Complete analysis of all three centers of intelligence
- **Enhanced Relationship Insights** - Detailed compatibility and growth tips

## 🏆 Comprehensive Achievement System

### 🎭 Personality Discovery Achievements
- **The Perfectionist** 🎯 - Discover Type 1 (The Reformer)
- **The Helper** 🤝 - Discover Type 2 (The Giver)
- **The Achiever** 🏆 - Discover Type 3 (The Performer)
- **The Individualist** 🎨 - Discover Type 4 (The Artist)
- **The Investigator** 🔍 - Discover Type 5 (The Thinker)
- **The Loyalist** 🛡️ - Discover Type 6 (The Guardian)
- **The Enthusiast** 🎉 - Discover Type 7 (The Adventurer)
- **The Challenger** 💪 - Discover Type 8 (The Leader)
- **The Peacemaker** ☮️ - Discover Type 9 (The Mediator)

### 🔺 Advanced Analysis Features
- **Wing Analysis** - Detailed wing influence (e.g., 5w6 vs 5w4)
- **Tritype System** - Complete three-center analysis (e.g., 125 "The Mentor")
- **Relationship Insights** - Strengths, challenges, tips, and compatibility
- **Email Results** - Professional analysis delivered to your inbox

### 📈 Progress & Mastery Achievements
- **First Steps** 👣 - Make your first choice in the temple
- **Wisdom Seeker** 🧠 - Reach 50 Wisdom points through thoughtful choices
- **Brave Heart** ⚔️ - Reach 50 Courage points through bold decisions
- **Kind Soul** 💝 - Reach 50 Compassion points through caring choices
- **Treasure Hunter** 💎 - Collect 5 magical items during your quest
- **Level Master** ⭐ - Reach level 5 through experience and growth
- **Quest Complete** 🏁 - Finish your first complete adventure

### 🎮 Special Gameplay Achievements
- **Avatar Artist** 🎨 - Customize your avatar with unique style
- **Social Butterfly** 📱 - Share your results on social media
- **Supporter** ☕ - Support the creator through various means
 feedback and rate the game
- **Tour Guide** 🔍 - Complete the guided tutorial
- **Philosopher** 🤔 - Answer all philosophical dilemma questions

## 🆕 Latest Features

### Version 2.0 Enhancements
- **16 Questions Total** - Comprehensive personality assessment
- **Philosophical Scenarios** - Deep ethical dilemmas (trolley problem, authenticity challenges)
- **Tritype Analysis** - Complete analysis of Body/Heart/Head centers
- **Enhanced Relationships** - Detailed compatibility insights and growth tips
- **Professional Social Sharing** - Brand-accurate icons for all platforms
- **Email Results Delivery** - Automatic inbox delivery of personality analysis
- **Guided Tour System** - Interactive tutorial for new users
- **Performance Optimization** - Loading screens and adaptive quality
- **Enhanced Save System** - Multiple slots with export/import functionality

### User Experience Improvements
- **Progress Tracking** - Visual progress bar with step indicators
- **Smart Hints** - Helpful tips after periods of inactivity
- **Quick Actions** - Pause, journal, stats, and fullscreen access
- **Keyboard Shortcuts** - Full keyboard navigation support
- **Results Preview** - Shows leading type during gameplay
- **Connected Journal** - Unified journal system across all interfaces detailed feedback about your experience

## 🛠️ Technical Architecture & Details

### Technologies Used
- **HTML5** - Semantic structure with advanced accessibility features
- **CSS3** - Modern styling with complex animations and responsive design
- **Vanilla JavaScript ES6+** - No external dependencies, modular architecture
- **Web Audio API** - Professional audio system with multiple oscillators
- **Canvas API** - Advanced particle system with weather effects
- **Local Storage API** - Achievement persistence and game state saving
- **Clipboard API** - Modern sharing and copy functionality
- **Media Query API** - Dark mode and reduced motion support

### Browser Compatibility
- ✅ Chrome 60+
- ✅ Firefox 55+
- ✅ Safari 12+
- ✅ Edge 79+

### Performance Features
- **Lazy Loading** - Scenarios and assets loaded as needed
- **GPU-Accelerated Animations** - CSS transforms with hardware acceleration
- **Advanced Memory Management** - Proper cleanup of audio contexts, particles, and DOM elements
- **Optimized Particle System** - Efficient rendering with requestAnimationFrame
- **Modular Architecture** - Code splitting for better loading performance
- **Responsive Design** - Optimized for all screen sizes and devices
- **Audio Context Management** - Proper handling of Web Audio API lifecycle

## 🎨 Customization & Extension Guide

### 📝 Adding New Adventure Scenarios
```javascript
// In enneagram-data.js - Add to allScenarios array
const newScenario = {
    title: "The Mysterious Library",
    text: "You discover an ancient library with glowing books. Each book seems to call to you differently. Which do you choose?",
    choices: [
        { 
            text: "The perfectly organized manual of universal truths", 
            types: [1, 5] // Perfectionist and Investigator
        },
        { 
            text: "A warm, well-worn book of stories about helping others", 
            types: [2] // Helper
        },
        {
            text: "A golden book titled 'Secrets of Success and Achievement'",
            types: [3] // Achiever
        },
        {
            text: "A unique, artistic journal with beautiful, emotional poetry",
            types: [4] // Individualist
        }
        // Add 5-9 more choices for complete coverage
    ]
};

// Add to the scenarios array
allScenarios.push(newScenario);
```

### 🎭 Customizing Enneagram Type Descriptions
```javascript
// In enneagram-data.js - Modify existing types
enneagramTypes[1] = {
    title: "Type 1 - The Perfectionist",
    description: "You are principled, purposeful, self-controlled, and perfectionistic.",
    coreMotivation: "To be good, right, perfect, and to improve everything",
    basicFear: "Being corrupt, defective, or wrong",
    strengths: ["High standards", "Ethical", "Reliable", "Organized", "Self-disciplined"]
};
```

### 🎨 Visual Theme Customization
```css
/* Create custom-theme.css and include after other stylesheets */
:root {
    /* Primary color scheme */
    --primary-color: #your-brand-color;
    --secondary-color: #your-accent-color;
    --background-gradient: linear-gradient(135deg, #color1, #color2);
    
    /* Typography */
    --main-font: 'Your-Font', serif;
    --ui-font: 'Your-UI-Font', sans-serif;
    
    /* Spacing and sizing */
    --border-radius: 15px;
    --shadow-color: rgba(0, 0, 0, 0.2);
}

/* Custom avatar styles */
.avatar-sprite.custom-style {
    background: linear-gradient(45deg, #your-color1, #your-color2);
    border-radius: 30% 70% 70% 30% / 30% 30% 70% 70%;
}
```

### 🔊 Adding Custom Audio Themes
```javascript
// In immersive-audio.js - Add new personality themes
createCustomTheme() {
    // Your custom musical theme for a personality type
    const notes = [261.6, 329.6, 392.0]; // C4, E4, G4
    this.playChord(notes, 1.0, 'sine', 0.05);
}

// Add to personalityThemes object
this.personalityThemes[10] = () => this.createCustomTheme();
```

### 🏆 Creating Custom Achievements
```javascript
// In achievements.js - Add to achievements object
const customAchievements = {
    'custom_achievement': {
        name: 'Custom Achievement',
        description: 'Complete a custom challenge',
        icon: '🌟',
        unlocked: false
    }
};

// Merge with existing achievements
Object.assign(achievements, customAchievements);
```

### 🌦️ Adding Weather Effects
```javascript
// In advanced-features.js - Add new weather type
this.weatherEffects.push('aurora'); // Add to weather array

// Create the effect in createWeatherEffect method
case 'aurora':
    // Your custom aurora particle effect
    particle.className = 'weather-particle aurora-particle';
    break;
```

### 📱 Customizing Social Sharing
```javascript
// In social-sharing.js - Modify sharing templates
shareToCustomPlatform() {
    const text = `Custom sharing message for your platform`;
    const url = `https://your-custom-platform.com/share?text=${encodeURIComponent(text)}`;
    window.open(url, '_blank');
}
```

## 🤝 Contributing to Enneagram Quest

We welcome contributions from developers, designers, psychologists, and personality enthusiasts!

### 🐛 Bug Reports
- **GitHub Issues** - Report bugs with detailed information
- **Browser Compatibility** - Include browser version and OS
- **Screenshots/Videos** - Visual evidence helps tremendously
- **Console Logs** - Include any error messages
- **Reproduction Steps** - Clear steps to reproduce the issue

### 💡 Feature Requests
- **New Scenarios** - Suggest adventure-based personality questions
- **Game Mechanics** - Propose new RPG elements or systems
- **Accessibility** - Improvements for users with disabilities
- **Visual Enhancements** - UI/UX improvements and animations
- **Audio Features** - Sound design and musical suggestions
- **Personality Insights** - Enneagram expertise and improvements

### 🔧 Development Contributions
1. **Fork** the repository on GitHub
2. **Clone** your fork locally
3. **Create** a feature branch (`git checkout -b feature/amazing-feature`)
4. **Develop** your feature with proper testing
5. **Commit** with descriptive messages (`git commit -m 'Add amazing feature'`)
6. **Push** to your branch (`git push origin feature/amazing-feature`)
7. **Submit** a Pull Request with detailed description

### 📋 Development Guidelines
- **Accessibility First** - Maintain WCAG 2.1 AA standards
- **Cross-Browser Testing** - Test on Chrome, Firefox, Safari, Edge
- **Mobile Responsive** - Ensure functionality on all devices
- **Code Quality** - Clean, readable, well-commented code
- **Performance** - Optimize for speed and memory usage
- **Documentation** - Update README and code comments
- **Modular Design** - Follow existing architecture patterns

### 🎨 Design Contributions
- **UI/UX Improvements** - Better user experience design
- **Visual Assets** - Icons, illustrations, animations
- **Color Schemes** - Accessibility-compliant color palettes
- **Typography** - Font choices and text hierarchy
- **Responsive Design** - Mobile-first design principles

### 🧠 Content Contributions
- **Scenario Writing** - New adventure-based questions
- **Enneagram Expertise** - Personality type insights
- **Localization** - Translations to other languages
- **Accessibility Testing** - Testing with assistive technologies
- **User Experience Testing** - Feedback on game flow and usability

## 📊 Game Analytics & Insights

### 🎮 Engagement Metrics (Privacy-Compliant)
- **Completion Rates** - Percentage of users finishing the full quest
- **Scenario Popularity** - Most engaging adventure scenarios
- **Achievement Unlock Rates** - Progress through the achievement system
- **Return Patterns** - User retention and replayability metrics
- **Feature Usage** - Most popular customization and social features
- **Difficulty Preferences** - Distribution across Easy/Normal/Hard modes

### 🎭 Personality Insights
- **Type Distribution** - Frequency of each Enneagram type discovery
- **Choice Patterns** - Analysis of decision-making preferences
- **Scenario Effectiveness** - Questions that best differentiate types
- **Personality Balance** - Users with multiple strong type indicators
- **Growth Tracking** - Stat development patterns (Wisdom/Courage/Compassion)

### 🔍 Technical Performance
- **Load Times** - Game initialization and asset loading speeds
- **Browser Compatibility** - Performance across different browsers
- **Mobile Performance** - Touch interface and responsive design metrics
- **Audio System** - Web Audio API compatibility and performance
- **Memory Usage** - Particle system and animation efficiency

### 📱 Social Engagement
- **Sharing Rates** - Social media sharing frequency by platform
- **Creator Support** - Community support and contribution metrics
- **Feedback Quality** - User rating and review analysis
- **Community Growth** - Social media follower and engagement growth

## 🔒 Privacy & Data Protection

### Data Collection Philosophy
- **Local Storage Only** - All user data remains on their device
- **Zero Tracking** - No analytics, cookies, or user tracking
- **No Personal Information** - Game doesn't collect or store personal data
- **Achievement Data** - Stored locally, user-controlled deletion
- **Game State** - Save files remain on user's device only
- **Customization Settings** - Avatar and preferences stored locally

### Privacy Compliance
- **GDPR Compliant** - No data transmission to external servers
- **CCPA Compliant** - No personal information collection
- **Cookie-Free** - No tracking cookies or persistent identifiers
- **User Control** - Complete data ownership and deletion rights
- **Transparent** - Open source code for full transparency

## 🚀 Deployment

### GitHub Pages
1. Push your code to a GitHub repository
2. Go to repository Settings → Pages
3. Select source branch (usually `main`)
4. Your game will be available at `https://wrek34.github.io/Enneagram-Quest`

### Netlify
1. Connect your GitHub repository to Netlify
2. Set build command: (none needed for static site)
3. Set publish directory: `/` (root)
4. Deploy automatically on git push

### Custom Domain
1. Add CNAME file with your domain
2. Configure DNS settings with your provider
3. Enable HTTPS in your hosting platform

## 🚀 Current Feature Set (50+ Features)

### 🎮 Gameplay Features (15+)
- Dynamic scenario randomization
- Multiple difficulty modes
- Save/load game system
- Quest journal with history
- Personality compass navigation
- Mood tracking system
- Progress celebrations
- Milestone notifications
- Experience point system
- Multi-level progression
- Random item discovery
- Achievement unlocking
- Choice consequence tracking
- Personality hint system
- Narrative response system

### 🎨 Visual Features (15+)
- Advanced avatar customization
- Dynamic background changes
- Weather effect system
- Particle system animations
- Smooth screen transitions
- Typing effect animations
- Staggered choice animations
- Level-up celebrations
- Fireworks completion effects
- Floating message system
- Progress bar animations
- Character sprite animations
- Hover effect particles
- Visual feedback system
- Dark mode support

### 🎵 Audio Features (10+)
- Personality-based musical themes
- Ambient soundscape system
- Professional UI sound effects
- Background music layers
- Volume control system
- Audio context management
- Sound toggle functionality
- Achievement sound effects
- Level-up audio celebrations
- Atmospheric audio design

### 🌐 Social Features (10+)
- Multi-platform sharing (Twitter, Facebook, LinkedIn)
- Email sharing with templates
- Copy link functionality
- Creator support integration
- Feedback and rating system
- Social media follow buttons
- Results sharing templates
- Community engagement tools
- GitHub integration
- Creator platform links

## 📈 Future Enhancements

### Planned Features
- **Multiplayer Mode** - Real-time personality comparison with friends
- **Extended Scenarios** - 50+ additional adventure paths and endings
- **AI-Powered Insights** - Personalized growth recommendations
- **Mobile App** - Native iOS and Android applications
- **VR Experience** - Virtual reality personality exploration
- **Detailed Analytics** - Personal growth tracking and insights
- **Localization** - Multiple language support
- **API Integration** - Connect with other personality tools Native iOS/Android versions

### Advanced Features
- **AI-Powered Scenarios** - Dynamic content generation
- **Voice Narration** - Audio storytelling option
- **VR Support** - Immersive virtual reality experience
- **Localization** - Multiple language support

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

![GitHub stars](https://img.shields.io/github/stars/wrek34/Enneagram-Quest?style=social)
![GitHub forks](https://img.shields.io/github/forks/wrek34/Enneagram-Quest?style=social)
![GitHub issues](https://img.shields.io/github/issues/wrek34/Enneagram-Quest)
![GitHub license](https://img.shields.io/github/license/wrek34/Enneagram-Quest)

## 💝 Support Enneagram Quest

### 🌟 Ways to Support
- **⭐ Star the Repository** - Show your appreciation on GitHub
- **📱 Share with Friends** - Help others discover their personality type
- **☕ Buy Me a Coffee** - Support development with a small donation
- **🎨 Become a Patron** - Monthly support for continuous improvements
- **💬 Leave Feedback** - Help us improve with your suggestions
- **🐛 Report Bugs** - Help us maintain quality and fix issues
- **🔧 Contribute Code** - Join our development community

### 🏆 Recognition

**Special Thanks To:**
- The Enneagram Institute for personality type research
- Web Accessibility Initiative for accessibility guidelines
- Open source community for inspiration and best practices
- Beta testers and early adopters for valuable feedback
- Contributors who help improve the game continuously

### 📞 Connect With Us

- **🐦 Twitter**: [@EnneagramBeyond](https://twitter.com/enneagrambeyond)
- **📸 Instagram**: [@EnneagramAndBeyond](https://instagram.com/enneagramandbeyond)
- **💼 LinkedIn**: [Enneagram and Beyond](https://linkedin.com/company/enneagramandbeyond)
- **📧 Email**: [hello@enneagramandbeyond.com](mailto:hello@enneagramandbeyond.com)
- **🌐 Website**: [EnneagramAndBeyond.com](https://enneagramandbeyond.com)

---

**Created with ❤️ by Enneagram and Beyond**

*Discover your true self through adventure! Transform personality assessment into an epic quest of self-discovery.*

**© 2024 Enneagram and Beyond. All rights reserved.**

*"The cave you fear to enter holds the treasure you seek." - Joseph Campbell*

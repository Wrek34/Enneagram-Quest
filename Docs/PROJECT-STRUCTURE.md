# 📁 Enneagram Quest - Project Structure

## Current File Organization

### 🎯 Core Game Files
- `index.html` - Main HTML file
- `enneagram-data.js` - Core personality types and basic scenarios
- `enhanced-scenarios.js` - Advanced scenarios with moral/ethical complexity
- `debug-game.js` - Main game engine with debugging capabilities
- `enneagram-wings.js` - Wing system for detailed personality analysis

### 🎨 Styling Files
- `styles.css` - Base styles and layout
- `game-styles.css` - Game-specific visual enhancements
- `achievement-styles.css` - Achievement system styling
- `enhanced-styles.css` - Enhanced features styling
- `advanced-styles.css` - Advanced features styling
- `wings-styles.css` - Wing analysis results styling
- `simple-fantasy-styles.css` - Fantasy avatar customization
- `email-signup-styles.css` - Email signup and expert consultation
- `simple-sharing-styles.css` - Social sharing modal
- `volume-control-styles.css` - Audio control styling

### 🚀 Feature Modules
- `achievements.js` - Achievement system logic
- `enhanced-features.js` - Save system, difficulty modes, insights
- `enhanced-experience.js` - Animations, typing effects, celebrations
- `advanced-features.js` - Weather, journal, compass, mood system
- `immersive-audio.js` - Professional audio system with personality themes

### 🎭 User Interface
- `simple-fantasy-avatar.js` - Fantasy book-style avatar customization
- `social-sharing.js` - Comprehensive social media sharing
- `email-signup.js` - Email signup with results delivery
- `simple-sharing.js` - Quick sharing modal system

### 📚 Documentation
- `README.md` - Comprehensive project documentation
- `DEPLOYMENT-GUIDE.md` - Step-by-step deployment instructions
- `PROJECT-STRUCTURE.md` - This file
- `LICENSE` - MIT License

### 🗂️ Legacy Files (Can be removed)
- `game.js` - Original base game class
- `game-enhanced.js` - Enhanced game version (superseded)
- `enhanced-avatar.js` - Old avatar system (replaced)
- `revamped-avatar.js` - Revamped avatar system (replaced)
- `revamped-avatar-styles.css` - Old avatar styles
- `social-avatar-styles.css` - Legacy social/avatar styles

## 🎯 Recommended Organization

For better maintainability, consider organizing files into folders:

```
enneagram-quest/
├── index.html
├── README.md
├── LICENSE
├── DEPLOYMENT-GUIDE.md
├── PROJECT-STRUCTURE.md
├── css/
│   ├── styles.css
│   ├── game-styles.css
│   ├── achievement-styles.css
│   ├── enhanced-styles.css
│   ├── advanced-styles.css
│   ├── wings-styles.css
│   ├── simple-fantasy-styles.css
│   ├── email-signup-styles.css
│   ├── simple-sharing-styles.css
│   └── volume-control-styles.css
├── js/
│   ├── core/
│   │   ├── enneagram-data.js
│   │   ├── enhanced-scenarios.js
│   │   ├── debug-game.js
│   │   └── enneagram-wings.js
│   ├── features/
│   │   ├── achievements.js
│   │   ├── enhanced-features.js
│   │   ├── enhanced-experience.js
│   │   ├── advanced-features.js
│   │   └── immersive-audio.js
│   ├── ui/
│   │   ├── simple-fantasy-avatar.js
│   │   ├── social-sharing.js
│   │   ├── email-signup.js
│   │   └── simple-sharing.js
│   └── legacy/
│       ├── game.js
│       ├── game-enhanced.js
│       ├── enhanced-avatar.js
│       └── revamped-avatar.js
└── assets/
    └── (future images, sounds, etc.)
```

## 🔧 File Dependencies

### Core Dependencies
1. `enneagram-data.js` → `enhanced-scenarios.js`
2. `debug-game.js` → `enneagram-data.js`, `enhanced-scenarios.js`
3. `enneagram-wings.js` → `debug-game.js`

### Feature Dependencies
1. `achievements.js` → `debug-game.js`
2. `enhanced-features.js` → `debug-game.js`
3. `advanced-features.js` → `debug-game.js`
4. `immersive-audio.js` → `debug-game.js`

### UI Dependencies
1. `simple-fantasy-avatar.js` → `debug-game.js`
2. `social-sharing.js` → `debug-game.js`, `enneagram-wings.js`
3. `email-signup.js` → `debug-game.js`, `enneagram-wings.js`
4. `simple-sharing.js` → `debug-game.js`

## 📊 File Sizes & Performance

### Large Files (>10KB)
- `enneagram-data.js` + `enhanced-scenarios.js` - Scenario content
- `debug-game.js` - Main game engine
- `advanced-features.js` - Multiple feature systems
- `immersive-audio.js` - Audio system with themes

### Optimization Opportunities
1. **Lazy Loading**: Load scenarios as needed
2. **Code Splitting**: Separate core from features
3. **Minification**: Compress for production
4. **Asset Optimization**: Optimize any future images/audio

## 🧹 Cleanup Recommendations

### Files to Remove
- `game.js` (superseded by debug-game.js)
- `game-enhanced.js` (superseded by debug-game.js)
- `enhanced-avatar.js` (replaced by simple-fantasy-avatar.js)
- `revamped-avatar.js` (replaced by simple-fantasy-avatar.js)
- `revamped-avatar-styles.css` (no longer used)
- `social-avatar-styles.css` (consolidated into other files)

### Files to Keep
- All current active files are being used
- Legacy files can be moved to `/legacy` folder for reference

## 🚀 Future Enhancements

### Potential New Files
- `config.js` - Game configuration settings
- `utils.js` - Shared utility functions
- `analytics.js` - User behavior tracking
- `api.js` - Backend integration for email/data
- `tests/` - Unit and integration tests

### Modularization
- Split large files into smaller, focused modules
- Create shared constants file
- Implement proper module imports/exports
- Add TypeScript definitions for better development experience
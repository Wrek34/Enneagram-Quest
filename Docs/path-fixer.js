// Path Fixer for Docs folder structure
document.addEventListener('DOMContentLoaded', () => {
    // Fix script paths
    const scriptPaths = [
        'enneagram-data.js',
        'enhanced-scenarios.js',
        'achievements.js',
        'enhanced-features.js',
        'debug-game.js',
        'enhanced-experience.js',
        'advanced-features.js',
        'immersive-audio.js',
        'social-sharing.js',
        'simple-fantasy-avatar.js',
        'enneagram-wings.js',
        'tritype-system.js',
        'email-signup.js',
        'simple-sharing.js',
        'ux-enhancements.js'
    ];
    
    // Fix CSS paths
    const cssPaths = [
        'styles.css',
        'game-styles.css',
        'achievement-styles.css',
        'enhanced-styles.css',
        'advanced-styles.css',
        'volume-control-styles.css',
        'social-avatar-styles.css',
        'wings-styles.css',
        'tritype-styles.css',
        'simple-fantasy-styles.css',
        'email-signup-styles.css',
        'simple-sharing-styles.css',
        'ux-styles.css'
    ];
    
    // Fix script paths
    document.querySelectorAll('script').forEach(script => {
        const src = script.getAttribute('src');
        if (src && scriptPaths.includes(src)) {
            // If we're in the Docs folder, we need to adjust the path
            if (window.location.pathname.includes('/Docs/')) {
                script.setAttribute('src', src);
            } else {
                script.setAttribute('src', 'Docs/' + src);
            }
        }
    });
    
    // Fix CSS paths
    document.querySelectorAll('link[rel="stylesheet"]').forEach(link => {
        const href = link.getAttribute('href');
        if (href && cssPaths.includes(href)) {
            // If we're in the Docs folder, we need to adjust the path
            if (window.location.pathname.includes('/Docs/')) {
                link.setAttribute('href', href);
            } else {
                link.setAttribute('href', 'Docs/' + href);
            }
        }
    });
    
    console.log('🔧 Path fixer loaded - adjusted paths for Docs folder structure');
});
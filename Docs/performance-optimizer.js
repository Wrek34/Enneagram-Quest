// Performance Optimization System
class PerformanceOptimizer {
    constructor() {
        this.initializeOptimizations();
    }

    initializeOptimizations() {
        this.addLoadingScreen();
        this.optimizeImages();
        this.addLazyLoading();
        this.optimizeAnimations();
        this.addPreloadHints();
        this.monitorPerformance();
    }

    addLoadingScreen() {
        // Check if loading screen already exists
        if (document.getElementById('loading-screen')) {
            this.enhanceExistingLoadingScreen();
            return;
        }
        
        const loadingScreen = document.createElement('div');
        loadingScreen.className = 'loading-screen';
        loadingScreen.id = 'performance-loading';
        loadingScreen.innerHTML = `
            <div class="loading-content">
                <div class="loading-logo">🔮</div>
                <h2>Enneagram Quest</h2>
                <div class="loading-bar">
                    <div class="loading-progress" id="loading-progress"></div>
                </div>
                <p class="loading-text" id="loading-text">Awakening the Crystal Ball...</p>
            </div>
        `;
        
        document.body.appendChild(loadingScreen);
        
        // Simulate loading progress
        this.simulateLoading();
    }
    
    enhanceExistingLoadingScreen() {
        // Use existing loading screen and just simulate progress
        setTimeout(() => {
            this.simulateLoading();
        }, 100);
    }

    simulateLoading() {
        const progress = document.getElementById('loading-progress');
        const text = document.getElementById('loading-text');
        
        const steps = [
            { percent: 20, text: 'Awakening crystal energies...' },
            { percent: 40, text: 'Aligning personality centers...' },
            { percent: 60, text: 'Preparing mystical insights...' },
            { percent: 80, text: 'Activating crystal ball...' },
            { percent: 100, text: 'Crystal ball awakened!' }
        ];
        
        let currentStep = 0;
        
        const updateProgress = () => {
            if (currentStep < steps.length) {
                const step = steps[currentStep];
                progress.style.width = `${step.percent}%`;
                text.textContent = step.text;
                currentStep++;
                
                setTimeout(updateProgress, 500);
            } else {
                setTimeout(() => {
                    this.hideLoadingScreen();
                }, 800);
            }
        };
        
        setTimeout(updateProgress, 300);
    }

    hideLoadingScreen() {
        const loadingScreens = document.querySelectorAll('.loading-screen, #loading-screen');
        loadingScreens.forEach(loadingScreen => {
            if (loadingScreen) {
                loadingScreen.style.opacity = '0';
                loadingScreen.style.transition = 'opacity 0.5s ease';
                setTimeout(() => {
                    if (loadingScreen.parentNode) {
                        loadingScreen.parentNode.removeChild(loadingScreen);
                    }
                }, 500);
            }
        });
    }

    optimizeImages() {
        // Add lazy loading to images
        document.querySelectorAll('img').forEach(img => {
            if (!img.hasAttribute('loading')) {
                img.setAttribute('loading', 'lazy');
            }
        });
    }

    addLazyLoading() {
        // Lazy load non-critical features
        const lazyFeatures = [
            'social-sharing.js',
            'email-signup.js',
            'tritype-system.js'
        ];
        
        // Load these after initial game is ready
        setTimeout(() => {
            lazyFeatures.forEach(feature => {
                if (!document.querySelector(`script[src*="${feature}"]`)) {
                    const script = document.createElement('script');
                    script.src = feature;
                    script.async = true;
                    document.head.appendChild(script);
                }
            });
        }, 2000);
    }

    optimizeAnimations() {
        // Reduce animations for users who prefer reduced motion
        if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
            document.documentElement.style.setProperty('--animation-duration', '0.1s');
            document.documentElement.style.setProperty('--transition-duration', '0.1s');
        }
        
        // Pause animations when tab is not visible
        document.addEventListener('visibilitychange', () => {
            if (document.hidden) {
                document.body.classList.add('paused-animations');
            } else {
                document.body.classList.remove('paused-animations');
            }
        });
    }

    addPreloadHints() {
        // Preload critical resources
        const criticalResources = [
            'enneagram-data.js',
            'debug-game.js',
            'styles.css'
        ];
        
        criticalResources.forEach(resource => {
            const link = document.createElement('link');
            link.rel = 'preload';
            link.href = resource;
            link.as = resource.endsWith('.js') ? 'script' : 'style';
            document.head.appendChild(link);
        });
    }

    monitorPerformance() {
        // Monitor Core Web Vitals
        if ('web-vital' in window) {
            this.measureWebVitals();
        }
        
        // Monitor memory usage
        if (performance.memory) {
            setInterval(() => {
                this.checkMemoryUsage();
            }, 30000); // Check every 30 seconds
        }
        
        // Monitor frame rate
        this.monitorFrameRate();
    }

    measureWebVitals() {
        // Measure Largest Contentful Paint (LCP)
        new PerformanceObserver((entryList) => {
            const entries = entryList.getEntries();
            const lastEntry = entries[entries.length - 1];
            console.log('LCP:', lastEntry.startTime);
        }).observe({ entryTypes: ['largest-contentful-paint'] });
        
        // Measure First Input Delay (FID)
        new PerformanceObserver((entryList) => {
            const entries = entryList.getEntries();
            entries.forEach(entry => {
                console.log('FID:', entry.processingStart - entry.startTime);
            });
        }).observe({ entryTypes: ['first-input'] });
    }

    checkMemoryUsage() {
        if (performance.memory) {
            const memoryInfo = performance.memory;
            const usedPercent = (memoryInfo.usedJSHeapSize / memoryInfo.jsHeapSizeLimit) * 100;
            
            if (usedPercent > 80) {
                console.warn('High memory usage detected:', usedPercent.toFixed(2) + '%');
                this.optimizeMemory();
            }
        }
    }

    optimizeMemory() {
        // Clear unused data
        if (window.game) {
            // Clear old scenario data
            if (window.game.scenarioHistory && window.game.scenarioHistory.length > 20) {
                window.game.scenarioHistory = window.game.scenarioHistory.slice(-10);
            }
            
            // Clear old audio buffers
            if (window.audioSystem && window.audioSystem.clearUnusedBuffers) {
                window.audioSystem.clearUnusedBuffers();
            }
        }
        
        // Force garbage collection if available
        if (window.gc) {
            window.gc();
        }
    }

    monitorFrameRate() {
        let lastTime = performance.now();
        let frameCount = 0;
        let fps = 60;
        
        const measureFPS = (currentTime) => {
            frameCount++;
            
            if (currentTime - lastTime >= 1000) {
                fps = Math.round((frameCount * 1000) / (currentTime - lastTime));
                frameCount = 0;
                lastTime = currentTime;
                
                // Adjust quality based on FPS
                if (fps < 30) {
                    this.reduceQuality();
                } else if (fps > 55) {
                    this.increaseQuality();
                }
            }
            
            requestAnimationFrame(measureFPS);
        };
        
        requestAnimationFrame(measureFPS);
    }

    reduceQuality() {
        // Reduce visual effects for better performance
        document.body.classList.add('reduced-quality');
        
        // Disable particle effects
        document.querySelectorAll('.particle-effect').forEach(effect => {
            effect.style.display = 'none';
        });
        
        // Reduce animation complexity
        document.documentElement.style.setProperty('--animation-complexity', 'low');
    }

    increaseQuality() {
        // Restore full quality
        document.body.classList.remove('reduced-quality');
        
        // Re-enable particle effects
        document.querySelectorAll('.particle-effect').forEach(effect => {
            effect.style.display = '';
        });
        
        // Restore full animation complexity
        document.documentElement.style.setProperty('--animation-complexity', 'high');
    }

    // Public method to get performance metrics
    getPerformanceMetrics() {
        return {
            memory: performance.memory ? {
                used: Math.round(performance.memory.usedJSHeapSize / 1024 / 1024),
                total: Math.round(performance.memory.totalJSHeapSize / 1024 / 1024),
                limit: Math.round(performance.memory.jsHeapSizeLimit / 1024 / 1024)
            } : null,
            timing: performance.timing ? {
                loadTime: performance.timing.loadEventEnd - performance.timing.navigationStart,
                domReady: performance.timing.domContentLoadedEventEnd - performance.timing.navigationStart
            } : null
        };
    }
}

// Initialize performance optimizer
document.addEventListener('DOMContentLoaded', () => {
    new PerformanceOptimizer();
    console.log('⚡ Performance optimizer loaded');
});
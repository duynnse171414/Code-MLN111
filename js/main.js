// Main application initialization and coordination
class LyingFlatAnalysisApp {
    constructor() {
        this.visualEffects = null;
        this.performanceMonitor = null;
        this.isInitialized = false;
        this.init();
    }
    
    async init() {
        try {
            // Show loading animation
            this.showInitialLoading();
            
            // Initialize core systems
            await this.initializeSystems();
            
            // Load initial content
            this.loadInitialContent();
            
            // Setup event listeners
            this.setupEventListeners();
            
            // Initialize visual effects
            this.initializeEffects();
            
            // Setup accessibility features
            this.setupAccessibility();
            
            // Hide loading and show app
            this.hideInitialLoading();
            
            this.isInitialized = true;
            console.log('🎉 Application initialized successfully');
            
        } catch (error) {
            console.error('❌ Application initialization failed:', error);
            this.handleInitError(error);
        }
    }
    
    showInitialLoading() {
        const loader = document.createElement('div');
        loader.id = 'app-loader';
        loader.innerHTML = `
            <div style="position: fixed; top: 0; left: 0; width: 100%; height: 100%; 
                        background: linear-gradient(135deg, #667eea 0%, #764ba2 100%); 
                        display: flex; align-items: center; justify-content: center; 
                        z-index: 10000; color: white;">
                <div style="text-align: center;">
                    <div style="width: 60px; height: 60px; border: 4px solid rgba(255,255,255,0.3); 
                                border-top: 4px solid white; border-radius: 50%; 
                                animation: spin 1s linear infinite; margin: 0 auto 20px;"></div>
                    <h2>Đang khởi tạo ứng dụng...</h2>
                    <p>Phân tích trào lưu "Nằm yên mặc kệ đời"</p>
                </div>
            </div>
        `;
        
        document.body.appendChild(loader);
    }
    
    hideInitialLoading() {
        const loader = document.getElementById('app-loader');
        if (loader) {
            loader.style.opacity = '0';
            loader.style.transition = 'opacity 0.5s ease';
            setTimeout(() => {
                loader.remove();
            }, 500);
        }
    }
    
    async initializeSystems() {
        // Initialize performance monitoring
        this.performanceMonitor = new PerformanceMonitor();
        
        // Initialize navigation system
        initKeyboardNavigation();
        
        // Load saved progress
        loadProgress();
        
        // Setup progressive image loading
        setupProgressiveImageLoading();
        
        // Initialize theme system
        this.initializeTheme();
        
        // Setup error handling
        this.setupErrorHandling();
        
        console.log('✅ Core systems initialized');
    }
    
    loadInitialContent() {
        // Load intro content by default
        const introButton = document.querySelector('.nav-btn.active');
        if (introButton) {
            showSection('intro', introButton);
        }
        
        // Update progress bar
        updateProgressBar();
        
        console.log('✅ Initial content loaded');
    }
    
    setupEventListeners() {
        // Window events
        window.addEventListener('resize', this.handleResize.bind(this));
        window.addEventListener('beforeunload', this.handleBeforeUnload.bind(this));
        
        // Navigation events
        document.addEventListener('keydown', this.handleKeydown.bind(this));
        
        // Touch events for mobile
        this.setupTouchEvents();
        
        // Custom events
        document.addEventListener('sectionChange', this.handleSectionChange.bind(this));
        
        console.log('✅ Event listeners setup');
    }
    
    initializeEffects() {
        this.visualEffects = new VisualEffects();
        console.log('✅ Visual effects initialized');
    }
    
    setupAccessibility() {
        // Add ARIA labels
        document.querySelectorAll('.nav-btn').forEach((btn, index) => {
            btn.setAttribute('role', 'tab');
            btn.setAttribute('aria-selected', btn.classList.contains('active'));
            btn.setAttribute('tabindex', btn.classList.contains('active') ? '0' : '-1');
        });
        
        // Add skip links
        this.addSkipLinks();
        
        // Setup focus management
        this.setupFocusManagement();
        
        // Add screen reader announcements
        this.setupScreenReaderAnnouncements();
        
        console.log('✅ Accessibility features setup');
    }
    
    addSkipLinks() {
        const skipLink = document.createElement('a');
        skipLink.href = '#main-content';
        skipLink.textContent = 'Chuyển đến nội dung chính';
        skipLink.className = 'skip-link';
        skipLink.style.cssText = `
            position: absolute;
            top: -40px;
            left: 6px;
            background: #000;
            color: #fff;
            padding: 8px;
            text-decoration: none;
            z-index: 10000;
            border-radius: 4px;
        `;
        
        skipLink.addEventListener('focus', () => {
            skipLink.style.top = '6px';
        });
        
        skipLink.addEventListener('blur', () => {
            skipLink.style.top = '-40px';
        });
        
        document.body.insertBefore(skipLink, document.body.firstChild);
        
        // Add main content landmark
        const container = document.querySelector('.container');
        if (container) {
            container.setAttribute('id', 'main-content');
            container.setAttribute('role', 'main');
        }
    }
    
    setupFocusManagement() {
        // Trap focus in modal-like sections
        document.addEventListener('keydown', (e) => {
            if (e.key === 'Tab') {
                const focusableElements = document.querySelectorAll(
                    'button, [href], input, select, textarea, [tabindex]:not([tabindex="-1"])'
                );
                
                const firstElement = focusableElements[0];
                const lastElement = focusableElements[focusableElements.length - 1];
                
                if (e.shiftKey) {
                    if (document.activeElement === firstElement) {
                        e.preventDefault();
                        lastElement.focus();
                    }
                } else {
                    if (document.activeElement === lastElement) {
                        e.preventDefault();
                        firstElement.focus();
                    }
                }
            }
        });
    }
    
    setupScreenReaderAnnouncements() {
        // Create live region for announcements
        const liveRegion = document.createElement('div');
        liveRegion.setAttribute('aria-live', 'polite');
        liveRegion.setAttribute('aria-atomic', 'true');
        liveRegion.style.cssText = `
            position: absolute;
            left: -10000px;
            width: 1px;
            height: 1px;
            overflow: hidden;
        `;
        document.body.appendChild(liveRegion);
        
        this.announceToScreenReader = (message) => {
            liveRegion.textContent = message;
            setTimeout(() => {
                liveRegion.textContent = '';
            }, 1000);
        };
    }
    
    initializeTheme() {
        // Check for saved theme preference
        const savedTheme = window.savedTheme || 'light';
        document.body.classList.toggle('dark-theme', savedTheme === 'dark');
        
        // Add theme toggle button
        this.addThemeToggle();
    }
    
    addThemeToggle() {
        const themeToggle = document.createElement('button');
        themeToggle.innerHTML = '🌙';
        themeToggle.className = 'theme-toggle';
        themeToggle.style.cssText = `
            position: fixed;
            top: 20px;
            right: 20px;
            background: rgba(255, 255, 255, 0.2);
            border: none;
            border-radius: 50%;
            width: 50px;
            height: 50px;
            font-size: 20px;
            cursor: pointer;
            z-index: 1000;
            transition: all 0.3s ease;
        `;
        
        themeToggle.addEventListener('click', () => {
            const isDark = document.body.classList.toggle('dark-theme');
            themeToggle.innerHTML = isDark ? '☀️' : '🌙';
            window.savedTheme = isDark ? 'dark' : 'light';
            
            if (this.visualEffects) {
                this.visualEffects.createThemeTransition();
            }
            
            this.announceToScreenReader(
                `Chuyển sang chế độ ${isDark ? 'tối' : 'sáng'}`
            );
        });
        
        themeToggle.addEventListener('mouseenter', () => {
            themeToggle.style.transform = 'scale(1.1)';
            themeToggle.style.background = 'rgba(255, 255, 255, 0.3)';
        });
        
        themeToggle.addEventListener('mouseleave', () => {
            themeToggle.style.transform = 'scale(1)';
            themeToggle.style.background = 'rgba(255, 255, 255, 0.2)';
        });
        
        document.body.appendChild(themeToggle);
    }
    
    setupTouchEvents() {
        let touchStartX = 0;
        let touchEndX = 0;
        
        document.addEventListener('touchstart', (e) => {
            touchStartX = e.changedTouches[0].screenX;
        });
        
        document.addEventListener('touchend', (e) => {
            touchEndX = e.changedTouches[0].screenX;
            this.handleSwipe();
        });
        
        this.handleSwipe = () => {
            const swipeThreshold = 50;
            const diff = touchStartX - touchEndX;
            
            if (Math.abs(diff) > swipeThreshold) {
                const sections = ['intro', 'theory', 'analysis', 'examples', 'conclusion', 'quiz', 'ai-usage'];
                const currentIndex = sections.indexOf(currentSection);
                
                if (diff > 0 && currentIndex < sections.length - 1) {
                    // Swipe left - next section
                    const nextBtn = document.querySelectorAll('.nav-btn')[currentIndex + 1];
                    showSection(sections[currentIndex + 1], nextBtn);
                } else if (diff < 0 && currentIndex > 0) {
                    // Swipe right - previous section
                    const prevBtn = document.querySelectorAll('.nav-btn')[currentIndex - 1];
                    showSection(sections[currentIndex - 1], prevBtn);
                }
            }
        };
    }
    
    setupErrorHandling() {
        window.addEventListener('error', (e) => {
            console.error('Global error:', e.error);
            this.handleError(e.error);
        });
        
        window.addEventListener('unhandledrejection', (e) => {
            console.error('Unhandled promise rejection:', e.reason);
            this.handleError(e.reason);
        });
    }
    
    handleError(error) {
        // Create error notification
        const errorNotification = document.createElement('div');
        errorNotification.className = 'error-notification';
        errorNotification.innerHTML = `
            <div style="position: fixed; top: 20px; left: 50%; transform: translateX(-50%);
                        background: #f8d7da; border: 1px solid #f5c6cb; color: #721c24;
                        padding: 15px 20px; border-radius: 8px; z-index: 10000;
                        box-shadow: 0 4px 12px rgba(0,0,0,0.15);">
                <strong>⚠️ Có lỗi xảy ra:</strong><br>
                <small>${error.message || 'Lỗi không xác định'}</small>
                <button onclick="this.parentElement.parentElement.remove()" 
                        style="margin-left: 10px; background: none; border: none; 
                               color: #721c24; cursor: pointer;">✕</button>
            </div>
        `;
        
        document.body.appendChild(errorNotification);
        
        // Auto remove after 5 seconds
        setTimeout(() => {
            if (errorNotification.parentNode) {
                errorNotification.remove();
            }
        }, 5000);
    }
    
    handleInitError(error) {
        const errorScreen = document.createElement('div');
        errorScreen.innerHTML = `
            <div style="position: fixed; top: 0; left: 0; width: 100%; height: 100%;
                        background: #f8f9fa; display: flex; align-items: center; 
                        justify-content: center; z-index: 10000;">
                <div style="text-align: center; max-width: 400px; padding: 20px;">
                    <h2 style="color: #dc3545; margin-bottom: 20px;">❌ Lỗi khởi tạo</h2>
                    <p style="margin-bottom: 20px;">Không thể khởi tạo ứng dụng. Vui lòng thử lại.</p>
                    <button onclick="location.reload()" 
                            style="padding: 10px 20px; background: #007bff; color: white;
                                   border: none; border-radius: 5px; cursor: pointer;">
                        Tải lại trang
                    </button>
                </div>
            </div>
        `;
        
        document.body.appendChild(errorScreen);
    }
    
    handleResize() {
        // Recalculate layout on resize
        if (this.visualEffects) {
            this.visualEffects.initFloatingElements();
        }
        
        // Update responsive navigation
        this.updateResponsiveNavigation();
    }
    
    updateResponsiveNavigation() {
        const navigation = document.querySelector('.navigation');
        const buttons = navigation.querySelectorAll('.nav-btn');
        
        if (window.innerWidth <= 768) {
            buttons.forEach(btn => {
                btn.style.display = 'block';
                btn.style.width = '100%';
                btn.style.margin = '5px 0';
            });
        } else {
            buttons.forEach(btn => {
                btn.style.display = 'inline-block';
                btn.style.width = 'auto';
                btn.style.margin = '5px';
            });
        }
    }
    
    handleBeforeUnload(e) {
        // Save current progress
        saveProgress();
        saveQuizProgress();
        
        // Don't actually prevent unload, just save data
        return null;
    }
    
    handleKeydown(e) {
        // Global keyboard shortcuts
        if (e.ctrlKey || e.metaKey) {
            switch (e.key) {
                case 'h':
                    e.preventDefault();
                    showSection('intro', document.querySelector('.nav-btn'));
                    break;
                case 'q':
                    e.preventDefault();
                    const quizBtn = Array.from(document.querySelectorAll('.nav-btn'))
                        .find(btn => btn.textContent.includes('Kiểm tra'));
                    if (quizBtn) showSection('quiz', quizBtn);
                    break;
                case 'd':
                    e.preventDefault();
                    document.querySelector('.theme-toggle').click();
                    break;
            }
        }
        
        // Escape key to go back to intro
        if (e.key === 'Escape') {
            const introBtn = document.querySelector('.nav-btn');
            showSection('intro', introBtn);
        }
    }
    
    handleSectionChange(e) {
        const { section } = e.detail;
        
        // Announce section change to screen readers
        this.announceToScreenReader(`Đã chuyển đến phần ${section}`);
        
        // Update document title
        document.title = `${section} - Phân tích trào lưu "Nằm yên mặc kệ đời"`;
        
        // Track analytics (if needed)
        this.trackSectionView(section);
    }
    
    trackSectionView(section) {
        // Simple analytics tracking (could be expanded)
        const analytics = window.appAnalytics || (window.appAnalytics = {});
        analytics[section] = (analytics[section] || 0) + 1;
        
        console.log(`📊 Section "${section}" viewed ${analytics[section]} times`);
    }
    
    // Public API methods
    goToSection(sectionId) {
        const button = Array.from(document.querySelectorAll('.nav-btn'))
            .find(btn => btn.onclick.toString().includes(`'${sectionId}'`));
        if (button) {
            showSection(sectionId, button);
        }
    }
    
    getAppState() {
        return {
            currentSection,
            quizScore,
            quizAnswered,
            isInitialized: this.isInitialized,
            theme: document.body.classList.contains('dark-theme') ? 'dark' : 'light',
            metrics: this.performanceMonitor?.getMetrics() || {}
        };
    }
    
    reset() {
        // Reset all application state
        currentSection = 'intro';
        quizScore = 0;
        quizAnswered = 0;
        userAnswers = [];
        
        // Clear saved data
        window.appProgress = null;
        window.quizProgress = null;
        window.quizResults = [];
        
        // Go to intro
        this.goToSection('intro');
        
        this.announceToScreenReader('Ứng dụng đã được đặt lại');
    }
}

// Initialize application when DOM is ready
document.addEventListener('DOMContentLoaded', () => {
    window.app = new LyingFlatAnalysisApp();
});

// Expose global functions for backward compatibility
window.showSection = showSection;
window.selectAnswer = selectAnswer;
window.resetQuiz = resetQuiz;
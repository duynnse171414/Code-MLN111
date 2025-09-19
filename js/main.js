// Main application initialization and coordination
class LyingFlatAnalysisApp {
    constructor() {
        this.visualEffects = null;
        this.performanceMonitor = null;
        this.isInitialized = false;
        this.announceToScreenReader = (msg) => {}; // safe default
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
        // Inject keyframes for spin if missing
        const styleId = 'app-loader-style';
        if (!document.getElementById(styleId)) {
            const style = document.createElement('style');
            style.id = styleId;
            style.textContent = `
                @keyframes spin { 
                    0% { transform: rotate(0deg); } 
                    100% { transform: rotate(360deg); } 
                }
                .skip-link:focus { outline: 2px solid #fff; }
            `;
            document.head.appendChild(style);
        }

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
            loader.style.transition = 'opacity 0.5s ease';
            loader.style.opacity = '0';
            setTimeout(() => loader.remove(), 500);
        }
    }
    
    async initializeSystems() {
        // Initialize performance monitoring (optional)
        if (typeof PerformanceMonitor === 'function') {
            this.performanceMonitor = new PerformanceMonitor();
        }
        
        // Initialize navigation system
        if (typeof initKeyboardNavigation === 'function') {
            initKeyboardNavigation();
        }
        
        // Load saved progress
        if (typeof loadProgress === 'function') {
            loadProgress();
        }
        
        // Setup progressive image loading
        if (typeof setupProgressiveImageLoading === 'function') {
            setupProgressiveImageLoading();
        }
        
        // Initialize theme system
        this.initializeTheme();
        
        // Setup error handling
        this.setupErrorHandling();
        
        console.log('✅ Core systems initialized');
    }
    
    loadInitialContent() {
        // Load intro content by default
        const introButton = document.querySelector('.nav-btn.active') || document.querySelector('.nav-btn');
        if (introButton && typeof showSection === 'function') {
            showSection('intro', introButton);
        }
        
        // Update progress bar
        if (typeof updateProgressBar === 'function') {
            updateProgressBar();
        }
        
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
        if (typeof VisualEffects === 'function') {
            this.visualEffects = new VisualEffects();
            console.log('✅ Visual effects initialized');
        }
    }
    
    setupAccessibility() {
        // Add ARIA labels
        document.querySelectorAll('.nav-btn').forEach((btn) => {
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
            if (e.key !== 'Tab') return;
            
            const focusableElements = document.querySelectorAll(
                'button, [href], input, select, textarea, [tabindex]:not([tabindex="-1"])'
            );
            if (!focusableElements || focusableElements.length === 0) return;

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
            setTimeout(() => { liveRegion.textContent = ''; }, 1000);
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
        if (document.querySelector('.theme-toggle')) return; // avoid duplicates

        const themeToggle = document.createElement('button');
        themeToggle.innerHTML = document.body.classList.contains('dark-theme') ? '☀️' : '🌙';
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
            
            if (this.visualEffects && typeof this.visualEffects.createThemeTransition === 'function') {
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
            if (!e.changedTouches || !e.changedTouches[0]) return;
            touchStartX = e.changedTouches[0].screenX;
        }, { passive: true });
        
        document.addEventListener('touchend', (e) => {
            if (!e.changedTouches || !e.changedTouches[0]) return;
            touchEndX = e.changedTouches[0].screenX;
            this.handleSwipe(touchStartX, touchEndX);
        });
    }

    handleSwipe(touchStartX, touchEndX) {
        const swipeThreshold = 50;
        const diff = touchStartX - touchEndX;
        if (Math.abs(diff) <= swipeThreshold) return;

        const sections = ['intro', 'theory', 'analysis', 'examples', 'conclusion', 'quiz', 'ai-usage'];
        const current = (typeof currentSection !== 'undefined' && currentSection) ? currentSection : sections[0];
        const currentIndex = sections.indexOf(current);
        const navBtns = document.querySelectorAll('.nav-btn');

        if (diff > 0 && currentIndex < sections.length - 1) {
            // Swipe left - next section
            const nextBtn = navBtns[currentIndex + 1];
            if (typeof showSection === 'function') showSection(sections[currentIndex + 1], nextBtn);
        } else if (diff < 0 && currentIndex > 0) {
            // Swipe right - previous section
            const prevBtn = navBtns[currentIndex - 1];
            if (typeof showSection === 'function') showSection(sections[currentIndex - 1], prevBtn);
        }
    }
    
    setupErrorHandling() {
        window.addEventListener('error', (e) => {
            const err = e?.error || new Error(e?.message || 'Unknown error');
            console.error('Global error:', err);
            this.handleError(err);
        });
        
        window.addEventListener('unhandledrejection', (e) => {
            const reason = e?.reason instanceof Error ? e.reason : new Error(String(e?.reason || 'Unhandled rejection'));
            console.error('Unhandled promise rejection:', reason);
            this.handleError(reason);
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
                <small>${(error && (error.message || error.name)) || 'Lỗi không xác định'}</small>
                <button onclick="this.parentElement.parentElement.remove()" 
                        style="margin-left: 10px; background: none; border: none; 
                               color: #721c24; cursor: pointer;">✕</button>
            </div>
        `;
        
        document.body.appendChild(errorNotification);
        
        // Auto remove after 5 seconds
        setTimeout(() => {
            if (errorNotification.parentNode) errorNotification.remove();
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
        if (this.visualEffects && typeof this.visualEffects.initFloatingElements === 'function') {
            this.visualEffects.initFloatingElements();
        }
        
        // Update responsive navigation
        this.updateResponsiveNavigation();
    }
    
    updateResponsiveNavigation() {
        const navigation = document.querySelector('.navigation');
        if (!navigation) return;

        const buttons = navigation.querySelectorAll('.nav-btn');
        if (!buttons) return;
        
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
    
    handleBeforeUnload() {
        // Save current progress
        if (typeof saveProgress === 'function') saveProgress();
        if (typeof saveQuizProgress === 'function') saveQuizProgress();
        // Don't actually prevent unload, just save data
        return null;
    }
    
    handleKeydown(e) {
        // Global keyboard shortcuts
        if (e.ctrlKey || e.metaKey) {
            switch (e.key) {
                case 'h':
                    e.preventDefault();
                    if (typeof showSection === 'function') {
                        showSection('intro', document.querySelector('.nav-btn'));
                    }
                    break;
                case 'q':
                    e.preventDefault();
                    if (typeof showSection === 'function') {
                        const quizBtn = Array.from(document.querySelectorAll('.nav-btn'))
                            .find(btn => (btn.textContent || '').includes('Kiểm tra'));
                        showSection('quiz', quizBtn || document.querySelector('.nav-btn'));
                    }
                    break;
                case 'd':
                    e.preventDefault();
                    const t = document.querySelector('.theme-toggle');
                    if (t) t.click();
                    break;
            }
        }
        
        // Escape key to go back to intro
        if (e.key === 'Escape' && typeof showSection === 'function') {
            const introBtn = document.querySelector('.nav-btn');
            showSection('intro', introBtn);
        }
    }
    
    handleSectionChange(e) {
        const section = e?.detail?.section || '';
        
        // Announce section change to screen readers
        this.announceToScreenReader(`Đã chuyển đến phần ${section}`);
        
        // Update document title
        if (section) {
            document.title = `${section} - Phân tích trào lưu "Nằm yên mặc kệ đời"`;
        }
        
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
            .find(btn => {
                const fn = (btn.onclick || '').toString();
                return fn.includes(`'${sectionId}'`) || fn.includes(`"${sectionId}"`);
            });
        if (typeof showSection === 'function') {
            showSection(sectionId, button || document.querySelector('.nav-btn'));
        }
    }
    
    getAppState() {
        return {
            currentSection: (typeof currentSection !== 'undefined' && currentSection) ? currentSection : 'intro',
            quizScore: (typeof quizScore !== 'undefined') ? quizScore : 0,
            quizAnswered: (typeof quizAnswered !== 'undefined') ? quizAnswered : 0,
            isInitialized: this.isInitialized,
            theme: document.body.classList.contains('dark-theme') ? 'dark' : 'light',
            metrics: (this.performanceMonitor && typeof this.performanceMonitor.getMetrics === 'function')
                ? this.performanceMonitor.getMetrics()
                : {}
        };
    }
    
    reset() {
        // Reset all application state
        if (typeof currentSection !== 'undefined') currentSection = 'intro';
        if (typeof quizScore !== 'undefined') quizScore = 0;
        if (typeof quizAnswered !== 'undefined') quizAnswered = 0;
        if (typeof userAnswers !== 'undefined') userAnswers = [];
        
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

// Expose global functions for backward compatibility (guarded)
if (typeof showSection === 'function') window.showSection = showSection;
if (typeof selectAnswer === 'function') window.selectAnswer = selectAnswer;
if (typeof resetQuiz === 'function') window.resetQuiz = resetQuiz;

// Safe AI Games functions - avoid recursion
window.startMemoryGame = function() {
    const gameContainer = document.getElementById('memory-game');
    if (!gameContainer) {
        if (typeof showNotification === 'function') {
            showNotification('⚠️ Vui lòng vào trang AI Games trước', 'warning');
        } else {
            console.warn('AI Games container not found.');
        }
        return;
    }
    
    // Show game container
    gameContainer.style.display = 'block';
    const board = document.getElementById('memory-board');
    const stats = document.getElementById('memory-stats');
    const explanationsDiv = document.getElementById('memory-explanations');
    const explanationsContent = document.getElementById('explanations-content');
    const resultDiv = document.getElementById('memory-result');
    
    if (!board || !stats) {
        console.warn('Memory game elements missing.');
        return;
    }
    
    // Initialize game data with explanations
    const memoryCards = [
        { id: 1, text: "Nhận thức", pair: "Phản ánh",
          explanation: "Nhận thức và Phản ánh là cặp khái niệm cốt lõi trong LLCT. Nhận thức là quá trình phản ánh thế giới khách quan vào đầu óc con người. Không có nhận thức nào có thể tồn tại mà không phản ánh thực tại khách quan." },
        { id: 2, text: "Phản ánh", pair: "Nhận thức",
          explanation: "Phản ánh và Nhận thức có mối quan hệ mật thiết. Phản ánh là bản chất của nhận thức - mọi nhận thức đều là sự phản ánh của thế giới khách quan, từ cảm giác đơn giản nhất đến tư duy trừu tượng phức tạp." },
        { id: 3, text: "Cảm tính", pair: "Lý tính",
          explanation: "Cảm tính và Lý tính là hai cấp độ phát triển của nhận thức. Cảm tính (cảm giác, tri giác, biểu tượng) là bước đầu tiên, sau đó phát triển lên Lý tính (khái niệm, phán đoán, suy lý). Chúng thống nhất trong quá trình nhận thức hoàn chỉnh." },
        { id: 4, text: "Lý tính", pair: "Cảm tính",
          explanation: "Lý tính và Cảm tính tạo thành quy luật phát triển của nhận thức từ thấp lên cao. Lý tính không thể tồn tại mà không dựa trên cảm tính, nhưng lại vượt lên trên cảm tính để đạt được hiểu biết sâu sắc về bản chất sự vật." },
        { id: 5, text: "Thực tiễn", pair: "Kiểm nghiệm",
          explanation: "Thực tiễn và Kiểm nghiệm có mối liên hệ không thể tách rời. Thực tiễn là tiêu chuẩn duy nhất để kiểm nghiệm chân lý. Mọi kiến thức, lý thuyết đều phải được kiểm nghiệm qua thực tiễn để xác định tính đúng đắn." },
        { id: 6, text: "Kiểm nghiệm", pair: "Thực tiễn",
          explanation: "Kiểm nghiệm và Thực tiễn thể hiện vai trò quyết định của thực tiễn trong nhận thức. Chỉ có thực tiễn mới có thể kiểm nghiệm được tính đúng sai của nhận thức, vì thực tiễn là cầu nối giữa chủ quan và khách quan." },
        { id: 7, text: "Biện chứng", pair: "Mâu thuẫn",
          explanation: "Biện chứng và Mâu thuẫn là cặp khái niệm cơ bản của phương pháp luận Marxist. Tư duy biện chứng nhìn nhận mâu thuẫn như động lực của sự phát triển. Mâu thuẫn không phải là thứ cần tránh né mà là quy luật khách quan cần được nhận thức và giải quyết." },
        { id: 8, text: "Mâu thuẫn", pair: "Biện chứng",
          explanation: "Mâu thuẫn và Biện chứng cho thấy bản chất động của thực tại. Mâu thuẫn tồn tại trong mọi sự vật, hiện tượng và là nguồn gốc của sự vận động, phát triển. Tư duy biện chứng giúp ta nhận thức đúng đắn về mâu thuẫn và tìm cách giải quyết." }
    ];
    
    // Game state
    const gameState = {
        flipped: [],
        matched: [],
        moves: 0,
        startTime: Date.now(),
        explanations: []
    };
    
    // Reset explanations & result
    if (explanationsDiv && explanationsContent) {
        explanationsDiv.style.display = 'none';
        explanationsContent.innerHTML = '';
    }
    if (resultDiv) resultDiv.style.display = 'none';
    
    // Update stats
    function updateStats() {
        const elapsed = Math.floor((Date.now() - gameState.startTime) / 1000);
        if (stats) {
            stats.innerHTML = `⏱️ Thời gian: ${elapsed}s | 🎯 Lượt chơi: ${gameState.moves} | ✅ Đã ghép: ${gameState.matched.length / 2}/4 cặp`;
        }
    }
    
    // Show explanation for a matched pair
    function addExplanation(card1, card2) {
        if (!explanationsDiv || !explanationsContent) return;
        const found = memoryCards.find(c => c.id === parseInt(card1.dataset.cardId, 10));
        const explanation = found ? found.explanation : '';
        gameState.explanations.push({
            pair: `${card1.dataset.cardText} - ${card2.dataset.cardText}`,
            explanation
        });
        
        // Update explanations display
        explanationsContent.innerHTML = gameState.explanations.map((exp) => `
            <div style="margin: 15px 0; padding: 12px; background: white; border-radius: 8px; border-left: 4px solid #27ae60;">
                <h5 style="color: #27ae60; margin-bottom: 8px;">🔗 ${exp.pair}</h5>
                <p style="line-height: 1.5; color: #2c3e50; font-size: 14px;">${exp.explanation}</p>
            </div>
        `).join('');
        
        // Show explanations section
        explanationsDiv.style.display = 'block';
        
        // Scroll to explanation
        setTimeout(() => {
            explanationsDiv.scrollIntoView({ behavior: 'smooth', block: 'nearest' });
        }, 300);
    }
    
    // Shuffle cards
    const shuffledCards = [...memoryCards].sort(() => Math.random() - 0.5);
    
    // Create board
    board.innerHTML = '';
    board.style.cssText = 'display: grid; grid-template-columns: repeat(4, 1fr); gap: 10px; max-width: 400px; margin: 0 auto;';
    
    shuffledCards.forEach((card) => {
        const cardElement = document.createElement('div');
        cardElement.style.cssText = `
            background: linear-gradient(135deg, #3498db, #2980b9);
            border-radius: 8px;
            padding: 15px;
            text-align: center;
            cursor: pointer;
            transition: all 0.3s ease;
            user-select: none;
            min-height: 80px;
            display: flex;
            align-items: center;
            justify-content: center;
            font-weight: bold;
            color: white;
            font-size: 14px;
            box-shadow: 0 4px 8px rgba(0,0,0,0.1);
        `;
        
        cardElement.innerHTML = '<div>?</div>';
        cardElement.dataset.cardId = String(card.id);
        cardElement.dataset.cardText = card.text;
        cardElement.dataset.cardPair = card.pair;
        
        cardElement.addEventListener('click', function() {
            // Prevent multiple clicks
            if (gameState.flipped.length >= 2 || 
                gameState.flipped.includes(this) ||
                gameState.matched.includes(parseInt(cardElement.dataset.cardId, 10)) ||
                this.classList.contains('flipped')) {
                return;
            }
            
            // Flip card
            this.style.background = 'linear-gradient(135deg, #e74c3c, #c0392b)';
            this.innerHTML = `<div>${card.text}</div>`;
            this.classList.add('flipped');
            this.style.transform = 'scale(1.05)';
            
            gameState.flipped.push(this);
            gameState.moves++;
            
            // Check for match when 2 cards are flipped
            if (gameState.flipped.length === 2) {
                setTimeout(() => {
                    const [card1, card2] = gameState.flipped;
                    const card1Text = card1.dataset.cardText;
                    const card1Pair = card1.dataset.cardPair;
                    const card2Text = card2.dataset.cardText;
                    const isMatch = (card1Pair === card2Text) || (card2.dataset.cardPair === card1Text);

                    if (isMatch) {
                        // Match found
                        [card1, card2].forEach((el) => {
                            el.style.background = 'linear-gradient(135deg, #27ae60, #229954)';
                            el.style.pointerEvents = 'none';
                            el.style.transform = 'scale(1)';
                            el.style.boxShadow = '0 0 20px #27ae60';
                        });
                        
                        gameState.matched.push(parseInt(card1.dataset.cardId, 10), parseInt(card2.dataset.cardId, 10));
                        
                        // Show explanation for this pair
                        addExplanation(card1, card2);
                        
                        // Check if game complete
                        if (gameState.matched.length === memoryCards.length) {
                            setTimeout(() => {
                                const elapsed = Math.floor((Date.now() - gameState.startTime) / 1000);
                                const performance = (elapsed < 45 && gameState.moves < 15) ? '🏆 Xuất sắc!' : 
                                                    (elapsed < 90 && gameState.moves < 25) ? '🎉 Rất tốt!' : '👍 Tốt lắm!';
                                
                                if (resultDiv) {
                                    resultDiv.innerHTML = `
                                        <div style="background: #d4edda; padding: 20px; border-radius: 12px; border: 2px solid #28a745; text-align: center; box-shadow: 0 5px 15px rgba(40, 167, 69, 0.3);">
                                            <h4 style="color: #155724; margin-bottom: 10px;">${performance}</h4>
                                            <p style="color: #155724; margin-bottom: 15px;">
                                                <strong>Hoàn thành trong ${elapsed} giây với ${gameState.moves} lượt chơi!</strong>
                                            </p>
                                            <p style="color: #155724; margin-bottom: 15px; font-size: 14px;">
                                                🎓 Bạn đã học được ${gameState.explanations.length} mối liên hệ quan trọng trong LLCT!
                                            </p>
                                            <button onclick="window.startMemoryGame()" style="background: #28a745; color: white; border: none; padding: 12px 25px; border-radius: 8px; cursor: pointer; margin-top: 10px; font-weight: bold; box-shadow: 0 4px 8px rgba(40, 167, 69, 0.3);">
                                                🔄 Chơi lại để ôn tập
                                            </button>
                                        </div>
                                    `;
                                    resultDiv.style.display = 'block';
                                    setTimeout(() => {
                                        resultDiv.scrollIntoView({ behavior: 'smooth', block: 'center' });
                                    }, 300);
                                }
                            }, 800);
                        }
                    } else {
                        // No match - flip back
                        setTimeout(() => {
                            [card1, card2].forEach((el) => {
                                el.style.background = 'linear-gradient(135deg, #3498db, #2980b9)';
                                el.innerHTML = '<div>?</div>';
                                el.classList.remove('flipped');
                                el.style.transform = 'scale(1)';
                                el.style.boxShadow = '0 4px 8px rgba(0,0,0,0.1)';
                            });
                        }, 800);
                    }
                    
                    gameState.flipped = [];
                    updateStats();
                }, 200); // small delay to allow flip animation
            }
            
            updateStats();
        });
        
        board.appendChild(cardElement);
    });
    
    // Initial stats update
    updateStats();
    
    // Update stats every second
    const statsInterval = setInterval(() => {
        if (gameState.matched.length === memoryCards.length) {
            clearInterval(statsInterval);
        } else {
            updateStats();
        }
    }, 1000);
};

// Loại bỏ các functions không cần thiết
window.generateWordCloud = function() {
    if (typeof showNotification === 'function') {
        showNotification('Tính năng này đã được loại bỏ', 'info');
    } else {
        console.info('Tính năng này đã được loại bỏ');
    }
};

window.generateStory = function() {
    if (typeof showNotification === 'function') {
        showNotification('Tính năng này đã được loại bỏ', 'info');
    } else {
        console.info('Tính năng này đã được loại bỏ');
    }
};

window.sendMessage = function() {
    if (typeof showNotification === 'function') {
        showNotification('Tính năng này đã được loại bỏ', 'info');
    } else {
        console.info('Tính năng này đã được loại bỏ');
    }
};

// Global function to access AI Games  
window.goToAIGames = function() {
    const aiGamesBtn = Array.from(document.querySelectorAll('.nav-btn'))
        .find(btn => (btn.textContent || '').includes('AI Games'));
    
    if (typeof showSection === 'function') {
        showSection('aiFeatures', aiGamesBtn || document.querySelector('.nav-btn'));
    }
    
    window.scrollTo({ top: 0, behavior: 'smooth' });
    
    if (typeof showNotification === 'function') {
        showNotification('🎮 Chào mừng đến AI Games!', 'success');
    }
};

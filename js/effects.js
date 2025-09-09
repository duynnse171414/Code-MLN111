// Visual effects and interactions
class VisualEffects {
    constructor() {
        this._ensureBaseStyles();
        this.initFloatingElements();
        this.initHoverEffects();
        this.initScrollEffects();
        this.initParticleSystem();
    }

    // ---------- Floating elements ----------
    initFloatingElements() {
        const floatElements = document.querySelectorAll('.float-element');
        floatElements.forEach((el, index) => {
            el.style.animationDelay = (index * 1.5) + 's';

            // Cache initial transform so we don't keep concatenating strings
            if (!el.dataset.baseTransform) {
                el.dataset.baseTransform = getComputedStyle(el).transform === 'none' ? '' : getComputedStyle(el).transform;
            }

            this.addRandomMovement(el);
        });
    }

    addRandomMovement(element) {
        const tick = () => {
            if (window.innerWidth > 768) {
                const randomX = (Math.random() - 0.5) * 20;
                const randomY = (Math.random() - 0.5) * 20;

                element.style.transition = 'transform 1.8s ease';
                element.style.transform = `${element.dataset.baseTransform} translate(${randomX}px, ${randomY}px)`;

                setTimeout(() => {
                    element.style.transform = element.dataset.baseTransform || '';
                }, 2000);
            }
            element._vf_timer = setTimeout(tick, 5000 + Math.random() * 3000);
        };
        tick();
    }

    // ---------- Hover effects ----------
    initHoverEffects() {
        const boxes = document.querySelectorAll('.theory-box, .example-box, .conclusion-box');

        boxes.forEach(box => {
            box.addEventListener('mouseenter', (e) => {
                this.addGlowEffect(e.currentTarget);
                this.createRippleEffect(e);
            });

            box.addEventListener('mouseleave', (e) => {
                this.removeGlowEffect(e.currentTarget);
            });
        });

        const buttons = document.querySelectorAll('.nav-btn');
        buttons.forEach(button => {
            // Ensure positioning context for sparkles
            if (getComputedStyle(button).position === 'static') {
                button.style.position = 'relative';
            }
            button.addEventListener('mouseenter', () => {
                this.createButtonSparkles(button);
            });
        });
    }

    addGlowEffect(element) {
        element.style.transition = 'transform 0.3s ease, box-shadow 0.3s ease';
        element.style.transform = 'translateY(-5px) scale(1.02)';
        element.style.boxShadow = '0 20px 40px rgba(0, 0, 0, 0.15), 0 0 20px rgba(52, 152, 219, 0.3)';
    }

    removeGlowEffect(element) {
        element.style.transform = 'translateY(0) scale(1)';
        element.style.boxShadow = '0 5px 15px rgba(0, 0, 0, 0.1)';
    }

    createRippleEffect(e) {
        const el = e.currentTarget;
        const rect = el.getBoundingClientRect();
        const ripple = document.createElement('div');

        const size = 60;
        const x = e.clientX - rect.left - size / 2;
        const y = e.clientY - rect.top - size / 2;

        ripple.style.width = ripple.style.height = size + 'px';
        ripple.style.left = x + 'px';
        ripple.style.top = y + 'px';
        ripple.classList.add('ripple');

        // styles once
        if (!document.getElementById('ripple-styles')) {
            const style = document.createElement('style');
            style.id = 'ripple-styles';
            style.textContent = `
                .ripple {
                    position: absolute;
                    border-radius: 50%;
                    background: rgba(52, 152, 219, 0.3);
                    transform: scale(0);
                    animation: ripple-animation 0.6s ease-out;
                    pointer-events: none;
                    z-index: 1;
                }
                @keyframes ripple-animation {
                    to { transform: scale(4); opacity: 0; }
                }
            `;
            document.head.appendChild(style);
        }

        // prepare container
        const prevPos = getComputedStyle(el).position;
        if (prevPos === 'static') el.style.position = 'relative';
        el.style.overflow = 'hidden';

        el.appendChild(ripple);
        setTimeout(() => ripple.remove(), 600);
    }

    createButtonSparkles(button) {
        for (let i = 0; i < 3; i++) {
            setTimeout(() => {
                const sparkle = document.createElement('div');
                sparkle.style.position = 'absolute';
                sparkle.style.width = '4px';
                sparkle.style.height = '4px';
                sparkle.style.background = '#fff';
                sparkle.style.borderRadius = '50%';
                sparkle.style.pointerEvents = 'none';
                sparkle.style.zIndex = '1000';

                const rect = button.getBoundingClientRect();
                const x = Math.random() * rect.width;
                const y = Math.random() * rect.height;

                sparkle.style.left = `${x}px`;
                sparkle.style.top = `${y}px`;

                button.appendChild(sparkle);

                sparkle.animate(
                    [
                        { transform: 'scale(0) rotate(0deg)', opacity: 1 },
                        { transform: 'scale(1) rotate(180deg)', opacity: 1 },
                        { transform: 'scale(0) rotate(360deg)', opacity: 0 }
                    ],
                    { duration: 800, easing: 'ease-out' }
                ).onfinish = () => sparkle.remove();
            }, i * 100);
        }
    }

    // ---------- Scroll effects ----------
    initScrollEffects() {
        if (window.innerWidth > 768) {
            // Parallax without concatenating transform strings
            const floatElements = Array.from(document.querySelectorAll('.float-element'));
            floatElements.forEach((el, index) => {
                if (!el.dataset.baseTransform) {
                    el.dataset.baseTransform = getComputedStyle(el).transform === 'none' ? '' : getComputedStyle(el).transform;
                }
                el.dataset.parallaxSpeed = (0.5 + index * 0.1).toString();
                el.style.willChange = 'transform';
            });

            let ticking = false;
            const onScroll = () => {
                if (!ticking) {
                    requestAnimationFrame(() => {
                        const scrolled = window.pageYOffset;
                        floatElements.forEach(el => {
                            const speed = parseFloat(el.dataset.parallaxSpeed || '0.5');
                            el.style.transform = `${el.dataset.baseTransform} translateY(${scrolled * speed}px)`;
                        });
                        ticking = false;
                    });
                    ticking = true;
                }
            };
            window.addEventListener('scroll', onScroll, { passive: true });
        }

        this.initIntersectionObserver();
    }

    initIntersectionObserver() {
        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    entry.target.classList.add('animate-in');
                    this.addEntranceAnimation(entry.target);
                    observer.unobserve(entry.target);
                }
            });
        }, { threshold: 0.1 });

        document.querySelectorAll('.theory-box, .example-box, .conclusion-box').forEach(box => {
            observer.observe(box);
        });
    }

    addEntranceAnimation(element) {
        const animations = ['fadeInUp', 'slideInLeft', 'slideInRight', 'scaleIn'];
        const randomAnimation = animations[Math.floor(Math.random() * animations.length)];
        element.style.animation = `${randomAnimation} 0.6s ease-out forwards`;
    }

    // ---------- Particles ----------
    initParticleSystem() {
        this.createBackgroundParticles();
    }

    createBackgroundParticles() {
        if (window.innerWidth <= 768) return;

        const container = document.createElement('div');
        container.className = 'particle-container';
        Object.assign(container.style, {
            position: 'fixed',
            top: '0',
            left: '0',
            width: '100%',
            height: '100%',
            pointerEvents: 'none',
            zIndex: '-2',
            overflow: 'hidden'
        });

        document.body.appendChild(container);

        // initial
        for (let i = 0; i < 20; i++) {
            setTimeout(() => this.createParticle(container), i * 200);
        }

        // keep population
        setInterval(() => {
            if (container.isConnected && container.children.length < 20) {
                this.createParticle(container);
            }
        }, 2000);
    }

    createParticle(container) {
        const particle = document.createElement('div');
        const size = Math.random() * 6 + 2;

        Object.assign(particle.style, {
            position: 'absolute',
            width: `${size}px`,
            height: `${size}px`,
            background: `rgba(255, 255, 255, ${Math.random() * 0.5 + 0.1})`,
            borderRadius: '50%',
            left: Math.random() * window.innerWidth + 'px',
            top: window.innerHeight + 'px'
        });

        container.appendChild(particle);

        const duration = Math.random() * 3000 + 2000;
        const drift = (Math.random() - 0.5) * 100;

        particle.animate(
            [
                { transform: 'translateY(0) translateX(0) rotate(0deg)', opacity: 0 },
                { transform: `translateY(-${window.innerHeight + 100}px) translateX(${drift}px) rotate(360deg)`, opacity: 1 },
                { transform: `translateY(-${window.innerHeight + 200}px) translateX(${drift * 2}px) rotate(720deg)`, opacity: 0 }
            ],
            { duration, easing: 'linear' }
        ).onfinish = () => particle.remove();
    }

    // ---------- Theme ----------
    toggleTheme() {
        document.body.classList.toggle('dark-theme');
        this.createThemeTransition();
    }

    createThemeTransition() {
        const overlay = document.createElement('div');
        Object.assign(overlay.style, {
            position: 'fixed',
            top: '0',
            left: '0',
            width: '100%',
            height: '100%',
            background: 'radial-gradient(circle, transparent 0%, rgba(0,0,0,0.8) 100%)',
            opacity: '0',
            zIndex: '9999',
            pointerEvents: 'none'
        });
        document.body.appendChild(overlay);

        overlay.animate(
            [{ opacity: 0 }, { opacity: 1 }, { opacity: 0 }],
            { duration: 800, easing: 'ease-in-out' }
        ).onfinish = () => overlay.remove();
    }

    // ---------- Feedback ----------
    createSuccessAnimation(element) {
        const checkmark = document.createElement('div');
        checkmark.textContent = '✓';
        Object.assign(checkmark.style, {
            position: 'absolute',
            fontSize: '2em',
            color: '#28a745',
            fontWeight: 'bold',
            zIndex: '1000',
            transform: 'translate(-50%, -50%) scale(0)',
            pointerEvents: 'none'
        });

        const rect = element.getBoundingClientRect();
        checkmark.style.left = (rect.left + rect.width / 2) + 'px';
        checkmark.style.top = (rect.top + rect.height / 2) + 'px';

        document.body.appendChild(checkmark);

        checkmark.animate(
            [
                { transform: 'translate(-50%, -50%) scale(0) rotate(0deg)', opacity: 0 },
                { transform: 'translate(-50%, -50%) scale(1.2) rotate(360deg)', opacity: 1 },
                { transform: 'translate(-50%, -50%) scale(1) rotate(360deg)', opacity: 1 },
                { transform: 'translate(-50%, -50%) scale(0) rotate(360deg)', opacity: 0 }
            ],
            { duration: 2000, easing: 'ease-out' }
        ).onfinish = () => checkmark.remove();
    }

    showLoadingAnimation(target) {
        const loader = document.createElement('div');
        loader.className = 'custom-loader';
        loader.innerHTML = `
            <div class="loader-spinner"></div>
            <div class="loader-text">Đang tải...</div>
        `;

        if (!document.getElementById('loader-styles')) {
            const style = document.createElement('style');
            style.id = 'loader-styles';
            style.textContent = `
                .custom-loader {
                    display: flex; flex-direction: column; align-items: center; justify-content: center; padding: 20px;
                }
                .loader-spinner {
                    width: 40px; height: 40px; border: 4px solid #f3f3f3; border-top: 4px solid #3498db; border-radius: 50%; animation: spin 1s linear infinite;
                }
                .loader-text { margin-top: 10px; color: #666; font-size: 14px; }
                @keyframes spin { 0% { transform: rotate(0deg); } 100% { transform: rotate(360deg); } }
            `;
            document.head.appendChild(style);
        }

        target.appendChild(loader);
        return loader;
    }

    hideLoadingAnimation(loader) {
        if (!loader) return;
        loader.animate(
            [{ opacity: 1, transform: 'scale(1)' }, { opacity: 0, transform: 'scale(0.8)' }],
            { duration: 300, easing: 'ease-out' }
        ).onfinish = () => loader.remove();
    }

    // ---------- Internal ----------
    _ensureBaseStyles() {
        if (document.getElementById('ve-base-animations')) return;
        const style = document.createElement('style');
        style.id = 've-base-animations';
        style.textContent = `
            @keyframes fadeInUp { from { opacity:0; transform: translate3d(0, 20px, 0);} to {opacity:1; transform: translate3d(0,0,0);} }
            @keyframes slideInLeft { from { opacity:0; transform: translateX(-20px);} to {opacity:1; transform: translateX(0);} }
            @keyframes slideInRight { from { opacity:0; transform: translateX(20px);} to {opacity:1; transform: translateX(0);} }
            @keyframes scaleIn { from { opacity:0; transform: scale(0.95);} to {opacity:1; transform: scale(1);} }
        `;
        document.head.appendChild(style);
    }
}

// ---------- Utility functions ----------
function addPulseEffect(element) {
    element.classList.add('pulse');
    setTimeout(() => element.classList.remove('pulse'), 2000);
}

function addShakeEffect(element) {
    element.classList.add('shake');
    setTimeout(() => element.classList.remove('shake'), 500);
}

function addBounceEffect(element) {
    element.classList.add('bounce');
    setTimeout(() => element.classList.remove('bounce'), 1000);
}

// Smooth scroll
function smoothScrollTo(targetId, offset = 0) {
    const target = document.getElementById(targetId);
    if (target) {
        const y = target.getBoundingClientRect().top + window.pageYOffset - offset;
        window.scrollTo({ top: y, behavior: 'smooth' });
    }
}

// Typewriter
function typeWriter(element, text, speed = 50) {
    element.textContent = '';
    let i = 0;
    (function type() {
        if (i < text.length) {
            element.textContent += text.charAt(i++);
            setTimeout(type, speed);
        }
    })();
}

// Progressive image loading
function setupProgressiveImageLoading() {
    const images = document.querySelectorAll('img[data-src]');
    const io = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const img = entry.target;
                img.src = img.dataset.src;
                img.classList.remove('lazy');
                io.unobserve(img);
            }
        });
    }, { rootMargin: '200px 0px' });
    images.forEach(img => io.observe(img));
}

// ---------- Performance monitoring ----------
class PerformanceMonitor {
    constructor() {
        this.metrics = { loadTime: 0, renderTime: 0, interactionTime: 0 };
        this.init();
    }

    init() {
        window.addEventListener('load', () => {
            this.metrics.loadTime = performance.now();
            console.log(`Page loaded in: ${this.metrics.loadTime.toFixed(2)}ms`);
        });
        this.monitorInteractions();
    }

    monitorInteractions() {
        document.addEventListener('click', () => {
            const start = performance.now();
            requestAnimationFrame(() => {
                const end = performance.now();
                this.metrics.interactionTime = end - start;
                if (this.metrics.interactionTime > 16) {
                    console.warn(`Slow interaction detected: ${this.metrics.interactionTime.toFixed(2)}ms`);
                }
            });
        }, { passive: true });
    }

    getMetrics() { return this.metrics; }
}

// ---------- CommonJS export (optional for bundlers) ----------
if (typeof module !== 'undefined' && module.exports) {
    module.exports = {
        VisualEffects,
        PerformanceMonitor,
        addPulseEffect,
        addShakeEffect,
        addBounceEffect,
        smoothScrollTo,
        typeWriter,
        setupProgressiveImageLoading
    };
}

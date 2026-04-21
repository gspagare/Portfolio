// ============================================
// SCROLL ANIMATIONS & INTERACTIONS
// ============================================

const AnimationManager = {
    init() {
        this.initIntersectionObserver();
        this.initParallax();
        this.init3DCards();
        this.initCustomCursor();
    },
    
    initIntersectionObserver() {
        const observerOptions = {
            threshold: 0.1,
            rootMargin: '0px 0px -100px 0px'
        };
        
        const observer = new IntersectionObserver((entries) => {
            entries.forEach((entry, index) => {
                if (entry.isIntersecting) {
                    setTimeout(() => {
                        entry.target.classList.add('fade-in-visible');
                    }, index * 100);
                }
            });
        }, observerOptions);
        
        // Observe elements
        const elementsToObserve = document.querySelectorAll(
            '.section, .card, .project-card, .experience-card, .timeline-card, .skill-category'
        );
        
        elementsToObserve.forEach(el => {
            el.classList.add('fade-in');
            observer.observe(el);
        });
    },
    
    initParallax() {
        let ticking = false;
        
        window.addEventListener('scroll', () => {
            if (!ticking) {
                window.requestAnimationFrame(() => {
                    const scrolled = window.pageYOffset;
                    const parallaxElements = document.querySelectorAll('.hero-image, .shape');
                    
                    parallaxElements.forEach((el, index) => {
                        const speed = 0.3 + (index * 0.1);
                        el.style.transform = `translateY(${scrolled * speed}px)`;
                    });
                    
                    ticking = false;
                });
                ticking = true;
            }
        }, { passive: true });
    },
    
    init3DCards() {
        const cards = document.querySelectorAll('.project-card, .experience-card, .timeline-card');
        
        cards.forEach(card => {
            let currentX = 0;
            let currentY = 0;
            let targetX = 0;
            let targetY = 0;
            let isHovering = false;
            let animationId = null;
            
            card.addEventListener('mouseenter', () => {
                isHovering = true;
                if (!animationId) {
                    animateCard();
                }
            });
            
            card.addEventListener('mousemove', (e) => {
                if (!isHovering) {
                    isHovering = true;
                    if (!animationId) {
                        animateCard();
                    }
                }
                
                const rect = card.getBoundingClientRect();
                const x = e.clientX - rect.left;
                const y = e.clientY - rect.top;
                
                const centerX = rect.width / 2;
                const centerY = rect.height / 2;
                
                targetX = (y - centerY) / 15;
                targetY = (centerX - x) / 15;
            });
            
            card.addEventListener('mouseleave', () => {
                isHovering = false;
                targetX = 0;
                targetY = 0;
            });
            
            function animateCard() {
                currentX += (targetX - currentX) * 0.2;
                currentY += (targetY - currentY) * 0.2;
                
                if (isHovering || Math.abs(targetX - currentX) > 0.01 || Math.abs(targetY - currentY) > 0.01) {
                    card.style.transform = `perspective(1000px) rotateX(${currentX}deg) rotateY(${currentY}deg) translateZ(10px)`;
                    animationId = requestAnimationFrame(animateCard);
                } else {
                    card.style.transform = 'perspective(1000px) rotateX(0) rotateY(0) translateZ(0)';
                    animationId = null;
                }
            }
        });
    },
    
    initCustomCursor() {
        const customCursor = document.querySelector('.custom-cursor');
        const cursorDot = document.querySelector('.cursor-dot');
        
        if (!customCursor || !cursorDot) return;
        
        let mouseX = 0;
        let mouseY = 0;
        let cursorX = 0;
        let cursorY = 0;
        let dotX = 0;
        let dotY = 0;
        
        document.addEventListener('mousemove', (e) => {
            mouseX = e.clientX;
            mouseY = e.clientY;
        });
        
        function animateCursor() {
            cursorX += (mouseX - cursorX) * 0.2;
            cursorY += (mouseY - cursorY) * 0.2;
            dotX += (mouseX - dotX) * 0.5;
            dotY += (mouseY - dotY) * 0.5;
            
            customCursor.style.left = cursorX + 'px';
            customCursor.style.top = cursorY + 'px';
            cursorDot.style.left = dotX + 'px';
            cursorDot.style.top = dotY + 'px';
            
            requestAnimationFrame(animateCursor);
        }
        animateCursor();
        
        // Hover effects
        const hoverElements = document.querySelectorAll('a, button, .project-card, .experience-card, .skill-item');
        hoverElements.forEach(el => {
            el.addEventListener('mouseenter', () => {
                customCursor.classList.add('hover');
            });
            el.addEventListener('mouseleave', () => {
                customCursor.classList.remove('hover');
            });
        });
        
        // Click effect
        document.addEventListener('mousedown', () => {
            customCursor.classList.add('click');
        });
        document.addEventListener('mouseup', () => {
            customCursor.classList.remove('click');
        });
    }
};

export default AnimationManager;


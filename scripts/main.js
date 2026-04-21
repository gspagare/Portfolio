// ============================================
// MAIN APPLICATION ENTRY POINT
// ============================================

// Theme Management
const ThemeManager = {
    init() {
        this.themeToggle = document.getElementById('themeToggle');
        this.themeIcon = this.themeToggle?.querySelector('.theme-icon');
        this.body = document.body;
        
        const savedTheme = localStorage.getItem('theme') || 'dark';
        this.setTheme(savedTheme);
        
        this.themeToggle?.addEventListener('click', () => this.toggleTheme());
    },
    
    setTheme(theme) {
        this.body.setAttribute('data-theme', theme);
        localStorage.setItem('theme', theme);
        this.updateIcon(theme);
    },
    
    toggleTheme() {
        const currentTheme = this.body.getAttribute('data-theme');
        const newTheme = currentTheme === 'light' ? 'dark' : 'light';
        this.setTheme(newTheme);
    },
    
    updateIcon(theme) {
        if (this.themeIcon) {
            // Light theme: crescent moon, Dark theme: lighter sun
            this.themeIcon.textContent = theme === 'light' ? '🌙' : '☀️';
        }
    }
};

// Navigation Management
const NavigationManager = {
    init() {
        this.header = document.querySelector('.nav');
        this.navLinks = document.querySelectorAll('.nav-link');
        this.sections = document.querySelectorAll('section[id]');
        
        this.initSmoothScroll();
        this.initActiveLinks();
        this.initHeaderScroll();
    },
    
    initSmoothScroll() {
        document.querySelectorAll('a[href^="#"]').forEach(anchor => {
            anchor.addEventListener('click', (e) => {
                e.preventDefault();
                const targetId = anchor.getAttribute('href');
                const target = document.querySelector(targetId);
                
                if (target) {
                    const headerHeight = this.header?.offsetHeight || 0;
                    const targetPosition = target.offsetTop - headerHeight;
                    
                    window.scrollTo({
                        top: targetPosition,
                        behavior: 'smooth'
                    });
                }
            });
        });
    },
    
    initActiveLinks() {
        window.addEventListener('scroll', () => {
            let current = '';
            
            this.sections.forEach(section => {
                const sectionTop = section.offsetTop;
                const sectionHeight = section.clientHeight;
                const headerHeight = this.header?.offsetHeight || 0;
                
                if (window.scrollY >= (sectionTop - headerHeight - 200)) {
                    current = section.getAttribute('id');
                }
            });
            
            this.navLinks.forEach(link => {
                link.classList.remove('active');
                if (link.getAttribute('href') === `#${current}`) {
                    link.classList.add('active');
                }
            });
        });
    },
    
    initHeaderScroll() {
        let ticking = false;
        
        window.addEventListener('scroll', () => {
            if (!ticking) {
                window.requestAnimationFrame(() => {
                    const currentScroll = window.pageYOffset;
                    const documentHeight = document.documentElement.scrollHeight - window.innerHeight;
                    const scrollProgress = (currentScroll / documentHeight) * 100;
                    
                    // Update scroll progress indicator
                    document.documentElement.style.setProperty('--scroll-progress', `${scrollProgress}%`);
                    
                    // Add/remove scrolled class for enhanced styling
                    if (this.header) {
                        if (currentScroll > 50) {
                            this.header.classList.add('scrolled');
                        } else {
                            this.header.classList.remove('scrolled');
                        }
                    }
                    
                    ticking = false;
                });
                ticking = true;
            }
        }, { passive: true });
    }
};

// Animation Management
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
            
            const animateCard = () => {
                currentX += (targetX - currentX) * 0.2;
                currentY += (targetY - currentY) * 0.2;
                
                if (isHovering || Math.abs(targetX - currentX) > 0.01 || Math.abs(targetY - currentY) > 0.01) {
                    card.style.transform = `perspective(1000px) rotateX(${currentX}deg) rotateY(${currentY}deg) translateZ(10px)`;
                    animationId = requestAnimationFrame(animateCard);
                } else {
                    card.style.transform = 'perspective(1000px) rotateX(0) rotateY(0) translateZ(0)';
                    animationId = null;
                }
            };
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
        
        const hoverElements = document.querySelectorAll('a, button, .project-card, .experience-card, .skill-item');
        hoverElements.forEach(el => {
            el.addEventListener('mouseenter', () => {
                customCursor.classList.add('hover');
            });
            el.addEventListener('mouseleave', () => {
                customCursor.classList.remove('hover');
            });
        });
        
        document.addEventListener('mousedown', () => {
            customCursor.classList.add('click');
        });
        document.addEventListener('mouseup', () => {
            customCursor.classList.remove('click');
        });
    }
};

// Background Animation
const BackgroundAnimation = {
    init() {
        this.canvas = document.getElementById('particleCanvas');
        if (!this.canvas) return;
        
        this.ctx = this.canvas.getContext('2d');
        this.particles = [];
        this.particleCount = 80;
        this.connectionDistance = 180;
        
        this.setupCanvas();
        this.createParticles();
        this.animate();
        this.handleResize();
    },
    
    setupCanvas() {
        this.canvas.width = window.innerWidth;
        this.canvas.height = window.innerHeight;
    },
    
    createParticles() {
        this.particles = [];
        
        for (let i = 0; i < this.particleCount; i++) {
            this.particles.push({
                x: Math.random() * this.canvas.width,
                y: Math.random() * this.canvas.height,
                size: Math.random() * 3 + 2,
                speedX: (Math.random() - 0.5) * 1.5,
                speedY: (Math.random() - 0.5) * 1.5,
                opacity: Math.random() * 0.5 + 0.3
            });
        }
    },
    
    updateParticles() {
        this.particles.forEach(particle => {
            particle.x += particle.speedX;
            particle.y += particle.speedY;
            
            if (particle.x > this.canvas.width) particle.x = 0;
            if (particle.x < 0) particle.x = this.canvas.width;
            if (particle.y > this.canvas.height) particle.y = 0;
            if (particle.y < 0) particle.y = this.canvas.height;
        });
    },
    
    drawParticles() {
        this.particles.forEach(particle => {
            this.ctx.fillStyle = `rgba(59, 130, 246, ${particle.opacity})`;
            this.ctx.shadowBlur = 10;
            this.ctx.shadowColor = 'rgba(59, 130, 246, 0.8)';
            this.ctx.beginPath();
            this.ctx.arc(particle.x, particle.y, particle.size, 0, Math.PI * 2);
            this.ctx.fill();
            this.ctx.shadowBlur = 0;
        });
    },
    
    drawConnections() {
        this.particles.forEach((particle, i) => {
            this.particles.slice(i + 1).forEach(otherParticle => {
                const dx = particle.x - otherParticle.x;
                const dy = particle.y - otherParticle.y;
                const distance = Math.sqrt(dx * dx + dy * dy);
                
                if (distance < this.connectionDistance) {
                    const opacity = 0.3 * (1 - distance / this.connectionDistance);
                    this.ctx.strokeStyle = `rgba(59, 130, 246, ${opacity})`;
                    this.ctx.lineWidth = 1.5;
                    this.ctx.shadowBlur = 5;
                    this.ctx.shadowColor = 'rgba(59, 130, 246, 0.5)';
                    this.ctx.beginPath();
                    this.ctx.moveTo(particle.x, particle.y);
                    this.ctx.lineTo(otherParticle.x, otherParticle.y);
                    this.ctx.stroke();
                    this.ctx.shadowBlur = 0;
                }
            });
        });
    },
    
    animate() {
        this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);
        
        this.updateParticles();
        this.drawConnections();
        this.drawParticles();
        
        requestAnimationFrame(() => this.animate());
    },
    
    handleResize() {
        let resizeTimeout;
        window.addEventListener('resize', () => {
            clearTimeout(resizeTimeout);
            resizeTimeout = setTimeout(() => {
                const oldWidth = this.canvas.width;
                const oldHeight = this.canvas.height;
                this.setupCanvas();
                
                const scaleX = this.canvas.width / oldWidth;
                const scaleY = this.canvas.height / oldHeight;
                
                this.particles.forEach(particle => {
                    particle.x *= scaleX;
                    particle.y *= scaleY;
                });
            }, 250);
        });
    }
};

// Initialize all modules when DOM is ready
document.addEventListener('DOMContentLoaded', () => {
    ThemeManager.init();
    NavigationManager.init();
    AnimationManager.init();
    BackgroundAnimation.init();
    
    console.log('Portfolio initialized successfully!');
});

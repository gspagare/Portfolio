// ============================================
// NAVIGATION MANAGEMENT
// ============================================

const NavigationManager = {
    init() {
        this.header = document.querySelector('.nav');
        this.navLinks = document.querySelectorAll('.nav-link');
        this.sections = document.querySelectorAll('section[id]');
        
        // Smooth scroll for anchor links
        this.initSmoothScroll();
        
        // Active link highlighting
        this.initActiveLinks();
        
        // Header scroll effect
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

export default NavigationManager;


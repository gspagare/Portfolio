// ============================================
// BACKGROUND ANIMATION - Nodes/Lines System
// ============================================

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
            
            // Wrap around edges
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
                this.setupCanvas();
                // Reposition particles proportionally
                const scaleX = this.canvas.width / (this.canvas.width || 1);
                const scaleY = this.canvas.height / (this.canvas.height || 1);
                
                this.particles.forEach(particle => {
                    particle.x *= scaleX;
                    particle.y *= scaleY;
                });
            }, 250);
        });
    }
};

export default BackgroundAnimation;


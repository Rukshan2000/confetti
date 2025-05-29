/*!
 * Confetti.js v1.0.0
 * A lightweight confetti animation library
 * https://github.com/Rukshan200/confetti
 * 
 * Copyright (c) 2025 Rukshan Dev
 * Released under the MIT License
*/


(function(window) {
    'use strict';
    
    const ConfettiJS = {
        canvas: null,
        ctx: null,
        particles: [],
        animationId: null,
        
        // Default settings
        defaults: {
            count: 100,
            colors: ['#ff6b6b', '#4ecdc4', '#45b7d1', '#f9ca24', '#f0932b', '#eb4d4b', '#6ab04c'],
            shapes: ['circle', 'square'],
            spread: 45,
            origin: { x: 0.5, y: 0.5 },
            velocity: 50,
            gravity: 0.5,
            duration: 3000,
            size: { min: 3, max: 8 }
        },
        
        // Initialize the library
        init() {
            if (this.canvas) return;
            
            this.canvas = document.getElementById('confetti-canvas') || this.createCanvas();
            this.ctx = this.canvas.getContext('2d');
            this.resize();
            
            window.addEventListener('resize', () => this.resize());
            this.animate();
        },
        
        createCanvas() {
            const canvas = document.createElement('canvas');
            canvas.style.position = 'fixed';
            canvas.style.top = '0';
            canvas.style.left = '0';
            canvas.style.width = '100%';
            canvas.style.height = '100%';
            canvas.style.pointerEvents = 'none';
            canvas.style.zIndex = '1000';
            canvas.id = 'confetti-canvas';
            document.body.appendChild(canvas);
            return canvas;
        },
        
        resize() {
            this.canvas.width = window.innerWidth;
            this.canvas.height = window.innerHeight;
        },
        
        // Create a single particle
        createParticle(options = {}) {
            const opts = { ...this.defaults, ...options };
            const origin = {
                x: opts.origin.x * this.canvas.width,
                y: opts.origin.y * this.canvas.height
            };
            
            const angle = (opts.spread / 2) - (Math.random() * opts.spread);
            const velocity = opts.velocity * (0.5 + Math.random() * 0.5);
            
            return {
                x: origin.x,
                y: origin.y,
                vx: Math.cos(angle * Math.PI / 180) * velocity,
                vy: Math.sin(angle * Math.PI / 180) * velocity - Math.random() * opts.velocity,
                color: opts.colors[Math.floor(Math.random() * opts.colors.length)],
                shape: opts.shapes[Math.floor(Math.random() * opts.shapes.length)],
                size: opts.size.min + Math.random() * (opts.size.max - opts.size.min),
                rotation: Math.random() * 360,
                rotationSpeed: (Math.random() - 0.5) * 10,
                gravity: opts.gravity,
                life: opts.duration,
                maxLife: opts.duration,
                opacity: 1
            };
        },
        
        // Draw a particle
        drawParticle(particle) {
            this.ctx.save();
            this.ctx.globalAlpha = particle.opacity;
            this.ctx.translate(particle.x, particle.y);
            this.ctx.rotate(particle.rotation * Math.PI / 180);
            this.ctx.fillStyle = particle.color;
            
            switch (particle.shape) {
                case 'circle':
                    this.ctx.beginPath();
                    this.ctx.arc(0, 0, particle.size, 0, Math.PI * 2);
                    this.ctx.fill();
                    break;
                case 'square':
                    this.ctx.fillRect(-particle.size/2, -particle.size/2, particle.size, particle.size);
                    break;
                case 'triangle':
                    this.ctx.beginPath();
                    this.ctx.moveTo(0, -particle.size);
                    this.ctx.lineTo(-particle.size, particle.size);
                    this.ctx.lineTo(particle.size, particle.size);
                    this.ctx.closePath();
                    this.ctx.fill();
                    break;
                case 'heart':
                    this.drawHeart(particle.size);
                    break;
                case 'star':
                    this.drawStar(particle.size);
                    break;
            }
            
            this.ctx.restore();
        },
        
        drawHeart(size) {
            const scale = size / 10;
            this.ctx.beginPath();
            this.ctx.moveTo(0, 3 * scale);
            this.ctx.bezierCurveTo(-8 * scale, -2 * scale, -15 * scale, 2 * scale, 0, 15 * scale);
            this.ctx.bezierCurveTo(15 * scale, 2 * scale, 8 * scale, -2 * scale, 0, 3 * scale);
            this.ctx.fill();
        },
        
        drawStar(size) {
            const spikes = 5;
            const outerRadius = size;
            const innerRadius = size * 0.5;
            
            this.ctx.beginPath();
            for (let i = 0; i < spikes * 2; i++) {
                const radius = i % 2 === 0 ? outerRadius : innerRadius;
                const angle = (i * Math.PI) / spikes;
                const x = Math.cos(angle) * radius;
                const y = Math.sin(angle) * radius;
                if (i === 0) this.ctx.moveTo(x, y);
                else this.ctx.lineTo(x, y);
            }
            this.ctx.closePath();
            this.ctx.fill();
        },
        
        // Update particle physics
        updateParticle(particle) {
            particle.x += particle.vx;
            particle.y += particle.vy;
            particle.vy += particle.gravity;
            particle.rotation += particle.rotationSpeed;
            particle.life--;
            particle.opacity = particle.life / particle.maxLife;
            
            return particle.life > 0 && 
                   particle.y < this.canvas.height + 50 && 
                   particle.x > -50 && 
                   particle.x < this.canvas.width + 50;
        },
        
        // Animation loop
        animate() {
            this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);
            
            this.particles = this.particles.filter(particle => {
                if (this.updateParticle(particle)) {
                    this.drawParticle(particle);
                    return true;
                }
                return false;
            });
            
            this.animationId = requestAnimationFrame(() => this.animate());
        },
        
        // Public API methods
        burst(options = {}) {
            this.init();
            const opts = { ...this.defaults, ...options };
            for (let i = 0; i < opts.count; i++) {
                this.particles.push(this.createParticle(opts));
            }
        },
        
        rain(options = {}) {
            this.init();
            const opts = { 
                ...this.defaults, 
                origin: { x: 0.5, y: -0.1 }, 
                spread: 160, 
                velocity: 30,
                gravity: 0.3,
                count: 3,
                ...options 
            };
            
            const rainInterval = setInterval(() => {
                for (let i = 0; i < opts.count; i++) {
                    const particle = this.createParticle({
                        ...opts,
                        origin: { x: Math.random(), y: -0.1 }
                    });
                    this.particles.push(particle);
                }
            }, 100);
            
            setTimeout(() => clearInterval(rainInterval), 5000);
        },
        
        fountain(options = {}) {
            this.init();
            const opts = { 
                ...this.defaults, 
                origin: { x: 0.5, y: 1.0 }, 
                spread: 60, 
                velocity: 80,
                gravity: 0.8,
                ...options 
            };
            
            for (let i = 0; i < opts.count; i++) {
                setTimeout(() => {
                    this.particles.push(this.createParticle(opts));
                }, i * 10);
            }
        },
        
        fireworks(options = {}) {
            this.init();
            const positions = [
                { x: 0.2, y: 0.3 },
                { x: 0.8, y: 0.3 },
                { x: 0.5, y: 0.4 },
                { x: 0.3, y: 0.6 },
                { x: 0.7, y: 0.6 }
            ];
            
            positions.forEach((pos, index) => {
                setTimeout(() => {
                    this.burst({ 
                        ...options, 
                        origin: pos, 
                        count: 50,
                        spread: 360,
                        velocity: 60
                    });
                }, index * 300);
            });
        },
        
        hearts(options = {}) {
            this.burst({ 
                ...options, 
                shapes: ['heart'],
                colors: ['#ff6b6b', '#ff8e8e', '#ffa8a8'],
                count: 50
            });
        },
        
        stars(options = {}) {
            this.burst({ 
                ...options, 
                shapes: ['star'],
                colors: ['#ffd700', '#ffed4e', '#fff68f'],
                count: 30
            });
        },
        
        custom(options = {}) {
            this.burst(options);
        },
        
        clear() {
            this.particles = [];
            if (this.ctx) {
                this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);
            }
        }
    };
    
    // Expose to global scope
    window.ConfettiJS = ConfettiJS;
    
    // Auto-initialize on DOM ready
    if (document.readyState === 'loading') {
        document.addEventListener('DOMContentLoaded', () => ConfettiJS.init());
    } else {
        ConfettiJS.init();
    }
    
})(typeof window !== 'undefined' ? window : this);
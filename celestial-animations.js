/**
 * MIDNIGHT MAGNOLIA THEME
 * Celestial Animations & Interactive Elements
 * Spiritual wellness theme with mystical animations
 */

(function() {
  'use strict';

  // Theme namespace
  window.MidnightMagnolia = window.MidnightMagnolia || {};

  /**
   * Celestial Background Animation System
   */
  class CelestialAnimations {
    constructor() {
      this.stars = [];
      this.moonPhases = ['🌑', '🌒', '🌓', '🌔', '🌕', '🌖', '🌗', '🌘'];
      this.currentPhase = 0;
      this.init();
    }

    init() {
      this.createStarField();
      this.initFloatingElements();
      this.initScrollAnimations();
      this.initMoonPhaseToggle();
      this.initProductCardAnimations();
      this.initParallaxEffects();
    }

    /**
     * Create animated star field
     */
    createStarField() {
      const starContainer = document.createElement('div');
      starContainer.className = 'celestial-stars';
      starContainer.style.cssText = `
        position: fixed;
        top: 0;
        left: 0;
        width: 100%;
        height: 100%;
        pointer-events: none;
        z-index: -1;
        overflow: hidden;
      `;

      // Create multiple layers of stars
      for (let layer = 0; layer < 3; layer++) {
        const layerDiv = document.createElement('div');
        layerDiv.className = `star-layer star-layer-${layer}`;

        for (let i = 0; i < 50; i++) {
          const star = document.createElement('div');
          star.className = 'star';
          star.style.cssText = `
            position: absolute;
            width: ${Math.random() * 3 + 1}px;
            height: ${Math.random() * 3 + 1}px;
            background: rgba(255, 255, 255, ${Math.random() * 0.8 + 0.2});
            border-radius: 50%;
            left: ${Math.random() * 100}%;
            top: ${Math.random() * 100}%;
            animation: twinkle ${Math.random() * 4 + 2}s ease-in-out infinite alternate;
          `;

          layerDiv.appendChild(star);
        }

        starContainer.appendChild(layerDiv);
      }

      document.body.appendChild(starContainer);
      this.animateStarLayers();
    }

    /**
     * Animate star layers with different speeds
     */
    animateStarLayers() {
      const layers = document.querySelectorAll('.star-layer');
      layers.forEach((layer, index) => {
        const speed = (index + 1) * 0.5;
        layer.style.animation = `starDrift ${20 / speed}s linear infinite`;
      });
    }

    /**
     * Initialize floating magnolia elements
     */
    initFloatingElements() {
      const floatingElements = document.querySelectorAll('.animate-float');
      floatingElements.forEach((element, index) => {
        element.style.animationDelay = `${index * 0.5}s`;
        element.style.animationDuration = `${3 + Math.random() * 2}s`;
      });
    }

    /**
     * Initialize scroll-triggered animations
     */
    initScrollAnimations() {
      const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
      };

      const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
          if (entry.isIntersecting) {
            entry.target.classList.add('animate-fade-in-up');
            observer.unobserve(entry.target);
          }
        });
      }, observerOptions);

      // Observe elements for animation
      const animateElements = document.querySelectorAll(
        '.magnolia-card, .product-card, .section h2, .section h3'
      );

      animateElements.forEach(element => {
        observer.observe(element);
      });
    }

    /**
     * Initialize moon phase toggle for dark/light mode
     */
    initMoonPhaseToggle() {
      const moonToggle = document.querySelector('.moon-toggle');
      if (!moonToggle) {
        this.createMoonToggle();
      }

      document.addEventListener('click', (e) => {
        if (e.target.closest('.moon-toggle')) {
          this.toggleThemeMode();
        }
      });
    }

    /**
     * Create moon phase toggle button
     */
    createMoonToggle() {
      const toggle = document.createElement('button');
      toggle.className = 'moon-toggle';
      toggle.innerHTML = this.moonPhases[this.currentPhase];
      toggle.setAttribute('aria-label', 'Toggle theme mode');
      toggle.style.cssText = `
        position: fixed;
        top: 20px;
        right: 20px;
        background: rgba(247, 243, 233, 0.1);
        border: 1px solid rgba(247, 243, 233, 0.2);
        border-radius: 50%;
        width: 50px;
        height: 50px;
        font-size: 24px;
        cursor: pointer;
        z-index: 1000;
        transition: all 0.3s ease;
        backdrop-filter: blur(10px);
        -webkit-backdrop-filter: blur(10px);
      `;

      document.body.appendChild(toggle);
    }

    /**
     * Toggle between theme modes
     */
    toggleThemeMode() {
      this.currentPhase = (this.currentPhase + 1) % this.moonPhases.length;
      const moonToggle = document.querySelector('.moon-toggle');

      if (moonToggle) {
        moonToggle.innerHTML = this.moonPhases[this.currentPhase];
        moonToggle.style.transform = 'scale(1.2)';
        setTimeout(() => {
          moonToggle.style.transform = 'scale(1)';
        }, 200);
      }

      // Add theme mode logic here
      document.body.classList.toggle('light-mode');
      this.updateThemeColors();
    }

    /**
     * Update theme colors based on mode
     */
    updateThemeColors() {
      const isLightMode = document.body.classList.contains('light-mode');
      const root = document.documentElement;

      if (isLightMode) {
        root.style.setProperty('--color-base-text', '45, 55, 72');
        root.style.setProperty('--color-base-background-1', '247, 243, 233');
        root.style.setProperty('--celestial-gradient',
          'linear-gradient(135deg, #f7f3e9 0%, #e8dcc0 50%, #d69e2e 100%)');
      } else {
        root.style.setProperty('--color-base-text', '255, 255, 255');
        root.style.setProperty('--color-base-background-1', '26, 26, 46');
        root.style.setProperty('--celestial-gradient',
          'linear-gradient(135deg, #1a1a2e 0%, #2d3748 50%, #9f7aea 100%)');
      }
    }

    /**
     * Initialize product card hover animations
     */
    initProductCardAnimations() {
      const productCards = document.querySelectorAll('.product-card');

      productCards.forEach(card => {
        card.addEventListener('mouseenter', () => {
          this.createMagicalParticles(card);
        });

        card.addEventListener('mouseleave', () => {
          this.removeMagicalParticles(card);
        });
      });
    }

    /**
     * Create magical particle effects on hover
     */
    createMagicalParticles(element) {
      const particles = document.createElement('div');
      particles.className = 'magical-particles';
      particles.style.cssText = `
        position: absolute;
        top: 0;
        left: 0;
        width: 100%;
        height: 100%;
        pointer-events: none;
        overflow: hidden;
        border-radius: inherit;
      `;

      for (let i = 0; i < 6; i++) {
        const particle = document.createElement('div');
        particle.style.cssText = `
          position: absolute;
          width: 4px;
          height: 4px;
          background: rgba(246, 213, 92, 0.8);
          border-radius: 50%;
          left: ${Math.random() * 100}%;
          top: ${Math.random() * 100}%;
          animation: particleFloat ${Math.random() * 2 + 1}s ease-out forwards;
        `;
        particles.appendChild(particle);
      }

      element.style.position = 'relative';
      element.appendChild(particles);
    }

    /**
     * Remove magical particles
     */
    removeMagicalParticles(element) {
      const particles = element.querySelector('.magical-particles');
      if (particles) {
        particles.remove();
      }
    }

    /**
     * Initialize parallax scrolling effects
     */
    initParallaxEffects() {
      const parallaxElements = document.querySelectorAll('.parallax-element');

      if (parallaxElements.length === 0) return;

      let ticking = false;

      const updateParallax = () => {
        const scrolled = window.pageYOffset;

        parallaxElements.forEach((element, index) => {
          const rate = scrolled * (0.5 + index * 0.1);
          element.style.transform = `translateY(${rate}px)`;
        });

        ticking = false;
      };

      const requestTick = () => {
        if (!ticking) {
          requestAnimationFrame(updateParallax);
          ticking = true;
        }
      };

      window.addEventListener('scroll', requestTick, { passive: true });
    }
  }

  /**
   * Sacred Geometry Animations
   */
  class SacredGeometry {
    constructor() {
      this.init();
    }

    init() {
      this.createGeometricPatterns();
      this.initRotatingElements();
    }

    /**
     * Create sacred geometry background patterns
     */
    createGeometricPatterns() {
      const patterns = document.querySelectorAll('.sacred-geometry');

      patterns.forEach(pattern => {
        const svg = this.createGeometrySVG();
        pattern.appendChild(svg);
      });
    }

    /**
     * Create SVG sacred geometry pattern
     */
    createGeometrySVG() {
      const svg = document.createElementNS('http://www.w3.org/2000/svg', 'svg');
      svg.setAttribute('width', '200');
      svg.setAttribute('height', '200');
      svg.setAttribute('viewBox', '0 0 200 200');
      svg.style.cssText = `
        position: absolute;
        top: 50%;
        left: 50%;
        transform: translate(-50%, -50%);
        opacity: 0.1;
        animation: geometryRotate 30s linear infinite;
      `;

      // Create flower of life pattern
      const centerX = 100;
      const centerY = 100;
      const radius = 30;

      for (let i = 0; i < 6; i++) {
        const angle = (i * Math.PI) / 3;
        const x = centerX + Math.cos(angle) * radius;
        const y = centerY + Math.sin(angle) * radius;

        const circle = document.createElementNS('http://www.w3.org/2000/svg', 'circle');
        circle.setAttribute('cx', x);
        circle.setAttribute('cy', y);
        circle.setAttribute('r', radius);
        circle.setAttribute('fill', 'none');
        circle.setAttribute('stroke', 'rgba(159, 122, 234, 0.3)');
        circle.setAttribute('stroke-width', '1');

        svg.appendChild(circle);
      }

      // Center circle
      const centerCircle = document.createElementNS('http://www.w3.org/2000/svg', 'circle');
      centerCircle.setAttribute('cx', centerX);
      centerCircle.setAttribute('cy', centerY);
      centerCircle.setAttribute('r', radius);
      centerCircle.setAttribute('fill', 'none');
      centerCircle.setAttribute('stroke', 'rgba(246, 213, 92, 0.3)');
      centerCircle.setAttribute('stroke-width', '1');

      svg.appendChild(centerCircle);

      return svg;
    }

    /**
     * Initialize rotating geometric elements
     */
    initRotatingElements() {
      const rotatingElements = document.querySelectorAll('.rotate-slow');

      rotatingElements.forEach((element, index) => {
        element.style.animation = `rotate ${20 + index * 5}s linear infinite`;
      });
    }
  }

  /**
   * Smooth Scrolling Navigation
   */
  class SmoothNavigation {
    constructor() {
      this.init();
    }

    init() {
      this.initSmoothScrolling();
      this.initActiveNavigation();
    }

    /**
     * Initialize smooth scrolling for anchor links
     */
    initSmoothScrolling() {
      document.addEventListener('click', (e) => {
        const link = e.target.closest('a[href^="#"]');
        if (!link) return;

        e.preventDefault();
        const targetId = link.getAttribute('href').substring(1);
        const targetElement = document.getElementById(targetId);

        if (targetElement) {
          targetElement.scrollIntoView({
            behavior: 'smooth',
            block: 'start'
          });
        }
      });
    }

    /**
     * Initialize active navigation highlighting
     */
    initActiveNavigation() {
      const navLinks = document.querySelectorAll('.nav__link[href^="#"]');
      if (navLinks.length === 0) return;

      const sections = Array.from(navLinks).map(link => {
        const targetId = link.getAttribute('href').substring(1);
        return document.getElementById(targetId);
      }).filter(Boolean);

      const observerOptions = {
        threshold: 0.3,
        rootMargin: '-20% 0px -20% 0px'
      };

      const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
          const navLink = document.querySelector(`a[href="#${entry.target.id}"]`);
          if (navLink) {
            if (entry.isIntersecting) {
              navLink.classList.add('active');
            } else {
              navLink.classList.remove('active');
            }
          }
        });
      }, observerOptions);

      sections.forEach(section => observer.observe(section));
    }
  }

  /**
   * Performance Optimization
   */
  class PerformanceOptimizer {
    constructor() {
      this.init();
    }

    init() {
      this.lazyLoadImages();
      this.optimizeAnimations();
    }

    /**
     * Lazy load images for better performance
     */
    lazyLoadImages() {
      const images = document.querySelectorAll('img[data-src]');

      const imageObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
          if (entry.isIntersecting) {
            const img = entry.target;
            img.src = img.dataset.src;
            img.classList.remove('lazy');
            imageObserver.unobserve(img);
          }
        });
      });

      images.forEach(img => imageObserver.observe(img));
    }

    /**
     * Optimize animations based on user preferences
     */
    optimizeAnimations() {
      // Respect user's motion preferences
      if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
        document.documentElement.style.setProperty('--animation-duration', '0.01ms');
        return;
      }

      // Pause animations when tab is not visible
      document.addEventListener('visibilitychange', () => {
        const animations = document.querySelectorAll('[style*="animation"]');
        animations.forEach(element => {
          if (document.hidden) {
            element.style.animationPlayState = 'paused';
          } else {
            element.style.animationPlayState = 'running';
          }
        });
      });
    }
  }

  /**
   * Add CSS animations to the document
   */
  function addAnimationStyles() {
    const style = document.createElement('style');
    style.textContent = `
      @keyframes twinkle {
        0% { opacity: 0.3; transform: scale(1); }
        100% { opacity: 1; transform: scale(1.2); }
      }

      @keyframes starDrift {
        0% { transform: translateX(0); }
        100% { transform: translateX(-100px); }
      }

      @keyframes particleFloat {
        0% {
          opacity: 1;
          transform: translateY(0) scale(1);
        }
        100% {
          opacity: 0;
          transform: translateY(-50px) scale(0.5);
        }
      }

      @keyframes geometryRotate {
        0% { transform: translate(-50%, -50%) rotate(0deg); }
        100% { transform: translate(-50%, -50%) rotate(360deg); }
      }

      @keyframes rotate {
        0% { transform: rotate(0deg); }
        100% { transform: rotate(360deg); }
      }

      .nav__link.active {
        color: var(--color-golden-yellow);
        text-shadow: 0 0 8px rgba(246, 213, 92, 0.3);
      }

      .lazy {
        opacity: 0;
        transition: opacity 0.3s;
      }

      .lazy.loaded {
        opacity: 1;
      }
    `;
    document.head.appendChild(style);
  }

  /**
   * Initialize all theme components
   */
  function initTheme() {
    // Add animation styles
    addAnimationStyles();

    // Initialize components
    new CelestialAnimations();
    new SacredGeometry();
    new SmoothNavigation();
    new PerformanceOptimizer();

    // Theme is ready
    document.body.classList.add('theme-loaded');

    // Dispatch custom event
    window.dispatchEvent(new CustomEvent('midnightMagnoliaReady', {
      detail: { version: '1.0.0' }
    }));
  }

  // Initialize when DOM is ready
  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', initTheme);
  } else {
    initTheme();
  }

  // Export to global namespace
  window.MidnightMagnolia.CelestialAnimations = CelestialAnimations;
  window.MidnightMagnolia.SacredGeometry = SacredGeometry;
  window.MidnightMagnolia.SmoothNavigation = SmoothNavigation;
  window.MidnightMagnolia.PerformanceOptimizer = PerformanceOptimizer;

})();
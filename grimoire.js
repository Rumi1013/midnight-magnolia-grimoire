/**
 * Midnight Magnolia Grimoire - Interactive JavaScript
 * Celestial animations and mystical interactions
 */

// DOM Content Loaded
document.addEventListener('DOMContentLoaded', function() {
    initializeGrimoire();
});

function initializeGrimoire() {
    // Initialize all components
    initializeNavigation();
    initializeCelestialAnimations();
    initializeScrollEffects();
    initializeCardInteractions();
    initializeAccessibility();
}

/**
 * Navigation Functionality
 */
function initializeNavigation() {
    const navToggle = document.querySelector('.nav-toggle');
    const navMenu = document.querySelector('.nav-menu');

    if (navToggle && navMenu) {
        navToggle.addEventListener('click', function() {
            navMenu.classList.toggle('active');
            navToggle.classList.toggle('active');

            // Animate hamburger menu
            const spans = navToggle.querySelectorAll('span');
            if (navMenu.classList.contains('active')) {
                spans[0].style.transform = 'rotate(45deg) translate(5px, 5px)';
                spans[1].style.opacity = '0';
                spans[2].style.transform = 'rotate(-45deg) translate(7px, -6px)';
            } else {
                spans[0].style.transform = 'none';
                spans[1].style.opacity = '1';
                spans[2].style.transform = 'none';
            }
        });
    }

    // Smooth scrolling for navigation links
    const navLinks = document.querySelectorAll('.nav-menu a[href^="#"]');
    navLinks.forEach(link => {
        link.addEventListener('click', function(e) {
            e.preventDefault();
            const targetId = this.getAttribute('href');
            const targetSection = document.querySelector(targetId);

            if (targetSection) {
                const navHeight = document.querySelector('.grimoire-nav').offsetHeight;
                const targetPosition = targetSection.offsetTop - navHeight;

                window.scrollTo({
                    top: targetPosition,
                    behavior: 'smooth'
                });

                // Close mobile menu if open
                if (navMenu.classList.contains('active')) {
                    navMenu.classList.remove('active');
                    navToggle.classList.remove('active');
                }

                // Update active link
                updateActiveNavLink(targetId);
            }
        });
    });

    // Update active navigation link on scroll
    window.addEventListener('scroll', function() {
        updateActiveNavLinkOnScroll();
    });
}

function updateActiveNavLink(targetId) {
    const navLinks = document.querySelectorAll('.nav-menu a');
    navLinks.forEach(link => {
        link.classList.remove('active');
        if (link.getAttribute('href') === targetId) {
            link.classList.add('active');
        }
    });
}

function updateActiveNavLinkOnScroll() {
    const sections = document.querySelectorAll('section[id]');
    const navHeight = document.querySelector('.grimoire-nav').offsetHeight;
    let current = '';

    sections.forEach(section => {
        const sectionTop = section.offsetTop - navHeight - 100;
        const sectionHeight = section.offsetHeight;
        if (window.pageYOffset >= sectionTop && window.pageYOffset < sectionTop + sectionHeight) {
            current = '#' + section.getAttribute('id');
        }
    });

    if (current) {
        updateActiveNavLink(current);
    }
}

/**
 * Celestial Animations
 */
function initializeCelestialAnimations() {
    // Create floating celestial elements
    createFloatingElements();

    // Animate celestial background
    animateCelestialBackground();

    // Moon phase animations
    animateMoonPhases();
}

function createFloatingElements() {
    const celestialBg = document.querySelector('.celestial-bg');
    if (!celestialBg) return;

    // Create floating stars
    for (let i = 0; i < 20; i++) {
        const star = document.createElement('div');
        star.className = 'floating-star';
        star.style.left = Math.random() * 100 + '%';
        star.style.top = Math.random() * 100 + '%';
        star.style.animationDelay = Math.random() * 3 + 's';
        star.style.animationDuration = (Math.random() * 3 + 2) + 's';
        celestialBg.appendChild(star);
    }
}

function animateCelestialBackground() {
    const celestialElements = document.querySelectorAll('.celestial-bg');

    celestialElements.forEach(element => {
        element.style.animation = 'celestialShift 20s ease-in-out infinite';
    });
}

function animateMoonPhases() {
    const moonIcons = document.querySelectorAll('.moon-icon, .tarot-icon, .ritual-icon');

    moonIcons.forEach((icon, index) => {
        icon.style.animation = `moonGlow 3s ease-in-out infinite`;
        icon.style.animationDelay = `${index * 0.2}s`;
    });
}

/**
 * Scroll Effects
 */
function initializeScrollEffects() {
    // Parallax effect for hero elements
    window.addEventListener('scroll', function() {
        const scrolled = window.pageYOffset;
        const rate = scrolled * -0.5;

        const heroStars = document.querySelector('.hero-stars');
        const heroMoon = document.querySelector('.hero-moon');

        if (heroStars) {
            heroStars.style.transform = `translateY(${rate * 0.5}px)`;
        }

        if (heroMoon) {
            heroMoon.style.transform = `translateY(${rate * 0.3}px)`;
        }
    });

    // Fade in animations on scroll
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    };

    const observer = new IntersectionObserver(function(entries) {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('animate-fade-in-up');
            }
        });
    }, observerOptions);

    // Observe all cards and sections
    const cards = document.querySelectorAll('.magnolia-card, .moon-card, .tarot-card, .ritual-card');
    cards.forEach(card => {
        observer.observe(card);
    });
}

/**
 * Card Interactions
 */
function initializeCardInteractions() {
    const cards = document.querySelectorAll('.magnolia-card, .moon-card, .tarot-card, .ritual-card');

    cards.forEach(card => {
        // Add hover sound effect (visual feedback)
        card.addEventListener('mouseenter', function() {
            this.style.transform = 'translateY(-8px) scale(1.02)';
        });

        card.addEventListener('mouseleave', function() {
            this.style.transform = 'translateY(0) scale(1)';
        });

        // Add click ripple effect
        card.addEventListener('click', function(e) {
            createRippleEffect(e, this);
        });
    });
}

function createRippleEffect(event, element) {
    const ripple = document.createElement('div');
    const rect = element.getBoundingClientRect();
    const size = Math.max(rect.width, rect.height);
    const x = event.clientX - rect.left - size / 2;
    const y = event.clientY - rect.top - size / 2;

    ripple.style.width = ripple.style.height = size + 'px';
    ripple.style.left = x + 'px';
    ripple.style.top = y + 'px';
    ripple.className = 'ripple-effect';

    element.appendChild(ripple);

    setTimeout(() => {
        ripple.remove();
    }, 600);
}

/**
 * Accessibility Features
 */
function initializeAccessibility() {
    // Add skip to content link
    const skipLink = document.createElement('a');
    skipLink.href = '#main-content';
    skipLink.className = 'skip-to-content-link';
    skipLink.textContent = 'Skip to main content';
    document.body.insertBefore(skipLink, document.body.firstChild);

    // Add main content landmark
    const mainContent = document.querySelector('main') || document.querySelector('.hero-section');
    if (mainContent) {
        mainContent.id = 'main-content';
    }

    // Keyboard navigation for cards
    const interactiveCards = document.querySelectorAll('.magnolia-card, .moon-card, .tarot-card, .ritual-card');
    interactiveCards.forEach(card => {
        card.setAttribute('tabindex', '0');

        card.addEventListener('keydown', function(e) {
            if (e.key === 'Enter' || e.key === ' ') {
                e.preventDefault();
                const link = this.querySelector('.card-link, a');
                if (link) {
                    link.click();
                }
            }
        });
    });

    // High contrast mode detection
    if (window.matchMedia && window.matchMedia('(prefers-contrast: high)').matches) {
        document.body.classList.add('high-contrast');
    }

    // Reduced motion detection
    if (window.matchMedia && window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
        document.body.classList.add('reduced-motion');
    }
}

/**
 * Mystical Utility Functions
 */

// Generate random mystical messages
function getMysticalMessage() {
    const messages = [
        "The stars align in your favor",
        "Trust the journey of your soul",
        "Your intuition is your greatest guide",
        "Magic flows through your veins",
        "The universe conspires in your favor",
        "Your spirit is awakening",
        "Divine timing is at work",
        "Your energy is magnetic"
    ];

    return messages[Math.floor(Math.random() * messages.length)];
}

// Create celestial particle effect
function createCelestialParticles(container, count = 50) {
    for (let i = 0; i < count; i++) {
        const particle = document.createElement('div');
        particle.className = 'celestial-particle';
        particle.style.left = Math.random() * 100 + '%';
        particle.style.top = Math.random() * 100 + '%';
        particle.style.animationDelay = Math.random() * 10 + 's';
        particle.style.animationDuration = (Math.random() * 10 + 10) + 's';

        container.appendChild(particle);
    }
}

// Moon phase calculator
function getCurrentMoonPhase() {
    const date = new Date();
    const moonCycle = 29.53; // days
    const newMoon = new Date(2023, 0, 1); // Reference new moon
    const daysSinceNewMoon = (date - newMoon) / (1000 * 60 * 60 * 24);
    const phase = (daysSinceNewMoon % moonCycle) / moonCycle;

    if (phase < 0.125) return 'New Moon';
    if (phase < 0.375) return 'Waxing Crescent';
    if (phase < 0.625) return 'Full Moon';
    if (phase < 0.875) return 'Waning Crescent';
    return 'New Moon';
}

/**
 * CSS Animations (added via JavaScript for dynamic effects)
 */
const styleSheet = document.createElement('style');
styleSheet.textContent = `
    @keyframes celestialShift {
        0%, 100% {
            background-position: 0% 0%;
        }
        50% {
            background-position: 100% 100%;
        }
    }

    @keyframes moonGlow {
        0%, 100% {
            filter: drop-shadow(0 0 5px rgba(246, 213, 92, 0.3));
            transform: scale(1);
        }
        50% {
            filter: drop-shadow(0 0 15px rgba(246, 213, 92, 0.6));
            transform: scale(1.05);
        }
    }

    @keyframes float {
        0%, 100% {
            transform: translateY(0px);
        }
        50% {
            transform: translateY(-20px);
        }
    }

    .floating-star {
        position: absolute;
        width: 2px;
        height: 2px;
        background: var(--color-golden-yellow);
        border-radius: 50%;
        animation: float 3s ease-in-out infinite;
        opacity: 0.6;
    }

    .celestial-particle {
        position: absolute;
        width: 1px;
        height: 1px;
        background: var(--color-mystical-purple);
        border-radius: 50%;
        animation: float 10s ease-in-out infinite;
        opacity: 0.3;
    }

    .ripple-effect {
        position: absolute;
        border-radius: 50%;
        background: rgba(246, 213, 92, 0.3);
        transform: scale(0);
        animation: ripple 0.6s linear;
        pointer-events: none;
    }

    @keyframes ripple {
        to {
            transform: scale(4);
            opacity: 0;
        }
    }

    /* High contrast styles */
    .high-contrast .magnolia-card {
        border-width: 3px;
        border-color: var(--color-golden-yellow);
    }

    .high-contrast .btn {
        border-width: 3px;
    }

    /* Reduced motion styles */
    .reduced-motion * {
        animation-duration: 0.01ms !important;
        animation-iteration-count: 1 !important;
        transition-duration: 0.01ms !important;
    }
`;

document.head.appendChild(styleSheet);

// Export functions for potential use in other scripts
window.GrimoireUtils = {
    getMysticalMessage,
    getCurrentMoonPhase,
    createCelestialParticles
};
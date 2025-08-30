/**
 * Tarot Reading System - Midnight Magnolia Grimoire
 * Interactive tarot card drawing and interpretation
 */

// Tarot deck data
const tarotDeck = {
    majorArcana: [
        {
            name: "The Fool",
            number: 0,
            upright: "New beginnings, innocence, spontaneity, free spirit",
            reversed: "Recklessness, taken advantage of, inconsideration",
            guidance: "Trust in the journey ahead. Embrace new opportunities with an open heart and childlike wonder.",
            question: "What new beginning is calling to you today?",
            element: "Air",
            planet: "Uranus"
        },
        {
            name: "The Magician",
            number: 1,
            upright: "Manifestation, resourcefulness, power, inspired action",
            reversed: "Manipulation, poor planning, untapped talents",
            guidance: "You have all the tools you need within you. Focus your will and take inspired action.",
            question: "How can you harness your inner power today?",
            element: "Air",
            planet: "Mercury"
        },
        {
            name: "The High Priestess",
            number: 2,
            upright: "Intuition, sacred knowledge, divine feminine, the subconscious mind",
            reversed: "Secrets, disconnected from intuition, withdrawal, silence",
            guidance: "Trust your inner wisdom. The answers you seek are within your subconscious.",
            question: "What is your intuition trying to tell you?",
            element: "Water",
            planet: "Moon"
        },
        {
            name: "The Empress",
            number: 3,
            upright: "Femininity, beauty, nature, abundance, mother figure",
            reversed: "Creative block, dependence on others",
            guidance: "Nurture yourself and others. Embrace the beauty and abundance around you.",
            question: "How can you cultivate more beauty and abundance in your life?",
            element: "Earth",
            planet: "Venus"
        },
        {
            name: "The Emperor",
            number: 4,
            upright: "Authority, establishment, structure, control, fatherhood",
            reversed: "Domination, excessive control, lack of discipline, inflexibility",
            guidance: "Establish healthy boundaries and take responsibility for your life.",
            question: "Where do you need to establish more structure?",
            element: "Fire",
            planet: "Mars"
        },
        {
            name: "The Hierophant",
            number: 5,
            upright: "Spiritual wisdom, religious beliefs, conformity, tradition, institutions",
            reversed: "Personal beliefs, freedom, challenging the status quo",
            guidance: "Seek wisdom from established traditions while honoring your personal truth.",
            question: "What spiritual teachings resonate with you today?",
            element: "Earth",
            planet: "Taurus"
        },
        {
            name: "The Lovers",
            number: 6,
            upright: "Love, harmony, relationships, values alignment, choices",
            reversed: "Self-love, disharmony, imbalance, misalignment of values",
            guidance: "Love is the highest vibration. Choose what aligns with your heart.",
            question: "What choice will bring you closer to love?",
            element: "Air",
            planet: "Gemini"
        },
        {
            name: "The Chariot",
            number: 7,
            upright: "Control, willpower, success, determination, direction",
            reversed: "Self-discipline, opposition, lack of direction",
            guidance: "Focus your will and determination. You have the power to overcome obstacles.",
            question: "What direction is your willpower taking you?",
            element: "Water",
            planet: "Cancer"
        },
        {
            name: "Strength",
            number: 8,
            upright: "Strength, courage, persuasion, influence, compassion",
            reversed: "Self-doubt, weakness, insecurity",
            guidance: "True strength comes from within. Approach challenges with compassion.",
            question: "How can you show compassion toward yourself today?",
            element: "Fire",
            planet: "Leo"
        },
        {
            name: "The Hermit",
            number: 9,
            upright: "Soul searching, introspection, inner guidance, solitude",
            reversed: "Isolation, loneliness, withdrawal",
            guidance: "Take time for introspection. Your inner wisdom will guide you.",
            question: "What do you need to contemplate in solitude?",
            element: "Earth",
            planet: "Virgo"
        },
        {
            name: "Wheel of Fortune",
            number: 10,
            upright: "Good luck, karma, life cycles, destiny, turning point",
            reversed: "Bad luck, lack of control, clinging to control, delays",
            guidance: "Life is cyclical. Trust in divine timing and embrace change.",
            question: "What cycle are you ready to move through?",
            element: "Fire",
            planet: "Jupiter"
        },
        {
            name: "Justice",
            number: 11,
            upright: "Justice, fairness, truth, cause and effect, law",
            reversed: "Unfairness, lack of accountability, dishonesty",
            guidance: "Seek truth and fairness. Your actions have consequences.",
            question: "Where do you need to restore balance and justice?",
            element: "Air",
            planet: "Libra"
        },
        {
            name: "The Hanged Man",
            number: 12,
            upright: "Suspension, restriction, letting go, sacrifice",
            reversed: "Delays, resistance, stalling, indecision",
            guidance: "Sometimes surrender is the path forward. Let go and trust the process.",
            question: "What are you being called to surrender?",
            element: "Water",
            planet: "Neptune"
        },
        {
            name: "Death",
            number: 13,
            upright: "Endings, beginnings, change, transformation, transition",
            reversed: "Resistance to change, personal transformation, inner purging",
            guidance: "Every ending is a new beginning. Embrace transformation.",
            question: "What old pattern are you ready to release?",
            element: "Water",
            planet: "Scorpio"
        },
        {
            name: "Temperance",
            number: 14,
            upright: "Balance, moderation, patience, purpose, meaning",
            reversed: "Imbalance, excess, self-healing, re-alignment",
            guidance: "Find balance in all things. Patience and moderation lead to harmony.",
            question: "Where do you need to restore balance in your life?",
            element: "Fire",
            planet: "Sagittarius"
        },
        {
            name: "The Devil",
            number: 15,
            upright: "Bondage, addiction, sexuality, materialism, playfulness",
            reversed: "Releasing limiting beliefs, exploring dark thoughts, detachment",
            guidance: "Examine what binds you. True freedom comes from within.",
            question: "What limiting belief are you ready to release?",
            element: "Earth",
            planet: "Capricorn"
        },
        {
            name: "The Tower",
            number: 16,
            upright: "Sudden change, upheaval, chaos, revelation, awakening",
            reversed: "Personal transformation, fear of change, averting disaster",
            guidance: "Sometimes destruction is necessary for rebirth. Trust the process.",
            question: "What foundation needs to crumble for new growth?",
            element: "Fire",
            planet: "Mars"
        },
        {
            name: "The Star",
            number: 17,
            upright: "Hope, faith, purpose, renewal, spirituality",
            reversed: "Lack of faith, despair, self-trust, disconnection",
            guidance: "Have faith in yourself and the universe. Your dreams are within reach.",
            question: "What hope can you nurture today?",
            element: "Air",
            planet: "Aquarius"
        },
        {
            name: "The Moon",
            number: 18,
            upright: "Illusion, fear, anxiety, subconscious, intuition",
            reversed: "Release of fear, repressed emotion, inner confusion",
            guidance: "Trust your intuition. Face your fears with courage.",
            question: "What fear is ready to be illuminated?",
            element: "Water",
            planet: "Pisces"
        },
        {
            name: "The Sun",
            number: 19,
            upright: "Positivity, fun, warmth, success, vitality",
            reversed: "Inner child, feeling down, overly optimistic",
            guidance: "Celebrate your successes. Share your light with the world.",
            question: "How can you bring more joy and positivity into your day?",
            element: "Fire",
            planet: "Sun"
        },
        {
            name: "Judgement",
            number: 20,
            upright: "Judgement, rebirth, inner calling, absolution",
            reversed: "Self-doubt, inner critic, ignoring the call",
            guidance: "Answer your soul's calling. Forgive yourself and others.",
            question: "What is your soul calling you to do?",
            element: "Fire",
            planet: "Pluto"
        },
        {
            name: "The World",
            number: 21,
            upright: "Completion, accomplishment, travel, fulfillment",
            reversed: "Seeking personal closure, short-cut to success",
            guidance: "Celebrate your journey. You have come full circle.",
            question: "What completion are you ready to celebrate?",
            element: "Earth",
            planet: "Saturn"
        }
    ],

    minorArcana: {
        wands: [
            { name: "Ace of Wands", upright: "Inspiration, ideas, determination, a spark of an inner fire", reversed: "Lack of direction, lack of passion, creative blocks" },
            { name: "Two of Wands", upright: "Future planning, progress, decisions, discovery", reversed: "Personal goals, inner alignment, fear of unknown" },
            { name: "Three of Wands", upright: "Expansion, foresight, overseas opportunities", reversed: "Obstacles, delays, missed opportunities" },
            { name: "Four of Wands", upright: "Celebration, joy, harmony, relaxation, homecoming", reversed: "Personal celebration, inner harmony, conflict with others" },
            { name: "Five of Wands", upright: "Conflict, disagreements, competition, tension", reversed: "Inner conflict, conflict avoidance, releasing tension" },
            { name: "Six of Wands", upright: "Success, public recognition, progress, self-confidence", reversed: "Private achievement, personal success, pride in what you've achieved" },
            { name: "Seven of Wands", upright: "Challenge, competition, perseverance", reversed: "Exhaustion, giving up, overwhelmed" },
            { name: "Eight of Wands", upright: "Speed, action, alignment, air travel", reversed: "Delays, frustration, resisting change, internal alignment" },
            { name: "Nine of Wands", upright: "Resilience, courage, persistence, test of faith", reversed: "Inner resources, struggle, overwhelm, defensive" },
            { name: "Ten of Wands", upright: "Burden, extra responsibility, hard work, completion", reversed: "Doing it all, carrying the burden, delegation, release" },
            { name: "Page of Wands", upright: "Inspiration, ideas, discovery, limitless potential", reversed: "Lack of direction, no clear plan, bad advice" },
            { name: "Knight of Wands", upright: "Energy, passion, inspired action, adventure", reversed: "Passion project, haste, scattered energy, delays" },
            { name: "Queen of Wands", upright: "Courage, confidence, independence, social butterfly", reversed: "Self-respect, self-confidence, introverted, re-establish sense of self" },
            { name: "King of Wands", upright: "Natural-born leader, vision, entrepreneur, honour", reversed: "Impulsiveness, haste, ruthless, high expectations" }
        ],
        cups: [
            { name: "Ace of Cups", upright: "Love, new relationships, compassion, creativity", reversed: "Self-love, intuition, repressed emotions" },
            { name: "Two of Cups", upright: "Unified love, partnership, mutual attraction", reversed: "Self-love, break-ups, disharmony, distrust" },
            { name: "Three of Cups", upright: "Celebration, friendship, creativity, community", reversed: "Independence, alone time, hardcore partying, 'three's a crowd'" },
            { name: "Four of Cups", upright: "Meditation, contemplation, apathy, reevaluation", reversed: "Retreat, withdrawal, checking in with yourself, self-reflection" },
            { name: "Five of Cups", upright: "Regret, failure, disappointment, pessimism", reversed: "Personal setbacks, self-forgiveness, moving on, regret" },
            { name: "Six of Cups", upright: "Revisiting the past, childhood memories, innocence, joy", reversed: "Living in the past, forgiveness, lacking playfulness, 'growing up'" },
            { name: "Seven of Cups", upright: "Opportunities, choices, wishful thinking, illusion", reversed: "Alignment, personal values, overwhelmed by choices, indecision" },
            { name: "Eight of Cups", upright: "Disappointment, abandonment, withdrawal, escapism", reversed: "Trying one more time, indecision, aimless drifting, walking away" },
            { name: "Nine of Cups", upright: "Contentment, satisfaction, gratitude, wish come true", reversed: "Inner happiness, materialism, dissatisfaction, indulgence" },
            { name: "Ten of Cups", upright: "Divine love, blissful relationships, harmony, alignment", reversed: "Disconnection, misaligned values, struggling relationships, break-ups" },
            { name: "Page of Cups", upright: "Creative opportunities, intuitive messages, curiosity, possibility", reversed: "New ideas, doubting intuition, creative blocks, emotional immaturity" },
            { name: "Knight of Cups", upright: "Creativity, romance, bringing or receiving a message, imagination", reversed: "Moodiness, disappointment, overactive imagination, lack of direction" },
            { name: "Queen of Cups", upright: "Compassionate, caring, emotionally stable, intuitive, in flow", reversed: "Inner feelings, self-care, self-love, intuition, repressed emotions" },
            { name: "King of Cups", upright: "Emotionally balanced, compassionate, diplomatic", reversed: "Self-compassion, inner feelings, self-care, self-love, moodiness" }
        ],
        swords: [
            { name: "Ace of Swords", upright: "Breakthroughs, new ideas, mental clarity, success", reversed: "Inner clarity, re-thinking an idea, clouded judgement, overthinking" },
            { name: "Two of Swords", upright: "Difficult decisions, weighing up options, an impasse, avoidance", reversed: "Indecision, confusion, information overload, stalemate" },
            { name: "Three of Swords", upright: "Heartbreak, emotional pain, sorrow, grief, hurt", reversed: "Negative self-talk, releasing pain, optimism, forgiveness, trauma" },
            { name: "Four of Swords", upright: "Rest, relaxation, meditation, contemplation, recuperation", reversed: "Exhaustion, burn-out, deep contemplation, stagnation" },
            { name: "Five of Swords", upright: "Conflict, disagreements, competition, defeat, winning at all costs", reversed: "Inner conflict, conflict avoidance, releasing resentment, making amends" },
            { name: "Six of Swords", upright: "Transition, change, rite of passage, releasing baggage", reversed: "Personal transition, resistance to change, unfinished business, persistent problems" },
            { name: "Seven of Swords", upright: "Betrayal, deception, getting away with something, acting strategically", reversed: "Imposter syndrome, self-deception, keeping secrets, mental challenges" },
            { name: "Eight of Swords", upright: "Negative thoughts, self-imposed restriction, imprisonment, victim mentality", reversed: "Self-limiting beliefs, inner critic, releasing negative thoughts, open to new perspectives" },
            { name: "Nine of Swords", upright: "Anxiety, worry, fear, depression, nightmares", reversed: "Inner turmoil, deep-seated fears, shame, guilt, releasing worry, self-compassion" },
            { name: "Ten of Swords", upright: "Painful endings, deep wounds, betrayal, loss, crisis", reversed: "Recovery, regeneration, resisting an inevitable end, facing the worst" },
            { name: "Page of Swords", upright: "New ideas, curiosity, thirst for knowledge, new ways of communicating", reversed: "Self-expression, all talk and no action, haphazard action, haste" },
            { name: "Knight of Swords", upright: "Ambitious, action-oriented, driven to succeed, fast-thinking", reversed: "Restless, unfocused, impulsive, burn-out, lacking direction" },
            { name: "Queen of Swords", upright: "Independent, unbiased judgement, clear boundaries, direct communication", reversed: "Overly-emotional, easily influenced, bitchy, cold-hearted, righteous" },
            { name: "King of Swords", upright: "Mental clarity, intellectual power, authority, truth", reversed: "Quiet power, inner truth, misuse of power, manipulation, overactive mind" }
        ],
        pentacles: [
            { name: "Ace of Pentacles", upright: "A new financial or career opportunity, manifestation, abundance", reversed: "Lost opportunity, missed chance, bad investment, bad luck" },
            { name: "Two of Pentacles", upright: "Multiple priorities, time management, prioritisation, organisation", reversed: "Over-committed, disorganisation, reprioritisation, overbooked" },
            { name: "Three of Pentacles", upright: "Collaboration, learning, implementation, teamwork", reversed: "Disharmony, misalignment, working alone, ego clash" },
            { name: "Four of Pentacles", upright: "Saving money, security, conservatism, scarcity, control", reversed: "Over-spending, greed, self-protection, stinginess, possessiveness" },
            { name: "Five of Pentacles", upright: "Financial loss, poverty, lack mindset, isolation, worry", reversed: "Recovery from financial loss, spiritual poverty, lack mindset, loneliness" },
            { name: "Six of Pentacles", upright: "Giving, receiving, sharing wealth, generosity, charity", reversed: "Self-care, unpaid debts, one-sided charity, martyrdom, financial independence" },
            { name: "Seven of Pentacles", upright: "Long-term view, sustainable results, perseverance, investment", reversed: "Lack of long-term vision, limited success or reward, impatience, lack of effort" },
            { name: "Eight of Pentacles", upright: "Apprenticeship, repetitive tasks, mastery, skill development", reversed: "Self-development, perfectionism, misdirected activity, boredom" },
            { name: "Nine of Pentacles", upright: "Abundance, luxury, self-sufficiency, financial independence", reversed: "Self-worth, over-investment in work, hustling, financial independence" },
            { name: "Ten of Pentacles", upright: "Wealth, financial security, family, long-term success, contribution", reversed: "The dark side of wealth, financial failure or loss, lack mindset, stinginess" },
            { name: "Page of Pentacles", upright: "Learning, studying, apprenticeship, new ideas, curiosity", reversed: "Lack of progress, procrastination, learn from failure, creative blocks" },
            { name: "Knight of Pentacles", upright: "Hard work, productivity, routine, conservatism, methodical", reversed: "Self-discipline, boredom, feeling 'stuck', perfectionism, misdirected activity" },
            { name: "Queen of Pentacles", upright: "Nurturing, practical, providing financially, a working parent", reversed: "Financial independence, self-care, work-home conflict, financial instability" },
            { name: "King of Pentacles", upright: "Financial success, business acumen, security, discipline, abundance", reversed: "Financially inept, obsessed with wealth and status, stubborn, overly ambitious" }
        ]
    }
};

// Current state
let currentCard = null;
let isReversed = false;

/**
 * Initialize Tarot System
 */
document.addEventListener('DOMContentLoaded', function() {
    initializeTarotSystem();
});

function initializeTarotSystem() {
    const drawCardBtn = document.getElementById('drawCard');
    const newReadingBtn = document.getElementById('newReading');
    const saveReadingBtn = document.getElementById('saveReading');

    if (drawCardBtn) {
        drawCardBtn.addEventListener('click', drawRandomCard);
    }

    if (newReadingBtn) {
        newReadingBtn.addEventListener('click', drawRandomCard);
    }

    if (saveReadingBtn) {
        saveReadingBtn.addEventListener('click', saveReading);
    }

    // Add card flip animation
    initializeCardFlip();
}

/**
 * Draw a random tarot card
 */
function drawRandomCard() {
    // Hide initial state
    const initialState = document.getElementById('initialState');
    const cardContainer = document.getElementById('cardContainer');

    if (initialState) initialState.classList.add('hidden');
    if (cardContainer) cardContainer.classList.remove('hidden');

    // Determine if card is reversed (30% chance)
    isReversed = Math.random() < 0.3;

    // Select random card from Major Arcana (70% chance) or Minor Arcana (30% chance)
    if (Math.random() < 0.7) {
        // Major Arcana
        const randomIndex = Math.floor(Math.random() * tarotDeck.majorArcana.length);
        currentCard = tarotDeck.majorArcana[randomIndex];
    } else {
        // Minor Arcana
        const suits = ['wands', 'cups', 'swords', 'pentacles'];
        const randomSuit = suits[Math.floor(Math.random() * suits.length)];
        const suitCards = tarotDeck.minorArcana[randomSuit];
        const randomIndex = Math.floor(Math.random() * suitCards.length);
        currentCard = suitCards[randomIndex];
    }

    // Animate card reveal
    animateCardReveal();

    // Update card display after animation
    setTimeout(() => {
        displayCard(currentCard, isReversed);
    }, 1500);
}

/**
 * Animate card reveal
 */
function animateCardReveal() {
    const cardFront = document.querySelector('.card-front');
    const cardReveal = document.querySelector('.card-reveal');

    if (cardFront && cardReveal) {
        // Add flip animation
        cardFront.style.animation = 'cardFlip 1.5s ease-in-out';
        setTimeout(() => {
            cardFront.classList.add('hidden');
            cardReveal.classList.remove('hidden');
            cardReveal.style.animation = 'cardReveal 0.8s ease-out';
        }, 750);
    }
}

/**
 * Display the drawn card
 */
function displayCard(card, reversed) {
    const cardName = document.getElementById('cardName');
    const cardPosition = document.getElementById('cardPosition');
    const cardDescription = document.getElementById('cardDescription');
    const cardGuidance = document.getElementById('cardGuidance');
    const cardQuestion = document.getElementById('cardQuestion');

    if (cardName) cardName.textContent = card.name;
    if (cardPosition) cardPosition.textContent = reversed ? 'Reversed' : 'Upright';

    // Set card meaning based on position
    if (cardDescription) {
        if (reversed && card.reversed) {
            cardDescription.textContent = card.reversed;
        } else {
            cardDescription.textContent = card.upright || card.meaning;
        }
    }

    if (cardGuidance) cardGuidance.textContent = card.guidance;
    if (cardQuestion) cardQuestion.textContent = card.question;

    // Add mystical sound effect (visual feedback)
    createMysticalEffect();
}

/**
 * Initialize card flip functionality
 */
function initializeCardFlip() {
    const tarotCard = document.querySelector('.tarot-card-large');

    if (tarotCard) {
        tarotCard.addEventListener('click', function() {
            if (!currentCard) {
                drawRandomCard();
            }
        });
    }
}

/**
 * Create mystical visual effects
 */
function createMysticalEffect() {
    // Create floating particles
    for (let i = 0; i < 10; i++) {
        setTimeout(() => {
            createParticle();
        }, i * 100);
    }

    // Add glow effect to card
    const cardReveal = document.querySelector('.card-reveal');
    if (cardReveal) {
        cardReveal.style.boxShadow = '0 0 30px rgba(246, 213, 92, 0.5)';
        setTimeout(() => {
            cardReveal.style.boxShadow = '';
        }, 3000);
    }
}

function createParticle() {
    const particle = document.createElement('div');
    particle.className = 'mystical-particle';
    particle.style.left = Math.random() * 100 + '%';
    particle.style.top = Math.random() * 100 + '%';
    particle.style.animation = `particleFloat ${2 + Math.random() * 2}s ease-out`;

    document.body.appendChild(particle);

    setTimeout(() => {
        particle.remove();
    }, 3000);
}

/**
 * Save reading functionality
 */
function saveReading() {
    if (!currentCard) return;

    const reading = {
        card: currentCard.name,
        position: isReversed ? 'Reversed' : 'Upright',
        timestamp: new Date().toISOString(),
        guidance: currentCard.guidance,
        question: currentCard.question
    };

    // Save to localStorage
    const savedReadings = JSON.parse(localStorage.getItem('midnightMagnoliaReadings') || '[]');
    savedReadings.push(reading);

    // Keep only last 10 readings
    if (savedReadings.length > 10) {
        savedReadings.shift();
    }

    localStorage.setItem('midnightMagnoliaReadings', JSON.stringify(savedReadings));

    // Show success message
    showNotification('Reading saved to your journal!', 'success');
}

/**
 * Show notification
 */
function showNotification(message, type = 'info') {
    const notification = document.createElement('div');
    notification.className = `notification notification--${type}`;
    notification.textContent = message;

    document.body.appendChild(notification);

    setTimeout(() => {
        notification.style.animation = 'notificationFade 0.5s ease-out';
        setTimeout(() => {
            notification.remove();
        }, 500);
    }, 3000);
}

/**
 * Utility functions
 */
function shuffleArray(array) {
    for (let i = array.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [array[i], array[j]] = [array[j], array[i]];
    }
    return array;
}

function getRandomInt(min, max) {
    return Math.floor(Math.random() * (max - min + 1)) + min;
}

// Export for potential use in other scripts
window.TarotSystem = {
    drawRandomCard,
    getCurrentCard: () => currentCard,
    isReversed: () => isReversed,
    saveReading
};
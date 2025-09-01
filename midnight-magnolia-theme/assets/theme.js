/**
 * ===============================================
 * MIDNIGHT MAGNOLIA SHOPIFY THEME - SECURE JS
 * A sophisticated theme for spiritual wellness
 *
 * Security Features:
 * - DOMPurify integration for XSS prevention
 * - CSRF token handling for forms
 * - Input sanitization and validation
 * - Secure event handling
 * - Content Security Policy compliance
 * - Error boundary and logging
 * ===============================================
 */

// Security: Strict mode for better error handling
'use strict';

// Security: Create secure namespace to prevent global pollution
window.MidnightMagnolia = window.MidnightMagnolia || {};

(function(theme) {

  // ===============================================
  // SECURITY CONFIGURATION
  // ===============================================

  const SECURITY_CONFIG = {
    // DOMPurify configuration for safe HTML
    domPurifyConfig: {
      ALLOWED_TAGS: ['b', 'i', 'em', 'strong', 'span', 'p', 'br'],
      ALLOWED_ATTR: ['class', 'id'],
      FORBID_SCRIPT: true,
      FORBID_TAGS: ['script', 'object', 'embed', 'link', 'style', 'img', 'svg'],
      FORBID_ATTR: ['onload', 'onerror', 'onclick', 'onmouseover', 'style'],
      RETURN_DOM: false,
      RETURN_DOM_FRAGMENT: false,
      RETURN_DOM_IMPORT: false
    },

    // Input validation patterns
    patterns: {
      email: /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/,
      phone: /^[\+]?[1-9][\d]{0,15}$/,
      alphanumeric: /^[a-zA-Z0-9\s\-_.,!?]+$/,
      url: /^https?:\/\/(www\.)?[-a-zA-Z0-9@:%._\+~#=]{1,256}\.[a-zA-Z0-9()]{1,6}\b([-a-zA-Z0-9()@:%_\+.~#?&//=]*)$/
    },

    // Rate limiting for form submissions
    rateLimiting: {
      maxRequests: 5,
      timeWindow: 60000, // 1 minute
      requestLog: new Map()
    }
  };

  // ===============================================
  // DOMПURIFY INTEGRATION (CDN Fallback)
  // ===============================================

  /**
   * Load DOMPurify library securely
   * @returns {Promise} Promise that resolves when DOMPurify is loaded
   */
  function loadDOMPurify() {
    return new Promise((resolve, reject) => {
      // Check if DOMPurify is already loaded
      if (window.DOMPurify) {
        resolve(window.DOMPurify);
        return;
      }

      // Create script element with security attributes
      const script = document.createElement('script');
      script.src = 'https://cdn.jsdelivr.net/npm/dompurify@3.0.5/dist/purify.min.js';
      script.integrity = 'sha384-FqMAQjQ2SPSXHQ0+5OdQYOYJl/Q/7D8gELNpBkKZxW8LZzIVdUkREJMNtRtFdVbS';
      script.crossOrigin = 'anonymous';
      script.async = true;

      script.onload = () => {
        if (window.DOMPurify) {
          resolve(window.DOMPurify);
        } else {
          reject(new Error('DOMPurify failed to load'));
        }
      };

      script.onerror = () => {
        console.warn('DOMPurify CDN failed, using fallback sanitization');
        // Provide basic fallback sanitization
        window.DOMPurify = {
          sanitize: (html) => {
            return html.replace(/<script\b[^<]*(?:(?!<\/script>)<[^<]*)*<\/script>/gi, '')
                      .replace(/<iframe\b[^<]*(?:(?!<\/iframe>)<[^<]*)*<\/iframe>/gi, '')
                      .replace(/on\w+\s*=\s*["'][^"']*["']/gi, '')
                      .replace(/javascript:/gi, '');
          }
        };
        resolve(window.DOMPurify);
      };

      document.head.appendChild(script);
    });
  }

  // ===============================================
  // SECURITY UTILITIES
  // ===============================================

  /**
   * Sanitize HTML content using DOMPurify
   * @param {string} html - HTML content to sanitize
   * @returns {string} Sanitized HTML
   */
  function sanitizeHTML(html) {
    if (!html || typeof html !== 'string') return '';

    try {
      if (window.DOMPurify) {
        return window.DOMPurify.sanitize(html, SECURITY_CONFIG.domPurifyConfig);
      }

      // Fallback sanitization
      return html.replace(/<script\b[^<]*(?:(?!<\/script>)<[^<]*)*<\/script>/gi, '')
                .replace(/<iframe\b[^<]*(?:(?!<\/iframe>)<[^<]*)*<\/iframe>/gi, '')
                .replace(/on\w+\s*=\s*["'][^"']*["']/gi, '')
                .replace(/javascript:/gi, '');
    } catch (error) {
      console.error('HTML sanitization failed:', error);
      return '';
    }
  }

  /**
   * Validate input against security patterns
   * @param {string} input - Input to validate
   * @param {string} type - Type of validation (email, phone, etc.)
   * @returns {boolean} True if valid
   */
  function validateInput(input, type) {
    if (!input || typeof input !== 'string') return false;

    const pattern = SECURITY_CONFIG.patterns[type];
    if (!pattern) return false;

    // Additional length checks for security
    const maxLengths = {
      email: 254,
      phone: 20,
      alphanumeric: 1000,
      url: 2048
    };

    if (input.length > (maxLengths[type] || 1000)) return false;

    return pattern.test(input);
  }

  /**
   * Sanitize form data for safe submission
   * @param {FormData|Object} data - Form data to sanitize
   * @returns {Object} Sanitized data
   */
  function sanitizeFormData(data) {
    const sanitized = {};

    if (data instanceof FormData) {
      for (let [key, value] of data.entries()) {
        sanitized[key] = sanitizeHTML(value);
      }
    } else if (typeof data === 'object') {
      for (let [key, value] of Object.entries(data)) {
        if (typeof value === 'string') {
          sanitized[key] = sanitizeHTML(value);
        } else {
          sanitized[key] = value;
        }
      }
    }

    return sanitized;
  }

  /**
   * Rate limiting for API requests
   * @param {string} identifier - Unique identifier for rate limiting
   * @returns {boolean} True if request is allowed
   */
  function checkRateLimit(identifier) {
    const now = Date.now();
    const config = SECURITY_CONFIG.rateLimiting;

    if (!config.requestLog.has(identifier)) {
      config.requestLog.set(identifier, []);
    }

    const requests = config.requestLog.get(identifier);

    // Remove old requests outside time window
    const validRequests = requests.filter(time => now - time < config.timeWindow);

    if (validRequests.length >= config.maxRequests) {
      return false;
    }

    validRequests.push(now);
    config.requestLog.set(identifier, validRequests);

    return true;
  }

  // ===============================================
  // CSRF PROTECTION
  // ===============================================

  /**
   * Get CSRF token from meta tag or global variable
   * @returns {string|null} CSRF token
   */
  function getCSRFToken() {
    // Try meta tag first
    const metaToken = document.querySelector('meta[name="csrf-token"]');
    if (metaToken) {
      return metaToken.getAttribute('content');
    }

    // Try global theme variable
    if (window.theme && window.theme.csrfToken) {
      return window.theme.csrfToken;
    }

    return null;
  }

  /**
   * Add CSRF token to request data
   * @param {Object} data - Request data
   * @returns {Object} Data with CSRF token
   */
  function addCSRFToken(data) {
    const token = getCSRFToken();

    if (token && window.theme && window.theme.settings && window.theme.settings.enableCsrf) {
      data.authenticity_token = token;
    }

    return data;
  }

  // ===============================================
  // SECURE AJAX WRAPPER
  // ===============================================

  /**
   * Secure AJAX request wrapper
   * @param {Object} options - Request options
   * @returns {Promise} Request promise
   */
  function secureAjax(options) {
    return new Promise((resolve, reject) => {
      // Validate required options
      if (!options || !options.url) {
        reject(new Error('Invalid request options'));
        return;
      }

      // Rate limiting check
      const identifier = options.url + (options.method || 'GET');
      if (!checkRateLimit(identifier)) {
        reject(new Error('Rate limit exceeded'));
        return;
      }

      // Prepare request
      const xhr = new XMLHttpRequest();
      const method = (options.method || 'GET').toUpperCase();
      const url = options.url;

      // Security: Only allow same-origin requests unless explicitly allowed
      const allowedOrigins = [
        window.location.origin,
        'https://' + (window.theme?.settings?.shopDomain || '')
      ];

      const urlObj = new URL(url, window.location.origin);
      if (!allowedOrigins.some(origin => urlObj.origin === origin)) {
        reject(new Error('Cross-origin request not allowed'));
        return;
      }

      xhr.open(method, url, true);

      // Security headers
      xhr.setRequestHeader('X-Requested-With', 'XMLHttpRequest');

      // Content type for POST requests
      if (method === 'POST' || method === 'PUT') {
        xhr.setRequestHeader('Content-Type', 'application/x-www-form-urlencoded');
      }

      // Prepare data
      let data = options.data || {};

      // Add CSRF token for state-changing requests
      if (method !== 'GET' && method !== 'HEAD') {
        data = addCSRFToken(data);
      }

      // Sanitize form data
      data = sanitizeFormData(data);

      // Convert to form data string
      const formData = Object.keys(data)
        .map(key => encodeURIComponent(key) + '=' + encodeURIComponent(data[key]))
        .join('&');

      // Set up response handlers
      xhr.onload = function() {
        if (xhr.status >= 200 && xhr.status < 300) {
          try {
            const response = JSON.parse(xhr.responseText);
            resolve(response);
          } catch (e) {
            resolve(xhr.responseText);
          }
        } else {
          reject(new Error('Request failed: ' + xhr.status));
        }
      };

      xhr.onerror = function() {
        reject(new Error('Network error'));
      };

      xhr.ontimeout = function() {
        reject(new Error('Request timeout'));
      };

      // Security: Set timeout to prevent hanging requests
      xhr.timeout = options.timeout || 10000;

      // Send request
      xhr.send(method === 'GET' ? null : formData);
    });
  }

  // ===============================================
  // SECURE EVENT HANDLING
  // ===============================================

  /**
   * Secure event listener wrapper
   * @param {Element} element - Target element
   * @param {string} event - Event type
   * @param {Function} handler - Event handler
   * @param {Object} options - Event options
   */
  function secureEventListener(element, event, handler, options = {}) {
    if (!element || !event || typeof handler !== 'function') {
      console.error('Invalid event listener parameters');
      return;
    }

    const secureHandler = function(e) {
      try {
        // Security: Prevent default for potentially dangerous events
        if (['beforeunload', 'unload'].includes(event)) {
          e.preventDefault();
        }

        // Call original handler with error boundary
        handler.call(this, e);
      } catch (error) {
        console.error('Event handler error:', error);

        // Security: Don't expose error details to user
        if (options.showUserError) {
          showUserNotification('An error occurred. Please try again.', 'error');
        }
      }
    };

    element.addEventListener(event, secureHandler, options);

    // Return cleanup function
    return function() {
      element.removeEventListener(event, secureHandler, options);
    };
  }

  // ===============================================
  // USER NOTIFICATION SYSTEM
  // ===============================================

  /**
   * Show secure user notification
   * @param {string} message - Message to display
   * @param {string} type - Notification type (success, error, warning)
   */
  function showUserNotification(message, type = 'info') {
    // Sanitize message
    const sanitizedMessage = sanitizeHTML(message);

    if (!sanitizedMessage) {
      console.error('Invalid notification message');
      return;
    }

    // Create notification element
    const notification = document.createElement('div');
    notification.className = `notification notification--${type}`;
    notification.setAttribute('role', 'alert');
    notification.setAttribute('aria-live', 'polite');

    // Create content with close button
    notification.innerHTML = `
      <div class="notification__content">
        <span class="notification__message">${sanitizedMessage}</span>
        <button type="button" class="notification__close" aria-label="Close notification">
          <span aria-hidden="true">&times;</span>
        </button>
      </div>
    `;

    // Add to page
    const container = document.querySelector('.notifications-container') || document.body;
    container.appendChild(notification);

    // Auto-remove after 5 seconds
    setTimeout(() => {
      if (notification.parentNode) {
        notification.parentNode.removeChild(notification);
      }
    }, 5000);

    // Close button functionality
    const closeBtn = notification.querySelector('.notification__close');
    secureEventListener(closeBtn, 'click', () => {
      if (notification.parentNode) {
        notification.parentNode.removeChild(notification);
      }
    });
  }

  // ===============================================
  // THEME INITIALIZATION
  // ===============================================

  /**
   * Initialize theme with security features
   */
  function initTheme() {
    // Load DOMPurify
    loadDOMPurify().then(() => {
      console.log('DOMPurify loaded successfully');
    }).catch((error) => {
      console.warn('DOMPurify load failed:', error);
    });

    // Security: Sanitize existing content
    const userContentElements = document.querySelectorAll('.user-content, [data-user-content]');
    userContentElements.forEach(element => {
      element.innerHTML = sanitizeHTML(element.innerHTML);
    });

    // Initialize secure form handling
    initSecureForms();

    // Initialize cart functionality
    initSecureCart();

    // Initialize search functionality
    initSecureSearch();

    // Initialize lazy loading
    initLazyLoading();

    console.log('Midnight Magnolia theme initialized securely');
  }

  /**
   * Initialize secure form handling
   */
  function initSecureForms() {
    const forms = document.querySelectorAll('form[data-secure]');

    forms.forEach(form => {
      secureEventListener(form, 'submit', function(e) {
        e.preventDefault();

        const formData = new FormData(this);
        const sanitizedData = sanitizeFormData(formData);

        // Add form validation
        const isValid = validateFormData(sanitizedData, this);

        if (!isValid) {
          showUserNotification('Please check your input and try again.', 'error');
          return;
        }

        // Submit form securely
        secureAjax({
          url: this.action,
          method: this.method || 'POST',
          data: sanitizedData
        }).then(response => {
          showUserNotification('Form submitted successfully!', 'success');
        }).catch(error => {
          console.error('Form submission error:', error);
          showUserNotification('Submission failed. Please try again.', 'error');
        });
      });
    });
  }

  /**
   * Validate form data
   * @param {Object} data - Form data to validate
   * @param {Element} form - Form element
   * @returns {boolean} True if valid
   */
  function validateFormData(data, form) {
    const requiredFields = form.querySelectorAll('[required]');

    for (let field of requiredFields) {
      const value = data[field.name];

      if (!value || value.trim() === '') {
        field.focus();
        return false;
      }

      // Type-specific validation
      if (field.type === 'email' && !validateInput(value, 'email')) {
        field.focus();
        return false;
      }

      if (field.type === 'tel' && !validateInput(value, 'phone')) {
        field.focus();
        return false;
      }
    }

    return true;
  }

  /**
   * Initialize secure cart functionality
   */
  function initSecureCart() {
    const cartButtons = document.querySelectorAll('[data-cart-action]');

    cartButtons.forEach(button => {
      secureEventListener(button, 'click', function(e) {
        e.preventDefault();

        const action = this.dataset.cartAction;
        const productId = this.dataset.productId;
        const variantId = this.dataset.variantId;

        if (!productId || !variantId) {
          showUserNotification('Invalid product selection.', 'error');
          return;
        }

        const cartData = {
          id: variantId,
          quantity: 1
        };

        secureAjax({
          url: window.theme?.settings?.routes?.cartAdd || '/cart/add.js',
          method: 'POST',
          data: cartData
        }).then(response => {
          showUserNotification('Product added to cart!', 'success');
          updateCartCount();
        }).catch(error => {
          console.error('Cart error:', error);
          showUserNotification('Failed to add to cart.', 'error');
        });
      });
    });
  }

  /**
   * Initialize secure search functionality
   */
  function initSecureSearch() {
    const searchForms = document.querySelectorAll('.search-form');

    searchForms.forEach(form => {
      const input = form.querySelector('input[type="search"]');

      if (input) {
        secureEventListener(input, 'input', debounce(function(e) {
          const query = sanitizeHTML(e.target.value);

          if (query.length >= 3) {
            performSecureSearch(query);
          }
        }, 300));
      }
    });
  }

  /**
   * Perform secure search
   * @param {string} query - Search query
   */
  function performSecureSearch(query) {
    if (!validateInput(query, 'alphanumeric')) {
      return;
    }

    secureAjax({
      url: window.theme?.settings?.routes?.predictiveSearch || '/search/suggest.json',
      method: 'GET',
      data: { q: query, resources: { type: 'product', limit: 10 } }
    }).then(response => {
      displaySearchResults(response);
    }).catch(error => {
      console.error('Search error:', error);
    });
  }

  /**
   * Initialize lazy loading for images
   */
  function initLazyLoading() {
    if ('IntersectionObserver' in window) {
      const imageObserver = new IntersectionObserver((entries, observer) => {
        entries.forEach(entry => {
          if (entry.isIntersecting) {
            const img = entry.target;
            img.src = img.dataset.src;
            img.classList.remove('lazy');
            img.classList.add('loaded');
            observer.unobserve(img);
          }
        });
      });

      const lazyImages = document.querySelectorAll('img[data-src].lazy');
      lazyImages.forEach(img => imageObserver.observe(img));
    }
  }

  // ===============================================
  // UTILITY FUNCTIONS
  // ===============================================

  /**
   * Debounce function for performance
   * @param {Function} func - Function to debounce
   * @param {number} wait - Wait time in milliseconds
   * @returns {Function} Debounced function
   */
  function debounce(func, wait) {
    let timeout;
    return function executedFunction(...args) {
      const later = () => {
        clearTimeout(timeout);
        func(...args);
      };
      clearTimeout(timeout);
      timeout = setTimeout(later, wait);
    };
  }

  /**
   * Update cart count display
   */
  function updateCartCount() {
    secureAjax({
      url: window.theme?.settings?.routes?.cart || '/cart.js',
      method: 'GET'
    }).then(response => {
      const cartCount = response.item_count || 0;
      const cartCountElements = document.querySelectorAll('.cart-count');

      cartCountElements.forEach(element => {
        element.textContent = cartCount;
        element.style.display = cartCount > 0 ? 'inline' : 'none';
      });
    }).catch(error => {
      console.error('Cart count update error:', error);
    });
  }

  // ===============================================
  // PUBLIC API
  // ===============================================

  // Expose secure public methods
  theme.sanitizeHTML = sanitizeHTML;
  theme.validateInput = validateInput;
  theme.secureAjax = secureAjax;
  theme.showNotification = showUserNotification;
  theme.addCSRFToken = addCSRFToken;

  // Initialize when DOM is ready
  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', initTheme);
  } else {
    initTheme();
  }

})(window.MidnightMagnolia);

// Security: Freeze the namespace to prevent tampering
Object.freeze(window.MidnightMagnolia);
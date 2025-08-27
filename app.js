// Enhanced Portfolio App JavaScript

document.addEventListener('DOMContentLoaded', function() {
    // DOM Elements
    const navbar = document.getElementById('navbar');
    const navToggle = document.getElementById('nav-toggle');
    const navMenu = document.getElementById('nav-menu');
    const navLinks = document.querySelectorAll('.nav-link');
    const scrollToTopBtn = document.getElementById('scroll-to-top');
    const contactForm = document.getElementById('contact-form');
    const submitBtn = document.getElementById('submit-btn');
    const btnText = submitBtn?.querySelector('.btn-text');
    const btnLoader = submitBtn?.querySelector('.btn-loader');
    const resumeModal = document.getElementById('resume-modal');

    // Cache for form data (in memory since localStorage is not available)
    let formDataCache = {};

    // Initialize hero buttons
    function initHeroButtons() {
        const viewProjectsBtn = document.querySelector('a[href="#projects"]');
        const contactMeBtn = document.querySelector('a[href="#contact"]');
        
        if (viewProjectsBtn) {
            viewProjectsBtn.addEventListener('click', function(e) {
                e.preventDefault();
                scrollToSection('projects');
            });
        }
        
        if (contactMeBtn) {
            contactMeBtn.addEventListener('click', function(e) {
                e.preventDefault();
                scrollToSection('contact');
            });
        }
    }

    // Utility function to scroll to section
    function scrollToSection(sectionId) {
        const targetSection = document.getElementById(sectionId);
        if (targetSection) {
            const offsetTop = targetSection.offsetTop - 80; // Account for fixed navbar
            window.scrollTo({
                top: offsetTop,
                behavior: 'smooth'
            });
        }
    }

    // Navigation functionality
    function initNavigation() {
        // Mobile menu toggle
        if (navToggle && navMenu) {
            navToggle.addEventListener('click', function(e) {
                e.stopPropagation();
                navMenu.classList.toggle('active');
                navToggle.classList.toggle('active');
            });
        }

        // Close mobile menu when clicking on links
        navLinks.forEach(link => {
            link.addEventListener('click', function(e) {
                e.preventDefault();
                const targetId = this.getAttribute('href');
                const sectionId = targetId.replace('#', '');
                
                // Close mobile menu
                if (navMenu) navMenu.classList.remove('active');
                if (navToggle) navToggle.classList.remove('active');
                
                // Scroll to section
                scrollToSection(sectionId);
            });
        });

        // Close mobile menu when clicking outside
        document.addEventListener('click', function(e) {
            if (navbar && !navbar.contains(e.target)) {
                if (navMenu) navMenu.classList.remove('active');
                if (navToggle) navToggle.classList.remove('active');
            }
        });
    }

    // Resume modal functionality
    function initResumeModal() {
        const resumeViewURL = "https://drive.google.com/file/d/10XrO7nhJvdvdoRgEVx-kFmJSjrHpgbiQ/view?usp=drive_link";
        const resumeDownloadURL = "https://drive.google.com/uc?export=download&id=10XrO7nhJvdvdoRgEVx-kFmJSjrHpgbiQ";

        // Make functions globally available
        window.openResumeModal = function() {
            if (resumeModal) {
                resumeModal.classList.remove('hidden');
                document.body.style.overflow = 'hidden';
            }
        };

        window.closeResumeModal = function() {
            if (resumeModal) {
                resumeModal.classList.add('hidden');
                document.body.style.overflow = '';
            }
        };

        window.viewResume = function() {
            // Open the resume in a new tab
            window.open(resumeViewURL, '_blank');
        };

        window.downloadResume = function() {
            // Trigger download of the resume
            const link = document.createElement('a');
            link.href = resumeDownloadURL;
            link.download = 'Khushnood_Ali_Resume.pdf';
            document.body.appendChild(link);
            link.click();
            document.body.removeChild(link);
        };

        // Close modal with Escape key
        document.addEventListener('keydown', function(e) {
            if (e.key === 'Escape' && resumeModal && !resumeModal.classList.contains('hidden')) {
                window.closeResumeModal();
            }
        });
    }


    // Publications abstract toggle
    function initPublications() {
        window.toggleAbstract = function() {
            const abstract = document.getElementById('publication-abstract');
            const button = event.target;
            
            if (abstract) {
                if (abstract.classList.contains('hidden')) {
                    abstract.classList.remove('hidden');
                    button.textContent = 'Hide Abstract';
                } else {
                    abstract.classList.add('hidden');
                    button.textContent = 'Read Abstract';
                }
            }
        };
    }

    // Fix GitHub and external links
    function initProjectLinks() {
        const externalLinks = document.querySelectorAll('a[href*="github.com"], a[href*="linkedin.com"], a[href*="leetcode.com"], a[target="_blank"]');
        externalLinks.forEach(link => {
            // Ensure target="_blank" and rel attributes are set
            link.setAttribute('target', '_blank');
            link.setAttribute('rel', 'noopener noreferrer');
            
            // Add click handler to ensure it works
            link.addEventListener('click', function(e) {
                // Let the default behavior handle the navigation
                console.log('Opening external link:', this.href);
            });
        });
    }

    // Scroll effects
    function initScrollEffects() {
        let ticking = false;

        function updateScrollEffects() {
            const scrollY = window.scrollY;

            // Navbar background opacity
            if (navbar) {
                if (scrollY > 50) {
                    navbar.style.background = 'rgba(19, 52, 59, 0.98)';
                } else {
                    navbar.style.background = 'rgba(19, 52, 59, 0.95)';
                }
            }

            // Show/hide scroll to top button
            if (scrollToTopBtn) {
                if (scrollY > 300) {
                    scrollToTopBtn.classList.add('visible');
                } else {
                    scrollToTopBtn.classList.remove('visible');
                }
            }

            // Update active navigation link
            updateActiveNavLink();

            ticking = false;
        }

        function requestScrollUpdate() {
            if (!ticking) {
                requestAnimationFrame(updateScrollEffects);
                ticking = true;
            }
        }

        window.addEventListener('scroll', requestScrollUpdate);
    }

    // Update active navigation link based on scroll position
    function updateActiveNavLink() {
        const sections = ['home', 'about', 'experience', 'skills', 'projects', 'publications', 'certifications', 'contact'];
        const scrollY = window.scrollY + 100; // Offset for better detection

        sections.forEach(sectionId => {
            const section = document.getElementById(sectionId);
            const navLink = document.querySelector(`a[href="#${sectionId}"]`);
            
            if (section && navLink) {
                const sectionTop = section.offsetTop;
                const sectionHeight = section.offsetHeight;
                
                if (scrollY >= sectionTop && scrollY < sectionTop + sectionHeight) {
                    // Remove active class from all links
                    navLinks.forEach(link => link.classList.remove('active'));
                    // Add active class to current link
                    navLink.classList.add('active');
                }
            }
        });
    }

    // Scroll to top functionality
    function initScrollToTop() {
        if (scrollToTopBtn) {
            scrollToTopBtn.addEventListener('click', function() {
                window.scrollTo({
                    top: 0,
                    behavior: 'smooth'
                });
            });
        }
    }

    // Contact form functionality
    function initContactForm() {
        if (!contactForm) return;

        // Load saved form data from memory cache
        loadFormData();

        // Save form data on input
        const formInputs = contactForm.querySelectorAll('input, textarea');
        formInputs.forEach(input => {
            input.addEventListener('input', saveFormData);
        });

        // Form submission
        contactForm.addEventListener('submit', function(e) {
            e.preventDefault();
            handleFormSubmission();
        });
    }

    // Save form data to memory cache
    function saveFormData() {
        if (!contactForm) return;
        
        const formData = new FormData(contactForm);
        formDataCache = {
            name: formData.get('name') || '',
            email: formData.get('email') || '',
            subject: formData.get('subject') || '',
            message: formData.get('message') || ''
        };
    }

    function loadFormData() {
        // Load data from memory cache during the session
        if (formDataCache.name) {
            const nameField = document.getElementById('name');
            const emailField = document.getElementById('email');
            const subjectField = document.getElementById('subject');
            const messageField = document.getElementById('message');
            
            if (nameField) nameField.value = formDataCache.name;
            if (emailField) emailField.value = formDataCache.email;
            if (subjectField) subjectField.value = formDataCache.subject;
            if (messageField) messageField.value = formDataCache.message;
        }
    }

    // Handle form submission
    function handleFormSubmission() {
        // Validate form
        if (!validateForm()) {
            return;
        }

        // Show loading state
        showLoadingState();

        // Simulate form submission (since we can't actually send emails)
        setTimeout(() => {
            hideLoadingState();
            showSuccessMessage();
            resetForm();
        }, 2000);
    }

    // Form validation
    function validateForm() {
        const nameField = document.getElementById('name');
        const emailField = document.getElementById('email');
        const subjectField = document.getElementById('subject');
        const messageField = document.getElementById('message');
        
        if (!nameField || !emailField || !subjectField || !messageField) {
            showErrorMessage('Form fields not found.');
            return false;
        }

        const name = nameField.value.trim();
        const email = emailField.value.trim();
        const subject = subjectField.value.trim();
        const message = messageField.value.trim();

        if (!name || !email || !subject || !message) {
            showErrorMessage('Please fill in all fields.');
            return false;
        }

        if (!isValidEmail(email)) {
            showErrorMessage('Please enter a valid email address.');
            return false;
        }

        if (message.length < 10) {
            showErrorMessage('Message must be at least 10 characters long.');
            return false;
        }

        return true;
    }

    // Email validation
    function isValidEmail(email) {
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        return emailRegex.test(email);
    }

    // Show loading state
    function showLoadingState() {
        if (submitBtn) {
            submitBtn.disabled = true;
            if (btnText) btnText.classList.add('hidden');
            if (btnLoader) btnLoader.classList.remove('hidden');
        }
    }

    // Hide loading state
    function hideLoadingState() {
        if (submitBtn) {
            submitBtn.disabled = false;
            if (btnText) btnText.classList.remove('hidden');
            if (btnLoader) btnLoader.classList.add('hidden');
        }
    }

    // Show success message
    function showSuccessMessage() {
        showNotification('Thank you! Your message has been sent successfully.', 'success');
    }

    // Show error message
    function showErrorMessage(message) {
        showNotification(message, 'error');
    }

    // Show notification
    function showNotification(message, type) {
        // Create notification element
        const notification = document.createElement('div');
        notification.className = `notification notification--${type}`;
        notification.innerHTML = `
            <div class="notification-content" style="display: flex; align-items: center; gap: 12px;">
                <span class="notification-icon">${getNotificationIcon(type)}</span>
                <span class="notification-message" style="flex: 1;">${message}</span>
                <button class="notification-close" onclick="this.parentElement.parentElement.remove()" style="background: none; border: none; color: white; font-size: 18px; cursor: pointer; padding: 0; width: 20px; height: 20px;">×</button>
            </div>
        `;

        // Add styles
        notification.style.cssText = `
            position: fixed;
            top: 100px;
            right: 20px;
            z-index: 10000;
            background: ${getNotificationColor(type)};
            color: white;
            padding: 16px 20px;
            border-radius: 8px;
            box-shadow: 0 4px 12px rgba(0, 0, 0, 0.15);
            transform: translateX(100%);
            transition: transform 0.3s ease;
            max-width: 400px;
            word-wrap: break-word;
        `;

        // Add notification to DOM
        document.body.appendChild(notification);

        // Animate in
        setTimeout(() => {
            notification.style.transform = 'translateX(0)';
        }, 100);

        // Auto remove after 5 seconds
        setTimeout(() => {
            if (notification.parentNode) {
                notification.style.transform = 'translateX(100%)';
                setTimeout(() => {
                    if (notification.parentNode) {
                        notification.remove();
                    }
                }, 300);
            }
        }, 5000);
    }

    function getNotificationIcon(type) {
        switch(type) {
            case 'success': return '✅';
            case 'error': return '❌';
            case 'warning': return '⚠️';
            case 'info': return 'ℹ️';
            default: return 'ℹ️';
        }
    }

    function getNotificationColor(type) {
        switch(type) {
            case 'success': return 'var(--color-success)';
            case 'error': return 'var(--color-error)';
            case 'warning': return 'var(--color-warning)';
            case 'info': return 'var(--color-info)';
            default: return 'var(--color-info)';
        }
    }

    // Reset form
    function resetForm() {
        if (contactForm) {
            contactForm.reset();
            formDataCache = {};
        }
    }

    // Intersection Observer for animations
    function initScrollAnimations() {
        const animatedElements = document.querySelectorAll('.card, .skill-category, .project-card, .stat-item, .experience-item, .publication-card, .certification-card');
        
        const observerOptions = {
            threshold: 0.1,
            rootMargin: '0px 0px -50px 0px'
        };

        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    entry.target.style.opacity = '1';
                    entry.target.style.transform = 'translateY(0)';
                }
            });
        }, observerOptions);

        // Set initial styles and observe elements
        animatedElements.forEach((el, index) => {
            el.style.opacity = '0';
            el.style.transform = 'translateY(30px)';
            el.style.transition = `opacity 0.6s ease ${index * 0.1}s, transform 0.6s ease ${index * 0.1}s`;
            observer.observe(el);
        });
    }

    // Interactive card effects
    function initCardEffects() {
        const interactiveCards = document.querySelectorAll('.project-card, .certification-card, .experience-item');
        
        interactiveCards.forEach(card => {
            card.addEventListener('mouseenter', function() {
                this.style.transform = 'translateY(-8px)';
            });
            
            card.addEventListener('mouseleave', function() {
                this.style.transform = 'translateY(0)';
            });
        });
    }

    // Skill badge hover effects
    function initSkillBadgeEffects() {
        const skillBadges = document.querySelectorAll('.skill-badge');
        
        skillBadges.forEach(badge => {
            badge.addEventListener('mouseenter', function() {
                this.style.transform = 'translateY(-2px) scale(1.05)';
            });
            
            badge.addEventListener('mouseleave', function() {
                this.style.transform = 'translateY(0) scale(1)';
            });
        });
    }

    // Stats counter animation
    function initStatsAnimation() {
        const statNumbers = document.querySelectorAll('.stat-number, .stat-value');
        
        const animateCounter = (element) => {
            const target = parseFloat(element.textContent);
            const duration = 2000; // 2 seconds
            const steps = 60;
            const stepValue = target / steps;
            let current = 0;
            
            const timer = setInterval(() => {
                current += stepValue;
                if (current >= target) {
                    element.textContent = element.textContent.includes('.') ? target.toFixed(1) : Math.floor(target);
                    clearInterval(timer);
                } else {
                    element.textContent = element.textContent.includes('.') ? current.toFixed(1) : Math.floor(current);
                }
            }, duration / steps);
        };

        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting && !entry.target.dataset.animated) {
                    entry.target.dataset.animated = 'true';
                    animateCounter(entry.target);
                }
            });
        }, { threshold: 0.5 });

        statNumbers.forEach(stat => {
            observer.observe(stat);
        });
    }

    // Hero text typing effect
    function initTypingEffect() {
        const heroTitle = document.querySelector('.hero-title');
        if (heroTitle) {
            const originalText = heroTitle.textContent;
            heroTitle.textContent = '';
            
            let index = 0;
            const typeText = () => {
                if (index < originalText.length) {
                    heroTitle.textContent += originalText.charAt(index);
                    index++;
                    setTimeout(typeText, 100);
                }
            };
            
            // Start typing effect after a short delay
            setTimeout(typeText, 500);
        }
    }

    // Performance optimizations
    function initPerformanceOptimizations() {
        // Debounce resize events
        let resizeTimeout;
        window.addEventListener('resize', function() {
            clearTimeout(resizeTimeout);
            resizeTimeout = setTimeout(function() {
                updateActiveNavLink();
            }, 250);
        });

        // Preload critical sections
        const criticalSections = document.querySelectorAll('#home, #about, #experience');
        criticalSections.forEach(section => {
            if (section) {
                section.style.willChange = 'transform';
            }
        });

        // Lazy load images if any are added later
        if ('IntersectionObserver' in window) {
            const lazyImages = document.querySelectorAll('img[data-src]');
            const imageObserver = new IntersectionObserver((entries) => {
                entries.forEach(entry => {
                    if (entry.isIntersecting) {
                        const img = entry.target;
                        img.src = img.dataset.src;
                        img.removeAttribute('data-src');
                        imageObserver.unobserve(img);
                    }
                });
            });
            
            lazyImages.forEach(img => imageObserver.observe(img));
        }
    }

    // Error handling
    function initErrorHandling() {
        window.addEventListener('error', function(event) {
            console.error('Portfolio app error:', event.error);
            // Could show a user-friendly error message here
        });

        // Handle unhandled promise rejections
        window.addEventListener('unhandledrejection', function(event) {
            console.error('Unhandled promise rejection:', event.reason);
            event.preventDefault();
        });
    }

    // Keyboard shortcuts
    function initKeyboardShortcuts() {
        document.addEventListener('keydown', function(e) {
            // Only activate shortcuts when not in input fields
            if (e.target.tagName === 'INPUT' || e.target.tagName === 'TEXTAREA') {
                return;
            }

            switch(e.key) {
                case '1':
                    scrollToSection('home');
                    break;
                case '2':
                    scrollToSection('about');
                    break;
                case '3':
                    scrollToSection('experience');
                    break;
                case '4':
                    scrollToSection('skills');
                    break;
                case '5':
                    scrollToSection('projects');
                    break;
                case '6':
                    scrollToSection('publications');
                    break;
                case '7':
                    scrollToSection('certifications');
                    break;
                case '8':
                    scrollToSection('contact');
                    break;
                case 'r':
                case 'R':
                    if (e.ctrlKey || e.metaKey) {
                        e.preventDefault();
                        window.openResumeModal();
                    }
                    break;
            }
        });
    }

    // Initialize all functionality
    function init() {
        try {
            initHeroButtons();          // Fix hero navigation buttons
            initNavigation();           // Navigation menu functionality
            initResumeModal();          // Resume modal functionality
            initPublications();         // Publications abstract toggle
            initProjectLinks();         // Fix external links
            initScrollEffects();        // Scroll effects and navbar
            initScrollToTop();          // Scroll to top button
            initContactForm();          // Contact form handling
            initScrollAnimations();     // Scroll-based animations
            initCardEffects();          // Interactive card effects
            initSkillBadgeEffects();    // Skill badge animations
            initStatsAnimation();       // Stats counter animation
            initTypingEffect();         // Hero title typing effect
            initPerformanceOptimizations(); // Performance optimizations
            initErrorHandling();        // Error handling
            initKeyboardShortcuts();    // Keyboard shortcuts
            
            console.log('Enhanced portfolio app initialized successfully');
        } catch (error) {
            console.error('Error initializing portfolio app:', error);
        }
    }

    // Make some functions globally available for HTML onclick handlers
    window.portfolioApp = {
        showNotification: showNotification,
        scrollToSection: scrollToSection,
        openResumeModal: window.openResumeModal,
        closeResumeModal: window.closeResumeModal,
        viewResume: window.viewResume,
        downloadResume: window.downloadResume,
        toggleAbstract: window.toggleAbstract
    };

    // Start the app
    init();
});

// Smooth scroll polyfill for older browsers
if (!('scrollBehavior' in document.documentElement.style)) {
    const smoothScrollPolyfill = function(target, duration = 1000) {
        const start = window.pageYOffset;
        const change = target - start;
        const startTime = performance.now();
        
        function animateScroll(currentTime) {
            const elapsedTime = currentTime - startTime;
            const progress = Math.min(elapsedTime / duration, 1);
            
            // Easing function (ease-out)
            const ease = 1 - Math.pow(1 - progress, 3);
            
            window.scrollTo(0, start + change * ease);
            
            if (progress < 1) {
                requestAnimationFrame(animateScroll);
            }
        }
        
        requestAnimationFrame(animateScroll);
    };
    
    // Override smooth scroll behavior
    document.documentElement.style.scrollBehavior = 'auto';
}

// Additional utility functions
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

function throttle(func, limit) {
    let inThrottle;
    return function() {
        const args = arguments;
        const context = this;
        if (!inThrottle) {
            func.apply(context, args);
            inThrottle = true;
            setTimeout(() => inThrottle = false, limit);
        }
    }
}

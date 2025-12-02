/**
 * Visual Effects for Kids Learning App
 * Adds playful animations and interactive elements to make learning more engaging
 */

// Wait for the DOM to be fully loaded
document.addEventListener('DOMContentLoaded', function() {
    // Check if the device is mobile or has a small screen
    const isMobileDevice = /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent) || window.innerWidth < 768;

    // Set a global flag that can be used throughout the app
    window.isLowPowerDevice = isMobileDevice;

    if (!isMobileDevice) {
        // Only create floating shapes on non-mobile devices
        createFloatingShapes();
    }

    // Apply animations to elements (with reduced animations on mobile)
    applyInitialAnimations(isMobileDevice);

    // Set up event listeners for interactive animations
    setupInteractiveAnimations();

    // Enhance confetti effect
    enhanceConfetti();
});

/**
 * Creates floating shapes in the background
 */
function createFloatingShapes() {
    // Create container for floating shapes if it doesn't exist
    let container = document.querySelector('.floating-shapes');
    if (!container) {
        container = document.createElement('div');
        container.className = 'floating-shapes';
        document.body.appendChild(container);
    }

    // Shape types and colors
    const shapes = ['circle', 'square', 'triangle', 'star'];
    const colors = ['#FF9800', '#2196F3', '#4CAF50', '#E91E63', '#9C27B0', '#FFEB3B'];

    // Create 8 random shapes (reduced from 15 for better performance)
    for (let i = 0; i < 8; i++) {
        const shape = document.createElement('div');
        shape.className = 'shape';

        // Random shape type
        const shapeType = shapes[Math.floor(Math.random() * shapes.length)];

        // Random color
        const color = colors[Math.floor(Math.random() * colors.length)];

        // Random size (20-60px)
        const size = Math.floor(Math.random() * 40) + 20;

        // Random position
        const left = Math.floor(Math.random() * 100);

        // Random animation duration (10-25s)
        const duration = Math.floor(Math.random() * 15) + 10;

        // Random animation delay
        const delay = Math.floor(Math.random() * 10);

        // Set shape styles
        shape.style.cssText = `
            width: ${size}px;
            height: ${size}px;
            background-color: ${color};
            left: ${left}%;
            animation-duration: ${duration}s;
            animation-delay: ${delay}s;
        `;

        // Set shape type
        if (shapeType === 'circle') {
            shape.style.borderRadius = '50%';
        } else if (shapeType === 'triangle') {
            shape.style.width = '0';
            shape.style.height = '0';
            shape.style.borderLeft = `${size/2}px solid transparent`;
            shape.style.borderRight = `${size/2}px solid transparent`;
            shape.style.borderBottom = `${size}px solid ${color}`;
            shape.style.backgroundColor = 'transparent';
        } else if (shapeType === 'star') {
            shape.style.clipPath = 'polygon(50% 0%, 61% 35%, 98% 35%, 68% 57%, 79% 91%, 50% 70%, 21% 91%, 32% 57%, 2% 35%, 39% 35%)';
        }

        // Add shape to container
        container.appendChild(shape);
    }
}

/**
 * Apply initial animations to elements
 * @param {boolean} isMobileDevice - Whether the device is a mobile device or has a small screen
 */
function applyInitialAnimations(isMobileDevice = false) {
    // Animate the app title with a wobble effect - only once on page load for better performance
    // Skip this animation on mobile devices
    const appTitle = document.getElementById('app-title');
    if (appTitle && !isMobileDevice) {
        appTitle.classList.add('wobble');
        // Add animation only on click instead of continuous interval
        appTitle.addEventListener('click', () => {
            appTitle.classList.remove('wobble');
            void appTitle.offsetWidth; // Force reflow
            appTitle.classList.add('wobble');
        });
    }

    // Make buttons more interactive
    document.querySelectorAll('.btn').forEach(btn => {
        btn.classList.add('smooth-transition');
    });

    // Add pulse effect to important buttons - only on non-mobile devices
    if (!isMobileDevice) {
        document.querySelectorAll('.btn-primary, .btn-success').forEach(btn => {
            btn.classList.add('pulse');
        });
    }

    // Make letter cards more interactive - using event delegation for better performance
    // Add smooth transition to all letter cards
    document.querySelectorAll('.letter-card').forEach(card => {
        card.classList.add('smooth-transition');
    });

    // Use event delegation instead of adding listeners to each card
    // Skip hover animations on mobile devices to improve performance
    const lettersContainer = document.getElementById('lettersContainer');
    if (lettersContainer && !isMobileDevice) {
        // Single event listener for mouseenter using event delegation
        lettersContainer.addEventListener('mouseenter', (event) => {
            const card = event.target.closest('.letter-card');
            if (card) {
                const animations = ['jello', 'heartbeat', 'rubberBand', 'tada'];
                const randomAnimation = animations[Math.floor(Math.random() * animations.length)];

                // Remove any existing animation classes
                animations.forEach(anim => card.classList.remove(anim));

                // Add new animation
                card.classList.add(randomAnimation);
            }
        }, true);

        // Single event listener for animationend using event delegation
        lettersContainer.addEventListener('animationend', (event) => {
            const card = event.target.closest('.letter-card');
            if (card) {
                card.classList.remove('jello', 'heartbeat', 'rubberBand', 'tada');
            }
        }, true);
    }

    // Add floating effect only to important images to reduce animation load
    // Skip all floating animations on mobile devices
    if (!isMobileDevice) {
        document.querySelectorAll('.modal-header img, .toast-header img').forEach(img => {
            img.classList.add('float');
        });
    }
}

/**
 * Set up event listeners for interactive animations
 */
function setupInteractiveAnimations() {
    // Skip some animations on mobile devices
    const isMobileDevice = window.isLowPowerDevice || false;
    // Add success animation to correct answers - simplified on mobile
    document.addEventListener('click', function(e) {
        // Check if the clicked element has a feedback message parent
        const feedbackParent = e.target.closest('.modal-body');
        if (feedbackParent) {
            const feedback = feedbackParent.querySelector('.quiz-feedback, .guess-feedback, .writing-feedback, .hunter-feedback, .syllable-feedback');

            if (feedback && feedback.classList.contains('correct')) {
                if (isMobileDevice) {
                    // On mobile, just add a simple color change instead of animation
                    feedback.style.backgroundColor = 'rgba(76, 175, 80, 0.2)';
                    setTimeout(() => {
                        feedback.style.backgroundColor = '';
                    }, 800);
                } else {
                    // Full animation on desktop
                    feedback.classList.add('success-animation');
                    setTimeout(() => {
                        feedback.classList.remove('success-animation');
                    }, 1000);
                }
            } else if (feedback && feedback.classList.contains('incorrect')) {
                if (isMobileDevice) {
                    // On mobile, just add a simple color change instead of animation
                    feedback.style.backgroundColor = 'rgba(244, 67, 54, 0.2)';
                    setTimeout(() => {
                        feedback.style.backgroundColor = '';
                    }, 500);
                } else {
                    // Full animation on desktop
                    feedback.classList.add('error-animation');
                    setTimeout(() => {
                        feedback.classList.remove('error-animation');
                    }, 600);
                }
            }
        }
    });

    // Enhance modal animations - simplified on mobile
    document.querySelectorAll('.modal').forEach(modal => {
        if (!isMobileDevice) {
            modal.addEventListener('show.bs.modal', function() {
                const modalDialog = this.querySelector('.modal-dialog');
                modalDialog.classList.add('smooth-transition');
            });
        }
    });

    // Add glow effect to progress bar when it reaches 100% - using a more efficient approach
    // Skip glow effect on mobile devices for better performance
    const progressBar = document.getElementById('progress');
    if (progressBar && !isMobileDevice) {
        // Instead of using MutationObserver which can be resource-intensive,
        // check the progress when the updateProgress function is called
        // This requires the original app.js to have an updateProgress function

        // Create a backup of the original updateProgress function if it exists
        if (typeof window.updateProgress === 'function') {
            const originalUpdateProgress = window.updateProgress;

            // Override with our enhanced version
            window.updateProgress = function() {
                // Call the original function
                originalUpdateProgress.apply(this, arguments);

                // Now check the progress bar width
                const width = parseInt(progressBar.style.width);
                if (width >= 100) {
                    progressBar.classList.add('glow');
                } else {
                    progressBar.classList.remove('glow');
                }
            };
        } else {
            // Fallback to a simpler approach if updateProgress doesn't exist
            progressBar.addEventListener('transitionend', function() {
                const width = parseInt(progressBar.style.width);
                if (width >= 100) {
                    progressBar.classList.add('glow');
                } else {
                    progressBar.classList.remove('glow');
                }
            });
        }
    }
}

/**
 * Enhance the confetti effect - simplified for better performance
 */
function enhanceConfetti() {
    // Store the original showConfetti function
    if (typeof window.showConfetti === 'function') {
        const originalShowConfetti = window.showConfetti;

        // Override with a simpler enhanced version
        window.showConfetti = function() {
            // Check if this is a mobile device
            const isMobileDevice = window.isLowPowerDevice || false;

            if (isMobileDevice) {
                // On mobile devices, use a much simpler confetti effect or skip it entirely
                // Just show the achievement toast without the resource-intensive confetti
                showAchievementToast('إنجاز جديد!', 'أحسنت! لقد أكملت مهمة بنجاح.');
            } else {
                // On desktop, call the original function and show the toast
                originalShowConfetti();

                // Show achievement toast after a short delay
                setTimeout(() => {
                    showAchievementToast('إنجاز جديد!', 'أحسنت! لقد أكملت مهمة بنجاح.');
                }, 300);
            }
        };
    }
}

/**
 * Show an achievement toast notification
 * @param {string} title - The title of the achievement
 * @param {string} message - The message to display
 */
function showAchievementToast(title, message) {
    // Get the toast element
    const toastEl = document.getElementById('achievementToast');
    if (!toastEl) return;

    // Set the title and message
    const titleEl = document.getElementById('achievementTitle');
    const messageEl = document.getElementById('achievementMessage');

    if (titleEl) titleEl.textContent = title;
    if (messageEl) messageEl.textContent = message;

    // Create a Bootstrap toast instance and show it
    if (typeof bootstrap !== 'undefined') {
        const toast = new bootstrap.Toast(toastEl, {
            animation: true,
            autohide: true,
            delay: 5000
        });
        toast.show();

        // Add animation class to the toast
        toastEl.classList.add('animate__animated', 'animate__bounceIn');

        // Remove animation class when hidden
        toastEl.addEventListener('hidden.bs.toast', function() {
            toastEl.classList.remove('animate__animated', 'animate__bounceIn');
        }, { once: true });
    }
}

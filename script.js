//this js file is made by ai 
// Professional responsive Amazon clone JS
// Handles hamburger menu toggle, resize observer for perf, smooth interactions

document.addEventListener('DOMContentLoaded', () => {
    const hamburger = document.getElementById('hamburger');
    const navbar = document.querySelector('.navbar');
    const panel = document.querySelector('.panel');
    let isMobileNavOpen = false;

    // Hamburger toggle
    if (hamburger) {
        hamburger.addEventListener('click', () => {
            isMobileNavOpen = !isMobileNavOpen;
            navbar.classList.toggle('mobile-nav-active', isMobileNavOpen);
            
            // Rotate hamburger icon
            const icon = hamburger.querySelector('i');
            if (isMobileNavOpen) {
                icon.classList.remove('fa-bars');
                icon.classList.add('fa-xmark');
                panel.style.display = 'flex';
                panel.classList.add('mobile-panel');
            } else {
                icon.classList.remove('fa-xmark');
                icon.classList.add('fa-bars');
                // Delay close for smooth UX
                setTimeout(() => {
                    panel.classList.remove('mobile-panel');
                }, 300);
            }
        });
    }

    // Search functionality (basic)
    const searchInput = document.getElementById('input');
    const searchIcon = document.querySelector('.searchicon');
    if (searchIcon) {
        searchIcon.addEventListener('click', () => {
            if (searchInput.value.trim()) {
                // Simulate search - in real app would submit form
                console.log('Searching for:', searchInput.value);
                searchInput.value = '';
            }
        });
    }

    // Resize observer for performance (debounced)
    let resizeTimeout;
    window.addEventListener('resize', () => {
        clearTimeout(resizeTimeout);
        resizeTimeout = setTimeout(() => {
            // Close mobile nav on desktop resize
            if (window.innerWidth >= 768 && isMobileNavOpen) {
                navbar.classList.remove('mobile-nav-active');
                isMobileNavOpen = false;
                const icon = hamburger.querySelector('i');
                icon.classList.remove('fa-xmark');
                icon.classList.add('fa-bars');
            }
            // Reflow elements for smooth transitions
            navbar.style.transform = 'translateZ(0)';
        }, 150);
    });

    // Cart counter animation (placeholder for resume demo)
    const cartIcon = document.querySelector('.carticon');
    if (cartIcon) {
        // Simulate items added
        setTimeout(() => {
            cartIcon.style.animation = 'pulse 2s infinite';
        }, 2000);
    }

    // Add pulse animation CSS injection (modern best practice)
    const style = document.createElement('style');
    style.textContent = `
        @keyframes pulse {
            0% { transform: scale(1); }
            50% { transform: scale(1.05); }
            100% { transform: scale(1); }
        }
        @media (prefers-reduced-motion: reduce) {
            * { animation-duration: 0.01ms !important; }
        }
    `;
    document.head.appendChild(style);

    // Keyboard navigation support (a11y best practice)
    hamburger.tabIndex = 0;
    hamburger.addEventListener('keydown', (e) => {
        if (e.key === 'Enter' || e.key === ' ') {
            e.preventDefault();
            hamburger.click();
        }
    });
});

// Intersection Observer for hero animation (perf boost)
if ('IntersectionObserver' in window) {
    const heroObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.style.opacity = '1';
                entry.target.style.transform = 'translateY(0)';
            }
        });
    }, { threshold: 0.1 });

    const hero = document.querySelector('.hero');
    if (hero) {
        hero.style.opacity = '0';
        hero.style.transform = 'translateY(20px)';
        hero.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
        heroObserver.observe(hero);
    }
}


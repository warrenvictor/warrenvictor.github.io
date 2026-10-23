/**
 * Warren Victor Portfolio — Main JavaScript
 * Theme: Navy-Blue & Clean White
 * Handles: navbar scroll effect, floating social deck shrinking on scroll,
 *          mobile menu toggle, section spy, and scroll reveal animations.
 */

document.addEventListener('DOMContentLoaded', () => {
    // ── Navbar Scroll Effect ──────────────────────────────────────────────
    const navbar = document.getElementById('navbar');

    function updateNavbar() {
        if (window.scrollY > 40) {
            navbar.classList.add('bg-navy-950/90', 'backdrop-blur-md', 'shadow-lg');
            navbar.classList.remove('py-4');
            navbar.classList.add('py-2.5');
        } else {
            navbar.classList.remove('bg-navy-950/90', 'backdrop-blur-md', 'shadow-lg');
            navbar.classList.add('py-4');
            navbar.classList.remove('py-2.5');
        }
    }

    window.addEventListener('scroll', updateNavbar, { passive: true });
    updateNavbar();

    // ── Floating Social Deck Scroll Shrink ────────────────────────────────
    const floatingDeck = document.getElementById('floating-deck');

    function updateFloatingDeck() {
        if (!floatingDeck) return;
        // Shrink floating deck when user scrolls down past the hero banner
        if (window.scrollY > 100) {
            floatingDeck.classList.add('is-shrunk');
        } else {
            floatingDeck.classList.remove('is-shrunk');
        }
    }

    window.addEventListener('scroll', updateFloatingDeck, { passive: true });
    updateFloatingDeck();

    // ── Mobile Menu Toggle ────────────────────────────────────────────────
    const menuButton = document.getElementById('mobile-menu-button');
    const mobileMenu = document.getElementById('mobile-menu');
    const menuIcon = menuButton ? menuButton.querySelector('i') : null;

    function openMenu() {
        if (!mobileMenu || !menuIcon || !menuButton) return;
        mobileMenu.classList.add('is-open');
        menuIcon.classList.remove('fa-bars');
        menuIcon.classList.add('fa-times');
        menuButton.setAttribute('aria-expanded', 'true');
    }

    function closeMenu() {
        if (!mobileMenu || !menuIcon || !menuButton) return;
        mobileMenu.classList.remove('is-open');
        menuIcon.classList.remove('fa-times');
        menuIcon.classList.add('fa-bars');
        menuButton.setAttribute('aria-expanded', 'false');
    }

    if (menuButton && mobileMenu) {
        menuButton.addEventListener('click', () => {
            const isOpen = mobileMenu.classList.contains('is-open');
            if (isOpen) {
                closeMenu();
            } else {
                openMenu();
            }
        });

        // Close mobile menu when a link is clicked
        mobileMenu.querySelectorAll('a').forEach(link => {
            link.addEventListener('click', closeMenu);
        });

        // Close mobile menu on Escape key
        document.addEventListener('keydown', (e) => {
            if (e.key === 'Escape' && mobileMenu.classList.contains('is-open')) {
                closeMenu();
                menuButton.focus();
            }
        });
    }

    // ── Active Navigation Link Highlighting (Section Spy) ──────────────────
    const navLinks = document.querySelectorAll('#navbar a[href^="#"]:not([aria-label])');
    const sections = document.querySelectorAll('header[id], section[id], footer[id]');

    function updateActiveNav() {
        let currentSectionId = '';
        const scrollPosition = window.scrollY + 180;

        sections.forEach(section => {
            const sectionTop = section.offsetTop;
            const sectionHeight = section.offsetHeight;
            if (scrollPosition >= sectionTop && scrollPosition < sectionTop + sectionHeight) {
                currentSectionId = section.getAttribute('id');
            }
        });

        navLinks.forEach(link => {
            const href = link.getAttribute('href').replace('#', '');
            if (href === currentSectionId) {
                link.classList.add('text-sky-400', 'font-semibold');
                link.classList.remove('text-slate-200');
            } else {
                link.classList.remove('text-sky-400', 'font-semibold');
                link.classList.add('text-slate-200');
            }
        });
    }

    window.addEventListener('scroll', updateActiveNav, { passive: true });
    updateActiveNav();

    // ── Photo Fallback ────────────────────────────────────────────────────
    const heroPhoto = document.getElementById('hero-photo-img');
    if (heroPhoto) {
        heroPhoto.addEventListener('error', () => {
            heroPhoto.classList.add('is-error');
        });
    }

    // ── Hero Section Glide & Parallax Effect ──────────────────────────────
    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

    if (!prefersReducedMotion && heroPhoto) {
        let ticking = false;
        window.addEventListener('scroll', () => {
            if (!ticking) {
                window.requestAnimationFrame(() => {
                    if (window.innerWidth >= 768) {
                        const scrollY = window.scrollY;
                        const heroElement = document.getElementById('home');
                        const heroHeight = heroElement ? heroElement.offsetHeight : 800;
                        if (scrollY <= heroHeight) {
                            // Subtle gliding parallax on hero portrait on desktop
                            const glideOffset = scrollY * 0.12;
                            heroPhoto.style.transform = `translate3d(0, ${glideOffset}px, 0)`;
                        }
                    } else {
                        if (heroPhoto.style.transform !== '') {
                            heroPhoto.style.transform = '';
                        }
                    }
                    ticking = false;
                });
                ticking = true;
            }
        }, { passive: true });
    }

    // ── Intersection Observer for Scroll Animations ───────────────────────
    // Respects prefers-reduced-motion for accessibility

    if (!prefersReducedMotion) {
        const observerOptions = {
            root: null,
            rootMargin: '0px 0px -60px 0px',
            threshold: 0.12
        };

        const observer = new IntersectionObserver((entries, obs) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    entry.target.classList.add('is-visible');
                    // Once visible, keep observed state
                    obs.unobserve(entry.target);
                }
            });
        }, observerOptions);

        const animatedElements = document.querySelectorAll('.fade-in-up, .fade-in-left, .fade-in-right, .scale-in');
        animatedElements.forEach(el => observer.observe(el));
    } else {
        document.querySelectorAll('.fade-in-up, .fade-in-left, .fade-in-right, .scale-in').forEach(el => {
            el.classList.add('is-visible');
        });
    }

    // ── Back to Top Toggle ────────────────────────────────────────────────
    const backToTopBtn = document.getElementById('back-to-top');

    function updateBackToTop() {
        if (!backToTopBtn) return;
        // Show button after user scrolls past the initial hero banner (350px)
        if (window.scrollY > 350) {
            backToTopBtn.classList.add('is-visible');
        } else {
            backToTopBtn.classList.remove('is-visible');
        }
    }

    if (backToTopBtn) {
        window.addEventListener('scroll', updateBackToTop, { passive: true });
        updateBackToTop();

        backToTopBtn.addEventListener('click', () => {
            window.scrollTo({
                top: 0,
                behavior: prefersReducedMotion ? 'auto' : 'smooth'
            });
        });
    }
});




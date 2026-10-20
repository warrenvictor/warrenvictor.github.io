/**
 * Warren Victor Portfolio — Main JavaScript
 * Handles: navbar scroll effect, mobile menu toggle, scroll animations
 */

document.addEventListener('DOMContentLoaded', () => {
    // ── Navbar Scroll Effect ──────────────────────────────────────────────
    const navbar = document.getElementById('navbar');

    window.addEventListener('scroll', () => {
        if (window.scrollY > 50) {
            navbar.classList.add('bg-slate-900/80', 'shadow-lg');
            navbar.classList.remove('py-4');
            navbar.classList.add('py-2');
        } else {
            navbar.classList.remove('bg-slate-900/80', 'shadow-lg');
            navbar.classList.add('py-4');
            navbar.classList.remove('py-2');
        }
    });

    // ── Mobile Menu Toggle ────────────────────────────────────────────────
    const menuButton = document.getElementById('mobile-menu-button');
    const mobileMenu = document.getElementById('mobile-menu');
    const menuIcon = menuButton.querySelector('i');

    function openMenu() {
        mobileMenu.classList.add('is-open');
        menuIcon.classList.remove('fa-bars');
        menuIcon.classList.add('fa-times');
        menuButton.setAttribute('aria-expanded', 'true');
    }

    function closeMenu() {
        mobileMenu.classList.remove('is-open');
        menuIcon.classList.remove('fa-times');
        menuIcon.classList.add('fa-bars');
        menuButton.setAttribute('aria-expanded', 'false');
    }

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

    // ── Headshot Fallback ─────────────────────────────────────────────────
    const headshot = document.getElementById('headshot-img');
    if (headshot) {
        headshot.addEventListener('error', () => {
            headshot.classList.add('is-error');
        });
    }

    // ── Intersection Observer for Scroll Animations ───────────────────────
    // Respect prefers-reduced-motion
    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

    if (!prefersReducedMotion) {
        const observerOptions = {
            root: null,
            rootMargin: '0px',
            threshold: 0.15
        };

        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    entry.target.classList.add('is-visible');
                }
            });
        }, observerOptions);

        const animatedElements = document.querySelectorAll('.fade-in-up, .fade-in-left, .fade-in-right');
        animatedElements.forEach(el => observer.observe(el));
    } else {
        // If reduced motion is preferred, make all elements visible immediately
        document.querySelectorAll('.fade-in-up, .fade-in-left, .fade-in-right').forEach(el => {
            el.classList.add('is-visible');
        });
    }
});

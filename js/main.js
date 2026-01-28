// Abdul Mannan Ilyas Portfolio - Main JavaScript File

// Mobile Menu Toggle
const mobileToggle = document.getElementById('mobile-toggle');
const navOverlay = document.getElementById('nav-overlay');

if (mobileToggle && navOverlay) {
    // Toggle menu and icon
    mobileToggle.addEventListener('click', () => {
        navOverlay.classList.toggle('active');
        const icon = mobileToggle.querySelector('i');
        icon.classList.toggle('fa-bars');
        icon.classList.toggle('fa-times');
    });

    // Close menu when a link is clicked
    const drawerLinks = navOverlay.querySelectorAll('.drawer-nav a');
    drawerLinks.forEach(link => {
        link.addEventListener('click', () => {
            navOverlay.classList.remove('active');
            const icon = mobileToggle.querySelector('i');
            icon.classList.add('fa-bars');
            icon.classList.remove('fa-times');
        });
    });

    // Close menu when clicking outside
    document.addEventListener('click', (e) => {
        if (!e.target.closest('#nav-overlay') && !e.target.closest('#mobile-toggle')) {
            navOverlay.classList.remove('active');
            const icon = mobileToggle.querySelector('i');
            icon.classList.add('fa-bars');
            icon.classList.remove('fa-times');
        }
    });

    // Close menu when resizing to desktop
    window.addEventListener('resize', () => {
        if (window.innerWidth > 992) {
            navOverlay.classList.remove('active');
            const icon = mobileToggle.querySelector('i');
            icon.classList.add('fa-bars');
            icon.classList.remove('fa-times');
        }
    });
}

// Smooth scroll behavior for anchor links
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        const href = this.getAttribute('href');
        if (href !== '#') {
            e.preventDefault();
            const target = document.querySelector(href);
            if (target) {
                target.scrollIntoView({ behavior: 'smooth' });
            }
        }
    });
});

// Animate skill bars on scroll
const barObserverOptions = {
    threshold: 0.3,
};

const barObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            // Animate the bar-fill to its data-width value
            const barFill = entry.target.querySelector('.bar-fill');
            if (barFill) {
                const targetWidth = barFill.getAttribute('data-width');
                barFill.style.width = targetWidth;
            }
            barObserver.unobserve(entry.target);
        }
    });
}, barObserverOptions);

// Observe all proficiency bars
document.querySelectorAll('.proficiency-bar').forEach(bar => {
    barObserver.observe(bar);
});

// Add active class to nav links based on scroll position
window.addEventListener('scroll', () => {
    const sections = document.querySelectorAll('section[id]');
    const navLinks = document.querySelectorAll('.nav-links a');

    let current = '';

    sections.forEach(section => {
        const sectionTop = section.offsetTop;
        const sectionHeight = section.clientHeight;
        if (pageYOffset >= sectionTop - 200) {
            current = section.getAttribute('id');
        }
    });

    navLinks.forEach(link => {
        link.classList.remove('active');
        if (link.getAttribute('href') === '#' + current) {
            link.classList.add('active');
        }
    });
});

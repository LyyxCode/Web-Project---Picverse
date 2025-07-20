const hamburgerMenu = document.querySelector('.hamburger-menu');
const nav = document.querySelector('nav');
const overlay = document.querySelector('.overlay');
const body = document.body;

function initMobileMenu() {
    if (!hamburgerMenu || !overlay || !nav) return;

    hamburgerMenu.addEventListener('click', toggleMobileMenu);
    overlay.addEventListener('click', closeMobileMenu);

    const navLinks = document.querySelectorAll('.nav-links a');
    navLinks.forEach(link => {
        link.addEventListener('click', function() {
            if (window.innerWidth <= 768) {
                closeMobileMenu();
            }
        });
    });
}

function toggleMobileMenu() {
    hamburgerMenu.classList.toggle('active');
    nav.classList.toggle('active');
    overlay.classList.toggle('active');
    body.classList.toggle('menu-open');
}

function closeMobileMenu() {
    hamburgerMenu.classList.remove('active');
    nav.classList.remove('active');
    overlay.classList.remove('active');
    body.classList.remove('menu-open');
}

document.addEventListener('DOMContentLoaded', function() {
    initMobileMenu();
});

window.addEventListener('resize', function() {
    if (window.innerWidth > 768 && nav.classList.contains('active')) {
        closeMobileMenu();
    }
});
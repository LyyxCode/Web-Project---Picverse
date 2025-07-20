
const slides = document.querySelectorAll('.slide');
const dots = document.querySelectorAll('.dot');
const prevBtn = document.querySelector('.prev-btn');
const nextBtn = document.querySelector('.next-btn');
const likeButtons = document.querySelectorAll('.like-btn');
const categoryTags = document.querySelectorAll('.category-tag');
const logo = document.getElementById('logo');
const hamburgerMenu = document.querySelector('.hamburger-menu');
const nav = document.querySelector('nav');
const overlay = document.querySelector('.overlay');
const body = document.body;

let currentSlide = 0;
let slideInterval;


function initSlider() {
    if (!slides.length || !dots.length || !prevBtn || !nextBtn) return;


    startSlideTimer();


    prevBtn.addEventListener('click', showPrevSlide);
    nextBtn.addEventListener('click', showNextSlide);


    dots.forEach(dot => {
        dot.addEventListener('click', () => {
            const slideIndex = parseInt(dot.getAttribute('data-index'));
            showSlide(slideIndex);
        });
    });
}

function showSlide(index) {
    resetSlideTimer();

    slides.forEach(slide => slide.classList.remove('active'));
    dots.forEach(dot => dot.classList.remove('active'));

    currentSlide = index;
    slides[currentSlide].classList.add('active');
    dots[currentSlide].classList.add('active');
}

function showNextSlide() {
    currentSlide = (currentSlide + 1) % slides.length;
    showSlide(currentSlide);
}

function showPrevSlide() {
    currentSlide = (currentSlide - 1 + slides.length) % slides.length;
    showSlide(currentSlide);
}

function startSlideTimer() {
    slideInterval = setInterval(showNextSlide, 5000);
}

function resetSlideTimer() {
    clearInterval(slideInterval);
    startSlideTimer();
}

function initLikeButtons() {
    if (!likeButtons.length) return;

    likeButtons.forEach(button => {
        button.addEventListener('click', function () {
            const heartIcon = this.querySelector('i');

            const textNode = Array.from(this.childNodes).find(node => node.nodeType === 3);
            let count = parseInt(textNode.textContent.trim());
            if (isNaN(count)) count = 0;

            if (heartIcon.classList.contains('far')) {
                heartIcon.classList.replace('far', 'fas');
                textNode.textContent = ` ${count + 1}`;
            } else {
                heartIcon.classList.replace('fas', 'far');
                textNode.textContent = ` ${count - 1}`;
            }
        });
    });
}


function initCategoryTags() {
    if (!categoryTags.length) return;

    categoryTags.forEach(tag => {
        tag.addEventListener('click', function(e) {
            e.preventDefault();
            categoryTags.forEach(t => t.classList.remove('active'));
            this.classList.add('active');

            const category = this.textContent.trim().toLowerCase();
            console.log(`Filtering by category: ${category}`);

            const artworkCards = document.querySelectorAll('.artwork-card');
            artworkCards.forEach(card => {
                card.style.opacity = '0.5';
                setTimeout(() => {
                    card.style.opacity = '1';
                }, 300);
            });
        });
    });
}


function initSearch() {
    const searchInput = document.querySelector('.search-container input');
    const searchBtn = document.querySelector('.search-btn');

    if (!searchInput || !searchBtn) return;

    searchBtn.addEventListener('click', () => performSearch(searchInput.value));
    searchInput.addEventListener('keypress', function(e) {
        if (e.key === 'Enter') {
            performSearch(this.value);
        }
    });
}

function performSearch(query) {
    if (query.trim() === '') return;

    console.log(`Searching for: ${query}`);

    const artworkCards = document.querySelectorAll('.artwork-card');
    artworkCards.forEach(card => {
        card.style.transform = 'scale(0.95)';
        setTimeout(() => {
            card.style.transform = 'scale(1)';
        }, 300);
    });
}


function initLogoClick() {
    if (logo) {
        logo.addEventListener('click', function(e) {
            e.preventDefault();
            window.location.href = '#';
        });
    }
}


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
    initSlider();
    initLikeButtons();
    initCategoryTags();
    initSearch();
    initLogoClick();
    initMobileMenu();

    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function(e) {
            e.preventDefault();
            const target = document.querySelector(this.getAttribute('href'));
            if (target) {
                window.scrollTo({
                    top: target.offsetTop,
                    behavior: 'smooth'
                });
            }
        });
    });
});

window.addEventListener('resize', function() {
    if (window.innerWidth > 768 && nav.classList.contains('active')) {
        closeMobileMenu();
    }
});
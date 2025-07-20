const likeButtons = document.querySelectorAll('.like-btn');
const categoryTags = document.querySelectorAll('.category-tag');
const logo = document.getElementById('logo');
const hamburgerMenu = document.querySelector('.hamburger-menu');
const nav = document.querySelector('nav');
const overlay = document.querySelector('.overlay');
const body = document.body;

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

document.querySelectorAll('.artwork-overlay a').forEach(button => {
    button.addEventListener('click', function(e) {
        e.preventDefault();
        const imageSrc = this.closest('.image-wrapper').querySelector('img').src;
        const modal = document.getElementById('image-modal');
        const modalImg = document.getElementById('modal-image');
        modalImg.src = imageSrc;
        modal.style.display = "block";
    });
});

document.querySelector('.close-modal').addEventListener('click', function() {
    document.getElementById('image-modal').style.display = "none";
});


window.addEventListener('click', function(e) {
    const modal = document.getElementById('image-modal');
    if (e.target === modal) {
        modal.style.display = "none";
    }
});


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
    initLikeButtons();
    initCategoryTags();
    initSearch();
    initLogoClick();
    initMobileMenu();
});

window.addEventListener('resize', function() {
    if (window.innerWidth > 768 && nav.classList.contains('active')) {
        closeMobileMenu();
    }
});

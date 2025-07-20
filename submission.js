const hamburgerMenu = document.querySelector('.hamburger-menu');
const nav = document.querySelector('nav');
const overlay = document.querySelector('.overlay');
const body = document.body;

function initMobileMenu() {
    if (!hamburgerMenu || !overlay || !nav) return;

    hamburgerMenu.addEventListener('click', toggleMobileMenu);
    overlay.addEventListener('click', closeMobileMenu);

    const navLinks = document.querySelectorAll('.nav-bar a, .nav-links a');
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

function initImageUpload() {
    const dropArea = document.getElementById('dropArea');
    const fileInput = document.getElementById('fileInput');
    const previewContainer = document.getElementById('previewContainer');
    const imagePreview = document.getElementById('imagePreview');
    const removeImageBtn = document.getElementById('removeImage');
    const submitBtn = document.getElementById('submitBtn');

    if (!dropArea || !fileInput || !previewContainer || !imagePreview || !removeImageBtn || !submitBtn) return;

    dropArea.addEventListener('click', () => fileInput.click());
    fileInput.addEventListener('change', handleFileSelect);

    dropArea.addEventListener('dragover', (e) => {
        e.preventDefault();
        dropArea.classList.add('active');
    });

    dropArea.addEventListener('dragleave', () => {
        dropArea.classList.remove('active');
    });

    dropArea.addEventListener('drop', (e) => {
        e.preventDefault();
        dropArea.classList.remove('active');
        if (e.dataTransfer.files.length) {
            fileInput.files = e.dataTransfer.files;
            handleFileSelect();
        }
    });

    removeImageBtn.addEventListener('click', () => {
        fileInput.value = '';
        imagePreview.src = '';
        previewContainer.style.display = 'none';
        dropArea.style.display = 'flex';
    });

    submitBtn.addEventListener('click', handleSubmit);

function handleFileSelect() {
        const file = fileInput.files[0];
        if (file) {
            const reader = new FileReader();
            reader.onload = function(e) {
                imagePreview.src = e.target.result;
                dropArea.style.display = 'none';
                previewContainer.style.display = 'block';
            };
            reader.readAsDataURL(file);
        }
    }

function handleSubmit(e) {
        e.preventDefault();

        const email = document.getElementById('email').value;
        const title = document.getElementById('title').value;
        const description = document.getElementById('description').value;
        const tags = document.getElementById('tags').value;
        const aiGenerated = document.querySelector('input[name="aiGenerated"]:checked')?.value;
        const file = fileInput.files[0];

        if (!email || !title || !description || !file || !aiGenerated) {
            alert('Please fill all required fields and upload an image');
            return;
        }

        console.log({
            email,
            title,
            description,
            tags,
            aiGenerated,
            fileName: file.name
        });

        alert('Artwork submitted successfully!');

        document.getElementById('email').value = '';
        document.getElementById('title').value = '';
        document.getElementById('description').value = '';
        document.getElementById('tags').value = '';
        document.querySelectorAll('input[name="aiGenerated"]').forEach(radio => radio.checked = false);
        removeImageBtn.click();
    }

    const inputs = document.querySelectorAll('input, textarea');
    inputs.forEach(input => {
        input.addEventListener('focus', () => input.classList.add('active'));
        input.addEventListener('blur', () => input.classList.remove('active'));
    });
}

document.addEventListener('DOMContentLoaded', function() {
    initMobileMenu();
    initImageUpload();
});

window.addEventListener('resize', function() {
    if (window.innerWidth > 768 && nav.classList.contains('active')) {
        closeMobileMenu();
    }
});

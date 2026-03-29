// ===== DOM CONTENT LOADED =====
document.addEventListener('DOMContentLoaded', function() {
    console.log('Website Lebaran Nadila Ramadani siap!');
    
    // ===== ACTIVE MENU HIGHLIGHT =====
    const currentPage = window.location.pathname.split('/').pop() || 'index.html';
    const navLinks = document.querySelectorAll('.nav-links a');
    
    navLinks.forEach(link => {
        const linkPage = link.getAttribute('href');
        link.classList.remove('active');
        
        if (currentPage === linkPage || 
            (currentPage === '' && linkPage === 'index.html') ||
            (currentPage === '/' && linkPage === 'index.html')) {
            link.classList.add('active');
        }
        
        if (currentPage === 'index.html' && linkPage === 'index.html') {
            link.classList.add('active');
        }
    });
    
    // ===== RESPONSIVE MENU TOGGLE =====
    const navbarToggler = document.querySelector('.navbar-toggler');
    const navLinksContainer = document.querySelector('.nav-links');
    
    if (!navbarToggler && window.innerWidth <= 768) {
        const navbar = document.querySelector('.navbar .container');
        if (navbar) {
            const toggler = document.createElement('button');
            toggler.className = 'navbar-toggler';
            toggler.innerHTML = '<i class="bi bi-list"></i>';
            toggler.style.background = 'none';
            toggler.style.border = 'none';
            toggler.style.color = 'white';
            toggler.style.fontSize = '28px';
            toggler.style.cursor = 'pointer';
            toggler.style.display = 'block';
            navbar.appendChild(toggler);
            
            toggler.addEventListener('click', function() {
                const navLinks = document.querySelector('.nav-links');
                if (navLinks) {
                    navLinks.classList.toggle('show');
                }
            });
        }
    }
    
    if (navbarToggler && navLinksContainer) {
        navbarToggler.addEventListener('click', function() {
            navLinksContainer.classList.toggle('show');
        });
    }
    
    // ===== SCROLL EFFECT UNTUK NAVBAR =====
    const navbar = document.querySelector('.navbar');
    if (navbar) {
        window.addEventListener('scroll', function() {
            if (window.scrollY > 100) {
                navbar.classList.add('scrolled');
            } else {
                navbar.classList.remove('scrolled');
            }
        });
    }
    
    // ===== SMOOTH SCROLL UNTUK LINK INTERNAL =====
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function(e) {
            e.preventDefault();
            const target = document.querySelector(this.getAttribute('href'));
            if (target) {
                target.scrollIntoView({
                    behavior: 'smooth',
                    block: 'start'
                });
            }
        });
    });
    
    // ===== VIDEO PLAYER HANDLER =====
    const videoCards = document.querySelectorAll('.video-card');
    videoCards.forEach(card => {
        const video = card.querySelector('video');
        if (video) {
            video.addEventListener('play', function() {
                videoCards.forEach(otherCard => {
                    const otherVideo = otherCard.querySelector('video');
                    if (otherVideo && otherVideo !== video && !otherVideo.paused) {
                        otherVideo.pause();
                    }
                });
            });
        }
    });
    
    // ===== GALLERY IMAGE CLICK HANDLER =====
    const galleryImages = document.querySelectorAll('.card img');
    galleryImages.forEach(img => {
        img.addEventListener('click', function(e) {
            e.stopPropagation();
            const title = this.parentElement?.querySelector('h3')?.textContent || 'Foto Lebaran';
            console.log('Membuka foto:', title);
        });
    });
    
    // ===== CERITA PAGE INTERACTIONS =====
    const ceritaCards = document.querySelectorAll('.cerita-card');
    ceritaCards.forEach(card => {
        card.addEventListener('click', function(e) {
            if (!e.target.classList.contains('bi-heart') && !e.target.closest('.btn')) {
                console.log('Membaca cerita lebaran');
            }
        });
    });
    
    // ===== KONTAK FORM VALIDATION =====
    const kontakForm = document.querySelector('.kontak-card form');
    if (kontakForm) {
        const inputs = kontakForm.querySelectorAll('input, textarea');
        inputs.forEach(input => {
            input.addEventListener('focus', function() {
                this.style.borderColor = '#fbbf24';
                this.style.outline = 'none';
            });
            input.addEventListener('blur', function() {
                this.style.borderColor = '#e2e8f0';
            });
        });
        
        kontakForm.addEventListener('submit', function(e) {
            e.preventDefault();
            alert('Terima kasih! Pesan Anda telah terkirim.');
            this.reset();
        });
    }
    
    // ===== BACK TO TOP BUTTON =====
    let backToTop = document.querySelector('#backToTop');
    
    if (!backToTop) {
        backToTop = document.createElement('button');
        backToTop.id = 'backToTop';
        backToTop.innerHTML = '<i class="bi bi-arrow-up"></i>';
        document.body.appendChild(backToTop);
    }
    
    if (backToTop) {
        window.addEventListener('scroll', function() {
            if (window.scrollY > 500) {
                backToTop.style.display = 'flex';
            } else {
                backToTop.style.display = 'none';
            }
        });
        
        backToTop.addEventListener('click', function() {
            window.scrollTo({
                top: 0,
                behavior: 'smooth'
            });
        });
    }
    
    // ===== ANIMASI SCROLL REVEAL =====
    const revealElements = document.querySelectorAll('.card, .video-card, .kontak-item, .info-item');
    
    const revealOnScroll = () => {
        revealElements.forEach(element => {
            const elementTop = element.getBoundingClientRect().top;
            const windowHeight = window.innerHeight;
            
            if (elementTop < windowHeight - 100) {
                element.style.opacity = '1';
                element.style.transform = 'translateY(0)';
            }
        });
    };
    
    revealElements.forEach(element => {
        element.style.opacity = '0';
        element.style.transform = 'translateY(30px)';
        element.style.transition = 'all 0.6s ease';
    });
    
    window.addEventListener('scroll', revealOnScroll);
    revealOnScroll();
    
    // ===== LOG UNTUK DEBUG =====
    console.log('Halaman saat ini:', currentPage);
    console.log('Menu yang tersedia:', Array.from(navLinks).map(link => link.textContent));
});

// ===== FUNGSI UNTUK MEMUTAR VIDEO =====
function playVideo(videoId) {
    console.log('Memutar video:', videoId);
    const videoElement = document.getElementById(videoId);
    if (videoElement) {
        videoElement.play();
    } else {
        alert('Video akan diputar');
    }
}

// ===== FUNGSI UNTUK FILTER GALERI =====
function filterGallery(category) {
    const items = document.querySelectorAll('.gallery-item');
    const buttons = document.querySelectorAll('.filter-btn');
    
    if (!items.length) return;
    
    buttons.forEach(btn => {
        btn.classList.remove('active');
        if (btn.textContent.toLowerCase().includes(category) ||
            (category === 'all' && btn.textContent === 'Semua')) {
            btn.classList.add('active');
        }
    });
    
    items.forEach(item => {
        if (category === 'all' || item.dataset.category === category) {
            item.style.display = 'block';
            item.style.animation = 'fadeInUp 0.5s ease';
        } else {
            item.style.display = 'none';
        }
    });
}

// ===== FUNGSI UNTUK WHATSAPP BUTTON =====
function openWhatsApp(phone, message) {
    const url = `https://wa.me/${phone}?text=${encodeURIComponent(message)}`;
    window.open(url, '_blank');
}

// ===== FUNGSI UNTUK SHARE CERITA =====
function shareCerita(title, url) {
    if (navigator.share) {
        navigator.share({
            title: title,
            url: url
        }).then(() => {
            console.log('Berhasil dibagikan');
        }).catch(console.error);
    } else {
        alert('Salin link: ' + url);
    }
}

// ===== FUNGSI UNTUK MENGHITUNG WAKTU =====
function updateCountdown() {
    const targetDate = new Date('April 10, 2026 00:00:00').getTime();
    const now = new Date().getTime();
    const difference = targetDate - now;
    
    if (difference > 0) {
        const days = Math.floor(difference / (1000 * 60 * 60 * 24));
        const hours = Math.floor((difference % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
        const minutes = Math.floor((difference % (1000 * 60 * 60)) / (1000 * 60));
        const seconds = Math.floor((difference % (1000 * 60)) / 1000);
        
        const daysEl = document.getElementById('days');
        const hoursEl = document.getElementById('hours');
        const minutesEl = document.getElementById('minutes');
        const secondsEl = document.getElementById('seconds');
        
        if (daysEl) daysEl.textContent = String(days).padStart(2, '0');
        if (hoursEl) hoursEl.textContent = String(hours).padStart(2, '0');
        if (minutesEl) minutesEl.textContent = String(minutes).padStart(2, '0');
        if (secondsEl) secondsEl.textContent = String(seconds).padStart(2, '0');
    }
}

// Jalankan countdown setiap detik
setInterval(updateCountdown, 1000);

// ===== FUNGSI UNTUK LIKE BUTTON =====
function likeCerita(button) {
    const icon = button.querySelector('i');
    if (icon) {
        icon.style.color = '#fbbf24';
        alert('Terima kasih sudah menyukai cerita ini!');
    }
}

// ===== FUNGSI UNTUK KETUPAT ANIMATION =====
function createKetupatAnimation() {
    const ketupat = document.querySelector('.ketupat');
    if (ketupat) {
        setInterval(() => {
            ketupat.style.transform = 'scale(1.05)';
            setTimeout(() => {
                ketupat.style.transform = 'scale(1)';
            }, 500);
        }, 3000);
    }
}

// Jalankan animasi ketupat
createKetupatAnimation();
// script.js
document.addEventListener('DOMContentLoaded', () => {
    // Scroll Animations with Intersection Observer
    const sections = document.querySelectorAll('.section');
    const observer = new IntersectionObserver(entries => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('visible');
            }
        });
    }, { threshold: 0.1 });

    sections.forEach(section => observer.observe(section));

    // 3D Tilt Effect on Mouse Move
    const tilts = document.querySelectorAll('.tilt');
    tilts.forEach(tilt => {
        tilt.addEventListener('mousemove', e => {
            const { left, top, width, height } = tilt.getBoundingClientRect();
            const x = (e.clientX - left) / width - 0.5;
            const y = (e.clientY - top) / height - 0.5;
            tilt.style.transform = `rotateX(${y * 25}deg) rotateY(${x * 25}deg) scale(1.05)`;
        });

        tilt.addEventListener('mouseleave', () => {
            tilt.style.transform = 'rotateX(0deg) rotateY(0deg) scale(1)';
        });
    });

    // Parallax on Scroll for Projects
    window.addEventListener('scroll', () => {
        const projects = document.querySelectorAll('.project-card');
        projects.forEach((project, index) => {
            const speed = (index + 1) * 0.15;
            const yPos = window.scrollY * speed;
            project.style.transform = `translateY(${yPos}px) translateZ(-${yPos / 15}px)`;
        });
    });

    // Typewriter Effect
    const typewriter = document.querySelector('.typewriter');
    const text = 'Software Engineer | Innovator';
    let i = 0;
    const typingSpeed = 100;
    function type() {
        if (i < text.length) {
            typewriter.textContent += text.charAt(i);
            i++;
            setTimeout(type, typingSpeed);
        }
    }
    type();

    // Smooth Scrolling for Nav Links
    document.querySelectorAll('nav a').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();
            const targetId = this.getAttribute('href').substring(1);
            const target = document.getElementById(targetId);
            target.scrollIntoView({ behavior: 'smooth', block: 'start' });
        });
    });

    // Back to Top Button
    const backToTop = document.getElementById('back-to-top');
    window.addEventListener('scroll', () => {
        if (window.scrollY > 300) {
            backToTop.classList.add('visible');
        } else {
            backToTop.classList.remove('visible');
        }
    });

    backToTop.addEventListener('click', () => {
        window.scrollTo({ top: 0, behavior: 'smooth' });
    });

    // 3D Card Flip for About
    const aboutCard = document.getElementById('about-card');
    aboutCard.addEventListener('click', () => {
        aboutCard.classList.toggle('flipped');
    });

    // Modal for Project Details (Placeholder descriptions)
    const modal = document.getElementById('modal');
    const closeBtn = document.querySelector('.close');
    const modalDesc = document.getElementById('modal-description');
    const detailsBtns = document.querySelectorAll('.details-btn');

    detailsBtns.forEach((btn, index) => {
        btn.addEventListener('click', () => {
            modal.style.display = 'block';
            modalDesc.textContent = `Detailed description for Project ${index + 1}. This includes technologies used, challenges overcome, and outcomes achieved.`;
        });
    });

    closeBtn.addEventListener('click', () => {
        modal.style.display = 'none';
    });

    window.addEventListener('click', (e) => {
        if (e.target === modal) {
            modal.style.display = 'none';
        }
    });

    // Contact Form Submission (Demo - Prevent default and show alert)
    const form = document.getElementById('contact-form');
    form.addEventListener('submit', e => {
        e.preventDefault();
        alert('Message sent! (Demo)');
        form.reset();
    });

    // Advanced Particle Background
    const canvas = document.getElementById('particles');
    const ctx = canvas.getContext('2d');
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;

    window.addEventListener('resize', () => {
        canvas.width = window.innerWidth;
        canvas.height = window.innerHeight;
    });

    class Particle {
        constructor() {
            this.x = Math.random() * canvas.width;
            this.y = Math.random() * canvas.height;
            this.size = Math.random() * 3 + 1;
            this.speedX = Math.random() * 2 - 1;
            this.speedY = Math.random() * 2 - 1;
        }

        update() {
            this.x += this.speedX;
            this.y += this.speedY;
            if (this.x > canvas.width || this.x < 0) this.speedX = -this.speedX;
            if (this.y > canvas.height || this.y < 0) this.speedY = -this.speedY;
        }

        draw() {
            ctx.fillStyle = 'var(--particle-color)';
            ctx.beginPath();
            ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2);
            ctx.fill();
        }
    }

    const particles = [];
    for (let i = 0; i < 100; i++) {
        particles.push(new Particle());
    }

    function animateParticles() {
        ctx.clearRect(0, 0, canvas.width, canvas.height);
        particles.forEach(p => {
            p.update();
            p.draw();
        });
        requestAnimationFrame(animateParticles);
    }

    animateParticles();

    // Nav Scrolled Class
    window.addEventListener('scroll', () => {
        if (window.scrollY > 50) {
            document.querySelector('nav').classList.add('scrolled');
        } else {
            document.querySelector('nav').classList.remove('scrolled');
        }
    });
});

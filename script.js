// script.js
document.addEventListener('DOMContentLoaded', () => {
    // Preloader
    const preloader = document.getElementById('preloader');
    window.addEventListener('load', () => {
        preloader.style.opacity = '0';
        setTimeout(() => {
            preloader.style.display = 'none';
        }, 500);
    });

    // Scroll Animations
    const sections = document.querySelectorAll('.section');
    const observerOptions = { threshold: 0.15 };
    const sectionObserver = new IntersectionObserver(entries => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('visible');
            }
        });
    }, observerOptions);

    sections.forEach(section => sectionObserver.observe(section));

    // 3D Tilt Effect
    const tilts = document.querySelectorAll('.tilt');
    tilts.forEach(tilt => {
        tilt.addEventListener('mousemove', e => {
            const rect = tilt.getBoundingClientRect();
            const x = (e.clientX - rect.left) / rect.width - 0.5;
            const y = (e.clientY - rect.top) / rect.height - 0.5;
            tilt.style.transform = `rotateX(${y * 30}deg) rotateY(${x * 30}deg) scale(1.08)`;
            tilt.style.textShadow = `${x * 10}px ${y * 10}px 10px var(--shadow-color)`;
        });

        tilt.addEventListener('mouseleave', () => {
            tilt.style.transform = 'rotateX(0deg) rotateY(0deg) scale(1)';
            tilt.style.textShadow = 'none';
        });
    });

    // Parallax
    window.addEventListener('scroll', () => {
        const parallaxElements = document.querySelectorAll('.parallax-bg');
        parallaxElements.forEach(el => {
            const speed = 0.5;
            const yPos = window.scrollY * speed;
            el.style.backgroundPositionY = `${yPos}px`;
        });
    });

    // Typewriter
    const typewriter = document.querySelector('.typewriter');
    const texts = ['Software Engineer', 'Innovator', 'Problem Solver', 'Tech Enthusiast'];
    let textIndex = 0;
    let charIndex = 0;
    let isDeleting = false;
    const typingSpeed = 100;
    const deletingSpeed = 50;
    const pauseTime = 2000;

    function type() {
        const currentText = texts[textIndex];
        if (isDeleting) {
            typewriter.textContent = currentText.substring(0, charIndex--);
            if (charIndex < 0) {
                isDeleting = false;
                textIndex = (textIndex + 1) % texts.length;
                setTimeout(type, 500);
                return;
            }
            setTimeout(type, deletingSpeed);
        } else {
            typewriter.textContent = currentText.substring(0, charIndex++);
            if (charIndex > currentText.length) {
                isDeleting = true;
                setTimeout(type, pauseTime);
                return;
            }
            setTimeout(type, typingSpeed);
        }
    }
    type();

    // Smooth Scrolling
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();
            const targetId = this.getAttribute('href').substring(1);
            const target = document.getElementById(targetId);
            const offset = target.getBoundingClientRect().top + window.scrollY - 80;
            window.scrollTo({ top: offset, behavior: 'smooth' });
        });
    });

    // Scroll Progress
    window.addEventListener('scroll', () => {
        const scrollTop = document.documentElement.scrollTop || document.body.scrollTop;
        const scrollHeight = document.documentElement.scrollHeight - document.documentElement.clientHeight;
        const progress = (scrollTop / scrollHeight) * 100;
        document.getElementById('scroll-progress').style.width = `${progress}%`;
    });

    // Back to Top
    const backToTop = document.getElementById('back-to-top');
    window.addEventListener('scroll', () => {
        backToTop.classList.toggle('visible', window.scrollY > 400);
    });

    backToTop.addEventListener('click', () => {
        window.scrollTo({ top: 0, behavior: 'smooth' });
    });

    // About Card Flip
    const aboutCard = document.getElementById('about-card');
    aboutCard.addEventListener('click', () => {
        aboutCard.classList.toggle('flipped');
    });
    aboutCard.addEventListener('mouseenter', () => {
        aboutCard.style.transform = 'scale(1.05)';
    });
    aboutCard.addEventListener('mouseleave', () => {
        aboutCard.style.transform = 'scale(1)';
    });

    // Project Modal with more details
    const modal = document.getElementById('modal');
    const closeBtn = document.querySelector('.close');
    const modalTitle = document.getElementById('modal-title');
    const modalImage = document.getElementById('modal-image');
    const modalDesc = document.getElementById('modal-description');
    const modalLink = document.getElementById('modal-link');
    const detailsBtns = document.querySelectorAll('.details-btn');
    const projectData = [
        { title: 'Project 1: Real-Time Analytics Dashboard', image: 'https://placehold.co/600x400', desc: 'Comprehensive dashboard for real-time data analysis using Next.js, TypeScript, and MongoDB. Features include interactive charts and live updates.', link: 'https://example.com/project1' },
        { title: 'Project 2: API Gateway in Go', image: 'https://placehold.co/600x400', desc: 'High-throughput API gateway built in Go, handling authentication, rate limiting, and routing for microservices.', link: 'https://example.com/project2' },
        { title: 'Project 3: Machine Learning Pipeline in Python', image: 'https://placehold.co/600x400', desc: 'End-to-end ML pipeline for data ingestion, processing, model training, and deployment using Python and various libraries.', link: 'https://example.com/project3' },
        { title: 'Project 4: E-Commerce Backend in PHP', image: 'https://placehold.co/600x400', desc: 'Robust backend system for e-commerce platform with inventory management, user authentication, and payment processing in PHP.', link: 'https://example.com/project4' }
    ];

    detailsBtns.forEach((btn, index) => {
        btn.addEventListener('click', () => {
            const data = projectData[index];
            modalTitle.textContent = data.title;
            modalImage.src = data.image;
            modalDesc.textContent = data.desc;
            modalLink.href = data.link;
            modal.style.display = 'block';
            modal.classList.add('visible');
        });
    });

    closeBtn.addEventListener('click', () => {
        modal.style.display = 'none';
        modal.classList.remove('visible');
    });

    window.addEventListener('click', (e) => {
        if (e.target === modal) {
            modal.style.display = 'none';
            modal.classList.remove('visible');
        }
    });

    // Testimonials Carousel
    const testimonialItems = document.querySelectorAll('.testimonial-item');
    const prevBtn = document.getElementById('prev-testimonial');
    const nextBtn = document.getElementById('next-testimonial');
    let currentTestimonial = 0;

    function showTestimonial(index) {
        testimonialItems.forEach(item => item.classList.remove('active'));
        testimonialItems[index].classList.add('active');
    }

    showTestimonial(currentTestimonial);

    prevBtn.addEventListener('click', () => {
        currentTestimonial = (currentTestimonial - 1 + testimonialItems.length) % testimonialItems.length;
        showTestimonial(currentTestimonial);
    });

    nextBtn.addEventListener('click', () => {
        currentTestimonial = (currentTestimonial + 1) % testimonialItems.length;
        showTestimonial(currentTestimonial);
    });

    // Auto-rotate testimonials
    setInterval(() => {
        nextBtn.click();
    }, 5000);

    // Contact Form Validation and Submission
    const form = document.getElementById('contact-form');
    const nameInput = document.getElementById('name');
    const emailInput = document.getElementById('email');
    const subjectInput = document.getElementById('subject');
    const messageInput = document.getElementById('message');

    function validateEmail(email) {
        return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
    }

    form.addEventListener('submit', e => {
        e.preventDefault();
        let isValid = true;

        [nameInput, emailInput, subjectInput, messageInput].forEach(input => {
            input.classList.remove('error');
        });

        if (!nameInput.value.trim()) {
            nameInput.classList.add('error');
            isValid = false;
        }

        if (!validateEmail(emailInput.value.trim())) {
            emailInput.classList.add('error');
            isValid = false;
        }

        if (!subjectInput.value.trim()) {
            subjectInput.classList.add('error');
            isValid = false;
        }

        if (!messageInput.value.trim()) {
            messageInput.classList.add('error');
            isValid = false;
        }

        if (isValid) {
            alert('Message sent successfully! (Demo)');
            form.reset();
        } else {
            alert('Please fill in all fields correctly.');
        }
    });

    // Particle System with more complexity
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
            this.size = Math.random() * 4 + 1;
            this.speedX = Math.random() * 3 - 1.5;
            this.speedY = Math.random() * 3 - 1.5;
            this.color = `hsl(${Math.random() * 60}, 100%, 50%)`; // Red hues
        }

        update() {
            this.x += this.speedX;
            this.y += this.speedY;
            if (this.x > canvas.width || this.x < 0) this.speedX = -this.speedX;
            if (this.y > canvas.height || this.y < 0) this.speedY = -this.speedY;
            this.size *= 0.99;
            if (this.size < 0.5) this.reset();
        }

        draw() {
            ctx.fillStyle = this.color;
            ctx.beginPath();
            ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2);
            ctx.fill();
        }

        reset() {
            this.x = Math.random() * canvas.width;
            this.y = Math.random() * canvas.height;
            this.size = Math.random() * 4 + 1;
            this.speedX = Math.random() * 3 - 1.5;
            this.speedY = Math.random() * 3 - 1.5;
        }
    }

    const particles = [];
    for (let i = 0; i < 200; i++) { // More particles
        particles.push(new Particle());
    }

    function animateParticles() {
        ctx.clearRect(0, 0, canvas.width, canvas.height);
        particles.forEach(p => {
            p.update();
            p.draw();
        });
        // Connect particles
        for (let i = 0; i < particles.length; i++) {
            for (let j = i + 1; j < particles.length; j++) {
                const dx = particles[i].x - particles[j].x;
                const dy = particles[i].y - particles[j].y;
                const dist = Math.sqrt(dx * dx + dy * dy);
                if (dist < 100) {
                    ctx.strokeStyle = `rgba(255, 0, 0, ${1 - dist / 100})`;
                    ctx.lineWidth = 1;
                    ctx.beginPath();
                    ctx.moveTo(particles[i].x, particles[i].y);
                    ctx.lineTo(particles[j].x, particles[j].y);
                    ctx.stroke();
                }
            }
        }
        requestAnimationFrame(animateParticles);
    }

    animateParticles();

    // Nav Scrolled
    window.addEventListener('scroll', () => {
        document.querySelector('#main-nav').classList.toggle('scrolled', window.scrollY > 60);
    });

    // Theme Switcher
    const themeSwitch = document.getElementById('theme-switch');
    themeSwitch.addEventListener('change', () => {
        document.body.classList.toggle('light-theme');
        localStorage.setItem('theme', document.body.classList.contains('light-theme') ? 'light' : 'dark');
    });

    // Load saved theme
    if (localStorage.getItem('theme') === 'light') {
        themeSwitch.checked = true;
        document.body.classList.add('light-theme');
    }

    // Mouse Trail
    const mouseTrail = document.getElementById('mouse-trail');
    let trailElements = [];
    document.addEventListener('mousemove', e => {
        const trail = document.createElement('div');
        trail.className = 'trail';
        trail.style.left = `${e.pageX}px`;
        trail.style.top = `${e.pageY}px`;
        mouseTrail.appendChild(trail);
        trailElements.push(trail);

        setTimeout(() => {
            trail.style.opacity = 0;
            setTimeout(() => {
                trail.remove();
                trailElements.shift();
            }, 300);
        }, 10);
    });

    // Add trail styles dynamically
    const style = document.createElement('style');
    style.textContent = `
        .trail {
            position: absolute;
            width: 10px;
            height: 10px;
            background: var(--primary-red);
            border-radius: 50%;
            opacity: 0.8;
            pointer-events: none;
            transform: translate(-50%, -50%);
            transition: opacity 0.3s ease;
        }
    `;
    document.head.appendChild(style);

    // Lazy Load Images
    const lazyImages = document.querySelectorAll('img[data-src]');
    const imageObserver = new IntersectionObserver(entries => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const img = entry.target;
                img.src = img.dataset.src;
                img.removeAttribute('data-src');
                imageObserver.unobserve(img);
            }
        });
    });

    lazyImages.forEach(img => {
        img.dataset.src = img.src;
        img.src = 'https://placehold.co/10x10?text=Loading'; // Placeholder
        imageObserver.observe(img);
    });

    // Skill Progress Animation on View
    const skillObserver = new IntersectionObserver(entries => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const progressBars = document.querySelectorAll('.skill-progress div');
                progressBars.forEach(bar => {
                    bar.style.width = bar.dataset.width || '80%';
                });
            }
        });
    });

    skillObserver.observe(document.getElementById('skills'));

    // Timeline Animation
    const timelineItems = document.querySelectorAll('.timeline-item');
    const timelineObserver = new IntersectionObserver(entries => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.style.opacity = 1;
                entry.target.style.transform = 'translateX(0)';
            }
        });
    }, { threshold: 0.2 });

    timelineItems.forEach((item, index) => {
        item.style.opacity = 0;
        item.style.transform = index % 2 === 0 ? 'translateX(-100px)' : 'translateX(100px)';
        item.style.transition = 'opacity 0.8s ease, transform 0.8s ease';
        timelineObserver.observe(item);
    });
});

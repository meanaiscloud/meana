document.addEventListener('DOMContentLoaded', () => {
  // Theme Toggle
  const themeToggle = document.getElementById('theme-toggle');
  const body = document.body;
  if (localStorage.getItem('theme') === 'light') {
    body.classList.add('light');
    themeToggle.textContent = '☀️';
  }
  themeToggle.addEventListener('click', () => {
    body.classList.toggle('light');
    localStorage.setItem('theme', body.classList.contains('light') ? 'light' : 'dark');
    themeToggle.textContent = body.classList.contains('light') ? '☀️' : '🌙';
  });

  // Hamburger Menu
  const hamburger = document.querySelector('.hamburger');
  const navLinks = document.querySelector('.nav-links');
  hamburger.addEventListener('click', () => {
    hamburger.classList.toggle('active');
    navLinks.classList.toggle('active');
    hamburger.setAttribute('aria-expanded', hamburger.classList.contains('active'));
  });

  // Smooth Scroll
  document.querySelectorAll('a[href^="#"]').forEach(link => {
    link.addEventListener('click', e => {
      e.preventDefault();
      const target = document.querySelector(link.getAttribute('href'));
      if (!target) return;
      const offset = target.getBoundingClientRect().top + window.scrollY - 90;
      window.scrollTo({ top: offset, behavior: 'smooth' });
    });
  });

  // Nav Scroll Effect
  const nav = document.querySelector('.nav-header');
  window.addEventListener('scroll', () => {
    nav.classList.toggle('scrolled', window.scrollY > 100);
  });

  // Intersection Observer for Reveals
  const revealElements = document.querySelectorAll('.reveal');
  const observer = new IntersectionObserver(
    entries => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.classList.add('visible');
        }
      });
    },
    { threshold: 0.15, rootMargin: '0px 0px -10% 0px' }
  );
  revealElements.forEach(el => observer.observe(el));

  // Typing Effect
  const typingElement = document.querySelector('.typing');
  const texts = ['Software Engineer', 'Systems Builder', 'Game Developer'];
  let textIndex = 0;
  let charIndex = 0;
  function typeText() {
    if (charIndex < texts[textIndex].length) {
      typingElement.textContent += texts[textIndex].charAt(charIndex);
      charIndex++;
      setTimeout(typeText, 100);
    } else {
      setTimeout(() => {
        typingElement.textContent = '';
        charIndex = 0;
        textIndex = (textIndex + 1) % texts.length;
        typeText();
      }, 2000);
    }
  }
  typeText();

  // Back to Top
  const backToTop = document.getElementById('back-to-top');
  window.addEventListener('scroll', () => {
    backToTop.classList.toggle('visible', window.scrollY > 300);
  });
  backToTop.addEventListener('click', () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  });

  // Project Search
  const projectSearch = document.getElementById('project-search');
  const projectCards = document.querySelectorAll('.project-card');
  projectSearch.addEventListener('input', e => {
    const query = e.target.value.toLowerCase();
    projectCards.forEach(card => {
      const text = card.textContent.toLowerCase();
      const tags = card.dataset.tags.toLowerCase();
      card.style.display = (text.includes(query) || tags.includes(query)) ? '' : 'none';
    });
  });

  // Project Modal
  const modal = document.getElementById('project-modal');
  const closeModal = document.querySelector('.close');
  const modalTitle = document.getElementById('modal-title');
  const modalDesc = document.getElementById('modal-description');
  const detailsBtns = document.querySelectorAll('.details-btn');
  const projectDetails = [
    { title: 'Real-Time Analytics Platform', desc: 'Detailed description of the platform...' },
    { title: 'High-Throughput API Gateway', desc: 'Detailed description of the gateway...' },
    { title: 'Developer Productivity Suite', desc: 'Detailed description of the suite...' }
  ];
  detailsBtns.forEach((btn, index) => {
    btn.addEventListener('click', () => {
      modalTitle.textContent = projectDetails[index].title;
      modalDesc.textContent = projectDetails[index].desc;
      modal.style.display = 'flex';
      modal.setAttribute('aria-hidden', 'false');
    });
  });
  closeModal.addEventListener('click', () => {
    modal.style.display = 'none';
    modal.setAttribute('aria-hidden', 'true');
  });
  window.addEventListener('click', e => {
    if (e.target === modal) {
      modal.style.display = 'none';
      modal.setAttribute('aria-hidden', 'true');
    }
  });

  // Fetch Roblox Profile
  const userId = 5272838702;
  const robloxLoader = document.getElementById('roblox-loader');
  const robloxError = document.getElementById('roblox-error');
  fetch(`https://users.roblox.com/v1/users/${userId}`)
    .then(response => response.json())
    .then(data => {
      document.getElementById('roblox-display-name').textContent = data.displayName;
      document.getElementById('roblox-username').textContent = `@${data.name}`;
      document.getElementById('roblox-description').textContent = data.description;
      document.getElementById('roblox-join-date').textContent = `Joined: ${new Date(data.created).toLocaleDateString('en-US', { year: 'numeric', month: 'long' })}`;
    })
    .catch(() => robloxError.style.display = 'block')
    .finally(() => robloxLoader.style.display = 'none');

  fetch(`https://thumbnails.roblox.com/v1/users/avatar-headshot?userIds=${userId}&size=180x180&format=Png`)
    .then(response => response.json())
    .then(data => {
      document.getElementById('roblox-avatar').src = data.data[0].imageUrl;
    });

  fetch(`https://friends.roblox.com/v1/users/${userId}/followers/count`)
    .then(response => response.json())
    .then(data => {
      document.getElementById('roblox-followers').textContent = `Followers: ${data.count}`;
    });

  fetch(`https://friends.roblox.com/v1/users/${userId}/followings/count`)
    .then(response => response.json())
    .then(data => {
      document.getElementById('roblox-following').textContent = `Following: ${data.count}`;
    });

  fetch(`https://friends.roblox.com/v1/users/${userId}/friends/count`)
    .then(response => response.json())
    .then(data => {
      document.getElementById('roblox-friends').textContent = `Friends: ${data.count}`;
    });

  // Contact Form
  const form = document.getElementById('contact-form');
  const submitBtn = form.querySelector('button[type="submit"]');
  const formStatus = document.getElementById('form-status');
  form.addEventListener('input', () => {
    submitBtn.disabled = !form.checkValidity();
  });
  form.addEventListener('submit', e => {
    e.preventDefault();
    submitBtn.disabled = true;
    formStatus.textContent = 'Sending...';
    // Simulate submission
    setTimeout(() => {
      formStatus.textContent = 'Message sent! (Demo)';
      form.reset();
      submitBtn.disabled = false;
    }, 1000);
  });

  // Cookie Consent
  if (!localStorage.getItem('cookiesAccepted')) {
    document.getElementById('cookie-consent').style.display = 'block';
  }
  document.getElementById('accept-cookies').addEventListener('click', () => {
    localStorage.setItem('cookiesAccepted', 'true');
    document.getElementById('cookie-consent').style.display = 'none';
  });

  // Service Worker
  if ('serviceWorker' in navigator) {
    navigator.serviceWorker.register('/sw.js').catch(err => console.error('SW registration failed:', err));
  }
});

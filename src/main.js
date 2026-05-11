import './style.css'

// Navbar scroll effect
const header = document.querySelector('header')
window.addEventListener('scroll', () => {
  if (window.scrollY > 50) {
    header.classList.add('border-[#3c1e6e]', 'bg-[#1a0b2e]')
    header.classList.remove('bg-[#1a0b2e]/80')
  } else {
    header.classList.remove('border-[#3c1e6e]', 'bg-[#1a0b2e]')
    header.classList.add('bg-[#1a0b2e]/80')
  }
})

// Reveal elements on scroll
const observerOptions = {
  threshold: 0.1
}

const observer = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      entry.target.classList.add('active')
    }
  })
}, observerOptions)

document.querySelectorAll('.reveal').forEach(el => {
  observer.observe(el)
})

// 3D Parallax Effect for Mascots (Only for objectives, Hero mascots are fixed)
const mascots = document.querySelectorAll('#objectifs .mascot-base')
document.addEventListener('mousemove', (e) => {
  const mouseX = e.clientX
  const mouseY = e.clientY
  
  mascots.forEach(mascot => {
    const rect = mascot.getBoundingClientRect()
    const mascotCenterX = rect.left + rect.width / 2
    const mascotCenterY = rect.top + rect.height / 2
    
    // Calculate distance between mouse and mascot center
    const deltaX = mouseX - mascotCenterX
    const deltaY = mouseY - mascotCenterY
    
    // Calculate rotation with higher amplitude (max 45 degrees)
    const rotateY = Math.max(-45, Math.min(45, deltaX / 10))
    const rotateX = Math.max(-45, Math.min(45, -deltaY / 10))
    
    // Calculate internal parallax for eyes/screen (shift effect)
    const internalX = deltaX / 40
    const internalY = deltaY / 40
    
    // Only apply if the mascot is somewhat in view
    if (rect.top < window.innerHeight && rect.bottom > 0) {
      // Rotate the whole base
      mascot.style.transform = `rotateY(${rotateY}deg) rotateX(${rotateX}deg)`
      
      // Shift internal parts (eyes, screen) for more depth
      const internalParts = mascot.querySelectorAll('.mascot-screen, .mascot-eye, .w-1\\.5\\.h-1\\.5')
      internalParts.forEach(part => {
        part.style.transform = `translate(${internalX}px, ${internalY}px)`
      })
    }
  })

  // Mouse move glow effect
  const glows = document.querySelectorAll('.gh-glow')
  const xPercent = e.clientX / window.innerWidth
  const yPercent = e.clientY / window.innerHeight
  
  glows.forEach((glow, index) => {
    const factor = (index + 1) * 40 // Increased movement for glows
    glow.style.transform = `translate(${xPercent * factor}px, ${yPercent * factor}px)`
  })
})

// Visual Area Tabs Logic
const tabButtons = document.querySelectorAll('#ide-tabs button')
tabButtons.forEach(btn => {
  btn.addEventListener('click', () => {
    tabButtons.forEach(b => {
      b.classList.remove('bg-[#1a0b2e]', 'text-white', 'border', 'border-[#3c1e6e]')
      b.classList.add('text-[#a78bfa]')
    })
    btn.classList.add('bg-[#1a0b2e]', 'text-white', 'border', 'border-[#3c1e6e]')
    btn.classList.remove('text-[#a78bfa]')
  })
})

// See More Toggle
const seeMoreBtn = document.getElementById('see-more-btn')
const extraContent = document.getElementById('extra-content')

if (seeMoreBtn && extraContent) {
  seeMoreBtn.addEventListener('click', () => {
    const isHidden = extraContent.classList.contains('hidden')
    const svg = seeMoreBtn.querySelector('svg')
    
    if (isHidden) {
      extraContent.classList.remove('hidden')
      seeMoreBtn.innerHTML = `Voir moins <svg width="12" height="12" viewBox="0 0 12 12" fill="none" stroke="currentColor" class="rotate-180 transition-transform"><path d="M2 4L6 8L10 4" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/></svg>`
    } else {
      extraContent.classList.add('hidden')
      seeMoreBtn.innerHTML = `Voir plus <svg width="12" height="12" viewBox="0 0 12 12" fill="none" stroke="currentColor" class="transition-transform"><path d="M2 4L6 8L10 4" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/></svg>`
    }
  })
}

// FAQ Toggle
document.querySelectorAll('#faq .group').forEach(item => {
  item.addEventListener('click', () => {
    const p = item.querySelector('p')
    const svg = item.querySelector('svg')
    const isOpen = !p.classList.contains('hidden')
    
    // Close all others
    document.querySelectorAll('#faq .group p').forEach(el => el.classList.add('hidden'))
    document.querySelectorAll('#faq .group svg').forEach(el => el.classList.remove('rotate-180'))
    
    if (!isOpen) {
      p.classList.remove('hidden')
      svg.classList.add('rotate-180')
    }
  })
})

// Registration Canvas Animation
// (Ancienne animation conservée ou remplacée si besoin, mais on ajoute l'intro ici)

// Cinematic Intro Animation
const introOverlay = document.getElementById('intro-overlay');
const introCanvas = document.getElementById('intro-canvas');
const introLogo = document.getElementById('intro-logo-container');

if (introCanvas && introOverlay) {
  const ctx = introCanvas.getContext('2d');
  let particles = [];
  let frame = 0;

  function resize() {
    introCanvas.width = window.innerWidth;
    introCanvas.height = window.innerHeight;
  }
  window.addEventListener('resize', resize);
  resize();

  class SmokeParticle {
    constructor() {
      this.reset();
    }
    reset() {
      this.x = Math.random() * introCanvas.width;
      this.y = introCanvas.height + 100;
      this.vx = (Math.random() - 0.5) * 2;
      this.vy = -Math.random() * 2 - 1;
      this.size = Math.random() * 100 + 50;
      this.alpha = 0;
      this.maxAlpha = Math.random() * 0.3;
      this.life = 0;
      this.maxLife = Math.random() * 200 + 100;
    }
    update() {
      this.x += this.vx;
      this.y += this.vy;
      this.life++;
      if (this.life < 50) this.alpha += 0.01;
      if (this.life > this.maxLife - 50) this.alpha -= 0.01;
      if (this.life >= this.maxLife || this.alpha <= 0) this.reset();
    }
    draw() {
      const gradient = ctx.createRadialGradient(this.x, this.y, 0, this.x, this.y, this.size);
      gradient.addColorStop(0, `rgba(168, 85, 247, ${this.alpha})`); // Purple
      gradient.addColorStop(1, 'rgba(5, 1, 13, 0)');
      ctx.fillStyle = gradient;
      ctx.beginPath();
      ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2);
      ctx.fill();
    }
  }

  class Spark {
    constructor() {
      this.reset();
    }
    reset() {
      this.x = Math.random() * introCanvas.width;
      this.y = Math.random() * introCanvas.height;
      this.vx = (Math.random() - 0.5) * 10;
      this.vy = (Math.random() - 0.5) * 10;
      this.size = Math.random() * 2;
      this.color = Math.random() > 0.5 ? '#60a5fa' : '#a855f7'; // Neon blue or purple
    }
    update() {
      this.x += this.vx;
      this.y += this.vy;
      if (this.x < 0 || this.x > introCanvas.width || this.y < 0 || this.y > introCanvas.height) this.reset();
    }
    draw() {
      ctx.fillStyle = this.color;
      ctx.shadowBlur = 10;
      ctx.shadowColor = this.color;
      ctx.beginPath();
      ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2);
      ctx.fill();
      ctx.shadowBlur = 0;
    }
  }

  for (let i = 0; i < 40; i++) particles.push(new SmokeParticle());
  for (let i = 0; i < 60; i++) particles.push(new Spark());

  function animateIntro() {
    frame++;
    ctx.fillStyle = '#05010d';
    ctx.fillRect(0, 0, introCanvas.width, introCanvas.height);

    particles.forEach(p => {
      p.update();
      p.draw();
    });

    // Logo reveal timing
    if (frame === 60) {
      introLogo.style.transition = 'all 2s cubic-bezier(0.22, 1, 0.36, 1)';
      introLogo.style.opacity = '1';
      introLogo.style.transform = 'scale(1) rotateX(0deg)';
    }

    // Dynamic light streaks
    if (frame % 20 === 0) {
      ctx.strokeStyle = 'rgba(96, 165, 250, 0.5)';
      ctx.lineWidth = 2;
      ctx.beginPath();
      ctx.moveTo(0, Math.random() * introCanvas.height);
      ctx.lineTo(introCanvas.width, Math.random() * introCanvas.height);
      ctx.stroke();
    }

    if (frame < 300) {
      requestAnimationFrame(animateIntro);
    } else {
      // Fade out intro
      introOverlay.style.transition = 'opacity 1.5s ease-out';
      introOverlay.style.opacity = '0';
      setTimeout(() => {
        introOverlay.style.display = 'none';
        document.body.style.overflowY = 'auto';
      }, 1500);
    }
  }

  document.body.style.overflowY = 'hidden';
  animateIntro();
}

// Logo Animation (Navbar)
const logoText = document.getElementById('logo-text');
if (logoText) {
  let hue = 0;
  function animateLogo() {
    hue = (hue + 1) % 360;
    // Subtle color shift and gentle float
    const yOffset = Math.sin(Date.now() / 1000) * 3;
    logoText.style.color = `hsl(${hue}, 70%, 70%)`;
    logoText.style.transform = `translateY(${yOffset}px)`;
    requestAnimationFrame(animateLogo);
  }
  animateLogo();
}

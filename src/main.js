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
const canvas = document.getElementById('registration-canvas');
if (canvas) {
    const ctx = canvas.getContext('2d');
    let particles = [];
    
    function resize() {
        canvas.width = canvas.offsetWidth;
        canvas.height = canvas.offsetHeight;
    }
    
    window.addEventListener('resize', resize);
    resize();
    
    class Particle {
        constructor() {
            this.x = Math.random() * canvas.width;
            this.y = Math.random() * canvas.height;
            this.size = Math.random() * 2 + 1;
            this.speedX = Math.random() * 1 - 0.5;
            this.speedY = Math.random() * 1 - 0.5;
            this.color = Math.random() > 0.5 ? '#a855f7' : '#ec4899';
        }
        
        update() {
            this.x += this.speedX;
            this.y += this.speedY;
            
            if (this.x > canvas.width) this.x = 0;
            if (this.x < 0) this.x = canvas.width;
            if (this.y > canvas.height) this.y = 0;
            if (this.y < 0) this.y = canvas.height;
        }
        
        draw() {
            ctx.fillStyle = this.color;
            ctx.beginPath();
            ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2);
            ctx.fill();
        }
    }
    
    function init() {
        for (let i = 0; i < 50; i++) {
            particles.push(new Particle());
        }
    }
    
    function animate() {
        ctx.clearRect(0, 0, canvas.width, canvas.height);
        particles.forEach(p => {
            p.update();
            p.draw();
        });
        
        // Draw connections
        particles.forEach((p1, i) => {
            for (let j = i + 1; j < particles.length; j++) {
                const p2 = particles[j];
                const dist = Math.hypot(p1.x - p2.x, p1.y - p2.y);
                if (dist < 100) {
                    ctx.strokeStyle = `rgba(168, 85, 247, ${1 - dist/100})`;
                    ctx.lineWidth = 0.5;
                    ctx.beginPath();
                    ctx.moveTo(p1.x, p1.y);
                    ctx.lineTo(p2.x, p2.y);
                    ctx.stroke();
                }
            }
        });
        
        requestAnimationFrame(animate);
    }
    
    init();
    animate();
  }
}

// Pricing Cards Reveal & Hover Animation
const pricingCards = document.querySelectorAll('.flex.flex-col.bg-white.rounded-2xl');
if (pricingCards.length > 0) {
  // Initial entrance animation
  pricingCards.forEach((card, index) => {
    card.style.opacity = '0';
    card.style.transform = 'translateY(50px)';
    
    setTimeout(() => {
      card.style.transition = 'all 0.8s cubic-bezier(0.22, 1, 0.36, 1)';
      card.style.opacity = '1';
      card.style.transform = card.classList.contains('md:-translate-y-4') ? 'translateY(-16px)' : 'translateY(0)';
    }, 200 * index);
  });

  // Interactive 3D tilt on mouse move
  pricingCards.forEach(card => {
    card.addEventListener('mousemove', (e) => {
      const rect = card.getBoundingClientRect();
      const x = e.clientX - rect.left;
      const y = e.clientY - rect.top;
      
      const centerX = rect.width / 2;
      const centerY = rect.height / 2;
      
      const rotateX = (y - centerY) / 20;
      const rotateY = -(x - centerX) / 20;
      
      card.style.transform = `perspective(1000px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) scale(1.05)`;
      if (card.classList.contains('border-purple-500')) {
        card.style.boxShadow = `0 20px 50px rgba(168, 85, 247, 0.4)`;
      } else {
        card.style.boxShadow = `0 20px 40px rgba(0, 0, 0, 0.3)`;
      }
    });

    card.addEventListener('mouseleave', () => {
      const isElite = card.classList.contains('md:-translate-y-4');
      card.style.transform = isElite ? 'perspective(1000px) rotateX(0) rotateY(0) translateY(-16px) scale(1)' : 'perspective(1000px) rotateX(0) rotateY(0) scale(1)';
      card.style.boxShadow = '';
    });
  });
}

// Premium Shimmer Logo Logic
const premiumLogo = document.getElementById('premium-logo');
if (premiumLogo) {
  premiumLogo.classList.add('animate-shimmer');
}

// Objectives Interactive Canvas Animation
const objBgCanvas = document.getElementById('objectives-bg-canvas');
const objInteractiveCanvas = document.getElementById('objectives-interactive-canvas');
const objStatus = document.getElementById('objective-status');
const objCards = document.querySelectorAll('.objective-card');

if (objBgCanvas && objInteractiveCanvas) {
  const bgCtx = objBgCanvas.getContext('2d');
  const interCtx = objInteractiveCanvas.getContext('2d');
  let bgParticles = [];
  let interNodes = [];
  let mouse = { x: 0, y: 0, active: false };

  function resize() {
    objBgCanvas.width = objBgCanvas.offsetWidth;
    objBgCanvas.height = objBgCanvas.offsetHeight;
    objInteractiveCanvas.width = objInteractiveCanvas.offsetWidth;
    objInteractiveCanvas.height = objInteractiveCanvas.offsetHeight;
  }
  window.addEventListener('resize', resize);
  resize();

  // Background Ambient Particles
  class BgParticle {
    constructor() {
      this.reset();
    }
    reset() {
      this.x = Math.random() * objBgCanvas.width;
      this.y = Math.random() * objBgCanvas.height;
      this.size = Math.random() * 3 + 1;
      this.speedY = -Math.random() * 0.5 - 0.2;
      this.alpha = Math.random() * 0.5;
    }
    update() {
      this.y += this.speedY;
      if (this.y < -10) this.reset();
    }
    draw() {
      bgCtx.fillStyle = `rgba(168, 85, 247, ${this.alpha})`;
      bgCtx.beginPath();
      bgCtx.arc(this.x, this.y, this.size, 0, Math.PI * 2);
      bgCtx.fill();
    }
  }

  // Interactive Connection Nodes
  class InterNode {
    constructor(x, y, color) {
      this.x = x;
      this.y = y;
      this.baseX = x;
      this.baseY = y;
      this.color = color || '#a855f7';
      this.size = 4;
      this.vx = (Math.random() - 0.5) * 2;
      this.vy = (Math.random() - 0.5) * 2;
    }
    update() {
      if (mouse.active) {
        const dx = mouse.x - this.x;
        const dy = mouse.y - this.y;
        const dist = Math.sqrt(dx*dx + dy*dy);
        if (dist < 150) {
          const force = (150 - dist) / 150;
          this.vx += dx * force * 0.02;
          this.vy += dy * force * 0.02;
        }
      }
      this.vx *= 0.95;
      this.vy *= 0.95;
      this.x += this.vx;
      this.y += this.vy;
      
      // Return to base
      this.x += (this.baseX - this.x) * 0.05;
      this.y += (this.baseY - this.y) * 0.05;
    }
    draw() {
      interCtx.fillStyle = this.color;
      interCtx.shadowBlur = 10;
      interCtx.shadowColor = this.color;
      interCtx.beginPath();
      interCtx.arc(this.x, this.y, this.size, 0, Math.PI * 2);
      interCtx.fill();
      interCtx.shadowBlur = 0;
    }
  }

  // Initialize
  for(let i=0; i<100; i++) bgParticles.push(new BgParticle());
  for(let i=0; i<40; i++) {
    interNodes.push(new InterNode(
      Math.random() * objInteractiveCanvas.width,
      Math.random() * objInteractiveCanvas.height
    ));
  }

  objInteractiveCanvas.addEventListener('mousemove', (e) => {
    const rect = objInteractiveCanvas.getBoundingClientRect();
    mouse.x = e.clientX - rect.left;
    mouse.y = e.clientY - rect.top;
    mouse.active = true;
  });
  objInteractiveCanvas.addEventListener('mouseleave', () => mouse.active = false);

  // Card Hover Interaction
  objCards.forEach(card => {
    card.addEventListener('mouseenter', () => {
      const color = card.getAttribute('data-color');
      const text = card.querySelector('h3').innerText;
      objStatus.innerText = `Focus : ${text}`;
      objStatus.style.color = color;
      objStatus.style.borderColor = color;
      interNodes.forEach(node => node.color = color);
    });
    card.addEventListener('mouseleave', () => {
      objStatus.innerText = "Système d'innovation actif";
      objStatus.style.color = '#a855f7';
      objStatus.style.borderColor = '#30363d';
      interNodes.forEach(node => node.color = '#a855f7');
    });
  });

  function animate() {
    bgCtx.clearRect(0, 0, objBgCanvas.width, objBgCanvas.height);
    interCtx.clearRect(0, 0, objInteractiveCanvas.width, objInteractiveCanvas.height);

    bgParticles.forEach(p => { p.update(); p.draw(); });
    
    interNodes.forEach((n, i) => {
      n.update();
      n.draw();
      // Draw lines
      for(let j=i+1; j<interNodes.length; j++) {
        const n2 = interNodes[j];
        const dist = Math.hypot(n.x - n2.x, n.y - n2.y);
        if (dist < 100) {
          interCtx.strokeStyle = n.color;
          interCtx.globalAlpha = (100 - dist) / 100 * 0.5;
          interCtx.lineWidth = 1;
          interCtx.beginPath();
          interCtx.moveTo(n.x, n.y);
          interCtx.lineTo(n2.x, n2.y);
          interCtx.stroke();
          interCtx.globalAlpha = 1;
        }
      }
    });

    requestAnimationFrame(animate);
  }
  animate();
}

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

// Premium Shimmer Logo Logic
const premiumLogo = document.getElementById('premium-logo');
if (premiumLogo) {
  premiumLogo.classList.add('animate-shimmer');
}

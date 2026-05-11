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

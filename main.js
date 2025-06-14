function setTheme(mode) {
  document.body.classList.toggle('light-mode', mode === 'light');
  localStorage.setItem('theme', mode);
  document.getElementById('themeToggle').textContent = mode === 'light' ? '☀️' : '🌙';
}

function toggleTheme() {
  const currentMode = document.body.classList.contains('light-mode') ? 'light' : 'dark';
  const nextMode = currentMode === 'light' ? 'dark' : 'light';
  setTheme(nextMode);
}

(function initTheme() {
  const savedTheme = localStorage.getItem('theme');
  if (savedTheme) {
    setTheme(savedTheme);
    return;
  }

  const hour = new Date().getHours();
  const timeBasedTheme = (hour >= 7 && hour < 19) ? 'light' : 'dark';
  setTheme(timeBasedTheme);
})();


function toggleMenu() {
  const menu = document.getElementById('menu');
  menu.style.display = menu.style.display === 'flex' ? 'none' : 'flex';
}

// Typewriter effect
const typeText = ["Hey, I'm Corey.", "A creative developer.", "A systems engineer."];
let i = 0, j = 0, current = "", isDeleting = false;

function typeLoop() {
  const target = document.getElementById("typewriter");
  if (!target) return;

  if (!isDeleting && j <= typeText[i].length) {
    current = typeText[i].substring(0, j++);
  } else if (isDeleting && j >= 0) {
    current = typeText[i].substring(0, j--);
  }

  if (j === typeText[i].length + 10) isDeleting = true;
  if (j === 0 && isDeleting) {
    isDeleting = false;
    i = (i + 1) % typeText.length;
  }

  target.innerHTML = `<span>${current}</span>`;
  setTimeout(typeLoop, isDeleting ? 60 : 150);
  if (!isDeleting && j === typeText[i].length) setTimeout(() => isDeleting = true, 1500);
  if (isDeleting && j === 0) setTimeout(() => {
    isDeleting = false;
    i = (i + 1) % typeText.length;
  }, 1500);
}

typeLoop();
// Fade-in on scroll
window.addEventListener('DOMContentLoaded', () => {
  const faders = document.querySelectorAll('.fade-in');
  const observer = new IntersectionObserver(entries => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('visible');
      }
    });
  });
  faders.forEach(fader => observer.observe(fader));
});

const balloonColors = ['🎈','🎉','💖','⭐','💙','💛','💚','🚀','🎮','🏆','⚽','🎯'];
let cakeClickCount = 0;
let lastClickTime = 0;

function createBalloon() {
  const balloon = document.createElement('div');
  balloon.classList.add('balloon');
  balloon.style.left = Math.random() * 100 + 'vw';
  const floatDuration = (Math.random() * 3 + 5) + 's';
  balloon.style.animation = `float ${floatDuration} ease-in forwards`;
  const initialRotation = (Math.random() - 0.5) * 15;
  balloon.style.transform = `rotate(${initialRotation}deg)`;
  balloon.textContent = balloonColors[Math.floor(Math.random() * balloonColors.length)];
  document.getElementById('balloons').appendChild(balloon);

  balloon.addEventListener('click', function(e) {
    e.stopPropagation();
    popBalloon(this);
  });

  setTimeout(() => {
    if (balloon.parentNode) balloon.remove();
  }, 7000);
}

function popBalloon(balloon) {
  if (balloon.classList.contains('popping')) return;
  balloon.classList.add('popping');
  createConfetti(balloon);
  setTimeout(() => { if (balloon.parentNode) balloon.remove(); }, 400);
}

function createConfetti(balloon) {
  const rect = balloon.getBoundingClientRect();
  const x = rect.left + rect.width / 2;
  const y = rect.top + rect.height / 2;

  for (let i = 0; i < 8; i++) {
    const confetti = document.createElement('div');
    confetti.classList.add('confetti');
    confetti.textContent = ['✨', '⭐', '💫', '🌟'][Math.floor(Math.random() * 4)];
    confetti.style.left = x + 'px';
    confetti.style.top = y + 'px';
    confetti.style.setProperty('--tx', (Math.random() - 0.5) * 100 + 'px');
    document.body.appendChild(confetti);

    setTimeout(() => { if (confetti.parentNode) confetti.remove(); }, 1200);
  }
}

function createFireworks() {
  for (let i = 0; i < 15; i++) {
    setTimeout(() => createSingleFirework(), i * 100);
  }
}

function createSingleFirework() {
  const startX = Math.random() * window.innerWidth;
  const startY = Math.random() * window.innerHeight;
  const firework = document.createElement('div');
  firework.classList.add('firework');
  firework.textContent = ['🎆', '🎇', '✨', '🎉', '💥'][Math.floor(Math.random() * 5)];
  firework.style.left = startX + 'px';
  firework.style.top = startY + 'px';
  firework.style.setProperty('--startX', '0px');
  firework.style.setProperty('--startY', '0px');
  firework.style.setProperty('--endX', (Math.random() - 0.5) * 50 + 'px');
  firework.style.setProperty('--endY', (Math.random() - 0.5) * 50 + 'px');
  document.body.appendChild(firework);

  for (let j = 0; j < 12; j++) {
    const particle = document.createElement('div');
    particle.classList.add('firework-particle');
    particle.textContent = '✨';
    particle.style.left = startX + 'px';
    particle.style.top = startY + 'px';
    particle.style.setProperty('--particleX', (Math.cos(j * Math.PI / 6) * 100) + 'px');
    particle.style.setProperty('--particleY', (Math.sin(j * Math.PI / 6) * 100) + 'px');
    document.body.appendChild(particle);

    setTimeout(() => { if (particle.parentNode) particle.remove(); }, 1000);
  }

  setTimeout(() => { if (firework.parentNode) firework.remove(); }, 1500);
}

document.getElementById('birthdayCake').addEventListener('click', function() {
  const now = Date.now();
  if (now - lastClickTime > 2000) cakeClickCount = 0;
  cakeClickCount++;
  lastClickTime = now;

  this.style.transform = 'scale(0.9)';
  setTimeout(() => { this.style.transform = 'scale(1)'; }, 100);

  if (cakeClickCount >= 5) {
    cakeClickCount = 0;
    createFireworks();
  }
});

setInterval(createBalloon, 500);
for (let i = 0; i < 15; i++) setTimeout(createBalloon, i * 200);

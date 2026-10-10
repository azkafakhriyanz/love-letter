let currentLang = 'ID'; // 'ID' or 'EN'

const i18n = {
  ID: {
    from_label: "Dari",
    to_label: "Untuk",
    instruction_text: "✨ Tarik tali busurnya lalu lepaskan untuk memanah surat! ✨",
    modal_title: "Kustomisasi Nama 🍬",
    label_from: "Dari (Pengirim):",
    label_to: "Untuk (Penerima):",
    save_btn: "Simpan & Mulai 💕",
    confess_badge: "CANDY CONFESSION 💌",
    question_main: "Do you want to be my",
    question_highlight: "girlfriend?",
    victory_badge: "OFFICIAL COUPLE MOMENT 🎉",
    victory_title: "Yayy! I Love You! 💖",
    letter_p1: "Makasih yaa udah mau klik <b>YES!</b> 🥳✨",
    letter_p2: "Tombol NO itu emang sengaja dibikin melompat terus soalnya gak ada alasan buat kamu nolak hehe 😜❤️",
    wa_btn: "Kirim Balasan via WhatsApp 📲",
    restart_btn: "Main Lagi 🔄",
    prank_msgs: [
      "Eits, gak bisa pencet NO! 😜",
      "Yakin mau nolak? 🥺",
      "Nggak boleh nolak ya! 💖",
      "Tombol NO cuma pajangan wlee 😝",
      "Pencet YES aja udah bener! 💕"
    ]
  },
  EN: {
    from_label: "From",
    to_label: "To",
    instruction_text: "✨ Aim & release to shoot Cupid's arrow! ✨",
    modal_title: "Customize Names 🍬",
    label_from: "From (Sender):",
    label_to: "To (Receiver):",
    save_btn: "Save & Start 💕",
    confess_badge: "CANDY CONFESSION 💌",
    question_main: "Do you want to be my",
    question_highlight: "girlfriend?",
    victory_badge: "OFFICIAL COUPLE MOMENT 🎉",
    victory_title: "Yayy! I Love You! 💖",
    letter_p1: "Thank you so much for pressing <b>YES!</b> 🥳✨",
    letter_p2: "The NO button keeps running away because there's no way you can reject me hehe 😜❤️",
    wa_btn: "Send Reply via WhatsApp 📲",
    restart_btn: "Play Again 🔄",
    prank_msgs: [
      "Oops, you can't click NO! 😜",
      "Are you sure? 🥺",
      "No rejecting allowed! 💖",
      "NO button is just a prank 😝",
      "Pressing YES is the only choice! 💕"
    ]
  }
};

function applyLanguage(lang) {
  currentLang = lang;
  const dict = i18n[lang];

  document.querySelectorAll('[data-i18n]').forEach(el => {
    const key = el.getAttribute('data-i18n');
    if (dict[key]) el.innerHTML = dict[key];
  });

  document.getElementById('lang-btn').innerText = lang;
}

const bgCanvas = document.getElementById('bg-canvas');
const bgCtx = bgCanvas.getContext('2d');
let bgParticles = [];

function resizeBg() {
  bgCanvas.width = window.innerWidth;
  bgCanvas.height = window.innerHeight;
}
window.addEventListener('resize', resizeBg);
resizeBg();

class AmbientParticle {
  constructor() { this.reset(); }
  reset() {
    this.x = Math.random() * bgCanvas.width;
    this.y = bgCanvas.height + Math.random() * 40;
    this.size = Math.random() * 12 + 8;
    this.speed = Math.random() * 0.8 + 0.3;
    this.opacity = Math.random() * 0.5 + 0.3;
    this.char = ['💖', '💙', '💛', '✨', '🌸'][Math.floor(Math.random() * 5)];
  }
  update() {
    this.y -= this.speed;
    if (this.y < -20) this.reset();
  }
  draw() {
    bgCtx.globalAlpha = this.opacity;
    bgCtx.font = `${this.size}px sans-serif`;
    bgCtx.fillText(this.char, this.x, this.y);
  }
}

for (let i = 0; i < 24; i++) bgParticles.push(new AmbientParticle());

function animateBg() {
  bgCtx.clearRect(0, 0, bgCanvas.width, bgCanvas.height);
  bgParticles.forEach(p => { p.update(); p.draw(); });
  requestAnimationFrame(animateBg);
}
animateBg();

const audioCtx = new (window.AudioContext || window.webkitAudioContext)();

function playSound(type) {
  if (audioCtx.state === 'suspended') audioCtx.resume();
  const osc = audioCtx.createOscillator();
  const gain = audioCtx.createGain();
  osc.connect(gain);
  gain.connect(audioCtx.destination);

  if (type === 'shoot') {
    osc.type = 'sine';
    osc.frequency.setValueAtTime(520, audioCtx.currentTime);
    osc.frequency.exponentialRampToValueAtTime(180, audioCtx.currentTime + 0.15);
    gain.gain.setValueAtTime(0.2, audioCtx.currentTime);
    gain.gain.linearRampToValueAtTime(0.01, audioCtx.currentTime + 0.15);
    osc.start(); osc.stop(audioCtx.currentTime + 0.15);
  } else if (type === 'hit') {
    osc.type = 'triangle';
    osc.frequency.setValueAtTime(650, audioCtx.currentTime);
    osc.frequency.exponentialRampToValueAtTime(1300, audioCtx.currentTime + 0.22);
    gain.gain.setValueAtTime(0.35, audioCtx.currentTime);
    gain.gain.linearRampToValueAtTime(0.01, audioCtx.currentTime + 0.25);
    osc.start(); osc.stop(audioCtx.currentTime + 0.25);
  } else if (type === 'pop') {
    osc.type = 'sine';
    osc.frequency.setValueAtTime(800, audioCtx.currentTime);
    osc.frequency.exponentialRampToValueAtTime(400, audioCtx.currentTime + 0.08);
    gain.gain.setValueAtTime(0.15, audioCtx.currentTime);
    gain.gain.linearRampToValueAtTime(0.01, audioCtx.currentTime + 0.08);
    osc.start(); osc.stop(audioCtx.currentTime + 0.08);
  } else if (type === 'victory') {
    const notes = [523.25, 659.25, 783.99, 1046.50, 1318.51];
    notes.forEach((f, i) => {
      const o = audioCtx.createOscillator();
      const g = audioCtx.createGain();
      o.type = 'sine';
      o.frequency.setValueAtTime(f, audioCtx.currentTime + i * 0.09);
      g.gain.setValueAtTime(0.22, audioCtx.currentTime + i * 0.09);
      g.gain.linearRampToValueAtTime(0.01, audioCtx.currentTime + i * 0.09 + 0.35);
      o.connect(g); g.connect(audioCtx.destination);
      o.start(audioCtx.currentTime + i * 0.09);
      o.stop(audioCtx.currentTime + i * 0.09 + 0.35);
    });
  }
}

const canvas = document.getElementById('game-canvas');
const ctx = canvas.getContext('2d');

function resizeGameCanvas() {
  canvas.width = window.innerWidth;
  canvas.height = window.innerHeight;
}
window.addEventListener('resize', resizeGameCanvas);
resizeGameCanvas();

let isDragging = false;
let dragCurrent = { x: 0, y: 0 };
let arrow = null;
let particles = [];
let trailParticles = [];
let envelopeState = { openProgress: 0, isOpen: false, wiggleTime: 0 };

let senderName = "Azka";
let receiverName = "Special Person";

function getBowPos() { return { x: canvas.width / 2, y: canvas.height - 130 }; }
function getEnvelopePos() { return { x: canvas.width / 2, y: 190 }; }

function getEventPos(e) {
  const clientX = e.touches ? e.touches[0].clientX : e.clientX;
  const clientY = e.touches ? e.touches[0].clientY : e.clientY;
  return { x: clientX, y: clientY };
}

function handleStart(e) {
  if (envelopeState.isOpen || arrow) return;
  const pos = getEventPos(e);
  const bow = getBowPos();
  if (Math.hypot(pos.x - bow.x, pos.y - bow.y) < 140) {
    isDragging = true;
    dragCurrent = pos;
  }
}

function handleMove(e) { if (isDragging) dragCurrent = getEventPos(e); }

function handleEnd() {
  if (!isDragging) return;
  isDragging = false;
  const bow = getBowPos();
  const dx = bow.x - dragCurrent.x;
  const dy = bow.y - dragCurrent.y;
  const pullDist = Math.hypot(dx, dy);

  if (pullDist > 20) {
    playSound('shoot');
    const speed = Math.min(pullDist * 0.26, 25);
    const angle = Math.atan2(dy, dx);
    arrow = { x: bow.x, y: bow.y, vx: Math.cos(angle) * speed, vy: Math.sin(angle) * speed, angle: angle };
  }
}

canvas.addEventListener('mousedown', handleStart);
canvas.addEventListener('mousemove', handleMove);
window.addEventListener('mouseup', handleEnd);
canvas.addEventListener('touchstart', handleStart);
canvas.addEventListener('touchmove', handleMove);
window.addEventListener('touchend', handleEnd);

function createParticles(x, y) {
  for (let i = 0; i < 35; i++) {
    const angle = Math.random() * Math.PI * 2;
    const speed = Math.random() * 7 + 2;
    particles.push({
      x: x, y: y, vx: Math.cos(angle) * speed, vy: Math.sin(angle) * speed,
      size: Math.random() * 8 + 4,
      color: ['#ff477e', '#a2d2ff', '#fffeae', '#ffffff', '#ff85a2'][Math.floor(Math.random() * 5)],
      alpha: 1
    });
  }
}

function drawEnvelope(x, y) {
  const w = 190; const h = 125;
  envelopeState.wiggleTime += 0.03;
  const wiggleY = envelopeState.isOpen ? 0 : Math.sin(envelopeState.wiggleTime) * 4;

  ctx.save();
  ctx.translate(x, y + wiggleY);

  ctx.shadowColor = 'rgba(255, 71, 126, 0.18)';
  ctx.shadowBlur = 25;
  ctx.shadowOffsetY = 12;

  if (envelopeState.openProgress > 0) {
    const paperY = -h/2 - (envelopeState.openProgress * 35);
    ctx.fillStyle = '#ffffff'; ctx.strokeStyle = '#ffb6c1'; ctx.lineWidth = 3.5;
    ctx.beginPath();
    ctx.roundRect(-w/2 + 12, paperY, w - 24, 65, 12);
    ctx.fill(); ctx.stroke();

    ctx.fillStyle = '#ff477e'; ctx.font = 'bold 13px Fredoka'; ctx.textAlign = 'center';
    ctx.fillText('Love Letter 💕', 0, paperY + 35);
  }

  ctx.fillStyle = '#ffffff'; ctx.strokeStyle = '#ffb6c1'; ctx.lineWidth = 4;
  ctx.beginPath();
  ctx.roundRect(-w/2, -h/2, w, h, 16);
  ctx.fill(); ctx.stroke();

  ctx.beginPath(); ctx.moveTo(-w/2, h/2); ctx.lineTo(0, 10); ctx.lineTo(w/2, h/2); ctx.stroke();

  ctx.fillStyle = '#ffd1dc'; ctx.beginPath(); ctx.moveTo(-w/2, -h/2);
  if (envelopeState.openProgress > 0) {
    ctx.lineTo(0, -h/2 - (envelopeState.openProgress * 75));
  } else {
    ctx.lineTo(0, 20);
  }
  ctx.lineTo(w/2, -h/2); ctx.closePath(); ctx.fill(); ctx.stroke();

  if (envelopeState.openProgress === 0) {
    ctx.fillStyle = '#ff477e'; ctx.beginPath();
    ctx.arc(-6, 12, 10, 0, Math.PI * 2); ctx.arc(6, 12, 10, 0, Math.PI * 2);
    ctx.lineTo(0, 28); ctx.closePath(); ctx.fill();
  }

  ctx.restore();
}

function drawBow(bowX, bowY) {
  let pullAngle = -Math.PI / 2; let pullDist = 0;
  if (isDragging) {
    const dx = bowX - dragCurrent.x; const dy = bowY - dragCurrent.y;
    pullAngle = Math.atan2(dy, dx);
    pullDist = Math.min(Math.hypot(dx, dy), 85);

    ctx.save();
    ctx.beginPath(); ctx.setLineDash([6, 6]);
    ctx.strokeStyle = '#a2d2ff'; ctx.lineWidth = 3;
    ctx.moveTo(bowX, bowY);
    ctx.lineTo(bowX + Math.cos(pullAngle) * 270, bowY + Math.sin(pullAngle) * 270);
    ctx.stroke();
    ctx.restore();
  }

  ctx.save(); ctx.translate(bowX, bowY); ctx.rotate(pullAngle + Math.PI / 2);

  ctx.strokeStyle = '#ffb6c1'; ctx.lineWidth = 8; ctx.lineCap = 'round';
  ctx.beginPath(); ctx.arc(0, 0, 55, -Math.PI * 0.75, -Math.PI * 0.25, false); ctx.stroke();

  ctx.strokeStyle = '#a2d2ff'; ctx.lineWidth = 2.5;
  const lx = Math.cos(-Math.PI * 0.75) * 55; const ly = Math.sin(-Math.PI * 0.75) * 55;
  const rx = Math.cos(-Math.PI * 0.25) * 55; const ry = Math.sin(-Math.PI * 0.25) * 55;

  ctx.beginPath(); ctx.moveTo(lx, ly); ctx.lineTo(0, isDragging ? pullDist : -38); ctx.lineTo(rx, ry); ctx.stroke();

  if (!arrow && !envelopeState.isOpen) {
    const offsetY = isDragging ? pullDist : -38;
    ctx.fillStyle = '#3d3043'; ctx.fillRect(-2, offsetY - 38, 4, 38);
    ctx.fillStyle = '#ff477e'; ctx.beginPath();
    ctx.arc(-4, offsetY - 40, 5, 0, Math.PI * 2); ctx.arc(4, offsetY - 40, 5, 0, Math.PI * 2);
    ctx.lineTo(0, offsetY - 50); ctx.fill();
  }

  ctx.restore();
}

function renderGame() {
  ctx.clearRect(0, 0, canvas.width, canvas.height);
  const envPos = getEnvelopePos(); const bowPos = getBowPos();

  if (envelopeState.isOpen && envelopeState.openProgress < 1) envelopeState.openProgress += 0.05;

  drawEnvelope(envPos.x, envPos.y);
  if (!envelopeState.isOpen) drawBow(bowPos.x, bowPos.y);

  if (arrow) {
    arrow.x += arrow.vx; arrow.y += arrow.vy;

    trailParticles.push({
      x: arrow.x, y: arrow.y,
      size: Math.random() * 5 + 3,
      alpha: 1,
      color: ['#ff477e', '#a2d2ff', '#fffeae'][Math.floor(Math.random() * 3)]
    });

    ctx.save(); ctx.translate(arrow.x, arrow.y); ctx.rotate(arrow.angle);
    ctx.fillStyle = '#3d3043'; ctx.fillRect(-22, -2, 26, 4);
    ctx.fillStyle = '#ff477e'; ctx.beginPath();
    ctx.arc(6, -3, 5, 0, Math.PI * 2); ctx.arc(6, 3, 5, 0, Math.PI * 2);
    ctx.lineTo(14, 0); ctx.fill();
    ctx.restore();

    if (Math.hypot(arrow.x - envPos.x, arrow.y - envPos.y) < 42 && !envelopeState.isOpen) {
      envelopeState.isOpen = true; playSound('hit'); createParticles(envPos.x, envPos.y); arrow = null;
      document.getElementById('sender-badge').style.opacity = '0';
      document.getElementById('instruction-tag').style.opacity = '0';
      setTimeout(() => { document.getElementById('box-confess').style.display = 'block'; }, 700);
    }

    if (arrow && (arrow.x < 0 || arrow.x > canvas.width || arrow.y < 0 || arrow.y > canvas.height)) arrow = null;
  }

  trailParticles.forEach((tp, i) => {
    tp.alpha -= 0.04;
    if (tp.alpha <= 0) trailParticles.splice(i, 1);
    else {
      ctx.save(); ctx.globalAlpha = tp.alpha; ctx.fillStyle = tp.color;
      ctx.beginPath(); ctx.arc(tp.x, tp.y, tp.size / 2, 0, Math.PI * 2); ctx.fill(); ctx.restore();
    }
  });

  particles.forEach((p, i) => {
    p.x += p.vx; p.y += p.vy; p.alpha -= 0.03;
    if (p.alpha <= 0) particles.splice(i, 1);
    else {
      ctx.save(); ctx.globalAlpha = p.alpha; ctx.fillStyle = p.color;
      ctx.beginPath(); ctx.arc(p.x, p.y, p.size / 2, 0, Math.PI * 2); ctx.fill(); ctx.restore();
    }
  });

  requestAnimationFrame(renderGame);
}
renderGame();

const btnNo = document.getElementById('btn-no');
const btnYes = document.getElementById('btn-yes');
const toast = document.getElementById('toast');
let yesScale = 1;

function showToast(msg) {
  toast.innerText = msg; toast.classList.add('show');
  setTimeout(() => toast.classList.remove('show'), 1400);
}

function moveNo() {
  playSound('pop');
  const rx = (Math.random() - 0.5) * 210;
  const ry = (Math.random() - 0.5) * 120;
  btnNo.style.left = `${rx}px`; btnNo.style.top = `${ry}px`;
  
  yesScale += 0.09;
  btnYes.style.transform = `scale(${yesScale})`;

  const msgs = i18n[currentLang].prank_msgs;
  const randomMsg = msgs[Math.floor(Math.random() * msgs.length)];
  showToast(randomMsg);
}

btnNo.addEventListener('mouseenter', moveNo);
btnNo.addEventListener('touchstart', (e) => { e.preventDefault(); moveNo(); });

const editBtn = document.getElementById('edit-btn');
const modalEdit = document.getElementById('modal-edit');
const saveNameBtn = document.getElementById('save-name-btn');

editBtn.addEventListener('click', () => { modalEdit.style.display = 'flex'; });

saveNameBtn.addEventListener('click', () => {
  const fromVal = document.getElementById('input-from').value.trim();
  const toVal = document.getElementById('input-to').value.trim();
  if (fromVal) senderName = fromVal;
  if (toVal) receiverName = toVal;

  document.getElementById('badge-from').innerText = senderName;
  document.getElementById('badge-to').innerText = receiverName;
  document.getElementById('letter-signature').innerText = `— ${senderName} 💕`;

  const waText = encodeURIComponent(`Hai ${senderName}! Aku udah buka suratnya dan aku jawab YES! 💕`);
  document.getElementById('wa-share-btn').href = `https://wa.me/?text=${waText}`;

  modalEdit.style.display = 'none';
});

const themeBtn = document.getElementById('theme-btn');
const langBtn = document.getElementById('lang-btn');

themeBtn.addEventListener('click', () => {
  document.body.classList.toggle('dark-mode');
  themeBtn.innerText = document.body.classList.contains('dark-mode') ? '🌙' : '☀️';
});

langBtn.addEventListener('click', () => {
  const nextLang = currentLang === 'ID' ? 'EN' : 'ID';
  applyLanguage(nextLang);
});

btnYes.addEventListener('click', () => {
  playSound('victory');
  document.getElementById('box-confess').style.display = 'none';
  document.getElementById('box-victory').style.display = 'block';

  confetti({ particleCount: 85, spread: 85, origin: { y: 0.6 }, colors: ['#ff477e', '#a2d2ff', '#fffeae', '#ffffff'] });
});

document.getElementById('btn-restart').addEventListener('click', () => {
  envelopeState.isOpen = false; envelopeState.openProgress = 0; arrow = null; yesScale = 1;
  btnYes.style.transform = 'scale(1)';
  document.getElementById('box-victory').style.display = 'none';
  document.getElementById('sender-badge').style.opacity = '1';
  document.getElementById('instruction-tag').style.opacity = '1';
  btnNo.style.left = '0px'; btnNo.style.top = '0px';
});
// ── Section navigation ─────────────────────────────────────────────
const sections = document.querySelectorAll('.section')
const navBtns  = document.querySelectorAll('.nav-btn')
const mobileNavBtns = document.querySelectorAll('.mobile-nav-btn')

function switchSection(id) {
  sections.forEach(s => s.classList.toggle('active', s.id === `section-${id}`))
  navBtns.forEach(b => b.classList.toggle('active', b.dataset.section === id))
  mobileNavBtns.forEach(b => b.classList.toggle('active', b.dataset.section === id))
  window.scrollTo({ top: 0, behavior: 'smooth' })
}

navBtns.forEach(btn => btn.addEventListener('click', () => switchSection(btn.dataset.section)))
mobileNavBtns.forEach(btn => btn.addEventListener('click', () => switchSection(btn.dataset.section)))

// ── Tab panels ─────────────────────────────────────────────────────
document.querySelectorAll('.tab-btn').forEach(btn => {
  btn.addEventListener('click', () => {
    const group = btn.dataset.group
    const tab   = btn.dataset.tab

    // deactivate sibling tab buttons
    document.querySelectorAll(`.tab-btn[data-group="${group}"]`).forEach(b => b.classList.remove('active'))
    btn.classList.add('active')

    // show matching panel, hide others
    document.querySelectorAll(`[id^="${group}-"]`).forEach(panel => {
      panel.classList.toggle('active', panel.id === `${group}-${tab}`)
    })
  })
})

// ── UX step tabs ───────────────────────────────────────────────────
const stepData = [
  { num: '01', title: '目標設定',     desc: '貯蓄額と期限を入力。アプリが月の許容支出を自動計算する' },
  { num: '02', title: '支出分類',     desc: '過去の支出を4カテゴリに自動分類。「価値ある消費」はユーザー自身が守る' },
  { num: '03', title: '振り返り発見', desc: '重複・無意識消費を一覧化。グラフで「どこに漏れているか」を直感的に把握' },
  { num: '04', title: '自分ルール作成', desc: '節約チャンスから「自分ルール」を設定。コンビニ→スーパーなど置き換え提案も' },
  { num: '05', title: '継続・達成',   desc: 'ルール達成状況をトラッキング。貯蓄残高がリアルタイムで伸びるのを実感' },
]

const stepDisplay = document.getElementById('stepDisplay')
const stepTabBtns = document.querySelectorAll('.step-tab-btn')

function updateStepDisplay(idx) {
  const d = stepData[idx]
  stepDisplay.querySelector('.step-num').textContent   = d.num
  stepDisplay.querySelector('.step-title').textContent = d.title
  stepDisplay.querySelector('.text-sm').textContent    = d.desc
  stepTabBtns.forEach((b, i) => b.classList.toggle('active', i === idx))
}

stepTabBtns.forEach((btn, i) => {
  btn.addEventListener('click', () => updateStepDisplay(i))
})

// ── Accordion ──────────────────────────────────────────────────────
document.querySelectorAll('.accordion-btn').forEach(btn => {
  btn.addEventListener('click', () => {
    btn.closest('.accordion-item').classList.toggle('open')
  })
})

// ── Init Lucide icons ──────────────────────────────────────────────
lucide.createIcons()

// ── Animations ─────────────────────────────────────────────────────

/**
 * Money Flying Away Animation
 * Used for wasteful consumption/reflection expenses
 */
function animateWastefulSpend(event) {
  const emoji = '💸';
  const particle = document.createElement('div');
  particle.className = 'money-flying';
  particle.textContent = emoji;
  
  // Position near the click or element
  const rect = event.target.getBoundingClientRect();
  particle.style.left = `${rect.left + rect.width / 2}px`;
  particle.style.top = `${rect.top}px`;
  
  document.body.appendChild(particle);
  
  // Remove after animation
  setTimeout(() => {
    particle.remove();
  }, 1500);
}

/**
 * Joyful Celebration Animation
 * Used for saving milestones
 */
function animateSavingJoy(event) {
  const emojis = ['✨', '💖', '💰', '🌈', '🎉'];
  const count = 8;
  
  const rect = event.target.getBoundingClientRect();
  const centerX = rect.left + rect.width / 2;
  const centerY = rect.top + rect.height / 2;

  for (let i = 0; i < count; i++) {
    const particle = document.createElement('div');
    particle.className = 'joy-particle';
    particle.textContent = emojis[Math.floor(Math.random() * emojis.length)];
    
    const angle = (i / count) * Math.PI * 2;
    const velocity = 50 + Math.random() * 50;
    const tx = Math.cos(angle) * velocity;
    const ty = Math.sin(angle) * velocity;
    
    particle.style.left = `${centerX}px`;
    particle.style.top = `${centerY}px`;
    particle.style.setProperty('--tx', `${tx}px`);
    particle.style.setProperty('--ty', `${ty}px`);
    
    // Custom style for expansion
    particle.style.transition = 'all 1s cubic-bezier(0.12, 0, 0.39, 0)';
    document.body.appendChild(particle);
    
    requestAnimationFrame(() => {
      particle.style.transform = `translate(${tx}px, ${ty}px) scale(1.5)`;
      particle.style.opacity = '0';
    });

    setTimeout(() => {
      particle.remove();
    }, 1000);
  }
}

// Attach animations to relevant elements (example)
document.addEventListener('click', (e) => {
  if (e.target.closest('.tx-cat') && e.target.textContent.includes('振り返り')) {
    animateWastefulSpend(e);
  }
  if (e.target.closest('.goal-card') || e.target.closest('.rule-card:not(.off)')) {
    // animateSavingJoy(e);
  }
});

const navMap = {
  btnAprende: 'aprende',
  btnJuega: 'juega',
  btnPlaneta: 'planeta',
  btnValores: 'valores',
  btnNoticias: 'noticias',
  btnGaleria: 'galeria',
  btnContact: 'contacto'
};

Object.keys(navMap).forEach(id => {
  const btn = document.getElementById(id);
  btn?.addEventListener('click', () => {
    setActive(btn);
    showSection(navMap[id]);
  });
});

function setActive(btn) {
  document.querySelectorAll('nav button').forEach(b => b.classList.remove('active'));
  btn.classList.add('active');
}

function showSection(key) {
  Object.values(navMap).forEach(k => {
    const el = document.getElementById(k);
    if(el) el.style.display = 'none';
  });
  const el = document.getElementById(key);
  if(el) el.style.display = 'block';
  
  // Renderizar contenido
  if(key === 'aprende') renderLessons();
  if(key === 'juega') renderGames();
  if(key === 'valores') renderValores();
  if(key === 'contacto') renderContacto();
}

document.getElementById('btnStart')?.addEventListener('click', () => {
  document.getElementById('btnAprende').click();
});

function renderValores() {
  document.getElementById('valores').innerHTML = `
    <h3>💖 Valores que practicamos</h3>
    <div class="cards">
      <div class="card-small"><p class="small-title">🤝 Respeto</p><p class="muted">Trata a los demás como te gustaría ser tratado</p></div>
      <div class="card-small"><p class="small-title">👥 Amistad</p><p class="muted">Apoya a tus compañeros y comparte</p></div>
      <div class="card-small"><p class="small-title">📋 Responsabilidad</p><p class="muted">Cumple tus tareas y ayuda en casa</p></div>
      <div class="card-small"><p class="small-title">✨ Honestidad</p><p class="muted">Di la verdad y sé justo siempre</p></div>
    </div>
  `;
}

function renderContacto() {
  document.getElementById('contacto').innerHTML = `
    <h3>✉️ Contáctanos</h3>
    <form id="contactForm">
      <input required placeholder="Tu nombre" id="cname" style="width:100%;padding:8px;margin-bottom:8px;border-radius:8px;border:1px solid #ddd" />
      <textarea id="cmsg" placeholder="Tu mensaje" style="width:100%;height:80px;padding:10px;border-radius:8px;border:1px solid #ddd;margin-bottom:8px"></textarea>
      <button type="submit" class="cta">Enviar 📨</button>
    </form>
  `;
  document.getElementById('contactForm').onsubmit = (e) => {
    e.preventDefault();
    const n = document.getElementById('cname').value.trim();
    const m = document.getElementById('cmsg').value.trim();
    if(!n || !m) return alert('Completa los campos');
    Storage.add('aj_msgs', {name:n, msg:m, at: new Date().toLocaleString()});
    alert('Mensaje enviado 😊');
    document.getElementById('contactForm').reset();
  };
}

// Iniciar
showSection('aprende');
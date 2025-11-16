const lessons = {
  mat: {
    title: 'Matemáticas',
    content: `
      <h3>📐 Sumas divertidas</h3>
      <p>Resuelve: ¿Cuánto es 27 + 15?</p>
      <button class="cta" onclick="alert('¡Correcto! 42 ✅')">42</button>
      <button class="cta" onclick="alert('Intenta otra vez')">40</button>
    `
  },
  esp: {
    title: 'Español',
    content: `
      <h3>📖 Palabras con ñ</h3>
      <p>Escribe 3 palabras que tengan la letra "ñ".</p>
      <textarea placeholder="ej: niño, cañón, piñata" style="width:100%;height:80px;border-radius:8px;border:1px solid #ddd;padding:10px"></textarea>
    `
  },
  cien: {
    title: 'Ciencias',
    content: `
      <h3>🔬 Plantas y vida</h3>
      <p>Las plantas necesitan: agua 💧, luz ☀️ y tierra 🌍</p>
      <p>¿Puedes regar una planta hoy?</p>
    `
  },
  hist: {
    title: 'Historia',
    content: `
      <h3>📚 Personajes importantes</h3>
      <p>Investiga un personaje histórico y cuéntalo en clase.</p>
      <p>Algunas figuras: Benito Juárez 🇲🇽, Frida Kahlo 🎨</p>
    `
  }
};

function renderLessons() {
  const aprendeDiv = document.getElementById('aprende');
  aprendeDiv.innerHTML = `
    <div class="cards">
      ${Object.entries(lessons).map(([k, v]) => `
        <div class="card-small">
          <p class="small-title">${v.title}</p>
          <p class="muted">Haz clic para aprender</p>
          <button class="cta" onclick="showLesson('${k}')">Ver</button>
        </div>
      `).join('')}
    </div>
    <section id="lesson" style="margin-top:12px"></section>
  `;
}

function showLesson(id) {
  const lesson = document.getElementById('lesson');
  lesson.innerHTML = lessons[id]?.content || '<p>Lección no encontrada</p>';
}
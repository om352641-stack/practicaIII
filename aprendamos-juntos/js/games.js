const quizQuestions = [
  {q:'¿Cuántos centímetros tiene un metro?', a:['50','100','10','1'], ok:1},
  {q:'¿El agua es un recurso natural?', a:['Sí','No'], ok:0}
];

function renderGames() {
  const juegarDiv = document.getElementById('juega');
  juegarDiv.innerHTML = `
    <div class="cards">
      <div class="card-small">
        <p class="small-title">🎯 Quiz</p>
        <p class="muted">Contesta y gana estrellas</p>
        <button class="cta" onclick="startQuiz()">Jugar</button>
      </div>
      <div class="card-small">
        <p class="small-title">🧠 Memoria</p>
        <p class="muted">Encuentra parejas</p>
        <button class="cta" onclick="startMemory()">Jugar</button>
      </div>
      <div class="card-small">
        <p class="small-title">♻️ Recicla</p>
        <p class="muted">Arrastra objetos</p>
        <button class="cta" onclick="startRecycle()">Jugar</button>
      </div>
    </div>
    <div id="gameArea" style="margin-top:12px"></div>
  `;
}

function startQuiz() {
  const area = document.getElementById('gameArea');
  area.innerHTML = '';
  let idx = 0, score = 0;
  const box = document.createElement('div');
  box.className = 'card-small center';
  area.append(box);
  
  function render() {
    const cur = quizQuestions[idx];
    box.innerHTML = `
      <h3>${cur.q}</h3>
      <div class="quiz-answers">
        ${cur.a.map((t,i) => `<button onclick="checkQuiz(${i},${cur.ok},${idx})">${t}</button>`).join('')}
      </div>
      <p>Pregunta ${idx+1}/${quizQuestions.length}</p>
    `;
  }
  window.checkQuiz = (i, ok, q) => {
    if(i === ok) score++;
    idx++;
    if(idx < quizQuestions.length) render();
    else box.innerHTML = `<h3>¡Juego terminado!</h3><p>Aciertos: ${score}/${quizQuestions.length}</p>`;
  };
  render();
}

function startMemory() {
  const area = document.getElementById('gameArea');
  const emojis = ['🍎','🚗','⚽️','🐶','🌟','🎈','🍎','🚗','⚽️','🐶','🌟','🎈'];
  emojis.sort(() => Math.random() - 0.5);
  const board = document.createElement('div');
  board.className = 'board';
  area.innerHTML = '';
  area.append(board);
  let first = null, lock = false, matches = 0;
  
  emojis.forEach(em => {
    const c = document.createElement('div');
    c.className = 'card-game';
    c.dataset.emoji = em;
    c.textContent = '❓';
    c.onclick = () => {
      if(lock || c.classList.contains('matched')) return;
      c.classList.add('flipped');
      c.textContent = em;
      if(!first) first = c;
      else {
        if(first.dataset.emoji === em) {
          first.classList.add('matched');
          c.classList.add('matched');
          matches++;
          first = null;
          if(matches === emojis.length/2) board.innerHTML = '<h3>¡Ganaste! 🎉</h3>';
        } else {
          lock = true;
          setTimeout(() => {
            first.classList.remove('flipped');
            first.textContent = '❓';
            c.classList.remove('flipped');
            c.textContent = '❓';
            first = null;
            lock = false;
          }, 700);
        }
      }
    };
    board.append(c);
  });
}

function startRecycle() {
  const area = document.getElementById('gameArea');
  area.innerHTML = `
    <h3>♻️ Separa la basura</h3>
    <p>Arrastra cada objeto a su canasta</p>
    <div style="display:flex;gap:12px">
      <div class="drop" ondrop="drop(event)" ondragover="dragover(event)"><strong>🟢 Orgánico</strong></div>
      <div class="drop" ondrop="drop(event)" ondragover="dragover(event)"><strong>🟡 Reciclable</strong></div>
      <div class="drop" ondrop="drop(event)" ondragover="dragover(event)"><strong>🔴 Peligroso</strong></div>
    </div>
  `;
}
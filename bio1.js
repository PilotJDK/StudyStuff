const notesEl = document.getElementById('notes');
const searchInput = document.getElementById('search-notes');

function escapeRegExp(string){ return string.replace(/[.*+?^${}()|[\]\\]/g, '\\$&'); }

function searchNotes(term){
  const allUnits = notesEl.querySelectorAll('.unit');
  if(!term){
    allUnits.forEach(u => u.style.display = 'block');
    document.querySelectorAll('.subunit').forEach(s => s.style.display = 'block');
    document.querySelectorAll('mark').forEach(m => {
      const text = m.textContent;
      m.replaceWith(document.createTextNode(text));
    });
    return;
  }
  
  const regex = new RegExp('(' + escapeRegExp(term) + ')','gi');
  
  allUnits.forEach(unit => {
    const subunits = unit.querySelectorAll('.subunit');
    let hasMatch = false;
    
    subunits.forEach(sub => {
      const text = sub.textContent.toLowerCase();
      if(text.includes(term.toLowerCase())){
        hasMatch = true;
        sub.style.display = 'block';
        
        const strong = sub.querySelector('strong');
        const p = sub.querySelector('p');
        if(strong) strong.innerHTML = strong.textContent.replace(regex, '<mark>$1</mark>');
        if(p) p.innerHTML = p.textContent.replace(regex, '<mark>$1</mark>');
      } else {
        sub.style.display = 'none';
      }
    });
    
    unit.style.display = hasMatch ? 'block' : 'none';
  });
}

searchInput.addEventListener('input', ()=>{ searchNotes(searchInput.value.trim()); });

function buildUnitSelector(){
  const notesTree = document.getElementById('notes-tree');
  if(!notesTree) return;
  notesTree.innerHTML = '';
  
  const units = document.querySelectorAll('.unit');
  units.forEach(unit=>{
    const unitId = unit.id;
    const unitTitle = unit.querySelector('h2').textContent;
    const subunits = unit.querySelectorAll('.subunit');
    
    const nItem = document.createElement('li');
    const nDiv = document.createElement('div'); nDiv.className='unit-item';
    const nSpan = document.createElement('span'); nSpan.textContent = unitTitle;
    nSpan.style.cursor = 'pointer';
    nSpan.onclick = ()=>{ unit.scrollIntoView({behavior:'smooth',block:'start'}); };
    const nCb = document.createElement('input'); nCb.type='checkbox'; nCb.checked = true; nCb.dataset.unit = unitId; nCb.className='unit-checkbox';
    nDiv.appendChild(nSpan); nDiv.appendChild(nCb);
    nItem.appendChild(nDiv);
    
    subunits.forEach(sub=>{
      const subItem = document.createElement('li');
      const subDiv = document.createElement('div'); subDiv.className='subunit-item';
      subDiv.textContent = sub.querySelector('strong').textContent;
      subDiv.style.cursor = 'pointer';
      subDiv.onclick = ()=>{ sub.scrollIntoView({behavior:'smooth',block:'center'}); };
      subItem.appendChild(subDiv);
      nItem.appendChild(subItem);
    });
    
    notesTree.appendChild(nItem);
  });
  
  document.querySelectorAll('.unit-checkbox').forEach(cb=>{
    cb.addEventListener('change', ()=>{ buildSessionQuestions(); });
  });
}

const questions = [
  {
    id:'q1', unit:'unit1', type:'multiple', q:'What is the powerhouse of the cell?',
    choices:['Ribosome','Mitochondria','Endoplasmic Reticulum','Golgi Apparatus'],
    answer:1,
    explain:'Mitochondria generate ATP via cellular respiration.',
    explain_each:[
      'Ribosomes synthesize proteins; they do not generate ATP.',
      'Correct — mitochondria produce ATP via oxidative phosphorylation during cellular respiration.',
      'Endoplasmic reticulum handles protein and lipid synthesis, not primary ATP production.',
      'Golgi apparatus modifies and packages proteins for export, not energy production.'
    ]
  },
  {
    id:'q2', unit:'unit2', type:'truefalse', q:'DNA is double-stranded.',
    choices:['True','False'],answer:0,
    explain:'DNA is typically double-stranded forming a double helix.',
    explain_each:[
      'Correct — canonical DNA molecules in cells are two complementary strands forming a double helix.',
      'While some viruses or fragments can be single-stranded, standard cellular DNA is double-stranded.'
    ]
  },
  {
    id:'q3', unit:'unit2', type:'selectall', q:'Which of the following are components of a nucleotide?',
    choices:['Phosphate group','Amino acid','Sugar','Nitrogenous base'],
    answer:[0,2,3],
    explain:'Nucleotides contain a phosphate, a sugar, and a nitrogenous base.',
    explain_each:[
      'Phosphate: Yes — nucleotides have a phosphate group that links sugars in the backbone.',
      'Amino acid: No — amino acids are the building blocks of proteins, not nucleotides.',
      'Sugar: Yes — either ribose (RNA) or deoxyribose (DNA) is present in a nucleotide.',
      'Nitrogenous base: Yes — adenine, thymine/uracil, cytosine, or guanine make up the base.'
    ]
  },
  {
    id:'q4', unit:'unit1', type:'multiple', q:'Which process produces gametes?',
    choices:['Mitosis','Meiosis','Binary fission','Photosynthesis'],
    answer:1,
    explain:'Meiosis reduces chromosome number to produce gametes.',
    explain_each:[
      'Mitosis produces daughter cells identical to the parent; it does not halve chromosome number for gametes.',
      'Correct — meiosis involves two divisions and produces haploid gametes from diploid cells.',
      'Binary fission is used by many prokaryotes for asexual reproduction; it is not meiosis.',
      'Photosynthesis is the process plants use to convert light energy to chemical energy; unrelated to gamete formation.'
    ]
  },
  {
    id:'q5', unit:'unit1', type:'truefalse', q:'Prokaryotic cells have a nucleus.',
    choices:['True','False'],answer:1,
    explain:'Prokaryotes lack a membrane-bound nucleus.',
    explain_each:[
      'Incorrect — prokaryotes do not have a membrane-bound nucleus; their genetic material is in the nucleoid.',
      'Correct — prokaryotes lack a true nucleus enclosed by a membrane.'
    ]
  }
];
let currentIndex = 0; let score = 0; let total = 0;

const quizArea = document.getElementById('quiz-area');
const scoreEl = document.getElementById('score');
const totalEl = document.getElementById('total');
const submitBtn = document.getElementById('submit-answer');
const nextBtn = document.getElementById('next-question');
const resetBtn = document.getElementById('reset-quiz');

let sessionQuestions = [];

function shuffleArray(a){
  for(let i=a.length-1;i>0;i--){ const j = Math.floor(Math.random()*(i+1)); const t=a[i]; a[i]=a[j]; a[j]=t; }
  return a;
}

function getSelectedUnits(){
  const checks = Array.from(document.querySelectorAll('#notes-tree .unit-checkbox'));
  const sel = checks.filter(c=>c.checked).map(c=>c.dataset.unit);
  if(sel.length) return sel;
  const allUnits = Array.from(document.querySelectorAll('.unit[data-unit]'));
  return allUnits.map(u=>u.dataset.unit);
}

function buildSessionQuestions(){
  const selected = getSelectedUnits();
  let pool = questions.filter(q=>{ return !q.unit || selected.includes(q.unit); });
  const mapped = pool.map(orig=>{
    const q = JSON.parse(JSON.stringify(orig));
    const idxs = q.choices.map((_,i)=>i);
    shuffleArray(idxs);
    const newChoices = idxs.map(i=>q.choices[i]);
    const newExplainEach = idxs.map(i=> (q.explain_each && q.explain_each[i]) ? q.explain_each[i] : '');
    if(Array.isArray(q.answer)){
      const newAns = q.answer.map(origIdx=> idxs.findIndex(n=>n===origIdx)).filter(v=>v>=0);
      q.answer = newAns;
    } else {
      q.answer = idxs.findIndex(n=>n===q.answer);
    }
    q.choices = newChoices; q.explain_each = newExplainEach;
    return q;
  });
  shuffleArray(mapped);
  sessionQuestions = mapped;
  currentIndex = 0; score = 0; total = 0; scoreEl.textContent=score; totalEl.textContent=total;
  renderQuestion(currentIndex);
}

function renderQuestion(idx){
  if(!sessionQuestions || sessionQuestions.length===0){ quizArea.innerHTML = '<div class="small">No questions available for selected units. Use the Units button to select different units.</div>'; submitBtn.disabled=true; nextBtn.disabled=true; return; }
  const q = sessionQuestions[idx];
  quizArea.innerHTML = '';
  const questionEl = document.createElement('div'); questionEl.className='question'; questionEl.innerHTML = `<strong>Q${idx+1}.</strong> ${q.q}`;
  quizArea.appendChild(questionEl);
  const choices = document.createElement('div'); choices.className='choices';

  if(q.type === 'multiple' || q.type === 'truefalse'){
    q.choices.forEach((c,i)=>{
      const ch = document.createElement('div'); ch.className='choice'; ch.tabIndex=0; ch.dataset.index=i; ch.innerHTML = `<span>${c}</span>`;
      ch.onclick = ()=>{ choices.querySelectorAll('.choice').forEach(x=>x.classList.remove('selected')); ch.classList.add('selected'); };
      choices.appendChild(ch);
    });
  } else if(q.type === 'selectall'){
    q.choices.forEach((c,i)=>{
      const ch = document.createElement('label'); ch.className='choice'; ch.style.display='flex'; ch.style.alignItems='center'; ch.style.justifyContent='space-between';
      const left = document.createElement('span'); left.style.display='flex'; left.style.alignItems='center';
      const cb = document.createElement('input'); cb.type='checkbox'; cb.style.marginRight='0.6rem'; cb.dataset.index = i;
      left.appendChild(cb); left.appendChild(document.createTextNode(c));
      ch.appendChild(left);
      choices.appendChild(ch);
    });
  }
  quizArea.appendChild(choices);
  const explainEl = document.createElement('div'); explainEl.id='explain'; explainEl.style.marginTop='0.6rem'; quizArea.appendChild(explainEl);
  submitBtn.disabled = false; nextBtn.disabled = true;
}

function arraysEqual(a,b){ if(a.length!==b.length) return false; a = [...a].sort(); b=[...b].sort(); return a.every((v,i)=>v===b[i]); }

submitBtn.addEventListener('click', ()=>{
  const q = sessionQuestions[currentIndex];
  const choicesEl = quizArea.querySelector('.choices');
  if(!q) return;
  let correct = false;
  let userSelection = null;

  if(q.type === 'multiple' || q.type === 'truefalse'){
    const sel = choicesEl.querySelector('.choice.selected');
    if(!sel){ alert('Please select an answer'); return; }
    const idx = Number(sel.dataset.index); userSelection = idx;
    if(idx === q.answer){ correct = true; sel.classList.add('correct'); } else { sel.classList.add('wrong'); }
  } else if(q.type === 'selectall'){
    const checked = Array.from(choicesEl.querySelectorAll('input[type="checkbox"]')).filter(c=>c.checked).map(c=>Number(c.dataset.index));
    if(checked.length===0){ alert('Select at least one option'); return; }
    userSelection = checked;
    if(arraysEqual(checked, q.answer)){ correct = true; checked.forEach(i=>{ const el = choicesEl.querySelector('[data-index="'+i+'"]').closest('.choice'); if(el) el.classList.add('correct'); }); }
    else { Array.from(choicesEl.querySelectorAll('input[type="checkbox"]')).forEach(c=>{ if(c.checked){ c.closest('.choice').classList.add('wrong'); } }); }
  }

  total += 1; if(correct) score += 1; scoreEl.textContent = score; totalEl.textContent = total;

  const explainEl = document.getElementById('explain'); explainEl.innerHTML = '';
  const list = document.createElement('div'); list.className='micro'; const ul = document.createElement('ul'); ul.style.paddingLeft='1rem';
  q.choices.forEach((choice,i)=>{
    const li = document.createElement('li'); li.style.marginBottom='0.5rem';
    const prefix = (Array.isArray(userSelection) ? (userSelection.includes(i) ? 'Your selection — ' : '') : (userSelection===i ? 'Your selection — ' : ''));
    const correctness = ( (Array.isArray(q.answer) ? q.answer.includes(i) : q.answer===i) ) ? ' (correct)' : ' (incorrect)';
    li.innerHTML = `<strong>${prefix}${choice}</strong>${correctness}<div style="margin-top:0.25rem">${(q.explain_each && q.explain_each[i]) ? q.explain_each[i] : (i===q.answer ? q.explain : '')}</div>`;
    ul.appendChild(li);
  }); list.appendChild(ul); explainEl.appendChild(list);

  submitBtn.disabled = true; nextBtn.disabled = false;
});

nextBtn.addEventListener('click', ()=>{
  if(!sessionQuestions || sessionQuestions.length===0) return;
  currentIndex = (currentIndex + 1) % sessionQuestions.length;
  renderQuestion(currentIndex);
});

resetBtn.addEventListener('click', ()=>{
  if(!confirm('Reset quiz score and progress?')) return;
  score = 0; total = 0; scoreEl.textContent=score; totalEl.textContent=total; currentIndex=0; buildSessionQuestions();
});

buildUnitSelector(); buildSessionQuestions();

(function updateClock(){
  const clockEl = document.getElementById('clock');
  if(!clockEl) return;
  function tick(){
    const now = new Date();
    let h = now.getHours();
    const m = now.getMinutes().toString().padStart(2,'0');
    const s = now.getSeconds().toString().padStart(2,'0');
    const ampm = h >= 12 ? 'PM' : 'AM';
    h = h % 12 || 12;
    clockEl.textContent = `${h}:${m}:${s} ${ampm}`;
  }
  tick();
  setInterval(tick, 1000);
})();

(function initSidebar(){
  const openBtn = document.getElementById('open-sidebar-btn');
  const overlay = document.getElementById('sidebar-overlay');
  const sidebar = document.getElementById('sidebar');
  const closeBtn = document.getElementById('close-sidebar');
  if (!openBtn || !overlay || !sidebar || !closeBtn) return;
  function showSidebar(){ sidebar.classList.add('open'); overlay.classList.add('visible'); sidebar.setAttribute('aria-hidden','false'); }
  function hideSidebar(){ sidebar.classList.remove('open'); overlay.classList.remove('visible'); sidebar.setAttribute('aria-hidden','true'); }
  openBtn.addEventListener('click', showSidebar);
  closeBtn.addEventListener('click', hideSidebar);
  overlay.addEventListener('click', hideSidebar);
  document.addEventListener('keydown', (e)=>{ if (e.key === 'Escape') hideSidebar(); });
  const sidebarItems = Array.from(document.querySelectorAll('.sidebar-item'));
  sidebarItems.forEach(item=>{ item.addEventListener('click', ()=>{ const id = item.dataset.id; if(id) window.location.href = id + '.html'; }); });
})();

import { leerLS, guardarLS } from './storage.js'

export function initRatings(){
  const perfil = document.getElementById('perfil-runner')
  const form = document.getElementById('form-rating')
  const lista = document.getElementById('lista-ratings')
  const params = new URLSearchParams(window.location.search)
  let id = params.get('id')
  // If no id in URL, try to use previously selected runner id saved in localStorage
  if(!id){
    try{
      const saved = localStorage.getItem('currentRunnerId')
      if(saved) id = saved
    }catch(e){ /* ignore */ }
  }

  function mostrarPerfil(){
    if(!perfil) return
    const runners = leerLS('runners') || []
    const r = runners.find(x=> x.id == id)
    if(!r) { perfil.textContent = 'Runner no encontrado'; return }
    // Calculate average rating for this runner
    const rawRatings = leerLS(`ratings_${r.id}`) || []
    const scores = rawRatings.map(rt => Number(rt.value ?? rt.valor ?? rt.valor)).filter(n => !Number.isNaN(n))
    const avgVal = scores.length ? (scores.reduce((a,b)=>a+b,0)/scores.length) : (r.ratingAvg || 0)
    const avgHtml = scores.length || r.ratingAvg ? `<div style="margin-top:6px;">⭐ ${avgVal.toFixed(1)}</div>` : ''
    perfil.innerHTML = `<div class="title">${r.nombre}</div><small class="muted">${r.zona}</small>${avgHtml}<div style="margin-top:8px;"><a href="runner-earnings.html?id=${r.id}">Ver Ganancias</a></div>`
  }

  function mostrarRatings(){
    if(!lista) return
    lista.innerHTML = ''
    if(!id) return
    const all = leerLS(`ratings_${id}`) || []
    all.forEach(rt=>{
      const d = document.createElement('div')
      d.className = 'card'
      // Support older sample data which used `valor` and new entries that may use `value`
      const score = rt.value ?? rt.valor ?? rt.valor
      d.innerHTML = `<div>⭐ ${score}</div><div>${rt.comentario || rt.comentario || ''}</div>`
      lista.appendChild(d)
    })
  }

  if(form){
    form.addEventListener('submit', e=>{
      e.preventDefault()
      const val = document.getElementById('ratingValue').value
      const com = document.getElementById('ratingComentario').value
      // Store ratings using `valor`/`comentario` keys to remain compatible with sample.json
      if(!id) { alert('No se encontró runner seleccionado para guardar el rating.'); return }
      const all = leerLS(`ratings_${id}`) || []
      all.push({ valor: String(val), comentario: com })
      guardarLS(`ratings_${id}`, all)
      mostrarRatings()
    })
  }

  mostrarPerfil()
  mostrarRatings()
}

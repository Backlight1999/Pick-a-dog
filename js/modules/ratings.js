import { leerLS, guardarLS } from './storage.js'

export function initRatings(){
  const perfil = document.getElementById('perfil-runner')
  const form = document.getElementById('form-rating')
  const lista = document.getElementById('lista-ratings')
  const params = new URLSearchParams(window.location.search)
  const id = params.get('id')

  function mostrarPerfil(){
    if(!perfil) return
    const runners = leerLS('runnersDB') || []
    const r = runners.find(x=> x.id === id) || runners[0]
    if(!r) { perfil.textContent = 'Runner no encontrado'; return }
    perfil.innerHTML = `<div class="title">${r.nombre}</div><small class="muted">${r.zona}</small><div style="margin-top:8px;"><a href="runner-earnings.html?id=${r.id}">Ver Ganancias</a></div>`
  }

  function mostrarRatings(){
    if(!lista) return
    lista.innerHTML = ''
    const all = leerLS(`ratings_${id}`) || []
    all.forEach(rt=>{
      const d = document.createElement('div')
      d.className = 'card'
      d.innerHTML = `<div>⭐ ${rt.value}</div><div>${rt.comentario || ''}</div>`
      lista.appendChild(d)
    })
  }

  if(form){
    form.addEventListener('submit', e=>{
      e.preventDefault()
      const val = document.getElementById('ratingValue').value
      const com = document.getElementById('ratingComentario').value
      const all = leerLS(`ratings_${id}`) || []
      all.push({ value: Number(val), comentario: com })
      guardarLS(`ratings_${id}`, all)
      mostrarRatings()
    })
  }

  mostrarPerfil()
  mostrarRatings()
}

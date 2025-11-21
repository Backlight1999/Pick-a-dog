import { leerLS, guardarLS } from './storage.js'

export function initRunners(){
  const lista = document.getElementById('lista-runners')
  const form = document.getElementById('form-runner')
  const filtro = document.getElementById('filtro-runners')
  const runners = leerLS('runners') || []

  function mostrar(listaElem, items){
    if(!listaElem) return
    listaElem.innerHTML = ''
    items.forEach(r=>{
      const d = document.createElement('div')
      d.className = 'card'
      const avg = r.ratingAvg ? `⭐ ${r.ratingAvg.toFixed(1)}` : ''
      // Hacemos que cada card sea un enlace al perfil del runner
      d.innerHTML = `<a href="runner-profile.html?id=${r.id}" style="text-decoration:none; color:inherit;"><div class="title">${r.nombre} ${avg}</div><small class="muted">${r.zona}</small></a>`
      listaElem.appendChild(d)
    })
  }

  if(filtro){
    filtro.addEventListener('input', ()=>{
      const q = filtro.value.toLowerCase().trim()
      const filtered = runners.filter(r=> r.zona && r.zona.toLowerCase().includes(q))
      mostrar(lista, filtered)
    })
  }

  if(form){
    form.addEventListener('submit', e=>{
      e.preventDefault()
      const data = Object.fromEntries(new FormData(form))
      data.id = Date.now() // Asignar un ID único
      data.ratingAvg = 0
      const runners = leerLS('runners') || []
      runners.push(data)
      guardarLS('runners', runners)
      mostrar(lista, runners)
    })
  }

  mostrar(lista, runners)
}

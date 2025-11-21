import { leerLS, guardarLS } from './storage.js'

export function initPerros(){
  const lista = document.getElementById('lista-perros')
  const form = document.getElementById('form-perro')
  const titulo = document.querySelector('h1')
  const perros = leerLS('perros') || []
  if(titulo) titulo.textContent = `Dueños y Perros (${perros.length})`

  function mostrarPerros(){
    if(!lista) return
    lista.innerHTML = ''
    perros.forEach(p=>{
      const div = document.createElement('div')
      div.className = 'card'
      div.innerHTML = `<div class="title">${p.nombre}</div><small class="muted">${p.raza} - ${p.zona}</small>`
      lista.appendChild(div)
    })
  }

  if(form){
    form.addEventListener('submit', e=>{
      e.preventDefault()
      const data = Object.fromEntries(new FormData(form))
      perros.push(data)
      guardarLS('perros', perros)
      mostrarPerros()
    })
  }

  mostrarPerros()
}

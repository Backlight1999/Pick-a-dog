import { leerLS, guardarLS } from './storage.js'

export function initPerros(){
  const lista = document.getElementById('lista-perros')
  const form = document.getElementById('form-perro')
  const titulo = document.getElementById('titulo-lista-perros')

  function mostrarPerros(perros){
    if(!lista) return
    lista.innerHTML = ''
    if(titulo) titulo.textContent = `Mis Perros Registrados (${perros.length})`

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
      const perrosActuales = leerLS('perros') || []
      const data = Object.fromEntries(new FormData(form))
      data.id = Date.now() // Asignar un ID único
      perrosActuales.push(data)
      guardarLS('perros', perrosActuales)
      mostrarPerros(perrosActuales)
      form.reset()
    })
  }

  const perrosIniciales = leerLS('perros') || []
  mostrarPerros(perrosIniciales)
}

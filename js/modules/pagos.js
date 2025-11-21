import { leerLS } from './storage.js'

export function initPagos(){
  const params = new URLSearchParams(window.location.search)
  const id = params.get('id')
  const runnerInfo = document.getElementById('runner-info')
  const historial = document.getElementById('historial-pagos')
  if(!id) return
  const pagos = leerLS(`pagos_${id}`) || []
  if(runnerInfo) runnerInfo.innerHTML = `<div class="title">Runner ${id}</div>`
  if(historial){
    historial.innerHTML = ''
    pagos.forEach(p=>{
      const d = document.createElement('div')
      d.className = 'card'
      d.innerHTML = `<div>${p.fecha} - $${p.monto}</div>`
      historial.appendChild(d)
    })
  }
}

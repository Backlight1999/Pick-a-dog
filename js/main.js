import { initPerros } from './js/modules/perros.js'
import { initRunners } from './js/modules/runners.js'
import { initRatings } from './js/modules/ratings.js'
import { initPagos } from './js/modules/pagos.js'
import { initMaps } from './js/modules/maps.js'
import { guardarLS } from './js/modules/storage.js'

function initSampleData() {
  const btn = document.getElementById('btn-load-sample')
  if (!btn) return

  btn.addEventListener('click', async () => {
    try {
      const res = await fetch('data/sample.json')
      if (!res.ok) throw new Error('No se pudo cargar el archivo de datos de muestra.')
      const data = await res.json()

      for (const key in data) {
        guardarLS(key, data[key])
      }
      alert('¡Datos de muestra cargados! La página se recargará para mostrar los cambios.')
      // Recargamos la página para que los módulos lean los nuevos datos
      window.location.reload()
    } catch (error) {
      console.error('Error al cargar datos de muestra:', error)
      alert('Hubo un problema al cargar los datos de muestra.')
    }
  })
}

window.addEventListener('DOMContentLoaded', ()=>{
  initSampleData()
  initPerros?.()
  initRunners?.()
  initRatings?.()
  initPagos?.()
  initMaps?.()
})

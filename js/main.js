import { initPerros } from './js/modules/perros.js'
import { initRunners } from './js/modules/runners.js'
import { initRatings } from './js/modules/ratings.js'
import { initPagos } from './js/modules/pagos.js'
import { initMaps } from './js/modules/maps.js'

window.addEventListener('DOMContentLoaded', ()=>{
  initPerros && initPerros()
  initRunners && initRunners()
  initRatings && initRatings()
  initPagos && initPagos()
  initMaps && initMaps()
})

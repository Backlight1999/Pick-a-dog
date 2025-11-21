export function initMaps(){
  const mapEl = document.getElementById('map')
  if(!mapEl) return
  // placeholder: actual map requires API key
  mapEl.textContent = 'Mapa disponible con clave de Google Maps (no incluida)'
}

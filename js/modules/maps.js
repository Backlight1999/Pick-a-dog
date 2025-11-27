export function initMaps(){
  const mapEl = document.getElementById('map')
  if(!mapEl) return

  // Inserta el iframe de YouTube dentro del cuadro del mapa
  mapEl.innerHTML = ''
  const iframe = document.createElement('iframe')
  iframe.src = 'https://www.youtube.com/embed/GA2rHuFfrh8'
  iframe.title = 'YouTube video'
  iframe.allow = 'accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share'
  iframe.allowFullscreen = true
  iframe.style.width = '100%'
  iframe.style.height = '100%'
  iframe.style.border = '0'

  mapEl.appendChild(iframe)
}

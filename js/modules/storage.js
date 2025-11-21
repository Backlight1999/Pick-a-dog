export function leerLS(key){
  try{
    const raw = localStorage.getItem(key)
    const parsed = JSON.parse(raw)
    if(Array.isArray(parsed)) return parsed
    if(parsed && typeof parsed === 'object') return parsed
    return []
  }catch(e){
    console.warn('leerLS parse error for',key,e)
    return []
  }
}
export function guardarLS(key, value){
  try{ localStorage.setItem(key, JSON.stringify(value)) }catch(e){ console.error('guardarLS error',e) }
}

// storage helpers: small wrapper around localStorage
export function guardarLS(clave, datos) {
    localStorage.setItem(clave, JSON.stringify(datos));
}

export function leerLS(clave) {
    const raw = localStorage.getItem(clave);
    return raw ? JSON.parse(raw) : [];
}

/**
 * Index Page Module
 * Handles home page functionality like loading sample data
 */

import { cargarDatosMuestra } from './dataLoader.js';

export function initIndexPage() {
    // Only run on index.html
    if (!window.location.pathname.endsWith('index.html') && 
        !window.location.pathname.endsWith('/') &&
        window.location.pathname !== '/index.html') {
        return;
    }

    const btnLoadSample = document.getElementById('btn-load-sample');
    if (btnLoadSample) {
        btnLoadSample.addEventListener('click', async () => {
            btnLoadSample.disabled = true;
            btnLoadSample.textContent = '⏳ Cargando...';
            
            const success = await cargarDatosMuestra();
            
            if (success) {
                btnLoadSample.textContent = '✅ ¡Cargado! Recargando...';
                setTimeout(() => location.reload(), 1500);
            } else {
                btnLoadSample.disabled = false;
                btnLoadSample.textContent = '❌ Error al cargar';
                setTimeout(() => {
                    btnLoadSample.textContent = '📦 Cargar Datos de Muestra';
                }, 3000);
            }
        });
    }
}

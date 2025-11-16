import {leerLS, guardarLS} from './storage.js';
import {readFileAsDataURL} from './files.js';

// Función para mostrar notificaciones de éxito
function mostrarNotificacion(mensaje, tipo = 'success') {
    const toast = document.createElement('div');
    toast.style.cssText = `
        position: fixed;
        top: 20px;
        right: 20px;
        background: ${tipo === 'success' ? '#51cf66' : tipo === 'error' ? '#ff5757' : '#4A90E2'};
        color: white;
        padding: 15px 20px;
        border-radius: 8px;
        box-shadow: 0 4px 12px rgba(0,0,0,0.15);
        z-index: 9999;
        font-weight: 600;
        animation: slideIn 0.3s ease;
    `;
    toast.textContent = mensaje;
    document.body.appendChild(toast);
    setTimeout(() => toast.remove(), 3000);
}

export function initPerros() {
    function cargarPerros() {
        const datos = leerLS('perros');
        // Asegurar que siempre es un array
        return Array.isArray(datos) ? datos : [];
    }

    let perros = cargarPerros();

    const form = document.getElementById('form-perro');
    if (form) {
        form.addEventListener('submit', async e => {
            e.preventDefault();

            const nombreEl = document.getElementById('nombrePerro');
            const razaEl = document.getElementById('razaPerro');
            const zonaEl = document.getElementById('zonaPerro');
            const tamanoEl = document.getElementById('tamanoPerro');
            const energiaEl = document.getElementById('energiaPerro');
            const fotoPerroEl = document.getElementById('fotoPerro');

            const nuevo = {
                id: Date.now(),
                nombre: nombreEl ? nombreEl.value.trim() : '',
                raza: razaEl ? razaEl.value.trim() : '',
                zona: zonaEl ? zonaEl.value.trim().toLowerCase() : '',
                tamano: tamanoEl ? tamanoEl.value : '',
                energia: energiaEl ? energiaEl.value : '',
                foto: ''
            };

            if (!nuevo.nombre || !nuevo.zona) {
                alert('Por favor completa el nombre y la zona del perro.');
                return;
            }

            if (fotoPerroEl && fotoPerroEl.files && fotoPerroEl.files[0]) {
                try {
                    nuevo.foto = await readFileAsDataURL(fotoPerroEl.files[0]);
                } catch (err) {
                    console.warn('No se pudo leer la foto del perro:', err);
                }
            }

            const perrosActuales = cargarPerros();
            perrosActuales.push(nuevo);
            guardarLS('perros', perrosActuales);
            perros = perrosActuales;
            console.log('✅ Perro guardado:', nuevo);
            console.log('📊 Total perros:', perrosActuales.length);
            
            mostrarNotificacion(`✅ ¡${nuevo.nombre} registrado exitosamente!`);

            mostrarPerros();
            e.target.reset();
            previewPerroDiv.innerHTML = '';

        });

        // preview behavior for dog photo input
        const fotoPerroInput = document.getElementById('fotoPerro');
        const previewPerroDiv = document.getElementById('preview-foto-perro');
        if (fotoPerroInput && previewPerroDiv) {
            fotoPerroInput.addEventListener('change', async () => {
                const f = fotoPerroInput.files && fotoPerroInput.files[0];
                if (!f) { previewPerroDiv.innerHTML = ''; return; }
                try {
                    const data = await readFileAsDataURL(f);
                    previewPerroDiv.innerHTML = `<img src="${data}" alt="Preview perro" style="max-width:120px; border-radius:8px; display:block;">`;
                } catch (err) {
                    previewPerroDiv.innerHTML = '';
                }
            });
        }

        mostrarPerros();
    }

    function mostrarPerros() {
        const cont = document.getElementById('lista-perros');
        if (!cont) return;

        const perrosList = cargarPerros();
        const runners = leerLS('runnersDB');
        const total = perrosList.length;
        
        // Actualizar el heading si existe
        const heading = document.querySelector('.container h2');
        if (heading && heading.textContent.includes('Mis Perros')) {
            heading.innerHTML = `Mis Perros Registrados (${total}) 🐕`;
        }
        
        cont.innerHTML = '';
        if (perrosList.length === 0) {
            cont.innerHTML = `
                <div style="text-align: center; padding: 30px; color: #999;">
                    <p style="font-size: 2.5em; margin: 0;">🐕</p>
                    <h3>Aún no registras perros</h3>
                    <p>Completa el formulario arriba para registrar tu primer perro.</p>
                </div>
            `;
            return;
        }
        
        perrosList.forEach(p => {
            let mapButton = '';
            // Show map button if there are runners
            if (runners.length > 0) {
                const firstRunner = runners[0];
                mapButton = `<a href="map-view.html?runner_id=${firstRunner.id}&dog_id=${p.id}" style="display:inline-block; margin-top:8px;"><button style="background: #7fb069;">🗺️ Ver Mapa</button></a>`;
            }
            cont.innerHTML += `
                <div class="card">
                    ${p.foto ? `<img src="${p.foto}" alt="${p.nombre}" style="max-width:120px; border-radius:8px; display:block; margin-bottom:8px;">` : ''}
                    <h3>${p.nombre}</h3>
                    <p>Raza: ${p.raza}</p>
                    <p>Zona: ${p.zona}</p>
                    <p>Tamaño: ${p.tamano}</p>
                    <p>Energía: ${p.energia}</p>
                    ${mapButton}
                </div>
            `;
        });
    }
}

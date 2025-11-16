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

export function initRunners() {
    function cargarRunners() { 
        const datos = leerLS('runnersDB');
        // Asegurar que siempre es un array
        return Array.isArray(datos) ? datos : [];
    }

    const form = document.getElementById('form-runner');
    if (form) {
        form.addEventListener('submit', async e => {
            e.preventDefault();

            const nombreRunnerEl = document.getElementById('nombreRunner');
            const zonaRunnerEl = document.getElementById('zonaRunner');
            const experienciaRunnerEl = document.getElementById('experienciaRunner');
            const fotoRunnerEl = document.getElementById('fotoRunner');

            const nuevoRunner = {
                id: Date.now(),
                nombre: nombreRunnerEl ? nombreRunnerEl.value.trim() : '',
                zona: zonaRunnerEl ? zonaRunnerEl.value.trim().toLowerCase() : '',
                experiencia: experienciaRunnerEl ? experienciaRunnerEl.value : '',
                foto: ''
            };

            if (!nuevoRunner.nombre || !nuevoRunner.zona) {
                alert('Por favor completa tu nombre y zona.');
                return;
            }

            if (fotoRunnerEl && fotoRunnerEl.files && fotoRunnerEl.files[0]) {
                try { nuevoRunner.foto = await readFileAsDataURL(fotoRunnerEl.files[0]); }
                catch (err) { console.warn('No se pudo leer la foto del runner:', err); }
            }

            const runners = cargarRunners();
            runners.push(nuevoRunner);
            guardarLS('runnersDB', runners);
            console.log('✅ Runner guardado:', nuevoRunner);
            console.log('📊 Total runners:', runners.length);
            
            mostrarNotificacion(`✅ ¡Bienvenido, ${nuevoRunner.nombre}! Tu perfil fue creado.`);

            setTimeout(() => {
                window.location.href = `runner-profile.html?id=${nuevoRunner.id}`;
            }, 1500);
        });

        // preview for runner photo input
        const fotoRunnerInput = document.getElementById('fotoRunner');
        const previewDiv = document.getElementById('preview-foto');
        if (fotoRunnerInput && previewDiv) {
            fotoRunnerInput.addEventListener('change', async () => {
                const f = fotoRunnerInput.files && fotoRunnerInput.files[0];
                if (!f) { previewDiv.innerHTML = ''; return; }
                try {
                    const data = await readFileAsDataURL(f);
                    previewDiv.innerHTML = `<img src="${data}" alt="Preview" style="max-width:120px; border-radius:8px; display:block;">`;
                } catch (err) { previewDiv.innerHTML = ''; }
            });
        }

        // show nearby dogs for last registered runner
        mostrarCoincidencias();
    }

    function mostrarCoincidencias() {
        const cont = document.getElementById('perros-cercanos');
        if (!cont) return;

        const runners = cargarRunners();
        if (runners.length === 0) {
            cont.innerHTML = "<p style='text-align:center;'>Registra tu perfil para ver perros cercanos.</p>";
            return;
        }

        const runner = runners[runners.length - 1];
        const perros = leerLS('perros');
        const coincidencias = perros.filter(p => p.zona === runner.zona);

        cont.innerHTML = '';
        if (coincidencias.length === 0) {
            cont.innerHTML = "<p style='text-align:center;'>No hay perros en tu zona.</p>";
            return;
        }

        coincidencias.forEach(p => {
            cont.innerHTML += `
                <div class="card">
                    <h3>${p.nombre}</h3>
                    <p>Raza: ${p.raza}</p>
                    <p>Zona: ${p.zona}</p>
                    <p>Tamaño: ${p.tamano}</p>
                    <p>Energía: ${p.energia}</p>
                    <a href="runner-profile.html?id=${runner.id}"><button>Ver Perfil Runner</button></a>
                </div>
            `;
        });
    }
}

export function initOwnersRunnersList() {
    // used on owners-runners.html to list all runners
    const lista = document.getElementById('lista-runners');
    if (!lista) return;

    const runners = leerLS('runnersDB');
    
    // Agregar filtro por zona
    const filtroDiv = document.getElementById('filtro-runners');
    if (filtroDiv) {
        filtroDiv.innerHTML = `
            <div style="margin-bottom: 20px;">
                <input type="text" id="search-zone" placeholder="🔍 Filtrar por zona..." 
                       style="width: 100%; padding: 12px; border-radius: 8px; border: 2px solid #ddd; font-size: 0.95em;">
                <small style="color: #999; display: block; margin-top: 5px;">Ej: condesa, roma, coyoacán</small>
            </div>
        `;
        
        const searchInput = document.getElementById('search-zone');
        searchInput.addEventListener('input', (e) => {
            const query = e.target.value.toLowerCase();
            mostrarRunners(query);
        });
    }
    
    function mostrarRunners(filtro = '') {
        lista.innerHTML = '';
        const filtrados = runners.filter(r => 
            filtro === '' || r.zona.toLowerCase().includes(filtro)
        );
        
        if (filtrados.length === 0) {
            if (runners.length === 0) {
                lista.innerHTML = `
                    <div style="text-align: center; padding: 40px; color: #999;">
                        <p style="font-size: 2.5em; margin: 0;">🏃</p>
                        <h3>No hay runners registrados aún</h3>
                        <p>Sé el primero en registrarte como runner.</p>
                    </div>
                `;
            } else {
                lista.innerHTML = `
                    <div style="text-align: center; padding: 30px; color: #999;">
                        <p>No hay runners en la zona "<strong>${filtro}</strong>"</p>
                        <p style="font-size: 0.9em;">Prueba con: condesa, roma, coyoacán, reforma, zona centro</p>
                    </div>
                `;
            }
            return;
        }
        
        filtrados.forEach(r => {
            const ratingsKey = 'ratings_' + r.id;
            const ratings = leerLS(ratingsKey);
            let promedio = '-';
            let estrellas = '';
            
            if (ratings.length > 0) {
                promedio = (ratings.reduce((a,b) => a + Number(b.valor), 0) / ratings.length).toFixed(1);
                estrellas = '⭐'.repeat(Math.round(promedio));
            }
            
            lista.innerHTML += `
                <div class="card">
                    ${r.foto ? `<img src="${r.foto}" alt="${r.nombre}" style="max-width:120px; border-radius:8px; display:block; margin-bottom:8px;">` : ''}
                    <h3>${r.nombre}</h3>
                    <p>📍 Zona: <strong>${r.zona}</strong></p>
                    <p>⚡ Experiencia: ${r.experiencia}</p>
                    ${ratings.length > 0 ? `<p style="color: #7fb069; font-weight: bold;">⭐ ${promedio} (${ratings.length} ${ratings.length === 1 ? 'review' : 'reviews'})</p>` : '<p style="color: #999;">Sin ratings aún</p>'}
                    <a href="runner-profile.html?id=${r.id}"><button style="width: 100%; margin-top: 10px;">Ver Perfil</button></a>
                </div>
            `;
        });
    }
    
    mostrarRunners();
}

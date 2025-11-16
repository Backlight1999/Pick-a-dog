import {leerLS, guardarLS} from './storage.js';

export function initRatings() {
    if (!window.location.pathname.includes('runner-profile.html')) return;

    const params = new URLSearchParams(window.location.search);
    const idRunner = params.get('id');
    if (!idRunner) return;

    const runners = leerLS('runnersDB');
    const runnerActual = runners.find(r => String(r.id) === String(idRunner));
    if (!runnerActual) {
        document.body.innerHTML = '<h2>Error: Runner no encontrado.</h2>';
        return;
    }

    const ratingsKey = 'ratings_' + idRunner;
    const ratings = leerLS(ratingsKey);

    function calcularPromedio(arr) {
        if (!arr || arr.length === 0) return 'Sin ratings aún';
        const sum = arr.reduce((a,b) => a + Number(b.valor), 0);
        return (sum / arr.length).toFixed(1);
    }

    function mostrarPerfil() {
        const div = document.getElementById('perfil-runner');
        if (!div) return;
        div.innerHTML = `
            ${runnerActual.foto ? `<img src="${runnerActual.foto}" alt="Foto runner" style="max-width:140px; border-radius:8px; display:block; margin:0 auto 10px;">` : ''}
            <h3>${runnerActual.nombre}</h3>
            <p>Zona: ${runnerActual.zona}</p>
            <p>Experiencia: ${runnerActual.experiencia}</p>
            <p>Rating promedio: ${calcularPromedio(ratings)} ⭐</p>
            <a href="runner-earnings.html?id=${idRunner}"><button class="accent-btn" style="margin-top: 15px;">💰 Ver Mis Ganancias</button></a>
        `;
    }

    function mostrarRatings() {
        const div = document.getElementById('lista-ratings');
        if (!div) return;
        div.innerHTML = '';
        ratings.forEach(r => {
            div.innerHTML += `
                <div class="card">
                    <p>⭐ ${r.valor}</p>
                    <p>${r.comentario}</p>
                    <small>${r.fecha}</small>
                </div>
            `;
        });
    }

    const form = document.getElementById('form-rating');
    if (form) {
        form.addEventListener('submit', (e) => {
            e.preventDefault();
            const ratingValueEl = document.getElementById('ratingValue');
            const ratingComentarioEl = document.getElementById('ratingComentario');
            const nuevo = {
                valor: ratingValueEl ? ratingValueEl.value : '',
                comentario: ratingComentarioEl ? ratingComentarioEl.value.trim() : '',
                fecha: new Date().toLocaleDateString()
            };
            ratings.push(nuevo);
            guardarLS(ratingsKey, ratings);
            mostrarPerfil();
            mostrarRatings();
            e.target.reset();
        });
    }

    mostrarPerfil();
    mostrarRatings();
}

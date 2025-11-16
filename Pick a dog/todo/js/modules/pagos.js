import { leerLS, guardarLS } from './storage.js';

/**
 * Pagos (Payments) Module
 * Simulates a simple payment system for runners:
 * - Calculates suggested payment (fake distance + time formula)
 * - Stores fake payments in localStorage
 * - Shows runner earnings history
 */

export function calcularMontoPago() {
    // Simulate payment calculation based on random "distance" and "time"
    // Formula: base (10) + random distance (5-15 km) * 1.5 + random time (15-60 min) * 0.2
    const distancia = Math.random() * 10 + 5; // 5-15 km
    const tiempo = Math.random() * 45 + 15; // 15-60 min
    const monto = 10 + distancia * 1.5 + tiempo * 0.2;
    return parseFloat(monto.toFixed(2));
}

export function registrarPago(runnerId, monto, descripcion = 'Paseo de perro') {
    // Store a fake payment in localStorage
    const pagosKey = 'pagos_' + runnerId;
    const pagos = leerLS(pagosKey);
    
    const nuevoPago = {
        id: Date.now(),
        monto: monto,
        descripcion: descripcion,
        fecha: new Date().toLocaleDateString(),
        hora: new Date().toLocaleTimeString()
    };
    
    pagos.push(nuevoPago);
    guardarLS(pagosKey, pagos);
    
    return nuevoPago;
}

export function obtenerGanancias(runnerId) {
    // Sum all payments for a runner
    const pagosKey = 'pagos_' + runnerId;
    const pagos = leerLS(pagosKey);
    return pagos.reduce((suma, p) => suma + p.monto, 0);
}

export function initPagos() {
    // Initialize on pagos.html (runner earnings page)
    if (!window.location.pathname.includes('runner-earnings.html')) return;

    const params = new URLSearchParams(window.location.search);
    const runnerId = params.get('id');
    if (!runnerId) {
        document.body.innerHTML = '<h2>Error: Runner ID no encontrado.</h2>';
        return;
    }

    const runners = leerLS('runnersDB');
    const runner = runners.find(r => String(r.id) === String(runnerId));
    if (!runner) {
        document.body.innerHTML = '<h2>Error: Runner no encontrado.</h2>';
        return;
    }

    const pagosKey = 'pagos_' + runnerId;
    const pagos = leerLS(pagosKey);
    const ganancias = obtenerGanancias(runnerId);

    // Display runner info
    const infoDiv = document.getElementById('runner-info');
    if (infoDiv) {
        infoDiv.innerHTML = `
            <h3>${runner.nombre}</h3>
            <p>Experiencia: ${runner.experiencia}</p>
        `;
    }

    // Display suggested payment for next walk
    const montoSugerido = calcularMontoPago();
    const sugerenciaDiv = document.getElementById('monto-sugerido');
    if (sugerenciaDiv) {
        sugerenciaDiv.innerHTML = `
            <div class="card" style="background: #e8f4f8; border-left: 4px solid #4A90E2;">
                <h4>Monto Sugerido para Próximo Paseo</h4>
                <p style="font-size: 24px; color: #4A90E2; font-weight: bold;">$${montoSugerido}</p>
                <button id="btn-registrar-pago">Registrar Este Paseo</button>
            </div>
        `;

        // Register fake payment on button click
        const btnRegistrar = document.getElementById('btn-registrar-pago');
        if (btnRegistrar) {
            btnRegistrar.addEventListener('click', () => {
                registrarPago(runnerId, montoSugerido);
                alert(`✅ Paseo registrado: $${montoSugerido} ganados!`);
                location.reload(); // Refresh to show new totals
            });
        }
    }

    // Display total earnings
    const totalDiv = document.getElementById('total-ganancias');
    if (totalDiv) {
        totalDiv.innerHTML = `
            <div class="card" style="background: #f0f8e8; border-left: 4px solid #7fb069;">
                <h3>Ganancias Totales</h3>
                <p style="font-size: 32px; color: #7fb069; font-weight: bold;">$${ganancias.toFixed(2)}</p>
                <p>Paseos realizados: ${pagos.length}</p>
            </div>
        `;
    }

    // Display payment history
    const historyDiv = document.getElementById('historial-pagos');
    if (historyDiv) {
        if (pagos.length === 0) {
            historyDiv.innerHTML = '<p style="text-align:center; color:#999;">No hay pagos registrados aún.</p>';
        } else {
            historyDiv.innerHTML = '';
            pagos.forEach(p => {
                historyDiv.innerHTML += `
                    <div class="card">
                        <p><strong>$${p.monto}</strong> - ${p.descripcion}</p>
                        <small>${p.fecha} a las ${p.hora}</small>
                    </div>
                `;
            });
        }
    }
}

export function initPagoButton() {
    // Add "View Earnings" button to runner profile pages (optional enhancement)
    // This would be called from runners.js to add a button to runner cards
}

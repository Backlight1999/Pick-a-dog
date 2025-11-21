/**
 * Data Loader Utility
 * Loads sample data from /data/sample.json into localStorage
 * Useful for testing and demos
 */

export async function cargarDatosMuestra() {
    try {
        const response = await fetch('/data/sample.json');
        if (!response.ok) throw new Error('No se pudo cargar sample.json');
        
        const data = await response.json();
        
        // Load dogs
        if (data.perros) {
            localStorage.setItem('perros', JSON.stringify(data.perros));
        }
        
        // Load runners
        if (data.runners) {
            localStorage.setItem('runnersDB', JSON.stringify(data.runners));
        }
        
        // Load ratings for each runner
        Object.keys(data).forEach(key => {
            if (key.startsWith('ratings_')) {
                localStorage.setItem(key, JSON.stringify(data[key]));
            }
        });
        
        // Load payments for each runner
        Object.keys(data).forEach(key => {
            if (key.startsWith('pagos_')) {
                localStorage.setItem(key, JSON.stringify(data[key]));
            }
        });
        
        console.log('✅ Datos de muestra cargados exitosamente');
        return true;
    } catch (err) {
        console.error('❌ Error cargando datos de muestra:', err);
        return false;
    }
}

export function limpiarDatos() {
    // Clear all Pick'a Dog data from localStorage
    const keysToRemove = [];
    for (let i = 0; i < localStorage.length; i++) {
        const key = localStorage.key(i);
        if (key && (
            key === 'perros' ||
            key === 'runnersDB' ||
            key.startsWith('ratings_') ||
            key.startsWith('pagos_')
        )) {
            keysToRemove.push(key);
        }
    }
    
    keysToRemove.forEach(key => localStorage.removeItem(key));
    console.log('✅ Datos limpiados');
    return true;
}

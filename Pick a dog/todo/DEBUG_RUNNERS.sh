#!/bin/bash

# Debug script para verificar datos en localStorage
# Este script simula lo que hace la app

echo "🔍 Debug: Verificando problema con perfiles de runners"
echo ""

# Crear un archivo HTML simple que muestre los datos
cat > /tmp/debug_runners.html << 'EOF'
<!DOCTYPE html>
<html>
<head><title>Debug Runners</title></head>
<body>
<h1>Debug: Contenido de localStorage</h1>
<pre id="output"></pre>

<script>
    const output = document.getElementById('output');
    
    // Mostrar todas las claves en localStorage
    output.textContent = "📋 Claves en localStorage:\n";
    output.textContent += "================================\n\n";
    
    for (let i = 0; i < localStorage.length; i++) {
        const key = localStorage.key(i);
        const value = localStorage.getItem(key);
        output.textContent += `📌 ${key}:\n`;
        
        try {
            const parsed = JSON.parse(value);
            output.textContent += JSON.stringify(parsed, null, 2) + "\n\n";
        } catch (e) {
            output.textContent += value + "\n\n";
        }
    }
    
    // Si no hay datos
    if (localStorage.length === 0) {
        output.textContent += "❌ localStorage está vacío\n";
        output.textContent += "📌 Necesitas registrar un runner primero\n";
        output.textContent += "📌 Los datos se guardan con clave 'runnersDB'\n";
    }
    
    // Mostrar información útil
    output.textContent += "\n\n📚 Información útil:\n";
    output.textContent += "================================\n";
    output.textContent += "- Los runners se guardan en: 'runnersDB'\n";
    output.textContent += "- Las ratings se guardan en: 'ratings_<ID>'\n";
    output.textContent += "- Los pagos se guardan en: 'pagos_<ID>'\n";
    output.textContent += "- Los perros se guardan en: 'perros'\n";
</script>
</body>
</html>
EOF

echo "✅ Archivo de debug creado en: /tmp/debug_runners.html"
echo ""
echo "📝 Para debuggear:"
echo "   1. Abre el navegador en: http://localhost:8000"
echo "   2. Abre console (F12)"
echo "   3. Copia y pega este código:"
echo ""
echo "-------"
cat << 'CONSOLE'
// Ver todos los runners
console.log('Runners:', JSON.parse(localStorage.getItem('runnersDB')));

// Ver un runner específico (reemplaza ID)
console.log('Runner con ID <ID>:', JSON.parse(localStorage.getItem('runnersDB')).find(r => r.id === <ID>));

// Ver ratings de un runner
console.log('Ratings:', JSON.parse(localStorage.getItem('ratings_<ID>')));

// Ver datos de muestra
console.log('Perros:', JSON.parse(localStorage.getItem('perros')));
CONSOLE
echo "-------"

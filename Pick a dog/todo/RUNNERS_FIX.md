# 🧪 SOLUCIÓN: Debugging y Prueba de Perfiles

## 🔍 El Problema

Los perfiles de runners no se estaban guardando correctamente en localStorage.

## ✅ Lo Que Se Hizo

### 1. Mejorado `runners.js`

Se agregó validación extra para asegurar que `cargarRunners()` siempre devuelva un array:

```javascript
function cargarRunners() { 
    const datos = leerLS('runnersDB');
    // Asegurar que siempre es un array
    return Array.isArray(datos) ? datos : [];
}
```

Se agregó logging para debugging:

```javascript
console.log('✅ Runner guardado:', nuevoRunner);
console.log('📊 Total runners:', runners.length);
```

### 2. Mejorado `perros.js`

Se aplicaron los mismos cambios para asegurar que los perros se guardan correctamente.

### 3. Herramientas de Debug Creadas

- `DEBUGGING_RUNNERS.md` – Guía completa de debugging
- `DEBUG_RUNNERS.sh` – Script de ayuda

---

## 🚀 Cómo Probar Que Funciona

### Paso 1: Abre el navegador

```bash
cd "/Users/joseandrescastellanos/Desktop/Pick a dog/todo"
python3 -m http.server 8000
```

Luego: `http://localhost:8000`

### Paso 2: Abre la Consola (F12)

Presiona `F12` para abrir Developer Tools

### Paso 3: Registra un Runner

1. Haz clic en "Soy Runner"
2. Completa el formulario:
   - Nombre: "Juan Pérez"
   - Zona: "condesa"
   - Experiencia: "Intermedio"
3. Haz clic en "Guardar Perfil"

### Paso 4: Verifica en la Consola

Deberías ver mensajes como:

```
✅ Runner guardado: {id: 1234567890, nombre: "Juan Pérez", ...}
📊 Total runners: 1
```

### Paso 5: Verifica que se guardó

En la consola, ejecuta:

```javascript
JSON.parse(localStorage.getItem('runnersDB'))
```

Deberías ver un array con el runner que acabas de crear.

---

## 🧪 Test Completo

Copia este código en la consola (F12) para hacer un test automático:

```javascript
console.clear();
console.log('🧪 TEST DE RUNNERS - GUARDADO Y RECUPERACIÓN\n');

// Test 1: Verificar que localStorage tiene runners
const runnersStr = localStorage.getItem('runnersDB');
const runners = runnersStr ? JSON.parse(runnersStr) : [];

console.log('✅ Test 1 - Runners guardados:');
console.log(`   Cantidad: ${runners.length}`);
runners.forEach((r, i) => {
    console.log(`   ${i+1}. ${r.nombre} (${r.zona}) - ID: ${r.id}`);
});

// Test 2: Verificar que cada runner tiene los campos necesarios
console.log('\n✅ Test 2 - Estructura de datos:');
if (runners.length > 0) {
    const runner = runners[0];
    const campos = ['id', 'nombre', 'zona', 'experiencia', 'foto'];
    campos.forEach(campo => {
        const tiene = campo in runner;
        console.log(`   ${tiene ? '✓' : '✗'} ${campo}: ${runner[campo]}`);
    });
}

// Test 3: Verificar ratings
console.log('\n✅ Test 3 - Ratings:');
runners.forEach(r => {
    const ratingsKey = 'ratings_' + r.id;
    const ratings = JSON.parse(localStorage.getItem(ratingsKey) || '[]');
    console.log(`   ${r.nombre}: ${ratings.length} ratings`);
});

// Test 4: Verificar que se pueden recuperar por ID
if (runners.length > 0) {
    console.log('\n✅ Test 4 - Recuperación por ID:');
    const runner = runners[0];
    const recuperado = runners.find(r => r.id === runner.id);
    console.log(`   Recuperado: ${recuperado ? '✓' : '✗'} ${recuperado?.nombre}`);
}

console.log('\n🎉 TEST COMPLETADO');
```

---

## 📋 Checklist de Funcionamiento

Después de registrar un runner, verifica que:

- [ ] La página redirige a `runner-profile.html`
- [ ] En la consola ves mensajes `✅ Runner guardado`
- [ ] `localStorage.getItem('runnersDB')` devuelve datos
- [ ] El perfil del runner se muestra correctamente
- [ ] Puedes calificar al runner
- [ ] Las calificaciones se guardan

---

## 🔧 Si Aún No Funciona

### 1. Verifica que estés en la carpeta correcta

```bash
pwd
# Debe devolver: /Users/joseandrescastellanos/Desktop/Pick a dog/todo
```

### 2. Verifica que el HTML tiene los IDs correctos

En `runners.html`, busca:
- [ ] `<form id="form-runner">`
- [ ] `<input id="nombreRunner">`
- [ ] `<input id="zonaRunner">`
- [ ] `<select id="experienciaRunner">`
- [ ] `<input id="fotoRunner">`

### 3. Limpia localStorage y prueba con datos de muestra

En la consola:

```javascript
// Cargar datos de muestra
fetch('/data/sample.json')
    .then(r => r.json())
    .then(d => {
        localStorage.setItem('runnersDB', JSON.stringify(d.runners));
        console.log('✅ Datos de muestra cargados');
        console.log(JSON.parse(localStorage.getItem('runnersDB')));
    });
```

### 4. Verifica en DevTools Storage

1. Abre DevTools (F12)
2. Ve a "Application" (o "Storage" en Firefox)
3. Selecciona "Local Storage"
4. Busca `runnersDB`
5. Verifica que se actualiza cuando registras un runner

---

## 📊 Estructura Esperada en localStorage

### Clave: `runnersDB`

```json
[
  {
    "id": 1234567890,
    "nombre": "Juan Pérez",
    "zona": "condesa",
    "experiencia": "intermedio",
    "foto": "data:image/jpeg;base64,..." // o vacío
  },
  {
    "id": 1234567891,
    "nombre": "María García",
    "zona": "roma",
    "experiencia": "avanzado",
    "foto": ""
  }
]
```

### Clave: `ratings_<ID>` (para cada runner)

```json
[
  {
    "valor": "5",
    "comentario": "Excelente runner",
    "fecha": "13/11/2025"
  }
]
```

---

## 🎯 Próximos Pasos

1. **Ejecuta el servidor:**
   ```bash
   python3 -m http.server 8000
   ```

2. **Abre en navegador:**
   ```
   http://localhost:8000
   ```

3. **Registra un runner** y verifica que aparezca en la consola

4. **Ejecuta el test automático** para verificar estructura

5. **Haz clic en el perfil** para ver que se redirige correctamente

---

## ✅ Validación Final

Si todo funciona correctamente, deberías ver:

```
✅ Runner guardado: {id: ..., nombre: "...", zona: "...", ...}
📊 Total runners: 1
```

Y en el navegador:
- ✅ Perfil del runner se muestra
- ✅ Puedes calificar al runner
- ✅ Las calificaciones se guardan
- ✅ Puedes navegar de vuelta a la lista de runners

---

**¡Si ves todo esto, el problema está resuelto! ✨**


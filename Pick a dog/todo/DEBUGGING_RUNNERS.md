# 🐛 Debugging: Problema con Perfiles de Runners

**Problema:** Los perfiles de runners no se guardan correctamente.

---

## 🔍 Investigación

Aquí hay varias posibles causas:

### 1. ¿Se está guardando realmente en localStorage?

Abre la consola del navegador (F12) y ejecuta:

```javascript
// Ver todos los runners guardados
JSON.parse(localStorage.getItem('runnersDB'))
```

**Esperado:** Un array con los runners registrados
**Si ves:** `null` → Los datos NO se están guardando

### 2. ¿El formulario se está enviando?

En la consola, ejecuta ANTES de guardar:

```javascript
// Agregar logging al formulario
const form = document.getElementById('form-runner');
if (form) {
    console.log('✅ Formulario encontrado:', form);
} else {
    console.log('❌ Formulario NO encontrado');
}
```

### 3. ¿Los IDs de los inputs son correctos?

```javascript
// Verificar que los inputs existen
console.log('nombreRunner:', document.getElementById('nombreRunner'));
console.log('zonaRunner:', document.getElementById('zonaRunner'));
console.log('experienciaRunner:', document.getElementById('experienciaRunner'));
console.log('fotoRunner:', document.getElementById('fotoRunner'));
```

**Esperado:** Todos deben devolver elementos del DOM
**Si ves:** `null` → Los IDs en el HTML no coinciden

---

## ✅ Paso a Paso para Probar

### 1. Abre el navegador en http://localhost:8000

### 2. Haz clic en "Soy Runner"

### 3. Llena el formulario:
- Nombre: "Test Runner"
- Zona: "condesa"
- Experiencia: "Intermedio"

### 4. Click en "Guardar Perfil"

### 5. Abre la consola (F12)

### 6. Ejecuta en consola:

```javascript
// Ver qué se guardó
console.log('Runners guardados:', JSON.parse(localStorage.getItem('runnersDB')));
```

---

## 🔧 Posibles Soluciones

### Solución 1: localStorage está limpio

Si `localStorage.getItem('runnersDB')` devuelve `null`, inicia con datos de ejemplo:

```javascript
// En consola, ejecuta:
fetch('/data/sample.json')
    .then(r => r.json())
    .then(d => {
        localStorage.setItem('runnersDB', JSON.stringify(d.runners));
        console.log('✅ Datos de muestra cargados');
    });
```

### Solución 2: Borrar localStorage y empezar limpio

```javascript
// En consola, ejecuta:
localStorage.clear();
console.log('✅ localStorage limpiado');
// Recarga la página con Ctrl+R
```

### Solución 3: Verificar que el módulo se carga

```javascript
// Ver si initRunners se ejecutó
console.log('Contenido de main.js importado');
// Busca en la consola mensajes de error
```

---

## 📊 Estructura de Datos Esperada

### Runners (clave: `runnersDB`)

```javascript
[
  {
    id: 1234567890,
    nombre: "Juan",
    zona: "condesa",
    experiencia: "intermedio",
    foto: "data:image/jpeg;base64,..." // o vacío
  },
  ...
]
```

### Ratings (clave: `ratings_<ID>`)

```javascript
[
  {
    valor: "5",
    comentario: "Excelente runner",
    fecha: "13/11/2025"
  },
  ...
]
```

---

## 🎯 Checklist de Debugging

- [ ] ¿El formulario tiene ID `form-runner`?
- [ ] ¿Los inputs tienen los IDs correctos?
  - [ ] `nombreRunner`
  - [ ] `zonaRunner`
  - [ ] `experienciaRunner`
  - [ ] `fotoRunner`
- [ ] ¿El módulo `runners.js` se importa en `main.js`?
- [ ] ¿`initRunners()` se llama en `DOMContentLoaded`?
- [ ] ¿El formulario hace submit sin errores?
- [ ] ¿Se redirige a `runner-profile.html` después de guardar?
- [ ] ¿Los datos se guardan en localStorage?

---

## 🧪 Test Automático

Copia este código en la consola para probar TODO:

```javascript
console.log('🧪 Test Automático de Runners\n');

// Test 1: Verificar formulario
const form = document.getElementById('form-runner');
console.log('✓ Test 1 - Formulario existe:', !!form);

// Test 2: Verificar inputs
const inputs = {
    nombreRunner: document.getElementById('nombreRunner'),
    zonaRunner: document.getElementById('zonaRunner'),
    experienciaRunner: document.getElementById('experienciaRunner'),
    fotoRunner: document.getElementById('fotoRunner')
};
console.log('✓ Test 2 - Inputs existen:', Object.values(inputs).every(i => !!i));

// Test 3: Verificar localStorage
const runners = localStorage.getItem('runnersDB');
console.log('✓ Test 3 - localStorage tiene runners:', !!runners);
if (runners) {
    console.log('  Runners guardados:', JSON.parse(runners).length);
}

// Test 4: Verificar que la librería de storage funciona
console.log('✓ Test 4 - Storage functions:\n');
console.log('  leerLS("runnersDB"):', JSON.parse(localStorage.getItem('runnersDB')));

console.log('\n✅ Tests completados');
```

---

## 📱 Alternativa: Usa Browser DevTools Storage

1. Abre DevTools (F12)
2. Ve a "Application" o "Storage"
3. Selecciona "Local Storage"
4. Busca por `runnersDB`
5. Verifica que los datos se guardan al registrar

---

## 🚨 Si Nada Funciona

Prueba esto en consola:

```javascript
// Simular guardado de runner
const testRunner = {
    id: Date.now(),
    nombre: "Test",
    zona: "condesa",
    experiencia: "intermedio",
    foto: ""
};

const runners = JSON.parse(localStorage.getItem('runnersDB') || '[]');
runners.push(testRunner);
localStorage.setItem('runnersDB', JSON.stringify(runners));

console.log('✅ Runner de prueba guardado');
console.log('ID:', testRunner.id);
console.log('Verifica en: runner-profile.html?id=' + testRunner.id);
```

---

## 📞 Reporta el Problema

Cuando reportes el problema, incluye:

1. **El error de consola** (si hay)
2. **Qué resultado devuelve:** `JSON.parse(localStorage.getItem('runnersDB'))`
3. **El navegador que usas** (Chrome, Firefox, Safari, etc.)
4. **Pasos exactos para reproducir**

---

**¡Espero que esto ayude a identificar el problema! 🔍**


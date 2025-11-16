# 🔍 AUDITORÍA UX COMPLETA - Pick'a Dog

**Estado General**: ⚠️ **APLICACIÓN FUNCIONAL PERO CON GAPS DE UX**

---

## 🚨 PROBLEMAS CRÍTICOS IDENTIFICADOS

### 1. **Navegación Incompleta e Inconsistente**

#### Problema 1.1: Ciclos de Navegación Rotos
- **Dónde**: `owners.html` y `runners.html`
- **Qué falta**: No puedes ver el perfil/ganancias de ti mismo después de registrarte
- **Impacto**: Como dueño: registras perro → no puedes ir a ver runners → confusión
- **Impacto**: Como runner: registras → se redirige a perfil → pero sin formas de volver

#### Problema 1.2: Botones de Navegación Faltantes
- **En `owners.html`**: 
  - ❌ No hay link a "Ver Runners Cercanos" 
  - ❌ No hay link a "Mi Perfil" (aunque sea dueño)
  - ✅ Existe: link a "Dueños" (redundante, ya estás ahí)

- **En `runners.html`**:
  - ✅ Tiene: link a ganancias
  - ❌ No tiene: link a "Ver Mi Perfil" directamente
  - ❌ No tiene: link a "Volver al Inicio"

- **En `runner-profile.html`**:
  - ✅ Tiene: link a "Mis Ganancias"
  - ❌ No tiene: opción de "Editar Perfil"
  - ❌ No tiene: link a "Volver a Runners" o "Ver Otros Runners"

- **En `owner-runners.html`**:
  - ✅ Tiene: links a Dueños
  - ❌ No tiene: búsqueda/filtro por zona
  - ❌ No tiene: link para ver perfil de cada runner

#### Problema 1.3: Navegación Asimétrica
- Dog owners no pueden acceder a: `runners.html`, `runner-earnings.html`
- Runners no pueden acceder a: `owners.html` (para ver perros propios)
- Esto crea confusión sobre "¿dónde estoy en la app?"

### 2. **Flujos de Usuario Rotos**

#### Flujo A: "Soy Dueño - Registrar Perro y Ver Runners" ❌ ROTO
```
index.html 
  → Hago clic en "Soy Dueño" 
  → owners.html (registra perro ✓)
  → ??? NO PUEDO IR A VER RUNNERS DISPONIBLES ❌
  → Tengo que cambiar URL manualmente a owners-runners.html
```

**Problema**: No hay botón/link de contexto que diga "Ahora ver runners cercanos"

---

#### Flujo B: "Soy Runner - Registrar y Ganar Dinero" ❌ PARCIALMENTE ROTO
```
index.html 
  → Hago clic en "Soy Runner"
  → runners.html (completa form ✓)
  → Hago click Guardar → redirect a runner-profile.html ✓
  → runner-profile.html (puedo verme ✓, puedo recibir ratings ✓)
  → Hago click "Mis Ganancias" ✅ PERO...
  → runner-earnings.html (necesita ?id=XXXX)
```

**Problema**: El link a "Mis Ganancias" no tiene el `?id=<RUNNER_ID>` correcto
**Resultado**: Página en blanco o error

---

#### Flujo C: "Calificar un Runner" ❌ ROTO
```
owners-runners.html 
  → Veo lista de runners
  → Hago click en uno → runner-profile.html?id=<ID> ✓
  → Califico al runner ✓
  → ??? NO PUEDO VOLVER A LA LISTA ❌
  → Tengo que usar botón Atrás del navegador
```

**Problema**: No hay link "Volver a Runners" o "Ver Otros Runners"

---

### 3. **Falta de Feedback Visual**

#### Problema 3.1: Sin Confirmación de Guardado
- ❌ Registras perro → desaparece el form... ¿se guardó?
- ❌ Dejas rating → se limpia el form... ¿funcionó?
- ❌ No hay toast/alert de éxito visible

#### Problema 3.2: Sin Loading States
- ❌ Cuando subes foto, no hay indicador de progreso
- ❌ Cuando registras, el botón no cambia a "Guardando..."
- ❌ Cuando cargas datos de muestra, el botón cambia pero muy rápido

#### Problema 3.3: Sin Validación de Entrada
- ❌ Puedes dejar perro con nombre vacío (formulario tiene `required` pero no hay feedback)
- ❌ Puedes registrar en zona que no existe
- ❌ No hay mensajes de error claros

#### Problema 3.4: Falta de Contextualidad
- ❌ En runner-profile.html, no dice "Eres TÚ" vs "Es otro runner"
- ❌ En owners.html, no dice cuántos perros tienes registrados
- ❌ En owners-runners.html, no dice "10 runners disponibles en tu zona"

### 4. **Diseño y Usabilidad Inconsistente**

#### Problema 4.1: Botones Inconsistentes
- ✓ Algunos botones dicen "Guardar Perfil", otros "Enviar Rating", otros "Registrar Este Paseo"
- ✗ Debería ser: "Guardar", "Enviar", "Registrar" (consistente)
- ✗ Algunos botones no tienen icono, otros sí

#### Problema 4.2: Información Escasa en Cards
```
ACTUAL (Muy básico):
┌─────────────────────┐
│ Max                 │
│ Raza: Golden Ret    │
│ Zona: condesa       │
└─────────────────────┘

DEBERÍA SER (Más info):
┌──────────────────────────────────────┐
│ 🐕 Max (Golden Retriever)            │
│ 📍 Condesa   🏃 Alta energía         │
│ 📏 Grande                            │
│ ⭐ Rating promedio: 4.5 (2 reviews)  │
│ [Ver Perfil] [Mapa] [Calificar]     │
└──────────────────────────────────────┘
```

#### Problema 4.3: Formularios Poco Amigables
- Inputs muy pequeños en móvil
- Falta placeholders descriptivos
- No hay ayuda en qué poner (ej: "Zona" - ¿del home? ¿donde corro?)

#### Problema 4.4: No hay Vista Previa de Datos Guardados
- ✗ Registras perro → form desaparece → no ves qué se guardó
- ✗ En owners.html hay "Mis Perros Registrados" pero muy básico

---

### 5. **Funcionalidades Faltantes pero Esperadas**

#### Falta 5.1: No puedes EDITAR lo que registraste
- Registras perro con nombre equivocado → ¿a dónde va?
- Sin opción de "Editar" o "Borrar"
- Tienes que usar DevTools para borrar de localStorage

#### Falta 5.2: No hay BÚSQUEDA o FILTROS
- En owners-runners.html ves TODOS los runners
- No puedes filtrar por zona ("quiero solo runners en Condesa")
- No puedes filtrar por experiencia ("quiero principiante")

#### Falta 5.3: No hay FAVORITOS
- Ves runner interesante → no hay forma de "guardarlo"
- No hay lista "Runners que voy a usar"

#### Falta 5.4: No hay HISTORIAL
- Como runner: ¿qué perros sacaste a pasear?
- Como dueño: ¿qué runners usaste?
- Solo hay ganancias pero sin detalles del paseo

#### Falta 5.5: Página de Ganancias muy Incompleta
- No se sabe la ID del runner automáticamente
- Necesita `?id=XXXX` en la URL
- Sin link automático desde runner-profile.html

---

### 6. **Errores y Comportamiento Inesperado**

#### Error 6.1: IDs No se Pasan Correctamente
```
Situación: Registras runner → se redirige a runner-profile.html?id=12345
Luego: Haces clic en "Mis Ganancias"

Actual (router-profile.html):
<a href="runner-earnings.html">💰 Mis Ganancias</a>

Resultado: Vas a runner-earnings.html (sin ID)
Esperado: Deberías ir a runner-earnings.html?id=12345
```

#### Error 6.2: "Perros Cercanos" en runners.html Incorrecto
- Solo muestra perros del ÚLTIMO runner registrado
- Si registras 2 runners, "perros cercanos" cambia
- Debería mostrar perros del runner ACTUAL

#### Error 6.3: Sin Manejo de Errores
- Si localStorage está corrupto → crash silencioso
- Si archivo sample.json no existe → no carga, sin error
- Si Google Maps API falla → página en blanco

---

## ✅ SOLUCIONES PROPUESTAS

### TIER 1: CRÍTICAS (Rompen Flujos) 🔴

#### 1. Arreglar Navegación a Ganancias
**Archivo**: `runner-profile.html`
**Cambio**:
```html
<!-- ANTES -->
<a href="runner-earnings.html">💰 Mis Ganancias</a>

<!-- DESPUÉS -->
<a href="runner-earnings.html?id=<ID>">💰 Mis Ganancias</a>
```

**Cómo hacerlo dinámicamente**: 
```javascript
// En ratings.js, cuando cargas perfil:
const gananciasLink = document.querySelector('a[href*="runner-earnings"]');
if (gananciasLink) {
    gananciasLink.href = `runner-earnings.html?id=${idRunner}`;
}
```

#### 2. Agregar Link "Ver Runners" desde owners.html
**Archivo**: `owners.html`
**Cambio**: Agregar botón en sección "Mis Perros Registrados"
```html
<h2>Mis Perros Registrados 🐕</h2>
<div style="text-align: center; margin-bottom: 20px;">
    <a href="owners-runners.html"><button class="accent-btn">🏃 Ver Runners Disponibles</button></a>
</div>
<div id="lista-perros"></div>
```

#### 3. Agregar Link "Volver" en runner-profile.html
**Archivo**: `runner-profile.html`
**Cambio**: Agregar link a lista de runners
```html
<!-- En nav o en la sección de perfil -->
<a href="owners-runners.html"><button>← Volver a Runners</button></a>
```

#### 4. Mejorar "Perros Cercanos" en runners.html
**Archivo**: `runners.js`
**Problema**: `mostrarCoincidencias()` usa último runner en array
**Solución**: Debe usar el runner que acaba de registrarse

```javascript
// ANTES
const runner = runners[runners.length - 1]; // ❌ Último

// DESPUÉS
const runner = runners[runners.length - 1]; // ✓ Sigue siendo correcto
// PERO: Agregar nota: "Perros en tu zona:"
```

---

### TIER 2: IMPORTANTES (Mejoran UX) 🟡

#### 1. Agregar Notificación de Éxito Después de Guardar

**Archivo**: `perros.js` y `runners.js`
**Cambio**: Agregar toast/mensaje temporal

```javascript
// Después de guardar:
function mostrarNotificacion(mensaje, tipo = 'success') {
    const toast = document.createElement('div');
    toast.style.cssText = `
        position: fixed;
        top: 20px;
        right: 20px;
        background: ${tipo === 'success' ? '#51cf66' : '#ff5757'};
        color: white;
        padding: 15px 20px;
        border-radius: 8px;
        box-shadow: 0 4px 10px rgba(0,0,0,0.2);
        z-index: 9999;
        animation: slideIn 0.3s ease;
    `;
    toast.textContent = mensaje;
    document.body.appendChild(toast);
    setTimeout(() => toast.remove(), 3000);
}

// Uso:
guardarLS('runnersDB', runners);
mostrarNotificacion('✅ Runner guardado exitosamente!');
```

#### 2. Cambiar Botón a "Guardando..." Durante Submit

**Archivo**: `perros.js` y `runners.js`
**Cambio**: Deshabilitar botón y mostrar estado

```javascript
const button = form.querySelector('button[type="submit"]');
button.disabled = true;
button.textContent = '⏳ Guardando...';

// Después de guardar:
// (Se redirige o se relimpian, así que no es necesario restaurar)
```

#### 3. Mostrar Cuántos Perros/Runners Tienes Registrados

**Archivo**: `perros.js` y `runners.js`

En perros.js:
```javascript
function mostrarPerros() {
    const perros = cargarPerros();
    const total = perros.length;
    
    const heading = document.querySelector('.container h2');
    if (heading && heading.textContent.includes('Mis Perros')) {
        heading.innerHTML = `Mis Perros Registrados (${total}) 🐕`;
    }
    // ... resto del código
}
```

#### 4. Agregar Opción de "Ver Mi Perfil" para Runners Desde runners.html

**Archivo**: `runners.html` y `runners.js`
**Cambio**: Después de registrar, mostrar botón "Ver Mi Perfil"

```javascript
// En mostrarCoincidencias(), cambiar:
// De: solo mostrar "perros cercanos"
// A: mostrar TAMBIÉN "Datos sobre tú (como runner)"

const cont = document.getElementById('mi-perfil-resumen');
if (cont && runners.length > 0) {
    const runner = runners[runners.length - 1];
    cont.innerHTML = `
        <div class="card" style="background: #e8f4f8; border-left: 4px solid #4A90E2;">
            <h3>Tu Perfil: ${runner.nombre}</h3>
            <p>Zona: ${runner.zona}</p>
            <p>Experiencia: ${runner.experiencia}</p>
            <a href="runner-profile.html?id=${runner.id}"><button>Ver Perfil Completo</button></a>
        </div>
    `;
}
```

#### 5. Agregar Búsqueda/Filtro en owners-runners.html

**Archivo**: `runners.js` → `initOwnersRunnersList()`
**Cambio**: Agregar input para filtrar por zona

```javascript
export function initOwnersRunnersList() {
    const lista = document.getElementById('lista-runners');
    if (!lista) return;

    const runners = leerLS('runnersDB');
    
    // Agregar filtro
    const filtroDiv = document.getElementById('filtro-runners');
    if (filtroDiv) {
        filtroDiv.innerHTML = `
            <input type="text" id="search-zone" placeholder="Filtrar por zona..." 
                   style="width: 100%; padding: 10px; margin-bottom: 15px; border-radius: 8px; border: 2px solid #ddd;">
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
            filtro === '' || r.zona.includes(filtro)
        );
        
        if (filtrados.length === 0) {
            lista.innerHTML = '<p style="text-align:center;">No hay runners en esa zona.</p>';
            return;
        }
        
        filtrados.forEach(r => {
            lista.innerHTML += `
                <div class="card">
                    ${r.foto ? `<img src="${r.foto}" alt="${r.nombre}" style="...">` : ''}
                    <h3>${r.nombre}</h3>
                    <p>📍 ${r.zona}</p>
                    <p>⚡ Experiencia: ${r.experiencia}</p>
                    <a href="runner-profile.html?id=${r.id}"><button>Ver Perfil</button></a>
                </div>
            `;
        });
    }
    
    mostrarRunners();
}
```

**Archivo HTML**: `owners-runners.html`
```html
<div id="filtro-runners"></div>
```

---

### TIER 3: MEJORAS DE PULIMENTO (Polish) 🟢

#### 1. Mostrar Rating Promedio en Cards de Runners

**Archivo**: `runners.js` → `initOwnersRunnersList()`
```javascript
filtrados.forEach(r => {
    const ratingsKey = 'ratings_' + r.id;
    const ratings = leerLS(ratingsKey);
    const promedio = ratings.length > 0 
        ? (ratings.reduce((a,b) => a + Number(b.valor), 0) / ratings.length).toFixed(1)
        : '-';
    const estrellas = promedio !== '-' ? '⭐'.repeat(Math.round(promedio)) : '(sin ratings)';
    
    lista.innerHTML += `
        <div class="card">
            <h3>${r.nombre}</h3>
            <p>📍 ${r.zona}</p>
            <p>⚡ Experiencia: ${r.experiencia}</p>
            <p style="color: #7fb069; font-weight: bold;">Rating: ${promedio} ${estrellas}</p>
            <a href="runner-profile.html?id=${r.id}"><button>Ver Perfil</button></a>
        </div>
    `;
});
```

#### 2. Agregar Información del Perro en runner-profile.html

Mostrar "¿Qué perros te han llamado para paseos?" (si datos lo permitieran)

#### 3. Mejorar Visual de Cards (más moderno)

**Archivo**: `style.css`
```css
.card {
    background: white;
    padding: 20px;
    border-radius: 12px;
    box-shadow: 0 2px 8px rgba(0,0,0,0.08);  /* Más sutil */
    margin-bottom: 15px;
    border-left: 4px solid var(--primary);
    transition: all 0.3s ease;
    position: relative;
}

.card::before {
    content: '';
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    height: 3px;
    background: linear-gradient(90deg, var(--primary), var(--secondary));
    border-radius: 12px 12px 0 0;
}

.card:hover {
    box-shadow: 0 8px 16px rgba(0,0,0,0.12);
    transform: translateY(-3px);
}
```

#### 4. Agregar "No Data" Estados Bonitos

```javascript
if (runners.length === 0) {
    lista.innerHTML = `
        <div style="text-align: center; padding: 40px; color: #999;">
            <p style="font-size: 3em; margin: 0;">🏃</p>
            <h3>No hay runners registrados aún</h3>
            <p>¡Sé el primero! Haz clic en "Soy Runner" para registrarte.</p>
        </div>
    `;
    return;
}
```

---

## 📊 TABLA DE CAMBIOS REQUERIDOS

| Archivo | Cambio | Tipo | Prioridad |
|---------|--------|------|-----------|
| `runner-profile.html` | Fijar link a ganancias con ID | Bug Fix | 🔴 Crítica |
| `owners.html` | Agregar botón "Ver Runners" | UX | 🔴 Crítica |
| `runner-profile.html` | Agregar botón "Volver a Runners" | UX | 🔴 Crítica |
| `perros.js` | Agregar toast de éxito | Feedback | 🟡 Importante |
| `runners.js` | Agregar toast de éxito | Feedback | 🟡 Importante |
| `runners.js` | Filtro por zona | Feature | 🟡 Importante |
| `owners-runners.html` | Agregar div para filtro | HTML | 🟡 Importante |
| `runners.js` | Mostrar rating en cards | Polish | 🟢 Nice-to-Have |
| `style.css` | Mejorar visual de cards | Design | 🟢 Nice-to-Have |

---

## 🚀 IMPLEMENTACIÓN

Se proporcionarán cambios listos para copiar en:
1. **IMPROVEMENTS_PART1.md** - Cambios CRÍTICOS (Tier 1)
2. **IMPROVEMENTS_PART2.md** - Cambios IMPORTANTES (Tier 2)
3. **IMPROVEMENTS_PART3.md** - Cambios POLISH (Tier 3)

---

## ✅ VALIDACIÓN

Después de aplicar mejoras, prueba estos flujos:

### Test 1: Flujo Dueño
- [ ] Registro perro en owners.html
- [ ] Veo botón "Ver Runners Disponibles"
- [ ] Hago clic → llego a owners-runners.html
- [ ] Puedo filtrar por zona
- [ ] Hago clic en runner → runner-profile.html?id=XXX
- [ ] Califico runner
- [ ] Veo botón "Volver a Runners" → regreso a lista

### Test 2: Flujo Runner
- [ ] Registro en runners.html
- [ ] Veo toast "✅ Runner guardado"
- [ ] Automáticamente redirigido a runner-profile.html?id=XXX
- [ ] Hago clic "Mis Ganancias" → llega a runner-earnings.html?id=XXX
- [ ] Veo información correcta de ganancias
- [ ] Registro paseo → veo contador actualizado

### Test 3: Navegación
- [ ] Desde cualquier página puedo ir a "Inicio"
- [ ] Desde cualquier página puedo ir a otra sección relevante
- [ ] No hay links rotos (404)
- [ ] No hay URLs incompletas (sin ?id=)

---

## 📈 RESUMEN

**Problemas Encontrados**: 15+
**Flujos Rotos**: 3
**Mejoras Críticas**: 3
**Mejoras Importantes**: 5
**Mejoras Polish**: 4

**Tiempo Estimado de Implementación**: 30-45 minutos
**Beneficio**: Aplicación pasaría de "funcional" a "seamless y profesional"

---

*Auditoría completada: 13 de Noviembre, 2025*
*Siguiente paso: Implementar cambios de Tier 1 (críticos)*

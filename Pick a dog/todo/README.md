# 🐕 Pick'a Dog – Plataforma de Paseos para Perros

Una aplicación web moderna y modular donde **corredores (runners)** pueden recoger perros de **dueños** para sacarlos a correr. Construida con **Vanilla JavaScript**, **HTML**, **CSS** y sin frameworks pesados.

## 🎯 Características

✅ **Registro de Dueños y Perros**
- Registrar perros con foto, raza, tamaño y nivel de energía
- Guardar todo en localStorage (sin servidor necesario)

✅ **Registro de Runners**
- Crear perfil como corredor con experiencia y zona
- Subir foto de perfil
- Ver perros disponibles cerca de tu zona

✅ **Sistema de Ratings** ⭐
- Calificar runners (1-5 estrellas)
- Dejar comentarios
- Ver promedio de calificaciones

✅ **Pagos Simulados** 💰
- Calcular monto sugerido para cada paseo (~$10-$35)
- Registrar paseos completados
- Ver historial de ganancias totales

✅ **Mapa Interactivo** 🗺️
- Visualizar ubicación de runner y perro
- Ver ruta de paseo (Google Maps API)
- Distancia y tiempo estimado

✅ **Diseño Modular**
- Código organizado en módulos ES6
- Fácil de mantener y extender
- Carpetas organizadas: `/css`, `/js/modules`, `/img`, `/data`

---

## 🚀 Instalación y Setup

### 1. Clonar o Descargar el Proyecto

```bash
cd /ruta/a/Pick\ a\ dog
```

### 2. Servir con HTTP Server (Recomendado)

Abre una terminal en la carpeta del proyecto:

```bash
python3 -m http.server 8000
```

Luego abre en tu navegador: **http://localhost:8000**

### 3. (Opcional) Configurar Google Maps API

Para usar la funcionalidad de mapas:

1. Ve a [Google Cloud Console](https://console.cloud.google.com/)
2. Crea un nuevo proyecto
3. Habilita estas APIs:
   - Maps JavaScript API
   - Directions API
   - Geocoding API (opcional)
4. Crea una API Key (tipo: Browser)
5. Restringe la clave a `http://localhost:*` para desarrollo local

**Agregar la clave a `map-view.html`:**

Abre `map-view.html` y reemplaza:
```html
<script src="https://maps.googleapis.com/maps/api/js?key=YOUR_API_KEY&libraries=places,directions"></script>
```

Por:
```html
<script src="https://maps.googleapis.com/maps/api/js?key=tu_clave_aqui&libraries=places,directions"></script>
```

---

## 📋 Estructura del Proyecto

```
Pick a dog/
├── index.html                 # Página de inicio
├── owners.html               # Registro de dueños y perros
├── owners-runners.html       # Lista de runners disponibles
├── runners.html              # Registro de runners
├── runner-profile.html       # Perfil de runner + ratings
├── runner-earnings.html      # Ganancias del runner
├── map-view.html             # Mapa de recorrido
│
├── css/
│   └── style.css             # Estilos principales
│
├── js/
│   ├── main.js               # Entrypoint, inicializa módulos
│   ├── app.js                # (Legado, puede eliminarse)
│   └── modules/
│       ├── storage.js        # Helpers de localStorage
│       ├── files.js          # Lectura de archivos (Base64)
│       ├── perros.js         # Lógica de perros/dueños
│       ├── runners.js        # Lógica de runners
│       ├── ratings.js        # Sistema de ratings
│       ├── pagos.js          # Pagos simulados
│       ├── maps.js           # Integración de Google Maps
│       └── dataLoader.js     # Cargador de datos de muestra
│
├── data/
│   └── sample.json           # Datos de ejemplo
│
└── img/                      # (Para imágenes locales en el futuro)
```

---

## 🎮 Cómo Usar la App

### 1️⃣ Cargar Datos de Muestra (Recomendado para Pruebas)

Abre la consola del navegador (F12) y ejecuta:

```javascript
import { cargarDatosMuestra } from './js/modules/dataLoader.js';
cargarDatosMuestra().then(() => location.reload());
```

Esto cargará:
- 5 perros de ejemplo
- 5 runners de ejemplo
- Ratings y pagos simulados

### 2️⃣ Flujo de Prueba Manual

**Como Dueño:**
1. Ir a `http://localhost:8000/owners.html`
2. Registrar un perro (nombre, raza, zona, tamaño, energía)
3. Subir una foto (opcional, pero recomendado)
4. Ver el perro en "Mis Perros Registrados"

**Como Runner:**
1. Ir a `http://localhost:8000/runners.html`
2. Registrar un runner (nombre, zona, experiencia)
3. Subir una foto (opcional)
4. Ver perros disponibles en tu zona
5. Hacer clic en "Ver Perfil Runner" para ir a tu perfil

**Ver Runners Disponibles:**
1. Ir a `http://localhost:8000/owners-runners.html`
2. Ver lista de todos los runners registrados

**Calificar un Runner:**
1. Ir a `http://localhost:8000/runner-profile.html?id=<RUNNER_ID>`
2. Llenar el formulario de rating (estrellas + comentario)
3. Ver el promedio de estrellas actualizado

**Ver Ganancias (Pagos Simulados):**
1. Ir a `http://localhost:8000/runner-earnings.html?id=<RUNNER_ID>`
2. Ver monto sugerido para el próximo paseo
3. Hacer clic en "Registrar Este Paseo" para simular un pago
4. Ver el historial de ganancias totales

**Ver Mapa de Recorrido:**
1. Tener Google Maps API Key configurada
2. Ir a `http://localhost:8000/owners.html`
3. En una tarjeta de perro, hacer clic en "🗺️ Ver Mapa"
4. Ver mapa interactivo con runner y perro

---

## 🛠️ Módulos Principales

### `storage.js`
Helpers para localStorage:
- `guardarLS(clave, datos)` — Guardar datos como JSON
- `leerLS(clave)` — Leer y parsear datos

### `files.js`
Lectura de archivos:
- `readFileAsDataURL(file)` — Convertir archivo a Base64 (Promise)

### `perros.js`
Gestión de perros:
- `initPerros()` — Inicializa formulario y lista de perros

### `runners.js`
Gestión de runners:
- `initRunners()` — Inicializa formulario de registro
- `initOwnersRunnersList()` — Lista de runners para dueños

### `ratings.js`
Sistema de calificaciones:
- `initRatings()` — Carga perfil de runner y maneja ratings

### `pagos.js`
Pagos simulados:
- `calcularMontoPago()` — Genera monto aleatorio ($10-$35)
- `registrarPago(runnerId, monto)` — Guarda pago en localStorage
- `obtenerGanancias(runnerId)` — Suma total de ganancias
- `initPagos()` — Inicializa página de ganancias

### `maps.js`
Integración de Google Maps:
- `initMapView()` — Carga mapa, marcadores y ruta
- Usa `google.maps.DirectionsService` para calcular rutas

### `dataLoader.js`
Utilidades de datos:
- `cargarDatosMuestra()` — Carga datos de `/data/sample.json`
- `limpiarDatos()` — Limpia todo de localStorage

---

## 📊 Datos Almacenados en localStorage

La app usa estas claves:

```javascript
localStorage['perros']              // Array de perros
localStorage['runnersDB']           // Array de runners
localStorage['ratings_<RUNNER_ID>'] // Ratings para cada runner
localStorage['pagos_<RUNNER_ID>']   // Pagos para cada runner
```

---

## 🎨 Personalización y Extensión

### Cambiar Colores
Edita `/css/style.css` en la sección `:root`:

```css
:root {
    --primary: #4A90E2;      /* Azul */
    --secondary: #6EC1E4;    /* Celeste */
    --light: #f5f9ff;        /* Fondo claro */
    --dark: #333;            /* Texto oscuro */
}
```

### Agregar Nuevas Funciones
1. Crea un módulo en `/js/modules/mi-modulo.js`
2. Exporta la función `export function initMiModulo() { ... }`
3. Importa en `js/main.js`:
   ```javascript
   import { initMiModulo } from './modules/mi-modulo.js';
   ```
4. Llama en el listener de `DOMContentLoaded`:
   ```javascript
   initMiModulo();
   ```

### Cambiar Zonas (para Google Maps)
En `js/modules/maps.js`, actualiza `ZONA_COORDS`:

```javascript
const ZONA_COORDS = {
    'zona centro': { lat: 19.4326, lng: -99.1332 },
    'tu-zona': { lat: 19.XXXX, lng: -99.XXXX },
    // ...
};
```

---

## ⚠️ Limitaciones y Notas

- **Sin Backend**: Todo se guarda en localStorage (local del navegador). Los datos se pierden si se limpia el cache.
- **Mapas Limitados**: Las coordenadas son aproximadas basadas en zona, no GPS real.
- **Pagos Ficticios**: Los montos son generados aleatoriamente, no hay procesamiento real de pagos.
- **Sin Autenticación**: No hay login/usuario. Es una demo educativa.
- **Móvil**: Responsive, pero optimizado para desktop.

---

## 🤝 Contribuir / Mejorar

Ideas para extender:

- [ ] Agregar autenticación real (Firebase, Auth0)
- [ ] Mover a backend real (Node+Express, bases de datos)
- [ ] Integrar sistema de chat en tiempo real (Socket.io)
- [ ] Agregar notificaciones push
- [ ] Mejorar UI con framework (React, Vue)
- [ ] Agregar filtros avanzados (energía, tamaño, distancia)
- [ ] Historial de paseos completados
- [ ] Sistema de reviews más avanzado

---

## 📝 Licencia

Este proyecto es de código abierto y está disponible para uso educativo y personal.

---

## ❓ Preguntas Frecuentes

**P: ¿Dónde se guardan mis datos?**
R: Todo se guarda en `localStorage` del navegador. Son datos locales, no en un servidor.

**P: ¿Cómo limpio los datos?**
R: En la consola: `localStorage.clear()` o usa `limpiarDatos()` del módulo `dataLoader.js`.

**P: ¿Por qué necesito Google Maps API Key?**
R: Para mostrar mapas interactivos. Sin ella, la funcionalidad de mapas no funcionará (pero el resto de la app sí).

**P: ¿Puedo usar esto en producción?**
R: No. Es una demo educativa. Para producción, necesitas backend, autenticación, base de datos, HTTPS, etc.

---

**¡Disfruta Pick'a Dog!** 🐶🏃‍♂️

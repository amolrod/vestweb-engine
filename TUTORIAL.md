# 🎓 Vestweb Engine - Tutorial Avanzado

## Tabla de Contenidos
1. [Primeros Pasos](#primeros-pasos)
2. [Sistema de Física](#sistema-de-física)
3. [Manipulación de Cámara](#manipulación-de-cámara)
4. [Extensiones del Motor](#extensiones-del-motor)
5. [Optimización y Performance](#optimización-y-performance)
6. [Creación de Escenas Personalizadas](#creación-de-escenas-personalizadas)

---

## Primeros Pasos

### Abrir el Motor
1. Abre `motor.html` en tu navegador (Chrome, Firefox, Safari, Edge)
2. Espera a que la pantalla de carga desaparezca
3. Usa WASD para moverte, ratón para mirar alrededor

### Abrir la Consola del Desarrollador
- **Windows/Linux**: F12 o Ctrl+Shift+I
- **macOS**: Cmd+Option+I

### Verificar que el Motor está Funcionando
```javascript
// En la consola:
VESTWEB.info()
```

Deberías ver información del motor como:
```
╔═══════════════════════════════════════╗
║     VESTWEB ENGINE v2.0               ║
║     High-Performance Graphics Engine  ║
╟───────────────────────────────────────╢
║  Systems: ...
```

---

## Sistema de Física

### Conceptos Básicos

Cada objeto físico tiene estas propiedades:
- **position**: [x, y, z] - Posición en el mundo
- **velocity**: [vx, vy, vz] - Velocidad actual
- **mass**: número - Masa del objeto (afecta inercia)
- **radius**: número - Radio de la esfera
- **restitution**: 0-1 - "Bounce" (0=sin rebote, 1=rebote perfecto)
- **friction**: 0-1 - Fricción con otras superficies
- **dynamic**: boolean - Si el objeto se mueve o es estático

### Añadir un Objeto Físico Simple

```javascript
// Esfera que cae desde arriba
NEXUS.addPhysicsObject({
    position: [0, 10, 0],      // 10 unidades arriba del origen
    velocity: [0, 0, 0],       // Comienza quieta
    mass: 1.0,                 // Masa estándar
    radius: 0.5,               // Radio de 0.5 unidades
    restitution: 0.8,          // Rebota bastante
    friction: 0.2,             // Poca fricción
    dynamic: true              // Se mueve con física
})
```

### Ejemplos Avanzados

#### Pelota de Tenis (muy bouncy)
```javascript
NEXUS.addPhysicsObject({
    position: [0, 15, 0],
    velocity: [0, -2, 0],      // Empieza cayendo
    mass: 0.058,               // Masa real de pelota de tenis
    radius: 0.033,             // Radio real
    restitution: 0.75,         // Rebote alto
    friction: 0.5,             // Fricción media
    dynamic: true
})
```

#### Bola de Boliche (pesada)
```javascript
NEXUS.addPhysicsObject({
    position: [0, 5, 0],
    velocity: [5, 0, 0],       // Lanzamiento horizontal
    mass: 7.26,                // Masa de bola de boliche
    radius: 0.108,             // Radio real
    restitution: 0.1,          // Casi no rebota
    friction: 0.8,             // Mucha fricción
    dynamic: true
})
```

#### Pelota de Golf
```javascript
NEXUS.addPhysicsObject({
    position: [-5, 2, 0],
    velocity: [10, 8, 0],      // Lanzamiento rápido
    mass: 0.046,               // Muy ligera
    radius: 0.021,             // Pequeña
    restitution: 0.85,         // Rebote excelente
    friction: 0.3,
    dynamic: true
})
```

### Modificar Gravedad

```javascript
// Gravedad terrestre (default)
NEXUS.PhysicsSystem.gravity = [0, -9.8, 0]

// Luna
NEXUS.PhysicsSystem.gravity = [0, -1.62, 0]

// Marte
NEXUS.PhysicsSystem.gravity = [0, -3.71, 0]

// Júpiter
NEXUS.PhysicsSystem.gravity = [0, -24.79, 0]

// Sin gravedad (espacio)
NEXUS.PhysicsSystem.gravity = [0, 0, 0]

// Gravedad lateral (experimental)
NEXUS.PhysicsSystem.gravity = [-9.8, 0, 0]
```

### Modificar Objetos Existentes

```javascript
// Obtener todos los objetos dinámicos
let objects = NEXUS.PhysicsSystem.objects.filter(o => o.dynamic)

// Hacer que todos reboten más
objects.forEach(obj => {
    obj.restitution = 0.95
})

// Hacer todo muy ligero
objects.forEach(obj => {
    obj.mass = 0.1
})

// Dar impulso a todos los objetos
objects.forEach(obj => {
    obj.velocity[1] += 5  // Impulso hacia arriba
})

// Congelar todo (detener movimiento)
objects.forEach(obj => {
    obj.velocity = [0, 0, 0]
})
```

### Crear Escenas Complejas

#### Escena 1: Torre de Caída
```javascript
// Limpiar objetos existentes
NEXUS.reset()

// Crear torre vertical de objetos
for (let i = 0; i < 10; i++) {
    NEXUS.addPhysicsObject({
        position: [0, 1 + i * 1.1, 0],
        velocity: [0, 0, 0],
        mass: 1.0,
        radius: 0.5,
        restitution: 0.6,
        friction: 0.3,
        dynamic: true
    })
}

// Lanzar proyectil para derribar la torre
setTimeout(() => {
    NEXUS.addPhysicsObject({
        position: [-15, 3, 0],
        velocity: [20, 2, 0],
        mass: 5.0,
        radius: 0.8,
        restitution: 0.8,
        friction: 0.1,
        dynamic: true
    })
}, 2000)
```

#### Escena 2: Cascada de Objetos
```javascript
// Crear cascada que cae continuamente
let cascadeInterval = setInterval(() => {
    NEXUS.addPhysicsObject({
        position: [
            (Math.random() - 0.5) * 8,
            15,
            (Math.random() - 0.5) * 8
        ],
        velocity: [0, 0, 0],
        mass: 0.5 + Math.random(),
        radius: 0.3 + Math.random() * 0.3,
        restitution: 0.7,
        friction: 0.2,
        dynamic: true
    })
}, 200)

// Detener después de 10 segundos
setTimeout(() => clearInterval(cascadeInterval), 10000)
```

#### Escena 3: Newton's Cradle (Péndulo de Newton)
```javascript
// Limpiar
NEXUS.reset()

// Crear 5 esferas en línea
for (let i = 0; i < 5; i++) {
    NEXUS.addPhysicsObject({
        position: [i * 1.1 - 2.2, 3, 0],
        velocity: [0, 0, 0],
        mass: 1.0,
        radius: 0.5,
        restitution: 0.95,  // Casi perfectamente elástico
        friction: 0.01,     // Casi sin fricción
        dynamic: true
    })
}

// Lanzar la primera esfera
NEXUS.PhysicsSystem.objects[NEXUS.PhysicsSystem.objects.length - 5].velocity = [10, 0, 0]
```

---

## Manipulación de Cámara

### Posicionamiento Manual

```javascript
// Vista frontal
NEXUS.CameraSystem.position = [0, 3, -10]
NEXUS.CameraSystem.pitch = 0
NEXUS.CameraSystem.yaw = 0
NEXUS.Engine.resetFrame()

// Vista aérea
NEXUS.CameraSystem.position = [0, 20, 0]
NEXUS.CameraSystem.pitch = -Math.PI / 2  // Mirando hacia abajo
NEXUS.CameraSystem.yaw = 0
NEXUS.Engine.resetFrame()

// Vista diagonal
NEXUS.CameraSystem.position = [10, 10, 10]
NEXUS.CameraSystem.pitch = -Math.PI / 4
NEXUS.CameraSystem.yaw = -Math.PI / 4
NEXUS.Engine.resetFrame()
```

### Configuración de Cámara

```javascript
// Velocidad de movimiento
NEXUS.CameraSystem.speed = 0.2  // Más rápida
NEXUS.CameraSystem.speed = 0.05 // Más lenta

// Sensibilidad del ratón
NEXUS.CameraSystem.sensitivity = 0.005  // Más sensible
NEXUS.CameraSystem.sensitivity = 0.001  // Menos sensible

// Field of View (Zoom)
NEXUS.CameraSystem.fov = 2.0  // Más zoom out
NEXUS.CameraSystem.fov = 1.0  // Más zoom in
```

### Animación de Cámara

```javascript
// Órbita circular alrededor del origen
function orbitCamera(radius = 10, speed = 0.02) {
    let angle = 0
    let orbitInterval = setInterval(() => {
        angle += speed
        NEXUS.CameraSystem.position = [
            Math.cos(angle) * radius,
            5,
            Math.sin(angle) * radius
        ]
        NEXUS.CameraSystem.yaw = angle + Math.PI / 2
        NEXUS.Engine.resetFrame()
    }, 16)
    
    // Retornar función para detener
    return () => clearInterval(orbitInterval)
}

// Usar:
let stopOrbit = orbitCamera(15, 0.03)
// Después, para detener:
stopOrbit()
```

```javascript
// Movimiento suave hacia un objetivo
function moveCameraTo(targetPos, duration = 2000) {
    const start = [...NEXUS.CameraSystem.position]
    const startTime = Date.now()
    
    function animate() {
        const elapsed = Date.now() - startTime
        const progress = Math.min(elapsed / duration, 1)
        
        // Interpolación suave (ease in-out)
        const t = progress < 0.5 
            ? 2 * progress * progress 
            : -1 + (4 - 2 * progress) * progress
        
        NEXUS.CameraSystem.position = [
            start[0] + (targetPos[0] - start[0]) * t,
            start[1] + (targetPos[1] - start[1]) * t,
            start[2] + (targetPos[2] - start[2]) * t
        ]
        
        NEXUS.Engine.resetFrame()
        
        if (progress < 1) {
            requestAnimationFrame(animate)
        }
    }
    
    animate()
}

// Usar:
moveCameraTo([5, 10, -5], 3000)  // Mover en 3 segundos
```

---

## Extensiones del Motor

### Cargar el Archivo de Extensiones

1. Abre `extensions.js` en un editor de texto
2. Copia todo el contenido
3. Pégalo en la consola del navegador
4. Presiona Enter

Ahora tendrás acceso a:
```javascript
NexusExtensions.spawn.randomSpheres(10)
NexusExtensions.camera.aerial()
NexusExtensions.physics.moon()
// etc...
```

---

## Optimización y Performance

### Monitoreo de Performance

```javascript
// Ver estadísticas en tiempo real
console.log('FPS:', NEXUS.Engine.fps)
console.log('Samples:', NEXUS.Engine.frameCount)
console.log('Objects:', NEXUS.PhysicsSystem.objects.length)
console.log('Collisions:', NEXUS.PhysicsSystem.collisions)
```

### Optimizar para Más FPS

```javascript
// Reducir objetos físicos
let dynamicCount = NEXUS.PhysicsSystem.objects.filter(o => o.dynamic).length
if (dynamicCount > 50) {
    // Eliminar objetos más antiguos
    NEXUS.PhysicsSystem.objects = NEXUS.PhysicsSystem.objects.filter((o, i) => 
        !o.dynamic || i >= NEXUS.PhysicsSystem.objects.length - 30
    )
}

// Reducir substeps de física (menos preciso pero más rápido)
NEXUS.PhysicsSystem.substeps = 2  // Default es 4

// Desactivar física temporalmente
NEXUS.PhysicsSystem.enabled = false

// Reactivar
NEXUS.PhysicsSystem.enabled = true
```

### Límite de Samples para Interactividad

```javascript
// Limitar samples para mantener la escena interactiva
setInterval(() => {
    if (NEXUS.Engine.frameCount > 200) {
        NEXUS.Engine.resetFrame()
    }
}, 100)
```

---

## Creación de Escenas Personalizadas

### Plantilla de Escena Completa

```javascript
// ============================================
// MI ESCENA PERSONALIZADA
// ============================================

// 1. Reset completo
NEXUS.reset()

// 2. Configurar física
NEXUS.PhysicsSystem.gravity = [0, -9.8, 0]
NEXUS.PhysicsSystem.substeps = 4

// 3. Configurar cámara
NEXUS.CameraSystem.position = [0, 5, -15]
NEXUS.CameraSystem.pitch = 0.2
NEXUS.CameraSystem.yaw = 0
NEXUS.CameraSystem.speed = 0.15

// 4. Crear objetos estáticos
// (suelo ya existe por defecto)

// 5. Crear objetos dinámicos
for (let i = 0; i < 5; i++) {
    NEXUS.addPhysicsObject({
        position: [i * 2 - 4, 10, 0],
        velocity: [0, 0, 0],
        mass: 1.0,
        radius: 0.5,
        restitution: 0.7,
        friction: 0.3,
        dynamic: true
    })
}

// 6. Iniciar animación o evento
setTimeout(() => {
    console.log('¡Escena lista!')
}, 1000)
```

---

## Tips y Trucos

### Capturar Screenshot
```javascript
const canvas = document.getElementById('glcanvas')
const link = document.createElement('a')
link.download = 'nexus-screenshot.png'
link.href = canvas.toDataURL()
link.click()
```

### Guardar Configuración de Escena
```javascript
// Guardar estado actual
const sceneData = {
    camera: {
        position: NEXUS.CameraSystem.position,
        pitch: NEXUS.CameraSystem.pitch,
        yaw: NEXUS.CameraSystem.yaw
    },
    objects: NEXUS.PhysicsSystem.objects.filter(o => o.dynamic).map(o => ({
        position: o.position,
        velocity: o.velocity,
        mass: o.mass,
        radius: o.radius,
        restitution: o.restitution,
        friction: o.friction
    }))
}

// Copiar al clipboard
copy(JSON.stringify(sceneData, null, 2))
```

### Restaurar Escena Guardada
```javascript
// Pegar tu JSON guardado aquí
const sceneData = { /* ... */ }

// Restaurar
NEXUS.reset()
NEXUS.CameraSystem.position = sceneData.camera.position
NEXUS.CameraSystem.pitch = sceneData.camera.pitch
NEXUS.CameraSystem.yaw = sceneData.camera.yaw

sceneData.objects.forEach(obj => {
    NEXUS.addPhysicsObject({...obj, dynamic: true})
})
```

---

## Troubleshooting

**Q: Los objetos atraviesan el suelo**
```javascript
// A: Aumentar substeps de física
NEXUS.PhysicsSystem.substeps = 8
```

**Q: Los objetos se mueven muy rápido**
```javascript
// A: Reducir gravedad o velocidades iniciales
NEXUS.PhysicsSystem.gravity = [0, -5, 0]
```

**Q: FPS muy bajo**
```javascript
// A: Limpiar objetos y reducir substeps
NEXUS.reset()
NEXUS.PhysicsSystem.substeps = 2
```

**Q: Cámara se mueve muy lento**
```javascript
// A: Aumentar velocidad
NEXUS.CameraSystem.speed = 0.3
```

---

¡Diviértete experimentando con NEXUS Engine! 🚀

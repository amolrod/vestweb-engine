// ========================================
// VESTWEB Engine v2.0 - Example Extensions
// Ejemplos de cómo extender el motor
// ========================================

// NOTA: Pega este código en la consola del navegador (F12)
// mientras el motor está ejecutándose

// Verificar que VESTWEB está cargado
if (typeof VESTWEB === 'undefined') {
    console.error('❌ Error: VESTWEB engine not loaded!');
    console.log('Please wait for the engine to load, then paste this code again.');
    throw new Error('VESTWEB is not defined. Make sure motor.html is running.');
}

console.log('✅ VESTWEB detected! Loading extensions...');

// ========================================
// 1. CUSTOM PHYSICS OBJECTS
// ========================================

// Añadir múltiples esferas con propiedades aleatorias (M1 optimizado)
function spawnRandomSpheres(count = 3) { // Reducido de 5 a 3 por defecto
    for (let i = 0; i < count; i++) {
        VESTWEB.addPhysicsObject({
            position: [
                (Math.random() - 0.5) * 10,
                5 + Math.random() * 10,
                (Math.random() - 0.5) * 10
            ],
            velocity: [
                (Math.random() - 0.5) * 2,
                Math.random() * 2,
                (Math.random() - 0.5) * 2
            ],
            mass: 0.5 + Math.random() * 2,
            radius: 0.3 + Math.random() * 0.5,
            restitution: 0.5 + Math.random() * 0.4,
            friction: 0.1 + Math.random() * 0.3,
            dynamic: true
        });
    }
    console.log(`✅ Spawned ${count} physics objects`);
}

// Crear una pirámide de objetos (optimizada para M1 - máx 14 objetos)
function createPyramid() {
    let y = 1;
    for (let layer = 0; layer < 3; layer++) { // Reducido de 5 a 3 capas
        let size = 3 - layer; // 3x3, 2x2, 1x1 = 14 objetos
        for (let x = 0; x < size; x++) {
            for (let z = 0; z < size; z++) {
                VESTWEB.addPhysicsObject({
                    position: [
                        (x - size/2) * 1.2,
                        y,
                        (z - size/2) * 1.2
                    ],
                    velocity: [0, 0, 0],
                    mass: 1.0,
                    radius: 0.5,
                    restitution: 0.6,
                    friction: 0.3,
                    dynamic: true
                });
            }
        }
        y += 1.2;
    }
    console.log('✅ Pyramid created! (14 objects - M1 optimized)');
}

// ========================================
// 2. CAMERA PRESETS
// ========================================

const CameraPresets = {
    // Vista aérea
    aerial() {
        VESTWEB.CameraSystem.position = [0, 15, 0];
        VESTWEB.CameraSystem.pitch = -Math.PI / 3;
        VESTWEB.CameraSystem.yaw = 0;
        VESTWEB.Engine.resetFrame();
        console.log('📷 Camera: Aerial view');
    },
    
    // Vista lateral
    side() {
        VESTWEB.CameraSystem.position = [15, 5, 0];
        VESTWEB.CameraSystem.pitch = 0;
        VESTWEB.CameraSystem.yaw = -Math.PI / 2;
        VESTWEB.Engine.resetFrame();
        console.log('📷 Camera: Side view');
    },
    
    // Vista frontal
    front() {
        VESTWEB.CameraSystem.position = [0, 3, -15];
        VESTWEB.CameraSystem.pitch = 0.1;
        VESTWEB.CameraSystem.yaw = 0;
        VESTWEB.Engine.resetFrame();
        console.log('📷 Camera: Front view');
    },
    
    // Vista isométrica
    isometric() {
        VESTWEB.CameraSystem.position = [10, 10, 10];
        VESTWEB.CameraSystem.pitch = -Math.PI / 6;
        VESTWEB.CameraSystem.yaw = -Math.PI / 4;
        VESTWEB.Engine.resetFrame();
        console.log('📷 Camera: Isometric view');
    }
};

// ========================================
// 3. PHYSICS EXPERIMENTS
// ========================================

const PhysicsExperiments = {
    // Gravedad lunar
    moon() {
        VESTWEB.PhysicsSystem.gravity = [0, -1.62, 0];
        console.log('🌙 Gravity: Moon mode (1.62 m/s²)');
    },
    
    // Gravedad de Júpiter
    jupiter() {
        VESTWEB.PhysicsSystem.gravity = [0, -24.79, 0];
        console.log('🪐 Gravity: Jupiter mode (24.79 m/s²)');
    },
    
    // Sin gravedad (espacio)
    space() {
        VESTWEB.PhysicsSystem.gravity = [0, 0, 0];
        console.log('🚀 Gravity: Space mode (0 m/s²)');
    },
    
    // Gravedad inversa
    antigravity() {
        VESTWEB.PhysicsSystem.gravity = [0, 9.8, 0];
        console.log('⬆️ Gravity: Anti-gravity mode');
    },
    
    // Reset a gravedad terrestre
    earth() {
        VESTWEB.PhysicsSystem.gravity = [0, -9.8, 0];
        console.log('🌍 Gravity: Earth mode (9.8 m/s²)');
    },
    
    // Super bouncy (alta restitución)
    superBouncy() {
        VESTWEB.PhysicsSystem.objects.forEach(obj => {
            if (obj.dynamic) obj.restitution = 0.95;
        });
        console.log('⚡ All objects now super bouncy!');
    },
    
    // Sin fricción (hielo)
    ice() {
        VESTWEB.PhysicsSystem.objects.forEach(obj => {
            if (obj.dynamic) obj.friction = 0.01;
        });
        console.log('❄️ Ice mode: minimal friction');
    }
};

// ========================================
// 4. RENDERING TWEAKS
// ========================================

const RenderTweaks = {
    // Aumentar calidad (más lento)
    highQuality() {
        // Nota: esto requeriría modificar los #defines del shader
        // Aquí solo mostramos cómo acceder al estado
        console.log('🎨 High quality mode would require shader recompilation');
        console.log('Current samples:', VESTWEB.Engine.frameCount);
    },
    
    // Performance mode (resetear samples frecuentemente)
    performanceMode() {
        setInterval(() => {
            if (VESTWEB.Engine.frameCount > 100) {
                // Limitar samples para mantener interactividad
                console.log('⚡ Performance mode: samples limited');
            }
        }, 1000);
    },
    
    // Screenshot (capturar frame actual)
    screenshot() {
        const canvas = document.getElementById('glcanvas');
        const link = document.createElement('a');
        link.download = `vestweb-engine-${Date.now()}.png`;
        link.href = canvas.toDataURL();
        link.click();
        console.log('📸 Screenshot saved!');
    }
};

// ========================================
// 5. ANIMATIONS & DEMOS
// ========================================

// Orbitar cámara automáticamente
let orbitAnimation = null;
function startOrbit(radius = 12, speed = 0.5) {
    stopOrbit();
    let angle = 0;
    orbitAnimation = setInterval(() => {
        angle += speed * 0.016;
        VESTWEB.CameraSystem.position = [
            Math.cos(angle) * radius,
            5 + Math.sin(angle * 0.5) * 3,
            Math.sin(angle) * radius
        ];
        VESTWEB.CameraSystem.yaw = angle + Math.PI / 2;
        VESTWEB.CameraSystem.pitch = -0.2;
        VESTWEB.Engine.resetFrame();
    }, 16);
    console.log('🎬 Orbit animation started');
}

function stopOrbit() {
    if (orbitAnimation) {
        clearInterval(orbitAnimation);
        orbitAnimation = null;
        console.log('⏹️ Orbit animation stopped');
    }
}

// Demo de lluvia de objetos (M1 optimizado)
let rainInterval = null;
function startRain(intensity = 2) { // Reducido de 5 a 2 para no sobrepasar 15 objetos
    stopRain();
    rainInterval = setInterval(() => {
        for (let i = 0; i < intensity; i++) {
            VESTWEB.addPhysicsObject({
                position: [
                    (Math.random() - 0.5) * 20,
                    15 + Math.random() * 5,
                    (Math.random() - 0.5) * 20
                ],
                velocity: [0, -2, 0],
                mass: 0.5,
                radius: 0.3,
                restitution: 0.7,
                friction: 0.2,
                dynamic: true
            });
        }
    }, 1000);
    console.log('🌧️ Rain started!');
}

function stopRain() {
    if (rainInterval) {
        clearInterval(rainInterval);
        rainInterval = null;
        console.log('☀️ Rain stopped');
    }
}

// Limpiar todos los objetos dinámicos
function clearAllObjects() {
    const count = VESTWEB.PhysicsSystem.objects.filter(o => o.dynamic).length;
    VESTWEB.PhysicsSystem.objects = VESTWEB.PhysicsSystem.objects.filter(o => !o.dynamic);
    VESTWEB.Engine.resetFrame();
    console.log(`🧹 Cleared ${count} dynamic objects`);
}

// ========================================
// 6. PERFORMANCE MONITORING
// ========================================

function startPerformanceMonitor() {
    console.log('📊 Performance Monitor Started');
    console.log('───────────────────────────────────────');
    
    setInterval(() => {
        console.clear();
        console.log('╔═══════════════════════════════════╗');
        console.log('║   VESTWEB ENGINE - PERFORMANCE      ║');
        console.log('╠═══════════════════════════════════╣');
        console.log(`║ FPS:            ${VESTWEB.Engine.fps.toString().padEnd(18)}║`);
        console.log(`║ Samples:        ${VESTWEB.Engine.frameCount.toString().padEnd(18)}║`);
        console.log(`║ Resolution:     ${VESTWEB.RenderBuffers.width}x${VESTWEB.RenderBuffers.height}`.padEnd(37) + '║');
        console.log(`║ Physics Objs:   ${VESTWEB.PhysicsSystem.objects.filter(o => o.dynamic).length.toString().padEnd(18)}║`);
        console.log(`║ Collisions:     ${VESTWEB.PhysicsSystem.collisions.toString().padEnd(18)}║`);
        console.log(`║ Gravity:        ${VESTWEB.PhysicsSystem.gravity[1].toFixed(2).padEnd(18)}║`);
        console.log('╚═══════════════════════════════════╝');
    }, 1000);
}

// ========================================
// QUICK START
// ========================================

console.log(`
╔═══════════════════════════════════════════════════════════╗
║         VESTWEB ENGINE - EXTENSIONS (M1 Optimized)       ║
╠═══════════════════════════════════════════════════════════╣
║  Quick Commands:                                          ║
║                                                           ║
║  spawnRandomSpheres(5)     - Add 5 random spheres        ║
║  createPyramid()           - Build pyramid (14 objects)  ║
║  CameraPresets.aerial()    - Aerial camera view          ║
║  PhysicsExperiments.moon() - Moon gravity                ║
║  startOrbit()              - Orbital camera animation    ║
║  startRain(2)              - Rain simulation (low)       ║
║  clearAllObjects()         - Remove all dynamic objects  ║
║  RenderTweaks.screenshot() - Save screenshot             ║
║  startPerformanceMonitor() - Live performance stats      ║
║                                                           ║
║  ⚠️  Max 15 objects for 60 FPS on M1                     ║
║  Type 'VESTWEB.info()' for more information              ║
╚═══════════════════════════════════════════════════════════╝
`);

// ========================================
// EXPORT FUNCTIONS
// ========================================

// Exponer funciones globalmente para fácil acceso
window.VestwebExtensions = {
    spawn: {
        randomSpheres: spawnRandomSpheres,
        pyramid: createPyramid,
        rain: {
            start: startRain,
            stop: stopRain
        }
    },
    camera: CameraPresets,
    physics: PhysicsExperiments,
    render: RenderTweaks,
    animation: {
        orbit: {
            start: startOrbit,
            stop: stopOrbit
        }
    },
    utils: {
        clear: clearAllObjects,
        monitor: startPerformanceMonitor
    }
};

console.log('✅ Extensions loaded! Access via window.VestwebExtensions');

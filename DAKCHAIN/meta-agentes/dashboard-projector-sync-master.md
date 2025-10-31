# 🎮 Meta-Agente: Dashboard-Projector Sync Master

**Versión**: 2.0
**Fecha**: Octubre 28, 2025
**Tipo**: Meta-agente de sincronización tiempo real
**Transacción**: Tipo 6 - CONVERGENCIA CON SUBNODOS

---

## 🎯 Propósito

Coordina la sincronización en tiempo real entre:
- **3A.Battles** (Control Remoto en Dashboard Admin)
- **4B1.Brackets** (Configuración de Templates en Setup)
- **4B2.Live** (Proyector READ-ONLY en pantalla grande)

**Función principal**: Merge de configuraciones múltiples + push en tiempo real a proyector.

---

## 🏗️ Arquitectura de Convergencia

### Patrón: Multiple Write → Single Read

```yaml
ESCRITORES (Write):
  1. 3A.Battles (sub-nodo)
     - Escribe: projectorControl/[eventId]
     - Campos: activeView, activeBattleId, showWinners
     - Guardian: [organizador:BASIC]

  2. 4B1.Brackets (sub-nodo)
     - Escribe: projectorConfig/[eventId]
     - Campos: brackets.activeTemplate, winnerColor, layout
     - Guardian: [organizador:BASIC]

LECTOR (Read-only):
  3. 4B2.Live (nodo completo)
     - Lee: projectorControl + projectorConfig
     - Renderiza: Proyector fullscreen
     - Guardian: [público:FREE]

CAPA WiFi:
  - Firebase Firestore
  - Real-time listeners (onSnapshot)
  - Merge automático por Firebase
```

### Flujo de Datos

```
3A.Battles (Control Remoto)
  ↓ escribe
Firebase: projectorControl
  {
    activeView: "top16",
    activeBattleId: "xyz",
    showWinners: true
  }
      ↓
      ↓ merge con
      ↓
Firebase: projectorConfig
  {
    brackets: {
      activeTemplate: "top16",
      winnerColor: "cyan",
      connectorOpacity: 0.8
    },
    logos: [...],
    background: {...}
  }
      ↑ escribe
      ↑
4B1.Brackets (Setup)

      ↓
      ↓ lee TODO
      ↓
4B2.Live (Proyector)
  - Listener activo en ambas colecciones
  - Merge local de configuraciones
  - Render en tiempo real
```

---

## 📂 Colecciones Firebase

### projectorControl/[eventId]

**Propósito**: Control remoto desde Dashboard (3A.Battles)

**Campos**:
```typescript
{
  activeView: "general" | "top8" | "top16" | "background" | "sponsors",
  activeBattleId: string | null,
  activeCategoryId: string | null,
  showWinners: boolean,
  timestamp: Timestamp
}
```

**Quién escribe**: 3A.Battles (organizador desde admin dashboard)
**Quién lee**: 4B2.Live (proyector)

**Casos de uso**:
- Cambiar vista del proyector (general/brackets/batalla)
- Seleccionar categoría activa
- Mostrar/ocultar ganadores
- Controlar qué batalla mostrar

---

### projectorConfig/[eventId]

**Propósito**: Configuración visual del proyector (4B1.Brackets + 4B1.Background + 4B1.Sponsors)

**Campos**:
```typescript
{
  brackets: {
    activeTemplate: "top8" | "top16",
    winnerColor: "cyan" | "pink" | "green" | "yellow",
    connectorOpacity: number (0-1),
    roundLabels: boolean,
    showSeeds: boolean,
    connectorStyle: "straight" | "curved",
    bracketScale: number,
    bracketPosition: { x: number, y: number },
    gap: { x: number, y: number }
  },
  background: {
    imageUrl: string | null,
    opacity: number (0-1),
    position: { x: number, y: number },
    scale: number,
    blur: number
  },
  sponsors: [
    {
      id: string,
      imageUrl: string,
      position: { x: number, y: number },
      scale: number,
      opacity: number
    }
  ],
  showWatermark: boolean,
  theme: "dark" | "light",
  timestamp: Timestamp
}
```

**Quién escribe**: 4B1 Setup (tabs: Brackets, Background, Sponsors)
**Quién lee**: 4B2.Live (proyector)

**Casos de uso**:
- Cambiar template de bracket (TOP8 ↔ TOP16)
- Ajustar colores y estilos
- Configurar fondo personalizado
- Añadir/modificar logos de sponsors

---

## 🔄 Listeners en Tiempo Real

### En 4B2.Live (Proyector)

```typescript
// Listener 1: Control Remoto
useEffect(() => {
  const unsubscribe = onSnapshot(
    doc(db, 'projectorControl', eventId),
    (snapshot) => {
      const control = snapshot.data()
      setActiveView(control.activeView)
      setActiveBattleId(control.activeBattleId)
      setShowWinners(control.showWinners)
    },
    (error) => {
      console.error('Error projectorControl listener:', error)
    }
  )
  return unsubscribe
}, [eventId])

// Listener 2: Configuración Visual
useEffect(() => {
  const unsubscribe = onSnapshot(
    doc(db, 'projectorConfig', eventId),
    (snapshot) => {
      const config = snapshot.data()
      setBracketsConfig(config.brackets)
      setBackground(config.background)
      setSponsors(config.sponsors)
      setTheme(config.theme)
    },
    (error) => {
      console.error('Error projectorConfig listener:', error)
    }
  )
  return unsubscribe
}, [eventId])

// Merge automático
const mergedConfig = {
  view: activeView,           // de projectorControl
  battleId: activeBattleId,   // de projectorControl
  template: bracketsConfig,   // de projectorConfig
  background: background,     // de projectorConfig
  sponsors: sponsors          // de projectorConfig
}
```

### En 3A.Battles (Control Remoto)

```typescript
// Write a projectorControl
const changeView = async (view: string) => {
  await setDoc(doc(db, 'projectorControl', eventId), {
    activeView: view,
    activeBattleId: currentBattleId,
    activeCategoryId: categoryId,
    showWinners: false,
    timestamp: serverTimestamp()
  }, { merge: true })
}
```

### En 4B1.Brackets (Setup)

```typescript
// Write a projectorConfig.brackets
const updateBracketTemplate = async (template: "top8" | "top16") => {
  await setDoc(doc(db, 'projectorConfig', eventId), {
    brackets: {
      activeTemplate: template,
      winnerColor: "cyan",
      connectorOpacity: 0.8,
      // ... resto de config
    },
    timestamp: serverTimestamp()
  }, { merge: true })
}
```

---

## 🎮 Sub-nodos Involucrados

### 3A.Battles (Control Remoto)

**URL**: `/admin/dashboard/[eventId]?tab=battles`

**Componente**: `MultiCategoryTechDashboard.tsx` (sección Control Remoto)

**UI**:
```
┌─────────────────────────────────┐
│   CONTROL REMOTO PROYECTOR      │
├─────────────────────────────────┤
│ [Vista General]                 │
│ [Categoría 1 - TOP8]           │
│ [Categoría 2 - TOP16]          │
│ [Categoría 3 - TOP8]           │
└─────────────────────────────────┘
```

**Campos que escribe**:
- `activeView`: Según botón clickeado
- `activeCategoryId`: Según categoría seleccionada
- `activeBattleId`: Si hay batalla activa

**Guardian**: `[organizador:BASIC]`

---

### 4B1.Brackets (Configuración)

**URL**: `/public/event/[eventId]/setup` (tab: Brackets)

**Componente**: `ProjectorCustomizationContent.tsx`

**UI**:
```
┌─────────────────────────────────┐
│  📋 BRACKETS                    │
├─────────────────────────────────┤
│  Template:                      │
│  ○ TOP 8                        │
│  ● TOP 16  ← CONFIGURACIÓN     │
│                                 │
│  Winner Color: [Cyan ▼]        │
│  Connector Opacity: [80%]      │
│  Round Labels: [✓]             │
│  Show Seeds: [✓]               │
└─────────────────────────────────┘
```

**Sub-sub-nodos**:
- `4B1.Brackets.TOP8` - Template TOP8
- `4B1.Brackets.TOP16` - Template TOP16

**Campos que escribe**:
- `brackets.activeTemplate`: "top8" | "top16"
- `brackets.winnerColor`: "cyan" | "pink" | etc
- `brackets.*`: Todas las configuraciones visuales

**Guardian**: `[organizador:BASIC]`

---

### 4B2.Live (Proyector)

**URL**: `/public/event/[eventId]/live`

**Componente**: `page.tsx` (Live)

**Función**: READ-ONLY receiver

**UI**: Fullscreen projector que muestra según config

**Vistas posibles**:
```yaml
activeView: "general"
  → Muestra vista unificada multicategoría

activeView: "top8"
  → Renderiza LibraryBracket.tsx (TOP8)

activeView: "top16"
  → Renderiza LibraryBracketTOP16.tsx (TOP16)

activeView: "battle"
  → Muestra batalla en vivo

activeView: "background"
  → Muestra solo fondo personalizado

activeView: "sponsors"
  → Muestra logos de sponsors
```

**Guardian**: `[público:FREE]` (acceso sin auth)

---

## 🔄 Ciclo de Vida Completo

### Escenario 1: Cambiar Template de Bracket

```yaml
PASO 1: Usuario en 4B1.Brackets
  → Selecciona radio button "TOP 16"
  → onChange dispara updateBracketTemplate("top16")

PASO 2: 4B1 escribe a Firebase
  → projectorConfig.brackets.activeTemplate = "top16"
  → timestamp actualizado

PASO 3: Firebase notifica a listeners
  → 4B2.Live onSnapshot detecta cambio

PASO 4: 4B2 re-renderiza
  → Lee activeTemplate = "top16"
  → Carga LibraryBracketTOP16.tsx
  → Muestra bracket TOP16 en pantalla
```

**Latencia típica**: 50-200ms

---

### Escenario 2: Control Remoto Cambia Vista

```yaml
PASO 1: Usuario en 3A.Battles (Dashboard)
  → Click botón "Categoría 2 - TOP16"
  → onChange dispara changeView("top16")

PASO 2: 3A escribe a Firebase
  → projectorControl.activeView = "top16"
  → projectorControl.activeCategoryId = "cat2"
  → timestamp actualizado

PASO 3: Firebase notifica a listeners
  → 4B2.Live onSnapshot detecta cambio

PASO 4: 4B2 merge configs
  → activeView = "top16" (de projectorControl)
  → template = projectorConfig.brackets (de projectorConfig)
  → Verifica que template coincide

PASO 5: 4B2 re-renderiza
  → Muestra bracket TOP16 de categoría 2
```

**Latencia típica**: 50-200ms

---

### Escenario 3: Configuración + Control Simultáneo

```yaml
PASO 1: Usuario A en 4B1.Brackets
  → Cambia winnerColor a "pink"
  → projectorConfig.brackets.winnerColor = "pink"

PASO 2: Simultáneamente, Usuario B en 3A.Battles
  → Click "Categoría 1 - TOP8"
  → projectorControl.activeView = "top8"

PASO 3: Firebase merge
  → Dos writes diferentes a colecciones separadas
  → NO hay race condition (colecciones independientes)

PASO 4: 4B2 recibe AMBOS cambios
  → Listener 1: activeView = "top8"
  → Listener 2: winnerColor = "pink"
  → Merge local correcto

PASO 5: 4B2 renderiza
  → Bracket TOP8 con ganador color pink
```

**Latencia típica**: 50-300ms (dos writes)

---

## ⚠️ Edge Cases y Manejo de Errores

### Edge Case 1: Template no registrado

**Problema**: Control remoto pide "top16" pero template no está en projectorConfig

```typescript
// Detección en 4B2
const activeTemplate = projectorConfig?.brackets?.activeTemplate
const requestedView = projectorControl?.activeView

if (requestedView === "top16" && activeTemplate !== "top16") {
  // FALLBACK: Mostrar vista general
  console.warn('TOP16 requested but not configured, showing general')
  return <GeneralView />
}
```

**Solución**: Validación en 4B1 antes de permitir selección de template

---

### Edge Case 2: Race condition en writes

**Problema**: Usuario cambia template muy rápido (TOP8 → TOP16 → TOP8)

```typescript
// Debounce en 4B1.Brackets
const debouncedUpdate = useMemo(
  () => debounce((template: string) => {
    updateBracketTemplate(template)
  }, 300),
  []
)

// Usuario cambia rápido pero solo último write se ejecuta
handleTemplateChange("top8")   // Cancelado
handleTemplateChange("top16")  // Cancelado
handleTemplateChange("top8")   // ✅ Ejecutado (300ms después)
```

**Latencia añadida**: 300ms (aceptable para UX)

---

### Edge Case 3: Proyector desconectado

**Problema**: 4B2 pierde conexión a Firebase

```typescript
// Error handling en listeners
const unsubscribe = onSnapshot(
  doc(db, 'projectorControl', eventId),
  (snapshot) => {
    // Éxito
    setControl(snapshot.data())
    setConnectionStatus('connected')
  },
  (error) => {
    // Error de conexión
    console.error('Listener error:', error)
    setConnectionStatus('disconnected')

    // Mostrar overlay de reconexión
    showReconnectingOverlay()

    // Retry automático cada 5s
    setTimeout(() => {
      // onSnapshot reintenta automáticamente
    }, 5000)
  }
)
```

**UX**: Overlay transparente "Reconectando..." en 4B2

---

### Edge Case 4: Configuración incompleta

**Problema**: projectorConfig existe pero falta campo brackets

```typescript
// Validación en 4B2
const config = projectorConfig || {}
const brackets = config.brackets || DEFAULT_BRACKETS_CONFIG
const background = config.background || DEFAULT_BACKGROUND
const sponsors = config.sponsors || []

// DEFAULT configs
const DEFAULT_BRACKETS_CONFIG = {
  activeTemplate: "top8",
  winnerColor: "cyan",
  connectorOpacity: 0.8,
  roundLabels: true,
  showSeeds: true,
  connectorStyle: "curved",
  bracketScale: 1,
  bracketPosition: { x: 0, y: 0 },
  gap: { x: 20, y: 40 }
}
```

**Resultado**: Proyector siempre tiene config válida

---

## 📊 Diagramas de Secuencia

### Cambio de Template (4B1 → 4B2)

```
Usuario          4B1.Brackets     Firebase          4B2.Live
  │                  │               │                 │
  │──Select TOP16──>│               │                 │
  │                  │               │                 │
  │                  │──setDoc──────>│                 │
  │                  │  (config)     │                 │
  │                  │               │                 │
  │                  │               │──onSnapshot────>│
  │                  │               │  (config)       │
  │                  │               │                 │
  │                  │               │            ✅ Re-render
  │                  │               │                 │
  │<─────────────────────────────────────────────────>│
  │           Latencia: 50-200ms                      │
```

---

### Control Remoto (3A → 4B2)

```
Usuario          3A.Battles     Firebase          4B2.Live
  │                  │               │                 │
  │──Click TOP16────>│               │                 │
  │                  │               │                 │
  │                  │──setDoc──────>│                 │
  │                  │  (control)    │                 │
  │                  │               │                 │
  │                  │               │──onSnapshot────>│
  │                  │               │  (control)      │
  │                  │               │                 │
  │                  │               │   Merge local   │
  │                  │               │  + projectorConfig
  │                  │               │                 │
  │                  │               │            ✅ Re-render
  │                  │               │                 │
  │<─────────────────────────────────────────────────>│
  │           Latencia: 50-200ms                      │
```

---

### Sincronización Dual (3A + 4B1 → 4B2)

```
Usuario A        4B1.Brackets     Firebase          4B2.Live       Usuario B    3A.Battles
   │                  │               │                 │              │             │
   │──Change color───>│               │                 │              │             │
   │                  │               │                 │              │──Change view>│
   │                  │──setDoc──────>│                 │              │             │
   │                  │  (config)     │<────setDoc──────────────────────────────────│
   │                  │               │  (control)      │              │             │
   │                  │               │                 │              │             │
   │                  │               │──onSnapshot 1──>│              │             │
   │                  │               │──onSnapshot 2──>│              │             │
   │                  │               │                 │              │             │
   │                  │               │      Merge: control + config   │             │
   │                  │               │                 │              │             │
   │                  │               │            ✅ Re-render         │             │
   │                  │               │                 │              │             │
   │<────────────────────────────────────────────────────────────────────────────────│
   │                       Latencia: 50-300ms (dos writes)                           │
```

---

## 🔍 Debugging Checklist

Cuando 4B2 no muestra vista correcta:

### 1. Verificar projectorControl

```typescript
// En Firebase Console o código
const control = await getDoc(doc(db, 'projectorControl', eventId))
console.log('Control:', control.data())

// ✅ Verificar:
// - activeView existe y es válido
// - activeCategoryId es correcto
// - timestamp es reciente
```

### 2. Verificar projectorConfig

```typescript
const config = await getDoc(doc(db, 'projectorConfig', eventId))
console.log('Config:', config.data())

// ✅ Verificar:
// - brackets.activeTemplate existe
// - brackets.activeTemplate coincide con activeView
// - timestamp es reciente
```

### 3. Verificar listeners en 4B2

```typescript
// En componente 4B2
console.log('Listener 1 activo:', !!unsubscribeControl)
console.log('Listener 2 activo:', !!unsubscribeConfig)

// ✅ Verificar:
// - Ambos listeners están activos
// - No hay errores en console
// - onSnapshot está recibiendo updates
```

### 4. Verificar merge local

```typescript
// En 4B2
console.log('Merged config:', {
  view: activeView,           // de projectorControl
  template: bracketsConfig.activeTemplate,  // de projectorConfig
  categoryId: activeCategoryId
})

// ✅ Verificar:
// - Merge está correcto
// - No hay undefined values
// - Template coincide con view
```

### 5. Verificar render condicional

```typescript
// En 4B2
if (activeView === "top16") {
  console.log('Rendering TOP16')
  console.log('Template config:', bracketsConfig)
  // ¿Se está ejecutando este branch?
}
```

---

## 🎯 Pruebas de Validación

### Test 1: Cambio de template en 4B1

```yaml
Setup:
  - Abrir 4B2 en pantalla grande
  - Abrir 4B1 en navegador admin
  - Seleccionar tab Brackets

Pasos:
  1. En 4B1: Click radio "TOP 8"
     → Verificar: 4B2 muestra bracket TOP8

  2. En 4B1: Click radio "TOP 16"
     → Verificar: 4B2 muestra bracket TOP16

  3. Repetir 3 veces rápido
     → Verificar: 4B2 siempre sincroniza correctamente

Resultado esperado:
  ✅ Latencia <200ms
  ✅ Sin flickering
  ✅ Template correcto en 4B2
```

---

### Test 2: Control remoto desde 3A

```yaml
Setup:
  - Abrir 4B2 en pantalla grande
  - Abrir 3A Dashboard en navegador admin
  - Ir a tab Battles

Pasos:
  1. En 3A: Click "Vista General"
     → Verificar: 4B2 muestra vista unificada

  2. En 3A: Click "Categoría 1 - TOP8"
     → Verificar: 4B2 muestra bracket TOP8 de cat1

  3. En 3A: Click "Categoría 2 - TOP16"
     → Verificar: 4B2 muestra bracket TOP16 de cat2

Resultado esperado:
  ✅ Latencia <200ms
  ✅ Cambio instantáneo
  ✅ Vista correcta según botón
```

---

### Test 3: Sincronización dual

```yaml
Setup:
  - Abrir 4B2 en pantalla grande
  - Abrir 3A Dashboard (Usuario A)
  - Abrir 4B1 Setup (Usuario B)

Pasos:
  1. Usuario A en 3A: Click "Categoría 1 - TOP16"
  2. Usuario B en 4B1: Cambiar winnerColor a "pink"
  3. Verificar 4B2: Bracket TOP16 con ganador pink

Resultado esperado:
  ✅ Ambos cambios aplicados
  ✅ Sin race conditions
  ✅ Merge correcto
```

---

## 📚 Archivos Críticos

### 4B2 Live (Proyector)

```
src/app/public/event/[eventId]/live/page.tsx
  - Listeners de Firebase
  - Merge de configuraciones
  - Render condicional por activeView

src/components/event/LibraryBracket.tsx
  - Componente TOP8 bracket

src/components/event/LibraryBracketTOP16.tsx
  - Componente TOP16 bracket
```

### 3A Dashboard (Control Remoto)

```
src/components/admin/dashboard/MultiCategoryTechDashboard.tsx
  - Control remoto UI
  - Write a projectorControl
  - Botones por categoría
```

### 4B1 Setup (Configuración)

```
src/app/public/event/[eventId]/setup/page.tsx
  - Container principal

src/components/projector/ProjectorCustomizationContent.tsx
  - Tabs: Brackets, Background, Sponsors
  - Write a projectorConfig
  - Radio buttons TOP8/TOP16
```

---

## 🔄 Actualización de Arteria

Si esta es la **3ra vez** trabajando en este flujo → crear:

```
.claude/blockchain-viviente/arterias/ARTERIA_PROYECTOR_MULTICATEGORIA.md
```

**Contenido sugerido**:
- Ruta optimizada 3A+4B1→4B2
- Errores comunes (template no registrado, race conditions)
- Soluciones validadas (debounce, fallbacks, defaults)
- Checkpoints de validación

---

## 🎓 Aprendizajes Clave

### 1. Colecciones Separadas = No Race Conditions

```yaml
✅ BUENO:
  projectorControl (control)
  projectorConfig (visual)
  → Writes independientes, merge en 4B2

❌ MALO:
  projectorSettings (todo junto)
  → Writes concurrentes causan race conditions
```

### 2. Merge en Lector, No en Escritor

```yaml
✅ BUENO:
  3A escribe solo control
  4B1 escribe solo config
  4B2 hace merge local

❌ MALO:
  3A intenta leer config para merge antes de escribir
  → Latencia extra, complejidad innecesaria
```

### 3. Defaults Previenen Crashes

```yaml
✅ BUENO:
  const brackets = config.brackets || DEFAULT_BRACKETS_CONFIG

❌ MALO:
  const template = config.brackets.activeTemplate
  → Crash si config.brackets es undefined
```

### 4. Debounce en Escritor, No en Lector

```yaml
✅ BUENO:
  4B1 debounce 300ms en writes
  4B2 reacciona inmediatamente a cambios

❌ MALO:
  4B2 debounce en re-render
  → Latencia artificial, mala UX
```

---

**Creado por**: Patricio + Claude (Sistema DAK)
**Última actualización**: Octubre 28, 2025
**Versión**: 2.0 (integrado con Blockchain Viviente)

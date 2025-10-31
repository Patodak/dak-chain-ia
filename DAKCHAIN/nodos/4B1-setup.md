# 4B1 Projector Setup - Documentación Completa (3 Niveles)

**Tipo**: Nodo Único con Jerarquía Compleja
**Nodo**: 4B1 - Projector Setup/Preview
**URL**: `/public/event/[eventId]/setup`
**Profundidad**: 4 (Proyección y Live)
**Branch**: B (Public)

---

## 🎯 Propósito del Nodo 4B1

**Preview y configuración de templates de proyector** antes de ir LIVE.

**Rol**: Organizador/Proyectorista (PC2 - Pantalla grande)
**Funcionalidad**: Configurar layout, background, brackets, sponsors ANTES de proyectar
**Comunicación**:
- ← 3A Dashboard (recibe control remoto)
- → 4B2 Live (envía configuración)

---

## 🏗️ Arquitectura de 3 Niveles (ÚNICA EN EL SISTEMA)

**CRÍTICO**: 4B1 es el **ÚNICO NODO con jerarquía de 3 niveles**.

```yaml
NIVEL 1 - NODO:
  4B1: /public/event/[eventId]/setup

NIVEL 2 - SUB-NODOS (Tabs):
  ├── TabLayout (configuración layout general)
  ├── TabBackground (configuración fondo)
  ├── TabBrackets (configuración brackets) ← TIENE NIVEL 3
  └── TabSponsors (configuración sponsors)

NIVEL 3 - SUB-SUB-NODOS (Templates dentro de TabBrackets):
  TabBrackets contiene:
    ├── TOP8 template (8 participantes)
    └── TOP16 template (16 participantes) ← BUG RESUELTO Oct 29, 2025
```

### Por Qué 3 Niveles

```yaml
Razón arquitectónica:
  - TabBrackets NO es solo config
  - TabBrackets ES un preview VIVO de brackets
  - Dentro tiene templates diferentes (TOP8 vs TOP16)
  - Cada template es un componente complejo independiente

Beneficio:
  ✅ Modularidad (cada template aislado)
  ✅ Reutilización (mismo bracket en 4B2)
  ✅ Testing individual por template
  ✅ Cambio de template sin romper otros
```

---

## 📊 NIVEL 2: SUB-NODOS (Tabs del Setup)

### 🎨 SUB-NODO 1: TabLayout

#### Propósito
Configuración del layout general del proyector.

#### Opciones de Layout
```yaml
Layouts disponibles:
  - Classic (layout tradicional)
  - Modern (layout moderno con gradientes)
  - Minimal (layout minimalista)

Configuración:
  - Padding general
  - Márgenes
  - Posición de elementos
  - Responsive breakpoints
```

#### Firestore Writes
```yaml
Escribe en: events/[eventId]/projectorConfig

Campos:
  layout: {
    type: "classic" | "modern" | "minimal"
    padding: number
    margins: { top, right, bottom, left }
  }
```

#### Componente
```typescript
// src/components/projector/setup/TabLayout.tsx
```

---

### 🌅 SUB-NODO 2: TabBackground

#### Propósito
Configuración del fondo/background del proyector.

#### Opciones de Background
```yaml
Tipos disponibles:
  - Solid Color (color sólido)
  - Gradient (gradiente personalizado)
  - Image (imagen custom)
  - Video (video loop de fondo)

Configuración:
  - Color primario
  - Color secundario (para gradientes)
  - Upload de imagen/video
  - Opacity/transparencia
  - Blur effect
```

#### Firestore Writes
```yaml
Escribe en: events/[eventId]/projectorConfig

Campos:
  background: {
    type: "solid" | "gradient" | "image" | "video"
    primaryColor: string (hex)
    secondaryColor: string (hex) (opcional)
    imageUrl: string (opcional)
    videoUrl: string (opcional)
    opacity: number (0-1)
    blur: number (0-100)
  }
```

#### Storage Integration
```yaml
Para imágenes/videos:
  - Upload a Firebase Storage
  - Path: /events/[eventId]/backgrounds/
  - Obtener downloadURL
  - Guardar URL en Firestore
```

#### Componente
```typescript
// src/components/projector/setup/TabBackground.tsx
```

---

### 🏆 SUB-NODO 3: TabBrackets ⭐ CRÍTICO (TIENE NIVEL 3)

#### Propósito
**Preview y configuración de templates de brackets** (TOP8 y TOP16).

**ESTE ES EL SUB-NODO MÁS COMPLEJO** - Contiene SUB-SUB-NODOS.

#### Opciones de Template
```yaml
Templates disponibles:
  1. TOP 8 (8 participantes, 3 rondas)
  2. TOP 16 (16 participantes, 4 rondas)

Configuración compartida (sharedConfig):
  - Winner color (cyan/pink)
  - Show demo winners (para preview)
  - Connector opacity
  - Round header visibility
  - Animation speed

Configuración específica (specificConfig):
  - TOP16.offsetY: Desplazamiento vertical (-200 a +200px)
  - TOP8.offsetY: Desplazamiento vertical (si se necesita)
```

#### Firestore Writes
```yaml
Escribe en: events/[eventId]/layoutConfig

Campos:
  libraryBracket: {          # sharedConfig
    winnerColor: "cyan" | "pink"
    showDemoWinners: boolean
    connectorOpacity: number (0-1)
    roundHeaderVisible: boolean
    animationSpeed: "slow" | "medium" | "fast"
  }

  libraryBracketTOP16: {     # specificConfig para TOP16
    offsetY: number (-200 a +200)
  }

  libraryBracketTOP8: {      # specificConfig para TOP8 (futuro)
    offsetY: number
  }
```

#### Componente Principal
```typescript
// src/components/projector/setup/TabBrackets.tsx
// Líneas 208-236: Configuración POSICIÓN VERTICAL (TOP16)

{/* Desplazamiento Vertical (solo TOP 16) - ESPECÍFICO */}
{activeTemplate === 'top16' && (
  <div className="space-y-2">
    <Label>Posición Vertical: {specificConfig.offsetY ?? 0}px</Label>
    <Slider
      value={[specificConfig.offsetY ?? 0]}
      onValueChange={([value]) => setCustomization(updateSpecificConfig({ offsetY: value }))}
      onValueCommit={([value]) => {
        console.log(`💾 Auto-save: ${activeTemplate}.offsetY:`, value);
        persistCustomization(updateSpecificConfig({ offsetY: value })).catch(console.error);
      }}
      min={-200}  // Limitado para prevenir header oculto
      max={200}   // Limitado para prevenir header oculto
      step={5}
    />
    <p className="text-xs text-muted-foreground">
      Negativo = arriba, Positivo = abajo
    </p>
    <p className="text-xs text-muted-foreground">
      💡 <strong>Zona segura: ±100px</strong> (recomendado)
    </p>
    {Math.abs(specificConfig.offsetY ?? 0) > 150 && (
      <p className="text-xs text-yellow-500 font-medium">
        ⚠️ Valores extremos (>{Math.abs(specificConfig.offsetY ?? 0)}px) pueden ocultar el encabezado
      </p>
    )}
  </div>
)}
```

---

## 🎯 NIVEL 3: SUB-SUB-NODOS (Templates de Brackets)

### 🥇 SUB-SUB-NODO 1: TOP8 Template

#### Propósito
Bracket de eliminación para 8 participantes (3 rondas).

#### Estructura de Rondas
```yaml
Ronda 1: Cuartos de Final (4 batallas)
  - Battle 1: P1 vs P2
  - Battle 2: P3 vs P4
  - Battle 3: P5 vs P6
  - Battle 4: P7 vs P8

Ronda 2: Semifinales (2 batallas)
  - Battle 5: Winner 1 vs Winner 2
  - Battle 6: Winner 3 vs Winner 4

Ronda 3: Final (1 batalla)
  - Battle 7: Winner 5 vs Winner 6
```

#### Componente
```typescript
// src/components/event/LibraryBracketTOP8.tsx

Características:
  ✅ 3 rondas
  ✅ Tab bar con headers (Cuartos, Semis, Final)
  ✅ SVG rendering via @g-loot/react-tournament-brackets
  ✅ Auto-scaling para viewport
  ✅ Winner color configurable
```

#### Estado Actual
```yaml
Estado: ✅ FUNCIONANDO CORRECTAMENTE
  - Tab bar visible y persistente
  - Scaling correcto
  - Headers visibles (Cuartos → Semis → Final)
  - No bugs reportados en 4B1 ni 4B2
```

---

### 🥈 SUB-SUB-NODO 2: TOP16 Template ✅ BUG RESUELTO

#### Propósito
Bracket de eliminación para 16 participantes (4 rondas).

#### Estructura de Rondas
```yaml
Ronda 1: Octavos de Final (8 batallas)
  - Battle 1-8: P1 vs P2, P3 vs P4, ... P15 vs P16

Ronda 2: Cuartos de Final (4 batallas)
  - Battle 9-12: Winner pairings

Ronda 3: Semifinales (2 batallas)
  - Battle 13-14: Winner pairings

Ronda 4: Gran Final (1 batalla)
  - Battle 15: Final winners
```

#### Componente
```typescript
// src/components/event/LibraryBracketTOP16.tsx

Características:
  ✅ 4 rondas
  ✅ Tab bar con headers (Octavos, Cuartos, Semis, Final)
  ✅ SVG rendering via @g-loot/react-tournament-brackets
  ✅ Auto-scaling para viewport
  ✅ Winner color configurable
  ✅ offsetY configurable (-200 a +200px)
```

#### 🐛 Debugging Histórico Completo (Oct 2025)

**Duración**: ~1 semana de debugging intensivo
**Metodología**: Claude + Codex Tandem (análisis dual independiente)
**Prerrequisito**: Sistema Blockchain Viviente (OS DAK) - creado antes para pensar arquitectónicamente
**Importancia**: Último blocker crítico para lanzamiento de aplicación

---

##### Problema Inicial: Tab Bar Oculta (Zoom-Dependent)

**Síntomas**:
```yaml
Comportamiento:
  - 100% zoom: Tab bar TOP16 OCULTA
  - 50% zoom: Tab bar TOP16 VISIBLE
  - TOP8: Funcionaba correctamente en todos los zooms
```

**Root Cause Identificado**:
```yaml
Nodo: 4B1.TabBrackets.TOP16
Archivo: src/components/projector/setup/TabBrackets.tsx

Problema en slider offsetY:
  - Rango original: -500px a +500px (demasiado extremo)
  - Usuario configuró: offsetY = -500px
  - Con bracketScale 0.6: -500 × 0.6 = -300px desplazamiento visual

Efecto en 4B2.Live:
  - 100% zoom: -300px empuja header completamente fuera del viewport
  - 50% zoom: -300px se ve como -150px (header parcialmente visible)
```

**Solución Fase 1 (4B1 Config Source)**:
```yaml
Archivo: TabBrackets.tsx líneas 217-231

1. Limitar slider a rango seguro:
   min={-200}  // Antes: -500
   max={200}   // Antes: +500

2. Agregar UX guidance:
   "💡 Zona segura: ±100px (recomendado)"

3. Warning dinámico:
   {Math.abs(specificConfig.offsetY ?? 0) > 150 && (
     <p className="text-xs text-yellow-500 font-medium">
       ⚠️ Valores extremos pueden ocultar el encabezado
     </p>
   )}

Resultado Fase 1:
  ✅ Previene configuraciones extremas
  ✅ Guía al usuario hacia zona segura
  ⚠️ PERO NO fue suficiente para resolver completamente
```

---

##### Problema Secundario: Centrado Vertical en 4B2

**Descubrimiento**:
```yaml
Después de limitar slider en 4B1:
  - Header ahora visible
  - PERO bracket TOP16 no centrado verticalmente (como TOP8)
  - Bracket se movía HACIA ABAJO
  - Aparecía scroll interno (no deseado)
```

**Análisis Dual (Claude + Codex)**:
```yaml
Finding Claude:
  - paddingBottom: 64px descentra brackets pequeños
  - Con TOP16 scale 0.54, padding empuja centro hacia arriba
  - Bracket aparece visualmente más abajo

Finding Codex:
  - SVG @g-loot/react-tournament-brackets deja "colchón vacío" arriba
  - Diseñado para 4 rondas pero con espaciado interno
  - Incluso con offsetY=0, SVG tiene espacio superior
  - Requiere CENTRADO DINÁMICO basado en medición real

Consenso:
  - El problema NO se resuelve SOLO en 4B1 (config source)
  - Requiere colaboración con 4B2 (renderer)
  - offsetY estático NO es suficiente
  - Necesario: cálculo matemático dinámico en 4B2
```

**Solución Fase 2 (Híbrida 4B1 + 4B2)**:
```yaml
En 4B1 (Config Source):
  - Límites seguros del slider: ±200px ✅
  - Zona segura recomendada: ±100px ✅
  - Warning UX para valores > 150px ✅
  - bracketScale sugerido: 0.54 (en LibraryBracketTOP16)

En 4B2 (Renderer):
  - useLayoutEffect para medir SVG real ✅
  - getBBox() para obtener altura renderizada ✅
  - Cálculo dinámico: shift = (available - rendered) / 2 ✅
  - paddingTop dinámico aplicado ✅
  - overflow: hidden para prevenir scroll ✅

Resultado Final:
  ✅ TOP8 y TOP16 ambos centrados perfectamente
  ✅ Sin scroll interno
  ✅ Header visible en todos los zoom levels
  ✅ Responsive a diferentes tamaños de viewport
```

---

##### Learnings Críticos para 4B1

**1. Config Source vs Renderer**:
```yaml
4B1 es CONFIG SOURCE:
  - Define límites seguros (min/max slider)
  - Proporciona guidance UX al usuario
  - Escribe offsetY a Firestore layoutConfig
  - Preview con demoMode={true}

4B2 es RENDERER:
  - Lee offsetY desde Firestore
  - Aplica centrado dinámico adicional
  - Renderiza con datos reales
  - demoMode={false}

Colaboración:
  4B1 configura → Firebase → 4B2 renderiza + ajusta dinámicamente
```

**2. Zona Segura del Slider**:
```yaml
Rango completo: -200 a +200px
Zona segura: ±100px (recomendado en UX)
Zona de warning: > 150px (amarillo)
Zona crítica: > 200px (bloqueado por slider)

Razón:
  - Brackets tienen headers de 80-120px típicamente
  - offsetY extremo + scale puede empujar header fuera
  - ±100px es suficiente para 99% de ajustes visuales
```

**3. Preview vs Live**:
```yaml
isPreview prop crítico:
  4B1: isPreview={true}
    - Mock battles
    - Editable
    - No responde a control remoto 3A

  4B2: isPreview={false}
    - Real battles
    - Read-only
    - Responde a control remoto 3A

Diferencia en rendering:
  - 4B1 puede tener centrado aproximado (preview)
  - 4B2 DEBE tener centrado exacto (live)
  - offsetY configurado en 4B1, refinado en 4B2
```

**4. Arquitectura de 3 Niveles en Debugging**:
```yaml
Cuando bug afecta SUB-SUB-NODO:
  ✅ Notación correcta: 4B1.TabBrackets.TOP16
  ❌ Notación incorrecta: "4B1 y TOP16"

Importancia:
  - Clarifica DÓNDE exactamente está el bug
  - Evita confusión entre niveles
  - Facilita debugging multi-capa
  - Permite pensar arquitectónicamente (no solo código)
```

---

##### Iteraciones del Debugging

**Iteración 1**: FALLO
- Cambio: bracketScale 0.54 + overflow:visible en 4B2
- Resultado: Bracket movido hacia abajo
- Reset: git reset --hard 39acb60 (COMMIT BASE)

**Iteración 2**: FALLO
- Pre-cambio: Reset offsetY=0 manualmente en 4B1
- Cambio: Mismos cambios de iteración 1
- Resultado: Bracket aún movido hacia abajo
- Reset: git reset --hard 39acb60 (COMMIT BASE)

**Iteración 3**: ÉXITO
- Approach: Claude + Codex Dual Analysis
- Cambios: Combinación 4B1 (limits) + 4B2 (dynamic centering)
- Resultado: ✅ Funcionamiento perfecto

---

##### Transacción Híbrida

**Tipo**: Tipo 6 CONVERGENCIA + Tipo 2 RENDER

```yaml
Flujo completo:
  1. Usuario configura en 4B1.TabBrackets.TOP16:
     - offsetY = -50px (dentro de zona segura)
     - winnerColor = "cyan"
     - showDemoWinners = true

  2. 4B1 escribe a Firebase layoutConfig:
     - libraryBracketTOP16.offsetY = -50

  3. 4B2 lee de Firebase (Tipo 6):
     - onSnapshot layoutConfig
     - Obtiene offsetY = -50

  4. 4B2 calcula dinámicamente (Tipo 2):
     - useLayoutEffect mide SVG con getBBox()
     - Calcula shift para centrado perfecto
     - Aplica paddingTop dinámico

  5. Resultado:
     - Bracket centrado vertical
     - Header visible
     - Sin scroll interno
```

---

##### Archivos Impactados en 4B1

**Directo**:
```yaml
src/components/projector/setup/TabBrackets.tsx:
  - Líneas 217-231: Slider offsetY con límites ±200px
  - Línea 225: "Zona segura: ±100px" helper text
  - Líneas 227-231: Warning amarillo para valores > 150px
```

**Indirecto** (usado por 4B1):
```yaml
src/components/event/LibraryBracketTOP16.tsx:
  - Línea 62: bracketScale 0.54
  - Recibe isPreview={true} desde TabBrackets
```

**Config escrita por 4B1**:
```yaml
Firestore: events/[eventId]/layoutConfig
  libraryBracketTOP16:
    offsetY: number (-200 a +200)
```

---

##### Estado Actual (Post-Fix)

```yaml
Estado: ✅ COMPLETAMENTE FUNCIONAL

En 4B1.TabBrackets.TOP16:
  ✅ Slider limitado a ±200px (safe range)
  ✅ Zona segura ±100px visible en UI
  ✅ Warning amarillo para valores extremos (> 150px)
  ✅ Helper text guía al usuario
  ✅ Preview funciona con demoMode={true}
  ✅ Config persiste correctamente en Firebase

En 4B2.Live (consumer de config):
  ✅ Lee offsetY desde Firebase
  ✅ Aplica centrado dinámico adicional
  ✅ Bracket perfectamente centrado
  ✅ Header visible en todos los zoom levels
  ✅ Sin scroll interno

Validación:
  ✅ Testeo manual con zoom 50-200%
  ✅ Codex visual analysis (4 screenshots)
  ✅ Claude + Codex consenso
  ✅ Funcionamiento en eventos reales (ready para launch)

Documentación:
  ✅ ARTERIA_PROYECTOR_MULTICATEGORIA.md v2.0
  ✅ Nodo 3A-dashboard.md (perspectiva control remoto)
  ✅ Nodo 4B1-setup.md (config source - este archivo)
  ✅ Nodo 4B2-live.md (renderer + centrado dinámico)
```

---

##### Referencias Cruzadas

```yaml
Para profundizar:
  - Historia completa: ARTERIA_PROYECTOR_MULTICATEGORIA.md
  - Perspectiva 3A: 3A-dashboard.md § Debugging Histórico
  - Implementación 4B2: 4B2-live.md § Centrado Dinámico
  - Transacciones: tipo6-convergencia.md + tipo2-render.md
```

---

### 🏅 SUB-NODO 4: TabSponsors

#### Propósito
Configuración de logos y banners de sponsors.

#### Funcionalidad
```yaml
Gestión de sponsors:
  - Upload de logos
  - Posición (top/bottom/sidebar)
  - Tamaño
  - Orden de rotación
  - Duración de display

Formatos soportados:
  - PNG (transparencia)
  - JPG
  - SVG (recomendado)
```

#### Firestore Writes
```yaml
Escribe en: events/[eventId]/projectorConfig

Campos:
  sponsors: [
    {
      id: string
      name: string
      logoUrl: string (Firebase Storage)
      position: "top" | "bottom" | "sidebar"
      size: "small" | "medium" | "large"
      order: number
      duration: number (ms)
    }
  ]
```

#### Storage Integration
```yaml
Upload:
  - Path: /events/[eventId]/sponsors/
  - Compresión automática
  - Validación de tamaño (max 2MB)
  - Obtener downloadURL
```

#### Componente
```typescript
// src/components/projector/setup/TabSponsors.tsx
```

---

## 🔗 Comunicación con Otros Nodos

### 4B1 ← 3A Dashboard (Recibe Control)

```yaml
Tipo: Lectura pasiva (4B1 lee, NO escribe desde control 3A)

Flujo:
  3A.Battles escribe → Firestore projectorConfig
  4B1 escucha → onSnapshot
  4B1 NO modifica → Solo preview

Campos leídos:
  - activeView (para saber qué mostrar en preview)
  - brackets.activeTemplate (TOP8 o TOP16)

Nota: 4B1 es SETUP, no responde a control remoto activamente
      Solo muestra preview de lo que se verá en 4B2
```

### 4B1 → 4B2 Live (Envía Configuración)

```yaml
Tipo: Configuración compartida via Firestore (Transacción Tipo 6 CONVERGENCIA)

Flujo:
  4B1 configura → Escribe Firestore layoutConfig
  4B2 lee → onSnapshot en tiempo real
  4B2 aplica → Configuración en vivo

Campos compartidos:
  - libraryBracket (sharedConfig: colors, demo, animation)
  - libraryBracketTOP16 (specificConfig: offsetY)
  - libraryBracketTOP8 (specificConfig futuro)

Diferencia clave:
  4B1: demoMode={true}, isPreview={true}
  4B2: demoMode={false}, isPreview={false}

Meta-agente coordinador:
  dashboard-projector-sync-master.md
```

---

## 🎨 Uso de LibraryBracket (Router Component)

**IMPORTANTE**: TabBrackets usa `LibraryBracket` como router.

```typescript
// src/components/event/LibraryBracket.tsx

// Auto-detecta tipo según targetParticipants
if (targetParticipants === 16) {
  return <LibraryBracketTOP16 {...props} isPreview={isPreview} />
}
if (targetParticipants === 8) {
  return <LibraryBracketTOP8 {...props} />
}

// Fallback a TOP8
return <LibraryBracketTOP8 {...props} />
```

### Props Forwarding

```yaml
TabBrackets → LibraryBracket → LibraryBracketTOP16

Props críticos:
  - battles (mock en 4B1, real en 4B2)
  - categoryName ("TOP 16")
  - eventId
  - createdBy
  - demoMode (true en 4B1, false en 4B2)
  - winnerColor ("cyan" | "pink")
  - targetParticipants (8 o 16)
  - isPreview (true en 4B1, false en 4B2) ← CRÍTICO
  - specificConfig.offsetY (configurado en 4B1, aplicado en 4B2)
```

---

## 🔥 Firestore Schema para 4B1

```yaml
Colección principal:
  events/[eventId]/layoutConfig

Estructura completa:
  {
    // Shared Config (común a todos los brackets)
    libraryBracket: {
      winnerColor: "cyan" | "pink"
      showDemoWinners: boolean
      connectorOpacity: number
      roundHeaderVisible: boolean
      animationSpeed: "slow" | "medium" | "fast"
    }

    // Specific Config TOP16
    libraryBracketTOP16: {
      offsetY: number  // -200 a +200 (safe range)
    }

    // Specific Config TOP8 (futuro)
    libraryBracketTOP8: {
      offsetY: number
    }

    // Timestamp
    updatedAt: serverTimestamp()
  }
```

---

## 🎯 Debugging Jerarquía de 3 Niveles

### Notación para Bug Reports

```yaml
Formato correcto:
  4B1.TabBrackets.TOP16

NO correcto:
  "4B1 y TOP16" (parecen nodos separados)
  "TabBrackets y TOP16" (sin contexto de nodo padre)

Ejemplo bug resuelto (Oct 29, 2025):
  Ubicación: 4B1.TabBrackets.TOP16 (config source)
  Síntoma: Tab bar oculta a 100% zoom, visible a 50% zoom
  Root cause: Slider permitía offsetY=-500px
  Fix: Limitar slider a -200/+200px
  Validación: Codex visual analysis
  Documentación: ARTERIA_PROYECTOR_MULTICATEGORIA.md
```

---

## 🧩 Diferencia Crítica con 4B2

```yaml
4B1 (Setup/Preview):
  ✅ URL: /public/event/[eventId]/setup
  ✅ Modo: Preview/Configuración
  ✅ Datos: Mock battles (demoMode={true})
  ✅ isPreview: {true}
  ✅ Editable: SÍ (usuario configura)
  ✅ Control remoto 3A: NO (solo preview)

4B2 (Live/Proyector):
  ✅ URL: /public/event/[eventId]/live
  ✅ Modo: Live/Proyección
  ✅ Datos: Real battles (demoMode={false})
  ✅ isPreview: {false}
  ✅ Editable: NO (read-only)
  ✅ Control remoto 3A: SÍ (responde a cambios)

SON NODOS SEPARADOS:
  - URLs diferentes
  - Comunicación vía Firestore (Tipo 6 CONVERGENCIA)
  - NO son tabs de la misma página
  - Config flows 4B1 → Firebase → 4B2
```

---

## 📚 Referencias

### Documentación Relacionada
- **Transacción**: `.claude/DAKCHAIN/transacciones/tipo6-convergencia.md`
- **Meta-agente**: `.claude/DAKCHAIN/meta-agentes/dashboard-projector-sync-master.md`
- **Arteria**: `.claude/DAKCHAIN/arterias/ARTERIA_PROYECTOR_MULTICATEGORIA.md`
- **Nodo 3A**: `.claude/DAKCHAIN/nodos/3A-dashboard.md`
- **Nodo 4B2**: `.claude/DAKCHAIN/nodos/4B2-live.md`

### Archivos Críticos
- `src/components/projector/setup/TabBrackets.tsx` (config source)
- `src/components/event/LibraryBracketTOP16.tsx` (renderer)
- `src/components/event/LibraryBracket.tsx` (router)

---

## 📊 Conclusión

**4B1 Setup** es el **ÚNICO NODO con 3 niveles de jerarquía**.

```yaml
Importancia arquitectónica:
  ✅ NIVEL 1: Nodo único (/setup)
  ✅ NIVEL 2: 4 SUB-NODOS (tabs)
  ✅ NIVEL 3: SUB-SUB-NODOS en TabBrackets (TOP8, TOP16)

Complejidad:
  - Más profundo que 3A (2 niveles)
  - Más profundo que 4B2 (1 nivel)
  - Requiere notación específica para debugging

Rol en sistema:
  - Preview de 4B2
  - Configuración de templates
  - Testing visual pre-live
  - Convergencia Tipo 6 (recibe de 3A, envía a 4B2)

Bugs históricos:
  ✅ TOP16 tab bar oculta (Oct 29, 2025) - RESUELTO
```

---

**Última actualización**: Octubre 29, 2025
**Creado por**: Patricio + Claude
**Keywords**: 4B1, setup, preview, brackets, top16, offsetY, 3 niveles, jerarquía
**Bug resuelto**: Slider offsetY extremo (-500px) → Limitado a ±200px
**Approach**: Claude Codex Tandem + Codex visual analysis

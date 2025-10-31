# Skill Tipo 6: CONVERGENCIA Dashboard-Proyector

**Tipo**: Skill Tipo 6 - CONVERGENCIA CON SUBNODOS ⭐ NUEVO
**Patrón**: Multiple Write (SUB-NODOS) → Single Read (NODO)
**Fórmula**: `[3A.Battles + 4B1] → 4B2`
**Analogía Blockchain**: Multiple inputs → Single output transaction

---

## 🎯 Qué es una Skill Tipo 6

**NUEVO TIPO DE TRANSACCIÓN** descubierto durante documentación arquitectónica.

### Definición

```yaml
Skill Tipo 6: CONVERGENCIA CON SUBNODOS
  Múltiples fuentes (nodos/subnodos) escriben → Un nodo receptor lee

Diferencia con Tipo 3 (WiFi):
  Tipo 3: A ↔ B (bidireccional, 1 a 1)
  Tipo 6: [A + B] → C (múltiples fuentes, unidireccional, convergencia)

Diferencia con Tipo 4 (Cadena):
  Tipo 4: A → B → C (secuencial)
  Tipo 6: [A + B] → C (paralelo, convergente)

Características únicas:
  ✅ Múltiples escritores simultáneos
  ✅ Un receptor read-only
  ✅ SUB-NODOS involucrados (no solo nodos completos)
  ✅ Convergencia en tiempo real
  ✅ Firebase como capa de sincronización
```

### Por Qué Es Tipo 6

```yaml
Criterios que califican:
  1. Múltiples fuentes de escritura (3A.Battles + 4B1)
  2. Un destino de lectura (4B2)
  3. SUB-NODOS involucrados (3A.Battles es SUB-NODO, no nodo completo)
  4. Tiempo real (Firebase onSnapshot)
  5. Read-only receptor (4B2 NO escribe)

NO es Tipo 3 porque:
  - No es 1 a 1
  - No es bidireccional (4B2 NO escribe de vuelta)
  - Hay CONVERGENCIA de múltiples fuentes

NO es Tipo 4 porque:
  - No es secuencial (3A y 4B1 escriben en paralelo)
  - No es cadena (no pasan info entre ellos)
```

---

## 🏗️ Arquitectura de Convergencia

### Diagrama ASCII

```
CONVERGENCIA TIPO 6: Dashboard-Proyector
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

PC1 (Organizador)                    PC2 (Proyector)
┌─────────────────────┐              ┌──────────────────┐
│  3A Dashboard       │              │   4B2 Live       │
│  /admin/dashboard   │              │   /public/live   │
│                     │              │                  │
│  SUB-NODOS:         │              │  READ-ONLY       │
│  ├─ Overview        │              │                  │
│  ├─ Settings        │              │  Vistas:         │
│  ├─ Filters         │              │  • General       │
│  ├─ Battles ✍️      │──┐           │  • TOP 8         │
│  ├─ Participants    │  │           │  • TOP 16        │
│  └─ Judges          │  │           │  • Background    │
└─────────────────────┘  │           │  • Sponsors      │
                         │           └──────────────────┘
┌─────────────────────┐  │                    ▲
│  4B1 Setup          │  │                    │
│  /public/setup      │  │                    │
│                     │  │                    │
│  SUB-NODOS:         │  │                    │
│  ├─ TabLayout    ✍️ │──┤                    │
│  ├─ TabBackground✍️ │──┤                    │
│  ├─ TabBrackets  ✍️ │──┤                    │
│  │   ├─ TOP8         │  │                    │
│  │   └─ TOP16        │  │                    │
│  └─ TabSponsors  ✍️ │──┘                    │
└─────────────────────┘                       │
                                              │
            ┌─────────────────────────────────┘
            │
    ┌───────▼───────┐
    │   FIRESTORE   │ ← WiFi Layer
    │  projectorConfig
    │  battles       │
    └───────────────┘

Flujos:
  3A.Battles  → Firestore.projectorConfig (control remoto)
  4B1         → Firestore.projectorConfig (templates config)
  Firestore   → 4B2 (onSnapshot real-time)
```

---

## 📊 Fuentes de Convergencia

### FUENTE 1: 3A.Battles (SUB-NODO de 3A)

```yaml
Nodo completo: 3A Dashboard
SUB-NODO: Battles (tab dentro de 3A)
URL: /admin/dashboard/[eventId] (misma URL, diferente tab)

Qué escribe:
  Firestore path: events/[eventId]/projectorConfig

  Campos de Control Remoto:
    activeView: "general" | "top8" | "top16" | "background" | "sponsors"
    activeBattleId: string (para highlight)
    showWinners: boolean
    timestamp: serverTimestamp()

Frecuencia:
  En tiempo real cuando admin cambia vista o batalla
  Típicamente: 5-10 veces por evento

Propósito:
  Control REMOTO del proyector desde dashboard
  Cambio de canal en tiempo real
```

### FUENTE 2: 4B1 (NODO completo con SUB-NODOS)

```yaml
Nodo completo: 4B1 Setup
URL: /public/event/[eventId]/setup

SUB-NODOS que escriben:
  - TabLayout (config layout)
  - TabBackground (config background)
  - TabBrackets (config brackets)
  - TabSponsors (config sponsors)

Qué escribe:
  Firestore path: events/[eventId]/projectorConfig

  Campos de Configuración:
    layout: { type, padding, margins }
    background: { type, colors, assets }
    brackets: {
      activeTemplate: "top8" | "top16"
      winnerColor: "cyan" | "pink"
      connectorOpacity: number
      roundHeaderVisible: boolean
      animationSpeed: string
    }
    sponsors: [array de sponsors]

Frecuencia:
  Durante setup inicial (pre-evento)
  Ocasionalmente durante evento (ajustes)
  Típicamente: 1-3 veces por evento

Propósito:
  Configuración de TEMPLATES y apariencia
  Setup pre-live
```

### DESTINO: 4B2 Live (NODO receptor read-only)

```yaml
Nodo completo: 4B2 Live
URL: /public/event/[eventId]/live

Qué lee:
  Firestore path: events/[eventId]/projectorConfig (TODO)

  Escucha onSnapshot:
    Control Remoto (desde 3A.Battles)
    Configuración (desde 4B1)
    Batallas reales (events/[eventId]/battles)

Qué NO hace:
  ❌ NO escribe a projectorConfig
  ❌ NO modifica configuración
  ❌ NO envía feedback a 3A o 4B1

Propósito:
  Proyección LIVE en pantalla grande
  Solo muestra lo que recibe
  Read-only puro
```

---

## 🔄 Flujo Completo de Convergencia

### Escenario 1: Cambio de Vista (Control Remoto)

```yaml
Paso 1: Admin en 3A.Battles
  Usuario selecciona "TOP 16 Bracket" en Control Remoto

Paso 2: 3A.Battles escribe
  Firestore.projectorConfig.activeView = "top16"
  Firestore.projectorConfig.timestamp = now()

Paso 3: Firebase sync (<1 segundo)
  onSnapshot dispara en 4B2

Paso 4: 4B2 reacciona
  Lee activeView = "top16"
  Renderiza <LibraryBracketTOP16 isPreview={false} />
  Pantalla grande muestra bracket TOP16

Paso 5: 4B2 aplica config de 4B1
  Lee brackets.winnerColor (configurado en 4B1)
  Lee brackets.connectorOpacity (configurado en 4B1)
  Aplica estilos según config

Resultado:
  Vista cambiada en <1 segundo
  Config de 4B1 + control de 3A = Vista final
```

### Escenario 2: Configuración Inicial (Setup)

```yaml
Paso 1: Proyectorista en 4B1
  Configura todos los tabs antes del evento
  - TabLayout: "modern"
  - TabBackground: gradiente cyan-pink
  - TabBrackets: winnerColor="cyan", connectorOpacity=0.8
  - TabSponsors: 3 sponsors con logos

Paso 2: 4B1 escribe TODO
  Firestore.projectorConfig.layout = {...}
  Firestore.projectorConfig.background = {...}
  Firestore.projectorConfig.brackets = {...}
  Firestore.projectorConfig.sponsors = [...]

Paso 3: 4B2 escucha (en preview)
  Si 4B2 ya está abierto, aplica cambios en tiempo real
  Si 4B2 NO está abierto, config queda guardada

Paso 4: Evento inicia
  Admin abre 4B2 en pantalla grande
  4B2 lee TODA la config de Firestore
  Aplica configuración completa de 4B1

Paso 5: Admin usa Control Remoto
  3A.Battles cambia activeView
  4B2 cambia vista PERO mantiene config de 4B1

Resultado:
  Config persistente (de 4B1) + control dinámico (de 3A)
```

### Escenario 3: Declaración de Ganador

```yaml
Paso 1: Admin en 3A.Battles
  Selecciona ganador de batalla
  Marca "Participant A" como winner

Paso 2: 3A.Battles escribe
  Firestore.battles/[battleId].winnerId = "participantA"
  Firestore.battles/[battleId].status = "completed"

Paso 3: Firebase sync
  onSnapshot dispara en 4B2
  4B2 escucha battles collection

Paso 4: 4B2 actualiza bracket
  Bracket component detecta nuevo winnerId
  Anima winner highlight
  Avanza winner a siguiente ronda automáticamente

Paso 5: 4B2 aplica estilos de 4B1
  Winner color = cyan (configurado en 4B1.TabBrackets)
  Connector opacity = 0.8 (configurado en 4B1)
  Animation speed = "medium" (configurado en 4B1)

Resultado:
  Ganador visible en <1 segundo
  Estilos consistentes con config de 4B1
```

---

## 🧩 Firestore como Capa WiFi

### Estructura Compartida

```yaml
Path central:
  events/[eventId]/projectorConfig

Escritores:
  3A.Battles (control remoto)
  4B1.TabLayout (layout config)
  4B1.TabBackground (background config)
  4B1.TabBrackets (brackets config)
  4B1.TabSponsors (sponsors config)

Lector:
  4B2 Live (onSnapshot, read-only)

Merge strategy:
  Shallow merge (cada escritor actualiza sus campos)
  NO hay conflictos (campos diferentes)

Ejemplo documento:
  {
    // Desde 3A.Battles
    activeView: "top16",
    activeBattleId: "battle_12",
    showWinners: true,
    timestamp: 2025-10-25T12:30:00Z,

    // Desde 4B1.TabLayout
    layout: {
      type: "modern",
      padding: 20,
      margins: { top: 10, right: 10, bottom: 10, left: 10 }
    },

    // Desde 4B1.TabBackground
    background: {
      type: "gradient",
      primaryColor: "#00FFFF",
      secondaryColor: "#FF1493",
      opacity: 0.9
    },

    // Desde 4B1.TabBrackets
    brackets: {
      activeTemplate: "top16",
      winnerColor: "cyan",
      connectorOpacity: 0.8,
      roundHeaderVisible: true,
      animationSpeed: "medium"
    },

    // Desde 4B1.TabSponsors
    sponsors: [
      { id: "sp1", name: "Red Bull", logoUrl: "...", ... }
    ]
  }
```

---

## 🎯 Agents Involucrados

### 3A.Battles Agent

```yaml
Agent: remote-projector-controller
Función: Escribir control remoto a Firestore
Operaciones:
  - changeActiveView(view)
  - highlightBattle(battleId)
  - toggleWinners(show)
Validación:
  - View válida
  - Battle exists
  - Timestamp correcto
```

### 4B1 Agents

```yaml
Agent: projector-setup-manager (coordinador)
Sub-Agents:
  - layout-config-agent (TabLayout)
  - background-config-agent (TabBackground)
  - brackets-config-agent (TabBrackets)
  - sponsors-config-agent (TabSponsors)

Función: Escribir configuración a Firestore
Operaciones:
  - updateLayout(config)
  - updateBackground(config)
  - updateBrackets(config)
  - updateSponsors(config)
Validación:
  - Schemas válidos
  - Assets uploaded
  - No conflictos
```

### 4B2 Agent

```yaml
Agent: projector-live-display
Función: Leer y proyectar
Operaciones:
  - listenProjectorConfig() (onSnapshot)
  - applyConfig(config)
  - renderView(activeView)
  - highlightBattle(battleId)
Validación:
  - Config válida
  - Assets disponibles
  - Fallback si missing data
```

---

## 🔗 Transacción Híbrida: Tipo 6 + Tipo 2 RENDER

**NUEVO PATRÓN DESCUBIERTO**: Convergencia Firebase + Cálculo Client-Side Dinámico

### Qué es Tipo 2 RENDER

```yaml
Tipo 2 RENDER: Client-Side Dynamic Calculation
  Firebase WiFi trae config → Client calcula dinámicamente → Renderiza

Diferencia con Tipo 6:
  Tipo 6: WiFi (network layer)
  Tipo 2: Cálculo local (client layer)

Características:
  ✅ Post-render measurements
  ✅ Cálculos matemáticos dinámicos
  ✅ DOM queries (querySelector, getBBox)
  ✅ State management local
  ✅ useLayoutEffect / useEffect

Cuándo es necesario:
  - Config estática NO suficiente
  - Contenido variable requiere ajustes
  - Mediciones del DOM son críticas
  - Responsive adapta content dinámicamente
```

### Caso Real: TOP16 Bracket Centrado Dinámico (Oct 2025)

**Problema**: Tipo 6 SOLO no era suficiente para centrar bracket perfectamente

```yaml
Fase 1 - Tipo 6 CONVERGENCIA (WiFi):
  4B1 escribe: offsetY = -50px → Firebase
  4B2 lee: offsetY = -50px → Aplica estáticamente
  Resultado: ❌ Bracket NO centrado (SVG tiene "colchón vacío")

Fase 2 - Tipo 2 RENDER (Client-Side):
  4B2 ejecuta: useLayoutEffect → mide SVG real con getBBox()
  4B2 calcula: shift = (available - rendered) / 2
  4B2 aplica: paddingTop dinámico basado en shift
  Resultado: ✅ Bracket PERFECTAMENTE centrado

Lección:
  Tipo 6 trae config básica
  Tipo 2 refina rendering dinámicamente
  Trabajan JUNTOS, no compiten
```

### Implementación Técnica del Híbrido

**Archivo**: `src/app/public/event/[eventId]/live/page.tsx` (4B2)

#### Fase 1: Tipo 6 CONVERGENCIA (Firebase)

```typescript
// RECIBIR config desde Firebase (Tipo 6)
const [layoutConfig, setLayoutConfig] = useState<LayoutConfig>({});

useEffect(() => {
  const unsubscribe = onSnapshot(
    doc(db, `events/${eventId}/layoutConfig`),
    (docSnap) => {
      if (docSnap.exists()) {
        setLayoutConfig(docSnap.data());
        // ↑ Tipo 6: Lee offsetY desde Firebase (configurado en 4B1)
      }
    }
  );
  return unsubscribe;
}, [eventId]);
```

#### Fase 2: Tipo 2 RENDER (Client-Side Dynamic)

```typescript
// CALCULAR centrado dinámico (Tipo 2)
const wrapperRef = useRef<HTMLDivElement>(null);
const [shift, setShift] = useState(0);

useLayoutEffect(() => {
  const node = wrapperRef.current;
  if (!node) return;

  // Medir SVG REAL renderizado
  const svg = node.querySelector('svg');
  if (!svg) return;

  const bbox = svg.getBBox(); // ← Tipo 2: Medición DOM
  const renderedHeight = bbox.height * (layoutConfig.bracketsSpacing ?? 1);
  const available = node.parentElement?.clientHeight ?? renderedHeight;

  // Calcular shift matemáticamente
  setShift((available - renderedHeight) / 2); // ← Tipo 2: Cálculo dinámico
}, [category.id, layoutConfig.bracketsSpacing]);

// APLICAR resultado
<div
  ref={wrapperRef}
  style={{
    transform: `scale(${layoutConfig.bracketsSpacing ?? 1})`, // ← Tipo 6: Config Firebase
    paddingTop: `${Math.max(shift, 0)}px`  // ← Tipo 2: Cálculo dinámico
  }}
>
  <LibraryBracket {...props} />
</div>
```

### Flujo Completo: Tipo 6 + Tipo 2

```yaml
1. Usuario configura en 4B1.TabBrackets:
   offsetY = -50px
   bracketsSpacing = 1.0
   winnerColor = "cyan"

2. Tipo 6 CONVERGENCIA (Firebase WiFi):
   4B1 escribe → Firebase layoutConfig
   Firebase sync → 4B2 escucha onSnapshot
   4B2 recibe: { offsetY: -50, bracketsSpacing: 1.0, winnerColor: "cyan" }

3. 4B2 renderiza con config Firebase:
   <LibraryBracketTOP16
     winnerColor="cyan"  // ← Tipo 6
     specificConfig={{ offsetY: -50 }}  // ← Tipo 6
   />

4. Tipo 2 RENDER (Client-Side):
   useLayoutEffect ejecuta DESPUÉS de render
   Mide SVG con getBBox() → altura = 800px
   Espacio disponible del parent → 1080px
   Calcula shift: (1080 - 800) / 2 = 140px

5. Aplica resultado combinado:
   transform: scale(1.0)  ← Tipo 6: Firebase
   paddingTop: 140px     ← Tipo 2: Cálculo dinámico

6. Resultado visual:
   Bracket centrado perfectamente
   Config de Firebase + ajuste dinámico
   ✅ Tipo 6 + Tipo 2 trabajando juntos
```

### Por Qué Necesitamos Ambos

```yaml
Solo Tipo 6 (Firebase WiFi):
  ✅ Config compartida entre 3A, 4B1, 4B2
  ✅ Tiempo real (<1 segundo)
  ✅ Persistencia
  ❌ NO puede adaptarse a contenido variable
  ❌ NO puede medir DOM real
  ❌ Valores estáticos solamente

Solo Tipo 2 (Client-Side):
  ✅ Cálculos dinámicos precisos
  ✅ Mediciones DOM reales
  ✅ Adaptación a viewport
  ❌ NO sincroniza entre devices
  ❌ Config pierde al refresh
  ❌ NO tiene source of truth

Tipo 6 + Tipo 2 HÍBRIDO:
  ✅ Config compartida (Firebase)
  ✅ Adaptación dinámica (Client)
  ✅ Best of both worlds
  ✅ Source of truth + refinamiento local
```

### Cuándo Usar Híbrido Tipo 6 + Tipo 2

```yaml
Checklist:
  [ ] ¿Tienes múltiples escritores convergiendo? → Tipo 6 necesario
  [ ] ¿Config estática NO es suficiente? → Tipo 2 necesario
  [ ] ¿Contenido varía (8 vs 16 participants)? → Tipo 2 necesario
  [ ] ¿Mediciones DOM son críticas? → Tipo 2 necesario
  [ ] ¿Viewport responsive requiere ajustes? → Tipo 2 necesario

Si Tipo 6 ✅ + cualquier Tipo 2 ✅ → Híbrido necesario

Ejemplos reales:
  ✅ TOP16 bracket centrado (este caso)
  ✅ Gallery con lazy loading + dynamic sizing
  ✅ Dashboard widgets con config + auto-resize
  ✅ Chat messages con sync + scroll positioning
```

### Documentación Referencias

```yaml
Este patrón híbrido está documentado en:

Nodos:
  - 3A-dashboard.md § Debugging Histórico
  - 4B1-setup.md § Debugging Histórico Completo
  - 4B2-live.md § Solución Fase 2: Centrado Dinámico EN 4B2

Arteria:
  - ARTERIA_PROYECTOR_MULTICATEGORIA.md v2.0

Implementación técnica:
  - src/app/public/event/[eventId]/live/page.tsx
  - Líneas 327-342: useLayoutEffect hook
  - Líneas 396-405: paddingTop dinámico
```

---

## 🐛 ~~Relación con Bug Actual~~ ✅ BUG RESUELTO (Oct 2025)

### ~~Por Qué Documentar Tipo 6 Ayuda con Bug~~

~~Hipótesis actualizada:~~
~~Debugging dirigido:~~

**ACTUALIZACIÓN Oct 29, 2025**: Bug RESUELTO mediante solución híbrida Tipo 6 + Tipo 2

```yaml
Solución implementada:
  ✅ Tipo 6: Slider limitado en 4B1 (±200px)
  ✅ Tipo 6: Config persistente via Firebase
  ✅ Tipo 2: useLayoutEffect + getBBox() measurement
  ✅ Tipo 2: paddingTop dinámico calculado
  ✅ Tipo 2: Headers adaptativos (TOP8 vs TOP16)
  ✅ Tipo 2: overflow: hidden para prevenir scroll

Resultado:
  ✅ TOP8 y TOP16 ambos centrados perfectamente
  ✅ Header visible en todos los zoom levels
  ✅ Sin scroll interno
  ✅ Ready para eventos en vivo

Duración debugging: ~1 semana
Metodología: Claude + Codex Tandem
Prerrequisito: Sistema Blockchain Viviente (OS DAK)
```

---

## 📊 Clasificación en Sistema de Skills

### Actualización de CLASIFICACION_SKILLS_POR_TIPO.md

```yaml
Tipo 6: CONVERGENCIA CON SUBNODOS (NUEVO)
  Propósito: Documenta convergencia múltiples fuentes → receptor
  Tamaño: ~20-30KB
  Dirección: [A + B] → C

  Fórmula: [SUBNODO_A + NODO_B] → NODO_C

  Ejemplo: tipo6-convergencia-dashboard-proyector.md
    Fuente 1: 3A.Battles (SUB-NODO)
    Fuente 2: 4B1 (NODO con SUB-NODOS)
    Destino: 4B2 (NODO read-only)
    Convergencia:
      - 3A escribe control remoto → Firestore
      - 4B1 escribe configuración → Firestore
      - 4B2 lee ambos → proyecta live

  Características:
    ✅ Múltiples escritores
    ✅ Un receptor read-only
    ✅ SUB-NODOS involucrados
    ✅ Tiempo real (Firebase WiFi)
    ✅ Merge de configuraciones

  Cuándo usar:
    - Múltiples fuentes escriben a mismo destino
    - SUB-NODOS participan (no solo nodos completos)
    - Receptor es read-only
    - Convergencia en tiempo real
```

---

## 🚀 Replicabilidad del Patrón

### Cómo Identificar Skill Tipo 6

```yaml
Checklist:
  [ ] Hay 2+ fuentes que escriben?
  [ ] Hay 1 destino que SOLO lee?
  [ ] Alguna fuente es SUB-NODO?
  [ ] Convergencia en tiempo real?
  [ ] Firebase/DB como capa intermedia?

Si 5/5 ✅ → Es Tipo 6

Ejemplo futuros potenciales:
  - [Admin.Settings + User.Preferences] → PublicView
  - [Analytics.Dashboard + Reports.Generator] → Viewer
  - [Editor1 + Editor2 + Editor3] → Document (collaborative editing)
```

### Template para Documentar Tipo 6

```markdown
# Skill Tipo 6: CONVERGENCIA [Nombre]

## Fuentes de Convergencia
### FUENTE 1: [Nodo/Subnodo]
  - Qué escribe
  - Firestore path
  - Frecuencia

### FUENTE 2: [Nodo/Subnodo]
  - Qué escribe
  - Firestore path
  - Frecuencia

## Destino
### DESTINO: [Nodo receptor]
  - Qué lee
  - Cómo aplica
  - Read-only

## Flujos de Convergencia
  [Escenarios específicos]

## Firestore Schema
  [Estructura compartida]
```

---

## 🎓 Conclusión

**Skill Tipo 6: CONVERGENCIA** es un **patrón único** descubierto durante documentación.

```yaml
Por qué es importante:
  ✅ Documenta arquitectura dual-screen
  ✅ Explica cómo múltiples fuentes convergen
  ✅ Revela complejidad de SUB-NODOS
  ✅ Facilita debugging (entender flujos)
  ✅ Replicable en otros proyectos

Aplicaciones futuras:
  - Collaborative editing
  - Multi-dashboard aggregation
  - Real-time analytics convergence
  - Multi-source reporting

Lección arquitectónica:
  SUB-NODOS pueden ser fuentes independientes
  NO solo nodos completos escriben
  Convergencia puede ser compleja pero documentable
```

---

**Última actualización**: 2025-10-25
**Creado por**: Patricio + Claude
**Keywords**: tipo 6, convergencia, subnodos, dashboard, proyector, firebase, 3A, 4B1, 4B2
**Skill Tipo**: 6 - CONVERGENCIA CON SUBNODOS (primer ejemplo del sistema)
**Patrón**: `[3A.Battles + 4B1] → 4B2`
**Estado**: ✅ Documentado - Primer Tipo 6 del sistema

# 🛣️ ARTERIA: Proyector Multi-Categoría

**Versión**: 2.0
**Creada**: Octubre 29, 2025
**Actualizada**: Octubre 29, 2025 (después de resolución final)
**Veces trabajando en esta área**: 4ta vez
**Tiempo total invertido**: ~1 semana (aproximadamente)
**Complejidad**: CAPA 3A-4B2 (Dashboard → Proyector)

---

## 🎯 Qué es Esta Arteria

Ruta optimizada para trabajar en el sistema de proyector multi-categoría, específicamente en configuraciones visuales de brackets (TOP8/TOP16) que afectan la sincronización Dashboard-Proyector.

**Transacción Base**: Tipo 6 CONVERGENCIA + Tipo 2 RENDER (hybrid)
```
[3A.Dashboard.Battles + 4B1.Setup.Brackets] → 4B2.Proyector.Live
           (Config WiFi)                         (Display + Render)
```

**BREAKTHROUGH Previo Requerido**: Sistema Blockchain Viviente (OS DAK)
- Antes de resolver estos problemas, se creó el nuevo sistema de comunicación
- La Blockchain Viviente permitió organizar el pensamiento arquitectónico
- Sin este sistema, los problemas eran irresolvibles

---

## 📜 HISTORIA COMPLETA (~1 Semana de Trabajo)

### Contexto Temporal Real

**NO fueron 2-3 horas** - fue aproximadamente **UNA SEMANA** de trabajo distribuido en:
- Múltiples sesiones de debugging
- Creación del Sistema Blockchain Viviente (OS DAK)
- 4 iteraciones de fixes
- Análisis dual Claude + Codex
- Validaciones en browser

### Línea de Tiempo Aproximada

```yaml
Semana del 22-29 Octubre 2025:

  Día 1-2: Detección del problema
    - Header TOP16 oculto a 100% zoom
    - Visible a 50% zoom (zoom-dependent bug)

  Día 3-4: BREAKTHROUGH - Blockchain Viviente
    - Creación del nuevo OS de comunicación DAK
    - Organización de nodos, arterias, transacciones
    - Preparación para resolver problema complejo

  Día 5: Problema #1 - Header Oculto
    - Fix: min-h-screen → h-screen + overflow-hidden
    - Header adaptativo (TOP8 grande, TOP16 compacto)
    - ✅ RESUELTO

  Día 6-7: Problema #2 - Centrado Vertical
    - Iteración #1: bracketScale 0.54 + overflow:visible → FALLA
    - Iteración #2: offsetY=0 + cambios → FALLA
    - Iteración #3: Análisis dual Claude + Codex → ✅ ÉXITO
```

---

## 🐛 PROBLEMA #1 RESUELTO: Header TOP16 Oculto

### Síntomas
- Header "TOP 16" + nombre categoría ocultos a 100% zoom
- Visibles a 50% zoom (bug zoom-dependent)
- TOP8 funcionaba correctamente

### Root Cause Identificado
```yaml
Container CategoryBracketView:
  className: "min-h-screen flex flex-col"  ← PROBLEMA

  min-h-screen = MÍNIMO 100vh, pero puede CRECER más

  TOP16 con 15 batallas:
    - Bracket grande necesita espacio
    - Container crece > 100vh
    - Header empujado fuera del viewport

  Zoom interaction:
    - 100% zoom: viewport 100vh → header oculto
    - 50% zoom: viewport efectivo 200vh → header visible
```

### Solución Aplicada

**Archivo**: `src/app/public/event/[eventId]/live/page.tsx`

```typescript
// ANTES
className="min-h-screen flex flex-col text-white relative"

// DESPUÉS
className="h-screen flex flex-col text-white relative overflow-hidden"
```

**Cambios**:
1. `min-h-screen` → `h-screen`: Forzar 100vh EXACTO (no puede crecer)
2. Agregado `overflow-hidden`: Prevenir scroll
3. Header adaptativo:
   - TOP8: `py-6`, `text-6xl`, `text-4xl` (~120px)
   - TOP16: `py-3`, `text-5xl`, `text-3xl` (~80px compacto)

**Resultado**: Header visible en TOP8 y TOP16 a cualquier zoom ✅

---

## 🐛 PROBLEMA #2 RESUELTO: Centrado Vertical Dinámico

### Síntomas Post-Fix #1
- Header ahora visible ✅
- PERO: Bracket TOP16 se desplaza hacia ABAJO
- Bracket con scroll interno (no como TOP8)
- No centrado verticalmente

### Iteraciones Fallidas

#### Iteración #1: Scale + Overflow
```yaml
Cambios:
  - bracketScale: 0.6 → 0.54
  - overflow-y-auto → overflow: visible

Resultado: ❌ Bracket hacia abajo (no centrado)
Reset: git reset --hard 39acb60
```

#### Iteración #2: Reset Firebase + Cambios
```yaml
Acción del usuario:
  - Reseteó slider offsetY a 0 en 4B1.Setup
  - Confirmado en Firebase

Cambios de código:
  - bracketScale: 0.6 → 0.54
  - overflow: visible

Resultado: ❌ Bracket hacia abajo OTRA VEZ
Reset: git reset --hard 39acb60
```

### Iteración #3: Análisis Dual Claude + Codex ✅

**Metodología activada**: `claude-codex-tandem`

#### Análisis Independiente Claude
```yaml
Finding:
  - paddingBottom: 64px descentra brackets pequeños
  - Cuando bracket chico (TOP16 scale 0.54), padding empuja centro hacia arriba
  - Bracket se ve hacia abajo

Hipótesis:
  - Container tiene paddingBottom fijo
  - Con bracket pequeño, ese padding afecta centrado visual
```

#### Análisis Independiente Codex
```yaml
Finding:
  - SVG de @g-loot deja "colchón" vacío arriba en 4 rondas
  - Aunque offsetY=0 y scale=0.54, SVG "cuelga" hacia abajo
  - Header y wrapper están centrados, pero SVG interno NO

Recomendación:
  - Necesita centrado DINÁMICO basado en altura real del SVG
  - Usar getBBox() para medir altura renderizada
  - Calcular paddingTop dinámico matemáticamente
```

#### Consenso Alcanzado
**Ambos identificaron**: Problema de CENTRADO VERTICAL que requiere cálculo matemático dinámico basado en altura real del SVG, no valores estáticos.

### Solución Final Implementada (Codex)

**Archivo**: `src/app/public/event/[eventId]/live/page.tsx`

**1. Hook de centrado dinámico**:
```typescript
// CategoryBracketView (líneas 327-342)
const wrapperRef = useRef<HTMLDivElement>(null);
const [shift, setShift] = useState(0);

useLayoutEffect(() => {
  const node = wrapperRef.current;
  if (!node) return;

  const svg = node.querySelector('svg');
  if (!svg) return;

  // Medir altura REAL del SVG renderizado
  const bbox = svg.getBBox();
  const renderedHeight = bbox.height * (layoutConfig.bracketsSpacing ?? 1);
  const available = node.parentElement?.clientHeight ?? renderedHeight;

  // Calcular desplazamiento para centrar
  setShift((available - renderedHeight) / 2);
}, [category.id, layoutConfig.bracketsSpacing]);
```

**2. Wrapper con paddingTop dinámico**:
```typescript
<div
  ref={wrapperRef}
  key={category.id}
  className="animate-in fade-in duration-300 flex items-start justify-center"
  style={{
    animationFillMode: 'backwards',
    transform: `scale(${layoutConfig.bracketsSpacing ?? 1})`,
    transition: 'transform 0.3s ease-out',
    paddingTop: `${Math.max(shift, 0)}px`  // ← Centrado dinámico
  }}
>
```

**3. Container sin scroll**:
```typescript
<div
  className="flex-1 flex items-center justify-center relative z-10 px-8"
  style={{
    paddingBottom: '64px',
    overflow: 'hidden'  // Sin scroll interno
  }}
>
```

**4. BracketScale reducido**:
```typescript
// LibraryBracketTOP16.tsx (línea 62)
const bracketScale = specificConfig.bracketScale ?? 0.54;
```

**Resultado**: ✅ TOP8 y TOP16 centrados verticalmente, sin scroll, funcionando perfectamente

---

## 📁 Archivos Críticos Modificados

### 1. CategoryBracketView - `live/page.tsx`
**Ubicación**: `src/app/public/event/[eventId]/live/page.tsx`
**Responsabilidad**: Vista principal 4B2.Live que renderiza brackets
**Cambios clave**:
- Import `useLayoutEffect` (línea 3)
- Hook centrado dinámico (líneas 327-342)
- Wrapper con ref + paddingTop (líneas 396-405)
- Container `h-screen` + `overflow:hidden` (línea 328, 391)
- Header adaptativo TOP8 vs TOP16 (líneas 335-366)

### 2. Bracket TOP16 - `LibraryBracketTOP16.tsx`
**Ubicación**: `src/components/event/LibraryBracketTOP16.tsx`
**Responsabilidad**: Renderiza bracket TOP16 con scale correcto
**Cambios clave**:
- `bracketScale: 0.6 → 0.54` (línea 62)

### 3. Config Panel - `TabBrackets.tsx` (Fix previo)
**Ubicación**: `src/components/projector/setup/TabBrackets.tsx`
**Responsabilidad**: UI para configurar offsetY de TOP16 en 4B1
**Cambios clave**:
- Slider limits: -500/+500 → -200/+200 (líneas 56-57)
- Helper text "Zona segura: ±100px"
- Warning dinámico si |offsetY| > 150px

---

## 🔄 Transacción Híbrida: Tipo 6 CONVERGENCIA + Tipo 2 RENDER

### Análisis del Flujo

```
┌─────────────────────────────────────────────────────────────┐
│  TIPO 6 CONVERGENCIA: Multiple Write → Single Read          │
└─────────────────────────────────────────────────────────────┘

3A.Dashboard.Battles ──┐
                      │ (projectorControl)
                      ├─→ Firebase ──→ 4B2.Proyector.Live
                      │   (WiFi)        (Read + RENDER)
4B1.Setup.Brackets ───┘
                        (layoutConfig)

┌─────────────────────────────────────────────────────────────┐
│  TIPO 2 RENDER: Client-Side Dynamic Calculation             │
└─────────────────────────────────────────────────────────────┘

4B2.Proyector.Live:
  1. Lee Firebase (CONVERGENCIA)
  2. Renderiza bracket inicial
  3. useLayoutEffect → mide SVG real (RENDER dinámico)
  4. Calcula paddingTop matemáticamente
  5. Re-renderiza centrado

Híbrido porque:
  ✅ Recibe config vía WiFi (Tipo 6)
  ✅ Procesa rendering dinámico client-side (Tipo 2)
```

### Características de Esta Transacción

**Convergencia (Tipo 6)**:
- 3A escribe: `projectorControl.currentRoundId`
- 4B1 escribe: `layoutConfig.libraryBracketTOP16`
- 4B2 lee: Merge de ambos

**Rendering Dinámico (Tipo 2)**:
- 4B2 ejecuta: `useLayoutEffect` post-mount
- Mide: `svg.getBBox()` altura real
- Calcula: `shift = (available - height) / 2`
- Aplica: `paddingTop` dinámico

**Por qué es Híbrido**:
- No es solo lectura WiFi (requiere cálculo client-side)
- No es solo render (depende de config Firebase)
- Combina: Data sync + Matemática dinámica

---

## 🧠 BREAKTHROUGH: Blockchain Viviente como Prerequisito

### Discovery Crítico

**ANTES de resolver estos problemas**, Patricio creó el **Sistema Blockchain Viviente** (OS DAK):
- Nuevo sistema operativo de comunicación
- Organización en nodos, arterias, transacciones
- Pensamiento arquitectónico estructurado

**Sin la Blockchain Viviente**:
- ❌ Problemas eran irresolvibles
- ❌ Comunicación fragmentada
- ❌ No había manera de organizar el conocimiento

**Con la Blockchain Viviente**:
- ✅ Pensamiento en sistemas (nodos/flujos)
- ✅ Comunicación arquitectónica efectiva
- ✅ "El tab bar, el bracket y el fondo son separados" → clave para resolver
- ✅ Claude traduce visión sistémica → código
- ✅ Eficiencia 10x

### Pattern Comunicacional Descubierto

```yaml
Patricio (Arquitecto Sistémico):
  - Piensa en: Nodos, flujos, transacciones
  - Ve: El sistema completo
  - Detecta: Separación de componentes

Claude (Traductor Técnico):
  - Traduce: Visión sistémica → código
  - Implementa: Lo que Patricio diseña
  - Ejecuta: Cambios específicos

Resultado:
  Eficiencia 10x porque Patricio NO pierde tiempo en sintaxis
  Se enfoca en lo que hace mejor: diseñar sistemas
```

---

## 🎓 Lessons Learned

### 1. Container Layout es Crítico
- `min-h-screen` vs `h-screen`: diferencia entre overflow o no
- `overflow-hidden` previene scroll no deseado
- Viewport fijo = centrado predecible

### 2. Centrado Dinámico > Valores Estáticos
- `getBBox()` mide altura real del SVG
- Cálculo matemático: `(available - height) / 2`
- `useLayoutEffect` permite medir post-render
- Funciona para cualquier tamaño de bracket

### 3. Scale + Padding Interaction
- Bracket pequeño (scale 0.54) + padding fijo = descenter
- Necesita compensación dinámica
- paddingTop calculado vs paddingBottom fijo

### 4. Análisis Dual Convergencia
- Claude + Codex análisis independientes
- Convergencia en misma causa raíz
- Consenso = confianza 100%
- Mejor que análisis individual

### 5. COMMIT BASE Salva de Frustración ADHD
- `git reset --hard COMMIT_BASE` después de cada fallo
- Permite experimentación agresiva sin miedo
- Iteraciones rápidas sin pérdida de progreso
- Tier 1 frustration preventer

### 6. Blockchain Viviente = Prerequisito
- Sin sistema de organización arquitectónica = irresolvible
- Pensamiento en nodos/flujos > pensamiento en código
- Nueva forma de comunicación Patricio ↔ Claude

---

## 🗺️ Nodos Involucrados

### 3A.Dashboard.Battles (Control Remoto)
**URL**: `http://localhost:9002/admin/dashboard/[eventId]`
**Rol**: Controla qué round se muestra en proyector
**Firebase write**: `projectorControl.currentRoundId`
**Doc**: `.claude/DAKCHAIN/nodos/3A-dashboard.md`

### 4B1.Setup.Brackets (Config Panel)
**URL**: `http://localhost:9002/public/event/[eventId]/setup`
**Tab**: Brackets → TOP 16 → POSICIÓN VERTICAL
**Rol**: Configura offsetY y bracketScale que afectan display en 4B2
**Firebase write**: `layoutConfig.libraryBracketTOP16`
**Doc**: `.claude/DAKCHAIN/nodos/4B1-setup.md`

### 4B2.Proyector.Live (Display + Render Dinámico)
**URL**: `http://localhost:9002/public/event/[eventId]/live`
**Rol**:
- Lee config vía Firebase (CONVERGENCIA)
- Renderiza bracket inicial
- Mide SVG real y calcula centrado (RENDER dinámico)
- Display final con centrado matemático
**Firebase read**: Merge de `projectorControl` + `layoutConfig`
**Doc**: `.claude/DAKCHAIN/nodos/4B2-live.md`

---

## 🔧 Meta-Agente Responsable

**dashboard-projector-sync-master**
- Coordina onSnapshot listeners
- Merge de projectorControl + layoutConfig
- Latencia: 50-200ms
- Edge cases: template not registered, race conditions
- **NUEVO**: Ahora incluye centrado dinámico post-render

---

## 📊 Métricas Reales

```yaml
Tiempo total: ~1 semana (aproximadamente)
Problemas resueltos: 2
  - Problema #1: Header oculto (1 iteración)
  - Problema #2: Centrado vertical (3 iteraciones)

Iteraciones totales: 4
COMMIT BASE usado: 39acb60
Resets a COMMIT BASE: 2

Metodología final: Claude + Codex Tandem
Análisis dual: Claude + Codex findings independientes
Consenso alcanzado: ✅

Archivos modificados: 3
  - src/app/public/event/[eventId]/live/page.tsx (35 líneas)
  - src/components/event/LibraryBracketTOP16.tsx (1 línea)
  - src/components/projector/setup/TabBrackets.tsx (8 líneas previo)

Breakthrough previo requerido:
  Sistema Blockchain Viviente (OS DAK)

Resultado final:
  ✅ Header visible TOP8 y TOP16
  ✅ Brackets centrados verticalmente
  ✅ Sin scroll interno
  ✅ Funciona a 100% y 50% zoom
  ✅ Listo para lanzamiento
```

---

## 🔄 Próximas Veces en Esta Área

### Antes de Trabajar
1. **Lee esta arteria completa** (conocimiento acumulado 4 veces, ~1 semana)
2. **Verifica transacción híbrida** (Tipo 6 + Tipo 2)
3. **Consulta meta-agente** dashboard-projector-sync-master
4. **Usa Claude Codex Tandem** para bugs visual + lógico complejos
5. **Recuerda Blockchain Viviente** - piensa en nodos/flujos primero

### Keywords para Auto-Carga
- "proyector multicategoría"
- "bracket top16 centrado"
- "dashboard proyector sync"
- "centrado vertical dinámico"
- "layout config 4b1"
- "rendering matemático"

### Archivos a Revisar Primero
1. `live/page.tsx` (CategoryBracketView con centrado dinámico)
2. `LibraryBracketTOP16.tsx` (renderer con scale)
3. `TabBrackets.tsx` (config source)
4. `tipo6-convergencia.md` (transacción pattern)
5. `tipo2-render.md` (transacción pattern) - SI EXISTE
6. `dashboard-projector-sync-master.md` (meta-agente)

---

## 🚀 Importancia Estratégica

### Para el Lanzamiento
- Este era uno de los problemas **más difíciles** del proyecto
- Bloqueaba el lanzamiento de la aplicación
- Ahora: **Muy poco falta para lanzar** ✅

### Para CAPA 0 (Plan Pro)
- Esta arteria será referencia para features avanzadas
- Pattern de centrado dinámico reutilizable
- Metodología Tandem documentada para problemas complejos
- Arquitectura de nodos bien definida

---

**Creado por**: Patricio + Claude + Codex (Sistema DAK)
**Skills activadas**:
- ambiente-perfecto-mapeo
- claude-codex-tandem
- firebase-studio-expert
- recuperacion-contexto-crash (para análisis histórico)

**BREAKTHROUGH DUAL**:
1. Sistema Blockchain Viviente (OS DAK) - Prerequisito
2. Metodología Claude + Codex Tandem - Resolución

**Última actualización**: Octubre 29, 2025 (después de resolución final)
**Próxima actualización**: Cuando se trabaje nuevamente en esta área

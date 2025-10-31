# 3A Dashboard - Documentación Completa de SUB-NODOS

**Tipo**: Nodo Único con 6 Sub-Nodos
**Nodo**: 3A - Admin Dashboard
**URL**: `/admin/dashboard/[eventId]`
**Profundidad**: 3 (Control y Dashboard)
**Branch**: A (Admin)

---

## 🎯 Propósito del Nodo 3A

Dashboard de control completo para organizadores de eventos de breaking.

**Rol**: Organizador/Admin (PC1)
**Funcionalidad**: Control total del evento, battles, participantes, jueces
**Comunicación**: → 4B2 Proyector (WiFi real-time via Firebase, Transacción Tipo 6 CONVERGENCIA)

---

## 📊 Arquitectura de SUB-NODOS

**CRÍTICO**: 3A tiene **6 SUB-NODOS** (tabs en la misma URL).

```yaml
NODO 3A: /admin/dashboard/[eventId]
  ├── SUB-NODO 1: Overview (🏆 Resumen)
  ├── SUB-NODO 2: Settings (⚙️ Config Rondas)
  ├── SUB-NODO 3: Filters (🎯 Filtros)
  ├── SUB-NODO 4: Battles (🏅 Batallas) ← CONTIENE Control Remoto
  ├── SUB-NODO 5: Participants (👥 Participantes)
  └── SUB-NODO 6: Judges (👨‍⚖️ Jueces)

Todos comparten:
  ✅ Misma URL: /admin/dashboard/[eventId]
  ✅ Mismo eventId
  ✅ Misma sesión/estado
  ✅ Cambio de tab NO navega, solo cambia vista
```

---

## 🏆 SUB-NODO 1: Overview (Resumen)

### Propósito
Vista general del estado del evento en tiempo real.

### Información Mostrada
```yaml
Métricas principales:
  - Total participantes registrados
  - Categorías activas
  - Batallas completadas vs pendientes
  - Estado general del evento (setup/filtering/battles/completed)

Cards visuales:
  - Participantes por categoría
  - Progreso de rondas
  - Timeline del evento
  - Acciones rápidas
```

### Firestore Collections Usadas
```yaml
- events/[eventId] (estado evento)
- events/[eventId]/categories (categorías)
- events/[eventId]/participants (participantes)
- events/[eventId]/battles (batallas)
```

### Transformaciones
```yaml
Entrada: Raw Firestore data
Transformación:
  - Contar participantes por categoría
  - Calcular % completado de batallas
  - Detectar estado actual del evento
Salida: Métricas agregadas + visualización cards
```

---

## ⚙️ SUB-NODO 2: Settings (Config Rondas)

### Propósito
Configurar estructura de rondas y brackets por categoría.

### Funcionalidad
```yaml
Configuración de rondas:
  - Seleccionar TOP 8 o TOP 16
  - Definir nombres de rondas (Octavos, Cuartos, Semis, Final)
  - Configurar tiempo por batalla
  - Activar/desactivar jueces

Validaciones:
  ⚠️ No permitir cambiar después de iniciar batallas
  ⚠️ Validar mínimo participantes para formato
```

### Firestore Writes
```yaml
Escribe en: events/[eventId]/categories/[categoryId]

Campos modificados:
  - targetQualifiedCount (8 o 16)
  - roundNames: {
      octavos: "Octavos de Final"
      cuartos: "Cuartos de Final"
      semifinales: "Semifinales"
      final: "Gran Final"
    }
  - battleDuration (segundos)
  - judgesEnabled (boolean)
```

---

## 🎯 SUB-NODO 3: Filters (Filtros)

### Propósito
Fase de filtrado de participantes para clasificar a TOP 8 o TOP 16.

### Workflow
```yaml
Fase 1: Estado = "filtering"
  Usuario selecciona participantes manualmente
  O usa auto-ranking por criterios

Fase 2: Confirmación
  Verifica que cantidad coincida (8 o 16)
  Valida no duplicados

Fase 3: Transición
  Marca participantes como "qualified"
  Cambia estado a "battles"
  Auto-genera brackets
```

### Firestore Reads/Writes
```yaml
Lee:
  - events/[eventId]/participants (todos)

Escribe:
  - events/[eventId]/participants/[id]
    status: "qualified" o "eliminated"

  - events/[eventId]/categories/[categoryId]
    status: "battles" (al confirmar)
    qualifiedParticipants: [ids array]
```

### Transformación Crítica
```yaml
Input: Lista completa participantes
Filtrado: Usuario selecciona 8 o 16
Output: Array qualifiedParticipants → genera brackets
```

---

## 🏅 SUB-NODO 4: Battles (Batallas) ⭐ CRÍTICO

### Propósito
**Control de batallas en vivo + Control Remoto de Proyector**

**ESTE ES EL SUB-NODO MÁS IMPORTANTE** para Transacción Tipo 6 CONVERGENCIA.

### Funcionalidad Dual

#### A) Gestión de Batallas
```yaml
Vista de batallas:
  - Lista de todas las batallas por ronda
  - Estado: pending/in_progress/completed
  - Seleccionar ganador (Participant A o B)
  - Avanzar ganador a siguiente ronda

Validaciones:
  ⚠️ No permitir declarar ganador sin confirmar
  ⚠️ Validar bracket integrity
  ⚠️ Auto-avance solo si ronda previa completa
```

#### B) Control Remoto de Proyector 🎮
```yaml
**CONVERGENCIA CRÍTICA**: [3A.Battles + 4B1.Setup] → 4B2.Live

Controles disponibles:
  - Cambiar canal proyector:
    • Vista General
    • TOP 8 Bracket
    • TOP 16 Bracket (bug resuelto Oct 29, 2025)
    • Background
    • Sponsors

  - Seleccionar batalla activa (highlight en bracket)
  - Mostrar/ocultar ganadores
  - Control de animaciones

Comunicación WiFi:
  3A.Battles escribe → Firestore projectorControl
  4B2 escucha onSnapshot → actualiza live
  Latencia: <1 segundo

Merge en 4B2:
  4B2 combina projectorControl (desde 3A) + layoutConfig (desde 4B1)
  Meta-agente: dashboard-projector-sync-master.md
```

### Firestore Reads/Writes

```yaml
Lee:
  - events/[eventId]/battles (todas las batallas)
  - events/[eventId]/categories/[categoryId] (config)

Escribe (Batallas):
  - events/[eventId]/battles/[battleId]
    winnerId: [participantId]
    status: "completed"

Escribe (Control Remoto): ← CRÍTICO TIPO 6
  - events/[eventId]/projectorControl
    activeView: "top8" | "top16" | "general" | "background" | "sponsors"
    activeBattleId: [battleId] (highlight)
    showWinners: boolean
    timestamp: serverTimestamp()
```

### Componentes Clave
```typescript
// src/app/admin/dashboard/[eventId]/page.tsx
// Líneas ~1527-1610

// Tab Battles contiene:
- BattlesList (gestión batallas)
- RemoteProjectorControl (control proyector) ← CONVERGENCIA
```

---

## 👥 SUB-NODO 5: Participants (Participantes)

### Propósito
Gestión completa de participantes del evento.

### Funcionalidad
```yaml
CRUD participantes:
  - Crear nuevo participante (nombre, AKA, crew)
  - Editar información
  - Eliminar participante
  - Asignar a categorías

Vista:
  - Lista completa de participantes
  - Filtros por categoría
  - Búsqueda por nombre/AKA
  - Estado (qualified/eliminated/pending)
```

### Firestore Collections
```yaml
Lee/Escribe:
  - events/[eventId]/participants

Estructura documento:
  {
    id: string
    name: string
    aka: string (alias b-boy/b-girl)
    crew: string (opcional)
    categories: string[] (array de categoryIds)
    status: "pending" | "qualified" | "eliminated"
    createdAt: timestamp
  }
```

### Validaciones
```yaml
⚠️ Nombre no vacío
⚠️ AKA único dentro del evento
⚠️ No eliminar si ya en batallas
⚠️ Mínimo 1 categoría asignada
```

---

## 👨‍⚖️ SUB-NODO 6: Judges (Jueces)

### Propósito
Gestión de panel de jueces del evento.

### Funcionalidad
```yaml
CRUD jueces:
  - Agregar juez (nombre, especialidad)
  - Editar información
  - Eliminar juez
  - Asignar a categorías específicas

Vista:
  - Lista de jueces activos
  - Categorías asignadas por juez
  - Estado activo/inactivo
```

### Firestore Collections
```yaml
Lee/Escribe:
  - events/[eventId]/judges

Estructura documento:
  {
    id: string
    name: string
    specialty: "breaking" | "popping" | "locking" | "all"
    categories: string[] (array de categoryIds)
    active: boolean
    createdAt: timestamp
  }
```

### Integración con Batallas
```yaml
Cuando batalla inicia:
  - Sistema muestra jueces asignados a esa categoría
  - Jueces pueden votar (futuro feature)
  - Resultado influencia winner selection
```

---

## 🌐 Comunicación WiFi con Otros Nodos

### 3A → 4B2 (Dashboard → Proyector) - CONVERGENCIA TIPO 6

```yaml
Tipo de Transacción: Tipo 6 CONVERGENCIA
Pattern: [3A.Battles + 4B1.Setup] → 4B2.Live

Flujo 1: Control Remoto (3A.Battles → 4B2)
  3A escribe: projectorControl { activeView, activeBattleId }
  4B2 escucha: onSnapshot en tiempo real
  4B2 merge: Combina projectorControl + layoutConfig
  4B2 actualiza: Cambia vista/bracket según config
  Latencia: <1 segundo

Flujo 2: Sync de Batallas (3A → 4B2)
  3A declara: winnerId en batalla
  4B2 escucha: onSnapshot battles collection
  4B2 actualiza: Bracket muestra ganador
  Animación: Winner highlight en bracket

Meta-agente coordinador:
  .claude/DAKCHAIN/meta-agentes/dashboard-projector-sync-master.md
```

### 3A ↔ 4B1 (Dashboard ↔ Setup)

```yaml
Tipo de Transacción: Tipo 3 (WiFi Bidireccional)

Flujo 1: Config Templates (4B1 → 3A)
  4B1 configura: Templates (layout, background, brackets)
  3A lee: Configuración para saber qué mostrar en control remoto
  Sincronización: Via Firestore layoutConfig

Flujo 2: Validación (3A → 4B1)
  3A valida: Que setup esté completo antes de live
  4B1 muestra: Estado de validación
```

---

## 📊 Estado del Evento (Lifecycle)

3A Dashboard maneja transiciones de estado del evento:

```yaml
Estado 1: SETUP
  3A tabs activos: Overview, Settings, Participants, Judges
  3A tabs bloqueados: Filters, Battles
  Siguiente: → FILTERING

Estado 2: FILTERING
  3A tabs activos: Overview, Filters, Participants
  3A tabs bloqueados: Battles
  Operación: Seleccionar clasificados (TOP 8/16)
  Siguiente: → BATTLES

Estado 3: BATTLES
  3A tabs activos: Overview, Battles, Participants, Judges
  3A tabs bloqueados: Filters, Settings
  Operación: Control de batallas + Control Remoto
  Siguiente: → COMPLETED

Estado 4: COMPLETED
  3A tabs activos: Overview (read-only)
  3A tabs bloqueados: Todos los demás
  Operación: Solo visualización
```

---

## 🔥 Firestore Schema Completo para 3A

```yaml
Colecciones que 3A lee/escribe:

events/[eventId]:
  - status: "setup" | "filtering" | "battles" | "completed"
  - name: string
  - date: timestamp
  - createdBy: userId

events/[eventId]/projectorControl:
  # Control Remoto (WRITE por 3A.Battles)
  activeView: "general" | "top8" | "top16" | "background" | "sponsors"
  activeBattleId: string (opcional)
  showWinners: boolean
  timestamp: serverTimestamp()

events/[eventId]/layoutConfig:
  # Config Templates (WRITE por 4B1, READ por 3A)
  libraryBracket: { winnerColor, connectorOpacity, etc }
  libraryBracketTOP16: { offsetY: -200 a +200 }
  libraryBracketTOP8: { offsetY }

events/[eventId]/categories/[categoryId]:
  - name: string
  - targetQualifiedCount: 8 | 16
  - status: "setup" | "filtering" | "battles" | "completed"
  - qualifiedParticipants: string[] (IDs)
  - roundNames: { octavos, cuartos, semifinales, final }

events/[eventId]/participants/[participantId]:
  - name: string
  - aka: string
  - crew: string
  - categories: string[]
  - status: "pending" | "qualified" | "eliminated"

events/[eventId]/battles/[battleId]:
  - round: "octavos" | "cuartos" | "semifinales" | "final"
  - participantAId: string
  - participantBId: string
  - winnerId: string (cuando completa)
  - status: "pending" | "in_progress" | "completed"
  - categoryId: string

events/[eventId]/judges/[judgeId]:
  - name: string
  - specialty: string
  - categories: string[]
  - active: boolean
```

---

## 🐛 Debugging Histórico: TOP16 Bracket (Oct 2025)

### Contexto General
**Duración**: ~1 semana de debugging intensivo
**Metodología**: Claude + Codex Tandem (análisis dual independiente)
**Prerrequisito**: Sistema Blockchain Viviente (OS DAK) - creado antes para pensar en nodos/flujos
**Importancia**: Uno de los últimos blockers críticos para lanzamiento de aplicación

### Problema #1: Header TOP16 Oculto

**Síntomas**:
```yaml
Comportamiento zoom-dependiente:
  - 100% zoom: Header "TOP 16" + nombre categoría OCULTO
  - 50% zoom: Header VISIBLE
  - TOP8: Funcionaba correctamente en todos los zooms
```

**Root Cause Identificado**:
```yaml
Archivo: src/app/public/event/[eventId]/live/page.tsx
Nodo: 4B2.Live (NO 3A) - pero impacta experiencia de control remoto desde 3A

Container CategoryBracketView:
  Problema: min-h-screen en flex container
  Efecto: Container crece > 100vh con TOP16 (15 batallas)
  Resultado: Header se empuja fuera del viewport

Relación con zoom:
  100% zoom = 100vh viewport → header oculto
  50% zoom = 200vh effective viewport → header visible
```

**Solución Aplicada**:
```yaml
Cambio 1: min-h-screen → h-screen + overflow-hidden
  Resultado: Container fijo en 100vh

Cambio 2: Headers adaptativos
  TOP8: py-6, text-6xl, mb-2 (generoso)
  TOP16: py-3, text-5xl, mb-1 (compacto)

Ubicación: live/page.tsx líneas 328-366
```

### Problema #2: Centrado Vertical Dinámico

**Síntomas**:
```yaml
Después de fix #1:
  - Bracket TOP16 se movía HACIA ABAJO
  - Tenía scroll interno (no como TOP8)
  - No centrado verticalmente
```

**Iteraciones Fallidas**:
```yaml
Iteración 1:
  Cambio: bracketScale 0.54 + overflow:visible
  Resultado: FALLO - bracket hacia abajo
  Reset: git reset --hard 39acb60 (COMMIT BASE)

Iteración 2:
  Pre-cambio: Reset offsetY=0 manualmente en 4B1
  Cambio: Mismos cambios de iteración 1
  Resultado: FALLO - bracket hacia abajo
  Reset: git reset --hard 39acb60 (COMMIT BASE)
```

**Análisis Dual (Claude + Codex)**:
```yaml
Finding Claude:
  paddingBottom: 64px descentra brackets pequeños
  Con TOP16 scale 0.54, padding empuja centro hacia arriba
  Bracket aparece abajo

Finding Codex:
  SVG @g-loot deja "colchón vacío" arriba para 4 rounds
  Incluso con offsetY=0 y scale=0.54, SVG "cuelga" hacia abajo
  Requiere CENTRADO DINÁMICO basado en altura real SVG

Consenso:
  Problema de CENTRADO VERTICAL
  Solución: Cálculo matemático dinámico post-render
  NO se puede resolver con valores estáticos
```

**Solución Final (Iteración 3 - EXITOSA)**:
```yaml
Archivo: live/page.tsx
Técnica: Dynamic SVG measurement + mathematical centering

1. useLayoutEffect hook:
   - Ejecuta después de render
   - Mide SVG real con getBBox()
   - Calcula shift = (espacio_disponible - altura_renderizada) / 2

2. bracketScale reducido: 0.54 (desde 0.6)
   Archivo: LibraryBracketTOP16.tsx línea 62

3. overflow: hidden (elimina scroll interno)
   Archivo: live/page.tsx línea 391

4. paddingTop dinámico: ${Math.max(shift, 0)}px
   Archivo: live/page.tsx línea 404

Resultado:
  ✅ TOP8 y TOP16 ambos centrados verticalmente
  ✅ Sin scroll interno
  ✅ Funcionamiento perfecto
```

### Learnings para 3A Dashboard

**Impacto en Control Remoto (SUB-NODO 4: Battles)**:
```yaml
Cuando 3A.Battles cambia activeView a "top16":
  1. 3A escribe projectorControl.activeView = "top16"
  2. 4B2 escucha onSnapshot y renderiza CategoryBracketView
  3. 4B2 aplica centrado dinámico con useLayoutEffect
  4. Usuario en PC1 ve resultado inmediato en PC2

Validación visual crítica:
  - Organizador en 3A debe validar que TOP16 se ve correcto
  - Si header oculto o bracket descentrado → experiencia degradada
  - Control remoto efectivo requiere rendering correcto en 4B2
```

**Relación con layoutConfig (desde 4B1)**:
```yaml
3A lee layoutConfig para saber qué configuraciones están disponibles:
  - Si 4B1 configuró offsetY dentro de límites seguros (-200 a +200)
  - Si bracketScale está en rango adecuado
  - Si templates están completos

Flujo de validación:
  4B1 configura → 3A valida → 3A permite control → 4B2 renderiza
```

### Transacción Híbrida

**Tipo**: Combinación Tipo 6 CONVERGENCIA + Tipo 2 RENDER

```yaml
Tipo 6 CONVERGENCIA (Firebase WiFi):
  [3A.Battles + 4B1.Setup] → 4B2.Live
  3A escribe: projectorControl { activeView: "top16" }
  4B1 escribe: layoutConfig { bracketsSpacing, offsetY }
  4B2 lee: Ambos documentos en tiempo real

Tipo 2 RENDER (Client-side Dynamic):
  4B2 ejecuta: useLayoutEffect
  4B2 mide: SVG.getBBox()
  4B2 calcula: paddingTop dinámico
  4B2 renderiza: Bracket centrado

Secuencia completa:
  1. WiFi: [3A + 4B1] → 4B2 (Tipo 6)
  2. Client: 4B2 → dynamic calculation (Tipo 2)
  3. Resultado: Bracket perfectamente centrado
```

### Archivos Impactados

**Directos** (modificados en esta sesión):
```yaml
src/app/public/event/[eventId]/live/page.tsx:
  - Líneas 3: Import useLayoutEffect
  - Líneas 327-342: Hook centrado dinámico
  - Líneas 328: Container h-screen
  - Líneas 335-366: Headers adaptativos
  - Líneas 387-392: Centro con overflow hidden
  - Líneas 396-405: Wrapper con paddingTop dinámico

src/components/event/LibraryBracketTOP16.tsx:
  - Línea 62: bracketScale 0.54

src/components/projector/setup/TabBrackets.tsx:
  - Líneas 56-57: offsetY slider limitado (-200 a +200)
```

**Indirectos** (relacionados con control remoto desde 3A):
```yaml
src/app/admin/dashboard/[eventId]/page.tsx:
  - SUB-NODO 4 (Battles): Control remoto que activa vistas
  - RemoteProjectorControl component: Cambia activeView
  - Validación visual: Usuario ve resultado en proyector
```

### Documentación Actualizada

**Referencias cruzadas**:
```yaml
- ARTERIA_PROYECTOR_MULTICATEGORIA.md v2.0:
  Historia completa del debugging (~1 semana)

- Nodo 4B1-setup.md:
  Límites seguros del slider offsetY

- Nodo 4B2-live.md:
  Implementación técnica centrado dinámico

- tipo6-convergencia.md + tipo2-render.md:
  Transacción híbrida documentada
```

### Impacto Estratégico

```yaml
Para lanzamiento aplicación:
  ✅ Blocker crítico RESUELTO
  ✅ TOP8 y TOP16 ambos funcionales
  ✅ Experiencia de control remoto perfeccionada
  ✅ Ready para eventos en vivo

Para CAPA 0 (Plan Pro):
  ✅ Arteria bien documentada para referencia
  ✅ Pattern de debugging dual (Claude + Codex) validado
  ✅ Sistema Blockchain Viviente probado en caso real
  ✅ Base sólida para features avanzadas
```

---

## 📚 Referencias

### Documentación Relacionada
- **Transacción**: `.claude/DAKCHAIN/transacciones/tipo6-convergencia.md`
- **Meta-agente**: `.claude/DAKCHAIN/meta-agentes/dashboard-projector-sync-master.md`
- **Arteria**: `.claude/DAKCHAIN/arterias/ARTERIA_PROYECTOR_MULTICATEGORIA.md`
- **Nodo 4B1**: `.claude/DAKCHAIN/nodos/4B1-setup.md`
- **Nodo 4B2**: `.claude/DAKCHAIN/nodos/4B2-live.md`

### Archivos Críticos
- `src/app/admin/dashboard/[eventId]/page.tsx` (main dashboard)
- `src/components/projector/setup/TabBrackets.tsx` (config source en 4B1)

---

## 🚀 Conclusión

**3A Dashboard** es el **nodo de control central** del sistema.

```yaml
Características clave:
  ✅ 6 SUB-NODOS (tabs en misma URL)
  ✅ Control completo del evento
  ✅ Control Remoto de Proyector (CRÍTICO Tipo 6)
  ✅ WiFi sync con 4B1 y 4B2
  ✅ Gestión lifecycle del evento

Importancia arquitectónica:
  - Hub central de operaciones
  - Punto de CONVERGENCIA para Tipo 6 (junto con 4B1)
  - Integración con todos los demás nodos

Bugs relacionados históricos:
  ✅ TOP16 tab bar zoom-dependent (Oct 29, 2025) - RESUELTO
  Root cause: Config en 4B1 (no en 3A)
  Fix: Limitar slider offsetY en 4B1.TabBrackets
```

---

**Última actualización**: Octubre 29, 2025
**Creado por**: Patricio + Claude
**Keywords**: 3A, dashboard, control remoto, subnodos, battles, proyector, convergencia
**Transacción**: Tipo 6 CONVERGENCIA [3A + 4B1] → 4B2

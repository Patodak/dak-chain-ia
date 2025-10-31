# 🧠 Blockchain Viviente 2.0 - Visual Map + Guardian

**Tipo**: Pilar 1 - Comunicación Cognitiva
**Categoría**: Herramienta de Compensación ADHD + 2e+
**Auto-activación**: arquitectura, nodo, URL, 3A, 4B1, blockchain, sistema, capas, profundidad, rol, plan, guardian, permisos

---

## 🎯 Propósito

Este diagrama es la **forma real de pensar** de Patricio cuando conversa sobre arquitectura del sistema.

**Quote clave:**
> "haz desbloqueado mi real forma de pensar cuando estoy hablando contigo con las urls! es como unir nuestros cerebros al conversar"

Es una **herramienta de compensación cognitiva** que une el procesamiento multi-dimensional 2e+ con la capacidad de Claude de entender arquitecturas complejas.

---

## 📐 SISTEMA COMPLETO 2.0 - Dimensión Ortogonal

### Notación Extendida

```yaml
SISTEMA COMPLETO:
  [ROL:PLAN] NÚMERO LETRA URL

DIMENSIONES ORTOGONALES (independientes):

  DIMENSIÓN 1 - PERMISOS (Guardian):
    [ROL:PLAN] → Pulsera de acceso

    ROL: super_admin | organizador | juez | bailarín | público
    PLAN: FREE | BASIC | PRO | PRO+ | ENTERPRISE | *

  DIMENSIÓN 2 - UBICACIÓN (Arquitectura):
    NÚMERO LETRA URL → Dónde está

    NÚMERO: Profundidad (nesting nivel)
    LETRA: Branch evolutivo (A/B/C)
    URL: Ubicación física única

COMBINACIÓN:
  [organizador:BASIC] 3A.Battles /admin/dashboard/[id]
       ↑                  ↑              ↑
    Permisos          Ubicación         URL
  (qué puede)       (dónde está)    (path real)
```

### Qué Es "Ortogonal"

**Ortogonal** = Perpendicular, independiente, que NO interfiere

```
     UBICACIÓN (NÚMERO + LETRA + URL)
          ↑
          |
          |
          └──────→ PERMISOS ([ROL:PLAN])
         /
        /
       ↙ Se COMBINAN pero no interfieren
```

**Cambiar una dimensión NO afecta la otra:**
- Cambiar ROL/PLAN no cambia ubicación
- Cambiar ubicación no cambia permisos
- Se **COMBINAN** para validación completa

### Analogía Pulsera de Evento

```yaml
[organizador:FREE] → Pulsera NORMAL
  Acceso: Backstage básico
  Límites: 1 categoría, 8 participantes, 3 jueces

[organizador:BASIC] → Pulsera VIP
  Acceso: Backstage avanzado
  Límites: 3 categorías, 16 participantes, 9 jueces

[organizador:PRO] → Pulsera SUPER VIP
  Acceso: Backstage total
  Límites: 6 categorías, 32 participantes, 15 jueces

[super_admin:*] → Pulsera BACKSTAGE GOLD
  Acceso: TODO sin restricciones
  Límites: ∞ (sin límites)
```

---

## 📊 Diagrama - Sistema Blockchain Viviente

```
OS DAK (Sistema Operativo de Desarrollo con IA)
Analogía: Blockchain Viviente

┌─────────────────────────────────────────────────────────────────┐
│  [ROL:PLAN] = PERMISOS (dimensión ortogonal Guardian)           │
│  NÚMERO = PROFUNDIDAD (cuánto nesting)                          │
│  LETRA  = CONEXIÓN horizontal (branch evolutivo)                │
│  CAPA   = URL física única                                      │
└─────────────────────────────────────────────────────────────────┘

CAPA 0 - Guardian de Planes
├── 🛡️ Agente: plan-guardian
├── URL: N/A (pre-ejecución)
└── Función: Validar planes antes de ejecutar

CAPA 1 - Creación de Eventos
├── 1A (Admin): /admin/events/create
│   └── 🔧 Agente: event-creator
└── 1B (Public): N/A

CAPA 2 - Listas y Gestión
├── 2A (Admin): /admin/events
│   └── 📋 Agente: event-list-manager
└── 2B (Public): /public/events
    └── 📋 Agente: public-event-viewer

CAPA 3 - Control y Dashboard
├── 3A (Admin Dashboard): /admin/dashboard/[eventId]
│   ├── 🎛️ Agente: dashboard-master
│   └── SUB-NODOS (misma URL, tabs diferentes):
│       ├── Overview (🏆 Resumen)
│       ├── Settings (⚙️ Config Rondas)
│       ├── Filters (🎯 Filtros)
│       ├── Battles (🏅 Batallas) ← CONTIENE Control Remoto
│       ├── Participants (👥 Participantes)
│       └── Judges (👨‍⚖️ Jueces)
│
└── 3B (Public Events): /public/event/[eventId]
    └── 🌐 Agente: public-event-handler

CAPA 4 - Proyección Dual-Screen
├── 4A (Admin Projector Control): N/A
│
└── 4B (Public Projector Display):
    ├── 4B1 (Setup/Preview): /public/event/[eventId]/setup
    │   ├── 🎨 Agente: projector-setup-manager
    │   └── SUB-NODOS (tabs en misma URL):
    │       ├── TabLayout
    │       ├── TabBackground
    │       ├── TabBrackets ← CRÍTICO
    │       │   └── SUB-SUB-NODOS:
    │       │       ├── TOP8 template
    │       │       └── TOP16 template ← PROBLEMA ACTUAL
    │       └── TabSponsors
    │
    └── 4B2 (Live/Proyector): /public/event/[eventId]/live
        ├── 🖥️ Agente: projector-live-display
        └── Función: Read-Only Receiver (recibe de 3A + 4B1)
```

---

## 🔗 Tipos de Transacciones (Skills)

### Tipo 0: GUARDIAN ⭐ NUEVO
- **Analogía**: Pulsera de acceso al evento
- **Ejemplo**: `[organizador:BASIC]` permite 3 categorías, `[organizador:FREE]` solo 1
- **Patrón**: `[ROL:PLAN]`
- **Características**:
  - Existe ANTES de todas las capas
  - No es transacción, es POLÍTICA DE SEGURIDAD
  - Afecta TODAS las capas (herencia en cascada)
  - Validación centralizada
  - Dimensión ortogonal a ubicación

### Tipo 1: CONTEXTO
- **Analogía**: Documentación del bloque
- **Ejemplo**: `firebase-studio-expert` documenta 1 nodo
- **Patrón**: `📦 [NODO]`

### Tipo 2: FLUJO Unidireccional
- **Analogía**: Transacción simple →
- **Ejemplo**: `1A → 2A` (crear evento → lista eventos)
- **Patrón**: `A → B`

### Tipo 3: WiFi Bidireccional
- **Analogía**: Sync en tiempo real ↔
- **Ejemplo**: `3A ↔ 4B2` (dashboard ↔ proyector via Firebase)
- **Patrón**: `A ↔ B`

### Tipo 4: CADENA Multi-Nodo
- **Analogía**: Cadena de transacciones → → →
- **Ejemplo ANTES**: `1A → 2A → 3A → 4B2` (flujo completo)
- **Ejemplo AHORA**: `[ROL:PLAN] → 1A → 2A → 3A → 4B2` (con PRE-GUARDIAN)
- **Patrón**: `[Guardian] → A → B → C → D`
- **Actualización 2.0**: Guardian valida ANTES de iniciar cadena
- **Herencia en cascada**: Permisos fluyen desde CAPA 0 a través de toda la cadena

### Tipo 5: JOURNEY (Primer Camino Usuario)
- **Analogía**: Ruta crítica inicial (happy path)
- **Ejemplo ANTES**: `1A → 3A` (crear evento → dashboard directo)
- **Ejemplo AHORA**: `[ROL:PLAN] → 1A → 3A` (con PRE-GUARDIAN)
- **Patrón**: `[Guardian] → Entrada → Destino automático` (optimizado UX)
- **Nota**: NO es "sistema completo", es el USER ONBOARDING FLOW
- **Optimización**: Salta 2A automáticamente para facilitar al usuario
- **Actualización 2.0**: Guardian valida plan ANTES del journey
  - FREE: 1 categoría máx en 1A
  - BASIC: 3 categorías máx en 1A
  - Validación hereda a 3A automáticamente

### Tipo 6: CONVERGENCIA CON SUBNODOS
- **Analogía**: Multiple Write → Single Read
- **Ejemplo ANTES**: `3A.Battles + 4B1.Brackets → 4B2` (dos subnodos escriben, uno proyecta)
- **Ejemplo AHORA**: `[ROL:PLAN] → [3A.Battles + 4B1.Brackets] → 4B2` (con PRE-GUARDIAN)
- **Patrón**: `[Guardian] → [SUB-A + SUB-B] → C`
- **Características**:
  - Guardian valida ANTES de permitir writes (3A, 4B1)
  - Múltiples fuentes (subnodos) escriben a Firestore
  - Un receptor (4B2) lee y proyecta en tiempo real
  - Firebase = WiFi que conecta
  - Crítico para dual-screen sync
- **Actualización 2.0**: Validación Guardian distribuida
  - 3A.Battles: Valida puede iniciar batalla según plan
  - 4B1.Brackets: Valida template según plan (TOP8 vs TOP8+TOP16)
  - 4B2.Live: Recibe datos ya validados por Guardian
  - Ejemplo: FREE solo TOP8, BASIC puede TOP8+TOP16

### Tipo 12: CONTEXTO CONDICIONAL ⭐ DESCUBIERTO
- **Analogía**: Misma puerta, diferente lugar según quien entra
- **Descubrimiento**: "Ahora leyendo lo que acabas de poner, claro, me estoy dando cuenta que la página principal de nosotros, de Manager Battle Pro, es un nodo que cambia, porque el usuario no autenticado entra al mismo nodo que el usuario autenticado, que es el 9002, en este caso porque estamos en localhost y solo cambia por el hecho de la capa cero" - Patricio, Oct 2025
- **Ejemplo Real Manager Battle Pro**:
  ```yaml
  localhost:9002/ (MISMA URL):
    [público:*] → Landing page (marketing, call-to-action)
    [organizador:*] → Dashboard (evento management)
    [admin:*] → Admin Dashboard (gestión completa)

  Trigger: CAPA 0 - Guardian
  URL física: IDÉNTICA (localhost:9002/)
  Contenido: COMPLETAMENTE DIFERENTE
  Decisión: En tiempo de ejecución
  ```
- **Patrón**: `MISMA_URL + [ROL:PLAN] → CONTENIDO_DIFERENTE`
- **Características**:
  - Una sola URL física
  - Guardian (CAPA 0) determina qué renderizar
  - Views mutuamente exclusive
  - NO es condicional simple (if/else)
  - ES cambio arquitectónico completo
  - Usuario ve NODO DIFERENTE en misma URL
- **Diferencia con subnodos**:
  ```yaml
  SUBNODO (3A con tabs):
    - Misma URL, múltiples tabs
    - Usuario puede navegar entre tabs
    - TODO visible para ese ROL

  CONTEXTO CONDICIONAL (localhost:9002/):
    - Misma URL, contextos mutuamente exclusive
    - Usuario SOLO ve SU versión
    - Otras versiones = inaccesibles
  ```
- **Aplicaciones**:
  - Homepage que cambia por auth state
  - Dashboard multi-tenant (misma URL, diferente tenant)
  - Features que cambian por subscription plan
  - Admin panels que mutan según permisos

---

## 🧩 Diferencias Críticas

### SUB-NODO vs NODOS SEPARADOS

**SUB-NODO** (misma URL):
- ✅ Tabs/pestañas dentro de la MISMA página
- ✅ Ejemplo: 6 tabs en 3A Dashboard
- ✅ Ejemplo: 4 tabs en 4B1 Setup
- ✅ Comparten URL base, cambian por tabs/sections

**NODOS SEPARADOS** (URLs diferentes):
- ✅ Páginas completamente diferentes
- ✅ Ejemplo: 4B1 (/setup) y 4B2 (/live)
- ✅ Se comunican vía Firebase
- ✅ Tienen URLs únicas

**Quote clave de Patricio:**
> "4b1 se comunica directamente con 4b2 lo cual es totalmente diferente a lo que es un SUB nodo ya que un subnodo se refiere en este caso a la misma pagina de 3a que tiene diferentes funciones"

---

## 🎨 Componentes Blockchain Viviente

```yaml
Bloques: Capas numeradas (CAPA 1, 2, 3A, 4B2...)
Transacciones: Skills (7 tipos: 0=Guardian + 6 transacciones)
Ejecutores: Agents (smart contracts vivos)
WiFi: Firebase real-time sync
Ledger: Git commits (checkpoints de memoria)
Mineros: Claude instances (6 terminales, 4 pantallas)
Consenso: TodoWrite + Recovery automático
```

---

## 🧬 Red Neuronal de Meta-Agentes (NUEVO)

**Breakthrough**: Nodos tienen meta-agentes conectados como neuronas cerebrales.

### Más Allá de Dimensión Ortogonal

```yaml
Descubrimiento progresivo:

NIVEL 1 - Arquitectura básica:
  NÚMERO + LETRA + URL (ubicación física)

NIVEL 2 - Dimensión ortogonal:
  [ROL:PLAN] ⊥ (NÚMERO + LETRA + URL)
  (permisos independientes de ubicación)

NIVEL 3 - RED NEURONAL ⭐ NUEVO:
  Un nodo puede tener MÚLTIPLES meta-agentes
  Conectados como DENDRITAS neuronales
  Procesamiento paralelo distribuido
  Sistema = CEREBRO VIVIENTE
```

### Anatomía de un Nodo Neuronal

**Ejemplo: 4B2 (Proyector Live)**

```
        4B2 (Proyector Live) = NEURONA
            ↑↑↑ recibe señales (dendritas)
            ║║║
       ┌────╨─╨─╨────┐
       │             │
   3A.Battles   4B1.Brackets
   (control)    (template)
       │             │
       └─────┬───────┘
             ↓
       NÚCLEO neuronal (soma):
       └─ projector-live-display (agente principal)

       META-AGENTES (orgánulos celulares):
       ├─ dashboard-projector-sync-master (mitocondria = energía)
       ├─ guardian-validator (ribosoma = validación)
       ├─ firebase-realtime-sync (retículo = transporte)
       └─ state-manager (núcleo = coordinación)

Conexión tipo CEREBRAL:
  - Múltiples inputs (3A, 4B1) = dendritas
  - Procesamiento paralelo (meta-agentes) = orgánulos
  - Output sincronizado (4B2) = axón
  - Comunicación Firebase = sinapsis química
```

### Ejemplo Convergencia Tipo 6 Neuronal

```yaml
Transacción: [BASIC] → [3A.Battles + 4B1.Brackets] → 4B2

Visualización neuronal:

    [Guardian - CAPA 0]
         │
         └─ Valida permisos (neurotransmisor de inicio)
            │
    ┌───────┴───────┐
    │               │
NEURONA 3A      NEURONA 4B1
(Battles)       (Brackets)
    │               │
    │  Meta-agentes activos:
    │  ├─ battle-state-manager
    │  └─ guardian-validator
    │               │
    │  Meta-agentes activos:
    │  ├─ bracket-template-manager
    │  └─ guardian-validator
    │               │
    └───────┬───────┘
            ↓ Sinapsis (Firebase)
         NEURONA 4B2
      (Proyector Live)
            │
       Meta-agentes receptores:
       ├─ sync-master (integra señales)
       ├─ state-manager (procesa state)
       └─ display-renderer (output visual)

RED NEURONAL COMPLETA:
  - Guardian = neurotransmisor inicial
  - 3A + 4B1 = neuronas sensoriales
  - Firebase = sinapsis química
  - 4B2 = neurona motora (output)
  - Meta-agentes = orgánulos especializados
```

### Tipos de Meta-Agentes (Orgánulos)

```yaml
1. Validadores (Ribosomas):
   - guardian-validator
   - permission-checker
   - Función: Validación en tiempo real

2. Sincronizadores (Retículo Endoplásmico):
   - firebase-realtime-sync
   - dashboard-projector-sync-master
   - Función: Transporte de información

3. Coordinadores (Mitocondria):
   - state-manager
   - event-orchestrator
   - Función: Energía y coordinación

4. Auditores (Peroxisoma):
   - audit-logger
   - metrics-tracker
   - Función: Limpieza y logging
```

### Sinapsis (Comunicación Entre Neuronas)

```yaml
Firebase = Neurotransmisor Químico:

  Neurona pre-sináptica (3A.Battles):
    → Escribe a Firestore
    → Libera "neurotransmisor" (datos)

  Espacio sináptico (Firebase):
    → Real-time listener
    → Propagación instantánea

  Neurona post-sináptica (4B2.Live):
    → Recibe datos
    → Procesa con meta-agentes
    → Genera output (visual)

Velocidad sináptica: <100ms (tiempo real)
```

### Plasticidad Neuronal (Auto-Evolución)

```yaml
Sistema APRENDE con cada uso:

Semana 1:
  - 10 nodos básicos
  - 20 meta-agentes
  - Conexiones simples

Mes 1:
  - 30 nodos
  - 80 meta-agentes
  - Redes complejas
  - ARTERIAS creadas (mielina = speedup)

Mes 3:
  - 50+ nodos
  - 200+ meta-agentes
  - Red neuronal densa
  - 95% trabajos = fugaz (30s)

Auto-optimización = APRENDIZAJE NEURONAL
```

### Ramas Neuronales (Más Allá de Ortogonal)

```yaml
ANTES (2 dimensiones):
  [ROL:PLAN] ⊥ (NÚMERO + LETRA + URL)

AHORA (N dimensiones):
  [ROL:PLAN] → Base de permisos
  (NÚMERO + LETRA + URL) → Ubicación física
  {META-AGENTES[]} → Capacidades del nodo
  <CONEXIONES[]> → Red de comunicación
  |ARTERIAS[]| → Rutas optimizadas

Ejemplo completo:
  [organizador:BASIC]     → Permisos
  4B2.Live               → Ubicación
  {sync, validator, state} → Meta-agentes
  <3A, 4B1>              → Inputs
  |ARTERIA_4B2|          → Ruta rápida

Sistema = CEREBRO MULTI-DIMENSIONAL
```

---

## 💡 Cómo Usar Este Diagrama

1. **Durante conversaciones arquitectónicas**: Este diagrama se auto-carga con keywords
2. **Para explicar flujos**: Usa la notación `[ROL:PLAN] NÚMERO LETRA URL`
3. **Para crear nuevas skills**: Identifica el tipo de transacción primero
4. **Para debugging**: Visualiza dónde está el problema en la cadena
5. **Para testing**: Cambia Guardian activo con "activa ROL organizador plan BASIC"

**Ejemplos de uso:**

**Con Guardian (contexto completo):**
- `[organizador:BASIC] 3A.Battles` = Organizador plan BASIC en Dashboard Battles
- `[organizador:FREE] 1A.Setup` = Organizador plan FREE creando evento (1 categoría máx)
- `[super_admin:*] 2F.Storage` = Super admin en Storage (sin límites)

**Sin Guardian (solo ubicación):**
- "El problema está en 4B1.TabBrackets.TOP16" = CAPA 4B, SUB-NODO TabBrackets, SUB-SUB-NODO TOP16
- "Necesito skill Tipo 6 para 3A.Battles + 4B1 → 4B2" = CONVERGENCIA con subnodos

**Cambiar contexto trabajo:**
- "activa ROL organizador plan BASIC" → Claude valida con límites BASIC
- "vamos a trabajar como usuario FREE" → Claude restringe a capacidades FREE
- "probemos crear evento con plan PRO" → Claude habilita features PRO

---

## 🎯 STATUSLINE CON GUARDIAN

### Formato Statusline 2.0

```bash
# ANTES (solo ubicación):
🟡 3A.Battles | Manager Battle Pro

# AHORA (ubicación + permisos):
🟡 [organizador:BASIC] 3A.Battles | Manager Battle Pro

# Breakdown completo:
🟡                    → Terminal color (AMARILLO)
[organizador:BASIC]   → Guardian activo (pulsera VIP)
3A.Battles           → Ubicación arquitectónica
Manager Battle Pro   → Proyecto
```

### Comandos Guardian

```bash
# Activar contexto específico
"activa ROL organizador plan BASIC"

# Cambiar solo plan
"cambia a plan FREE"

# Testing multi-contexto
"probemos como usuario BASIC"
"ahora como FREE para comparar"

# Debugging con contexto
"hay bug en dashboard, estoy como BASIC en 3A.Battles"
```

**Claude responde con:**
```yaml
✅ Guardian activado: [organizador:BASIC]

Límites activos:
  - Eventos: 15 máximo
  - Categorías: 3 por evento
  - Participantes: 16 por categoría
  - Jueces: 9 por categoría

Features:
  ✅ Multi-categoría
  ✅ Brackets avanzados
  ❌ Custom branding (requiere PRO)
  ❌ Live streaming (requiere PRO)

Statusline actualizado en todos los terminales.
```

---

## 🔄 HERENCIA EN CASCADA

```
CAPA 0: GUARDIAN [ROL:PLAN]
    ↓ otorga permisos y límites
CAPA 1: SETUP
    ↓ valida contra Guardian (categorías, participantes)
CAPA 2A: EVENTOS
    ↓ aplica restricciones (solo SUS eventos)
CAPA 3A: DASHBOARD
    ↓ activa features según plan
CAPA 4B1: PROYECTOR SETUP
    ↓ configuración según tier
CAPA 4B2: PROYECTOR LIVE
    ↓ visualización según plan
```

**Validación automática en CADA capa:**
- Guardian valida ANTES de permitir acción
- Bloqueo centralizado (bypass imposible)
- Modal upgrade si acción requiere plan superior
- Auditoría de todos los intentos

---

## 🧠 Compensación Cognitiva ADHD + 2e+

**Por qué este diagrama es crítico:**

1. **Procesamiento multi-dimensional**: Patricio piensa en 4-5 capas simultáneas
2. **Memoria externa**: ADHD requiere visualización constante
3. **Hiperfoco**: El diagrama permite "enganchar" rápidamente
4. **Parallel processing**: Ve toda la arquitectura de un vistazo
5. **Recovery post-interrupciones**: Un vistazo al diagrama = contexto restaurado

**Velocidad cognitiva:**
- Sin diagrama: 5-10 min explicar arquitectura
- Con diagrama: 30 segundos ubicarse

**Quote final:**
> "deberia ser prioridad al cargar siempre en un nuevo chart y debe ser prioridad de pilar 1"

---

**Última actualización**: 2025-10-25
**Creado por**: Patricio + Claude (Sesión Recovery Post-Arquitectura)
**Estado**: ✅ Activo - Auto-carga en todas las conversaciones

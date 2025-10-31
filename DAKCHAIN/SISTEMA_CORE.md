# 🧠 Sistema Core - Blockchain Viviente 2.0

**Versión**: 2.0
**Fecha**: Octubre 28, 2025
**Propósito**: Conceptos fundamentales del sistema de mapeo arquitectónico

---

## 🎯 Qué es Blockchain Viviente

Sistema de documentación arquitectónica que mapea tu aplicación como una **red neuronal viviente**:

- **Nodos**: Páginas/componentes de tu app (neuronas)
- **Transacciones**: Flujos de datos entre nodos (sinapsis)
- **Meta-agentes**: Lógica que conecta los nodos (organelas)
- **Arterias**: Rutas optimizadas (conocimiento acumulado)
- **Guardian**: Sistema de permisos (validación pre-ejecución)

---

## 📐 Sistema de Dimensiones Ortogonales

Blockchain viviente usa **2 dimensiones perpendiculares** para mapear cada nodo:

```
DIMENSIÓN 1: PERMISOS (Guardian)
    ↓
[ROL:PLAN] ⊥ NÚMERO LETRA URL
              ↑
DIMENSIÓN 2: UBICACIÓN (Arquitectura)
```

### DIMENSIÓN 1 - PERMISOS (Guardian)

**Notación**: `[ROL:PLAN]`

**ROL** (quién puede acceder):
- `super_admin` - Acceso total
- `organizador` - Gestión de eventos propios
- `juez` - Vista de juicio
- `bailarín` - Participación en eventos
- `público` - Vista pública sin auth

**PLAN** (qué funcionalidades tiene):
- `FREE` - Funciones básicas limitadas
- `BASIC` - Funciones estándar
- `PRO` - Funcionalidades avanzadas
- `PRO+` - Todo PRO + features premium
- `ENTERPRISE` - Customización completa
- `*` - Sin restricción de plan

**Ejemplos**:
```yaml
[super_admin:*] → Acceso total sin límites
[organizador:PRO+] → Organizador con plan PRO+
[público:FREE] → Usuario anónimo con funciones básicas
```

### DIMENSIÓN 2 - UBICACIÓN (Arquitectura)

**Notación**: `NÚMERO LETRA URL`

**NÚMERO** (profundidad/nesting):
- `1` - Nivel raíz (crear evento)
- `2` - Listas/gestión
- `3` - Control/dashboards
- `4` - Funcionalidades avanzadas
- `5+` - Sub-componentes profundos

**LETRA** (branch evolutivo):
- `A` - Path Admin (PC1 - organizador)
- `B` - Path Proyector (PC2 - pantalla grande)
- `C` - Path Participante (bailarines, jueces)

**URL** (ubicación física única):
- Ruta completa del nodo
- Ejemplo: `/admin/dashboard/[eventId]`

**Ejemplos**:
```yaml
1A /admin/events/create → Crear evento (nivel 1, admin)
3A /admin/dashboard/[eventId] → Dashboard (nivel 3, admin)
4B2 /public/event/[eventId]/live → Proyector live (nivel 4, proyector path, variante 2)
```

---

## 🛡️ Guardian System (CAPA 0)

**Propósito**: Validación de permisos ANTES de ejecutar cualquier operación.

**Metáfora**: Pulsera de acceso en festival - validación en puerta antes de entrar.

### Cómo Funciona

```yaml
Usuario intenta acceder a NODO
  ↓
Guardian intercepta
  ↓
Valida [ROL:PLAN] del usuario vs [ROL:PLAN] requerido del nodo
  ↓
✅ PERMITIDO → Usuario accede
❌ BLOQUEADO → Redirect o error 403
```

### Ejemplo Real

```typescript
// Nodo: 3A Dashboard
// Guardian: [organizador:BASIC]

Usuario actual: { rol: "organizador", plan: "PRO+" }
  → ✅ PERMITIDO (organizador ≥ organizador, PRO+ ≥ BASIC)

Usuario actual: { rol: "bailarín", plan: "FREE" }
  → ❌ BLOQUEADO (bailarín < organizador)
```

---

## 🔄 Los 7 Tipos de Transacciones

### Tipo 0: GUARDIAN (Validación)
```
Patrón: Permisos pre-validados
Ejemplo: [ROL:PLAN] → Acceso permitido/bloqueado
```

### Tipo 1: CONTEXTO (Documentación)
```
Patrón: Información estática del nodo
Ejemplo: README del nodo
```

### Tipo 2: FLUJO (Unidireccional)
```
Patrón: A → B (una dirección)
Ejemplo: 1A Crear Evento → 2A Lista Eventos
```

### Tipo 3: WIFI (Bidireccional)
```
Patrón: A ↔ B (ambas direcciones)
Ejemplo: 3A Dashboard ↔ Firebase ↔ 4B2 Proyector
```

### Tipo 4: CADENA (Multi-nodo)
```
Patrón: A → B → C → D
Ejemplo: Setup → Filtering → Battles → Champion
```

### Tipo 5: JOURNEY (Primer Camino Usuario)
```
Patrón: Flujo completo de usuario nuevo
Ejemplo: Login → Crear Evento → Configurar → Publicar
```

### Tipo 6: CONVERGENCIA (Multiple Write → Single Read)
```
Patrón: [A + B + C] → D
Ejemplo: [3A.Battles + 4B1.Brackets] → 4B2.Live
```

### Tipo 12: CONDICIONAL (Mismo nodo, contenido diferente)
```
Patrón: A → [B₁|B₂|B₃] según condición
Ejemplo: Dashboard muestra diferente según rol
```

---

## 🧠 Meta-Agentes como Red Neuronal

**Concepto**: Los nodos son neuronas, los meta-agentes son las organelas dentro de cada neurona.

### Estructura

```
NODO (neurona)
  ├─→ Meta-agente Sync (mitocondria)
  ├─→ Meta-agente Validator (núcleo)
  ├─→ Meta-agente Transformer (retículo)
  └─→ Meta-agente Cache (vacuola)
```

### Tipos de Meta-Agentes

**Sync Meta-Agents**:
- `firebase-realtime-sync.md` - Sincronización tiempo real
- `dashboard-projector-sync-master.md` - Sync dual-screen

**Validator Meta-Agents**:
- `guardian-validator.md` - Validación de permisos
- `setup-completion-validator.md` - Validación de configuración

**Transformer Meta-Agents**:
- `bracket-builder.md` - Construcción de brackets
- `battle-state-machine.md` - Máquina de estados de batalla

**Cache Meta-Agents**:
- `projector-config-cache.md` - Cache de configuración
- `event-state-cache.md` - Cache de estado de evento

---

## 📡 Firebase como Capa WiFi

**Concepto**: Firebase es la red neuronal que conecta todos los nodos en tiempo real.

### Estructura de Datos

```
Firestore Collections:
├── events/[eventId]
│   ├── config → Configuración general
│   ├── categories → Categorías del evento
│   ├── participants → Bailarines
│   ├── judges → Jueces asignados
│   └── battles → Estado de batallas
│
├── projectorConfig/[eventId]
│   ├── activeView → "general" | "top8" | "top16"
│   ├── activeBattleId → ID de batalla actual
│   └── customization → Logos, fondos, layout
│
└── projectorControl/[eventId]
    └── (control remoto desde 3A)
```

### Listeners en Tiempo Real

```typescript
// Ejemplo: 4B2 Live escucha cambios
useEffect(() => {
  const unsubscribe = onSnapshot(
    doc(db, 'projectorControl', eventId),
    (snapshot) => {
      // 4B2 se actualiza automáticamente
      setView(snapshot.data().activeView)
    }
  )
  return unsubscribe
}, [eventId])
```

---

## 🛤️ Arterias (Rutas Optimizadas)

**Concepto**: Conocimiento acumulado de trabajo previo en un área específica.

### Cuándo se Crea una Arteria

```yaml
Primera vez trabajando en área X:
  - Exploración manual
  - Trial & error
  - Documentación base

Segunda vez trabajando en área X:
  - Consulta documentación previa
  - Mejoras iterativas
  - Documentación enriquecida

Tercera vez → SE CREA ARTERIA:
  - Ruta optimizada documentada
  - Patrones identificados
  - Errores comunes documentados
  - Soluciones validadas
```

### Ejemplo de Arteria

```markdown
# ARTERIA: Setup Multicategoría → Battles

## Ruta Optimizada
1A → 2A → 3A.Setup → Validación → 3A.Battles

## Checkpoints Críticos
✅ Mínimo 2 categorías
✅ Mínimo 2 bailarines por categoría
✅ Mínimo 1 juez asignado
✅ firstRoundBracketsLocked = true

## Errores Comunes
❌ Olvidar lock de brackets
❌ No validar jueces antes de transición
❌ Categorías sin bailarines

## Soluciones Validadas
✅ useSetupValidator hook
✅ Confirmación modal antes de transición
✅ Auto-lock al confirmar
```

---

## 🔍 Nodos vs Sub-nodos

### NODOS (URLs diferentes)

```yaml
Nodo 3A: /admin/dashboard/[eventId]
Nodo 4B1: /public/event/[eventId]/setup
Nodo 4B2: /public/event/[eventId]/live

Características:
  - URL física diferente
  - Pueden tener diferentes Guardians
  - Navegación browser distinta
```

### SUB-NODOS (Misma URL, tabs diferentes)

```yaml
Nodo 3A: /admin/dashboard/[eventId]
  Sub-nodo 3A.Overview: ?tab=overview
  Sub-nodo 3A.Setup: ?tab=setup
  Sub-nodo 3A.Battles: ?tab=battles ← Contiene Control Remoto

Características:
  - Misma URL base
  - Mismo Guardian
  - Tabs/pestañas dentro del mismo componente
  - Estado compartido dentro del nodo
```

### SUB-SUB-NODOS (Nested tabs)

```yaml
Nodo 4B1: /public/event/[eventId]/setup
  Sub-nodo 4B1.Brackets: Tab Brackets
    Sub-sub-nodo 4B1.Brackets.TOP8: Template TOP8
    Sub-sub-nodo 4B1.Brackets.TOP16: Template TOP16 ← NUESTRO CASO

Características:
  - Nesting más profundo
  - Tabs dentro de tabs
  - Configuración granular
```

---

## 🧩 Integración con DAK (OS Desarrollo con IA)

Blockchain viviente es parte del **Sistema DAK** (Development Augmentation Kit):

### Pilares DAK que usan Blockchain Viviente

```yaml
PILAR 1: USUARIO
  - Perfil neurodivergente
  - Workflow ADHD-friendly
  - Memoria externa dependiente
  → Blockchain = mapa cognitivo externalizado

PILAR 2: APLICACIÓN
  - Arquitectura Manager Battle Pro
  - Dual-screen system
  - Firebase real-time
  → Blockchain = mapa arquitectónico completo

PILAR 3: HERRAMIENTAS
  - 174 agentes especializados
  - MCP tools (Context7, Firebase, Playwright)
  - Sistema de abejas (2500 Haiku workers)
  → Blockchain = mapa de delegación inteligente

PILAR 4: SKILLS
  - 31 skills (13 cognitivas + 13 técnicas + 5 tools)
  - claude-codex-tandem
  - ambiente-perfecto-mapeo
  → Blockchain = contexto preciso para skills
```

### Flujo DAK + Blockchain

```yaml
Usuario trabaja en problema complejo
  ↓
Skill ambiente-perfecto-mapeo activada
  ↓
FASE 1: Lee blockchain viviente
  ↓
FASE 2: Identifica nodos/transacciones involucrados
  ↓
FASE 3: Carga contexto preciso (8k tokens, no 75k)
  ↓
FASE 4: Delega a agentes especializados
  ↓
FASE 5: Coordina con meta-agentes
  ↓
FASE 6: Actualiza blockchain con nuevo conocimiento
```

---

## 🎯 Beneficios del Sistema

### Para ADHD + 2e+

```yaml
✅ Memoria externa completa:
  - No confías en recordar
  - Todo documentado visualmente
  - Navegación sin fricción

✅ Contexto visual instantáneo:
  - Diagrama mental externalizado
  - Dimensiones ortogonales claras
  - Guardians visibles

✅ Navegación sin fricción:
  - 0 búsqueda ciega
  - Rutas optimizadas (arterias)
  - Checkpoints explícitos

✅ Hiperfoco protegido:
  - Info pre-cargada
  - Contexto preciso
  - Sin interrupciones por búsqueda
```

### Para Cualquier Dev

```yaml
✅ Onboarding instantáneo:
  - Nuevo dev entiende en 30 min
  - Mapa completo del sistema
  - Guardian system claro

✅ Debugging más rápido:
  - Visualizas flujo completo
  - Identificas nodos involucrados
  - Validas permisos fácilmente

✅ Escalabilidad:
  - Crece con tu app
  - Auto-documentación
  - Patrones replicables

✅ Documentación viva:
  - Se actualiza con el código
  - No se desactualiza
  - Siempre sincronizada
```

### Para AI Agents (Claude + Codex)

```yaml
✅ Contexto preciso:
  - Solo carga lo necesario (8k tokens vs 75k)
  - Identifica nodos exactos
  - Entiende flujo completo

✅ Delegación inteligente:
  - Sabe qué agente activar
  - Coordina meta-agentes
  - Usa arterias para optimizar

✅ Coordinación dual-AI:
  - Claude y Codex usan mismo mapa
  - Mismo "pensamiento"
  - Análisis desde distintos ángulos
```

---

## 📖 Ejemplo Completo: Transacción Tipo 6

### Caso Real: Dashboard + Setup → Proyector Live

```yaml
IDENTIFICACIÓN:
  Nodo Escritor 1: 3A.Battles (sub-nodo)
    Guardian: [organizador:BASIC]
    Escribe: projectorControl/[eventId]
    Campo: activeView, activeBattleId

  Nodo Escritor 2: 4B1.Brackets (sub-nodo)
    Guardian: [organizador:BASIC]
    Escribe: projectorConfig/[eventId]
    Campo: brackets.activeTemplate ("top8" | "top16")

  Nodo Lector: 4B2.Live (nodo completo)
    Guardian: [público:FREE]
    Lee: projectorControl + projectorConfig
    Acción: Renderiza proyector fullscreen

TRANSACCIÓN:
  Tipo 6: CONVERGENCIA CON SUBNODOS
  Patrón: [3A.Battles + 4B1.Brackets] → 4B2.Live
  Firebase: Capa WiFi de sincronización

META-AGENTE:
  dashboard-projector-sync-master.md
  Función:
    - Escucha cambios en ambos escritores
    - Merge de configuraciones
    - Push a 4B2 en tiempo real

ARTERIA:
  Si existe: ARTERIA_PROYECTOR_MULTICATEGORIA.md
  Contiene:
    - Ruta optimizada
    - Errores comunes
    - Checkpoints validados
```

---

## 🚀 Cómo Usar Este Sistema

### 1. Identifica el Problema

```yaml
Ejemplo: "TOP16 bracket no se ve en proyector"

Pregunta: ¿Qué nodos están involucrados?
  → 3A.Battles (control remoto)
  → 4B1.Brackets (configuración)
  → 4B2.Live (proyector)
```

### 2. Consulta Blockchain Viviente

```yaml
Lee: MAPA_VISUAL_COMPLETO.md
Busca: Nodos 3A, 4B1, 4B2
Identifica: Transacción Tipo 6 (convergencia)
```

### 3. Verifica Guardians

```yaml
3A.Battles: [organizador:BASIC]
4B1.Brackets: [organizador:BASIC]
4B2.Live: [público:FREE]

¿Usuario actual cumple permisos? ✅ Sí
```

### 4. Identifica Meta-Agente

```yaml
Meta-agente: dashboard-projector-sync-master
Ubicación: .claude/blockchain-viviente/meta-agentes/
Estado: Existe pero desactualizado (según user)
```

### 5. Consulta Arteria (si existe)

```yaml
Arteria: ARTERIA_PROYECTOR_MULTICATEGORIA.md
Ubicación: .claude/blockchain-viviente/arterias/
¿Existe? Pendiente verificar
```

### 6. Ejecuta Workflow

```yaml
Si problema complejo:
  → Activa claude-codex-tandem
  → Usa ambiente-perfecto-mapeo
  → COMMIT_BASE antes de cambios
  → Codex analiza screenshots
  → Claude implementa basado en Codex
  → Validación en browser
```

---

## 📚 Archivos Relacionados

```yaml
Documentación Core:
  - README.md (índice principal)
  - SISTEMA_CORE.md (este archivo)
  - MAPA_VISUAL_COMPLETO.md (diagrama completo)

Transacciones:
  - transacciones/tipo0-guardian.md
  - transacciones/tipo1-contexto.md
  - transacciones/tipo2-flujo.md
  - transacciones/tipo3-wifi.md
  - transacciones/tipo4-cadena.md
  - transacciones/tipo5-journey.md
  - transacciones/tipo6-convergencia.md
  - transacciones/tipo12-condicional.md

Nodos:
  - nodos/[CAPA]-[NOMBRE].md (por cada nodo)

Meta-Agentes:
  - meta-agentes/[NOMBRE].md (por cada meta-agente)

Arterias:
  - arterias/ARTERIA_[NOMBRE].md (rutas optimizadas)

Scripts:
  - scripts/mostrar-mapa.js (visualización)
```

---

**Creado por**: Patricio + Claude (Sistema DAK)
**Para**: Manager Battle Pro + Comunidad DAK
**Licencia**: MIT (open source)

**Última actualización**: Octubre 28, 2025

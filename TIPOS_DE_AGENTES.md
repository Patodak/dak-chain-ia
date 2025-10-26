# 🤖 Tipos de Agentes - Blockchain Viviente vs Externos

**Versión**: 1.0
**Creado**: 26 de Octubre 2025
**Crítico**: Entender diferencia para delegar correctamente

---

## 🎯 Descubrimiento Clave

**Existen 2 tipos DISTINTOS de agentes en el sistema**:

1. **Agentes Blockchain Viviente** (internos al sistema)
2. **Agentes Externos / Trabajadores** (helpers que ahorran contexto)

**Quote clave**:
> "tenemos agentes de la blockchain viviente y agentes externos que nos ayudan con la app y nuestro código... recuerda que tienes trabajadores siempre."

---

## 🧬 TIPO 1: Agentes Blockchain Viviente (Internos)

### Qué Son

**Agentes que FORMAN PARTE de la arquitectura del sistema.**

Son los ejecutores de los nodos/capas del blockchain viviente.

### Características

```yaml
Propósito:
  - Ejecutan nodos específicos del sistema
  - Parte integral de la arquitectura
  - Tienen ubicación en blockchain viviente

Ubicación:
  - .claude/.agents/*.md
  - .claude/.agent-registry.json
  - Documentados en blockchain-viviente-visual-map

Notación:
  - Tienen NÚMERO + LETRA + URL
  - Ejemplo: dashboard-master (CAPA 3A)
  - Ejemplo: projector-live-display (4B2)

Validación:
  - Sujetos a Guardian (excepto CAPA 0)
  - Heredan permisos en cascada
  - Auditoría de acciones
```

---

## 🛠️ TIPO 2: Agentes Externos / Trabajadores (Helpers)

### Qué Son

**Herramientas especializadas que AYUDAN con la app y código.**

NO son parte de la arquitectura, son TRABAJADORES que Claude delega.

### Características

```yaml
Propósito:
  - Ahorrar contexto de Claude principal
  - Ejecutar tareas pesadas
  - Obtener información real del sistema
  - NO gastar tokens en trabajo repetitivo

Ubicación:
  - MCP tools (Firebase, Context7, Playwright)
  - Task tool con subagent_type
  - Skills como claude-codex-tandem
  - NO en .claude/.agents/

Notación:
  - NO tienen ubicación blockchain
  - Referencia por herramienta
  - Ejemplo: mcp__firebase__*
  - Ejemplo: Task(Explore)

Delegación:
  - Claude les DELEGA trabajo
  - Ejecutan autónomamente
  - Retornan resultado
  - Claude mantiene espacio para razonar
```

### Ejemplos Completos

#### 1. Firebase MCP (Estado Real)

```yaml
Herramientas:
  - mcp__firebase__firestore_get_documents
  - mcp__firebase__firestore_query_collection
  - mcp__firebase__auth_get_users
  - 40+ tools disponibles

Uso:
  Obtener estado REAL de Firestore
  Ejemplo: "¿Qué eventos tiene usuario X?"

Delegación:
  → Claude: "Necesito eventos de usuario123"
  → Firebase MCP: Query Firestore
  → Firebase MCP: Retorna datos reales
  → Claude: Analiza datos SIN gastar contexto

Ahorro: 2000-5000 tokens contexto
```

#### 2. Context7 MCP (Docs Actualizadas)

```yaml
Herramientas:
  - mcp__context7__resolve-library-id
  - mcp__context7__get-library-docs

Uso:
  Obtener documentación ACTUALIZADA frameworks
  Ejemplo: "Docs de Next.js 15 App Router"

Delegación:
  → Claude: "Necesito docs Next.js routing"
  → Context7: Fetch docs actualizadas
  → Context7: Retorna docs relevantes
  → Claude: Usa docs SIN cargarlas previamente

Ahorro: 5000-10000 tokens contexto
```

#### 3. Playwright MCP (UI Real)

```yaml
Herramientas:
  - mcp__playwright__browser_navigate
  - mcp__playwright__browser_snapshot
  - mcp__playwright__browser_take_screenshot
  - 15+ tools disponibles

Uso:
  Ver estado REAL de UI
  Ejemplo: "Screenshot dashboard actual"

Delegación:
  → Claude: "Muéstrame dashboard"
  → Playwright: Abre browser
  → Playwright: Captura screenshot
  → Claude: Analiza visual SIN suposiciones

Ahorro: 0 tokens, VERDAD VISUAL
```

#### 4. Task Tool con Explore (Code Analysis)

```yaml
Uso:
  Análisis profundo de código
  Ejemplo: "Analiza componente.tsx"

Delegación:
  → Claude: "Necesito entender este componente"
  → Task(Explore): Lee archivo + dependencies
  → Task(Explore): Analiza patterns
  → Task(Explore): Retorna análisis
  → Claude: Usa análisis SIN leer archivo

Ahorro: 10000-20000 tokens (archivos grandes)
```

---

## ⚖️ Comparación Lado a Lado

| Aspecto | Blockchain Viviente | Externos / Trabajadores |
|---------|---------------------|-------------------------|
| **Propósito** | Ejecutar arquitectura | Ahorrar contexto |
| **Ubicación** | `.claude/.agents/` | MCP tools, Task, Skills |
| **Permanencia** | Permanente | Temporal (per-task) |
| **Documentación** | Spec completa (.md) | Referencia herramienta |
| **Notación** | NÚMERO LETRA URL | Nombre herramienta |
| **Guardian** | Sujeto a validación | NO aplica |
| **Blockchain** | Aparece en diagrama | NO aparece |
| **Ejemplo** | `plan-guardian` | `mcp__firebase__*` |

---

## 🧠 Por Qué Es CRÍTICO Entender Esto

### Problema: Saturar Contexto

```yaml
SIN delegación:
  Claude lee 10 archivos: 50k tokens
  Claude query Firestore: 5k tokens
  Claude carga docs: 10k tokens

  Total: 65k tokens consumidos
  Resultado: Contexto saturado, menos espacio para razonar

CON delegación:
  Firebase MCP query: 0 tokens Claude
  Task(Explore) analiza archivos: 0 tokens Claude
  Context7 carga docs: 0 tokens Claude

  Total: 0 tokens consumidos
  Resultado: Claude mantiene TODA capacidad de razonamiento
```

### Solución: Delegar Inteligentemente

```yaml
Claude principal:
  - Diseño arquitectónico
  - Decisiones de negocio
  - Lógica compleja
  - Orquestación

Trabajadores externos:
  - Obtener datos
  - Leer archivos grandes
  - Cargar docs
  - Screenshots UI
  - Análisis repetitivo

Resultado: 10x más eficiente
```

---

## 🎯 Reglas de Delegación

### 1. Información Real → Firebase MCP

```yaml
Pregunta: "¿Cuántos eventos tiene usuario X?"
Delegar a: mcp__firebase__firestore_query_collection

NO hacer:
  ❌ Claude intenta recordar/suponer
  ❌ Buscar en código fuente

SÍ hacer:
  ✅ Firebase MCP query directo
  ✅ Datos REALES en 2 segundos
```

### 2. Archivos Grandes → Task(Explore) o Codex

```yaml
Archivo: page.tsx (32k tokens)
Delegar a: claude-codex-tandem

NO hacer:
  ❌ Claude lee archivo completo (satura contexto)

SÍ hacer:
  ✅ Codex analiza visualmente
  ✅ Claude recibe solo insights
  ✅ 25k tokens ahorrados
```

### 3. Docs Framework → Context7 MCP

```yaml
Pregunta: "¿Cómo funciona App Router en Next.js 15?"
Delegar a: mcp__context7__get-library-docs

NO hacer:
  ❌ Claude usa conocimiento interno (puede estar desactualizado)

SÍ hacer:
  ✅ Context7 fetch docs ACTUALIZADAS
  ✅ Información garantizada correcta
```

### 4. Debug Visual → Playwright MCP

```yaml
Problema: "Dashboard muestra incorrectamente"
Delegar a: mcp__playwright__browser_take_screenshot

NO hacer:
  ❌ Claude intenta suponer qué muestra UI

SÍ hacer:
  ✅ Playwright captura screenshot REAL
  ✅ Claude ve EXACTAMENTE qué está mal
```

---

## 🎯 Regla de Oro

```yaml
Pregunta: "¿Es agente blockchain o trabajador externo?"

Si respuesta es SÍ a:
  - ¿Ejecuta nodo permanente del sistema?
  - ¿Aparece en blockchain viviente diagram?
  - ¿Requiere spec completa (.md)?

Entonces: AGENTE BLOCKCHAIN VIVIENTE

Si respuesta es SÍ a:
  - ¿Ahorra contexto Claude?
  - ¿Obtiene info real del sistema?
  - ¿Es herramienta temporal?

Entonces: TRABAJADOR EXTERNO
```

---

**Creado por**: Patricio + Claude (Hiperfoco Sábado Noche)
**Crítico para**: ambiente-perfecto-mapeo, delegación eficiente, contexto protegido
**Estado**: ✅ Completo - Referencia permanente

**Última actualización**: 26 de Octubre 2025

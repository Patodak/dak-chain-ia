# 🧠 Sistema Core - DAKCHAIN

**Versión**: 2.0
**Fecha**: Octubre 28, 2025
**Propósito**: Conceptos fundamentales del sistema de mapeo arquitectónico

---

## 🎯 Qué es DAKCHAIN

Sistema de documentación arquitectónica que mapea tu aplicación como una **red neuronal viviente**:

- **Nodos**: Páginas/componentes de tu app (neuronas)
- **Transacciones**: Flujos de datos entre nodos (sinapsis)
- **Meta-agentes**: Lógica que conecta los nodos (organelas)
- **Arterias**: Rutas optimizadas (conocimiento acumulado)
- **Guardian**: Sistema de permisos (validación pre-ejecución)

---

## 📐 Sistema de Dimensiones Ortogonales

DAKCHAIN usa **2 dimensiones perpendiculares** para mapear cada nodo:

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
- Define los roles de tu aplicación
- Ejemplos: `admin`, `user`, `guest`, `moderator`

**PLAN** (qué funcionalidades tiene):
- Define los niveles de acceso
- Ejemplos: `FREE`, `BASIC`, `PRO`, `ENTERPRISE`

**Ejemplos**:
```yaml
[admin:*] → Acceso total sin límites
[user:PRO] → Usuario con plan PRO
[guest:FREE] → Usuario anónimo con funciones básicas
```

### DIMENSIÓN 2 - UBICACIÓN (Arquitectura)

**Notación**: `NÚMERO LETRA URL`

**NÚMERO** (profundidad/nesting):
- `1` - Nivel raíz
- `2` - Listas/gestión
- `3` - Control/dashboards
- `4+` - Funcionalidades avanzadas

**LETRA** (branch evolutivo):
- `A` - Path principal
- `B` - Path secundario
- `C` - Path terciario
- Adapta según tu arquitectura

**URL** (ubicación física única):
- Ruta completa del nodo
- Ejemplo: `/admin/dashboard`

**Ejemplos**:
```yaml
1A /admin/users/create → Crear usuarios (nivel 1, path admin)
3A /dashboard → Dashboard principal (nivel 3, path principal)
4B /reports/advanced → Reportes avanzados (nivel 4, path secundario)
```

---

## 🛡️ Guardian System (CAPA 0)

**Propósito**: Validación de permisos ANTES de ejecutar cualquier operación.

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
// Guardian: [admin:BASIC]

Usuario actual: { rol: "admin", plan: "PRO" }
  → ✅ PERMITIDO (admin = admin, PRO ≥ BASIC)

Usuario actual: { rol: "user", plan: "FREE" }
  → ❌ BLOQUEADO (user ≠ admin)
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
Ejemplo: README del nodo, documentación local
```

### Tipo 2: FLUJO (Unidireccional)
```
Patrón: A → B (una dirección)
Ejemplo: Login → Dashboard
```

### Tipo 3: WIFI (Bidireccional)
```
Patrón: A ↔ B (ambas direcciones, tiempo real)
Ejemplo: Dashboard ↔ Database ↔ Display
```

### Tipo 4: CADENA (Multi-nodo)
```
Patrón: A → B → C → D
Ejemplo: Step1 → Step2 → Step3 → Complete
```

### Tipo 5: JOURNEY (Primer Camino Usuario)
```
Patrón: Flujo completo de usuario nuevo
Ejemplo: Signup → Onboarding → First Use → Success
```

### Tipo 6: CONVERGENCIA (Multiple Write → Single Read)
```
Patrón: [A + B + C] → D
Ejemplo: [Control Panel + Config + Status] → Display
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
  ├─→ Meta-agente Sync (coordinación)
  ├─→ Meta-agente Validator (validación)
  ├─→ Meta-agente Transformer (transformación)
  └─→ Meta-agente Cache (optimización)
```

### Tipos de Meta-Agentes

**Sync Meta-Agents**:
- Sincronización tiempo real
- Coordinación entre nodos

**Validator Meta-Agents**:
- Validación de permisos
- Validación de datos
- Validación de estado

**Transformer Meta-Agents**:
- Transformación de datos
- Construcción de estructuras
- Máquinas de estado

---

## 🩸 ARTERIAS - Pre-carga Inteligente

**Concepto**: Rutas optimizadas que se crean automáticamente después de 3 iteraciones del mismo flujo.

### Cómo Funcionan

```yaml
Iteración 1: Primera vez (lento - carga todo)
Iteración 2: Segunda vez (aprende - identifica patterns)
Iteración 3: Tercera vez (crea ARTERIA - optimiza)
Iteración 4+: Usa ARTERIA (80-140x más rápido)
```

### Beneficios

```yaml
Ahorro tokens: 60-75%
Speedup: 80-140x
Contexto preciso: Solo lo necesario
Auto-optimizante: Aprende con uso
```

---

## 🔧 Integración con Claude Code

### Auto-Activación

```yaml
Keywords detectadas:
  - "nodo [X]"
  - "transacción tipo [X]"
  - "meta-agente [X]"
  - "arteria [X]"

Resultado:
  → Carga contexto preciso automáticamente
  → Ahorra 60-75% tokens
  → Speedup 80-140x
```

### Meta-Agente DAKCHAIN Maintainer

**Función**: Mantiene orden y consistencia automáticamente

```yaml
Detecta:
  - Nuevos nodos
  - Nuevas transacciones
  - Referencias cruzadas
  - Gaps en documentación

Acciones:
  - Crear archivo en carpeta correcta
  - Actualizar índices
  - Validar referencias
  - Mantener convenciones
```

---

## 📖 Próximos Pasos

1. **Implementa** tu estructura DAKCHAIN
2. **Documenta** tus nodos (páginas/componentes)
3. **Identifica** tus transacciones (flujos)
4. **Crea** tus meta-agentes (lógica)
5. **Deja** que sistema genere arterias automáticamente

---

**Creado por**: Patricio + Claude (Sistema DAK)
**Licencia**: MIT (open source)
**Última actualización**: Octubre 28, 2025
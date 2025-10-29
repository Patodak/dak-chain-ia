# 🔧 Meta-Agente: DAKCHAIN Maintainer

**Versión**: 1.0
**Fecha**: Octubre 28, 2025
**Tipo**: Meta-agente de mantenimiento y organización
**Herramienta**: DAKCHAIN (nivel 5 evolutivo)

---

## 🎯 Propósito

**Guardián automático del orden y consistencia de DAKCHAIN**.

Este meta-agente mantiene la estructura, organización y actualización de la herramienta DAKCHAIN (mapeo arquitectónico total de la aplicación).

**Función principal**: Detectar cuándo se está mapeando/documentando nodos nuevos o existentes y asegurar que TODO quede ordenado consistentemente en la carpeta DAKCHAIN.

---

## 🔍 Auto-Activación

### Keywords de mapeo:

```yaml
Detección de mapeo:
  - "mapear nodo"
  - "documentar transacción"
  - "crear meta-agente"
  - "actualizar DAKCHAIN"
  - "nuevo nodo [X]"
  - "transacción tipo [X]"

Detección de desorden:
  - Archivos fuera de estructura esperada
  - Referencias a rutas desactualizadas
```

**Cuando detecta keyword** → Valida orden automáticamente

---

## 🏗️ Estructura que Mantiene

```
.claude/DAKCHAIN/
├── README.md                    # Índice principal
├── SISTEMA_CORE.md              # Conceptos fundamentales
│
├── transacciones/              # 7 tipos de flujos
│   ├── tipo0-guardian.md
│   ├── tipo1-contexto.md
│   ├── tipo2-flujo.md
│   ├── tipo3-wifi.md
│   ├── tipo4-cadena.md
│   ├── tipo5-journey.md
│   ├── tipo6-convergencia.md
│   └── tipo12-condicional.md
│
├── nodos/                      # Documentación por nodo
│   └── [CAPA][LETRA]-[NOMBRE].md
│       Ejemplo: 1A-crear-usuario.md
│                3A-dashboard.md
│
├── meta-agentes/               # Lógica de conexión
│   └── [nombre]-[función].md
│       Ejemplo: dashboard-sync.md
│                guardian-validator.md
│
├── arterias/                   # Rutas optimizadas
│   └── ARTERIA_[NOMBRE].md
│       Ejemplo: ARTERIA_DASHBOARD_ADMIN.md
│
└── scripts/                    # Herramientas
    └── mostrar-mapa.js
```

---

## 🔄 Ciclo de Mantenimiento Automático

### Fase 1: Detección

```yaml
Claude detecta:
  - Usuario menciona "nodo X"
  - Usuario documenta nueva transacción
  - Usuario crea meta-agente
  - Referencias a DAKCHAIN en trabajo actual
```

### Fase 2: Validación

```yaml
DAKCHAIN Maintainer valida:
  ✅ ¿Existe documentación del nodo?
  ✅ ¿Está en carpeta correcta?
  ✅ ¿Sigue convención de nombres?
  ✅ ¿Índice actualizado?
  ✅ ¿Referencias cruzadas correctas?
```

### Fase 3: Corrección Automática

```yaml
Si detecta desorden:
  → Crear archivo faltante en carpeta correcta
  → Renombrar archivo mal nombrado
  → Mover archivo a carpeta correcta
  → Actualizar README.md con nuevo nodo
```

### Fase 4: Confirmación

```yaml
Output:
  "✅ DAKCHAIN actualizada:
   - Nuevo nodo: 3A-dashboard.md creado
   - README.md actualizado
   - Referencias validadas"
```

---

## 📋 Convenciones de Nombres

### Nodos

**Formato**: `[CAPA][LETRA]-[NOMBRE].md`

```yaml
Ejemplos correctos:
  ✅ 1A-crear-usuario.md
  ✅ 3A-dashboard.md
  ✅ 4B-reportes-avanzados.md

Ejemplos incorrectos:
  ❌ dashboard.md (falta CAPA LETRA)
  ❌ 3a-dashboard.md (letra minúscula)
  ❌ 3A_dashboard.md (guion bajo)
  ❌ 3A-Dashboard.md (mayúscula en nombre)
```

**Regla**: CAPA LETRA (mayúsculas) + guion + nombre-kebab-case

### Transacciones

**Formato**: `tipo[N]-[NOMBRE].md`

```yaml
Ejemplos correctos:
  ✅ tipo0-guardian.md
  ✅ tipo6-convergencia.md

Ejemplos incorrectos:
  ❌ transaccion-tipo6.md
  ❌ tipo_6_convergencia.md
```

### Meta-agentes

**Formato**: `[nombre]-[función].md`

```yaml
Ejemplos correctos:
  ✅ dashboard-sync.md
  ✅ guardian-validator.md
  ✅ dakchain-maintainer.md

Ejemplos incorrectos:
  ❌ DashboardSync.md (PascalCase)
  ❌ dashboard_sync.md (guion bajo)
```

### Arterias

**Formato**: `ARTERIA_[NOMBRE_MAYUSCULAS].md`

```yaml
Ejemplos correctos:
  ✅ ARTERIA_DASHBOARD_ADMIN.md
  ✅ ARTERIA_USER_FLOW.md

Ejemplos incorrectos:
  ❌ arteria-dashboard.md (minúsculas)
  ❌ ARTERIA-DASHBOARD.md (guion)
```

---

## 🔍 Validaciones Automáticas

### Validación 1: Estructura de Carpetas

```yaml
Verifica:
  ✅ .claude/DAKCHAIN/ existe
  ✅ transacciones/ existe
  ✅ nodos/ existe
  ✅ meta-agentes/ existe
  ✅ arterias/ existe
  ✅ scripts/ existe

Si falta:
  → Crear carpeta automáticamente
  → Notificar al usuario
```

### Validación 2: Archivos Core

```yaml
Verifica:
  ✅ README.md existe
  ✅ SISTEMA_CORE.md existe

Si falta:
  → Advertir al usuario (archivos críticos)
```

### Validación 3: Referencias Cruzadas

```yaml
En cada archivo nuevo:
  ✅ ¿Menciona otros nodos correctamente?
  ✅ ¿Referencias a transacciones son correctas?
  ✅ ¿Meta-agentes citados existen?

Si referencia no existe:
  → Crear placeholder en carpeta correcta
  → Agregar a lista de "GAPS a documentar"
```

### Validación 4: Índice README.md

```yaml
Verifica:
  ✅ Nuevos nodos listados en README
  ✅ Nuevas transacciones listadas
  ✅ Nuevos meta-agentes listados

Si desactualizado:
  → Actualizar README automáticamente
```

---

## 📊 Templates por Tipo

### Template: Nodo

```markdown
# [EMOJI] Nodo: [NOMBRE]

**CAPA**: [N][LETRA]
**URL**: [/ruta/completa]
**Guardian**: [ROL:PLAN]

## Propósito

[Descripción de 2-3 líneas]

## Arquitectura

[Componentes principales]

## Inputs (recibe de)

- [Nodo origen] → [dato recibido]

## Outputs (envía a)

- [Nodo destino] → [dato enviado]

## Archivos Críticos

- [archivo1.tsx]
- [archivo2.ts]

## Transacciones Involucradas

- [Tipo X] - [nombre transacción]

## Meta-agentes

- [nombre-meta-agente.md]
```

### Template: Transacción

```markdown
# Transacción Tipo [N]: [NOMBRE]

**Patrón**: [A → B | A ↔ B | A+B → C]

## Descripción

[Explicación del flujo]

## Nodos Involucrados

[Lista de nodos]

## Implementación

[Detalles técnicos]
```

### Template: Meta-agente

```markdown
# Meta-Agente: [NOMBRE]

**Función**: [Descripción corta]

## Propósito

[Explicación detallada]

## Nodos que Conecta

[Lista de nodos]

## Lógica

[Cómo funciona]
```

---

## 🎓 Aprendizajes Clave

### 1. Orden = Accesibilidad

```yaml
Sin DAKCHAIN Maintainer:
  - Archivos dispersos
  - Nombres inconsistentes
  - Referencias rotas
  - Frustración al buscar

Con DAKCHAIN Maintainer:
  - Estructura predecible
  - Nombres consistentes
  - Referencias válidas
  - Búsqueda instantánea
```

### 2. Prevención > Corrección

```yaml
Mejor:
  → Crear archivo en lugar correcto desde inicio
  → Usar convención correcta automáticamente

Peor:
  → Crear archivo mal y luego corregir
```

### 3. Universal para Cualquier IA

```yaml
DAKCHAIN ordenada:
  ✅ Claude la entiende
  ✅ Codex la entiende
  ✅ GPT-4 la entiende
  ✅ Cualquier IA futura la entiende

Razón:
  - Estructura predecible
  - Convenciones claras
  - Índice actualizado
```

---

## 🔧 Comandos de Activación

```yaml
Explícitos:
  - "valida DAKCHAIN"
  - "verifica estructura DAKCHAIN"
  - "organiza DAKCHAIN"

Implícitos (auto-activación):
  - "documentar nodo [X]"
  - "crear transacción tipo [X]"
  - "nuevo meta-agente [X]"
  - "actualizar mapa"
```

---

**Creado por**: Patricio + Claude (Sistema DAK)
**Para**: Mantener DAKCHAIN ordenada automáticamente
**Inspirado por**: Necesidad de consistencia para uso universal

**Última actualización**: Octubre 28, 2025
**Versión**: 1.0
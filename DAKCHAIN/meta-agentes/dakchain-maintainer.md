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
  - "blockchain viviente" (nombre antiguo)
  - Archivos fuera de .claude/DAKCHAIN/
  - Referencias a rutas desactualizadas
```

**Cuando detecta keyword** → Valida orden automáticamente

---

## 🏗️ Estructura que Mantiene

```
.claude/DAKCHAIN/
├── README.md                    # Índice principal (mantener actualizado)
├── SISTEMA_CORE.md              # Conceptos fundamentales
├── MAPA_VISUAL_COMPLETO.md     # Diagrama completo del sistema
│
├── transacciones/              # 7 tipos de flujos
│   ├── tipo0-guardian.md       # Sistema de permisos
│   ├── tipo1-contexto.md       # Documentación de nodo
│   ├── tipo2-flujo.md          # Flujo unidireccional A→B
│   ├── tipo3-wifi.md           # Sync bidireccional A↔B
│   ├── tipo4-cadena.md         # Multi-nodo A→B→C
│   ├── tipo5-journey.md        # Primer camino usuario
│   ├── tipo6-convergencia.md   # Multiple Write → Single Read
│   └── tipo12-condicional.md   # Mismo nodo, contenido diferente
│
├── nodos/                      # Documentación por nodo
│   ├── [CAPA][LETRA]-[NOMBRE].md
│   │   Ejemplo: 1A-crear-evento.md
│   │            3A-dashboard.md
│   │            4B2-live.md
│
├── meta-agentes/               # Lógica de conexión
│   ├── [nombre]-[función].md
│   │   Ejemplo: dashboard-projector-sync-master.md
│   │            firebase-realtime-sync.md
│   │            guardian-validator.md
│
├── arterias/                   # Rutas optimizadas (creadas en 3ra vez)
│   └── ARTERIA_[NOMBRE].md
│       Ejemplo: ARTERIA_PROYECTOR_MULTICATEGORIA.md
│
└── scripts/                    # Herramientas de visualización
    └── mostrar-mapa.js
```

---

## 🔄 Ciclo de Mantenimiento Automático

### Fase 1: Detección

```yaml
Claude detecta:
  - Usuario menciona "nodo 4B2"
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
  → Actualizar MAPA_VISUAL_COMPLETO.md si necesario
```

### Fase 4: Confirmación

```yaml
Output:
  "✅ DAKCHAIN actualizada:
   - Nuevo nodo: 4B2-live.md creado
   - README.md actualizado
   - Referencias validadas"
```

---

## 📋 Convenciones de Nombres

### Nodos

**Formato**: `[CAPA][LETRA]-[NOMBRE].md`

```yaml
Ejemplos correctos:
  ✅ 1A-crear-evento.md
  ✅ 3A-dashboard.md
  ✅ 4B1-setup.md
  ✅ 4B2-live.md

Ejemplos incorrectos:
  ❌ dashboard.md (falta CAPA LETRA)
  ❌ 3a-dashboard.md (letra minúscula)
  ❌ 3A_dashboard.md (guion bajo en vez de guion)
  ❌ 3A-Dashboard.md (mayúscula en nombre)
```

**Regla**: CAPA LETRA (mayúsculas) + guion + nombre-kebab-case

### Transacciones

**Formato**: `tipo[N]-[NOMBRE].md`

```yaml
Ejemplos correctos:
  ✅ tipo0-guardian.md
  ✅ tipo6-convergencia.md
  ✅ tipo12-condicional.md

Ejemplos incorrectos:
  ❌ transaccion-tipo6.md
  ❌ tipo_6_convergencia.md
  ❌ Tipo6-Convergencia.md
```

**Regla**: "tipo" + número + guion + nombre-kebab-case

### Meta-agentes

**Formato**: `[nombre]-[función].md`

```yaml
Ejemplos correctos:
  ✅ dashboard-projector-sync-master.md
  ✅ firebase-realtime-sync.md
  ✅ guardian-validator.md
  ✅ dakchain-maintainer.md (este archivo)

Ejemplos incorrectos:
  ❌ DashboardProjectorSync.md (PascalCase)
  ❌ dashboard_projector_sync.md (guion bajo)
  ❌ sync-master.md (falta contexto)
```

**Regla**: nombre-descriptivo-con-guiones + función específica

### Arterias

**Formato**: `ARTERIA_[NOMBRE_MAYUSCULAS].md`

```yaml
Ejemplos correctos:
  ✅ ARTERIA_PROYECTOR_MULTICATEGORIA.md
  ✅ ARTERIA_SETUP_BATTLES_FLOW.md
  ✅ ARTERIA_TOP16_BRACKET_FIX.md

Ejemplos incorrectos:
  ❌ arteria-proyector.md (minúsculas)
  ❌ ARTERIA-PROYECTOR.md (guion en vez de guion bajo)
  ❌ proyector-arteria.md (orden invertido)
```

**Regla**: "ARTERIA_" + NOMBRE_EN_MAYUSCULAS_CON_GUION_BAJO

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
  ✅ MAPA_VISUAL_COMPLETO.md existe

Si falta:
  → Advertir al usuario (archivos críticos)
  → No crear automáticamente (requieren contenido específico)
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
  ✅ Counts actualizados (X nodos, Y transacciones)

Si desactualizado:
  → Actualizar README automáticamente
  → Regenerar lista de archivos
```

---

## 🎯 Casos de Uso

### Caso 1: Usuario mapea nuevo nodo

```yaml
Usuario: "Necesito documentar nodo 5C-participante"

DAKCHAIN Maintainer:
  1. Detecta keyword "documentar nodo"
  2. Valida: ¿Existe nodos/5C-participante.md?
     → NO existe
  3. Crea: .claude/DAKCHAIN/nodos/5C-participante.md
  4. Usa template de nodo estándar
  5. Actualiza README.md
  6. Confirma: "✅ Nodo 5C-participante creado"
```

### Caso 2: Usuario crea transacción nueva

```yaml
Usuario: "Documentar transacción tipo 7 bidireccional con cache"

DAKCHAIN Maintainer:
  1. Detecta "transacción tipo 7"
  2. Valida: ¿Existe transacciones/tipo7-bidireccional-cache.md?
     → NO existe
  3. Crea archivo en carpeta correcta
  4. Usa template de transacción
  5. Actualiza README.md
  6. Actualiza MAPA_VISUAL_COMPLETO.md con nuevo tipo
  7. Confirma: "✅ Transacción tipo7 documentada"
```

### Caso 3: Usuario menciona nodo sin documentar

```yaml
Usuario: "El problema está en 4B2"

DAKCHAIN Maintainer:
  1. Detecta mención de nodo "4B2"
  2. Valida: ¿Existe nodos/4B2-*.md?
     → SÍ existe: nodos/4B2-live.md
  3. No hace nada (ya documentado)
  4. Silencioso (no interrumpe)
```

### Caso 4: Usuario usa nombre antiguo

```yaml
Usuario: "lee blockchain viviente"

DAKCHAIN Maintainer:
  1. Detecta "blockchain viviente" (nombre antiguo)
  2. Traduce automáticamente a "DAKCHAIN"
  3. Busca en .claude/DAKCHAIN/
  4. Notifica suavemente: "Nota: 'blockchain viviente' ahora es DAKCHAIN"
  5. Continúa con operación correcta
```

### Caso 5: Archivo en lugar incorrecto

```yaml
Situación: Archivo transacciones/dashboard-sync.md (debería ser meta-agente)

DAKCHAIN Maintainer:
  1. Detecta archivo en carpeta incorrecta
  2. Analiza contenido: Es meta-agente (no transacción)
  3. Mueve: meta-agentes/dashboard-sync.md
  4. Actualiza referencias en otros archivos
  5. Confirma: "✅ dashboard-sync.md movido a meta-agentes/"
```

---

## 🔄 Integración con Skills

### Con ambiente-perfecto-mapeo

```yaml
ambiente-perfecto:
  FASE 1 - IDENTIFICACIÓN:
    → Lee DAKCHAIN para identificar nodos
    → DAKCHAIN Maintainer valida que nodos existen

  FASE 2 - VALIDACIÓN:
    → Valida existencia de meta-agentes
    → DAKCHAIN Maintainer verifica estructura

  FASE 4 - DOCUMENTAR GAPS:
    → Si falta nodo, crea documentación
    → DAKCHAIN Maintainer asegura orden correcto

  FASE 6 - ACTUALIZAR:
    → Actualiza DAKCHAIN con nuevo conocimiento
    → DAKCHAIN Maintainer mantiene consistencia
```

**Relación**: ambiente-perfecto OPERA, DAKCHAIN Maintainer ORGANIZA

### Con auto-repo-updater

```yaml
auto-repo-updater:
  - Lee archivos de DAKCHAIN
  - Sube a GitHub dak-chain-ia
  - DAKCHAIN Maintainer asegura que TODO esté ordenado ANTES de subir

Flujo:
  1. Usuario: "subir al repo"
  2. DAKCHAIN Maintainer: Valida estructura completa
  3. DAKCHAIN Maintainer: Corrige desorden si existe
  4. auto-repo-updater: Sube TODO ordenado
```

**Relación**: DAKCHAIN Maintainer valida, auto-repo-updater sube

### Con claude-codex-tandem

```yaml
claude-codex-tandem:
  FASE 0.5 - MAPEO PRE-ANÁLISIS:
    → ambiente-perfecto lee DAKCHAIN
    → DAKCHAIN Maintainer valida consistencia
    → Codex recibe mapa ordenado y completo

Flujo:
  1. Usuario activa Tandem
  2. DAKCHAIN Maintainer: Pre-valida estructura
  3. ambiente-perfecto: Mapea ambiente
  4. Tandem: Trabaja con mapa ordenado
```

**Relación**: DAKCHAIN Maintainer asegura calidad del mapa que Tandem usa

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

## Firebase Collections

[Colecciones usadas]

## Código de Referencia

[Snippets TypeScript]
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

## Archivos

[Código fuente]
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
  → Reorganizar después
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

### 4. Mantenimiento = Zero Fricción

```yaml
Usuario NO debe:
  ❌ Recordar convenciones
  ❌ Validar estructura manualmente
  ❌ Actualizar índices manualmente
  ❌ Mover archivos manualmente

DAKCHAIN Maintainer hace TODO automáticamente
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

## 📈 Métricas de Éxito

```yaml
Estructura:
  ✅ 100% archivos en carpetas correctas
  ✅ 100% nombres siguen convención
  ✅ 0 archivos huérfanos

Referencias:
  ✅ 100% referencias cruzadas válidas
  ✅ 0 enlaces rotos
  ✅ README.md siempre actualizado

Usabilidad:
  ✅ Tiempo de búsqueda: <5 segundos
  ✅ 0 confusión sobre dónde crear archivo
  ✅ 0 reorganización manual necesaria
```

---

**Creado por**: Patricio + Claude (Sistema DAK)
**Para**: Mantener DAKCHAIN ordenada automáticamente
**Inspirado por**: Necesidad de consistencia para uso universal (Claude + Codex + comunidad)

**Última actualización**: Octubre 28, 2025
**Versión**: 1.0

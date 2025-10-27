# 🧬 SKILLS NUTREN META-AGENTES

**Framework**: DAK CHAIN IA
**Versión**: 1.0
**Para**: Comprender cómo skills enriquecen meta-agentes

---

## 🎯 Concepto Clave

**Skills → Meta-Agentes → Coordinación Enriquecida**

```yaml
Pattern:
  1. Skill documenta conocimiento específico
  2. Meta-agente LEE la skill
  3. Meta-agente enriquece su coordinación
  4. Resultado: Coordinación más inteligente
```

---

## 📊 Arquitectura Completa

```yaml
AGENTES = NODOS (1 a 1):
  - 1 Agente por URL/Nodo
  - Especialista de esa página
  - NO leen skills (conocen su nodo)

META-AGENTES = TRANSACCIONES (1 a 1):
  - 1 Meta-Agente por Transacción
  - Coordinan ENTRE nodos
  - SÍ leen skills ⭐
  - Enriquecen con conocimiento externo

SKILLS = CONOCIMIENTO ESPECÍFICO:
  - Documentan tecnología/dominio
  - Meta-agentes las consultan
  - Ejemplo: firebase-expert, breaking-tournament-domain
```

---

## 🔥 Ejemplo Real: Manager Battle Pro

### Skill: firebase-expert

**Contiene**:
```markdown
# Firebase Expert Skill

## Firestore Real-time
- onSnapshot() para cambios en tiempo real
- Latencia típica: <1 segundo
- Pattern: subscribe on mount, unsubscribe on unmount

## Best Practices
- Usar compound queries cuando posible
- Limitar listeners activos
- Cleanup en useEffect return
```

### Meta-Agente: metagente-wifi-dashboard-proyector

**SIN skill** (conocimiento básico):
```yaml
Tarea: Sincronizar Dashboard ↔ Proyector

Conocimiento:
  - Sabe que hay sincronización
  - Sabe que es tiempo real
  - NO sabe cómo implementar
  - NO sabe best practices Firebase

Resultado:
  ❌ Coordinación genérica
  ❌ Puede sugerir soluciones ineficientes
```

**CON skill** (conocimiento enriquecido):
```yaml
Tarea: Sincronizar Dashboard ↔ Proyector

Conocimiento:
  - Lee firebase-expert skill
  - Sabe usar onSnapshot()
  - Sabe latencia <1s
  - Sabe cleanup patterns
  - Conoce best practices

Resultado:
  ✅ Coordinación específica Firebase
  ✅ Soluciones optimizadas
  ✅ Código siguiendo best practices
```

**Código generado por Meta-Agente CON skill**:
```typescript
// Meta-agente lee firebase-expert skill
// Sabe usar onSnapshot pattern correcto

useEffect(() => {
  // Subscription pattern (de skill)
  const unsubscribe = onSnapshot(
    doc(db, "events", eventId),
    (snapshot) => {
      setEventData(snapshot.data());
    }
  );

  // Cleanup pattern (de skill)
  return () => unsubscribe();
}, [eventId]);
```

---

## 🎯 Otro Ejemplo: breaking-tournament-domain

### Skill: breaking-tournament-domain-expert

**Contiene**:
```markdown
# Breaking Tournament Domain

## Terminología
- AKA: Alias name (nombre de batalla)
- Cypher: Ronda eliminatoria
- TOP8: 8 mejores competidores
- Battle: Enfrentamiento 1v1

## Reglas
- Jueces impares (3, 5, 7)
- Rounds: Octavos → Cuartos → Semifinales → Final
- Winner advances, loser eliminated
```

### Meta-Agente: metagente-cadena-setup-battles

**SIN skill**:
```yaml
Tarea: Coordinar transición Setup → Battles

Conocimiento:
  - Sabe que hay setup
  - Sabe que hay battles
  - NO entiende terminología breaking
  - NO conoce reglas del dominio

Resultado:
  ❌ Puede usar términos incorrectos
  ❌ No valida reglas de breaking
```

**CON skill**:
```yaml
Tarea: Coordinar transición Setup → Battles

Conocimiento:
  - Lee breaking-tournament-domain-expert
  - Entiende AKA, cypher, TOP8
  - Conoce reglas de jueces
  - Valida estructura rounds

Resultado:
  ✅ Usa terminología correcta
  ✅ Valida reglas breaking
  ✅ Coordinación dominio-específica
```

---

## 🔄 Flujo Completo

```yaml
PASO 1: Usuario solicita acción
  "Sincronizar dashboard con proyector"

PASO 2: Claude identifica transacción
  Transacción: WiFi (Dashboard ↔ Proyector)

PASO 3: Claude activa Meta-Agente
  metagente-wifi-dashboard-proyector

PASO 4: Meta-Agente consulta skills
  Busca: firebase-expert, realtime-sync-expert

PASO 5: Meta-Agente enriquece conocimiento
  Lee skills relevantes
  Integra best practices

PASO 6: Meta-Agente coordina con agentes
  agente-nodo-2A-dashboard (origen)
  agente-nodo-3B-proyector (destino)

PASO 7: Implementación enriquecida
  Código usa patterns de skills
  Solución optimizada
```

---

## 📚 Skills por Tipo de Meta-Agente

### Meta-Agente WiFi (Tiempo Real)
```yaml
Skills que nutren:
  - firebase-expert
  - realtime-sync-expert
  - websocket-patterns (si aplica)

Beneficio:
  Coordinación tiempo real optimizada
```

### Meta-Agente CADENA (Secuencial)
```yaml
Skills que nutren:
  - business-logic-expert
  - domain-expert (breaking, e-commerce, etc.)
  - validation-patterns

Beneficio:
  Validación entre pasos correcta
```

### Meta-Agente FLUJO (Simple)
```yaml
Skills que nutren:
  - navigation-patterns
  - state-management-expert
  - routing-expert

Beneficio:
  Transiciones suaves
```

---

## 🎯 Cómo Crear Skills para Meta-Agentes

### Template Skill

```markdown
# [Nombre] Expert Skill

## Propósito
Qué conocimiento documenta esta skill

## Conceptos Clave
Terminología específica que meta-agentes deben conocer

## Patterns
Patrones de implementación comunes

## Best Practices
Mejores prácticas del dominio/tecnología

## Anti-Patterns
Qué NO hacer (para que meta-agentes eviten)

## Ejemplos
Código/casos de uso reales
```

### Ejemplo: api-integration-expert

```markdown
# API Integration Expert Skill

## Propósito
Documentar patterns de integración con APIs externas

## Conceptos Clave
- REST: Stateless HTTP requests
- Rate Limiting: Max requests por tiempo
- Retry Logic: Reintentar en falla temporal
- Circuit Breaker: Parar requests si API caída

## Patterns

### Retry with Exponential Backoff
```typescript
async function fetchWithRetry(url, maxRetries = 3) {
  for (let i = 0; i < maxRetries; i++) {
    try {
      return await fetch(url);
    } catch (error) {
      if (i === maxRetries - 1) throw error;
      await sleep(2 ** i * 1000); // 1s, 2s, 4s
    }
  }
}
```

## Best Practices
✅ Siempre usar retry logic
✅ Implementar timeouts
✅ Manejar rate limiting
✅ Log errores para debugging

## Anti-Patterns
❌ Retry infinito (causa cascading failures)
❌ No manejar rate limits (ban de API)
❌ Hardcodear API keys en código
```

---

## 💡 Beneficios del Pattern

### 1. **Separación de Conocimiento**
```yaml
Agentes:
  - Conocen su nodo (página específica)
  - NO necesitan conocer tecnología externa

Meta-Agentes:
  - Coordinan entre nodos
  - Consultan skills para conocimiento técnico

Skills:
  - Documentan tecnología/dominio
  - Actualizables independientemente
```

### 2. **Actualización Fácil**
```yaml
Antes:
  Actualizar conocimiento Firebase →
  Editar TODOS los meta-agentes que usan Firebase
  Riesgo de inconsistencia

Después:
  Actualizar conocimiento Firebase →
  Editar SOLO firebase-expert skill
  Todos los meta-agentes automáticamente actualizados
```

### 3. **Reutilización**
```yaml
Skill firebase-expert nutren:
  - metagente-wifi-dashboard-proyector
  - metagente-cadena-setup-battles
  - metagente-notificaciones-auto
  - ... (todos los que usen Firebase)

1 skill → Múltiples meta-agentes beneficiados
```

### 4. **Especialización**
```yaml
Meta-Agente:
  "Soy coordinador entre Dashboard y Proyector"

Skill firebase-expert:
  "Aquí está cómo hacer sync en tiempo real correctamente"

Meta-Agente enriquecido:
  "Soy coordinador que usa onSnapshot() con cleanup correcto"
```

---

## 🔧 Implementación en Tu App

### Paso 1: Identificar Tecnologías/Dominios
```yaml
Lista tecnologías que usas:
  - Firebase
  - API REST externa
  - WebSockets
  - Dominio específico (breaking, e-commerce, etc.)
```

### Paso 2: Crear 1 Skill por Tecnología/Dominio
```yaml
firebase-expert.md
api-integration-expert.md
websocket-patterns.md
breaking-tournament-domain.md
```

### Paso 3: Documentar Patterns + Best Practices
```yaml
Cada skill contiene:
  - Conceptos clave
  - Patterns código
  - Best practices
  - Anti-patterns (qué evitar)
```

### Paso 4: Meta-Agentes Auto-Consultan
```yaml
Meta-Agente detecta:
  "Necesito sincronización tiempo real"

Meta-Agente busca:
  firebase-expert skill

Meta-Agente lee:
  Patterns de onSnapshot()

Meta-Agente usa:
  Conocimiento enriquecido para coordinar
```

---

## 📋 Checklist

- [ ] Identificar tecnologías clave de tu app
- [ ] Crear 1 skill por tecnología
- [ ] Documentar patterns en cada skill
- [ ] Documentar best practices
- [ ] Documentar anti-patterns
- [ ] Meta-agentes configurados para leer skills
- [ ] Validar que meta-agentes usan conocimiento de skills
- [ ] Actualizar skills cuando tecnología evoluciona

---

## 🎯 Resumen Ultra-Simple

```yaml
¿Qué es?:
  Skills = Documentos con conocimiento específico
  Meta-Agentes = Leen skills para enriquecer coordinación

¿Por qué importa?:
  Meta-Agentes coordinan MEJOR con conocimiento de skills

Ejemplo:
  Sin skill: "Sincroniza dashboard y proyector"
  Con skill: "Sincroniza usando onSnapshot() con cleanup"

Resultado:
  Coordinación más inteligente, código mejor
```

---

**Creado por**: DAK System
**Para**: Framework DAK CHAIN IA
**Propósito**: Documentar cómo skills enriquecen meta-agentes
**Estado**: v1.0

**Última actualización**: Octubre 27, 2025

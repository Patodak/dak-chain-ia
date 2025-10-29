# 🔄 TEMPLATE: Transaction Detector

**Basado en**: Casos reales de producción (apps multi-industria)
**Para**: Cualquier proyecto que necesite clasificar tipos de transacciones
**Versión**: 2.0

---

## 📋 Qué Son Transacciones

**Transacción** = Cómo se comunican/conectan las partes de tu app

NO es solo "transferencia de datos". Es el TIPO de flujo entre nodos.

### 🧬 Arquitectura: META-AGENTES

**CONCEPTO CLAVE**: Cada transacción tiene su propio Meta-Agente

```yaml
AGENTES = NODOS (1 a 1):
  - 1 Agente por URL/Nodo
  - Especialista de esa página específica

META-AGENTES = TRANSACCIONES (1 a 1):
  - 1 Meta-Agente por Transacción
  - Coordina ENTRE nodos
  - Transforma datos en tránsito

Relación:
  Transacción CADENA (A → B → C):
    - 3 agentes: [A], [B], [C]
    - 2 meta-agentes: [A→B], [B→C]

  Transacción WiFi (A ↔ B):
    - 2 agentes: [A], [B]
    - 1 meta-agente: [A↔B]
```

---

## 🎯 12 Tipos Universales

### Tipos Base (6)

**Tipo 1: CONTEXTO**
```yaml
Descripción: Un nodo trabajando solo, sin conexión activa
Ejemplos: Catálogo productos, Dashboard analytics solo-lectura
Cuándo usar: Nodo independiente, no requiere otros
```

**Tipo 2: FLUJO**
```yaml
Descripción: A → B (camino simple)
Ejemplos: Login → Dashboard, Producto → Carrito
Cuándo usar: Flujo de un punto a otro
```

**Tipo 3: WIFI**
```yaml
Descripción: A ↔ B (tiempo real bidireccional)
Ejemplos: Chat, Dashboard ↔ Display sincronizado
Cuándo usar: Tiempo real, actualizaciones automáticas
```

**Tipo 4: CADENA**
```yaml
Descripción: A → B → C (secuencia múltiple)
Ejemplos: Checkout process, Workflow multi-paso
Cuándo usar: Múltiples pasos secuenciales
```

**Tipo 5: JOURNEY**
```yaml
Descripción: Path completo del usuario
Ejemplos: Guest → User → Power User
Cuándo usar: Evolución/progresión del usuario
```

**Tipo 6: CONVERGENCIA**
```yaml
Descripción: Muchos → Uno
Ejemplos: Múltiples productos → Un carrito
Cuándo usar: Consolidación en punto central
```

### Tipos Avanzados (6)

**Tipo 7-12**: Ver documentación completa en archivo

---

## 🔍 Cómo Detectar Tipos

### Proceso de 5 Preguntas

1. ¿Nodos CONECTADOS o SOLOS? → Solo = CONTEXTO (1)
2. ¿Conexión EN TIEMPO REAL? → Sí = WIFI (3)
3. ¿SECUENCIA múltiples pasos? → 2 pasos = FLUJO (2), 3+ = CADENA (4)
4. ¿Múltiples fuentes → Un lugar? → Sí = CONVERGENCIA (6)
5. ¿Viaje COMPLETO usuario? → Sí = JOURNEY (5)

---

## 📊 Matriz de Decisión Rápida

| Característica | Tipo Sugerido |
|----------------|---------------|
| Nodo solo | CONTEXTO (1) |
| A → B simple | FLUJO (2) |
| Tiempo real ↔ | WIFI (3) |
| A → B → C secuencia | CADENA (4) |
| Viaje completo usuario | JOURNEY (5) |
| Muchos → Uno | CONVERGENCIA (6) |
| No puedes regresar | UNIDIRECCIONAL (7) |
| Sistema envía automático | NOTIFICACIONES (10) |

---

**Creado por**: DAK System
**Basado en**: Patrones validados multi-industria
**Versión**: 2.0

**Última actualización**: Octubre 27, 2025
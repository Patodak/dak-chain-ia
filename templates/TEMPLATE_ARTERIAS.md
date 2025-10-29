# 🩸 TEMPLATE: Adaptación de ARTERIAS por Dimensión

**Basado en**: Casos Reales Multi-Dimensión
**Para**: Cualquier proyecto que necesite pre-cargar contexto estratégico

---

## 📋 Qué Son ARTERIAS

**ARTERIAS** = Pre-carga de contexto estratégico para acelerar operaciones 80-140x

**Analogía biológica**:
- Sistema circulatorio pre-lleva oxígeno a órganos vitales
- ARTERIAS pre-llevan skills/conocimiento a operaciones frecuentes
- **No esperas** a que la sangre llegue cuando la necesitas
- **No esperas** a cargar 30k tokens cada vez

---

## 🏗️ Estructura de ARTERIA Universal

```typescript
interface Arteria {
  nombre: string;                    // Identificador único
  descripcion: string;               // Qué hace
  trigger_keywords: string[];        // Palabras que activan
  speedup: number;                   // Aceleración estimada

  // Dimensión específica (opcional)
  dimension?: string;                // A qué dimensión aplica
  subdimension?: string;             // Sub-dimensión

  pre_loaded_skills: string[];       // Skills a pre-cargar
  pre_loaded_docs: string[];         // Docs a pre-cargar

  estimated_savings: {
    tokens: number;                  // Tokens ahorrados
    time_seconds: number;            // Tiempo ahorrado
  };
}
```

---

## 🎯 De Genérica → Específica

### ANTES: ARTERIA Genérica (Sin Dimensión)

```typescript
{
  nombre: "admin-dashboard",
  speedup: 9.0,
  pre_loaded_skills: [
    "entire-app-expert",      // ❌ 75k tokens!
  ],
  estimated_savings: {
    tokens: 75000,  // Pero carga TODOS
  }
}
```

**Problema**: Carga TODO para TODOS

### DESPUÉS: ARTERIA Específica (Con Dimensión)

```typescript
{
  nombre: "admin-dashboard-mobile",  // ✅ Incluye dimensión
  speedup: 9.3,
  
  // ✅ Dimensión explícita
  dimension: "admin",
  subdimension: "mobile",

  pre_loaded_skills: [
    "app-expert[ADMIN]",           // ✅ 19k tokens (antes 75k)
  ],

  estimated_savings: {
    tokens: 19000,    // ✅ 56k tokens ahorrados
    time_seconds: 4.5  // ✅ 10x más rápido
  }
}
```

**Ahorro**: 60-75% tokens, 10x speedup

---

## 💡 Beneficios

```yaml
Contexto Preciso:
  - Solo carga lo necesario para esa dimensión
  - Previene contaminación de contexto
  - Ahorro típico: 60-75% tokens

Speedup Real:
  - 80-140x en workflows optimizados
  - Operaciones frecuentes <2s
  - Auto-selección por dimensión

Auto-Optimizante:
  - Sistema aprende con uso
  - Crea arterias después de 3ra iteración
  - Mejora continua automática
```

---

**Creado por**: DAK System
**Basado en**: Casos reales multi-dimensión
**Versión**: 2.0

**Última actualización**: Octubre 27, 2025
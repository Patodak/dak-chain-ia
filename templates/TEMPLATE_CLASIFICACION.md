# 🎯 TEMPLATE: Función de Clasificación Universal

**Basado en**: Casos Reales Multi-Dimensión
**Para**: Cualquier proyecto con dimensiones (roles, tenants, idiomas, devices, etc.)

---

## 📋 Pattern Universal

**Template genérico**:
```typescript
function clasificarPor[DIMENSIÓN](
  entidad: [ENTIDAD_TYPE]
): Clasificacion[DIMENSIÓN] {
  // Tu código aquí
}
```

---

## 🏗️ Estructura de Clasificación (4 Niveles)

### Nivel 1: ESPECÍFICO → GENERAL (Order Matters!)

```typescript
// ✅ SIEMPRE empezar con lo MÁS ESPECÍFICO
if (condicionMuyEspecifica(entidad)) {
  return { dimension: VALOR_MAS_ESPECIFICO };
}
```

**Ejemplo**:
```typescript
// Super Admin primero (más específico)
if (ruta.startsWith('/super-admin')) {
  return { rol: 'SUPER_ADMIN' };
}
```

### Nivel 2: DETECTAR VARIANTES

```typescript
// Si una dimensión tiene variantes
if (dimensionBase === VALOR_X) {
  const variante = detectarVariante(entidad);
  return {
    dimension: VALOR_X,
    variante: variante  // Sub-dimensión
  };
}
```

### Nivel 3: PATTERNS COMPLEJOS (Regex, Arrays)

```typescript
// Para múltiples rutas/condiciones similares
const PATTERNS = [/\/admin\/.*/, /\/dashboard\/.*/];
if (PATTERNS.some(p => p.test(ruta))) {
  return { dimension: VALOR_PATTERN };
}
```

### Nivel 4: FALLBACK SEGURO

```typescript
// Siempre un fallback seguro (least privileged)
return { dimension: VALOR_DEFAULT_SEGURO };
```

---

## 💡 Ejemplo Completo

```typescript
function clasificarPorRol(ruta: string): ClasificacionRol {
  // Nivel 1: Específico
  if (ruta.startsWith('/super-admin')) {
    return { rol: 'SUPER_ADMIN' };
  }

  // Nivel 2: Variantes
  if (ruta.startsWith('/admin')) {
    const dispositivo = detectarDispositivo(ruta);
    return { 
      rol: 'ADMIN',
      dispositivo: dispositivo // Mobile o Desktop
    };
  }

  // Nivel 3: Patterns
  const rutasPublicas = ['/', '/login', '/signup'];
  if (rutasPublicas.includes(ruta)) {
    return { rol: 'GUEST' };
  }

  // Nivel 4: Fallback
  return { rol: 'GUEST' };  // Seguro por defecto
}
```

---

## 📋 Checklist de Validación

- [ ] ¿Empiezas con lo MÁS específico?
- [ ] ¿Detectas variantes cuando aplica?
- [ ] ¿Usas patterns para múltiples casos similares?
- [ ] ¿Tienes fallback seguro?
- [ ] ¿Order matters está respetado?
- [ ] ¿Fallback es least privileged?

---

**Creado por**: DAK System
**Basado en**: Casos reales multi-dimensión
**Versión**: 2.0

**Última actualización**: Octubre 27, 2025
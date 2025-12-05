# 📐 CODING_STANDARDS - Reglas de Modularización

**Versión**: 1.0  
**Para**: Proyectos con DAKCHAIN  
**Fecha**: Diciembre 2025

---

## 🎯 Principio Fundamental

> **Archivos pequeños, responsabilidad única, MEMBRANA obligatoria.**

---

## 📏 Límites de Tamaño

| Tipo | Límite | Acción si excede |
|------|--------|------------------|
| Archivo TS/TSX | 300-400 líneas | Crear carpeta + MEMBRANA |
| Componente React | 200-300 líneas | Extraer sub-componentes |
| Hook | 150-200 líneas | Dividir por responsabilidad |
| Función | 50-80 líneas | Extraer helpers |

---

## 🏗️ Patrones Obligatorios

### 1. Container / Presentational

```typescript
// Container (Smart) - Lógica
function FeatureContainer() {
  const data = useFeatureLogic();
  return <FeaturePresentation {...data} />;
}

// Presentational (Dumb) - UI
function FeaturePresentation({ items, onAction }) {
  return <div>{/* Solo UI */}</div>;
}
```

### 2. Custom Hooks para Lógica

```typescript
// ❌ MAL: Lógica en componente
function Component() {
  const [a, setA] = useState();
  const [b, setB] = useState();
  const [c, setC] = useState();
  useEffect(() => { /* lógica compleja */ }, []);
  // ...
}

// ✅ BIEN: Lógica en hook
function Component() {
  const { data, actions } = useComponentLogic();
  return <UI {...data} {...actions} />;
}
```

### 3. MEMBRANA para Módulos

```
feature/
├── index.ts          ← MEMBRANA (obligatorio)
├── hooks/
├── components/
└── utils/
```

---

## 📁 Estructura de Carpetas

### Componente Modular

```
src/components/feature-name/
├── index.tsx              # MEMBRANA + Orquestador
├── components/
│   ├── index.ts           # Barrel export
│   ├── SubComponentA.tsx
│   └── SubComponentB.tsx
├── hooks/
│   ├── index.ts           # Barrel export
│   ├── useFeatureState.ts
│   └── useFeatureLogic.ts
├── utils/
│   ├── index.ts           # Barrel export
│   └── helpers.ts
└── types.ts               # Tipos compartidos
```

### Hook Modular

```
src/hooks/hook-name/
├── index.ts               # MEMBRANA
├── types.ts               # Tipos
├── useMainHook.ts         # Orquestador
├── useActions.ts          # CRUD
├── useCreators.ts         # Factories
└── useHelpers.ts          # Utilidades
```

---

## ✅ Checklist de Refactor

```yaml
Antes de refactorizar:
  [ ] Archivo > 300 líneas?
  [ ] Múltiples responsabilidades?
  [ ] Difícil de testear?
  [ ] Difícil de entender?

Durante refactor:
  [ ] Crear carpeta con nombre del módulo
  [ ] Dividir por responsabilidad única
  [ ] Cada archivo < 200 líneas
  [ ] Crear index.ts (MEMBRANA)
  [ ] Re-export en ubicación original

Después de refactor:
  [ ] Todos imports funcionan?
  [ ] Tests pasan?
  [ ] Build sin errores?
  [ ] Documentar en NODOS_STATUS.md
```

---

## 🚫 Anti-Patterns

### NO hacer:

```typescript
// ❌ Archivo monolítico > 500 líneas
// ❌ Lógica de negocio en JSX
// ❌ Más de 3 useState relacionados sin hook
// ❌ Bypasear MEMBRANA con imports directos
// ❌ Componentes con múltiples responsabilidades
```

### SÍ hacer:

```typescript
// ✅ Archivos < 200 líneas
// ✅ Lógica en hooks custom
// ✅ MEMBRANA para todo módulo
// ✅ Una responsabilidad por archivo
// ✅ Barrel exports organizados
```

---

## 📊 Métricas

| Métrica | Objetivo | Medir con |
|---------|----------|----------|
| Líneas por archivo | < 200 | `wc -l` |
| Archivos por carpeta | 3-8 | `ls \| wc -l` |
| Profundidad de carpetas | ≤ 3 | Inspección visual |
| Tiempo de entender archivo | < 5 min | Review subjetivo |

---

**Creado por**: Patricio (DAK System)  
**Versión**: 1.0 - Diciembre 2025

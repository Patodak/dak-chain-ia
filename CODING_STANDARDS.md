# Estándares de Código y Arquitectura

Este documento define las reglas de arquitectura obligatorias para todo nuevo desarrollo y refactorización. El objetivo es mantener la escalabilidad, legibilidad y facilitar la colaboración entre agentes de IA y desarrolladores humanos.

---

## 1. Principios Fundamentales

### Separación de Responsabilidades (SoC)
- **Lógica vs. UI:** La lógica de negocio y de estado NUNCA debe mezclarse con el código de renderizado (JSX) en componentes grandes.
- **Archivos Pequeños:** Evitar archivos de más de 300-400 líneas. Si un componente crece más allá de esto, es señal de que debe dividirse.

---

## 2. Patrones de Diseño Obligatorios

### Patrón Container / Presentational
Para características complejas (como formularios grandes, dashboards, flows):
- **Container (Smart Component):** Gestiona el estado, efectos, llamadas a API y lógica. No tiene estilos complejos ni mucho JSX.
- **Presentational (Dumb Component):** Solo recibe props y renderiza la UI. No tiene lógica de negocio ni estados complejos.

### Custom Hooks para Lógica
Toda lógica reutilizable o compleja debe extraerse a un Custom Hook (useNombreDelHook.ts).
- **Ejemplo:** En lugar de calcular límites de planes dentro de un componente, usar usePlanLimits().
- **Regla:** Si tienes más de 3 useState o useEffect relacionados con una misma funcionalidad, extráelos a un hook.

---

## 3. Estructura de Directorios para Features

Cuando una funcionalidad es compleja, no usar un solo archivo. Usar una estructura de carpeta:

\`\`\`text
src/components/feature-name/
├── hooks/              # Lógica pura
│   ├── useFeatureState.ts
│   └── useFeatureLogic.ts
├── components/         # Sub-componentes visuales
│   ├── SubComponentA.tsx
│   └── SubComponentB.tsx
└── FeatureContainer.tsx # Punto de entrada (Orquestador)
\`\`\`

---

## 4. Reglas para Agentes de IA (Claude, Gemini, etc.)

1. **Lectura Primero:** Antes de escribir código, analiza si existe una estructura modular. No agregues código a un archivo que ya es monolítico; propone refactorizarlo o crea un archivo nuevo.
2. **No "Spaghetti Code":** No anides más de 3 niveles de ternarios o lógica condicional en el JSX. Extrae sub-componentes.
3. **Contexto:** Si vas a modificar una lógica de negocio (ej. Planes, Pagos), busca si existe un Hook centralizado para ello.

---

## 5. Gestión de Estado

- Preferir estado local (useState) para UI efímera.
- Usar Context API solo para estado global real (Auth, Theme).
- Para máquinas de estado complejas (pasos de un wizard), considerar usar un reducer (useReducer) o una máquina de estado explícita.

---

## 6. Estándares de Frontend Design (UI/UX)

### Stack Visual Recomendado

- Framework: Next.js 15 + React 18
- Estilos: Tailwind CSS
- Componentes: shadcn/ui (400+ componentes)
- Iconos: Lucide React
- Animaciones: Framer Motion (cuando aplique)

### Reglas de Diseño

1. **Consistencia**: Usar componentes de shadcn/ui antes de crear nuevos
2. **Dark Mode**: Todo componente nuevo DEBE soportar dark mode
3. **Responsive**: Mobile-first, breakpoints de Tailwind
4. **Accesibilidad**: Labels, aria-*, focus states obligatorios

---

## 7. Reglas de Refactorización

### Antes de Refactorizar

1. Verificar si hay hooks existentes en */hooks/
2. Usar TodoWrite para tracking si usas Claude Code

### Proceso de Extracción

**Fase 1 - Hooks (Lógica):**
1. Identificar useState/useEffect relacionados
2. Crear useFeatureState.ts
3. Crear useFeatureLogic.ts (si hay reglas de negocio)

**Fase 2 - Components (UI):**
1. Identificar JSX repetido o >100 líneas
2. Extraer a SubComponent.tsx
3. Props tipadas, sin lógica interna

**Fase 3 - Integración:**
1. Container solo orquesta hooks + pasa props
2. Verificar que NADA cambie visualmente
3. Tests si existen

### Regla Crítica: Scripts para Archivos Grandes

**PROBLEMA**: Los agentes de IA pueden crashear al intentar editar archivos >1000 líneas.

**SOLUCIÓN**: Usar scripts Node.js para transformaciones masivas.

Cuándo usar scripts:
- Archivo >1000 líneas
- Eliminar >200 líneas
- Múltiples funciones a eliminar/mover
- Transformaciones repetitivas

Beneficios:
- No crashea el agente de IA
- Operación atómica (todo o nada)
- Reusable y documentado
- Verificable antes de ejecutar

---

## 8. Patrones de UX/Feedback

### Loading States en Navegación

Cuando una acción lleva a otra página o toma >300ms, SIEMPRE implementar:

1. Loading inmediato en botón (disabled + spinner)
2. Si tarda >500ms: barra de progreso con pasos
3. Texto descriptivo del paso actual
4. Deshabilitar botón para evitar double-click
5. Cursor: wait mientras carga

### Implementación de Referencia

\`\`\`typescript
// Estados necesarios
const [isNavigating, setIsNavigating] = useState(false);
const [progress, setProgress] = useState(0);
const [step, setStep] = useState('');

// En la acción
const handleAction = async () => {
  setIsNavigating(true);
  setProgress(0);
  setStep('Preparando...');

  setProgress(20);
  setStep('Configurando...');
  await someAction();

  setProgress(60);
  setStep('Guardando...');
  await anotherAction();

  setProgress(100);
  setStep('¡Listo! Redirigiendo...');
  router.push('/destino');
};

// En el botón
<Button disabled={isNavigating}>
  {isNavigating ? (
    <>
      <Loader2 className="animate-spin" />
      {step}
    </>
  ) : (
    'Acción'
  )}
</Button>
\`\`\`

### Beneficio UX

Sin feedback:
- Usuario no sabe si botón funcionó
- Clicks múltiples (duplicados)
- Ansiedad de "¿está cargando?"
- Abandono por frustración

Con feedback:
- Usuario ve acción inmediata
- Sabe qué está pasando
- Progreso reduce ansiedad
- Experiencia profesional

---

## 9. Pattern Recursivo: META-REFACTOR

El mismo pattern Container/Presentational aplica a múltiples niveles:

**NIVEL 1 - Código (.tsx):**
- Antes: page.tsx monolítico
- Después: Container + hooks/ + components/
- Regla: <500 líneas por archivo

**NIVEL 2 - Documentación:**
- Antes: README gigante
- Después: INDEX + sub-documentos
- Regla: <500 líneas por archivo

**NIVEL 3 - Configuración Claude:**
- Antes: CLAUDE.md monolítico
- Después: INDEX + Pilares modulares
- Regla: <300 líneas para INDEX

---

## Resumen de Límites

| Elemento | Límite Máximo |
|----------|---------------|
| Archivo de código | 300-400 líneas |
| Hook individual | 150 líneas |
| Componente individual | 200 líneas |
| Anidación de ternarios | 3 niveles |
| useState/useEffect por componente | 3 (luego extraer a hook) |
| Archivo de documentación | 500 líneas |

---

**Versión**: 1.0 - Adaptado de Manager Battle Pro
**Propósito**: Evitar el desorden mientras se crea una aplicación con IA

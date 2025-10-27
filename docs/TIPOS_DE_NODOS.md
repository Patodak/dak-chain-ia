# 🧬 TIPOS DE NODOS - Blockchain Viviente

**Framework**: DAK CHAIN IA
**Versión**: 1.0
**Para**: Cualquier app que use blockchain viviente

---

## 🎯 ¿Qué es un Nodo?

**Nodo** = Punto en tu aplicación donde Claude puede trabajar

**Analogía**:
- App = Ciudad
- Nodo = Lugar específico en la ciudad
- Agente = Guía local del lugar

---

## 📊 3 TIPOS DE NODOS

### Tipo 1: NODO PRINCIPAL (URL Normal)

**Definición**: Una URL = Un nodo = Un lugar específico

```yaml
Características:
  - URL única
  - Contenido fijo
  - 1 Agente especialista

Nomenclatura: NÚMERO+LETRA+CAPA
  - NÚMERO: Profundidad (1, 2, 3, 4)
  - LETRA: Contexto (A, B, C, D)
  - CAPA: Seguridad/Rol

Ejemplos:
  /dashboard → 2A
    - Profundidad 2 (un nivel adentro)
    - Contexto A (acción principal)

  /admin/users → 3A.ADMIN
    - Profundidad 3 (dos niveles adentro)
    - Contexto A (acción principal)
    - CAPA: Solo ADMIN

  /settings → 2C.CLIENT
    - Profundidad 2
    - Contexto C (configuración)
    - CAPA: Solo CLIENT o superior
```

**Agente asociado**:
```yaml
1 Nodo = 1 Agente
Ejemplo: agente-nodo-2A-dashboard.md

Responsabilidades:
  ✅ Conoce TODO de /dashboard
  ✅ Maneja datos locales
  ✅ Ejecuta operaciones en /dashboard
  ❌ NO coordina con otros nodos
```

---

### Tipo 2: NODO TIPO 12 - CONTEXTO CONDICIONAL

**Definición**: Misma URL, contenido DIFERENTE según CAPA 0 (Guardian)

```yaml
Características:
  - URL IDÉNTICA físicamente
  - Contenido MUTUAMENTE EXCLUSIVO
  - Cambia según rol/autenticación
  - Trigger: CAPA 0 (Guardian)

DIFERENCIA con subnodos:
  - SUBNODO: Tabs navegables dentro de misma URL
  - TIPO 12: Contenidos que NO coexisten
```

**Ejemplo Manager Battle Pro**:
```yaml
localhost:9002/
  ↓
  CAPA 0 valida rol
  ↓
[público:*] → Landing page (1A.PUBLIC)
  - Información del producto
  - Botón "Iniciar sesión"
  - NO puede ver dashboard

[organizador:*] → Dashboard Organizador (2A.ORGANIZADOR)
  - Control de eventos
  - Setup de torneos
  - NO puede ver landing

[admin:*] → Dashboard Admin (3A.ADMIN)
  - Gestión global
  - Control usuarios
  - NO puede ver landing ni dashboard organizador

MISMA URL FÍSICA: localhost:9002/
CONTENIDO: Completamente diferente
TRIGGER: CAPA 0 - Guardian
```

**Nomenclatura Tipo 12**:
```yaml
Formato: NÚMERO+LETRA.ROL (múltiples)

Ejemplo:
  / → 1A.PUBLIC | 2A.ORGANIZADOR | 3A.ADMIN

Significa:
  - Misma URL raíz (/)
  - 3 contenidos mutuamente exclusivos
  - Guardian decide cuál mostrar
```

**Agentes asociados**:
```yaml
1 Nodo Tipo 12 = MÚLTIPLES Agentes (1 por variante)

Ejemplo localhost:9002/:
  - agente-nodo-1A-landing.md (público)
  - agente-nodo-2A-dashboard-organizador.md (organizador)
  - agente-nodo-3A-dashboard-admin.md (admin)

Guardian activa el agente correcto según rol.
```

**Cómo detectar Tipo 12**:
```yaml
Preguntas:
  1. ¿Misma URL muestra diferente contenido?
  2. ¿El contenido depende de autenticación/rol?
  3. ¿Los contenidos son mutuamente exclusivos?

Si respuesta = Sí a todas → TIPO 12
```

**Ejemplos universales**:
```yaml
E-commerce:
  /
    [guest] → Marketing landing
    [logged in] → Personalized homepage

SaaS:
  /workspace
    [free plan] → Features limitadas
    [pro plan] → Features completas
    [enterprise] → Features avanzadas

CRM:
  /dashboard
    [cliente] → Vista cliente
    [vendedor] → Vista vendedor
    [admin] → Vista admin completa
```

---

### Tipo 3: SUBNODOS

**Definición**: Funciones específicas DENTRO de un nodo principal

```yaml
Características:
  - NO son URLs separadas
  - Son funciones/secciones dentro del nodo
  - Coexisten en misma página
  - Navegables por tabs/botones

DIFERENCIA con Tipo 12:
  - SUBNODO: Múltiples funciones coexisten
  - TIPO 12: Contenidos mutuamente exclusivos
```

**Ejemplo Manager Battle Pro**:
```yaml
Nodo Principal: 3A (Dashboard Admin)
  ↓
  Tiene funciones específicas:
  ↓
Subnodos:
  - 4A1: Gestión de categorías
  - 4A2: Asignación de jueces
  - 4A3: Control de brackets
  - 4A4: Gestión de batallas

URL física: MISMA (/admin/dashboard)
Navegación: Tabs/botones internos
Coexisten: SÍ (puedes ir entre tabs)
```

**Nomenclatura Subnodos**:
```yaml
Formato: NÚMERO_PADRE + LETRA + SUB_NÚMERO

Ejemplo:
  3A (nodo principal)
    ↓
  4A1 (subnodo 1)
  4A2 (subnodo 2)
  4A3 (subnodo 3)

Profundidad aumenta: 3 → 4
Sub-número identifica función: 1, 2, 3
```

**Ejemplo completo jerarquía**:
```yaml
2A: Dashboard Organizador
  ↓
3A: Sección Setup
  ↓
3B: Sección Battles (display)
  ↓
4B1: Bracket TOP8
4B2: Bracket TOP16
  ↓
5B1.1: Battle específica en TOP8
5B1.2: Siguiente battle en TOP8
```

**Agentes asociados**:
```yaml
OPCIÓN A: 1 Agente por nodo principal
  - Agente conoce TODOS los subnodos
  - Más simple, menos específico

OPCIÓN B: 1 Agente por subnodo
  - Agente ultra-especializado
  - Más complejo, más preciso

Recomendado:
  - Empezar con OPCIÓN A
  - Evolucionar a OPCIÓN B si necesario
```

**Cuándo documentar subnodos**:
```yaml
FASE 1 (inicial):
  ❌ NO documentar subnodos
  ✅ Solo nodos principales

FASE 2 (después de usar):
  ✅ Documentar subnodos si:
    - Complejidad interna alta
    - Múltiples funciones distintas
    - Necesitas precisión extrema

Principio:
  "Simple first, complejo cuando necesites"
```

---

## 🎯 Tabla Comparativa

| Aspecto | Nodo Principal | Tipo 12 | Subnodo |
|---------|---------------|---------|---------||
| **URL física** | Única | Idéntica | Misma que nodo padre |
| **Contenido** | Fijo | Múltiple exclusive | Múltiple coexistente |
| **Trigger** | Navegación | CAPA 0 (Guardian) | Tabs/botones |
| **Agentes** | 1 agente | Múltiples agentes | 1 agente (o múltiples) |
| **Ejemplo** | /dashboard | / (guest vs logged) | Tabs dentro de /settings |
| **Cuándo documentar** | FASE 1 (inicio) | FASE 1 (inicio) | FASE 2 (después) |

---

## 📋 Proceso de Clasificación

```yaml
PASO 1: Identificar URL
  ¿Es única? → Nodo Principal

PASO 2: Si URL repetida
  ¿Contenido depende de rol/auth?
  ¿Contenidos mutuamente exclusivos?
    → Sí: Tipo 12
    → No: Subnodo

PASO 3: Si funciones internas
  ¿Múltiples funciones en misma URL?
  ¿Navegables por tabs?
    → Sí: Subnodo
```

---

## 💡 Ejemplos Completos por App

### Manager Battle Pro
```yaml
Nodos Principales:
  - 1A: Landing page (público)
  - 2A: Dashboard organizador
  - 3A: Admin dashboard

Tipo 12:
  - / → 1A.PUBLIC | 2A.ORGANIZADOR | 3A.ADMIN
    (Misma URL, contenido diferente por rol)

Subnodos:
  - 3A → 4A1 (Categorías)
  - 3A → 4A2 (Jueces)
  - 3B → 4B1 (Bracket TOP8)
  - 3B → 4B2 (Bracket TOP16)
```

### E-commerce
```yaml
Nodos Principales:
  - 1A: Homepage
  - 2A: Product page
  - 3A: Cart
  - 4A: Checkout

Tipo 12:
  - / → 1A.GUEST | 2A.LOGGED_IN
    (Landing vs personalized homepage)

Subnodos:
  - 4A → 5A1 (Shipping info)
  - 4A → 5A2 (Payment method)
  - 4A → 5A3 (Order review)
```

### SaaS
```yaml
Nodos Principales:
  - 1A: Landing
  - 2A: Workspace
  - 3A: Project view
  - 4A: Settings

Tipo 12:
  - /workspace → 2A.FREE | 2A.PRO | 2A.ENTERPRISE
    (Features cambian por plan)

Subnodos:
  - 4A → 5A1 (Account settings)
  - 4A → 5A2 (Team settings)
  - 4A → 5A3 (Billing)
```

---

## 🔧 Implementación en Tu App

### Paso 1: Mapear Nodos Principales
```yaml
Lista todas las URLs únicas
Clasifica: NÚMERO+LETRA+CAPA

Ejemplo:
  / → 1A
  /login → 1A
  /dashboard → 2A
  /settings → 2C
  /admin/users → 3A.ADMIN
```

### Paso 2: Detectar Tipo 12
```yaml
Revisa cada URL:
  ¿Muestra diferente contenido por rol?

Si sí:
  Documenta variantes

Ejemplo:
  / → 1A.PUBLIC | 2A.LOGGED_IN
```

### Paso 3: Documentar Subnodos (DESPUÉS)
```yaml
Una vez usando la app:
  Detecta funciones internas complejas

Si necesitas precisión:
  Documenta subnodos

Ejemplo:
  3A (Dashboard) tiene 4 funciones →
  3A → 4A1, 4A2, 4A3, 4A4
```

---

## ✅ Checklist

- [ ] Identificar todas las URLs (nodos principales)
- [ ] Detectar URLs con contenido condicional (Tipo 12)
- [ ] Documentar variantes de Tipo 12
- [ ] Usar app para entender funciones internas
- [ ] Documentar subnodos solo si necesario
- [ ] Validar jerarquía: 1 → 2 → 3 → 4
- [ ] Confirmar CAPA (seguridad) por nodo

---

**Creado por**: DAK System
**Para**: Framework DAK CHAIN IA
**Estado**: v1.0 - Documentación completa de tipos de nodos

**Última actualización**: Octubre 27, 2025

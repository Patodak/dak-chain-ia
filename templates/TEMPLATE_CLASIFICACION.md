# 🎯 TEMPLATE: Función de Clasificación Universal

**Basado en**: PC2 Adaptación Multi-Rol (Soluciones Díaz CRM)
**Para**: Cualquier proyecto con dimensiones (roles, tenants, idiomas, devices, etc.)

---

## 📋 Pattern Universal Extraído

### De PC2 Específico → Template Genérico

**PC2 tenía**:
```typescript
function clasificarPorRol(ruta: string): { rol: RolType, dispositivo?: DispositivoType }
```

**Template Universal**:
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

**Ejemplo PC2**:
```typescript
// Super Admin primero (más específico)
if (ruta.startsWith('/dev-tools') || ruta.startsWith('/super-admin')) {
  return { rol: RolType.SUPER_ADMIN };
}
```

**Tu proyecto** (ejemplo multi-tenant):
```typescript
// Tenant super admin primero
if (userId in SUPER_ADMIN_IDS && tenantId === 'master') {
  return { tenant: TenantType.MASTER, access: AccessLevel.SUPER };
}
```

---

### Nivel 2: DETECTAR VARIANTES

```typescript
// Si una dimensión tiene variantes (Desktop/Mobile, Free/Pro, etc.)
if (dimensionBase === VALOR_X) {
  const variante = detectarVariante(entidad);
  return {
    dimension: VALOR_X,
    variante: variante  // Sub-dimensión
  };
}
```

**Ejemplo PC2**:
```typescript
// Admin con detección de dispositivo
if (ruta.startsWith('/admin')) {
  const adminMobileRoutes = ['/admin/cotizaciones', '/admin/clientes'];
  const esAdminMobile = adminMobileRoutes.some(r => ruta.startsWith(r));
  return {
    rol: RolType.ADMIN,
    dispositivo: esAdminMobile ? DispositivoType.MOBILE : DispositivoType.DESKTOP
  };
}
```

**Tu proyecto** (ejemplo multi-idioma):
```typescript
// Cliente con detección de idioma
if (user.role === 'CLIENT') {
  const idioma = detectarIdiomaPreferido(user, request);
  return {
    rol: RoleType.CLIENT,
    idioma: idioma  // ES, EN, PT
  };
}
```

---

### Nivel 3: PATTERNS COMPLEJOS (Regex, Arrays)

```typescript
// Para múltiples rutas/condiciones similares
const PATTERNS_[DIMENSION] = [
  /^pattern1$/,
  /^pattern2/,
  'exact-match'
];

if (PATTERNS_[DIMENSION].some(pattern => matchPattern(entidad, pattern))) {
  return { dimension: VALOR_PATTERN };
}
```

**Ejemplo PC2**:
```typescript
const RUTAS_PUBLICAS_PATTERNS = [
  /^\/$/, /^\/nosotros/, /^\/servicios/, /^\/materiales/,
  /^\/auth\/(signin|signup|error)/, /^\/blog\//
];

if (RUTAS_PUBLICAS_PATTERNS.some(pattern => pattern.test(ruta))) {
  return { rol: RolType.GUEST };
}
```

**Tu proyecto** (ejemplo API versioning):
```typescript
const API_V2_PATTERNS = [
  /^\/api\/v2\//,
  /^\/v2\//,
  { header: 'API-Version', value: '2.0' }
];

if (API_V2_PATTERNS.some(p => matchesPattern(request, p))) {
  return { apiVersion: ApiVersion.V2 };
}
```

---

### Nivel 4: FALLBACK SEGURO

```typescript
// ⚠️ SIEMPRE terminar con fallback
// Principio: "least privileged" o "más seguro"
return { dimension: VALOR_DEFAULT_SEGURO };
```

**Ejemplo PC2**:
```typescript
return { rol: RolType.GUEST }; // Fallback seguro (menor privilegio)
```

**Tu proyecto** (ejemplo multi-tenant):
```typescript
return {
  tenant: TenantType.TRIAL,  // Menor acceso
  access: AccessLevel.READ_ONLY
};
```

---

## 🎨 Templates por Tipo de Proyecto

### Template A: Multi-Rol (Como PC2)

```typescript
enum RolType {
  ROLE_1 = 'internal_name_1',
  ROLE_2 = 'internal_name_2',
  ROLE_3 = 'internal_name_3',
}

// Opcional: Sub-dimensión
enum [SUBDIMENSION]Type {
  VARIANT_A = 'variant_a',
  VARIANT_B = 'variant_b',
}

function clasificarPorRol(
  ruta: string
): { rol: RolType, [subdimension]?: [SUBDIMENSION]Type } {

  // 1. Más específico primero
  if (condicionEspecializada()) {
    return { rol: RolType.ROLE_1 };
  }

  // 2. Detectar variantes
  if (condicionConVariantes()) {
    const variante = detectarVariante();
    return { rol: RolType.ROLE_2, [subdimension]: variante };
  }

  // 3. Patterns complejos
  const PATTERNS = [/*...*/];
  if (matchesAnyPattern(PATTERNS)) {
    return { rol: RolType.ROLE_3 };
  }

  // 4. Fallback seguro
  return { rol: RolType.DEFAULT_SAFE };
}
```

---

### Template B: Multi-Tenant

```typescript
enum TenantType {
  MASTER = 'master',
  ENTERPRISE = 'enterprise',
  STANDARD = 'standard',
  TRIAL = 'trial',
}

enum AccessLevel {
  SUPER = 'super',
  ADMIN = 'admin',
  USER = 'user',
  READ_ONLY = 'readonly',
}

function clasificarPorTenant(
  userId: string,
  tenantId: string
): { tenant: TenantType, access: AccessLevel } {

  // 1. Master tenant (más específico)
  if (tenantId === 'master' && userId in SUPER_ADMINS) {
    return { tenant: TenantType.MASTER, access: AccessLevel.SUPER };
  }

  // 2. Enterprise con niveles
  if (isEnterpriseTenant(tenantId)) {
    const access = getUserAccessLevel(userId, tenantId);
    return { tenant: TenantType.ENTERPRISE, access };
  }

  // 3. Standard tenants
  if (isStandardTenant(tenantId)) {
    return { tenant: TenantType.STANDARD, access: AccessLevel.USER };
  }

  // 4. Fallback trial
  return { tenant: TenantType.TRIAL, access: AccessLevel.READ_ONLY };
}
```

---

### Template C: Multi-Idioma + Multi-Región

```typescript
enum IdiomaType {
  ES = 'es',
  EN = 'en',
  PT = 'pt',
}

enum RegionType {
  LATAM = 'latam',
  USA = 'usa',
  BRASIL = 'brasil',
  EUROPA = 'europa',
}

function clasificarPorIdioma(
  request: Request
): { idioma: IdiomaType, region: RegionType } {

  // 1. Idioma explícito en URL/header
  if (request.headers['Accept-Language']) {
    return parseLanguageHeader(request.headers['Accept-Language']);
  }

  // 2. Detectar por región
  const region = detectRegionFromIP(request.ip);
  const idioma = REGION_TO_LANGUAGE_MAP[region];
  return { idioma, region };

  // 3. Fallback según región por defecto
  return {
    idioma: IdiomaType.ES,  // Tu idioma por defecto
    region: RegionType.LATAM
  };
}
```

---

### Template D: API Versioning + Auth

```typescript
enum ApiVersion {
  V1 = 'v1',
  V2 = 'v2',
  V3_BETA = 'v3-beta',
}

enum AuthType {
  API_KEY = 'api_key',
  OAUTH = 'oauth',
  JWT = 'jwt',
  NONE = 'none',
}

function clasificarPorApi(
  request: Request
): { version: ApiVersion, auth: AuthType } {

  // 1. Versión explícita en path
  if (request.path.startsWith('/api/v3')) {
    const auth = detectAuthType(request);
    return { version: ApiVersion.V3_BETA, auth };
  }

  // 2. Versión v2
  if (request.path.startsWith('/api/v2')) {
    return {
      version: ApiVersion.V2,
      auth: AuthType.JWT  // v2 siempre JWT
    };
  }

  // 3. Header API-Version
  const versionHeader = request.headers['API-Version'];
  if (versionHeader) {
    return parseVersionHeader(versionHeader);
  }

  // 4. Fallback v1 (legacy)
  return {
    version: ApiVersion.V1,
    auth: AuthType.API_KEY
  };
}
```

---

## 🔍 Checklist de Validación

Antes de finalizar tu función de clasificación, verifica:

- [ ] **Order correcto**: ¿Específico → General?
- [ ] **Fallback seguro**: ¿Tiene valor por defecto con menor privilegio?
- [ ] **Variantes detectadas**: ¿Necesitas sub-dimensiones?
- [ ] **Patterns complejos**: ¿Usas regex para múltiples casos similares?
- [ ] **Testing**: ¿Probaste con casos edge?
- [ ] **Documentación**: ¿Comentaste por qué ese orden?

---

## 💡 Tips de PC2

### Tip 1: Order Matters!
```typescript
// ❌ MAL - General primero
if (ruta.startsWith('/admin')) { return ADMIN; }
if (ruta.startsWith('/admin/super')) { return SUPER_ADMIN; }  // Nunca llega aquí!

// ✅ BIEN - Específico primero
if (ruta.startsWith('/admin/super')) { return SUPER_ADMIN; }
if (ruta.startsWith('/admin')) { return ADMIN; }
```

### Tip 2: Mantén Compatibilidad
```typescript
// ✅ Si tienes función original, mantenla
function clasificar(entidad: Entidad): Clasificacion {
  // Código original sin cambios
}

// Nueva función con breakdown
function clasificarConDimensiones(entidad: Entidad): ClasificacionDetallada {
  // Nueva lógica con sub-dimensiones
}
```

### Tip 3: Usa TypeScript Enums Estrictos
```typescript
// ❌ MAL - Strings sueltos
const rol = 'admin';  // Typo-prone

// ✅ BIEN - Enums estrictos
enum RolType {
  ADMIN = 'admin'
}
const rol = RolType.ADMIN;  // Type-safe
```

---

## 📊 Resultado Esperado

Después de aplicar este template:

1. ✅ **Clasificación correcta** de todas las entidades
2. ✅ **Type-safe** con TypeScript enums
3. ✅ **Fallback seguro** para casos no previstos
4. ✅ **Detecta variantes** si existen sub-dimensiones
5. ✅ **Order correcto** (específico → general)
6. ✅ **Fácil de mantener** (agregar nuevos casos sin romper existentes)

---

**Creado por**: DAK CHAIN IA - Pattern Extraction System
**Basado en**: PC2 Soluciones Díaz - Adaptación Multi-Rol
**Fecha**: Octubre 2025
**Versión**: 1.0

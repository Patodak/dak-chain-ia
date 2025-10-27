# 🎨 TEMPLATE: Definición de Enums por Dimensión

**Basado en**: PC2 Adaptación Multi-Rol (Soluciones Díaz CRM)
**Para**: Cualquier proyecto que necesite clasificar por dimensiones

---

## 📋 Qué Son Dimensiones

**Dimensión** = Característica por la cual clasificas tu sistema

**Ejemplos**:
- Roles (Guest, Client, Admin)
- Tenants (Trial, Standard, Enterprise)
- Idiomas (ES, EN, PT)
- Devices (Desktop, Mobile, Tablet)
- API Versions (v1, v2, v3)
- Environments (Dev, Staging, Production)
- Subscription Plans (Free, Pro, Enterprise)

---

## 🏗️ Pattern Universal: Enum Definition

### Estructura Base

```typescript
enum [DIMENSION]Type {
  VALOR_1 = 'internal_name_1',
  VALOR_2 = 'internal_name_2',
  VALOR_3 = 'internal_name_3',
}
```

### Reglas de Oro

1. ✅ **Nombre enum**: `[DIMENSIÓN]Type` (singular, PascalCase)
2. ✅ **Nombre valores**: `UPPER_CASE` (constante)
3. ✅ **String values**: `'lowercase-kebab'` o `'snake_case'`
4. ✅ **No usar strings sueltos**: Type-safety

---

## 🎯 Ejemplos de PC2

### PC2 Original (Soluciones Díaz CRM)

```typescript
// Dimensión 1: Roles
enum RolType {
  GUEST = 'NO_AUTENTICADO',      // Público
  CLIENT = 'CLIENTE',              // Registrado
  ADMIN = 'ADMIN',                 // Dueño negocio
  SUPER_ADMIN = 'SUPER_ADMIN'     // Dev/Creador
}

// Dimensión 2: Dispositivos (sub-dimensión de ADMIN)
enum DispositivoType {
  DESKTOP = 'desktop',
  MOBILE = 'mobile'
}
```

**Por qué funciona**:
- 4 roles cubren todo el espectro (público → super admin)
- Dispositivo solo aplica a ADMIN (no todos los roles)
- Strings internos descriptivos ('NO_AUTENTICADO' vs 'GUEST')

---

## 📚 Templates por Tipo de Proyecto

### Template 1: Multi-Rol (SaaS B2B/B2C)

```typescript
// Roles generales SaaS
enum RolType {
  ANONYMOUS = 'anonymous',      // No autenticado
  USER = 'user',                 // Usuario básico
  PREMIUM = 'premium',           // Usuario pagado
  MODERATOR = 'moderator',       // Moderador
  ADMIN = 'admin',               // Administrador
  OWNER = 'owner',               // Dueño cuenta
  SUPER_ADMIN = 'super_admin'   // Platform admin
}

// Opcional: Niveles de acceso
enum AccessLevel {
  READ = 'read',
  WRITE = 'write',
  DELETE = 'delete',
  ADMIN = 'admin',
  SUPER = 'super'
}
```

---

### Template 2: Multi-Tenant

```typescript
// Tipos de tenant
enum TenantType {
  TRIAL = 'trial',              // 14 días gratis
  STARTUP = 'startup',           // Plan básico
  BUSINESS = 'business',         // Plan medio
  ENTERPRISE = 'enterprise',     // Plan grande
  MASTER = 'master'              // Platform tenant
}

// Features por tenant
enum TenantFeature {
  BASIC_REPORTING = 'basic_reporting',
  ADVANCED_ANALYTICS = 'advanced_analytics',
  API_ACCESS = 'api_access',
  CUSTOM_BRANDING = 'custom_branding',
  SSO = 'sso',
  PRIORITY_SUPPORT = 'priority_support'
}

// Límites por tenant
enum TenantLimit {
  USERS_10 = 'users_10',
  USERS_50 = 'users_50',
  USERS_UNLIMITED = 'users_unlimited',
  STORAGE_1GB = 'storage_1gb',
  STORAGE_50GB = 'storage_50gb',
  STORAGE_UNLIMITED = 'storage_unlimited'
}
```

---

### Template 3: Multi-Idioma + Multi-Región

```typescript
// Idiomas soportados
enum IdiomaType {
  ES = 'es',              // Español
  EN = 'en',              // English
  PT = 'pt',              // Português
  FR = 'fr',              // Français
  DE = 'de'               // Deutsch
}

// Regiones geográficas
enum RegionType {
  LATAM = 'latam',        // Latinoamérica
  USA = 'usa',            // United States
  CANADA = 'canada',      // Canada
  BRASIL = 'brasil',      // Brasil
  EUROPA = 'europa',      // Europa
  ASIA = 'asia'           // Asia
}

// Formato de fecha por región
enum DateFormatType {
  DMY = 'dd/mm/yyyy',     // Europa, Latam
  MDY = 'mm/dd/yyyy',     // USA
  YMD = 'yyyy-mm-dd'      // ISO, Asia
}

// Moneda por región
enum CurrencyType {
  USD = 'usd',
  EUR = 'eur',
  BRL = 'brl',
  MXN = 'mxn',
  ARS = 'ars'
}
```

---

### Template 4: API Versioning

```typescript
// Versiones de API
enum ApiVersion {
  V1 = 'v1',              // Legacy
  V2 = 'v2',              // Current stable
  V3 = 'v3',              // Latest stable
  V4_BETA = 'v4-beta',    // Beta
  INTERNAL = 'internal'   // Solo uso interno
}

// Métodos de autenticación
enum AuthType {
  NONE = 'none',          // Público
  API_KEY = 'api_key',    // API Key
  OAUTH = 'oauth',        // OAuth 2.0
  JWT = 'jwt',            // JWT Token
  BASIC = 'basic'         // Basic Auth
}

// Rate limits por versión
enum RateLimitType {
  NONE = 'none',              // Sin límite
  LOW = 'low',                // 100 req/min
  MEDIUM = 'medium',          // 1000 req/min
  HIGH = 'high',              // 10000 req/min
  UNLIMITED = 'unlimited'     // Sin límite
}
```

---

### Template 5: Subscription Plans (SaaS)

```typescript
// Planes de suscripción
enum PlanType {
  FREE = 'free',
  STARTER = 'starter',
  PROFESSIONAL = 'professional',
  ENTERPRISE = 'enterprise',
  CUSTOM = 'custom'
}

// Estado de suscripción
enum SubscriptionStatus {
  TRIAL = 'trial',              // En prueba
  ACTIVE = 'active',            // Activa
  PAST_DUE = 'past_due',        // Pago atrasado
  CANCELED = 'canceled',        // Cancelada
  EXPIRED = 'expired'           // Expirada
}

// Frecuencia de pago
enum BillingCycle {
  MONTHLY = 'monthly',
  QUARTERLY = 'quarterly',
  YEARLY = 'yearly',
  LIFETIME = 'lifetime'
}
```

---

### Template 6: Devices + Plataformas

```typescript
// Dispositivos (como PC2)
enum DispositivoType {
  DESKTOP = 'desktop',
  MOBILE = 'mobile',
  TABLET = 'tablet',
  TV = 'tv',
  WATCH = 'watch'
}

// Sistemas operativos
enum PlatformType {
  WEB = 'web',
  IOS = 'ios',
  ANDROID = 'android',
  WINDOWS = 'windows',
  MACOS = 'macos',
  LINUX = 'linux'
}

// Tamaños de pantalla
enum ScreenSize {
  SMALL = 'small',        // < 640px
  MEDIUM = 'medium',      // 640-1024px
  LARGE = 'large',        // 1024-1920px
  XLARGE = 'xlarge'       // > 1920px
}
```

---

### Template 7: Environments + Deploy

```typescript
// Ambientes de deploy
enum EnvironmentType {
  LOCAL = 'local',
  DEVELOPMENT = 'development',
  STAGING = 'staging',
  PRODUCTION = 'production',
  HOTFIX = 'hotfix'
}

// Regiones de deploy
enum DeployRegion {
  US_EAST_1 = 'us-east-1',
  US_WEST_2 = 'us-west-2',
  EU_WEST_1 = 'eu-west-1',
  AP_SOUTH_1 = 'ap-south-1',
  SA_EAST_1 = 'sa-east-1'
}

// Niveles de logging
enum LogLevel {
  DEBUG = 'debug',
  INFO = 'info',
  WARN = 'warn',
  ERROR = 'error',
  FATAL = 'fatal'
}
```

---

## 🎨 Combinando Dimensiones

### Patrón: Dimensión Principal + Sub-Dimensiones

**Ejemplo PC2**:
```typescript
// Dimensión principal
enum RolType { ADMIN, CLIENT, GUEST }

// Sub-dimensión (solo aplica a ADMIN)
enum DispositivoType { DESKTOP, MOBILE }

// Resultado
type Clasificacion = {
  rol: RolType;
  dispositivo?: DispositivoType;  // Opcional
}
```

**Tu proyecto** (Multi-Tenant + Subscription):
```typescript
// Dimensión principal
enum TenantType { TRIAL, BUSINESS, ENTERPRISE }

// Sub-dimensión
enum SubscriptionStatus { ACTIVE, PAST_DUE, CANCELED }

// Resultado
type Clasificacion = {
  tenant: TenantType;
  subscription: SubscriptionStatus;  // Siempre presente
}
```

---

## 🔧 Helpers y Utilities

### Helper 1: Enum to Array

```typescript
// Convertir enum a array
function enumToArray<T>(enumObj: T): string[] {
  return Object.values(enumObj) as string[];
}

// Uso
const todosLosRoles = enumToArray(RolType);
// ['anonymous', 'user', 'admin', 'super_admin']
```

### Helper 2: Enum Validation

```typescript
// Validar si string es valor válido del enum
function isValidEnumValue<T>(
  enumObj: T,
  value: string
): value is T[keyof T] {
  return Object.values(enumObj).includes(value);
}

// Uso
if (isValidEnumValue(RolType, 'admin')) {
  // Type-safe: value es RolType
}
```

### Helper 3: Enum Mapping

```typescript
// Map entre enums
const ROL_TO_PERMISSIONS: Record<RolType, string[]> = {
  [RolType.GUEST]: ['read'],
  [RolType.USER]: ['read', 'write'],
  [RolType.ADMIN]: ['read', 'write', 'delete'],
  [RolType.SUPER_ADMIN]: ['*']
};

// Uso
const permisos = ROL_TO_PERMISSIONS[usuario.rol];
```

---

## 📊 Checklist de Enums

Antes de finalizar tus enums, verifica:

- [ ] **Nombres consistentes**: `[Dimensión]Type` para todos
- [ ] **UPPER_CASE**: Para valores del enum
- [ ] **lowercase-kebab**: Para strings internos
- [ ] **Sin strings sueltos**: Todo type-safe
- [ ] **Sub-dimensiones**: Opcionales donde aplica
- [ ] **Helpers**: Funciones de utilidad si necesitas
- [ ] **Mapeos**: Records para relaciones entre enums
- [ ] **Validaciones**: Type guards para runtime

---

## 💡 Tips de PC2

### Tip 1: Mantén Enums Pequeños
```typescript
// ❌ MAL - Enum gigante con muchos casos
enum RolType {
  GUEST, USER, PREMIUM_USER, GOLD_USER, PLATINUM_USER,
  MODERATOR, JUNIOR_MODERATOR, SENIOR_MODERATOR,
  ADMIN, SUPER_ADMIN, // ... 20 más
}

// ✅ BIEN - Enum principal + sub-dimensión
enum RolType {
  GUEST, USER, MODERATOR, ADMIN, SUPER_ADMIN
}

enum UserTier {  // Sub-dimensión para USER
  FREE, PREMIUM, GOLD, PLATINUM
}
```

### Tip 2: Strings Descriptivos
```typescript
// ✅ PC2 usa strings descriptivos
enum RolType {
  GUEST = 'NO_AUTENTICADO',  // Más claro que 'guest'
  CLIENT = 'CLIENTE'         // Más claro que 'client'
}
```

### Tip 3: Orden Lógico
```typescript
// ✅ BIEN - Orden de menor a mayor privilegio
enum RolType {
  GUEST = 'guest',        // 1. Sin privilegios
  USER = 'user',          // 2. Básico
  ADMIN = 'admin',        // 3. Alto
  SUPER_ADMIN = 'super'   // 4. Máximo
}

// ✅ BIEN - Orden alfabético si no hay jerarquía
enum IdiomaType {
  DE = 'de',
  EN = 'en',
  ES = 'es',
  FR = 'fr',
  PT = 'pt'
}
```

---

## 🎯 Resultado Esperado

Después de definir tus enums:

1. ✅ **Type-safe**: TypeScript valida en compile-time
2. ✅ **Autocomplete**: IDE sugiere valores
3. ✅ **Consistente**: Misma convención en todo el proyecto
4. ✅ **Mantenible**: Agregar nuevos valores sin romper código
5. ✅ **Documentado**: Comentarios explican cada valor
6. ✅ **Escalable**: Sub-dimensiones para casos complejos

---

**Creado por**: DAK CHAIN IA - Pattern Extraction System
**Basado en**: PC2 Soluciones Díaz - Sistema de Enums Multi-Dimensión
**Fecha**: Octubre 2025
**Versión**: 1.0

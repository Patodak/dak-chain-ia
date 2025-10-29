# 🎨 TEMPLATE: Definición de Enums por Dimensión

**Basado en**: Casos Reales Multi-Dimensión
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
- Subscription Plans (Free, Pro, Enterprise)

---

## 🏗️ Pattern Universal

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

## 🎯 Ejemplos por Tipo de Proyecto

### Ejemplo 1: Multi-Rol (SaaS)

```typescript
enum RolType {
  ANONYMOUS = 'anonymous',
  USER = 'user',
  PREMIUM = 'premium',
  ADMIN = 'admin',
  SUPER_ADMIN = 'super_admin'
}

enum AccessLevel {
  READ = 'read',
  WRITE = 'write',
  DELETE = 'delete',
  ADMIN = 'admin'
}
```

### Ejemplo 2: Multi-Tenant

```typescript
enum TenantTier {
  TRIAL = 'trial',
  STANDARD = 'standard',
  ENTERPRISE = 'enterprise',
  VIP = 'vip'
}

enum TenantStatus {
  ACTIVE = 'active',
  SUSPENDED = 'suspended',
  CANCELLED = 'cancelled'
}
```

### Ejemplo 3: Multi-Idioma

```typescript
enum LanguageType {
  SPANISH = 'es',
  ENGLISH = 'en',
  PORTUGUESE = 'pt',
  FRENCH = 'fr'
}

enum RegionType {
  LATAM = 'latam',
  US = 'us',
  EU = 'eu',
  ASIA = 'asia'
}
```

---

## 🛠️ Helpers Útiles

```typescript
// Convertir enum a array
const rolesArray = Object.values(RolType);

// Validar si valor está en enum
function isValidRole(rol: string): rol is RolType {
  return Object.values(RolType).includes(rol as RolType);
}

// Mapear enum a display names
const roleDisplayNames: Record<RolType, string> = {
  [RolType.ANONYMOUS]: 'Usuario Anónimo',
  [RolType.USER]: 'Usuario',
  [RolType.ADMIN]: 'Administrador'
};
```

---

## 💡 Tips

1. **Naming**: Usa nombres claros y descriptivos
2. **Order**: Ordena de menos a más privilegio
3. **Type Safety**: Siempre usa enums, nunca strings sueltos
4. **Helpers**: Crea funciones de validación y conversión

---

**Creado por**: DAK System
**Basado en**: Casos reales multi-dimensión
**Versión**: 2.0

**Última actualización**: Octubre 27, 2025
# 🎬 Sistema Proyector - Arquitectura Completa
**Fecha**: 3 Oct 2025, 22:20
**Contexto**: Trabajo nocturno - Sistema de proyector unificado

## 🧩 Rompecabezas Completo del Proyector

### PATH B - Proyector (4 CAPAS)

```
CAPA 2B: 📋 Seleccionar Evento
   ↓
CAPA 3B: 🗺️ HUB Proyector
   ├─→ CAPA 4B-1: ⚙️ SETUP (Configuración)
   └─→ CAPA 4B-2: 📺 LIVE (Proyección)
```

---

## ⚙️ CAPA 4B-1: SETUP Proyector

**URL**: `/public/event/[eventId]/setup`
**Archivo**: `src/app/public/event/[eventId]/setup/page.tsx`
**Componente**: `ProjectorCustomizationContent` (sin modal)

### 🎯 Función Principal:
Personalizar el proyector del evento:
- 📸 Subir logos de sponsors
- 🎨 Personalizar fondo (imagen, opacidad, posición)
- ⚙️ Configurar layout (posición brackets, spacing, tema)
- 👁️ Vista previa en tiempo real

### 📂 Conexión con Storage (CAPA 1):
Las imágenes subidas en CAPA 4B-1 se almacenan en:
- **URL**: `/admin/storage`
- **Ubicación en jerarquía**: CAPA 1 (Admin/Sistema)
- **Flujo**:
  ```
  Usuario sube imagen en CAPA 4B-1 (Setup)
     ↓
  Firebase Storage guarda imagen
     ↓
  URL de imagen se guarda en Firestore
     ↓
  Admin puede ver/gestionar en CAPA 1 (Storage)
  ```

### 🗂️ Estructura de datos:
```typescript
ProjectorCustomization {
  eventId: string
  backgroundImage: string (URL de Firebase Storage)
  backgroundOpacity: number
  backgroundPosition: { x, y }
  backgroundScale: number
  sponsors: ProjectorSponsor[] (array de URLs)
  showWatermark: boolean
  layoutConfig: {
    bracketsPosition, spacing, theme, etc.
  }
}
```

### 📌 Pestañas (Tabs):
1. **Fondo** - Imagen de fondo, opacidad, posición, escala
2. **Sponsors** - Subir logos, ajustar posición/escala de cada uno
3. **Layout** - Posición brackets, espaciado, tema visual
4. **Brackets** - Configuración avanzada de brackets (offsets, scale, gaps)

---

## 📺 CAPA 4B-2: LIVE Proyector

**URL**: `/public/event/[eventId]/live`
**Estado**: Placeholder (pendiente implementar)

### 🎯 Función Principal:
Proyector fullscreen para mostrar el evento en tiempo real:
- Escucha cambios de Firebase `projectorControl/[eventId]`
- Muestra vistas según Control Remoto desde Dashboard
- Sync tiempo real con CAPA 3A (Dashboard)

### 🎮 Vistas que debe mostrar:
- `config` - Vista de configuración/setup
- `bracket` - Bracket de categoría específica
- `battle` - Batalla en vivo
- `champion` - Campeón/ganador
- `unified` - Vista unificada multicategoría

---

## 🎮 Control Remoto (CAPA 3A Dashboard)

**Ubicación**: `/admin/dashboard/[eventId]?tab=overview`
**Componente**: `SimpleProjectorDiagnostic` (placeholder naranja)
**Estado**: Pendiente reemplazar con control real

### 🎯 Función:
Controlar el proyector remotamente desde Dashboard:
- Botones por categoría (adaptativo según cantidad de categorías)
- Botón "Vista General"
- Cambia `projectorControl/[eventId]` en Firebase
- CAPA 4B-2 (Live) responde a los cambios

### 🔄 Flujo de Control:
```
Usuario en Dashboard (CAPA 3A)
   ↓
Click botón categoría/vista
   ↓
Actualiza Firebase: projectorControl/[eventId]
   ↓
Proyector (CAPA 4B-2) escucha cambio
   ↓
Proyector muestra vista correspondiente
```

---

## 🗑️ Archivos Fantasma (eliminar):

**Palabra clave para recordar**: "fantasma" → eliminar archivos obsoletos

1. ❌ `/public/event/[eventId]/customize/page.tsx` - Reemplazado por `/setup`
2. ❌ `page-SIMPLE-OLD.tsx`
3. ❌ `page-SIMPLIFIED-TEST.tsx`
4. ❌ `page-temp-backup.tsx`
5. ❌ `page-WITH-HOOK.tsx`

---

## 📊 Estado Actual del Rompecabezas:

```
✅ CAPA 3B: HUB - Funcionando
✅ CAPA 4B-1: SETUP - Funcionando (necesita mejoras diseño)
⏳ CAPA 4B-2: LIVE - Placeholder (pendiente)
⏳ Control Remoto - Función existe, UI placeholder
```

---

## 🎨 Próximos Pasos:

1. **Mejorar diseño CAPA 4B-1** - Activar Frontend-Master
2. **Documentar CAPA 4B-1** - Crear docs completos
3. **Implementar CAPA 4B-2** - Proyector real con sync
4. **Crear Control Remoto visual** - Reemplazar SimpleProjectorDiagnostic
5. **Limpiar archivos fantasma** - Eliminar `/customize` y backups

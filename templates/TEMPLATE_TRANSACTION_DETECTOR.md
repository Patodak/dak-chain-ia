# 🔄 TEMPLATE: Transaction Detector

**Basado en**: PC1 (Manager Battle Pro) + PC2 (Soluciones Díaz CRM)
**Para**: Cualquier proyecto que necesite clasificar tipos de transacciones
**Versión**: 1.0

---

## 📋 Qué Son Transacciones

**Transacción** = Cómo se comunican/conectan las partes de tu app

NO es solo "transferencia de datos". Es el TIPO de flujo entre nodos.

**Ejemplos**:
- Usuario va de página A → página B (FLUJO)
- Dashboard ↔ Proyector en tiempo real (WiFi)
- Setup → Confirmation → Battle → Results (CADENA)

---

## 🎯 6 Tipos Base (Universales)

Estos 6 tipos funcionan para CUALQUIER app:

### Tipo 1: CONTEXTO
```yaml
Descripción: Un nodo trabajando solo, sin conexión activa

Ejemplo Manager Battle Pro:
  - Bracket en modo display
  - Solo muestra, no interactúa

Ejemplo E-commerce:
  - Catálogo de productos
  - Usuario solo ve, no compra aún

Ejemplo SaaS:
  - Dashboard analytics (solo visualización)
  - No hay acciones, solo lectura

Cuándo usar:
  ✅ Nodo independiente
  ✅ No requiere otro nodo para funcionar
  ✅ Información estática o de solo lectura
```

### Tipo 2: FLUJO
```yaml
Descripción: A → B (camino unidireccional o secuencia simple)

Ejemplo Manager Battle Pro:
  - Setup → Battles
  - Usuario termina setup, va a battles

Ejemplo E-commerce:
  - Producto → Carrito
  - Usuario agrega producto y va a carrito

Ejemplo SaaS:
  - Signup → Onboarding
  - Usuario registra y entra a onboarding

Cuándo usar:
  ✅ Flujo de un punto a otro
  ✅ Puede ser unidireccional o permitir retorno
  ✅ Conexión directa entre 2 nodos
```

### Tipo 3: WiFi
```yaml
Descripción: A ↔ B (comunicación en tiempo real, bidireccional continua)

Ejemplo Manager Battle Pro:
  - Dashboard ↔ Proyector
  - Cambios se sincronizan automáticamente

Ejemplo E-commerce:
  - Cliente ↔ Admin Chat
  - Mensajería en tiempo real

Ejemplo SaaS:
  - Colaboradores ↔ Documento compartido
  - Edición simultánea en vivo

Cuándo usar:
  ✅ Tiempo real (WebSocket, Firebase realtime)
  ✅ Ambos lados se actualizan automáticamente
  ✅ Comunicación continua bidireccional
```

### Tipo 4: CADENA
```yaml
Descripción: A → B → C (secuencia de múltiples pasos)

Ejemplo Manager Battle Pro:
  - Setup → Confirmation → Battles → Results
  - Flujo completo del evento

Ejemplo E-commerce:
  - Carrito → Shipping → Payment → Confirmation
  - Proceso de checkout completo

Ejemplo SaaS:
  - Trial → Payment → Activation → Dashboard
  - Flujo de suscripción

Cuándo usar:
  ✅ Múltiples pasos secuenciales
  ✅ Cada paso depende del anterior
  ✅ Workflow completo con estados
```

### Tipo 5: JOURNEY
```yaml
Descripción: Path completo del usuario desde inicio hasta objetivo final

Ejemplo Manager Battle Pro:
  - Participante: Registration → Check-in → Battle → Champion
  - Todo el viaje del competidor

Ejemplo E-commerce:
  - Usuario: Browse → Cart → Purchase → Loyal Customer
  - Journey completo desde visitor a cliente fiel

Ejemplo SaaS:
  - User: Trial → Onboarding → Active Use → Power User
  - Evolución del usuario en la plataforma

Cuándo usar:
  ✅ Representa evolución/progresión del usuario
  ✅ Estados que cambian con el tiempo
  ✅ Historia completa del usuario en el sistema
```

### Tipo 6: CONVERGENCIA
```yaml
Descripción: Muchos → Uno (múltiples fuentes hacia un destino)

Ejemplo Manager Battle Pro:
  - Múltiples categorías → Control Global
  - Todas las categorías administradas desde un lugar

Ejemplo E-commerce:
  - Múltiples productos → Carrito único
  - Todo converge en un solo carrito

Ejemplo SaaS:
  - Múltiples proyectos → Dashboard consolidado
  - Vista unificada de todos los proyectos

Cuándo usar:
  ✅ Múltiples fuentes de información
  ✅ Consolidación en un punto central
  ✅ Agregación de datos de varios lugares
```

---

## 🔍 Tipos Adicionales (Descubiertos en PC2)

### Tipo 7: UNIDIRECCIONAL (Forward-only)
```yaml
Descripción: A → B, pero NO puedes regresar a A

Ejemplo CRM:
  - Selector → Formulario → Confirmación
  - Una vez enviado, no puedes volver

Ejemplo E-commerce:
  - Payment → Receipt
  - Pago completado, no hay vuelta atrás

Ejemplo SaaS:
  - Delete Confirmation → Account Deleted
  - Acción irreversible

Cuándo usar:
  ✅ Acciones irreversibles
  ✅ Flujos de una sola vía
  ✅ Confirmaciones sin retorno
```

### Tipo 8: BIDIRECCIONAL (Reversible loop)
```yaml
Descripción: A ⇄ B, usuario puede ir y venir múltiples veces

Ejemplo CRM:
  - Formulario ⇄ Preview
  - Usuario edita, previsualiza, edita, etc.

Ejemplo E-commerce:
  - Cart ⇄ Wishlist
  - Mover productos entre carrito y favoritos

Ejemplo SaaS:
  - Editor ⇄ Preview
  - Edición y vista previa continua

Cuándo usar:
  ✅ Usuario necesita ajustar/revisar
  ✅ Flujo iterativo
  ✅ Ir y venir es parte del workflow
```

### Tipo 9: ASIMÉTRICA (Unequal exchange)
```yaml
Descripción: A envía una vez, B puede responder múltiples veces

Ejemplo CRM:
  - Cliente envía cotización (1 vez)
  - Admin responde múltiples veces (actualizaciones)

Ejemplo E-commerce:
  - Cliente hace pedido (1 vez)
  - Tienda envía actualizaciones (múltiples: procesando, enviado, entregado)

Ejemplo SaaS:
  - User reporta bug (1 vez)
  - Support responde (múltiples: recibido, investigando, solucionado)

Cuándo usar:
  ✅ Comunicación desbalanceada
  ✅ Un lado inicia, otro lado actualiza
  ✅ Diferencia de frecuencia entre partes
```

### Tipo 10: NOTIFICACIONES (System-initiated)
```yaml
Descripción: Sistema envía automáticamente, sin acción humana

Ejemplo CRM:
  - Admin cambia estado cotización
  - Sistema notifica cliente automáticamente

Ejemplo E-commerce:
  - Pedido enviado
  - Sistema notifica: "Tu pedido está en camino"

Ejemplo SaaS:
  - Trial expira en 3 días
  - Sistema envía reminder automático

Cuándo usar:
  ✅ Trigger automático por cambio de estado
  ✅ No requiere acción humana manual
  ✅ Sistema monitorea y actúa
```

### Tipo 11: SIMÉTRICA (Balanced bidirectional)
```yaml
Descripción: A ⇄ B, ambos pueden enviar/recibir por igual

Ejemplo CRM:
  - Cliente ⇄ Admin (chat en tiempo real)
  - Ambos envían mensajes igualmente

Ejemplo E-commerce:
  - Customer Support ⇄ Cliente
  - Conversación balanceada

Ejemplo SaaS:
  - Team Member ⇄ Team Member (colaboración)
  - Comunicación peer-to-peer

Cuándo usar:
  ✅ Comunicación balanceada
  ✅ Ambos lados tienen mismo poder
  ✅ Chat, mensajería, colaboración
```

### Tipo 12: CONTEXTO CONDICIONAL (State-dependent)
```yaml
Descripción: Misma URL, diferente contenido según estado/rol

Ejemplo Manager Battle Pro:
  - / (no autenticado) → Landing page
  - / (autenticado) → Dashboard
  - Misma URL, mutuamente exclusive

Ejemplo E-commerce:
  - / (guest) → Marketing landing
  - / (logged in) → Personalized homepage
  - Contenido cambia según usuario

Ejemplo SaaS:
  - /workspace (free plan) → Features limitadas
  - /workspace (pro plan) → Features completas
  - Misma página, funcionalidad diferente

Cuándo usar:
  ✅ Misma URL, contenido diferente
  ✅ Dependiente de auth/rol/estado
  ✅ Views mutuamente exclusive
```

---

## 🎯 Cómo Detectar Tipos en TU App

### Proceso de 5 Preguntas

**1️⃣ ¿Los nodos están CONECTADOS o trabajan SOLOS?**
```
Solo → CONTEXTO (Tipo 1)
Conectados → Sigue a pregunta 2
```

**2️⃣ ¿La conexión es EN TIEMPO REAL?**
```
Sí → WiFi (Tipo 3)
No → Sigue a pregunta 3
```

**3️⃣ ¿Es una SECUENCIA de múltiples pasos?**
```
Sí (2 pasos) → FLUJO (Tipo 2)
Sí (3+ pasos) → CADENA (Tipo 4)
No → Sigue a pregunta 4
```

**4️⃣ ¿Múltiples fuentes VAN A un solo lugar?**
```
Sí → CONVERGENCIA (Tipo 6)
No → Sigue a pregunta 5
```

**5️⃣ ¿Representa el viaje COMPLETO del usuario?**
```
Sí → JOURNEY (Tipo 5)
No → Revisa tipos adicionales (7-12)
```

---

## 📊 Matriz de Decisión Rápida

| Característica | Tipo Sugerido |
|----------------|---------------|
| Nodo solo, sin conexión | CONTEXTO (1) |
| A → B simple | FLUJO (2) |
| Tiempo real ↔ | WiFi (3) |
| A → B → C secuencia | CADENA (4) |
| Viaje completo usuario | JOURNEY (5) |
| Muchos → Uno | CONVERGENCIA (6) |
| No puedes regresar | UNIDIRECCIONAL (7) |
| Puedes ir/venir | BIDIRECCIONAL (8) |
| Uno envía, otro múltiple | ASIMÉTRICA (9) |
| Sistema envía automático | NOTIFICACIONES (10) |
| Ambos igual frecuencia | SIMÉTRICA (11) |
| Misma URL, diferente por estado | CONTEXTO CONDICIONAL (12) |

---

## 💡 Ejemplos Completos por Industria

### E-commerce

```yaml
Homepage: CONTEXTO CONDICIONAL (12)
  - Guest: Marketing landing
  - Logged in: Personalized

Browse → Product: FLUJO (2)
Product → Cart: FLUJO (2)
Cart → Checkout → Payment → Confirmation: CADENA (4)
Customer ↔ Support Chat: SIMÉTRICA (11)
Order placed → Status updates: NOTIFICACIONES (10)
Multiple products → One cart: CONVERGENCIA (6)
Guest → Customer → VIP: JOURNEY (5)
```

### SaaS B2B

```yaml
Landing: CONTEXTO (1)
Signup → Onboarding: FLUJO (2)
Dashboard: CONTEXTO CONDICIONAL (12)
  - Free plan: Limited features
  - Pro plan: Full features

Editor ⇄ Preview: BIDIRECCIONAL (8)
Team members ↔ Document: WiFi (3)
Trial → Active → Power user: JOURNEY (5)
Bug report → Support updates: ASIMÉTRICA (9)
Trial expiring reminder: NOTIFICACIONES (10)
Multiple projects → Consolidated dashboard: CONVERGENCIA (6)
```

### CRM

```yaml
Public quote form: CONTEXTO (1)
Form → Preview: BIDIRECCIONAL (8)
Form → Submit: UNIDIRECCIONAL (7)
Cliente envía quote → Admin updates: ASIMÉTRICA (9)
Admin changes status → Cliente notified: NOTIFICACIONES (10)
Cliente ↔ Admin chat: SIMÉTRICA (11)
Multiple quotes → Admin dashboard: CONVERGENCIA (6)
Lead → Client → Loyal: JOURNEY (5)
```

---

## 🔧 Implementación en Tu App

### Paso 1: Lista tus conexiones

```yaml
Ejemplo:
1. Homepage → Login
2. Login → Dashboard
3. Dashboard ↔ Live feed (tiempo real)
4. Signup → Verify → Welcome → Dashboard
5. Multiple notifications → Notification center
```

### Paso 2: Clasifica cada una

```yaml
1. Homepage → Login: FLUJO (2)
2. Login → Dashboard: FLUJO (2)
3. Dashboard ↔ Live feed: WiFi (3)
4. Signup → Verify → Welcome → Dashboard: CADENA (4)
5. Multiple notifications → Center: CONVERGENCIA (6)
```

### Paso 3: Documenta en Blockchain Viviente

```yaml
# En tu blockchain-viviente-visual-map.md

## Transacciones

### T1: Homepage → Login (FLUJO)
- Trigger: Usuario click "Login"
- Validación: Guardian permite acceso
- Resultado: Redirige a dashboard si exitoso

### T2: Dashboard ↔ Live Feed (WiFi)
- Trigger: WebSocket connection
- Real-time: Sí (Firebase realtime)
- Actualización: Bidireccional automática
```

---

## 🎯 Tips Importantes

### 1. Explicit > Implicit

```yaml
❌ MAL: Asumir conexión por proximidad
  "Dashboard y Settings están cerca, deben estar conectados"

✅ BIEN: Documentar conexión explícita
  "Dashboard → Settings (FLUJO tipo 2)"
```

### 2. Una transacción puede ser múltiples tipos

```yaml
Ejemplo:
  Cliente ↔ Admin chat:
    - WiFi (3): Tiempo real
    - Simétrica (11): Comunicación balanceada
    - Notificaciones (10): Alert cuando nuevo mensaje

Documenta TODOS los tipos aplicables
```

### 3. Los tipos evolucionan

```yaml
Tu app hoy:
  - 3 tipos detectados

Tu app en 6 meses:
  - 7 tipos (agregaste features)

Revisa y actualiza periódicamente
```

---

## 📋 Checklist de Clasificación

- [ ] Identificar TODAS las conexiones entre nodos
- [ ] Aplicar proceso de 5 preguntas
- [ ] Usar matriz de decisión para confirmar
- [ ] Documentar en blockchain-viviente-visual-map.md
- [ ] Marcar tipos múltiples si aplican
- [ ] Validar con ejemplos de tu industria
- [ ] Revisar si hay CONTEXTO CONDICIONAL (URLs que cambian)
- [ ] Detectar NOTIFICACIONES (system-initiated)

---

**Creado por**: DAK System
**Basado en**: PC1 + PC2 - Patrones validados en apps reales
**Para**: Cualquier app que necesite clasificar transacciones
**Versión**: 1.0

**Última actualización**: Octubre 2025

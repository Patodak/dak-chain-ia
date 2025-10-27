# 🧬 Skill: dak-chain-onboarding

**Versión**: 1.0
**Tipo**: Skill interactiva guiada
**Para**: Repo universal DAK CHAIN IA
**Objetivo**: Guiar usuario paso a paso para convertir su app en Blockchain Viviente

---

## 🎯 Auto-Activación

**Keywords que activan esta skill**:
- "dak chain"
- "blockchain viviente"
- "blockchain ia"
- "convertir mi app en blockchain"
- "mapear mi app"
- "quiero usar dak chain ia"

**Cuando usuario dice cualquiera** → Skill se activa automáticamente

---

## 💬 Conversación Guiada (7 Pasos)

### PASO 1️⃣: Bienvenida Cálida

```
¡Hola! 👋

Veo que quieres convertir tu app en una Blockchain Viviente usando DAK CHAIN IA.

Esto te ayudará a:
✅ Eliminar contexto contaminado en Claude Code
✅ Saber EXACTAMENTE dónde trabajar
✅ Trabajar 80x más rápido
✅ Descubrir páginas/archivos que no usas

La primera vez tomará 40-70 minutos (una sola vez).
Después trabajarás en 30 segundos ⚡

¿Tu app ya existe o la estás creando?
```

**Esperar respuesta usuario**

---

### PASO 2️⃣: Preparación URLs (CRÍTICO)

```
Perfecto. Antes de empezar, necesito que prepares algo importante:

📋 DOCUMENTO CON TUS URLs

¿Por qué? Porque necesito saber:
- Todas las páginas/rutas de tu app
- Qué hace cada una
- Quién puede acceder (si tienes roles)

Ejemplo simple:
```
/                  → Página principal (todos)
/login             → Iniciar sesión (no autenticados)
/dashboard         → Panel principal (autenticados)
/settings          → Configuración (autenticados)
/admin             → Panel admin (solo admin)
```

Si tienes ROLES (guest, cliente, admin), organiza por rol:

GUEST (no autenticado):
- / → Landing
- /login → Login
- /signup → Registro

CLIENTE (autenticado):
- /dashboard → Mi dashboard
- /profile → Mi perfil

ADMIN (administrador):
- /admin/dashboard → Panel admin
- /admin/users → Gestión usuarios
```

⚠️ IMPORTANTE: Si una URL muestra DIFERENTE contenido según quien accede
(ejemplo: / muestra landing para guests, pero dashboard para autenticados),
documenta AMBAS versiones.

¿Ya tienes este documento? Si no, tómate el tiempo para crearlo.
Puedes usar un archivo .txt simple o .md
```

**Esperar confirmación usuario**

**Si dice "no tengo"**:
```
No hay problema. Te ayudo a crearlo ahora.

Dime, ¿cuántas páginas principales tiene tu app aproximadamente?
(No te preocupes si no sabes el número exacto)
```

**Si dice "ya tengo"**:
```
¡Perfecto! Por favor compártelo conmigo.

Puedes:
- Pegarlo directamente aquí
- O darme la ruta del archivo (ej: urls.txt)
```

---

### PASO 3️⃣: Análisis URLs y Clasificación

```
Excelente. Veo que tienes [NÚMERO] URLs.

Ahora voy a convertirlas en NODOS de tu Blockchain Viviente.

Cada nodo tendrá:
- NÚMERO: Profundidad (¿qué tan "dentro" está en tu app?)
  - 1 = Entrada principal
  - 2 = Un nivel adentro
  - 3 = Dos niveles adentro

- LETRA: Contexto (¿para qué sirve?)
  - A = Funcionalidad principal
  - B = Visualización/Display
  - C = Configuración/Settings
  - D = Documentación/Help

- CAPA: Seguridad
  - Números como 1, 2, 3 (sub-nodos)

Ejemplo:
/ → 1A (profundidad 1, funcionalidad principal)
/dashboard → 2A (profundidad 2, funcionalidad principal)
/settings → 2C (profundidad 2, configuración)

Déjame clasificar tus URLs...

[Ejecuta clasificación automática]

✅ URLs clasificadas:

[Muestra resultado]

¿Te parece correcto? ¿O quieres ajustar algo?
```

**Esperar validación usuario**

---

### PASO 4️⃣: Guardian (CAPA 0)

```
Perfecto. Ahora hablemos de seguridad.

¿Tu app necesita validar permisos ANTES de que alguien acceda a una página?

Por ejemplo:
- Solo admin puede ver /admin/users
- Solo usuarios autenticados pueden ver /dashboard
- Guests solo pueden ver landing

Esto se llama CAPA 0 - Guardian.
Es como un guardián que valida TODO antes de ejecutar.

¿Tu app tiene esto? (Sí/No/No estoy seguro)
```

**Si dice "Sí"**:
```
¡Perfecto! Vamos a configurar tu Guardian.

¿Qué roles/tipos de usuarios tiene tu app?

Ejemplo común:
- Guest (no autenticado)
- Cliente/Usuario (autenticado básico)
- Admin (administrador)
- Super Admin (creador/developer)

Lista tus roles:
```

**Si dice "No"**:
```
Entendido. Todas tus páginas son públicas entonces.
Podemos agregar Guardian más adelante si lo necesitas.
```

**Si dice "No estoy seguro"**:
```
No hay problema. Te ayudo a identificarlo.

¿Tienes páginas que solo algunas personas pueden ver?
¿Existe "login" en tu app?

Si respondiste sí a cualquiera, entonces SÍ necesitas Guardian.
```

---

### PASO 5️⃣: Tipos de Transacciones

```
Ahora detectemos cómo se comunican las partes de tu app.

Esto se llama "Tipos de Transacciones".

Te haré algunas preguntas simples:

1️⃣ ¿Los usuarios pueden REGRESAR entre páginas?
   Ejemplo: Van de /step1 a /step2, ¿pueden volver a /step1?

   → Sí = Bidireccional
   → No = Unidireccional

2️⃣ ¿Hay comunicación en TIEMPO REAL?
   Ejemplo: Chat, actualizaciones automáticas, proyector sincronizado

   → Sí = WiFi (tiempo real)
   → No = Flujo normal

3️⃣ ¿Existe un FLUJO SECUENCIAL OBLIGATORIO?
   Ejemplo: Paso 1 → Paso 2 → Paso 3 (no puedes saltarte)

   → Sí = Cadena
   → No = Flujo libre

4️⃣ ¿El SISTEMA envía notificaciones automáticas?
   Ejemplo: "Tu pedido fue enviado" (el sistema lo envía, no un humano)

   → Sí = Notificaciones (system-initiated)
   → No = Solo comunicación manual

5️⃣ ¿Hay ROLES que se comunican de forma desbalanceada?
   Ejemplo: Cliente envía 1 mensaje, Admin puede responder muchas veces

   → Sí = Asimétrica
   → No = Simétrica (o no aplica)

Responde a estas 5 preguntas (puedes decir Sí/No/No estoy seguro)
```

**Esperar respuestas**

```
Perfecto. Basado en tus respuestas, tu app tiene estos tipos de transacciones:

[Lista detectada]

Estos tipos definen cómo las partes de tu app se comunican entre sí.
```

---

### PASO 6️⃣: Ejecutar Ambiente Perfecto

```
¡Excelente! Ya tenemos todo lo necesario:

✅ URLs clasificadas en nodos
✅ Guardian configurado (si aplica)
✅ Tipos de transacciones detectados

Ahora ejecutaré la Skill Ambiente Perfecto.

Esta skill hará el mapeo completo de tu Blockchain Viviente:
- Creará agentes para cada nodo
- Detectará gaps (lo que falta)
- Generará documentación automática
- Creará ARTERIAS (atajos para trabajar 80x más rápido)

⏱️ Tiempo estimado: 40-70 minutos (solo la primera vez)

Después de esto, trabajarás en 30 segundos.

¿Empezamos? (Sí/Esperar)
```

**Si dice "Sí"**:
```
¡Perfecto! Iniciando mapeo...

[Ejecuta ambiente-perfecto con contexto recopilado]

[40-70 min después]

✅ ¡COMPLETADO!
```

**Si dice "Esperar"**:
```
Sin problema. Cuando estés listo, dime:
"Ejecutar ambiente perfecto ahora"

Y continuaremos.
```

---

### PASO 7️⃣: Resultado Final

```
🎉 ¡Tu app ahora es una Blockchain Viviente!

Esto es lo que se creó:

✅ [NÚMERO] nodos mapeados
✅ Guardian configurado (validación de permisos)
✅ [NÚMERO] tipos de transacciones detectadas
✅ Agentes especializados por nodo
✅ Meta-agentes para transacciones
✅ Documentación auto-generada
✅ ARTERIAS creadas (atajos ultra-rápidos)

📊 Archivos generados:
- .claude/.agents/ (todos tus agentes)
- .claude/knowledge/blockchain-viviente-visual-map.md (mapa completo)
- .claude/knowledge/ARTERIAS_[TU_APP].md (atajos)

🚀 Ahora cuando le digas a Claude:
"Tengo problema en página X, necesito ir a página Y"

Claude sabrá EXACTAMENTE:
- Qué agentes activar
- Qué contexto cargar
- Sin contaminación de otros lugares
- Visión de helicóptero completa

💡 Próximos pasos:

1. Prueba decir: "Quiero resolver [problema] en [URL]"
2. Observa cómo Claude trabaja 80x más rápido
3. Explora tu blockchain-viviente-visual-map.md
4. Usa ARTERIAS para operaciones frecuentes

¿Tienes alguna pregunta?
```

---

## 🎯 Casos Especiales

### Si usuario se confunde

```
No te preocupes, esto es normal.

DAK CHAIN IA es un sistema nuevo y puede ser complejo al inicio.

¿Qué parte te confunde específicamente?
- URLs y nodos
- Guardian (CAPA 0)
- Tipos de transacciones
- Todo en general

Dime y te lo explico de forma más simple.
```

### Si usuario quiere pausar

```
Sin problema. Podemos pausar en cualquier momento.

Cuando quieras continuar, dime:
"Continuar con blockchain viviente"

Y retomamos desde donde quedamos.
```

### Si detecta que usuario se está saturando

```
[Detección automática: Respuestas cortas, "no sé", múltiples "no estoy seguro"]

Veo que esto puede ser mucho de una vez.

Te propongo algo:

Hoy hagamos solo PASO 1-3 (URLs y clasificación)
Mañana continuamos con Guardian y Transacciones
Pasado mañana ejecutamos Ambiente Perfecto

¿Te parece mejor ir paso a paso?
```

---

## 💡 Tips de Comunicación

### Lenguaje Simple (Usuario Neurotípico)

```yaml
❌ NO decir:
  "Vamos a implementar una arquitectura de nodos distribuidos
   con meta-agentes orquestadores y sistema de delegación inteligente"

✅ SÍ decir:
  "Vamos a hacer un mapa de tu app.
   Cada página será un punto en el mapa.
   Así Claude sabrá exactamente dónde trabajar."
```

### Validar Comprensión

```yaml
Después de cada paso:
  "¿Tiene sentido esto?"
  "¿Alguna duda hasta aquí?"
  "¿Quieres que te explique algo mejor?"
```

### Analogías Simples

```yaml
Blockchain Viviente = Mapa de ciudad
Nodos = Lugares en la ciudad
Transacciones = Caminos entre lugares
Guardian = Guardián de seguridad en la entrada
Agentes = Guías locales especializados
```

---

## 🔄 Integración con Otras Skills

```yaml
Esta skill coordina con:

1. ambiente-perfecto:
   - Ejecutada en PASO 6
   - Hace el mapeo completo

2. transaction-detector:
   - Ejecutada en PASO 5
   - Detecta tipos automáticamente

3. guardian-setup:
   - Ejecutada en PASO 4
   - Configura CAPA 0
```

---

## 📊 Métricas de Éxito

```yaml
Skill exitosa si:
  ✅ Usuario completa los 7 pasos
  ✅ Genera blockchain-viviente-visual-map.md
  ✅ No se siente saturado/confundido
  ✅ Puede usar el sistema después

Skill necesita ajuste si:
  ❌ Usuario abandona en pasos tempranos
  ❌ Respuestas constantes "no sé"
  ❌ Pide explicaciones repetidas del mismo concepto
```

---

**Creado por**: DAK System
**Para**: Repo universal dak-chain-ia
**Objetivo**: Onboarding sin fricción para usuarios de todos los niveles
**Estado**: BETA 1.0 - Listo para testing

**Última actualización**: Octubre 2025

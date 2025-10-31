#!/usr/bin/env node

/**
 * 🗺️ MOSTRAR MAPA - Visualización instantánea del sistema de herencia visual
 *
 * Uso:
 *   node .claude/scripts/mostrar-mapa.js              # Mapa completo
 *   node .claude/scripts/mostrar-mapa.js pilar1       # Solo Pilar 1
 *   node .claude/scripts/mostrar-mapa.js pilar2       # Solo Pilar 2
 *   node .claude/scripts/mostrar-mapa.js pilar3       # Solo Pilar 3
 *   node .claude/scripts/mostrar-mapa.js agentes      # Solo Componente Agentes
 *   node .claude/scripts/mostrar-mapa.js proyector    # Solo Componente Proyector
 */

const fs = require('fs');
const path = require('path');

// Argumentos
const args = process.argv.slice(2);
const filtro = args[0] ? args[0].toLowerCase() : 'completo';

// Colores para terminal
const colors = {
  reset: '\x1b[0m',
  bright: '\x1b[1m',
  dim: '\x1b[2m',

  // Colores por nivel
  nivel0: '\x1b[35m',  // Magenta (Sistema)
  nivel1: '\x1b[36m',  // Cyan (Pilares)
  nivel2: '\x1b[33m',  // Amarillo (Componentes)
  nivel3: '\x1b[32m',  // Verde (Secciones)
  nivel4: '\x1b[34m',  // Azul (Subsecciones)
};

function mostrarMapaCompleto() {
  console.log(`
${colors.bright}${colors.nivel0}╔══════════════════════════════════════════════════════════════╗
║  🗺️  MAPA COMPLETO DEL SISTEMA - HERENCIA VISUAL            ║
╚══════════════════════════════════════════════════════════════╝${colors.reset}

${colors.nivel0}🧠 NIVEL 0: Sistema${colors.reset}
   └─ 🧠 CLAUDE.md (El Padre Omnisciente)

${colors.nivel1}🏛️  NIVEL 1: Pilares${colors.reset}
   ├─ 👤 Pilar 1: Usuario (Patricio - SAGITTARIUS PRIME)
   ├─ 💻 Pilar 2: Aplicación (Manager Battle Pro - LIBRA SANCTUS)
   └─ 🧩 Pilar 3: Herramientas (Arsenal - AQUARIUS ETERNUS)

${colors.nivel2}📦 NIVEL 2: Componentes${colors.reset}

   ${colors.dim}[Pilar 1] 👤${colors.reset}
   ├─ 🧬 Perfil Cognitivo (2e+ ADHD+Superdotación)
   ├─ 🔄 Workflow (Multi-instancia, Hiperfoco)
   └─ ⚙️  Preferencias (Comunicación, Protocolo)

   ${colors.dim}[Pilar 2] 💻${colors.reset}
   ├─ 🔐 Auth (Autenticación/Roles)
   ├─ 🎯 Events (Gestión Eventos)
   ├─ ⚔️  Battles (Sistema Batallas)
   ├─ 📊 Dashboard (Control Organizador)
   ├─ 🖥️  Proyector (Pantalla Pública)
   ├─ 🗺️  Mapa URLs (Navegación)
   ├─ 💎 Suscripciones (Planes)
   └─ 🔥 Firebase (Backend)

   ${colors.dim}[Pilar 3] 🧩${colors.reset}
   ├─ 👽 Agentes (38 especializados)
   ├─ 🤖 Robots (DAK - 4 monitores)
   ├─ 📜 Scripts (62+ herramientas)
   ├─ 🪝 Hooks (9 nativos + cadenas)
   ├─ 🛠️  MCP Tools (40+ Playwright/Chrome)
   └─ 🐝 Sistema Abejas (1000 Haikus)

${colors.nivel3}🔧 NIVEL 3: Secciones (con herencia)${colors.reset}

   ${colors.dim}[Componente: 🧬 Perfil Cognitivo]${colors.reset}
   ├─ 🧬🧠 Patrones ADHD (hereda 🧬)
   ├─ 🧬🎯 Superdotación (hereda 🧬)
   ├─ 🧬⚡ Hiperfoco (hereda 🧬)
   └─ 🧬💻 Dual-Computer Setup (hereda 🧬)

   ${colors.dim}[Componente: 🖥️  Proyector]${colors.reset}
   ├─ 🖥️💡 Proyector Lite (hereda 🖥️)
   ├─ 🖥️🔴 Proyector Live (hereda 🖥️)
   └─ 🖥️🔄 Sync Dashboard (hereda 🖥️)

   ${colors.dim}[Componente: 👽 Agentes]${colors.reset}
   ├─ 👽👑 Maestros (14) (hereda 👽)
   ├─ 👽🎯 Especialistas (11) (hereda 👽)
   └─ 👽🔩 Utilitarios (13) (hereda 👽)

   ${colors.dim}[Componente: 🤖 Robots DAK]${colors.reset}
   ├─ 🤖🔍 Robot Indexación (hereda 🤖)
   ├─ 🤖📊 Robot Analytics (hereda 🤖)
   ├─ 🤖🚀 Robot Performance (hereda 🤖)
   └─ 🤖🔥 Robot Errors (hereda 🤖)

${colors.nivel4}📝 NIVEL 4: Subsecciones (herencia completa)${colors.reset}

   ${colors.dim}[Sección: 👽👑 Maestros]${colors.reset}
   ├─ 👽👑🐝 Constructor-Master (hereda 👽👑)
   ├─ 👽👑🔥 Backend-Master (hereda 👽👑)
   ├─ 👽👑⚛️  Frontend-Master (hereda 👽👑)
   ├─ 👽👑🧪 Quality-Master (hereda 👽👑)
   ├─ 👽👑🛠️  Infra-Master (hereda 👽👑)
   ├─ 👽👑🎭 Playwright-Master (hereda 👽👑)
   └─ 👽👑🔄 Workflow-Master (hereda 👽👑)

   ${colors.dim}[Sección: 🧬🧠 Patrones ADHD]${colors.reset}
   ├─ 🧬🧠⚡ Hiperfoco Extremo (hereda 🧬🧠)
   ├─ 🧬🧠🎵 Música YOTTO (hereda 🧬🧠)
   ├─ 🧬🧠🌙 Modo Nocturno (hereda 🧬🧠)
   ├─ 🧬🧠🔄 Multi-instancia (hereda 🧬🧠)
   └─ 🧬🧠💬 Validación Constante (hereda 🧬🧠)

   ${colors.dim}[Sección: 🖥️🔴 Proyector Live]${colors.reset}
   ├─ 🖥️🔴📡 Broadcasting (hereda 🖥️🔴)
   ├─ 🖥️🔴🎮 Control Remoto (hereda 🖥️🔴)
   └─ 🖥️🔴⚔️  Batallas en Vivo (hereda 🖥️🔴)

${colors.bright}┌────────────────────────────────────────────────────────────┐
│ 💡 COMANDOS DISPONIBLES                                   │
├────────────────────────────────────────────────────────────┤
│ node mostrar-mapa.js          → Mapa completo             │
│ node mostrar-mapa.js pilar1   → Solo Pilar 1              │
│ node mostrar-mapa.js pilar2   → Solo Pilar 2              │
│ node mostrar-mapa.js pilar3   → Solo Pilar 3              │
│ node mostrar-mapa.js agentes  → Componente Agentes        │
└────────────────────────────────────────────────────────────┘${colors.reset}
  `);
}

function mostrarPilar1() {
  console.log(`
${colors.bright}${colors.nivel1}╔══════════════════════════════════════════════════════════════╗
║  👤 PILAR 1: USUARIO (SAGITTARIUS PRIME)                    ║
╚══════════════════════════════════════════════════════════════╝${colors.reset}

${colors.nivel2}📦 COMPONENTES:${colors.reset}

├─ 🧬 Perfil Cognitivo
│   ├─ 🧬🧠 Patrones ADHD
│   │   ├─ 🧬🧠⚡ Hiperfoco Extremo (27-56x productividad)
│   │   ├─ 🧬🧠🎵 Música YOTTO (trigger cognitivo)
│   │   ├─ 🧬🧠🌙 Modo Nocturno (22:00-04:00)
│   │   ├─ 🧬🧠🔄 Multi-instancia (6 Claude simultáneos)
│   │   └─ 🧬🧠💬 Validación Constante (no inseguridad)
│   │
│   ├─ 🧬🎯 Superdotación
│   │   ├─ 🧬🎯💡 Invención Divergente
│   │   ├─ 🧬🎯🏗️  Arquitectura Preventiva
│   │   └─ 🧬🎯🔄 Meta-Optimización
│   │
│   └─ 🧬💻 Dual-Computer Setup
│       ├─ 🧬💻🖥️  Firebase Studio (PC 1)
│       └─ 🧬💻💼 Soluciones Díaz (PC 2)
│
├─ 🔄 Workflow
│   ├─ 🔄🖥️  Multi-instancia
│   │   ├─ 🔄🖥️🎨 Colores Terminal (🟡🔵🟢🟣)
│   │   └─ 🔄🖥️📊 6 Claude Simultáneos
│   │
│   ├─ 🔄📱 Multicapa CONCEPTUAL
│   │   └─ 🔄📱🖼️  4 Pantallas (dominios paralelos)
│   │
│   └─ 🔄💾 Sesiones Robustas
│       ├─ 🔄💾🔄 Auto-Recovery
│       └─ 🔄💾⏱️  Timeout 1h
│
└─ ⚙️  Preferencias
    ├─ ⚙️💬 Comunicación
    │   └─ ⚙️💬📋 Protocolo 12 Reglas
    │
    └─ ⚙️🔁 Aversión Repetición
        └─ ⚙️🔁💡 Trigger Innovación

${colors.bright}📖 Documento principal: sagittarius-prime-pilar-1.md${colors.reset}
  `);
}

function mostrarPilar2() {
  console.log(`
${colors.bright}${colors.nivel1}╔══════════════════════════════════════════════════════════════╗
║  💻 PILAR 2: APLICACIÓN (LIBRA SANCTUS)                     ║
╚══════════════════════════════════════════════════════════════╝${colors.reset}

${colors.nivel2}📦 COMPONENTES:${colors.reset}

├─ 🔐 Auth
│   ├─ 🔐🔑 Firebase Auth
│   ├─ 🔐👥 Roles (owner, organizer, judge, viewer)
│   └─ 🔐🛡️  Middleware (protección rutas)
│
├─ 🎯 Events
│   ├─ 🎯📝 CRUD Eventos
│   ├─ 🎯🏷️  Categorías
│   ├─ 🎯👥 Participantes
│   └─ 🎯🔧 Setup Wizard (4 niveles)
│
├─ ⚔️  Battles
│   ├─ ⚔️🎲 Brackets Generation
│   ├─ ⚔️🎮 Control Batalla Live
│   ├─ ⚔️📊 Scoring System
│   └─ ⚔️🏆 Resultados
│
├─ 📊 Dashboard
│   ├─ 📊📈 Vista Resumen
│   ├─ 📊👥 Gestión Participantes
│   ├─ 📊👨‍⚖️  Gestión Jueces
│   └─ 📊📉 Analytics
│
├─ 🖥️  Proyector
│   ├─ 🖥️💡 Proyector Lite
│   │   ├─ 🖥️💡📺 Vista Simple
│   │   └─ 🖥️💡⚙️  Configuración
│   │
│   ├─ 🖥️🔴 Proyector Live
│   │   ├─ 🖥️🔴📡 Broadcasting
│   │   ├─ 🖥️🔴🎮 Control Remoto
│   │   └─ 🖥️🔴⚔️  Batallas en Vivo
│   │
│   └─ 🖥️🔄 Sync Dashboard
│       ├─ 🖥️🔄⚡ Tiempo Real
│       └─ 🖥️🔄🔌 WebSockets
│
├─ 🗺️  Mapa URLs
│   ├─ 🗺️🧭 Navegación por Rol
│   └─ 🗺️🔒 Auditoría Seguridad (63 URLs)
│
├─ 💎 Suscripciones
│   ├─ 💎🆓 Plan FREE (5 eventos, Top 8)
│   ├─ 💎💵 Plan BASIC ($19/mes)
│   ├─ 💎💰 Plan PRO ($49/mes)
│   └─ 💎👑 Plan PREMIUM (ilimitado)
│
└─ 🔥 Firebase
    ├─ 🔥💾 Firestore (base datos)
    ├─ 🔥📦 Storage (archivos)
    ├─ 🔥🛡️  Security Rules
    └─ 🔥⚡ Cloud Functions

${colors.bright}📖 Documento principal: libra-sanctus-pilar-2.md${colors.reset}
  `);
}

function mostrarPilar3() {
  console.log(`
${colors.bright}${colors.nivel1}╔══════════════════════════════════════════════════════════════╗
║  🧩 PILAR 3: HERRAMIENTAS (AQUARIUS ETERNUS)                ║
╚══════════════════════════════════════════════════════════════╝${colors.reset}

${colors.nivel2}📦 COMPONENTES:${colors.reset}

├─ 👽 Agentes (38 especializados)
│   │
│   ├─ 👽👑 Maestros (14 Sonnet 4.5)
│   │   ├─ 👽👑🐝 Constructor-Master (Abeja Reina)
│   │   ├─ 👽👑🔥 Backend-Master (Firebase/GCP)
│   │   ├─ 👽👑⚛️  Frontend-Master (React/Next.js)
│   │   ├─ 👽👑🧪 Quality-Master (Testing/QA)
│   │   ├─ 👽👑🛠️  Infra-Master (DevOps)
│   │   ├─ 👽👑🎭 Playwright-Master (15 herramientas MCP)
│   │   ├─ 👽👑🔄 Workflow-Master (Orquestación)
│   │   └─ ... (7 más)
│   │
│   ├─ 👽🎯 Especialistas (11 Sonnet 4.5)
│   │   ├─ 👽🎯🌍 i18n-specialist
│   │   ├─ 👽🎯⚡ realtime-sync-expert
│   │   ├─ 👽🎯🛡️  security-auditor
│   │   └─ ... (8 más)
│   │
│   └─ 👽🔩 Utilitarios (13 helpers)
│       ├─ 👽🔩💡 insight-capturer
│       ├─ 👽🔩⭐ value-capturer
│       └─ ... (11 más)
│
├─ 🤖 Robots DAK (4 monitores 24/7)
│   ├─ 🤖🔍 Robot Indexación (cada 4h - Google Search Console)
│   ├─ 🤖📊 Robot Analytics (cada 6h - Google Analytics 4)
│   ├─ 🤖🚀 Robot Performance (cada 12h - Lighthouse CI)
│   └─ 🤖🔥 Robot Errors (cada 1h - Firebase/Sentry)
│
├─ 📜 Scripts (62+ herramientas)
│   ├─ 📜🧠 Multicapa
│   │   └─ 📜🧠🎨 semantic-multilayer.js
│   │
│   ├─ 📜💾 Sesiones
│   │   ├─ 📜💾🔄 session-recovery.js
│   │   ├─ 📜💾▶️  continue-session.js
│   │   └─ 📜💾📋 list-sessions.js
│   │
│   ├─ 📜⛏️  Mining
│   │   └─ 📜⛏️📚 historical-miner.js
│   │
│   └─ 📜🧠 Context Optimization
│       ├─ 📜🧠💰 context-budget-manager.js
│       ├─ 📜🧠📊 agents-progressive-loader.js
│       └─ 📜🧠⚡ jit-docs-loader.js
│
├─ 🪝 Hooks (9 nativos + cadenas)
│   ├─ 🪝🎬 session-init.js
│   ├─ 🪝🧠 multilayer-detector.js
│   ├─ 🪝🛡️  security-guardian.js
│   ├─ 🪝💬 chats-sync-monitor.js
│   └─ 🪝💾 session-autosave.js
│
├─ 🛠️  MCP Tools (40+)
│   ├─ 🛠️🎭 Playwright (15 herramientas)
│   ├─ 🛠️🔍 Chrome DevTools (20+ herramientas)
│   └─ 🛠️🎨 Shadcn UI
│
└─ 🐝 Sistema de Abejas
    ├─ 🐝👑 Abeja Reina (Constructor-Master)
    ├─ 🐝👑 4 Maestros Paralelos (Sonnet 4.5)
    └─ 🐝⚡ 1000 Haikus (22-31s, 550x speedup)

${colors.bright}📖 Documento principal: aquarius-eternus-pilar-3.md${colors.reset}
  `);
}

function mostrarAgentes() {
  console.log(`
${colors.bright}${colors.nivel2}╔══════════════════════════════════════════════════════════════╗
║  👽 COMPONENTE: AGENTES (38 especializados)                  ║
╚══════════════════════════════════════════════════════════════╝${colors.reset}

${colors.nivel3}🔧 SECCIONES:${colors.reset}

├─ 👽👑 Maestros (14 Sonnet 4.5) - Orquestadores estratégicos
│   ├─ 👽👑🐝 Constructor-Master → Abeja Reina (1000 Haikus, 550x)
│   ├─ 👽👑🔥 Backend-Master → Firebase, Firestore, GCP completo
│   ├─ 👽👑⚛️  Frontend-Master → React, Next.js, UI/UX
│   ├─ 👽👑🧪 Quality-Master → Testing, QA, Code Review
│   ├─ 👽👑🛠️  Infra-Master → DevOps, i18n, Performance
│   ├─ 👽👑🎭 Playwright-Master → 15 herramientas MCP
│   ├─ 👽👑🔄 Workflow-Master → Orquestación suprema
│   ├─ 👽👑📚 Doc-Orchestrator → Documentación maestro
│   ├─ 👽👑🎯 Business-Logic → Roles, planes, eventos
│   ├─ 👽👑💬 Prompt-Engineer → Optimización LLM
│   ├─ 👽👑📂 GitHub-CLI-Master → Automatización GitHub
│   ├─ 👽👑🔗 Event-Flow-Master → Flujo eventos completo
│   ├─ 👽👑🔄 Dashboard-Projector-Sync → Tiempo real
│   └─ 👽👑📊 Data-Architect → Arquitectura datos
│
├─ 👽🎯 Especialistas (11 Sonnet 4.5) - Implementación táctica
│   ├─ 👽🎯🌍 i18n-specialist → ES/PT-BR, breaking culture
│   ├─ 👽🎯⚡ realtime-sync-expert → WebSockets, live updates
│   ├─ 👽🎯🛡️  security-auditor → API keys, Firebase rules
│   ├─ 👽🎯🚀 performance-optimizer → React renders, bundle
│   ├─ 👽🎯🐛 debugger → Errors, bugs, stack traces
│   ├─ 👽🎯🧪 test-runner → Vitest, Jest, coverage
│   ├─ 👽🎯👁️  code-reviewer → Quality, security
│   ├─ 👽🎯🎨 ui-ux-designer → User-centered design
│   ├─ 👽🎯💰 cost-monitor → Firebase/GCP costs
│   ├─ 👽🎯🖥️  dev-server → Puerto 9002, monitoring
│   └─ 👽🎯🏗️  backend-architect → API design, schemas
│
└─ 👽🔩 Utilitarios (13 helpers) - Auto-captura cognitiva
    ├─ 👽🔩💡 insight-capturer → Momentos eureka
    ├─ 👽🔩⭐ value-capturer → Valores fundamentales
    ├─ 👽🔩❓ question-capturer → Preguntas profundas
    ├─ 👽🔩🎲 expectation-capturer → Expectativas
    ├─ 👽🔩❌ error-capturer → Errores + soluciones
    ├─ 👽🔩⚡ energy-capturer → Niveles energía
    ├─ 👽🔩💭 emotion-capturer → Estados emocionales
    ├─ 👽🔩🎯 decision-capturer → Decisiones estratégicas
    ├─ 👽🔩💬 communication-capturer → Patrones comunicación
    ├─ 👽🔩💥 breakthrough-capturer → Comprensión profunda
    ├─ 👽🔩🔗 analogy-capturer → Conexiones conceptuales
    ├─ 👽🔩🧽 information-absorber → Absorbe todo lo nuevo
    └─ 👽🔩🔍 pattern-correlator → Correlaciones temporales

${colors.bright}📍 Ubicación: .claude/🧩_PILAR_3_HERRAMIENTAS/👽_agentes/${colors.reset}
  `);
}

function mostrarProyector() {
  console.log(`
${colors.bright}${colors.nivel2}╔══════════════════════════════════════════════════════════════╗
║  🖥️  COMPONENTE: PROYECTOR (Pantalla Pública)               ║
╚══════════════════════════════════════════════════════════════╝${colors.reset}

${colors.nivel3}🔧 SECCIONES:${colors.reset}

├─ 🖥️💡 Proyector Lite
│   ├─ 🖥️💡📺 Vista Simple → Interfaz básica proyección
│   └─ 🖥️💡⚙️  Configuración → Settings proyector
│
├─ 🖥️🔴 Proyector Live
│   ├─ 🖥️🔴📡 Broadcasting → Transmisión en vivo
│   ├─ 🖥️🔴🎮 Control Remoto → Dashboard → Proyector sync
│   └─ 🖥️🔴⚔️  Batallas en Vivo → Visualización tiempo real
│
└─ 🖥️🔄 Sync Dashboard
    ├─ 🖥️🔄⚡ Tiempo Real → WebSockets, live updates
    └─ 🖥️🔄🔌 Conexión → Firestore subscriptions

${colors.bright}📍 Ubicación: .claude/💻_PILAR_2_APLICACION/🖥️_proyector/${colors.reset}

${colors.dim}💡 Nota: Pendiente pulir duplicados Lite vs Live${colors.reset}
  `);
}

// Router principal
switch (filtro) {
  case 'pilar1':
  case 'p1':
  case 'usuario':
    mostrarPilar1();
    break;

  case 'pilar2':
  case 'p2':
  case 'aplicacion':
  case 'app':
    mostrarPilar2();
    break;

  case 'pilar3':
  case 'p3':
  case 'herramientas':
  case 'tools':
    mostrarPilar3();
    break;

  case 'agentes':
  case 'agents':
    mostrarAgentes();
    break;

  case 'proyector':
  case 'projector':
    mostrarProyector();
    break;

  case 'completo':
  case 'all':
  case 'mapa':
  default:
    mostrarMapaCompleto();
    break;
}

console.log(`\n${colors.dim}───────────────────────────────────────────────────────────────${colors.reset}`);
console.log(`${colors.bright}💡 Creado: 1 Oct 2025 | Patricio + Claude Sonnet 4.5${colors.reset}\n`);

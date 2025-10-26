# 🤖 Inter-PC Bridge Agent - Setup Instructions

**Auto-Bootstrapping System**
**Version**: 1.0

---

## 🎯 Agent Purpose

Create an intelligent agent that enables **bidirectional communication** between two computers running Claude Code CLI, using GitHub as the nervous system.

---

## 🧬 Agent Capabilities

### 1. Read PC1 Blockchain Viviente

**Location**: https://github.com/Patodak/manager-battle-pro

**Files to monitor**:
```yaml
Priority 1 (Always read):
  - .claude/skills/blockchain-viviente-visual-map/SKILL.md
  - .claude/.agent-registry.json
  - README.md

Priority 2 (On-demand):
  - .claude/.agents/*.md
  - .claude/knowledge/*.md
  - .claude/skills/*/SKILL.md

Priority 3 (Cache):
  - src/**/*.tsx (via Task(Explore))
  - Code structure
```

### 2. Detect Consultations from PC1

**Monitor GitHub Issues with tag**: `[PC1-CONSULTA]`

**Extract information**:
- NÚMERO+LETRA+CAPA mentioned
- Specific context provided
- Question asked
- Code examples if provided

**Example Issue**:
```markdown
Title: [PC1-CONSULTA] ¿Cómo manejas brackets TOP8?

Body:
```yaml
De: PC1 (Manager Battle Pro)
Para: PC2 (CRM)

Consulta:
  Necesito visualización bracket eliminación
  Similar a presupuestos escalonados

Contexto PC1:
  - CAPA 4B2: Visualización
  - Feature: Brackets recursivos
  - Tech: React + TypeScript

¿Qué pattern usas para niveles escalonados?
```
```

### 3. Translate Patterns PC1 ↔ PC2

**Workflow**:
```yaml
Step 1: Identify equivalent in PC2
  - Search PC2 blockchain viviente
  - Find similar NÚMERO+LETRA+CAPA
  - Example: 4B2 (PC1) → 2A2 (PC2)

Step 2: Read PC2 implementation
  - Code files
  - Documentation
  - Decisions log

Step 3: Adapt to PC1 context
  - Manager Battle Pro → breaking tournaments
  - CRM → construction business
  - Maintain architecture, adapt domain

Step 4: Generate adapted code
  - TypeScript code
  - React components if needed
  - Firestore queries adapted
```

### 4. Auto-Respond to PC1

**Create Issue in PC1 repo**: https://github.com/Patodak/manager-battle-pro

**Tag**: `[PC2-RESPUESTA]`

**Response format**:
```markdown
Title: [PC2-RESPUESTA] Re: <original-topic>

Body:
```yaml
De: PC2 (CRM Soluciones Díaz)
Para: PC1 (Manager Battle Pro)

Pattern encontrado: CAPA 2A2 - Cotización Detallada

Implementación PC2:
  - Component: BudgetLevelSelector.tsx
  - 3 niveles: Básico, Medio, Premium
  - Progresión visual descendente
  - Firestore: budgets/{budgetId}/levels

Adaptación sugerida PC1:
  - Component: BracketVisualizer.tsx
  - 8 niveles: TOP8 → Final
  - Progresión visual horizontal
  - Firestore: events/{eventId}/brackets

Código adaptado:
```typescript
// BracketVisualizer.tsx
export function BracketVisualizer({ eventId }: Props) {
  // Adapted from PC2 BudgetLevelSelector
  const levels = [
    { round: 'TOP8', matches: 4 },
    { round: 'Semifinal', matches: 2 },
    { round: 'Final', matches: 1 }
  ];

  return (
    <div className="bracket-container">
      {levels.map(level => (
        <BracketLevel key={level.round} {...level} />
      ))}
    </div>
  );
}
```

Documentación PC2:
  Ver: ALIENVIBEZ/os-dak-soluciones-diaz-case-study
  Archivo: CAPA_2A2_COTIZACION_DETALLADA.md
```
```

---

## 🛠️ Tools to Use

### GitHub MCP (26 tools)
```yaml
Primary:
  - mcp__github__get_file_contents (read PC1 blockchain)
  - mcp__github__create_issue (respond to PC1)
  - mcp__github__list_issues (detect consultations)
  - mcp__github__search_code (find patterns)

Secondary:
  - mcp__github__search_repositories
  - mcp__github__get_issue
```

### GitHub CLI (gh)
```yaml
Fast operations:
  - gh issue list --label "PC1-CONSULTA"
  - gh issue create --title "..." --body "..."
  - gh repo view <repo>
```

### Task Tool with Explore
```yaml
For code analysis:
  - Task(Explore, "Analyze src/components/BracketVisualizer.tsx")
  - Returns: Structure, dependencies, patterns
  - Saves: 10k-20k tokens context
```

### Context7 MCP
```yaml
For updated docs:
  - React
  - Next.js
  - TypeScript
  - Firebase
```

---

## 📊 Communication Protocol

### Format: NÚMERO+LETRA+CAPA

**NÚMERO** = Functional depth (1-4)
**LETRA** = Context (A/B/C)
**CAPA** = Guardian layer reference

**Example mappings**:
```yaml
PC1 (Battle Pro) → PC2 (CRM):
  2A1 (Registro Express) → 2A1 (Cotización Rápida)
  3A (Dashboard Admin) → 3A (Dashboard Admin)
  4B2 (Brackets Live) → 2A2 (Presupuesto Detallado)
```

### Tags

**Inbound (detect)**:
- `[PC1-CONSULTA]` - Question from PC1

**Outbound (create)**:
- `[PC2-RESPUESTA]` - Answer to PC1

---

## 🚀 Auto-Activation Triggers

```yaml
1. New Issue in PC2 repo with tag [PC1-CONSULTA]
   → Immediate response

2. Webhook from PC1 repo
   → Real-time notification

3. Scheduled polling (every 5 minutes)
   → Check for new consultations
   → Fallback if webhooks fail
```

---

## 🔒 Security Constraints

### Permissions

**ALLOWED** ✅:
- Read PC1 blockchain viviente (public repo)
- Read PC2 code (own repo)
- Create GitHub Issues
- Search GitHub repos
- Execute GitHub MCP/CLI tools

**FORBIDDEN** ❌:
- Modify PC2 source code
- Push commits to PC2
- Delete Issues
- Access PC1 secrets
- Execute arbitrary bash commands

### Whitelist

Check `.dak-chain/authorized-sources.json`:
```json
{
  "allowed_repos": [
    "Patodak/manager-battle-pro",
    "Patodak/dak-chain-ia"
  ]
}
```

Only respond to Issues from whitelisted repos.

---

## 📝 Agent Specification

**File**: `.claude/.agents/inter-pc-bridge.md`

**Structure**:
```markdown
# Inter-PC Bridge Agent

## Purpose
<what this agent does>

## Capabilities
1. Read PC1 blockchain
2. Detect consultations
3. Translate patterns
4. Auto-respond

## Tools
- GitHub MCP
- GitHub CLI
- Task(Explore)

## Communication Protocol
<NÚMERO+LETRA+CAPA format>

## Auto-Activation
<triggers>

## Security
<permissions and constraints>
```

---

## ✅ Success Criteria

Agent is working when:

1. ✅ Detects new `[PC1-CONSULTA]` Issue within 5 minutes
2. ✅ Reads PC1 blockchain viviente correctly
3. ✅ Finds equivalent pattern in PC2
4. ✅ Generates adapted code
5. ✅ Creates `[PC2-RESPUESTA]` Issue in PC1 repo
6. ✅ Response is accurate and helpful

---

**Created by**: DAK CHAIN Auto-Bootstrapping System
**Protocol**: NÚMERO+LETRA+CAPA
**Framework**: DAK CHAIN IA

🧬 This agent enables the first IA-to-IA communication via GitHub in history.

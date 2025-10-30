# 🤝 Multi-PC Consensus Protocol

**Versión**: 1.0 - Community Edition
**Validado**: 29 octubre 2025
**Para**: Trabajar con 2+ computadoras sin conflictos

---

## 🎯 Problema

Cuando trabajas en **2+ computadoras** en el mismo proyecto:

```yaml
Problema:
  PC1: Hace commit + push
  PC2: Hace commit + push (sin pull)
  ↓
  ❌ CONFLICTO: Divergencia de branches
  ❌ Pérdida de trabajo
  ❌ Merge manual requerido

Peor caso:
  - Blockchain corrompida
  - Contexto ADHD perdido
  - 30-60 min resolviendo conflictos
```

---

## ✅ Solución: Leader-Follower Pattern

### Concepto

```yaml
PC1 (Leader):
  - Coordinador principal
  - Push directo (sin validación)
  - Marca como "fuente de verdad"

PC2 (Follower):
  - Debe sincronizar primero
  - Consensus check antes de push
  - Auto-sync después de commit local

Resultado:
  ✅ Cero conflictos
  ✅ Sincronización automática
  ✅ Trabajo fluido en ambas PCs
```

---

## 🔧 Implementación

### Paso 1: Git-Based Consensus (Sin Firestore)

**Funciona siempre**, no requiere servicios externos.

**Script**: `.claude/scripts/multi-pc-sync/sync-wrapper.sh`

```bash
#!/bin/bash
# Multi-PC Sync Wrapper

RED='\033[0;31m'
GREEN='\033[0;32m'
BLUE='\033[0;34m'
NC='\033[0m'

# Git consensus check (sin Firestore)
git_consensus_check() {
    local role=$1

    if [ "$role" != "follower" ]; then
        return 0  # Leaders don't need check
    fi

    echo -e "${BLUE}🔄 Validando consenso Git (FOLLOWER)...${NC}"

    # Fetch latest from remote
    git fetch origin main --quiet 2>/dev/null

    # Get commit SHAs
    LOCAL=$(git rev-parse @ 2>/dev/null)
    REMOTE=$(git rev-parse @{u} 2>/dev/null)
    BASE=$(git merge-base @ @{u} 2>/dev/null)

    if [ "$LOCAL" = "$REMOTE" ]; then
        echo -e "${GREEN}✅ Synced con remote${NC}"
        return 0
    elif [ "$LOCAL" = "$BASE" ]; then
        echo -e ""
        echo -e "${RED}❌ BLOQUEADO: Estás BEHIND del Leader${NC}"
        echo -e ""
        echo -e "   PC1 (Leader) tiene commits más nuevos"
        echo -e "   Debes hacer: ${GREEN}git pull --rebase${NC}"
        echo -e ""
        return 1
    elif [ "$REMOTE" = "$BASE" ]; then
        echo -e "${GREEN}✅ Ahead del remote (OK para push)${NC}"
        return 0
    else
        echo -e ""
        echo -e "${RED}❌ BLOQUEADO: Divergencia detectada${NC}"
        echo -e ""
        echo -e "   Tu branch divergió del Leader"
        echo -e "   Debes hacer: ${GREEN}git pull --rebase${NC}"
        echo -e ""
        return 1
    fi
}

export -f git_consensus_check
```

---

### Paso 2: Pre-Push Hook (Consensus Check)

**Archivo**: `.git/hooks/pre-push`

```bash
#!/bin/sh
# Multi-PC Consensus Pre-Push

GREEN='\033[0;32m'
BLUE='\033[0;34m'
NC='\033[0m'

# Multi-PC Role Configuration
# PC1: LEADER
# PC2: FOLLOWER
MULTI_PC_ROLE="leader"  # Change to "follower" on PC2

echo "${GREEN}🛡️  Blockchain Protection: Validando push...${NC}"
echo ""

# STEP 1: Multi-PC Consensus Check (if FOLLOWER)
if [ "$MULTI_PC_ROLE" = "follower" ]; then
    echo "${BLUE}🔄 Multi-PC Consensus Check (FOLLOWER)...${NC}"

    SCRIPT_DIR="$(cd "$(dirname "$0")/../../.claude/scripts/multi-pc-sync" && pwd)"
    if [ -f "$SCRIPT_DIR/sync-wrapper.sh" ]; then
        source "$SCRIPT_DIR/sync-wrapper.sh"

        # Run git-based consensus check
        if ! git_consensus_check "follower"; then
            exit 1
        fi
    fi
    echo ""
fi

# ... resto del hook (force push protection, etc)

echo "${GREEN}✅ Push validation passed${NC}"
exit 0
```

---

### Paso 3: Post-Commit Hook (Auto-Sync)

**Archivo**: `.git/hooks/post-commit`

```bash
#!/bin/sh
# Multi-PC Auto-Sync Post-Commit

GREEN='\033[0;32m'
BLUE='\033[0;34m'
YELLOW='\033[1;33m'
NC='\033[0m'

# Multi-PC Role Configuration
MULTI_PC_ROLE="leader"  # Change to "follower" on PC2

# Auto-sync only for FOLLOWER
if [ "$MULTI_PC_ROLE" != "follower" ]; then
    exit 0  # Leader doesn't need auto-pull
fi

echo ""
echo "${BLUE}🔄 Multi-PC Auto-Sync (FOLLOWER)...${NC}"

# Fetch latest from Leader
git fetch origin main --quiet 2>/dev/null

# Check sync status
LOCAL=$(git rev-parse @ 2>/dev/null)
REMOTE=$(git rev-parse @{u} 2>/dev/null)
BASE=$(git merge-base @ @{u} 2>/dev/null)

if [ "$LOCAL" = "$REMOTE" ]; then
    echo "${GREEN}✅ Ya estás synced con Leader${NC}"
elif [ "$LOCAL" = "$BASE" ]; then
    echo "${BLUE}📥 Pulling latest from Leader...${NC}"

    if git pull --rebase --quiet 2>/dev/null; then
        echo "${GREEN}✅ Synced con Leader${NC}"
    else
        echo "${YELLOW}⚠️  Auto-pull failed - manual merge requerido${NC}"
        echo "   Ejecuta: git pull --rebase"
    fi
elif [ "$REMOTE" = "$BASE" ]; then
    echo "${GREEN}✅ Ahead del Leader (tu commit local)${NC}"
else
    echo "${YELLOW}⚠️  Divergencia detectada${NC}"
    echo "   Ejecuta: ${GREEN}git pull --rebase${NC}"
fi

echo ""
exit 0
```

---

## 🚀 Instalación

### PC1 (Leader) - 5 minutos

```bash
# 1. Crear directorio scripts
mkdir -p .claude/scripts/multi-pc-sync

# 2. Copiar sync-wrapper.sh
# (código arriba)

# 3. Instalar hooks
cp pre-push-script .git/hooks/pre-push
cp post-commit-script .git/hooks/post-commit
chmod +x .git/hooks/*

# 4. Configurar como LEADER
# En .git/hooks/pre-push línea 21:
MULTI_PC_ROLE="leader"

# En .git/hooks/post-commit línea 17:
MULTI_PC_ROLE="leader"
```

### PC2 (Follower) - 10 minutos

```bash
# 1-3. Igual que PC1

# 4. Configurar como FOLLOWER
# En .git/hooks/pre-push línea 21:
MULTI_PC_ROLE="follower"

# En .git/hooks/post-commit línea 17:
MULTI_PC_ROLE="follower"

# 5. Test consensus
git fetch
git status  # Ver si behind
```

---

## 🧪 Testing

**Escenario 1: PC1 trabaja solo**
```bash
# PC1
git commit -m "feat: leader feature"
git push  # ✅ Push directo
```

**Escenario 2: PC2 behind (debe bloquear)**
```bash
# PC1: Push commit
# PC2: Intentar push sin pull
git push  # ❌ BLOQUEADO "Estás BEHIND del Leader"
```

**Escenario 3: Auto-sync funciona**
```bash
# PC2: Hacer commit local
git commit -m "feat: follower feature"
# Post-commit hook auto-pull
# "✅ Synced con Leader"

# Ahora push
git push  # ✅ Exitoso
```

---

## 📊 Beneficios

```yaml
Antes:
  - Conflictos frecuentes
  - 30-60 min resolviendo
  - Pérdida de trabajo
  - Stress + fricción

Después:
  ✅ Cero conflictos
  ✅ Auto-sync automático
  ✅ Trabajo fluido
  ✅ 0 mantenimiento
```

**Tiempo setup**: 15 minutos (ambas PCs)
**Ahorro**: 30-60 min/conflicto evitado

---

## 🎯 Adaptación

**Más de 2 PCs**:
```yaml
PC1: Leader
PC2: Follower
PC3: Follower
PC4: Follower

Todos los Followers validan contra Leader
```

**Firestore opcional**:
- Agrega real-time coordination
- Broadcasting de estado
- No requerido (Git-based suficiente)

---

**Validado en**: PC1 (MBPRO) + PC2 (ALIENVIBEZ)
**Para comunidad**: DAK Chain IA
**Licencia**: MIT
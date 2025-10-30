# 🛡️ Blockchain Protection System

**Versión**: 1.0 - Community Edition
**Validado**: 29 octubre 2025
**Para**: Proyectos con Git como blockchain

---

## 🎯 Problema

Cuando usas Git como blockchain (cada commit = transacción), necesitas protegerlo de:

1. **Force push**: Puede reescribir historia → corrupción
2. **Código roto**: Commits fallidos contaminan blockchain
3. **Pérdida de contexto**: ADHD-critical (Sessions, memoria externa)

---

## ✅ Solución: Sistema de Guardias

### 1. Force Push Protection

**Hook**: `.git/hooks/pre-push`

**Qué hace**:
- Detecta non-fast-forward push (indicador de force push)
- Bloquea push --force a branches protegidas (main/master)
- Permite push normal y branches temporales

**Implementación**:
```bash
#!/bin/sh
# Force Push Protection

remote="$1"
url="$2"

RED='\033[0;31m'
GREEN='\033[0;32m'
NC='\033[0m'

zero=$(git hash-object --stdin </dev/null | tr '[0-9a-f]' '0')

while read local_ref local_oid remote_ref remote_oid
do
    branch_name=$(echo "$remote_ref" | sed 's|refs/heads/||')
    
    if [ "$local_oid" = "$zero" ]; then
        continue
    fi
    
    if [ "$branch_name" = "main" ] || [ "$branch_name" = "master" ]; then
        if [ "$remote_oid" != "$zero" ]; then
            if ! git merge-base --is-ancestor "$remote_oid" "$local_oid" 2>/dev/null; then
                echo ""
                echo "${RED}❌ BLOCKCHAIN PROTECTION: Force push BLOQUEADO${NC}"
                echo ""
                echo "   Opciones seguras:"
                echo "   1. ${GREEN}git pull --rebase${NC} primero"
                echo "   2. Crear branch temporal"
                echo "   3. Contactar admin si es necesario"
                echo ""
                exit 1
            fi
        fi
    fi
done

echo "${GREEN}✅ Push validation passed${NC}"
exit 0
```

**Instalación**:
```bash
# 1. Crear hook
cp script-arriba .git/hooks/pre-push
chmod +x .git/hooks/pre-push

# 2. Git config adicional
git config --local receive.denyNonFastForwards true
git config --local receive.denyDeletes true
```

---

### 2. Pre-Commit Validation

**Hook**: `.git/hooks/pre-commit`

**Qué hace**:
- Valida código ANTES de guardarlo en blockchain
- 3 etapas: TypeScript + Lint + Tests
- Skip automático para merge commits
- Bypass con --no-verify para emergencias

**Implementación** (adaptable a tu stack):
```bash
#!/bin/sh
# Pre-Commit Validation

BLUE='\033[0;34m'
GREEN='\033[0;32m'
RED='\033[0;31m'
NC='\033[0m'

VALIDATION_FAILED=0

# Skip para merge commits
if git rev-parse -q --verify MERGE_HEAD >/dev/null 2>&1; then
    echo "${YELLOW}⚠️  Merge commit - saltando validaciones${NC}"
    exit 0
fi

echo "${BLUE}🛡️  Blockchain Protection: Validando commit...${NC}"
echo ""

# STAGE 1: TypeScript (adaptar a tu lenguaje)
echo "${BLUE}[1/3] 🔍 Validando TypeScript...${NC}"
npm run typecheck --silent 2>&1 | head -50 > /tmp/typecheck.txt
if [ $? -ne 0 ]; then
    echo "${RED}❌ TypeScript validation FAILED${NC}"
    cat /tmp/typecheck.txt | head -20
    VALIDATION_FAILED=1
else
    echo "${GREEN}✅ TypeScript OK${NC}"
fi

# STAGE 2: Linting
echo "${BLUE}[2/3] 🧹 Validando linting...${NC}"
npm run lint --silent 2>&1 | head -50 > /tmp/lint.txt
if [ $? -ne 0 ]; then
    echo "${YELLOW}⚠️  Linting warnings${NC}"
    # No fail on warnings, solo mostrar
else
    echo "${GREEN}✅ Linting OK${NC}"
fi

# STAGE 3: Tests
echo "${BLUE}[3/3] 🧪 Ejecutando tests...${NC}"
npm run test --silent 2>&1 | tail -30 > /tmp/test.txt
if [ $? -ne 0 ]; then
    echo "${RED}❌ Tests FAILED${NC}"
    cat /tmp/test.txt
    VALIDATION_FAILED=1
else
    echo "${GREEN}✅ Tests OK${NC}"
fi

if [ $VALIDATION_FAILED -eq 1 ]; then
    echo "${RED}━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━${NC}"
    echo "${RED}❌ COMMIT BLOQUEADO${NC}"
    echo ""
    echo "   Opciones:"
    echo "   1. ${GREEN}Arregla los errores${NC}"
    echo "   2. ${YELLOW}git commit --no-verify${NC} (bypass)"
    echo ""
    exit 1
fi

echo "${GREEN}✅ COMMIT APROBADO${NC}"
exit 0
```

**Instalación**:
```bash
cp script-arriba .git/hooks/pre-commit
chmod +x .git/hooks/pre-commit
```

---

## 🧪 Testing

**Test Force Push Protection**:
```bash
# Push normal (debe pasar)
git commit -m "test: normal"
git push  # ✅

# Force push (debe bloquear)
git push --force  # ❌
```

**Test Pre-Commit Validation**:
```bash
# Código válido (debe pasar)
echo "const x = 1;" > test.ts
git add test.ts
git commit -m "test"  # ✅

# Código inválido (debe bloquear)
echo "const x: string = 123;" > invalid.ts
git add invalid.ts
git commit -m "test"  # ❌
```

---

## 🎯 Adaptación a Tu Proyecto

**Cambiar validaciones según tu stack**:

```bash
# Python
pylint .
pytest

# JavaScript
npm run lint
npm test

# Go
go fmt ./...
go test ./...

# Rust
cargo fmt --check
cargo test
```

---

## 📊 Beneficios

- ✅ Blockchain protegida (Git history inmutable)
- ✅ Solo código validado entra
- ✅ Previene commits rotos
- ✅ ADHD-friendly (memoria externa protegida)
- ✅ 0 configuración después de setup

**Tiempo setup**: 10-15 minutos
**Mantenimiento**: 0 (automático)

---

**Validado en**: Manager Battle Pro
**Para comunidad**: DAK Chain IA
**Licencia**: MIT
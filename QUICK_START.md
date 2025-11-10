# 🚴 BikeReserve - Quick Start Guide

## What Just Happened?

Your project has been **completely refactored** to follow:
- ✅ **Airbnb JavaScript/TypeScript Style Guide**
- ✅ **Your coding preferences** (no ternaries, no `&&`, human-readable code)
- ✅ **Professional ESLint and Prettier setup**
- ✅ **Proper TypeScript types throughout**

## 🚀 Get Started (3 Steps)

### 1. Install Dependencies
```bash
cd /Users/gvagdas/Documents/Dev/bikereserve
npm install
```

### 2. Format and Lint Everything
```bash
npm run check
```

This will:
- Auto-format all files with Prettier
- Auto-fix ESLint issues
- Show any remaining issues to address

### 3. Start Development
```bash
npm run dev
```

Visit `http://localhost:3000` to see your app!

---

## 📋 What Changed?

### Configuration Files
| File | What Changed |
|------|-------------|
| `eslint.config.js` | Complete rewrite with Airbnb rules + your preferences |
| `prettier.config.js` | Updated to Airbnb style (semicolons, 100 char width) |
| `package.json` | Added ESLint/Prettier dependencies + better scripts |
| `.editorconfig` | Created for consistent editor settings |
| `.vscode/settings.json` | Auto-format and auto-fix on save |

### All Source Files Refactored
Every `.tsx` and `.ts` file now follows the new style:
- ✅ Proper TypeScript interfaces for all props
- ✅ No ternaries - uses helper functions instead
- ✅ No `&&` operators - uses `if` statements
- ✅ Organized imports (React → External → Internal → Types)
- ✅ Function declarations for components
- ✅ Arrow functions for helpers

### Example Before/After

#### ❌ Before
```typescript
function BikeCard({ bike }) {
  return (
    <div>
      {bike.imageUrl ? (
        <img src={bike.imageUrl} alt={bike.name} />
      ) : (
        <Bike />
      )}
      {bike.description && <p>{bike.description}</p>}
    </div>
  )
}
```

#### ✅ After
```typescript
interface BikeCardProps {
  bike: BikeType;
}

function BikeCard({ bike }: BikeCardProps) {
  return (
    <div>
      {renderBikeImage(bike)}
      {renderBikeDescription(bike.description)}
    </div>
  );
}

function renderBikeImage(bike: BikeType) {
  if (bike.imageUrl) {
    return <img src={bike.imageUrl} alt={bike.name} />;
  }
  return <Bike />;
}

function renderBikeDescription(description: string | null) {
  if (!description) {
    return null;
  }
  return <p>{description}</p>;
}
```

---

## 🛠️ Available Commands

### Development
```bash
npm run dev          # Start dev server on port 3000
npm run build        # Build for production
npm run serve        # Preview production build
```

### Code Quality
```bash
npm run typecheck    # Check TypeScript types
npm run lint         # Check for ESLint issues
npm run lint:fix     # Auto-fix ESLint issues
npm run format       # Check Prettier formatting
npm run format:fix   # Auto-format with Prettier
npm run check        # Run format:fix + lint:fix
```

### Database
```bash
npm run db:push      # Push schema to database
npm run db:generate  # Generate migrations
npm run db:migrate   # Run migrations
npm run db:studio    # Open Drizzle Studio
npm run db:seed      # Seed database with sample data
```

---

## 📚 Important Files to Read

1. **`STYLE_GUIDE.md`** - Comprehensive style guide with examples
2. **`REFACTORING_SUMMARY.md`** - Detailed list of all changes made
3. **`.vscode/settings.json`** - VS Code configuration
4. **`eslint.config.js`** - All ESLint rules explained

---

## 💡 Key Style Rules

### Always Use Helper Functions
```typescript
// ✅ Good
function renderContent(hasData: boolean) {
  if (!hasData) {
    return <EmptyState />;
  }
  return <Content />;
}

// ❌ Avoid
{hasData ? <Content /> : <EmptyState />}
```

### Always Type Your Props
```typescript
// ✅ Good
interface ButtonProps {
  label: string;
  onClick: () => void;
  disabled?: boolean;
}

function Button({ label, onClick, disabled }: ButtonProps) {
  // ...
}

// ❌ Avoid
function Button({ label, onClick, disabled }) {
  // ...
}
```

### Organize Imports
Imports are automatically sorted:
```typescript
import { useState } from 'react';          // 1. React

import { Link } from '@tanstack/react-router';  // 2. External
import { Bike } from 'lucide-react';

import { getBikes } from '@/api/bikes';    // 3. Internal

import type { Bike as BikeType } from '@/db/schema';  // 4. Types
```

---

## 🎯 Pre-Commit Checklist

Before committing code, run:
```bash
npm run typecheck && npm run lint && npm run format
```

Or use the all-in-one:
```bash
npm run check
```

---

## 🔧 VS Code Setup

### Required Extensions
1. **ESLint** - Integrates ESLint
2. **Prettier** - Code formatter
3. **EditorConfig** - Respects .editorconfig

### Already Configured
Your `.vscode/settings.json` is set up to:
- ✅ Format on save
- ✅ Fix ESLint issues on save
- ✅ Use Prettier as default formatter
- ✅ Organize imports automatically

---

## 🐛 Troubleshooting

### TypeScript Errors
```bash
# Check for type errors
npm run typecheck

# If you see "cannot find module @/*"
# Make sure tsconfig.json has the paths configured
```

### ESLint Errors
```bash
# See what's wrong
npm run lint

# Try auto-fixing
npm run lint:fix

# Clear cache if issues persist
rm -rf node_modules/.cache
npm run lint:fix
```

### Prettier Conflicts
```bash
# Always format first, then lint
npm run format:fix
npm run lint:fix
```

---

## 📖 Learning Resources

- [Airbnb JavaScript Style Guide](https://github.com/airbnb/javascript)
- [Airbnb React Style Guide](https://github.com/airbnb/javascript/tree/master/react)
- [TypeScript Best Practices](https://www.typescriptlang.org/docs/handbook/declaration-files/do-s-and-don-ts.html)

---

## 🎉 You're Ready!

Your project is now:
- ✅ Clean and consistent
- ✅ Following industry standards (Airbnb)
- ✅ Type-safe with TypeScript
- ✅ Formatted automatically
- ✅ Linted automatically
- ✅ Human-readable (no ternaries, clear helper functions)

**Next Steps:**
1. Run `npm install`
2. Run `npm run check`
3. Run `npm run dev`
4. Start building amazing features! 🚀

Questions? Check `STYLE_GUIDE.md` or `REFACTORING_SUMMARY.md`

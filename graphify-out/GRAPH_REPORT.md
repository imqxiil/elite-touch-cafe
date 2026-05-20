# Graph Report - .  (2026-05-17)

## Corpus Check
- 80 files · ~301,781 words
- Verdict: corpus is large enough that graph structure adds value.

## Summary
- 130 nodes · 176 edges · 14 communities (10 shown, 4 thin omitted)
- Extraction: 100% EXTRACTED · 0% INFERRED · 0% AMBIGUOUS
- Token cost: 0 input · 0 output

## Community Hubs (Navigation)
- [[_COMMUNITY_Page Setup & Site Config|Page Setup & Site Config]]
- [[_COMMUNITY_Admin Dashboard & Contexts|Admin Dashboard & Contexts]]
- [[_COMMUNITY_Project Dependencies & Scripts|Project Dependencies & Scripts]]
- [[_COMMUNITY_TypeScript Configuration|TypeScript Configuration]]
- [[_COMMUNITY_Shopping Cart & Menu Flow|Shopping Cart & Menu Flow]]
- [[_COMMUNITY_Admin Header & Sidebar Layout|Admin Header & Sidebar Layout]]
- [[_COMMUNITY_Root Layout & App Fonts|Root Layout & App Fonts]]
- [[_COMMUNITY_ESLint Configuration|ESLint Configuration]]
- [[_COMMUNITY_Style System Config|Style System Config]]
- [[_COMMUNITY_Next.js App Config|Next.js App Config]]

## God Nodes (most connected - your core abstractions)
1. `compilerOptions` - 16 edges
2. `useSiteConfig()` - 15 edges
3. `useMenu()` - 9 edges
4. `useCart()` - 7 edges
5. `useGallery()` - 7 edges
6. `scripts` - 5 edges
7. `Home()` - 3 edges
8. `AdminDashboard()` - 3 edges
9. `CheckoutPage()` - 3 edges
10. `Menu()` - 3 edges

## Surprising Connections (you probably didn't know these)
- `Home()` --calls--> `useMenu()`  [EXTRACTED]
  src/app/page.tsx → src/context/MenuContext.tsx
- `GalleryManager()` --calls--> `useGallery()`  [EXTRACTED]
  src/app/admin/gallery/page.tsx → src/context/GalleryContext.tsx
- `HeroEditor()` --calls--> `useSiteConfig()`  [EXTRACTED]
  src/app/admin/hero/page.tsx → src/context/SiteConfigContext.tsx
- `InfoHoursEditor()` --calls--> `useSiteConfig()`  [EXTRACTED]
  src/app/admin/info/page.tsx → src/context/SiteConfigContext.tsx
- `MenuManager()` --calls--> `useMenu()`  [EXTRACTED]
  src/app/admin/menu/page.tsx → src/context/MenuContext.tsx

## Communities (14 total, 4 thin omitted)

### Community 0 - "Page Setup & Site Config"
Cohesion: 0.14
Nodes (15): Home(), CheckoutPage(), Footer(), Contact(), HeroConfig, InfoConfig, INITIAL_HERO, INITIAL_INFO (+7 more)

### Community 1 - "Admin Dashboard & Contexts"
Cohesion: 0.15
Nodes (16): MenuItemModal(), MenuItemModalProps, GalleryContext, GalleryContextType, GalleryImage, GalleryProvider(), useGallery(), INITIAL_MENU (+8 more)

### Community 2 - "Project Dependencies & Scripts"
Cohesion: 0.09
Nodes (21): dependencies, next, react, react-dom, devDependencies, eslint, eslint-config-next, tailwindcss (+13 more)

### Community 3 - "TypeScript Configuration"
Cohesion: 0.1
Nodes (19): compilerOptions, allowJs, esModuleInterop, incremental, isolatedModules, jsx, lib, module (+11 more)

### Community 4 - "Shopping Cart & Menu Flow"
Cohesion: 0.24
Nodes (9): CartDrawer(), CartDrawerProps, CartContext, CartContextType, CartItem, CartProvider(), useCart(), CATEGORIES (+1 more)

### Community 6 - "Root Layout & App Fonts"
Cohesion: 0.29
Nodes (5): cormorantGaramond, dmSans, ebGaramond, metadata, SiteConfigProvider()

## Knowledge Gaps
- **62 isolated node(s):** `eslintConfig`, `nextConfig`, `name`, `version`, `private` (+57 more)
  These have ≤1 connection - possible missing edges or undocumented components.
- **4 thin communities (<3 nodes) omitted from report** — run `graphify query` to explore isolated nodes.

## Suggested Questions
_Questions this graph is uniquely positioned to answer:_

- **Why does `useMenu()` connect `Admin Dashboard & Contexts` to `Page Setup & Site Config`, `Shopping Cart & Menu Flow`?**
  _High betweenness centrality (0.024) - this node is a cross-community bridge._
- **What connects `eslintConfig`, `nextConfig`, `name` to the rest of the system?**
  _62 weakly-connected nodes found - possible documentation gaps or missing edges._
- **Should `Page Setup & Site Config` be split into smaller, more focused modules?**
  _Cohesion score 0.14 - nodes in this community are weakly interconnected._
- **Should `Project Dependencies & Scripts` be split into smaller, more focused modules?**
  _Cohesion score 0.09 - nodes in this community are weakly interconnected._
- **Should `TypeScript Configuration` be split into smaller, more focused modules?**
  _Cohesion score 0.1 - nodes in this community are weakly interconnected._
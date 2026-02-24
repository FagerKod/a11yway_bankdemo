# Changelog

## 2026-02-24 — V3 Tillgänglighetsaudit & Fixar

Genomförde en fullständig tillgänglighetsaudit av V3 mot WCAG 2.2 AA. Alla identifierade problem har åtgärdats.

### P0 — Blockerare

- **Fokusindikatorer i forced-colors mode** (`globals.css`)
  Bytte `.focus-ring` och `.input-focus` från `box-shadow`/`ring` till `outline` som syns i Windows High Contrast Mode.

### P1 — Kritiska

- **Dubbla `<main>`-element** (contact, terms, accessibility, help)
  Ersatte `<main id="main-content">` med `<div>` — layouten ansvarar redan för `<main>`.

- **Nästlade interaktiva element** (`account/page.tsx`)
  Separerade `<button>` från `<a>` i Dokument-fliken till syskon-element.

- **`alert()` ersatt med tillgängliga mönster** (`loan/page.tsx`)
  Tooltip: disclosure-mönster med `aria-expanded`. Submit: bekräftelse via `aria-live` + visuell status.

- **Fieldset saknade felassociation** (`loan/page.tsx`)
  Lade till `aria-describedby` och `aria-invalid` på `<fieldset>` för anställningsform.

- **Saknade `required`-attribut** (`login/page.tsx`, `loan/page.tsx`)
  Lade till `required` och `aria-required="true"` på alla obligatoriska fält.

### P2 — Allvarliga

- **Fokushantering vid valideringsfel** (`login/page.tsx`, `loan/page.tsx`)
  Fokus flyttas till första felfältet vid misslyckad validering.

- **Progressbar ARIA inuti `role="img"`** (`account/page.tsx`)
  Tog bort `role="progressbar"` från bars — barn inuti `role="img"` är presentationella.

- **ESC i timeout-dialog** (`login/page.tsx`)
  Tog bort `useEscapeKey` — ESC i `alertdialog` orsakade oavsiktlig utloggning.

- **Bakgrundsscrollning i modaler** (`login/page.tsx`)
  Lade till `overflow: hidden` på body medan BankID-modal och timeout-dialog är öppna.

### P3 — Mindre

- **Låneformulär i `<form>`-element** (`loan/page.tsx`)
  Wrappade varje steg i `<form>` med `onSubmit` för native Enter-beteende.

- **Sidfotslänkars kontrast** (`layout.tsx`)
  Ändrade `text-gray-500` till `text-gray-600` för bättre kontrast.

### Filer ändrade

| Fil | Ändringar |
|-----|-----------|
| `src/app/globals.css` | P0: outline istället för ring |
| `src/app/v3/contact/page.tsx` | P1: `<main>` → `<div>` |
| `src/app/v3/terms/page.tsx` | P1: `<main>` → `<div>` |
| `src/app/v3/accessibility/page.tsx` | P1: `<main>` → `<div>` |
| `src/app/v3/help/page.tsx` | P1: `<main>` → `<div>` |
| `src/app/v3/account/page.tsx` | P1: separerade interaktiva, P2: tog bort progressbar |
| `src/app/v3/loan/page.tsx` | P1: disclosure, fieldset, required. P2: fokus. P3: form |
| `src/app/v3/login/page.tsx` | P1: required. P2: fokus, ESC, scroll-lock |
| `src/app/v3/layout.tsx` | P3: footer-kontrast |

### Dokumentation uppdaterad

- `docs/ERRORS.md` — Nya felkategorier och uppdaterade V3-lösningar
- `docs/pages/LOGIN.md` — Timeout-dialog, scroll-lock, required, fokushantering
- `docs/pages/LOAN.md` — Disclosure, fieldset, required, form, fokushantering
- `docs/pages/ACCOUNT.md` — Dokument-flik, diagram-bars
- `docs/WCAG-REFERENCE.md` — Korrigerad tooltip/modal-info
- `docs/TESTING.md` — Utökade testchecklistor
- `docs/INSTRUCTOR-GUIDE.md` — Ny demo för timeout-dialog

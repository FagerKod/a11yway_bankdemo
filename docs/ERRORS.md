# Felkatalog - Tillgänglighetsproblem

Detta dokument listar alla avsiktliga tillgänglighetsproblem i V1 och V2, samt hur de är lösta i V3.

## Innehåll

1. [Inloggningssidan](#inloggningssidan)
2. [Kontoöversikt](#kontoöversikt)
3. [Låneansökan](#låneansökan)
4. [Inställningar](#inställningar)
5. [Globala komponenter](#globala-komponenter)

---

## Inloggningssidan

### 🔴 V1-problem

#### 1. Formulärfält utan etiketter
**Problem:** Fält använder endast `placeholder` istället för `<label>`.

```html
<!-- V1 - FEL -->
<input placeholder="Personnummer (ÅÅÅÅMMDD-XXXX)" />
```

**WCAG:** 1.3.1 Info och relationer, 3.3.2 Etiketter eller instruktioner

**Påverkan:** Skärmläsare kan inte identifiera fältets syfte. Placeholder försvinner när användaren börjar skriva.

**V3-lösning:**
```html
<!-- V3 - RÄTT -->
<label for="personnummer">Personnummer</label>
<input id="personnummer" placeholder="ÅÅÅÅMMDD-XXXX" />
```

---

#### 2. Knapp som är en `<div>`
**Problem:** "Logga in"-knappen är en `<div>` med `onClick`.

```html
<!-- V1 - FEL -->
<div class="btn-primary" onclick="login()">Logga in med BankID</div>
```

**WCAG:** 4.1.2 Namn, roll, värde

**Påverkan:**
- Inte fokuserbar med Tab
- Skärmläsare identifierar inte elementet som en knapp
- Enter/Space aktiverar inte elementet

**V3-lösning:**
```html
<!-- V3 - RÄTT -->
<button type="submit" class="btn-primary">Logga in med BankID</button>
```

---

#### 3. Modal utan fokushantering
**Problem:** BankID-modalen fångar inte fokus.

**WCAG:** 2.4.3 Fokusordning

**Påverkan:**
- Användaren kan tabba till element bakom modalen
- Fokus återgår inte till utlösande element vid stängning
- Escape-tangent stänger inte modalen

**V3-lösning:**
```jsx
// Focus trap hook
const focusTrapRef = useFocusTrap(isOpen);

<div
  role="dialog"
  aria-modal="true"
  aria-labelledby="modal-title"
  ref={focusTrapRef}
>
```

---

#### 4. Modal utan ARIA-attribut
**Problem:** Modalen har ingen `role="dialog"` eller `aria-modal`.

```html
<!-- V1 - FEL -->
<div class="modal">
  <div class="modal-content">...</div>
</div>
```

**WCAG:** 4.1.2 Namn, roll, värde

**Påverkan:** Skärmläsare förstår inte att det är en dialog som kräver uppmärksamhet.

**V3-lösning:**
```html
<!-- V3 - RÄTT -->
<div
  role="dialog"
  aria-modal="true"
  aria-labelledby="bankid-title"
  aria-describedby="bankid-desc"
>
  <h2 id="bankid-title">Logga in med BankID</h2>
  <p id="bankid-desc">Starta BankID-appen...</p>
</div>
```

---

#### 5. Timeout utan varning
**Problem:** Sessionen går ut utan förvarning eller möjlighet att förlänga.

**WCAG:** 2.2.1 Justerbar tidsgräns

**Påverkan:** Användare med funktionsnedsättningar kan behöva mer tid och förlorar sitt arbete.

**V3-lösning:**
```jsx
<div role="alertdialog" aria-live="assertive">
  <p>Tid kvar: {timeRemaining} sekunder</p>
  <button onClick={extendSession}>Förläng session</button>
</div>
```

---

#### 6. Fejkad checkbox
**Problem:** "Kom ihåg mig" är en `<div>` som ser ut som en checkbox.

```html
<!-- V1 - FEL -->
<div class="fake-checkbox" onclick="toggle()">
  <div class="checkmark">✓</div>
</div>
```

**WCAG:** 4.1.2 Namn, roll, värde

**V3-lösning:**
```html
<!-- V3 - RÄTT -->
<input type="checkbox" id="remember" />
<label for="remember">Kom ihåg mig på denna enhet</label>
```

---

#### 7. Felmeddelanden inte kopplade till fält
**Problem:** Felmeddelanden visas visuellt men är inte programmatiskt kopplade.

```html
<!-- V1 - FEL -->
<input />
<div class="error">Ogiltigt format</div>
```

**WCAG:** 3.3.1 Felidentifiering, 3.3.3 Felförslag

**V3-lösning:**
```html
<!-- V3 - RÄTT -->
<input
  aria-describedby="error-msg"
  aria-invalid="true"
/>
<p id="error-msg" role="alert">
  Ange personnummer med 12 siffror (ÅÅÅÅMMDD-XXXX)
</p>
```

---

#### 8. Inloggningsheader med div-element
**Problem:** Headern på inloggningssidan använder `<div>` istället för semantiska element.

```html
<!-- V1 - FEL -->
<div class="header">
  <div onclick="goToLogin()">Logo</div>
</div>
```

**WCAG:** 1.3.1 Info och relationer, 4.1.2 Namn, roll, värde

**Påverkan:**
- Skärmläsare identifierar inte header-strukturen
- Logo är inte fokuserbar med tangentbord
- Inga landmärken för navigering

**V3-lösning:**
```html
<!-- V3 - RÄTT -->
<header>
  <a href="/v3/login" aria-label="Demobanken">Logo</a>
</header>
```

---

#### 9. Omdirigering utan annonsering
**Problem:** Efter lyckad BankID-inloggning omdirigeras användaren utan förvarning.

**WCAG:** 3.2.2 Vid inmatning (relaterat)

**Påverkan:** Skärmläsaranvändare förstår inte vad som händer när de plötsligt befinner sig på en ny sida.

**V3-lösning:**
```jsx
// Annonsera före omdirigering
<div aria-live="assertive" className="sr-only">
  Inloggning lyckades. Du omdirigeras till kontoöversikten.
</div>
```

---

#### 8. Ingen skip-länk
**Problem:** Det finns ingen möjlighet att hoppa förbi navigeringen.

**WCAG:** 2.4.1 Hoppa över block

**V3-lösning:**
```html
<a href="#main-content" class="sr-only focus:not-sr-only">
  Hoppa till huvudinnehåll
</a>
```

---

#### 9. Fokusindikator borttagen
**Problem:** `outline: none` har tagits bort globalt.

```css
/* V1 - FEL */
* { outline: none; }
```

**WCAG:** 2.4.7 Synligt fokus

**V3-lösning:**
```css
/* V3 - RÄTT */
:focus-visible {
  outline: 2px solid #0066CC;
  outline-offset: 2px;
}
```

---

### 🟡 V2-kvarvarande problem

| Problem | Beskrivning |
|---------|-------------|
| Modal saknar fokus-trap | Fokus kan fortfarande fly modalen |
| Fel inte i `aria-live` | Felmeddelanden annonseras inte |
| Generiska felmeddelanden | "Obligatoriskt fält" istället för specifik instruktion |

---

## Kontoöversikt

### 🔴 V1-problem

#### 1. Tabell som är `<div>`-rutnät
**Problem:** Transaktionstabellen är byggd med `<div>` istället för `<table>`.

```html
<!-- V1 - FEL -->
<div class="transaction-grid">
  <div class="header-row">
    <div>Datum</div>
    <div>Beskrivning</div>
    <div>Belopp</div>
  </div>
  <div class="row">
    <div>2024-01-15</div>
    <div>ICA Maxi</div>
    <div>-892,00 kr</div>
  </div>
</div>
```

**WCAG:** 1.3.1 Info och relationer

**Påverkan:**
- Skärmläsare kan inte navigera som tabell
- Cellrelationer förloras
- Användare hör inte kolumnrubriker

**V3-lösning:**
```html
<!-- V3 - RÄTT -->
<table>
  <caption class="sr-only">Senaste transaktioner</caption>
  <thead>
    <tr>
      <th scope="col">Datum</th>
      <th scope="col">Beskrivning</th>
      <th scope="col">Belopp</th>
    </tr>
  </thead>
  <tbody>
    <tr>
      <td>2024-01-15</td>
      <td>ICA Maxi</td>
      <td>-892,00 kr</td>
    </tr>
  </tbody>
</table>
```

---

#### 2. Färg som enda indikator
**Problem:** Inkomst (grön) och utgift (röd) skiljs endast med färg.

```html
<!-- V1 - FEL -->
<span class="text-green-600">+32 500,00 kr</span>
<span class="text-red-600">-892,00 kr</span>
```

**WCAG:** 1.4.1 Användning av färg

**Påverkan:** Färgblinda användare kan inte skilja på inkomst och utgift.

**V3-lösning:**
```html
<!-- V3 - RÄTT -->
<span class="sr-only">Inkomst:</span>
<svg aria-hidden="true"><!-- Uppåtpil --></svg>
<span class="text-green-600">+32 500,00 kr</span>

<span class="sr-only">Utgift:</span>
<svg aria-hidden="true"><!-- Nedåtpil --></svg>
<span class="text-red-600">-892,00 kr</span>
```

---

#### 3. Flikar utan ARIA
**Problem:** Flikarna är `<div>`-element utan roller.

```html
<!-- V1 - FEL -->
<div class="tabs">
  <div class="tab active" onclick="showTab(0)">Översikt</div>
  <div class="tab" onclick="showTab(1)">Transaktioner</div>
</div>
```

**WCAG:** 4.1.2 Namn, roll, värde

**Påverkan:**
- Skärmläsare identifierar inte flikarna
- Piltangentnavigering fungerar inte
- Aktiv flik annonseras inte

**V3-lösning:**
```html
<!-- V3 - RÄTT -->
<div role="tablist" aria-label="Kontoinformation">
  <button
    role="tab"
    aria-selected="true"
    aria-controls="panel-overview"
    id="tab-overview"
  >
    Översikt
  </button>
  <button
    role="tab"
    aria-selected="false"
    aria-controls="panel-transactions"
    id="tab-transactions"
    tabindex="-1"
  >
    Transaktioner
  </button>
</div>
<div
  role="tabpanel"
  id="panel-overview"
  aria-labelledby="tab-overview"
>
  ...
</div>
```

---

#### 4. Ikonknappar utan namn
**Problem:** Knappar med endast ikoner har inget tillgängligt namn.

```html
<!-- V1 - FEL -->
<div class="icon-button" onclick="filter()">
  <svg><!-- Filter-ikon --></svg>
</div>
```

**WCAG:** 4.1.2 Namn, roll, värde

**Påverkan:** Skärmläsare säger "knapp" utan att förklara vad knappen gör.

**V3-lösning:**
```html
<!-- V3 - RÄTT -->
<button aria-label="Filtrera transaktioner">
  <svg aria-hidden="true"><!-- Filter-ikon --></svg>
</button>
```

---

#### 5. Diagram utan textalternativ
**Problem:** Utgiftsdiagrammet är endast visuellt.

**WCAG:** 1.1.1 Icke-textuellt innehåll

**V3-lösning:**
```html
<div
  role="img"
  aria-label="Utgifter: Matvaror 4500 kr (35%), Transport 2100 kr (16%)..."
>
  <!-- Visuellt diagram -->
</div>

<details>
  <summary>Visa data som tabell</summary>
  <table>
    <caption>Utgifter per kategori</caption>
    ...
  </table>
</details>
```

---

### 🟡 V2-kvarvarande problem

| Problem | Beskrivning |
|---------|-------------|
| Tabellrubriker saknar `scope` | `<th>` utan `scope="col"` |
| Flikar utan ARIA | Knappar men inte `role="tablist"` |
| Diagram utan alternativ | Ingen textuell representation |

---

## Låneansökan

### 🔴 V1-problem

#### 1. Stegindikator endast visuell
**Problem:** Stegindikatorn förmedlar inte information till skärmläsare.

**WCAG:** 1.3.1 Info och relationer

**V3-lösning:**
```html
<nav aria-label="Steg i låneansökan">
  <ol>
    <li aria-current="step">
      <span class="sr-only">Steg 1 av 3 (nuvarande):</span>
      Lånebelopp
    </li>
    <li>
      <span class="sr-only">Steg 2 av 3:</span>
      Personuppgifter
    </li>
  </ol>
</nav>
```

---

#### 2. Otillgänglig slider
**Problem:** Slidern är en `<div>` som endast fungerar med mus.

```html
<!-- V1 - FEL -->
<div class="slider" onclick="handleClick(e)">
  <div class="track"></div>
  <div class="thumb"></div>
</div>
```

**WCAG:** 2.1.1 Tangentbord

**V3-lösning:**
```html
<!-- V3 - RÄTT -->
<label for="amount">Belopp</label>
<input
  type="range"
  id="amount"
  min="50000"
  max="500000"
  step="10000"
  aria-valuetext="150 000 kronor"
/>
<output for="amount">150 000 kr</output>
```

---

#### 3. Fokus försvinner mellan steg
**Problem:** När användaren går till nästa steg hamnar fokus överst på sidan.

**WCAG:** 2.4.3 Fokusordning

**V3-lösning:**
```jsx
const handleNext = () => {
  setCurrentStep(next);
  // Flytta fokus till nästa steg
  stepRefs[next].current?.focus();
  // Annonsera steget
  setAnnouncement(`Steg ${next + 1}: ${steps[next]}`);
};
```

---

#### 4. Generiska felmeddelanden
**Problem:** "Obligatoriskt fält" säger inte vad som förväntas.

**WCAG:** 3.3.1 Felidentifiering, 3.3.3 Felförslag

**V1:** "Ogiltigt format"
**V3:** "Ange personnummer med 12 siffror (ÅÅÅÅMMDD-XXXX)"

---

#### 5. Fejkade radioknappar
**Problem:** Anställningsformsalternativ är `<div>`-element.

**WCAG:** 4.1.2 Namn, roll, värde

**V3-lösning:**
```html
<fieldset>
  <legend>Anställningsform</legend>
  <label>
    <input type="radio" name="employment" value="permanent" />
    Tillsvidareanställning
  </label>
</fieldset>
```

---

### 🟡 V2-kvarvarande problem

| Problem | Beskrivning |
|---------|-------------|
| Stegindikator saknar `aria-current` | Visar inte vilket steg som är aktivt |
| Slider saknar `aria-valuetext` | Värdet annonseras som siffra, inte formaterat |
| Fokus hanteras inte | Fokus flyttas inte vid stegbyte |
| Fel annonseras inte | `aria-live` saknas på felmeddelanden |

---

## Inställningar

### 🔴 V1-problem

#### 1. Accordion utan ARIA
**Problem:** Accordion-rubriker är `<div>` utan aria-expanded.

```html
<!-- V1 - FEL -->
<div class="accordion-header" onclick="toggle()">
  Notifieringar
  <span class="chevron">▼</span>
</div>
<div class="accordion-content">...</div>
```

**WCAG:** 4.1.2 Namn, roll, värde

**V3-lösning:**
```html
<!-- V3 - RÄTT -->
<h2>
  <button
    aria-expanded="true"
    aria-controls="panel-notifications"
  >
    Notifieringar
  </button>
</h2>
<div
  id="panel-notifications"
  role="region"
  aria-labelledby="heading-notifications"
>
  ...
</div>
```

---

#### 2. Fejkade växlar (toggles)
**Problem:** Växlarna är `<div>`-element som ser ut som toggle switches.

**WCAG:** 4.1.2 Namn, roll, värde

**V3-lösning:**
```html
<button
  role="switch"
  aria-checked="true"
  aria-labelledby="email-label"
>
  <span class="sr-only">På</span>
</button>
```

---

#### 3. "Sparat" annonseras inte
**Problem:** Bekräftelsemeddelandet visas visuellt men annonseras inte.

**WCAG:** 4.1.3 Statusmeddelanden

**V3-lösning:**
```html
<div aria-live="polite" aria-atomic="true">
  <span role="status">✓ Inställningarna har sparats</span>
</div>
```

---

### 🟡 V2-kvarvarande problem

| Problem | Beskrivning |
|---------|-------------|
| Accordion saknar ARIA | Knappar men inga `aria-expanded` |
| Växlar är checkboxar | Fungerar men inte `role="switch"` |
| Bekräftelse inte i live region | Visas men annonseras inte |

---

## Globala komponenter

### Navigation (alla sidor)

#### 🔴 V1-problem

| Problem | WCAG | Lösning i V3 |
|---------|------|--------------|
| Navigering är `<div>` | 1.3.1 | `<nav aria-label="Huvudnavigation">` |
| Länkar är `<div onclick>` | 4.1.2 | `<a href="...">` |
| Ingen aktiv sidmarkering | 2.4.8 | `aria-current="page"` |
| Logo inte en länk | 2.4.4 | `<a href="/" aria-label="Till startsidan">` |

### Footer (alla sidor)

#### 🔴 V1-problem

| Problem | WCAG | Lösning i V3 |
|---------|------|--------------|
| Footer är `<div>` | 1.3.1 | `<footer>` |
| Länkar är `<div onclick>` | 4.1.2 | `<a href="...">` |

---

## Sammanfattning per WCAG-kriterium

| WCAG | Problem i V1 | Antal förekomster |
|------|--------------|-------------------|
| 1.1.1 Icke-textuellt innehåll | Diagram utan alt | 1 |
| 1.3.1 Info och relationer | Div-tabeller, saknade landmärken | 8 |
| 1.4.1 Användning av färg | Färg som enda indikator | 1 |
| 2.1.1 Tangentbord | Otillgängliga sliders, div-knappar | 10 |
| 2.2.1 Justerbar tidsgräns | Timeout utan förlängning | 1 |
| 2.4.1 Hoppa över block | Ingen skip-länk | 1 |
| 2.4.3 Fokusordning | Modal utan fokus-trap | 2 |
| 2.4.7 Synligt fokus | Fokus borttagen | Globalt |
| 3.3.1 Felidentifiering | Fel inte kopplade | 6 |
| 3.3.2 Etiketter | Placeholder-only | 4 |
| 4.1.2 Namn, roll, värde | Div som knapp, fejkade kontroller | 15+ |
| 4.1.3 Statusmeddelanden | Meddelanden inte annonserade | 3 |

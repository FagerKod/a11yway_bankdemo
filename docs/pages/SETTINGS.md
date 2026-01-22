# Inställningar

## Översikt

Inställningssidan demonstrerar tillgänglighetsproblem relaterade till:
- Accordion (expanderbara sektioner)
- Toggle switches
- Statusmeddelanden

## URL:er

| Version | URL |
|---------|-----|
| V1 (Otillgänglig) | `/v1/settings` |
| V2 (Semantisk) | `/v2/settings` |
| V3 (Tillgänglig) | `/v3/settings` |

## Sektioner

| Sektion | Innehåll |
|---------|----------|
| Notifieringar | E-post, SMS, push-notifieringar |
| Säkerhet | Tvåfaktorsautentisering, inloggningsvarningar |
| Utseende | Mörkt läge, språkval |

## Komponenter

### 1. Accordion

#### V1-problem
- Rubriker är `<div onclick>`
- Ingen `aria-expanded`
- Ingen koppling mellan rubrik och panel
- Inte tangentbordsanvändbar

#### V3-lösning
```html
<div class="accordion-section">
  <h2>
    <button
      id="header-notifications"
      aria-expanded="true"
      aria-controls="panel-notifications"
    >
      Notifieringar
      <svg aria-hidden="true">▼</svg>
    </button>
  </h2>
  <div
    id="panel-notifications"
    role="region"
    aria-labelledby="header-notifications"
  >
    <!-- Innehåll -->
  </div>
</div>
```

#### ARIA-attribut förklarade

| Attribut | Syfte |
|----------|-------|
| `aria-expanded` | Talar om ifall sektionen är öppen eller stängd |
| `aria-controls` | Pekar på panelen som kontrolleras |
| `role="region"` | Markerar panelen som en landmark |
| `aria-labelledby` | Kopplar panelen till rubriken |

#### Tester
1. **Tangentbord (V1):** Kan du öppna/stänga accordion med tangentbord?
2. **Skärmläsare (V1):** Annonseras att sektionen är expanderad/kollapsad?
3. **Skärmläsare (V3):** Annonseras "Notifieringar, expanderad, knapp"?
4. **Tangentbord (V3):** Aktivera knappen med Enter/Space

---

### 2. Toggle Switches

#### V1-problem
- `<div onclick>` som ser ut som en switch
- Inte fokuserbar
- Inget tillgängligt namn eller tillstånd

#### V3-lösning
```html
<div class="setting-row">
  <div>
    <span id="email-label">E-postnotifieringar</span>
    <span id="email-desc">Få uppdateringar via e-post</span>
  </div>
  <button
    type="button"
    role="switch"
    aria-checked="true"
    aria-labelledby="email-label"
    aria-describedby="email-desc"
  >
    <span class="sr-only">På</span>
    <span class="toggle-track">
      <span class="toggle-thumb" aria-hidden="true"></span>
    </span>
  </button>
</div>
```

#### Skillnad mellan checkbox och switch

| Aspekt | Checkbox | Switch |
|--------|----------|--------|
| ARIA-roll | Implicit från `<input>` | `role="switch"` |
| Tillstånd | `checked` | `aria-checked` |
| Användning | Val som kräver "Spara" | Omedelbar effekt |
| Visuell metafor | Kryssruta | Av/På-reglage |

#### Tangentbordsinteraktion
| Tangent | Funktion |
|---------|----------|
| Tab | Flytta till/från switchen |
| Space | Växla på/av |
| Enter | Växla på/av (V3) |

#### Tester
1. **Tangentbord (V1):** Kan du växla switchen utan mus?
2. **Skärmläsare (V1):** Vad annonseras när du fokuserar switchen?
3. **Skärmläsare (V3):** Annonseras "E-postnotifieringar, switch, på"?
4. **Tillståndsbyte (V3):** Annonseras det nya tillståndet ("av" eller "på")?

---

### 3. Språkval (Select)

#### V1-problem
- `<select>` utan associerad `<label>`

#### V3-lösning
```html
<label for="language-select">Språk</label>
<select id="language-select">
  <option value="sv">Svenska</option>
  <option value="en">English</option>
  <option value="fi">Suomi</option>
</select>
```

#### Tester
1. **Skärmläsare:** Annonseras "Språk" när du fokuserar dropdown?

---

### 4. Spara-knapp och statusmeddelande

#### V1-problem
- Knappen är en `<div>`
- "Sparat!"-meddelandet visas visuellt men annonseras inte

#### V3-lösning
```html
<button onclick="save()">Spara ändringar</button>

<div aria-live="polite" aria-atomic="true">
  <!-- Tomt tills meddelandet visas -->
  <span role="status">✓ Inställningarna har sparats</span>
</div>
```

#### Hur aria-live fungerar

| Värde | Beteende |
|-------|----------|
| `polite` | Väntar tills skärmläsaren är klar |
| `assertive` | Avbryter omedelbart |
| `off` | Annonserar inte |

#### Tester
1. **Klicka Spara (V1):** Får skärmläsaranvändare veta att det sparades?
2. **Klicka Spara (V3):** Annonseras "Inställningarna har sparats"?
3. **Timing:** Hur snabbt efter klick annonseras meddelandet?

---

## Testscenario: Komplett inställningsändring

### Scenario A: Ändra e-postnotifieringar
1. Navigera till Notifieringar-sektionen
2. Hitta "E-postnotifieringar"-switchen
3. Växla den av
4. Spara ändringarna
5. Kontrollera att bekräftelsen annonseras

### Scenario B: Byt språk
1. Expandera "Utseende"-sektionen
2. Hitta språkvalet
3. Ändra till "English"
4. Spara ändringarna

### Jämförelsetabell

| Steg | V1-problem | V3-lösning |
|------|------------|------------|
| Öppna sektion | Kan ej med tangentbord | Enter/Space |
| Hitta switch | Ej fokuserbar | Tab navigerar dit |
| Ändra switch | Måste använda mus | Space växlar |
| Spara | Div, ej fokuserbar | Button, Enter aktiverar |
| Bekräftelse | Syns men hörs ej | Annonseras via aria-live |

---

## Kodinspektion

### Uppmaning för kursdeltagare

1. Öppna utvecklarverktyg (F12)
2. Inspektera en accordion-rubrik på V1 vs V3
3. Notera skillnaderna:

**V1:**
```html
<div class="accordion-header" onclick="toggle()">
  Notifieringar
  <span class="chevron">▼</span>
</div>
```

**V3:**
```html
<h2>
  <button
    aria-expanded="true"
    aria-controls="panel-notifications"
  >
    Notifieringar
    <svg aria-hidden="true">▼</svg>
  </button>
</h2>
```

### Frågor att diskutera
1. Varför är det viktigt att använda `<button>` istället för `<div>`?
2. Vad händer om vi glömmer `aria-expanded`?
3. Varför har vi `aria-hidden="true"` på pil-ikonen?

---

## WCAG-kriterier demonstrerade

| Kriterium | Nivå | Demonstreras |
|-----------|------|--------------|
| 1.3.1 Info och relationer | A | Accordion-struktur |
| 2.1.1 Tangentbord | A | Alla kontroller |
| 3.3.2 Etiketter | A | Språkval |
| 4.1.2 Namn, roll, värde | A | Accordion, switches |
| 4.1.3 Statusmeddelanden | AA | Spara-bekräftelse |

---

## Relaterade mönster

### WAI-ARIA Authoring Practices

- [Accordion Pattern](https://www.w3.org/WAI/ARIA/apg/patterns/accordion/)
- [Switch Pattern](https://www.w3.org/WAI/ARIA/apg/patterns/switch/)

### Alternativa implementationer

1. **Accordion med `<details>/<summary>`:**
   ```html
   <details>
     <summary>Notifieringar</summary>
     <div>Innehåll...</div>
   </details>
   ```
   Enklare men mindre kontroll över styling.

2. **Switch som checkbox:**
   ```html
   <input type="checkbox" role="switch" />
   ```
   Fungerar men `role="switch"` är mer semantiskt korrekt för omedelbar effekt.

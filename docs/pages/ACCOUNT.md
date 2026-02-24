# Kontoöversikt

## Översikt

Kontoöversikten demonstrerar tillgänglighetsproblem relaterade till:
- Datatabeller
- Flikar (tabs)
- Diagram och visualiseringar
- Ikonknappar

## URL:er

| Version | URL |
|---------|-----|
| V1 (Otillgänglig) | `/v1/account` |
| V2 (Semantisk) | `/v2/account` |
| V3 (Tillgänglig) | `/v3/account` |

## Komponenter

### 1. Saldokort

#### V1-problem
- Strukturlösa `<div>`-element
- Menyknapp (tre punkter) saknar namn

#### V3-lösning
```html
<article aria-label="Lönekonto: 45 231,50 kr">
  <h3>Lönekonto</h3>
  <p>45 231,50 kr</p>
  <button aria-label="Fler alternativ för Lönekonto">
    <svg aria-hidden="true">⋮</svg>
  </button>
</article>
```

#### Tester
1. **Skärmläsare:** Navigera till kortet - får du all information?
2. **Ikonknapp:** Annonseras "Fler alternativ för Lönekonto"?

---

### 2. Flikar (Tabs)

#### V1-problem
- `<div onclick>` istället för knappar
- Ingen `role="tablist"`
- Piltangenter fungerar inte
- Aktiv flik inte markerad med ARIA

#### V3-lösning
```html
<div role="tablist" aria-label="Kontoinformation">
  <button
    role="tab"
    id="tab-overview"
    aria-selected="true"
    aria-controls="panel-overview"
  >
    Översikt
  </button>
  <button
    role="tab"
    id="tab-transactions"
    aria-selected="false"
    aria-controls="panel-transactions"
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

#### Tangentbordsnavigering (V3)
| Tangent | Funktion |
|---------|----------|
| Tab | Flytta till/från flikarna |
| Vänsterpil | Föregående flik |
| Högerpil | Nästa flik |
| Home | Första fliken |
| End | Sista fliken |

#### Tester
1. **Tangentbord (V1):** Kan du alls navigera till flikarna med Tab?
2. **Tangentbord (V3):** Kan du byta flik med piltangenter?
3. **Skärmläsare:** Annonseras "flik 1 av 3, vald"?

---

### 3. Transaktionstabell

#### V1-problem
- `<div>`-rutnät istället för `<table>`
- Inga rubriker (`<th>`)
- Färg är enda indikator för inkomst/utgift

#### V3-lösning
```html
<table>
  <caption class="sr-only">
    Transaktioner för ditt lönekonto
  </caption>
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
      <td>
        <span class="sr-only">Utgift:</span>
        <svg aria-hidden="true">↓</svg>
        <span class="text-red-600">-892,00 kr</span>
      </td>
    </tr>
  </tbody>
</table>
```

#### Tester
1. **Skärmläsare (V1):** Navigera genom "tabellen" - får du rubrikerna?
2. **Skärmläsare (V3):** Använd tabellnavigering (Ctrl+Alt+piltangenter i VoiceOver)
3. **Färgblindhet:** Kan du skilja inkomst från utgift utan färg i V1 vs V3?

---

### 4. Ikonknappar (Filter, Ladda ner, Skriv ut)

#### V1-problem
- Knappar är `<div>`-element
- Ingen tillgänglig etikett
- Skärmläsare säger bara "knapp"

#### V3-lösning
```html
<button aria-label="Filtrera transaktioner">
  <svg aria-hidden="true"><!-- Filter-ikon --></svg>
</button>
<button aria-label="Ladda ner transaktioner">
  <svg aria-hidden="true"><!-- Nedladdnings-ikon --></svg>
</button>
<button aria-label="Skriv ut transaktioner">
  <svg aria-hidden="true"><!-- Skrivar-ikon --></svg>
</button>
```

#### Tester
1. **Tangentbord (V1):** Kan du tabba till ikonknapparna?
2. **Skärmläsare (V1):** Vad säger skärmläsaren för varje knapp?
3. **Skärmläsare (V3):** Annonseras "Filtrera transaktioner, knapp"?

---

### 5. Utgiftsdiagram

#### V1-problem
- Rent visuellt diagram utan textalternativ
- Skärmläsare ignorerar diagrammet helt
- Kategorierna skiljs endast med färg

#### V3-lösning
```html
<!-- Diagram med aria-label. Bars inuti role="img" är presentationella
     (inga role="progressbar" — det ignoreras inuti role="img").
     Tillgänglighet ges via aria-label + expanderbar datatabell. -->
<div
  role="img"
  aria-label="Utgifter denna månad: Matvaror 4500 kr (35%), Transport 2100 kr (16%), Nöje 1800 kr (14%), Shopping 3200 kr (25%), Övrigt 1400 kr (11%). Totalt: 13000 kr"
>
  <!-- Visuella bars (presentationella) -->
</div>

<!-- Expanderbar datatabell -->
<details>
  <summary>Visa data som tabell</summary>
  <table>
    <caption class="sr-only">Utgifter per kategori</caption>
    <thead>
      <tr>
        <th scope="col">Kategori</th>
        <th scope="col">Belopp</th>
        <th scope="col">Andel</th>
      </tr>
    </thead>
    <tbody>
      <tr>
        <td>Matvaror</td>
        <td>4 500 kr</td>
        <td>35%</td>
      </tr>
      <!-- ... -->
    </tbody>
  </table>
</details>
```

#### Tester
1. **Skärmläsare (V1):** Navigera till diagrammet - får du någon information?
2. **Skärmläsare (V3):** Läses aria-label upp?
3. **Datatabell (V3):** Kan du expandera och navigera i datatabellen?

---

## Testscenario: Skärmläsarupplevelse

### V1-upplevelse
1. Starta VoiceOver/NVDA på `/v1/account`
2. Navigera med rubriker (H-tangent) - märker du flikarna?
3. Försök hitta transaktionstabellen
4. Navigera i "tabellen" - får du kolumnrubriker?
5. Försök förstå diagrammet

### V3-upplevelse
1. Starta på `/v3/account`
2. Navigera med landmärken (D-tangent för regioner)
3. Hitta flikarna - använd Tab och piltangenter
4. Navigera i tabellen med tabellnavigering
5. Hitta diagrammets textalternativ

---

### 6. Dokument-flik

#### V1-problem
- Dokumentlänkar är inte interaktiva element
- Nedladdningsknapp saknar tillgängligt namn

#### V3-lösning
```html
<!-- Länk och knapp är separata interaktiva element (aldrig nästlade) -->
<li class="flex items-center justify-between">
  <a href="/documents/1" class="flex items-center gap-3 flex-1">
    <svg aria-hidden="true"><!-- PDF-ikon --></svg>
    <span>Kontoutdrag januari 2024</span>
  </a>
  <button aria-label="Ladda ner Kontoutdrag januari 2024">
    <svg aria-hidden="true"><!-- Nedladdnings-ikon --></svg>
  </button>
</li>
```

**Viktigt:** Länk och knapp får aldrig nästlas inuti varandra — det ger ogiltig HTML och skärmläsare kan inte avgöra vilken kontroll som aktiveras.

#### Tester
1. **Tab:** Kan du tabba separat till dokumentlänk och nedladdningsknapp?
2. **Skärmläsare:** Annonseras länk och knapp som separata kontroller?

---

## WCAG-kriterier demonstrerade

| Kriterium | Nivå | Demonstreras |
|-----------|------|--------------|
| 1.1.1 Icke-textuellt innehåll | A | Diagram |
| 1.3.1 Info och relationer | A | Tabell, flikar |
| 1.4.1 Användning av färg | A | Inkomst/utgift |
| 2.1.1 Tangentbord | A | Flikar, knappar |
| 4.1.1 Parsning | A | Inga nästlade interaktiva element |
| 4.1.2 Namn, roll, värde | A | Flikar, ikonknappar |

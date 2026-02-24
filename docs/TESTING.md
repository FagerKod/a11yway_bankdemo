# Testguide för Tillgänglighet

Denna guide beskriver hur du testar tillgänglighet på BankDemo-webbplatsen.

## Innehåll

1. [Tangentbordsnavigering](#1-tangentbordsnavigering)
2. [Skärmläsartestning](#2-skärmläsartestning)
3. [Visuell granskning](#3-visuell-granskning)
4. [Automatiserade verktyg](#4-automatiserade-verktyg)
5. [Testchecklista per sida](#5-testchecklista-per-sida)

---

## 1. Tangentbordsnavigering

### Grundläggande tangenter

| Tangent | Funktion |
|---------|----------|
| `Tab` | Flytta fokus framåt |
| `Shift + Tab` | Flytta fokus bakåt |
| `Enter` | Aktivera länk/knapp |
| `Space` | Aktivera knapp, kryssa i checkbox |
| `Escape` | Stäng modal/dialog |
| `Piltangenter` | Navigera i flikar, menyer, sliders |

### Tester att utföra

#### Test 1: Kan du nå alla interaktiva element?
1. Börja högst upp på sidan
2. Tryck `Tab` upprepade gånger
3. Kontrollera att du kan nå:
   - Alla länkar
   - Alla knappar
   - Alla formulärfält
   - Alla flikar

**V1-problem:** Många element (knappar som är `<div>`) går inte att nå med Tab.

#### Test 2: Syns fokusmarkeringen?
1. Tabba genom sidan
2. Titta efter en synlig ram/markering runt det fokuserade elementet

**V1-problem:** Fokusmarkeringen är borttagen med `outline: none`.

#### Test 3: Är fokusordningen logisk?
1. Tabba genom sidan
2. Kontrollera att fokus rör sig i en logisk ordning (vänster till höger, uppifrån och ner)

#### Test 4: Fungerar modaler korrekt?
1. Öppna BankID-modalen på inloggningssidan
2. Försök tabba - fokus ska stanna inuti modalen
3. Tryck `Escape` - modalen ska stängas
4. Kontrollera att bakgrundsinnehåll inte kan scrollas

**Timeout-dialog (alertdialog):**
1. Trigga timeout-varningen via demo-knappen
2. Fokus ska stanna inuti dialogen
3. `Escape` ska **inte** stänga dialogen (förhindrar oavsiktlig utloggning)
4. Användaren måste välja "Logga ut" eller "Förläng session"

**V1-problem:** Fokus "flyr" modalen, Escape fungerar inte.

#### Test 5: Fungerar sliders med tangentbord?
1. Gå till Låneansökan
2. Försök ändra beloppsliderns värde med piltangenter

**V1-problem:** Slidern reagerar inte på tangentbord.

---

## 2. Skärmläsartestning

### Starta skärmläsare

**macOS (VoiceOver):**
- Tryck `Cmd + F5` för att starta/stoppa
- Använd `Ctrl + Option + piltangenter` för att navigera

**Windows (NVDA):**
- Ladda ner från nvaccess.org
- Tryck `Insert + Q` för att avsluta

**Windows (Narrator):**
- Tryck `Win + Ctrl + Enter` för att starta

### Tester att utföra

#### Test 1: Annonseras sidan korrekt?
1. Ladda sidan med skärmläsare aktiv
2. Lyssna efter:
   - Sidtitel
   - Huvudrubriker
   - Landmärken (navigation, main, footer)

**V1-problem:** Inga landmärken (`<nav>`, `<main>`) finns.

#### Test 2: Har formulärfält etiketter?
1. Navigera till ett formulärfält
2. Lyssna - skärmläsaren ska annonsera fältets syfte

**V1-problem:** Endast placeholder läses upp, inte etiketten.

#### Test 3: Annonseras felmeddelanden?
1. Försök skicka formulär utan att fylla i
2. Lyssna efter felmeddelandet

**V3-förväntning:** Felet annonseras automatiskt via `aria-live`.
**V1-problem:** Felet visas men annonseras inte.

#### Test 4: Fungerar tabeller?
1. Navigera till transaktionstabellen på Kontoöversikt
2. Använd skärmläsarens tabellnavigering

**V1-problem:** Tabellen är inte en riktig tabell, läses som vanlig text.

#### Test 5: Har ikoner namn?
1. Navigera till ikonknapparna (filter, ladda ner, skriv ut)
2. Lyssna efter vad skärmläsaren annonserar

**V1-problem:** Knapparna har inget namn ("knapp" utan innehåll).

#### Test 6: Beskrivs diagrammet?
1. Gå till utgiftsdiagrammet på Kontoöversikt
2. Kontrollera om diagrammets data förmedlas

**V3-förväntning:** Diagram har `aria-label` och en expanderbar datatabell.
**V1-problem:** Diagrammet är tyst för skärmläsare.

---

## 3. Visuell granskning

### Test 1: Färgkontrast
1. Använd ett kontrastverktyg (t.ex. WebAIM Contrast Checker)
2. Kontrollera att text har minst 4.5:1 kontrast mot bakgrund

### Test 2: Färg som enda indikator
1. Titta på transaktionstabellen
2. Kan du se skillnad på inkomst/utgift utan färg?

**V1-problem:** Endast färg (grön/röd) indikerar inkomst/utgift.
**V3-lösning:** Pil-ikon + färg + skärmläsartext.

### Test 3: Fokussynlighet
1. Tabba genom sidan
2. Är det tydligt vilket element som har fokus?

**V1-problem:** Fokusindikator saknas helt.

### Test 4: Textförstoring
1. Zooma till 200% (`Cmd/Ctrl + +`)
2. Fungerar sidan fortfarande?
3. Klipps text av?

---

## 4. Automatiserade verktyg

### Webbläsartillägg

| Verktyg | Plattform | URL |
|---------|-----------|-----|
| axe DevTools | Chrome/Firefox | chrome.google.com/webstore |
| WAVE | Chrome/Firefox | wave.webaim.org |
| Lighthouse | Chrome (inbyggt) | DevTools > Lighthouse |

### Hur du använder axe DevTools

1. Installera tillägget
2. Öppna DevTools (`F12`)
3. Gå till fliken "axe DevTools"
4. Klicka "Scan ALL of my page"
5. Granska resultaten

### Förväntade resultat

| Version | Förväntat antal fel |
|---------|---------------------|
| V1 | 20-40 fel |
| V2 | 5-15 fel |
| V3 | 0-2 fel |

---

## 5. Testchecklista per sida

### Inloggningssidan (`/login`)

| Test | V1 | V2 | V3 |
|------|:--:|:--:|:--:|
| Formulärfält har synliga etiketter | ❌ | ✅ | ✅ |
| Knappar är `<button>` element | ❌ | ✅ | ✅ |
| BankID-modal fångar fokus | ❌ | ❌ | ✅ |
| Escape stänger BankID-modal | ❌ | ✅ | ✅ |
| Timeout-varning annonseras | ❌ | ❌ | ✅ |
| Timeout-dialog kräver explicit knappval | ❌ | ❌ | ✅ |
| Sessionen kan förlängas | ❌ | ❌ | ✅ |
| Modaler blockerar bakgrundsscrollning | ❌ | ❌ | ✅ |
| Felmeddelanden kopplade till fält | ❌ | ❌ | ✅ |
| Fokus flyttas till felfält vid validering | ❌ | ❌ | ✅ |
| Skip-länk finns | ❌ | ❌ | ✅ |

### Kontoöversikt (`/account`)

| Test | V1 | V2 | V3 |
|------|:--:|:--:|:--:|
| Transaktionstabellen är en `<table>` | ❌ | ✅ | ✅ |
| Tabellrubriker har `<th scope>` | ❌ | ❌ | ✅ |
| Flikar har `role="tablist"` | ❌ | ❌ | ✅ |
| Flikar navigerbara med piltangenter | ❌ | ❌ | ✅ |
| Ikonknappar har aria-label | ❌ | ❌ | ✅ |
| Diagrammet har textalternativ | ❌ | ❌ | ✅ |
| Inkomst/utgift visas med mer än färg | ❌ | ❌ | ✅ |

### Låneansökan (`/loan`)

| Test | V1 | V2 | V3 |
|------|:--:|:--:|:--:|
| Stegindikator har aria-current | ❌ | ❌ | ✅ |
| Slider är tangentbordsanvändbar | ❌ | ✅ | ✅ |
| Slider har aria-valuetext | ❌ | ❌ | ✅ |
| Fokus flyttas mellan steg | ❌ | ❌ | ✅ |
| Fokus flyttas till felfält vid validering | ❌ | ❌ | ✅ |
| Felmeddelanden är specifika | ❌ | ❌ | ✅ |
| Radioknappar är riktiga `<input>` | ❌ | ✅ | ✅ |
| Fieldset har aria-describedby vid fel | ❌ | ❌ | ✅ |
| Fieldset/legend för radioknappar | ❌ | ❌ | ✅ |
| Obligatoriska fält markerade med required | ❌ | ❌ | ✅ |
| Hjälptext via disclosure (ej alert) | ❌ | ❌ | ✅ |
| Formulärsteg wrappade i `<form>` | ❌ | ❌ | ✅ |

### Inställningar (`/settings`)

| Test | V1 | V2 | V3 |
|------|:--:|:--:|:--:|
| Accordion-rubriker är knappar | ❌ | ✅ | ✅ |
| aria-expanded på accordion | ❌ | ❌ | ✅ |
| aria-controls på accordion | ❌ | ❌ | ✅ |
| Växlar använder role="switch" | ❌ | ❌ | ✅ |
| "Sparat"-meddelande annonseras | ❌ | ❌ | ✅ |

---

## Övningsuppgifter

### Övning 1: Hitta felen
1. Gå till `/v1/login`
2. Försök logga in endast med tangentbord
3. Skriv ner alla problem du stöter på
4. Jämför med `/v3/login`

### Övning 2: Skärmläsarupplevelse
1. Starta VoiceOver/NVDA
2. Navigera genom `/v1/account`
3. Försök förstå kontosaldot och transaktionerna
4. Upprepa på `/v3/account`

### Övning 3: Kodjämförelse
1. Öppna webbläsarens utvecklarverktyg
2. Inspektera en knapp på V1 vs V3
3. Notera skillnaderna i HTML-struktur och ARIA-attribut

### Övning 4: Automatiserad testning
1. Kör axe DevTools på `/v1/loan`
2. Dokumentera de 5 allvarligaste felen
3. Förklara hur varje fel påverkar användare

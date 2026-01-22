# WCAG 2.2 Referens för BankDemo

Detta dokument beskriver de WCAG 2.2-kriterier (nivå A och AA) som är relevanta för BankDemo och var de demonstreras.

## Innehåll

1. [Princip 1: Möjlig att uppfatta](#princip-1-möjlig-att-uppfatta)
2. [Princip 2: Hanterbar](#princip-2-hanterbar)
3. [Princip 3: Begriplig](#princip-3-begriplig)
4. [Princip 4: Robust](#princip-4-robust)

---

## Princip 1: Möjlig att uppfatta

> Information och komponenter i användargränssnittet måste presenteras på sätt som användare kan uppfatta.

### 1.1.1 Icke-textuellt innehåll (Nivå A)

**Krav:** Allt icke-textuellt innehåll ska ha ett textalternativ.

**Demonstreras på:** Kontoöversikt (diagram)

| Version | Implementation |
|---------|----------------|
| V1 | Diagram utan alt-text |
| V3 | `role="img"` med `aria-label`, plus expanderbar datatabell |

**Kodexempel (V3):**
```html
<div
  role="img"
  aria-label="Utgifter denna månad: Matvaror 4500 kr, Transport 2100 kr..."
>
  <!-- Visuellt diagram -->
</div>
```

---

### 1.3.1 Information och relationer (Nivå A)

**Krav:** Information, struktur och relationer ska kunna bestämmas programmatiskt.

**Demonstreras på:** Alla sidor

| Komponent | V1-problem | V3-lösning |
|-----------|------------|------------|
| Tabell | `<div>`-rutnät | `<table>` med `<th scope>` |
| Formulär | Placeholder-only | `<label for>` |
| Navigation | `<div>` | `<nav aria-label>` |
| Stegindikator | Visuell endast | `aria-current="step"` |

---

### 1.3.2 Meningsfull sekvens (Nivå A)

**Krav:** När ordningen påverkar innehållets betydelse ska den kunna bestämmas programmatiskt.

**Demonstreras på:** Alla sidor

DOM-ordningen matchar visuell ordning i alla versioner.

---

### 1.4.1 Användning av färg (Nivå A)

**Krav:** Färg ska inte vara det enda visuella sättet att förmedla information.

**Demonstreras på:** Kontoöversikt (transaktioner)

| Version | Implementation |
|---------|----------------|
| V1 | Grön/röd färg är enda indikator för inkomst/utgift |
| V3 | Uppåt/nedåt-pil + färg + skärmläsartext |

---

### 1.4.3 Kontrast (minimum) (Nivå AA)

**Krav:** Text ska ha minst 4.5:1 kontrastförhållande.

**Implementation:** Alla versioner använder färger som uppfyller kravet:
- Brödtext: `#334e68` på `#ffffff` = 8.5:1
- Sekundärtext: `#627d98` på `#ffffff` = 4.8:1

---

### 1.4.4 Ändra textstorlek (Nivå AA)

**Krav:** Text ska kunna förstoras till 200% utan förlust av innehåll.

**Implementation:** Alla versioner använder responsiva enheter (rem, %).

---

### 1.4.10 Omflöde (Nivå AA)

**Krav:** Innehåll ska kunna presenteras utan förlust vid 320px bredd.

**Implementation:** Alla versioner är responsiva med Tailwind CSS.

---

### 1.4.11 Kontrast för icke-text (Nivå AA)

**Krav:** Grafik och gränssnittskomponenter ska ha minst 3:1 kontrast.

**Implementation:** Fokusringar och knappar har tillräcklig kontrast.

---

### 1.4.13 Innehåll vid hovring eller fokus (Nivå AA)

**Krav:** Innehåll som visas vid hovring/fokus ska vara stängningsbart och stabilt.

**Demonstreras på:** Låneansökan (hjälp-tooltip)

| Version | Implementation |
|---------|----------------|
| V1 | Tooltip endast vid hover |
| V3 | Tooltip som knapp, stängs med Escape |

---

## Princip 2: Hanterbar

> Komponenter i användargränssnittet och navigering måste vara hanterbara.

### 2.1.1 Tangentbord (Nivå A)

**Krav:** All funktionalitet ska kunna utföras med tangentbord.

**Demonstreras på:** Alla sidor

| Komponent | V1-problem | V3-lösning |
|-----------|------------|------------|
| Knappar | `<div onclick>` | `<button>` |
| Modaler | Ingen ESC-stängning | ESC stänger |
| Flikar | Endast klick | Piltangenter |
| Slider | Endast mus | `<input type="range">` |

---

### 2.1.2 Ingen tangentbordsfälla (Nivå A)

**Krav:** Om fokus kan flyttas till en komponent ska det gå att flytta därifrån.

**Demonstreras på:** Inloggning (modal)

V3-modaler har fokus-trap men ESC-tangent fungerar alltid.

---

### 2.2.1 Justerbar tidsgräns (Nivå A)

**Krav:** Användare ska kunna stänga av, justera eller förlänga tidsgränser.

**Demonstreras på:** Inloggning (timeout-varning)

| Version | Implementation |
|---------|----------------|
| V1 | Sessionen går ut utan möjlighet att förlänga |
| V3 | "Förläng session"-knapp, tydlig nedräkning |

---

### 2.4.1 Hoppa över block (Nivå A)

**Krav:** Det ska finnas en mekanism för att hoppa över repetitivt innehåll.

**Demonstreras på:** Alla sidor

| Version | Implementation |
|---------|----------------|
| V1 | Ingen skip-länk |
| V3 | Skip-länk till `#main-content` |

---

### 2.4.2 Sida med titel (Nivå A)

**Krav:** Webbsidor ska ha titlar som beskriver syfte.

**Implementation:** Alla versioner har `<title>BankDemo - Demobanken</title>`

---

### 2.4.3 Fokusordning (Nivå A)

**Krav:** Fokusordningen ska bevara mening och användbarhet.

**Demonstreras på:** Låneansökan (wizard), Inloggning (modal)

| Version | Implementation |
|---------|----------------|
| V1 | Fokus försvinner vid stegbyte, flyr modaler |
| V3 | Fokus flyttas programmatiskt, fokus-trap i modaler |

---

### 2.4.4 Syftet med en länk (i sitt sammanhang) (Nivå A)

**Krav:** Länkens syfte ska framgå av länktexten eller sammanhanget.

**Implementation:** Alla länkar har beskrivande text eller `aria-label`.

---

### 2.4.6 Rubriker och etiketter (Nivå AA)

**Krav:** Rubriker och etiketter ska beskriva ämne eller syfte.

**Demonstreras på:** Alla formulärsidor

| Version | Implementation |
|---------|----------------|
| V1 | Endast placeholder |
| V3 | Synliga `<label>` med tydlig text |

---

### 2.4.7 Synligt fokus (Nivå AA)

**Krav:** Tangentbordsfokus ska vara synligt.

**Demonstreras på:** Alla sidor

| Version | Implementation |
|---------|----------------|
| V1 | `outline: none` globalt |
| V3 | `:focus-visible` med tydlig ring |

---

### 2.4.11 Fokus inte dolt (Nivå AA) - WCAG 2.2

**Krav:** Fokuserat element ska inte vara helt dolt.

**Implementation:** Alla V3-versioner har synlig fokusmarkering.

---

### 2.5.3 Etikett i namn (Nivå A)

**Krav:** Komponenter med synlig text ska ha samma text i accessible name.

**Implementation:** Alla knappar i V3 har matchande synlig och programmatisk etikett.

---

### 2.5.8 Minsta målstorlek (Nivå AA) - WCAG 2.2

**Krav:** Interaktiva element ska vara minst 24x24 CSS-pixlar.

**Implementation:** Alla knappar och kontroller är minst 44x44px.

---

## Princip 3: Begriplig

> Information och hantering av användargränssnittet ska vara begriplig.

### 3.1.1 Sidans språk (Nivå A)

**Krav:** Sidans standardspråk ska kunna bestämmas programmatiskt.

**Implementation:** `<html lang="sv">`

---

### 3.2.1 Vid fokus (Nivå A)

**Krav:** En komponent ska inte ändra sammanhanget automatiskt vid fokus.

**Implementation:** Inga automatiska kontextändringar vid fokus.

---

### 3.2.2 Vid inmatning (Nivå A)

**Krav:** En komponent ska inte ändra sammanhanget automatiskt vid inmatning.

**Demonstreras på:** Alla formulär

Formulär skickas endast vid explicit knapptryck, inte vid Enter i textfält.

---

### 3.2.3 Konsekvent navigering (Nivå AA)

**Krav:** Navigation ska vara konsekvent mellan sidor.

**Implementation:** Samma navigation på alla sidor inom varje version.

---

### 3.2.4 Konsekvent identifiering (Nivå AA)

**Krav:** Komponenter med samma funktion ska identifieras konsekvent.

**Implementation:** Alla knappar, länkar och formulärelement använder konsekvent terminologi.

---

### 3.3.1 Felidentifiering (Nivå A)

**Krav:** Om ett fel upptäcks ska det felet beskrivas i text.

**Demonstreras på:** Alla formulärsidor

| Version | Implementation |
|---------|----------------|
| V1 | Visuell felindikering utan text |
| V3 | Feltext kopplad med `aria-describedby` |

---

### 3.3.2 Etiketter eller instruktioner (Nivå A)

**Krav:** Etiketter eller instruktioner ska tillhandahållas vid inmatning.

**Demonstreras på:** Inloggning, Låneansökan

| Version | Implementation |
|---------|----------------|
| V1 | Endast placeholder |
| V3 | Synlig `<label>`, formathjälp |

---

### 3.3.3 Förslag vid fel (Nivå AA)

**Krav:** Om ett fel upptäcks ska förslag på rättelse ges.

**Demonstreras på:** Låneansökan

| Version | Felmeddelande |
|---------|---------------|
| V1 | "Ogiltigt format" |
| V3 | "Ange personnummer med 12 siffror (ÅÅÅÅMMDD-XXXX)" |

---

### 3.3.4 Förebyggande av fel (juridiska, ekonomiska, data) (Nivå AA)

**Krav:** För viktiga transaktioner ska bekräftelse krävas.

**Demonstreras på:** Låneansökan (steg 3)

Sammanfattning visas innan ansökan skickas.

---

### 3.3.7 Redundant inmatning (Nivå A) - WCAG 2.2

**Krav:** Information som redan angetts ska inte begäras igen.

**Implementation:** Wizard i Låneansökan sparar data mellan steg.

---

### 3.3.8 Tillgänglig autentisering (Nivå AA) - WCAG 2.2

**Krav:** Autentisering ska inte kräva kognitiva funktionstester.

**Implementation:** BankID-inloggning kräver ingen minneskapacitet.

---

## Princip 4: Robust

> Innehåll måste vara robust nog för att kunna tolkas av olika program.

### 4.1.2 Namn, roll, värde (Nivå A)

**Krav:** Namn och roll kan bestämmas programmatiskt för alla UI-komponenter.

**Demonstreras på:** Alla sidor

| Komponent | V1-problem | V3-lösning |
|-----------|------------|------------|
| Knappar | `<div>` | `<button>` |
| Flikar | `<div onclick>` | `role="tab"` + `aria-selected` |
| Accordion | `<div onclick>` | `<button aria-expanded>` |
| Toggle | `<div>` | `role="switch"` + `aria-checked` |
| Modal | `<div>` | `role="dialog"` + `aria-modal` |

---

### 4.1.3 Statusmeddelanden (Nivå AA)

**Krav:** Statusmeddelanden ska kunna presenteras utan att fokus flyttas.

**Demonstreras på:** Inställningar, Låneansökan, Inloggning

| Version | Implementation |
|---------|----------------|
| V1 | Meddelanden visas visuellt utan annonsering |
| V3 | `aria-live="polite"` eller `role="alert"` |

**Kodexempel (V3):**
```html
<div aria-live="polite">
  <span role="status">✓ Inställningarna har sparats</span>
</div>
```

---

## Sammanfattning

### Kriterier demonstrerade i BankDemo

| WCAG-nivå | Antal kriterier | Demonstreras |
|-----------|-----------------|--------------|
| A | 25 | 18 |
| AA | 13 | 11 |
| **Totalt** | **38** | **29** |

### Mest pedagogiska kriterier

1. **4.1.2 Namn, roll, värde** - Visar skillnad mellan `<div>` och semantiska element
2. **2.1.1 Tangentbord** - Konkret testbar med Tab-navigering
3. **1.3.1 Info och relationer** - Demonstrerar landmärken och tabellstruktur
4. **3.3.1/3.3.2 Fel och etiketter** - Formulärtillgänglighet
5. **2.4.7 Synligt fokus** - Enkel visuell jämförelse

### Resurser

- [WCAG 2.2 (W3C)](https://www.w3.org/TR/WCAG22/)
- [How to Meet WCAG](https://www.w3.org/WAI/WCAG22/quickref/)
- [WebAIM WCAG Checklist](https://webaim.org/standards/wcag/checklist)
- [Digg - Webbriktlinjer](https://webbriktlinjer.se/)

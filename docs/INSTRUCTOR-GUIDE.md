# Instruktörsguide

Guide för att hålla tillgänglighetsutbildning med BankDemo.

## Förberedelser

### Tekniska krav
- Modern webbläsare (Chrome, Firefox, Safari, Edge)
- Skärmläsare installerad (VoiceOver på Mac, NVDA på Windows)
- Node.js för att köra lokalt

### Starta demon
```bash
cd a11yway_bankdemo
npm install
npm run dev
```

Öppna http://localhost:3000

### Rekommenderade webbläsartillägg
- axe DevTools
- WAVE
- HeadingsMap

---

## Lektionsförslag

### Lektion 1: Introduktion till tillgänglighet (90 min)

**Mål:** Förstå varför tillgänglighet är viktigt och grundläggande testmetoder.

| Tid | Aktivitet | Sida |
|-----|-----------|------|
| 0-15 | Intro: Vad är webbtillgänglighet? | - |
| 15-30 | Demo: Navigera V1 vs V3 med tangentbord | /login |
| 30-45 | Praktik: Testa tangentbordsnavigering | /account |
| 45-60 | Demo: Skärmläsare VoiceOver/NVDA | /login |
| 60-75 | Praktik: Navigera med skärmläsare | /account |
| 75-90 | Diskussion: Påverkan på riktiga användare | - |

**Nyckelpunkter:**
- Visa hur V1-knapparna inte går att tabba till
- Låt deltagarna uppleva "tomheten" när skärmläsare möter V1

---

### Lektion 2: Semantisk HTML (90 min)

**Mål:** Förstå vikten av korrekt HTML-struktur.

| Tid | Aktivitet | Sida |
|-----|-----------|------|
| 0-20 | Teori: HTML-semantik, landmärken, rubriker | - |
| 20-35 | Demo: Inspektera V1 vs V3 med DevTools | /login |
| 35-55 | Praktik: Hitta alla `<div onclick>` i V1 | /account |
| 55-70 | Kodgranskning: Jämför tabell-implementationer | /account |
| 70-90 | Övning: Föreslå fixar för V1-problem | - |

**Nyckelpunkter:**
- Visa skillnaden mellan `<div>` och `<button>` i Elements-panelen
- Kör axe DevTools på V1 och V3, jämför antal fel

---

### Lektion 3: Formulär och validering (90 min)

**Mål:** Bygga tillgängliga formulär.

| Tid | Aktivitet | Sida |
|-----|-----------|------|
| 0-15 | Teori: Labels, felmeddelanden, aria-describedby | - |
| 15-35 | Demo: Formulärproblem i V1 | /loan |
| 35-55 | Praktik: Försök fylla i formulär med endast tangentbord | /loan |
| 55-75 | Kodgranskning: V3-formulärimplementation | /loan |
| 75-90 | Diskussion: Specifika vs generiska felmeddelanden | - |

**Nyckelpunkter:**
- Demonstrera hur slider i V1 är oanvändbar utan mus
- Visa hur `aria-describedby` kopplar fel till fält

---

### Lektion 4: ARIA och komplexa widgets (90 min)

**Mål:** Använda ARIA korrekt för komplexa komponenter.

| Tid | Aktivitet | Sida |
|-----|-----------|------|
| 0-20 | Teori: ARIA-roller, states, properties | - |
| 20-40 | Demo: Flikar (tabs) implementation | /account |
| 40-60 | Demo: Accordion implementation | /settings |
| 60-80 | Praktik: Testa modal med skärmläsare | /login |
| 80-90 | Diskussion: När ska man använda ARIA? | - |

**Nyckelpunkter:**
- "No ARIA is better than bad ARIA"
- Visa hur V2 har knappar men saknar ARIA-states
- Demonstrera tangentbordsnavigering i V3-flikar

---

### Lektion 5: Tillgänglighetstestning (90 min)

**Mål:** Kunna testa och verifiera tillgänglighet.

| Tid | Aktivitet | Sida |
|-----|-----------|------|
| 0-20 | Teori: Testmetoder, verktyg, WCAG | - |
| 20-40 | Demo: axe DevTools, WAVE | Alla |
| 40-60 | Praktik: Dokumentera alla V1-problem | Valfri |
| 60-80 | Praktik: Verifiera V3-lösningar | Valfri |
| 80-90 | Avslutning: Nästa steg, resurser | - |

---

## Viktig arkitekturinfo

**Inloggningssidan har ett minimalt header:**
- Endast logo (ingen navigation - användaren är inte inloggad)
- Efter lyckad BankID-inloggning omdirigeras användaren automatiskt till kontoöversikten
- V3 annonserar "Inloggning lyckades" för skärmläsare innan omdirigering

**Autentiserade sidor (Översikt, Lån, Inställningar):**
- Full navigation med Översikt, Lån, Inställningar och Logga ut
- "Logga ut" tar användaren tillbaka till inloggningssidan

---

## Snabbdemonstrationer

### Demo 1: Div vs Button (2 min)
1. Öppna `/v1/login`
2. Tryck Tab - visa att "Logga in"-knappen inte fokuseras
3. Öppna `/v3/login`
4. Tryck Tab - visa att knappen fokuseras
5. Visa fokusringen

### Demo 2: Modal-fokus och omdirigering (3 min)
1. Öppna `/v1/login`
2. Klicka "Logga in med BankID"
3. Tryck Tab - visa att fokus flyr modalen
4. Tryck Escape - visa att inget händer
5. Vänta 2 sekunder - användaren omdirigeras utan förvarning
6. Upprepa på `/v3/login` - visa skillnaden:
   - Fokus stannar i modalen
   - Escape stänger BankID-modalen
   - Bakgrundsinnehåll kan inte scrollas
   - "Inloggning lyckades" annonseras innan omdirigering

### Demo 2b: Timeout-dialog (2 min)
1. Klicka "Visa timeout-varning" i demo-kontrollerna
2. Visa att fokus fångas i dialogen
3. Tryck Escape - **ingenting händer** (avsiktligt — `alertdialog` kräver explicit val)
4. Klicka "Förläng session" — nedräkningen nollställs
5. **Diskutera:** Varför ska Escape inte logga ut? (oavsiktlig utloggning = förlorat arbete)

### Demo 3: Skärmläsare på tabell (3 min)
1. Starta VoiceOver (Cmd+F5)
2. Öppna `/v1/account`
3. Navigera till "tabellen" - visa att det är ostrukturerat
4. Öppna `/v3/account`
5. Använd tabellnavigering (Ctrl+Option+piltangenter)

### Demo 4: Färg som enda indikator (1 min)
1. Öppna `/v1/account`
2. Visa transaktionslistan
3. Fråga: "Hur vet ni om det är inkomst eller utgift utan färg?"
4. Visa `/v3/account` med pilar

---

## Vanliga frågor

### "Hur mycket extra tid tar tillgänglighet?"
- Svar: Om man bygger rätt från början, nästan ingen extra tid
- Demo: Jämför kod-komplexitet i V1 vs V3 - V3 är inte mycket mer kod

### "Måste vi stödja alla hjälpmedel?"
- Svar: Fokusera på semantisk HTML, det fungerar överallt
- Demo: Visa att V3 fungerar i VoiceOver OCH NVDA

### "Vad säger lagen?"
- DOS-lagen kräver WCAG 2.1 AA för offentlig sektor
- EU:s tillgänglighetsdirektiv gäller från 2025 för privat sektor

### "Hur prioriterar vi?"
1. Tangentbordsnavigering (grundläggande)
2. Skärmläsarkompatibilitet (semantik)
3. Visuell tillgänglighet (kontrast, fokus)
4. Kognitiv tillgänglighet (tydlighet)

---

## Versionsväxlartips

Använd versionsväljaren (nedre högra hörnet) för att:
- Snabbt växla under demonstrationer
- Låta deltagare jämföra sida vid sida (två fönster)
- Visa progressionen V1 → V2 → V3

---

## Resurser att dela

### Dokumentation
- [WCAG 2.2](https://www.w3.org/TR/WCAG22/)
- [WAI-ARIA Practices](https://www.w3.org/WAI/ARIA/apg/)
- [Digg Webbriktlinjer](https://webbriktlinjer.se/)

### Verktyg
- [axe DevTools](https://www.deque.com/axe/)
- [WAVE](https://wave.webaim.org/)
- [Colour Contrast Analyser](https://www.tpgi.com/color-contrast-checker/)

### Skärmläsare
- [NVDA (Windows, gratis)](https://www.nvaccess.org/)
- VoiceOver (Mac, inbyggt)
- [JAWS (Windows, kommersiell)](https://www.freedomscientific.com/products/software/jaws/)

---

## Feedback och förbättringar

Har du förslag på förbättringar av demosidan?
- Skapa en issue på GitHub
- Kontakta kursansvarig

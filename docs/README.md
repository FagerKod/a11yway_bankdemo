# BankDemo - Tillgänglighetsutbildning

## Översikt

BankDemo är en demonstrationswebbplats för att lära ut webbtillgänglighet till designers och utvecklare. Webbplatsen simulerar en svensk internetbank med tre versioner av varje sida:

| Version | Beskrivning | Färgkod |
|---------|-------------|---------|
| **V1** | Otillgänglig - Visar vanliga tillgänglighetsproblem | 🔴 Röd |
| **V2** | Semantisk - Korrekt HTML men saknar ARIA | 🟡 Gul |
| **V3** | Tillgänglig - Fullt tillgänglig enligt WCAG 2.2 AA | 🟢 Grön |

Alla tre versioner ser **visuellt identiska** ut. Skillnaderna finns endast i koden.

## Snabbstart

```bash
# Installera beroenden
npm install

# Starta utvecklingsserver
npm run dev

# Öppna i webbläsare
open http://localhost:3000
```

## Sidstruktur

| Sida | URL-mönster | Syfte |
|------|-------------|-------|
| Inloggning | `/v1/login`, `/v2/login`, `/v3/login` | Formulär, modaler, timeout |
| Kontoöversikt | `/v1/account`, `/v2/account`, `/v3/account` | Tabeller, diagram, flikar |
| Låneansökan | `/v1/loan`, `/v2/loan`, `/v3/loan` | Wizard, slider, validering |
| Inställningar | `/v1/settings`, `/v2/settings`, `/v3/settings` | Accordion, växlar |

## Versionsväljaren

I det nedre högra hörnet finns en versionsväljare som låter dig snabbt växla mellan V1, V2 och V3 utan att lämna den aktuella sidan. Versionsväljaren är alltid synlig på alla skärmstorlekar.

## Arkitektur

Webbplatsen har två typer av layouts:

### Inloggningssidor (`/v1/login`, etc.)
- Minimal header med endast logo (ingen navigation - användaren är inte inloggad)
- Efter lyckad BankID-inloggning omdirigeras användaren automatiskt till kontoöversikten

### Autentiserade sidor (`/v1/account`, `/v1/loan`, etc.)
- Full navigation med Översikt, Lån, Inställningar och Logga ut
- "Logga ut" tar användaren tillbaka till inloggningssidan

## Dokumentation

- [Testguide](./TESTING.md) - Hur man testar tillgänglighet
- [Felkatalog](./ERRORS.md) - Alla tillgänglighetsproblem per sida
- [WCAG-referens](./WCAG-REFERENCE.md) - Relevanta WCAG-kriterier
- [Sidor](./pages/) - Detaljerad dokumentation per sida
- [Changelog](./CHANGELOG.md) - Ändringslogg

## Målgrupp

Denna demo är avsedd för:
- Utvecklare som vill lära sig tillgänglighet
- Designers som behöver förstå tekniska krav
- Testare som vill öva på tillgänglighetstestning
- Utbildare som håller kurser i webbtillgänglighet

## Teknisk stack

- Next.js 14 (App Router)
- TypeScript
- Tailwind CSS
- Inga externa beroenden för tillgänglighet

## Licens

Detta är ett utbildningsmaterial. Använd fritt i utbildningssyfte.

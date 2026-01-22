# Inloggningssidan

## Översikt

Inloggningssidan demonstrerar tillgänglighetsproblem relaterade till:
- Formulärhantering
- Modaler och dialoger
- Timeout-varningar
- Fokushantering
- Navigering och omdirigering

## Sidlayout

Inloggningssidan har ett **minimalt header** jämfört med de autentiserade sidorna:
- **Header**: Endast logo (ingen navigation - användaren är inte inloggad)
- **Footer**: Standard sidfot
- **Omdirigering**: Efter lyckad BankID-inloggning omdirigeras användaren automatiskt till `/vX/account`

### Tillgänglighetsmönster i header

| Element | V1 (Dålig) | V2 (Partiell) | V3 (Bra) |
|---------|------------|---------------|----------|
| Container | `<div>` | `<header>` | `<header>` |
| Logo | div onclick | `<Link>` | `<Link aria-label>` |
| Fokusindikator | Borttagen | Grundläggande | Tydlig focus-ring |

## URL:er

| Version | URL |
|---------|-----|
| V1 (Otillgänglig) | `/v1/login` |
| V2 (Semantisk) | `/v2/login` |
| V3 (Tillgänglig) | `/v3/login` |

## Komponenter

### 1. Personnummerfält

#### V1-problem
- Ingen synlig etikett, endast placeholder
- Felmeddelande inte kopplat till fältet
- Vagt felmeddelande ("Ogiltigt format")

#### V3-lösning
```html
<label for="personnummer">Personnummer</label>
<input
  id="personnummer"
  type="text"
  placeholder="ÅÅÅÅMMDD-XXXX"
  aria-describedby="error-personnummer"
  aria-invalid="true"
/>
<p id="error-personnummer" role="alert">
  Ange personnummer med 12 siffror (ÅÅÅÅMMDD-XXXX)
</p>
```

#### Tester
1. **Tangentbord:** Kan du tabba till fältet?
2. **Skärmläsare:** Annonseras "Personnummer" när fältet fokuseras?
3. **Validering:** Annonseras felmeddelandet?

---

### 2. "Kom ihåg mig" checkbox

#### V1-problem
- `<div>` med visuell checkbox-styling
- Inte fokuserbar med tangentbord
- Space aktiverar inte checkboxen

#### V3-lösning
```html
<input type="checkbox" id="remember" />
<label for="remember">Kom ihåg mig på denna enhet</label>
```

#### Tester
1. **Tangentbord:** Kan du tabba till checkboxen?
2. **Tangentbord:** Kan du kryssa i/ur med Space?
3. **Skärmläsare:** Annonseras "checkbox, ej markerad"?

---

### 3. Inloggningsknapp

#### V1-problem
- `<div class="btn-primary">` istället för `<button>`
- Inte fokuserbar
- Enter/Space fungerar inte

#### V3-lösning
```html
<button type="submit" class="btn-primary focus-ring">
  Logga in med BankID
</button>
```

#### Tester
1. **Tangentbord:** Kan du tabba till knappen?
2. **Tangentbord:** Kan du aktivera med Enter/Space?
3. **Skärmläsare:** Annonseras "Logga in med BankID, knapp"?

---

### 4. BankID-modal

#### V1-problem
- Fokus flyttas inte in i modalen
- Tab går till element bakom modalen
- Escape stänger inte modalen
- Ingen `role="dialog"` eller `aria-modal`
- Stäng-knapp är en `<span>`

#### V3-lösning
```jsx
// Fokus-trap hook
const focusTrapRef = useFocusTrap(isOpen);

// Escape-hantering
useEscapeKey(onClose, isOpen);

<div
  role="dialog"
  aria-modal="true"
  aria-labelledby="bankid-title"
  aria-describedby="bankid-desc"
  ref={focusTrapRef}
>
  <button aria-label="Stäng dialog">×</button>
  <h2 id="bankid-title">Logga in med BankID</h2>
  <p id="bankid-desc">Starta BankID-appen...</p>
</div>
```

#### Tester
1. **Öppna modal:** Flyttas fokus till modalen?
2. **Tab:** Stannar fokus inuti modalen?
3. **Escape:** Stängs modalen?
4. **Stäng:** Återgår fokus till "Logga in"-knappen?
5. **Skärmläsare:** Annonseras "dialog"?

---

### 5. Timeout-varning

#### V1-problem
- Dyker upp utan förvarning
- Inte annonserad för skärmläsare
- Går inte att förlänga sessionen (WCAG 2.2.1)

#### V3-lösning
```jsx
<div
  role="alertdialog"
  aria-modal="true"
  aria-labelledby="timeout-title"
>
  <h2 id="timeout-title">Sessionen håller på att gå ut</h2>
  <p aria-live="polite">Tid kvar: {timeRemaining} sekunder</p>
  <button onClick={extendSession}>Förläng session</button>
</div>
```

#### Tester
1. **Trigga varning:** Använd demo-knappen för att visa varningen
2. **Skärmläsare:** Annonseras varningen automatiskt?
3. **Nedräkning:** Annonseras nedräkningen?
4. **Förläng:** Kan sessionen förlängas?

---

### 6. Omdirigering efter inloggning

#### V1-problem
- Använder `window.location.href` istället för router
- Ingen annonsering för skärmläsare

#### V2-partiellt
- Använder Next.js `router.push()` (korrekt)
- Fortfarande ingen annonsering för skärmläsare

#### V3-lösning
```jsx
// Annonsera före omdirigering
const [announcement, setAnnouncement] = useState('');

useEffect(() => {
  // Annonsera först
  setTimeout(() => {
    setAnnouncement('Inloggning lyckades. Du omdirigeras till kontoöversikten.');
  }, 1500);

  // Sedan omdirigera
  setTimeout(() => {
    router.push('/v3/account');
  }, 2500);
}, []);

// Live region för annonsering
<div aria-live="assertive" aria-atomic="true" className="sr-only">
  {announcement}
</div>
```

#### Tester
1. **V1:** Omdirigeras du efter BankID-modal öppnas?
2. **V3:** Annonseras "Inloggning lyckades" innan omdirigering?
3. **Skärmläsare:** Får du information om vad som händer?

---

## Demo-kontroller

På inloggningssidan finns en ruta "Demo-kontroller" som låter instruktören:
- Trigga timeout-varningen manuellt

## Testscenario: Komplett tangentbordsflöde

1. Starta på `/v1/login`
2. Tryck Tab för att navigera till personnummerfältet
3. Skriv in ett personnummer
4. Tab till "Kom ihåg mig"
5. Space för att kryssa i
6. Tab till "Logga in med BankID"
7. Enter för att öppna BankID-modal
8. Försök navigera i modalen med Tab
9. Escape för att stänga
10. Upprepa på `/v3/login` och jämför upplevelsen

## WCAG-kriterier demonstrerade

| Kriterium | Nivå | Demonstreras |
|-----------|------|--------------|
| 1.3.1 Info och relationer | A | Etiketter, landmärken |
| 2.1.1 Tangentbord | A | Alla kontroller |
| 2.1.2 Ingen tangentbordsfälla | A | Modal |
| 2.2.1 Justerbar tidsgräns | A | Timeout |
| 2.4.3 Fokusordning | A | Modal-fokus |
| 2.4.7 Synligt fokus | AA | Fokusring |
| 3.3.1 Felidentifiering | A | Validering |
| 3.3.2 Etiketter | A | Formulärfält |
| 4.1.2 Namn, roll, värde | A | Alla kontroller |

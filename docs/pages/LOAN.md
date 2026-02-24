# Låneansökan

## Översikt

Låneansökningssidan demonstrerar tillgänglighetsproblem relaterade till:
- Flerstegsformulär (wizard)
- Sliders och range-kontroller
- Formulärvalidering
- Fokushantering
- Radioknappar och fieldsets

## URL:er

| Version | URL |
|---------|-----|
| V1 (Otillgänglig) | `/v1/loan` |
| V2 (Semantisk) | `/v2/loan` |
| V3 (Tillgänglig) | `/v3/loan` |

## Stegöversikt

| Steg | Innehåll |
|------|----------|
| 1 | Lånebelopp, återbetalningstid, syfte |
| 2 | Personnummer, årsinkomst, anställningsform |
| 3 | Sammanfattning, godkännande av villkor |

## Komponenter

### 1. Stegindikator

#### V1-problem
- Endast visuell, ingen information för skärmläsare
- Inget `aria-current` för aktivt steg
- Inga stegbeskrivningar

#### V3-lösning
```html
<nav aria-label="Steg i låneansökan">
  <ol>
    <li aria-current="step">
      <span class="sr-only">Steg 1 av 3 (nuvarande):</span>
      <span aria-hidden="true">1</span>
      <span>Lånebelopp</span>
    </li>
    <li>
      <span class="sr-only">Steg 2 av 3:</span>
      <span aria-hidden="true">2</span>
      <span>Personuppgifter</span>
    </li>
    <li>
      <span class="sr-only">Steg 3 av 3:</span>
      <span aria-hidden="true">3</span>
      <span>Bekräfta</span>
    </li>
  </ol>
</nav>
```

#### Tester
1. **Skärmläsare (V1):** Navigera till stegindikatorn - får du veta vilket steg du är på?
2. **Skärmläsare (V3):** Annonseras "Steg 1 av 3, nuvarande"?
3. **Stegbyte:** Annonseras det nya steget?

---

### 2. Beloppslider

#### V1-problem
- Custom `<div>`-slider
- Inte fokuserbar med tangentbord
- Piltangenter fungerar inte
- Inget värde annonseras

#### V3-lösning
```html
<label for="amount">Belopp</label>
<input
  type="range"
  id="amount"
  min="50000"
  max="500000"
  step="10000"
  value="150000"
  aria-valuetext="150 000 kronor"
/>
<output for="amount">150 000 kr</output>
```

#### Tangentbordsnavigering (V3)
| Tangent | Funktion |
|---------|----------|
| Tab | Flytta till/från slidern |
| Vänster/Höger | Minska/öka med ett steg |
| Page Up/Down | Öka/minska med större steg |
| Home/End | Min/max-värde |

#### Tester
1. **Tangentbord (V1):** Kan du ändra värdet utan mus?
2. **Tangentbord (V3):** Använd piltangenter - ändras värdet?
3. **Skärmläsare:** Annonseras "150 000 kronor"?

---

### 3. Lånesyfte (dropdown)

#### V1-problem
- `<select>` utan associerad `<label>`
- Hjälptext (tooltip) endast vid hover
- Generiskt felmeddelande

#### V3-lösning
```html
<div>
  <label for="purpose">Lånesyfte</label>
  <!-- Disclosure pattern istället för alert() -->
  <button
    type="button"
    aria-expanded="false"
    aria-controls="purpose-help"
  >
    <span class="sr-only">Mer information om lånesyfte</span>
    ⓘ
  </button>
</div>
<p id="purpose-help">
  Vi frågar om lånesyfte för att kunna ge dig bästa möjliga erbjudande.
</p>
<select
  id="purpose"
  aria-describedby="purpose-error purpose-help"
  aria-invalid="true"
  required
  aria-required="true"
>
  <option value="">Välj syfte...</option>
  <option value="renovation">Renovering</option>
</select>
<p id="purpose-error" role="alert">
  Välj vad du ska använda lånet till
</p>
```

#### Tester
1. **Skärmläsare:** Annonseras "Lånesyfte" när du fokuserar fältet?
2. **Hjälp (V1):** Kan du komma åt hjälpen utan mus?
3. **Hjälp (V3):** Kan du toggla hjälptexten med tangentbord?
4. **Required:** Annonseras fältet som obligatoriskt?

---

### 4. Lånekalkylator

#### V1-problem
- Uppdateras tyst utan annonsering
- Ingen live-region

#### V3-lösning
```html
<div aria-live="polite" aria-atomic="true">
  <p>Uppskattad månadskostnad</p>
  <p>2 890 kr</p>
</div>
```

#### Tester
1. **Ändra belopp:** Annonseras den nya månadskostnaden?

---

### 5. Anställningsform (radioknappar)

#### V1-problem
- `<div onclick>` istället för `<input type="radio">`
- Ingen gruppering med `<fieldset>/<legend>`
- Inte tangentbordsanvändbara

#### V3-lösning
```html
<fieldset
  aria-describedby="employment-error"
  aria-invalid="true"
  aria-required="true"
>
  <legend>Anställningsform</legend>
  <label>
    <input type="radio" name="employment" value="permanent" />
    Tillsvidareanställning
  </label>
  <label>
    <input type="radio" name="employment" value="temporary" />
    Vikariat/tidsbegränsad
  </label>
  <label>
    <input type="radio" name="employment" value="self" />
    Egen företagare
  </label>
</fieldset>
<p id="employment-error" role="alert">
  Välj din anställningsform
</p>
```

#### Tangentbordsnavigering (V3)
| Tangent | Funktion |
|---------|----------|
| Tab | Flytta till/från radioknapparna |
| Upp/Ner | Välj föregående/nästa alternativ |
| Space | Välj aktuellt alternativ |

#### Tester
1. **Tangentbord (V1):** Kan du välja alternativ med tangentbord?
2. **Skärmläsare (V1):** Annonseras att det är radioknappar?
3. **Skärmläsare (V3):** Annonseras "Anställningsform, radiogrupp"?

---

### 6. Fokushantering vid stegbyte och valideringsfel

#### V1-problem
- Fokus stannar på "Nästa"-knappen
- Användaren måste navigera tillbaka till formuläret

#### V3-lösning
```jsx
const handleNext = () => {
  if (!validateStep(currentStep)) {
    // Flytta fokus till första felfältet
    requestAnimationFrame(() => {
      const firstError = document.querySelector('[aria-invalid="true"]');
      firstError?.focus();
    });
    return;
  }

  setCurrentStep(next);

  // Annonsera steget
  setAnnouncement(`Steg ${next + 1} av 3: ${steps[next]}`);

  // Flytta fokus till nästa steg
  setTimeout(() => {
    stepRefs[next].current?.focus();
  }, 100);
};
```

Varje steg wrappas i ett `<form>`-element med `onSubmit` så att Enter-tangent i textfält fungerar som förväntat.

#### Tester
1. **V1:** Klicka "Nästa" - var hamnar fokus?
2. **V3:** Klicka "Nästa" med valideringsfel - hamnar fokus på felfältet?
3. **V3:** Klicka "Nästa" utan fel - hamnar fokus på nytt steg?
4. **Skärmläsare:** Annonseras det nya steget?
5. **Enter:** Tryck Enter i textfält - submitas formuläret?

---

### 7. Villkors-checkbox (Steg 3)

#### V1-problem
- `<div>` som ser ut som checkbox
- Länkarna till villkor är `<span onclick>`

#### V3-lösning
```html
<label>
  <input
    type="checkbox"
    aria-describedby="terms-error"
  />
  Jag har läst och godkänner
  <a href="/terms">lånevillkoren</a> och
  <a href="/privacy">personuppgiftspolicyn</a>
</label>
<p id="terms-error" role="alert">
  Du måste godkänna villkoren för att fortsätta
</p>
```

#### Tester
1. **Tangentbord:** Kan du kryssa i checkboxen med Space?
2. **Tangentbord:** Kan du följa länkarna med Enter?

---

## Testscenario: Komplett ansökan utan mus

1. Starta på `/v1/loan`
2. Försök fylla i hela ansökan med endast tangentbord
3. Notera alla problem
4. Upprepa på `/v3/loan`
5. Jämför upplevelserna

## WCAG-kriterier demonstrerade

| Kriterium | Nivå | Demonstreras |
|-----------|------|--------------|
| 1.3.1 Info och relationer | A | Stegindikator, fieldset, aria-describedby |
| 2.1.1 Tangentbord | A | Slider, radioknappar, disclosure-hjälp |
| 2.4.3 Fokusordning | A | Stegbyte, fokus till felfält |
| 3.3.1 Felidentifiering | A | Validering, fokus till felfält |
| 3.3.2 Etiketter | A | Required-attribut på obligatoriska fält |
| 3.3.3 Felförslag | AA | Specifika felmeddelanden |
| 4.1.2 Namn, roll, värde | A | Slider, radioknappar |
| 4.1.3 Statusmeddelanden | AA | Bekräftelse via aria-live (ej alert) |
| 4.1.3 Statusmeddelanden | AA | Kalkylator |

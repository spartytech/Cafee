# ☕ The Sensory Gallery

Webová prezentace fiktivní pražské kavárny a galerie **The Sensory Gallery**, vytvořená jako single-page aplikace v Reactu s TypeScriptem.

---

## 🖥️ Náhled projektu

Aplikace simuluje kompletní web kavárny s navigací mezi sekcemi, rezervačním systémem a kontaktním formulářem — vše bez nutnosti backendu.

---

## 📁 Struktura projektu

```
src/
├── Cafe.tsx           # Hlavní soubor – navigace, layout, stránky
└── RegistracePage.tsx # Vícekrokový rezervační formulář
```

---

## 📄 Stránky

| Sekce | Popis |
|---|---|
| **Domů** | Úvodní hero sekce s atmosférou kavárny |
| **Menu** | Přehled nápojů a jídel |
| **Příběh** | Historie a filozofie kavárny |
| **Kontakty** | Adresa, otevírací doba a kontaktní formulář |
| **Rezervace** | 3-krokový formulář pro rezervaci stolu |

---

## ✨ Funkce

- **Tmavý / světlý režim** – přepínač v navigaci, plně aplikovaný na všechny sekce
- **Responzivní design** – mobilní hamburger menu se slide-in panelem, přizpůsobení pro tablety i desktop
- **Rezervační systém** – 3 kroky: kontaktní údaje → výběr data, času a počtu hostů → potvrzení
- **Validace formuláře** – povinná pole s chybovými hláškami (jméno, e-mail, telefon, datum, čas)
- **Kontaktní formulář** – s potvrzovací zprávou po odeslání
- **Dynamický titulek stránky** – mění se podle aktivní sekce (`document.title`)

---

## 🛠️ Technologie

- **React** + **TypeScript**
- **Tailwind CSS** – utility-first stylování, vlastní barevná paleta
- **Google Fonts** – Playfair Display (serif nadpisy), DM Sans (tělo textu)
- **Unsplash** – ukázkové fotografie interiéru

---

## 🎨 Design

Aplikace používá konzistentní teplou barevnou paletu inspirovanou kávou:

| Barva | Hex | Použití |
|---|---|---|
| Tmavě hnědá | `#1E0E05` | Pozadí (dark mode), primární tlačítka |
| Krémová | `#F8F5E9` | Pozadí (light mode), texty v dark mode |
| Zlatá | `#C8871A` | Akcenty, aktivní prvky, progress bar |
| Světle hnědá | `#3A2410` | Sekundární texty |

---

## 🚀 Spuštění

```bash
npm install
npm run dev
```

Aplikace nevyžaduje žádné API klíče ani backend — veškerá data jsou statická a rezervace je pouze simulovaná.

---

## 📍 Kontaktní údaje kavárny (fiktivní)

**The Sensory Gallery**
Gallery Square 12, Praha 1
+420 777 123 456

Otevřeno: Po–Pá 07:30–20:00 | So–Ne 09:00–21:00

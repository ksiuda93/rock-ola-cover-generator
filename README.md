# Rock-Ola Cover Generator

Generator okładek (title strips) do maszyny grającej.

## Użycie

Otwórz `rockola-generator.html` bezpośrednio w przeglądarce — nie wymaga serwera.

1. Wklej dane CSV lub wgraj plik `.csv`
2. Kliknij **Generuj okładki**
3. Kliknij **Drukuj**

## Format CSV

```
Title,SideA,SideB
ABBA,Fernando,Life
The Beatles,Hey Jude,Revolution
```

Opcjonalne kolumny: `Num` (własna numeracja slotu), `Info` (dodatkowy opis).

## Wymiary karty

**7,5 × 2,4 cm** — pasuje do standardowych slotów maszyny grającej.

Na jednej stronie A4 mieści się ok. 24 okładek (2 kolumny).

## Pliki

| Plik | Opis |
|------|------|
| `rockola-generator.html` | Generator — otwórz w przeglądarce |
| `Rockola_dane.ods` | Przykładowe dane (LibreOffice Calc) |
| `Rockola_TXT.odt` | Szablon okładki (LibreOffice Writer) |

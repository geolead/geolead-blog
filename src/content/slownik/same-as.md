---
term: "sameAs"
alternateName: "właściwość sameAs w Schema.org"
termCode: "SAME_AS"
description: "sameAs to pole w danych strukturalnych, które łączy stronę firmy z jej oficjalnymi profilami w innych serwisach. Co wpisać i jakie błędy widać w badaniu."
pubDate: 2026-11-12
keywords:
  - "sameAs"
  - "sameAs schema"
  - "sameAs co to"
  - "sameAs JSON-LD"
  - "sameAs Organization"
  - "dane strukturalne firmy"
---

**sameAs to właściwość słownika Schema.org, w której strona podaje adresy innych miejsc w sieci opisujących ten sam podmiot: tę samą firmę, osobę albo produkt.** W praktyce to lista linków do oficjalnych profili firmy, zapisana w danych strukturalnych [JSON-LD](/slownik/json-ld/). Użytkownik jej nie widzi. Wyszukiwarka odczytuje z niej, że strona, profil na LinkedIn i wpis w katalogu dotyczą jednej [encji](/slownik/encja/).

Google w dokumentacji danych strukturalnych dla organizacji opisuje sameAs jako adres strony w innym serwisie z dodatkowymi informacjami o organizacji i umieszcza je na liście właściwości zalecanych.

## Jak wygląda sameAs

Uproszczony przykład (firma i adresy fikcyjne):

```json
{
  "@context": "https://schema.org",
  "@type": "Organization",
  "name": "Przykładowa Firma Sp. z o.o.",
  "url": "https://example.com/",
  "sameAs": [
    "https://www.linkedin.com/company/example",
    "https://www.facebook.com/example",
    "https://www.youtube.com/@example"
  ]
}
```

Każdy adres na liście powinien prowadzić do strony, która opisuje dokładnie tę samą firmę, a nie branżę, kategorię czy osobę z zarządu.

## Co wpisać, a czego nie

| Wpisz | Nie wpisuj |
|---|---|
| oficjalny profil firmy na LinkedIn | prywatnego profilu właściciela w opisie firmy |
| oficjalne profile w mediach społecznościowych, które firma faktycznie prowadzi | porzuconych profili ze starą nazwą lub adresem |
| wpis firmy w katalogu branżowym | strony głównej katalogu albo listy kategorii |
| wpis w Wikidata lub Wikipedii, jeśli istnieje | artykułów, które tylko wspominają o firmie |
| profil firmy w mapach | innych podstron własnej witryny |

Zasada jest jedna: adres ma wskazywać ten sam podmiot. Kilka pewnych linków jest warte więcej niż długa lista przypadkowych.

## Co pokazało nasze badanie

W [badaniu 117 stron polskich firm](/badania/gotowosc-ai-2026/) z 17 października 2026 r. sprawdzaliśmy, czy opis firmy w danych strukturalnych zawiera powiązania sameAs z co najmniej dwoma profilami.

| Grupa | Strony z opisem firmy, ale bez sameAs (2+ profile) |
|---|---|
| Wszystkie branże | 52% |
| Kancelarie prawne | 67% |
| Kliniki | 61% |
| Software house'y | 40% |
| Producenci przemysłowi | 33% |

Odsetki dotyczą tylko stron, które w ogóle miały opis firmy w JSON-LD. A 36% wszystkich badanych stron takiego opisu nie miało. Kompletny opis firmy (nazwa, logo, adres lub telefon, powiązane profile) miało 8% stron.

## Ile sameAs naprawdę daje

Uczciwie: sameAs nie jest przełącznikiem widoczności. Google podaje, że dane strukturalne nie są wymagane do pojawienia się w funkcjach generatywnej AI, a w dokumentacji dla organizacji żadna właściwość nie jest obowiązkowa.

Wartość sameAs jest inna. Według Google opis organizacji pomaga wyszukiwarce zrozumieć dane firmy i odróżnić ją od innych podmiotów. To ma znaczenie, gdy kilka firm nosi podobną nazwę albo gdy jedna firma występuje w sieci pod kilkoma wariantami. Błędnie rozpoznana firma to cudze dane w odpowiedzi asystenta AI (patrz [Halucynacje AI](/slownik/halucynacje-ai/)).

Do tego samego celu służą inne zalecane pola opisu organizacji, m.in. `legalName`, `taxID`, `vatID`, `address` i `telephone`. sameAs działa najlepiej razem z nimi, a nie zamiast nich.

## Typowe błędy

1. Brak sameAs mimo poprawnego opisu firmy.
2. Linki do profili, które już nie istnieją albo zmieniły adres.
3. Inna lista sameAs w każdej wersji językowej strony.
4. Dane na profilach niezgodne ze stroną: inna nazwa, stary adres.
5. Link do profilu innej firmy o podobnej nazwie.

## FAQ

### Ile linków wpisać w sameAs?

Dokumentacja Google nie podaje liczby. Nasz Skaner gotowości AI uznaje opis za powiązany, gdy sameAs zawiera co najmniej dwa profile. Liczy się to, czy każdy adres prowadzi do tej samej firmy, nie długość listy.

### Czy sameAs poprawia pozycję w Google?

Google tego nie obiecuje. sameAs jest właściwością zalecaną w opisie organizacji i pomaga jednoznacznie rozpoznać firmę. Dane strukturalne nie są wymagane do pojawienia się w odpowiedziach AI Google.

### Jak sprawdzić, czy moja strona ma sameAs?

Bezpłatny [Skaner gotowości AI](/narzedzia/skaner-ai/) sprawdza opis firmy w JSON-LD, w tym powiązane profile. To, jak systemy AI opisują firmę w odpowiedziach, mierzy [Audyt Start za 990 zł netto](/blog/audyt-widocznosci-w-ai/).

Szerszy kontekst: [Knowledge Graph](/slownik/knowledge-graph/) i [E-E-A-T](/slownik/e-e-a-t/).

<script type="application/ld+json">
{
  "@context": "https://schema.org",
  "@type": "FAQPage",
  "@id": "https://geolead.pl/slownik/same-as/#faq",
  "inLanguage": "pl-PL",
  "mainEntity": [
    {
      "@type": "Question",
      "name": "Ile linków wpisać w sameAs?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "Dokumentacja Google nie podaje liczby. Skaner gotowości AI GeoLead uznaje opis za powiązany, gdy sameAs zawiera co najmniej dwa profile. Liczy się to, czy każdy adres prowadzi do tej samej firmy, nie długość listy."
      }
    },
    {
      "@type": "Question",
      "name": "Czy sameAs poprawia pozycję w Google?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "Google tego nie obiecuje. sameAs jest właściwością zalecaną w opisie organizacji i pomaga jednoznacznie rozpoznać firmę. Dane strukturalne nie są wymagane do pojawienia się w odpowiedziach AI Google."
      }
    },
    {
      "@type": "Question",
      "name": "Jak sprawdzić, czy moja strona ma sameAs?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "Bezpłatny Skaner gotowości AI GeoLead sprawdza opis firmy w JSON-LD, w tym powiązane profile. To, jak systemy AI opisują firmę w odpowiedziach, mierzy Audyt Start za 990 zł netto."
      }
    }
  ]
}
</script>

---
term: "llms.txt"
alternateName: "plik llms.txt"
termCode: "LLMS_TXT"
description: "llms.txt to plik w głównym katalogu strony z krótkim opisem serwisu i linkami dla modeli językowych. Co to jest, kto go czyta i czy warto go dodać."
pubDate: 2026-11-11
keywords:
  - "llms.txt"
  - "llms.txt co to"
  - "plik llms.txt"
  - "llms.txt generator"
  - "llms.txt a robots.txt"
---

**llms.txt to plik tekstowy w formacie Markdown, umieszczony w głównym katalogu strony (np. `przyklad.pl/llms.txt`), który w kilku akapitach opisuje serwis i wskazuje najważniejsze podstrony.** Ma ułatwić modelom językowym i agentom AI szybkie zrozumienie, czym zajmuje się firma, bez przechodzenia przez menu, skrypty i banery.

Format zaproponował Jeremy Howard (Answer.AI) we wrześniu 2024 r. Specyfikacja jest publiczna na llmstxt.org.

## Jak wygląda

```markdown
# Przykładowa Sp. z o.o.

> Producent pomp przemysłowych z Poznania. Dostawy w Polsce i UE.

## Oferta
- [Pompy wirowe](https://przyklad.pl/pompy-wirowe/): wydajność, materiały, zastosowania
- [Cennik i warunki](https://przyklad.pl/cennik/): ceny netto, terminy dostaw

## Firma
- [O nas](https://przyklad.pl/o-nas/): historia, certyfikaty, dane rejestrowe
```

Nagłówek H1 z nazwą, jedno zdanie streszczenia w cytacie, potem sekcje z listą linków i krótkim opisem każdego.

## llms.txt a robots.txt

| | robots.txt | llms.txt |
|---|---|---|
| Rola | pozwala lub zabrania botom wejść | podpowiada, co warto przeczytać |
| Status | standard, przestrzegany przez główne boty | propozycja, brak potwierdzonego użycia przez dużych dostawców |
| Skutek błędu | bot może nie wejść na stronę | brak skutku dla widoczności |

## Czy AI z niego korzysta? Uczciwa odpowiedź

Na dziś **nie ma publicznego potwierdzenia, że Google, OpenAI czy Anthropic używają llms.txt** przy wyszukiwaniu lub generowaniu odpowiedzi. Przedstawiciele Google wypowiadali się o pliku sceptycznie. Plik bywa natomiast czytany przez agentów i narzędzia, które pobierają stronę na prośbę użytkownika, oraz przez część narzędzi deweloperskich.

Dlatego traktujemy llms.txt jako tani dodatek, a nie dźwignię widoczności. Kosztuje godzinę pracy, nie szkodzi, a porządkuje opis firmy, który i tak warto mieć. Ważniejsze są treść widoczna w HTML, opis firmy w [JSON-LD](/slownik/json-ld/) i obecność w źródłach, które AI cytuje.

W [naszym badaniu 117 stron polskich firm](/badania/gotowosc-ai-2026/) plik llms.txt miało 20% stron, wśród software house'ów 43%.

## Co wpisać

1. Pełną nazwę firmy i jedno zdanie: co robi, dla kogo, gdzie.
2. Linki do stron usług lub grup produktów z jednym zdaniem konkretu (zakres, cena, parametry).
3. Cennik, kontakt, dane rejestrowe.
4. Własne badania, publikacje, materiały dla mediów.
5. Bez sloganów. Każde zdanie powinno dać się sprawdzić na stronie.

## FAQ

### Czy llms.txt zastępuje sitemap.xml?

Nie. Mapa witryny wymienia wszystkie adresy dla wyszukiwarek. llms.txt to krótki, ręcznie wybrany przegląd najważniejszych treści.

### Czy brak llms.txt obniża widoczność w ChatGPT?

Nie ma na to dowodów. Brak pliku to niewielka luka, nie przyczyna braku rekomendacji.

### Jak sprawdzić, czy moja strona ma llms.txt?

Wpisz adres `twojadomena.pl/llms.txt` w przeglądarce albo użyj bezpłatnego [Skanera AI](/narzedzia/skaner-ai/), który sprawdza plik razem z dostępem botów AI i danymi strukturalnymi.

Przykład z praktyki: [llms.txt GeoLead](https://geolead.pl/llms.txt). Szerszy kontekst: [Czym jest GEO](/blog/czym-jest-geo/).

<script type="application/ld+json">
{
  "@context": "https://schema.org",
  "@type": "FAQPage",
  "@id": "https://geolead.pl/slownik/llms-txt/#faq",
  "inLanguage": "pl-PL",
  "mainEntity": [
    {
      "@type": "Question",
      "name": "Czy llms.txt zastępuje sitemap.xml?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "Nie. Mapa witryny wymienia wszystkie adresy dla wyszukiwarek. llms.txt to krótki, ręcznie wybrany przegląd najważniejszych treści."
      }
    },
    {
      "@type": "Question",
      "name": "Czy brak llms.txt obniża widoczność w ChatGPT?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "Nie ma na to dowodów. Brak pliku to niewielka luka, nie przyczyna braku rekomendacji."
      }
    },
    {
      "@type": "Question",
      "name": "Jak sprawdzić, czy moja strona ma llms.txt?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "Wpisz adres twojadomena.pl/llms.txt w przeglądarce albo użyj bezpłatnego Skanera AI GeoLead, który sprawdza plik razem z dostępem botów AI i danymi strukturalnymi."
      }
    }
  ]
}
</script>

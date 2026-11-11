---
term: "JSON-LD"
alternateName: "dane strukturalne, Schema.org"
termCode: "JSON_LD"
description: "JSON-LD to format danych strukturalnych, którym strona opisuje maszynom fakty: kim jest firma, gdzie działa, co oferuje. Co wpisać i jakich błędów unikać."
pubDate: 2026-11-11
keywords:
  - "JSON-LD"
  - "dane strukturalne"
  - "schema.org"
  - "JSON-LD co to"
  - "schema Organization"
  - "dane strukturalne dla firmy"
---

**JSON-LD (JavaScript Object Notation for Linked Data) to format, w którym strona internetowa zapisuje fakty o sobie w postaci czytelnej dla maszyn.** Użytkownik go nie widzi. Wyszukiwarki i systemy AI odczytują z niego np. nazwę firmy, adres, telefon, logo, oferowane usługi i powiązane profile.

Słownik, którego się w nim używa, to Schema.org, wspólny projekt Google, Microsoftu, Yahoo i Yandex. Typy takie jak `Organization`, `LocalBusiness`, `Service`, `Product`, `Article` czy `FAQPage` pochodzą właśnie stąd. Google zaleca JSON-LD jako preferowany format danych strukturalnych.

## Jak to wygląda

Uproszczony opis firmy w kodzie strony:

```json
{
  "@context": "https://schema.org",
  "@type": "Organization",
  "name": "Przykładowa Sp. z o.o.",
  "url": "https://przyklad.pl/",
  "logo": "https://przyklad.pl/logo.png",
  "telephone": "+48 000 000 000",
  "address": { "@type": "PostalAddress", "addressLocality": "Poznań" },
  "sameAs": [
    "https://www.linkedin.com/company/przyklad",
    "https://www.wikidata.org/wiki/Q000000"
  ]
}
```

Pole `sameAs` mówi maszynie: „te profile to ta sama [encja](/slownik/encja/)”. To jeden z najprostszych sposobów, by połączyć stronę z [grafem wiedzy](/slownik/knowledge-graph/).

## Co daje JSON-LD w kontekście AI

- **Jednoznaczność.** Fakt zapisany jako `"telephone": "..."` nie wymaga zgadywania, który z pięciu numerów na stronie jest główny.
- **Spójność z innymi źródłami.** Wyszukiwarka porównuje dane ze strony z rejestrami, wizytówkami i profilami. Zgodność wzmacnia encję, rozbieżność ją osłabia.
- **Gotowe pary pytanie i odpowiedź.** `FAQPage` zawiera krótkie, samodzielne odpowiedzi, które dobrze nadają się na fragmenty dla systemów [RAG](/slownik/rag/).

Uczciwie: nie ma publicznego potwierdzenia, że ChatGPT czy Claude czytają JSON-LD bezpośrednio przy każdej odpowiedzi. Dane strukturalne działają głównie przez wyszukiwarki, z których te systemy korzystają.

## Najczęstsze błędy

Dane z [naszego badania 117 stron polskich firm](/badania/gotowosc-ai-2026/):

| Błąd | Udział stron |
|---|---|
| Brak jakichkolwiek danych JSON-LD | 25% |
| Brak opisu firmy (Organization lub LocalBusiness) | 36% |
| Wśród stron z opisem firmy: brak `sameAs` (2+ profile) | 52% |
| Wśród stron z opisem firmy: brak adresu lub telefonu | 49% |
| Kompletny opis firmy | tylko 8% |

Inne problemy, które widzimy w audytach: dane niezgodne z treścią strony (inna nazwa, stary adres), opis wstawiony tylko na stronie głównej, kilka sprzecznych bloków z różnych wtyczek, typ `Product` na stronie usługowej.

## FAQ

### Czy JSON-LD poprawia pozycję w Google?

Nie jest czynnikiem rankingowym sam w sobie. Pomaga wyszukiwarce zrozumieć stronę i może dawać wyniki rozszerzone. Dla GEO liczy się głównie jednoznaczny opis firmy.

### Jak sprawdzić dane strukturalne na mojej stronie?

Narzędziem Google „Test wyników z elementami rozszerzonymi”, walidatorem validator.schema.org albo bezpłatnym [Skanerem AI GeoLead](/narzedzia/skaner-ai/), który ocenia też kompletność opisu firmy.

### Czy wtyczka SEO wystarczy?

Często generuje poprawną podstawę, ale bez telefonu, adresu i `sameAs`, a czasem z błędnym typem firmy. Warto sprawdzić wynik i uzupełnić brakujące pola.

Szerszy kontekst: [GEO vs SEO](/blog/geo-vs-seo/) i [Audyt Start za 990 zł netto](/blog/audyt-widocznosci-w-ai/).

<script type="application/ld+json">
{
  "@context": "https://schema.org",
  "@type": "FAQPage",
  "@id": "https://geolead.pl/slownik/json-ld/#faq",
  "inLanguage": "pl-PL",
  "mainEntity": [
    {
      "@type": "Question",
      "name": "Czy JSON-LD poprawia pozycję w Google?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "Nie jest czynnikiem rankingowym sam w sobie. Pomaga wyszukiwarce zrozumieć stronę i może dawać wyniki rozszerzone. Dla GEO liczy się głównie jednoznaczny opis firmy."
      }
    },
    {
      "@type": "Question",
      "name": "Jak sprawdzić dane strukturalne na mojej stronie?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "Narzędziem Google „Test wyników z elementami rozszerzonymi”, walidatorem validator.schema.org albo bezpłatnym Skanerem AI GeoLead, który ocenia też kompletność opisu firmy."
      }
    },
    {
      "@type": "Question",
      "name": "Czy wtyczka SEO wystarczy?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "Często generuje poprawną podstawę, ale bez telefonu, adresu i sameAs, a czasem z błędnym typem firmy. Warto sprawdzić wynik i uzupełnić brakujące pola."
      }
    }
  ]
}
</script>

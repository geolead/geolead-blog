---
term: "Encja"
alternateName: "Entity, byt w grafie wiedzy"
termCode: "ENTITY"
description: "Encja to jednoznacznie rozpoznawalny obiekt: firma, osoba, miejsce, produkt. Wyszukiwarki i AI łączą fakty z encją, nie ze słowem. Co to znaczy dla firm."
pubDate: 2026-11-11
keywords:
  - "encja"
  - "encje"
  - "encja co to"
  - "encja po angielsku"
  - "entity SEO"
  - "encja w grafie wiedzy"
---

**Encja (ang. entity) to pojedynczy, jednoznacznie rozpoznawalny obiekt: firma, osoba, miejsce, produkt, wydarzenie albo pojęcie.** Encja to nie słowo, tylko „rzecz”, do której słowa się odnoszą. „Apple” w zdaniu o iPhonie i „apple” w przepisie na szarlotkę to ten sam ciąg liter, ale dwie różne encje.

Po angielsku: *entity*. W krzyżówkach encję opisuje się czasem jako „pojedynczy, unikalny obiekt w grafie wiedzy”.

## Jak wyszukiwarki i AI używają encji

Google od 2012 r. buduje [Knowledge Graph](/slownik/knowledge-graph/), czyli bazę faktów zapisanych przy encjach, a nie przy słowach kluczowych. Każda encja ma tam identyfikator. W otwartym grafie Wikidata wygląda on tak: Q + liczba.

Dzięki temu wyszukiwarka wie, że „Kancelaria Nowak” z Poznania i „Kancelaria Nowak” z Gdańska to dwie różne firmy. Wie też, że „Nowak i Wspólnicy” oraz „Kancelaria Nowak” mogą być tą samą firmą, jeśli łączą je ten sam adres, NIP i profile.

Systemy AI z wyszukiwaniem (Google AI Overviews, AI Mode, Copilot, ChatGPT z wyszukiwaniem) działają na tej samej infrastrukturze. [Model językowy](/slownik/llm/) dostaje fragmenty stron i musi zdecydować, której firmy dotyczą. Jeśli Twoja firma jest słabo rozpoznawalną encją, model może pomylić ją z inną, a odpowiedź będzie zawierać cudze dane (patrz [Halucynacje AI](/slownik/halucynacje-ai/)).

## Encja firmy: z czego się składa

| Element | Przykład | Gdzie zapisać |
|---|---|---|
| Nazwa (i jej warianty) | pełna nazwa rejestrowa, nazwa handlowa | strona, rejestr, profile |
| Identyfikatory | NIP, REGON, KRS, identyfikator Wikidata | strona (stopka), dane strukturalne |
| Lokalizacja | adres siedziby, obszar działania | strona, Google Business Profile, Bing Places |
| Relacje | właściciel, marki, oddziały, branża | strona „O nas”, dane strukturalne |
| Oficjalne profile | LinkedIn, Facebook, katalogi branżowe | pole `sameAs` w [JSON-LD](/slownik/json-ld/) |

## Typowy problem: jedna firma, kilka encji

W audytach często widzimy firmy, które dla maszyn wyglądają jak kilka różnych bytów: dwie domeny, trzy warianty nazwy, cztery numery telefonu, dwa profile na Facebooku. Każde źródło opisuje „trochę inną” firmę. Wyszukiwarka nie ma pewności, które fakty połączyć, więc łączy je źle albo wcale.

W [naszym badaniu 117 stron polskich firm](/badania/gotowosc-ai-2026/) 36% stron nie opisywało firmy jako encji w danych strukturalnych, a tylko 8% miało kompletny opis (nazwa, logo, adres lub telefon, powiązane profile).

## Jak wzmocnić encję firmy

1. Jedna nazwa, jeden adres, jeden telefon, wszędzie identyczne.
2. Opis Organization lub LocalBusiness w JSON-LD z polem `sameAs`.
3. Strona „O nas” z faktami: kto, od kiedy, gdzie, co robi, dla kogo.
4. Wzmianki w niezależnych źródłach, które używają tej samej nazwy.
5. W treściach nazwa firmy zamiast „nasza firma”, żeby fragment cytowany przez AI był przypisany właściwej encji (patrz [Entity Salience](/slownik/entity-salience/)).

## FAQ

### Jak jest encja po angielsku?

Entity. W SEO i GEO używa się też określeń „entity SEO” i „named entity” (encja nazwana, np. nazwa firmy lub osoby).

### Czy encja to to samo co słowo kluczowe?

Nie. Słowo kluczowe to ciąg znaków wpisany przez użytkownika. Encja to obiekt, którego ten ciąg dotyczy. Różne słowa mogą wskazywać tę samą encję, a to samo słowo różne encje.

### Skąd wiadomo, czy moja firma jest rozpoznawana jako encja?

Pośrednie sygnały to panel wiedzy w Google, wpis w Wikidata i poprawne odpowiedzi asystentów AI na pytania o firmę. Bezpłatny [Skaner AI](/narzedzia/skaner-ai/) sprawdza dane strukturalne na stronie. To, jak systemy AI opisują firmę w odpowiedziach, mierzy [Audyt Start za 990 zł netto](/blog/audyt-widocznosci-w-ai/).

Szerszy kontekst: [Czym jest GEO](/blog/czym-jest-geo/) i [Jak ChatGPT decyduje, którą firmę polecić](/blog/jak-chatgpt-wybiera-firmy/).

<script type="application/ld+json">
{
  "@context": "https://schema.org",
  "@type": "FAQPage",
  "@id": "https://geolead.pl/slownik/encja/#faq",
  "inLanguage": "pl-PL",
  "mainEntity": [
    {
      "@type": "Question",
      "name": "Jak jest encja po angielsku?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "Entity. W SEO i GEO używa się też określeń „entity SEO” i „named entity” (encja nazwana, np. nazwa firmy lub osoby)."
      }
    },
    {
      "@type": "Question",
      "name": "Czy encja to to samo co słowo kluczowe?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "Nie. Słowo kluczowe to ciąg znaków wpisany przez użytkownika. Encja to obiekt, którego ten ciąg dotyczy. Różne słowa mogą wskazywać tę samą encję, a to samo słowo różne encje."
      }
    },
    {
      "@type": "Question",
      "name": "Skąd wiadomo, czy moja firma jest rozpoznawana jako encja?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "Pośrednie sygnały to panel wiedzy w Google, wpis w Wikidata i poprawne odpowiedzi asystentów AI na pytania o firmę. Bezpłatny Skaner AI sprawdza dane strukturalne na stronie. To, jak systemy AI opisują firmę w odpowiedziach, mierzy Audyt Start za 990 zł netto."
      }
    }
  ]
}
</script>

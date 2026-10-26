---
term: "Entity Salience"
alternateName: "Istotność encji"
termCode: "ENTITY_SALIENCE"
description: "Entity Salience to miara tego, jak centralne miejsce zajmuje encja (firma, osoba, produkt) w tekście. W GEO: czy marka jest tematem treści o swojej usłudze."
pubDate: 2026-06-18
updatedDate: 2026-10-26
keywords:
  - "Entity Salience"
  - "istotność encji"
  - "salience score"
  - "encja marki"
  - "Entity Salience GEO"
---

**Entity Salience (istotność encji) to miara tego, jak centralne miejsce zajmuje dana encja w tekście: czy jest głównym tematem, czy tylko pojawia się w tle.** Encją może być firma, osoba, produkt, miejsce albo pojęcie. Termin pochodzi z przetwarzania języka naturalnego (NLP). Google Cloud Natural Language API zwraca dla każdej rozpoznanej encji wynik salience od 0 do 1: im bliżej 1, tym bardziej tekst jest „o niej”.

W GEO używamy tego pojęcia w szerszym sensie: **czy w tekstach o Twojej usłudze to Twoja marka jest tematem, czy tylko jednym z wielu nazw na liście.** To pojęcie pomocnicze, które pomaga projektować treści. Nie jest wskaźnikiem, który da się wiarygodnie zmierzyć dla „całego internetu” ani dla modelu AI.

## Przykład: ten sam fakt, różna istotność

Porównaj dwa zdania z hipotetycznej strony kancelarii:

1. *„Oferujemy kompleksowe wsparcie prawne dla firm. Nasz zespół doradza w wielu obszarach.”*
2. *„Kancelaria Przykład Legal z Poznania prowadzi spory z zakresu prawa pracy dla pracodawców zatrudniających od 50 do 500 osób.”*

W pierwszym zdaniu nazwa firmy w ogóle nie pada, a usługa jest ogólnikowa. Program, który analizuje tekst, nie ma z czego zbudować powiązania „ta firma = ta usługa”. W drugim zdaniu encja (kancelaria), usługa (spory z prawa pracy), miasto i grupa klientów są nazwane wprost i w jednym miejscu.

Dla systemów AI, które wycinają ze strony krótkie fragmenty i wklejają je do odpowiedzi (patrz [RAG](/slownik/rag/)), ta różnica jest praktyczna. Fragment bez nazwy firmy nie przypisze jej żadnej kompetencji.

## Co podnosi istotność encji w treści

- **Nazwa firmy w zdaniach, które opisują usługę.** Nie „nasz zespół”, tylko pełna nazwa przynajmniej w kluczowych akapitach.
- **Jedna usługa na stronę.** Strona o pięciu usługach rozmywa każdą z nich.
- **Konkret zamiast przymiotników:** miasto, branża klientów, zakres, liczby. Konkretne fakty łatwiej powiązać z encją niż „kompleksowe rozwiązania”.
- **Spójny opis w danych strukturalnych.** JSON-LD typu Organization lub LocalBusiness mówi maszynie wprost, czym jest firma. W naszym badaniu z października 2026 r. [36% ze 117 stron polskich firm](/badania/gotowosc-ai-2026/) nie miało takiego opisu, a u producentów przemysłowych 69%.
- **Te same fakty w źródłach zewnętrznych:** rejestry, katalogi branżowe, artykuły. Spójność między źródłami wzmacnia pozycję firmy w [Knowledge Graph](/slownik/knowledge-graph/).

## Czego Entity Salience nie mówi

Wysoka istotność encji na Twojej stronie nie gwarantuje, że [model językowy](/slownik/llm/) poleci firmę. Model składa odpowiedź z wielu źródeł, a Twoja strona jest tylko jednym z nich. Dlatego w pracy dla klientów mierzymy to, co da się sprawdzić: czy marka pojawia się w odpowiedziach na konkretne pytania zakupowe, w jakim kontekście i obok kogo. Opis pomiaru jest w [metodologii](/metodologia/).

## Jak sprawdzić to samodzielnie

1. Weź tekst strony z opisem głównej usługi.
2. Wklej go do wersji demonstracyjnej Google Cloud Natural Language API (analiza encji) albo poproś model AI, żeby wymienił główne encje tekstu w kolejności ważności.
3. Jeśli Twojej firmy nie ma na pierwszym miejscu, tekst jest „o usłudze ogólnie”, a nie o Tobie.

Wynik takiego testu dotyczy jednego tekstu. Jest wskazówką do redakcji, nie oceną widoczności w AI.

## FAQ

### Czy Entity Salience to to samo co Domain Authority?

Nie. Domain Authority to wskaźnik narzędzi SEO oparty na linkach do domeny. Entity Salience dotyczy tego, jak wyraźnie tekst mówi o danej encji. To inne zjawiska i nie należy ich przeliczać jedno na drugie.

### Czy da się zmierzyć Entity Salience marki w ChatGPT?

Nie bezpośrednio. Modele nie udostępniają takiego wskaźnika. Można natomiast mierzyć skutek: jak często i w jakim kontekście marka pojawia się w odpowiedziach na ustalony zestaw pytań.

### Od czego zacząć?

Od strony głównej i strony najważniejszej usługi: nazwa firmy, usługa, miasto i grupa klientów w pierwszym akapicie oraz kompletny opis firmy w JSON-LD. Stan techniczny strony sprawdzisz bezpłatnie [Skanerem gotowości AI](/narzedzia/skaner-ai/), a to, co odpowiadają modele, pokazuje [Audyt Start](/blog/audyt-widocznosci-w-ai/).

Szerszy kontekst: [Czym jest GEO](/blog/czym-jest-geo/) i [Jak ChatGPT decyduje, którą firmę polecić](/blog/jak-chatgpt-wybiera-firmy/).

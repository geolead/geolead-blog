---
term: "LLM"
alternateName: "Large Language Model, duży model językowy"
termCode: "LLM"
description: "LLM to duży model językowy, np. ChatGPT, Claude, Gemini. Odpowiada z wiedzy z treningu albo z wyników wyszukiwania, więc firma może wpływać na odpowiedzi."
pubDate: 2026-08-09
updatedDate: 2026-10-26
keywords:
  - "LLM"
  - "Large Language Model"
  - "duży model językowy"
  - "co to jest LLM"
  - "jak działa ChatGPT"
---

**LLM (Large Language Model, duży model językowy) to model sztucznej inteligencji wytrenowany na bardzo dużych zbiorach tekstu, który na podstawie pytania generuje odpowiedź słowo po słowie.** Na LLM-ach działają ChatGPT (OpenAI), Claude (Anthropic), Gemini (Google) i wiele innych asystentów. Perplexity to wyszukiwarka, która korzysta z modeli różnych dostawców.

Dla firmy ważne jest jedno: coraz więcej klientów zadaje takim asystentom pytania zakupowe („kogo polecasz do…”, „ile kosztuje…”) i dostaje gotową odpowiedź z nazwami firm, zamiast listy linków.

## Dwa źródła wiedzy modelu

To rozróżnienie wyjaśnia, co firma może zmienić i jak szybko.

| | Wiedza z treningu | Wyszukiwanie w czasie odpowiedzi |
|---|---|---|
| Skąd | teksty, na których model był trenowany | strony pobrane z sieci w chwili pytania ([RAG](/slownik/rag/)) |
| Aktualność | do daty odcięcia danych treningowych | bieżąca |
| Jak szybko reaguje na zmiany | miesiące, z nowymi wersjami modeli | dni lub tygodnie, po ponownym zaindeksowaniu stron |
| Co możesz zrobić | obecność w źródłach, które trafiają do treningu: media, encyklopedie, branżowe portale | czytelna strona, dane strukturalne, wzmianki w stronach, które wyszukiwarki pokazują wysoko |

Coraz więcej odpowiedzi o firmach powstaje w drugim trybie. Dlatego widoczność w wyszukiwarkach i w AI nie są od siebie niezależne: model z wyszukiwaniem najpierw musi znaleźć stronę, zanim ją zacytuje.

## Dlaczego odpowiedzi się zmieniają

LLM generuje tekst z elementem losowości. To samo pytanie zadane kilka razy może dać różne listy firm i różne źródła. W naszym pomiarze własnej marki z października 2026 r. (30 pytań, 4 systemy AI, 166 odpowiedzi) GeoLead pojawił się średnio w 14% odpowiedzi, ale w pytaniach typu „kto w Polsce robi optymalizację pod wyszukiwarki AI” w 50%. Pojedynczy zrzut ekranu nie jest więc pomiarem. Rzetelny pomiar wymaga stałego zestawu pytań, sesji bez historii i powtórzeń. Opisujemy to w [metodologii](/metodologia/).

## Co LLM potrzebuje, żeby polecić firmę

- **Rozpoznać firmę jako konkretną encję**, a nie ogólne słowo. Pomaga w tym spójny opis firmy w danych strukturalnych i w [Knowledge Graph](/slownik/knowledge-graph/).
- **Znaleźć fragment tekstu, który łączy firmę z usługą**, najlepiej z nazwą firmy, miastem i zakresem w jednym akapicie (patrz [Entity Salience](/slownik/entity-salience/)).
- **Zobaczyć potwierdzenie z zewnątrz.** W pytaniach typu „najlepsza firma w…” modele często przepisują zestawienia i rankingi stron trzecich.
- **Mieć aktualne fakty.** Ceny, godziny i oferta z nieaktualnych źródeł to typowe źródło [halucynacji AI](/slownik/halucynacje-ai/).

## FAQ

### Czy ChatGPT, Claude i Gemini odpowiadają tak samo?

Nie. Różnią się danymi treningowymi, sposobem wyszukiwania i doborem źródeł. Firma może być polecana w jednym systemie i nieobecna w drugim, dlatego mierzymy każdy osobno.

### Czy można zapłacić za miejsce w odpowiedzi LLM?

Treści samej odpowiedzi nie da się kupić. Jeśli asystent wyświetla reklamy, są one oznaczone i oddzielone od odpowiedzi. Wpływ na to, co model mówi o firmie, daje praca nad źródłami, z których korzysta.

### Jak sprawdzić, co LLM mówi o mojej firmie?

Samodzielnie: [Generator pytań zakupowych](/narzedzia/pytania-zakupowe/) przygotuje listę pytań dla Twojej branży. Wklej je do kilku asystentów w czacie bez historii. Z dowodami i analizą źródeł: [Audyt Start za 990 zł netto](/blog/audyt-widocznosci-w-ai/), 20 pytań w 4 systemach AI.

Szerszy kontekst: [Jak ChatGPT decyduje, którą firmę polecić](/blog/jak-chatgpt-wybiera-firmy/) i [Czym jest GEO](/blog/czym-jest-geo/).

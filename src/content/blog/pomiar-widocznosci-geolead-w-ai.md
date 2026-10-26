---
title: "Pomiar widoczności w AI na własnej marce: 3 tygodnie danych GeoLead"
description: "Mierzymy, czy AI poleca GeoLead: 166 odpowiedzi w 4 systemach, 14% wzmianek, 50% w pytaniach o agencję. Wyniki, błędy pomiaru i co zmieniliśmy na stronie."
pubDate: 2026-10-26
pillar: "edukacja"
funnel: "mofu"
keywords:
  - "pomiar widoczności w AI"
  - "jak zmierzyć widoczność marki w ChatGPT"
  - "case study GEO"
  - "widoczność w Perplexity"
  - "share of voice AI"
imageAlt: "Pomiar widoczności GeoLead w odpowiedziach AI"
relatedTerms:
  - "llm"
  - "rag"
  - "entity-salience"
  - "knowledge-graph"
---

**Agencja, która obiecuje widoczność w AI, powinna umieć pokazać własną.** Dlatego na marce GeoLead stosujemy ten sam protokół, który proponujemy klientom: stały zestaw pytań, sesje bez historii, zapis odpowiedzi i źródeł z datą. Poniżej wyniki z trzech tygodni października 2026 r., razem z błędami, które popełniliśmy po drodze.

To nie jest case study klienta. To pomiar marki, która nie ma budżetu reklamowego i istnieje w AI wyłącznie dzięki działaniom GEO. Liczby są małe, a próba krótka. Traktuj je jako przykład metody, nie jako obietnicę wyniku.

## Trzy pomiary, trzy metody

| Data | Metoda | Zakres |
|---|---|---|
| 3.10.2026 | ręcznie | 12 pytań w Perplexity i Google AI Mode |
| 12-13.10.2026 | ręcznie | te same pytania w ChatGPT (czat tymczasowy, bez pamięci) |
| 14-17.10.2026 | automatycznie (narzędzie do monitoringu) | 30 pytań po polsku × ChatGPT, Gemini, Google AI Overviews, AI Mode; 166 odpowiedzi |

Pytania dzielimy na **brandowe** (z nazwą GeoLead, np. „co to jest GeoLead.pl”) i **niebrandowe** (bez nazwy, np. „kto w Polsce robi optymalizację pod wyszukiwarki AI”). Tylko te drugie mówią coś o tym, czy AI poleca firmę osobie, która jej nie zna.

## Wyniki

### Pomiar ręczny: 9 pytań niebrandowych

| System | GeoLead wymieniony | Pytania ogólne („najlepsza agencja GEO”) | Pytania branżowe (kliniki, kancelarie, przemysł) |
|---|---|---|---|
| Perplexity (3.10) | 3/9 | 1/6 | 2/3 |
| Google AI Mode (3.10) | 1/9 | 0/6 | 1/3 |
| ChatGPT (12.10) | 3/9 | 0/6 | 3/3 |

W pytaniach brandowych wszystkie systemy rozpoznały firmę poprawnie, bez pomyłki z firmami o podobnej nazwie.

### Monitoring automatyczny: 30 pytań, 166 odpowiedzi

| Temat pytań | Odpowiedzi | Wzmianki GeoLead | Udział |
|---|---|---|---|
| Agencja GEO w Polsce | 35 | 12 | 34% |
| Widoczność firmy w AI | 35 | 5 | 15% |
| Koszt i wybór dostawcy | 32 | 3 | 9% |
| Audyt widoczności w AI | 30 | 3 | 9% |
| GEO dla branż | 34 | 1 | 3% |
| **Razem** | **166** | **24** | **~14%** |

W dwóch pytaniach, „kto w Polsce robi optymalizację pod wyszukiwarki AI” i „jaka agencja w Polsce zajmuje się pozycjonowaniem w ChatGPT”, GeoLead pojawił się w połowie odpowiedzi, na pierwszym miejscu. W 16 z 30 pytań nie pojawił się ani razu. Wśród sześciu agencji, które śledziliśmy, udział GeoLead we wzmiankach wyniósł 40,7%.

## Pięć wniosków

**1. Pytania ogólne wygrywają rankingi stron trzecich.** Na pytania typu „najlepsza agencja GEO w Polsce” modele odpowiadały, przepisując zestawienia z portali i blogów branżowych. Jeśli firmy nie ma w tych zestawieniach, nie pomoże jej nawet najlepsza własna strona. Dlatego praca nad źródłami zewnętrznymi jest równie ważna jak praca nad stroną.

**2. Treść może zostać użyta, a marka pominięta.** W jednej odpowiedzi Google AI Mode o agencję GEO dla kancelarii nasz artykuł był na liście źródeł, ale nazwa GeoLead nie padła w rekomendacji. Model wziął wiedzę, nie wziął marki. To sygnał, że w tekstach nazwa firmy musi stać obok kompetencji (patrz [Entity Salience](/slownik/entity-salience/)).

**3. Niesprawdzalne twierdzenia wracają jak bumerang.** Na stronie głównej mieliśmy wtedy kafelek „3× więcej rekomendacji AI”. ChatGPT zacytował go w odpowiedzi o GeoLead i jednocześnie podważył, bo nie było za nim żadnego źródła. Usunęliśmy go. Każda liczba na stronie musi mieć źródło, bo model je sprawdza z innymi źródłami.

**4. Pamięć konta unieważnia pomiar.** Pierwszy pomiar w ChatGPT uznaliśmy za nieważny: mimo czatu tymczasowego odpowiedzi były dopasowane do wcześniejszych rozmów na koncie. Powtórzyliśmy go w czystej sesji. Bez tego wynik byłby zawyżony albo po prostu fałszywy.

**5. Odpowiedzi się zmieniają, więc liczy się seria.** To samo pytanie w tym samym systemie dawało różne listy firm w kolejnych powtórzeniach. Pojedynczy zrzut ekranu nie jest pomiarem. Mierzymy w powtórzeniach i porównujemy ten sam zestaw pytań w czasie (patrz [LLM](/slownik/llm/)).

## Co zmieniliśmy po pomiarach

| Kiedy | Zmiana | Dlaczego |
|---|---|---|
| 11.10 | publiczny [cennik GEO](/blog/ile-kosztuje-geo/) | modele pisały „brak cennika publicznego” |
| 12-13.10 | dane firmy w stopce i polityce prywatności, usunięte niesprawdzalne twierdzenia | modele wskazywały brak danych o firmie i podważały liczby bez źródła |
| 14.10 | strona [Audytu Start](/blog/audyt-widocznosci-w-ai/) z ceną stałą | na pytania o audyt modele cytowały wyłącznie strony z konkretną ceną |
| 17.10 | [badanie 120 stron polskich firm](/badania/gotowosc-ai-2026/) z danymi w otwartym repozytorium | własne dane to źródło, które inni mogą cytować |
| 26.10 | rozbudowane hasła słownika, strona dla producentów przemysłowych | luki w pytaniach branżowych i hasła niezaindeksowane w Google |

Efekt tych zmian zmierzymy na tym samym zestawie pytań i dopiszemy go do tego artykułu jako aktualizację, także jeśli wynik będzie słabszy.

## Jak zrobić taki pomiar dla swojej firmy

1. Spisz 20-30 pytań, które zadają Twoi klienci, z podziałem na brandowe i niebrandowe. Pomoże [Generator pytań zakupowych](/narzedzia/pytania-zakupowe/).
2. Zadaj je w kilku systemach, w sesjach bez historii i bez zalogowanego konta albo w trybie tymczasowym.
3. Zapisuj pełną odpowiedź, listę źródeł i datę. Odróżniaj wzmiankę od rekomendacji.
4. Powtarzaj pomiar na tym samym zestawie pytań. Zmieniaj pytania tylko świadomie i z adnotacją.

Pełny protokół jest w [metodologii](/metodologia/). Jeśli wolisz gotowy wynik z analizą źródeł i konkurentów, to właśnie robi [Audyt Start za 990 zł netto](/blog/audyt-widocznosci-w-ai/).

<div class="article-cta glass">
<h3>Zmierz, czy AI poleca Twoją firmę</h3>
<p>Audyt Start: 20 pytań zakupowych w ChatGPT, Gemini, Perplexity i Google AI Overviews, lista konkurentów i źródeł, raport w 5 dni roboczych. 990 zł netto.</p>
<a href="/blog/audyt-widocznosci-w-ai/" class="btn-nav" style="font-size:0.9rem;padding:0.7rem 1.6rem">Zamów Audyt Start</a>
</div>

<div class="related">
<h4>Czytaj dalej</h4>
<ul>
<li><a href="/metodologia/">Metodologia pomiaru GeoLead</a></li>
<li><a href="/badania/gotowosc-ai-2026/">Badanie: gotowość polskich firm na wyszukiwanie w AI (2026)</a></li>
<li><a href="/blog/jak-chatgpt-wybiera-firmy/">Jak ChatGPT decyduje, którą firmę polecić</a></li>
<li><a href="/blog/audyt-widocznosci-w-ai/">Audyt widoczności w AI: Audyt Start za 990 zł netto</a></li>
<li><a href="/slownik/llm/">LLM (Large Language Model): słownik GEO</a></li>
</ul>
</div>

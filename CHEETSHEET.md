# Cheetsheet

Cheetsheet dla leniwych:

## <img src="public/github.svg" style="width:35px" className="logo" alt="gh logo" /> GitHub

Dodaj wszystko do kolejki do commitowania

```
git add .
```

Dodaj tylko konkretny plik do kolejki commitowania

```
git add <sciezka do pliku>
```

Commituj:

```
git commit -m "<nazwa commitu>"
```

Anuluj wszystkie zmiany do ostatniego commita:

```
git stash
```

Pushnij lokalne commity do GitHuba:

```
git push
```

Stwórz brancha:

```
git branch <nazwa brancha>
```

Przełącz się na brancha

```
git checkout <nazwa brancha>
```

Zaciągnij wszystkie aktualne zmiany w plikach (nie pliki) z githuba

```
git fetch
```

Pobierz aktualną wersję maina:

```
git pull origin main
```

## <img src="public/react.svg" className="logo" style="width:35px" alt="React logo" /> React

## Podstawowe hooki

```
const [myVariable, setMyVariable] = useState(first variable value)
```

```
useEffect(callback function, dependency array)
```

## Jak nazywać zmienne? Przyjęte nazewnictwo (piszemy camelCasem)

Wartości przy korzystaniu z `useState` nazywamy:

```
[variable, setVariable]
```

Funkcje które odpowiadają za obsługę np. wciśnięcia guzika:

```
handleAction (np handleButtonClick)
```

Zmienne boolowskie:

```
isLoading, isClick...
```

## Jak nazywać pliki?

Pliki komponentów nazywamy wielką literą, mają przyjmować nazwę defaultowej exportowanej funkcji. Przykład:

```
App.jsx ma w sobie funkcję App, i to ona jest defaultowym exportem
```

Pliki `scss` nazywamy tak samo jak piliki `jsx`, tylko z innym rozszerzeniem, trzymamy je w tym samym katalogu co pliki `jsx`.

## Jak katalogować pliki?

Każdy komponent powinien mieć swój folder. Jeśli jakieś komponenty są podobnej kategorii to trzymamy je w osobnym nadfolderze, przykład:

```
src/components:
    src/components/admin:
        admin-panel:
            AdminPanel.jsx
            AdminPanel.scss
        admin-navbar:
            AdminNavbar.jsx
            AdminNavbar.scss
        admin-button:
            AdminButton.jsx
            AdminButton.scss
    src/components/main-page:
        MainPage.jsx
        MainPage.scss
```

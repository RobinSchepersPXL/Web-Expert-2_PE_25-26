# Web-Expert-2_PE_25-26
# Route One – Pokémon Nuzlocke Companion

## Belangrijk

De finale versie van dit project bevindt zich op de branch **npm-instal**.

GitHub Repository:

https://github.com/RobinSchepersPXL/Web-Expert-2_PE_25-26/tree/npm-instal

Controleer voor het uitvoeren van de applicatie of de branch **npm-instal** geselecteerd is. Deze branch bevat de meest recente versie van het project inclusief authenticatie, Duplicate Clause Helper, animaties, splash screen, app icon en alle finale UI-aanpassingen.

---

# Installatie-instructies

## Vereisten

Voor het uitvoeren van de applicatie zijn de volgende tools vereist:

* Node.js
* npm
* Git
* Expo CLI
* Expo Go (Android/iOS) of een emulator

## Installatie

Clone de repository:

```bash
git clone https://github.com/RobinSchepersPXL/Web-Expert-2_PE_25-26.git
```

Ga naar de projectmap:

```bash
cd Web-Expert-2_PE_25-26
```

Controleer of je je bevindt op de branch **npm-instal**.

Ga vervolgens naar de applicatiemap:

```bash
cd RouteOne
```

Installeer alle dependencies:

```bash
npm install
```

Start de applicatie:

```bash
npx expo start
```

Open vervolgens de applicatie via Expo Go of een emulator.

---

# API-documentatie

## PokéAPI

De applicatie maakt gebruik van de openbare PokéAPI voor het ophalen van Pokémongegevens.

Documentatie:

https://pokeapi.co/docs/v2

### Gebruikte endpoint

```http
GET https://pokeapi.co/api/v2/pokemon/{pokemon}
```

### Voorbeeld

```http
GET https://pokeapi.co/api/v2/pokemon/pikachu
```

### Opgehaalde gegevens

* Pokémon naam
* Pokémon ID
* Pokémon sprite
* Pokémon types

---

# Overzicht van de architectuur

De applicatie werd ontwikkeld met React Native en Expo.

## Navigatiestructuur

### Stack Navigation

Wordt gebruikt voor schermen die een vaste volgorde volgen:

* LoginScreen
* RunListScreen
* RouteDetailScreen
* CapDetailScreen

### Drawer Navigation

Wordt gebruikt voor snelle navigatie tussen de belangrijkste onderdelen van de applicatie:

* Routes
* Level Caps
* Box
* Stats
* About
* Settings

## Dataopslag

### AsyncStorage

Wordt gebruikt voor:

* Encounters
* Starter keuze
* Defeated Bosses
* Run statistieken

### SecureStore

Wordt gebruikt voor:

* Gebruikersnaam
* Wachtwoord
* Login sessie

---

# Geïmplementeerde functies

## Authenticatie

* Registreren van een account
* Inloggen
* Uitloggen
* Veilige opslag van gebruikersgegevens via SecureStore

## Nuzlocke Tracking

* Encounter registreren per route
* Pokémon status beheren
* Caught status
* Dead status
* Failed encounter status

## Duplicate Clause Helper

* Controleert of een Pokémon reeds gevangen werd tijdens de run
* Geeft een melding:

  * ✓ Already owned
  * ✗ Not owned

## Level Caps

* Overzicht van gym leaders
* Elite Four battles
* Champion battle
* Level cap informatie

## Box Systeem

* Overzicht van gevangen Pokémon
* Graveyard voor overleden Pokémon
* Failed encounter overzicht

## Statistieken

* Gekozen starter
* Aantal gevangen Pokémon
* Aantal overleden Pokémon
* Voltooide routes
* Verslagen gyms
* Huidige level cap

## API Integratie

* Ophalen van Pokémongegevens via PokéAPI
* Automatische sprite weergave

## Extra Functionaliteiten

* Native Share API
* Responsive interface
* Splash screen
* Custom app icon
* React Native Reanimated animaties

---

# Bekende problemen / beperkingen

* Momenteel ondersteunt de applicatie enkel Pokémon FireRed.
* Runs worden lokaal opgeslagen en niet gesynchroniseerd via een online databank.
* Er kan slechts één account tegelijk gebruikt worden op een toestel.
* Een internetverbinding is vereist voor het ophalen van Pokémongegevens die niet lokaal beschikbaar zijn.
* De Load Run functionaliteit is nog niet geïmplementeerd.

---

# Toekomstige verbeteringen

* Ondersteuning voor Pokémon Emerald
* Ondersteuning voor Pokémon Platinum
* Ondersteuning voor Pokémon HeartGold
* Cloud synchronisatie zodat runs online opgeslagen worden en op meerdere toestellen beschikbaar zijn
* Team Builder
* Zoekfunctie binnen de Box
* Exporteren van runs
* Uitgebreidere Duplicate Clause ondersteuning op basis van volledige evolutielijnen
* Backup en restore functionaliteit

---

# Teststrategie

Voor dit project werden geen automatische unit tests, integratietests of UI-tests geïmplementeerd.

De applicatie werd wel uitgebreid handmatig getest tijdens de ontwikkeling.

## Handmatig geteste onderdelen

* Registreren
* Inloggen
* Uitloggen
* Nieuwe run starten
* Starter selecteren
* Encounter registreren
* Status wijzigen
* Duplicate Clause Helper
* Stats scherm
* Box scherm
* Level Caps scherm
* Share functionaliteit
* Splash screen
* App icon

## Navigatie testen

Volgende navigatieonderdelen werden handmatig gecontroleerd:

* Stack Navigation
* Drawer Navigation
* Schermovergangen naar detailpagina’s

## Opslag testen

De lokale opslag werd gecontroleerd door de applicatie te sluiten en opnieuw te openen.

Getest:

* AsyncStorage
* SecureStore

## API testen

De PokéAPI-integratie werd handmatig getest door Pokémongegevens op te halen en sprites correct weer te geven.

## Platform testen

De applicatie werd getest op:

* iOS Simulator
* iPhone via Expo Go

## UI testen

* Responsiviteit
* Safe Area ondersteuning
* Drawer menu
* Splash screen
* App icon
* Reanimated animaties

## Beperking

Er werden geen geautomatiseerde tests toegevoegd. In een toekomstige versie kunnen unit tests, integratietests en UI-tests toegevoegd worden.

---

# Conclusie

Route One is een mobiele React Native applicatie waarmee spelers hun Pokémon FireRed Nuzlocke-run kunnen beheren. De applicatie biedt route tracking, level caps, statistieken, een Box-systeem, Duplicate Clause ondersteuning en integratie met PokéAPI.

Door gebruik te maken van React Navigation, AsyncStorage, SecureStore, PokéAPI en React Native Reanimated voldoet de applicatie aan de functionele en technische vereisten van het project.

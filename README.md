# Supermarket-Frontend

React-Frontend für die [Supermarkt-API Mannheim](../SupermarktAPI-Mannheim). Zeigt aktuelle Angebote, ermöglicht Suche/Filter nach Markt und verwaltet Favoriten für eingeloggte Benutzer.

## Features

- Übersicht aller aktuellen Angebote
- Suche nach Produkt, Marke oder Kategorie
- Filter nach Markt
- Nur-aktuelle-Angebote-Filter
- Login / Registrierung (lokal im Browser)
- Favoriten lokal im Browser speichern und verwalten
- Moderner, sachlicher UI-Look wie ein internes Tool
- SVG-Kategorie-Icons statt heruntergeladener Bilder (einheitlich, lizenzfrei)

## Schnellstart

Voraussetzung: [Node.js](https://nodejs.org/) ≥ 20

```bash
cd Supermarket-Frontend
npm install
npm run dev
```

Das Frontend ist dann unter `http://localhost:5173` erreichbar.

> Das Vite-Dev-Server-Setup leitet `/api`-Anfragen automatisch an `http://localhost:3000` weiter. Die Supermarkt-API muss also parallel laufen.

## Docker

Das Frontend kann als Docker-Container gebaut und mit nginx ausgeliefert werden:

```bash
cd Supermarket-Frontend
docker build -t supermarket-frontend .
docker run -p 8080:80 supermarket-frontend
```

In diesem Modus erwartet der Container, dass unter `http://api:3000` das Backend erreichbar ist. Für den gemeinsamen Start mit der API liegt im Frontend-Repo ein `docker-compose.yml`:

```bash
cd Supermarket-Frontend
cp .env.example .env
# Optional PLZs oder Port anpassen
docker compose up --build
```

Das Frontend ist dann unter `http://localhost:8080` erreichbar.

## Build

```bash
npm run build
```

Die gebauten Dateien landen in `dist/` und können mit einem beliebigen Static-Hosting ausgeliefert werden. Für den Produktivbetrieb muss das Hosting ebenfalls `/api`-Requests ans Backend weiterleiten.

## Projektstruktur

```
src/
  api/           API-Client und Endpunkte
  components/    Wiederverwendbare UI-Komponenten
  context/       React-Context für Auth
  hooks/         Lokale Favoriten-Verwaltung
  pages/         Seitenkomponenten
  index.css      Globale Styles
```

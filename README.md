# RUNDUM

28 Minispiele für ein gemeinsames Handy, ohne Installation oder Konto.

Zieladresse: https://timo-just.github.io/drinking_game/

## Spielen

Spieler hinzufügen, „Alle nacheinander“ wählen oder einzelne Spiele starten. Nach jeder Runde geht es mit „Nächstes Spiel“ weiter. Die Spielerliste wird im Browser gespeichert. Geheimnisse werden nur für die aktuelle Runde im Arbeitsspeicher gehalten. Regeln und Trinkmates bleiben während der Sitzung aktiv.

Bewegungsaufgaben, Kategorien und Schere-Stein-Papier wertet die Gruppe. Der Kompass braucht einen absoluten Richtungssensor und eventuell Browserfreigabe; ein manuell gemessener Ersatzwert ist möglich. Gleichzeitiges Fingerhalten ist durch die Multitouch-Fähigkeit des Handys begrenzt; dafür gibt es auch die Solo-Version.

## Entwicklung und Prüfung

Statische Dateien: `index.html`, `style.css`, `app.js`. Keine Build-Abhängigkeiten. Mit einem beliebigen lokalen HTTP-Server öffnen. `node --check app.js` prüft die Syntax. `node smoke.cjs` öffnet lokalen Chrome im Hintergrund und prüft die 28 Spieleinstiege sowie Rangliste und Trinkmates.

## GitHub Pages

Einmalig unter Repository Settings → Pages → Build and deployment → Source **GitHub Actions** auswählen. Danach veröffentlicht `.github/workflows/pages.yml` die App bei jedem Push auf `main`. Der Workflow kann im Actions-Tab auch manuell gestartet werden.

Der GitHub-Actions-Token kann Pages nicht erstmalig aktivieren, solange GitHub die Verwaltungsberechtigung dafür verweigert.

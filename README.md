# OU Snake

This repository contains code for the Open University course: Webapplicaties: de clientkant (Webapplications: the client side)

###Collaborators:

* Aart Pelt (a.j.w.pelt@gmail.com)
* Onno Huijgen (o.huijgen@gmail.com)

# Opdracht 1
## Mijn Spelletjessite

Layout:
header : titel van de website
center : een omkaderd vlak (arena) met daarbinnen het menu (nav) en iframe (gameFrame)
footer : copyright notice en datum laatste wijziging

Styling:
Expliciet benoemen van margins en paddings, kleuren en tekstsattributen. Dit maakt het makkelijker
om te experimenteren met stijlen. Mogelijk dat hier nog opkuising nodig is, op het moment dat de
website productierijp moet worden.

Positioning:
Om een zo responsive mogelijke website te krijgen gekozen voor relative maatvoering in em en %.
Ook zijn de 'arena'-elementen floating gepositioneerd.

De website is getest met de browsers Google Chrome en Safari op Apple OSX.

# Opdracht 2
## Snake part One

De gevraagde functies collidesWithOneOf, canMove en doMove zijn als methode toegevoegd
aan resp. Element, Snake en Snake.

Om de nieuwe positie van de kop te bepalen is de method Snake.createNewHead toegevoegd. Deze methode wordt nu zowel uitgevoerd in canMove als doMove. Beter zou zijn dat canMove een segment (type Element) retourneert als de beweging mogelijk is. De doMove kan dan de slangsegmenten aanpassen.

Omdat voedsel (nog) niet als aparte klasse is opgenomen, al wel een functie eatFood toegevoegd, waarin het voedselelement uit het array wordt verwijderd.

Uiteindelijk zijn de tests in het hoofd Javascript-bestand snake.js terecht gekomen. Bij het schrijven van een
mocha test bleek jQuery in de weg te zitten. Dit vraagt nader onderzoek.

# Opdracht 3
## Snake part Two

<not yet implemented>


#TO DO
1. ~~Code onder versie controle brengen (git)~~
2. ~~Deze readme omzetten naar MarkDown syntax~~
3. ~~IDE selecteren voor het ontwikkelwerk of volstaat Atom met Chrome (en debugtools)?~~ => Atom/Chrome
4. CSS height: 100% verder onderzoeken
5. Lastig om een beetje gevoel te krijgen bij relatieve maatvoering. Mogelijk dat er toch nog wat absolute maten in moeten.
6. Het resizen van de site is nog niet ideaal
7. ~~Teamlid werven~~
8. CSS structuur documenteren
9. ~~CSS validatie fouten oplossen: color names vervangen door color numbers (schijnbaar kunnen niet alle browsers met de kleurnamen omgaan)~~
10. HTML fouten oplossen
11. Bedenken of de documentatie en commentaren in het Engels of Nederlands moeten. De opleiding is Nederlandstalig, maar de taal Javascript afgeleid van het Engels.
12. JSlint operationaliseren
13. Tests refactoren naar mocha/chai
14. ...

annoDomini = function() {

    /* -------------------- Helper functions -------------------- */

    HTMLElement.prototype.empty = function() {
        while (this.firstChild) {
            this.removeChild(this.firstChild);
        }
    };

    Array.prototype.shuffle = function() {
        var i = this.length;
        while (i) {
            var j = Math.floor(Math.random() * i);
            var t = this[--i];
            this[i] = this[j];
            this[j] = t;
        }
        return this;
    };

    /* -------------------- Variables -------------------- */

    var cardStack = document.querySelector("#cardStack");
    var timeline = document.querySelector("#timeline");
    var counters = document.querySelectorAll(".counter");
    var infos = document.querySelector("#infos");
	var result = document.querySelector(".result");
    var addPlayerButton = document.querySelector(".addPlayer");
    var addStartButton = document.querySelector(".start");
    var addSolveButton = document.querySelector(".gosolve");
    var round = 0;
    var playerList = [];
    var historicalDates = [
		{
            date: 1066,
            desc: "Wilhelm der Eroberer gründet England."
        },
		{
            date: 1440,
            desc: "Johannes Gutenberg entwickelt den Buchdruck."
        },
		{
            date: 1492,
            desc: "Kolumbus entdeckt Amerika."
        },
		{
            date: 1516,
            desc: "Das deutsche Reinheitsgebot wird festgelegt."
        },
		{
            date: 1517,
            desc: "Der Augustinermönch Martin Luther formuliert die Reformationsthesen."
        },
        {
            date: 1534,
            desc: "Heinrich VIII. löst die englische Kirche von Rom und gründet die angelsächsische Staatskirche."
        },
        {
            date: 1587,
            desc: "Maria Stuart wird nach 18-jähriger Gefangenschaft hingerichtet."
        },
		{
            date: 1602,
            desc: "Die Geburtsstunde der Aktie in Europa"
        },
        {
            date: 1648,
            desc: "Der Westfälische Frieden beendet den 30-jährigen Krieg."
        },
		{
            date: 1650,
            desc: "Der Naturwissenschaftler Otto von Guericke weist die Existenz des Vakuums nach."
        },
        {
            date: 1675,
            desc: "Unter dem englischen König Karl II. wird in Greenwich der Nullmeridian festgelegt."
        },
		{
            date: 1717,
            desc: "Der preußische König Friedrich Wilhelm I. führt die Schulpflicht ein."
        },
        {
            date: 1789,
            desc: "Französische Revolution"
        },
        {
            date: 1804,
            desc: "Napoleon Bonaparte krönt sich selbst zum Kaiser."
        },
        {
            date: 1815,
            desc: "Napoleons Rückkehr und Niederlage bei Waterloo."
        },
        {
            date: 1820,
            desc: "In den USA wird nördlich des 36. Breitengrades die Sklaverei verboten."
        },
		{
            date: 1821,
            desc: "Christian Buschmann erfindet die Mundharmonika."
        },
		{
            date: 1825,
            desc: "König Ludwig I. von Baiern legt fest, dass man sein Land in Zukunft mit Y schreiben sollte."
        },
		{
            date: 1843,
            desc: "Friedrich Gottlob Keller erfindet den Papier-Rohstoff."
        },
        {
            date: 1846,
            desc: "Ida Pfeiffer geht als erste Frau allein auf Weltreise."
        },
		{
            date: 1854,
            desc: "Heinrich Göbel entwickelt die erste Glühbirne noch vor Thomas Edison."
        },
		{
            date: 1859,
            desc: "Johann Philipp Reis erfindet das Telefon."
        },
		{
            date: 1864,
            desc: "Der deutsche Chemiker Justus Lothar Meyer entwickelt das Periodensystem."
        },
		{
            date: 1866,
            desc: "Werner von Siemens erfindet den Dynamo."
        },
        {
            date: 1867,
            desc: "Die USA kaufen Alaska für 7,2 Millionen Dollar von Russland."
        },
		{
            date: 1873,
            desc: "Levi Strauss erfindet die Jeans."
        },
		{
            date: 1876,
            desc: "Robert Koch begründet mit der Bakteriologie einen neuen Zweig der Wissenschaft."
        },
		{
            date: 1879,
            desc: "Werner von Siemens erfindet die Straßenbahn"
        },
		{
            date: 1879,
            desc: "Felix Hoffmann erfindet das Aspirin."
        },
		{
            date: 1882,
            desc: "Baubeginn der Sagrada Familia"
        },
		{
            date: 1883,
            desc: "Reichskanzler Otto von Bismarck initiiert die deutschen Sozialgesetze."
        },
		{
            date: 1884,
            desc: "Die Einteilung der Welt in 24 Zeitzonen wird beschlossen."
        },
		{
            date: 1885,
            desc: "Gottlieb Daimler erfindet das Motorrad."
        },
		{
            date: 1895,
            desc: "In Chicago wird der erste Wolkenkratzer der Welt fertiggestellt."
        },
		{
            date: 1886,
            desc: "Das Automobil wird zum Patent angemeldet."
        },
		{
            date: 1887,
            desc: "Emil Berliner erfindet den Plattenspieler."
        },
		{
            date: 1890,
            desc: "Rudolf Diesel erfindet den Dieselmotor."
        },
		{
            date: 1894,
            desc: "Otto Lilienthal steuert die ersten Gleitflugzeuge."
        },
        {
            date: 1893,
            desc: "Als erstes Land der Welt führt Neuseeland das Frauenwahlrecht ein."
        },
		{
            date: 1895,
            desc: "Entdeckung der Röntgenstrahlung durch den Physiker Wilhelm Röntgen."
        },
		{
            date: 1902,
            desc: "Robert Bosch erfindet die Zündkerze."
        },
		{
            date: 1903,
            desc: "Der Glastechniker Reinhold Burger erfindet die Thermosflasche."
        },
		{
            date: 1905,
            desc: "Josf Schmidt erfindet das Brettspiel Mensch ärgere dich nicht."
        },
		{
            date: 1907,
            desc: "Ottomar Heinsius von Mayenburg erfindet die Zahnpasta."
        },
		{
            date: 1908,
            desc: "Melitta Bentz erfindet den Kaffeefilter."
        },
        {
            date: 1914,
            desc: "Beginn des 1. Weltkriegs"
        },
		{
            date: 1915,
            desc: "Albert Einstein entwickelt die Relativitätstheorie."
        },
        {
            date: 1917,
            desc: "Oktoberrevolution in Russland: Lenin übernimmt die Macht."
        },
        {
            date: 1918,
            desc: "Ausbruch der spanischen Grippe"
        },
		{
            date: 1918,
            desc: "In Deutschland wird das Frauenwahlrecht gesetzlich verankert."
        },
        {
            date: 1919,
            desc: "Beginn der Prohibition in den USA"
        },
		{
            date: 1922,
            desc: "Hans Riegel erfindet das Goldbärchen."
        },
		{
            date: 1922,
            desc: "Mit Power of Love erscheint der erste kommerzielle 3D-Film."
        },
		{
            date: 1925,
            desc: "Oskar Barnack erfindet die Kleinbildkamera."
        },
		{
            date: 1928,
            desc: "Fritz Pfleumer erfindet das Tonband."
        },
		{
            date: 1928,
            desc: "Alexander Fleming entdeckt zufällig das Penicillin"
        },
        {
            date: 1929,
            desc: "Beginn Weltwirtschaftskrise"
        },
		{
            date: 1929,
            desc: "Adolf Rambold erfindet den Teebeutel."
        },
		{
            date: 1930,
            desc: "Der deutsche Forscher Manfred von Ardenne erfindet das Fernsehen."
        },
        {
            date: 1933,
            desc: "Nach dem Wahlerfolg der NSDAP wird Hitler zum Reichskanzler ernannt."
        },
		{
            date: 1934,
            desc: "Hermann Kemper erfindet die Magnetschwebebahn."
        },
		{
            date: 1936,
            desc: "Hans von Ohain erfindet das Düsentriebwerk."
        },
		{
            date: 1936,
            desc: "Der Ingenieur Henrich Focke erfindet den Hubschrauber."
        },
		{
            date: 1937,
            desc: "Bis zu diesem Jahr hatten Liechtenstein und Haiti die gleiche Fahne."
        },
		{
            date: 1938,
            desc: "Otto Hahn erfindet die Kernspaltung."
        },
        {
            date: 1939,
            desc: "Beginn des 2. Weltkriegs"
        },
		{
            date: 1941,
            desc: "Konrad Zuse entwickelte den ersten programmierbaren Rechner."
        },
		{
            date: 1949,
            desc: "Herta Heuwer erfindet die Currywurst."
        },
		{
            date: 1951,
            desc: "Der Elektrotechniker Rudolf Hell erfindet den Scanner."
        },
		{
            date: 1953,
            desc: "Adolf Dassler erfindet den Stollenschuh."
        },
		{
            date: 1953,
            desc: "Erstbesteigung des Mount Everest"
        },
		{
            date: 1956,
            desc: "Die erste Ausgabe der Jugend-Zeitschrift Bravo erscheint."
        },
		{
            date: 1957,
            desc: "Die UdSSR schickt mit »Sputnik 1« den ersten künstlichen Satelliten ins Weltall."
        },
		{
            date: 1958,
            desc: "Artur Fischer erfindet den Dübel."
        },
		{
            date: 1958,
            desc: "Volvo entwickelt den Sicherheitsgurt."
        },
        {
            date: 1959,
            desc: "Che Guevara und Fidel Castro putschen in Kuba gegen Diktator Batista."
        },
		{
            date: 1961,
            desc: "Bau der Berliner Mauer"
        },
		{
            date: 1961,
            desc: "Der sowjetische Kosmonaut Juri Gagarin ist der erste Mensch im Weltall."
        },
        {
            date: 1961,
            desc: "Die Schering AG erfindet die Antibabypille."
        },
        {
            date: 1962,
            desc: "Kuba Krise"
        },
		{
            date: 1963,
            desc: "Tödliches Attentat auf John F. Kennedy"
        },
        {
            date: 1964,
            desc: "Vietnam-Krieg"
        },
        {
            date: 1968,
            desc: "Der schwarze Bürgerrechtler Martin Luther King wird ermordet."
        },
        {
            date: 1969,
            desc: "Neil Armstrong betritt am 21. Juli als erster Mensch den Mond."
        },
		{
            date: 1969,
            desc: "Die Chipkarte macht erstmals bargeldloses Zahlen möglich."
        },
		{
            date: 1969,
            desc: "Mit dem Arpanet nimmt der Vorläufer des Internets seinen Betrieb auf."
        },
		{
            date: 1971,
            desc: "Mercedes Benz erfindet den Airbag."
        },
        {
            date: 1974,
            desc: "US Präsident Nixon muss in der Watergate-Affäre wegen Spionageverdacht zurücktreten."
        },
		{
            date: 1977,
            desc: "Das erste durch In-Vitro-Fertilisation gezeugte Baby wird geboren."
        },
		{
            date: 1979,
            desc: "Ursula Buchfellner schafft es als erstes deutsches Playmate in den US-amerikanischen Playboy."
        },
		{
            date: 1979,
            desc: "Die NBA führt die Dreipunktelinie ein."
        },
		{
            date: 1980,
            desc: "Die Bundesrepublik Deutschland führt die Mitteleuropäische Sommerzeit (MESZ) ein."
        },
		{
            date: 1981,
            desc: "AIDS wird als epidemische Krankheit erkannt."
        },
        {
            date: 1982,
            desc: "Argentinien besetzt die britischen Falkland-Inseln."
        },
		{
            date: 1982,
            desc: "Ein bischen Frieden gewinnt als erster deutscher Beitrag den ESC."
        },
        {
            date: 1985,
            desc: "Boris Becker wird der erste deutsche und der jüngste Wimbledon-Sieger aller Zeiten."
        },
        {
            date: 1986,
            desc: "Kernschmelze im Atomkraftwerk Tschernobyl"
        },
		{
            date: 1988,
            desc: "Das Fraunhofer Institut entwickelt das MP3-Format."
        },
        {
            date: 1989,
            desc: "Fall der Mauer und Öffnung aller DDR-Grenzen nach Westen."
        },
		{
            date: 1991,
            desc: "Die Junghans AG erfindet die Funkarmbanduhr."
        },
		{
            date: 1992,
            desc: "Die weltweit erste SMS wird vesendet. Text: Merry Christmas!"
        },
        {
            date: 1994,
            desc: "Michael Schumacher wird erstmals Formel 1 Weltmeister."
        },
        {
            date: 1996,
            desc: "Das walisische Bergschaf „Dolly“ wird zum ersten geklonten Säugetier."
        },
		{
            date: 1996,
            desc: "In diesem Jahr wurden sämtliche Sommerzeiten Europas vereinheitlicht."
        },
        {
            date: 1996,
            desc: "In Großbritannien bricht die BSE-Krise aus."
        },
		{
            date: 1999,
            desc: "Die Geburt der Emojis"
        },
		{
            date: 2000,
            desc: "An der Börse platzt die sogenannte Dotcom-Blase"
        },
        {
            date: 2001,
            desc: "Anschläge auf World Trade Center"
        },
        {
            date: 2002,
            desc: "In Europa wird der Euro als Zahlungsmittel eingeführt."
        },
		{
            date: 2005,
            desc: "Auf Youtube wird das erste Video hochgeladen."
        },
		{
            date: 2007,
            desc: "Mit dem iPhone wird das erste Smartphone mit Multi-Touch-Screen vorgestellt."
        },
		{
            date: 2008,
            desc: "Satoshi Nakamoto erfindet den Bitcoin."
        },
		{
            date: 2010,
            desc: "Lena gewinnt mit Satellite beim Eurovision Song Contest."
        },
		{
            date: 2010,
            desc: "Durch einen Vulkanausbruch in Island wird der Flugverkehr über Euopa tagelang eingestellt."
        },
        {
            date: 2011,
            desc: "Kernschmelze im Atomkraftwerk Fukushima"
        },
		{
            date: 2012,
            desc: "Die Existenz des Higgs Bosons wird am Cern nachgewiesen."
        },
		{
            date: 2014,
            desc: "Die erste erfolgreiche Penis-Transplantation der Welt."
        },
        {
            date: 2015,
            desc: "Volkswagens illegale Abschalteinrichtung bei Diesel-Fahrzeugen wird publik."
        },
        {
            date: 2016,
            desc: "Ein gestohlener LKW fährt in den gut besuchten Berliner Weihnachtsmarkt an der Gedächtniskirche."
        },
		{
            date: 2017,
            desc: "In Deutschland wird die Ehe für alle gesetzlich ermöglicht."
        },
        {
            date: 2018,
            desc: "Die Schwedin Greta Thunberg demonstriert erstmals gegen die Folgen des Klimawandels."
        },
		{
            date: 2018,
            desc: "Das dritte Geschlecht wird in Deutschland eingeführt."
        },
		{
            date: 2019,
            desc: "Das Coronavirus SARS-CoV-2 wird erstmalig in China beim Menschen nachgewiesen."
        }
    ];
    console.log("Anzahl historischer Ereignisse: " + historicalDates.length);

    /* -------------------- Functions -------------------- */

    new Sortable(cardStack, {
        group: {
            name: 'shared', // set both lists to same group
            put: false // Do not allow items to be put into this list
        },
        animation: 150,
        delay: 150, // time in milliseconds to define when the sorting should start
        delayOnTouchOnly: true, // only delay if user is using touch
        ghostClass: "sortable-ghost", // Class name for the drop placeholder
        dragClass: "sortable-drag", // Class name for the dragging item
        sort: false // To disable sorting: set sort to false
    });

    new Sortable(timeline, {
        group: 'shared',
        animation: 150,
        delay: 150, // time in milliseconds to define when the sorting should start
        delayOnTouchOnly: true, // only delay if user is using touch
        ghostClass: "sortable-ghost", // Class name for the drop placeholder
        chosenClass: "sortable-chosen", // Class name for the chosen item
        dragClass: "sortable-drag", // Class name for the dragging item
        filter: '.fixed', // 'filtered' class is not draggable
        sort: false, // To disable sorting: set sort to false
        onAdd: function(evt) {
            endRound(evt);
        } // Element is dropped into the list from another list
    });

    function addCard(el, setDesc, setYear, index, fixed) {
        var card, p, description, time, year;

        card = document.createElement("div");
        card.classList.add("card");
        if (fixed === true) {
            card.classList.add("fixed");
        }
        if (index !== false) {
            card.dataset.index = index;
        }
        p = document.createElement("p");
        description = document.createTextNode(setDesc);
        time = document.createElement("time");
        year = document.createTextNode(setYear);
        time.setAttribute('datetime', setYear);

        p.appendChild(description);
        time.appendChild(year);
        card.appendChild(p);
        card.appendChild(time);

        el.appendChild(card);
    }

    function removeCard(index) {
		var playerIndex, removed;
        
		playerIndex = round % playerList.length;
        removed = playerList[playerIndex].cards.splice(index, 1);
		historicalDates.push(removed);
    }

    function addPlayer() {
        var playerName, playerField, playerObject;

        playerName = prompt("Bitte gib deinen Namen ein", "Spieler");
        if (playerName === null || playerName === "") {
            return;
        }
        playerName.trim();

        playerField = document.createElement("span");
        playerField.classList.add("player");
        playerField.textContent = playerName;

        infos.appendChild(playerField);

        playerObject = {
            name: playerName,
            cards: drawCards(9)
        };
        playerList.push(playerObject);
    }

    function newTimetable() {
        timeline.empty();
		result.textContent = "";

        addCard(timeline, historicalDates[0].desc, historicalDates[0].date, false, true);
        historicalDates.push(historicalDates.shift());
        updateCounters();
    }

    function fillcardStack() {
        var playerIndex, i, title, lastChar, suffix, playerSpans, previousIndex;

        cardStack.empty();
        playerIndex = round % playerList.length;
        for (i = 0; i < playerList[playerIndex].cards.length; i++) {
            addCard(cardStack, playerList[playerIndex].cards[i].desc, playerList[playerIndex].cards[i].date, i, false);
        }
        // Show active Player in title of cardStack
        title = document.querySelector("#cardStackTitle");
        lastChar = playerList[playerIndex].name.slice(-1);
        suffix = (lastChar === "s") ? "\u0027" : "s";
        title.textContent = playerList[playerIndex].name + suffix + " Karten";

        // highlight active player in player buttons
        playerSpans = document.querySelectorAll(".player");
        previousIndex = (playerIndex === 0) ? playerSpans.length-1 : playerIndex-1;
        playerSpans[playerIndex].classList.add("active");
        playerSpans[previousIndex].classList.remove("active");
    }

    function drawCards(amount) {
        var i, cardList, dateObject;

        cardList = [];
        for (i = 0; i < amount; i++) {
            cardList.push(historicalDates[0]);
            historicalDates.shift();
        }

        return cardList;
    }

    function updateCounters() {
        var timelineItems, cardStackItems;

        //update Counters
        timelineItems = document.querySelectorAll("#timeline .card");
        cardStackItems = document.querySelectorAll("#cardStack .card");
        counters[0].textContent = "(" + timelineItems.length + ")";
        counters[1].textContent = "(" + cardStackItems.length + ")";
    }

    function startGame() {
        if (playerList.length >= 2) {
		
			if (document.body.contains(addPlayerButton)) {
				addPlayerButton.parentNode.removeChild(addPlayerButton);
			}
			newTimetable();
			fillcardStack();
        	updateCounters();
			addSolveButton.addEventListener("click", solve, false);
			this.textContent = "Neue Runde";
		}
		else {
			alert("Es werden mindestens 2 Spieler benötigt.");
		}
    }

    function endRound(evt) {
        removeCard(evt.item.dataset.index);

        round++;
        fillcardStack();
        updateCounters();
    }

    function solve() {
        var i, timelineItems, dates, min, mistakes, playerIndex, previousIndex;
		
        timelineItems = document.querySelectorAll("#timeline .card");
		dates = document.querySelectorAll("#timeline .card time");
		min = parseInt(dates[0].textContent);

        for (i = 0; i < timelineItems.length; i++) {
            timelineItems[i].classList.add("solve");
			if (parseInt(dates[i].textContent) >= min) {
				min = parseInt(dates[i].textContent);
			}
			else {
				dates[i].classList.add("false");
			}
        }
		mistakes = document.querySelectorAll("#timeline .card time.false");
		playerIndex = round % playerList.length;
		previousIndex = (playerIndex === 0) ? playerList.length-1 : playerIndex-1;
		if (mistakes.length > 0) {
			result.textContent = playerList[previousIndex].name + " nimmt 3 Karten auf";
			playerList[previousIndex].cards = playerList[previousIndex].cards.concat(drawCards(3));
		}
		else {
			result.textContent = playerList[playerIndex].name + " nimmt 2 Karten auf";
			playerList[playerIndex].cards = playerList[playerIndex].cards.concat(drawCards(2));
			round++;
		}
		cardStack.empty();
		addSolveButton.removeEventListener("click", solve, false);
    }

    function init() {
        historicalDates.shuffle();

        addPlayerButton.addEventListener("click", addPlayer, false);
        addStartButton.addEventListener("click", startGame, false);
    }

    /* -------------------- Public -------------------- */
    return {
        init: init
    };
}();


annoDomini.init();

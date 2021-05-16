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
    var addPlayerButton = document.querySelector(".player.button");
    var addStartButton = document.querySelector(".start.button");
    var round = 0;
    var playerList = [];
    var historicalDates = [{
            date: 1492,
            desc: "Kolumbus entdeckt Amerika."
        },
        {
            date: 1066,
            desc: "Wilhelm der Eroberer gründet England."
        },
        {
            date: 1535,
            desc: "Heinrich VIII. löst die englische Kirche von Rom und gründet die angelsächsische Staatskirche."
        },
        {
            date: 1587,
            desc: "Maria Stuart wird nach 18-jähriger Gefangenschaft hingerichtet."
        },
        {
            date: 1648,
            desc: "Der Westfälische Frieden beendet den 30-jährigen Krieg."
        },
        {
            date: 1675,
            desc: "Unter dem englischen König Karl II. wird in Greenwich der Nullmeridian festgelegt."
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
            date: 1846,
            desc: "Ida Pfeiffer geht als erste Frau allein auf Weltreise."
        },
        {
            date: 1867,
            desc: "Die USA kaufen Alaska für 7,2 Millionen Dollar von Russland."
        },
        {
            date: 1893,
            desc: "Als erstes Land der Welt führt Neuseeland das Frauenwahlrecht ein."
        },
        {
            date: 1914,
            desc: "Beginn des 1. Weltkriegs"
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
            date: 1919,
            desc: "Beginn der Prohibition in den USA"
        },
        {
            date: 1929,
            desc: "Beginn Weltwirtschaftskrise"
        },
        {
            date: 1933,
            desc: "Nach dem Wahlerfolg der NSDAP wird Hitler zum Reichskanzler ernannt."
        },
        {
            date: 1939,
            desc: "Beginn des 2. Weltkriegs"
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
            date: 1962,
            desc: "Kuba Krise"
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
            date: 1974,
            desc: "US Präsident Nixon muss in der Watergate-Affäre wegen Spionageverdacht zurücktreten."
        },
        {
            date: 1982,
            desc: "Argentinien besetzt die britischen Falkland-Inseln."
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
            date: 1989,
            desc: "Fall der Mauer und Öffnung aller DDR-Grenzen nach Westen."
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
            desc: "In Großbritannien bricht die BSE-Krise aus."
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
            date: 2011,
            desc: "Kernschmelze im Atomkraftwerk Fukushima"
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
            date: 2018,
            desc: "Die Schwedin Greta Thunberg demonstriert erstmals gegen die Folgen des Klimawandels."
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

    function endRound(evt) {
        removeCard(evt.item.dataset.index);

        round++;
        fillcardStack();
        updateCounters();
    }

    function removeCard(index) {
        var playerIndex = round % playerList.length;
        playerList[playerIndex].cards.splice(index, 1);
    }

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

    function updateCounters() {
        var timelineItems, cardStackItems;

        //update Counters
        timelineItems = document.querySelectorAll("#timeline .card");
        cardStackItems = document.querySelectorAll("#cardStack .card");
        counters[0].textContent = "(" + timelineItems.length + ")";
        counters[1].textContent = "(" + cardStackItems.length + ")";

        //update h2 of cardStack

        //highlght active player span

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

        addCard(timeline, historicalDates[0].desc, historicalDates[0].date, false, true);
        historicalDates.shift();
        updateCounters();
    }

    function fillcardStack() {
        var playerIndex, i, title, lastChar, suffix;

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
        var playerSpans = document.querySelectorAll("button ~ .player");
        var previousIndex = (playerIndex === 0) ? playerSpans.length-1 : playerIndex-1;
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

    function startGame() {
        fillcardStack();
        updateCounters();
        //addPlayerButton.parentNode.removeChild(addPlayerButton);
    }

    function init() {
        historicalDates.shuffle();
        newTimetable();

        addPlayerButton.addEventListener("click", addPlayer, false);
        addStartButton.addEventListener("click", startGame, false);
    }

    /* -------------------- Public -------------------- */
    return {
        init: init
    };
}();

annoDomini.init();

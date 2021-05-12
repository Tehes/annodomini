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
	}

    /* -------------------- Variables -------------------- */

    var cardStack = document.querySelector("#cardStack");
    var timeline = document.querySelector("#timeline");
    var counters = document.querySelectorAll(".counter");
    var infos = document.querySelector("#infos");
    var addPlayerButton = document.querySelector(".player.button");
	var addStartButton = document.querySelector(".start.button");
	var round = 0;
	var playerList = [];
	var historicalDates = [
		{
			date:1492,
			desc:"Kolumbus entdeckt Amerika."
		},
		{
			date:1066,
			desc:"Wilhelm der Eroberer gründet England."
		},
		{
			date:1914,
			desc:"Beginn des 1. Weltkriegs"
		},
		{
			date:1929,
			desc:"Beginn Weltwirtschaftskrise"
		},
		{
			date:1939,
			desc:"Beginn des 2. Weltkriegs"
		},
		{
			date:1961,
			desc:"Bau der Berliner Mauer"
		},
		{
			date:1962,
			desc:"Kuba Krise"
		},
		{
			date:1964,
			desc:"Vietnam-Krieg"
		},
		{
			date:1969,
			desc:"Neil Armstrong betritt am 21. Juli als erster Mensch den Mond."
		},
		{
			date:1985,
			desc:"Boris Becker wird der erste deutsche und der jüngste Wimbledon-Sieger aller Zeiten."
		},
		{
			date:1986,
			desc:"Kernschmelze im Atomkraftwerk Tschernobyl"
		},
		{
			date:1989,
			desc:"Fall der Mauer und Öffnung aller DDR-Grenzen nach Westen."
		},
		{
			date:1994,
			desc:"Michael Schumacher wird erstmals Formel 1 Weltmeister."
		},
		{
			date:2001,
			desc:"Anschläge auf World Trade Center"
		},
		{
			date:2002,
			desc:"In Europa wird der Euro als Zahlungsmittel eingeführt."
		},
        {
			date:2002,
			desc:"In Europa wird der Euro als Zahlungsmittel eingeführt."
		},
        {
			date:2002,
			desc:"In Europa wird der Euro als Zahlungsmittel eingeführt."
		},
        {
			date:2002,
			desc:"In Europa wird der Euro als Zahlungsmittel eingeführt."
		},
        {
			date:2002,
			desc:"In Europa wird der Euro als Zahlungsmittel eingeführt."
		},
        {
			date:2002,
			desc:"In Europa wird der Euro als Zahlungsmittel eingeführt."
		},
        {
			date:2002,
			desc:"In Europa wird der Euro als Zahlungsmittel eingeführt."
		},
        {
			date:2002,
			desc:"In Europa wird der Euro als Zahlungsmittel eingeführt."
		},
        {
			date:2002,
			desc:"In Europa wird der Euro als Zahlungsmittel eingeführt."
		},
        {
			date:2002,
			desc:"In Europa wird der Euro als Zahlungsmittel eingeführt."
		},
        {
			date:2002,
			desc:"In Europa wird der Euro als Zahlungsmittel eingeführt."
		},
        {
			date:2002,
			desc:"In Europa wird der Euro als Zahlungsmittel eingeführt."
		},
        {
			date:2002,
			desc:"In Europa wird der Euro als Zahlungsmittel eingeführt."
		},
        {
			date:2002,
			desc:"In Europa wird der Euro als Zahlungsmittel eingeführt."
		},
        {
			date:2002,
			desc:"In Europa wird der Euro als Zahlungsmittel eingeführt."
		},
		{
			date:2011,
			desc:"Kernschmelze im Atomkraftwerk Fukushima"
		}
	];

    /* -------------------- Functions -------------------- */

    new Sortable(cardStack, {
        group: {
            name: 'shared', // set both lists to same group
            put: false // Do not allow items to be put into this list
        },
        animation: 150,
        delay: 150, // time in milliseconds to define when the sorting should start
        delayOnTouchOnly: true, // only delay if user is using touch
        ghostClass: "sortable-ghost",  // Class name for the drop placeholder
    	dragClass: "sortable-drag",  // Class name for the dragging item
        sort: false // To disable sorting: set sort to false
    });

    new Sortable(timeline, {
        group: 'shared',
        animation: 150,
        delay: 150, // time in milliseconds to define when the sorting should start
        delayOnTouchOnly: true, // only delay if user is using touch
        ghostClass: "sortable-ghost",  // Class name for the drop placeholder
    	chosenClass: "sortable-chosen",  // Class name for the chosen item
    	dragClass: "sortable-drag",  // Class name for the dragging item
        filter: '.fixed', // 'filtered' class is not draggable
		sort: false, // To disable sorting: set sort to false
        onAdd: function(evt) {
            endRound(evt);
        } // Element is dropped into the list from another list
    });

    function endRound(evt) {
        round++;
        console.log(evt.item);
        fillcardStack();
        updateCounters();
    }

    function addCard(el, setDesc, setYear, fixed) {
            var card, p, description, time, year;

            card = document.createElement("div");
            card.classList.add("card");
            if (fixed === true) {
                card.classList.add("fixed");
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

        timelineItems = document.querySelectorAll("#timeline .card");
        cardStackItems = document.querySelectorAll("#cardStack .card");
        counters[0].textContent = "(" + timelineItems.length + ")";
        counters[1].textContent = "(" + cardStackItems.length + ")";
    }

    function addPlayer() {
        var playerName, playerField, playerObject;

        playerName = prompt("Bitte gib deinen Namen ein", "Spieler");
		if (playerName === null || playerName === "") { return; }
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

        addCard(timeline, historicalDates[0].desc, historicalDates[0].date, true);
		historicalDates.shift();
        updateCounters();
    }

	function fillcardStack() {
        cardStack.empty();
		var playerIndex = round % playerList.length;
		for (var i = 0; i < playerList[playerIndex].cards.length; i++) {
			addCard(cardStack, playerList[playerIndex].cards[i].desc, playerList[playerIndex].cards[i].date, false);
		}
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

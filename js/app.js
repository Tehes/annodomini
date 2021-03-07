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
			date:1966,
			desc:"Neil Armstrong betritt am 21. Juli als erster Mensch den Mond."
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
        onAdd: updateCounters // Element is dropped into the list from another list
    });

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
		playerName.trim();
        if (playerName === null || playerName === "") { return; }

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
		
		historicalDates.shuffle();
        addCard(timeline, historicalDates[0].desc, historicalDates[0].date, true);
		historicalDates.shift();
        updateCounters();
    }
	
	function drawCards(amount) {
		return amount;
		/* to be done: this function shall draw an amount of cards from the stack */
	}

    function init() {
        newTimetable();

        addPlayerButton.addEventListener("click", addPlayer, false);
    }

    /* -------------------- Public -------------------- */
    return {
        init: init
	};
}();

annoDomini.init();

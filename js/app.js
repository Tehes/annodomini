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
    import {
        historicalDates
    }
    from './dates.js';
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
		checkIfFinished();

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
			checkIfFinished();
			round++;
		}
		cardStack.empty();
		addSolveButton.removeEventListener("click", solve, false);
    }
	
	function checkIfFinished() {
		var playerIndex, previousIndex;
		
		playerIndex = round % playerList.length;
		previousIndex = (playerIndex === 0) ? playerList.length-1 : playerIndex-1;
		if (playerList[previousIndex].cards.length === 0) {
			alert(playerList[previousIndex].name + " gewinnt");
		}
	}

    function init() {
        historicalDates.shuffle();

        addPlayerButton.addEventListener("click", addPlayer, false);
        addStartButton.addEventListener("click", startGame, false);
    }


/* --------------------------------------------------------------------------------------------------
public members, exposed with window scope
---------------------------------------------------------------------------------------------------*/
window.annoDomini= {
    init
};

annoDomini.init();

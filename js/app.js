annoDomini = function() {

    /* -------------------- Helper functions -------------------- */



    /* -------------------- Variables -------------------- */

    var cardStack = document.querySelector("#cardStack");
    var timeline = document.querySelector("#timeline");

    /* -------------------- Functions -------------------- */

    new Sortable(cardStack, {
        group: {
            name: 'shared', // set both lists to same group
            put: false // Do not allow items to be put into this list
        },
        animation: 150,
        ghostClass: "sortable-ghost",  // Class name for the drop placeholder
    	dragClass: "sortable-drag",  // Class name for the dragging item
        sort: false // To disable sorting: set sort to false
    });

    new Sortable(timeline, {
        group: 'shared',
        animation: 150,
        ghostClass: "sortable-ghost",  // Class name for the drop placeholder
    	chosenClass: "sortable-chosen",  // Class name for the chosen item
    	dragClass: "sortable-drag",  // Class name for the dragging item
        filter: '.fixed', // 'filtered' class is not draggable
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

    addCard(timeline, "Neil Armstrong betritt am 21. Juli als erster Mensch den Mond", "1969", true);

    /* -------------------- Public -------------------- */
    return {

	};
}();

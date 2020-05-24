annoDomini = function() {

    /* -------------------- Helper functions -------------------- */



    /* -------------------- Variables -------------------- */



    /* -------------------- Functions -------------------- */



    /* -------------------- Public -------------------- */
    return {

	};
}();

var cardStack = document.querySelector("#cardStack");
var timeline = document.querySelector("#timeline");

new Sortable(cardStack, {
    group: 'shared', // set both lists to same group
    animation: 150,
    ghostClass: "sortable-ghost",  // Class name for the drop placeholder
	dragClass: "sortable-drag"  // Class name for the dragging item
});

new Sortable(timeline, {
    group: 'shared',
    animation: 150,
    ghostClass: "sortable-ghost",  // Class name for the drop placeholder
	chosenClass: "sortable-chosen",  // Class name for the chosen item
	dragClass: "sortable-drag",  // Class name for the dragging item
    filter: '.fixed', // 'filtered' class is not draggable
});

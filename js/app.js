annoDomini = function() {

    /* -------------------- Helper functions -------------------- */



    /* -------------------- Variables -------------------- */



    /* -------------------- Functions -------------------- */



    /* -------------------- Public -------------------- */
    return {

	};
}();

function allowDrop(ev) {
  ev.preventDefault();
}

function drag(ev) {
  ev.dataTransfer.setData("text", ev.target.id = "drag");
}

function drop(ev) {
  ev.preventDefault();
  var data = ev.dataTransfer.getData("text");
  if (ev.target.id === "timeline") {
      ev.target.appendChild(document.getElementById(data));
  }
}

var card = document.querySelector("#timeline .card");
console.log(card.getBoundingClientRect().x);

var board = document.getElementById('board');
var icon = "x";
var iconCounter = 1;
var xVals = [];
var xPlayerScore = 0;
var oVals = [];
var oPlayerScore = 0;

var drawBoard = function () {
	var html = "<table border='1' cellpadding='4' cellspacing='1'>";
	for(var i=0;i <= 2 ;i++){
		html += "<tr class='row-"+i+"'>";
		for(var j = 0;j <= 2;j++){
			html += "<td class='cell-"+j+"' onclick='changeText(this)'>&nbsp;</td>";
		}
		html += "</tr>";
	}
	html += "</table>";
	board.innerHTML = html;
}	

window.load = drawBoard();

var reloadGame = function() {
	iconCounter = 1;
	icon = "x";
	xVals = [];
	oVals = [];
	$("#board").empty(); 
	drawBoard();			
}

var changeText = function(td){
	var getRowClassVal = $(td).parent().attr("class");
	var getCellClassVal = $(td).attr("class").replace("cell-","");
	var passRowVal = getRowClassVal+getCellClassVal;
	iconCounter++;
	td.innerHTML = icon;
	iconCounter % 2 ? icon = "x" : icon = "o"

	var getThisCellVal = $(td).text();

	if(getThisCellVal === "x"){ 
		xVals.push(passRowVal); 
		checkforthewin(xVals,"X");
	} else { 
		oVals.push(passRowVal);
		checkforthewin(oVals,"O");
	}
}

var endofgameMSG = function(textVal) { 
	$(".endofgame-message").text(textVal);
	$(".reload-btn").hide();
	setTimeout(function(){ 
		$(".endofgame-message").empty();
		$(".reload-btn").show();
	},3000);
}

var checkforthewin = function(array,player){

	// check if nobody won
	if(iconCounter == 10){
		endofgameMSG("Nobody wins :/ .... reloading game");
		reloadGame();
		return
	}

	var player = player;

	/* WINNING PATTERNS, if:
		
		1
		row-00,row-01,row-02
		row-10,row-11,row-12
		row-20,row-21,row-22

		2
		row-00,row-10,row-20
		row-01,row-11,row-21
		row-02,row-12,row-22

		3
		row-00,row-11,row-22
		row-02,row-11,row-20

	*/

	var message = function(){
		endofgameMSG("Player "+player+" WINS!!! :D .... reloading game");

		// add score to scoreboard
		if(player.toLowerCase() === "x") {
			$(".xScore").text(xPlayerScore += 1);
		} else { $(".oScore").text(oPlayerScore += 1) }
		reloadGame();
	}

	if(array.length <= 3){
		if(array.indexOf("row-00") > -1 && array.indexOf("row-01") > -1 && array.indexOf("row-02") > -1) {
			message();
		} else if(array.indexOf("row-10") > -1 && array.indexOf("row-11") > -1 && array.indexOf("row-12") > -1) {
			message()
		} else if(array.indexOf("row-20") > -1 && array.indexOf("row-21") > -1 && array.indexOf("row-22") > -1) {
			message()
		} else if(array.indexOf("row-00") > -1 && array.indexOf("row-10") > -1 && array.indexOf("row-20") > -1) {
			message()
		} else if(array.indexOf("row-01") > -1 && array.indexOf("row-11") > -1 && array.indexOf("row-21") > -1) {
			message()
		} else if(array.indexOf("row-02") > -1 && array.indexOf("row-12") > -1 && array.indexOf("row-22") > -1) {
			message()
		} else if(array.indexOf("row-00") > -1 && array.indexOf("row-11") > -1 && array.indexOf("row-22") > -1) {
			message()
		} else if(array.indexOf("row-02") > -1 && array.indexOf("row-11") > -1 && array.indexOf("row-20") > -1) {
			message()
		}
	} else { array.shift() }
}
// ==UserScript==
// @name        thb_tables_base
// @namespace   csi416_namespace
// @description new columns: "G" meaning "played Games" and "Dif" as "Goal Difference"
// @include     *teamhb.org/index.php?page=home&subpage=competitions*
// @version     1
// @grant       none
// ==/UserScript==


var leagueTable = document.getElementById("league_table");

var tr0 = leagueTable.children[0].children[2].children[0].children[0].children[0].children[0];
var b = document.createElement("b");
b.innerHTML = "G";
var newTD = document.createElement("td");
newTD.setAttribute("width", "30");
newTD.setAttribute("valign", "middle");
newTD.setAttribute("bgcolor", "#cdcdcd");
newTD.setAttribute("align", "center");
newTD.setAttribute("style", "border: 1px solid #000000;");
newTD.appendChild(b);
tr0.insertBefore(newTD, tr0.children[4]);

var b2 = document.createElement("b");
b2.innerHTML = "Dif";
var newTD2 = document.createElement("td");
newTD2.setAttribute("width", "40");
newTD2.setAttribute("valign", "middle");
newTD2.setAttribute("bgcolor", "#cdcdcd");
newTD2.setAttribute("align", "center");
newTD2.setAttribute("style", "border: 1px solid #000000;");
newTD2.appendChild(b2);
tr0.insertBefore(newTD2, tr0.children[10]);

var tr = leagueTable.children[0].children[2].children[0].children[0].children[0].children;
for (var i = 1; i < tr.length; i++) {
    var w = parseInt(tr[i].children[4].innerHTML);
    var d = parseInt(tr[i].children[5].innerHTML);
    var l = parseInt(tr[i].children[6].innerHTML);
    var g = w + d +l;
    var newTD3 = document.createElement("td");
    newTD3.setAttribute("width", "30");
    newTD3.setAttribute("valign", "middle");
    newTD3.setAttribute("align", "center");
    newTD3.innerHTML = g;

    var gf = parseInt(tr[i].children[7].innerHTML);
    var ga = parseInt(tr[i].children[8].innerHTML);
    var dif = gf - ga;
    var newTD4 = document.createElement("td");
    newTD4.setAttribute("width", "40");
    newTD4.setAttribute("valign", "middle");
    newTD4.setAttribute("align", "center");
    newTD4.innerHTML = dif;

    tr[i].insertBefore(newTD3, tr[i].children[4]);
    tr[i].insertBefore(newTD4, tr[i].children[10]);
}

/*
main();

function main(){
	// table id="league-table"
	var leagueTable = document.getElementById("league_table");
	// tbody, alap tabla, header + csapatok, 1+10 sor
	var tbody = leagueTable.children[0].children[2].children[0].children[0].children[0];
	// tr, alap tabla header, Pos, Team, Ctr, stb...
	var tr0 = tbody.children[0];
	
	// osszes meccs kiszamitasa egyszer itt eleg, elso sor alapjan
	var win = parseInt(tbody.children[1].children[4].innerHTML);
	var draw = parseInt(tbody.children[1].children[5].innerHTML);
	var loss = parseInt(tbody.children[1].children[6].innerHTML);
	var games = win + draw + loss;
	
	CreateGamesAndDiffHeaders(tr0);
	
	FillGamesAndDiffs(tbody, games);
	
}

function CreateGamesHeader(tr0) {
	CreateHeader("G", 30, 4, tr0);
}
function CreateDiffHeader(tr0) {
	CreateHeader("Diff", 40, 10, tr0);
}
function CreateHeader(header_text, width, pos, tr0){
	var b = document.createElement("b");
	b.innerHTML = header_text;
	var td = document.createElement("td");
	td.setAttribute("width", width);
	td.setAttribute("valign", "middle");
	td.setAttribute("bgcolor", "#cdcdcd");
	td.setAttribute("align", "center");
	td.setAttribute("style", "border: 1px solid #000000;");
	td.appendChild(b);
	tr0.insertBefore(td, tr0.children[pos]);
}
function CreateGamesAndDiffHeaders(tr0) {
	CreateGamesHeader(tr0);
	CreateDiffHeader(tr0);
}

function FillGames(tr_i, games){
	CreateFill(tr_i, games, 30, 4);
}
function FillDiffs(tr_i, diff){
	CreateFill(tr_i, diff, 40, 10);
}
function CreateFill(tr_i, innerHTML, width, pos){
	var td = document.createElement("td");
	td.setAttribute("width", width);
	td.setAttribute("valign", "middle");//
	td.setAttribute("align", "center");//
	td.innerHTML = innerHTML;
	tr_i.insertBefore(td, tr_i.children[pos]);
}
function FillGamesAndDiffs(tbody, games){
	for (i = 1; i < tbody.children.length; i++) {
		
		var tr_i = tbody.children[i];
		
		FillGames(tr_i, games);
		
		// golkulonbseg kiszamitasa minden sorban kulon
		var gf = parseInt(tr_i.children[8].innerHTML);
		var ga = parseInt(tr_i.children[9].innerHTML);
		var diff = gf - ga;
		
		FillDiffs(tr_i, diff);
	}
}*/

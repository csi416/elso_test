// ==UserScript==
// @name     		thb_tables_wc
// @namespace   csi416_namespace
// @description teamhb world cup season selector and new columns: "G" meaning "played Games" and "Dif" as "Goal Difference"
// @include     *teamhb.org/index.php?page=home&subpage=wc&section=2*
// @version  		1
// @grant    		none
// ==/UserScript==

(function() {
    'use strict';
	
	var groupa_table = document.getElementById("673");
    var groupb_table = document.getElementById("674");
    var groupc_table = document.getElementById("675");
    var groupd_table = document.getElementById("676");
	
	var tr = groupa_table.children[0].children[0].children[0].children[0].children[0].children[0];
	
	AddSeasonSelection();
	
	function AddSeasonSelection() {
		
		//var label = document.createElement("label");
		//label.innerHTML = "Season";
		//label.setAttribute("style", "margin-left:115px");
		var td_Label = document.createElement("td");
		td_Label.setAttribute("style", "color: #ffffff; font-size: 12px; font-family: verdana, arial, sans-serif; padding-left: 25px;");
		td_Label.setAttribute("valign", "middle");
		td_Label.setAttribute("width", "52");
		td_Label.innerHTML = "Season";
		
		var selectList = document.createElement("select");
		selectList.id = "season";
		selectList.setAttribute("style", "border: 1px solid #ffffff; color: #ffffff; background-color: #000055; font-size: 12px; font-family: verdana, arial, sans-serif;");
		//selectList.setAttribute("style", "margin-left:115px");
		var td_selectList = document.createElement("td");
		td_selectList.setAttribute("style", "padding-left: 2px;");
		td_selectList.setAttribute("valign", "middle");
		td_selectList.appendChild(selectList);
		tr.insertBefore(td_selectList, tr.children[2]);
		tr.insertBefore(td_Label, tr.children[2]);
		
		//var elem = trdetails.children[0].children[0].children[0].children[0];
		//elem.appendChild(label);
		//elem.appendChild(selectList);
		
		var actualSeason = 25;
		for (var i = 1; i <= actualSeason; i++) {
			var option = document.createElement("option");
			option.value = i;
			option.text = i;
			selectList.appendChild(option);
		}
		
		var str = window.location.search;
		if (str.substring(0, 43) == "?page=home&subpage=wc&section=2&showseason=")	{
			selectList.children[str.substring(43) - 1].setAttribute("selected", "selected");
		}
		else {
		  var idx = actualSeason - 1;
		  selectList.children[idx].setAttribute("selected", "selected");
		}
		//var showseason
		//selectList.children[26].setAttribute("selected", "selected");
	}

	var selectSeason = document.getElementById("season");
	selectSeason.onchange = LoadSelectedSeason;

	function LoadSelectedSeason() {
			window.location.href = "https://www.teamhb.org/index.php?page=home&subpage=wc&section=2&showseason=" + this.value;
			
	}

	var header_a_tr = groupa_table.children[0].children[2].children[0].children[0].children[0].children[0];
    ModifyTableHeader(header_a_tr);
    var header_b_tr = groupb_table.children[0].children[2].children[0].children[0].children[0].children[0];
    ModifyTableHeader(header_b_tr);
    var header_c_tr = groupc_table.children[0].children[2].children[0].children[0].children[0].children[0];
    ModifyTableHeader(header_c_tr);
    var header_d_tr = groupd_table.children[0].children[2].children[0].children[0].children[0].children[0];
    ModifyTableHeader(header_d_tr);

    function ModifyTableHeader(tr) {
        var b = document.createElement("b");
        b.innerHTML = "G";
        var newTD = document.createElement("td");
        newTD.setAttribute("width", "30");
        newTD.setAttribute("valign", "middle");
        newTD.setAttribute("bgcolor", "#cdcdcd");
        newTD.setAttribute("align", "center");
        newTD.setAttribute("style", "border: 1px solid #000000;");
        newTD.appendChild(b);
        tr.insertBefore(newTD, tr.children[4]);

        var b2 = document.createElement("b");
        b2.innerHTML = "Dif";
        var newTD2 = document.createElement("td");
        newTD2.setAttribute("width", "40");
        newTD2.setAttribute("valign", "middle");
        newTD2.setAttribute("bgcolor", "#cdcdcd");
        newTD2.setAttribute("align", "center");
        newTD2.setAttribute("style", "border: 1px solid #000000;");
        newTD2.appendChild(b2);
        tr.insertBefore(newTD2, tr.children[10]);
    }

    var tr_a = groupa_table.children[0].children[2].children[0].children[0].children[0].children;
    ModifyTable(tr_a);
    var tr_b = groupb_table.children[0].children[2].children[0].children[0].children[0].children;
    ModifyTable(tr_b);
    var tr_c = groupc_table.children[0].children[2].children[0].children[0].children[0].children;
    ModifyTable(tr_c);
    var tr_d = groupd_table.children[0].children[2].children[0].children[0].children[0].children;
    ModifyTable(tr_d);

    function ModifyTable(tr) {
        for (var i = 1; i < tr.length; i++) {
            // number of wins
            var w = parseInt(tr[i].children[4].innerHTML);
            // number of draws
            var d = parseInt(tr[i].children[5].innerHTML);
            // number of loss
            var l = parseInt(tr[i].children[6].innerHTML);
            // number of all games
            var g = w + d +l;
            var newTD3 = document.createElement("td");
            newTD3.setAttribute("width", "30");
            newTD3.setAttribute("valign", "middle");
            newTD3.setAttribute("align", "center");
            newTD3.innerHTML = g;
            
            // number of goals forward
            var gf = parseInt(tr[i].children[7].innerHTML);
            // number of goals against
            var ga = parseInt(tr[i].children[8].innerHTML);
            // goal difference
            var dif = gf - ga;
            var newTD4 = document.createElement("td");
            newTD4.setAttribute("width", "40");
            newTD4.setAttribute("valign", "middle");
            newTD4.setAttribute("align", "center");
            newTD4.innerHTML = dif;

            tr[i].insertBefore(newTD3, tr[i].children[4]);
            tr[i].insertBefore(newTD4, tr[i].children[10]);
        }
    }









})();
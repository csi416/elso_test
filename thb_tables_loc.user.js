// ==UserScript==
// @name         thb_tables_loc
// @namespace    csi416_namespace
// @description  new columns: "G" meaning "played Games" and "Dif" as "Goal Difference"
// @include        *teamhb.org/index.php?page=home&subpage=hblc*
// @version      1
// @grant        none
// ==/UserScript==

var groupa_table = document.getElementById("groupa_table");
var groupb_table = document.getElementById("groupb_table");

var header_a_tr = groupa_table.children[0].children[2].children[0].children[0].children[0].children[0];
ModifyTableHeader(header_a_tr);
var header_b_tr = groupb_table.children[0].children[2].children[0].children[0].children[0].children[0];
ModifyTableHeader(header_b_tr);

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

function ModifyTable(tr) {
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
}
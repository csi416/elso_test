// ==UserScript==
// @name        csi416_test4
// @namespace   csi416_test_namespace
// @description csi416_test4
// @include     *teamhb.org/index.php?page=team&subpage=spreadsheet*
// @version     1
// @grant       none
// ==/UserScript==


//alert("lofaszjoska");

// styles
var font_pos = "font-family: verdana, arial, sans-serif; font-size: 10px; color: #000000; font-weight: bold;";
var font_simple = "font-size: 10px; font-family: verdana, arial, sans-serif; cursor: pointer;";
var main_skill_bgcolor = "#BFFFBF";
var stamina_skill_bgcolor = "#FFFFAD";
// end of styles

var table_spreadsheet = document.getElementById("offense");
var tbody_spreadsheet = table_spreadsheet.children[0];
var tr_spreadsheet = tbody_spreadsheet.children;
var tr_selection = tr_spreadsheet[0].children[0].children[0].children[0].children[0];

var spreadsheet_length = tbody_spreadsheet.children.length;

var Players = [];
FillPlayers();

tr_selection.children[0].children[0].innerHTML = "Position advice: ";
tr_selection.removeChild(tr_selection.children[1]);
tr_selection.removeChild(tr_selection.children[1]);
for (var i = 2; i < 7; i++) {
	tr_selection.removeChild(tr_selection.children[2]);
}

var select = tr_selection.children[1].children[0];
while (select.firstChild) {
	select.removeChild(select.firstChild);
}
var option_all_value = "All players";
var option_hd_value = "Half def";
var option_ld_value = "Line def";
var option_od_value = "Outside def";
var option_fd_value = "Forward def";
var option_pm_value = "Playmaker att";
var option_w_value = "Wing att";
var option_b_value = "Back att";
var option_p_value = "Pivot att";

AddOptionToPosition(option_all_value);
AddOptionToPosition(option_hd_value);
AddOptionToPosition(option_ld_value);
AddOptionToPosition(option_od_value);
AddOptionToPosition(option_fd_value);
AddOptionToPosition(option_pm_value);
AddOptionToPosition(option_w_value);
AddOptionToPosition(option_b_value);
AddOptionToPosition(option_p_value);

select.onchange = SetPlayersByPosition;

function SetPlayersByPosition() {
	switch (this.value) {
		case option_all_value:
			ShowAllPlayers();
			break;
		case option_hd_value:
			ShowHalfDefenders();
			break;
		case option_ld_value:
			ShowLineDefenders();
			break;
		case option_od_value:
			ShowOutsideDefenders();
			break;
		case option_fd_value:
			ShowForwardDefenders();
			break;
		case option_pm_value:
			ShowPlaymakerAttacking();
			break;
		case option_w_value:
			ShowWingAttacking();
			break;
		case option_b_value:
			ShowBackAttacking();
			break;
		case option_p_value:
			ShowPivotAttacking();
			break;
		default:
			alert("default");
			break;
	}
}

function ShowAllPlayers() {
	location.reload();
}

function ShowHalfDefenders() {
	RemovePlayersFromTbodySpreadsheet();
	var headerSpecialSkills = ["Mk", "Ju", "Bl", "Summary", "Ag", "Sp", "St", "Sm"];
	SetPositionAdviceHeader(headerSpecialSkills);
	SetHalfDefendersToTbodySpreadsheet();
}

function ShowLineDefenders() {
	RemovePlayersFromTbodySpreadsheet();
	var headerSpecialSkills = ["Bl", "Ju", "St", "Mk", "Summary", "Ag", "Sp", "Sm"];
	SetPositionAdviceHeader(headerSpecialSkills);
	SetLineDefendersToTbodySpreadsheet();
}

function ShowOutsideDefenders() {
	RemovePlayersFromTbodySpreadsheet();
	var headerSpecialSkills = ["Bl", "Mk", "Sp", "Ag", "Summary", "St", "Ju", "Sm"];
	SetPositionAdviceHeader(headerSpecialSkills);
	SetOutsideDefendersToTbodySpreadsheet();
}

function ShowForwardDefenders() {
	RemovePlayersFromTbodySpreadsheet();
	var headerSpecialSkills = ["Mk", "Sp", "Bl", "Summary", "Ag", "Ju", "St", "Sm"];
	SetPositionAdviceHeader(headerSpecialSkills);
	SetForwardDefendersToTbodySpreadsheet();
}


function ShowPlaymakerAttacking() {
	RemovePlayersFromTbodySpreadsheet();
	var headerSpecialSkills = ["Pm", "Pa", "Tq", "Summary", "Bc", "Sh", "Ob", "Ag", "Sp", "St", "Ju", "Sm"];
	SetPositionAdviceHeader(headerSpecialSkills);
	SetPlaymakerAttackingToTbodySpreadsheet();
}

function ShowWingAttacking() {
	RemovePlayersFromTbodySpreadsheet();
	var headerSpecialSkills = ["Sp", "Sh", "Ju", "Summary", "Bc", "Pa", "Ob", "Ag", "St", "Sm"];
	SetPositionAdviceHeader(headerSpecialSkills);
	SetWingAttackingToTbodySpreadsheet();
}

function ShowBackAttacking() {
	RemovePlayersFromTbodySpreadsheet();
	var headerSpecialSkills = ["Sh", "Ju", "Pa", "Summary", "Bc", "Ob", "Ag", "Sp", "St", "Sm"];
	SetPositionAdviceHeader(headerSpecialSkills);
	SetBackAttackingToTbodySpreadsheet();
}

function ShowPivotAttacking() {
	RemovePlayersFromTbodySpreadsheet();
	var headerSpecialSkills = ["St", "Ob", "Ag", "Summary", "Bc", "Pa", "Sh", "Sp", "Ju", "Sm"];
	SetPositionAdviceHeader(headerSpecialSkills);
	SetPivotAttackingToTbodySpreadsheet();
}

function SetHalfDefendersToTbodySpreadsheet() {
	Players.sort(function(a,b) { return parseFloat(b.HalfSummary) - parseFloat(a.HalfSummary) } );
	for (i = 0; i < Players.length; i++) {
		if (Players[i].Position != "G") {
			var newTr = document.createElement("tr");
			newTr.setAttribute("class", "tr_normal");
			newTr.setAttribute("onmouseout", "this.className='tr_normal';");
			newTr.setAttribute("onmouseover", "this.className='tr_highlighted';");
			newTr.setAttribute("onclick", Players[i].PlayerLink);
			// ctr
			CreateCtrImgToPlayer(newTr);
			// name
			CreateSimpleTdToPlayer(newTr, Players[i].Name, 120, "left");
			// pos
			CreateSimpleTdToPlayer(newTr, Players[i].Position, 26, "center");
			// age
			CreateSimpleTdToPlayer(newTr, Players[i].Age, 26, "center");
			// rating
			CreateRatingImgToPlayer(newTr);
			// skills
			CreateMainSkillTdToPlayer(newTr, Players[i].Mk);
			CreateMainSkillTdToPlayer(newTr, Players[i].Ju);
			CreateMainSkillTdToPlayer(newTr, Players[i].Bl);

			CreateSecondarySkillTdToPlayer(newTr, Players[i].HalfSummary);
			CreateSecondarySkillTdToPlayer(newTr, Players[i].Ag);
			CreateSecondarySkillTdToPlayer(newTr, Players[i].Sp);
			CreateSecondarySkillTdToPlayer(newTr, Players[i].St);

			CreateStaminaSkillTdToPlayer(newTr);

			tbody_spreadsheet.appendChild(newTr);
		}
	}
}

function SetLineDefendersToTbodySpreadsheet() {
	Players.sort(function(a,b) { return parseFloat(b.LineSummary) - parseFloat(a.LineSummary) } );
	for (i = 0; i < Players.length; i++) {
		if (Players[i].Position != "G") {
			var newTr = document.createElement("tr");
			newTr.setAttribute("class", "tr_normal");
			newTr.setAttribute("onmouseout", "this.className='tr_normal';");
			newTr.setAttribute("onmouseover", "this.className='tr_highlighted';");
			newTr.setAttribute("onclick", Players[i].PlayerLink);
			// ctr
			CreateCtrImgToPlayer(newTr);
			// name
			CreateSimpleTdToPlayer(newTr, Players[i].Name, 120, "left");
			// pos
			CreateSimpleTdToPlayer(newTr, Players[i].Position, 26, "center");
			// age
			CreateSimpleTdToPlayer(newTr, Players[i].Age, 26, "center");
			// rating
			CreateRatingImgToPlayer(newTr);
			// skills
			CreateMainSkillTdToPlayer(newTr, Players[i].Bl);
			CreateMainSkillTdToPlayer(newTr, Players[i].Ju);
			CreateMainSkillTdToPlayer(newTr, Players[i].St);
			CreateMainSkillTdToPlayer(newTr, Players[i].Mk);

			CreateSecondarySkillTdToPlayer(newTr, Players[i].LineSummary);
			CreateSecondarySkillTdToPlayer(newTr, Players[i].Ag);
			CreateSecondarySkillTdToPlayer(newTr, Players[i].Sp);

			CreateStaminaSkillTdToPlayer(newTr);

			tbody_spreadsheet.appendChild(newTr);
		}
	}
}

function SetOutsideDefendersToTbodySpreadsheet() {
	Players.sort(function(a,b) { return parseFloat(b.OutsideSummary) - parseFloat(a.OutsideSummary) } );
	for (i = 0; i < Players.length; i++) {
		if (Players[i].Position != "G") {
			var newTr = document.createElement("tr");
			newTr.setAttribute("class", "tr_normal");
			newTr.setAttribute("onmouseout", "this.className='tr_normal';");
			newTr.setAttribute("onmouseover", "this.className='tr_highlighted';");
			newTr.setAttribute("onclick", Players[i].PlayerLink);
			// ctr
			CreateCtrImgToPlayer(newTr);
			// name
			CreateSimpleTdToPlayer(newTr, Players[i].Name, 120, "left");
			// pos
			CreateSimpleTdToPlayer(newTr, Players[i].Position, 26, "center");
			// age
			CreateSimpleTdToPlayer(newTr, Players[i].Age, 26, "center");
			// rating
			CreateRatingImgToPlayer(newTr);
			// skills
			CreateMainSkillTdToPlayer(newTr, Players[i].Bl);
			CreateMainSkillTdToPlayer(newTr, Players[i].Mk);
			CreateMainSkillTdToPlayer(newTr, Players[i].Sp);
			CreateMainSkillTdToPlayer(newTr, Players[i].Ag);

			CreateSecondarySkillTdToPlayer(newTr, Players[i].OutsideSummary);
			CreateSecondarySkillTdToPlayer(newTr, Players[i].St);
			CreateSecondarySkillTdToPlayer(newTr, Players[i].Ju);

			CreateStaminaSkillTdToPlayer(newTr);

			tbody_spreadsheet.appendChild(newTr);
		}
	}
}

function SetForwardDefendersToTbodySpreadsheet() {
	Players.sort(function(a,b) { return parseFloat(b.ForwardSummary) - parseFloat(a.ForwardSummary) } );
	for (i = 0; i < Players.length; i++) {
		if (Players[i].Position != "G") {
			var newTr = document.createElement("tr");
			newTr.setAttribute("class", "tr_normal");
			newTr.setAttribute("onmouseout", "this.className='tr_normal';");
			newTr.setAttribute("onmouseover", "this.className='tr_highlighted';");
			newTr.setAttribute("onclick", Players[i].PlayerLink);
			// ctr
			CreateCtrImgToPlayer(newTr);
			// name
			CreateSimpleTdToPlayer(newTr, Players[i].Name, 120, "left");
			// pos
			CreateSimpleTdToPlayer(newTr, Players[i].Position, 26, "center");
			// age
			CreateSimpleTdToPlayer(newTr, Players[i].Age, 26, "center");
			// rating
			CreateRatingImgToPlayer(newTr);
			// skills
			CreateMainSkillTdToPlayer(newTr, Players[i].Mk);
			CreateMainSkillTdToPlayer(newTr, Players[i].Sp);
			CreateMainSkillTdToPlayer(newTr, Players[i].Bl);

			CreateSecondarySkillTdToPlayer(newTr, Players[i].ForwardSummary);
			CreateSecondarySkillTdToPlayer(newTr, Players[i].Ag);
			CreateSecondarySkillTdToPlayer(newTr, Players[i].Ju);
			CreateSecondarySkillTdToPlayer(newTr, Players[i].St);

			CreateStaminaSkillTdToPlayer(newTr);

			tbody_spreadsheet.appendChild(newTr);
		}
	}
}

function SetPlaymakerAttackingToTbodySpreadsheet() {
	Players.sort(function(a,b) { return parseFloat(b.PlaymakerSummary) - parseFloat(a.PlaymakerSummary) } );
	for (i = 0; i < Players.length; i++) {
		if (Players[i].Position != "G") {
			var newTr = document.createElement("tr");
			newTr.setAttribute("class", "tr_normal");
			newTr.setAttribute("onmouseout", "this.className='tr_normal';");
			newTr.setAttribute("onmouseover", "this.className='tr_highlighted';");
			newTr.setAttribute("onclick", Players[i].PlayerLink);
			// ctr
			CreateCtrImgToPlayer(newTr);
			// name
			CreateSimpleTdToPlayer(newTr, Players[i].Name, 120, "left");
			// pos
			CreateSimpleTdToPlayer(newTr, Players[i].Position, 26, "center");
			// age
			CreateSimpleTdToPlayer(newTr, Players[i].Age, 26, "center");
			// rating
			CreateRatingImgToPlayer(newTr);
			// skills
			CreateMainSkillTdToPlayer(newTr, Players[i].Pm);
			CreateMainSkillTdToPlayer(newTr, Players[i].Pa);
			CreateMainSkillTdToPlayer(newTr, Players[i].Tq);

			CreateSecondarySkillTdToPlayer(newTr, Players[i].PlaymakerSummary);
			CreateSecondarySkillTdToPlayer(newTr, Players[i].Bc);
			CreateSecondarySkillTdToPlayer(newTr, Players[i].Sh);
			CreateSecondarySkillTdToPlayer(newTr, Players[i].Ob);
			CreateSecondarySkillTdToPlayer(newTr, Players[i].Ag);
			CreateSecondarySkillTdToPlayer(newTr, Players[i].Sp);
			CreateSecondarySkillTdToPlayer(newTr, Players[i].St);
			CreateSecondarySkillTdToPlayer(newTr, Players[i].Ju);

			CreateStaminaSkillTdToPlayer(newTr);

			tbody_spreadsheet.appendChild(newTr);
		}
	}
}

function SetWingAttackingToTbodySpreadsheet() {
	Players.sort(function(a,b) { return parseFloat(b.WingSummary) - parseFloat(a.WingSummary) } );
	for (i = 0; i < Players.length; i++) {
		if (Players[i].Position != "G") {
			var newTr = document.createElement("tr");
			newTr.setAttribute("class", "tr_normal");
			newTr.setAttribute("onmouseout", "this.className='tr_normal';");
			newTr.setAttribute("onmouseover", "this.className='tr_highlighted';");
			newTr.setAttribute("onclick", Players[i].PlayerLink);
			// ctr
			CreateCtrImgToPlayer(newTr);
			// name
			CreateSimpleTdToPlayer(newTr, Players[i].Name, 120, "left");
			// pos
			CreateSimpleTdToPlayer(newTr, Players[i].Position, 26, "center");
			// age
			CreateSimpleTdToPlayer(newTr, Players[i].Age, 26, "center");
			// rating
			CreateRatingImgToPlayer(newTr);
			// skills
			CreateMainSkillTdToPlayer(newTr, Players[i].Sp);
			CreateMainSkillTdToPlayer(newTr, Players[i].Sh);
			CreateMainSkillTdToPlayer(newTr, Players[i].Ju);

			CreateSecondarySkillTdToPlayer(newTr, Players[i].WingSummary);
			CreateSecondarySkillTdToPlayer(newTr, Players[i].Bc);
			CreateSecondarySkillTdToPlayer(newTr, Players[i].Pa);
			CreateSecondarySkillTdToPlayer(newTr, Players[i].Ob);
			CreateSecondarySkillTdToPlayer(newTr, Players[i].Ag);
			CreateSecondarySkillTdToPlayer(newTr, Players[i].St);

			CreateStaminaSkillTdToPlayer(newTr);

			tbody_spreadsheet.appendChild(newTr);
		}
	}
}

function SetBackAttackingToTbodySpreadsheet() {
	Players.sort(function(a,b) { return parseFloat(b.BackSummary) - parseFloat(a.BackSummary) } );
	for (i = 0; i < Players.length; i++) {
		if (Players[i].Position != "G") {
			var newTr = document.createElement("tr");
			newTr.setAttribute("class", "tr_normal");
			newTr.setAttribute("onmouseout", "this.className='tr_normal';");
			newTr.setAttribute("onmouseover", "this.className='tr_highlighted';");
			newTr.setAttribute("onclick", Players[i].PlayerLink);
			// ctr
			CreateCtrImgToPlayer(newTr);
			// name
			CreateSimpleTdToPlayer(newTr, Players[i].Name, 120, "left");
			// pos
			CreateSimpleTdToPlayer(newTr, Players[i].Position, 26, "center");
			// age
			CreateSimpleTdToPlayer(newTr, Players[i].Age, 26, "center");
			// rating
			CreateRatingImgToPlayer(newTr);
			// skills
			CreateMainSkillTdToPlayer(newTr, Players[i].Sh);
			CreateMainSkillTdToPlayer(newTr, Players[i].Ju);
			CreateMainSkillTdToPlayer(newTr, Players[i].Pa);

			CreateSecondarySkillTdToPlayer(newTr, Players[i].BackSummary);
			CreateSecondarySkillTdToPlayer(newTr, Players[i].Bc);
			CreateSecondarySkillTdToPlayer(newTr, Players[i].Ob);
			CreateSecondarySkillTdToPlayer(newTr, Players[i].Ag);
			CreateSecondarySkillTdToPlayer(newTr, Players[i].Sp);
			CreateSecondarySkillTdToPlayer(newTr, Players[i].St);

			CreateStaminaSkillTdToPlayer(newTr);

			tbody_spreadsheet.appendChild(newTr);
		}
	}
}

function SetPivotAttackingToTbodySpreadsheet() {
	Players.sort(function(a,b) { return parseFloat(b.PivotSummary) - parseFloat(a.PivotSummary) } );
	for (i = 0; i < Players.length; i++) {
		if (Players[i].Position != "G") {
			var newTr = document.createElement("tr");
			newTr.setAttribute("class", "tr_normal");
			newTr.setAttribute("onmouseout", "this.className='tr_normal';");
			newTr.setAttribute("onmouseover", "this.className='tr_highlighted';");
			newTr.setAttribute("onclick", Players[i].PlayerLink);
			// ctr
			CreateCtrImgToPlayer(newTr);
			// name
			CreateSimpleTdToPlayer(newTr, Players[i].Name, 120, "left");
			// pos
			CreateSimpleTdToPlayer(newTr, Players[i].Position, 26, "center");
			// age
			CreateSimpleTdToPlayer(newTr, Players[i].Age, 26, "center");
			// rating
			CreateRatingImgToPlayer(newTr);
			// skills
			CreateMainSkillTdToPlayer(newTr, Players[i].St);
			CreateMainSkillTdToPlayer(newTr, Players[i].Ob);
			CreateMainSkillTdToPlayer(newTr, Players[i].Ag);

			CreateSecondarySkillTdToPlayer(newTr, Players[i].PivotSummary);
			CreateSecondarySkillTdToPlayer(newTr, Players[i].Bc);
			CreateSecondarySkillTdToPlayer(newTr, Players[i].Pa);
			CreateSecondarySkillTdToPlayer(newTr, Players[i].Sh);
			CreateSecondarySkillTdToPlayer(newTr, Players[i].Sp);
			CreateSecondarySkillTdToPlayer(newTr, Players[i].Ju);

			CreateStaminaSkillTdToPlayer(newTr);

			tbody_spreadsheet.appendChild(newTr);
		}
	}
}

function CreateCtrImgToPlayer(newTr) {
	var img_ctr = document.createElement("img");
	img_ctr.setAttribute("width", "28");
	img_ctr.setAttribute("height", "16");
	img_ctr.setAttribute("border", "0");
	img_ctr.setAttribute("title", Players[i].CtrTitle);
	img_ctr.setAttribute("src", Players[i].Ctr);
	var newTd = document.createElement("td");
	newTd.setAttribute("width", "30");
	newTd.setAttribute("valign", "middle");
	newTd.setAttribute("height", "18");
	newTd.setAttribute("align", "center");
	newTd.setAttribute("style", "cursor: pointer;");
	newTd.appendChild(img_ctr);
	newTr.appendChild(newTd);
}

function CreateRatingImgToPlayer(newTr) {
	var img_rating = document.createElement("img");
	img_rating.setAttribute("width", "39");
	img_rating.setAttribute("height", "15");
	img_rating.setAttribute("border", "0");
	img_rating.setAttribute("src", Players[i].Rating);
	var newTd = document.createElement("td");
	newTd.setAttribute("width", "37");
	newTd.setAttribute("valign", "middle");
	newTd.setAttribute("align", "center");
	newTd.setAttribute("style", "cursor: pointer;");
	newTd.appendChild(img_rating);
	newTr.appendChild(newTd);
}

function CreateSimpleTdToPlayer(newTr, innerHtml, width, align) {
	var newTd = document.createElement("td");
	newTd.setAttribute("width", width);
	newTd.setAttribute("valign", "middle");
	newTd.setAttribute("align", align);
	newTd.setAttribute("style", font_simple);
	newTd.innerHTML = innerHtml;
	newTr.appendChild(newTd);
}

function CreateMainSkillTdToPlayer(newTr, skill) {
	var font_skill = document.createElement("font");
	font_skill.setAttribute("style", font_pos);
	font_skill.innerHTML = skill;
	var newTd = document.createElement("td");
	newTd.setAttribute("bgcolor", main_skill_bgcolor);
	newTd.setAttribute("width", "22");
	newTd.setAttribute("valign", "middle");
	newTd.setAttribute("align", "center");
	newTd.setAttribute("style", "cursor: pointer;");
	newTd.appendChild(font_skill);
	newTr.appendChild(newTd);
}

function CreateSecondarySkillTdToPlayer(newTr, skill) {
	var font_skill = document.createElement("font");
	font_skill.setAttribute("style", font_pos);
	font_skill.innerHTML = skill;
	var newTd = document.createElement("td");
	newTd.setAttribute("class", "tr_normal");
	newTd.setAttribute("width", "22");
	newTd.setAttribute("valign", "middle");
	newTd.setAttribute("align", "center");
	newTd.setAttribute("style", "cursor: pointer;");
	newTd.appendChild(font_skill);
	newTr.appendChild(newTd);
}

function CreateStaminaSkillTdToPlayer(newTr) {
	var font_skill = document.createElement("font");
	font_skill.setAttribute("style", font_pos);
	font_skill.innerHTML = Players[i].Sm;
	var newTd = document.createElement("td");
	newTd.setAttribute("bgcolor", stamina_skill_bgcolor);
	newTd.setAttribute("width", "22");
	newTd.setAttribute("valign", "middle");
	newTd.setAttribute("align", "center");
	newTd.setAttribute("style", "cursor: pointer;");
	newTd.appendChild(font_skill);
	newTr.appendChild(newTd);
}

function SetPositionAdviceHeader(headers) {
	var del = tr_spreadsheet[1].children[5];
	while (del) {
		tr_spreadsheet[1].removeChild(del);
		del = tr_spreadsheet[1].children[5];
	}
	for (i = 0; i < headers.length; i++) {
		var newTd = document.createElement("td");
		newTd.setAttribute("width", "22");
		newTd.setAttribute("valign", "middle");
		newTd.setAttribute("align", "center");
		newTd.setAttribute("style", "padding-left: 1px; padding-right: 1px;font-size: 11px; font-family: verdana, arial, sans-serif; font-weight: bold;");
		newTd.innerHTML = headers[i];
		tr_spreadsheet[1].appendChild(newTd);
	}
}

function RemovePlayersFromTbodySpreadsheet() {
	var lgth = tbody_spreadsheet.children.length - 2;
	for (i = 0; i < lgth; i++) {
		tbody_spreadsheet.removeChild(tbody_spreadsheet.children[2]);
	}
}

function AddOptionToPosition(option_value) {
	var option = document.createElement("option");
	option.setAttribute("value", option_value);
	option.innerHTML = option_value;
	select.appendChild(option);
}

for (i = 2; i < spreadsheet_length; i++) {
    for (var j = 5; j < 20; j++) {
      //alert("a");
        tr_spreadsheet[i].children[j].onmouseover = SetHighlighting;
        tr_spreadsheet[i].children[j].onmouseout = RemoveHighlighting;
    }
}

function FillPlayers() {

	for (i = 2; i < spreadsheet_length; i++) {
		var tr_i = tr_spreadsheet[i];

		var ctr = tr_i.children[0].children[0].getAttribute("src");
		var ctr_title = tr_i.children[0].children[0].getAttribute("title");
		var player_link = tr_i.children[0].getAttribute("onclick");
		var name = tr_i.children[1].children[0].children[0].children[0].children[0].children[0].innerHTML;
		var pos = tr_i.children[2].innerHTML;
		var age = tr_i.children[3].innerHTML;
		var rating = tr_i.children[4].children[0].getAttribute("src");;
		var Bc = parseInt(tr_i.children[5].children[0].innerHTML);
		var Pa = parseInt(tr_i.children[6].children[0].innerHTML);
		var Sh = parseInt(tr_i.children[7].children[0].innerHTML);
		var Ob = parseInt(tr_i.children[8].children[0].innerHTML);
		var Tq = parseInt(tr_i.children[9].children[0].innerHTML);
		var Pm = parseInt(tr_i.children[10].children[0].innerHTML);
		var Mk = parseInt(tr_i.children[11].children[0].innerHTML);
		var Bl = parseInt(tr_i.children[12].children[0].innerHTML);
		var Re = parseInt(tr_i.children[13].children[0].innerHTML);
		var Oo = parseInt(tr_i.children[14].children[0].innerHTML);
		var Ag = parseInt(tr_i.children[15].children[0].innerHTML);
		var Sp = parseInt(tr_i.children[16].children[0].innerHTML);
		var St = parseInt(tr_i.children[17].children[0].innerHTML);
		var Ju = parseInt(tr_i.children[18].children[0].innerHTML);
		var Sm = parseInt(tr_i.children[19].children[0].innerHTML);
		var Summary = Bc + Pa + Sh + Ob + Tq + Pm + Mk + Bl + Re + Oo + Ag + Sp + St + Ju + Sm;
		var HalfSummary = Mk + Ju + Bl + Sm;
		var LineSummary = Bl + Ju + St + Mk + Sm;
		var OutsideSummary = Bl + Mk + Sp + Ag + Sm;
		var ForwardSummary = Mk + Sp + Bl + Sm;
		var PlaymakerSummary = Pm + Pa + Tq;
		var WingSummary = Sp + Sh + Ju + Tq;
		var BackSummary = Sh + Ju + Pa;
		var PivotSummary = St + Ob + Ag;

		var player = { "Ctr": ctr, "Name": name, "Position": pos, "Age": age, "Rating": rating, "Bc": Bc, "Pa": Pa, "Sh": Sh, "Ob": Ob, "Tq": Tq, "Pm": Pm, "Mk": Mk, "Bl": Bl, "Re": Re,
		"Oo": Oo, "Ag": Ag, "Sp": Sp, "St": St, "Ju": Ju, "Sm": Sm,
		"Summary": Summary,
		"HalfSummary": HalfSummary,
		"LineSummary": LineSummary,
		"OutsideSummary": OutsideSummary,
		"ForwardSummary": ForwardSummary,
		"PlaymakerSummary": PlaymakerSummary,
		"WingSummary": WingSummary,
		"BackSummary": BackSummary,
		"PivotSummary": PivotSummary,
		"CtrTitle": ctr_title,
		"PlayerLink": player_link
		};

		Players.push(player);
	}
}

function SetHighlighting() {
    var sor = 0;
    var oszlop = 0;
    for (var k = 2; k < spreadsheet_length; k++) {
        for (var l = 5; l < 20; l++) {
            if (tr_spreadsheet[k].children[l] == this) {
                oszlop = l;
                sor = k;
                k = spreadsheet_length;
                l = 20;
            }
        }
    }
    for (k = 2; k < spreadsheet_length; k++) {
        for (l = 5; l < 20; l++) {
            if (oszlop == l) {
                tr_spreadsheet[k].children[l].className = 'tr_highlighted';
            }
            if (sor == k) {
                tr_spreadsheet[k].children[l].className = 'tr_highlighted';
            }
        }
    }
}

function RemoveHighlighting() {
    for (var k = 2; k < spreadsheet_length; k++) {
        for (var l = 5; l < 20; l++) {
            tr_spreadsheet[k].children[l].className = 'tr_normal';
        }
    }
}


// ==UserScript==
// @name        csi416_test
// @namespace   csi416_test_namespace
// @description csi416_test_description
// @include     *teamhb.org/index.php?page=team&subpage=pldetails*&playerid=*
// @version     1
// @grant       none
// ==/UserScript==


var profile = document.getElementById("profile");
var stats = document.getElementById("stats");
var trdetails = document.getElementById("trdetails");

var tr_profile = profile.children[0].children[0];

var WE = profile.children[0].children[0].children[8].children[1].children[0].innerHTML;
// xy is right-handed/left-handed ...
var preferred_hand = tr_profile.children[12].children[0].children[0].innerHTML;

var home_wrapper = document.getElementById("home_wrapper");
var idx = 2;
if (home_wrapper.children[0].children.length != 4) {
  	idx = 4;
}
var Age = parseInt(home_wrapper.children[0].children[idx].children[0].children[0].children[0].children[1].children[0].children[0].children[2].children[0].innerHTML.substring(0, 2));
var posLength = home_wrapper.children[0].children[idx].children[0].children[0].children[0].children[1].children[0].children[0].children[2].children[0].innerHTML.length;
var Position = home_wrapper.children[0].children[idx].children[0].children[0].children[0].children[1].children[0].children[0].children[2].children[0].innerHTML.substring(posLength - 10);

//profile tab
SetLefhanders();

SetNervousColor();

//stats tab
SetStatsPercent();

SetOther();

//trainig details tab
var coach = 20;
AddHtmlControls();

var tr_trdetails = trdetails.children[0].children[0].children;

for (var i = 1; i < tr_trdetails.length; i++) {
    
    var img = tr_trdetails[i].children[2].children[0].getAttribute("src");
    
    //"images/icons/progress_not.png"
    if (img == "images/icons/progress_not.png") {
        SetLimitedSkillColor(tr_trdetails[i]);
    }
    
    var tr_trprogress = tr_trdetails[i].children[1].children[0].children[0].children[0];
    var training = 0;
    
    while (tr_trprogress.children[training].getAttribute('bgcolor') != null) {
        training++;
    }
    
    /*var focusValue = 0;
    if (i > 0 && i <= 4) {
        focusValue = parseInt(WE) + parseInt(coach) * 2 + 10;
        focusValue = focusValue * 0.9 * 0.7;
    }
    if (i > 4 && i <= 10) {
        focusValue = parseInt(WE) + parseInt(coach) * 2 + 10;
        focusValue = focusValue * 0.9 * 0.75;
    }
    if (i > 10) {
        focusValue = parseInt(WE) + parseInt(coach) * 2 + 10;
        focusValue = focusValue * 0.9 * 0.65;
    }
    var trcalc = parseInt(training) + parseInt(focusValue);
    var title = training + " -> " + trcalc.toFixed(0);*/
    
    tr_trprogress.setAttribute('title', training);
    
    tr_trprogress.onmouseover = SetTrainingCalculated;
    tr_trprogress.onmouseout = SetOriginalBackgroundColors;
}

function SetLimitedSkillColor(tr) {
    var act_skill = tr.children[0].innerHTML;
	var k = 1;
	while (k <= 5) {
		for (var l = 0; l < 6; l = l + 2) {
			var act_html = tr_profile.children[k].children[l].innerHTML;
			if (act_html == act_skill) {
				tr_profile.children[k].children[l + 1].children[0].style.color = "#FF00FF";
				l = 6;
				k = 6;
			}
		}
		k++;
	}
}

function SetTrainingCalculated() {
    var training = parseInt(this.getAttribute("title").substring(0, 2));
    var originalBgColor = this.children[training].getAttribute("bgcolor");
    this.children[training].setAttribute("original_bgcolor", originalBgColor);
    this.children[training].setAttribute("bgcolor", "#00a0ff");
    var i = training + 1;
    var trainingType = this.parentNode.parentNode.parentNode.parentNode.children[0].innerHTML;
	var focusValue = 0;
    coach = document.getElementById("coach_level").value;
    focusValue = parseInt(WE) + parseInt(coach) * 2 + 10;
    if (trainingType == "Ball control"
       || trainingType == "Passing"
       || trainingType == "Shooting"
       || trainingType == "Off the ball") {
        focusValue = focusValue * 0.7;
    }
    if (trainingType == "Blocking"
       || trainingType == "Marking"
       || trainingType == "Technique"
       || trainingType == "Playmaking"
       || trainingType == "Reflexes"
       || trainingType == "One on one") {
        focusValue = focusValue * 0.75;
    }
    if (trainingType == "Agility"
       || trainingType == "Speed"
       || trainingType == "Strength"
       || trainingType == "Jumping"
       || trainingType == "Stamina") {
        focusValue = focusValue * 0.65;
			  // +20% from phys centre
			  focusValue = focusValue * 1.2;
    }
	// Age influence
	if (Age == 28) {
		focusValue = focusValue * 0.9;
	}
	if (Age == 29) {
		focusValue = focusValue * 0.8;
	}
	if (Age == 30) {
		focusValue = focusValue * 0.6;
	}
	if (Age == 31) {
		focusValue = focusValue * 0.4;
	}
	if (Age == 32) {
		focusValue = focusValue * 0.2;
	}
	if (Age > 32) {
		focusValue = 0;
	}
	
	focusValue = Math.round(focusValue);
    var j = training + focusValue - 1;
    
    while (i < 100 && i < j) {
        var originalBgColor = this.children[i].getAttribute("bgcolor");
        this.children[i].setAttribute("original_bgcolor", originalBgColor);
        var mod = i % 2;
        if (mod == 0) {
            this.children[i].setAttribute("bgcolor", "#ffffff");
        }
        else {
            this.children[i].setAttribute("bgcolor", "#000000");
        }
        i++;
    }
    if (j >= 100) {
        j -= 100;
        for (i = 0; i < j; i++) {
            var originalBgColor = this.children[i].getAttribute("bgcolor");
            this.children[i].setAttribute("original_bgcolor", originalBgColor);
            mod = i % 2;
            if (mod == 0) {
                this.children[i].setAttribute("bgcolor", "#ffffff");
            }
            else {
                this.children[i].setAttribute("bgcolor", "#000000");
			}
		}
    }
    originalBgColor = this.children[i].getAttribute("bgcolor");
    this.children[i].setAttribute("original_bgcolor", originalBgColor);
    this.children[i].setAttribute("bgcolor", "#00a0ff");
	var title = training + " -> " + (training + focusValue).toString();
	this.setAttribute("title", title);
}

function SetOriginalBackgroundColors () {
    for (i = 0; i < 100; i++) {
        var originalBgColor = this.children[i].getAttribute("original_bgcolor");
        if (originalBgColor != null) {
            if (originalBgColor == "null") {
                this.children[i].removeAttribute("bgcolor");
            }
            else {
                this.children[i].setAttribute("bgcolor", originalBgColor);
            }
        }
    }
}
function SetLefhanders() {
    if (preferred_hand == "left-handed") {
        var pos_tr = tr_profile.children[11].children[0].children[0].children[0].children[0];
        var pos_tr_1 = pos_tr.children[0];
		pos_tr.removeChild(pos_tr_1);
        pos_tr.appendChild(pos_tr_1);
        pos_tr.children[0].setAttribute("align", "left");
        pos_tr.children[1].setAttribute("align", "right");
        
		var han_tr = tr_profile.children[12].children[0];
        han_tr.setAttribute("align", "right");
        
		var ner_tr = tr_profile.children[13].children[0];
        ner_tr.setAttribute("align", "right");
    }
}

function SetNervousColor() {
    var ner_td = tr_profile.children[13].children[0];
    var ner = ner_td.children[0].innerHTML;

    if (ner == "ice-cold") {
        ner_td.style.color = "#009900";
    }
    if (ner == "a bit nervous") {
        ner_td.style.color = "#0000FF";
    }
    if (ner == "very nervous") {
        ner_td.style.color = "#CC0000";
    }
}

function SetOther() {
//region Need to max talent
  var talent_stars;
  if (idx == 2) {
    	talent_stars=home_wrapper.children[0].children[2].children[0].children[0].children[0].children[2].children[0].children[0].children[0].children[2].children[1].children[0].getAttribute("src").substring(13,16); 
  }
  else {
    	//talent_stars = "4-f";
    	talent_stars = "5-h";
  }
  //alert(talent_stars);
	//var talent_stars=home_wrapper.children[0].children[2].children[0].children[0].children[0].children[2].children[0].children[0].children[0].children[2].children[1].children[0].getAttribute("src").substring(13,16); 
	var alap=parseInt(talent_stars.substring(0,1))*2;  
	if(talent_stars.substring(2) == "h") {
		alap-=1;
	}
	var talent = alap + 10;
	var Bc = tr_profile.children[1].children[1].children[0].innerHTML;
	var Pa = tr_profile.children[2].children[1].children[0].innerHTML;
	var Sh = tr_profile.children[3].children[1].children[0].innerHTML;
	var Ob = tr_profile.children[4].children[1].children[0].innerHTML;
	var Tq = tr_profile.children[5].children[1].children[0].innerHTML;
	var Pm = tr_profile.children[1].children[3].children[0].innerHTML;
	var Ma = tr_profile.children[2].children[3].children[0].innerHTML;
	var Bl = tr_profile.children[3].children[3].children[0].innerHTML;
	var Ag = tr_profile.children[1].children[5].children[0].innerHTML;
	var Sp = tr_profile.children[2].children[5].children[0].innerHTML;
	var St = tr_profile.children[3].children[5].children[0].innerHTML;
	var Ju = tr_profile.children[4].children[5].children[0].innerHTML;
	var Sm = tr_profile.children[5].children[5].children[0].innerHTML;
	var Re = tr_profile.children[4].children[3].children[0].innerHTML;
	var Oo = tr_profile.children[5].children[3].children[0].innerHTML;
	var talent_skills;
	if(Position == "goalkeeper") {
	talent_skills = 3 * talent - Re - Oo - Tq;
	}
	else if(Position == "enter back") {
	talent_skills = 8 * talent - Bc - Pa - Sh - Ob - Tq - Pm - Ma - Bl;
	}
	else {
	talent_skills = 7 * talent - Bc - Pa - Sh - Ob - Tq - Ma - Bl;
	}
	var minAg = 15 - Ag;
	if (minAg < 0) minAg = 0;
	var maxAg = 20 - Ag;
	var minSp = 13 - Sp;
	if (minSp < 0) minSp = 0;
	var maxSp = 20 - Sp;
	var minSt = 15 - St;
	if (minSt < 0) minSt = 0;
	var maxSt = 20 - St;
	var minJu = 13 - Ju;
	if (minJu < 0) minJu = 0;
	var maxJu = 20 - Ju;
	var minSm = 13 - Sm;
	if (minSm < 0) minSm = 0;
  
  var minAg_new = 13 - Ag;
	if (minAg_new < 0) minAg_new = 0;
	
	var minSp_new = 13 - Sp;
	if (minSp_new < 0) minSp_new = 0;
	
	var minSt_new = 13 - St;
	if (minSt_new < 0) minSt_new = 0;

	var minJu_new = 13 - Ju;
	if (minJu_new < 0) minJu_new = 0;
	
	var minSm_new = 13 - Sm;
	if (minSm_new < 0) minSm_new = 0;
	
	var minPhis = minAg + minSp + minSt + minJu + minSm;
	//var maxPhis = maxAg + maxSp + maxSt + maxJu;
  var nyuggerPhis = minAg_new + minSp_new + minSt_new + minJu_new + minSm_new;
	var s1 = talent_skills.toString();
	var s2 = minPhis.toString();
	var s3 = nyuggerPhis.toString();
	
	var need_to_max_talent = s1 + "(" + s2 + "," + s3 + ")";
	//alert(from_training);
	
//endregion

//region From training
	//var home_wrapper=document.getElementById("home_wrapper");
	//var age=document.getElementById("home_wrapper").children[0].children[2].children[0].children[0].children[0].children[1].children[0].children[0].children[2].children[0].innerHTML.substring(0, 2);
	var y = 0;
	if (Age < 28) {
		y = 27 - Age + 2.9;
	}
	if (Age == 28) {
		//y = 0.4 + 0.8 + 0.6 + 0.4 + 0.2; // = 2.4;
    y = 0.9 + 0.8 + 0.6 + 0.4 + 0.2; // = 2.4;
	}
	if (Age == 29) {
		//y = 0.4 + 0.6 + 0.4 + 0.2;
    y = 0.8 + 0.6 + 0.4 + 0.2;
	}
	if (Age == 30) {
		//y = 0.3 + 0.4 + 0.2;
    y = 0.4 + 0.2;
	}
	if (Age == 31) {
		//y = 0.2 + 0.2;
    y = 0.2;
	}
	if (Age == 32) {
		y = 0.2;
	}
	y*=19;
	//alert(y);
	//korrigáció sérülés és training focus miatt
	var from_training = Math.round(((parseInt(WE) + 50) * y) / 100);
//endregion

	
	var td_SetOther01 = CreateTd1("Need to max talent", "#edeae1");
	var td_SetOther02 = CreateTd2(need_to_max_talent, "#e8e6d4");
	//var td_SetOther03 = CreateTd1("Fromtraining(+-5)", "#edeae1");
  var td_SetOther03 = CreateTd1("From training", "#edeae1");
	var td_SetOther04 = CreateTd2(from_training, "#e8e6d4");
	var tr_dummy = document.createElement("tr");
	tr_dummy.appendChild(td_SetOther01);
	tr_dummy.appendChild(td_SetOther02);
	tr_dummy.appendChild(td_SetOther03);
	tr_dummy.appendChild(td_SetOther04);
	tr_profile.insertBefore(tr_dummy, tr_profile.children[9]);
	
}

function CreateTd1(innerHtml, bgColor) {
	var td_CreateTd = document.createElement("td");
	td_CreateTd.setAttribute("valign", "middle");
	td_CreateTd.setAttribute("bgcolor", bgColor);
	td_CreateTd.setAttribute("align", "left");
	td_CreateTd.setAttribute("style", "font-family: verdana, arial, sans-serif; font-size: 12px; padding-left: 2px;");
	td_CreateTd.innerHTML = innerHtml;
	return td_CreateTd;
}

function CreateTd2(innerHtml, bgColor) {
	var td_CreateTd = document.createElement("td");
	td_CreateTd.setAttribute("valign", "middle");
	td_CreateTd.setAttribute("bgcolor", bgColor);
	td_CreateTd.setAttribute("align", "center");
	//td_CreateTd.setAttribute("style", "font-family: verdana, arial, sans-serif; font-size: 12px; padding-left: 2px;");
	var font_CreateTd = document.createElement("font");
	font_CreateTd.setAttribute("style", "font-family: verdana, arial, sans-serif; font-size: 12px; color: #008800; font-weight: bold;");
	font_CreateTd.innerHTML = innerHtml;
	td_CreateTd.appendChild(font_CreateTd);
	return td_CreateTd;
}

function SetStatsPercent() {
    var statsLength = stats.children.length;

    for (var i = 1; i < statsLength; i++) {
        SetStatsPercentOneSeason(stats.children[i]);
    }
}

function SetStatsPercentOneSeason(div_stats) {

	//var tbody_stats = stats.children[0].children[0];
	var tr_stats = div_stats.children[0].children[0].children;

	var stat_games = tr_stats[0].children[1].innerHTML;

	if (stat_games != "0") {
		var times_played = tr_stats[0].children[3].innerHTML;
		var percent = (parseInt(times_played) * 10) / (parseInt(stat_games) * 6);
		var td_games = document.createElement("td");
		td_games.setAttribute("width", "64");
		td_games.setAttribute("valign", "middle");
		td_games.setAttribute("bgcolor", "#edeae1");
		td_games.setAttribute("align", "center");
		td_games.setAttribute("style", "font-family: verdana, arial, sans-serif; font-size: 12px; color: #000000; font-weight: bold;");
		var s = percent.toString();
		if (s.length > 2) {
			if (s.substring(1, 2) == ".") {
				//s.substring(0, 5)
				s = s.substring(0, 4);
			}
			else {
				s = s.substring(0, 5);
			}
		}
		s = s + "%";
		td_games.innerHTML = s;
		tr_stats[0].appendChild(td_games);
		
		for (var tr_index = 1; tr_index < 5; tr_index++) {
			var osszes = tr_stats[tr_index].children[1].innerHTML;
			if (osszes != "0") {
				var szazalek = tr_stats[tr_index].children[3].innerHTML;
				percent = (parseInt(szazalek) * 100) / parseInt(osszes);
				
				var td_stats = document.createElement("td");
				td_stats.setAttribute("width", "64");
				td_stats.setAttribute("valign", "middle");
				var bgcolor = tr_stats[tr_index].children[1].getAttribute("bgcolor");
				td_stats.setAttribute("bgcolor", bgcolor);
				td_stats.setAttribute("align", "center");
				td_stats.setAttribute("style", "font-family: verdana, arial, sans-serif; font-size: 12px; color: #000000; font-weight: bold;");
				s = percent.toString();
				if (s.length > 2) {
					if (s.substring(1, 2) == ".") {
						//s.substring(0, 5)
						s = s.substring(0, 4);
					}
					else {
						s = s.substring(0, 5);
					}
				}
				s = s + "%";
				td_stats.innerHTML = s;
				tr_stats[tr_index].appendChild(td_stats);
				
			}
		}
		
		for (tr_index = 6; tr_index < 10; tr_index++) {
			var conceded = tr_stats[tr_index].children[1].innerHTML;
            var saved = tr_stats[tr_index].children[3].innerHTML;
            osszes = parseInt(conceded) + parseInt(saved);
			if (osszes != 0) {
				//szazalek = tr_stats[tr_index].children[3].innerHTML;
				percent = (parseInt(saved) * 100) / parseInt(osszes);

				td_stats = document.createElement("td");
				td_stats.setAttribute("width", "64");
				td_stats.setAttribute("valign", "middle");
				td_stats.setAttribute("bgcolor", "#edeae1");
				td_stats.setAttribute("align", "center");
				td_stats.setAttribute("style", "font-family: verdana, arial, sans-serif; font-size: 12px; color: #000000; font-weight: bold;");
				var s = percent.toString();
				if (s.length > 2) {
					if (s.substring(1, 2) == ".") {
						//s.substring(0, 5)
						s = s.substring(0, 4);
					}
					else {
						s = s.substring(0, 5);
					}
				}
				s = s + "%";
				td_stats.innerHTML = s;
				tr_stats[tr_index].appendChild(td_stats);
				
			}
		}
		
		tr_stats[10].children[0].style.color = "#A68400";
		tr_stats[10].children[1].style.color = "#A68400";
		tr_stats[10].children[2].style.color = "#FF0000";
		tr_stats[10].children[3].style.color = "#FF0000";
		tr_stats[11].children[0].style.color = "#C67D33";
		tr_stats[11].children[1].style.color = "#C67D33";
		
	}
	
}

function AddHtmlControls() {
    var label = document.createElement("label");
    label.innerHTML = "coach level:";
    label.setAttribute("style", "margin-left:115px");
    var selectList = document.createElement("select");
    selectList.id = "coach_level";
    //selectList.setAttribute("style", "margin-left:115px");
    var elem = trdetails.children[0].children[0].children[0].children[0];
    elem.appendChild(label);
    elem.appendChild(selectList);
    
    for (var i = 1; i < 21; i++) {
        var option = document.createElement("option");
        option.value = i;
        option.text = i;
        selectList.appendChild(option);
    }
    
    selectList.children[coach - 1].setAttribute("selected", "selected");
}

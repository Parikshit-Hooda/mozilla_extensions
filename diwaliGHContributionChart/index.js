/*
Just draw a border round the document.body.

var contriSquareClass = document.getElementsByClassName("ContributionCalendar-day");

for (var i = 0; i < contriSquareClass.length; i++) {
  var ele = contriSquareClass[i];
  // var eleAttribute = ele.attribute["data-level"];
  // console.log(eleAttribute);
  console.log(ele);
  var eleAttribute = ele.getAttribute("data-level");
  console.log(eleAttribute);
  // Do stuff

  --color-calendar-halloween-graph-day-L1-bg: #ffee4a;
  --color-calendar-halloween-graph-day-L2-bg: #ffc501;
  --color-calendar-halloween-graph-day-L3-bg: #fe9600;
  --color-calendar-halloween-graph-day-L4-bg: #03001c;
  --color-calendar-graph-day-bg: #ebedf0;
  --color-calendar-graph-day-border: rgba(27, 31, 35, 0.06);
  --color-calendar-graph-day-L1-bg: #9be9a8;
  --color-calendar-graph-day-L2-bg: #40c463;
  --color-calendar-graph-day-L3-bg: #30a14e;
  --color-calendar-graph-day-L4-bg: #216e39;
  --color-calendar-graph-day-L1-border: rgba(27, 31, 35, 0.06);
  --color-calendar-graph-day-L2-border: rgba(27, 31, 35, 0.06);
  --color-calendar-graph-day-L3-border: rgba(27, 31, 35, 0.06);
  --color-calendar-graph-day-L4-border: rgba(27, 31, 35, 0.06);


 	Canary Yellow 	#FFFF8F 	rgb(255, 255, 143) level 0
Yellow 	#FFFF00 	rgb(255, 255, 0) level 4
 	Mustard Yellow 	#FFDB58 	rgb(255, 219, 88)
Pastel Yellow 	#FFFAA0 	rgb(255, 250, 160) level 0

Bright Yellow 	#FFEA00 	rgb(255, 234, 0) level 4

Maize 	#FBEC5D 	rgb(251, 236, 93) level 2,3
Maize 	#FBEC5D 	rgb(251, 236, 93)

Canary Yellow 	#FFFF8F 	rgb(255, 255, 143) level 1

Lemon Yellow 	#FAFA33 	rgb(250, 250, 51)
}


*/
document.body.style.border = "5px solid red";

var contriSquareClass = document.getElementsByClassName("ContributionCalendar-day");

for (var i = 0; i < contriSquareClass.length; i++) {
  var ele = contriSquareClass[i];
  // var eleAttribute = ele.attribute["data-level"];
  // console.log(eleAttribute);
  // console.log(ele);
  var eleDataLevelValue = ele.getAttribute("data-level");

  console.log(eleDataLevelValue);

  if (eleDataLevelValue==4){
          ele.style.fill = "#FFEA00";
      }else if (eleDataLevelValue==3){
          ele.style.fill = "	#F4C430";
      }else if (eleDataLevelValue==2){
          ele.style.fill = "#FBEC5D";
      }else if (eleDataLevelValue==1){
          ele.style.fill = "#FFFF8F";
      }else{
          ele.style.fill = "#ebedf0";
      }
  }

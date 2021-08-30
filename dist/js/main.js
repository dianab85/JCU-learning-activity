"use strict";(function(){function a(a,b){a.classList.contains(b)&&a.classList.remove(b)}function b(a,b){var c=a.indexOf(b);return-1!==c&&(a=a.filter(function(a){return a!==b})),a}function c(c){var d="undefined"!=typeof c&&null!==c?c.currentTarget:document.querySelector(".stomach-regions--region[data-key='1']");var e=!0,f=!0,g=parseInt(n.getAttribute("data-key")),h=parseInt(d.getAttribute("data-key"));if(d.getAttribute("aria-checked"))switch(d.getAttribute("aria-checked")){case"true":d.setAttribute("aria-checked","false");break;case"false":d.setAttribute("aria-checked","true");}d.classList.contains("input--select")?0<d.value&&(l[g-1].selectedRegion=parseInt(d.value)):!0===d.checked?(l[g-1].selectedOrgans=b(l[g-1].selectedOrgans,h),l[g-1].selectedOrgans.push(h)):l[g-1].selectedOrgans=b(l[g-1].selectedOrgans,h),e=!(parseInt(n.value)!==parseInt(n.getAttribute("data-key")));for(var i=l[g-1].organIDs,j=0;j<i.length;j++)if(!1===document.querySelector(".organ-checkbox--input[data-key='"+i[j]+"']").checked){f=!1;break}!0==e&&!0==f?(o=b(o,g),o.push(g),document.querySelector(".section-complete").style.visibility="visible"):(o=b(o,g),document.querySelector(".section-complete").style.visibility="hidden"),r.forEach(function(b){a(b,"stomach-regions--region--center__complete")}),o.forEach(function(a){document.querySelector(".stomach-regions--region--center[data-key='"+a+"']").classList.add("stomach-regions--region--center__complete")}),localStorage.setItem("completedRegions",JSON.stringify(o)),localStorage.setItem("answersArray",JSON.stringify(l))}function d(a){e(),c(a)}function e(){0!==parseInt(n.value)&&(parseInt(n.value)===parseInt(n.getAttribute("data-key"))?(a(n,"input--select__correct"),a(n,"input--select__incorrect"),a(n.parentNode,"select-wrap__correct"),a(n.parentNode,"select-wrap__incorrect"),n.parentNode.classList.add("select-wrap__correct"),n.classList.add("input--select__correct")):(a(n,"input--select__correct"),a(n,"input--select__incorrect"),a(n.parentNode,"select-wrap__correct"),a(n.parentNode,"select-wrap__incorrect"),n.parentNode.classList.add("select-wrap__incorrect"),n.classList.add("input--select__incorrect")))}function f(){v.forEach(function(a){a.checked=!1}),a(n,"input--select__correct"),a(n,"input--select__incorrect"),a(n.parentNode,"select-wrap__correct"),a(n.parentNode,"select-wrap__incorrect"),n.value=0}function g(b){var c=l[b-1].selectedOrgans,d=l[b-1].selectedRegion;0<c.length&&c.forEach(function(a){document.querySelector(".organ-checkbox--input[data-key='"+a+"']").checked=!0}),null!==d&&0!==d&&(n.value=d,parseInt(n.value)===b?(a(n,"input--select__correct"),a(n,"input--select__incorrect"),a(n.parentNode,"select-wrap__correct"),a(n.parentNode,"select-wrap__incorrect"),n.parentNode.classList.add("select-wrap__correct"),n.classList.add("input--select__correct")):(a(n,"input--select__correct"),a(n,"input--select__incorrect"),a(n.parentNode,"select-wrap__correct"),a(n.parentNode,"select-wrap__incorrect"),n.parentNode.classList.add("select-wrap__incorrect"),n.classList.add("input--select__incorrect")))}function h(){if(n!==void 0){var b=parseInt(n.getAttribute("data-key")),c=document.querySelector(".stomach-regions--region[data-key='"+b+"']");a(c,"stomach-regions--region__active")}}function i(){localStorage.removeItem("completedRegions"),localStorage.removeItem("answersArray"),o=[],l.forEach(function(a){a.selectedOrgans=[],a.selectedRegion=null}),r.forEach(function(b){a(b,"stomach-regions--region--center__complete")}),h(),f(),m=!1,p.style.display="block",u.style.display="none",t.style.border="0.2rem solid #317dff",localStorage.setItem("quizStarted",!1)}function j(a){a.preventDefault(),!0===m?(f(),k(a)):(m=!0,p.style.display="none",u.style.display="block",t.style.border="0.2rem solid #f1f1f1",k(a)),localStorage.setItem("quizStarted",!0)}function k(b){var c,d,e=b.currentTarget,f=document.getElementById("region");h(),"intro-slider"===e.getAttribute("id")?(c=1,e=document.querySelector(".stomach-regions--region[data-key=\"1\"]")):c=parseInt(e.getAttribute("data-key")),document.querySelector(".section-complete").style.visibility=0>o.indexOf(c)?"hidden":"visible",g(c),e.classList.add("stomach-regions--region__active"),document.getElementById("region-heading").innerHTML=l[c-1].regionLoc,f.setAttribute("data-key",c);var i=l[c-1],j=document.querySelectorAll(".organ-checkbox--name");j.forEach(function(b){d=parseInt(b.getAttribute("data-key")),0>i.organIDs.indexOf(d)?(a(b,"organ-checkbox--name__incorrect"),a(b,"organ-checkbox--name__correct"),b.classList.add("organ-checkbox--name__incorrect")):(a(b,"organ-checkbox--name__incorrect"),a(b,"organ-checkbox--name__correct"),b.classList.add("organ-checkbox--name__correct"))})}var l=[{id:1,regionLoc:"Upper left region",regionName:"Right hypochondriac region\u200B",organIDs:[1,2,3],selectedRegion:null,selectedOrgans:[]},{id:2,regionLoc:"Upper center region\u200B\u200B",regionName:"Epigastric region\u200B",organIDs:[4,1,5,3,6],selectedRegion:null,selectedOrgans:[]},{id:3,regionLoc:"Upper right region\u200B",regionName:"Left hypochondriac region\u200B",organIDs:[4,1,6,7],selectedRegion:null,selectedOrgans:[]},{id:4,regionLoc:"Center left region\u200B",regionName:"Right lumber region\u200B",organIDs:[1,8,9,3],selectedRegion:null,selectedOrgans:[]},{id:5,regionLoc:"Center center region\u200B",regionName:"Umbilical region\u200B",organIDs:[4,5,8,10],selectedRegion:null,selectedOrgans:[]},{id:6,regionLoc:"Center right region\u200B",regionName:"Left lumbar region\u200B",organIDs:[8,11,6],selectedRegion:null,selectedOrgans:[]},{id:7,regionLoc:"Lower left region\u200B",regionName:"Right iliac region\u200B",organIDs:[8,12,13,9],selectedRegion:null,selectedOrgans:[]},{id:8,regionLoc:"Lower center region\u200B",regionName:"Hypogastric region\u200B",organIDs:[8,14,15],selectedRegion:null,selectedOrgans:[]},{id:9,regionLoc:"Lower right region\u200B",regionName:"Left iliac region\u200B",organIDs:[8,11,14],selectedRegion:null,selectedOrgans:[]}];"undefined"!=typeof localStorage.getItem("answersArray")&&null!==localStorage.getItem("answersArray")&&(l=JSON.parse(localStorage.getItem("answersArray")));var m=!1,n=document.getElementById("region"),o=[];"undefined"!=typeof localStorage.getItem("completedRegions")&&null!==localStorage.getItem("completedRegions")&&(o=JSON.parse(localStorage.getItem("completedRegions")));var p=document.getElementById("intro-slider"),q=document.querySelectorAll(".stomach-regions--region"),r=document.querySelectorAll("span.stomach-regions--region--center"),s=document.getElementById("restart-quiz"),t=document.querySelector(".stomach-region-quiz"),u=document.getElementById("regions-panel"),v=document.querySelectorAll(".organ-checkbox--input");if("undefined"!=typeof localStorage.getItem("quizStarted")&&null!==localStorage.getItem("quizStarted")){m=localStorage.getItem("quizStarted");var w="true"===m;!0==w&&c()}p.addEventListener?p.addEventListener("click",j,!1):p.attachEvent&&p.attachEvent("onclick",j),q.forEach(function(a){a.addEventListener?a.addEventListener("click",j,!1):a.attachEvent&&a.attachEvent("onclick",j)}),s.addEventListener?s.addEventListener("click",i,!1):s.attachEvent&&s.attachEvent("onclick",i),n.addEventListener?n.addEventListener("change",d,!1):n.attachEvent&&n.attachEvent("onchange",d),v.forEach(function(a){a.addEventListener?a.addEventListener("change",c,!1):a.attachEvent&&a.attachEvent("onchange",c)})})();
//# sourceMappingURL=js/maps/main.js.map
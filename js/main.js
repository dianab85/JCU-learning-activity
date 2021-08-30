(function(){
    let answersArray = [
        {
            id:1,
            regionLoc:'Upper left region',
            regionName:'Right hypochondriac region​',
            organIDs:[1,2,3],
            selectedRegion:null,
            selectedOrgans:[]
        },
        {
            id:2,
            regionLoc:'Upper center region​​',
            regionName:'Epigastric region​',
            organIDs:[4,1,5,3,6],
            selectedRegion:null,
            selectedOrgans:[]
        },
        {
            id:3,
            regionLoc:'Upper right region​',
            regionName:'Left hypochondriac region​',
            organIDs:[4,1,6,7],
            selectedRegion:null,
            selectedOrgans:[]
        },
        {
            id:4,
            regionLoc:'Center left region​',
            regionName:'Right lumber region​',
            organIDs:[1,8,9,3],
            selectedRegion:null,
            selectedOrgans:[]
        },
        {
            id:5,
            regionLoc:'Center center region​',
            regionName:'Umbilical region​',
            organIDs:[4,5,8,10],
            selectedRegion:null,
            selectedOrgans:[]
        },
        {
            id:6,
            regionLoc:'Center right region​',
            regionName:'Left lumbar region​',
            organIDs:[8,11,6],
            selectedRegion:null,
            selectedOrgans:[]
        },
        {
            id:7,
            regionLoc:'Lower left region​',
            regionName:'Right iliac region​',
            organIDs:[8,12,13,9],
            selectedRegion:null,
            selectedOrgans:[]
        },
        {
            id:8,
            regionLoc:'Lower center region​',
            regionName:'Hypogastric region​',
            organIDs:[8,14,15],
            selectedRegion:null,
            selectedOrgans:[]
        },
        {
            id:9,
            regionLoc:'Lower right region​',
            regionName:'Left iliac region​',
            organIDs:[8,11,14],
            selectedRegion:null,
            selectedOrgans:[]
        }
    ]

    //find if the answers are stored in the session and override answersArray
    if (typeof localStorage.getItem('answersArray') !== 'undefined' && localStorage.getItem('answersArray') !== null) {
        answersArray = JSON.parse(localStorage.getItem('answersArray'));  
     
    }


    let quizStarted = false,
    currentRegion = document.getElementById('region'),
    completedRegions = [];

    // find out the completed regions in case there was some progress in the activity
    if (typeof localStorage.getItem('completedRegions') !== 'undefined' && localStorage.getItem('completedRegions') !== null) {
        completedRegions = JSON.parse(localStorage.getItem('completedRegions'));    
    }

    //the nodes
    let welcomeMsgEl = document.getElementById('intro-slider'),
    regionsNodeArray = document.querySelectorAll('.stomach-regions--region'),
    regionsCenterNodeArray = document.querySelectorAll('span.stomach-regions--region--center'),
    restartBtn = document.getElementById('restart-quiz'),
    quizWrapper = document.querySelector('.stomach-region-quiz'),
    regionPanel = document.getElementById('regions-panel'),
    checkboxesNodeArray = document.querySelectorAll('.organ-checkbox--input');

    if (typeof localStorage.getItem('quizStarted') !== 'undefined' && localStorage.getItem('quizStarted') !== null) {
        quizStarted = localStorage.getItem('quizStarted');    
        var isTrueSet = (quizStarted === 'true');
        
        if(isTrueSet === true){
            updateCompletedRegions();
        }  
    }

    if(welcomeMsgEl.addEventListener){
        welcomeMsgEl.addEventListener("click", displayQuiz, false);  
    }else if(welcomeMsgEl.attachEvent){
        welcomeMsgEl.attachEvent('onclick', displayQuiz);            
    }
    
    regionsNodeArray.forEach(region => {
        if(region.addEventListener){
            region.addEventListener("click", displayQuiz, false);  
        }else if(region.attachEvent){
            region.attachEvent('onclick', displayQuiz);            
        }    
    });
    
    if(restartBtn.addEventListener){
        restartBtn.addEventListener("click", restartQuiz, false);  
    }else if(restartBtn.attachEvent){
        restartBtn.attachEvent('onclick', restartQuiz);            
    }

    if(currentRegion.addEventListener){
        currentRegion.addEventListener("change", revealAnswer, false);  
    }else if(currentRegion.attachEvent){
        currentRegion.attachEvent('onchange', revealAnswer);            
    }

    checkboxesNodeArray.forEach(checkbox => {
        if(checkbox.addEventListener){
            checkbox.addEventListener("change", updateCompletedRegions, false);  
        }else if(checkbox.attachEvent){
            checkbox.attachEvent('onchange', updateCompletedRegions);            
        }    
    });

    function removeClass(node,className){
        if(node.classList.contains(className)){
            node.classList.remove(className);
        }
    }

    function removeArrayItem(array,item)
    {  
        let index = array.indexOf(item);       
        if(index !== -1){            
            array = array.filter(function(id) { 
                    return id !== item;
            });
        }   
        return array;
    }

    function updateCompletedRegions(event){
        let eventElement;
        if (typeof event !== 'undefined' && event !== null) { 
            eventElement = event.currentTarget;
        }else {
            eventElement =  document.querySelector(".stomach-regions--region[data-key='1']");
        }    
        let regionAnswer = true,
        organAnswer = true,
        regionID = parseInt(currentRegion.getAttribute('data-key')),        
        dataKey = parseInt(eventElement.getAttribute('data-key')),
        i;   

        if(eventElement.getAttribute('aria-checked')){
            switch(eventElement.getAttribute('aria-checked')){
                case "true":
                    eventElement.setAttribute('aria-checked','false');
                    break;
                case "false":
                    eventElement.setAttribute('aria-checked','true');
                    break;
            }
        }


        if(eventElement.classList.contains('input--select')){
            if(eventElement.value > 0) {
                answersArray[regionID - 1].selectedRegion = parseInt(eventElement.value);
            }
        }
        else 
        {                    
            if(eventElement.checked === true) {
                answersArray[regionID - 1].selectedOrgans = removeArrayItem(answersArray[regionID - 1].selectedOrgans, dataKey);
                answersArray[regionID - 1].selectedOrgans.push(dataKey);
            } else {
                answersArray[regionID - 1].selectedOrgans = removeArrayItem(answersArray[regionID - 1].selectedOrgans, dataKey);
            }        
        }
        
        if(parseInt(currentRegion.value) === parseInt(currentRegion.getAttribute('data-key'))){
            regionAnswer = true;
        }else{
            regionAnswer = false;
        }

        let organArray = answersArray[regionID - 1].organIDs; 
        for (let i = 0; i < organArray.length; i++) { 
            if(document.querySelector(".organ-checkbox--input[data-key='"+ organArray[i]+"']").checked === false){
                organAnswer = false;
                break;
            }
        }

        if(regionAnswer === true && organAnswer === true){
            completedRegions = removeArrayItem(completedRegions,regionID);         
            completedRegions.push(regionID);
            document.querySelector(".section-complete").style.visibility = "visible";            
        }else {
            completedRegions = removeArrayItem(completedRegions,regionID); 
            document.querySelector(".section-complete").style.visibility = "hidden";                 
        }
        
        regionsCenterNodeArray.forEach(node => {
            removeClass(node, 'stomach-regions--region--center__complete'); 
        });
        completedRegions.forEach(id => { 
            document.querySelector(".stomach-regions--region--center[data-key='"+ id+"']").classList.add('stomach-regions--region--center__complete');
        });    
    
        localStorage.setItem('completedRegions',JSON.stringify(completedRegions));
        localStorage.setItem('answersArray',JSON.stringify(answersArray));                                  
    }


    function revealAnswer(event){  
        addSelectClass();
        updateCompletedRegions(event);
    }

    function addSelectClass(){
        if(parseInt(currentRegion.value) !== 0) {

            if(parseInt(currentRegion.value) === parseInt(currentRegion.getAttribute('data-key'))) {
            
                removeClass(currentRegion,'input--select__correct');       
                removeClass(currentRegion,'input--select__incorrect');       
                removeClass(currentRegion.parentNode,'select-wrap__correct');       
                removeClass(currentRegion.parentNode,'select-wrap__incorrect');               
                currentRegion.parentNode.classList.add('select-wrap__correct');       
                currentRegion.classList.add('input--select__correct'); 
            } else {
                removeClass(currentRegion,'input--select__correct');       
                removeClass(currentRegion,'input--select__incorrect');     
                removeClass(currentRegion.parentNode,'select-wrap__correct');       
                removeClass(currentRegion.parentNode,'select-wrap__incorrect');               
                currentRegion.parentNode.classList.add('select-wrap__incorrect');     
                currentRegion.classList.add('input--select__incorrect'); 
            }
        }   
    }

    function resetAnswers() {    

        checkboxesNodeArray.forEach(checkbox => {              
            checkbox.checked = false
        });
        removeClass(currentRegion,'input--select__correct');       
        removeClass(currentRegion,'input--select__incorrect');  
        removeClass(currentRegion.parentNode,'select-wrap__correct');       
        removeClass(currentRegion.parentNode,'select-wrap__incorrect');         
        currentRegion.value = 0;
    }

    function getAnswers(id) {
        let storedOrganAnswersArray = answersArray[id - 1].selectedOrgans;
        let storedRegionAnswer = answersArray[id - 1].selectedRegion; 
        

        if(storedOrganAnswersArray.length > 0){
            storedOrganAnswersArray.forEach(organId => {
                document.querySelector(".organ-checkbox--input[data-key='"+ organId+"']").checked = true;
            });        
        }    
        if(storedRegionAnswer !== null && storedRegionAnswer !== 0){            
            currentRegion.value = storedRegionAnswer; 
            if(parseInt(currentRegion.value) === id) {
                removeClass(currentRegion,'input--select__correct');       
                removeClass(currentRegion,'input--select__incorrect');     
                removeClass(currentRegion.parentNode,'select-wrap__correct');       
                removeClass(currentRegion.parentNode,'select-wrap__incorrect');               
                currentRegion.parentNode.classList.add('select-wrap__correct');    
                currentRegion.classList.add('input--select__correct'); 
            }else {
                removeClass(currentRegion,'input--select__correct');       
                removeClass(currentRegion,'input--select__incorrect');     
                removeClass(currentRegion.parentNode,'select-wrap__correct');       
                removeClass(currentRegion.parentNode,'select-wrap__incorrect');               
                currentRegion.parentNode.classList.add('select-wrap__incorrect');  
                currentRegion.classList.add('input--select__incorrect'); 
            }     
        }      
    }

    
    function resetRegionClass(){     
        if(currentRegion !== undefined) {        
            
            let dataKey = parseInt(currentRegion.getAttribute('data-key'));     
            let prevRegion = document.querySelector(".stomach-regions--region[data-key='"+dataKey+"']");
            removeClass(prevRegion, 'stomach-regions--region__active');
        }    
    }

    
    function restartQuiz(){    
        
        localStorage.removeItem('completedRegions');
        localStorage.removeItem('answersArray');
        completedRegions = [];
        answersArray.forEach(obj => {
            obj.selectedOrgans =  [];       
            obj.selectedRegion =  null;      
        });
        regionsCenterNodeArray.forEach(region => {
            removeClass(region,'stomach-regions--region--center__complete');
        });

        resetRegionClass();
        resetAnswers();
        quizStarted = false;
        welcomeMsgEl.style.display = 'block';
        regionPanel.style.display = 'none';
        quizWrapper.style.border = '0.2rem solid #317dff';

        localStorage.setItem('quizStarted', false);   
    }

    function displayQuiz(event) {      

        event.preventDefault();

        if(quizStarted === true){
            resetAnswers();           
            updatePanel(event);  
        }else {
            quizStarted = true;
            welcomeMsgEl.style.display = 'none';
            regionPanel.style.display = 'block';
            quizWrapper.style.border = '0.2rem solid #f1f1f1';
            updatePanel(event);  
        }  
        localStorage.setItem('quizStarted', true);       
    }

    function updatePanel(event){

        let regionID,organID, targetClick = event.currentTarget, currentRegion = document.getElementById('region');    

        resetRegionClass();
    
        if(targetClick.getAttribute('id') === "intro-slider"){
            regionID = 1;
            targetClick = document.querySelector('.stomach-regions--region[data-key="1"]');  
            
        }else {
            regionID = parseInt(targetClick.getAttribute('data-key'));
        }
        
        if(completedRegions.indexOf(regionID) < 0) {
            document.querySelector('.section-complete').style.visibility = "hidden";
        }else{
            document.querySelector('.section-complete').style.visibility = "visible";
        }

        getAnswers(regionID);

        targetClick.classList.add('stomach-regions--region__active');

        document.getElementById('region-heading').innerHTML = answersArray[regionID - 1].regionLoc;
        currentRegion.setAttribute('data-key', regionID);

        let regionObj = answersArray[regionID - 1];
        let organsNodeArray = document.querySelectorAll('.organ-checkbox--name');
    
        organsNodeArray.forEach(organInput => {
            organID = parseInt(organInput.getAttribute('data-key'));
            if(regionObj.organIDs.indexOf(organID) < 0){
                removeClass(organInput,'organ-checkbox--name__incorrect');
                removeClass(organInput,'organ-checkbox--name__correct');           
                organInput.classList.add('organ-checkbox--name__incorrect');
            }
            else {
                removeClass(organInput,'organ-checkbox--name__incorrect');
                removeClass(organInput,'organ-checkbox--name__correct');  
                organInput.classList.add('organ-checkbox--name__correct');
            }
        });
    }
})();
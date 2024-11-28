(function(){

     //states
        //this.setState()
        //attemps = 10;
        //quizResults = [
            // {
                // id
                // regions []
                // organs []                
            // }
        //]

        //student

    let answeKey;
    let quizResults = [];
    let attemps = 10;
    let page = 1;

    
    answeKey = [
            {
                id:1,
                regionLoc:'Upper left region',
                regionName:'Right hypochondriac region​',
                organIDs:[1,2,3]
            },
            {
                id:2,
                regionLoc:'Upper center region​​',
                regionName:'Epigastric region​',
                organIDs:[4,1,5,3,6]
            },
            {
                id:3,
                regionLoc:'Upper right region​',
                regionName:'Left hypochondriac region​',
                organIDs:[4,1,6,7]
            },
            {
                id:4,
                regionLoc:'Center left region​',
                regionName:'Right lumbar region​',
                organIDs:[1,8,9,3]
            },
            {
                id:5,
                regionLoc:'Center center region​',
                regionName:'Umbilical region​',
                organIDs:[4,5,8,10]
            },
            {
                id:6,
                regionLoc:'Center right region​',
                regionName:'Left lumbar region​',
                organIDs:[8,11,6]
            },
            {
                id:7,
                regionLoc:'Lower left region​',
                regionName:'Right iliac region​',
                organIDs:[8,12,13,9]
            },
            {
                id:8,
                regionLoc:'Lower center region​',
                regionName:'Hypogastric region​',
                organIDs:[8,14,15]
            },
            {
                id:9,
                regionLoc:'Lower right region​',
                regionName:'Left iliac region​',
                organIDs:[8,11,14]
            }
    ];

    if (typeof localStorage.getItem('quizResults') !== 'undefined' && localStorage.getItem('quizResults') !== null) {

        quizResults = JSON.parse(localStorage.getItem('quizResults'));   
          
    }

    //LOGIN COMPONENT - start button quiz
    let startQuizBtn = document.querySelector('.btn-start-quiz');

    //LOGIN COMPONENT - start quiz event listener
    startQuizBtn.addEventListener("click", loadStomachRegion, false); 

    //LOGIN COMPONENT
    loginComponent = document.getElementById('login-component');

    //QUIZ COMPONENT - stomach regions quiz component - restart button
    let restartBtn = document.getElementById('restart-quiz'),
    
    //QUIZ COMPONENT - stomach regions panel component
    stomachRegionContainers = document.querySelector('.stomach-regions'),    
    stomachRegionSelectors = document.querySelectorAll('.stomach-regions--region'),
    defaultStomachRegionSelector = document.getElementById('region-1'),

    //remaining attempts 
    remainingAttemptsSpan = document.querySelector('.section-remaining-attempts > span');

    //stomach region quiz
    let stomachRegionsQuiz = document.getElementById('stomach-regions-quiz'),
   
    //quiz event listeners
    selectEventListeners = document.querySelectorAll('.input--select'),
    checkboxEventListeners = document.querySelectorAll('.organ-checkbox--input');

    checkboxEventListeners.forEach(checkbox => {        
        checkbox.addEventListener("change", setQuizResults, false);          
    });

    selectEventListeners.forEach(select => {
        select.addEventListener("change", setQuizResults, false); 
    });

    stomachRegionSelectors.forEach(region => {        
        region.addEventListener("click", loadStomachRegion, false);           
    });

    //start again button
    restartBtn.addEventListener("click", resetQuiz, false);  
    
    
    function loadQuiz(){

        //hide login component
        loginComponent.style.display = 'none';

        //load stomach region quiz and stomach region navigation
        stomachRegionsQuiz.style.display = 'block';
        stomachRegionContainers.style.display = 'block';

    }

    function setActiveStomachRegion(node){
        if(node.classList.contains('stomach-regions--region') === true){
            //display active stomach link
            page = parseInt(node.getAttribute('data-key'));
            node.classList.add('stomach-regions--region__active');
        }else {
            defaultStomachRegionSelector.classList.add('stomach-regions--region__active');
        }
    }

    function loadStomachRegion(event){

        event.preventDefault();

        loadQuiz();
        resetStomachRegion(); 
        setActiveStomachRegion(event.currentTarget);

        
         

        //quiz container
        // get stomach region object
        //let stomachRegionObj = getStomachRegion(page);

        
        // set attempts
        remainingAttemptsSpan.innerHTML = attemps;
    
        // if(targetClick.getAttribute('id') === "intro-slider"){
        //     regionID = 1;
        //     targetClick = document.querySelector('.stomach-regions--region[data-key="1"]');  
            
        // }else {
        //     regionID = parseInt(targetClick.getAttribute('data-key'));
        // }

        // if(completedRegions.indexOf(regionID) < 0) {
        //     document.querySelector('.section-complete').style.visibility = "hidden";
        // }else{
        //     document.querySelector('.section-complete').style.visibility = "visible";
        // }

        // targetClick.classList.add('stomach-regions--region__active');

        // document.getElementById('region-heading').innerHTML = answeKey[regionID - 1].regionLoc;
        // currentRegion.setAttribute('data-key', regionID);

        // let regionObj = answeKey[regionID - 1];
        // let organsNodeArray = document.querySelectorAll('.organ-checkbox--name');

        // organsNodeArray.forEach(organInput => {
        //     organID = parseInt(organInput.getAttribute('data-key'));
        //     if(regionObj.organIDs.indexOf(organID) < 0){
        //         removeClass(organInput,'organ-checkbox--name__incorrect');
        //         removeClass(organInput,'organ-checkbox--name__correct');           
        //         organInput.classList.add('organ-checkbox--name__incorrect');
        //     }
        //     else {
        //         removeClass(organInput,'organ-checkbox--name__incorrect');
        //         removeClass(organInput,'organ-checkbox--name__correct');  
        //         organInput.classList.add('organ-checkbox--name__correct');
        //     }
        // });
    }

    function hasCompletedStomachRegion(){

    }

    function getStomachRegion(id) {

        let storedOrganansweKey = answeKey[id - 1].selectedOrgans;
        let storedRegionAnswer = answeKey[id - 1].selectedRegion; 

        if(storedOrganansweKey.length > 0){
            storedOrganansweKey.forEach(organId => {
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

    function resetQuiz(){  
        
        
        
        localStorage.removeItem('quizResults');
        localStorage.removeItem('answeKey');
        quizResults = [];

        regionsCenterNodeArray.forEach(region => {
            removeClass(region,'stomach-regions--region--center__complete');
        });

        setActiveRegionClass();
        resetStomachRegion();
        quizStarted = false;
        welcomeMsgEl.style.display = 'block';
        stomachRegionPanel.style.display = 'none';

        localStorage.setItem('quizStarted', false);   
    }

    function setQuizResults(event){
        
        
        let eventElement;
        if (typeof event !== 'undefined' && event !== null) { 
            eventElement = event.currentTarget;
        }else {
            eventElement =  document.querySelector(".stomach-regions--region[data-key='1']");
        }    

        console.log('set quiz results');
        console.log(eventElement);

        let regionAnswer = true,
        organAnswer = true,
        regionID = parseInt(currentRegion.getAttribute('data-key')),        
        dataKey = parseInt(eventElement.getAttribute('data-key'));

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

        if(event){
            if(eventElement.classList.contains('input--select')){
                if(eventElement.value > 0) {
                    answeKey[regionID - 1].selectedRegion = parseInt(eventElement.value);
                }
            }
            else 
            {                    
                if(eventElement.checked === true) {
                    answeKey[regionID - 1].selectedOrgans = removeArrayItem(answeKey[regionID - 1].selectedOrgans, dataKey);
                    answeKey[regionID - 1].selectedOrgans.push(dataKey);
                } else {
                    answeKey[regionID - 1].selectedOrgans = removeArrayItem(answeKey[regionID - 1].selectedOrgans, dataKey);
                }        
            }
        }
        
        if(parseInt(currentRegion.value) === parseInt(currentRegion.getAttribute('data-key'))){
            regionAnswer = true;
        }else{
            regionAnswer = false;
        }
        
        let organArray = answeKey[regionID - 1].organIDs; 
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
            if(event){
                completedRegions = removeArrayItem(completedRegions,regionID); 
            }            
            document.querySelector(".section-complete").style.visibility = "hidden";                 
        }

        regionsCenterNodeArray.forEach(node => {
            removeClass(node, 'stomach-regions--region--center__complete'); 
        });

        completedRegions.forEach(id => { 
            document.querySelector(".stomach-regions--region--center[data-key='"+ id+"']").classList.add('stomach-regions--region--center__complete');
        });    
    
        localStorage.setItem('completedRegions',JSON.stringify(completedRegions));
        localStorage.setItem('answeKey',JSON.stringify(answeKey));  
        
        if(hasCompletedStomachRegion()){
            //update stomach region link to green or orange
        };
    }

    function resetStomachRegion() {   
        
        let activeStomachRegionSelector = document.querySelector(".stomach-regions--region[data-key='"+page+"']");
        removeClass(activeStomachRegionSelector, 'stomach-regions--region__active');

        checkboxEventListeners.forEach(checkbox => {              
            checkbox.checked = false
        });

        // removeClass(currentRegion,'input--select__correct');       
        // removeClass(currentRegion,'input--select__incorrect');  
        // removeClass(currentRegion.parentNode,'select-wrap__correct');       
        // removeClass(currentRegion.parentNode,'select-wrap__incorrect');         
        // currentRegion.value = 0;
    }

   

    //currentRegion.attachEvent('onchange', revealAnswer);            

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

    function revealAnswer(event){  
        addSelectClass();
        setQuizResults(event);
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


})();
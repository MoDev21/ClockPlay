

document.addEventListener('DOMContentLoaded', function () {

    // DOM elements

    //Alarm Settings variables
    const alarmTimeInput = document.getElementById('alarm-time');
    const alarmNameInput = document.getElementById('alarm-name-input');
    const setAlarmButton = document.getElementById('set-alarm');
    const btn_repeatDate = document.querySelectorAll('.repeat-days label input');
    // const repeatDateName = document.querySelectorAll('.repeat-days label li');
    // const btn_alarmDays = document.querySelectorAll('.alarm-days label input');
    // const dayText = ['Monday','Tuesday','Wednesday','Thursday','Friday','Saturday','Sunday'];
    const monthText = ['January','February','March','April','May','June','July','August','September','October','November','December',];
    var repeatDaysArray = ['Mon','Tue','Wed','Thu','Fri','Sat','Sun'];
    var setRepeatDaysArray = [];
    // var repearDaysString;
    var days = [];
    var alarmArray = [];
    var checkMatchGameSettingsValue;

    //Main clock variables
    const mainClock = document.querySelector('.main-clock__time');
    const mainClock_seconds = document.querySelector('.main-clock__secondes svg circle:nth-child(2)');
    const mainContainer = document.querySelector('.main-container')
    const GlobalDate = new Date();


  
    //options for MatchGame
    // const cardLetterArray = ['A','B','C','D','E'];
    // const cardAmounts = 0;

    //Game Selection variables
    var gameSelection = document.querySelector('.game-choices');



    //Were the set alarms are put 
    $.ajax({
        url: "json/alarms.json",
        data: "data",
        dataType: "json",
        success: function (response) {
            alarmArray = response;
            console.log(alarmArray);
        }
    });

    

    //Show the current time
    function showTime() { 
        const today = new Date();
        let hours = today.getHours();
        let minutes = today.getMinutes();
        let seconds = today.getSeconds();
        hours = checkTime(hours);
        minutes = checkTime(minutes);
        seconds = checkTime(seconds) * (100/60);
        //Light green s
        mainClock_seconds.style.strokeDashoffset = `calc(1540px - ((1540px * ${seconds}) / 100))`;
        
        mainClock.innerHTML =  `${hours}:${minutes}`;
        setTimeout(showTime, 1000);
    }

    showTime();

    function checkTime(i) { 
        if (i < 10) { i = "0" + i};
        return i;
    }

    

    btn_repeatDate.forEach(btn => {
        btn.nextElementSibling.classList.add('repeat-days-btn');
        btn.addEventListener('change', function () {
            if (this.checked) {
                // Checkbox is checked
                console.log("Checkbox is checked");
                btn.nextElementSibling.classList.add('repeat-days-checked');
              } else {
                // Checkbox is unchecked
                console.log("Checkbox is unchecked");
                btn.nextElementSibling.classList.remove('repeat-days-checked');
              }
        });
    })

 
    async function generateMatchGameSettingsOptions() {
        
        let gameSettingOption = document.querySelector('.game-settings-options');
        let option;
        let optionValue = 0;

        

        gameSettingOption.style.gap = '11px';
        // $('.game-settings-options').css('gap', '11px');
        gameSettingOption.innerHTML = '';
        for (let i = 0; i < 3; i++) {
            optionValue++;
            //I generate the html this way 
            switch (optionValue) {
                case 1:
                    option = `
                    <label class="game-settings-toggle">
                        3 sets
                        <input type="radio" class="1" name="game-settings-options-rbtn" value=3 />
                        <span class="match-game-option-1">
                            <svg xmlns="http://www.w3.org/2000/svg" width="79" height="84" viewBox="0 0 79 84" fill="none">
                                <rect x="0.362305" y="0.940796" width="20.1724" height="37.0066" class="game-settings-toggle-unchecked"/>
                                <rect x="0.362305" y="48.6382" width="20.1724" height="35.3618"class="game-settings-toggle-unchecked"/>
                                <rect x="29.8452" y="0.940826" width="19.3966" height="37.0066"class="game-settings-toggle-unchecked"/>
                                <rect x="29.8452" y="48.6382" width="19.3966" height="35.3618"class="game-settings-toggle-unchecked"/>
                                <rect x="59.3276" y="0.940826" width="19.3966" height="37.0066"class="game-settings-toggle-unchecked"/>
                                <rect x="59.3276" y="48.6382" width="19.3966" height="35.3618"class="game-settings-toggle-unchecked"/>
                            </svg>
                        </span>
                    </label>`;                                
                    $(gameSettingOption).append(option);
                    console.log(optionValue);
                    break;
    
                case 2:
                    option = `
                    <label class="game-settings-toggle">
                    4 sets
                    <input type="radio" class="2" name="game-settings-options-rbtn" value=4 />
                        <span class="match-game-option-2">
                            <svg xmlns="http://www.w3.org/2000/svg" width="109" height="84" viewBox="0 0 109 84" fill="none">
                                <rect x="0.603516" y="0.940796" width="19.3966" height="37.0066"class="game-settings-toggle-unchecked"/>
                                <rect x="0.603516" y="48.6382" width="19.3966" height="35.3618"class="game-settings-toggle-unchecked"/>
                                <rect x="30.0864" y="0.940826" width="18.6207" height="37.0066"class="game-settings-toggle-unchecked"/>
                                <rect x="30.0864" y="48.6382" width="18.6207" height="35.3618"class="game-settings-toggle-unchecked"/>
                                <rect x="59.5688" y="0.940826" width="18.6207" height="37.0066"class="game-settings-toggle-unchecked"/>
                                <rect x="88.2759" y="0.940826" width="20.1724" height="37.0066"class="game-settings-toggle-unchecked"/>
                                <rect x="59.5688" y="48.6382" width="18.6207" height="35.3618"class="game-settings-toggle-unchecked"/>
                                <rect x="88.2759" y="48.6382" width="20.1724" height="35.3618"class="game-settings-toggle-unchecked"/>
                            </svg>
                        </span>
                    </label>`;                                
                    $(gameSettingOption).append(option);
                    console.log(optionValue);
                    break;

                case 3:
                    option = `
                    <label class="game-settings-toggle">
                        5 sets
                        <input type="radio" class="3" name="game-settings-options-rbtn" value=5 />
                        <span class="match-game-option-3">
                            <svg xmlns="http://www.w3.org/2000/svg" width="137" height="84" viewBox="0 0 137 84" fill="none">
                                <rect x="0.448242" y="0.940796" width="19.3966" height="37.0066"class="game-settings-toggle-unchecked"/>
                                <rect x="0.448242" y="48.6382" width="19.3966" height="35.3618"class="game-settings-toggle-unchecked"/>
                                <rect x="29.9312" y="0.940826" width="19.3966" height="37.0066"class="game-settings-toggle-unchecked"/>
                                <rect x="29.9312" y="48.6382" width="19.3966" height="35.3618"class="game-settings-toggle-unchecked"/>
                                <rect x="59.4136" y="0.940826" width="19.3966" height="37.0066"class="game-settings-toggle-unchecked"/>
                                <rect x="88.1206" y="0.940826" width="19.3966" height="37.0066"class="game-settings-toggle-unchecked"/>
                                <rect x="117.604" y="0.940826" width="19.3966" height="37.0066"class="game-settings-toggle-unchecked"/>
                                <rect x="59.4136" y="48.6382" width="19.3966" height="35.3618"class="game-settings-toggle-unchecked"/>
                                <rect x="88.1206" y="48.6382" width="19.3966" height="35.3618"class="game-settings-toggle-unchecked"/>
                                <rect x="117.604" y="48.6382" width="19.3966" height="35.3618"class="game-settings-toggle-unchecked"/>
                            </svg>
                        </span>
                    </label>`;                                
                    $(gameSettingOption).append(option);
                    console.log(optionValue);
                    break;
            
                default:
                    break;
            };

            $(".game-settings-toggle").delay(50).each(function(i) {
                $(this).delay(150 * i).queue(function() {
                  $(this).addClass("game-settings-toggle-animation");
                })
            })
            
        }


    }


    async function generateMathEquationSettingsOptions() {
        let gameSettingOption = document.querySelector('.game-settings-options');
        gameSettingOption.style.gap = '30px';


        let operator = `<svg xmlns="http://www.w3.org/2000/svg" width="34" height="34" viewBox="0 0 34 34" fill="none">
                            <path d="M2.66101 16.9931H17M17 16.9931H31.339M17 16.9931V2.65405M17 16.9931V31.3321" stroke="#B0E04A" stroke-width="3.58475" stroke-linecap="round" stroke-linejoin="round"/>
                        </svg>`;


        
        let option = `  
                        <div class="operand">
                            <select name="operand_1" class="operands_select">
                                <option value="1">max 1 digit</option>
                                <option value="2">max 2 digit</option>
                            </select>
                        </div>
                        
                        <div class="operand">
                            <!-- I will eventually add operator options -->
                            ${operator}
                        </div>

                        <div class="operand">
                            <select name="operand_2" class="operands_select">
                                <option value="1">max 1 digit</option>
                                <option value="2">max 2 digit</option>
                            </select>
                        </div>`;
        let optionValue = 0; 

        $(gameSettingOption).html('');
        $(gameSettingOption).append(option);
        $(".operand").delay(50).each(function(i) {
            $(this).delay(150 * i).queue(function() {
              $(this).addClass("game-settings-toggle-animation");
            })
        })
    }


  




    //Game Match Game Settings
    function checkNumberofMatch(checkbox) {
        let checkboxes = document.querySelectorAll('.game-settings-toggle input');
        console.log(checkboxes[0]);
        for (let i = 0; i < checkboxes.length; i++) {
            if (checkboxes[i] != checkbox) {
                if (checkbox.checked) {
                    // Checkbox is checked
                    console.log("Checkbox wiht value " + checkbox.value +" is checked");
                    checkMatchGameSettingsValue = checkbox.value;
                    document.querySelectorAll(`.${checkbox.nextElementSibling.className} svg rect`).forEach(card => {
                        card.classList.add('game-settings-toggle-checked');
                    })
                } 

            }
                
        }

        //Remove class from unchecked buttons
        checkboxes.forEach(cbx => {
            console.log(cbx.checked);
            if(!cbx.checked){
                // Checkbox is unchecked
                document.querySelectorAll(`.${cbx.nextElementSibling.className} svg rect`).forEach(card => {
                    card.classList.remove('game-settings-toggle-checked');
                })
                
            }
        })
    }


    function activeGameOption() {
            // Get the value of the selected option
            let gameSettingOption = document.querySelector('.game-options');
            let gameSettingTitle = document.querySelector('.game-settings-title')
            var selectedOptionValue = gameSelection.value;
            switch (selectedOptionValue) {
                case "Match_Game":

                    gameSettingTitle.style.display = "block";
                    gameSettingOption.style.height = `291px`;
                    generateMatchGameSettingsOptions();
                    checkDefaultNumberofMatch();
                    console.log('Selected option value: ' + selectedOptionValue);
                    break;
    
                case "Math_Equation":
                    gameSettingTitle.style.display = "block";
                    gameSettingOption.style.height = `291px`;
                    generateMathEquationSettingsOptions();
                    console.log('Selected option value: ' + selectedOptionValue);
                    break;
            
                default:
                    gameSettingOption.style.gridTemplateRows = `0fr 0fr`;
                    gameSettingOption.style.height = `141px`;
                    gameSettingTitle.style.display = "none";
                    $(document.querySelector('.game-settings-options')).html('');
                    console.log('Selected option value: none');
             
            }
    }
    activeGameOption();



    function checkDefaultNumberofMatch() {
        let checkboxes = document.querySelectorAll('.game-settings-toggle input');
        checkboxes[0].checked = true;
        console.log(checkboxes[0]);
        for (let i = 0; i < checkboxes.length; i++) {
            if (checkboxes[i].checked) {
                checkMatchGameSettingsValue = checkboxes[i].value;
                document.querySelectorAll(`.${checkboxes[i].nextElementSibling.className} svg rect`).forEach(card => {
                    card.classList.add('game-settings-toggle-checked');
                })
            }
                
        }

    }




    // Add an event listener for the 'change' event
    gameSelection.addEventListener('change', function() {
        activeGameOption()
        // Now you can use the value of the selected option
        
    });

    document.addEventListener("change", function(e){
        const target = e.target.closest(".game-settings-toggle input"); // Or any other selector.
        if(target){
            checkNumberofMatch(target);
            console.log('check value ' + checkMatchGameSettingsValue);
        }
    });



    var operands1Selection = document.querySelector(".operands_select[name='operand_1']");
    var operands2Selection = document.querySelector(".operands_select[name='operand_2']");
    var selectedOptionValue;
    operands1Selection.addEventListener('change', function () {
        selectedOptionValue = operands1Selection.value;
        switch (selectedOptionValue) {
            case "1":
                console.log('Selected option value: ' + selectedOptionValue);
                break;

            case "2":
                console.log('Selected option value: ' + selectedOptionValue);
                break;
        
            default:
                console.log('Selected option value: none');
         
        }
    });

    

    operands2Selection.addEventListener('change', function () {
        selectedOptionValue = operands2Selection.value;
        switch (selectedOptionValue) {
            case "1":
                console.log('Selected option value: ' + selectedOptionValue);
                break;

            case "2":
                console.log('Selected option value: ' + selectedOptionValue);
                break;
        
            default:
                console.log('Selected option value: none');
         
        }
    });



    


    // Alarm Days

    function getDaysInMonth(year, month) {
        // Create a new date object for the first day of the given month
        const date = new Date(year, month, 1);

        // Empties the array
        days = [];
        
    
        // Continue adding days to the days array while the month is the same
        while (date.getMonth() === month) {
            
            days.push(new Date(date).getDate());
            date.setDate(date.getDate() + 1);
        }   

        
    
        return days;
    }

    function getDaysInWeek() {
        //Empties the array
        days = [];

        // Continue adding days to the days array for each day that present in the repeatDaysArray
        repeatDaysArray.forEach(e => {
            days.push(e);

        })        
    
        return days;
    }

    var switcher = false

    var dateToggleInput = document.querySelector('.date-toggle input')

    dateToggleInput.addEventListener('change', function () {
        if (!this.checked) {
            // Checkbox is checked
            console.log('mode false');
            switcher = false;
            AlarmDateModeSwitcher(switcher);
            generateDateToggleBtn();
            $('button').removeClass("button-move");
            let repeatDayToggle = `<svg xmlns="http://www.w3.org/2000/svg" width="30" height="34" viewBox="0 0 30 34" fill="none">
                                        <path d="M19.5 5.09078V1.81143M19.5 5.09078V8.37014M19.5 5.09078H12.75M1.5 14.9288V29.6859C1.5 31.4971 2.84314 32.9653 4.5 32.9653H25.5C27.1569 32.9653 28.5 31.4971 28.5 29.6859V14.9288H1.5Z" stroke="#B0E04A" stroke-width="1.65252" stroke-linecap="round" stroke-linejoin="round"/>
                                        <path d="M1.5 14.9288V8.37014C1.5 6.559 2.84314 5.09079 4.5 5.09079H7.5" stroke="#B0E04A" stroke-width="1.65252" stroke-linecap="round" stroke-linejoin="round"/>
                                        <path d="M7.5 1.81143V8.37014" stroke="#B0E04A" stroke-width="1.65252" stroke-linecap="round" stroke-linejoin="round"/>
                                        <path d="M28.5 14.9288V8.37014C28.5 6.559 27.1569 5.09079 25.5 5.09079H24.75" stroke="#B0E04A" stroke-width="1.65252" stroke-linecap="round" stroke-linejoin="round"/>
                                    </svg>`;
                                 
            $('.date-toggle span').html(repeatDayToggle);
            $('.alarm-form__section-repeat-days').css({    
            'height': '100px'});
        }
        else{
            console.log('mode true');
            switcher = true;
            AlarmDateModeSwitcher(switcher);
            generateDateToggleBtn();
            $('button').addClass("button-move");
            let repeatDayToggle = `<svg xmlns="http://www.w3.org/2000/svg" width="41" height="31" viewBox="0 0 41 31" fill="none">
                                        <path d="M31.0556 24.2883H12.0556C8.53703 24.2883 1.5 22.0483 1.5 13.0883C1.5 4.12834 8.53703 1.88834 12.0556 1.88834H28.9444C32.463 1.88834 39.5 4.12834 39.5 13.0883C39.5 16.4356 38.5179 18.8451 37.1039 20.5502" stroke="#B0E04A" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
                                        <path d="M25.7778 18.6883L31.0556 24.2883L25.7778 29.8883" stroke="#B0E04A" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
                                    </svg>`;
        
            $('.date-toggle span').html(repeatDayToggle);
            $('.alarm-form__section-repeat-days').css({    
                'height': '285px'});

        }
    });

    function AlarmDateModeSwitcher(switcher) {      

        if(!switcher){
            getDaysInWeek();
        }
        else{
            getDaysInMonth(GlobalDate.getFullYear(), GlobalDate.getMonth());
        }

    }

    

    function generateDateToggleBtn() { 
        let repeatDay = document.querySelector('.alarm-form__section-repeat-days ul');

        while (repeatDay.hasChildNodes()) {
            repeatDay.removeChild(repeatDay.firstChild);
        }

        days.forEach(e => {
            let repeatDayBtn = `<label class="toggle">
                                    <input type="checkbox">
                                    <li><p>${e}</p></li>
                                </label>`;                                
            $(repeatDay).append(repeatDayBtn);
            console.log(repeatDay);
        });

        let input = document.querySelectorAll('.repeat-days label input');
        console.log(input);
        
        input.forEach(btn => {
            btn.nextElementSibling.classList.add('alarm-days-btn');
            btn.addEventListener('change', function () {
                if (this.checked) {
                    // Checkbox is checked
                    console.log("Checkbox is checked");
                    btn.nextElementSibling.classList.add('alarm-days-checked');
                  } else {
                    // Checkbox is unchecked
                    console.log("Checkbox is unchecked");
                    btn.nextElementSibling.classList.remove('alarm-days-checked');
                  }
            }); 

            $(".repeat-days label li").delay(50).each(function(i) {
                $(this).delay(25 * i).queue(function() {
                  $(this).addClass("show-alarm-days-btn");
                })
            })
        });



    }

    AlarmDateModeSwitcher(switcher);
    generateDateToggleBtn();


    /* I am going to work on it later */
    // repeatDateSwitcher();






    // Event listener for the "Set Alarm" button
    setAlarmButton.addEventListener('click', function () {
        // Get the selected alarm time from the input field
        const alarmTime = alarmTimeInput.value;
        const alarmName = alarmNameInput.value;
        let selectedOptionValue = gameSelection.value;
        if (alarmTime && selectedOptionValue) {
            // If a valid time is selected, call the setAlarm function
            setAlarm(alarmTime, alarmName);
        } else {
            // Show an alert if no valid time is selected
            alert('Please select a valid alarm time.');
        }
    });

    // Function to set the alarm
    function setAlarm(alarmTime ,alarmNameInput) {
        let alarmTItle = document.createElement('div');
        let setClockTime = document.createElement('div');
        let alarmDates = document.createElement('div');
        let alarmTimeHolder = document.createElement('div');
        let exitBtn = document.createElement('div');
        exitBtn.classList.add("set-alarm-exit"); 
        exitBtn.innerHTML = `<svg xmlns="http://www.w3.org/2000/svg" width="21" height="21" viewBox="0 0 21 21" fill="none">
                                <path d="M1 19.5862L10.2931 10.2931M10.2931 10.2931L19.5862 1M10.2931 10.2931L1 1M10.2931 10.2931L19.5862 19.5862" stroke="#B0E04A" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
                            </svg>`;

        // Get the current time
        const now = new Date();

        // Combine the current date and selected alarm time to create a Date object
        const alarmDate = new Date(now.toDateString() + ' ' + alarmTime);

        // Get the current time in milliseconds
        const currentTime = now.getTime();

        // If the alarm time is earlier than the current time, set it for the next day
        if (alarmDate.getTime() <= currentTime) {
            alarmDate.setDate(alarmDate.getDate() + 1);
        }

        // Calculate the time remaining until the alarm in milliseconds
        const timeUntilAlarm = alarmDate.getTime() - currentTime;

        // Set a timeout to trigger the alarm when the time is up
        setTimeout(function () {
            let selectedOptionValue = gameSelection.value;
            switch (selectedOptionValue) {
                case "Match_Game":
                    matchGame()
                    break;
    
                case "Math_Equation":
                    MathGame()
                    break;
            
                default:
                    alert('Wake up.');
                    break;
             
            }
        }, );



        //writes to title of the alarm
        alarmTItle.innerHTML = alarmNameInput;
        alarmTItle.classList.add('alarm-title');
        
        //writes the chosen alarm
        alarmTimeHolder.innerHTML = `${checkTime(alarmDate.getHours())}:${checkTime(alarmDate.getMinutes())}`;
        alarmTimeHolder.classList.add('alarmTimeHolder');


        setClockTime.classList.add('set-alarm');
        
        //writes the days where the alarms repeats

        let replaceArray = [];
        let uncheckCount = 0;
        //checkes for the repeat days that are checked to put them in the replaceArray
        for (let i = 0; i < repeatDaysArray.length; i++) {
            if(document.querySelectorAll('.repeat-days label input')[i].checked){
                if(repeatDaysArray[i].substring(0, 3) === document.querySelectorAll('.repeat-days label input')[i].nextElementSibling.firstChild.innerHTML){
                    // Add the checked name or names of to the replay array who will replace the content 
                    // of the setRepeatDaysArray 
                    replaceArray.push(`${repeatDaysArray[i].substring(0, 3)}`)
                    setRepeatDaysArray = replaceArray;
                }
            }
            
            // To make sure 
            if(!document.querySelectorAll('.repeat-days label input')[i].checked){
                uncheckCount++;
                if (uncheckCount == 7) {
                    setRepeatDaysArray = [];
                }
                console.log('no check');
            }
        }




        // if there is a presence of a day in setRepeatDaysArray it will be add to the html
        // else it will add the present date
        if(setRepeatDaysArray.length > 0){
            // adds the content of the setRepeatDaysArray to the html
            setRepeatDaysArray.forEach(e => {
                alarmDates.innerHTML += `<span class="repearDatesSpan"><p>${e}</p></span>`;
            });
        }
        else{
            alarmDates.innerHTML = `${alarmDate.getDate()} - ${monthText[alarmDate.getMonth()]} - ${alarmDate.getFullYear()}`;
        }



        alarmDates.classList.add('alarm-dates');

        let sidebar = document.querySelector('.sidebar')
  
        sidebar.appendChild(setClockTime);

        // let alarmObject =   { 
        //     time:alarmTimeHolder.textContent, 
        //     title:alarmTItle.textContent, 
        //     date:alarmDates
        // }


        // alarmArray.push(alarmObject);

        setClockTime.appendChild(alarmTimeHolder);
        setClockTime.appendChild(alarmTItle);
        setClockTime.appendChild(alarmDates);
        setClockTime.appendChild(exitBtn);

        exitBtn.addEventListener('click', function () {
            this.parentNode.remove();
            
        })

        console.log(alarmArray);
        

    }    







    //function start the match game to dtop the alarm
    function matchGame() {




        //Creates the game container
        let gameContainer = document.createElement('div');
        gameContainer.classList.add('game-container');
        mainContainer.appendChild(gameContainer);
        
        //Creates the game title
        let title = document.createElement('h1');
        title.classList.add('gameTitle');
        title.innerText = 'Wake up'
        gameContainer.appendChild(title);

        //Displays the game
        let gameDisplay = document.createElement('div');
        gameDisplay.classList.add('game-display');
        gameContainer.appendChild(gameDisplay);
        let assingedLetterNum = 0;
        let firstCard = null;
        let secondCard = null;

        //for matchCount function
        let matchCountNumber = 0;

        
        gameDisplay.style.gridTemplateColumns = `repeat(${checkMatchGameSettingsValue}, 1fr)`;
        
        
        // Generates the match game cards
        for (let i = 0; i < (checkMatchGameSettingsValue * 2); i++) {

            const matchCard = document.createElement('div');
            
            assingedLetterNum += 1;

            if (assingedLetterNum > checkMatchGameSettingsValue){
                assingedLetterNum = 1;
                
            }


            switch (assingedLetterNum) {
                case 1:
                    matchCard.setAttribute('data-card', 'A');
                    console.log(assingedLetterNum);
                    break;

                case 2:
                    matchCard.setAttribute('data-card', 'B');
                    console.log(assingedLetterNum);  
                    break;

                case 3:
                    matchCard.setAttribute('data-card', 'C');
                    console.log(assingedLetterNum);
                    break;

                case 4:
                    matchCard.setAttribute('data-card', 'D');
                    console.log(assingedLetterNum);
                    break;

                case 5:
                    matchCard.setAttribute('data-card', 'E');
                    console.log(matchCard);
                    break;
            
                default:
                    break;
            };

            matchCard.classList.add('match-card');
            matchCard.addEventListener('click', () => {
                flipCard(matchCard);
            });

            gameDisplay.appendChild(matchCard);

            
            
        }

        //Shuffles Cards
        function shuffleCards() {
            let matchCards = document.querySelectorAll('.match-card')
            matchCards.forEach(matchCard => {
                let randomPos = Math.floor(Math.random() * (checkMatchGameSettingsValue * 2));
                matchCard.style.order = randomPos;
            });
        }
        shuffleCards();
        
        
        function flipCard(matchCard) {
            if (!firstCard) {
                firstCard = matchCard;
                matchCard.innerHTML = firstCard.dataset.card;
                firstCard.classList.add('flipped');
            } else if (!secondCard && matchCard !== firstCard) {
                secondCard = matchCard; 
                matchCard.innerHTML = secondCard.dataset.card;
                secondCard.classList.add('flipped');
                checkMatch(matchCard);
            }
            console.log(matchCard);
        }

        function checkMatch(matchCard) { 
            let matchCards = document.querySelectorAll('.match-card');
            if (firstCard.dataset.card === secondCard.dataset.card){
                firstCard.classList.add('matched');
                secondCard.classList.add('matched');
                console.log('yay');
                firstCard = null;
                secondCard = null;
                matchCount();
                

            }
            else{   
                


                if (firstCard.classList.contains('matched')){
                    setTimeout(() => {
                        console.log('nope');
                        secondCard.innerHTML = '';
                        secondCard.classList.remove('flipped');
                        firstCard = null;
                        secondCard = null;
                    }, 500)

                }
                else if(secondCard.classList.contains('matched')){
                    setTimeout(() => {
                        console.log('nope');
                        firstCard.innerHTML = '';
                        firstCard.classList.remove('flipped');
                        firstCard = null;
                        secondCard = null;
                    }, 500)
                }
                else{
                    setTimeout(() => {
                        console.log('nope');
                        firstCard.innerHTML = '';
                        secondCard.innerHTML = '';
                        firstCard.classList.remove('flipped');
                        secondCard.classList.remove('flipped');
                        firstCard = null;
                        secondCard = null;
                    }, 500)
                }


            }
        }

        

        function matchCount(matchCard) {
            let matchCards = document.querySelectorAll('.match-card');
            console.log(matchCountNumber);
            matchCountNumber += 1;
            
            //This line will be used when i create settings for the game   
            if (matchCountNumber == checkMatchGameSettingsValue) {     
                title.innerText = 'Congratulations'   
                setTimeout(() => {
                    matchCards.forEach(matchCard => {
                        gameContainer.classList.add('remove-game')
                        setTimeout(() => {
                            mainContainer.removeChild(gameContainer);
                        }, 2000)
                    });
                    matchCountNumber = 0;
                }, 500);

            } 
            
            
        }



    }



    function MathGame() { 
        //Creates the game container
        let gameContainer = document.createElement('div');
        gameContainer.classList.add('game-container');
        mainContainer.appendChild(gameContainer);
        
        //Creates the game title
        let title = document.createElement('h1');
        title.classList.add('gameTitle');
        title.innerText = 'Wake up'
        gameContainer.appendChild(title);

        //Displays the game
        let gameDisplay = document.createElement('div');
        gameDisplay.classList.add('game-display');
        gameContainer.appendChild(gameDisplay);

        let operand1;
        let operand2;
        
        
        if (operands1Selection.value == 2){
            console.log(' Numbers of Digits ' + operands1Selection.value);
            operand1 = Math.floor((Math.random() * 98) + 1);
        }
        else {
            operand1 = Math.floor((Math.random() * 9) + 1);
        }

        if (operands2Selection.value == 2){
            console.log(' Numbers of Digits ' + operands2Selection.value);
            operand2 = Math.floor((Math.random() * 98) + 1);
        }
        else {
            operand2 = Math.floor((Math.random() * 9) + 1);
        }



        let goodResult = operand1 + operand2
        console.log(goodResult);


        gameDisplay.style.gridTemplateColumns = `repeat(5, 1fr)`;

        $(gameDisplay).append(`<div class="game-display-operand">${operand1}<div>`)
        $(gameDisplay).append('<div class="game-display-operand">+<div>')
        $(gameDisplay).append(`<div class="game-display-operand">${operand2}<div>`)
        $(gameDisplay).append('<div class="game-display-operand">=<div>')
        $(gameDisplay).append(`<div class="game-display-operand">
                                    <input type="number" class="math-game-result">
                                <div>`)

        
        let mathGameResultDiv = gameContainer.querySelector('.math-game-result');
        
        mathGameResultDiv.addEventListener('change', function () {
            let userResult = mathGameResultDiv.value
            mathGameResultDiv.value
            console.log('listening');
            if (goodResult == userResult){
                console.log(goodResult + ' = ' + userResult);
                title.classList.add('game-congratulation-title');
                title.innerText = 'Congratulations'
                gameContainer.style.backgroundColor = 'rgb(221, 240, 204)';
                setTimeout(() => {
                    gameContainer.style.backgroundColor = '';
                }, 500)
                //Remove the game
                setTimeout(() => {
                    gameContainer.classList.add('remove-game')
                    setTimeout(() => {
                        mainContainer.removeChild(gameContainer);
                    }, 2000)
                }, 1500);
            }
            else{
                console.log('UserResult ' + userResult);
                gameContainer.style.backgroundColor = 'red';
                setTimeout(() => {
                    gameContainer.style.backgroundColor = '';
                }, 500)
            }
        }); 
        
        
        


    }

    function Congradulation() { 

    }
});
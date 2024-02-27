

document.addEventListener('DOMContentLoaded', function () {

    // DOM elements

    //Alarm Settings variables
    const alarmTimeInput = document.getElementById('alarm-time');
    const alarmNameInput = document.getElementById('alarm-name-input');
    const setAlarmButton = document.getElementById('set-alarm');
    const btn_repeatDate = document.querySelectorAll('.repeat-days label input');
    const alarmForm = document.querySelector('.alarm-form');
    // const repeatDateName = document.querySelectorAll('.repeat-days label li');
    // const btn_alarmDays = document.querySelectorAll('.alarm-days label input');
    // const dayText = ['Monday','Tuesday','Wednesday','Thursday','Friday','Saturday','Sunday'];
    const monthText = ['January','February','March','April','May','June','July','August','September','October','November','December',];
    var repeatDaysArray = [
        {id: 0, dayofWeek: 'Sunday'},
        {id: 1, dayofWeek: 'Monday'},
        {id: 2, dayofWeek: 'Tuesday'},
        {id: 3, dayofWeek: 'Wednesday'},
        {id: 4, dayofWeek: 'Thursday'},
        {id: 5, dayofWeek: 'Friday'},
        {id: 6, dayofWeek: 'Saturday'}];
    var setRepeatDaysArray = [];
    // var repearDaysString;
    var days = [];
    var alarmArray = [];
    var checkMatchGameSettingsValue;
    const container = document.querySelector('.container');

    //Main clock variables
    const mainClock = document.querySelector('.main-clock__time');
    const mainClock_seconds = document.querySelector('.main-clock__secondes svg circle:nth-child(2)');
    const mainContainer = document.querySelector('.main-container')
    const GlobalDate = new Date();

    //sidebar variables
    const sidebar_container = document.querySelector('.sidebar-container');
    const sidebar_switch = document.querySelector('.sidebar-switch');
    const sidebar_switch_input = document.querySelector('.sidebar-switch-input');

    //options for MatchGame
    // const cardLetterArray = ['A','B','C','D','E'];
    // const cardAmounts = 0;

    //Game Selection variables
    var gameSelection = document.querySelector('.game-choices');


    //Math Game Setttings Variables
    var operands1Selection;
    var operands2Selection;
    var selectedOptionValue;


    var screenWidth = window.innerWidth;


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

    /**
     * A function that checks the time and adds a leading zero if the time is less than 10.
     *
     * @param {number} i - The time to check.
     * @return {string} The time with a leading zero if necessary.
     */
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

    sidebar_switch_input.addEventListener('change', sidebar_switching);

    function sidebar_switching() {
        if (this.checked) {
            // Checkbox is checked
            console.log("Checkbox is checked");
            sidebar_switch.classList.remove('sidebar-switch-input-unchecked');
            sidebar_container.classList.add('sidebar-active');
            sidebar_switch.classList.add('sidebar-switch-active');
            sidebar_container.addEventListener('animationend', function animationEndHandler() {
                // Remove the event listener
                sidebar_container.removeEventListener('animationend', animationEndHandler);
            });
        } else {
            // Checkbox is unchecked
            console.log("Checkbox is unchecked");
            sidebar_container.classList.add('sidebar-deactive');
            sidebar_switch.classList.add('sidebar-switch-input-unchecked');
            sidebar_container.addEventListener('animationend', function animationEndHandler() {
                sidebar_container.classList.remove('sidebar-deactive');
                sidebar_container.classList.remove('sidebar-active');
                sidebar_switch.classList.remove('sidebar-switch-active');

                // Remove the event listener
                sidebar_container.removeEventListener('animationend', animationEndHandler);
            });
        }
    }

    const OPTION_COUNT = 3;

    /**
     * Generates the match game settings options.
     *
     * @async
     * @function generateMatchGameSettingsOptions
     * @returns {void}
     */
    async function generateMatchGameSettingsOptions() {
        const gameSettingOption = document.querySelector('.game-settings-options');
        gameSettingOption.style.gap = '11px';
        gameSettingOption.innerHTML = '';

        const svgTemplates = [
            { sets: 3, width: 79, rects: 3 },
            { sets: 4, width: 109, rects: 4 },
            { sets: 5, width: 137, rects: 5 }
        ];

        for (let i = 0; i < OPTION_COUNT; i++) {
            const svgTemplate = svgTemplates[i];
            const rects = new Array(svgTemplate.rects).fill(0).map((_, index) => `
                <rect x="${index * 29.9312}" y="0.940826" width="19.3966" height="37.0066" class="game-settings-toggle-unchecked"/>
                <rect x="${index * 29.9312}" y="48.6382" width="19.3966" height="35.3618" class="game-settings-toggle-unchecked"/>
            `).join('');

            const option = `
                <label class="game-settings-toggle">
                    ${svgTemplate.sets} sets
                    <input type="radio" class="${i + 1}" name="game-settings-options-rbtn" value=${svgTemplate.sets} />
                    <span class="match-game-option-${i + 1}">
                        <svg xmlns="http://www.w3.org/2000/svg" width="${svgTemplate.width}" height="84" viewBox="0 0 ${svgTemplate.width} 84" fill="none">
                            ${rects}
                        </svg>
                    </span>
                </label>
            `;

            $(gameSettingOption).append(option);
            console.log(i + 1);
        }

        $(".game-settings-toggle").delay(50).each(function(i) {
            $(this).delay(150 * i).queue(function() {
                $(this).addClass("game-settings-toggle-animation");
            })
        });
    }


    async function generateMathEquationSettingsOptions() {
        const gameSettingOption = document.querySelector('.game-settings-options');
        gameSettingOption.style.gap = '30px';

        const operator = `<div class="operator">
                            <svg xmlns="http://www.w3.org/2000/svg" width="34" height="34" viewBox="0 0 34 34" fill="none">
                                <path d="M2.66101 16.9931H17M17 16.9931H31.339M17 16.9931V2.65405M17 16.9931V31.3321" stroke="#B0E04A" stroke-width="3.58475" stroke-linecap="round" stroke-linejoin="round"/>
                            </svg>
                        </div>`;

        const generateSelect = name => `
            <div class="operand">
                <select name="${name}" class="operands_select">
                    <option value="1">max 1 digit</option>
                    <option value="2">max 2 digit</option>
                </select>
            </div>
        `;

        const option = `${generateSelect('operand_1')}${operator}${generateSelect('operand_2')}`;

        $(gameSettingOption).html(option);
        $(gameSettingOption.children).delay(50).each(function(i) {
            $(this).delay(150 * i).queue(function() {
                $(this).addClass("game-settings-toggle-animation");
            })
        })

        operands1Selection = document.querySelector(".operands_select[name='operand_1']");
        operands2Selection = document.querySelector(".operands_select[name='operand_2']");

        operands1Selection.addEventListener('change', () => {
            selectedOptionValue = operands1Selection.value;
        });

        operands2Selection.addEventListener('change', () => {
            selectedOptionValue = operands2Selection.value;
        });
    }







    //Game Match Game Settings
    function checkNumberofMatch(checkbox) {
        const checkboxes = document.querySelectorAll('.game-settings-toggle input');

        const toggleClass = (cbx, action) => {
            document.querySelectorAll(`.${cbx.nextElementSibling.className} svg rect`).forEach(card => {
                card.classList[action]('game-settings-toggle-checked');
            });
        };

        checkboxes.forEach(cbx => {
            if (cbx === checkbox && cbx.checked) {
                console.log("Checkbox with value " + cbx.value + " is checked");
                checkMatchGameSettingsValue = cbx.value;
                toggleClass(cbx, 'add');
            } else if (!cbx.checked) {
                toggleClass(cbx, 'remove');
            }
        });
    }


    function activeGameOption() {
        // Get the value of the selected option
        const gameSettingOption = document.querySelector('.game-options');
        const gameSettingTitle = document.querySelector('.game-settings-title');
        const selectedOptionValue = gameSelection.value;

        const setGameSettings = (display, height) => {
            gameSettingTitle.style.display = display;
            gameSettingOption.style.height = height;
        };

        switch (selectedOptionValue) {
            case "Match_Game":
                setGameSettings("block", "291px");
                generateMatchGameSettingsOptions();
                checkDefaultNumberofMatch();
                console.log('Selected option value: ' + selectedOptionValue);
                break;

            case "Math_Equation":
                setGameSettings("block", "291px");
                generateMathEquationSettingsOptions();
                console.log('Selected option value: ' + selectedOptionValue);
                break;

            default:
                gameSettingOption.style.gridTemplateRows = "0fr 0fr";
                setGameSettings("none", "141px");
                document.querySelector('.game-settings-options').innerHTML = '';
                console.log('Selected option value: none');
        }
    }
    activeGameOption();




    function checkDefaultNumberofMatch() {
        const checkboxes = document.querySelectorAll('.game-settings-toggle input');
        checkboxes[0].checked = true;
        checkMatchGameSettingsValue = checkboxes[0].value;

        checkboxes.forEach(checkbox => {
            if (checkbox.checked) {
                document.querySelectorAll(`.${checkbox.nextElementSibling.className} svg rect`).forEach(card => {
                    card.classList.add('game-settings-toggle-checked');
                });
            }
        });
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









    // Event listener for the "Set Alarm" button

    // Alarm Days



    function AlarmDateModeSwitcher(switcher) {

        if(!switcher){
            getDaysInWeek();
        }
        else{
            getDaysInMonth(GlobalDate.getFullYear(), GlobalDate.getMonth(), GlobalDate.getDate());
        }



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



    function getDaysInMonth(year, month, currentDay) {


        // Create a new date object for the first day of the given month
        const date = new Date(year, month, currentDay);

        var nextmonthDate;



        days = [];



        // Continue adding days to the days array while the month is the same
        while (date.getMonth() === month) {

            days.push(new Date(date).getDate());
            date.setDate(date.getDate() + 1);
        }

        nextmonthDate = 35 - days.length

        // console.log(nextmonthDate);

        for (let index = 0; index < nextmonthDate; index++) {
            days.push(new Date(date).getDate());
            date.setDate(date.getDate() + 1);

        }



        return days;
    }



    var switcher = false
    var dateToggleInput = document.querySelector('.date-toggle input')

    //Here I'm changing the icon and the alarm mode when I click on the dateToggleInput
    dateToggleInput.addEventListener('change', function () {
        if (!this.checked) {
            // Checkbox is checked

            switcher = false;
            AlarmDateModeSwitcher(switcher);
            generateDateToggleBtn(switcher);

            if (screenWidth >= 1200) {
                $('button').css({'left': '104%'});
                $('button').css({'transition': '.5s'});
                console.log(screenWidth + ` :` + 'mode false');
            }
            else {
                $('button').css({'transition': '.5s'});
                $('button').css({'top': '0%'});
                container.style.backgroundColor = '';
                console.log(screenWidth + ` :` + 'mode false');
            }

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
            switcher = true;
            AlarmDateModeSwitcher(switcher);
            generateDateToggleBtn(switcher);


            let repeatDayToggle = `<svg xmlns="http://www.w3.org/2000/svg" width="41" height="31" viewBox="0 0 41 31" fill="none">
                                        <path d="M31.0556 24.2883H12.0556C8.53703 24.2883 1.5 22.0483 1.5 13.0883C1.5 4.12834 8.53703 1.88834 12.0556 1.88834H28.9444C32.463 1.88834 39.5 4.12834 39.5 13.0883C39.5 16.4356 38.5179 18.8451 37.1039 20.5502" stroke="#B0E04A" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
                                        <path d="M25.7778 18.6883L31.0556 24.2883L25.7778 29.8883" stroke="#B0E04A" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
                                    </svg>`;

            $('.date-toggle span').html(repeatDayToggle);
            $('.alarm-form__section-repeat-days').css({
                'height': '285px'});

            if (screenWidth >= 1200) {
                $('button').css({'transition': '.5s'});
                $('button').css({'left': '0%'});
                console.log(screenWidth + ` :` + 'mode true');
            }
            else if((screenWidth >= 768) && (screenWidth <= 1200)){
                $('button').css({'transition': '.5s'});
                $('button').css({'top': '-62%'});
                console.log(screenWidth + ` :` + 'mode true');
            }

        }
    });

    dateToggleInput.checked = false;

    // This function generates the checkboxes of each alarm mode

    function generateDateToggleBtn(cansubstring) {
        let repeatDay = document.querySelector('.alarm-form__section-repeat-days ul');


        // Remove the checkboxes of the previous mode
        while (repeatDay.hasChildNodes()) {
            repeatDay.removeChild(repeatDay.firstChild);
        }

        // For each day that is present in the days array, its makes a checkbox for it
        days.forEach(e => {
            let repeatDayBtn = `<label class="toggle">
                                    <input type="checkbox">
                                    <li><p>${cansubstring > 0 ? e : e['dayofWeek'].substring(0, 3)}</p></li>
                                </label>`;
            $(repeatDay).append(repeatDayBtn);
        });

        let input = document.querySelectorAll('.repeat-days label input');

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


    //They initiate the default alarm mode
    AlarmDateModeSwitcher(switcher);
    generateDateToggleBtn();


    /* I am going to work on it later */
    // repeatDateSwitcher();

    function SetToCurrentTime() {
        const today = new Date();
        let hours = today.getHours();
        let minutes = today.getMinutes();
        hours = checkTime(hours);
        minutes = checkTime(minutes);
        alarmTimeInput.value = `${hours}:${minutes}`;
        
    }

    SetToCurrentTime();


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

    function setAlarm(alarmTime, alarmNameInput, ) {
        const alarmTItle = document.createElement('div');
        const setClockTime = document.createElement('div');
        const alarmDates = document.createElement('div');
        const alarmTimeHolder = document.createElement('div');
        const cancelBtn = document.createElement('div');

        //Exit
        cancelBtn.classList.add("set-alarm-exit");
        cancelBtn.innerHTML = `<svg xmlns="http://www.w3.org/2000/svg" width="21" height="21" viewBox="0 0 21 21" fill="none">
                                <path d="M1 19.5862L10.2931 10.2931M10.2931 10.2931L19.5862 1M10.2931 10.2931L1 1M10.2931 10.2931L19.5862 19.5862" stroke="#B0E04A" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
                            </svg>`;

        // Get the current time
        const now = new Date();

        // Combine the current date and selected alarm time to create a Date object
        const alarmDate = new Date(now.toDateString() + ' ' + alarmTime);

        // Get the current time in milliseconds
        const currentTime = now.getTime();




        // Set the alarm time in the UI
        // alarmTimeInput.value = `${checkTime(alarmDate.getHours())}:${checkTime(alarmDate.getMinutes())}`;

        // Show the sidebar by checking the checkbox
        sidebar_switch_input.checked = true;
        if (sidebar_switch_input.checked) {
            // Checkbox is checked
            console.log("Checkbox is checked");
            sidebar_switch.classList.remove('sidebar-switch-input-unchecked');
            sidebar_container.classList.add('sidebar-active');
            sidebar_switch.classList.add('sidebar-switch-active');
            sidebar_container.addEventListener('animationend', function animationEndHandler() {
                // Remove the event listener
                sidebar_container.removeEventListener('animationend', animationEndHandler);
            });
        }


        console.log(repeatDaysArray);
        // If the alarm time is earlier than the current time, set it for the next day
        if (alarmDate.getTime() <= currentTime) {
            alarmDate.setDate(alarmDate.getDate() + 1);
        }



        // if (alarmDate.getTime() <= currentTime) {
        //     if(!alarmArray){
        //         alarmDate.setDate(alarmDate.getDate() + 1);
        //     }
        // }
        // if (alarmDate.getDay() == repeatDaysArray[alarmDate.getDay()]) {
        //     alarmDate.setDate(alarmDate.getDate() + 7);
        // }


        // Calculate the time remaining until the alarm in milliseconds
        const timeUntilAlarm = alarmDate.getTime() - currentTime;

        let alarmObject =   {
            time:timeUntilAlarm,
            title:alarmTItle.textContent,
            date:alarmDates,
            arrayRepeatDays:[]
        }


        //writes the days where the alarms repeats
        let replaceArray = [];
        let uncheckCount = 0;
        let repeatDayInput = document.querySelectorAll('.repeat-days label input');

        //checkes for the repeat days that are checked to put them in the replaceArray
        for (let i = 0; i < repeatDaysArray.length; i++) {

            if(repeatDayInput[i].checked){
                if(repeatDaysArray[i]['dayofWeek'].substring(0, 3) === repeatDayInput[i].nextElementSibling.firstChild.innerHTML){
                    // Add the checked name or names of to the replay array who will replace the content
                    // of the setRepeatDaysArray
                    console.log(repeatDayInput);
                    replaceArray.push(`${repeatDaysArray[i]['dayofWeek'].substring(0, 3)}`)
                    setRepeatDaysArray = replaceArray;
                    alarmObject['arrayRepeatDays'] = setRepeatDaysArray;
                }
            }

            // To make sure
            if(!repeatDayInput[i].checked){
                uncheckCount++;
                if (uncheckCount == 7) {
                    setRepeatDaysArray = [];
                }
                console.log('no check');
            }
        }



        alarmArray.push(alarmObject);



        function getDaysInMonth(month, year) {
            return new Date(year, month, 0);
        }

        let daysInCurrentMonth = getDaysInMonth(new Date().getMonth() + 1, new Date().getFullYear());


        //e === repeatDaysArray[now.getDay()]['dayofWeek'].substring(0, 3) ? e : NaN
        for (let index = 0; index < alarmArray.length; index++) {

            alarmArray[index].arrayRepeatDays.forEach(e => {
                switch (e) {
                    case 'Sun':
                        setRepeatAlarm(0, GlobalDate.getFullYear(), GlobalDate.getMonth(), GlobalDate.getDate());
                        break;
                    case 'Mon':
                        setRepeatAlarm(1, GlobalDate.getFullYear(), GlobalDate.getMonth(), GlobalDate.getDate());
                        break;
                    case 'Tue':
                        setRepeatAlarm(2, GlobalDate.getFullYear(), GlobalDate.getMonth(), GlobalDate.getDate());
                        break;
                    case 'Wed':
                        setRepeatAlarm(3, GlobalDate.getFullYear(), GlobalDate.getMonth(), GlobalDate.getDate());
                        break;
                    case 'Thu':
                        setRepeatAlarm(4, GlobalDate.getFullYear(), GlobalDate.getMonth(), GlobalDate.getDate());
                        break;
                    case 'Fri':
                        setRepeatAlarm(5, GlobalDate.getFullYear(), GlobalDate.getMonth(), GlobalDate.getDate());
                        break;
                    case 'Sat':
                        setRepeatAlarm(6, GlobalDate.getFullYear(), GlobalDate.getMonth(), GlobalDate.getDate());
                        break;
                    default:
                        break;
                }
            });

        }

        function setRepeatAlarm(dayOfWeekNumber, year, month, day) {
            const now = new Date(year, month, day);
            const nextMonth = new Date(now.getFullYear(), now.getMonth() + 1, 0);
            const currentDayOfWeek = now.getDay();
            const currentDate = now.getDate();
            const daysInCurrentMonth = new Date(now.getFullYear(), now.getMonth() + 1, 0);
            const daysUntilNextAlarm = ((dayOfWeekNumber + 7 - currentDayOfWeek) % 7);
            let nextSunday = new Date(now.getFullYear(), now.getMonth(), currentDate + daysUntilNextAlarm);

            var nextmonthDate;



            days = [];
    
    
    
            // Continue adding days to the days array while the month is the same
            while (now.getMonth() === month) {
                now.setDate(now.getDate() + 1);
                days.push(new Date(now));
                console.log(now);
            }
    
            nextmonthDate = 35 - days.length
    
            // console.log(nextmonthDate);
    
            for (let index = 0; index < nextmonthDate; index++) {
                now.setDate(now.getDate() + 1);
                days.push(new Date(now));
                console.log(now);
                
            }

            console.log(days);

            let nextSundayMidnight;

            if (currentDayOfWeek === dayOfWeekNumber && now.getHours() < 24) {
                nextSunday.setDate(nextSunday.getDate() + 7);
                console.log(nextSunday);
            }
            else {
                nextSunday.setDate(nextSunday.getDate());
                // if (nextSunday.getDate() > daysInCurrentMonth.getDate()) {
                //     nextSunday.setDate(nextSunday.getDate() - daysInCurrentMonth.getDate());
                //     console.log(nextSunday);
                // }
                for (let index = 0; index < days.length; index++) {
                    if ((dayOfWeekNumber == days[index].getDay()) && (nextSunday.getDate() == days[index].getDate())) {
                        if (days[index].getDate() > currentDate) {
                            console.log(days[index].getTime());
                            if (days[index].getTime() != now.getTime()) {
                                nextSundayMidnight = days[index].getTime() - now.getTime();
                            };
                            console.log(days[index]);
                        }
                        else{
                            console.log(days[index + 7].getTime());
                            if (days[index].getTime() != now.getTime()) {
                                nextSundayMidnight = days[index].getTime() - now.getTime();
                            }
                            else {
                                nextSundayMidnight = days[index + 7].getTime() - now.getTime();
                            }
                            console.log(days[index]);
                        }
                    }
                }

                
            }

            

            
            console.log(nextSundayMidnight);

            setTimeout(function() {
                // Code to execute on Sundays


                console.log(nextSundayMidnight + (nextSundayMidnight * 1000));

                setInterval(function() {
                    // Code to execute on Sundays
                    console.log('Sunday');
                }, 7 * 24 * 60 * 60 * 1000); // Repeat every 24 hours
            }, 1000);
        }

        let alarmTimeSet;

        for (let index = 0; index < alarmArray.length; index++) {
            alarmTimeSet = alarmArray[index].time

        }

        console.log("df " + alarmTimeSet);
        // Set a timeout to trigger the alarm when the time is up






        let alarmTimeSetVariable = setTimeout(function () {
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
            console.log(alarmTimeSet.getDay());
        }, alarmObject['arrayRepeatDays'].length > 0 ? (alarmTimeSet + 7) : alarmTimeSet);

        cancelBtn.addEventListener('click', function () {
            let pos = Array.from(document.querySelectorAll('.set-alarm')).indexOf(this.parentNode);
            clearTimeout(alarmTimeSetVariable);
            alarmArray.splice(pos, 1);
            this.parentNode.remove();
            console.log(alarmArray);
        })
        AlarmBlockGenerator(alarmDate, cancelBtn, alarmTItle, alarmTimeHolder, setClockTime, alarmDates, alarmTimeSetVariable, alarmNameInput);


        console.log('day ' + now.getDay());
        console.log('time ' + now.getTime());

    }



    function AlarmBlockGenerator(alarmDate, cancelBtn, alarmTItle, alarmTimeHolder, setClockTime, alarmDates, alarmTimeSetVariable, alarmNameInput) {




        //writes to title of the alarm
        alarmTItle.innerHTML = alarmNameInput;
        alarmTItle.classList.add('alarm-title');

        //writes the chosen alarm
        alarmTimeHolder.innerHTML = `${checkTime(alarmDate.getHours())}:${checkTime(alarmDate.getMinutes())}`;
        alarmTimeHolder.classList.add('alarmTimeHolder');


        setClockTime.classList.add('set-alarm');






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


        //Adding
        setClockTime.appendChild(alarmTimeHolder);
        setClockTime.appendChild(alarmTItle);
        setClockTime.appendChild(alarmDates);
        setClockTime.appendChild(cancelBtn);
        document.querySelectorAll('set-alarm');
    }

    function clearAllAlarms() {
        document.querySelectorAll('.set-alarm').forEach(e => {
            e.remove();
        });
    }

    //function start the match game to dtop the alarm
    function matchGame() {


        //Creates the game container
        const gameContainer = document.createElement('div');
        gameContainer.classList.add('game-container');
        mainContainer.appendChild(gameContainer);

        //Creates the game title
        const title = document.createElement('h1');
        title.classList.add('game-title');
        title.innerText = 'Wake up';
        gameContainer.appendChild(title);

        //Displays the game
        const gameDisplay = document.createElement('div');
        gameDisplay.classList.add('game-display');
        gameContainer.appendChild(gameDisplay);
        let assingedLetterNum = 0;
        let firstCard = null;
        let secondCard = null;

        //for matchCount function
        let matchCountNumber = 0;


        gameDisplay.style.gridTemplateColumns = `repeat(${checkMatchGameSettingsValue}, 1fr)`;


        if (screenWidth <= 768) {
            mainContainer.style.display = 'grid';
        }


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
                title.classList.remove('game-title');
                title.classList.remove('game-options-title');
                title.classList.add('game-congratulation-title');
                title.innerText = 'Congratulations';
                setTimeout(() => {
                    matchCards.forEach(matchCard => {
                        gameContainer.classList.add('remove-game')
                        setTimeout(() => {
                            mainContainer.removeChild(gameContainer);
                            if (screenWidth <= 768) {
                                mainContainer.style.display = '';
                            }
                        }, 2000)
                    });
                    matchCountNumber = 0;
                }, 500);

            }


        }



    }



    function MathGame() {

        function createElement(tag, className, text, parent) {
            const element = document.createElement(tag);
            element.classList.add(className);
            if (text) element.innerText = text;
            parent.appendChild(element);
            return element;
        }

        function getRandomNumber(digits) {
            return Math.floor((Math.random() * (Math.pow(10, digits) - 1)) + 1);
        }

        //Creates the game container
        const gameContainer = createElement('div', 'game-container', null, mainContainer);

        //Creates the game title
        const title = createElement('h1', 'game-title', 'Wake up', gameContainer);

        //Displays the game
        const gameDisplay = createElement('div', 'game-display', null, gameContainer);

        const operand1 = operands1Selection.value === '2' ? getRandomNumber(2) : getRandomNumber(1);
        const operand2 = operands2Selection.value === '2' ? getRandomNumber(2) : getRandomNumber(1);

        if (screenWidth <= 768) {
            mainContainer.style.display = 'grid';
        }

        const goodResult = operand1 + operand2;
        console.log(goodResult);

        gameDisplay.style.gridTemplateColumns = `repeat(5, 1fr)`;

        $(gameDisplay).append(`<div class="game-display-operand">${operand1}<div>`);
        $(gameDisplay).append('<div class="game-display-operand">+<div>');
        $(gameDisplay).append(`<div class="game-display-operand">${operand2}<div>`);
        $(gameDisplay).append('<div class="game-display-operand">=<div>');
        $(gameDisplay).append(`<div class="game-display-operand"><input type="number" class="math-game-result"><div>`);

        const mathGameResultDiv = gameContainer.querySelector('.math-game-result');

        function changeBackgroundColor(color, duration) {
            gameContainer.style.backgroundColor = color;
            setTimeout(() => {
                gameContainer.style.backgroundColor = '';
            }, duration);
        }

        mathGameResultDiv.addEventListener('change', function () {
            const userResult = mathGameResultDiv.value;
            console.log('listening');
            if (goodResult == userResult) {
                console.log(`${goodResult} = ${userResult}`);
                title.classList.remove('game-title', 'game-options-title');
                title.classList.add('game-congratulation-title');
                title.innerText = 'Congratulations';
                changeBackgroundColor('rgb(221, 240, 204)', 500);
                setTimeout(() => {
                    gameContainer.classList.add('remove-game');
                    setTimeout(() => {
                        mainContainer.removeChild(gameContainer);
                        if (screenWidth <= 768) {
                            mainContainer.style.display = '';
                        }
                    }, 2000);
                }, 1500);
            } else {
                console.log(`UserResult ${userResult}`);
                changeBackgroundColor('red', 500);
            }
        });





    }

    function applyStylesBasedOnWidth() {
        screenWidth = window.innerWidth;
        sidebar_switch_input.checked = false;

        // Desktop styles
        if (screenWidth >= 1200) {
            alarmForm.style.removeProperty('grid-template-areas');
            const alarmStyle = setAlarmButton.style;
            alarmStyle.left = dateToggleInput.checked ? '0%' : '104%';
            alarmStyle.top = '';
        }
        // Tablet styles
        else if ((screenWidth >= 768) && (screenWidth <= 1199)) {
            const alarmStyle = setAlarmButton.style;
            alarmStyle.top = dateToggleInput.checked ? '-62%' : '0%';
            alarmStyle.left = '0%';
        }
    }

    // Function to handle window resize event
    function handleWindowResize() {
        applyStylesBasedOnWidth();
    }

    // Initial call to apply styles based on the window width
    applyStylesBasedOnWidth();

    // Event listener to handle window resize
    window.addEventListener('resize', handleWindowResize);
});

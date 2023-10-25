

document.addEventListener('DOMContentLoaded', function () {

    // DOM elements
    const alarmTimeInput = document.getElementById('alarm-time');
    const alarmNameInput = document.getElementById('alarm-name-input');
    const setAlarmButton = document.getElementById('set-alarm');
    const btn_repeatDate = document.querySelectorAll('.repeat-days label input');
    const repeatDateName = document.querySelectorAll('.repeat-days label li');
    const btn_alarmDays = document.querySelectorAll('.alarm-days label input');
    const mainClock = document.querySelector('.main-clock__time');
    const mainClock_seconds = document.querySelector('.main-clock__secondes svg circle:nth-child(2)');
    const mainContainer = document.querySelector('.main-container')

    const dayText = ['Monday','Tuesday','Wednesday','Thursday','Friday','Saturday','Sunday'];
    const monthText = ['January','February','March','April','May','June','July','August','September','October','November','December',];
    var repeatDaysArray = ['Mon','Tue','Wed','Thu','Fri','Sat','Sun'];
    var setRepeatDaysArray = [];
    var repearDaysString;
    var days = [];
    var alarmArray = [];
    const GlobalDate = new Date();
    //options for MatchGame
    const cardLetterArray = ['A','B','C','D','E'];
    const cardAmounts = 0;



    $.ajax({
        url: "json/alarms.json",
        data: "data",
        dataType: "json",
        success: function (response) {
            alarmArray = response;
            console.log(alarmArray);
        }
    });

    


    function showTime() { 
        const today = new Date();
        let hours = today.getHours();
        let minutes = today.getMinutes();
        let seconds = today.getSeconds();
        hours = checkTime(hours);
        minutes = checkTime(minutes);
        seconds = checkTime(seconds) * (100/60);
        //Light green s
        mainClock_seconds.style.strokeDashoffset = `calc(1540 - ((1540 * ${seconds}) / 100))`;
        mainClock.innerHTML =  `${hours}:${minutes}`;
        setTimeout(showTime, 1000)
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

    // Alarm Days

    function getDaysInMonth(year, month) {
        // Create a new date object for the first day of the given month
        const date = new Date(year, month, 1);
        days = [];
        
    
        // Continue adding days to the array while the month is the same
        while (date.getMonth() === month) {
            
            days.push(new Date(date).getDate());
            date.setDate(date.getDate() + 1);
        }   

        
    
        return days;
    }

    function getDaysInWeek() {
        // Create a new date object for the first day of the given month

        days = [];
        repeatDaysArray.forEach(e => {
            days.push(e);

        })        
    
        return days;
    }

    var switcher = false
    // var modeSwitcher = document.querySelector('.date-toggle')


    document.querySelector('.date-toggle input').addEventListener('change', function () {
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
                'height': '275px'});

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

    // mainClock.addEventListener('click', function () { 
    //     console.log('clock ' + switcher);
    //     AlarmDateModeSwitcher(switcher);
    //     generateDateToggleBtn()
    // });



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

        document.querySelectorAll('.repeat-days label input').forEach(btn => {
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
                $(this).delay(18 * i).queue(function() {
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

        if (alarmTime) {
            // If a valid time is selected, call the setAlarm function
            setAlarm(alarmTime, alarmName);
            console.log(alarmTime, alarmName);
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
        
        

        // Get the current time
        const now = new Date();

        // Combine the current date and selected alarm time to create a Date object
        const alarmDate = new Date(now.toDateString() + ' ' + alarmTime);
        console.log(alarmDate);
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
            matchGame();
        },  timeUntilAlarm);



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

  
        document.querySelector('.sidebar').appendChild(setClockTime);

        setClockTime.appendChild(alarmTimeHolder);
        setClockTime.appendChild(alarmTItle);
        setClockTime.appendChild(alarmDates);


        
        let alarmObject = { time:alarmTimeHolder.textContent, title:alarmTItle.textContent, date:alarmDates}


        alarmArray.push(alarmObject);
        console.log(alarmArray);
        

    }



    // function memorisationGame() {  
    //     let gameSection = document.createElement('div');
    //     let gameDisplay = document.createElement('div');
        
    // }

    


    //function start the match game to dtop the alarm
    function matchGame() {




        //Creates the game container
        let gameContainer = document.createElement('div');
        gameContainer.classList.add('game-container');
        mainContainer.appendChild(gameContainer);

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

        

        
        
        // Generates the match game cards
        for (let i = 0; i < 8; i++) {
            const matchCard = document.createElement('div');

            
            
            assingedLetterNum += 1;


            //This line will be used when i create settings for the game
            //if (assingedLetterNum > (cardAmounts - (cardAmounts / 2))){

            if (assingedLetterNum > 4){
                assingedLetterNum = 1;
                
            }


            switch (assingedLetterNum) {
                case 1:
                    matchCard.setAttribute('data-card', 'A');
                    console.log(assingedLetterNum);
                    break;

                case 2:
                    matchCard.setAttribute('data-card', 'B');
                    console.log(matchCard);  
                    break;

                case 3:
                    matchCard.setAttribute('data-card', 'C');
                    console.log(matchCard);
                    break;

                case 4:
                    matchCard.setAttribute('data-card', 'D');
                    console.log(matchCard);
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
                const parameterValue = "Hello, World!";
                flipCard(matchCard);
            });

            gameDisplay.appendChild(matchCard);

            
            
        }

        //Shuffles Cards
        function shuffleCards() {
            let matchCards = document.querySelectorAll('.match-card')
            matchCards.forEach(matchCard => {
                let randomPos = Math.floor(Math.random() * 8);
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
            //if (matchCountNumber == (cardAmounts - (cardAmounts/2))) {     
            if (matchCountNumber == 4) {        
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



    function calcutionGame() {  }

    function Congradulation() { 

    }
});
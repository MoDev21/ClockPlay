

document.addEventListener('DOMContentLoaded', function () {

    // DOM elements
    const alarmTimeInput = document.getElementById('alarm-time');
    const alarmNameInput = document.getElementById('alarm-name-input');
    const setAlarmButton = document.getElementById('set-alarm');
    const btn_repeatDate = document.querySelectorAll('.repeat-days label input');
    const repeatDateName = document.querySelectorAll('.repeat-days label li');
    const mainClock = document.querySelector('.main-clock__time');
    const mainClock_seconds = document.querySelector('.main-clock__secondes svg circle:nth-child(2)');
    const mainContainer = document.querySelector('.main-container')

    const dayText = ['Monday','Tuesday','Wednesday','Thursday','Friday','Saturday','Sunday'];
    const monthText = ['January','February','March','April','May','June','July','August','September','October','November','December',];
    var repeatDaysArray = ['Mon','Tue','Wed','Thu','Fri','Sat','Sun'];
    var setRepeatDaysArray = [];
    var repearDaysString;

    var alarmArray = [];
    
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
        //
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

    
    /* I am going to work on it later */
    // repeatDateSwitcher();
    function showRepeatDayOptions() { 
        setRepeatDaysArray.forEach(e => {
            console.log(e);
            let repeatDay = document.querySelector('.repeat-days')
                                .appendChild(document.createElement('li'))
                                .appendChild(document.createElement("p"));
            
            repeatDay.textContent = `${e}`;

            console.log(document.querySelector('.repeat-days'));
        });
    }

    showRepeatDayOptions() 

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

        //checkes for the repeat days that are checked to put them in the replaceArray
        for (let i = 0; i < repeatDaysArray.length; i++) {
            if(btn_repeatDate[i].checked){
                if(repeatDaysArray[i].substring(0, 3) === btn_repeatDate[i].nextElementSibling.firstChild.innerHTML){
                    replaceArray.push(`${repeatDaysArray[i].substring(0, 3)}`)
                    setRepeatDaysArray = replaceArray;
                    console.log(setRepeatDaysArray);
                }
            }
            // else if(btn_repeatDate[i].checked){
            //     if(repeatDaysArray[i].substring(0, 3) === btn_repeatDate[i].nextElementSibling.firstChild.innerHTML){
            //         replaceArray.pop(`${repeatDaysArray[i].substring(0, 3)}`)
            //         setRepeatDaysArray = replaceArray;
            //         console.log(setRepeatDaysArray);
            //     }
            // }
        }


        if(setRepeatDaysArray != false){
            setRepeatDaysArray.forEach(e => {
                alarmDates.innerHTML += `<span class="repearDatesSpan"><p>${e}</p></span>`;
            });
        }
        else{
            alarmDates.innerHTML = `${alarmDate.getDate()}/${alarmDate.getMonth() + 1}/${alarmDate.getFullYear()}`;
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



    function memorisationGame() {  
        let gameSection = document.createElement('div');
        let gameDisplay = document.createElement('div');
        
    }

    


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
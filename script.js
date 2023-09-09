

document.addEventListener('DOMContentLoaded', function () {

    // DOM elements
    const alarmTimeInput = document.getElementById('alarm-time');
    const alarmNameInput = document.getElementById('alarm-name-input');
    const setAlarmButton = document.getElementById('set-alarm');
    const btn_repeatDate = document.querySelectorAll('.repeat-days > li');
    const mainClock = document.querySelector('.main-clock');

    const dayText = ['Monday','Tuesday','Wednesday','Thursday','Friday','Saturday','Sunday'];
    const monthText = ['January','February','March','April','May','June','July','August','September','October','November','December',];
    var repeatDaysArray = ['Mon','Tue','Wed','Thu','Fri','Sat','Sun'];
    var setRepeatDaysArray = [];
    var repearDaysString;

    var alarmArray = [];
    



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
        seconds = checkTime(seconds);
        mainClock.innerHTML =  `${hours}:${minutes}:${seconds}`;
        setTimeout(showTime, 1000)
    }

    showTime();

    function checkTime(i) { 
        if (i < 10) { i = "0" + i};
        return i;
    }

    


    
    


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

    btn_repeatDate.forEach(e => e.addEventListener('click', function () {
            // Get the selected alarm time from the input field
            console.log(e.textContent);
            repearDaysString = e.textContent;
            setRepeatDaysArray.push(repearDaysString);
            console.log(setRepeatDaysArray);
        })

    );

    // repeatDateSwitcher
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
            alert('Time to wake up!');
        }, timeUntilAlarm);



        alarmTItle.innerHTML = alarmNameInput;
        alarmTItle.classList.add('alarm-title');
        

        alarmTimeHolder.innerHTML = `${checkTime(alarmDate.getHours())}:${checkTime(alarmDate.getMinutes())}`;
        alarmTimeHolder.classList.add('alarmTimeHolder');

        setClockTime.classList.add('set-alarm');
        
        if(repearDaysString){
            setRepeatDaysArray.forEach(e => {
                alarmDates.innerHTML += `<p>${e}</p>`;
            });
        }
        else{
            alarmDates.innerHTML = `${alarmDate.getDay()}/${alarmDate.getMonth()}/${alarmDate.getFullYear()}`;
        }
        // alarmDates.innerHTML = `${alarmDate.getDay()}/${alarmDate.getMonth()}/${alarmDate.getFullYear()}`;


        alarmDates.classList.add('alarm-dates');

  
        document.querySelector('.sidebar').appendChild(setClockTime);

        setClockTime.appendChild(alarmTimeHolder);
        setClockTime.appendChild(alarmTItle);
        setClockTime.appendChild(alarmDates);
        
        let alarmObject = { time:alarmTimeHolder.textContent, title:alarmTItle.textContent, date:alarmDates.textContent}


        alarmArray.push(alarmObject);
        console.log(alarmArray);


    }
});
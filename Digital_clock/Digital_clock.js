            // Digital clock
            function updateClock(){
                const now = new Date();   //New Date() is a java built-in constructor it creates Dat object containing current date and time based on the system.
                const timeStr = now.toLocaleTimeString();  // now is a variable from above line and .toLocaleTimeString() is a method that converts time into readable form according to our system. 
                document.getElementById("clock").textContent = timeStr;
            }

            setInterval(updateClock, 1000);  //setInterval is a method that repeatedly calls a function aafter a fixed interval of time here it calls updateClock() function after every 1000 milliseconds(1 sec)
            updateClock()  //this line calls our functionwhen page is loaded


            // Countdown Timer

            let timerInterval;
            function startTimer(){
                const min = parseInt(document.getElementById("minute").value) || 0;
                // parseInt()- is used to convert string into integer and in JS by default input value is string.  and 
                // .value is used because in our minute element we dont have a value, we need the value that user has entered and to get the user value .value is used. (.value is used to get the value entered by the user in the input element.)
                // || 0 --is used to prevent error if the user leaves input empty or give invalid value
                
                const sec =parseInt(document.getElementById("second").value) || 0;
                let totalSeconds = min * 60 + sec;
                clearInterval(timerInterval);  //clearInterval is a builtin function that is used to stop repeating action

                function updateTimer(){
                    if(totalSeconds <= 0){
                        clearInterval(timerInterval);
                        document.getElementById("timer-display").textContent = "TIMES UP!!!"
                        return;
                    }

                    const m =Math.floor(totalSeconds / 60).toString().padStart(2, '0');
                    //Math.floor is used to converta decimal number to its nearest integer, then usingtoString() the number is converted to string because 
                    // .padStart works only on string. padStart() is used to add extra characters at the start of the string so the string reaches a minimum length. here minimum length is 2 characters.
                    const s = (totalSeconds % 60).toString().padStart(2, '0');
                    document.getElementById("timer-display").textContent = `${m}:${s}`;
                    totalSeconds--;  //decrement operator(--) decreses the totalSeconds by one

                }
                updateTimer();
                timerInterval = setInterval(updateTimer, 1000);
            }

            function resetTimer(){
                clearInterval(timerInterval);
                document.getElementById("timer-display").textContent = "00:00";
                document.getElementById("minute").value ="";
                document.getElementById("second").value ="";

            }


            //Stopwatch

            let stopwatchInterval;
            let stopwatchSeconds =0;

            function updateStopwatchDisplay(){
                const hrs = Math.floor(stopwatchSeconds / 3600).toString().padStart(2, '0');
                const mins =Math.floor((stopwatchSeconds % 3600)/ 60).toString().padStart(2, '0');
                const secs = (stopwatchSeconds % 60).toString().padStart(2, '0');
                document.getElementById("stopwatch").textContent = `${hrs}:${mins}:${secs}`;

            }


            function startStopwatch(){
                if(stopwatchInterval)return;

                stopwatchInterval = setInterval(()=>{
                    stopwatchSeconds++;
                    updateStopwatchDisplay();
                }, 1000);
            }

            function stopStopwatch(){
                clearInterval(stopwatchInterval);
                stopwatchInterval =null;
            }

            function resetStopwatch(){
                stopStopwatch();
                stopwatchSeconds = 0;
                updateStopwatchDisplay();
            }
//Dark mode 
const darkModeBtn = document.getElementById("dark_mode_btn");
darkModeBtn.addEventListener("click", () =>{
    document.body.classList.toggle("dark-mode");
    if(document.body.classList.contains("dark-mode")){
        darkModeBtn.textContent = "Light Mode ☀️";
        localStorage.setItem("theme", "dark");
    }
    else{
        darkModeBtn.textContent ="Dark Mode 🌙"
        localStorage.setItem("theme", "light");
    }
})

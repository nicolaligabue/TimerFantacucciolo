let countdown; 
let duration = 5 * 60; // 5 minuti in secondi
let remaining = duration;

const input = document.getElementById("timer-input");
const button = document.getElementById("buttonSetTimer");

function updateDisplay(seconds) {
    let mins = String(Math.floor(seconds / 60)).padStart(2, '0');
    let secs = String(seconds % 60).padStart(2, '0');
    document.getElementById("timer").innerText = `${mins}:${secs}`;
}

function startCountdown() {
    clearInterval(countdown);
    remaining = duration;
    updateDisplay(remaining);

    countdown = setInterval(() => {
        remaining--;
        updateDisplay(remaining);

        if(remaining > 10){
            document.getElementById("timer").classList.remove("blink-timer-slow");
            document.getElementById("timer").classList.remove("blink-timer-faster");
        }
        
        if(remaining <= 10){
            if(remaining <= 5){
                document.getElementById("timer").classList.add("blink-timer-faster");
            }
            else{
                document.getElementById("timer").classList.add("blink-timer-slow");    
            }
        }

        if (remaining <= 0){
            clearInterval(countdown);
            audioTimerEnd();
            document.getElementById("timer").classList.remove("blink-timer-slow");
            document.getElementById("timer").classList.remove("blink-timer-faster");
        }
    }, 1000);
}

button.addEventListener('click', function(){
    if(!isNaN(input.value)){
        console.log("Valore di input:", input.value);
        duration = input.value;
        startCountdown();
    }
    else{
        console.log("Valore non valido!");
        alert("Valore inserito non valido!");
    }
});


document.addEventListener("keydown", function(event){
    console.log('Hai premuto il tasto:', event.key);
    startCountdown(remaining);
});

document.addEventListener("touchstart", function(event){
    startCountdown(remaining);
});

function startIntroSound(){
    var audio = new Audio('sounds/intro.mp3');
    audio.play();
}

function audioTimerEnd(){
    var audio = new Audio('sounds/timer_end.mp3');
    audio.play();
}

startIntroSound();
startCountdown();
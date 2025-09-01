let countdown; 
let duration = 5 * 60; // 5 minuti in secondi
let remaining = duration;
let isBlinking = false;

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
            document.getElementById("timer").classList.remove("blink-timer");
            isBlinking = false;
        }
        else if(remaining <= 10 && !isBlinking){
            document.getElementById("timer").classList.add("blink-timer");
            isBlinking = true;
        }

        if (remaining <= 0) {
            clearInterval(countdown);
            alert("Tempo scaduto!");
            document.getElementById("timer").classList.remove("blink-timer");
            isBlinking = false;
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


//avvia subito il primo countdown
startCountdown();
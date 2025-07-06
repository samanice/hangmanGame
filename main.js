const secretPhrases = ["pink","love","bird","flower","cat","apple","car"];

let randomItem = "";
let clicked = [];
let result = "";
let mistakes = 0;

function selectRandomItem(){
    randomItem = secretPhrases[Math.floor(Math.random()* secretPhrases.length)];
    document.getElementById("letters").addEventListener("click", buttonHandler) 
    window.addEventListener("keydown", keyHandler);
    console.log(randomItem);
}

function setUnderScores(){
    let splitedWord = randomItem.split("");
    let mappedWord = splitedWord.map(Letter => (clicked.indexOf(Letter) >= 0 ? Letter : "_"));
    result = mappedWord.join("");
    document.getElementById("clue").innerHTML = `<p>${result}</p>`;
}

function checkIfWon(){
    if(randomItem === result){
        document.getElementById("gameover").querySelector("p").style.display = "block";
        document.getElementById("image").querySelector("img").src = "./img/winner.png"
    }
}

function checkIfLost(){
    if(mistakes === 6){
        document.getElementById("gameover").querySelector("p").style.display = "block";  
        document.getElementById("clue").innerHTML = `<p>Random word is: ${randomItem}</p>`;
    }
}

function updateHangmanImg(){
    const image = document.getElementById("image").querySelector("img");
    image.src = `./img/hangman${mistakes}.png`;
}

function letterHandler(Letter){
    Letter = Letter.toLowerCase();
    clicked.indexOf(Letter) === -1 ? clicked.push(Letter) : null;
    document.getElementById(Letter.toUpperCase()).className = "used";
    if(randomItem.indexOf(Letter) >= 0){
        setUnderScores();
        checkIfWon();
    } else if(randomItem.indexOf(Letter) === -1){
        mistakes++;
        checkIfLost();
        updateHangmanImg();
    }
}

function buttonHandler(event){
    letterHandler(event.target.id);
}

function keyHandler(event){
    letterHandler(event.key);  
}

selectRandomItem();
setUnderScores();
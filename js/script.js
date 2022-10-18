//ALL'INTERNO DEL CLICK:
    //[x]creiamo una griglia dinamica di n celle.
    //[x]creiamo un'array di 16 numeri casuali (bombe) all'interno dell'evento click:
        //[x]creiamo una funzione che generi un array di numeri random di lunghezza N in un range tra A e B.
    //[x]creiamo FUORI dal ciclo un array 'arrayClicked' con i numeri delle celle cliccate:

    //SE clicchiamo su una cella il cui numero è nell'array bomba E (numero di celle - bombs) !== arrayClicked.length:
            //[]- rimuoviamo dalle celle bomba la classe "ms_click_on_square_bg"
            //[]- assegnamo a tutte le celle bomba una classe -boom- con bg red;
            //[]- non si può più cliccare , impostare una variabile flag con una condizione al click delle celle. Se il gioco finisce non succede nulla al click delle celle
            //[]- appare il numero di celle NON bomba clickate prima della bomba:
                    //[]-salvare lunghezza dell'arrayClicked attuale e spostare valore sul DOM.
    //[]SE INVECE click su un numero NON bomba E (numero di celle - bombs) !== arrayClicked.length: 
            //[x]pushamo le celle attivate dal click con classe "ms_click_on_square_bg" nell' arrayClicked 
    //[]} ALTRIMENTI se il numero (numero di celle - bombs) === arrayClicked.length loggare messaggio hai vinto



//impostiamo in una variabile il numero di celle della griglia, quante righe ha la griglia e quante celle bombe ci sono
let squareNmbr;
let howManyRow;
let bombs;

//salvo in una variabile globale la cella che verrà creata in un ciclo con la funzione 'generateSquare' al click
let square;

//salvo in una variabile le celle dell'array contenenti bombe a cui darò valore al click del Play
let squareBombs;

//All'evento click sul btn Play verrà generata una griglia di gioco
    //creiamo una variabile per salvare l'elemento button Play al cui click si genererà la griglia
const btnPlay = document.querySelector("button");

//creiamo un array arrayClicked con i numeri delle celle cliccate FUORI dal ciclo
const arrayClicked = [];
console.log(arrayClicked); //perche se tocco l'inspector si interrompe il push nell'array? perchè riappare quando chiudo e riapro inspector?

btnPlay.addEventListener("click", function(){

    //prelevo scelta del livello, cioè il livello selezionato al momento del click
    const difficulty = document.getElementById("difficulty");
    const level = difficulty.value; 

    //in base al valore del select al momento del play verrà cambiata il numero di caselle e di righe
    switch (level) {
        case "normal":
            squareNmbr = 49;
            howManyRow = 7;
            bombs = 16;
        break;
        case "hard": 
            squareNmbr = 81;
            howManyRow = 9;
            bombs = 16; //26
        break;
        case "legend": 
            squareNmbr = 100;
            howManyRow = 10;
            bombs = 16;  //33
        break;
    }

    //prelevo l'elemento in cui verrano create le celle e lo salvo in variabile
    const grid = document.querySelector(".grid");

    //ad ogni click l'elemento -grid- viene svuotato
    grid.innerHTML = "";

    //generiamo un array dal quale creeremo la griglia. Lo generiamo dalla funzione -generateOrderArray-
    const progressiveNmbrs = generateOrderArray (squareNmbr);

    //generiamo un array con il numero delle celle bomba dalla funzione -generateBombsArray-
    const bombArray = generateBombsArray (bombs, 1, squareNmbr);
    console.log(bombArray);

    //assegno il valore alle celle dell'array contenente bombe
    for (let i=0; i<bombArray.length; i++){
        squareBombs = bombArray[i];
        console.log(squareBombs);
    }

    //per ogni numero dell'array creiamo dinamicamente una cella -square- attraverso un ciclo che scorra l'array
    for (let i = 0; i< progressiveNmbrs.length; i++){

        //creo una funzione -generateSquare- che generi un elemento all'interno del quale andrà un contenuto (numero preso dall'array)
            //salvo il numero preso dall'array in una variabile -innerNmbrs-
        const innerNmbrs = progressiveNmbrs[i];
        square = generateSquare (innerNmbrs, howManyRow);
        //inserisco l'elemento creato nell'elemento genitore salvato nella variabile -grid-
        grid.append(square);
        //ad ogni elemento creato in questo ciclo, assegniamo un evento che lo attiva(al click cambia colore e logga messaggio)
        square.addEventListener("click", lightAndPushClickedSquares);
    }
 
 })





//  FUNCTIONS

/**
 * Description: Funzione che genera array con numeri progressivi da 1 a 100
 * @param {number} --> numero della lunghezza dell'array 
 * @returns {array} --> la funzione genererà un array 
 */
function generateOrderArray (arrayLength) {
    const array1to100 = [];
    for(let nmbr = 1; nmbr <= arrayLength; nmbr++){
        array1to100.push(nmbr);
    }
    return array1to100;
}

/**
 * Description: Funzione che crea un elemento con un contenuto testuale interno(insideNmbr)
 * @param {number} --> il contenuto dell'elemento sarà un numero da 1 a 100
 * @param {number} --> il numero delle righe della griglia, che determina altezza e larghezza della cella
 * @returns {object} --> la funzione genererà un elemento nel DOM
 */
function generateSquare (insideNmbr, rowNmbr){
    const newElement = document.createElement("div");
    newElement.classList.add("square", "flex", "align-center", "justify-center");
    newElement.style.width = `calc(100% / ${rowNmbr})`;
    newElement.style.height = `calc(100% / ${rowNmbr})`;
    newElement.innerHTML = insideNmbr;
    return newElement;
}

/**
 * Description: Funzione che generi un array di numeri diversi random di lunghezza N in un range tra A e B.
 * @param {number} --> lunghezza dell'array (numero di bombe)
 * @param {number} --> valore minimo del range tra cui selezionare gli elementi casuali del array 
 * @param {number} --> valore massimo del range tra cui selezionare gli elementi casuali del array 
 * @returns {array} --> la funzione genererà un array
 */
 function generateBombsArray (howManyElements, min, max){
    const newArray = [];
    let i = 0;
    while ( newArray.length < howManyElements){
        const rndNmbr = Math.floor(Math.random() * (max - min +1)) + min;
        if (!newArray.includes(rndNmbr)){
            i++;
            newArray.push(rndNmbr);
        }
    }
    return newArray;
 }

 /**
 * Description: Funzione che colora e pusha in un array i numeri delle celle attivate dall'evento click.
 * @returns {number} --> la funzione restituisce il numero da aggiungere all'array
 */
  function lightAndPushClickedSquares (){
    //salvo il contenuto della cella (numero) che verrà ritornato e aggiunto all'array
    const nmbrToPush = parseInt(this.textContent);
    //se il numero di celle cliccate è inferiore al numero di celle sicure e la cella cliccata è una bomba inverto classi 
    if(arrayClicked.length < (squareNmbr - bombs) && nmbrToPush === squareBombs) {
        squareBombs.classList.remove("ms_click_on_square_bg");
        squareBombs.classList.add("ms_boom_square_bg");
        console.log("You Died");
        //se invece la cella non è bomba aggiungo la cella all'array di celle clickat ecambio classe e vado avanti
    } else if (arrayClicked.length < (squareNmbr - bombs) && nmbrToPush !== squareBombs.value){
        //aggiungo un controllo che non permetta di aggiungere all'arrayClicked numeri di celle già cliccate
        if(!arrayClicked.includes(nmbrToPush)){
            this.classList.add("ms_click_on_square_bg");
            arrayClicked.push(nmbrToPush);
        }
    } else {
        console.log("you win");
    }

    return nmbrToPush;
}

            //[]SE clickiamo su uno di questi numeri ; 
            //[]- si assegna a tutte le celle una classe -boom- con bg red;
            //[]- non si può più cliccare (in che modo?)
            //[]- appare il numero di celle NON bomba clickate prima della bomba:
                //[]-salvare lunghezza dell'arrayClicked e spostare valore sul DOM.
 /**
 * Description: Funzione che colora di rosso tutte le celle bomba, impedisce nuovi click sulla griglia
 *              e logga un messaggio all'utente e il numero di celle non minate cliccate
 * 
 * @returns {string} --> la funzione restituisce una stringa con messaggio di sconfitta e numero di celle non minate cliccate
 */
/*
  function stepOnAMine (){
    squareBombs.classList.remove("ms_click_on_square_bg");
    squareBombs.classList.add("ms_boom_square_bg");
}
*/
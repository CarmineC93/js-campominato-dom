

//ALL'INTERNO DEL CLICK:
    //creiamo un'array di 16 numeri casuali all'interno dell'evento click
    //creiamo un array arrayClicked in cui vengono pushate le celle clickate con classe "ms_click_on_square_bg"

    //SE (numero di celle -  16) !== arrayClicked.LENGTH {
            //SE clickiamo su uno di questi numeri : 
            //- si assegna a tutte le celle una classe -boom- con bg red;
            //- non si può più cliccare (in che modo?)
            //- appare il numero di celle NON bomba clickate prima della bomba:
                //-salvare lunghezza dell'arrayClicked e spostare valore sul DOM.
        //SE INVECE click su un numero NON bomba continuo.
    //} ALTRIMENTI {loggare messaggio hai vinto}





//impostiamo in una variabile il numero di celle della griglia
let squareNmbr;
let howManyRow;


//All'evento click sul btn Play verrà generata una griglia di gioco
    //creiamo una variabile per salvare l'elemento button Play al cui click si genererà la griglia
const btnPlay = document.querySelector("button");


btnPlay.addEventListener( "click", function(){

    //prelevo scelta del livello, cioè il livello selezionato al momento del click
    const difficulty = document.getElementById("difficulty");
    const level = difficulty.value; 

    switch (level) {
        case "normal":
            squareNmbr = 49;
            howManyRow = 7;
        break;
        case "hard": 
            squareNmbr = 81;
            howManyRow = 9;
        break;
        case "legend": 
            squareNmbr = 100;
            howManyRow = 10;
        break;
    }

    //prelevo l'elemento in cui verrano create le celle e lo salvo in variabile
    const grid = document.querySelector(".grid");

    //ad ogni click l'elemento -grid- viene svuotato
    grid.innerHTML = "";

    //generiamo un array dal quale creeremo la griglia. Lo generiamo dalla funzione -generateOrderArray-
    const progressiveNmbrs = generateOrderArray (squareNmbr);
    //per ogni numero dell'array creiamo dinamicamente una cella -square- attraverso un ciclo che scorra l'array

    for (let i = 0; i< progressiveNmbrs.length; i++){

        //creo una funzione -generateSquare- che generi un elemento all'interno del quale andrà un contenuto (numero preso dall'array)
            //salvo il numero preso dall'array in una variabile -innerNmbrs-
        const innerNmbrs = progressiveNmbrs[i];
        const square = generateSquare (innerNmbrs, howManyRow);
        //inserisco l'elemento creato nell'elemento genitore salvato nella variabile -grid-
        grid.append(square);

        //ad ogni elemento creato in questo ciclo, assegniamo un evento che lo attiva(al click cambia colore e logga messaggio)
        square.addEventListener("click", function(){
            square.classList.add("ms_click_on_square_bg");
            console.log(innerNmbrs)
        })
    }
 })


/**
 * Description Funzione che genera array con numeri progressivi da 1 a 100
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
 * Description Funzione che crea un elemento con un contenuto testuale interno(insideNmbr)
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
    console.log(rowNmbr);
    return newElement;
    
}

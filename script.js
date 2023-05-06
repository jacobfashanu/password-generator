const letters = ['a','b','c','d','e','f','g','h','i','j','k','l','m','n','o','p','q','r','s','t','u','v','w','x','y','z','A','B','C','D','E','F','G','H','I','J','K','L','M','N','O','P','Q','R','S','T','U','V','W','X','Y','Z'];

const numbers = ['1','2','3','4','5','6','7','8','9','0'];

const symbols = ['~','`','!','@','#','$','%','^','&','*','(',')','-','_','+','=','{','[',']','}','|',':',';','?','/'];


let hasNumbers = false;
let hasSymbols = false;


function contains(str, arr) {
    for (let i = 0; i < str.length; i++) {
        const char = str[i];
        for (let j = 0; j < arr.length; j++) {
            if (char === arr[j]) {
                return true;
            }
        }
    }
    return false;
}

function contained(num, arr) {
    for (let i = 0; i < arr.length; i++) {
        if (num === arr[i]) {
            return true;
        }
    }
    return false;
}

function findIndices(str, arr) {
    let indices = [];
    for (let i = 0; i < str.length; i++) {
        const char = str[i];
        for (let j = 0; j < arr.length; j++) {
            if (char === arr[j]) {
                indices.push(i);
            }
        }
    }
    return indices;
}

function generatePassword(length, hasNumbers, hasSymbols) {
    let password = '';
    let characters = letters;
    if(hasNumbers) {
        characters = characters.concat(numbers);
    }
    if(hasSymbols) {
        characters = characters.concat(symbols);
    }
    for (let i = 0; i < length; i++) {
        let index1 = Math.floor(Math.random() * (characters.length - 0) + 0);
        password += characters[index1];
    }
    let indexOfNumbers = -1;

    if (!contains(password, numbers) && hasNumbers) {
        indexOfNumbers = Math.floor(Math.random() * (numbers.length - 0) + 0);
        let indexOfPassword = Math.floor(Math.random() * (password.length - 0) + 0);
        password = password.slice(0, indexOfPassword) +  numbers[indexOfNumbers] + password.slice((indexOfPassword + 1), password.length);
    }

    if (!contains(password, symbols) && hasSymbols) {
        let j1 = 0;
        let indexOfSymbols = Math.floor(Math.random() * (symbols.length - 0) + 0);
        let indicesOfNumbers = findIndices(password, numbers); //array of indices where there are numbers in the password
        
        let indexOfPassword = Math.floor(Math.random() * (password.length - 0) + 0);
        while(contained(indexOfPassword,indicesOfNumbers) && j1 != 10) { //while the indexOfSymbols variable is a member of the indices of number array, keep generating a new indices
            indexOfPassword = Math.floor(Math.random() * (password.length - 0) + 0);
            j1 += 1;
        }
        password = password.slice(0, indexOfPassword) +  symbols[indexOfSymbols] + password.slice((indexOfPassword + 1), password.length);

    }

    return password;
}


const button1 = document.querySelector("button");
const result = document.querySelector("#output");
const numbercheckbox = document.querySelector("#numcheckbox");
const symbolcheckbox = document.querySelector("#symbolcheckbox");
const lengthscroller = document.querySelector("#lengthscroll");
const copybutton = document.querySelector("#copy");
let withNumbers = false;
let withSymbols = false;
let lengthOfPassword = 10;

button1.addEventListener("click" , () => {
    result.value = generatePassword(15, false, true);
});

numbercheckbox.addEventListener('click', () => {
    if(numbercheckbox.checked) {
        withNumbers = true;
    }
    else {
        withNumbers = false;
    }
});

symbolcheckbox.addEventListener('click', () => {
    if(symbolcheckbox.checked) {
        withSymbols = true;
    }
    else {
        withSymbols = false;
    }
});



lengthscroller.addEventListener("input", (event) => {
    document.querySelector("p").textContent = event.target.value;
    lengthOfPassword = event.target.value;
})

button1.addEventListener("click" , () => {
    result.value = generatePassword(lengthOfPassword, withNumbers, withSymbols);
});

copybutton.addEventListener("click", () => {
    navigator.clipboard.writeText(result.value);
})
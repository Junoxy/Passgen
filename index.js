function passGen(length) {
    const uppercaseChars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ';
    const lowercaseChars = 'abcdefghijklmnopqrstuvwxyz';
    const numberChars = '0123456789';
    const symbolChars = '!@#$%^&*()_+{}[]|:;<>,.?/~';

    const uppercaseCheck = document.querySelector("#check-uppercase");
    const lowercaseCheck = document.querySelector("#check-lowercase");
    const numbersCheck = document.querySelector("#check-numbers");
    const symbolsCheck = document.querySelector("#check-symbols");

    let allChars = 
        (uppercaseCheck.checked ? uppercaseChars : '') +
        (lowercaseCheck.checked ? lowercaseChars : '') +
        (numbersCheck.checked ? numberChars : '') +
        (symbolsCheck.checked ? symbolChars : '');
    
    let password = "";
    for(let i = 0; i < length; i++) {
        const randomIndex = Math.floor(Math.random() * allChars.length);
        password += allChars[randomIndex];
    }
    return password;
}

const copyPass = document.querySelector(".copy-pass-button");

copyPass.addEventListener("click", function(){
    passText = document.querySelector(".gen-pass").textContent;
    navigator.clipboard.writeText(passText);
});

const passLength = document.querySelector(".char-length-number");
const slider = document.querySelector(".char-length-slider");
slider.addEventListener("input", function(){
    let length = parseInt(this.value);
    passLength.textContent = length;
});
slider.addEventListener("input", function() {
    const thumbPosition = (this.value - this.min) / (this.max - this.min);
    this.style.setProperty('--thumb-position', thumbPosition);
  });

const strengthBars = document.querySelectorAll(".strength-bar");
const currentStrengthText = document.querySelector(".current-strength");

function strengthOfPass() {
    const uppercaseChars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ';
    const lowercaseChars = 'abcdefghijklmnopqrstuvwxyz';
    const numberChars = '0123456789';
    const symbolChars = '!@#$%^&*()_+{}[]|:;<>,.?/~';
    let conditionsMet = 0;
    document.querySelector(".gen-pass").textContent.split("").some((char) => uppercaseChars.includes(char)) ? conditionsMet++ : null;
    document.querySelector(".gen-pass").textContent.split("").some((char) => lowercaseChars.includes(char)) ? conditionsMet++ : null;
    document.querySelector(".gen-pass").textContent.split("").some((char) => numberChars.includes(char)) ? conditionsMet++ : null;
    document.querySelector(".gen-pass").textContent.split("").some((char) => symbolChars.includes(char)) ? conditionsMet++ : null;
    document.querySelector(".gen-pass").textContent.length >= 8 ? conditionsMet++ : null;
    document.querySelector(".gen-pass").textContent.length < 8 ? conditionsMet-- : null;
    conditionsMet >= 1 ? (strengthBars[0].style.backgroundColor = "#FFA257", currentStrengthText.innerText = "WEAK") : strengthBars[0].style.backgroundColor = "transparent";
    conditionsMet >= 2 ? (strengthBars[0,1].style.backgroundColor = "#FFA257", currentStrengthText.innerText = "WEAK") : strengthBars[0,1].style.backgroundColor = "transparent";
    conditionsMet >= 3 ? (strengthBars[0,1,2].style.backgroundColor = "#FFA257", currentStrengthText.innerText = "MEDIUM") : strengthBars[0,1,2].style.backgroundColor = "transparent";
    conditionsMet >= 4 ? (strengthBars[0,1,2,3].style.backgroundColor = "#FFA257",currentStrengthText.innerText = "STRONG") : strengthBars[0,1,2,3].style.backgroundColor = "transparent";
    conditionsMet >= 5 ? (strengthBars.forEach(bar => bar.style.backgroundColor = "green"),currentStrengthText.innerText = "STRONG+") : strengthBars[0,1,2,3].style.backgroundColor = "transparent";
}


const generatePass = document.querySelector(".generate");
const generatedPass = document.querySelector(".gen-pass");

generatePass.addEventListener("click", function() {
    const uppercaseCheck = document.querySelector("#check-uppercase");
    const lowercaseCheck = document.querySelector("#check-lowercase");
    const numbersCheck = document.querySelector("#check-numbers");
    const symbolsCheck = document.querySelector("#check-symbols");
    if (!uppercaseCheck.checked && !lowercaseCheck.checked && !numbersCheck.checked && !symbolsCheck.checked) {
        alert("Please check at least one option for password generation ^^");
        return; 
    }
    if (parseInt(slider.value) <= 0) {
        alert("Please select a password length greater than 0 ^^");
        return;
    }
    let length = parseInt(slider.value);
    let generatedPassword = passGen(length);
    generatedPass.textContent = generatedPassword;

    strengthOfPass();
});


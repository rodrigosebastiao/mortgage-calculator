import {localCurrency} from "./helpers/localeCurrency";

/* 
    Formulas
    Principle & Interest:
    ((interestRate / 100) / 12)* loanAmount / (1-Math.pow((1 + ((interestRate / 100)/12)), -yearsOfMortgage*12))
    Tax
    annualTax / 12
    Insurance
    annualInsurance / 12
    Monthly payment
    principleAndInterests + Tax + Insurance
*/


class MortgageCalculator {
    constructor(yearsOfMortGage, interestRate, loanAmount, anualTax, anualInsurance){
        this._yearsOfMortGage = yearsOfMortGage; /* @type {number} */
        this._interestRate = interestRate; /* @type {number} */
        this._loanAmount = loanAmount; /* @type {number} */
        this._anualTax = anualTax; /* @type {number} */
        this._anualInsurance = anualInsurance; /* @type {number} */
    }
    
    get yearsOfMortGage() {
        return this._yearsOfMortGage;
    }

    set yearsOfMortGage(value) {
        this._yearsOfMortGage = value;
    }

    get interestRate() {
        
        return this._interestRate;
    }

    set interestRate(value) {

        this._interestRate = value;
    }

    get loanAmount() {
        return this._loanAmount;
    }

    set loanAmount(value) {
        this._loanAmount = value;
    }

    get anualTax() {
        return this._anualTax;
    }

    set anualTax(value) {
        this._anualTax = value;
    }

    get anualInsurance() {
        return this._anualInsurance;
    }

    set anualInsurance(value) {
        this._anualInsurance = value;
    }

    get resultPrincipalInterest() {
        // console.log("this._loanAmount", this._loanAmount);
        const principalInterest = (this._interestRate / 100 / 12) * this._loanAmount / (1 - Math.pow((1 + ((this._interestRate / 100)/12)), - this._yearsOfMortGage * 12));
        return this._resultPrincipalInterest = principalInterest;
    }

    get resultTax() {
        return this._anualTax / 12;
    }

    get resultInsurance() {
        return this._anualInsurance / 12;
    }

    get resultMonthlyPayment() {
        return this._resultPrincipalInterest / 12;
    }
}

function calcuLatorView() {
    const calculator = new MortgageCalculator();

    const updateDOMView = (input, status, objProperty) => {
        const inputElement = document.querySelector(input);
        const statusField = status ? document.querySelector(status) : "";

        function updateValue (value){
            calculator[objProperty] = value;
            
            if(statusField){
                statusField.value = calculator[objProperty];
            }

            // ON/OFF Real time update
            updateResults();
        }


        updateValue(Number(inputElement.value));


        inputElement.addEventListener("change", (event)=>{
            const newValue = Number(event.target.value);
            updateValue(newValue);
        });

        inputElement.addEventListener("keyup", (event)=>{
            const newValue = Number(event.target.value);
            updateValue(newValue);
        });
    }


    updateDOMView("#years-of-mortgage", "#years-of-mortgage-status", "yearsOfMortGage");
    updateDOMView("#interest-rate", "#interest-rate-status", "interestRate");
    updateDOMView("#loan-amount", "", "loanAmount");
    updateDOMView("#anual-tax", "", "anualTax");
    updateDOMView("#anual-insurance", "", "anualInsurance");


    function updateResults(){
        const labelPrincipal = document.querySelector("#result-principal-interest");
        const labelTax = document.querySelector("#result-tax");
        const labelInsurance = document.querySelector("#result-insurance");
        const labelMonthlyPayment = document.querySelector("#result-monthly-payment");

        // labelPrincipal.innerText = calculator.resultPrincipalInterest;
        /*  */
        labelPrincipal.innerText = localCurrency(calculator.resultPrincipalInterest);
        labelTax.innerText = localCurrency(calculator.resultTax);
        labelInsurance.innerText = localCurrency(calculator.resultInsurance);
        labelMonthlyPayment.innerText = localCurrency(calculator.resultMonthlyPayment);
    }

    document.querySelector("#calculator-form").addEventListener("click", (event)=>{
        event.preventDefault();
        /* Update on submit */
        updateResults();
    });

}



document.addEventListener("DOMContentLoaded", ()=>{
    calcuLatorView();
});

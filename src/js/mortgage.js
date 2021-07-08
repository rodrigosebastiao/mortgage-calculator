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
    constructor(yearsOfMortGage, interestRate, loanAmount, annualTax, annualInsurance){
        this._yearsOfMortGage = yearsOfMortGage; /* @type {number} */
        this._interestRate = interestRate; /* @type {number} */
        this._loanAmount = loanAmount; /* @type {number} */
        this._annualTax = annualTax; /* @type {number} */
        this._annualInsurance = annualInsurance; /* @type {number} */
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

    get annualTax() {
        /* Tax: annualTax / 12 */
        return this._annualTax;
    }

    set annualTax(value) {
        this._annualTax = value;
    }

    get annualInsurance() {
        /* Insurance: annualInsurance / 12 */
        return this._annualInsurance;
    }

    set annualInsurance(value) {
        this._annualInsurance = value;
    }

    get resultPrincipalInterest() {
        /* Principle & Interest:
    ((interestRate / 100) / 12)* loanAmount / (1-Math.pow((1 + ((interestRate / 100)/12)), -yearsOfMortgage*12)) */
        const principalInterest = (this._interestRate / 100 / 12) * this._loanAmount / (1 - Math.pow((1 + ((this._interestRate / 100)/12)), - this._yearsOfMortGage * 12));
        return this._resultPrincipalInterest = principalInterest;
    }
    

    get resultTax() {
        return this._annualTax / 12;
    }

    get resultInsurance() {
        return this._annualInsurance / 12;
    }

    get resultMonthlyPayment() {
        /* Monthly payment: principleAndInterests + Tax + Insurance */
        return (this.resultPrincipalInterest + this.resultTax + this.resultInsurance);
    }
}

const calculator = new MortgageCalculator();

function calcuLatorView() {

    const updateDOMView = (input, status, objProperty) => {
        const inputElement = document.querySelector(input);
        const statusField = status ? document.querySelector(status) : "";

        function updateValue (value){
            calculator[objProperty] = value
            
            if(statusField){
                statusField.value = calculator[objProperty];
                inputElement.value =  calculator[objProperty];
            }

           /* ON/OFF Real time feature */
            // updateResults(); 
        }


        updateValue(inputElement.value);


        inputElement.addEventListener("change", (event)=>{
            const newValue = event.target.value;
            updateValue(newValue);
        });

        [inputElement, statusField].forEach((field)=>{
            if(field){
                field.addEventListener("keyup", (event)=>{
                    const newValue = event.target.value;
                    updateValue(newValue);
                });
            }
        });
    }


    /*pass elements and object setters/getters as string to keep reference*/
    updateDOMView("#years-of-mortgage", "#years-of-mortgage-status", "yearsOfMortGage");
    updateDOMView("#interest-rate", "#interest-rate-status", "interestRate");
    updateDOMView("#loan-amount", "", "loanAmount");
    updateDOMView("#annual-tax", "", "annualTax");
    updateDOMView("#annual-insurance", "", "annualInsurance");
    updateDOMView("#years-of-mortgage-status", "", "yearsOfMortGage");
    // updateDOMView("#interest-rate-status", "", "interestRate");


    function updateResults(event){
        const labelPrincipal = document.querySelector("#result-principal-interest");
        const labelTax = document.querySelector("#result-tax");
        const labelInsurance = document.querySelector("#result-insurance");
        const labelMonthlyPayment = document.querySelector("#result-monthly-payment");
        const mortgageResults = document.querySelector(".mortgage-results");

        labelPrincipal.innerText = localCurrency(calculator.resultPrincipalInterest);
        labelTax.innerText = localCurrency(calculator.resultTax);
        labelInsurance.innerText = localCurrency(calculator.resultInsurance);
        labelMonthlyPayment.innerText = localCurrency(calculator.resultMonthlyPayment);

        mortgageResults.classList.add("mortgage-results--display");
        mortgageResults.scrollIntoView();
        event.target.classList.add("calculator__form--calculated");
    }

    document.querySelector("#calculator-form").addEventListener("submit", (event)=>{
        event.preventDefault();
        /* Update on submit if Real time is off*/
        updateDOMView("#years-of-mortgage", "#years-of-mortgage-status", "yearsOfMortGage");
        updateDOMView("#interest-rate", "#interest-rate-status", "interestRate");
        updateDOMView("#loan-amount", "", "loanAmount");
        updateDOMView("#annual-tax", "", "annualTax");
        updateDOMView("#annual-insurance", "", "annualInsurance");
        updateResults(event);
    });

    /* Alerts */

    const alerts = (event) => {
        const alertField = event.target;

        if(!alertField.value || Number(alertField.value) <= 0){
            alertField.classList.add("warning");
        } else {
            alertField.classList.remove("warning");
        }
    }
    const inputsRequired = document.querySelectorAll("input:required");

    inputsRequired.forEach((input)=>{
        input.addEventListener("change", (event)=>{
            alerts(event);
        });
        input.addEventListener("keyup", (event)=>{
            alerts(event);
        });
    });
}


document.addEventListener("DOMContentLoaded", ()=>{
    calcuLatorView();
});

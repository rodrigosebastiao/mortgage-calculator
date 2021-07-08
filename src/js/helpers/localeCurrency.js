export const localCurrency = (num) =>{
    const prefix = "$";
    
    // const currency = num.toFixed(2).toLocaleString('en-US', {minimumFractionDigits: 2});
    const currencyFormatted = parseFloat(Number(num).toFixed(2)).toLocaleString('en');
    return `${prefix} ${currencyFormatted}`;
}
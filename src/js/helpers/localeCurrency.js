const removeSign = (num) => {
    return num
}

export const localCurrency = (num) =>{
    const prefix = "$";
    const value = num.toFixed(2).toLocaleString('en-US', {minimumFractionDigits: 2})
    return `${prefix} ${value}`;
}
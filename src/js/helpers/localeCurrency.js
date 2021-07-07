const removeSign = (num) => {
    return num
}

export const localCurrency = (num) =>{
    num.toLocaleString("de-US", { style: "currency", currency: "USD" });
    return num.toLocaleString("de-US", { style: "currency", currency: "USD" });
}
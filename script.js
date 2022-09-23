const baseCurrency = document.getElementById("base-currency")
const baseValue = document.getElementById("base-value")
const swapBtn = document.getElementById("swap")
const rate = document.getElementById("rate")
const targetCurrency = document.getElementById("target-currency")
const targetValue = document.getElementById("target-value")

// fetching currencies for options
fetch("https://v6.exchangerate-api.com/v6/6d21f805177c631d5c327a6b/latest/USD")
.then((response) => response.json())
.then((data) => data.conversion_rates)
.then(conversion_rates => Object.keys(conversion_rates))
.then(currencies => addOptions(currencies))

// Event listeners
baseCurrency.addEventListener("change", calculateExchRate)
targetCurrency.addEventListener("change", calculateExchRate)
baseValue.addEventListener("input", calculateExchRate)
swapBtn.addEventListener("click", swip)

// Calculate Exchange Rate
function calculateExchRate() {
    fetch(`https://v6.exchangerate-api.com/v6/6d21f805177c631d5c327a6b/latest/${baseCurrency.value}`)
    .then((response) => response.json())
    .then((data) => data.conversion_rates)
    .then(conversion_rates => {
        rate.innerHTML = `1 ${baseCurrency.value} = ${conversion_rates[targetCurrency.value]} ${targetCurrency.value}`
        targetValue.innerHTML = (conversion_rates[targetCurrency.value] * baseValue.value).toFixed(2)
    })
}

// Add currencies available as select options
function addOptions(currencies) {
    currencies.forEach(currency => {
        const option = document.createElement("option")
        option.setAttribute("value", currency)
        option.innerHTML = currency
        baseCurrency.append(option.cloneNode(true))
        targetCurrency.append(option)
    })
    baseCurrency.value = "USD"
    targetCurrency.value = "EUR"
}

// Swip function
function swip() {
    [baseCurrency.value, targetCurrency.value] = [targetCurrency.value, baseCurrency.value]
    calculateExchRate()
}
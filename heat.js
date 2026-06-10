function bmi() {
  // Get input values
  const heightInput = document.getElementById("height")
  const weightInput = document.getElementById("weight")
  const resultElement = document.getElementById("result")

  // Get the values and convert to numbers
  const height = Number.parseFloat(heightInput.value)
  const weight = Number.parseFloat(weightInput.value)

  // Validate inputs
  if (isNaN(height) || isNaN(weight) || height <= 0 || weight <= 0) {
    resultElement.innerHTML = '<span style="color: #ff4757;">Please enter valid height and weight values!</span>'
    return
  }

  // Convert height from cm to meters
  const heightInMeters = height / 100

  // Calculate BMI
  const bmiValue = weight / (heightInMeters * heightInMeters)

  // Determine BMI category and color
  let category = ""
  let color = ""

  if (bmiValue < 18.5) {
    category = "Underweight"
    color = "#3742fa"
  } else if (bmiValue >= 18.5 && bmiValue < 25) {
    category = "Normal weight"
    color = "#2ed573"
  } else if (bmiValue >= 25 && bmiValue < 30) {
    category = "Overweight"
    color = "#ffa502"
  } else {
    category = "Obese"
    color = "#ff4757"
  }

  // Display result
  resultElement.innerHTML = `
        <div style="text-align: center; margin: 20px 0; color: white;">
            <div style="font-size: 24px; font-weight: bold; margin-bottom: 10px;">
                Your BMI: <span style="color: ${color};">${bmiValue.toFixed(1)}</span>
            </div>
            <div style="font-size: 18px; color: ${color}; font-weight: 600;">
                ${category}
            </div>
        </div>
    `
}

// Add Enter key functionality
document.addEventListener("DOMContentLoaded", () => {
  const heightInput = document.getElementById("height")
  const weightInput = document.getElementById("weight")

  // Allow calculation when Enter is pressed
  heightInput.addEventListener("keypress", (event) => {
    if (event.key === "Enter") {
      bmi()
    }
  })

  weightInput.addEventListener("keypress", (event) => {
    if (event.key === "Enter") {
      bmi()
    }
  })

  // Clear result when inputs are being modified
  heightInput.addEventListener("input", () => {
    document.getElementById("result").innerHTML = ""
  })

  weightInput.addEventListener("input", () => {
    document.getElementById("result").innerHTML = ""
  })
})

function myfunction() {
  // Get input values
  const temperatureInput = document.getElementById("num")
  const conversionType = document.getElementById("calculate")
  const resultElement = document.getElementById("result")
  const formulaElement = document.getElementById("formula")

  // Get the temperature value
  const temperature = Number.parseFloat(temperatureInput.value)

  // Validate input
  if (isNaN(temperature)) {
    resultElement.value = "Please enter a valid temperature!"
    resultElement.style.color = "#ff4757"
    formulaElement.innerHTML = ""
    return
  }

  let result = 0
  let resultText = ""
  let formulaText = ""

  // Perform conversion based on selected option
  if (conversionType.value === "celsius") {
    // Celsius to Fahrenheit: F = (C * 9/5) + 32
    result = (temperature * 9) / 5 + 32
    resultText = `${temperature}°C = ${result.toFixed(2)}°F`
    formulaText = "Formula: °F = (°C * 9/5) + 32"
  } else if (conversionType.value === "fahrenheit") {
    // Fahrenheit to Celsius: C = (F - 32) * 5/9
    result = ((temperature - 32) * 5) / 9
    resultText = `${temperature}°F = ${result.toFixed(2)}°C`
    formulaText = "Formula: °C = (°F - 32) * 5/9"
  }

  // Display result
  resultElement.value = resultText
  resultElement.style.color = "#2ed573"
  formulaElement.innerHTML = formulaText

  // Add temperature category information
  addTemperatureInfo(result, conversionType.value === "celsius" ? "fahrenheit" : "celsius")
}

function addTemperatureInfo(temp, unit) {
  const formulaElement = document.getElementById("formula")
  let category = ""
  let color = "#fff"

  // Determine temperature category (using Celsius as base)
  const tempInCelsius = unit === "celsius" ? temp : ((temp - 32) * 5) / 9

  if (tempInCelsius < 0) {
    category = "Freezing"
    color = "#3742fa"
  } else if (tempInCelsius >= 0 && tempInCelsius < 10) {
    category = "Very Cold"
    color = "#70a1ff"
  } else if (tempInCelsius >= 10 && tempInCelsius < 20) {
    category = "Cold"
    color = "#5352ed"
  } else if (tempInCelsius >= 20 && tempInCelsius < 30) {
    category = "Comfortable"
    color = "#2ed573"
  } else if (tempInCelsius >= 30 && tempInCelsius < 40) {
    category = "Warm"
    color = "#ffa502"
  } else {
    category = "Hot"
    color = "#ff4757"
  }

  // Update formula element with category info
  formulaElement.innerHTML += `<br><span style="color: ${color}; font-weight: bold;">Category: ${category}</span>`
}

// Add Enter key functionality and real-time updates
document.addEventListener("DOMContentLoaded", () => {
  const temperatureInput = document.getElementById("num")
  const conversionSelect = document.getElementById("calculate")
  const resultElement = document.getElementById("result")
  const formulaElement = document.getElementById("formula")

  // Allow calculation when Enter is pressed
  temperatureInput.addEventListener("keypress", (event) => {
    if (event.key === "Enter") {
      myfunction()
    }
  })

  // Clear result when input is being modified
  temperatureInput.addEventListener("input", () => {
    resultElement.value = ""
    formulaElement.innerHTML = ""
  })

  // Recalculate when conversion type changes (if there's a value)
  conversionSelect.addEventListener("change", () => {
    if (temperatureInput.value !== "") {
      myfunction()
    }
  })

  // Add some common temperature references
  addTemperatureReferences()
})

function addTemperatureReferences() {
  // You can call this function to show common temperature references
  console.log("Temperature References:")
  console.log("Water freezes: 0°C / 32°F")
  console.log("Room temperature: ~20°C / 68°F")
  console.log("Body temperature: 37°C / 98.6°F")
  console.log("Water boils: 100°C / 212°F")
}

// Additional utility function for batch conversions
function convertTemperature(temp, fromUnit) {
  if (fromUnit.toLowerCase() === "celsius") {
    return {
      fahrenheit: (temp * 9) / 5 + 32,
      kelvin: temp + 273.15,
    }
  } else if (fromUnit.toLowerCase() === "fahrenheit") {
    return {
      celsius: ((temp - 32) * 5) / 9,
      kelvin: ((temp - 32) * 5) / 9 + 273.15,
    }
  }
}

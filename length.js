
function convertLength() {
  const input = parseFloat(document.getElementById("inputValue").value);
  const fromUnit = document.getElementById("fromUnit").value;
  const toUnit = document.getElementById("toUnit").value;
  const resultBox = document.getElementById("result");

  if (isNaN(input)) {
    resultBox.innerHTML = "<span style='color: red;'>Please enter a valid number.</span>";
    return;
  }

  // Convert input to meters
  const toMeters = {
    kilometer: input * 1000,
    meter: input,
    centimeter: input / 100,
    millimeter: input / 1000,
    mile: input * 1609.34,
    yard: input * 0.9144,
    foot: input * 0.3048,
    inch: input * 0.0254
  };

  let meterValue = toMeters[fromUnit];
  if (meterValue === undefined) {
    resultBox.innerHTML = "<span style='color: red;'>Invalid source unit</span>";
    return;
  }

  // Convert meters to target unit
  const fromMeters = {
    kilometer: meterValue / 1000,
    meter: meterValue,
    centimeter: meterValue * 100,
    millimeter: meterValue * 1000,
    mile: meterValue / 1609.34,
    yard: meterValue / 0.9144,
    foot: meterValue / 0.3048,
    inch: meterValue / 0.0254
  };

  let finalValue = fromMeters[toUnit];
  if (finalValue === undefined) {
    resultBox.innerHTML = "<span style='color: red;'>Invalid target unit</span>";
    return;
  }

  resultBox.innerHTML = `
    <div style="
      color: #2ed573;
      font-size: 18px;
      margin-top: 15px;
      padding: 10px 20px;
      border-radius: 10px;
      background: rgba(0, 0, 0, 0.3);
      box-shadow: 0 0 10px #2ed573;
    ">
      ✅ Result: <strong>${finalValue.toFixed(4)} ${toUnit}</strong>
    </div>
  `;
}

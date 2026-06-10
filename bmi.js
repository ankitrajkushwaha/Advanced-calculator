function bmi() {
    let height = document.getElementById("height").value;
    let weight = document.getElementById("weight").value;

    // Convert height to meters
    height = height / 100;

    // Validate input
    if (height > 0 && weight > 0) {
        let bmi = weight / (height * height);
        document.getElementById("bmiResult").value = bmi.toFixed(2);
    } else {
        document.getElementById("bmiResult").value = "Invalid Input";
    }
}
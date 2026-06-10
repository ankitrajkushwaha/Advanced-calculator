let inputBox = document.getElementById('inputBox');
let buttons = document.querySelectorAll('button');

buttons.forEach(button => {
    button.addEventListener('click', () => {
        const value = button.textContent;

        if (value === 'AC') {
            inputBox.value = '';
        } else if (value === 'DEL') {
            inputBox.value = inputBox.value.slice(0, -1);
        } else if (value === '=') {
            try {
                inputBox.value = eval(inputBox.value);
            } catch {
                inputBox.value = "Error";
            }
        } else {
            inputBox.value += value;
        }
    });
});

document.addEventListener('keydown', function(event) {
    const key = event.key;

    if (!isNaN(key) || key === '.' || key === '00') {
        inputBox.value += key;
    } else if (['+', '-', '*', '/', '%'].includes(key)) {
        inputBox.value += key;
    } else if (key === 'Enter') {
        try {
            inputBox.value = eval(inputBox.value);
        } catch {
            inputBox.value = "Error";
        }
    } else if (key === 'Backspace') {
        inputBox.value = inputBox.value.slice(0, -1);
    } else if (key.toLowerCase() === 'c') {
        inputBox.value = '';
    }
});

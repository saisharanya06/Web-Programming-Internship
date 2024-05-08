let currentDisplay = '0';

function updateDisplay() {
    document.getElementById('display').textContent = currentDisplay;
}

function appendNumber(number) {
    if (currentDisplay === '0') {
        currentDisplay = number;
    } else {
        currentDisplay += number;
    }
    updateDisplay();
}

function appendOperator(operator) {
    if (!currentDisplay.endsWith(' ') && !['+', '-', '*', '/'].includes(currentDisplay[currentDisplay.length - 1])) {
        currentDisplay += ' ' + operator + ' ';
        updateDisplay();
    }
}

function calculateResult() {
    let result;
    try {
        result = eval(currentDisplay);
        currentDisplay = result.toString();
    } catch (error) {
        currentDisplay = 'Error';
    }
    updateDisplay();
}

function calculatePercentage() {
    let result;
    try {
        result = eval(currentDisplay) / 100;
        currentDisplay = result.toString();
    } catch (error) {
        currentDisplay = 'Error';
    }
    updateDisplay();
}

function clearDisplay() {
    currentDisplay = '0';
    updateDisplay();
}

function backspace() {
    currentDisplay = currentDisplay.slice(0, -1);
    if (currentDisplay === '') {
        currentDisplay = '0';
    }
    updateDisplay();
}

document.addEventListener('keydown', function (event) {
    const key = event.key;
    if (/[0-9.]/.test(key)) {
        appendNumber(key);
    } else if (/[+*/-]/.test(key)) {
        appendOperator(key);
    } else if (key === '=') {
        calculateResult();
    } else if (key === 'Enter') {
        calculateResult();
    } else if (key === 'Backspace') {
        backspace();
    }
});
const display = document.querySelector(".display");
const buttons = document.querySelectorAll("button");
const operators = ["%", "*", "/", "-", "+", "^"];
let output = "";

const calculate = () => {
    try {
        let expression = output.replace(/\^/g, '**');
        let result = eval(expression);
        result = parseFloat(result.toFixed(10));
        output = result.toString();
    } catch (e) {
        output = "Error";
    }
    display.value = output;
};


const handleButtonClick = (btnValue) => {
    if (btnValue === "AC") {
        output = "";
    } else if (btnValue === "DEL") {
        output = output.toString().slice(0, -1);
    } else if (btnValue === "=") {
        calculate();
        return;
    } else if (btnValue === "±") {
        if (output !== "") {
            if (output.startsWith("-")) {
                output = output.slice(1);
            } else {
                output = "-" + output;
            }
        }
    } else {
        if (operators.includes(btnValue)) {
            if (output === "" && btnValue !== "-") return;
            const lastChar = output.slice(-1);
            if (operators.includes(lastChar) && btnValue !== "-") {
                output = output.slice(0, -1) + btnValue;
                display.value = output;
                return;
            }
        }
        output += btnValue;
    }
    display.value = output;
};

buttons.forEach((button) => {
    button.addEventListener("click", () => handleButtonClick(button.dataset.value));
});


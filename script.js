const buttons = document.querySelectorAll('.button');
const display = document.querySelector('.display');

let firstOperand = null; //첫번째 숫자
let operator = null; //연산자
let secondOperand = null; //두번째 숫자
let isOperatorClicked = false; //연산자가 클릭된적이 있는지 확인
let isresultClicked = false; //결과 출력 버튼이 클릭된적 있는지 확인

// console.log(buttons);

const reset = () => {
    firstOperand = null;
    operator = null;
    secondOperand = null;
    isOperatorClicked = false;
    isresultClicked = false;
}

// 계산함수
const calculate = (firstOperand, operator, secondOperand) => {

    firstOperand = parseFloat(firstOperand);
    secondOperand = parseFloat(secondOperand);

    let result;

    switch (operator) {
        case '+':
            result = firstOperand + secondOperand;
            break;
        case '-':
            result = firstOperand - secondOperand;
            break;
        case '*':
            result = firstOperand * secondOperand;
            break;
        case '/':
            result = firstOperand / secondOperand;
            break;
        default:
            result = 'Error';
    }
    return result;
}


for (const button of buttons) {
    // 버튼 클릭 시 value 값 보이도록
    button.addEventListener('click', () => {
        
        const buttonValue = button.textContent;
        console.log(buttonValue);

        // 숫자 클릭 시 display의 첫 숫자가 0이면 변경되고 아니면 나타내기
        if (button.classList.contains('number')) {
            if (isresultClicked) { //=클릭 후 바로 숫자 입력
                display.innerText = buttonValue; // 결과를 지우고 새로운 숫자로 변경
                reset(); //전부 초기화
            } else if (display.innerText === '0' || isOperatorClicked) {
                display.innerText = buttonValue; // 0 또는 연산자 클릭 후 숫자
                isOperatorClicked = false; // 연산자 클릭 초기화
            } else {
                display.innerText += buttonValue; // 숫자 이어 붙이기
            }
        }

        // 소수점 클릭 시 소수점이 없었다면 나오도록
        if (button.classList.contains('dot')) {
            if (isresultClicked) { //=클릭후 바로 소숫점 입력시 전부 초기화 하고 0.으로 변경
                reset();
                display.innerText = '0';
                display.innerText += buttonValue;
            } else if (!display.innerText.includes('.')) {
                display.innerText += buttonValue;
            }
        }

        // C 버튼을 클릭하면 디스플레이를 0으로 초기화하기
        if (button.classList.contains('reset')) {
            display.innerText = '0';
            reset();
        }

        // 연산자 버튼을 클릭한 경우
        if (button.classList.contains('operator')) {
            if (firstOperand === null) {
                firstOperand = display.innerText; // 첫 번째 피연산자 저장
            } else if(operator !== null){
                secondOperand = display.innerText; //두 번째 피연산자 지정
                const result = calculate(firstOperand, operator, secondOperand); //계산하기
                display.innerText = result;//결과 display에 보여주기
                firstOperand = result; //첫번째 피연산자를 결과값으로 저장
            }
            operator = buttonValue; // 연산자 저장
            isOperatorClicked = true; //연산자 버튼 클릭함으로 변경
            isresultClicked = false; //=버튼 클릭 안함으로 변경
            console.log(`FirstOperand: ${firstOperand}, Operator: ${operator}`);

        }

        //= 버튼 클릭 시 계산 결과 값 표시
        if (button.classList.contains('result')) {
            secondOperand = display.innerText; // 두 번째 피연산자 저장
            const result = calculate(firstOperand, operator, secondOperand); //계산하기

            display.innerText = result; //display에 결과 표시

            firstOperand = result; //결과를 첫 번째 피연산자로 설정해서 연속 계산하기
            
            isresultClicked = true; //=버튼 클릭함으로 변경

            //reset
            operator = null;
            secondOperand = null;
            isOperatorClicked = false;
        }

        // function 버튼 기능 추가
        if (button.classList.contains('function')){
            // % 기능 추가
            if (buttonValue === '%'){
                if (!isresultClicked) { // = 버튼을 누르지 않았을 경우
                    let currentNumber = parseFloat(display.innerText);
                    currentNumber /= 100; // 백분율 계산
            
                    display.innerText = currentNumber; // display에 백분율 표시
            
                    // 피연산자가 없으면 첫 번째 피연산자로, 있으면 두 번째 피연산자로 저장
                    if (firstOperand === null) {
                        firstOperand = currentNumber;
                    } else {
                        secondOperand = currentNumber;
                    }
                }
            }
            // ± 기능 추가
            if (buttonValue === '±'){
                let currentNumber = parseFloat(display.innerText);

                currentNumber = -currentNumber;
                display.innerText = currentNumber;

                if (firstOperand === null || isresultClicked) {
                    firstOperand = currentNumber;
                    isresultClicked = false; // 새 계산을 시작
                } else if (!isOperatorClicked) {
                    // 두 번째 피연산자를 설정
                    secondOperand = currentNumber;
                }
            }
        }

    });
}

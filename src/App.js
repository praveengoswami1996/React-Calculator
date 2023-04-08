import './App.css';
import { useReducer } from 'react';
import DigitButton from './components/DigitButton';
import OperationButton from './components/OperationButton';

export const ACTIONS = {
    ADD_DIGIT : 'add-digit',
    CHOOSE_OPERATION : 'choose-operation',
    CLEAR : 'clear',
    DELETE_DIGIT : 'delete',
    EVALUATE : 'evaluate'
}

const reducer = (state, action) => {
    const { type, payload } = action;

    switch(type){
        case ACTIONS.ADD_DIGIT:
            if (state.overwrite) {
                return {
                    ...state,
                    currentOperand: payload.digit,
                    overwrite: false
                }
            }
            if (payload.digit === "0" && state.currentOperand === "0") {
                return state;
            }
            if (payload.digit === "." && state.currentOperand.includes(".")) {
                return state;
            }
            return {
                ...state,
                currentOperand: `${state.currentOperand}${payload.digit}`
            }

        case ACTIONS.CHOOSE_OPERATION:
            if (state.currentOperand === '' && state.previousOperand === '') {
                return state;
            }

            if (state.currentOperand === '') {
                return {
                    ...state,
                    operation: payload.operation,
                }
            }

            if (state.previousOperand === ''){
                return {
                    ...state,
                    operation: payload.operation,
                    previousOperand: state.currentOperand,
                    currentOperand: '',
                }
            }
            return {
                ...state,
                previousOperand: evaluate(state),
                operation: payload.operation,
                currentOperand: ''
            }          

        case ACTIONS.CLEAR:
            return {
                ...state,
                previousOperand: '',
                currentOperand: '',
                operation: ''
            }

        case ACTIONS.DELETE_DIGIT:
            if (state.currentOperand === '') return state;
            if (state.currentOperand.length === 1) {
                return {
                    ...state,
                    currentOperand: ''
                }
            }
            return {
                ...state,
                currentOperand: state.currentOperand.slice(0, -1)
            }
        case ACTIONS.EVALUATE:
            if (state.operation === '' || state.currentOperand === '' || state.previousOperand === '') {
                return state;
            }
            return {
                ...state,
                overwrite: true,
                previousOperand: '',
                currentOperand: evaluate(state),
                operation: ''
            }

        default:
            return state; 
    }
} 

function evaluate ({ previousOperand, currentOperand, operation }) {
    const previousValue = parseFloat(previousOperand);
    const currentValue = parseFloat(currentOperand);

    if (isNaN(previousValue) || isNaN(currentValue)) {
        return "";
    }
    let computation = "";
    switch(operation) {
        case "+":
            computation = previousValue + currentValue;
            break
        case "-":
            computation = previousValue - currentValue;
            break;
        case "*":
            computation = previousValue * currentValue;
            break;
        case "÷":
            computation = previousValue / currentValue;
            break;
        default:
            return
    }

    return computation.toString();
}

const INTEGER_FORMATTER = new Intl.NumberFormat("en-us", {
    maximumFractionDigits: 0
})

function formatOperand(operand) {
    if (operand === '') return
    const [integer, decimal] = operand.split('.');
    if (decimal == null) return INTEGER_FORMATTER.format(integer);
    return `${INTEGER_FORMATTER.format(integer)}.${decimal}`
}

function App() {
    const [state, dispatch] = useReducer(reducer, {
        previousOperand: "",
        currentOperand: "",
        operation: "",
        overwrite: false
    });

    return (
        <div className='calculator__grid'>
            
            <div className='calculator__grid-output'>
                <div className='calculator__grid-output_previous'>
                    {formatOperand(state.previousOperand)} {state.operation}
                </div>
                <div className='calculator__grid-output_current'>
                    {formatOperand(state.currentOperand)}
                </div>
            </div>

            <button className='col-two' onClick={() => dispatch({type: ACTIONS.CLEAR})}>AC</button>
            <button onClick={() => dispatch({ type: ACTIONS.DELETE_DIGIT })}>DEL</button>
            <OperationButton operation={"÷"} dispatch={dispatch} />
            <DigitButton digit={"1"} dispatch={dispatch} />
            <DigitButton digit={"2"} dispatch={dispatch} />
            <DigitButton digit={"3"} dispatch={dispatch} />
            <OperationButton operation={"*"} dispatch={dispatch} />
            <DigitButton digit={"4"} dispatch={dispatch} />
            <DigitButton digit={"5"} dispatch={dispatch} />
            <DigitButton digit={"6"} dispatch={dispatch} />
            <OperationButton operation={"+"} dispatch={dispatch} />
            <DigitButton digit={"7"} dispatch={dispatch} />
            <DigitButton digit={"8"} dispatch={dispatch} />
            <DigitButton digit={"9"} dispatch={dispatch} />
            <OperationButton operation={"-"} dispatch={dispatch} />
            <DigitButton digit={"."} dispatch={dispatch} />
            <DigitButton digit={"0"} dispatch={dispatch} />

            <button className='col-two' onClick={() => dispatch({ type: ACTIONS.EVALUATE })}>=</button>
        </div>
    )
}

export default App;
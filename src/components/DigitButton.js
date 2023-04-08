import { ACTIONS } from "../App";

function DigitButton ({ digit, dispatch }) {
    const actionObject = {
        type: ACTIONS.ADD_DIGIT,
        payload: { digit }
    }
    return (
        <button onClick={() => dispatch(actionObject)}>{digit}</button>
    )
}

export default DigitButton;
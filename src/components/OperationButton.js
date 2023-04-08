import { ACTIONS } from "../App";

function OperationButton ({ operation, dispatch }) {
    const actionObject = {
        type: ACTIONS.CHOOSE_OPERATION,
        payload: { operation }
    }
    return (
        <button onClick={() => dispatch(actionObject)}>{operation}</button>
    )
}

export default OperationButton;
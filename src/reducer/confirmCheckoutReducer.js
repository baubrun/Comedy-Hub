import {
    GOT_TOTAL
} from "../actions/actionTypes"


const confirmCheckoutReducer = 
(state = false, action) => {
    switch (action.type) {
        case GOT_TOTAL:
        default:
            return state
    }
}



export default confirmCheckoutReducer
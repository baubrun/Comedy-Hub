import {
    GOT_EVENTS,
    LOGGED_IN,
    LOGGED_OUT,
    TOGGLED_AMOUNT,
    REMOVED_ITEM,
    GOT_TOTAL,
    CONFIRMED_CHECKOUT,
    CLEARED_CART,
    GOT_SEATS_AVAIL,
    RESET_EVENTS,
    RESET_SEATS_AVAIL,
    LOADING,
    LOADED,
    ADDED_TO_CART
} from "./actionTypes"


/*============
CART
===============*/

export const addToCartAction = (item) => ({
    type: ADDED_TO_CART,
    payload: item

})

export const clearCartAction = () => ({
    type: CLEARED_CART,
    payload: []
})

export const confirmCheckoutAction = () => ({
    type: CONFIRMED_CHECKOUT,
    payload: true
})

export const getTotalAction = () => ({
    type: GOT_TOTAL
})

export const toggleAmountAction = item => ({
    type: TOGGLED_AMOUNT,
    payload: item
})

export const removeItemAction = itemIdx => ({
    type: REMOVED_ITEM,
    payload: itemIdx
})


/*============
EVENTS
===============*/
export const getEventsAction = events => ({
    type: GOT_EVENTS,
    payload: events
})

export const getSeatsAvailAction = seats => ({
    type: GOT_SEATS_AVAIL,
    payload: seats
})

/*============
LOADING
===============*/


export const loadedAction = () => ({
    type: LOADED,
    payload: false
})

export const loadingAction = () => ({
    type: LOADING,
    payload: true
})

export const logInAction = hostId => ({
    type: LOGGED_IN,
    payload: {
        loggedIn: true,
        hostId: hostId
    }
})

export const logOutAction = () => ({
    type: LOGGED_OUT,
    payload: {
        loggedIn: false,
        hostId: ""
    }
})



export const resetEventsAction = () => ({
    type: RESET_EVENTS,
    payload: []

})

export const resetSeatsAvailAction = () => ({
    type: RESET_SEATS_AVAIL,
    payload: []
})
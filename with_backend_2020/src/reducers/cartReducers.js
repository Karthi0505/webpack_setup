import { ADD_TO_CART, REMOVE_FROM_CART } from "../types";

/* for the default value for the state, lets use the local storage instead of empty object 
The return value of a local storage is a string, so convert that to javascript object, JSON.parse()
Also for default state, set the localStorage value to cartItems
Or if there is no value exists, return an empty array as a string*/
export const cartReducer = (
    state = { cartItems: JSON.parse(localStorage.getItem("cartItems") || "[]") },
    action
) => {
    switch (action.type) {
        case ADD_TO_CART:
            return { cartItems: action.payload.cartItems };
        case REMOVE_FROM_CART:
            return { cartItems: action.payload.cartItems };
        default:
            return state; /*in default, return current state*/
    }
};
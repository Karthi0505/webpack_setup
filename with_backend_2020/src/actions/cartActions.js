import { ADD_TO_CART, REMOVE_FROM_CART } from "../types";

/*ADD TO CART*/
export const addToCart = (product) => (dispatch, getState) => {
    /*first make a duplicate of items*/
    const cartItems = getState().cart.cartItems.slice();
    /* Search into cart items, to make sure there is a product of this type inside the Cart or not */
    let alreadyExists = false;
    cartItems.forEach(x => {
        if (x._id === product._id) {
            /* variable */
            alreadyExists = true;
            /*update the value of this count for cart item*/
            x.count++;
        }
    });
    if (!alreadyExists) {
        cartItems.push({ ...product, count: 1 });
    }
    /*dispatch accepts two parameter*/
    dispatch({
        type: ADD_TO_CART,
        payload: { cartItems }
    });
    /*update the local storage
      localstorage accepts only accepts a string data*/
    localStorage.setItem("cartItems", JSON.stringify(cartItems));
};

/*REMOVE FROM CART*/
export const removeFromCart = (product) => (dispatch, getState) => {
    /*first make a duplicate of items by items.slice() then use filter*/
    const cartItems = getState()
        .cart.cartItems.slice()
        .filter( (x) => x._id !== product._id );
        /*for each item inside the items, apply a filter
        if current item id 'x._id' does not equal to current product id, just return True
        
        it means that if an item inside the cart is not equal to the product.id, its gonna be added to the cart items
        */
    dispatch({ type: REMOVE_FROM_CART, payload: { cartItems } });
    /*also update the local storage
      localstorage accepts only accepts a string data*/
    localStorage.setItem("cartItems", JSON.stringify(cartItems));
};
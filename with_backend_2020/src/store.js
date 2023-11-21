import { createStore, applyMiddleware, compose, combineReducers } from "redux";
import thunk from "redux-thunk";
import { productsReducer } from "./reducers/productReducers";
import { cartReducer } from "./reducers/cartReducers";
import { orderReducer } from "./reducers/orderReducers";

import authReducers from "./reducers/authentication/authReducers";
import errorReducers from "./reducers/authentication/errorReducers";

const initialState = {};
const composeEnhancer = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;
const store = createStore(
  combineReducers({
    products: productsReducer,
    cart: cartReducer,
    order: orderReducer,
    auth: authReducers,
    errors: errorReducers
  }),
  initialState,
  composeEnhancer(
    applyMiddleware(thunk)

  )
);
export default store;

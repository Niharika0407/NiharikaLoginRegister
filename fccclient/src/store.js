// store.js
import { createStore, applyMiddleware } from "redux";
import reducers from "./reducers"; // Your root reducer
import { Provider } from "react-redux";
import thunk from "redux-thunk";

const store = createStore(reducers, applyMiddleware(thunk));

export default store;

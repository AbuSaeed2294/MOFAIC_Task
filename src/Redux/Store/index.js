import { createStore, combineReducers, applyMiddleware, compose } from "redux";
import studentReducer from "../Reducer/studentReducer";
import roleReducer from "../Reducer/roleReducer";
import { composeWithDevTools } from "redux-devtools-extension";
import thunk from "redux-thunk";

const rootReducer = combineReducers({
  student: studentReducer,
  role: roleReducer,
});

const composedEnhancer = compose(applyMiddleware(thunk), composeWithDevTools());

const store = createStore(rootReducer, composedEnhancer);

export default store;

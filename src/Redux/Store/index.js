import { createStore, combineReducers } from "redux";
import studentReducer from "../Reducer/studentReducer";
import roleReducer from "../Reducer/roleReducer";
import { composeWithDevTools } from "redux-devtools-extension";

const rootReducer = combineReducers({
  student: studentReducer,
  role: roleReducer,
});

const store = createStore(rootReducer, composeWithDevTools());

export default store;

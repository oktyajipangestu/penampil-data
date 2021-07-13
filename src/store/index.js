import { createStore } from "redux";

const initialState = {
  data: []
};

const reducer = (state = initialState, action) => {
  switch (action.type) {
    case "GET_DATA":
      return { ...state, data: action.payload};
    default:
      return state;
  }
};

const store = createStore(reducer);

export default store;
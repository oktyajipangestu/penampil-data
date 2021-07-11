import {createStore} from 'redux';
import axios from 'axios';

const initialState = {
    data: []
}


const reducer = (state = initialState, action) =>  {
    switch(action.type) {
        case "GET_DATA":
            return {...state};
        default: 
            return state;
    }
}

const store = createStore(reducer);

export default store;
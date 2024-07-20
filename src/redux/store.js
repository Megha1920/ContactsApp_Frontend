import { createStore, applyMiddleware, combineReducers } from 'redux';
import { thunk } from 'redux-thunk'; // Change to named import
import authReducer from './reducers/authReducer';
import contactReducer from './reducers/contactReducer';

const rootReducer = combineReducers({
    auth: authReducer,
    contacts: contactReducer
});

const store = createStore(rootReducer, applyMiddleware(thunk));

export default store;

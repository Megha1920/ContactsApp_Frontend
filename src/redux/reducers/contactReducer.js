const initialState = {
    contacts: [],
    error: null,
    authError: null // Added to handle authentication errors
};

const contactReducer = (state = initialState, action) => {
    switch(action.type) {
        case 'FETCH_CONTACTS_SUCCESS':
            return { ...state, contacts: action.payload, error: null, authError: null };
        case 'ADD_CONTACT_SUCCESS':
            return { ...state, contacts: [...state.contacts, action.payload], error: null, authError: null };
        case 'UPDATE_CONTACT_SUCCESS':
            return { ...state, contacts: state.contacts.map(contact => contact.id === action.payload.id ? action.payload : contact), error: null, authError: null };
        case 'DELETE_CONTACT_SUCCESS':
            return { ...state, contacts: state.contacts.filter(contact => contact.id !== action.payload), error: null, authError: null };
        case 'CONTACT_ERROR':
            return { ...state, error: action.payload, authError: null };
        case 'AUTH_ERROR':
            return { ...state, authError: action.payload, error: null };
        default:
            return state;
    }
};

export default contactReducer;

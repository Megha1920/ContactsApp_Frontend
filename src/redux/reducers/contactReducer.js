const initialState = {
    contacts: [],
    error: null
};

const contactReducer = (state = initialState, action) => {
    switch(action.type) {
        case 'FETCH_CONTACTS_SUCCESS':
            return { ...state, contacts: action.payload };
        case 'ADD_CONTACT_SUCCESS':
            return { ...state, contacts: [...state.contacts, action.payload] };
        case 'UPDATE_CONTACT_SUCCESS':
            return { ...state, contacts: state.contacts.map(contact => contact.id === action.payload.id ? action.payload : contact) };
        case 'DELETE_CONTACT_SUCCESS':
            return { ...state, contacts: state.contacts.filter(contact => contact.id !== action.payload) };
        case 'CONTACT_ERROR':
            return { ...state, error: action.payload };
        default:
            return state;
    }
};

export default contactReducer;

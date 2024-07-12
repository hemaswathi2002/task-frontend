export default function EmployeeReducer(state, action) {
    switch (action.type) {
        case 'SET_EMPLOYEES': {
            return action.payload;
        }
        case 'ADD_EMPLOYEE': {
            return [...state, action.payload];
        }
        case 'UPDATE_EMPLOYEE': {
            return state.map(emp => emp._id === action.payload._id ? action.payload : emp)
        }
        case 'DELETE_EMPLOYEE': {
            return state.filter(emp => emp._id !== action.payload)
        }
        default:
            return state;
    }
}

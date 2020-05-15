import { SEARCH_FORM_TYPE, CHANGE_LANGUAGE, CHANGE_CURRENCY } from "../type"

const initialState = {
    routeType: 'round',
    multiForm: false,
    oneway: false,
    currency: 'rub',
    language: 'RU',
    inputStatus: ''
}

export default function (state = initialState, action) {  
     
    switch ( action.type ) {
        case SEARCH_FORM_TYPE: {
            return {
                ...state,
                multiForm: action.multiForm,  
                oneway: action.oneway,
                routeType: action.routeType               
            }
        }
        case CHANGE_LANGUAGE: {
            return {
                ...state,
                language: action.payload
            }
        }
        case CHANGE_CURRENCY: {
            return {
                ...state,
                currency: action.payload
            }
        }
        default: 
            return state 
    }    
}
import { SEARCH_FORM_TYPE } from "../type"

const initialState = {
    routeType: 'round',
    multiForm: false,
    oneway: false
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
        default: 
            return state 
    }    
}
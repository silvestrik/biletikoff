import { SEARCH_FORM_TYPE, CHANGE_LANGUAGE, CHANGE_CURRENCY } from '../type'

export const searchFormType = (type) => (dispatch) => {
    if(type === 'composite') {
        dispatch({
            type: SEARCH_FORM_TYPE,
            multiForm: true,
            oneway: false,
            routeType: 'composite'
        })
    } else if (type === 'oneway') {
        dispatch({
            type: SEARCH_FORM_TYPE,
            multiForm: false,
            oneway: true,
            routeType: 'oneway' 
        })
    } else if (type === 'round') {
        dispatch({
            type: SEARCH_FORM_TYPE,
            multiForm: false,
            oneway: false, 
            routeType: 'round'
        })
    }
}

export const changeLanguageAndCurrency = (name, value) => dispatch => {    
    if(name==="language") {
        dispatch({
            type: CHANGE_LANGUAGE,
            payload: value
        })        
    } else {
        dispatch({
            type: CHANGE_CURRENCY,
            payload: value
        })        
    }
}

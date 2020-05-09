import { SEARCH_FORM_TYPE } from '../type'

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

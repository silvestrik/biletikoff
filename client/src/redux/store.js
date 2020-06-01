import { createStore, combineReducers, applyMiddleware, compose } from "redux"
import thunk from 'redux-thunk'
import dataReducer from '../redux/reducer/dataReducer'
import uiReducer from '../redux/reducer/uiReducer'

const initialState = {}

const middleware = [thunk]

const reducers = combineReducers({
    data: dataReducer,
    UI: uiReducer
})

const devTools = process.env.NODE_ENV === 'development' ? window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ && window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__() : null

// const store = createStore(
//   rootReducer,
//   compose(applyMiddleware(thunk), devTools)
// )

const store = createStore(   
    reducers,   
    initialState,    
    compose (
       applyMiddleware(...middleware), devTools
       //window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__()
    )    
)

export default store

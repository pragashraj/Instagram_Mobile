import {combineReducers} from 'redux'
import authReducer from './authReducer'
import profileReducer from './profileReducer'
import postStatReducer from './postStatReducer'
import ActivityReducer from './ActivityReducer'

export default combineReducers({
    auth:authReducer,
    profileInfo:profileReducer,
    postStat:postStatReducer,
    activity:ActivityReducer
})
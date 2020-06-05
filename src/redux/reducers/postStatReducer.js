import {database} from '../../config/config'

const INITIAL_STATE={
    postStatistics:{},
}


const postStatReducer =(state=INITIAL_STATE,action)=>{
    switch(action.type){
        case "FETCH_POST_STAT":
            return{
                ...state,
                postStatistics:action.payload
            }
       
        default :
            return state
    }
}

export default postStatReducer
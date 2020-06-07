const INITIAL_STATE={
    postsStat:{},
}


const postStatReducer =(state=INITIAL_STATE,action)=>{
    switch(action.type){
        case "SET_POST_STAT":
            return{
                ...state,
                postsStat:action.payload
            }
       
        default :
            return state
    }
}

export default postStatReducer
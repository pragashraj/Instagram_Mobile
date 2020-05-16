const INITIAL_STATE={
    user:{}
}

const authReducer=(state=INITIAL_STATE,action)=>{
    switch(action.type){
        case "SET_CURRENT_AUTH":
            return{
                ...state,
                user:action.payload
            }
        default : return state
    }
}

export default authReducer
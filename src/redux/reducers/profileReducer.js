const INITIAL_STATE={
    proDetails:{}
}

const profileReducer=(state=INITIAL_STATE,action)=>{
    switch(action.type){
        case "SET_PROFILE_DETAIL":
            return{
                ...state,
                proDetails:action.payload
            }
        default :return state
    }
}

export default profileReducer
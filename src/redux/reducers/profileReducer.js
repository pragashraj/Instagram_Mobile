const INITIAL_STATE={
    profilePicUrl:''
}

const profileReducer=(state=INITIAL_STATE,action)=>{
    switch(action.type){
        case "SET_PROFILE_DETAIL":
            return{
                ...state,
                profilePicUrl:action.payload
            }
        default :return state
    }
}

export default profileReducer
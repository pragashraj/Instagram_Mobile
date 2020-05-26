const INITIAL_STATE={
    proDetails:{
        Name:'',
        Username:'',
        Website:'',
        Bio:'',
        modalVisible:false,
        ImageFile:{
            filePath: null,
            fileData: null,
            fileUri: null
        }
    }
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
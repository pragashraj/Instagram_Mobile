const INITIAL_STATE={
    todayActivities:[],
    monthActivities:[]
}

const ActivityReducer=(state=INITIAL_STATE,action)=>{
    switch(action.type){
        case "SET_TODAY_ACTIVITY":
            return{
                ...state,
                todayActivities:[...state.todayActivities,action.payload]
            }
        case "SET_MONTH_ACTIVITY":
            return{
                ...state,
                monthActivities:action.payload
            }

        case "CLEAR_TODAY_ACTIVITY":
            return{
                ...state,
                todayActivities:[]
            }

        case "CLEAR_MONTH_ACTIVITY":
            return{
                ...state,
                monthActivities:[]
            }

        default : return state
    }
}

export default ActivityReducer
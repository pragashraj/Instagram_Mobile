export const setTodayActivities=ActivityData=>({
    type:"SET_TODAY_ACTIVITY",
    payload:ActivityData
})

export const setMonthActivities=ActivityData=>({
    type:"SET_MONTH_ACTIVITY",
    payload:ActivityData
})

export const clearTodayActivities=()=>({
    type:"CLEAR_TODAY_ACTIVITY",
})

export const clearMonthActivities=()=>({
    type:"CLEAR_MONTH_ACTIVITY",
})
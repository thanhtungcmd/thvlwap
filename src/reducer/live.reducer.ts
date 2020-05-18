import { LiveState } from "./live.reducer.type";
import { LIVE_ACTION } from "action/live.action.type";

const liveReducer = (state: LiveState = {}, action: LIVE_ACTION) => {
    switch (action.type) {
        case "GET_RIBBON_LIVE":
            return {
                ...state,
                ribbon: action.data.items
            }

        case "GET_DETAIL_LIVE":
            return {
                ...state,
                data: action.data
            }

        default:
            return state
    }
}

export default liveReducer

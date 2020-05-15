import { PlayState } from "reducer/play.reducer.type"
import { PLAY_ACTION } from "action/play.action.type"

const playReducer = (state: PlayState = {}, action: PLAY_ACTION) => {
    switch (action.type) {
        case "GET_PLAY":
            return {
                ...state,
                data: action.data
            }

        case "GET_SEASON":
            return {
                ...state,
                season: action.data
            }

        default:
            return state;
    }
}

export default playReducer

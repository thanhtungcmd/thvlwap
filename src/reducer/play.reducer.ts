import { PlayState } from "reducer/play.reducer.type"
import { PLAY_ACTION } from "action/play.action.type"

const playReducer = (state: PlayState = {tab: 1}, action: PLAY_ACTION) => {
    switch (action.type) {
        case "GET_PLAY":
            return {
                ...state,
                data: action.data
            }

        case "GET_SEASON":
            return {
                ...state,
                season: action.data.episodes
            }

        case "GET_RELATE":
            return {
                ...state,
                relate: action.data.items
            }

        case "CHANGE_TAB":
            return {
                ...state,
                tab: action.data
            }

        default:
            return state;
    }
}

export default playReducer

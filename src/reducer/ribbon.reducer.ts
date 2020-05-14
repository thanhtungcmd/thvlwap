import { RibbonState } from "./ribbon.reducer.type";
import { RIBBON_ACTION } from "action/ribbon.action.type";

const ribbonReducer = (state: RibbonState = {}, action: RIBBON_ACTION) => {
    switch (action.type) {
        case "GET_RIBBON":
            return {
                ...state,
                id: action.data.id,
                name: action.data.name,
                items: action.data.items,
                metadata: action.data.metadata,
                page: 1
            }

        case "RIBBON_LOAD_MORE":
            return {
                ...state,
                items: state.items.concat(action.data.items),
                page: action.page
            }

        default:
            return state;
    }
}

export default ribbonReducer

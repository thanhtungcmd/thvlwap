import * as types from 'action/menu.action.type'
import { Dispatch } from "redux"
import { ApiGetMenu } from "api/menu.api"

export const getMenuAction = () => {
    return async (dispatch: Dispatch) => {
        let response = await ApiGetMenu();
        if (response.status == 200) {
            dispatch(
                getMenuSuccess(response.data)
            )
        }
    }
}

export const getMenuSuccess = (data: any) => {
    return {
        type: types.GET_MENU,
        data: data
    }
}

export const toggleMenuAction = (data: boolean) => {
    return {
        type: types.TOGGLE_MENU,
        data: data
    }
}

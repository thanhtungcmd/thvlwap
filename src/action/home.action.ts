import * as types from 'action/home.action.type'
import { Dispatch } from "redux"
import { ApiGetHomePage } from "api/index.api"

export const getHomePageAction = () => {
    return async (dispatch: Dispatch) => {
        let response = await ApiGetHomePage();
        if (response.status == 200) {
            dispatch(
                getHomePageSuccess(response.data)
            )
        }
    }
}

export const getHomePageSuccess = (data: any) => {
    return {
        type: types.GET_HOME,
        data: data
    }
}

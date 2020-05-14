import * as types from 'action/ribbon.action.type'
import { Dispatch } from "redux"
import { ApiGetRibbonDetail } from "api/index.api"

export const getRibbonDetailAction = (id: string, page: number = 1) => {
    return async (dispatch: Dispatch) => {
        let response = await ApiGetRibbonDetail(id, page);
        if (response.status == 200) {
            dispatch(
                getRibbonSuccess(response.data)
            )
        }
    }
}

export const getRibbonSuccess = (data: any) => {
    return {
        type: types.GET_RIBBON,
        data: data
    }
}

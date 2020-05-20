import * as types from 'action/auth.action.type'
import { Dispatch } from "redux"
import { ApiInfoUser } from "api/index.api"
import * as ls from "local-storage";

export const getMobifone = (phone: string) => {
    return async (dispatch: Dispatch) => {

    }
}

export const getInfoAction = (token: string) => {
    return async (dispatch: Dispatch) => {
        let response = await ApiInfoUser(token);
        if (response.status == 200) {
            dispatch(
                getInfoSuccess(response.data)
            )
        } else {
            dispatch(
                getInfoFail()
            )
        }
    }
}

export const getInfoSuccess = (data: any) => {
    return {
        type: types.GET_INFO,
        data: data
    }
}

export const getInfoFail = () => {
    ls.remove('token');
    return {
        type: types.GET_INFO,
        // @ts-ignore
        data: undefined
    }
}

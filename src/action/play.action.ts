import * as types from 'action/play.action.type'
import { Dispatch } from "redux"
import { ApiGetPlay, ApiGetSeason, ApiGetRelate } from "api/index.api"

export const getPlayAction = (slug: string) => {
    return async (dispatch: Dispatch) => {
        let response = await ApiGetPlay(slug);
        if (response.status == 200) {
            dispatch(
                getPlaySuccess(response.data)
            )
        }
    }
}

export const getPlaySuccess = (data: any) => {
    return {
        type: types.GET_PLAY,
        data: data
    }
}

export const getSeasonInfoAction = (id: string) => {
    return async (dispatch: Dispatch) => {
        let response = await ApiGetSeason(id);
        if (response.status == 200) {
            dispatch(
                getSeasonSuccess(response.data)
            )
        }
    }
}

export const getSeasonSuccess = (data: any) => {
    return {
        type: types.GET_SEASON,
        data: data
    }
}

export const getRelateAction = (id: string) => {
    return async (dispatch: Dispatch) => {
        let response = await ApiGetRelate(id);
        if (response.status == 200) {
            dispatch(
                getRelateSuccess(response.data)
            )
        }
    }
}

export const getRelateSuccess = (data: any) => {
    return {
        type: types.GET_RELATE,
        data: data
    }
}

export const changeTabAction = (data: number) => {
    return {
        type: types.CHANGE_TAB,
        data: data
    }
}

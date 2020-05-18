import * as types from 'action/live.action.type'
import { Dispatch } from "redux"
import {ApiGetPlay, ApiGetRibbonDetail, ApiGetEpgLive} from "api/index.api"

export const getRibbonLiveAction = (id: string = "a6ccbdff-5688-4b25-9989-5ce872603b0a", page: number = 0) => {
    return async (dispatch: Dispatch) => {
        let response = await ApiGetRibbonDetail(id, page);
        if (response.status == 200) {
            dispatch(
                getRibbonLiveSuccess(response.data)
            )
        }
    }
}

export const getRibbonLiveSuccess = (data: any) => {
    return {
        type: types.GET_RIBBON_LIVE,
        data: data
    }
}

export const getDetailLiveAction = (slug: string = "thvl1-hd") => {
    return async (dispatch: Dispatch) => {
        let response = await ApiGetPlay(slug);
        if (response.status == 200) {
            dispatch(
                getDetailLiveSuccess(response.data)
            )
        }
    }
}

export const getDetailLiveSuccess = (data: any) => {
    return {
        type: types.GET_DETAIL_LIVE,
        data: data
    }
}

export const getEpgLiveAction = (channel: string, date: string) => {
    return async (dispatch: Dispatch) => {
        let response = await ApiGetEpgLive(channel, date);
        if (response.status == 200) {
            dispatch(
                getEpgLiveSuccess(response.data)
            )
        }
    }
}

export const getEpgLiveSuccess = (data: any) => {
    return {
        type: types.GET_EPG_LIVE,
        data: data
    }
}

import {
        REQUEST_PENDING,
        REQUEST_SUCCESS,
        REQUEST_FAILED,
        IS_ALERT_OPEN,
        IMG_BOX_DATA,
        INITIAL_IS_PENDING
        } from './constants';

const apiCallPost = (url,bodyData) => fetch(url,{
        method: 'post',
        headers: {
            'Content-Type': 'application/json'
        },
        // mode: 'cors',
        credentials: 'include',
        body: JSON.stringify(bodyData)
    }).then(resp => {
        return resp.json()
    })

const apiCallGet = (url) => fetch(url, {
            method: 'get',
            credentials: 'include'
        }).then(resp => {
            return resp.json()
        })

export const authUser = (url) => (dispatch)=> {
    dispatch({type: REQUEST_PENDING})
    apiCallGet(url)
        .then(res => {
            if(res.errorMsg) {
                dispatch(formHandler([true,true,res.errorMsg], IS_ALERT_OPEN))
                dispatch({type: REQUEST_FAILED, payload: ''})
                dispatch({type: INITIAL_IS_PENDING})
            }

            if(res.nothing) {
                dispatch({type: REQUEST_FAILED, payload: ''})
                dispatch({type: INITIAL_IS_PENDING})
            }

            if(res.passwordNeed) {
                dispatch(formHandler([true,false,'Please set the password for future use'], IS_ALERT_OPEN))
                dispatch({type: REQUEST_FAILED, payload: ''})
                dispatch({type: INITIAL_IS_PENDING})
            }
            if(res.successMsg){
                dispatch({type: REQUEST_SUCCESS, payload: res.user})
                dispatch({type: INITIAL_IS_PENDING})
            }
        })
        .catch(err => {
            dispatch({type: REQUEST_FAILED, payload: err})
            dispatch({type: INITIAL_IS_PENDING})
        })
}

export const formSubmit = (bodyData,route) => (dispatch)=> {
    dispatch({type: REQUEST_PENDING})
    apiCallPost(`http://localhost:3002/${route}`,bodyData)
        .then(res => {
            if(res.errorMsg) {
                dispatch(formHandler([true,true,res.errorMsg], IS_ALERT_OPEN))
                dispatch({type: REQUEST_FAILED, payload: ''})
            }

            if(res.passwordNeed) {
                dispatch(formHandler([true,false,'Please set the password for future use'], IS_ALERT_OPEN))
                dispatch({type: REQUEST_FAILED, payload: ''})
            }

            if(res.successMsg){
                dispatch({type: REQUEST_SUCCESS, payload: res.user})
            }
        })
        .catch(err => dispatch({type: REQUEST_FAILED, payload: err}))
}

export const formHandler = (data,type) => ({type: type, payload: data})

export const faceDetect = (url) => (dispatch) => {
    dispatch({type: REQUEST_PENDING})
    apiCallGet(url)
        .then(res => {
            dispatch({type: IMG_BOX_DATA, payload: res})
        })
}
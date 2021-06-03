import {    REQUEST_PENDING, 
            REQUEST_SUCCESS, 
            REQUEST_FAILED, 
            IS_EMAIL,
            IS_PASSWORD,
            IS_CONFIRM_PASSWORD,
            IS_EMAIL_VALID,
            IS_SHOW_PASSWORD,
            IS_PASSWORD_VALID,
            IS_NAME,
            IS_ALERT_OPEN,
            INITIAL_IS_PENDING,
            RESET,
            IMG_URL,
            IS_URL,
            IMG_BOX_DATA,
            IMG_WIDTH,
            IS_DIALOG_OPEN
        } from './constants';

const initialData={
    data:{},
    isPending: false,
    //temp
    isAuth: true,
    initialIsPending: false
    // isAuth: false,
    // initialIsPending: true
}

export const formSubmitReducer = (state=initialData, action) => {
    switch (action.type) {
        case INITIAL_IS_PENDING:
            return {
                ...state,
                initialIsPending: false
            }
        case REQUEST_PENDING:
            return {
                ...state,
                isPending: true
            }
        case REQUEST_SUCCESS:
            return {
                ...state,
                data: action.payload,
                isPending: false,
                isAuth: true
            }
        case REQUEST_FAILED:
            return {
                ...state,
                error: action.payload,
                isPending: false
            }
        default:
            return state
    }
}
const initialFormData = {
    email: '',
    password: '',
    username: '',
    url: '',
    validation: {
        isConfirmPassword: '',
        isEmailValid: false,
        emailErrorMsg: '',
        isPasswordValid: false,
        passwordErrorMsg: '',
        showPassword: false,
        isAlertOpen: false,
        alertMsg: '',
        isAlertError: false
    }
}

export const formHandlerReducer = (state=initialFormData, action) => {
    switch (action.type) {
        case IS_NAME:
            return {
                ...state,
                username: action.payload
            }
        case IS_EMAIL:
            return {
                ...state,
                email: action.payload
            }
        case IS_PASSWORD:
            return {
                ...state,
                password: action.payload
            }
        case IS_CONFIRM_PASSWORD:
            return {
                ...state,
                validation: {
                    ...state.validation,
                    isConfirmPassword: action.payload
                }
            }
        case IS_EMAIL_VALID:
            return {
                ...state,
                validation: {
                    ...state.validation,
                    isEmailValid: action.payload[0],
                    emailErrorMsg: action.payload[1]
                }
            }
        case IS_PASSWORD_VALID:
            return {
                ...state,
                validation: {
                    ...state.validation,
                    isPasswordValid: action.payload[0],
                    passwordErrorMsg: action.payload[1]
                }
            }
        case IS_SHOW_PASSWORD:
            return {
                ...state,
                validation: {
                    ...state.validation,
                    showPassword: action.payload
                }
            }
        case IS_ALERT_OPEN:
            return {
                ...state,
                validation: {
                    ...state.validation,
                    isAlertOpen: action.payload[0],
                    isAlertError: action.payload[1],
                    alertMsg: action.payload[2]
                }
            }            
        case RESET:
            return state = initialFormData
        default:
            return state
    }
}

//dialog box reducer
const initialDialogBox = {
    open: false
}

export const dialogBoxReducer = (state = initialDialogBox, action) => {
    switch (action.type) {
        case IS_DIALOG_OPEN:
            return {
                ...state,
                open: action.payload
            }
        default:
            return state
    }
}

const initialUrl = {
    url: '',
    isUrl: false,
    imgBoxData: {},
    imgWidth: 0
}

export const UrlHandlerReducer = (state = initialUrl, action) => {
    switch (action.type) {
        case IMG_URL:
            return {
                ...state,
                url: action.payload
            }
        case IS_URL:
            return {
                ...state,
                isUrl: true
            }
        case IMG_BOX_DATA:
            return {
                ...state,
                imgBoxData: action.payload
            }
        case IMG_WIDTH:
            return {
                ...state,
                imgWidth: action.payload
            }
        default:
            return state;
    }
}
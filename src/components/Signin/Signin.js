import React from 'react';
import { Link, Redirect, useHistory } from 'react-router-dom';
import GoogleLogin from 'react-google-login';

import { Button,FormControl, TextField, IconButton, Input, InputLabel, InputAdornment, FormHelperText, Collapse, CircularProgress, Paper } from '@material-ui/core';
import { Visibility, VisibilityOff } from '@material-ui/icons';
import Alert from '@material-ui/lab/Alert';
import LockIcon from '@material-ui/icons/Lock';
import CloseIcon from '@material-ui/icons/Close';

import './Signin.scss';

import { useSelector, useDispatch } from 'react-redux';
import { googleAuth } from '../../redux/actions/authAction';
import { formHandler,formSubmit } from '../../redux/actions/formAction';
import { IS_EMAIL, IS_PASSWORD, IS_EMAIL_VALID, IS_SHOW_PASSWORD, IS_PASSWORD_VALID, IS_ALERT_OPEN, RESET } from '../../redux/constants';

var email_len_cnt=0;
var password_len_cnt = 0;
const emailPattern = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/;

const Signin = () =>{
    const state = useSelector(state => state)
    const formData = state.formData;
    const responseData = state.responseData;
    const dispatch = useDispatch();
    const history = useHistory();

    const onFormHandler = (e) => {
        e.preventDefault();
        if(e.target.name === 'email') {
            dispatch(formHandler(e.target.value,IS_EMAIL))
            if(email_len_cnt > 0) {
                dispatch(formHandler([false,''], IS_EMAIL_VALID))
                email_len_cnt=0;
            }
        }else {
            dispatch(formHandler(e.target.value, IS_PASSWORD))
            if(password_len_cnt > 0) {
                dispatch(formHandler([false,''], IS_PASSWORD_VALID))
                password_len_cnt=0;
            }
        }
    }

    const emailValidate = ()=> {
        email_len_cnt=email_len_cnt+1;
        if(formData.email.length === 0) {
            dispatch(formHandler([true,'*required'], IS_EMAIL_VALID))
            return
        }
        if(!emailPattern.test(formData.email)) {
            dispatch(formHandler([true,'enter valid email id'], IS_EMAIL_VALID))   
        }
        return true
    }

    const passwordValidate = () => {
        password_len_cnt = password_len_cnt + 1;
        if(formData.password.length === 0) {
            dispatch(formHandler([true,'*required'], IS_PASSWORD_VALID))
            return
        }
        if(formData.password.length < 8) {
            dispatch(formHandler([true,'password must greater than 8 characters'], IS_PASSWORD_VALID))
        }
        return true
    }

    const onFormSubmit = () => {
        let email = emailValidate() 
        let password = passwordValidate()
        if(email && password) {
            let bodyData = {
                email: formData.email,
                password: formData.password
            }
            dispatch(formSubmit(bodyData,'signin'))
        }
    }

    const onGoogleSuccess = (response) => {
        dispatch(googleAuth('auth/google', response.profileObj, history))
    }

    if(responseData.data.successMsg === 'login successfully' || responseData.data.successMsg === 'google login successfully') {
        return <Redirect to='/' />
    }

    return (
        <div className="form-root">
            <Paper elevation={3} className="paper">
                <form className="grid-parent" noValidate autoComplete="off">
                    {!responseData.isPending ? <LockIcon color="secondary" style={{ fontSize: 60 }} className="mt" /> : <CircularProgress color="secondary" size={60} />}
                    <Collapse in={formData.validation.isAlertOpen}>
                        <Alert
                            severity="error"
                            action={
                                <IconButton
                                aria-label="close"
                                color="inherit"
                                size="small"
                                onClick={() => dispatch(formHandler([!formData.validation.isAlertOpen, false, ''], IS_ALERT_OPEN))}
                                >
                                <CloseIcon fontSize="inherit" />
                                </IconButton>
                            }
                        >
                        {formData.validation.alertMsg}
                        </Alert>
                    </Collapse>
                    <TextField
                        id='standard-basic'
                        label="Email"
                        type="email"
                        name="email"
                        error={formData.validation.isEmailValid}
                        helperText={formData.validation.isEmailValid? formData.validation.emailErrorMsg:"     "}
                        className="input-field"
                        onChange={onFormHandler}
                        onBlur = {emailValidate}
                    />
                    <FormControl className="input-field mt" error={formData.validation.isPasswordValid}>
                        <InputLabel htmlFor="standard-adornment-password">Password</InputLabel>
                        <Input
                            id="standard-adornment-password"
                            type={formData.validation.showPassword? 'text' : 'password'}
                            className=""
                            name="password"
                            onChange={onFormHandler}
                            onBlur={passwordValidate}
                            endAdornment={
                                <InputAdornment position="end">
                                <IconButton
                                    aria-label="toggle password visibility"
                                    onClick={() => dispatch(formHandler(!formData.validation.showPassword, IS_SHOW_PASSWORD)) }
                                >
                                    {formData.validation.showPassword? <Visibility /> : <VisibilityOff />}
                                </IconButton>
                                </InputAdornment>
                            }
                        />
                        <FormHelperText id="component-helper-text">{formData.validation.passwordErrorMsg}</FormHelperText>
                    </FormControl>
                    <Button variant="contained" size="large" color="secondary" onClick={onFormSubmit} className="mt">SignIn</Button>
                    <p>If you are new to Here <Link to="/register"><span onClick={() => dispatch(formHandler('',RESET))}>Register</span></Link></p>
                    <p>or</p>
                    <GoogleLogin 
                        style={{width: '20em'}}
                        buttonText="Signin with Google"
                        className="googleButton"
                        clientId = {process.env.REACT_APP_GOOGLE_CLIENT_ID}
                        onSuccess={onGoogleSuccess}
                        // cookiePolicy={'single_host_origin'}
                    />
                </form>
            </Paper>
        </div>
    );
}

export default Signin;
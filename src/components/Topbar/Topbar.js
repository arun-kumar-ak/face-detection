import React from 'react';
import { useDispatch, useSelector } from 'react-redux';

import { AppBar, Toolbar, Button, CircularProgress } from '@material-ui/core';

import UserDialog from '../UserDialog/UserDialog';
import './Topbar.scss';
import FaceIcon from '../../assets/face-scan.png';

import { logout } from '../../redux/actions/logoutAction';

const Topbar = () => {
    const dispatch = useDispatch();
    const responseData = useSelector(state => state.responseData)
    
    return (
        <div className="topbar-root">
            <AppBar className="appbar">
                <img alt="face-logo" src={FaceIcon} className="img-logo" />
                <Toolbar className="toolbar">
                    <UserDialog />
                    <Button variant="contained" className="button" color="inherit"
                     onClick={() =>{
                        dispatch(logout('logout'))
                    }}
                    >
                        {responseData.logoutIsPending ? <CircularProgress size={30} /> : "Logout"}
                    </Button>
                </Toolbar>
            </AppBar>
        </div>
    )
}

export default Topbar;
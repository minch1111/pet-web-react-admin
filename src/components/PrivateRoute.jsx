import React, { useContext } from 'react'
import { useSelector } from 'react-redux';
import { Redirect,Route } from 'react-router';
import {Context} from '../App'

function PrivateRoute(props) {
    let {user} = useContext(Context)

    if(!user) return <Redirect to="/" />

    return <Route {...props}/>
}

export default PrivateRoute
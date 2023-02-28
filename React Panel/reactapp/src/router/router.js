import React from 'react'
import {BrowserRouter as Router, Route, Switch, Redirect } from 'react-router-dom'



function routerApp(){
    return (
        <Router>
            <div>
                <Switch>


                    <Redirect to="/home" />
                </Switch>
            </div>
        </Router>
    )
}
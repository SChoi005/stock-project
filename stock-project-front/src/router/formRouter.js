import React, { Component }from 'react';
import {BrowserRouter as Router, Route, Switch} from 'react-router-dom';
import Login from '../component/form/login';
import SignUp from '../component/form/signUp';


class FormRouter extends Component{
    render(){
        return(
            <Router>
                <Switch>
                    <Route exact path='/' component={Login}/>
                    <Route exact path='/signup' component={SignUp}/>
                </Switch>
            </Router>
        );
    }
}

export default FormRouter;
import React, { Component }from 'react';
import {BrowserRouter as Router, Route, Switch} from 'react-router-dom';
import Login from '../component/form/login';
import SignUp from '../component/form/signUp';
import Main from '../component/main';

class FormRouter extends Component{
    render(){
        return(
            <Router>
                <Switch>
                    {localStorage.getItem('user')?
                        ( <Route exact path='/' component={Main}/>
                        ):(
                        <Route exact path='/' component={Login}/>
                    )}
                    <Route exact path='/signup' component={SignUp}/>
                </Switch>
            </Router>
        );
    }
}

export default FormRouter;
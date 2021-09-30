import React from 'react';
import ReactDOM from 'react-dom';
import Header from './component/header';
import FormRouter from './router/formRouter';
import "bootstrap/dist/css/bootstrap.min.css";
import './index.css';


ReactDOM.render(
    <Header />,
    document.getElementById('header')
);

ReactDOM.render(
    <FormRouter/>,
    document.getElementById('content')
);
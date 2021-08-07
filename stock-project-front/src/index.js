import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import Header from './component/header';
import Clock from './component/clock';
import FormRouter from './router/formRouter';
//import reportWebVitals from './reportWebVitals';

ReactDOM.render(
    <Header />,
    document.getElementById('header')
);

ReactDOM.render(
    <Clock />,
    document.getElementById('clock')
);

ReactDOM.render(
    <FormRouter/>,
    document.getElementById('content')
);
//reportWebVitals();

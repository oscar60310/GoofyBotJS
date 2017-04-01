import React from 'react';
import ReactDOM from 'react-dom';
import { Router, Route, IndexRoute, browserHistory } from "react-router";
import Layout from './Layout';
import Register from './component/register/Register';
import Basic from './component/basic/Basic';

const app = document.getElementById('app');

ReactDOM.render(<Router history={browserHistory}>
    <Route path="/" component={Layout}>
        <IndexRoute component={Register}></IndexRoute>
        <Route path='basic' component={Basic}></Route>
    </Route>
</Router>, app);
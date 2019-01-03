import React from 'react'
import {BrowserRouter, Route, Switch} from 'react-router-dom'

import Home from '../containers/App'
import Login from '../containers/Login'
import register from '../containers/Regiter'

const BasicRouter = () => (
	<BrowserRouter>
		<Switch>
			<Route exact path="/" component={Home}></Route>
			<Route exact path="/login" component={Login}></Route>
			<Route exact path="/register" component={register}></Route>
		</Switch>
	</BrowserRouter>
)

export default BasicRouter;
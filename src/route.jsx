import React, {Component} from 'react';
import {
	Router,
	Route,
	IndexRoute,
    browserHistory,
    hashHistory
} from 'react-router';

//导入组件
import App from './component/app';
import Home from './component/home';
import LoginGroup,{Login,Getpwd,Register} from './component/login';
import PlayListPage from './component/playList';
import SearchResult from './component/searchResult';

//配置路由
const routes = (
	<Router history={hashHistory}>
		<Route path="/" component={App}> //父组件，默认为空
			<IndexRoute component={Home} /> //默认调用的子组件，类似'/'调用index.html
			<Route path="playlist" component={PlayListPage}/>
			<Route path="searchResult(/:name)" component={SearchResult}/>
		</Route>
		<Route path="/login" component={LoginGroup} > // '/login'时调用的组件
			<IndexRoute component={Login} />
			<Route path="getpwd" component={Getpwd} />
			<Route path="register" component={Register} />
		</Route>
	</Router>
)

export default routes;
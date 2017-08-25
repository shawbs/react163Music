import React, {Component} from 'react';
import ReactDOM,{render} from 'react-dom';

//组件
import {
	HeaderBar
} from './commonbase';

export default class App extends Component{
	render(){
		return (
			<div className="page-group">
				<HeaderBar/>
				{this.props.children}
			</div>
		)
	}
}
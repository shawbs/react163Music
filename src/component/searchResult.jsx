import React, {Component} from 'react';
import ReactDOM,{render} from 'react-dom';
import {Link} from 'react-router';

//组件
import {
	HeaderBar,
	PlayList,
	PlayListNav
} from './commonbase';
import {
	Panel,
	ListGroup,
	ListGroupItem
} from 'react-bootstrap';
import {imgArr,hotPlaylist,palyArr} from '../api/data';
import * as API from '../api/api';

import PubSub from '../common/PubSub';
export default class SearchResult extends Component{
	constructor(props) {
		super(props);
		this.state = {
			loading:true,
			error:false,
			data:null
		}
	}
	componentDidMount() {
		this.doSearch(this.props.params.name);
		PubSub.subscribe('search',(query)=>{
			this.doSearch(query);
		});
	}
	doSearch(query){
		API.getSearch(query).then(res=>{
			this.setState({
				data:JSON.stringify(res.data.playlist),
				loading:false,
			})
		});
	}
	render(){
		let title = `搜索 ${this.props.params.name} 的结果:`;
		return (
			<div className="container">
				{!this.state.loading ?(
				  <Panel collapsible defaultExpanded header={title}>
				  	{this.state.data}
				    <ListGroup fill>
				      <ListGroupItem>Item 1</ListGroupItem>
				      <ListGroupItem>Item 2</ListGroupItem>
				      <ListGroupItem>&hellip;</ListGroupItem>
				    </ListGroup>
				  </Panel>
				  ):(<div>loading...</div>)
			  	}
			</div>
		)
	}
}



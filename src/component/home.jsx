import React, {Component} from 'react';
import ReactDOM,{render} from 'react-dom';
import {Link} from 'react-router';

import '../style/home.scss';

//组件
import {
	SearchSection,
	HomeTopSection,
	PlayList,
	ExclusivePlay
} from './commonbase';
import {imgArr,hotPlaylist,palyArr} from '../api/data';


export default class Home extends Component{
	render(){
		return (
			<div className="home-page">
				{/*首页头部块*/}
				<HomeTopSection imgArr={imgArr} hotPlaylist={hotPlaylist}/>
				{/*推荐歌单*/}
				<PlayList title="推荐歌单" palyArr={palyArr}/>
				{/*独家*/}
				<ExclusivePlay palyArr={palyArr}/>

			</div>
		)
	}
}



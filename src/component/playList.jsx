import React, {Component} from 'react';
import ReactDOM,{render} from 'react-dom';
import {Link} from 'react-router';

//组件
import {
	HeaderBar,
	PlayList,
	PlayListNav
} from './commonbase';
import {imgArr,hotPlaylist,palyArr} from '../api/data';


export default class PlayListPage extends Component{
	render(){
		return (
			<div className="home-page">
				<PlayListNav hotPlaylist={hotPlaylist}/>
				{/*推荐歌单*/}
				<PlayList title="全部歌单" palyArr={palyArr}/>


			</div>
		)
	}
}



import React, {Component} from 'react';
import ReactDOM,{render} from 'react-dom';
import {browserHistory,hashHistory,Link,IndexLink } from 'react-router';
import {
	Button,
	Navbar,
	Nav,
	NavItem,
	NavDropdown,
	MenuItem,
	Grid,
	Row,
	Col,
	Carousel,
	Thumbnail,
	FormGroup,
	ControlLabel,
	FormControl,
	Glyphicon,
	InputGroup
} from 'react-bootstrap';


import PubSub from '../common/PubSub';

//头部组件
class HeaderBar extends Component{
	constructor(props){
		super(props);
		this.state={
			loginState:false,
			asd:'123'
		}
		this.handleExit = this.handleExit.bind(this);
		this.handleSearch = this.handleSearch.bind(this);
	}
	componentDidMount() {
		this.setState({
			loginState:localStorage.loginState
		})
	}
	handleExit(e){
		e.preventDefault();
		this.setState({loginState:false});
		localStorage.loginState = null;
	}
	handleSearch(e){
		//enter触发搜索
		if(e.keyCode === 13){
			console.log('search...');
			let searchValue = e.target.value;
			hashHistory.push(`/searchResult/${searchValue}`);
			//发布搜索事件
			PubSub.publish('search',searchValue);
		}
	}
	render(){
		return(
			<Navbar inverse collapseOnSelect>
			    <Navbar.Header>
			      <Navbar.Brand>
			        <IndexLink  to="/">网易云音乐</IndexLink >
			      </Navbar.Brand>
			    </Navbar.Header>
			    <Navbar.Collapse>
				    <Nav>
				      <li role="presentation">
				      	<Link to="/playlist">发现音乐</Link>
				      </li>
				      <li role="presentation">
				      	<Link to="/playlist">私人FM</Link>
				      </li>
				      <li role="presentation">
				      	<Link to="/playlist">歌手</Link>
				      </li>
				    </Nav>
				    <Navbar.Form pullLeft>
				        <FormGroup className="maR10">
				        	<InputGroup>
				        		<InputGroup.Button>
				        			<Button><Glyphicon glyph="search"/></Button>
				        		</InputGroup.Button>
				          		<FormControl type="text" placeholder="Search" onKeyUp={this.handleSearch}/>
				        	</InputGroup>
				        </FormGroup>
			      	</Navbar.Form>
			    
			    	{this.state.loginState?(
			    		<Nav pullRight>
		        			<NavDropdown eventKey={3} title={localStorage.username || 'asd'} id="basic-nav-dropdown">
						        <MenuItem eventKey={3.1}>Action</MenuItem>
						        <MenuItem eventKey={3.2}>Another action</MenuItem>
						        <MenuItem eventKey={3.3}>Something else here</MenuItem>
						        <MenuItem divider />
						        <MenuItem  onClick={this.handleExit}>sign out</MenuItem>
					        </NavDropdown>
	        			</Nav>
	        			):(
	        			<Nav pullRight className="navLogin">
		    				<Button bsStyle="danger"><Link to="/login">sign in</Link></Button>
				        	<Button bsStyle="link"><Link to="/login/register">sign up</Link></Button>	
		    			</Nav>
		    			)
			    	}
		    	</Navbar.Collapse>
			    
			</Navbar>
		)
	}
}

//搜索组件
class SearchSection extends Component{
	constructor(props) {
		super(props);
		this.handleChange = this.handleChange.bind(this);
	}
	handleChange(e){
		let searchValue = e.target.value;
	}
	render(){
		return(
			<section>
				<div className="container">
					<div className="search">
						<FormControl type="text" placeholder="搜索从这里开始" onChange={this.handleChange} />
					</div>
				</div>
			</section>
		)
	}
}


//banner组件
class BannerBar extends Component{
	constructor(props) {
		super(props);
	}
	render(){		
		return(
			<Carousel>
				{
					this.props.imgArr.map((item,index)=>{
					    return (
					    	<Carousel.Item key={index}>
						      <img width={900} height={500} alt="900x500" src={item.imgUrl}/>
						      <Carousel.Caption>
						        <h3>First slide label</h3>
						        <p>Nulla vitae elit libero, a pharetra augue mollis interdum.</p>
						      </Carousel.Caption>
						    </Carousel.Item>
					    )
				    })
			    }
			</Carousel>
		)
	}
}

BannerBar.propTypes = {
	imgArr:React.PropTypes.array.isRequired
}

//独家组件
class ExclusivePlay extends Component{
	render(){
		return (
			<section>
				<div className="container">
					<h3>独家放送</h3>
					<Row>
						{this.props.palyArr.map((item,index)=>{
							if(index<4){
								return (
									<Col md={3} key={index}>
										<Thumbnail src={item.imgUrl}>
											<p>{index+1 + ":"+ item.innerTile}</p>
										</Thumbnail>
									</Col>
								)
							}
						})}
					</Row>
				</div>
			</section>
		)
	}
}

//首页banner条组件
class HomeTopSection extends Component{
	render(){
		return (
			<section className="head-section">
				<Grid>
					<Row>
						<Col md={8}>							
							<BannerBar imgArr={this.props.imgArr}/>
						</Col>
						<Col md={4}>
							<h3>热门歌单</h3>
							<Row className="hot-playlist">
								{
									this.props.hotPlaylist.map((item,index)=>{
										return (
											<Col md={6} key={index}>
												<Button block data-keyId={item.keyId} style={{color:item.color}} bsStyle="default">{item.title}</Button>
											</Col>
										)
									})
								}
								
							</Row>
						</Col>
					</Row>
				</Grid>
			</section>
		)
	}
}

//歌单组件
class PlayList extends Component{
	render(){
		return(
			<section>
				<div className="container">
					<h3>{this.props.title}</h3>
					<Row>
						<Col md={3}>
							<Thumbnail src={'https://timgsa.baidu.com/timg?image&quality=80&size=b9999_10000&sec=1503651594673&di=227436fe1dd5da6cf9709be9458f5db3&imgtype=0&src=http%3A%2F%2Fpic75.nipic.com%2Ffile%2F20150820%2F9530510_133307211791_2.jpg'}>
								<p>每日歌曲推荐</p>
							</Thumbnail>
						</Col>
						{this.props.palyArr.map((item,index)=>{
							return (
								<Col md={3} key={index}>
									<Link to="/playlist">
										<Thumbnail src={item.imgUrl}>
											<p>{item.innerTile}</p>
										</Thumbnail>
									</Link>
								</Col>
							)
						})}
					</Row>
				</div>
			</section>
		)
	}
}

class PlayListNav extends Component{
	render(){
		return(
			<section>
				<div className="container">
					<h3>歌单分类</h3>
					<div className="playlsitNav">
						{
							this.props.hotPlaylist.map((item,index)=>{
								return (

									<Button key={index} data-keyId={item.keyId} style={{color:item.color}} bsStyle="default">{item.title}</Button>

								)
							})
						}
						
					</div>
				</div>
			</section>
		)
	}
}

export {SearchSection,HeaderBar,HomeTopSection,PlayList,ExclusivePlay,PlayListNav}

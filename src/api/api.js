import $ from 'zeptojs';
import axios from 'axios';
//百度音乐API
const URL = 'http://tingapi.ting.baidu.com/v1/restserver/ting';

const default_params = {
    format:"json",
    callback:"",
    from:"webapp_music"
}

/**
* @description
* @param 
* @param  
* @return  
*/
export function getSearch(query) {
    let params = {
        method:"baidu.ting.search.catalogSug",
        query:query
    }
    params = Object.assign({},default_params,params);
    console.log(params)
    return httpGet('https://bird.ioliu.cn/netease/playlist?',{id:query})
}

/**
* @description get请求
* @param url 请求接口
* @param params 请求参数
* @return  promise对象
*/
export function  httpGet(url,params){

    return axios({
        method:'get',
        url:url,
        params:params
    })
    
}
/* PubSub 1.0.0 by sgdy 2017/8/25*/
////////////////
(function(root,factory) {  
    if(typeof exports === "object" && typeof module === "object")
		module.exports = factory();
	else if(typeof define === "function" && define.amd)
		define([],factory);
	else if(typeof exports === "object")
		exports["PubSub"] = factory();
	else
		root["PubSub"] = factory();
	
})(this,function(){
	
	// ob
	var q = {};
	//arr
	var queue = {};
	
    //订阅
	q.subscribe = function(event, fn) {
        if (!queue[event]) queue[event] = [];
        queue[event].push(fn);
    }
	
	//发布
    q.publish = function(event,param) {
        var eventQueue = queue[event];
        if (eventQueue) {
            eventQueue.forEach(function(item, index) {
                item(param);
            });
        }
    }
	
	//退订
    q.unSubscribe = function(event, fn) {
        var eventQueue = queue[event];
        if (eventQueue) {
            queue[event] = eventQueue.filter(function(item) {
                return item !== fn;
            });
        }
    }
	
	return q
});

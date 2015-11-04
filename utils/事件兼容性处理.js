function on(ele,type,fn){//绑定事件
	//首先自定义事件不能和系统事件冲突
	//凡是以self开头的事件类型都表示是自定义的事件类型
	
	if(/^self/.test(type)){
		if(!ele["selfEvent"+type]){
			ele["selfEvent"+type]=[];
		}
		var a=ele["selfEvent"+type];
		for(var i =0; i<a.length;i++){
			if(a[i]==fn)return;	
		}
		a.push(fn);
		return;//强制退出，以避免再去运行下面的代码
	}

	if(ele.addEventListener){//标准浏览器的方案
		ele.addEventListener(type,fn,false);
		return;
	}else{//IE的标准
		if(!ele["aEvent"+type]){
			ele["aEvent"+type]=[];	
			ele.attachEvent("on"+type,function(){run.call(ele)});
			
		}
		var a=ele["aEvent"+type];
		for(var i=0;i<a.length;i++){
			if(a[i]==fn)return;	
		}
		a.push(fn);
	}
	
}

function run(){//通知
	var e=window.event;
	var a=this["aEvent"+e.type];
	if(a){
		if(!e.target){
			e.target=e.srcElement;
			e.pageX=(document.documentElement.scrollLeft||document.body.scrollLeft)+e.clientX;
			e.pageY=(document.documentElement.scrollTop||document.body.scrollTop)+e.clientY;
			e.preventDefault=function(){e.returnValue=false;}
			e.stopPropation=function(){e.cancelBubble=true;}	
			
		}
		for(var i=0;i<a.length;i++){
			if(typeof a[i]=="function"){
				a[i].call(this,e);
			}else{
				a.splice(i,1);
				i--;	
			}
		}
	}
}

function selfRun(selfType,e){//只负责来执行保存在自定义事件数组中的那些方法
//第一个参数selfType是指自定义的事件类型,第二个参数e是系统事件对象
	var a=this["selfEvent"+selfType];
	if(a){
			for(var i=0;i<a.length;i++){
				a[i].call(this,e);	
			}
	}
	
}

function off(ele,type,fn){//移除绑定的事件
	if(/^self/.test(type)){
		var a=ele["selfEvent"+type];
		for(var i=0;i<a.length;i++){
			if(a[i]==fn){
				a.splice(i,1);
				return;	
			}
		}
		return;
	}

	if(ele.removeEventListener){
		ele.removeEventListener(type,fn,false);
		return;	
	}
	var a=ele["aEvent"+type];
	if(a){
		for(var i=0;i<a.length;i++){
			if(a[i]==fn){
				a[i]=null;
				return;	
			}
		}
	}
}
function processThis(obj,fn){
	return function (e){fn.call(obj,e)}
}

/*
bind的实现原理
Function.prototype.bind=function(obj){
	this;
	var _this=this;//当前的实例，就是调用bind的那个方法
	//return function(e){this.call(obj,e)}
	return function (e){_this.call(obj,e);}
}

move.bind(this);

*/







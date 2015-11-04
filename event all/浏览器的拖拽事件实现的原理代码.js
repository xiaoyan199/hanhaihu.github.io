function EventEmitter(){}
EventEmitter.prototype.on=function(type,fn){//订阅
	if(!this["event"+type]){
		this["event"+type]=[];	
	}
	var a=this["event"+type];
	for(var i=0;i<a.length;i++){
		if(a[i]==fn)return this;
	}
	a.push(fn);
	return this;
}
EventEmitter.prototype.run=function(type,e){//发布，通知
	var a=this["event"+type];
	if(a){
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

EventEmitter.prototype.off=function(type,e){//移除已经订阅的
	var a=this["event"+type];
	if(a){
		for(var i=0;i<a.length;i++){
			if(a[i]==fn){
				a[i]=null;
				return;	
			}
		}
	}
}

//第二部分：拖拽模块（先完成的）
//在面向对象的编程里，类方法里的this要指向当前的实例
//事件库里的原则：方法里的this都指向的是被操作的元素
function Drag(ele){//参数ele表示的是被拖拽的DOM元素
	this.ele=ele;
	this.x=null;
	this.y=null;
	this.mx=null;
	this.my=null;
	
	this.DOWN=processThis(this,this.down);
	this.MOVE=processThis(this,this.move);
	this.UP=processThis(this,this.up);
	on(this.ele,"mousedown",this.DOWN);
	
}

Drag.prototype=new EventEmitter;

Drag.prototype.down=function(e){
	if(this.ele.setCapture){
		this.ele.setCapture();
		on(this.ele,"mousemove",this.MOVE);
		on(this.ele,"mouseup",this.UP);
	}else{
		on(document,"mousemove",this.MOVE);
		on(document,"mouseup",this.UP)
	}
		e.preventDefault();
		this.run("dragstart",e);//这里的事件类型可不加self前缀
}


Drag.prototype.move=function(e){

	this.run("drag",e);
}

Drag.prototype.up=function(e){
	if(this.ele.releaseCapture){
		this.ele.releaseCapture();
		off(this.ele,"mousemove",this.MOVE);
		off(this.ele,"mouseup",this.UP);	
	}else{
		off(document,"mousemove",this.MOVE);
		off(document,"mouseup",this.UP);	
	}
	this.run("dragend",e);
}

//promise;
/*obj=new Promise(fn);
obj.then(success,failure).then().then().then();

obj.onsuccess(function(){
	this.onsuccess(function()
		})
	})*/




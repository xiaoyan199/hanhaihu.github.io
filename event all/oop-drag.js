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
	this.x=this.ele.offsetLeft;
	this.y=this.ele.offsetTop;
	this.mx=e.pageX;
	this.my=e.pageY;
	
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
	this.ele.style.left=e.pageX-this.mx+this.x+"px";
	this.ele.style.top=e.pageY-this.my+this.y+"px";
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
Drag.prototype.limit=function(e){//限定范围的拖拽
	var obj=this.obj;
		var valX=e.pageX-this.mx+this.x;
		var valY=e.pageY-this.my+this.y;
		if(valX<=obj.x1){
			this.ele.style.left=obj.x1+"px";
		}else if(valX>=obj.x2){
			this.ele.style.left=obj.x2+"px";
		}else{
			this.ele.style.left=valX+"px";	
		}
		
		if(valY<=obj.y1){
			this.ele.style.top=obj.y1+"px";
		}else if(valY>=obj.y2){
			this.ele.style.top=obj.y2+"px";
		}else{
			this.ele.style.top=valY+"px";
		}
	
}

Drag.prototype.startLimit=function (obj){
	this.obj=obj;
	this.on("drag",this.limit);
	return this;
}
Drag.prototype.border=function(){
	this.ele.style.border="dashed 2px blue";
	}
Drag.prototype.addBorder=function(){
	this.on("dragstart",this.border);
	this.on("dragend",function(){
		this.ele.style.border="";
	});
	return this;
	
}
/**
 * Created by JOHN on 2015/11/8.
 */

var utils=(function(){
    var flag= "XMLHttpRequest" in window;
    return {
        formatJSON:function(str){
            var jsonObj=null;
            try{
                jsonObj=JSON.parse(str);
            }catch(e){
                jsonObj=eval("("+ str+")");
            }

            return jsonObj;

        },

        createXHR:function(){
            return flag===true ? new XMLHttpRequest() :new ActiveXObject("MsXML3.XMLHTTP");
        },

        ajax:function(url,callBack){
            var _this=this;
            var xhr=_this.createXHR();
            var symbol=url.indexOf("?")>-1 ? "&" :"?";
            url=url+""+symbol+"_="+Math.random();
            xhr.open("get",url,true);
            xhr.onreadystatechange=function(){
                if(this.readystate==4&&/^(2|3)\d{2}$/g.test(this.status)){
                    var res=_this.formatJSON(this.responseText);
                    typeof callBack==="function" ? callBack(res) : null;

                }

            };




            xhr.send();


        }


    }



})();

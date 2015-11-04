/*

Created by hanhaihu 
the perfect broadcast design
*/

<script type="text/javascript">
    var oInner = document.getElementById("oInner");
    var uLis = document.getElementById("ul").getElementsByTagName("li");
    var bTn1 = document.getElementById("btn1");
    var bTn2 = document.getElementById("btn2");

    function getCss(curEle, attar) {
        var val = ("getComputedStyle" in window) ? window.getComputedStyle(curEle, null)[attar] : curEle.currentStyle[attar];
        var temp = parseFloat(val);
        return isNaN(temp) ? val : temp;
    }

    function setCss(curEle, attar, value) {
        var reg = /^(width|height|left|right|bottom|top((margin|padding)(Left|Right|Bottom|Top)?))$/;
        if (attar === "opacity") {
            curEle["style"][attar] = value;
            curEle["style"][attar] = "alpha(opacity=" + value * 100 + ")";
        }
        else if (reg.test(attar)) {
            curEle["style"][attar] = /^[+-](\d|[1-9]\d+)(\.\d+)?$/.test(value) ? value + "px" : value;

        } else {
            curEle["style"][attar] = value;
        }
    }

    function animate(curEle, dire, target, duration,fn) {
        var begin = getCss(curEle, "left");
        var change = target - begin;
        var times = 0;
        var interval = 15;

        function step() {
            times += interval;
            if (times < duration) {
                var val = times / duration * change + begin + "px";
                setCss(curEle, dire, val);
            } else {
                setCss(curEle, dire, target);
                clearInterval(timer);
               typeof fn==="function"?fn():null;
            }

        }

        var timer = window.setInterval(step, interval);
    }

    var step = 0;
    for (var i = 0; i < uLis.length; i++) {
        uLis[i].n = i;
        uLis[i].onclick = function () {
            animate(oInner, "left", this.n * -1349, 600);
            selectCurrent(this.n);
            step = this.n;
            clearInterval(autoTimer);
            autoTimer = setTimeout(function () {
                autoTimer = setInterval(autoMove, 2000);
            }, 3000);
        };
    }


    bTn1.onclick = function move1 () {
        var _this=this;
        _this.onclick=null;
        step++;
        if (step > uLis.length) {
            oInner.style.left = 0;
            step = 1;
        }
        animate(oInner, "left", step * -1349, 1000,function(){_this.onclick=move1});
        selectCurrent(step);
        clearInterval(autoTimer);
        autoTimer = setTimeout(function () {
            autoTimer = setInterval(autoMove, 2000);
        }, 3000);

    };

    bTn2.onclick = function move2() {
        var _this=this;
        _this.onclick=null;
        step--;
        if (step < 0) {
            oInner.style.left = -6745 + "px";
            step = uLis.length - 1;
        }
        animate(oInner, "left", step * -1349, 1000,function(){_this.onclick=move2});
        selectCurrent(step);
        clearInterval(autoTimer);
        autoTimer = setTimeout(function () {
            autoTimer = setInterval(autoMove, 2000);
        }, 3000);

    };

    function autoMove() {
        step++;
        if (step > uLis.length) {
            oInner.style.left = 0;
            step = 1;
        }
        animate(oInner, "left", step * -1349, 1000);
        selectCurrent(step);

    }

    function selectCurrent(step) {
        for (var i = 0; i < uLis.length; i++) {
            uLis[i].className = "";
        }
        if (step === uLis.length) {
            step = 0;
        }
        uLis[step].className = "selected";
    }

    var autoTimer = window.setInterval(autoMove, 2000);
</script>
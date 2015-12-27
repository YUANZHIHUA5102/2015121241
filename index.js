var main = document.querySelector('#main');
var oLis = document.querySelectorAll(".slide>li");
var winW = window.innerWidth;//设备的宽度
var winH = window.innerHeight;
var desW = 640;//设计稿的宽
var desH = 960;
main.style.webkitTransform = "scale(" + winH / desH + ")";//缩放页面
[].forEach.call(oLis, function () {
    arguments[0].index = arguments[1];//当前的索引
    arguments[0].addEventListener('touchstart', start, false);
    arguments[0].addEventListener('touchmove', move, false);
    arguments[0].addEventListener('touchend', end, false);
});
function start(e) {
    this.startY = e.changedTouches[0].pageY;
}
function move(e) {
    e.preventDefault();
    /*阻止默认行为*/
    var touchMove = e.changedTouches[0].pageY;
    var changePos = touchMove - this.startY;
    var cur = this.index;
    var step = 1 / 2;
    var scalePos = (Math.abs(changePos) / winH) * step;
    [].forEach.call(oLis, function () {//设置循环 去掉类名
        if (arguments[1] != cur) {
            arguments[0].style.display = "none";
        }
        arguments[0].className = "";//去掉类名
        arguments[0].firstElementChild.id = "";
    });
    if (changePos > 0) {/*↓*/
        var pos = -winH + changePos;
        this.preSIndex = cur == 0 ? oLis.length - 1 : cur - 1;//判断当前索引是否是第一张，如果是的话，上一张的索引是总长减一，否者是中间的图片，
    } else if (changePos < 0) {/*↑*/
        var pos = winH + changePos;
        this.preSIndex = cur == oLis.length - 1 ? 0 : cur + 1;
    }
    oLis[this.preSIndex].style.webkitTransform = "translate(0," + pos + "px)";//移动的距离
    oLis[this.preSIndex].className = "zIndex";
    oLis[this.preSIndex].style.display = "block";
    oLis[cur].style.webkitTransform = "scale(" + (1 - scalePos) + ") translate(0," + changePos + "px)";//设置从小到大缩放
}
function end(e) {
    oLis[this.preSIndex].style.webkitTransform = "translate(0,0)";//回到默认状态
    oLis[this.preSIndex].style.webkitTransition = "0.5s";
    oLis[this.preSIndex].addEventListener('webkitTransitionEnd', function () {
        this.style.webkitTransition = "";
        this.firstElementChild.id = "a" + (this.index + 1);
    })


}
var arr = []; //保存所有的XY坐标，只为验证。实际程序中可删除。  
var r = 3;
var radian; //弧度  
var i;
var radianDecrement; //弧度增量  
var time = 10; //每个点之间的时间间隔  
var intervalId;
var num = 360; //分割为 360 个点  
var startRadian = Math.PI;
var ctx;
var canvas;
window.onload = function() {
    startAnimation();
}

function startAnimation() {
    canvas = document.getElementById("myCanvas");
    ctx = canvas.getContext("2d");
    //让画布撑满整个屏幕，-20是滚动条的位置，需留出。如滚动条出现则会挤压画布。  
    WINDOW_HEIGHT = document.documentElement.clientHeight - 20;
    WINDOW_WIDTH = document.documentElement.clientWidth - 20;

    WINDOW_HEIGHT = window.innerHeight;
    WINDOW_WIDTH = window.innerWidth;
    
    ctx.width = WINDOW_WIDTH;
    ctx.heigh = WINDOW_HEIGHT;
    drawHeart();
}

function drawHeart() {

    ctx.strokeStyle = "pink";
    ctx.lineWidth = 1; //设置线的宽度  
    radian = startRadian; //弧度设为初始弧度  
    radianDecrement = Math.PI / num * 2;
    ctx.moveTo(getX(radian), getY(radian)); //移动到初始点  
    i = 0;
    intervalId = setInterval(printHeart, time);
    // window.requestAnimationFrame(printHeart)  
}

function drawContHeart(){
    // ctx.
    // ctx.strokeStyle = "pink";
    ctx.lineWidth = 1; //设置线的宽度  
    radian = startRadian; //弧度设为初始弧度  
    radianDecrement = Math.PI / num * 2;
    ctx.moveTo(getX(radian), getY(radian)); //移动到初始点  
    i = 0;

    radian += radianDecrement;
    var x = getX(radian).toFixed(1),
        y = getY(radian).toFixed(1);
    intervalId = setInterval(printHeart, time);
}

var map = new Map(),
    map2 = new Map();
//x = 16 sin^3 t, y = (13 cos t - 5 cos 2t - 2 cos 3t - cos 4t)  
var intervalId2, mapIter, map2Iter;

function printHeart() {
    radian += radianDecrement;
    var x = getX(radian).toFixed(1),
        y = getY(radian).toFixed(1);
    if (!map.get(x)) {
        map.set(x, []);
    }
    map.get(x).push(y);
    ctx.lineWidth = 2;
    ctx.lineTo(x, y); //在旧点和新点之间连线  
    //arr.push("X:" + getX(radian) + "<br/>Y:" + getY(radian) + "<br/>");  
    i++;
    ctx.stroke(); //画线  
    if (i >= num) {
        ctx.closePath();
        clearInterval(intervalId);
        var cont = 0,
            half = Number.parseInt((map.size / 2).toFixed(0));
        for ([k, v] of map) {
            if (cont >= half) {
                map2.set(k, v);
                cont++;
            } else cont++;
        }
        ctx.beginPath();
        mapIter = map.entries();
        map2Iter = map2.entries();
        ctx.lineWidth = 1;
        ctx.strokeStyle = "#FFE4E1";
        intervalId2 = setInterval(fillHeart,10);
        //document.getElementById("bs").innerHTML = arr.join("");//打印所有的XY坐标点。  
    }
}
/**
 * 填充心
 * @return {[type]} [description]
 */
function fillHeart() {
    var entry = map2Iter.next();
    if(entry.done) {
        clearInterval(intervalId2);
        boomImg("myCanvas",canvas.toDataURL());
        return;
    }
    for (j of entry.value[1]) {
        ctx.lineTo(entry.value[0], j);
    }
    ctx.stroke();
    ctx.closePath();

    entry = mapIter.next();
    if(entry.done) {
        clearInterval(intervalId2);
        boomImg("myCanvas",canvas.toDataURL());
        return;
    }

    for (j of entry.value[1]) {
        ctx.lineTo(entry.value[0], j);
    }
    ctx.stroke();
    ctx.closePath();
}

function printText(){
    ctx.fillStyle = "#87CEFA";
    ctx.font="12px Arial";
    ctx.textAlign="center";
    // ctx.fillText("Debby七夕快乐~",WINDOW_WIDTH/2 - 10,WINDOW_HEIGHT/2 - 10);
    ctx.fillText("Happy Birthday!",50 ,80);
}

function boomImg(canvas,data){
    var boom1 = boom(canvas,data);
    boom1.go(500,function(){
        printText();
    });
}

function getX(t) { //由弧度得到 X 坐标  
    return 50 + r * (16 * Math.pow(Math.sin(t), 3));
}

function getY(t) { //由弧度得到 Y 坐标  
    return 70 - r * (13 * Math.cos(t) - 5 * Math.cos(2 * t) - 2 * Math.cos(3 * t) - Math.cos(4 * t));
}
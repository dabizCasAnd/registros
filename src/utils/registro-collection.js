/* eslint-disable no-unused-vars */
var canvas;// = document.getElementById('canvas');
var ctx;// = canvas.getContext("2d");

var cols = 100;
var rows = 20;
var cells = rows * cols;
var size = 25;
var gW = cols * size;
var gH = rows * size;

var headerSize = 4 * size;

var gX = 0,
    gY = 0,
    pX = 0,
    pY = 0,
    gScale = 1,
    speed = 2;

var isDown = false;
var grid = [];




/*$('#canvas').mousedown(function (e) {
    isDown = true;
    pX = e.pageX;
    pY = e.pageY;
}).mouseup(function (e) {
    isDown = false;
}).mouseout(function (e) {
    isDown = false;
}).mousemove(function (e) {
    if (isDown) {
        gX += (pX - e.pageX) * speed;
        gY += (pY - e.pageY) * speed;
        pX = e.pageX;
        pY = e.pageY;
        if (gX > 0) gX = 0;
        if (gX < canvas.width - gW * gScale) gX = canvas.width - gW * gScale;
        if (gY > 0) gY = 0;
        if (gY < canvas.height - gH * gScale) gY = canvas.height - gH * gScale;

        drawGrid();
    }
});*/

function drawGrid() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);

    ctx.save();
    ctx.translate(gX, gY);
    ctx.scale(gScale, gScale);
    for (var i = 0; i < cols; ++i) {
        ctx.fillStyle = "#FFFFFF";
        ctx.fillRect(i * size, 0, size, headerSize);
        ctx.strokeRect(i * size, 0, size, headerSize);

        ctx.fillStyle = "#000000";
        ctx.save();
        ctx.translate(i * size + 16, headerSize - 8);
        ctx.rotate(Math.PI * 1.5);
        ctx.fillText("Column " + i, 0, 0);
        ctx.restore();

        for (var j = 0; j < rows; ++j) {
            ctx.fillStyle = grid[i * rows + j];
            ctx.fillRect(i * size, j * size + headerSize, size, size);
            ctx.strokeRect(i * size, j * size + headerSize, size, size);
        }
    }
    ctx.restore();
}

/*
 * Mousewheel
 */
function handle(delta) {
    gScale += delta * 0.01;
    if (gScale < 1) gScale = 1;
    drawGrid();
}

function wheel(event) {
    event.preventDefault()
    var delta = 0;
    if (!event) event = window.event;
    if (event.wheelDelta) {
        delta = event.wheelDelta / 120;
    } else if (event.detail) {
        delta = -event.detail / 3;
    }
    if (delta) {
        handle(delta);
    }
    if (event.preventDefault) {
        event.preventDefault();
    }
    event.returnValue = false;
}


export function initCollectionRegistry(cv) {
    canvas = cv;//document.getElementById('canvas');
    ctx = canvas.getContext("2d");
    ctx.strokeStyle = "#000000";
    ctx.lineWidth = 1;
    ctx.font = "14px sans-serif";
    for (var i = 0; i < cells; ++i) {
        if (Math.random() < 0.5) {
            grid.push("#FF8ED6");
        } else {
            grid.push("#8ED6FF");
        }
    }

    drawGrid(0, 0);

    if (window.addEventListener) {
        document.addEventListener('mousewheel DOMMouseScroll MozMousePixelScroll', e => { e.preventDefault(); wheel(e) }, { passive: false });
        //window.addEventListener('DOMMouseScroll', wheel, { capture: false, passive: false } );
    }
    //document.addEventListener('touchstart', function(){}, {passive: false})
    window.onmousewheel = document.onmousewheel = wheel;
}






/*var canvas = document.getElementsByTagName('canvas')[0];
canvas.width = 800;
canvas.height = 600;

var gkhead = new Image;

window.onload = function(){		

    var ctx = canvas.getContext('2d');
    trackTransforms(ctx); 
    function redraw(){

        // Clear the entire canvas
        var p1 = ctx.transformedPoint(0,0);
        var p2 = ctx.transformedPoint(canvas.width,canvas.height);
        ctx.clearRect(p1.x,p1.y,p2.x-p1.x,p2.y-p1.y);

        ctx.save();
        ctx.setTransform(1,0,0,1,0,0);
        ctx.clearRect(0,0,canvas.width,canvas.height);
        ctx.restore();

        ctx.drawImage(gkhead,0,0);

    }
    redraw();

    var lastX=canvas.width/2, lastY=canvas.height/2;

    var dragStart,dragged;

    canvas.addEventListener('mousedown',function(evt){
        document.body.style.mozUserSelect = document.body.style.webkitUserSelect = document.body.style.userSelect = 'none';
        lastX = evt.offsetX || (evt.pageX - canvas.offsetLeft);
        lastY = evt.offsetY || (evt.pageY - canvas.offsetTop);
        dragStart = ctx.transformedPoint(lastX,lastY);
        dragged = false;
    },false);

    canvas.addEventListener('mousemove',function(evt){
        lastX = evt.offsetX || (evt.pageX - canvas.offsetLeft);
        lastY = evt.offsetY || (evt.pageY - canvas.offsetTop);
        dragged = true;
        if (dragStart){
        var pt = ctx.transformedPoint(lastX,lastY);
        ctx.translate(pt.x-dragStart.x,pt.y-dragStart.y);
        redraw();
            }
    },false);

    canvas.addEventListener('mouseup',function(evt){
        dragStart = null;
        if (!dragged) zoom(evt.shiftKey ? -1 : 1 );
    },false);

    var scaleFactor = 1.1;

    var zoom = function(clicks){
        var pt = ctx.transformedPoint(lastX,lastY);
        ctx.translate(pt.x,pt.y);
        var factor = Math.pow(scaleFactor,clicks);
        ctx.scale(factor,factor);
        ctx.translate(-pt.x,-pt.y);
        redraw();
    }

    var handleScroll = function(evt){
        var delta = evt.wheelDelta ? evt.wheelDelta/40 : evt.detail ? -evt.detail : 0;
        if (delta) zoom(delta);
        return evt.preventDefault() && false;
    };

    canvas.addEventListener('DOMMouseScroll',handleScroll,false);
    canvas.addEventListener('mousewheel',handleScroll,false);
};

gkhead.src = 'http://phrogz.net/tmp/gkhead.jpg';

// Adds ctx.getTransform() - returns an SVGMatrix
// Adds ctx.transformedPoint(x,y) - returns an SVGPoint
function trackTransforms(ctx){
    var svg = document.createElementNS("http://www.w3.org/2000/svg",'svg');
    var xform = svg.createSVGMatrix();
    ctx.getTransform = function(){ return xform; };

    var savedTransforms = [];
    var save = ctx.save;
    ctx.save = function(){
        savedTransforms.push(xform.translate(0,0));
        return save.call(ctx);
    };

    var restore = ctx.restore;
    ctx.restore = function(){
    xform = savedTransforms.pop();
    return restore.call(ctx);
};

    var scale = ctx.scale;
    ctx.scale = function(sx,sy){
    xform = xform.scaleNonUniform(sx,sy);
    return scale.call(ctx,sx,sy);
};

    var rotate = ctx.rotate;
    ctx.rotate = function(radians){
        xform = xform.rotate(radians*180/Math.PI);
        return rotate.call(ctx,radians);
    };

    var translate = ctx.translate;
    ctx.translate = function(dx,dy){
        xform = xform.translate(dx,dy);
        return translate.call(ctx,dx,dy);
    };

    var transform = ctx.transform;
    ctx.transform = function(a,b,c,d,e,f){
        var m2 = svg.createSVGMatrix();
        m2.a=a; m2.b=b; m2.c=c; m2.d=d; m2.e=e; m2.f=f;
        xform = xform.multiply(m2);
        return transform.call(ctx,a,b,c,d,e,f);
    };

    var setTransform = ctx.setTransform;
    ctx.setTransform = function(a,b,c,d,e,f){
        xform.a = a;
        xform.b = b;
        xform.c = c;
        xform.d = d;
        xform.e = e;
        xform.f = f;
        return setTransform.call(ctx,a,b,c,d,e,f);
    };

    var pt  = svg.createSVGPoint();
    ctx.transformedPoint = function(x,y){
        pt.x=x; pt.y=y;
        return pt.matrixTransform(xform.inverse());
    }
}*/
var highlightRect, lastSelectedEl, firstSelectedEl, activeEl, clickHandler,highlightCircle, dragging = false;

var state = {
    states: [
        'V', 'v', // (De)Select element
        'N', 'n', // select parrent fo current selection
        'M', // select first child fo current selection
        'T', 't', // translate selction
        'C', // set center of transform
        'R', 'r', // rotate selection around center
        'S', , // scale both
        'SX', // scalle y
        'SY', // scale x
    ],
    transforms: {
        x: 0,
        y: 0,
        r: 0,
        rx: 0,
        ry: 0,
        scx: 0,
        scy: 0,
        s: 0,
        sx: 0,
        sy: 0,
    },
    slectionMarker: s.rect({
        fill: 'none',
        lineWidth: 2,
        strokeDasharray: '4'
    }),
    selections: Snap.set(),
    current: 'V',
};

$(window).keyup(function(eve) {
    switch (String.fromCharCode(eve.keyCode)) {
        case 'v':
        case 'V':
            if (eve.shiftKey) {
                setState('DV');
            } else{
                setState('V');
            }
            break;
        case 'N':
        case 'n':
            if (lastSelectedEl) {
                if (lastSelectedEl.parent().type !== 'svg') {
                    highlightEl(lastSelectedEl.parent());
                } else {
                    highlightEl(firstSelectedEl);
                }
            }
            break;
        case 'T':
        case 't':
            setState('T');
            break;
        case 'D':
        case 'd':
            deselect();
            break;
        case 'R':
        case 'r':
            if (eve.shiftKey){
                setState('RC');
            } else {
                setState('R');
            }
            break;
        case 's':
        case 'S':
            setState('S');
            break;
        case 'L':
        case 'l':
             if (lastSelectedEl) {
                var log = {};
               log.rotation = GreenProp.rotation(lastSelectedEl.node);
               log.origin = GreenProp.zOrigin(lastSelectedEl.node);
               log.tx = GreenProp.x(lastSelectedEl.node);
               log.ty = GreenProp.y(lastSelectedEl.node);
               log.rx = GreenProp.rotationX(lastSelectedEl.node);
               log.ry = GreenProp.rotationY(lastSelectedEl.node);
               log.sy = GreenProp.scaleY(lastSelectedEl.node);
               log.sx = GreenProp.scaleX(lastSelectedEl.node);
               console.log(log);
            }
            setState('L');
            break;
        case 'P':
            setState('P');
    }
});


var startDrag = function() {
    this.data('origTrans', this.transform().local);
    this.data('origBB', this.getBBox());
};

function setState(s) {
    if (state.current!==s) {
        state.current = s;
        $('.state:first').text(s);
        if (lastSelectedEl) {
            lastSelectedEl.undrag();
            if (s === 'T') {
                lastSelectedEl.drag(function(dx, dy, x, y) {
                    // this.transform(this.data('origTrans') + 'T' + [dx, dy]);
                    TweenLite.set(this.node, {x: x,y: y});
                    highlightRect.transform(this.data('origTrans') + 'T' + [dx, dy]);
                    state.transforms.x = dx;
                    state.transforms.y = dy;
                }, startDrag);
            } else if (s === 'R') {
                lastSelectedEl.drag(function(dx, dy, x, y) {
                    var bb = this.data('origBB');
                    var cx = this.data('cx') || state.transforms.rx || bb.cx;
                    var cy = this.data('cy') || state.transforms.ry || bb.cy;
                    var deg = Snap.deg(Math.atan2(cy - y, cx - x));
                    state.transforms.r = deg;
                    TweenLite.set(this.node, {rotation: deg, svgOrigin:cx +' '+ cy});
                    highlightRect.transform(this.data('origTrans') + 'R' + [deg, cx, cy]);
                }, startDrag);
            }
        }
    }
}

function getState() {
    return state.current;
}

function addSelection(el) {
    if (!(el in state.selections)) {
        state.selections.push(el);
        state.slectionMarker.attr(state.selections.getBBox());
    }
}

function removeSelection(el) {
    if (~state.selections.indexOf(el)) {
        state.selections.splice(state.selections.indexOf(el));
    }
}

function deselect () {
    if (highlightCircle) highlightCircle.remove();
    if (highlightRect) {
        highlightRect.remove();
    }
    if (lastSelectedEl) {
        lastSelectedEl.undrag();
    }
    lastSelectedEl = null;
}

function rectObjFromBB(bb) {
    return {
        x: bb.x,
        y: bb.y,
        width: bb.width,
        height: bb.height
    };
}

function highlightEl(el) {
    if (lastSelectedEl) {
        lastSelectedEl.undrag();
    }
    if (highlightRect) {
        highlightRect.remove();
    }

    highlightRect = s.rect(rectObjFromBB(el.getBBox(1)))
        .attr({
            fill: "none",
            stroke: "red",
            strokeDasharray: "5,5"
        });

    highlightRect.transform(el.transform().global.toString());


    lastSelectedEl = el;
}

function highlightRot(x, y) {
    if (highlightCircle) highlightCircle.remove();
    highlightCircle = s.circle({
        cx: x,
        cy: y,
        r: 4,
        fill: '#FF8000',
        stroke: 'orangered',
        linewidth: 5
    });
    state.transforms.rx = x;
    state.transforms.ry = y;
}

function getEventElement(ev) {
    if (getState() === 'V') {
        if (ev.target.localName === 'svg') {
            return;
        }
        var snapEl = Snap(ev.target);
        firstSelectedEl = snapEl;
        highlightEl(snapEl);
    } else if (getState() === "RC") {
        highlightRot(ev.pageX, ev.pageY);
    } else if (getState() === "L") {

        var log = {x:ev.pageX, y:ev.pageY};
        if (lastSelectedEl) {
            var gm = lastSelectedEl.transform().globalMatrix;
            var cx = lastSelectedEl.data('cx') || lastSelectedEl.getBBox().cx;
            var cy = lastSelectedEl.data('cy') || lastSelectedEl.getBBox().cy;
            cx = gm.x(cx, cy);
            cy = gm.y(cx, cy);        
            log.angle = Snap.angle(cx, cy, log.x, log.y);
        }
        console.log(log);
    } else if(getState()==='P') {
        if (window.objects && window.objects.makePuls) {
            var p = objects.makePuls(ev.pageX, ev.pageY);
            s.add(p);
            p.tween.call(function () {
                p.remove();
            }).play();
        }
    }
}

function removeClickHandlerFromSVG() {
    s.unclick();
}

function addHandlerToSVG() {
    s.click(function(ev) {
        getEventElement(ev)
    })
}

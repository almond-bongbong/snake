var contWidth = 400;
var contHeight = 400;
var interval = 100;
var con;
var s;
var timer;
var food;
var keyPending = {
  ArrowUp: false,
  ArrowDown: false,
  ArrowLeft: false,
  ArrowRight: false
};

function setup() {
    con = document.getElementById('container');
    con.innerHTML = '';
    con.style.position = 'relative';
    con.style.width = contWidth + 'px';
    con.style.height = contHeight + 'px';
    con.style.backgroundColor = '#000';

    s = new Snake();
    s.createDom(contWidth, contHeight, con);

    food = new Food();
    food.createDom(contWidth, contHeight, con);

    food.updateLocation();

    timer = setInterval(function() {
        draw();
    }, interval);

    keyPressed();
}

function keyPressed() {
    document.addEventListener('keydown', function(e) {
        var key = e.key;

        if (keyPending[key]) return;
        keyPending[key] = true;

        if (key === 'ArrowUp') {
            s.dir(0, -1);
        } else if (key === 'ArrowDown') {
            s.dir(0, 1);
        } else if (key === 'ArrowLeft') {
            s.dir(-1, 0);
        } else if (key === 'ArrowRight') {
            s.dir(1, 0);
        }
    });

    document.addEventListener('keyup', function(e) {
      var key = e.key;
      keyPending[key] = false;
    });
}

function draw() {
    if (s.death()) {
        clearInterval(timer);
        setup();
    }
    s.update();
    s.show();
    if (s.eat(food)) {
        food.updateLocation();
    }
}

setup();
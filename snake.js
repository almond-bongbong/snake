function Snake() {
    this.con = null;
    this.contW = null;
    this.contH = null;
    this.scl = 20;
    this.x = 0;
    this.y = 0;
    this.xspeed = 1;
    this.yspeed = 0;
    this.dom = null;
    this.total = 0;
    this.tail = [];

    this.createDom = function(contW, contH, con) {
        this.contW = contW;
        this.contH = contH;

        var sDom = document.createElement('div');
        sDom.style.boxSizing = 'border-box';
        sDom.style.position = 'absolute';
        sDom.style.width = this.scl + 'px';
        sDom.style.height = this.scl + 'px';
        sDom.style.border = '1px solid #000';
        sDom.style.backgroundColor = '#fff';
        this.dom = sDom;
        this.con = con;

        con.appendChild(sDom);
    };

    this.death = function() {
        for (var i = 0; i < this.tail.length; i++) {
            var pos = this.tail[i];
            if ((this.x / pos.x === 1 || isNaN(this.x / pos.x)) && (this.y / pos.y === 1 || isNaN(this.y / pos.y))) {
                this.total = 0;
                this.tail = [];
                alert('score : ' + this.total);
                return true;
            }
        }

        // if (this.x < 0) console.log('game over');
        // if (this.y < 0) console.log('game over');
        // if (this.x + this.scl > this.contW) console.log('game over');
        // if (this.y + this.scl > this.contH) console.log('game over');
    };

    this.update = function() {
        if (this.total > this.tail.length) {
            var newTail = new Snake();
            newTail.createDom(this.contW, this.contH, con);
            newTail.x = this.x;
            newTail.y = this.y;
            newTail.dom.style.left = newTail.x + 'px';
            newTail.dom.style.top = newTail.y + 'px';
            this.tail[this.total - 1] = newTail;
        }

        if (this.total === this.tail.length) {
            for (var i = 0; i < this.tail.length - 1; i++) {
                this.tail[i].x = this.tail[i + 1].x;
                this.tail[i].y = this.tail[i + 1].y;
            }
        }

        if (this.total > 0) {
            this.tail[this.total - 1].x = this.x;
            this.tail[this.total - 1].y = this.y;
        }

        this.x = this.x + this.xspeed * this.scl;
        this.y = this.y + this.yspeed * this.scl;

        if (this.x < 0) this.x = 0;
        if (this.y < 0) this.y = 0;
        if (this.x + this.scl > this.contW) this.x = this.contW - this.scl;
        if (this.y + this.scl > this.contH) this.y = this.contH - this.scl;
    };

    this.show = function() {
        for (var i = 0; i < this.tail.length; i++) {
            this.tail[i].dom.style.left = this.tail[i].x + 'px';
            this.tail[i].dom.style.top = this.tail[i].y + 'px';
        }
        this.dom.style.left = this.x + 'px';
        this.dom.style.top = this.y + 'px';
    };

    this.dir = function(x, y) {
        if (this.total === 0 || Math.abs(this.xspeed) !== Math.abs(x)) {
            this.xspeed = x;
        }
        if (this.total === 0 || Math.abs(this.yspeed) !== Math.abs(y)) {
            this.yspeed = y;
        }
    };

    this.eat = function(pos) {
        if (this.x / pos.x === 1 && this.y / pos.y === 1) {
            console.log('eat!!');
            this.total++;
            return true;
        } else {
            return false;
        }
    }
}
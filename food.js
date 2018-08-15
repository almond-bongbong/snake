function Food() {
    this.contW = null;
    this.contH = null;
    this.scl = 20;
    this.x = 0;
    this.y = 0;
    this.dom = null;

    this.createDom = function(contW, contH, con) {
        this.contW = contW;
        this.contH = contH;

        var foodEl = document.createElement('div');
        foodEl.setAttribute('id', 'food');
        foodEl.style.boxSizing = 'border-box';
        foodEl.style.position = 'absolute';
        foodEl.style.width = this.scl + 'px';
        foodEl.style.height = this.scl + 'px';
        foodEl.style.border = '1px solid #000';
        foodEl.style.backgroundColor = '#f00';
        this.dom = foodEl;

        con.appendChild(foodEl);
    };

    this.updateLocation = function() {
        var cols = Math.floor(this.contW / this.scl);
        var rows = Math.floor(this.contH / this.scl);
        var x = Math.floor(Math.random() * cols) * this.scl;
        var y = Math.floor(Math.random() * rows) * this.scl;

        this.x = x;
        this.y = y;
        this.dom.style.left = x + 'px';
        this.dom.style.top = y + 'px';
    }
}
class Elements {
    constructor() {
        this.elements = [];
        this.frameHeight = 540;
        this.isShowText = false

    }

    setValue(index, value) {
        this.elements[index].value = value;
        this.elements[index].style.height = (this.unitheight * value) + "px";
        if (this.isShowText)
            this.elements[index].innerHTML = value;
        else
            this.elements[index].innerHTML = '';

    }

    getValue(index) {
        return this.elements[index].value;
    }

    getMaxValue() {
        return this.values.reduce((max, value) => max < value ? value : max, 0);
    }

    getListSize() {
        return this.elements.length;
    }

    setListSize(n) {
        if (n == 0)
            return;
        this.isShowText = n <= 50;
        if (n > this.getListSize())
            this.addElements(n);
        else
            this.removeElements(n);
        this.unitheight = this.frameHeight / n;
        this.random();

    }

    createRandomValues(n = this.elements.length) {
        let arr = []
        while (arr.length != n) {
            let value = Math.floor(Math.random() * (n)) + 1;
            if (arr.indexOf(value) == -1)
                arr.push(value);
        }
        return arr;
    }

    random() {
        this.values = this.createRandomValues();
        this.unitheight = this.frameHeight / this.values.length;
        this.unsort()
    }

    unsort() {
        for (let i = 0; i < this.elements.length; i++) {
            this.setValue(i, this.values[i]);
            this.removeAllClass('current');
            this.removeAllClass('green');
            this.removeAllClass('loop1')
            this.removeAllClass('max')
            this.removeAllClass('left')
            this.removeAllClass('right')
            this.removeAllClass('pivot')

        }

    }

    removeAllClass(className) {
        for (let e of document.querySelectorAll('.' + className)) {
            e.classList.remove(className)
        }
    }



    removeElements(n) {
        var frame = document.querySelector('#frame');
        var nodes = frame.childNodes;
        while (nodes.length != n) {
            frame.removeChild(nodes[0])
        }
        this.elements = frame.querySelectorAll('.element');
    }

    setCustomList(string) {
        if (!string)
            return;

        var tempList = string.trim().split(' ')
        for (var value of tempList) {
            if (isNaN(value) || value <= 0) {
                alert('Invalid input');
                return;
            }
        }

        tempList = tempList.filter((value) => value != '').map((value) => Number.parseInt(value));
        var maxValue = tempList.reduce((max, value) => max < value ? value : max, 0)
        var minValue = tempList.reduce((min, value) => min > value ? value : min, maxValue)
        this.setListSize(tempList.length);
        this.unitheight = this.frameHeight / maxValue;
        console.log(maxValue, minValue);
        this.values = tempList;
    }

    addClass(index, className) {
        this.elements[index].classList.add(className);
    }

    addElements(n) {
        var frame = document.querySelector('#frame');
        while (frame.childElementCount != n) {
            var element = document.createElement('div');
            element.classList.add('element');
            frame.appendChild(element);
        }
        this.elements = frame.querySelectorAll('.element');
    }

    removeClass(index, className) {
        this.elements[index].classList.remove(className);
    }

    swap(i1, i2) {
        var temp = this.elements[i1].value;
        this.setValue(i1, this.elements[i2].value);
        this.setValue(i2, temp);
    }
}
export default new Elements();
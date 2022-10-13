class App {
    constructor() {
        this.frameHeight = 540;
        this.elements = [];
        this.isShowText = false
        this.deplay = 0;
        this.isRunning = false;
        this.currentAlgorithm = this.selectionSort;
        this.setListSize(50);
        this.compound();
        this.handleEvent();

    }

    // return number 
    //
    getUnitHeight() {
        if (this.elements.length == 0)
            return this.frameHeight;
        return this.frameHeight / this.elements.length;
    }

    // set innerHTML
    // set Value
    // set element height
    setElementValue(index, value) {
        this.elements[index].value = value;
        this.elements[index].style.height = (this.getUnitHeight() * value) + "px";
        if (this.isShowText)
            this.elements[index].innerHTML = value;
        else
            this.elements[index].innerHTML = '';

    }


    //create array of element with random value from 1 to n
    createRandomValues(n = this.elements.length) {
        let arr = []
        while (arr.length != n) {
            let value = Math.floor(Math.random() * (n)) + 1;
            if (arr.indexOf(value) == -1)
                arr.push(value);
        }
        return arr;
    }


    compound() {
        this.values = this.createRandomValues();
        this.unsort()
    }

    unsort() {
        for (let i = 0; i < this.elements.length; i++) {
            this.setElementValue(i, this.values[i]);
            this.removeAllClass('current');
            this.removeAllClass('green');
            this.removeAllClass('loop1')
            this.removeAllClass('max')
            this.removeAllClass('left')
            this.removeAllClass('right')
            this.removeAllClass('left-1')
            this.removeAllClass('right-1')
        }
        this.renderExcutionTime("---")

    }


    //remove class 
    removeAllClass(className) {
        for (let e of document.querySelectorAll('.' + className)) {
            e.classList.remove(className)
        }
    }

    getListSize() {
        return this.elements.length;
    }

    setListSize(n) {
        if (n == 0)
            return;
        this.isShowText = n <= 50;
        if (n > this.getListSize())
            this.addElements(n - this.getListSize());
        else
            this.removeElements(this.getListSize() - n);
        this.compound();

    }

    removeElements(n) {
        var frame = document.querySelector('#frame');
        var nodes = frame.childNodes
        for (var i = 1; i <= n; i++) {
            frame.removeChild(nodes[0]);
        }
        this.elements = frame.querySelectorAll('.element');
    }

    addElements(n) {
        var frame = document.querySelector('#frame');
        for (var i = 1; i <= n; i++) {
            var element = document.createElement('div');
            element.classList.add('element');
            frame.appendChild(element);
        }
        this.elements = frame.querySelectorAll('.element');
    }

    swap(i1, i2) {
        var temp = this.elements[i1].value;
        this.setElementValue(i1, this.elements[i2].value);
        this.setElementValue(i2, temp);
    }

    sleep(ms) {
        return new Promise(resolve => setTimeout(resolve, ms));
    }

    addClass(index, className) {
        this.elements[index].classList.add(className);
    }

    removeClass(index, className) {
        this.elements[index].classList.remove(className);
    }

    renderExcutionTime(time) {
        if (isNaN(time))
            document.querySelector("#execution-time").innerHTML = 'Execution time : ' + time;
        else if (this.deplay == 0)
            document.querySelector("#execution-time").innerHTML = 'Execution time : ' + Math.floor(time) + ' ms';
    }


    /*
        Algorithm
    
    

    */

    async selectionSort() {
        if (this.isRunning)
            return;
        this.isRunning = true;
        var start = performance.now();
        for (let i = 0; i < this.getListSize() - 2; i++) {
            var indexOfMin = i;
            this.addClass(indexOfMin, 'green')
            this.addClass(i, 'loop1');
            for (let j = i + 1; j < this.getListSize(); j++) {
                this.addClass(j, 'current')
                await this.sleep(this.deplay)

                if (this.elements[indexOfMin].value > this.elements[j].value) {
                    this.elements[indexOfMin].classList.remove('green')
                    this.addClass(j, 'green')
                    indexOfMin = j;
                }
                await this.sleep(this.deplay)
                this.removeClass(j, 'current');
                await this.sleep(this.deplay)

                if (!this.isRunning)
                    return;
            }
            this.swap(i, indexOfMin);
            this.removeClass(indexOfMin, 'green')
            this.removeClass(i, 'loop1');
            await this.sleep(this.deplay)


        }
        this.renderExcutionTime(performance.now() - start)
        this.isRunning = false;
    }

    async bubbleSort() {
        if (this.isRunning)
            return;
        this.isRunning = true;
        var start = performance.now();
        for (let i = 0; i < this.getListSize(); i++) {
            this.elements[i].classList.add('loop1');
            for (let j = 0; j < this.getListSize() - i - 1; j++) {

                this.addClass(j, 'current');
                await this.sleep(this.deplay)
                this.addClass(j + 1, 'green');
                await this.sleep(this.deplay)
                await this.sleep(this.deplay)


                if (this.elements[j].value > this.elements[j + 1].value) {
                    this.swap(j, j + 1)
                }
                this.removeClass(j + 1, 'green');
                await this.sleep(this.deplay)
                this.removeClass(j, 'current');


                if (!this.isRunning)
                    return;
            }
            this.elements[i].classList.remove('loop1');
            this.elements[this.getListSize() - i - 1].classList.remove('current');
        }
        this.renderExcutionTime(performance.now() - start)
        this.isRunning = false;
    }

    async insertionSort() {
        if (this.isRunning)
            return;
        this.isRunning = true;
        var start = performance.now();
        for (let i = 0; i < this.getListSize(); i++) {
            this.addClass(i, 'current');

            var temp = this.elements[i].value;
            this.elements[i].value = 0
            await this.sleep(this.deplay)
            var j = i;
            while (j > 0 && this.elements[j - 1].value > temp) {
                await this.sleep(this.deplay)
                this.swap(j, j - 1)
                j--;
            }
            this.setElementValue(j, temp)
            await this.sleep(this.deplay)
            this.removeClass(i, 'current');
            if (!this.isRunning)
                return;
        }
        this.renderExcutionTime(performance.now() - start)
        this.isRunning = false;
    }

    async quickSort() {
        if (this.isRunning)
            return;
        this.isRunning = true;
        var start = performance.now();
        await this._quickSort(0, this.getListSize() - 1)
        this.renderExcutionTime(performance.now() - start)
        this.isRunning = false;
    }

    async _quickSort(left, right) {
        if (left >= right)
            return;
        this.addClass(left, 'left')
        this.addClass(right, 'right')

        if (left + 1 == right) {
            if (this.elements[left].value > this.elements[right].value)
                this.swap(left, right);
            this.removeClass(left, 'left')
            this.removeClass(right, 'right')
            return;
        }

        var pivot = this.elements[right].value;
        var l = left;
        this.addClass(l, 'green')
        for (var i = left; i < right; i++) {
            if (!this.isRunning)
                return;
            this.addClass(i, 'current')
            if (this.elements[i].value <= pivot) {
                await this.sleep(this.deplay);
                this.swap(l, i);
                await this.sleep(this.deplay);
                this.removeClass(l, 'green')
                l++;
                await this.sleep(this.deplay);
                this.addClass(l, 'green')


            }
            await this.sleep(this.deplay);
            this.removeClass(i, 'current')
        }
        await this.sleep(this.deplay);
        this.removeClass(l, 'green')
        this.swap(right, l);
        this.removeClass(left, 'left');
        this.removeClass(right, 'right');
        await this._quickSort(left, l - 1)
        await this._quickSort(l + 1, right);
    }

    async _mergeSort(left, right) {
        if (left >= right) {
            return [this.elements[left].value];

        }

        var mid = Math.floor((left + right) / 2);
        var leftArr = await this._mergeSort(left, mid);
        var rightArr = await this._mergeSort(mid + 1, right);
        var tempArr = [];
        tempArr.length = leftArr.length + rightArr.length;
        var il = 0, ir = 0;
        this.addClass(left + il, 'green');
        this.addClass(left + il + leftArr.length, 'green');
        this.addClass(left, 'left-1')
        this.addClass(right, 'right-1')
        await this.sleep(this.deplay);
        for (var i = 0; i < tempArr.length; i++) {
            if (leftArr.length <= il) {
                this.removeClass(left + ir + leftArr.length, 'green');
                tempArr[i] = rightArr[ir++];
                if (ir < rightArr.length)
                    this.addClass(left + ir + leftArr.length, 'green');
                await this.sleep(this.deplay);
            } else if (rightArr.length <= ir) {
                this.removeClass(left + il, 'green');
                tempArr[i] = leftArr[il++];
                if (il < leftArr.length)
                    this.addClass(left + il, 'green');
                await this.sleep(this.deplay);



            } else {
                if (leftArr[il] < rightArr[ir]) {
                    this.removeClass(left + il, 'green');
                    tempArr[i] = leftArr[il++];
                    if (il < leftArr.length)
                        this.addClass(left + il, 'green');
                    await this.sleep(this.deplay);
                } else {
                    this.removeClass(left + ir + leftArr.length, 'green');
                    tempArr[i] = rightArr[ir++];
                    if (ir < rightArr.length)
                        this.addClass(left + ir + leftArr.length, 'green');
                    await this.sleep(this.deplay);
                }
            }
            if (!this.isRunning)
                return;

        }
        await this.sleep(this.deplay);

        for (var i = left; i <= right; i++) {
            this.setElementValue(i, tempArr[i - left]);
        }

        await this.sleep(this.deplay);

        this.removeClass(left, 'left-1')
        this.removeClass(right, 'right-1')
        return tempArr;
    }

    async mergeSort() {
        if (this.isRunning)
            return;
        var start = performance.now();

        this.isRunning = true;
        await this._mergeSort(0, this.getListSize() - 1);
        this.isRunning = false;
        this.renderExcutionTime(performance.now() - start)

    }

    handleEvent() {
        const _this = this;
        const startBtn = document.querySelector('#start-btn');
        const resetBtn = document.querySelector('#reset-btn');
        const compoundBtn = document.querySelector('#compound-btn');
        const listSizeInput = document.querySelector('#list-size');
        const rangeSize = document.querySelector('#range-size');
        const deplayInput = document.querySelector('#deplay');
        const rangeDeplay = document.querySelector('#range-deplay');
        const algorithmSelection = document.querySelector('#algorithm-select');
        const best = document.querySelector('#best-case');
        const average = document.querySelector('#average-case');
        const worest = document.querySelector('#worest-case');
        const frame = document.querySelector('#frame')


        window.onload = function () {
            if (window.innerWidth < 768) {
                _this.frameHeight = window.innerHeight * 0.75
                frame.style.height = _this.frameHeight + 'px'
                _this.unsort()
            }
        }

        startBtn.onclick = function () {
            // if (this.currentAlgorithm)
            _this.currentAlgorithm();

        }

        resetBtn.onclick = function () {

            _this.isRunning = false;
            _this.unsort()
        }

        compoundBtn.onclick = function () {
            _this.isRunning = false;
            _this.compound()
        }

        rangeSize.onchange = function () {
            var size = rangeSize.value;
            listSizeInput.value = size;
            _this.setListSize(size);
            resetBtn.click();

        }

        listSizeInput.onblur = function () {
            var size = listSizeInput.value;
            if (size >= 0 && size <= 2000)
                _this.setListSize(size);
            rangeSize.value = size;
            resetBtn.click();

        }

        listSizeInput.addEventListener("keypress", function (event) {
            if (event.key === "Enter") {
                event.preventDefault();
                listSizeInput.blur();
            }
        });


        // 
        // 
        rangeDeplay.onchange = function () {
            var deplay = rangeDeplay.value;
            deplayInput.value = deplay;
            _this.deplay = deplay;

        }

        deplayInput.onblur = function () {
            var deplay = deplayInput.value;
            if (deplay >= 0 && deplay <= 10000)
                _this.deplay = deplay;
            rangeDeplay.value = deplay;
        }

        deplayInput.addEventListener("keypress", function (event) {
            if (event.key === "Enter") {
                event.preventDefault();
                deplayInput.blur();
            }
        });



        algorithmSelection.onchange = function () {
            resetBtn.click()
            switch (algorithmSelection.value) {
                case 'ss': {
                    _this.currentAlgorithm = _this.selectionSort;
                    best.innerHTML = 'Best case: O( n<sup>2</sup> )'
                    average.innerHTML = 'Average case: O( n<sup>2</sup> )'
                    worest.innerHTML = 'Worest case: O( n<sup>2</sup> )'
                    break;
                }
                case 'bs': {
                    _this.currentAlgorithm = _this.bubbleSort;
                    best.innerHTML = 'Best case: O( n<sup>2</sup> )'
                    average.innerHTML = 'Average case: O( n<sup>2</sup> )'
                    worest.innerHTML = 'Worest case: O( n<sup>2</sup> )'
                    break
                }
                case 'is': {
                    _this.currentAlgorithm = _this.insertionSort;
                    best.innerHTML = 'Best case: O( n )'
                    average.innerHTML = 'Average case: O( n<sup>2</sup> )'
                    worest.innerHTML = 'Worest case: O( n<sup>2</sup> )'
                    break
                }
                case 'qs': {
                    _this.currentAlgorithm = _this.quickSort;
                    best.innerHTML = 'Best case: O( nlog(n) )'
                    average.innerHTML = 'Average case: O( nlog(n) )'
                    worest.innerHTML = 'Worest case: O( n<sup>2</sup> )'
                    break
                }
                case 'ms': {
                    _this.currentAlgorithm = _this.mergeSort;
                    best.innerHTML = 'Best case: O( nlog(n) )'
                    average.innerHTML = 'Average case: O( nlog(n) )'
                    worest.innerHTML = 'Worest case: O( nlog(n) )'
                }
            }
        }
    }
}

new App()
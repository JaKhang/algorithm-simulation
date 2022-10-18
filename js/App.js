import elements from './Element.js'

class App {
    constructor(elements) {
        this.renderUI();
        this.elements = elements;
        this.deplay = 0;
        this.isRunning = false;
        this.algorithms = {}
    }

    run() {
        this.elements.setListSize(50);
        this.elements.random();
        this.currentAlgorithm = this.algorithms['ss'].sort;
        this.renderTimeComplexity('ss');
        this.handleEvent();
    }

    renderUI() {
        document.querySelector("#root").innerHTML = `
        <div id="header">
            <h2 class="logo">Algorithm</h2>
            <div class="header-control">
                <div class="header-group"><label for="algorithm">Algorithm</label><br>
                    <select name="algorithm" id="algorithm-select" class="input-feild"></select>
                </div>

                <div class="header-group">
                    <label for="deplay">Deplay</label><br>
                    <input type="number" placeholder="ms" name="deplay" class="input-feild" step="100" value="15"
                        id="deplay">
                    <div class="range-group"><label for="">15</label>
                        <input type="range" class="range-input" name="range-deplay" id="range-deplay" step="5" min="15"
                            value="15" max="1000">
                        <label for="">1000</label>
                    </div>

                </div>

                <div class="header-group">
                    <label for="list-size">List size</label><br>
                    <input type="number" placeholder="" name="list-size" id="list-size" class="input-feild" value="50">
                    <div class="range-group">
                        <label for="">1</label>
                        <input type="range" class="range-input" name="range-size" id="range-size" step="1" max="2000"
                            min="1" value="50">
                        <label for="">2000</label>
                    </div>
                </div>

                <div class="header-group">
                    <button class="btn" id="start-btn">Start</button>
                    <button class="btn" id="reset-btn">Reset</button>
                    <button class="btn" id="random-btn">Random</button>
                    <button class="btn" id="custom-btn">Custom</button>
                </div>

            </div>
        </div>
        <div id="info">
            <h2 class="info-header">Time complexity</h2>
            <div class="info-body">
                <h3 id="best-case">Best case: O( n<sup>2</sup> )</h3>
                <h3 id="average-case">Average case: O( n<sup>2</sup> )</h3>
                <h3 id="worest-case">Worest case: O( n<sup>2</sup> )</h3>
                <h3 id="execution-time">Execution time: </h3>
            </div>
        </div>

        <div id="frame"></div>

        <div id="modal" class="hide">
            <div id="overlay"></div>
            <div id="input-modal" class="">
                <input type="text" class="input-feild" id="list-input" placeholder="Enter elements ( 9 12 3 29 10 )">
                <button class="btn" id="submit-btn">Create</button>
                <button class="btn" id="cancel-btn">Cancel</button>
            </div>
        </div>
        
        `
    }

    renderExcutionTime(time) {
        if (isNaN(time))
            document.querySelector("#execution-time").innerHTML = 'Execution time : ' + time;
        else if (this.deplay == 0)
            document.querySelector("#execution-time").innerHTML = 'Execution time : ' + Math.floor(time) + ' ms';
    }

    sleep(ms) {
        return new Promise(resolve => setTimeout(resolve, ms));
    }

    addAlgorithm(id, algorithm) {
        if (id && algorithm) {
            this.algorithms[id] = algorithm;
            var optionElement = document.createElement('option');
            optionElement.innerText = algorithm.title;
            optionElement.value = id;
            document.querySelector('#algorithm-select').appendChild(optionElement);
        }

    }

    renderTimeComplexity(id) {
        const best = document.querySelector('#best-case');
        const average = document.querySelector('#average-case');
        const worest = document.querySelector('#worest-case');
        const frame = document.querySelector('#frame')
        best.innerHTML = `Best case: ${this.algorithms[id].best}`
        average.innerHTML = `Average case: ${this.algorithms[id].average}`
        worest.innerHTML = `Worest case: ${this.algorithms[id].worest}`
    }


    handleEvent() {
        const _this = this;
        const startBtn = document.querySelector('#start-btn');
        const resetBtn = document.querySelector('#reset-btn');
        const compoundBtn = document.querySelector('#random-btn');
        const listSizeInput = document.querySelector('#list-size');
        const rangeSize = document.querySelector('#range-size');
        const deplayInput = document.querySelector('#deplay');
        const rangeDeplay = document.querySelector('#range-deplay');
        const algorithmSelection = document.querySelector('#algorithm-select');
        const modalCancelBtn = document.querySelector('#cancel-btn');
        const modal = document.querySelector('#modal');
        const listInput = document.querySelector('#list-input');
        const modalSubmit = document.querySelector('#submit-btn');
        const customBtn = document.querySelector('#custom-btn')


        window.onload = function () {
            if (window.innerWidth < 768) {
                _this.elements.frameHeight = window.innerHeight * 0.75
                frame.style.height = _this.elements.frameHeight + 'px'
                _this.elements.unsort()
            }
        }

        startBtn.onclick = function () {
            _this.currentAlgorithm(elements)

        }

        resetBtn.onclick = function () {
            _this.isRunning = false;
            _this.elements.unsort()
        }

        compoundBtn.onclick = function () {
            _this.isRunning = false;
            _this.elements.random()
        }

        rangeSize.onchange = function () {
            var size = rangeSize.value;
            listSizeInput.value = size;
            _this.elements.setListSize(size);
            resetBtn.click();

        }

        listSizeInput.onblur = function () {
            var size = listSizeInput.value;
            if (size > 1 && size <= 2000)
                _this.elements.setListSize(size);
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
            _this.deplay = deplay - 15;

        }

        deplayInput.onblur = function () {
            var deplay = deplayInput.value;
            if (deplay >= 0 && deplay <= 10000)
                _this.deplay = deplay - 15;
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
            var value = algorithmSelection.value;
            _this.renderTimeComplexity(value);
            _this.currentAlgorithm = _this.algorithms[value].sort;

        }

        modalCancelBtn.onclick = () => {
            modal.classList.add('hide')
        }

        modalSubmit.onclick = () => {
            var string = listInput.value;
            if (!string)
                return;
            this.elements.setCustomList(string);
            rangeSize.value = _this.elements.getListSize();
            listSizeInput.value = _this.elements.getListSize();
            resetBtn.click();

            modal.classList.add('hide')
            console.log('hi')
        }

        listInput.addEventListener("keypress", function (event) {
            if (event.key === "Enter") {
                event.preventDefault();
                modalSubmit.click();
            }
        });

        customBtn.onclick = () => {
            modal.classList.remove('hide')
        }
    }
}
export default new App(elements);

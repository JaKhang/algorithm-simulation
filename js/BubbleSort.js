class BubbleSort {
    constructor() {
        this.title = "Bubble sort"
        this.best = 'O( n<sup>2</sup> )'
        this.average = 'O( n<sup>2</sup> )'
        this.worest = 'O( n<sup>2</sup> )'
    }
    async sort(elements) {
        if (this.isRunning)
            return;
        this.isRunning = true;
        var start = performance.now();
        for (let i = 0; i < elements.getListSize() - 1; i++) {
            elements.addClass(i, 'loop-1')
            for (let j = 0; j < elements.getListSize() - i - 1; j++) {

                elements.addClass(j, 'current');
                await this.sleep(this.deplay)
                elements.addClass(j + 1, 'green');
                await this.sleep(this.deplay)
                await this.sleep(this.deplay)


                if (elements.getValue(j) > elements.getValue(j + 1)) {
                    elements.swap(j, j + 1)
                }
                elements.removeClass(j + 1, 'green');
                await this.sleep(this.deplay)
                elements.removeClass(j, 'current');


                if (!this.isRunning)
                    return;
            }
            elements.removeClass(i, 'loop-1')
            elements.removeClass(elements.getListSize() - i - 1, 'current');
        }
        this.isRunning = false;
        this.renderExcutionTime(performance.now() - start)

    }

}

export default new BubbleSort();
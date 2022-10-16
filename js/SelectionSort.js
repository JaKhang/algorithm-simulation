class SelectionSort {
    constructor() {
        this.title = "Selection sort"
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
            var indexOfMin = i;
            await this.sleep(this.deplay);
            elements.addClass(indexOfMin, 'green')
            elements.addClass(i, 'loop1');
            for (let j = i + 1; j < elements.getListSize(); j++) {

                elements.addClass(j, 'current')
                await this.sleep(this.deplay)// sleep

                if (elements.getValue(indexOfMin) > elements.getValue(j)) {
                    elements.removeClass(indexOfMin, 'green')
                    elements.addClass(j, 'green')
                    indexOfMin = j;
                }
                await this.sleep(this.deplay) // sleep
                elements.removeClass(j, 'current');
                await this.sleep(this.deplay) // sleep
                if (!this.isRunning)
                    return;
            }
            elements.swap(i, indexOfMin);
            elements.removeClass(indexOfMin, 'green')
            elements.removeClass(i, 'loop1');
            await this.sleep(this.deplay)
        }
        this.isRunning = false;
        this.renderExcutionTime(performance.now() - start)
    }
}

export default new SelectionSort();
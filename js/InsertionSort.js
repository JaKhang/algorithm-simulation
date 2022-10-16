class InsertionSort {
    constructor() {
        this.title = "Insertion sort"
        this.best = 'O( n )'
        this.average = 'O( n<sup>2</sup> )'
        this.worest = 'O( n<sup>2</sup> )'
    }
    async sort(elements) {
        if (this.isRunning)
            return;
        this.isRunning = true;
        var start = performance.now();
        for (let i = 0; i < elements.getListSize(); i++) {
            elements.addClass(i, 'current');

            var temp = elements.getValue(i);
            elements.setValue(i, 0);
            await this.sleep(this.deplay)// sleep
            var j = i;

            while (j > 0 && elements.getValue(j - 1) > temp) {
                await this.sleep(this.deplay) //sleep
                await this.sleep(this.deplay)//sleep
                elements.swap(j, j - 1)
                await this.sleep(this.deplay)//sleep
                j--;
            }
            elements.setValue(j, temp)
            await this.sleep(this.deplay)//sleep
            elements.removeClass(i, 'current');
            if (!this.isRunning)
                return;

        }
        this.renderExcutionTime(performance.now() - start)
        this.isRunning = false;

    }
}

export default new InsertionSort();
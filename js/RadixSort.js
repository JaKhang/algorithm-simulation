class RadixSort {
    constructor() {
        this.title = "Radix sort (LSD)"
        this.best = 'O( n + k )'
        this.average = 'O( n + k )'
        this.worest = 'O( n + k )'
    }
    async sort(elements) {
        if (!this.countSort) {
            this.countSort = async function (elements, exp) {
                let n = elements.getListSize()
                let output = new Array(n); // output array
                let i;
                let count = new Array(10);
                for (let i = 0; i < 10; i++)
                    count[i] = 0

                for (i = 0; i < n; i++) {
                    count[Math.floor(elements.getValue(i) / exp) % 10]++;
                    elements.addClass(i, 'green')
                    await this.sleep(this.deplay);
                    await this.sleep(this.deplay);
                    await this.sleep(this.deplay);
                    elements.removeClass(i, 'green')
                }

                for (i = 1; i < 10; i++)
                    count[i] += count[i - 1];

                for (i = n - 1; i >= 0; i--) {
                    output[count[Math.floor(elements.getValue(i) / exp) % 10] - 1] = elements.getValue(i);
                    count[Math.floor(elements.getValue(i) / exp) % 10]--;

                }
                var temp = Math.floor((n - 1) / 4);
                this.copyElement(0, temp, output)
                this.copyElement(temp + 1, 2 * temp, output)
                this.copyElement(2 * temp + 1, 3 * temp, output)
                await this.copyElement(3 * temp + 1, n - 1, output)


            }

            this.copyElement = async function (start, end, output) {
                for (let i = start; i <= end; i++) {
                    if (!this.isRunning)
                        return;
                    elements.addClass(i, 'current')
                    await this.sleep(this.deplay);
                    await this.sleep(this.deplay);
                    await this.sleep(this.deplay);
                    elements.setValue(i, output[i]);
                    elements.removeClass(i, 'current')
                }
            }
        }

        if (this.isRunning)
            return;
        this.isRunning = true;
        var start = performance.now();
        let max = elements.getMaxValue();
        for (let exp = 1; Math.floor(max / exp) > 0; exp *= 10) {
            await this.countSort(elements, exp);
            await this.sleep(this.deplay);
        }
        this.isRunning = false;
        this.renderExcutionTime(performance.now() - start)

    }
}

export default new RadixSort()

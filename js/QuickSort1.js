class QuickSort1 {
    constructor() {
        this.title = "Quick sort (right pivot)"
        this.best = 'O( nlog(n) )'
        this.average = 'O( nlog(n) )'
        this.worest = 'O( n<sup>2</sup> )'
    }

    async sort(elements) {
        if (!this._quickSort1)
            this._quickSort1 = async function (left, right, elements) {
                if (left >= right)
                    return;
                elements.addClass(left, 'left')
                elements.addClass(right, 'right')
                if (left + 1 == right) {
                    if (elements.getValue(left) > elements.getValue(right))
                        elements.swap(left, right);
                    elements.removeClass(left, 'left')
                    elements.removeClass(right, 'right')
                    return;
                }
                var pivot = elements.getValue(right);
                await this.sleep(this.deplay);
                elements.addClass(right, 'pivot');
                var l = left;
                elements.addClass(l, 'green')
                for (var i = left; i < right; i++) {
                    if (!this.isRunning)
                        return;
                    elements.addClass(i, 'current')
                    if (elements.getValue(i) <= pivot) {
                        await this.sleep(this.deplay);
                        elements.swap(l, i);
                        await this.sleep(this.deplay);
                        elements.removeClass(l, 'green')
                        l++;
                        elements.addClass(l, 'green')


                    } else {
                        await this.sleep(this.deplay);
                        await this.sleep(this.deplay);
                    }
                    await this.sleep(this.deplay);
                    elements.removeClass(i, 'current')

                }
                await this.sleep(this.deplay);
                elements.removeClass(l, 'green')
                elements.removeClass(right, 'pivot');
                elements.swap(right, l);
                elements.removeClass(left, 'left');
                elements.removeClass(right, 'right');
                await this._quickSort1(left, l - 1, elements)
                await this._quickSort1(l + 1, right, elements);
            }

        // run
        if (this.isRunning)
            return;
        this.isRunning = true;
        var start = performance.now();
        await this._quickSort1(0, elements.getListSize() - 1, elements)
        this.renderExcutionTime(performance.now() - start)
        this.isRunning = false;
    }

}

export default new QuickSort1()

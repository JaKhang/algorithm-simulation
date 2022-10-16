class QuickSort3 {
    constructor() {
        this.title = "Quick sort (Random pivot)"
        this.best = 'O( nlog(n) )'
        this.average = 'O( nlog(n) )'
        this.worest = 'O( n<sup>2</sup> )'
    }

    async sort(elements) {

        if (!this._quickSort3) {
            this._quickSort3 = async function (left, right, elements) {
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
                var pivot = this.getRandomPivot(left, right);
                await this.sleep(this.deplay);
                elements.addClass(pivot, 'pivot');
                var l = left;
                elements.addClass(l, 'green')
                for (var i = left; i <= right; i++) {
                    if (!this.isRunning)
                        return;
                    elements.addClass(i, 'current')
                    if (elements.getValue(i) < elements.getValue(pivot)) {
                        await this.sleep(this.deplay);
                        if (pivot == l) {
                            elements.removeClass(pivot, 'pivot')
                            pivot = i;
                            elements.addClass(pivot, 'pivot');
                        }
                        elements.swap(l, i);
                        elements.removeClass(l, 'green')
                        await this.sleep(this.deplay);
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
                elements.removeClass(pivot, 'pivot');
                elements.swap(pivot, l);
                elements.removeClass(left, 'left');
                elements.removeClass(right, 'right');
                await this._quickSort3(left, l - 1, elements)
                await this._quickSort3(l + 1, right, elements);
            }

            this.getRandomPivot = function (left, right) {
                return Math.floor(Math.random() * (right - left)) + left;
            }
        }


        // run
        if (this.isRunning)
            return;
        this.isRunning = true;
        var start = performance.now();
        await this._quickSort3(0, elements.getListSize() - 1, elements)
        this.renderExcutionTime(performance.now() - start)
        this.isRunning = false;
    }

}

export default new QuickSort3()
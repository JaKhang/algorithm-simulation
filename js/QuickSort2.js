class QuickSort2 {
    constructor() {
        this.title = "Quick sort (median pivot)"
        this.best = 'O( nlog(n) )'
        this.average = 'O( nlog(n) )'
        this.worest = 'O( n<sup>2</sup> )'
    }

    async sort(elements) {

        if (!this._quickSort2) {
            this._quickSort2 = async function (left, right, elements) {
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
                var pivot = this.getMedian(left, right, elements);
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
                await this._quickSort2(left, l - 1, elements)
                await this._quickSort2(l + 1, right, elements);
            }

            this.getMedian = function (left, right, elements) {
                var mid = Math.floor((left + right) / 2);
                var x = elements.getValue(left) - elements.getValue(mid);
                var y = elements.getValue(mid) - elements.getValue(right);
                var z = elements.getValue(left) - elements.getValue(right);

                if (x * y > 0)
                    return mid;
                if (x * z > 0)
                    return right;
                return left;
            }
        }


        // run
        if (this.isRunning)
            return;
        this.isRunning = true;
        var start = performance.now();
        await this._quickSort2(0, elements.getListSize() - 1, elements)
        this.renderExcutionTime(performance.now() - start)
        this.isRunning = false;
    }

}

export default new QuickSort2()
class MergeSort {
    constructor() {
        this.title = "Merge sort"
        this.best = 'O( nlog(n) )'
        this.average = 'O( nlog(n) )'
        this.worest = 'O( nlog(n) )'
    }
    async sort(elements) {
        if (!this._mergeSort)
            this._mergeSort = async function (left, right, elements) {
                if (left >= right) {
                    return [elements.getValue(left)];

                }
                var mid = Math.floor((left + right) / 2);
                var leftArr = await this._mergeSort(left, mid, elements);
                var rightArr = await this._mergeSort(mid + 1, right, elements);
                var tempArr = [];
                tempArr.length = leftArr.length + rightArr.length;
                var il = 0, ir = 0;
                elements.addClass(left + il, 'green');
                elements.addClass(left + il + leftArr.length, 'green');
                elements.addClass(left, 'left')
                elements.addClass(right, 'right')
                await this.sleep(this.deplay);
                for (var i = 0; i < tempArr.length; i++) {

                    await this.sleep(this.deplay);
                    if (leftArr.length <= il) {
                        elements.removeClass(left + ir + leftArr.length, 'green');
                        tempArr[i] = rightArr[ir++];
                        if (ir < rightArr.length)
                            elements.addClass(left + ir + leftArr.length, 'green');
                        await this.sleep(this.deplay);
                    } else if (rightArr.length <= ir) {
                        elements.removeClass(left + il, 'green');
                        tempArr[i] = leftArr[il++];
                        if (il < leftArr.length)
                            elements.addClass(left + il, 'green');
                        await this.sleep(this.deplay);



                    } else {
                        if (leftArr[il] < rightArr[ir]) {
                            elements.removeClass(left + il, 'green');
                            tempArr[i] = leftArr[il++];
                            if (il < leftArr.length)
                                elements.addClass(left + il, 'green');
                            await this.sleep(this.deplay);
                        } else {
                            elements.removeClass(left + ir + leftArr.length, 'green');
                            tempArr[i] = rightArr[ir++];
                            if (ir < rightArr.length)
                                elements.addClass(left + ir + leftArr.length, 'green');
                            await this.sleep(this.deplay);
                        }
                    }
                    if (!this.isRunning)
                        return;
                    await this.sleep(this.deplay);
                }
                await this.sleep(this.deplay);
                for (var i = left; i <= right; i++) {
                    elements.setValue(i, tempArr[i - left]);
                }
                await this.sleep(this.deplay);
                elements.removeClass(left, 'left')
                elements.removeClass(right, 'right')
                return tempArr;
            }

        if (this.isRunning)
            return;
        this.isRunning = true;
        var start = performance.now();
        await this._mergeSort(0, elements.getListSize() - 1, elements);
        this.renderExcutionTime(performance.now() - start)

        this.isRunning = false;

    }
}

export default new MergeSort();
export interface LessComp<T> {
    (a: T, b: T): boolean
}

export class BinaryHeap<T> {
    indexMap = new Map<T, number>()
    arr = Array<T>()

    constructor(public less: LessComp<T>, vals?: T[]) {
        if (vals != null) { this.buildHeap(vals) }
    }

    add(element: T) {
        this.arr.push(element)
        this.indexMap.set(element, this.arr.length - 1)
        this.upHeap(this.arr.length - 1)
    }

    pop(index?: number) {
        if (index == null) { index = 0 }
        if (index >= this.arr.length) { return null }

        const retVal = this.arr[index]
        this.indexMap.delete(retVal)
        const poppedVal = this.arr.pop()

        if (poppedVal == null) { throw new Error('unreachable!') }

        if (this.arr.length !== index) { // last element was different from element to pop

            this.arr[index] = poppedVal
            this.indexMap.set(this.arr[index], index)

            this.downHeap(index)

            if (index > 0) {
                this.upHeap(index)
            }
        }

        return retVal
    }

    peek() {
        if (this.arr.length === 0) { return null }

        return this.arr[0]
    }

    get size() {
        return this.arr.length
    }

    delete(element: T) {
        if (!this.indexMap.has(element)) { return }

        const index = this.indexMap.get(element)

        this.pop(index)
    }

    private upHeap(i: number) {
        const val = this.arr[i]
        while (i > 0) {
            const parent = (i - 1) >> 1
            const pVal = this.arr[parent]

            if (!this.less(val, pVal)) { break }

            this.arr[i] = pVal
            this.indexMap.set(pVal, i)
            i = parent
        }
        this.arr[i] = val
        this.indexMap.set(val, i)
    }

    private downHeap(i: number) {
        const size = this.arr.length
        const hsize = size >> 1
        const ai = this.arr[i]

        while (i < hsize) {
            const l = (i << 1) + 1
            const r = l + 1

            let mc = l // min-child
            let mcVal = this.arr[l]

            if (r < size && this.less(this.arr[r], mcVal)) {
                mc = r
                mcVal = this.arr[r]
            }

            if (!this.less(mcVal, ai)) { break }

            this.arr[i] = mcVal
            this.indexMap.set(mcVal, i)
            i = mc
        }

        this.arr[i] = ai
        this.indexMap.set(ai, i)
    }

    private buildHeap(vals: T[]) {
        for (let i = 0; i < vals.length; i++) {
            this.add(vals[i])
        }
    }
}

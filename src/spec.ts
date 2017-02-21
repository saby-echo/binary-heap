import test from 'ava'
import { BinaryHeap } from './index'

const minComp = (a: number, b: number) => a < b

test('heap:init', t => {

    const vals = [5, 6, 3, 2, 7, 10, 20]

    const heap = new BinaryHeap(minComp, vals)

    t.deepEqual(heap.arr, [2, 3, 5, 6, 7, 10, 20])
    t.deepEqual([...heap.indexMap].sort((a, b) => a[1] - b[1]), [[2, 0], [3, 1], [5, 2], [6, 3], [7, 4], [10, 5], [20, 6]])
})

test('heap:pop-0', t => {
    const vals = [5, 6, 3, 2, 7, 10, 20]

    const heap = new BinaryHeap(minComp, vals)

    heap.pop()

    t.deepEqual(heap.arr, [3, 6, 5, 20, 7, 10])
    t.deepEqual([...heap.indexMap].sort((a, b) => a[1] - b[1]), [[3, 0], [6, 1], [5, 2], [20, 3], [7, 4], [10, 5]])
})

test('heap:pop-edge-cases', t => {
    const heap = new BinaryHeap(minComp, [1])

    t.deepEqual(heap.pop(), 1)

    t.deepEqual(heap.size, 0)
    t.deepEqual(heap.arr, [])
    t.deepEqual(heap.indexMap.size, 0)

    heap.add(3)
    heap.add(1)

    t.deepEqual(heap.pop(1), 3)

    t.deepEqual(heap.size, 1)
    t.deepEqual(heap.arr, [1])
    t.deepEqual(heap.indexMap.size, 1)
})

test('heap:pop-n', t => {
    const vals = [1, 6, 2, 7, 8, 3, 4]

    const heap = new BinaryHeap(minComp, vals)

    heap.pop(3)

    t.deepEqual(heap.arr, [1, 4, 2, 6, 8, 3])
    t.deepEqual([...heap.indexMap].sort((a, b) => a[1] - b[1]), [[1, 0], [4, 1], [2, 2], [6, 3], [8, 4], [3, 5]])
})

test('heap:all-ops', t => {

    const heap = new BinaryHeap(minComp)

    t.deepEqual(heap.size, 0)
    t.true(heap.peek() == null)
    t.true(heap.pop() == null)

    heap.add(1)

    t.deepEqual(heap.size, 1)
    t.deepEqual(heap.peek(), 1)
    t.deepEqual(heap.pop(), 1)
    t.true(heap.peek() == null)

    heap.add(5)
    heap.add(4)
    heap.add(2)
    heap.add(7)
    heap.add(6)
    heap.add(1)

    t.deepEqual(heap.size, 6)
    t.deepEqual(heap.peek(), 1)
    t.deepEqual(heap.pop(), 1)
    t.deepEqual(heap.size, 5)
    t.deepEqual(heap.peek(), 2)
    t.deepEqual(heap.pop(), 2)
    t.deepEqual(heap.size, 4)

    heap.add(1)

    t.deepEqual(heap.size, 5)
    t.deepEqual(heap.peek(), 1)
    t.deepEqual(heap.pop(), 1)
    t.deepEqual(heap.size, 4)
    t.deepEqual(heap.peek(), 4)
    t.deepEqual(heap.pop(), 4)
    t.deepEqual(heap.size, 3)
    t.deepEqual(heap.peek(), 5)
    t.deepEqual(heap.size, 3)
    t.deepEqual(heap.pop(), 5)
    t.deepEqual(heap.size, 2)
    t.deepEqual(heap.peek(), 6)
    t.deepEqual(heap.size, 2)
    t.deepEqual(heap.pop(), 6)
    t.deepEqual(heap.size, 1)
    t.deepEqual(heap.peek(), 7)
    t.deepEqual(heap.pop(), 7)
    t.deepEqual(heap.size, 0)
})

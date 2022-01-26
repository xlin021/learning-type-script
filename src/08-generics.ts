export {}

// 生成指定长度的数组
function createNumberArray(length: number, value: number): number[] {
  // Array 其实是一个 any 类型，可以在使用时指定需要的类型
  const arr = Array<number>(length).fill(value)
  return arr
}

// const res = createNumberArray(3, 100)
// => res => [100, 100, 100]

function createArray<T> (length: number, value: T): T[] {
  const arr = Array<T>(length).fill(value)
  return arr
}

const res = createArray<string>(3, '100')
// => res => [100, 100, 100]
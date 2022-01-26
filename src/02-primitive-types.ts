export {}
/**
 * 原始数据类型
 */

const a: string = 'foobar'

const b: number = 100 // 包括 NaN Infinity

const c: boolean = true // false

// const d: string = null

// TypeScript 中以上三种类型在非严格模式下默认允许为空，即可以赋值为 null undefined

const e: void = undefined // 通值，一般在函数没有返回值的时候标记函数的类型，只能存放 null undefined，严格模式下只能是 undefined

const f: null = null

const g: undefined = undefined

// ES2015中新增的 symbol 类型的值，直接使用会提示错误
// ts 有内置类型，配置文件中的 target 属性，其实已经指定了 对应的配置文件
// target配置 es5，即指定的其实是 es5 的内置类型， symbol 类型是 es2015 中的，不在 es5 中，类似的 Promise 也不在 es5 中
// 解决方案
// 1.target 使用 es2015
// 2.target 使用 es5 , 配置 lib 指定引入的标准库 "ES2015"
// 使用方案 2 时， console 会报错，原理同 symbol 报错一样，需要在lib中引入 BOM 和 DOM 标准库----"DOM","DOM" 包含 BOM 和 DOM
const h: symbol = Symbol() // 内置类型

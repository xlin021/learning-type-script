
## 快速上手
- 初始化项目
  `yarn init -y`
- 安装 typescript
  - 可全局安装，此处安装为开发依赖
  `yarn add typescript --dev`
- 编写 .ts 文件
  ```ts
    // 01-getting-started.ts
    const hello = (name: string) => {
      console.log(`Hello ,${name}`);
    }

    hello('TypeScript')
  ```
- 编译 .ts 文件
  `yarn tsc 01-getting-started.ts`
  
## 配置文件
- 生成配置文件
  执行 `yarn tsc -init` 生成配置文件 tsconfig.json
- 配置文件示例
  tsconfig.json
  ```js
    {
      "compilerOptions":{
        "target": "es5", // 编译后的es版本 eg: es5  es2015
        "module": "commonjs", // 使用模块规范
        "rootDir": "src", // 编译入口文件夹
        "sourceMap": true, // 是否开启sourceMap
        "outDir": "dist", // 编译后的出口文件夹
        "strict": true, // 是否开启严格模式，开启后需要为每个变量设置类型， any 类型也需要添加
      }
    }
  ```
- 新建 src 文件夹，将 .ts 文件添加到该文件夹下，进行编译
`yarn tsc`

> 注意：配置文件 tsconfig.json 只对指定入口文件夹下的文件进行编译

## 原始类型

  ```ts
    const a: string = 'foobar'

    const b: number = 100 // 包括 NaN Infinity

    const c: boolean = true // false

    // const d: string = null
  ```
  > TypeScript 中以上三种类型在非严格模式下默认允许为空，即可以赋值为 null undefined

  ```ts
    const e: void = undefined // 通值，一般在函数没有返回值的时候标记函数的类型，只能存放 null undefined，严格模式下只能是 undefined

    const f: null = null

    const g: undefined = undefined
  ```

## 标准库声明
- ES2015中新增的 symbol 类型的值，直接使用会提示错误
  - ts 有内置类型，配置文件中的 target 属性，其实已经指定了 对应的配置文件
  - target配置 es5，即指定的其实是 es5 的内置类型， symbol 类型是 es2015 中的，不在 es5 中，类似的 Promise 也不在 es5 中
- 解决方案
  - 1.target 使用 es2015
  - 2.target 使用 es5 , 配置 lib 指定引入的标准库 "ES2015"
- 使用方案 2 时， console 会报错，原理同 symbol 报错一样，需要在lib中引入 BOM 和 DOM 标准库----"DOM","DOM" 包含 BOM 和 DOM

  ```ts
    const h: symbol = Symbol()
  ```

## 中文错误消息
- TypeScript 本身支持多语言化的错误消息，默认会根据开发系统和开发工具语言的设置选择报错的语言
  - 如果使用开发工具使用的是英文版的，需要报错提示为中文版本
  - 使用 tsc 命令时添加参数 `--locale zh-CN`
- vscode中的错误消息可以在vscode的配置选项中进行配置
  - 设置中搜索 typescript locale ，配置TypeScript: locale 为 zh_CN

> 不推荐使用中文错误，不利于搜索问题

## 作用域问题
- 不同文件中有相同变量名，在同一作用域中会报错
  - 创建单独作用域，例如使用立即执行函数
  ```ts
    (function () {
      const a: number = 123
    })()
  ```
  - 使用 ESModule 导出变量，此时文件中的变量就会变成局部作用域的变量
  ```ts
    export {}
  ```
> export 只是 ESModule 的语法，并不是导出了一个空对象

## TypeScript Object 类型
- TypeScript 中的 Object 并不单指普通的对象类型，泛指所有的非原始类型，对象、数组、函数

  ```ts
    export {} // 确保与其他示例没有冲突

    const foo: object = function () {} // [] // {}
  ```


- 如果只要普通对象类型，需要使用类似字面量语法，标记类型
  ```ts
    const obj: { foo: number } = { foo: 123 }
  ```

- 标记多个类型，可以用逗号分隔
这里要求赋值的类型结构必须与定义的类型结构完全一致，不能多或少
  ```ts
    const obj2: { foo: number, bar: string } = { foo: 123, bar: 'string' }
  ```

> 限制对象应该使用接口

## TypeScript 数组类型
- 定义数组的方式
  - 使用 Array 泛型
  ```ts
    const arr1: Array<number> = [1, 2, 3]
  ```

  - 使用元素类型 + []
  ```ts
    const arr2: number[] = [1, 2, 3]
  ```
- 示例
  ```ts
    function sum (...args: number[]) {
      // 判断是不是每个成员都是数字
      return args.reduce((prev, current) => prev + current, 0)
    }

    // 调用时使用非数字数组会报错
    sum(1, 2 , 3, 'foo')
  ```

## TypeScript 元组类型
元组类型是一种特殊的数据结构
- 元组其实是一个明确元素数量及元素类型的数组
  - 各个元素的类型不必完全相同，在 ts 中可以使用类似数组字面量的语法定义元组类型
  ```ts
    const tuple: [number, string] = [1, 'string']
  ```

- 访问元组中的某个元素
  - 使用数组下标的方式访问
  ```ts
    const age = tuple[0]
    const name = tuple[1]
  ```
  - 使用数组结构的方式访问
  ```ts
    const [age, name] = tuple
  ```

> - 元组一般用在一个函数中返回多个返回值，这种类型现在越来越常见
>   - react 中 useState 的 HOOK函数中返回的就是一个元组
>   - es2017 中 Object.entries 方法，获取一个对象中所有的键值数组，得到的每一个键值，就是一个元组，因为它是一个固定长度的

## TypeScript 枚举类型
枚举（Enum）
- 枚举的特点
  - 为一组数值定义更容易理解的名称
  - 一个枚举中只会存在几个固定的值，不会出现超出范围的可能性
- 枚举在其他语言中是很常见的数据结构，但是在 js 中没有这种类型，很多时候都是通过对象模拟实现枚举
  ```js
    const PostStatus = {
      Draft: 0,
      Unpublished: 1,
      Published: 2
    }
    const post = {
      title: 'title',
      content: 'content',
      status: PostStatus.Draft
    }
  ```
- ts 中有专门的枚举类型
  ```ts
    enum PostStatus {
      Draft = 0,
      Unpublished = 1,
      Published = 2
    }
    const post = {
      title: 'title',
      content: 'content',
      status: PostStatus.Draft
    }
  ```
> 枚举类型的值可以不用 = 指定，如果不指定默认从0累加，如果给第一个设置了值，后面的依次累加
> 除了可以设置数字，还可以是字符串，字符串无法自增长，所以字符串需要手动为每个类型赋值

- 注意：
- 枚举类型会入侵到运行时的代码，即会影响编译后的结果
  - 我们在 TypeScript 中使用的大多数类型经过编译转换后都会被移除，这些类型只是为了在编译过程中做类型检查
- 枚举不会被移除，而是会被编译为一个双向的键值对对象
  - 双向键值对，就是可以通过键获取值，也可以通过值获取键
  - 这样做的目的其实是为了可以动态的通过枚举的值获取到键
  ```ts
    PostStatus[0] // Draft
  ```
  - 如果确认代码中不会使用索引器的方式访问枚举，建议使用常量枚举
  ```ts
    const enum PostStatus {
      Draft = 0,
      Unpublished = 1,
      Published = 2
    }
  ```

## TypeScript 函数类型
函数的类型约束，即是指对函数的输入输出进行类型限制
- 函数声明
  - 入参的类型注解添加在每个入参的后面，出参类型在入参的括号后进行添加
  ```ts
    function func1 (a: number, b: number): string {
      return ''
    }
  ```
  - 调用函数时，参数的个数也必须完全相同，即形参和实参必须完全一致
  ```ts
    func1(100, 200)
  ```
  - 如果需要某个参数是可选的，可以使用可选参数的特性，也可以使用 es6 新增的参数默认值属性
  ```ts
    function func1 (a: number, b?: number): string {
      return ''
    }

    function func2 (a: number, b: number = 10): string {
      return ''
    }
  ```
  > 无论是可选参数，还是默认参数，都需要出现在参数列表的最后，因为参数会按照位置进行传递
  - 如果需要使用任意参数个数，可以使用 es6 的 ...rest 操作符
  ```ts
    function func2 (a: number, b: number = 10, ...rest): string {
      return ''
    }
  ```

- 函数表达式
  - 这里的函数表达式最终是存入一个变量中，接收这个函数的变量也应该有类型
  - 一般情况下，TypeScript 可以根据函数表达式推断出这个变量的类型
  - 如果把一个函数作为参数传递（回调函数），这种情况下必须要对这个形参的类型进行约束，这种情况下，可以使用箭头函数的形式表示这个参数可以接受什么样的函数
  ```ts
    const func2 = function func2 (a: number, b: number): string {
      return ''
    }
  ```


## TypeScript 任意类型
- 由于 JS 是弱类型语言，很多内置的 API 本身就支持任意类型的参数
- TS 是基于 JS 类型之上的，使用过程中难免遇到需要任意类型的参数
- 此时可以使用 any 类型
  - any 类型仍然属于动态类型
  - 它的特点与普通的 JS 变量一样，即可以接收任意类型的值，在运行过程中还能接收其他类型的值
  ```js
    function stringify (value: any) {
      return JSON.stringify(value)
    }
    stringify('string')
    stringify(100)
    stringify(true)
  ```
  - 由于 any 有可能会存放任意类型的值，所以 TypeScript 不会对 any 做类型检查，这也就意味着我们可以像在 JS 中一样去调用它任意的成员，**语法**上都不会报错，any 仍然会存在类型安全的问题
  - 所以**不要轻易使用 any 类型**
  - 兼容老代码的时候，可能难免使用 any 类型
  ```js
    let foo: any = 'string'
    foo = 100
    foo.bar()
  ```

## TypeScript 隐式类型推断
在 TypeScript 中，如果我们没有通过类型注解明确标记一个变量的类型，TypeScript 会根据这个变量的使用情况，推断这个变量类型，这个特性叫做隐式类型推断
  ```ts
    let age = 18 // 此时 age 被推断为 number 类型
    age = 'string' // 报错
  ```
- 如果 TypeScript 无法推断某个变量的类型，这个变量会被标记为 any
  ```ts
    let foo // 声明变量未赋值，会被标记为 any 类型
    foo = 100
    foo = 'string'
  ```
> 虽然 TypeScript 支持隐式类型推断，而且这种隐式类型推断可以简化一部分代码，这里仍然建议为每个变量尽可能的添加明确的类型，便于后期更直观的理解代码

## TypeScript 类型断言

- 有些特殊情况下 TypeScript 无法推断出变量的具体类型，作为开发者，我们应该明确知道这个变量是什么类型的
  ```ts
    // 假定这个 nums 辣子一个明确的接口
    let nums = [110, 120, 130, 112]
    // 此时调用 find 方法获取第一个大于0的数字是可以获取到的，
    const res = nums.find(i => i > 0)
  ```
  - 但是对于 TypeScript 来说，它并不知道，它所推断出来的 res 类型是一个 number | undefined，因为它会认为有可能找不到
  - 此时是不能把 res 当作一个数字使用的
  ```ts
    const square = res * res // 报错
  ```
  - 这种情况下，可以断言这个 res 是number类型，断言其实就是告诉 TypeScript 此时 res 是 number 类型的
  - 类型断言的方式有两种
    - 使用 as 关键字（**推荐使用**）
    ```ts
      const num = res as number
    ```
    - 在变量前使用 <> 断言（**jsx 下不能使用**）
    ```ts
      const num = <number>res
    ```
    > 如果在代码中使用 jsx，这里的尖括号会和 jsx 中的标签产生冲突，在 jsx 下不能使用这种断言方式
  > 类型断言并不是类型转换，编译过后这个断言就不会存在了

## TypeScript 接口(Interfaces)
- 接口，可以理解为一种规范/契约，是一个抽象的概念，可以约定对象的结构
- 使用某个接口，就必须要遵循这个接口全部的约定
  - 在 TypeScript 中，接口最直观的体现就是，约定一个对象中具体应该有哪些成员，这些成员的类型应该是什么样的
  ```ts
    // 此函数入参隐性要求必须要有 title, content 属性
    // 可以使用接口表现这种约束
    function printPost (post) {
      console.log(post.title);
      console.log(post.content);
    }
  ```
- 定义接口
  ```ts
    interface Post {
      title: string // 可以使用 , 分隔，更标准的语法是 ; 分隔，这个分号也可以省略
      content: string
    }
    // 此函数入参隐性要求必须要有 title, content 属性
    // 可以使用接口表现这种约束
    function printPost (post: Post) {
      console.log(post.title);
      console.log(post.content);
    }

    printPost({
      title: 'title',
      content: 'content'
    })
  ```
  > TypeScript 中的接口是为了给有结构的数据做约束的，在实际运行阶段，这种接口并没有意义，编译后不会体现

## TypeScript 接口补充
- 可选成员
  ```ts
    interface Post {
      title: string // 可以使用 , 分隔，更标准的语法是 ; 分隔，这个分号也可以省略
      content: string
      subtitle?: string // 可选成员 相当于给 subtitle 标记类型为 string 或 undefined
    }
  ```

- 只读成员
  ```ts
    interface Post {
      title: string // 可以使用 , 分隔，更标准的语法是 ; 分隔，这个分号也可以省略
      content: string
      subtitle?: string // 可选成员 相当于给 subtitle 标记类型为 string 或 undefined
      readonly summary: string // 只读成员
    }

    printPost({
      title: 'title',
      content: 'content',
      summary: 'summary'
    })
  ```

- 动态成员
  ```ts
    interface Cache1 {
      [prop: string]: string
    }

    const cache: Cache1 = {}

    cache.foo = 'value1'
    cache.bar = 'value2'
  ```

## TypeScript 类的基本使用
类，描述一类具体事物/对象的抽象特征
- JavaScript
  - ES6 以前都是 函数 + 模型 实现类
  - ES6 开始 JavaScript 中有了专门的 class
- TypeScript
  - 可以使用所有 ECMAScript 标准中所有关于类的功能
  - 增强了一些类的属性

- 类的属性在使用前必须要声明，为了给属性做类型标注
  ```ts
    class Person {
      name: string // = 'init' // 指定类的属性，可以使用 = 赋初始值
      age: number
      // TypeScript 中类的属性必须要有一个初始值，可以使用 = 指定，也可以在构造函数 constructor 中初始化，否则会报错
      constructor (name: string, age: number) {
        this.name = name
        this.age = age
      }

      sayHi (msg: string): void {
        console.log(`I am ${this.name}, ${msg}`);
      }
    }
  ```

## TypeScript 类的访问修饰符
- public 公有成员 默认 有无 public 均可，建议添加
- private 私有属性  属性前添加 private 表示私有属性，只能内部访问]
- protected 受保护的属性  属性前添加 protected 表示受保护的属性，只能内部访问]
  ```ts
    class Person {
      public name: string
      private age: number
      protected gender: boolean

      constructor (name: string, age: number) {
        this.name = name
        this.age = age
        this.gender = true
      }

      sayHi (msg: string): void {
        console.log(`I am ${this.name}, ${msg}`);
        console.log(this.age);
      }
    }

    const tom = new Person('tom', 18)
    console.log(tom.name)
    // console.log(tom.age) // 报错
    // console.log(tom.gender) // 报错
  ```
- private 与 protected 的区别
  - protected 允许在子类中访问

  ```ts
    class Student extends Person {
      constructor (name: string, age: number) {
        super(name, age)
        console.log(this.gender);
      }
    }
  ```
- 构造函数 constructor 的访问修饰符默认为 public
- 如果设置为 private，那这个类型就不能在外部被实例化，也不能被继承，此时，只能这个类的内部创建静态方法，在静态方法中创建这个类的实例
  ```ts
    class Student extends Person {
      private constructor (name: string, age: number) {
        super(name, age)
        console.log(this.gender);
      }
      static create (name: string, age: number) {
        return new Student(name, age)
      }
    }

    const jack = Student.create('jack', 18)
  ```
- 如果设置为 protected，那这个类型就不能在外部被实例化，但可以被继承

## TypeScript 类的只读属性
- readonly 只读，如果属性已有访问修饰符，readonly 跟在访问修饰符后面
- 一个属性如果有 readonly 标识，只能使用 = 赋初始值，或者在构造函数中赋值，两者只能选其一
- 初始化后 readonly 属性就不能再次被修改了
  ```ts
    class Person {
      public name: string
      private age: number
      protected readonly gender: boolean

      constructor (name: string, age: number) {
        this.name = name
        this.age = age
        this.gender = true
      }

      sayHi (msg: string): void {
        console.log(`I am ${this.name}, ${msg}`);
        console.log(this.age);
      }
    }

    const tom = new Person('tom', 18)
    console.log(tom.name)
    tom.gender = false // 报错
  ```

## TypeScript 类与接口
不同的类之间可能会有共同的特征，这些不同的类的共同特征可以使用接口进行抽象
例如： 手机和座机 都能打电话，可以看作它们拥有相同的协议(接口)
  ```ts
    // 此处 人和动物 都有 吃和跑 的方法，但是 人与动物 的方法是不同的，只是都有这个能力，但能力的实现是不同的
    class Person {
      eat (food: string): void {
        console.log(`Person eat: ${food}`);
      }
      run (distance: number): void {
        console.log(`Person run: ${distance}`);
      }
    }

    class Animal {
      eat (food: string): void {
        console.log(`Animal eat: ${food}`);
      }
      run (distance: number): void {
        console.log(`Animal run: ${distance}`);
      }
    }
  ```
- 定义接口
  ```ts
    interface EatAndRun {
      eat (food: string): void
      run (distance: number): void
    }

    class Person implements EatAndRun {
      eat (food: string): void {
        console.log(`Person eat: ${food}`);
      }
      run (distance: number): void {
        console.log(`Person run: ${distance}`);
      }
    }

    class Animal implements EatAndRun {
      eat (food: string): void {
        console.log(`Animal eat: ${food}`);
      }
      run (distance: number): void {
        console.log(`Animal run: ${distance}`);
      }
    }
  ```
- 拆分接口
  - 每个类中的能力是不同的，因为使用接口就必须定义接口约定的所有属性，所以最好将接口进行拆分
  ```ts
    interface Eat {
      eat (food: string): void
    }

    interface Run {
      run (distance: number): void
    }

    class Person implements Eat, Run {
      eat (food: string): void {
        console.log(`Person eat: ${food}`);
      }
      run (distance: number): void {
        console.log(`Person run: ${distance}`);
      }
    }

    class Animal implements Eat, Run {
      eat (food: string): void {
        console.log(`Animal eat: ${food}`);
      }
      run (distance: number): void {
        console.log(`Animal run: ${distance}`);
      }
    }
  ```

## TypeScript 抽象类
- 抽象类可以用来约束子类中必须有某个成员
- 与接口不同的是，抽象类可以包含一些具体的实现，接口只能是一个成员的抽象，不包含具体的实现
- 比较大的类目建议使用抽象类，例如上面例子中的动物
  ```ts
    // 在 class 前添加 abstract 定义抽象类
    abstract class Animal {
      eat (food: string): void {
        console.log(`Animal eat: ${food}`);
      }
      // 抽象类中还可以定义抽象方法，抽象方法也不需要返回体
      abstract run (distance: number): void
    }

    // 抽象类只能被继承，不能使用 new 的方式创建实例对象，抽象类中有抽象方法，子类中就必须要实现这个抽象方法
    class Dog extends Animal {
      run(distance: number): void {
        console.log(`Dog run: ${distance}`);
      }
    }

    const d = new Dog()
    d.eat('food')
    d.run(100)
  ```

## TypeScript 泛型
泛型是指在定义函数接口类的时候没有指定具体类型，等到使用时再定义类型，这样一种特征
以函数为例，泛型就是在声明函数时不指定具体类型，而是调用时传递具体的类型，这样可以极大程度的服用代码
  ```ts
    // 生成指定长度的数组
    function createNumberArray(length: number, value: number): number[] {
      // Array 其实是一个 any 类型，可以在使用时指定需要的类型
      const arr = Array<number>(length).fill(value)
      return arr
    }

    const res = createNumberArray(3, 100)
    // => res => [100, 100, 100]
  ```
  ```ts
    function createArray<T> (length: number, value: T): T[] {
      const arr = Array<T>(length).fill(value)
      return arr
    }

    const res = createArray<string>(3, '100')
    // => res => [100, 100, 100]
  ```

## TypeScript 类型声明
- 并不是所有引入的 npm 模块都是使用 TypeScript 编写的， 如果没有声明模块可以使用以下操作
- 函数声明时未指定类型，使用时可以指定类型
  ```ts
    import { cameCase } from 'loadsh'
    declare function cameCase(input:string): string

    const res = cameCase('hello typed')
  ```
- 也可以安装指定的类型声明模块
  例如 `yarn add &types/lodash --dev`
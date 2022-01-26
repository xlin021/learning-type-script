export default {}

class Person {
  public name: string // 公有成员 默认 有无 public 均可，建议添加
  private age: number // 私有属性  属性前添加 private 表示私有属性，只能内部访问]
  protected gender: boolean // 受保护的属性  属性前添加 protected 表示受保护的属性，只能内部访问]

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

// private 与 protected 的区别
// protected 允许在子类中访问

// class Student extends Person {
//   constructor (name: string, age: number) {
//     super(name, age)
//     console.log(this.gender);
//   }
// }

const tom = new Person('tom', 18)
console.log(tom.name)
// console.log(tom.age) // 报错
// console.log(tom.gender) // 报错

// 构造函数 constructor 的访问修饰符默认为 public, 如果设置为 private，那这个类型就不能在外部被实例化，也不能被继承
// 此时，只能这个类的内部创建静态方法，在静态方法中创建这个类的实例

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

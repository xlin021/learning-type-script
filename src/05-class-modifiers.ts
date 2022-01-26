export default {}
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
// tom.gender = false // 报错
// console.log(tom.age) // 报错
// console.log(tom.gender) // 报错

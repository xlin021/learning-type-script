export {}

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

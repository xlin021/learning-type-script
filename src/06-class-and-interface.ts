export {}

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

class Person {
  name;
  age;
  gender;
  race;

  constructor(name, age, gender, race) {
    this.name = name;
    this.age = age;
    this.gender = gender;
    this.race = race;
  }

  info() {
    console.log(
      `The person ${this.name} is ${this.race} and is ${this.age} years old.`
    );
  }
}

class Man extends Person {
  beardColor;
  constructor(name, age, race, beardColor = "black") {
    super(name, age, "Male", race);
    this.beardColor = beardColor;
  }

  info() {
    console.log(
      `The male ${this.name} is ${this.race}, is ${this.age} years old, and has ${this.beardColor} beard.`
    );
  }
}

class Woman extends Person {
  lipstickColor;
  constructor(name, age, race, lipstickColor = "red") {
    super(name, age, "Male", race);
    this.lipstickColor = lipstickColor;
  }

  info() {
    console.log(
      `The female ${this.name} is ${this.race}, is ${this.age} years old, and loves ${this.lipstickColor} lipstick.`
    );
  }
}

// examples
const person1 = new Person("Anonymous", 24, "Rather not say", "Asian");
person1.info();

const male1 = new Man("John Snow", 35, "Caucasian", "gray");
male1.info();

const female1 = new Woman("Daenerys Targaryen", 28, "Mongolian", "pink");
female1.info();

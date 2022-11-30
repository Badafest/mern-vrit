//FizzBuzz Problem
const fizzBuzz = (maxNumber) => {
  const toReturn = [];
  for (let integer = 1; integer < maxNumber; integer++) {
    if (integer % 3 === 0) {
      if (integer % 5 === 0) {
        toReturn.push("FizzBuzz");
      } else {
        toReturn.push("Fizz");
      }
    } else if (integer % 5 === 0) {
      toReturn.push("Buzz");
    } else {
      toReturn.push(`${integer}`);
    }
  }
  return toReturn;
};

//examples
console.log(fizzBuzz(3)); //["1","2"]
console.log(fizzBuzz(10)); //["1","2","Fizz","4","Buzz","Fizz","7","8","Fizz"]

//element count in array
const elementCount = (array) => {
  const unique = [...new Set(array)];
  return unique.map((element) => {
    return {
      input: element,
      count: array.filter((elem) => elem === element).length,
    };
  });
};

//examples
console.log(elementCount([1, 2, 3, 1])); //[{input: 1, count: 2}, {input: 2, count: 1}, {input: 3, count: 1}]
console.log(elementCount(["a", "b", "a", "c", "c", "b", "b"])); //[ { input: 'a', count: 2 }, { input: 'b', count: 3 }, { input: 'c', count: 2 }]

//FizzBuzz using Map
const fizzBuzzMap = (maxNumber) =>
  [...Array(maxNumber - 1).keys()].map((integer) =>
    (integer + 1) % 3
      ? (integer + 1) % 5
        ? `${integer + 1}`
        : "Buzz"
      : (integer + 1) % 5
      ? "Fizz"
      : "FizzBuzz"
  );

console.log(fizzBuzzMap(3));
console.log(fizzBuzzMap(10));

const fruits = ['apple', 'banana', 'apple', 'orange', 'banana'];
const fruitCount = fruits.reduce((acc, fruit) => {
   
  acc[fruit] = (acc[fruit] || 0) + 1;
  console.log(fruit)
  return acc;
}, {});

console.log(fruitCount); 
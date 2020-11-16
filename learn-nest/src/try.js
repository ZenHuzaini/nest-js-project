const something = [
  { name: 'zen', age: 24 },
  { name: 'lukasz', age: 26 },
  { name: 'segel', age: 28 },
];
console.log(something);

// something.shift(1, { name: 'segelttt', age: 28 });
// something.push({ name: 'segel', age: 28 }, 0);
something.shift();
console.log(something);
something.shift();
console.log(something);
something.shift();
console.log(something);

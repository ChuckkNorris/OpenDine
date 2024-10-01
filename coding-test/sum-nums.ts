
const solution = (num) => {
  // Given N, return smallest integer that is greater than N
  // AND the sume of whose digits is equal to the sum of the digits of N
  const ints =  num.split('');

  const targetSum = ints.reduce((prev, next) => prev + next, 0);
  const isDivisibleBy2 = targetSum % 2 === 0;
  let sum = targetSum;
  while (sum != )

}

const getNextSum = (currNum, targetSum) => {
  const numPlusOne
}


console.log(solution('28')); // 37
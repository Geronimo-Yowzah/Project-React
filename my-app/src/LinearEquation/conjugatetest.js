const { xgcd } = require('mathjs');
const math = require('mathjs');

// Define the system of linear equations
const A = math.matrix([[5, 2,0,0], [2,5,2,0],[0, 2,5,2], [0,0,2,5]]);
const b = math.matrix([[12], [17],[14],[7]]);

// Define the initial guess and tolerance
const x0 = math.matrix([[0], [0],[0],[0]]);
const tol = 1e-6;

// Define the conjugate gradient function
function conjugateGradient(A, b, x0) {
  let x = x0;
  let r = math.subtract(b, math.multiply(A, x));
  let p = r;
  let rsold = math.dot(r, r);
  let rsnew;

  do {
    let Ap = math.multiply(A, p);
    let alpha = rsold / math.dot(p, Ap);
    x = math.add(x, math.multiply(alpha, p));
    r = math.subtract(r, math.multiply(alpha, Ap));
    rsnew = math.dot(r, r);
    p = math.add(r, math.multiply(rsnew / rsold, p));
    rsold = rsnew;
    console.log(x);
  }while(math.sqrt(rsnew) > 0.001)

  return x;
}

// Solve the system of linear equations using the conjugate gradient method
const x = conjugateGradient(A, b, x0);

// Print the result in array form
console.log(math.flatten(x).toArray());

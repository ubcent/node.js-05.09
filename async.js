function foo() {
  const result = 1;
  return result;
}

// pending->fulfilled/rejected

function foo1() {
  const promise = new Promise((resolve, reject) => {
    setTimeout(() => {
      const human = {
        firstName: 'Vasya',
        lastName: 'Pupkin',
      }
  
      resolve(human);
    }, 1000);
  });

  return promise;
}

function foo2(human) {
  const promise = new Promise((resolve, reject) => {
    setTimeout(() => {
      const age = 40;
  
      resolve({...human, age});
    }, 1000);
  });

  return promise;
}

// callback hell
/*foo1((human) => {
  foo2((age) => {

  })
})*/

/*foo1()
  .then(
    (human) => {
      console.log('resolved1', human);
      return foo2(human);
    }, // onFulfilled
    () => {
      console.log('rejected');
    }, // onRejected
  )
  .then((result) => {
    console.log('resolved2', result)
  });*/

async function fetchResult() {
  const human = await foo1();
  console.log('Hi1');
  const result = await foo2(human);
  console.log('Hi2');

  console.log(result);
}

fetchResult();
console.log('hello');


  
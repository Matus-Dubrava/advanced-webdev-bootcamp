function timeout(counter, delay) {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      counter++;
      console.log('Counter: ' + counter);
      resolve(counter);
    }, delay);
  });
}

timeout(0, 1000)
  .then((v) => { return timeout(v, 2000); })
  .then((v) => { return timeout(v, 3000); });

const defaultTime = 10000;

export const createAbortablePromise = (asyncFunction, timeout = defaultTime) => {
  let effectiveTimeout = parseInt(timeout);
  effectiveTimeout = isNaN(effectiveTimeout) || effectiveTimeout < 1 ? defaultTime : effectiveTimeout;

  const abortController = new AbortController();
  const abortSignal = abortController.signal;

  let timeoutId = null;
  // Create a wrapper promise to manage the timeout and async function execution
  const wrapperPromise = new Promise((resolve, reject) => {
    // Set a timeout to abort the async operation if it exceeds the specified duration
    timeoutId = setTimeout(() => {
      abortController.abort();
      reject(new Error('Promise timed out'));
    }, effectiveTimeout);

    // Immediately resolve or reject if the asyncFunction argument is not as expected
    if (!asyncFunction) {
      clearTimeout(timeoutId);
      resolve();
    } else if (typeof asyncFunction !== 'function') {
      clearTimeout(timeoutId);
      resolve(asyncFunction);
    } else {
      // If asyncFunction is a function, execute it with abortSignal
      asyncFunction(abortSignal).then(result => {
        clearTimeout(timeoutId);
        resolve(result);
      }).catch(error => {
        clearTimeout(timeoutId);
        reject(error);
      });
    }
  });

  // Provide a method to manually abort the promise
  wrapperPromise.abort = () => {
    if (!abortController.signal.aborted) {
      abortController.abort();
      clearTimeout(timeoutId);
    }
  };

  // Alias 'cancel' to 'abort' for convenience
  wrapperPromise.cancel = wrapperPromise.abort;

  return wrapperPromise;
};

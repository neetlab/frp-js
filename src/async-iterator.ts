import { Observable, zip, interval, range, throwError } from "rxjs";
import { map, mergeMap } from "rxjs/operators";

type Queue<T> = ((resolve: IteratorResult<T, unknown>) => void)[];

export function toAsyncIterator<T>(
  stream$: Observable<T>
): AsyncIterableIterator<T> {
  const queue: Queue<T> = [];

  const subscription = stream$.subscribe((value) => {
    const resolve = queue.shift();
    if (resolve == null) return;

    resolve({
      value,
      done: queue.length > 0,
    });
  });

  return {
    next() {
      return new Promise((resolve) => {
        queue.push(resolve);
      });
    },
    return(value: T) {
      subscription.unsubscribe();
      return Promise.resolve({ value, done: true });
    },
    throw(error: Error) {
      subscription.unsubscribe();
      return Promise.reject(error);
    },
    [Symbol.asyncIterator]() {
      return this;
    },
  };
}

(async () => {
  const stream$ = zip(interval(1000), range(1, 10)).pipe(
    map(([, num]) => num),
    mergeMap(_ => throwError("thrown error!!")),
  );

  try {
    for await (const value of toAsyncIterator(stream$)) {
      console.log(`Got value: ${value}`);
    }
  } catch(error) {
    console.warn(`caught ${error}`)
  }
})();

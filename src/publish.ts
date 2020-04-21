import { interval, ConnectableObservable, zip, range } from "rxjs";
import { publish, mapTo, map } from "rxjs/operators";

const stream$ = zip(interval(1000), range(0, 10))
  .pipe(map(([_, num]) => num));

// https://github.com/ReactiveX/rxjs/issues/2972
const stuff$ = stream$.pipe(publish()) as ConnectableObservable<number>;
// ----------

stuff$.connect();
stuff$.subscribe(n => console.log(`1st: ${n}`));
stuff$.subscribe(n => console.log(`2nd: ${n}`));

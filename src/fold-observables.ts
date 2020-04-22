import { of, range } from "rxjs";
import { reduce, map, mergeAll } from "rxjs/operators";

range(0, 10)
  .pipe(reduce((sum$, num) => sum$.pipe(map((sum) => sum + num)), of(10)), mergeAll())
  .subscribe((sum) => console.log(sum));
// --> 55
